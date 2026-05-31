#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const STOPWORDS = new Set([
  "the",
  "and",
  "for",
  "you",
  "with",
  "this",
  "that",
  "一个",
  "这个",
  "那个",
  "然后",
  "就是",
  "可以",
  "需要",
  "因为",
  "所以",
  "如果",
  "但是",
  "里面",
  "时候",
  "这些",
  "那些",
  "直接",
]);

const WEAK_CJK_BIGRAMS = new Set([
  "一个",
  "这个",
  "那个",
  "然后",
  "就是",
  "可以",
  "需要",
  "因为",
  "所以",
  "如果",
  "但是",
  "里面",
  "时候",
  "这些",
  "那些",
  "直接",
]);

const args = parseArgs(process.argv.slice(2));
const inputPaths = values(args.input);
const basePaths = values(args.base);
const outPath = args.out || (args.daily ? dailyPath("lexicons/qianwen/daily", "txt") : "lexicons/qianwen/generated-lexicon.txt");
const jsonPath = args.json || (args.daily ? dailyPath("lexicons/qianwen/daily", "json") : "lexicons/qianwen/generated-lexicon.json");
const maxTerms = Number(args.max || 300);
const minScore = Number(args["min-score"] || 5);

if (args.help || inputPaths.length === 0) {
  printHelp();
  process.exit(args.help ? 0 : 1);
}

const baseTerms = new Map();
for (const file of collectFiles(basePaths)) {
  for (const term of readLines(file)) {
    const normalized = normalizeTerm(term);
    if (normalized) baseTerms.set(normalized, { term: normalized, count: 1, score: 20, sources: new Set([displayPath(file)]), kind: "base" });
  }
}

const candidates = new Map(baseTerms);
for (const file of collectFiles(inputPaths)) {
  const text = fs.readFileSync(file, "utf8");
  for (const item of extractTerms(text)) {
    const term = normalizeTerm(item.term);
    if (!term) continue;
    const current = candidates.get(term) || { term, count: 0, score: 0, sources: new Set(), kind: item.kind };
    current.count += 1;
    current.score += item.score;
    current.sources.add(displayPath(file));
    candidates.set(term, current);
  }
}

const entries = [...candidates.values()]
  .map((entry) => ({
    ...entry,
    sources: [...entry.sources],
    score: entry.score + Math.min(entry.count, 6),
  }))
  .filter((entry) => entry.score >= minScore)
  .sort((a, b) => b.score - a.score || b.count - a.count || a.term.localeCompare(b.term, "zh-Hans-CN"))
  .slice(0, maxTerms);

writeFile(outPath, entries.map((entry) => entry.term).join("\n") + "\n");
writeFile(
  jsonPath,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      format: "qianwen-voice-lexicon-v1",
      count: entries.length,
      importHint: "Review the txt file, then import or copy it into Qianwen voice input lexicon / hotword dictionary through the available UI or adapter.",
      entries,
    },
    null,
    2,
  ) + "\n",
);

console.log(`Generated ${entries.length} terms`);
console.log(`TXT: ${outPath}`);
console.log(`JSON: ${jsonPath}`);

function extractTerms(text) {
  const terms = [];

  const quoted = /[`"“”「」『』《》]([^`"“”「」『』《》]{2,48})[`"“”「」『』《》]/g;
  for (const match of text.matchAll(quoted)) {
    terms.push({ term: match[1], score: 8, kind: "quoted" });
  }

  const explicit = /(?:专有名词|常用名词|术语|词典|热词|词库|叫做|简称)\s*[:：,，]?\s*([^\n。；;]{2,160})/gu;
  for (const match of text.matchAll(explicit)) {
    for (const term of splitTermList(match[1])) {
      terms.push({ term, score: 10, kind: "explicit" });
    }
  }

  const productLike = /\b([A-Z][A-Za-z0-9.+#/-]*(?:\s+[A-Z][A-Za-z0-9.+#/-]*){0,3})\b/g;
  for (const match of text.matchAll(productLike)) {
    terms.push({ term: match[1], score: looksLikeProduct(match[1]) ? 7 : 3, kind: "product" });
  }

  const camelOrMixed = /\b([a-z]+[A-Z][A-Za-z0-9]*|[A-Za-z]+[0-9][A-Za-z0-9]*|[A-Za-z]+[-/][A-Za-z0-9-]+)\b/g;
  for (const match of text.matchAll(camelOrMixed)) {
    terms.push({ term: match[1], score: 5, kind: "mixed" });
  }

  const cjk = /[\p{Script=Han}]{2,8}/gu;
  for (const match of text.matchAll(cjk)) {
    const term = match[0];
    if (isWeakCjk(term)) continue;
    terms.push({ term, score: 1, kind: "cjk" });
  }

  return terms;
}

function splitTermList(value) {
  return String(value)
    .split(/[、,，;；|]/g)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeTerm(value) {
  if (!value) return "";
  const term = String(value)
    .replace(/^[\s,，.。:：;；、|/\\()[\]{}<>《》"'“”‘’`]+|[\s,，.。:：;；、|/\\()[\]{}<>《》"'“”‘’`]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (term.length < 2 || term.length > 40) return "";
  if (/[\p{Script=Han}]/u.test(term) && term.length > 16) return "";
  if (/^[的和与及或了在是把被到从对给]/.test(term) || /[的和与及或了在是]$/.test(term)) return "";
  if (/^(我|你|他|她|它|今天|昨天|明天|然后|比如|例如)/.test(term)) return "";
  if (/(可以导入|每天读取|自动整理|我经常|继续做)/.test(term)) return "";
  if (/^\d+$/.test(term)) return "";
  if (STOPWORDS.has(term.toLowerCase())) return "";
  return term;
}

function isWeakCjk(term) {
  if (STOPWORDS.has(term.toLowerCase())) return true;
  if (/^[一-龥]{2}$/.test(term) && WEAK_CJK_BIGRAMS.has(term)) return true;
  return false;
}

function looksLikeProduct(term) {
  return /[A-Z]{2,}|Code|AI|API|CLI|IDE|Qwen|Qianwen|Codex|Claude|Cursor|GitHub|Scale|Sill/.test(term);
}

function collectFiles(paths) {
  const files = [];
  for (const p of paths) {
    if (!p) continue;
    if (!fs.existsSync(p)) continue;
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      for (const child of fs.readdirSync(p)) {
        files.push(...collectFiles([path.join(p, child)]));
      }
    } else if (/\.(md|txt|json|jsonl|log)$/i.test(p)) {
      files.push(p);
    }
  }
  return files;
}

function displayPath(file) {
  const relative = path.relative(process.cwd(), file);
  return relative && !relative.startsWith("..") ? relative : file;
}

function readLines(file) {
  if (!file || !fs.existsSync(file)) return [];
  return fs.readFileSync(file, "utf8").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

function writeFile(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
}

function parseArgs(argv) {
  const parsed = {};
  for (let i = 0; i < argv.length; i += 1) {
    const item = argv[i];
    if (!item.startsWith("--")) continue;
    const key = item.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      parsed[key] = true;
    } else if (parsed[key]) {
      parsed[key] = Array.isArray(parsed[key]) ? [...parsed[key], next] : [parsed[key], next];
      i += 1;
    } else {
      parsed[key] = next;
      i += 1;
    }
  }
  return parsed;
}

function values(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function dailyPath(dir, ext) {
  const date = new Date().toISOString().slice(0, 10);
  return path.join(dir, `${date}.${ext}`);
}

function printHelp() {
  console.log(`
SILL Lexicon Agent

Usage:
  node agent/lexicon-agent.mjs --input data/sample-voice-history.md --base lexicons/qianwen/base-terms.txt --daily

Options:
  --input <file-or-dir>      Voice transcripts, AI chat logs, or notes. Repeatable.
  --base <file>              Seed terms that should always be kept. Repeatable.
  --out <file>               Output newline-separated Qianwen lexicon txt.
  --json <file>              Output scored metadata JSON.
  --daily                    Write to lexicons/qianwen/daily/YYYY-MM-DD.*
  --max <number>             Max terms. Default: 300.
  --min-score <number>       Minimum score. Default: 5.
`);
}

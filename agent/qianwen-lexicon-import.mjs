#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const args = parseArgs(process.argv.slice(2));
const lexiconPath = args.lexicon || latestDailyLexicon();
const outDir = args.out || "lexicons/qianwen/import";
const copy = Boolean(args.copy);
const openQianwen = Boolean(args["open-qianwen"]);

if (args.help || !lexiconPath) {
  printHelp();
  process.exit(args.help ? 0 : 1);
}

if (!fs.existsSync(lexiconPath)) {
  fail(`Lexicon file not found: ${lexiconPath}`);
}

const terms = readTerms(lexiconPath);
if (terms.length === 0) {
  fail(`No terms found in ${lexiconPath}`);
}

fs.mkdirSync(outDir, { recursive: true });

const stamp = new Date().toISOString();
const pack = {
  generatedAt: stamp,
  format: "qianwen-voice-lexicon-import-pack-v1",
  source: displayPath(lexiconPath),
  count: terms.length,
  status: "ready-for-review",
  note:
    "Qianwen exposes internal VoiceInputLexicon capability, but this project does not treat private APIs as a stable public import contract. Use this pack for UI import, copy-paste import, or a future replaceable adapter.",
  terms,
};

const jsonPath = path.join(outDir, "latest-import-pack.json");
const mdPath = path.join(outDir, "latest-import-pack.md");
const txtPath = path.join(outDir, "latest-import-pack.txt");

fs.writeFileSync(jsonPath, JSON.stringify(pack, null, 2) + "\n", "utf8");
fs.writeFileSync(txtPath, terms.join("\n") + "\n", "utf8");
fs.writeFileSync(mdPath, renderMarkdown(pack), "utf8");

if (copy) {
  try {
    execFileSync("pbcopy", { input: terms.join("\n") + "\n" });
  } catch (error) {
    fail(`Failed to copy terms with pbcopy: ${error.message}`);
  }
}

if (openQianwen) {
  try {
    execFileSync("open", ["-a", "Qianwen"]);
  } catch (error) {
    fail(`Failed to open Qianwen: ${error.message}`);
  }
}

console.log(`Prepared ${terms.length} terms for Qianwen lexicon review`);
console.log(`TXT: ${txtPath}`);
console.log(`JSON: ${jsonPath}`);
console.log(`MD: ${mdPath}`);
if (copy) console.log("Copied terms to clipboard");
if (openQianwen) console.log("Opened Qianwen");

function readTerms(file) {
  return fs
    .readFileSync(file, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((term, index, list) => list.indexOf(term) === index);
}

function renderMarkdown(pack) {
  return `# Qianwen Lexicon Import Pack

Generated at: ${pack.generatedAt}

Source: \`${pack.source}\`

Status: \`${pack.status}\`

This pack is intentionally conservative. It prepares terms for Qianwen voice-input lexicon import without depending on private app internals. Review the terms, then import through Qianwen's available UI, copy-paste path, or a replaceable adapter.

## Terms

${pack.terms.map((term) => `- ${term}`).join("\n")}
`;
}

function latestDailyLexicon() {
  const dir = "lexicons/qianwen/daily";
  if (!fs.existsSync(dir)) return "";
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".txt"))
    .sort()
    .map((file) => path.join(dir, file))
    .pop();
}

function displayPath(file) {
  const relative = path.relative(process.cwd(), file);
  return relative && !relative.startsWith("..") ? relative : file;
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
    } else {
      parsed[key] = next;
      i += 1;
    }
  }
  return parsed;
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function printHelp() {
  console.log(`
Qianwen Lexicon Import Adapter

Usage:
  node agent/qianwen-lexicon-import.mjs --lexicon lexicons/qianwen/daily/2026-05-31.txt
  node agent/qianwen-lexicon-import.mjs --copy --open-qianwen

Options:
  --lexicon <file>       Newline-separated lexicon txt. Defaults to latest daily txt.
  --out <dir>            Import pack output directory. Default: lexicons/qianwen/import.
  --copy                 Copy the prepared terms to the clipboard.
  --open-qianwen         Open Qianwen after preparing the import pack.

Note:
  This adapter prepares a stable import pack. It does not call Qianwen private APIs by default.
`);
}

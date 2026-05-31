#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const markdownFiles = collect(root).filter((file) => file.endsWith(".md"));
const missing = [];
const linkPattern = /!\[[^\]]*]\(([^)]+)\)|\[[^\]]+]\(([^)]+)\)/g;

for (const file of markdownFiles) {
  const text = fs.readFileSync(file, "utf8");
  for (const match of text.matchAll(linkPattern)) {
    const raw = (match[1] || match[2] || "").split("#")[0];
    if (!raw || raw.startsWith("http://") || raw.startsWith("https://") || raw.startsWith("mailto:")) continue;
    const target = path.resolve(path.dirname(file), raw);
    if (!fs.existsSync(target)) {
      missing.push(`${path.relative(root, file)} -> ${raw}`);
    }
  }
}

if (missing.length) {
  console.error("Missing local markdown targets:");
  for (const item of missing) console.error(`- ${item}`);
  process.exit(1);
}

console.log(`Checked ${markdownFiles.length} Markdown files. All local links exist.`);

function collect(dir) {
  const files = [];
  for (const item of fs.readdirSync(dir)) {
    if (item === ".git" || item === "node_modules") continue;
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) files.push(...collect(full));
    else files.push(full);
  }
  return files;
}

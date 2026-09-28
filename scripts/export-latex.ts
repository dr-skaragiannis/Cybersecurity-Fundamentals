/**
 * Writes the editable LaTeX project to ./latex from the bilingual content
 * in src/content.  Run with:   npx tsx scripts/export-latex.ts
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { latexProject, singleFile } from "../src/latex/generate";

const root = join(process.cwd(), "latex");
const files = latexProject();
files["single/book-en.tex"] = singleFile("en");
files["single/book-el.tex"] = singleFile("el");

for (const [path, content] of Object.entries(files)) {
  const full = join(root, path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content, "utf8");
}
console.log(`Wrote ${Object.keys(files).length} files to ${root}`);

# Cybersecurity Fundamentals · Θεμελιώδεις Αρχές Κυβερνοασφάλειας

Revised bilingual (English / Greek) academic edition of *Book 1* from
`dr-skaragiannis/temporary` (`index.zip → index.html`), with a modern reader UI
and an editable LaTeX project.

## What was done
1. **Analysis** of the original `index.html`: the book was embedded as English HTML plus a
   runtime Greek layer (85 whole-paragraph translations + 2,548 text-node fragments).
   Findings (telegraphic English, fragmented and sometimes mistranslated Greek, undefined
   jargon, editorial meta-commentary, missing scaffolding) are shown in the app under
   **Editorial analysis**.
2. **Rewrite** of all 13 chapters in explanatory academic prose, in both languages, with
   introductions, learning outcomes, worked examples, tables, key terms, summaries and
   review questions (≈17k EN + ≈20k EL words; English section prose +56%).
3. **LaTeX** project generated from the same source (XeLaTeX, polyglossia, Libertinus).
4. **Reader UI**: EN / ΕΛ / parallel mode, search (⌘K), dark mode, font size, scroll-spy,
   LaTeX studio with in-browser editing, zip download and "Open in Overleaf".

## Single source of truth
```
src/content/types.ts        data model (bilingual blocks)
src/content/frontmatter.ts  preface, parts, editorial analysis, terminology
src/content/chapters/chNN.ts  one file per chapter (en + el side by side)
src/latex/generate.ts       content → LaTeX
```

## Regenerate the LaTeX sources
```bash
npx tsx scripts/export-latex.ts      # writes ./latex
cd latex && latexmk -xelatex main-el.tex && latexmk -xelatex main-en.tex
```

Inline markup in content strings: `**bold**`, `*italic*`, `` `code` ``.

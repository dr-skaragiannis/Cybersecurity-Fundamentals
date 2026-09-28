# Cybersecurity Fundamentals — LaTeX sources

Bilingual (English / Greek) LaTeX project generated from `src/content`.

## Structure
- `main-en.tex`, `main-el.tex` — master documents (one per language)
- `preamble.tex` — shared layout, fonts, boxes, headings
- `frontmatter/<lang>/preface.tex`
- `chapters/<lang>/chNN.tex` — one file per chapter

## Build
Requires XeLaTeX or LuaLaTeX (Greek + Unicode):

```bash
latexmk -xelatex main-en.tex
latexmk -xelatex main-el.tex
```

## Editing conventions
- Boxes: `examplebox`, `notebox`, `keybox`, `outcomesbox` (all take a title argument).
- Tables use `booktabs` + `tabularx`.
- Keep EN and EL files aligned section-by-section so that both editions stay equivalent.

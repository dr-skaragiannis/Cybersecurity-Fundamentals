import type { Block, Chapter, Lang } from "../content/types";
import { bookMeta, chapters, parts, preface } from "../content/book";

/* ------------------------------------------------------------------ */
/*  Escaping and inline markup                                          */
/* ------------------------------------------------------------------ */

export function esc(s: string): string {
  const BS = "\u0000";
  return s
    .replace(/\\/g, BS)
    .replace(/([{}$&#%_])/g, "\\$1")
    .replace(/\^/g, "\\textasciicircum{}")
    .replace(/~/g, "\\textasciitilde{}")
    .split(BS).join("\\textbackslash{}")
    .replace(/"/g, "''")
    .replace(/“/g, "``")
    .replace(/”/g, "''");
}

/** Converts **bold**, *italic* and `code` to LaTeX, escaping everything else. */
export function inline(s: string): string {
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  return s
    .split(re)
    .map((tok) => {
      if (!tok) return "";
      if (tok.startsWith("**")) return `\\textbf{${esc(tok.slice(2, -2))}}`;
      if (tok.startsWith("`")) return `\\texttt{${esc(tok.slice(1, -1))}}`;
      if (tok.startsWith("*") && tok.length > 2) return `\\emph{${esc(tok.slice(1, -1))}}`;
      return esc(tok);
    })
    .join("");
}

const stripCaptionPrefix = (c: string) => c.replace(/^(Table|Πίνακας)\s+[\d.A-Z-]+\s*[—–-]\s*/, "");

function block(b: Block): string {
  if (typeof b === "string") return inline(b) + "\n";
  if (b.t === "list") {
    const env = b.ordered ? "enumerate" : "itemize";
    return `\\begin{${env}}\n${b.items.map((i) => `  \\item ${inline(i)}`).join("\n")}\n\\end{${env}}\n`;
  }
  if (b.t === "box") {
    const env = { example: "examplebox", note: "notebox", key: "keybox" }[b.kind];
    return `\\begin{${env}}{${inline(b.title)}}\n${inline(b.text)}\n\\end{${env}}\n`;
  }
  // table
  const cols = b.head.length;
  const spec = Array.from({ length: cols }, () => ">{\\raggedright\\arraybackslash}X").join(" ");
  const row = (r: string[]) => r.map(inline).join(" & ") + " \\\\";
  return [
    "\\begin{table}[htbp]",
    "  \\centering\\small",
    b.caption ? `  \\caption{${inline(stripCaptionPrefix(b.caption))}}` : "",
    `  \\begin{tabularx}{\\linewidth}{${spec}}`,
    "    \\toprule",
    "    " + b.head.map((h) => `\\textbf{${inline(h)}}`).join(" & ") + " \\\\",
    "    \\midrule",
    ...b.rows.map((r) => "    " + row(r)),
    "    \\bottomrule",
    "  \\end{tabularx}",
    "\\end{table}",
    "",
  ]
    .filter(Boolean)
    .join("\n");
}

/* ------------------------------------------------------------------ */
/*  Labels                                                              */
/* ------------------------------------------------------------------ */

const T = {
  outcomes: { en: "Learning outcomes", el: "Μαθησιακά αποτελέσματα" },
  outcomesLead: { en: "After studying this chapter you should be able to:", el: "Μετά τη μελέτη του κεφαλαίου θα πρέπει να μπορείτε:" },
  terms: { en: "Key terms", el: "Βασικοί όροι" },
  summary: { en: "Chapter summary", el: "Σύνοψη κεφαλαίου" },
  questions: { en: "Review questions", el: "Ερωτήσεις ανασκόπησης" },
  preface: { en: "Preface", el: "Πρόλογος" },
  part: { en: "Part", el: "Μέρος" },
  level: { en: "Level", el: "Επίπεδο" },
  time: { en: "Study time", el: "Χρόνος μελέτης" },
  hours: { en: "hours", el: "ώρες" },
  handsOnLab: { en: "Technical Lab (~2 Hours)", el: "Τεχνικό Εργαστήριο (~2 Ώρες)" },
  technicalProject: { en: "Technical Practice Project", el: "Τεχνικό Project (Εργασία Εξάσκησης)" },
  quiz: { en: "Chapter Quiz (10 Questions)", el: "Κουίζ Κεφαλαίου (10 Ερωτήσεις)" },
  prereqs: { en: "Prerequisites & Environment", el: "Προαπαιτούμενα & Περιβάλλον" },
  deliverables: { en: "Expected Deliverables", el: "Αναμενόμενα Παραδοτέα" },
  verification: { en: "Verification Checklist", el: "Λίστα Επαλήθευσης" },
  milestones: { en: "Implementation Milestones", el: "Ορόσημα Υλοποίησης" },
  rubric: { en: "Evaluation Rubric", el: "Κριτήρια Αξιολόγησης" },
};

/* ------------------------------------------------------------------ */
/*  Chapter / front matter bodies                                       */
/* ------------------------------------------------------------------ */

export function chapterTex(ch: Chapter, lang: Lang): string {
  const out: string[] = [];
  out.push(`% ============================================================`);
  out.push(`% Chapter ${ch.n}: ${ch.title.en}`);
  out.push(`% Language: ${lang === "en" ? "English" : "Greek"} — edit freely; regenerate from src/content if preferred.`);
  out.push(`% ============================================================`);
  out.push(`\\chapter{${inline(ch.title[lang])}}\\label{ch:${ch.n}}`);
  out.push(`\\chaptermeta{${inline(ch.subtitle[lang])}}{${T.level[lang]}: ${inline(ch.level[lang])}}{${T.time[lang]}: ${ch.hours} ${T.hours[lang]}}`);
  out.push("");
  ch.intro[lang].forEach((p) => out.push(inline(p) + "\n"));
  out.push(`\\begin{outcomesbox}{${T.outcomes[lang]}}`);
  out.push(T.outcomesLead[lang]);
  out.push("\\begin{itemize}");
  ch.outcomes[lang].forEach((o) => out.push(`  \\item ${inline(o)}`));
  out.push("\\end{itemize}");
  out.push("\\end{outcomesbox}\n");

  // Sections
  ch.sections.forEach((s) => {
    out.push(`\\section{${inline(s.title[lang])}}\\label{sec:${s.id}}`);
    s.body[lang].forEach((b) => out.push(block(b)));
  });

  // Terms
  out.push(`\\section*{${T.terms[lang]}}`);
  out.push("\\begin{description}[style=nextline,leftmargin=1.2em]");
  ch.terms[lang].forEach((t) => out.push(`  \\item[${inline(t.term)}] ${inline(t.def)}`));
  out.push("\\end{description}\n");

  // Summary
  out.push(`\\section*{${T.summary[lang]}}`);
  out.push("\\begin{itemize}");
  ch.summary[lang].forEach((s) => out.push(`  \\item ${inline(s)}`));
  out.push("\\end{itemize}\n");

  // Review questions
  out.push(`\\section*{${T.questions[lang]}}`);
  out.push("\\begin{enumerate}");
  ch.questions[lang].forEach((q) => out.push(`  \\item ${inline(q)}`));
  out.push("\\end{enumerate}\n");

  // Interactive CLI Lab
  if (ch.cliLab) {
    const cli = ch.cliLab;
    out.push(`\\section*{CLI Simulated Sandbox Lab: ${inline(cli.title[lang])}}`);
    out.push(inline(cli.scenario[lang]) + "\n");
    out.push("\\begin{enumerate}");
    cli.tasks.forEach((t) => {
      out.push(`  \\item \\textbf{${inline(t.title[lang])}} -- ${inline(t.description[lang])}`);
      out.push(`  \\\\ \\texttt{\\$ ${esc(t.solution)}}`);
    });
    out.push("\\end{enumerate}\n");
  }

  // Hands-on Lab
  if (ch.handsOnLab) {
    const lab = ch.handsOnLab;
    out.push(`\\section*{${T.handsOnLab[lang]}: ${inline(lab.title[lang])}}`);
    out.push(`\\textbf{${inline(lab.subtitle[lang])}} \\quad (${inline(lab.duration[lang])})\n`);
    out.push(inline(lab.overview[lang]) + "\n");

    out.push(`\\subsection*{${T.prereqs[lang]}}`);
    out.push("\\begin{itemize}");
    lab.environment.forEach((e) => out.push(`  \\item ${inline(e)}`));
    out.push("\\end{itemize}\n");

    lab.phases.forEach((p) => {
      out.push(`\\subsection*{${lang === "el" ? "Φάση" : "Phase"} ${p.phaseNumber}: ${inline(p.title[lang])} (${inline(p.estimatedTime[lang])})}`);
      p.steps[lang].forEach((b) => out.push(block(b)));
    });

    out.push(`\\subsection*{${T.verification[lang]}}`);
    out.push("\\begin{itemize}");
    lab.verificationChecklist[lang].forEach((v) => out.push(`  \\item [$\\square$] ${inline(v)}`));
    out.push("\\end{itemize}\n");
  }

  // Technical Practice Project (Project 1: Enterprise Architecture)
  if (ch.technicalProject) {
    const proj = ch.technicalProject;
    out.push(`\\section*{Project 1: ${inline(proj.title[lang])}}`);
    out.push(`\\textbf{${inline(proj.subtitle[lang])}}\n`);
    out.push(inline(proj.scenario[lang]) + "\n");

    out.push(`\\subsection*{${T.milestones[lang]}}`);
    proj.milestones.forEach((m) => {
      out.push(`\\paragraph{M${m.milestoneNumber}: ${inline(m.title[lang])}} ${inline(m.description[lang])}`);
      if (m.detailedSpec) {
        out.push("\\begin{itemize}");
        m.detailedSpec[lang].forEach((spec) => out.push(`  \\item \\texttt{${inline(spec)}}`));
        out.push("\\end{itemize}");
      }
      out.push(`\\textbf{${T.deliverables[lang]}:} ${inline(m.deliverable[lang])}\n`);
    });
  }

  // Applied Software Construction Project (Project 2: Build Your Own Tool)
  if (ch.appliedProject) {
    const appProj = ch.appliedProject;
    out.push(`\\section*{Project 2 (Build Your Own Tool): ${inline(appProj.title[lang])}}`);
    out.push(`\\textbf{${inline(appProj.subtitle[lang])}}\n`);
    out.push(inline(appProj.scenario[lang]) + "\n");

    out.push(`\\subsection*{${T.milestones[lang]}}`);
    appProj.milestones.forEach((m) => {
      out.push(`\\paragraph{M${m.milestoneNumber}: ${inline(m.title[lang])}} ${inline(m.description[lang])}`);
      if (m.detailedSpec) {
        out.push("\\begin{itemize}");
        m.detailedSpec[lang].forEach((spec) => out.push(`  \\item \\texttt{${inline(spec)}}`));
        out.push("\\end{itemize}");
      }
      out.push(`\\textbf{${T.deliverables[lang]}:} ${inline(m.deliverable[lang])}\n`);
    });
  }

  // Quiz
  if (ch.quiz && ch.quiz.length > 0) {
    out.push(`\\section*{${T.quiz[lang]}}`);
    out.push("\\begin{enumerate}");
    const letters = ["A", "B", "C", "D", "E"];
    ch.quiz.forEach((q) => {
      out.push(`  \\item ${inline(q.question[lang])}`);
      out.push("  \\begin{itemize}");
      q.options[lang].forEach((opt, idx) => {
        out.push(`    \\item [(${letters[idx]})] ${inline(opt)}`);
      });
      out.push("  \\end{itemize}");
      out.push(`  \\emph{Explanation:} ${inline(q.explanation[lang])}\n`);
    });
    out.push("\\end{enumerate}\n");
  }

  return out.join("\n");
}

export function prefaceTex(lang: Lang): string {
  return [
    `\\chapter*{${T.preface[lang]}}`,
    `\\addcontentsline{toc}{chapter}{${T.preface[lang]}}`,
    "",
    ...preface[lang].map((p) => inline(p) + "\n"),
  ].join("\n");
}

export const preambleTex = String.raw`% ============================================================
%  Preamble — shared by main-en.tex and main-el.tex
%  Compile with XeLaTeX or LuaLaTeX (required for Greek + Unicode):
%     latexmk -xelatex main-el.tex
% ============================================================
\usepackage{fontspec}
\usepackage{polyglossia}
\usepackage{amssymb}
% Fonts with full Greek coverage (TeX Live ships Libertinus; swap freely:
% "GFS Didot", "Noto Serif", "CMU Serif", "Times New Roman" …)
\setmainfont{Libertinus Serif}
\setsansfont{Libertinus Sans}
\setmonofont[Scale=0.9]{DejaVu Sans Mono}
\newfontfamily\greekfont[Script=Greek]{Libertinus Serif}
\newfontfamily\greekfontsf[Script=Greek]{Libertinus Sans}
\newfontfamily\greekfonttt[Script=Greek,Scale=0.9]{DejaVu Sans Mono}

\usepackage[a4paper,margin=2.6cm,headheight=14pt]{geometry}
\usepackage{microtype}
\usepackage{xcolor}
\usepackage{booktabs,tabularx,array}
\usepackage{enumitem}
\usepackage[most]{tcolorbox}
\usepackage{titlesec}
\usepackage{fancyhdr}
\usepackage[font=small,labelfont=bf]{caption}
\usepackage[hidelinks]{hyperref}

\definecolor{accent}{HTML}{0E7490}
\definecolor{accent2}{HTML}{B45309}
\definecolor{ink}{HTML}{0F172A}

\setlength{\parskip}{0.45em}
\setlength{\parindent}{0pt}
\linespread{1.12}
\setlist{itemsep=0.2em,topsep=0.4em}

\titleformat{\chapter}[display]
  {\normalfont\sffamily\color{ink}}
  {\large\color{accent}\chaptertitlename\ \thechapter}
  {0.4em}{\Huge\bfseries}
\titlespacing*{\chapter}{0pt}{-10pt}{18pt}
\titleformat{\section}{\normalfont\sffamily\Large\bfseries\color{ink}}{\color{accent}\thesection}{0.8em}{}

\pagestyle{fancy}
\fancyhf{}
\fancyhead[LE,RO]{\small\thepage}
\fancyhead[RE]{\small\sffamily\leftmark}
\fancyhead[LO]{\small\sffamily\rightmark}
\renewcommand{\headrulewidth}{0.3pt}

% --- chapter metadata line -------------------------------------------------
\newcommand{\chaptermeta}[3]{%
  {\sffamily\small\color{accent}#1\par}\vspace{0.3em}
  {\sffamily\footnotesize\color{gray}#2 \quad·\quad #3\par}\vspace{1.2em}}

% --- boxes ------------------------------------------------------------------
\newtcolorbox{outcomesbox}[1]{enhanced,breakable,colback=accent!5,colframe=accent,
  boxrule=0.6pt,arc=2mm,fonttitle=\sffamily\bfseries,title=#1}
\newtcolorbox{examplebox}[1]{enhanced,breakable,colback=accent2!6,colframe=accent2,
  boxrule=0.5pt,arc=2mm,fonttitle=\sffamily\bfseries,title=#1}
\newtcolorbox{notebox}[1]{enhanced,breakable,colback=gray!6,colframe=gray!60,
  boxrule=0.5pt,arc=2mm,fonttitle=\sffamily\bfseries,coltitle=ink,title=#1}
\newtcolorbox{keybox}[1]{enhanced,breakable,colback=accent!8,colframe=accent!70!black,
  boxrule=0.8pt,arc=2mm,fonttitle=\sffamily\bfseries,title=#1}
`;

/* ------------------------------------------------------------------ */
/*  Multi-file project and single-file variants                         */
/* ------------------------------------------------------------------ */

const pad = (n: number) => String(n).padStart(2, "0");

function titlePage(lang: Lang) {
  return String.raw`\begin{titlepage}
  \centering\sffamily
  \vspace*{3cm}
  {\color{accent}\rule{\linewidth}{1.2pt}}\par\vspace{1cm}
  {\Huge\bfseries ${inline(bookMeta.title[lang])}\par}
  \vspace{0.6cm}
  {\Large ${inline(bookMeta.subtitle[lang])}\par}
  \vspace{1cm}
  {\color{accent}\rule{\linewidth}{1.2pt}}\par
  \vfill
  {\large ${inline(bookMeta.author)}\par}
  \vspace{0.3cm}
  {\small ${inline(bookMeta.edition[lang])}\par}
\end{titlepage}`;
}

function mainTex(lang: Lang, body: string) {
  const langCmd = lang === "el" ? "\\setdefaultlanguage{greek}\n\\setotherlanguage{english}" : "\\setdefaultlanguage[variant=british]{english}\n\\setotherlanguage{greek}";
  return `% !TEX program = xelatex
% ${bookMeta.title[lang]} — ${lang === "en" ? "English edition" : "Ελληνική έκδοση"}
\\documentclass[11pt,openany]{book}
\\input{preamble}
${langCmd}

\\title{${inline(bookMeta.title[lang])}}
\\author{${inline(bookMeta.author)}}

\\begin{document}
\\frontmatter
${titlePage(lang)}
\\tableofcontents
${body}
\\end{document}
`;
}

function partsAndChapters(lang: Lang, emit: (ch: Chapter) => string) {
  const out: string[] = ["\\mainmatter"];
  parts.forEach((p) => {
    const chs = chapters.filter((c) => c.part === p.n);
    if (!chs.length) return;
    out.push(`\\part{${inline(p.title[lang])}}`);
    chs.forEach((c) => out.push(emit(c)));
  });
  return out.join("\n");
}

/** Returns the full multi-file LaTeX project as a path → content map. */
export function latexProject(): Record<string, string> {
  const files: Record<string, string> = {};
  files["preamble.tex"] = preambleTex;
  (["en", "el"] as Lang[]).forEach((lang) => {
    files[`frontmatter/${lang}/preface.tex`] = prefaceTex(lang);
    chapters.forEach((c) => {
      files[`chapters/${lang}/ch${pad(c.n)}.tex`] = chapterTex(c, lang);
    });
    const body = [
      `\\input{frontmatter/${lang}/preface}`,
      partsAndChapters(lang, (c) => `\\input{chapters/${lang}/ch${pad(c.n)}}`),
    ].join("\n");
    files[`main-${lang}.tex`] = mainTex(lang, body);
  });
  files["README.md"] = readme();
  return files;
}

/** A single self-contained .tex file (preamble inlined). */
export function singleFile(lang: Lang): string {
  const body = [prefaceTex(lang), partsAndChapters(lang, (c) => chapterTex(c, lang))].join("\n\n");
  return mainTex(lang, body).replace("\\input{preamble}", preambleTex);
}

function readme() {
  return `# ${bookMeta.title.en} — LaTeX sources

Bilingual (English / Greek) LaTeX project generated from \`src/content\`.

## Structure
- \`main-en.tex\`, \`main-el.tex\` — master documents (one per language)
- \`preamble.tex\` — shared layout, fonts, boxes, headings
- \`frontmatter/<lang>/preface.tex\`
- \`chapters/<lang>/chNN.tex\` — one file per chapter

## Build
Requires XeLaTeX or LuaLaTeX (Greek + Unicode):

\`\`\`bash
latexmk -xelatex main-en.tex
latexmk -xelatex main-el.tex
\`\`\`

## Editing conventions
- Boxes: \`examplebox\`, \`notebox\`, \`keybox\`, \`outcomesbox\` (all take a title argument).
- Tables use \`booktabs\` + \`tabularx\`.
- Keep EN and EL files aligned section-by-section so that both editions stay equivalent.
`;
}

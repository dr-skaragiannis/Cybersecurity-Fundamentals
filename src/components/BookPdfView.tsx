import { useState } from "react";
import { ArrowLeft, BookOpen, Check, CheckCircle2, ChevronRight, Copy, Download, ExternalLink, FileCode2, FileDown, FileText, Filter, HelpCircle, Layers, Printer, Shield, Sparkles, Terminal, Wrench, X } from "lucide-react";
import type { Chapter, Lang } from "../content/types";
import { bookMeta, chapters, parts, preface, principles, terminology } from "../content/book";
import { generateStandaloneHtml } from "../utils/generateStandaloneHtml";
import { t } from "../i18n";
import { BlockView, Inline } from "./Blocks";
import { cn } from "../utils/cn";

export default function BookPdfView({
  initialLang = "el",
  onBack,
}: {
  initialLang?: Lang | "both";
  onBack: () => void;
}) {
  const [targetLang, setTargetLang] = useState<Lang | "both">(initialLang);
  const [includeCover, setIncludeCover] = useState(true);
  const [includePreface, setIncludePreface] = useState(true);
  const [includeToc, setIncludeToc] = useState(true);
  const [includeLabs, setIncludeLabs] = useState(true);
  const [includeProjects, setIncludeProjects] = useState(true);
  const [includeQuizzes, setIncludeQuizzes] = useState(true);
  const [includeQuizSolutions, setIncludeQuizSolutions] = useState(true);
  const [includeGlossary, setIncludeGlossary] = useState(true);

  // Modal / Download state
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [htmlPayload, setHtmlPayload] = useState<string>("");
  const [copiedHtml, setCopiedHtml] = useState(false);

  const isDual = targetLang === "both";
  const primaryLang: Lang = isDual ? "el" : (targetLang === "en" ? "en" : "el");

  const triggerPrint = () => {
    window.print();
  };

  const downloadStandaloneHtml = () => {
    const fullHtml = generateStandaloneHtml(targetLang);
    setHtmlPayload(fullHtml);

    const blob = new Blob([fullHtml], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
    setDownloadModalOpen(true);

    const filename = `Cybersecurity101_Complete_Offline_${primaryLang.toUpperCase()}.html`;
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      if (document.body.contains(a)) {
        document.body.removeChild(a);
      }
    }, 500);
  };

  const copyToClipboard = () => {
    if (!htmlPayload) return;
    navigator.clipboard.writeText(htmlPayload);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 print:bg-white print:p-0 print:text-black">
      {/* Control Navigation Header (Hidden in Print) */}
      <div className="no-print mx-auto mb-8 max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <ArrowLeft size={15} /> {t("prev", primaryLang)}
            </button>
            <div>
              <h1 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen size={20} className="text-teal-600 dark:text-teal-400" />
                {targetLang === "en" ? "Full Book PDF Export" : "Εξαγωγή Ολόκληρου του Βιβλίου σε PDF"}
              </h1>
              <p className="text-xs text-slate-500">
                {targetLang === "en"
                  ? "High-resolution academic typography with cover page, TOC, full chapters, labs, projects, and 130 exam questions."
                  : "Ακαδημαϊκή τυπογραφία υψηλής ανάλυσης με εξώφυλλο, πίνακα περιεχομένων, πλήρη κεφάλαια, εργαστήρια, projects και 130 ερωτήσεις."}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={downloadStandaloneHtml}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <FileDown size={16} className="text-teal-600 dark:text-teal-400" />
              <span>{targetLang === "en" ? "Download Offline HTML" : "Λήψη Offline HTML"}</span>
            </button>
            <button
              onClick={triggerPrint}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-teal-600/30 transition hover:bg-teal-500 hover:scale-[1.02]"
            >
              <Printer size={16} />
              <span>{targetLang === "en" ? "Print / Save to PDF (Ctrl+P)" : "Εκτύπωση / Αποθήκευση PDF (Ctrl+P)"}</span>
            </button>
          </div>
        </div>

        {/* Options Bar */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-xs">
          <div>
            <label className="mb-1.5 block font-bold text-slate-700 dark:text-slate-300">
              {targetLang === "en" ? "Language Edition" : "Έκδοση Γλώσσας"}
            </label>
            <div className="flex rounded-lg border border-slate-200 p-1 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
              <button
                onClick={() => setTargetLang("el")}
                className={cn(
                  "flex-1 rounded-md py-1.5 font-bold transition",
                  targetLang === "el" ? "bg-teal-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
                )}
              >
                Ελληνικά
              </button>
              <button
                onClick={() => setTargetLang("en")}
                className={cn(
                  "flex-1 rounded-md py-1.5 font-bold transition",
                  targetLang === "en" ? "bg-teal-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
                )}
              >
                English
              </button>
              <button
                onClick={() => setTargetLang("both")}
                className={cn(
                  "flex-1 rounded-md py-1.5 font-bold transition",
                  targetLang === "both" ? "bg-teal-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
                )}
              >
                Δίγλωσσο
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="block font-bold text-slate-700 dark:text-slate-300">
              {targetLang === "en" ? "Frontmatter" : "Εισαγωγικά Μέρη"}
            </span>
            <div className="flex flex-wrap gap-2">
              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeCover}
                  onChange={(e) => setIncludeCover(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <span>{targetLang === "en" ? "Cover Page" : "Εξώφυλλο"}</span>
              </label>
              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includePreface}
                  onChange={(e) => setIncludePreface(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <span>{targetLang === "en" ? "Preface" : "Πρόλογος"}</span>
              </label>
              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeToc}
                  onChange={(e) => setIncludeToc(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <span>{targetLang === "en" ? "Table of Contents" : "Περιεχόμενα"}</span>
              </label>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="block font-bold text-slate-700 dark:text-slate-300">
              {targetLang === "en" ? "Labs & Projects" : "Εργαστήρια & Projects"}
            </span>
            <div className="flex flex-wrap gap-2">
              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeLabs}
                  onChange={(e) => setIncludeLabs(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <span>{targetLang === "en" ? "2h Labs & CLI" : "Εργαστήρια 2h & CLI"}</span>
              </label>
              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeProjects}
                  onChange={(e) => setIncludeProjects(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <span>{targetLang === "en" ? "Projects & Rubrics" : "Projects & Rubrics"}</span>
              </label>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="block font-bold text-slate-700 dark:text-slate-300">
              {targetLang === "en" ? "Quizzes & Key" : "Κουίζ & Απαντήσεις"}
            </span>
            <div className="flex flex-wrap gap-2">
              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeQuizzes}
                  onChange={(e) => setIncludeQuizzes(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <span>{targetLang === "en" ? "10 MCQs" : "10 Ερωτήσεις"}</span>
              </label>
              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeQuizSolutions}
                  onChange={(e) => setIncludeQuizSolutions(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <span>{targetLang === "en" ? "Answer Key" : "Αιτιολογήσεις"}</span>
              </label>
            </div>
          </div>
        </div>

        {/* Tip for PDF print */}
        <div className="mt-4 rounded-xl border border-teal-500/20 bg-teal-500/10 p-3 text-xs text-teal-800 dark:text-teal-300">
          <strong>💡 {targetLang === "en" ? "PDF Generation Tip" : "Συμβουλή για τέλειο PDF"}:</strong>{" "}
          {targetLang === "en"
            ? "In your browser's Print window (Ctrl+P or Cmd+P), set Destination to 'Save as PDF', Paper size to 'A4', Margins to 'Default', and ensure 'Background graphics' is ENABLED."
            : "Στο παράθυρο εκτύπωσης (Ctrl+P / Cmd+P), επιλέξτε Προορισμό 'Αποθήκευση ως PDF', Μέγεθος 'A4', Περιθώρια 'Προεπιλογή' και ενεργοποιήστε τα 'Γραφικά φόντου'."}
        </div>

        {/* Standalone Offline HTML Ready Modal / Banner */}
        {downloadModalOpen && (
          <div className="mt-5 rounded-2xl border-2 border-teal-500 bg-gradient-to-r from-teal-950 via-slate-900 to-slate-950 p-6 text-white shadow-2xl animate-fade-in">
            <div className="flex items-start justify-between gap-4 border-b border-teal-500/30 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-300 border border-teal-400/40">
                  <CheckCircle2 size={22} className="text-teal-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-teal-500/20 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-teal-300 border border-teal-400/30">
                      100% Self-Contained Offline HTML
                    </span>
                    <span className="text-xs text-slate-400">~1.2 MB Single File</span>
                  </div>
                  <h3 className="mt-1 text-base font-bold text-white">
                    {targetLang === "en"
                      ? "Standalone Offline HTML Package Generated!"
                      : "Το Αυτόνομο Ενιαίο Offline HTML Αρχείο είναι Έτοιμο!"}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setDownloadModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mt-3 text-xs text-slate-300 leading-relaxed">
              {targetLang === "en"
                ? "This single .html file includes embedded CSS stylesheets, complete typography, Table of Contents anchors, all 13 Chapters, 13 CLI Labs, 13 2-Hour Labs, 26 Projects, and 130 MCQs with solutions. It functions 100% offline without needing internet access."
                : "Το ενιαίο αρχείο .html περιέχει ενσωματωμένα όλα τα στυλ CSS, πλήρη τυπογραφία, πίνακα περιεχομένων, και τα 13 Κεφάλαια, 13 CLI Labs, 13 Εργαστήρια 2h, 26 Projects και 130 ερωτήσεις κουίζ με λύσεις. Λειτουργεί πλήρως offline χωρίς ανάγκη σύνδεσης στο διαδίκτυο."}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 pt-2">
              {downloadUrl && (
                <a
                  href={downloadUrl}
                  download={`Cybersecurity101_Complete_Offline_${primaryLang.toUpperCase()}.html`}
                  className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-md transition hover:bg-teal-400 hover:scale-[1.02]"
                >
                  <Download size={15} />
                  <span>{targetLang === "en" ? "Direct Download File" : "Άμεση Λήψη Αρχείου"}</span>
                </a>
              )}

              <a
                href={`/Cybersecurity101_Complete_Offline_${primaryLang === "el" ? "EL" : targetLang === "both" ? "Bilingual" : "EN"}.html`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-teal-400/40 bg-teal-500/20 px-4 py-2 text-xs font-bold text-teal-200 transition hover:bg-teal-500/30"
              >
                <ExternalLink size={15} />
                <span>{targetLang === "en" ? "Open in New Tab" : "Άνοιγμα σε Νέα Καρτέλα"}</span>
              </a>

              <button
                onClick={copyToClipboard}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold text-slate-200 transition hover:bg-white/10"
              >
                {copiedHtml ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
                <span>
                  {copiedHtml
                    ? targetLang === "en"
                      ? "HTML Copied!"
                      : "Αντιγράφηκε!"
                    : targetLang === "en"
                    ? "Copy Full HTML Source"
                    : "Αντιγραφή Πηγαίου Κώδικα HTML"}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Printable Book Container */}
      <div
        id="printable-book-content"
        className="mx-auto max-w-4xl bg-white p-8 text-slate-900 shadow-2xl print:max-w-none print:p-0 print:shadow-none"
        style={{ fontFamily: "'Noto Serif', Georgia, serif" }}
      >
        {/* =========================================================================
            1. BOOK COVER PAGE
           ========================================================================= */}
        {includeCover && (
          <section id="cover" className="page-break relative mb-16 flex min-h-[920px] flex-col justify-between overflow-hidden rounded-3xl bg-slate-950 p-12 text-white print:min-h-screen print:rounded-none print:p-14 border-8 border-teal-600">
            <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(20,184,166,.6), transparent 50%), radial-gradient(circle at 80% 80%, rgba(245,158,11,.4), transparent 50%)" }} />

            {/* Top metadata */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/20 pb-6">
              <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-teal-300">
                {bookMeta.edition[primaryLang]}
              </span>
              <span className="font-sans text-xs font-semibold text-slate-400">
                ISBN: 978-960-00-0000-0
              </span>
            </div>

            {/* Main title banner */}
            <div className="relative z-10 my-auto py-12">
              <div className="inline-block rounded-full bg-teal-500/20 px-4 py-1.5 font-sans text-xs font-bold text-teal-300 uppercase tracking-widest border border-teal-400/30 mb-6">
                Academic Textbook & Laboratory Manual
              </div>
              <h1 className="font-sans text-5xl font-black leading-tight tracking-tight sm:text-6xl text-white">
                {bookMeta.title[primaryLang]}
              </h1>
              {isDual && (
                <h2 className="font-sans text-3xl font-extrabold text-teal-200 mt-3">
                  {bookMeta.title[primaryLang === "el" ? "en" : "el"]}
                </h2>
              )}
              <p className="mt-6 font-sans text-xl font-normal leading-relaxed text-slate-300 max-w-2xl">
                {bookMeta.subtitle[primaryLang]}
              </p>
            </div>

            {/* Footer / Author info */}
            <div className="relative z-10 border-t border-white/20 pt-8 flex flex-wrap items-end justify-between gap-6 font-sans">
              <div>
                <div className="text-xs uppercase tracking-widest text-slate-400">Author & Curriculum Lead</div>
                <div className="text-2xl font-bold text-teal-300">{bookMeta.author}</div>
                <div className="text-xs text-slate-400 mt-1">Department of Informatics & Cybersecurity</div>
              </div>
              <div className="text-right text-xs text-slate-400 space-y-1">
                <div>13 Core Chapters · 26+ Laboratory Hours</div>
                <div>13 Technical Projects · 130 Multiple-Choice Questions</div>
                <div>XeLaTeX / PDF Digital Release 2026</div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            2. PREFACE & EDITORIAL NOTES
           ========================================================================= */}
        {includePreface && (
          <section id="preface" className="page-break mb-16 pt-8">
            <div className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
              {bookMeta.title[primaryLang]}
            </div>
            <h2 className="mb-6 font-sans text-3xl font-extrabold tracking-tight text-slate-900 border-b pb-3">
              {t("preface", primaryLang)}
            </h2>
            <div className="space-y-4 text-justify leading-relaxed text-slate-800 text-[10.5pt]">
              {preface[primaryLang].map((p, i) => (
                <p key={i}>
                  <Inline text={p} />
                </p>
              ))}
              {isDual && (
                <div className="mt-8 border-t pt-6">
                  <h3 className="font-sans text-xl font-bold text-teal-800 mb-4">Preface (English)</h3>
                  {preface.en.map((p, i) => (
                    <p key={i} className="mb-3">
                      <Inline text={p} />
                    </p>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* =========================================================================
            3. TABLE OF CONTENTS (TOC)
           ========================================================================= */}
        {includeToc && (
          <section id="toc" className="page-break mb-16 pt-8">
            <h2 className="mb-6 font-sans text-3xl font-extrabold tracking-tight text-slate-900 border-b pb-3">
              {t("contents", primaryLang)}
            </h2>

            <div className="space-y-8 font-sans">
              {parts.map((p) => {
                const chs = chapters.filter((c) => c.part === p.n);
                if (!chs.length) return null;

                return (
                  <div key={p.n} className="rounded-xl border border-slate-200 p-5 bg-slate-50/50">
                    <div className="font-sans text-xs font-bold uppercase tracking-wider text-teal-700">
                      {t("part", primaryLang)} {p.n} · {p.title[primaryLang]}
                    </div>
                    <div className="mt-3 divide-y divide-slate-200">
                      {chs.map((c) => (
                        <div key={c.n} className="py-2.5 flex flex-wrap items-start justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-slate-900 text-sm">
                              {c.n}. {c.title[primaryLang]}
                            </div>
                            <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                              {c.sections.map((s) => `${s.id} ${s.title[primaryLang]}`).join(" · ")}
                            </div>
                            <div className="mt-1 flex flex-wrap gap-1.5 text-[10.5px]">
                              <span className="rounded bg-teal-100 px-1.5 py-0.2 font-semibold text-teal-800">CLI Lab</span>
                              <span className="rounded bg-sky-100 px-1.5 py-0.2 font-semibold text-sky-800">2h Practical Lab</span>
                              <span className="rounded bg-amber-100 px-1.5 py-0.2 font-semibold text-amber-800">Project 1: Architecture</span>
                              <span className="rounded bg-teal-100 px-1.5 py-0.2 font-semibold text-teal-800">Project 2: Applied Tool</span>
                              <span className="rounded bg-purple-100 px-1.5 py-0.2 font-semibold text-purple-800">10 Exam MCQs</span>
                            </div>
                          </div>
                          <div className="text-xs font-semibold text-slate-400 shrink-0">
                            {c.hours} {t("hours", primaryLang)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* =========================================================================
            4. ALL CHAPTERS (1 THROUGH 13)
           ========================================================================= */}
        {chapters.map((ch) => {
          const part = parts.find((p) => p.n === ch.part);

          return (
            <article key={ch.n} id={`ch-${ch.n}`} className="page-break-before mb-20 pt-4">
              {/* Chapter Header Banner */}
              <header className="mb-10 rounded-2xl bg-slate-900 p-8 text-white">
                <div className="flex flex-wrap items-center justify-between gap-2 font-sans text-xs font-semibold text-teal-300 border-b border-slate-800 pb-3">
                  <span>
                    {t("part", primaryLang)} {ch.part} · {part?.title[primaryLang]}
                  </span>
                  <span>
                    {t("chapter", primaryLang)} {ch.n} · {ch.hours} {t("hours", primaryLang)}
                  </span>
                </div>
                <h2 className="mt-4 font-sans text-3xl font-black text-white">
                  {ch.n}. {ch.title[primaryLang]}
                </h2>
                {isDual && (
                  <h3 className="mt-1 font-sans text-xl font-bold text-teal-300">
                    {ch.title[primaryLang === "el" ? "en" : "el"]}
                  </h3>
                )}
                <p className="mt-3 font-sans text-sm text-slate-300 leading-relaxed">
                  {ch.subtitle[primaryLang]}
                </p>
              </header>

              {/* Learning Outcomes */}
              <div className="avoid-break mb-8 rounded-xl border border-teal-200 bg-teal-50/70 p-5 font-sans">
                <div className="font-bold uppercase tracking-wide text-teal-900 text-xs mb-2">
                  🎯 {t("outcomes", primaryLang)}
                </div>
                <ul className="space-y-1.5 text-xs text-slate-800">
                  {ch.outcomes[primaryLang].map((o, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-teal-600 font-bold">✓</span>
                      <span><Inline text={o} /></span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chapter Intro */}
              <div className="mb-8 space-y-4 text-justify leading-relaxed text-[10.5pt]">
                {ch.intro[primaryLang].map((p, i) => (
                  <p key={i}>
                    <Inline text={p} />
                  </p>
                ))}
              </div>

              {/* Sections */}
              <div className="space-y-10">
                {ch.sections.map((s) => (
                  <section key={s.id} className="avoid-break space-y-3">
                    <h3 className="font-sans text-xl font-bold text-slate-900 border-b border-slate-200 pb-1.5 flex items-baseline gap-2">
                      <span className="text-teal-700 font-mono text-base">{s.id}</span>
                      <span>{s.title[primaryLang]}</span>
                    </h3>
                    <div className="space-y-3 text-justify leading-relaxed text-[10pt]">
                      {s.body[primaryLang].map((b, i) => (
                        <BlockView key={i} b={b} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              {/* Key Terms */}
              <div className="avoid-break my-10 rounded-xl border border-slate-200 p-5 bg-slate-50">
                <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-slate-800 mb-3">
                  📖 {t("terms", primaryLang)}
                </h4>
                <dl className="grid gap-3 sm:grid-cols-2 text-xs font-sans">
                  {ch.terms[primaryLang].map((k, i) => (
                    <div key={i} className="rounded-lg bg-white p-3 border border-slate-200">
                      <dt className="font-bold text-teal-800">{k.term}</dt>
                      <dd className="text-slate-600 mt-1">{k.def}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Summary */}
              <div className="avoid-break my-10 rounded-xl bg-slate-900 p-6 text-white font-sans text-xs">
                <h4 className="font-bold uppercase tracking-wider text-teal-300 mb-3">
                  📌 {t("summary", primaryLang)}
                </h4>
                <ul className="space-y-2 text-slate-200">
                  {ch.summary[primaryLang].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-teal-400 font-bold">•</span>
                      <span><Inline text={item} /></span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Review Questions */}
              <div className="avoid-break my-10 rounded-xl border border-slate-200 p-5">
                <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-slate-800 mb-3">
                  ✍️ {t("questions", primaryLang)}
                </h4>
                <ol className="space-y-2.5 text-xs text-slate-700 list-decimal list-inside leading-relaxed">
                  {ch.questions[primaryLang].map((q, i) => (
                    <li key={i} className="pl-1">
                      <Inline text={q} />
                    </li>
                  ))}
                </ol>
              </div>

              {/* =========================================================================
                  A. INTERACTIVE CLI SIMULATED LAB
                 ========================================================================= */}
              {includeLabs && ch.cliLab && (
                <div className="avoid-break my-10 rounded-2xl border-2 border-teal-600 bg-slate-950 p-6 text-white font-sans">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Terminal size={18} className="text-teal-400" />
                      <h4 className="font-bold text-base text-white">
                        {ch.cliLab.title[primaryLang]}
                      </h4>
                    </div>
                    <span className="rounded bg-teal-500/20 px-2 py-0.5 text-[10px] font-bold text-teal-300 uppercase">
                      CLI Sandbox Lab
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-300">{ch.cliLab.scenario[primaryLang]}</p>

                  <div className="mt-4 space-y-3">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Lab Missions & Expected Solutions:
                    </div>
                    {ch.cliLab.tasks.map((task, idx) => (
                      <div key={task.id} className="rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs">
                        <div className="font-bold text-teal-300">
                          {idx + 1}. {task.title[primaryLang]}
                        </div>
                        <p className="text-slate-400 mt-1">{task.description[primaryLang]}</p>
                        <div className="mt-2 rounded bg-black/60 p-2 font-mono text-[11px] text-emerald-400">
                          $ {task.solution}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* =========================================================================
                  B. 2-HOUR TECHNICAL HANDS-ON LAB
                 ========================================================================= */}
              {includeLabs && ch.handsOnLab && (
                <div className="avoid-break my-10 rounded-2xl border border-slate-300 bg-slate-50 p-6 font-sans">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2">
                      <Wrench size={18} className="text-teal-700" />
                      <h4 className="font-bold text-base text-slate-900">
                        {ch.handsOnLab.title[primaryLang]}
                      </h4>
                    </div>
                    <span className="rounded bg-teal-100 px-2.5 py-1 text-xs font-bold text-teal-800">
                      {ch.handsOnLab.duration[primaryLang]}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {ch.handsOnLab.overview[primaryLang]}
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {ch.handsOnLab.phases.map((phase) => (
                      <div key={phase.phaseNumber} className="rounded-xl border border-slate-200 bg-white p-3.5 text-xs">
                        <div className="font-bold text-teal-800">
                          Phase {phase.phaseNumber}: {phase.title[primaryLang]}
                        </div>
                        <div className="text-[11px] font-semibold text-slate-400 mt-0.5">
                          Duration: {phase.estimatedTime[primaryLang]}
                        </div>
                        <ul className="mt-2 space-y-1 text-slate-600">
                          {phase.objectives[primaryLang].map((obj, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span>•</span> <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* =========================================================================
                  C. CAPSTONE TECHNICAL PROJECT (PROJECT 1: ENTERPRISE ARCHITECTURE)
                 ========================================================================= */}
              {includeProjects && ch.technicalProject && (
                <div className="avoid-break my-10 rounded-2xl border border-amber-300 bg-amber-50/40 p-6 font-sans">
                  <div className="border-b border-amber-200 pb-3 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs uppercase tracking-wider text-amber-700">
                        {ch.technicalProject.category ? ch.technicalProject.category[primaryLang] : "Project 1: Enterprise Architecture & Assessment Blueprint"}
                      </div>
                      <h4 className="font-bold text-base text-slate-900 mt-1">
                        {ch.technicalProject.title[primaryLang]}
                      </h4>
                    </div>
                    <span className="rounded bg-amber-200/80 px-2.5 py-1 text-xs font-bold text-amber-900">
                      Architecture Project
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-700 leading-relaxed">
                    {ch.technicalProject.scenario[primaryLang]}
                  </p>

                  <div className="mt-4 space-y-3">
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Project Milestones & Detailed Implementation Prompts:
                    </div>
                    {ch.technicalProject.milestones.map((m) => (
                      <div key={m.milestoneNumber} className="rounded-xl border border-amber-200/80 bg-white p-3.5 text-xs">
                        <div className="font-bold text-amber-900">
                          M{m.milestoneNumber}: {m.title[primaryLang]}
                        </div>
                        <p className="text-slate-600 mt-1">{m.description[primaryLang]}</p>
                        {m.detailedSpec && (
                          <div className="mt-2 rounded-lg bg-slate-900 p-2.5 text-[11px] text-teal-300 font-mono space-y-1">
                            <div className="text-amber-400 font-bold uppercase text-[10px]">Technical Specifications:</div>
                            {m.detailedSpec[primaryLang].map((spec, sIdx) => (
                              <div key={sIdx}>▶ {spec}</div>
                            ))}
                          </div>
                        )}
                        <div className="mt-2 text-[11px] font-semibold text-slate-500">
                          Deliverable: {m.deliverable[primaryLang]}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 overflow-x-auto">
                    <table className="text-xs bg-white">
                      <thead>
                        <tr>
                          <th>Criterion</th>
                          <th>Weight</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ch.technicalProject.rubric.map((r, i) => (
                          <tr key={i}>
                            <td className="font-bold">{r.criterion[primaryLang]}</td>
                            <td className="font-mono text-teal-700 font-bold">{r.weight}</td>
                            <td>{r.description[primaryLang]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  C2. APPLIED SOFTWARE & TOOL ENGINEERING PROJECT (PROJECT 2: BUILD YOUR OWN TOOL)
                 ========================================================================= */}
              {includeProjects && ch.appliedProject && (
                <div className="avoid-break my-10 rounded-2xl border border-teal-300 bg-teal-50/40 p-6 font-sans">
                  <div className="border-b border-teal-200 pb-3 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs uppercase tracking-wider text-teal-700">
                        {ch.appliedProject.category ? ch.appliedProject.category[primaryLang] : "Project 2: Applied Tool Construction & Software Engineering"}
                      </div>
                      <h4 className="font-bold text-base text-slate-900 mt-1">
                        {ch.appliedProject.title[primaryLang]}
                      </h4>
                    </div>
                    <span className="rounded bg-teal-200/80 px-2.5 py-1 text-xs font-bold text-teal-900">
                      Build Your Own Tool
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-700 leading-relaxed">
                    {ch.appliedProject.scenario[primaryLang]}
                  </p>

                  <div className="mt-4 space-y-3">
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Implementation Milestones & Software Specifications:
                    </div>
                    {ch.appliedProject.milestones.map((m) => (
                      <div key={m.milestoneNumber} className="rounded-xl border border-teal-200/80 bg-white p-3.5 text-xs">
                        <div className="font-bold text-teal-900">
                          M{m.milestoneNumber}: {m.title[primaryLang]}
                        </div>
                        <p className="text-slate-600 mt-1">{m.description[primaryLang]}</p>
                        {m.detailedSpec && (
                          <div className="mt-2 rounded-lg bg-slate-950 p-2.5 text-[11px] text-teal-300 font-mono space-y-1">
                            <div className="text-teal-400 font-bold uppercase text-[10px]">Detailed Engineering Requirements:</div>
                            {m.detailedSpec[primaryLang].map((spec, sIdx) => (
                              <div key={sIdx}>▶ {spec}</div>
                            ))}
                          </div>
                        )}
                        <div className="mt-2 text-[11px] font-semibold text-slate-500">
                          Deliverable: {m.deliverable[primaryLang]}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 overflow-x-auto">
                    <table className="text-xs bg-white">
                      <thead>
                        <tr>
                          <th>Criterion</th>
                          <th>Weight</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ch.appliedProject.rubric.map((r, i) => (
                          <tr key={i}>
                            <td className="font-bold">{r.criterion[primaryLang]}</td>
                            <td className="font-mono text-teal-700 font-bold">{r.weight}</td>
                            <td>{r.description[primaryLang]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  D. 10-QUESTION MULTIPLE CHOICE QUIZ (A-E)
                 ========================================================================= */}
              {includeQuizzes && ch.quiz && ch.quiz.length > 0 && (
                <div className="avoid-break my-10 rounded-2xl border border-amber-300 bg-amber-50/30 p-6 font-sans">
                  <div className="border-b border-amber-200 pb-3 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-base text-slate-900 flex items-center gap-2">
                        <HelpCircle size={18} className="text-amber-600" />
                        {primaryLang === "en" ? `Chapter ${ch.n} Comprehensive Exam Quiz` : `Εξεταστικό Κουίζ Κεφαλαίου ${ch.n}`}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {primaryLang === "en" ? "10 Questions · 5 Options (A–E) · 1 Correct Answer" : "10 Ερωτήσεις · 5 Επιλογές (A–E) · 1 Σωστή Απάντηση"}
                      </p>
                    </div>
                    <span className="rounded bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">
                      10 MCQs
                    </span>
                  </div>

                  <div className="mt-5 space-y-6 text-xs">
                    {ch.quiz.map((q, idx) => {
                      const letters = ["A", "B", "C", "D", "E"];

                      return (
                        <div key={q.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                          <div className="font-bold text-slate-900 text-sm">
                            {idx + 1}. {q.question[primaryLang]}
                          </div>

                          <div className="mt-3 space-y-1.5 pl-2">
                            {q.options[primaryLang].map((opt, oIdx) => (
                              <div
                                key={oIdx}
                                className={cn(
                                  "flex items-start gap-2 rounded-lg p-2 leading-relaxed",
                                  includeQuizSolutions && oIdx === q.correctIndex
                                    ? "bg-emerald-50 text-emerald-950 font-semibold border border-emerald-300"
                                    : "text-slate-700 hover:bg-slate-50"
                                )}
                              >
                                <span className={cn(
                                  "font-mono font-bold shrink-0 rounded px-1.5 py-0.5 text-[11px]",
                                  includeQuizSolutions && oIdx === q.correctIndex
                                    ? "bg-emerald-600 text-white"
                                    : "bg-slate-200 text-slate-700"
                                )}>
                                  {letters[oIdx]}
                                </span>
                                <span>{opt}</span>
                              </div>
                            ))}
                          </div>

                          {includeQuizSolutions && q.explanation && (
                            <div className="mt-3 rounded-lg bg-emerald-50/70 border border-emerald-200 p-2.5 text-[11px] text-emerald-900 leading-relaxed">
                              <strong>💡 {primaryLang === "en" ? "Answer Rationale" : "Αιτιολόγηση"}:</strong>{" "}
                              {q.explanation[primaryLang]}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </article>
          );
        })}

        {/* =========================================================================
            5. APPENDIX & GLOSSARY
           ========================================================================= */}
        {includeGlossary && (
          <section className="page-break-before mt-16 pt-8 font-sans">
            <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-900 border-b pb-3">
              {primaryLang === "en" ? "Appendix: Core Principles & Terminology" : "Παράρτημα: Θεμελιώδεις Αρχές & Ορολογία"}
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-teal-800 mb-3">
                  {primaryLang === "en" ? "Editorial & Pedagogical Principles" : "Επιμελητικές & Παιδαγωγικές Αρχές"}
                </h3>
                <div className="space-y-2 text-xs">
                  {principles[primaryLang] && principles[primaryLang].map((p, i) => (
                    <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                      <div className="text-slate-800 font-medium">• {p}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-teal-800 mb-3">
                  {primaryLang === "en" ? "Master Security Terminology Concordance" : "Κεντρικό Γλωσσάριο Ασφάλειας & Αντιστοίχιση Όρων"}
                </h3>
                <div className="overflow-x-auto">
                  <table className="text-xs">
                    <thead>
                      <tr>
                        <th>Term (English)</th>
                        <th>Όρος (Ελληνικά)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {terminology && terminology.map(([enTerm, elTerm], i) => (
                        <tr key={i}>
                          <td className="font-bold font-mono text-teal-900">{enTerm}</td>
                          <td className="font-bold">{elTerm}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

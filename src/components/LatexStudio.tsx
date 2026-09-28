import { useMemo, useState } from "react";
import JSZip from "jszip";
import { Check, Copy, Download, ExternalLink, FileArchive, FileText, Folder, RotateCcw, Terminal } from "lucide-react";
import type { Lang } from "../content/types";
import { latexProject, singleFile } from "../latex/generate";
import { cn } from "../utils/cn";

const STORE = "cf2_latex_edits";

function download(name: string, data: Blob | string) {
  const blob = typeof data === "string" ? new Blob([data], { type: "text/x-tex;charset=utf-8" }) : data;
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

function openInOverleaf(tex: string, name: string) {
  const f = document.createElement("form");
  f.method = "POST";
  f.action = "https://www.overleaf.com/docs";
  f.target = "_blank";
  const add = (k: string, v: string) => { const i = document.createElement("input"); i.type = "hidden"; i.name = k; i.value = v; f.appendChild(i); };
  add("encoded_snip", encodeURIComponent(tex));
  add("snip_name", name);
  add("engine", "xelatex");
  document.body.appendChild(f);
  f.submit();
  f.remove();
}

export default function LatexStudio({ lang }: { lang: Lang }) {
  const L = (en: string, el: string) => (lang === "en" ? en : el);
  const generated = useMemo(() => latexProject(), []);
  const [edits, setEdits] = useState<Record<string, string>>(() => {
    try { return JSON.parse(localStorage.getItem(STORE) || "{}"); } catch { return {}; }
  });
  const files = useMemo(() => ({ ...generated, ...edits }), [generated, edits]);
  const paths = Object.keys(generated).sort((a, b) => a.split("/").length - b.split("/").length || a.localeCompare(b));
  const [sel, setSel] = useState(`chapters/${lang}/ch01.tex`);
  const [copied, setCopied] = useState(false);

  const update = (v: string) => {
    const next = { ...edits, [sel]: v };
    setEdits(next);
    try { localStorage.setItem(STORE, JSON.stringify(next)); } catch { /* quota */ }
  };
  const reset = () => {
    const next = { ...edits };
    delete next[sel];
    setEdits(next);
    try { localStorage.setItem(STORE, JSON.stringify(next)); } catch { /* ignore */ }
  };

  const zipAll = async () => {
    const zip = new JSZip();
    Object.entries(files).forEach(([p, c]) => zip.file(`cybersecurity-fundamentals-latex/${p}`, c));
    zip.file("cybersecurity-fundamentals-latex/single/book-en.tex", singleFile("en"));
    zip.file("cybersecurity-fundamentals-latex/single/book-el.tex", singleFile("el"));
    download("cybersecurity-fundamentals-latex.zip", await zip.generateAsync({ type: "blob" }));
  };

  const groups = paths.reduce<Record<string, string[]>>((acc, p) => {
    const dir = p.includes("/") ? p.slice(0, p.lastIndexOf("/")) : "";
    (acc[dir] ||= []).push(p);
    return acc;
  }, {});

  const content = files[sel] ?? "";
  const lines = content.split("\n").length;

  return (
    <div className="fade-up">
      <div className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">LaTeX</div>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight">{L("LaTeX studio", "Εργαστήριο LaTeX")}</h1>
      <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-400">
        {L(
          "The complete book is available as an editable XeLaTeX project, generated from the same bilingual source as this reader. Edit any file below (changes are saved in your browser), then download the project or open it directly in Overleaf.",
          "Ολόκληρο το βιβλίο διατίθεται ως επεξεργάσιμο έργο XeLaTeX, που παράγεται από την ίδια δίγλωσση πηγή με αυτή την εφαρμογή ανάγνωσης. Επεξεργαστείτε οποιοδήποτε αρχείο παρακάτω (οι αλλαγές αποθηκεύονται στον browser σας) και, στη συνέχεια, κατεβάστε το έργο ή ανοίξτε το απευθείας στο Overleaf."
        )}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <button onClick={zipAll} className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-teal-500"><FileArchive size={16} /> {L("Download full project (.zip)", "Λήψη πλήρους έργου (.zip)")}</button>
        {(["en", "el"] as Lang[]).map((l) => (
          <button key={l} onClick={() => download(`book-${l}.tex`, singleFile(l))} className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"><Download size={15} /> book-{l}.tex</button>
        ))}
        {(["en", "el"] as Lang[]).map((l) => (
          <button key={`o-${l}`} onClick={() => openInOverleaf(singleFile(l), `book-${l}.tex`)} className="inline-flex items-center gap-2 rounded-full border border-emerald-300 px-4 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 dark:border-emerald-500/40 dark:text-emerald-300 dark:hover:bg-emerald-500/10"><ExternalLink size={15} /> Overleaf · {l.toUpperCase()}</button>
        ))}
      </div>

      <div className="mt-6 grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-[260px_1fr]">
        {/* Tree */}
        <div className="max-h-[70vh] overflow-y-auto border-b border-slate-200 bg-slate-50 p-3 scroll-thin dark:border-slate-800 dark:bg-slate-950/50 lg:border-b-0 lg:border-r">
          {Object.entries(groups).map(([dir, ps]) => (
            <div key={dir || "root"} className="mb-2">
              {dir && <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-bold text-slate-500"><Folder size={13} /> {dir}/</div>}
              {ps.map((p) => (
                <button key={p} onClick={() => setSel(p)} className={cn("flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left font-mono text-[12px] transition", dir && "pl-5", sel === p ? "bg-teal-600 text-white" : "text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800")}>
                  <FileText size={13} className="shrink-0" /> <span className="truncate">{p.split("/").pop()}</span>
                  {edits[p] !== undefined && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-amber-400" title="edited" />}
                </button>
              ))}
            </div>
          ))}
        </div>
        {/* Editor */}
        <div className="flex min-w-0 flex-col">
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 px-4 py-2 dark:border-slate-800">
            <span className="font-mono text-xs font-semibold">{sel}</span>
            <span className="text-[11px] text-slate-400">{lines} {L("lines", "γραμμές")}</span>
            <div className="ml-auto flex gap-1">
              <button onClick={async () => { await navigator.clipboard.writeText(content); setCopied(true); setTimeout(() => setCopied(false), 1200); }} className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">{copied ? <Check size={13} /> : <Copy size={13} />} {L("Copy", "Αντιγραφή")}</button>
              <button onClick={() => download(sel.split("/").pop()!, content)} className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"><Download size={13} /> {L("File", "Αρχείο")}</button>
              {edits[sel] !== undefined && <button onClick={reset} className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-amber-700 hover:bg-amber-50 dark:text-amber-300 dark:hover:bg-amber-500/10"><RotateCcw size={13} /> {L("Reset", "Επαναφορά")}</button>}
            </div>
          </div>
          <textarea
            value={content}
            onChange={(e) => update(e.target.value)}
            spellCheck={false}
            className="h-[64vh] w-full resize-none bg-slate-950 p-5 font-mono text-[12.5px] leading-relaxed text-slate-200 outline-none scroll-thin"
          />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2 font-bold"><Terminal size={17} className="text-teal-600" /> {L("Compile locally", "Τοπική μεταγλώττιση")}</div>
        <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-4 font-mono text-[12.5px] text-teal-200">{`latexmk -xelatex main-en.tex   # English edition
latexmk -xelatex main-el.tex   # Ελληνική έκδοση
# or regenerate from the app sources:
npx tsx scripts/export-latex.ts`}</pre>
        <p className="mt-3 text-sm text-slate-500">{L("XeLaTeX or LuaLaTeX is required for Greek and Unicode. Fonts: Libertinus (included in TeX Live and Overleaf).", "Απαιτείται XeLaTeX ή LuaLaTeX για τα ελληνικά και το Unicode. Γραμματοσειρές: Libertinus (περιλαμβάνονται στο TeX Live και στο Overleaf).")}</p>
      </div>
    </div>
  );
}

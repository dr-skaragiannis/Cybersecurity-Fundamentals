import { AlertTriangle, ArrowDown, CheckCircle2, CircleAlert, Info } from "lucide-react";
import type { Lang } from "../content/types";
import { analysisStats, chapters, findings, principles, terminology } from "../content/book";
import { chapterWords } from "./ChapterView";
import { cn } from "../utils/cn";

const sevStyle = {
  high: { cls: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300", icon: AlertTriangle, en: "High impact", el: "Υψηλή επίδραση" },
  medium: { cls: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300", icon: CircleAlert, en: "Medium", el: "Μέτρια" },
  low: { cls: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300", icon: Info, en: "Low", el: "Χαμηλή" },
};

// Explanatory prose (numbered sections only, excluding tables, labs and quizzes) in the original source, measured from index.html.
const originalWords = [1123, 662, 841, 583, 568, 875, 745, 882, 647, 538, 1092, 926, 1397];

export default function Report({ lang }: { lang: Lang }) {
  const L = (en: string, el: string) => (lang === "en" ? en : el);
  return (
    <div className="fade-up mx-auto max-w-5xl">
      <div className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">{L("Editorial analysis", "Επιμελητική ανάλυση")}</div>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight">{L("What was wrong with the text — and how it was fixed", "Τι δεν λειτουργούσε στο κείμενο — και πώς διορθώθηκε")}</h1>
      <p className="mt-4 max-w-3xl font-serif text-lg leading-relaxed text-slate-600 dark:text-slate-400">
        {L(
          "The source (index.html from the repository) embeds the book as English HTML plus a runtime Greek translation layer. Both language versions were analysed paragraph by paragraph. The English was accurate but often compressed into note form; the Greek was assembled from thousands of isolated fragments. The findings below guided the complete rewrite presented in this edition.",
          "Η πηγή (το index.html του αποθετηρίου) περιέχει το βιβλίο ως αγγλικό HTML και ένα επίπεδο ελληνικής μετάφρασης που εφαρμόζεται κατά την εκτέλεση. Και οι δύο γλωσσικές εκδοχές αναλύθηκαν ανά παράγραφο. Το αγγλικό κείμενο ήταν ακριβές, αλλά συχνά συμπιεσμένο σε μορφή σημειώσεων· το ελληνικό συντίθετο από χιλιάδες μεμονωμένα αποσπάσματα. Τα ευρήματα που ακολουθούν καθοδήγησαν την πλήρη αναθεώρηση της παρούσας έκδοσης."
        )}
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {analysisStats.map((s) => (
          <div key={s.value} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="text-3xl font-extrabold text-teal-600 dark:text-teal-400">{s.value}</div>
            <div className="mt-1 text-xs text-slate-500">{s.label[lang]}</div>
          </div>
        ))}
      </div>

      <h2 className="mt-14 text-2xl font-extrabold tracking-tight">{L("Findings", "Ευρήματα")}</h2>
      <div className="mt-5 space-y-5">
        {findings.map((f, i) => {
          const st = sevStyle[f.sev];
          return (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-wrap items-center gap-3">
                <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold", st.cls)}><st.icon size={12} /> {st[lang]}</span>
                <h3 className="text-lg font-bold">{f.title[lang]}</h3>
              </div>
              <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-400">{f.detail[lang]}</p>
              {f.before && f.after && (
                <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
                  <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-4 dark:border-rose-500/20 dark:bg-rose-500/5">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-rose-600">{L("Original", "Αρχικό")}</div>
                    <p className="mt-1 font-serif text-sm text-slate-700 line-through decoration-rose-300/70 dark:text-slate-300">{f.before}</p>
                  </div>
                  <div className="flex items-center justify-center text-slate-300"><ArrowDown className="md:-rotate-90" size={20} /></div>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/5">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">{L("Revised", "Αναθεωρημένο")}</div>
                    <p className="mt-1 font-serif text-sm text-slate-700 dark:text-slate-300">{f.after[lang]}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-slate-900 p-7 text-white">
          <h2 className="text-xl font-extrabold">{L("Editorial principles applied", "Επιμελητικές αρχές που εφαρμόστηκαν")}</h2>
          <ul className="mt-4 space-y-3">
            {principles[lang].map((p, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-slate-300"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-teal-400" /> {p}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-extrabold">{L("Prose length per chapter (English)", "Έκταση κειμένου ανά κεφάλαιο (αγγλικά)")}</h2>
          <p className="mt-1 text-xs text-slate-500">{L("Explanatory prose of the numbered sections: original vs. revised (words).", "Επεξηγηματικό κείμενο των αριθμημένων ενοτήτων: αρχικό έναντι αναθεωρημένου (λέξεις).")}</p>
          <div className="mt-4 space-y-2">
            {chapters.map((c) => {
              const w = chapterWords(c, "en");
              const o = originalWords[c.n - 1];
              const max = 2000;
              return (
                <div key={c.n} className="grid grid-cols-[2rem_1fr] items-center gap-2 text-xs">
                  <span className="font-mono text-slate-400">{c.n}</span>
                  <div className="space-y-1">
                    <div className="h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" style={{ width: `${(o / max) * 100}%` }} title={`${o}`} />
                    <div className="h-1.5 rounded-full bg-teal-500" style={{ width: `${(w / max) * 100}%` }} title={`${w}`} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex gap-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1"><span className="h-2 w-4 rounded bg-slate-300 dark:bg-slate-700" /> {L("original prose", "αρχικό κείμενο")}</span>
            <span className="flex items-center gap-1"><span className="h-2 w-4 rounded bg-teal-500" /> {L("revised prose", "αναθεωρημένο κείμενο")}</span>
          </div>
        </div>
      </div>

      <h2 className="mt-14 text-2xl font-extrabold tracking-tight">{L("Terminology concordance (EN → ΕΛ)", "Πίνακας αντιστοίχισης ορολογίας (EN → ΕΛ)")}</h2>
      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left dark:bg-slate-800">
            <tr><th className="px-4 py-3">English</th><th className="px-4 py-3">Ελληνικά</th></tr>
          </thead>
          <tbody>
            {terminology.map(([a, b]) => (
              <tr key={a} className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                <td className="px-4 py-2.5 font-medium">{a}</td><td className="px-4 py-2.5 text-slate-600 dark:text-slate-300">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

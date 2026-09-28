import { ArrowRight, BookOpen, CheckCircle2, Cpu, FileCode2, FlaskConical, FolderGit2, HelpCircle, Languages, MonitorPlay, Printer, ShieldCheck, Sparkles, Terminal } from "lucide-react";
import type { Lang } from "../content/types";
import { bookMeta, chapters, parts, preface } from "../content/book";
import { t } from "../i18n";
import { Inline } from "./Blocks";
import { chapterWords } from "./ChapterView";

export default function Home({ lang, go }: { lang: Lang; go: (h: string) => void }) {
  const totalWords = chapters.reduce((a, c) => a + chapterWords(c, "en") + chapterWords(c, "el"), 0);
  const totalQuizQuestions = chapters.reduce((a, c) => a + (c.quiz?.length || 0), 0);
  const totalCliTasks = chapters.reduce((a, c) => a + (c.cliLab?.tasks?.length || 0), 0);

  const stats = [
    { v: chapters.length, l: lang === "en" ? "Interactive Chapters" : "Διαδραστικά Κεφάλαια" },
    { v: "39 Hours", l: lang === "en" ? "Curriculum Lectures (13×3h)" : "Διαλέξεις Διδασκαλίας (13×3ω)" },
    { v: "26h+", l: lang === "en" ? "Guided Hands-on Labs" : "Καθοδηγούμενα Εργαστήρια" },
    { v: totalQuizQuestions, l: lang === "en" ? "Interactive 5-Choice MCQs" : "Ερωτήσεις Κουίζ 5 Επιλογών" },
  ];

  return (
    <div className="fade-up space-y-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 px-8 py-14 text-white shadow-2xl sm:px-14 sm:py-20 border border-slate-800">
        <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 15% 20%, rgba(20,184,166,.45), transparent 40%), radial-gradient(circle at 85% 70%, rgba(245,158,11,.30), transparent 45%), radial-gradient(circle at 50% 50%, rgba(99,102,241,.25), transparent 50%)" }} />
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/10 px-3.5 py-1 text-xs font-semibold text-teal-300 backdrop-blur-md">
            <Sparkles size={14} className="animate-pulse" /> {bookMeta.edition[lang]} · {lang === "en" ? "Bilingual Interactive Platform" : "Δίγλωσση Διαδραστική Πλατφόρμα"}
          </div>
          <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl text-white">{bookMeta.title[lang]}</h1>
          <p className="mt-4 text-lg text-slate-300 sm:text-xl font-normal leading-relaxed">{bookMeta.subtitle[lang]}</p>
          <p className="mt-3 text-sm text-slate-400">{bookMeta.title[lang === "en" ? "el" : "en"]} · <span className="text-teal-400">{bookMeta.author}</span></p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button onClick={() => go("ch-1")} className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-teal-500/30 transition hover:bg-teal-400 hover:scale-[1.02]">
              <BookOpen size={17} /> {t("start", lang)} <ArrowRight size={16} />
            </button>
            <button onClick={() => go("sandbox")} className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/30 transition hover:bg-emerald-500 hover:scale-[1.02]">
              <Terminal size={17} /> {t("labSandboxNav", lang)}
            </button>
            <button onClick={() => go("presentation")} className="inline-flex items-center gap-2 rounded-full border border-teal-400/50 bg-teal-500/25 px-6 py-3.5 text-sm font-bold text-teal-200 shadow-md transition hover:bg-teal-500/35 backdrop-blur-md">
              <MonitorPlay size={17} /> {t("presentation", lang)}
            </button>
            <button onClick={() => go("pdf")} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold transition hover:bg-white/15 backdrop-blur-md">
              <Printer size={17} /> {t("pdfBook", lang)}
            </button>
            <button onClick={() => go("latex")} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold transition hover:bg-white/15 backdrop-blur-md">
              <FileCode2 size={17} /> LaTeX Studio
            </button>
          </div>
        </div>
        <div className="relative mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:border-teal-500/30 hover:bg-white/10">
              <div className="text-3xl font-black text-teal-300">{s.v}</div>
              <div className="mt-1 text-xs text-slate-300 font-medium">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Platform Highlights */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div onClick={() => go("presentation")} className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition hover:border-teal-400 hover:shadow-md">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400">
            <MonitorPlay size={22} />
          </div>
          <h3 className="mt-4 font-bold text-slate-900 dark:text-slate-100">{lang === "en" ? "13-Chapter Slide Deck" : "Παρουσίαση 13 Διαλέξεων"}</h3>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            {lang === "en" ? "Structured 3-hour lecture slides with architectural diagrams, case studies, and speaker notes." : "Διαφάνειες 3-ωρης διδασκαλίας ανά κεφάλαιο με αρχιτεκτονικά σχήματα και case studies."}
          </p>
        </div>

        <div onClick={() => go("ch-1:cli-lab")} className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition hover:border-blue-400 hover:shadow-md">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
            <Terminal size={22} />
          </div>
          <h3 className="mt-4 font-bold text-slate-900 dark:text-slate-100">{lang === "en" ? "Interactive CLI Terminal" : "Διαδραστικό Τερματικό CLI"}</h3>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            {lang === "en" ? "Practice real tools (Wireshark, OpenSSL, iptables, Snort, Volatility) directly in your browser." : "Εξασκηθείτε σε πραγματικά εργαλεία απευθείας στον περιηγητή με αυτόματη επικύρωση."}
          </p>
        </div>

        <div onClick={() => go("ch-1:hands-on-lab")} className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition hover:border-purple-400 hover:shadow-md">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">
            <FlaskConical size={22} />
          </div>
          <h3 className="mt-4 font-bold text-slate-900 dark:text-slate-100">{lang === "en" ? "2-Hour Hands-on Labs" : "Εργαστήρια 2 Ωρών"}</h3>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            {lang === "en" ? "Full 120-minute structured laboratories with step-by-step commands, deliverables, and checklists." : "Ολοκληρωμένα εργαστήρια 120 λεπτών με αναλυτικά βήματα, παραδοτέα και λίστες ελέγχου."}
          </p>
        </div>

        <div onClick={() => go("ch-1:quiz")} className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition hover:border-amber-400 hover:shadow-md">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
            <HelpCircle size={22} />
          </div>
          <h3 className="mt-4 font-bold text-slate-900 dark:text-slate-100">{lang === "en" ? "10-Question Quizzes (A-E)" : "Κουίζ 10 Ερωτήσεων (A-E)"}</h3>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            {lang === "en" ? "10 five-choice questions per chapter (130 questions total) with instant grading and in-depth explanations." : "10 ερωτήσεις 5 επιλογών ανά κεφάλαιο (130 σύνολο) με άμεση βαθμολόγηση και αναλυτικές επεξηγήσεις."}
          </p>
        </div>
      </section>

      {/* Parts & chapters */}
      <section className="space-y-12">
        {parts.map((p) => {
          const chs = chapters.filter((c) => c.part === p.n);
          if (!chs.length) return null;
          return (
            <div key={p.n} className="space-y-4">
              <div className="flex flex-wrap items-end justify-between gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">{t("part", lang)} {p.n}</div>
                  <h2 className="text-2xl font-black tracking-tight">{p.title[lang]}</h2>
                </div>
                <p className="max-w-md text-sm text-slate-500">{p.blurb[lang]}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {chs.map((c) => (
                  <button key={c.n} onClick={() => go(`ch-${c.n}`)} className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-teal-400 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 font-mono text-sm font-bold text-teal-300 dark:bg-slate-800 shadow-inner">{String(c.n).padStart(2, "0")}</span>
                      <span className="text-xs font-medium text-slate-400">{c.hours} {t("hours", lang)}</span>
                    </div>
                    <h3 className="mt-4 font-bold leading-snug group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{c.title[lang]}</h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{c.subtitle[lang]}</p>
                    
                    <div className="mt-4 flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                      <span className="inline-flex items-center gap-1 rounded bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-teal-700 dark:bg-teal-950/50 dark:text-teal-300">
                        <Terminal size={10} /> CLI Lab
                      </span>
                      <span className="inline-flex items-center gap-1 rounded bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                        <FlaskConical size={10} /> 2h Lab
                      </span>
                      <span className="inline-flex items-center gap-1 rounded bg-purple-50 px-2 py-0.5 text-[10px] font-semibold text-purple-700 dark:bg-purple-950/50 dark:text-purple-300">
                        <FolderGit2 size={10} /> Project
                      </span>
                      <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
                        <HelpCircle size={10} /> 10 MCQs
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                      <span>{c.sections.length} {t("sections", lang)}</span>
                      <span className="text-teal-600 dark:text-teal-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        {t("start", lang)} <ArrowRight size={12} />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export function PrefaceView({ lang, fontSize }: { lang: Lang; fontSize: number }) {
  return (
    <article className="fade-up mx-auto max-w-3xl" style={{ fontSize }}>
      <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-600">{bookMeta.title[lang]}</div>
      <h1 className="mb-8 text-4xl font-extrabold tracking-tight">{t("preface", lang)}</h1>
      <div className="prose-book text-slate-800 dark:text-slate-300">
        {preface[lang].map((p, i) => <p key={i}><Inline text={p} /></p>)}
      </div>
    </article>
  );
}

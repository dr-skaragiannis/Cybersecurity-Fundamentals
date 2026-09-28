import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, GraduationCap, HelpCircle, ListChecks, Sparkles, Terminal, Wrench, FolderGit2 } from "lucide-react";
import type { Chapter, Lang } from "../content/types";
import { chapters, parts } from "../content/book";
import { t } from "../i18n";
import { BlockView, Inline, stripMarkup } from "./Blocks";
import { cn } from "../utils/cn";
import CliLabView from "./CliLabView";
import HandsOnLabView from "./HandsOnLabView";
import ProjectView from "./ProjectView";
import QuizView from "./QuizView";

export type Mode = Lang | "both";

/** Renders content once (single language) or twice side-by-side (parallel mode). */
function Dual({ mode, render, className }: { mode: Mode; render: (l: Lang) => ReactNode; className?: string }) {
  if (mode !== "both") return <div className={className}>{render(mode)}</div>;
  return (
    <div className={cn("grid gap-8 lg:grid-cols-2", className)}>
      {(["en", "el"] as Lang[]).map((l) => (
        <div key={l} lang={l} className="min-w-0">
          <div className="mb-2 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{l === "en" ? "English" : "Ελληνικά"}</div>
          {render(l)}
        </div>
      ))}
    </div>
  );
}

export function chapterWords(ch: Chapter, l: Lang) {
  const all: string[] = [...ch.intro[l], ...ch.summary[l]];
  ch.sections.forEach((s) => s.body[l].forEach((b) => {
    if (typeof b === "string") all.push(b);
    else if (b.t === "box") all.push(b.text);
    else if (b.t === "list") all.push(...b.items);
    else all.push(...b.rows.flat());
  }));
  return stripMarkup(all.join(" ")).split(/\s+/).length;
}

export default function ChapterView({ ch, mode, fontSize, go }: { ch: Chapter; mode: Mode; fontSize: number; go: (h: string) => void }) {
  const ui: Lang = mode === "both" ? "en" : mode;
  const idx = chapters.findIndex((c) => c.n === ch.n);
  const prev = chapters[idx - 1];
  const next = chapters[idx + 1];
  const part = parts.find((p) => p.n === ch.part)!;
  const words = useMemo(() => chapterWords(ch, ui), [ch, ui]);

  const anchors = useMemo(
    () => [
      { id: "intro", label: t("introduction", ui) },
      ...ch.sections.map((s) => ({ id: `s-${s.id}`, label: `${s.id} ${s.title[ui]}` })),
      { id: "terms", label: t("terms", ui) },
      { id: "summary", label: t("summary", ui) },
      { id: "questions", label: t("questions", ui) },
      ...(ch.cliLab ? [{ id: "cli-lab", label: `CLI: ${t("cliLab", ui)}` }] : []),
      ...(ch.handsOnLab ? [{ id: "hands-on-lab", label: `Lab: ${t("handsOnLab", ui)}` }] : []),
      ...(ch.technicalProject ? [{ id: "project", label: `Project: ${t("technicalProject", ui)}` }] : []),
      ...(ch.quiz ? [{ id: "quiz", label: `Quiz: ${t("quiz", ui)}` }] : []),
    ],
    [ch, ui]
  );

  const [active, setActive] = useState("intro");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-90px 0px -65% 0px" }
    );
    anchors.forEach((a) => { const el = document.getElementById(a.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [anchors]);

  return (
    <div className="flex gap-10">
      <article key={ch.n} className={cn("fade-up min-w-0 flex-1", mode === "both" ? "max-w-none" : "max-w-3xl mx-auto xl:mx-0")} style={{ fontSize }}>
        {/* Header */}
        <header id="intro" className="section-anchor relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-teal-900 p-8 text-white shadow-xl sm:p-10">
          <div className="pointer-events-none absolute -right-10 -top-10 text-[12rem] font-black leading-none text-white/5 select-none">{ch.n}</div>
          <div className="relative flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="rounded-full bg-teal-400/20 px-3 py-1 text-teal-200">{t("part", ui)} {part.n} · {part.title[ui]}</span>
            <span className="rounded-full bg-white/10 px-3 py-1">{t("chapter", ui)} {ch.n}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1"><GraduationCap size={13} /> {ch.level[ui]}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1"><Clock size={13} /> {ch.hours} {t("hours", ui)}</span>
            <span className="rounded-full bg-white/10 px-3 py-1">≈ {words.toLocaleString()} {t("words", ui)}</span>
          </div>
          <Dual mode={mode} className="relative mt-5" render={(l) => (
            <>
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{ch.title[l]}</h1>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{ch.subtitle[l]}</p>
            </>
          )} />
        </header>

        {/* Introduction */}
        <Dual mode={mode} className="prose-book mb-8" render={(l) => ch.intro[l].map((p, i) => (
          <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mr-2 first-letter:text-5xl first-letter:font-bold first-letter:leading-none first-letter:text-teal-700 dark:first-letter:text-teal-400" : ""}><Inline text={p} /></p>
        ))} />

        {/* Outcomes */}
        <Dual mode={mode} className="mb-12" render={(l) => (
          <div className="rounded-2xl border border-teal-200 bg-teal-50/70 p-6 dark:border-teal-500/20 dark:bg-teal-500/5">
            <div className="mb-1 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-teal-800 dark:text-teal-300"><ListChecks size={17} /> {t("outcomes", l)}</div>
            <p className="mb-3 text-sm text-slate-600 dark:text-slate-400">{t("outcomesLead", l)}</p>
            <ul className="space-y-2">
              {ch.outcomes[l].map((o, i) => (
                <li key={i} className="flex gap-3 text-[0.92em] leading-relaxed text-slate-700 dark:text-slate-300">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-teal-600 dark:text-teal-400" /> <span><Inline text={o} /></span>
                </li>
              ))}
            </ul>
          </div>
        )} />

        {/* Sections */}
        {ch.sections.map((s) => (
          <section key={s.id} id={`s-${s.id}`} className="section-anchor mb-12">
            <Dual mode={mode} render={(l) => (
              <>
                <h2 className="mb-5 flex items-baseline gap-3 text-2xl font-bold tracking-tight">
                  <span className="font-mono text-base font-semibold text-teal-600 dark:text-teal-400">{s.id}</span>
                  <span>{s.title[l]}</span>
                </h2>
                <div className="prose-book text-slate-800 dark:text-slate-300">
                  {s.body[l].map((b, i) => <BlockView key={i} b={b} />)}
                </div>
              </>
            )} />
          </section>
        ))}

        {/* Key terms */}
        <section id="terms" className="section-anchor mb-12">
          <Dual mode={mode} render={(l) => (
            <>
              <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold tracking-tight"><Sparkles size={20} className="text-amber-500" /> {t("terms", l)}</h2>
              <dl className="grid gap-3 sm:grid-cols-2">
                {ch.terms[l].map((k, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                    <dt className="font-bold text-slate-900 dark:text-white">{k.term}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{k.def}</dd>
                  </div>
                ))}
              </dl>
            </>
          )} />
        </section>

        {/* Summary */}
        <section id="summary" className="section-anchor mb-12">
          <Dual mode={mode} render={(l) => (
            <div className="rounded-2xl bg-slate-900 p-7 text-slate-100 dark:bg-slate-800/70">
              <h2 className="mb-4 text-xl font-bold">{t("summary", l)}</h2>
              <ul className="space-y-3">
                {ch.summary[l].map((s, i) => (
                  <li key={i} className="flex gap-3 font-serif text-[0.95em] leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" /> <span><Inline text={s} /></span>
                  </li>
                ))}
              </ul>
            </div>
          )} />
        </section>

        {/* Review Questions */}
        <section id="questions" className="section-anchor mb-12">
          <Dual mode={mode} render={(l) => (
            <>
              <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold tracking-tight"><HelpCircle size={20} className="text-teal-600" /> {t("questions", l)}</h2>
              <ol className="space-y-3">
                {ch.questions[l].map((q, i) => (
                  <li key={i} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">{i + 1}</span>
                    <span className="font-serif leading-relaxed text-slate-700 dark:text-slate-300"><Inline text={q} /></span>
                  </li>
                ))}
              </ol>
            </>
          )} />
        </section>

        {/* Interactive CLI Simulated Lab */}
        {ch.cliLab && (
          <section id="cli-lab" className="section-anchor mb-16">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-600 text-white">
                <Terminal size={16} />
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {t("cliLab", ui)}
              </h2>
            </div>
            {mode === "both" ? (
              <div className="space-y-12">
                <div>
                  <div className="mb-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-teal-600">English Edition</div>
                  <CliLabView lab={ch.cliLab} chapterNumber={ch.n} lang="en" onNavigateChapter={(h) => go(h)} />
                </div>
                <div>
                  <div className="mb-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-teal-600">Ελληνική Έκδοση</div>
                  <CliLabView lab={ch.cliLab} chapterNumber={ch.n} lang="el" onNavigateChapter={(h) => go(h)} />
                </div>
              </div>
            ) : (
              <CliLabView lab={ch.cliLab} chapterNumber={ch.n} lang={ui} onNavigateChapter={(h) => go(h)} />
            )}
          </section>
        )}

        {/* 2-Hour Technical Hands-on Lab */}
        {ch.handsOnLab && (
          <section id="hands-on-lab" className="section-anchor mb-16">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-600 text-white">
                <Wrench size={16} />
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {t("handsOnLab", ui)}
              </h2>
            </div>
            {mode === "both" ? (
              <div className="space-y-12">
                <div>
                  <div className="mb-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-teal-600">English Edition</div>
                  <HandsOnLabView lab={ch.handsOnLab} lang="en" chapterNumber={ch.n} />
                </div>
                <div>
                  <div className="mb-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-teal-600">Ελληνική Έκδοση</div>
                  <HandsOnLabView lab={ch.handsOnLab} lang="el" chapterNumber={ch.n} />
                </div>
              </div>
            ) : (
              <HandsOnLabView lab={ch.handsOnLab} lang={ui} chapterNumber={ch.n} />
            )}
          </section>
        )}

        {/* Technical Practice Project */}
        {ch.technicalProject && (
          <section id="project" className="section-anchor mb-16">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-600 text-white">
                <FolderGit2 size={16} />
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {t("technicalProject", ui)}
              </h2>
            </div>
            {mode === "both" ? (
              <div className="space-y-12">
                <div>
                  <div className="mb-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-amber-600">English Edition</div>
                  <ProjectView project={ch.technicalProject} appliedProject={ch.appliedProject} lang="en" />
                </div>
                <div>
                  <div className="mb-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Ελληνική Έκδοση</div>
                  <ProjectView project={ch.technicalProject} appliedProject={ch.appliedProject} lang="el" />
                </div>
              </div>
            ) : (
              <ProjectView project={ch.technicalProject} appliedProject={ch.appliedProject} lang={ui} />
            )}
          </section>
        )}

        {/* Interactive 10-Question Quiz */}
        {ch.quiz && (
          <section id="quiz" className="section-anchor mb-16">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-600 text-white">
                <HelpCircle size={16} />
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {t("quiz", ui)}
              </h2>
            </div>
            {mode === "both" ? (
              <div className="space-y-12">
                <div>
                  <div className="mb-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-teal-600">English Quiz</div>
                  <QuizView questions={ch.quiz} lang="en" chapterNumber={ch.n} />
                </div>
                <div>
                  <div className="mb-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-teal-600">Ελληνικό Κουίζ</div>
                  <QuizView questions={ch.quiz} lang="el" chapterNumber={ch.n} />
                </div>
              </div>
            ) : (
              <QuizView questions={ch.quiz} lang={ui} chapterNumber={ch.n} />
            )}
          </section>
        )}

        {/* Prev / next */}
        <nav className="no-print mt-16 grid gap-4 border-t border-slate-200 pt-8 dark:border-slate-800 sm:grid-cols-2">
          {prev ? (
            <button onClick={() => go(`ch-${prev.n}`)} className="group rounded-2xl border border-slate-200 p-5 text-left transition hover:border-teal-400 hover:shadow-md dark:border-slate-800">
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-500"><ArrowLeft size={14} className="transition group-hover:-translate-x-1" /> {t("prev", ui)}</div>
              <div className="mt-1 font-bold">{prev.n}. {prev.title[ui]}</div>
            </button>
          ) : <span />}
          {next && (
            <button onClick={() => go(`ch-${next.n}`)} className="group rounded-2xl border border-slate-200 p-5 text-right transition hover:border-teal-400 hover:shadow-md dark:border-slate-800">
              <div className="flex items-center justify-end gap-1 text-xs font-semibold text-slate-500">{t("next", ui)} <ArrowRight size={14} className="transition group-hover:translate-x-1" /></div>
              <div className="mt-1 font-bold">{next.n}. {next.title[ui]}</div>
            </button>
          )}
        </nav>
      </article>

      {/* On-this-page rail */}
      {mode !== "both" && (
        <aside className="no-print sticky top-24 hidden h-[calc(100vh-7rem)] w-60 shrink-0 overflow-y-auto scroll-thin xl:block">
          <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">{t("onThisPage", ui)}</div>
          <ul className="space-y-0.5 border-l border-slate-200 dark:border-slate-800">
            {anchors.map((a) => (
              <li key={a.id}>
                <a href={`#ch-${ch.n}:${a.id}`} onClick={(e) => { e.preventDefault(); go(`ch-${ch.n}:${a.id}`); }}
                  className={cn("-ml-px block border-l-2 py-1.5 pl-3 text-[13px] leading-snug transition",
                    active === a.id ? "border-teal-500 font-semibold text-teal-700 dark:text-teal-300" : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200")}>
                  {a.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
}

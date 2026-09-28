import { useState } from "react";
import { Wrench, Clock, CheckSquare, Layers, FileText, CheckCircle2, Circle, Terminal, Sparkles, BookOpen } from "lucide-react";
import type { HandsOnLab, Lang } from "../content/types";
import { t } from "../i18n";
import { BlockView, Inline } from "./Blocks";
import FullLabSandboxView from "./FullLabSandboxView";
import { cn } from "../utils/cn";

export default function HandsOnLabView({
  lab,
  lang,
  chapterNumber = 1,
}: {
  lab: HandsOnLab;
  lang: Lang;
  chapterNumber?: number;
}) {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [viewMode, setViewMode] = useState<"manual" | "sandbox">("manual");

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className="not-prose my-12 overflow-hidden rounded-3xl border border-teal-200 bg-white p-6 shadow-xl dark:border-teal-500/20 dark:bg-slate-900 sm:p-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 dark:border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400">
              <Wrench size={18} />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
              {t("handsOnLab", lang)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle between manual and interactive sandbox */}
            <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
              <button
                onClick={() => setViewMode("manual")}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition",
                  viewMode === "manual"
                    ? "bg-white text-teal-700 shadow-sm dark:bg-slate-700 dark:text-white"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                )}
              >
                <BookOpen size={13} />
                <span>{lang === "en" ? "Lab Manual" : "Οδηγός Εργαστηρίου"}</span>
              </button>
              <button
                onClick={() => setViewMode("sandbox")}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition",
                  viewMode === "sandbox"
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                )}
              >
                <Terminal size={13} />
                <span>{lang === "en" ? "Interactive Linux Sandbox" : "Διαδραστικό Linux Sandbox"}</span>
                <span className="rounded bg-teal-400/30 px-1 py-0.2 text-[9px] font-black uppercase">LIVE</span>
              </button>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 font-mono text-xs font-bold text-teal-700 border border-teal-200 dark:bg-teal-500/10 dark:text-teal-300 dark:border-teal-500/30">
              <Clock size={13} /> {lab.duration[lang]}
            </span>
          </div>
        </div>

        <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {lab.title[lang]}
        </h3>
        <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
          {lab.subtitle[lang]}
        </p>

        <p className="mt-4 font-serif text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <Inline text={lab.overview[lang]} />
        </p>
      </div>

      {/* View Mode: Interactive Linux Sandbox */}
      {viewMode === "sandbox" ? (
        <div className="mt-6">
          <div className="mb-4 flex items-center justify-between rounded-2xl bg-teal-500/10 p-4 border border-teal-500/20 text-xs text-teal-900 dark:text-teal-300">
            <div className="flex items-center gap-2 font-medium">
              <Sparkles size={16} className="text-teal-600 dark:text-teal-400 animate-pulse shrink-0" />
              <span>
                {lang === "en"
                  ? "Live virtual Linux sandbox active! Use Tab for autocompletion, Up/Down for command history, and the collapsible left panel to follow guided missions."
                  : "Ενεργό εικονικό Linux sandbox! Χρησιμοποιήστε το πλήκτρο Tab για αυτόματη συμπλήρωση, τα βέλη για ιστορικό και το αριστερό μενού για καθοδήγηση."}
              </span>
            </div>
            <button
              onClick={() => setViewMode("manual")}
              className="font-bold underline ml-2 shrink-0 hover:text-teal-600"
            >
              {lang === "en" ? "View Full Text Manual" : "Προβολή Πλήρους Οδηγού"}
            </button>
          </div>

          <FullLabSandboxView initialChapter={chapterNumber} lang={lang} />
        </div>
      ) : (
        /* View Mode: Text Manual */
        <>
          {/* Quick Sandbox Launch Banner */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 p-4 text-white border border-slate-800 shadow-md">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400">
                <Terminal size={18} />
              </span>
              <div>
                <div className="font-bold text-sm text-white">
                  {lang === "en" ? "Ready to run the hands-on lab?" : "Έτοιμοι για την εκτέλεση του εργαστηρίου;"}
                </div>
                <div className="text-xs text-slate-400">
                  {lang === "en"
                    ? "Launch the simulated realistic Linux sandbox terminal with Tab autocompletion and left drawer guide."
                    : "Εκκινήστε το προσομοιωμένο περιβάλλον τερματικού Linux με υποστήριξη Tab και αριστερό οδηγό."}
                </div>
              </div>
            </div>

            <button
              onClick={() => setViewMode("sandbox")}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-lg hover:bg-teal-400 transition"
            >
              <Terminal size={14} />
              <span>{lang === "en" ? "Launch Linux Sandbox" : "Εκκίνηση Linux Sandbox"}</span>
            </button>
          </div>

          {/* Prerequisites & Environment */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-800/40">
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <Layers size={15} className="text-teal-600 dark:text-teal-400" />
              {t("labPrereqs", lang)}
            </div>
            <ul className="grid gap-2 text-xs text-slate-600 dark:text-slate-300 sm:grid-cols-2">
              {lab.environment.map((envItem, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                  <span><Inline text={envItem} /></span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lab Phases */}
          <div className="mt-8 space-y-8">
            <h4 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <Layers size={18} className="text-teal-600 dark:text-teal-400" />
              {t("labPhases", lang)}
            </h4>

            {lab.phases.map((phase) => (
              <div
                key={phase.phaseNumber}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/90 shadow-sm"
              >
                {/* Phase Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-600 text-xs font-bold text-white">
                      {phase.phaseNumber}
                    </span>
                    <span className="font-bold text-base text-slate-900 dark:text-white">
                      {phase.title[lang]}
                    </span>
                  </div>
                  <span className="rounded-md bg-slate-100 px-2.5 py-0.5 font-mono text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    {phase.estimatedTime[lang]}
                  </span>
                </div>

                {/* Phase Objectives */}
                <div className="mt-4 mb-4 rounded-xl bg-teal-50/50 p-3.5 dark:bg-teal-500/5 border border-teal-100 dark:border-teal-500/10">
                  <div className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 mb-1.5">
                    {t("outcomes", lang)}:
                  </div>
                  <ul className="space-y-1">
                    {phase.objectives[lang].map((obj, oi) => (
                      <li key={oi} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-teal-600 dark:text-teal-400" />
                        <span><Inline text={obj} /></span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Phase Steps / Blocks */}
                <div className="prose-book space-y-4 text-slate-800 dark:text-slate-300 text-sm">
                  {phase.steps[lang].map((stepBlock, bi) => (
                    <BlockView key={bi} b={stepBlock} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Deliverables & Verification Checklist */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {/* Deliverables */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-800/40">
              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                <FileText size={16} className="text-teal-600 dark:text-teal-400" />
                {t("labDeliverables", lang)}
              </div>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {lab.deliverables[lang].map((deliv, di) => (
                  <li key={di} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                    <span><Inline text={deliv} /></span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verification Checklist */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-800/40">
              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                <CheckSquare size={16} className="text-teal-600 dark:text-teal-400" />
                {t("labVerification", lang)}
              </div>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {lab.verificationChecklist[lang].map((vItem, vi) => {
                  const isChecked = checkedItems.has(vi);
                  return (
                    <li
                      key={vi}
                      onClick={() => toggleCheck(vi)}
                      className="flex items-start gap-2 cursor-pointer select-none rounded-lg p-1.5 transition hover:bg-slate-200/60 dark:hover:bg-slate-700/40"
                    >
                      <span className="mt-0.5">
                        {isChecked ? (
                          <CheckCircle2 size={15} className="text-emerald-500" />
                        ) : (
                          <Circle size={15} className="text-slate-400" />
                        )}
                      </span>
                      <span className={cn(isChecked && "line-through text-slate-400 dark:text-slate-500")}>
                        <Inline text={vItem} />
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

import { useState } from "react";
import {
  Terminal,
  Clock,
  CheckSquare,
  Layers,
  FileText,
  CheckCircle2,
  Circle,
  Sparkles,
  BookOpen,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  RotateCcw
} from "lucide-react";
import type { CliLab, Lang } from "../content/types";
import { t } from "../i18n";
import { Inline } from "./Blocks";
import CliTerminal from "./CliTerminal";
import { cn } from "../utils/cn";

export default function CliLabView({
  lab,
  lang = "en",
  chapterNumber = 1,
  onNavigateChapter,
}: {
  lab: CliLab;
  lang: Lang;
  chapterNumber?: number;
  onNavigateChapter?: (chapterId: string) => void;
}) {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [viewMode, setViewMode] = useState<"sandbox" | "manual">("sandbox");
  const [expandedHints, setExpandedHints] = useState<Set<string>>(new Set());

  const safeLang = lang === "el" ? "el" : "en";

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const toggleHint = (taskId: string) => {
    setExpandedHints((prev) => {
      const next = new Set(prev);
      if (next.has(taskId)) next.delete(taskId);
      else next.add(taskId);
      return next;
    });
  };

  const tasksList = lab.tasks || [];
  const totalTasks = tasksList.length;

  return (
    <div className="not-prose my-12 overflow-hidden rounded-3xl border border-teal-200 bg-white p-6 shadow-xl dark:border-teal-500/20 dark:bg-slate-900 sm:p-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 dark:border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400">
              <Terminal size={18} />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
              {t("cliLab", safeLang)}
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
                <span>{safeLang === "en" ? "Lab Missions Guide" : "Οδηγός Αποστολών"}</span>
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
                <span>{safeLang === "en" ? "Interactive Linux Sandbox" : "Διαδραστικό Linux Sandbox"}</span>
                <span className="rounded bg-teal-400/30 px-1 py-0.2 text-[9px] font-black uppercase">LIVE</span>
              </button>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 font-mono text-xs font-bold text-teal-700 border border-teal-200 dark:bg-teal-500/10 dark:text-teal-300 dark:border-teal-500/30">
              <Clock size={13} /> {safeLang === "en" ? "30–45 min" : "30–45 λεπτά"}
            </span>
          </div>
        </div>

        <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {lab.title[safeLang] || lab.title.en}
        </h3>
        <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
          {lab.scenario[safeLang] || lab.scenario.en}
        </p>
      </div>

      {/* View Mode: Interactive Linux Sandbox */}
      {viewMode === "sandbox" ? (
        <div className="mt-6">
          <div className="mb-4 flex items-center justify-between rounded-2xl bg-teal-500/10 p-4 border border-teal-500/20 text-xs text-teal-900 dark:text-teal-300">
            <div className="flex items-center gap-2 font-medium">
              <Sparkles size={16} className="text-teal-600 dark:text-teal-400 animate-pulse shrink-0" />
              <span>
                {safeLang === "en"
                  ? "Live virtual Linux sandbox active! Use Tab for autocompletion, Up/Down for command history, and the collapsible left panel to follow guided missions."
                  : "Ενεργό εικονικό Linux sandbox! Χρησιμοποιήστε το πλήκτρο Tab για αυτόματη συμπλήρωση, τα βέλη για ιστορικό και το αριστερό μενού για καθοδήγηση."}
              </span>
            </div>
            <button
              onClick={() => setViewMode("manual")}
              className="font-bold underline ml-2 shrink-0 hover:text-teal-600"
            >
              {safeLang === "en" ? "View Full Guide" : "Προβολή Οδηγού"}
            </button>
          </div>

          <CliTerminal
            lab={lab}
            chapterNumber={chapterNumber}
            lang={lang}
            onNavigateChapter={onNavigateChapter}
          />
        </div>
      ) : (
        /* View Mode: Text Missions Manual */
        <>
          {/* Quick Sandbox Launch Banner */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 p-4 text-white border border-slate-800 shadow-md">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400">
                <Terminal size={18} />
              </span>
              <div>
                <div className="font-bold text-sm text-white">
                  {safeLang === "en" ? "Ready to run the CLI lab?" : "Έτοιμοι για την εκτέλεση του εργαστηρίου CLI;"}
                </div>
                <div className="text-xs text-slate-400">
                  {safeLang === "en"
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
              <span>{safeLang === "en" ? "Launch Linux Sandbox" : "Εκκίνηση Linux Sandbox"}</span>
            </button>
          </div>

          {/* Missions Overview Card */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-800/40">
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <Layers size={15} className="text-teal-600 dark:text-teal-400" />
              {safeLang === "en" ? "Lab Objectives & Environment" : "Στόχοι Εργαστηρίου & Περιβάλλον"}
            </div>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              <Inline text={lab.scenario[safeLang] || lab.scenario.en} />
            </p>
          </div>

          {/* Detailed Lab Missions */}
          <div className="mt-8 space-y-6">
            <h4 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <Layers size={18} className="text-teal-600 dark:text-teal-400" />
              {t("cliTasksLabel", safeLang)} ({totalTasks} {safeLang === "en" ? "Missions" : "Αποστολές"})
            </h4>

            {tasksList.map((task, idx) => {
              const showHint = expandedHints.has(task.id);
              return (
                <div
                  key={task.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/90 shadow-sm space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-600 text-xs font-bold text-white">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-base text-slate-900 dark:text-white">
                        {task.title[safeLang] || task.title.en}
                      </span>
                    </div>
                    <span className="rounded-md bg-teal-50 px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-700 dark:bg-teal-950/50 dark:text-teal-300 border border-teal-200 dark:border-teal-500/20">
                      Mission {idx + 1} of {totalTasks}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 font-serif">
                    <Inline text={task.description[safeLang] || task.description.en} />
                  </p>

                  {/* Target Command Block */}
                  <div className="rounded-xl bg-slate-950 p-3 font-mono text-xs text-teal-300 border border-slate-800 select-all">
                    $ {task.solution}
                  </div>

                  {/* Expandable Hint */}
                  {task.hint && (
                    <div>
                      <button
                        onClick={() => toggleHint(task.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 hover:text-amber-500 dark:text-amber-400"
                      >
                        <HelpCircle size={13} />
                        <span>{showHint ? "Hide Hint" : t("cliHint", safeLang)}</span>
                        {showHint ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                      </button>

                      {showHint && (
                        <div className="mt-2 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                          <Inline text={task.hint[safeLang] || task.hint.en} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Verification Checklist */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-800/40">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              <CheckSquare size={16} className="text-teal-600 dark:text-teal-400" />
              {t("labVerification", safeLang)}
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {tasksList.map((tItem, vi) => {
                const isChecked = checkedItems.has(vi);
                return (
                  <li
                    key={vi}
                    onClick={() => toggleCheck(vi)}
                    className={cn(
                      "flex cursor-pointer items-start gap-2.5 rounded-xl p-2 transition",
                      isChecked
                        ? "bg-teal-500/10 text-teal-900 dark:text-teal-200 font-medium"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800"
                    )}
                  >
                    <span className="mt-0.5">
                      {isChecked ? (
                        <CheckCircle2 size={16} className="text-teal-600 dark:text-teal-400" />
                      ) : (
                        <Circle size={16} className="text-slate-400" />
                      )}
                    </span>
                    <span className={isChecked ? "line-through opacity-80" : ""}>
                      {tItem.title[safeLang] || tItem.title.en} — {tItem.description[safeLang] || tItem.description.en}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

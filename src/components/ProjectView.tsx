import { useState } from "react";
import { FolderGit2, Target, CheckCircle2, Award, ListOrdered, FileCode, Wrench, Code2, ChevronDown, ChevronRight, Terminal, Sparkles, Layers } from "lucide-react";
import type { TechnicalProject, Lang } from "../content/types";
import { t } from "../i18n";
import { Inline } from "./Blocks";
import { cn } from "../utils/cn";

export default function ProjectView({
  project,
  appliedProject,
  lang,
}: {
  project: TechnicalProject;
  appliedProject?: TechnicalProject;
  lang: Lang;
}) {
  const [activeTab, setActiveTab] = useState<"arch" | "applied">("arch");
  const [expandedSpecs, setExpandedSpecs] = useState<Set<number>>(new Set([1, 2, 3, 4]));

  const currentProject = activeTab === "applied" && appliedProject ? appliedProject : project;

  const toggleSpec = (milestoneNum: number) => {
    setExpandedSpecs((prev) => {
      const next = new Set(prev);
      if (next.has(milestoneNum)) next.delete(milestoneNum);
      else next.add(milestoneNum);
      return next;
    });
  };

  return (
    <div className="not-prose my-12 overflow-hidden rounded-3xl border border-amber-300/60 bg-white p-6 shadow-xl dark:border-amber-500/20 dark:bg-slate-900 sm:p-8">
      {/* Top Project Selector Tabs (when 2 projects exist) */}
      {appliedProject && (
        <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-200 pb-4 dark:border-slate-800">
          <button
            onClick={() => setActiveTab("arch")}
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition shadow-sm",
              activeTab === "arch"
                ? "bg-amber-600 text-white shadow-amber-600/20"
                : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            )}
          >
            <Layers size={15} />
            <span>{t("project1Tab", lang)}</span>
          </button>
          <button
            onClick={() => setActiveTab("applied")}
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition shadow-sm",
              activeTab === "applied"
                ? "bg-teal-600 text-white shadow-teal-600/20"
                : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            )}
          >
            <Code2 size={15} />
            <span>{t("project2Tab", lang)}</span>
            <span className="rounded bg-teal-400/20 px-1.5 py-0.5 text-[10px] font-extrabold uppercase">
              Build Your Own
            </span>
          </button>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-slate-200 pb-6 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className={cn(
            "flex h-8 w-8 items-center justify-center rounded-xl",
            activeTab === "applied"
              ? "bg-teal-500/15 text-teal-600 dark:text-teal-400"
              : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
          )}>
            {activeTab === "applied" ? <Code2 size={18} /> : <FolderGit2 size={18} />}
          </span>
          <span className={cn(
            "text-xs font-bold uppercase tracking-wider",
            activeTab === "applied" ? "text-teal-700 dark:text-teal-400" : "text-amber-700 dark:text-amber-400"
          )}>
            {currentProject.category ? currentProject.category[lang] : t("technicalProject", lang)}
          </span>
        </div>

        <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {currentProject.title[lang]}
        </h3>
        <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
          {currentProject.subtitle[lang]}
        </p>

        {/* Problem Scenario */}
        <div className={cn(
          "mt-4 rounded-2xl p-5 border",
          activeTab === "applied"
            ? "bg-teal-50/70 dark:bg-teal-500/5 border-teal-200/70 dark:border-teal-500/20"
            : "bg-amber-50/70 dark:bg-amber-500/5 border-amber-200/70 dark:border-amber-500/20"
        )}>
          <div className={cn(
            "text-xs font-bold uppercase tracking-wider mb-2",
            activeTab === "applied" ? "text-teal-900 dark:text-teal-300" : "text-amber-900 dark:text-amber-300"
          )}>
            {t("projectOverview", lang)}:
          </div>
          <p className="font-serif text-sm leading-relaxed text-slate-800 dark:text-slate-200">
            <Inline text={currentProject.scenario[lang]} />
          </p>
        </div>
      </div>

      {/* Objectives & Scope */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-slate-800/40">
          <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            <Target size={16} className={activeTab === "applied" ? "text-teal-600 dark:text-teal-400" : "text-amber-600 dark:text-amber-400"} />
            {t("outcomes", lang)}
          </div>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            {currentProject.objectives[lang].map((obj, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 size={14} className={cn("mt-0.5 shrink-0", activeTab === "applied" ? "text-teal-600 dark:text-teal-400" : "text-amber-600 dark:text-amber-400")} />
                <span><Inline text={obj} /></span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-slate-800/40">
          <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            <FileCode size={16} className={activeTab === "applied" ? "text-teal-600 dark:text-teal-400" : "text-amber-600 dark:text-amber-400"} />
            {t("projectScope", lang)}
          </div>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            {currentProject.scope[lang].map((sItem, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className={cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", activeTab === "applied" ? "bg-teal-500" : "bg-amber-500")} />
                <span><Inline text={sItem} /></span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Milestones with Extensive Detailed Specifications */}
      <div className="mt-10">
        <h4 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2 mb-4">
          <ListOrdered size={18} className={activeTab === "applied" ? "text-teal-600 dark:text-teal-400" : "text-amber-600 dark:text-amber-400"} />
          {t("projectMilestones", lang)}
        </h4>

        <div className="space-y-5">
          {currentProject.milestones.map((m) => {
            const isSpecExpanded = expandedSpecs.has(m.milestoneNumber);

            return (
              <div
                key={m.milestoneNumber}
                className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/80 shadow-sm transition hover:border-slate-300 dark:hover:border-slate-700"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold text-white",
                      activeTab === "applied" ? "bg-teal-600" : "bg-amber-600"
                    )}>
                      M{m.milestoneNumber}
                    </span>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {m.title[lang]}
                    </span>
                  </div>

                  {m.detailedSpec && (
                    <button
                      onClick={() => toggleSpec(m.milestoneNumber)}
                      className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    >
                      <Sparkles size={12} className="text-teal-500" />
                      <span>{lang === "en" ? "Implementation Prompt" : "Εκτενής Εκφώνηση"}</span>
                      {isSpecExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                    </button>
                  )}
                </div>

                <p className="mt-3 font-serif text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                  <Inline text={m.description[lang]} />
                </p>

                {/* Extensive Milestone Implementation Specifications */}
                {m.detailedSpec && isSpecExpanded && (
                  <div className="mt-3.5 rounded-xl border border-teal-500/20 bg-slate-950 p-4 text-xs text-slate-200 font-sans shadow-inner">
                    <div className="flex items-center gap-2 text-teal-400 font-bold uppercase tracking-wider text-[11px] mb-2.5">
                      <Terminal size={14} />
                      {t("milestoneDetailedSpec", lang)}:
                    </div>
                    <ul className="space-y-2 text-slate-300 leading-relaxed font-mono text-[11.5px]">
                      {m.detailedSpec[lang].map((spec, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2">
                          <span className="text-teal-400 font-bold">▶</span>
                          <span><Inline text={spec} /></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-3.5 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-bold text-teal-700 dark:text-teal-400 shrink-0">
                    {t("labDeliverables", lang)}:
                  </span>
                  <span><Inline text={m.deliverable[lang]} /></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deliverables List */}
      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-800/40">
        <div className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center justify-between">
          <span>{t("labDeliverables", lang)} (Final Submission Package)</span>
          <span className="font-mono text-[11px] text-teal-600 dark:text-teal-400">
            {activeTab === "applied" ? "Code Repository & Video Demo" : "Architecture Blueprint Dossier"}
          </span>
        </div>
        <ul className="grid gap-2 text-xs text-slate-600 dark:text-slate-300 sm:grid-cols-2">
          {currentProject.deliverables[lang].map((deliv, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className={cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", activeTab === "applied" ? "bg-teal-500" : "bg-amber-500")} />
              <span><Inline text={deliv} /></span>
            </li>
          ))}
        </ul>
      </div>

      {/* Rubric Table */}
      <div className="mt-10">
        <h4 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2 mb-4">
          <Award size={18} className={activeTab === "applied" ? "text-teal-600 dark:text-teal-400" : "text-amber-600 dark:text-amber-400"} />
          {t("projectRubric", lang)}
        </h4>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs leading-snug">
            <thead className="bg-slate-900 text-white dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 font-semibold">{t("criterion", lang)}</th>
                <th className="px-4 py-3 font-semibold text-center">{t("weight", lang)}</th>
                <th className="px-4 py-3 font-semibold">{t("projectScope", lang)}</th>
              </tr>
            </thead>
            <tbody>
              {currentProject.rubric.map((r, i) => (
                <tr
                  key={i}
                  className="border-t border-slate-200 odd:bg-white even:bg-slate-50 dark:border-slate-800 dark:odd:bg-slate-900 dark:even:bg-slate-900/60"
                >
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-white align-top">
                    {r.criterion[lang]}
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-center text-teal-600 dark:text-teal-400 align-top whitespace-nowrap">
                    {r.weight}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300 align-top">
                    <Inline text={r.description[lang]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

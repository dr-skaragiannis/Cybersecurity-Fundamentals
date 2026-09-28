import { useState } from "react";
import { CheckCircle, XCircle, HelpCircle, Award, RotateCcw, Send, Sparkles } from "lucide-react";
import type { QuizQuestion, Lang } from "../content/types";
import { t } from "../i18n";
import { Inline } from "./Blocks";
import { cn } from "../utils/cn";

export default function QuizView({
  questions,
  lang,
  chapterNumber,
}: {
  questions: QuizQuestion[];
  lang: Lang;
  chapterNumber: number;
}) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelect = (questionId: number, optionIdx: number) => {
    if (submitted) return; // locked after submission
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  const score = questions.reduce((acc, q) => {
    if (selectedAnswers[q.id] === q.correctIndex) return acc + 1;
    return acc;
  }, 0);

  const percent = Math.round((score / totalQuestions) * 100);

  const letters = ["A", "B", "C", "D", "E"];

  return (
    <div className="not-prose my-12 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 dark:border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400">
                <HelpCircle size={18} />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                {t("chapter", lang)} {chapterNumber} · {t("quiz", lang)}
              </span>
            </div>
            <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {t("quiz", lang)}
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{t("quizLead", lang)}</p>
          </div>

          {submitted && (
            <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 p-4 border border-teal-500/30">
              <Award className={score >= 8 ? "text-amber-500" : "text-teal-500"} size={32} />
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {t("quizScore", lang)}
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {score} / {totalQuestions} <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">({percent}%)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Questions list */}
      <div className="mt-8 space-y-8">
        {questions.map((q, qIndex) => {
          const userChoice = selectedAnswers[q.id];
          const isAnswered = userChoice !== undefined;
          const isCorrect = userChoice === q.correctIndex;

          return (
            <div
              key={q.id}
              className={cn(
                "rounded-2xl border p-5 sm:p-6 transition-all",
                submitted
                  ? isCorrect
                    ? "border-emerald-500/40 bg-emerald-50/50 dark:border-emerald-500/30 dark:bg-emerald-950/15"
                    : "border-rose-500/40 bg-rose-50/50 dark:border-rose-500/30 dark:bg-rose-950/15"
                  : "border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-900/60"
              )}
            >
              {/* Question header */}
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-xs font-bold text-teal-300 dark:bg-slate-800">
                  {qIndex + 1}
                </span>
                <div className="flex-1 font-serif text-base font-semibold leading-snug text-slate-900 dark:text-white">
                  <Inline text={q.question[lang]} />
                </div>
                {submitted && (
                  <span className="shrink-0">
                    {isCorrect ? (
                      <CheckCircle className="text-emerald-500" size={20} />
                    ) : (
                      <XCircle className="text-rose-500" size={20} />
                    )}
                  </span>
                )}
              </div>

              {/* 5 Options (A, B, C, D, E) */}
              <div className="mt-4 space-y-2.5">
                {q.options[lang].map((optText, optIdx) => {
                  const isSelected = userChoice === optIdx;
                  const isTheCorrectOne = optIdx === q.correctIndex;

                  let optClass = "border-slate-200 bg-white hover:border-teal-400 dark:border-slate-700/80 dark:bg-slate-800/80";

                  if (submitted) {
                    if (isTheCorrectOne) {
                      optClass = "border-emerald-500 bg-emerald-100/70 text-emerald-950 dark:border-emerald-500/80 dark:bg-emerald-900/30 dark:text-emerald-200 font-semibold";
                    } else if (isSelected && !isTheCorrectOne) {
                      optClass = "border-rose-500 bg-rose-100/70 text-rose-950 dark:border-rose-500/80 dark:bg-rose-900/30 dark:text-rose-200";
                    } else {
                      optClass = "border-slate-200 bg-white/50 opacity-60 dark:border-slate-800 dark:bg-slate-900/50";
                    }
                  } else if (isSelected) {
                    optClass = "border-teal-500 bg-teal-50 text-teal-950 dark:border-teal-400 dark:bg-teal-950/40 dark:text-teal-200 font-medium shadow-sm";
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={submitted}
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-xl border p-3 text-left text-sm transition-all",
                        optClass
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
                          isSelected
                            ? "bg-teal-600 text-white"
                            : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                        )}
                      >
                        {letters[optIdx]}
                      </span>
                      <span className="flex-1 leading-relaxed">
                        <Inline text={optText} />
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Rationale / Explanation after submit */}
              {submitted && (
                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700/80 dark:bg-slate-800/90 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                  <div className="mb-1 font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 flex items-center gap-1.5">
                    <Sparkles size={14} />
                    {t("quizReview", lang)}:
                  </div>
                  <Inline text={q.explanation[lang]} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer controls */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-800">
        <div className="text-xs text-slate-500">
          {answeredCount} / {totalQuestions} answered
        </div>

        <div className="flex items-center gap-3">
          {submitted ? (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <RotateCcw size={16} />
              <span>{t("quizRetry", lang)}</span>
            </button>
          ) : (
            <button
              onClick={() => setSubmitted(true)}
              disabled={answeredCount === 0}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold shadow-lg transition",
                answeredCount > 0
                  ? "bg-teal-500 text-slate-950 hover:bg-teal-400 shadow-teal-500/20"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-600"
              )}
            >
              <Send size={16} />
              <span>{t("quizCheck", lang)}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

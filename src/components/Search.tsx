import { useEffect, useMemo, useRef, useState } from "react";
import { CornerDownLeft, Search as SearchIcon } from "lucide-react";
import type { Lang } from "../content/types";
import { chapters } from "../content/book";
import { t } from "../i18n";
import { stripMarkup } from "./Blocks";

interface Hit { hash: string; title: string; ctx: string; lang: Lang }

function buildIndex() {
  const items: { hash: string; title: string; text: string; lang: Lang }[] = [];
  chapters.forEach((c) => {
    (["en", "el"] as Lang[]).forEach((l) => {
      items.push({ hash: `ch-${c.n}`, title: `${c.n}. ${c.title[l]}`, text: [c.title[l], ...c.intro[l]].join(" "), lang: l });
      c.sections.forEach((s) => {
        const text = s.body[l].map((b) => (typeof b === "string" ? b : b.t === "box" ? `${b.title} ${b.text}` : b.t === "list" ? b.items.join(" ") : [b.caption, ...b.head, ...b.rows.flat()].join(" "))).join(" ");
        items.push({ hash: `ch-${c.n}:s-${s.id}`, title: `${s.id} ${s.title[l]}`, text: stripMarkup(`${s.title[l]} ${text}`), lang: l });
      });
      items.push({ hash: `ch-${c.n}:terms`, title: `${c.n} · ${t("terms", l)}`, text: c.terms[l].map((x) => `${x.term} ${x.def}`).join(" "), lang: l });

      if (c.cliLab) {
        items.push({
          hash: `ch-${c.n}:cli-lab`,
          title: `${c.n} · ${t("cliLab", l)}: ${c.cliLab.title[l]}`,
          text: `${c.cliLab.title[l]} ${c.cliLab.scenario[l]} ${c.cliLab.tasks.map((tk) => `${tk.title[l]} ${tk.description[l]}`).join(" ")}`,
          lang: l,
        });
      }
      if (c.handsOnLab) {
        items.push({
          hash: `ch-${c.n}:hands-on-lab`,
          title: `${c.n} · ${t("handsOnLab", l)}: ${c.handsOnLab.title[l]}`,
          text: `${c.handsOnLab.title[l]} ${c.handsOnLab.subtitle[l]} ${c.handsOnLab.overview[l]}`,
          lang: l,
        });
      }
      if (c.technicalProject) {
        items.push({
          hash: `ch-${c.n}:project`,
          title: `${c.n} · ${t("technicalProject", l)}: ${c.technicalProject.title[l]}`,
          text: `${c.technicalProject.title[l]} ${c.technicalProject.scenario[l]}`,
          lang: l,
        });
      }
      if (c.quiz) {
        items.push({
          hash: `ch-${c.n}:quiz`,
          title: `${c.n} · ${t("quiz", l)}`,
          text: c.quiz.map((q) => `${q.question[l]} ${q.explanation[l]}`).join(" "),
          lang: l,
        });
      }
    });
  });
  return items;
}

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export default function Search({ open, onClose, lang, go }: { open: boolean; onClose: () => void; lang: Lang; go: (h: string) => void }) {
  const index = useMemo(buildIndex, []);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => { if (open) { setQ(""); setSel(0); setTimeout(() => input.current?.focus(), 30); } }, [open]);

  const hits: Hit[] = useMemo(() => {
    const nq = norm(q.trim());
    if (nq.length < 2) return [];
    const res: (Hit & { score: number })[] = [];
    index.forEach((it) => {
      const nt = norm(it.text);
      const i = nt.indexOf(nq);
      if (i < 0) return;
      const s = Math.max(0, i - 60);
      res.push({ hash: it.hash, title: it.title, lang: it.lang, ctx: (s > 0 ? "…" : "") + it.text.slice(s, i + nq.length + 90) + "…", score: (norm(it.title).includes(nq) ? 0 : 1) + (it.lang === lang ? 0 : 0.5) });
    });
    return res.sort((a, b) => a.score - b.score).slice(0, 30);
  }, [q, index, lang]);

  if (!open) return null;
  const choose = (h: Hit) => { go(h.hash); onClose(); };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/60 p-4 pt-[10vh] backdrop-blur-sm" onClick={onClose}>
      <div className="fade-up w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 dark:border-slate-800">
          <SearchIcon size={18} className="text-slate-400" />
          <input ref={input} value={q} onChange={(e) => { setQ(e.target.value); setSel(0); }} placeholder={t("search", lang)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, hits.length - 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
              if (e.key === "Enter" && hits[sel]) choose(hits[sel]);
              if (e.key === "Escape") onClose();
            }}
            className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-slate-400" />
          <kbd className="rounded border border-slate-300 px-1.5 py-0.5 text-[10px] text-slate-400 dark:border-slate-700">ESC</kbd>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2 scroll-thin">
          {q.trim().length >= 2 && hits.length === 0 && <div className="p-8 text-center text-sm text-slate-500">{t("noResults", lang)}</div>}
          {hits.map((h, i) => (
            <button key={h.hash + h.lang + i} onMouseEnter={() => setSel(i)} onClick={() => choose(h)}
              className={`flex w-full items-start gap-3 rounded-xl p-3 text-left ${i === sel ? "bg-teal-50 dark:bg-teal-500/10" : ""}`}>
              <span className="mt-0.5 rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-500 dark:bg-slate-800">{h.lang.toUpperCase()}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{h.title}</span>
                <span className="mt-0.5 line-clamp-2 block text-xs text-slate-500">{h.ctx}</span>
              </span>
              {i === sel && <CornerDownLeft size={14} className="mt-1 text-teal-600" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

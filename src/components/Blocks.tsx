import { Fragment, type ReactNode } from "react";
import { BookOpenCheck, Info, KeyRound } from "lucide-react";
import type { Block } from "../content/types";
import { cn } from "../utils/cn";

/** Renders **bold**, *italic* and `code` inline markup. */
export function Inline({ text, highlight }: { text: string; highlight?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (!p) return null;
        if (p.startsWith("**")) return <strong key={i}>{hl(p.slice(2, -2), highlight)}</strong>;
        if (p.startsWith("`")) return <code key={i}>{p.slice(1, -1)}</code>;
        if (p.startsWith("*") && p.length > 2) return <em key={i}>{hl(p.slice(1, -1), highlight)}</em>;
        return <Fragment key={i}>{hl(p, highlight)}</Fragment>;
      })}
    </>
  );
}

function hl(s: string, q?: string): ReactNode {
  if (!q || q.length < 2) return s;
  const idx = s.toLowerCase().indexOf(q.toLowerCase());
  if (idx < 0) return s;
  return (
    <>
      {s.slice(0, idx)}
      <mark className="bg-amber-200 dark:bg-amber-500/40 rounded px-0.5">{s.slice(idx, idx + q.length)}</mark>
      {hl(s.slice(idx + q.length), q)}
    </>
  );
}

export const stripMarkup = (s: string) => s.replace(/\*\*|\*|`/g, "");

const boxStyle = {
  example: { icon: BookOpenCheck, cls: "border-amber-300/70 bg-amber-50 dark:bg-amber-500/10 dark:border-amber-500/30", title: "text-amber-800 dark:text-amber-300" },
  note: { icon: Info, cls: "border-slate-300 bg-slate-50 dark:bg-slate-800/50 dark:border-slate-700", title: "text-slate-700 dark:text-slate-200" },
  key: { icon: KeyRound, cls: "border-teal-300 bg-teal-50 dark:bg-teal-500/10 dark:border-teal-500/30", title: "text-teal-800 dark:text-teal-300" },
};

export function BlockView({ b }: { b: Block }) {
  if (typeof b === "string") return <p><Inline text={b} /></p>;

  if (b.t === "list") {
    const Tag = b.ordered ? "ol" : "ul";
    return (
      <Tag className={cn("mb-5 space-y-1.5 pl-6", b.ordered ? "list-decimal" : "list-disc marker:text-teal-600")}>
        {b.items.map((it, i) => <li key={i}><Inline text={it} /></li>)}
      </Tag>
    );
  }

  if (b.t === "box") {
    const st = boxStyle[b.kind];
    const Icon = st.icon;
    return (
      <aside className={cn("my-6 rounded-2xl border p-5 font-sans text-[0.95em] leading-relaxed", st.cls)}>
        <div className={cn("mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wide", st.title)}>
          <Icon size={16} /> {b.title}
        </div>
        <div className="text-slate-700 dark:text-slate-300"><Inline text={b.text} /></div>
      </aside>
    );
  }

  return (
    <figure className="my-7 font-sans not-prose">
      {b.caption && (
        <figcaption className="mb-2 text-sm font-semibold text-slate-600 dark:text-slate-400">{b.caption}</figcaption>
      )}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 scroll-thin">
        <table className="w-full text-left text-[0.85rem] leading-snug">
          <thead className="bg-slate-900 text-white dark:bg-slate-800">
            <tr>{b.head.map((h, i) => <th key={i} className="px-4 py-3 font-semibold whitespace-nowrap">{h}</th>)}</tr>
          </thead>
          <tbody>
            {b.rows.map((r, i) => (
              <tr key={i} className="border-t border-slate-200 odd:bg-white even:bg-slate-50 dark:border-slate-800 dark:odd:bg-slate-900 dark:even:bg-slate-900/60">
                {r.map((c, j) => (
                  <td key={j} className={cn("px-4 py-3 align-top text-slate-700 dark:text-slate-300", j === 0 && "font-semibold text-slate-900 dark:text-white")}>
                    <Inline text={c} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

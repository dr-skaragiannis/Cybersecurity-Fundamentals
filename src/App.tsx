import { useCallback, useEffect, useRef, useState } from "react";
import { BookMarked, ChevronRight, Columns2, FileCode2, Home as HomeIcon, Menu, Minus, MonitorPlay, Moon, Plus, Printer, ScrollText, Search as SearchIcon, ShieldCheck, Sun, Terminal, X } from "lucide-react";
import type { Lang } from "./content/types";
import { bookMeta, chapters, parts } from "./content/book";
import { t } from "./i18n";
import { cn } from "./utils/cn";
import ChapterView, { type Mode } from "./components/ChapterView";
import Home, { PrefaceView } from "./components/Home";
import Report from "./components/Report";
import LatexStudio from "./components/LatexStudio";
import BookPdfView from "./components/BookPdfView";
import PresentationView from "./components/PresentationView";
import FullLabSandboxView from "./components/FullLabSandboxView";
import CliTerminal from "./components/CliTerminal";
import Search from "./components/Search";

type Route = { view: "home" | "preface" | "report" | "latex" | "pdf" | "presentation" | "sandbox" | "clilab" | "ch"; n?: number; anchor?: string };

function parseHash(): Route {
  const h = decodeURIComponent(window.location.hash.replace(/^#\/?/, ""));
  if (h.startsWith("ch-")) {
    const [c, anchor] = h.slice(3).split(":");
    const n = parseInt(c, 10);
    if (chapters.some((x) => x.n === n)) return { view: "ch", n, anchor };
  }
  if (h.startsWith("sandbox-")) {
    const n = parseInt(h.slice(8), 10);
    if (!isNaN(n) && n >= 1 && n <= 13) return { view: "sandbox", n };
  }
  if (h === "sandbox" || h === "lab-sandbox" || h === "linux-sandbox") {
    return { view: "sandbox", n: 1 };
  }
  if (h.startsWith("cli-lab-") || h.startsWith("cli-")) {
    const n = parseInt(h.replace(/^cli-lab-|^cli-/, ""), 10);
    if (!isNaN(n) && n >= 1 && n <= 13) return { view: "clilab", n };
  }
  if (h === "cli-lab" || h === "cli-labs" || h === "cli-terminal" || h === "clilab") {
    return { view: "clilab", n: 1 };
  }
  if (h === "preface" || h === "report" || h === "latex" || h === "pdf" || h === "presentation" || h === "slides") {
    return { view: h === "slides" ? "presentation" : (h as Route["view"]) };
  }
  return { view: "home" };
}

function usePersist<T>(key: string, init: T) {
  const [v, setV] = useState<T>(() => {
    try { const s = localStorage.getItem(key); return s ? (JSON.parse(s) as T) : init; } catch { return init; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* ignore */ } }, [key, v]);
  return [v, setV] as const;
}

export default function App() {
  const [route, setRoute] = useState<Route>(parseHash);
  const [mode, setMode] = usePersist<Mode>("cf2_mode", "el");
  const [fontSize, setFontSize] = usePersist("cf2_font", 17);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const progress = useRef<HTMLDivElement>(null);
  const ui: Lang = mode === "both" ? "en" : mode;

  const go = useCallback((h: string) => {
    if (window.location.hash === `#${h}`) setRoute(parseHash());
    else window.location.hash = h;
    setNavOpen(false);
  }, []);

  useEffect(() => {
    const on = () => setRoute(parseHash());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  // scroll to anchor / top on route change
  useEffect(() => {
    const id = route.anchor;
    requestAnimationFrame(() => {
      if (id) document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.scrollTo({ top: 0 });
    });
  }, [route]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try { localStorage.setItem("cf2_theme", dark ? "dark" : "light"); } catch { /* ignore */ }
  }, [dark]);

  useEffect(() => { document.documentElement.lang = ui; }, [ui]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearchOpen(true); }
      if (e.key === "/" && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) { e.preventDefault(); setSearchOpen(true); }
    };
    const onScroll = () => {
      const d = document.documentElement;
      const p = d.scrollTop / Math.max(1, d.scrollHeight - d.clientHeight);
      if (progress.current) progress.current.style.transform = `scaleX(${p})`;
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("scroll", onScroll); };
  }, []);

  const chapter = route.view === "ch" ? chapters.find((c) => c.n === route.n) : undefined;

  const NavItem = ({ hash, icon: Icon, label, active }: { hash: string; icon: typeof HomeIcon; label: string; active: boolean }) => (
    <button onClick={() => go(hash)} className={cn("flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition", active ? "bg-slate-900 text-white dark:bg-teal-500/15 dark:text-teal-200" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800")}>
      <Icon size={16} /> {label}
    </button>
  );

  const sidebar = (
    <nav className="flex h-full flex-col gap-1 overflow-y-auto p-4 scroll-thin">
      <NavItem hash="" icon={HomeIcon} label={t("home", ui)} active={route.view === "home"} />
      <NavItem hash="sandbox" icon={Terminal} label={t("labSandboxNav", ui)} active={route.view === "sandbox"} />
      <NavItem hash="presentation" icon={MonitorPlay} label={t("presentation", ui)} active={route.view === "presentation"} />
      <NavItem hash="pdf" icon={Printer} label={t("pdfBook", ui)} active={route.view === "pdf"} />
      <NavItem hash="preface" icon={ScrollText} label={t("preface", ui)} active={route.view === "preface"} />
      <NavItem hash="report" icon={ShieldCheck} label={t("report", ui)} active={route.view === "report"} />
      <NavItem hash="latex" icon={FileCode2} label={t("latex", ui)} active={route.view === "latex"} />
      <div className="mt-5 mb-1 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">{t("contents", ui)}</div>
      {parts.map((p) => {
        const chs = chapters.filter((c) => c.part === p.n);
        if (!chs.length) return null;
        return (
          <div key={p.n} className="mb-2">
            <div className="px-3 py-1.5 text-[11px] font-semibold text-teal-700 dark:text-teal-400">{t("part", ui)} {p.n} · {p.title[ui]}</div>
            {chs.map((c) => {
              const act = chapter?.n === c.n;
              return (
                <div key={c.n}>
                  <button onClick={() => go(`ch-${c.n}`)} className={cn("group flex w-full items-start gap-2 rounded-lg px-3 py-1.5 text-left text-[13px] leading-snug transition", act ? "bg-teal-50 font-semibold text-teal-800 dark:bg-teal-500/10 dark:text-teal-200" : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800")}>
                    <span className="mt-px w-5 shrink-0 font-mono text-[11px] text-slate-400">{c.n}</span>
                    <span className="flex-1">{c.title[ui]}</span>
                    <ChevronRight size={14} className={cn("mt-0.5 shrink-0 text-slate-300 transition", act && "rotate-90 text-teal-500")} />
                  </button>
                  {act && (
                    <div className="my-1 ml-8 border-l border-slate-200 dark:border-slate-800">
                      {c.sections.map((s) => (
                        <button key={s.id} onClick={() => go(`ch-${c.n}:s-${s.id}`)} className="block w-full py-1 pl-3 text-left text-[12px] leading-snug text-slate-500 hover:text-teal-700 dark:hover:text-teal-300">
                          <span className="font-mono text-slate-400">{s.id}</span> {s.title[ui]}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </nav>
  );

  const modes: { k: Mode; label: string; icon?: typeof Columns2 }[] = [
    { k: "en", label: "EN" },
    { k: "el", label: "ΕΛ" },
    { k: "both", label: t("parallel", ui), icon: Columns2 },
  ];

  return (
    <div className="min-h-screen">
      <div ref={progress} className="no-print fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-teal-500 via-cyan-400 to-amber-400" />

      {/* Top bar */}
      <header className="no-print sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
        <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
          <button onClick={() => setNavOpen(true)} className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden" aria-label="Menu"><Menu size={20} /></button>
          <button onClick={() => go("")} className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-teal-700 text-white shadow"><BookMarked size={18} /></span>
            <span className="hidden min-w-0 text-left sm:block">
              <span className="block truncate text-[14px] font-extrabold leading-tight tracking-tight">{bookMeta.title[ui]}</span>
              <span className="block truncate text-[11px] text-slate-500">{t("library", ui)}</span>
            </span>
          </button>
          <div className="flex-1" />
          <button onClick={() => setSearchOpen(true)} className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-400 transition hover:border-teal-400 dark:border-slate-700 dark:bg-slate-900 md:flex md:w-64">
            <SearchIcon size={15} /> <span className="flex-1 text-left">{t("search", ui)}</span>
            <kbd className="rounded border border-slate-300 px-1.5 text-[10px] dark:border-slate-600">⌘K</kbd>
          </button>
          <button onClick={() => setSearchOpen(true)} className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden" aria-label="Search"><SearchIcon size={18} /></button>

          <div className="flex items-center rounded-full bg-slate-100 p-1 dark:bg-slate-800" role="group" aria-label="Language">
            {modes.map((m) => (
              <button key={m.k} onClick={() => setMode(m.k)} className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold transition", mode === m.k ? "bg-slate-900 text-white shadow dark:bg-teal-500 dark:text-slate-950" : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100", m.k === "both" && "hidden sm:inline-flex")}>
                {m.icon && <m.icon size={13} />} {m.label}
              </button>
            ))}
          </div>

          <div className="hidden items-center rounded-full bg-slate-100 p-1 dark:bg-slate-800 sm:flex">
            <button onClick={() => setFontSize((f) => Math.max(14, f - 1))} className="rounded-full p-1.5 hover:bg-white dark:hover:bg-slate-700" aria-label="Smaller text"><Minus size={13} /></button>
            <span className="w-7 text-center text-[11px] font-bold tabular-nums">{fontSize}</span>
            <button onClick={() => setFontSize((f) => Math.min(22, f + 1))} className="rounded-full p-1.5 hover:bg-white dark:hover:bg-slate-700" aria-label="Larger text"><Plus size={13} /></button>
          </div>
          <button onClick={() => go("sandbox")} className="hidden rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 md:block text-emerald-600 dark:text-emerald-400" title={t("labSandboxNav", ui)} aria-label="Linux Sandbox"><Terminal size={18} /></button>
          <button onClick={() => go("presentation")} className="hidden rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 md:block text-teal-600 dark:text-teal-400" title={t("presentation", ui)} aria-label="Presentation Slides"><MonitorPlay size={18} /></button>
          <button onClick={() => go("pdf")} className="hidden rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 md:block text-slate-700 dark:text-slate-200" title={t("pdfBook", ui)} aria-label="PDF Book Export"><Printer size={18} /></button>
          <button onClick={() => setDark((d) => !d)} className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Theme">{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
        </div>
      </header>

      {/* Desktop sidebar */}
      <aside className="no-print fixed bottom-0 left-0 top-16 hidden w-72 border-r border-slate-200 bg-white/60 dark:border-slate-800 dark:bg-slate-950/60 lg:block">{sidebar}</aside>

      {/* Mobile drawer */}
      {navOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={() => setNavOpen(false)} />
          <div className="fade-up absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-2xl dark:bg-slate-900">
            <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800">
              <span className="font-extrabold">{t("contents", ui)}</span>
              <button onClick={() => setNavOpen(false)} className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"><X size={18} /></button>
            </div>
            <div className="h-[calc(100%-4rem)]">{sidebar}</div>
          </div>
        </div>
      )}

      <main className={cn("px-4 py-8 sm:px-8 lg:px-12 lg:py-12", route.view !== "pdf" && route.view !== "presentation" && route.view !== "sandbox" && route.view !== "clilab" && "lg:ml-72")}>
        <div className={cn("mx-auto", route.view === "pdf" ? "max-w-5xl" : route.view === "presentation" ? "max-w-6xl" : (route.view === "sandbox" || route.view === "clilab") ? "max-w-7xl" : "max-w-[1200px]")}>
          {route.view === "home" && <Home lang={ui} go={go} />}
          {route.view === "sandbox" && (
            <FullLabSandboxView
              initialChapter={route.n || 1}
              lang={ui}
              onNavigateChapter={(chId) => go(chId)}
            />
          )}
          {route.view === "clilab" && (
            <CliTerminal
              chapterNumber={route.n || 1}
              lang={ui}
              onNavigateChapter={(chId) => go(chId)}
            />
          )}
          {route.view === "presentation" && (
            <PresentationView
              initialLang={ui}
              onNavigateChapter={(chNum, secAnchor) => {
                go(secAnchor ? `ch-${chNum}:${secAnchor}` : `ch-${chNum}`);
              }}
              onBack={() => go("")}
            />
          )}
          {route.view === "preface" && <PrefaceView lang={ui} fontSize={fontSize} />}
          {route.view === "pdf" && <BookPdfView initialLang={ui} onBack={() => go("")} />}
          {route.view === "report" && <Report lang={ui} />}
          {route.view === "latex" && <LatexStudio lang={ui} />}
          {chapter && <ChapterView ch={chapter} mode={mode} fontSize={fontSize} go={go} />}
          <footer className="no-print mt-20 border-t border-slate-200 py-8 text-center text-xs text-slate-400 dark:border-slate-800">
            {bookMeta.title.en} · {bookMeta.title.el} · {bookMeta.edition[ui]}
          </footer>
        </div>
      </main>

      <Search open={searchOpen} onClose={() => setSearchOpen(false)} lang={ui} go={go} />
    </div>
  );
}

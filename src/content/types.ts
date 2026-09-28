export type Lang = "en" | "el";

/** A bilingual value. Every piece of book text exists in English and Greek. */
export type L<T> = { en: T; el: T };

/**
 * Inline markup supported inside paragraph strings (rendered in the UI and
 * converted to LaTeX):  **bold**   *italic*   `code`
 */
export type Block =
  | string
  | { t: "list"; items: string[]; ordered?: boolean }
  | { t: "table"; caption?: string; head: string[]; rows: string[][] }
  | { t: "box"; kind: "example" | "note" | "key"; title: string; text: string };

export interface Section {
  id: string; // e.g. "1.3"
  title: L<string>;
  body: L<Block[]>;
}

export interface Term {
  term: string;
  def: string;
}

export interface QuizQuestion {
  id: number; // 1 to 10
  question: L<string>;
  options: L<string[]>; // 5 options (A, B, C, D, E)
  correctIndex: number; // 0..4
  explanation: L<string>;
}

export interface CliTask {
  id: string;
  title: L<string>;
  description: L<string>;
  hint: L<string>;
  expectedCommand?: string;
  validateRegex?: string;
  solution: string;
  successMessage: L<string>;
}

export interface CliLab {
  id: string;
  title: L<string>;
  scenario: L<string>;
  initialPrompt: string; // e.g. "analyst@cybersec-ops:~$"
  banner: L<string>;
  tasks: CliTask[];
  fileSystem?: Record<string, string>;
  customHelp?: L<string[]>;
}

export interface LabPhase {
  phaseNumber: number;
  title: L<string>;
  estimatedTime: L<string>; // e.g. "25 min" / "25 λεπτά"
  objectives: L<string[]>;
  steps: L<Block[]>;
}

export interface HandsOnLab {
  title: L<string>;
  subtitle: L<string>;
  duration: L<string>; // e.g. "~2 Ώρες (120 λεπτά)" / "~2 Hours (120 minutes)"
  overview: L<string>;
  environment: L<string[]>;
  phases: LabPhase[];
  deliverables: L<string[]>;
  verificationChecklist: L<string[]>;
}

export interface ProjectMilestone {
  milestoneNumber: number;
  title: L<string>;
  description: L<string>;
  detailedSpec?: L<string[]>; // Extensive implementation specifications
  deliverable: L<string>;
}

export interface RubricRow {
  criterion: L<string>;
  weight: string; // e.g. "25%"
  description: L<string>;
}

export interface TechnicalProject {
  id?: string;
  category?: L<string>; // e.g. "Architecture & Strategy" vs "Applied Software Construction"
  title: L<string>;
  subtitle: L<string>;
  scenario: L<string>;
  objectives: L<string[]>;
  scope: L<string[]>;
  milestones: ProjectMilestone[];
  deliverables: L<string[]>;
  rubric: RubricRow[];
}

export interface Chapter {
  n: number;
  part: number;
  title: L<string>;
  subtitle: L<string>;
  level: L<string>;
  hours: string;
  intro: L<string[]>;
  outcomes: L<string[]>;
  sections: Section[];
  terms: L<Term[]>;
  summary: L<string[]>;
  questions: L<string[]>;
  cliLab?: CliLab;
  handsOnLab?: HandsOnLab;
  technicalProject?: TechnicalProject;
  appliedProject?: TechnicalProject;
  quiz?: QuizQuestion[];
}

export interface Part {
  n: number;
  title: L<string>;
  blurb: L<string>;
}

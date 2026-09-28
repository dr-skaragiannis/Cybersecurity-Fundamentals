import type { Lang } from "./content/types";

const S = {
  library: { en: "Revised bilingual edition", el: "Αναθεωρημένη δίγλωσση έκδοση" },
  contents: { en: "Contents", el: "Περιεχόμενα" },
  home: { en: "Cover & overview", el: "Εξώφυλλο & επισκόπηση" },
  preface: { en: "Preface", el: "Πρόλογος" },
  report: { en: "Editorial analysis", el: "Επιμελητική ανάλυση" },
  latex: { en: "LaTeX studio", el: "Εργαστήριο LaTeX" },
  pdfBook: { en: "PDF Book Export", el: "Εξαγωγή Βιβλίου PDF" },
  presentation: { en: "Classroom Slides (13 Ch)", el: "Παρουσίαση Διδασκαλίας (13 Κεφ.)" },
  slides: { en: "Lecture Slides", el: "Διαφάνειες Διαλέξεων" },
  labSandboxNav: { en: "2h Linux Lab Sandbox", el: "Linux Εργαστήριο Sandbox" },
  downloadPdf: { en: "Save as PDF", el: "Αποθήκευση ως PDF" },
  printPdfDesc: { en: "Download and print the complete textbook with formal book cover, table of contents, full chapters, labs, projects, and exam questions.", el: "Λήψη και εκτύπωση ολόκληρου του εγχειριδίου με επίσημο εξώφυλλο, πίνακα περιεχομένων, πλήρη κεφάλαια, εργαστήρια, projects και ερωτήσεις εξετάσεων." },
  part: { en: "Part", el: "Μέρος" },
  chapter: { en: "Chapter", el: "Κεφάλαιο" },
  chapters: { en: "chapters", el: "κεφάλαια" },
  sections: { en: "sections", el: "ενότητες" },
  hours: { en: "h study", el: "ώρες μελέτης" },
  outcomes: { en: "Learning outcomes", el: "Μαθησιακά αποτελέσματα" },
  outcomesLead: { en: "After studying this chapter you should be able to:", el: "Μετά τη μελέτη του κεφαλαίου θα πρέπει να μπορείτε:" },
  terms: { en: "Key terms", el: "Βασικοί όροι" },
  summary: { en: "Chapter summary", el: "Σύνοψη κεφαλαίου" },
  questions: { en: "Review questions", el: "Ερωτήσεις ανασκόπησης" },
  onThisPage: { en: "On this page", el: "Σε αυτή τη σελίδα" },
  prev: { en: "Previous", el: "Προηγούμενο" },
  next: { en: "Next", el: "Επόμενο" },
  search: { en: "Search the book…", el: "Αναζήτηση στο βιβλίο…" },
  noResults: { en: "No results", el: "Δεν βρέθηκαν αποτελέσματα" },
  start: { en: "Start reading", el: "Έναρξη ανάγνωσης" },
  viewReport: { en: "What changed and why", el: "Τι άλλαξε και γιατί" },
  parallel: { en: "Parallel", el: "Παράλληλα" },
  introduction: { en: "Introduction", el: "Εισαγωγή" },
  readTime: { en: "min read", el: "λεπτά ανάγνωσης" },
  words: { en: "words", el: "λέξεις" },
  // New section labels
  cliLab: { en: "Interactive CLI Lab", el: "Διαδραστικό Εργαστήριο CLI" },
  handsOnLab: { en: "Technical Lab (~2h)", el: "Τεχνικό Εργαστήριο (~2 Ώρες)" },
  technicalProject: { en: "Technical Practice Project", el: "Τεχνικό Project (Εργασία Εξάσκησης)" },
  quiz: { en: "Chapter Quiz (10 Questions)", el: "Κουίζ Κεφαλαίου (10 Ερωτήσεις)" },
  // CLI simulator UI
  terminalTitle: { en: "Security Sandbox CLI", el: "Προσομοιωτής Τερματικού Ασφάλειας" },
  cliInstructions: { en: "Type commands or click quick actions to complete the security missions.", el: "Πληκτρολογήστε εντολές ή επιλέξτε προτάσεις για να ολοκληρώσετε τις αποστολές ασφάλειας." },
  cliTasksLabel: { en: "Lab Missions", el: "Αποστολές Εργαστηρίου" },
  cliHint: { en: "Hint", el: "Υπόδειξη" },
  cliAutoRun: { en: "Run Solution", el: "Εκτέλεση Λύσης" },
  cliReset: { en: "Reset Terminal", el: "Επαναφορά Τερματικού" },
  cliCompletedAll: { en: "All missions completed! Outstanding work!", el: "Όλες οι αποστολές ολοκληρώθηκαν με επιτυχία! Εξαιρετική δουλειά!" },
  cliTaskOf: { en: "Missions completed", el: "Ολοκληρωμένες αποστολές" },
  completed: { en: "Completed", el: "Ολοκληρώθηκε" },
  // Hands-on Lab UI
  labDuration: { en: "Target Duration", el: "Εκτιμώμενη Διάρκεια" },
  labPrereqs: { en: "Prerequisites & Tools", el: "Προαπαιτούμενα & Εργαλεία" },
  labPhases: { en: "Lab Phases", el: "Φάσεις Εργαστηρίου" },
  labPhase: { en: "Phase", el: "Φάση" },
  labDeliverables: { en: "Expected Deliverables", el: "Αναμενόμενα Παραδοτέα" },
  labVerification: { en: "Verification Checklist", el: "Λίστα Επαλήθευσης" },
  // Project UI
  projectOverview: { en: "Project Overview & Scenario", el: "Επισκόπηση Έργου & Σενάριο" },
  projectScope: { en: "Scope & Requirements", el: "Εύρος & Απαιτήσεις" },
  projectMilestones: { en: "Implementation Milestones", el: "Ορόσημα Υλοποίησης" },
  milestoneDetailedSpec: { en: "Extensive Implementation Specifications & Technical Prompt", el: "Εκτενής Εκφώνηση & Τεχνικές Προδιαγραφές Υλοποίησης" },
  project1Tab: { en: "Project 1: Enterprise Architecture & Assessment", el: "Project 1: Εταιρική Αρχιτεκτονική & Αξιολόγηση" },
  project2Tab: { en: "Project 2: Applied Software & Tool Engineering (Build Your Own)", el: "Project 2: Ανάπτυξη Εφαρμογής & Εργαλείου (Build Your Own)" },
  projectRubric: { en: "Evaluation Rubric", el: "Κριτήρια Αξιολόγησης" },
  criterion: { en: "Criterion", el: "Κριτήριο" },
  weight: { en: "Weight", el: "Βαρύτητα" },
  // Quiz UI
  quizLead: { en: "Test your mastery with 10 single-choice questions (5 choices each). Select one answer per question.", el: "Ελέγξτε τις γνώσεις σας με 10 ερωτήσεις πολλαπλής επιλογής (5 επιλογές ανά ερώτηση). Επιλέξτε μία σωστή απάντηση." },
  quizCheck: { en: "Submit Answers", el: "Υποβολή & Έλεγχος Απαντήσεων" },
  quizRetry: { en: "Retake Quiz", el: "Επανάληψη Κουίζ" },
  quizScore: { en: "Your Score", el: "Η Βαθμολογία σας" },
  quizPassed: { en: "Passed with distinction!", el: "Επιτυχής ολοκλήρωση με διάκριση!" },
  quizReview: { en: "Answer Explanation & Rationale", el: "Αιτιολόγηση & Επεξήγηση Απάντησης" },
  questionWord: { en: "Question", el: "Ερώτηση" },
  correct: { en: "Correct", el: "Σωστό" },
  incorrect: { en: "Incorrect", el: "Λανθασμένο" },
};

export type UIKey = keyof typeof S;

export const t = (k: UIKey | string, lang: Lang): string => {
  const item = (S as Record<string, { en: string; el: string }>)[k];
  if (item && item[lang]) return item[lang];
  if (item && item.en) return item.en;
  return String(k);
};

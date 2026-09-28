import type { L, Part } from "./types";

export const bookMeta = {
  title: {
    en: "Cybersecurity Fundamentals",
    el: "Θεμελιώδεις Αρχές Κυβερνοασφάλειας",
  } as L<string>,
  subtitle: {
    en: "Principles, Architectures and Defensive Operations",
    el: "Αρχές, Αρχιτεκτονικές και Αμυντικές Λειτουργίες",
  } as L<string>,
  edition: { en: "Revised bilingual edition · 2026", el: "Αναθεωρημένη δίγλωσση έκδοση · 2026" } as L<string>,
  author: "Dr. S. Karagiannis",
};

export const parts: Part[] = [
  {
    n: 1,
    title: { en: "Foundations", el: "Θεμέλια" },
    blurb: {
      en: "Core concepts, security principles and the protection mechanisms of modern operating systems.",
      el: "Βασικές έννοιες, αρχές ασφάλειας και οι μηχανισμοί προστασίας των σύγχρονων λειτουργικών συστημάτων.",
    },
  },
  {
    n: 2,
    title: { en: "Adversaries and Attacks", el: "Αντίπαλοι και Επιθέσεις" },
    blurb: {
      en: "Who attacks, why and how: threat actors, malicious code, social engineering and network attacks.",
      el: "Ποιος επιτίθεται, γιατί και με ποιον τρόπο: δράστες απειλών, κακόβουλος κώδικας, κοινωνική μηχανική και δικτυακές επιθέσεις.",
    },
  },
  {
    n: 3,
    title: { en: "Protection Mechanisms and Secure Engineering", el: "Μηχανισμοί Προστασίας και Ασφαλής Μηχανική" },
    blurb: {
      en: "Cryptography, identity, secure software development and systematic security testing.",
      el: "Κρυπτογραφία, διαχείριση ταυτότητας, ασφαλής ανάπτυξη λογισμικού και συστηματικός έλεγχος ασφάλειας.",
    },
  },
  {
    n: 4,
    title: { en: "Operations, Investigation and Governance", el: "Λειτουργίες, Διερεύνηση και Διακυβέρνηση" },
    blurb: {
      en: "Detection and incident response, malware analysis and forensics, resilience, risk and regulation.",
      el: "Ανίχνευση και απόκριση σε περιστατικά, ανάλυση κακόβουλου λογισμικού και εγκληματολογική ανάλυση, ανθεκτικότητα, κίνδυνος και κανονιστικό πλαίσιο.",
    },
  },
];

export const preface: L<string[]> = {
  en: [
    "This textbook is written for undergraduate students taking a first university course in cybersecurity, and for practitioners who wish to consolidate their understanding of the field on a sound conceptual basis. It assumes basic familiarity with computers and networks, but no prior study of security.",
    "The book is organised into thirteen chapters grouped in four parts. The sequence is deliberate. It begins with concepts and principles, moves to the operating system as the first concrete security boundary, and then studies the adversary: who attacks, with which tools and through which channels. Only after the reader understands what must be defended does the book introduce the protective mechanisms—cryptography, identity management, secure software engineering and testing. The final part turns to operations: detecting and responding to incidents, analysing malicious code and evidence, and governing security as an organisational function.",
    "Each chapter opens with a short introduction and a set of learning outcomes, develops its subject in numbered sections, and closes with a glossary of key terms, a summary and review questions. Tables condense comparisons that are easier to grasp side by side, while boxed examples connect abstract ideas to realistic situations. Cross-references between chapters are frequent, because security is a connected discipline: a weakness in one layer is usually exploited through another.",
    "The book is published in parallel English and Greek versions. The Greek text is not a literal translation; it is an editorial rendering that follows the conventions of Greek academic writing and uses consistent, established terminology. Where no widely accepted Greek term exists, the English term is given in parentheses on first use.",
  ],
  el: [
    "Το παρόν σύγγραμμα απευθύνεται σε προπτυχιακούς φοιτητές που παρακολουθούν ένα πρώτο πανεπιστημιακό μάθημα κυβερνοασφάλειας, καθώς και σε επαγγελματίες που επιθυμούν να εδραιώσουν την κατανόησή τους για το πεδίο σε στέρεη εννοιολογική βάση. Προϋποθέτει βασική εξοικείωση με υπολογιστές και δίκτυα, όχι όμως προηγούμενη μελέτη της ασφάλειας.",
    "Το βιβλίο οργανώνεται σε δεκατρία κεφάλαια, ομαδοποιημένα σε τέσσερα μέρη. Η σειρά είναι συνειδητή. Ξεκινά από τις έννοιες και τις αρχές, περνά στο λειτουργικό σύστημα ως το πρώτο απτό όριο ασφάλειας και στη συνέχεια μελετά τον αντίπαλο: ποιος επιτίθεται, με ποια εργαλεία και μέσα από ποια κανάλια. Μόνο αφού ο αναγνώστης κατανοήσει τι πρέπει να προστατευθεί, το βιβλίο εισάγει τους μηχανισμούς προστασίας —την κρυπτογραφία, τη διαχείριση ταυτότητας, την ασφαλή μηχανική λογισμικού και τον έλεγχο ασφάλειας. Το τελευταίο μέρος στρέφεται στις λειτουργίες: την ανίχνευση και την απόκριση σε περιστατικά, την ανάλυση κακόβουλου κώδικα και αποδεικτικών στοιχείων και τη διακυβέρνηση της ασφάλειας ως οργανωσιακής λειτουργίας.",
    "Κάθε κεφάλαιο ξεκινά με σύντομη εισαγωγή και με τα μαθησιακά αποτελέσματα, αναπτύσσει το αντικείμενό του σε αριθμημένες ενότητες και ολοκληρώνεται με γλωσσάριο βασικών όρων, σύνοψη και ερωτήσεις ανασκόπησης. Οι πίνακες συμπυκνώνουν συγκρίσεις που γίνονται ευκολότερα κατανοητές όταν παρουσιάζονται παράλληλα, ενώ τα πλαίσια με παραδείγματα συνδέουν τις αφηρημένες έννοιες με ρεαλιστικές καταστάσεις. Οι παραπομπές μεταξύ κεφαλαίων είναι συχνές, επειδή η ασφάλεια είναι ένα διασυνδεδεμένο πεδίο: μια αδυναμία σε ένα επίπεδο συνήθως αξιοποιείται μέσω κάποιου άλλου.",
    "Το βιβλίο εκδίδεται παράλληλα στα αγγλικά και στα ελληνικά. Το ελληνικό κείμενο δεν αποτελεί κατά λέξη μετάφραση· είναι επιμελημένη απόδοση που ακολουθεί τις συμβάσεις του ελληνικού ακαδημαϊκού λόγου και χρησιμοποιεί συνεπή, καθιερωμένη ορολογία. Όπου δεν υπάρχει ευρέως αποδεκτός ελληνικός όρος, ο αγγλικός όρος δίνεται σε παρένθεση κατά την πρώτη εμφάνισή του.",
  ],
};

/* ------------------------------------------------------------------ */
/*  Editorial analysis of the original text (the "before" state)       */
/* ------------------------------------------------------------------ */

export interface Finding {
  sev: "high" | "medium" | "low";
  title: L<string>;
  detail: L<string>;
  before?: string;
  after?: L<string>;
}

export const analysisStats = [
  { value: "13", label: { en: "core chapters analysed", el: "κεφάλαια αναλύθηκαν" } },
  { value: "10.9k → 17k", label: { en: "English section prose, original → revised (+56%)", el: "αγγλικό κείμενο ενοτήτων, αρχικό → αναθεωρημένο (+56%)" } },
  { value: "2,548", label: { en: "Greek fragments (text-node dictionary)", el: "ελληνικά αποσπάσματα (λεξικό κόμβων)" } },
  { value: "85", label: { en: "whole-paragraph Greek translations", el: "πλήρεις ελληνικές παράγραφοι" } },
];

export const findings: Finding[] = [
  {
    sev: "high",
    title: { en: "Telegraphic, note-like English", el: "Τηλεγραφικό ύφος σημειώσεων στο αγγλικό κείμενο" },
    detail: {
      en: "Many paragraphs read like lecture notes: symbols (+, =, →) replace verbs, sentences are compressed into formulas, and causal links are left for the reader to reconstruct. This is efficient for an expert but opaque for a student.",
      el: "Πολλές παράγραφοι μοιάζουν με σημειώσεις διάλεξης: σύμβολα (+, =, →) αντικαθιστούν ρήματα, οι προτάσεις συμπιέζονται σε τύπους και οι αιτιακές σχέσεις αφήνονται στον αναγνώστη. Αυτό είναι αποδοτικό για έναν ειδικό, αλλά δυσνόητο για έναν φοιτητή.",
    },
    before: "Lesson: patch latency + flat networks = worm amplification.",
    after: {
      en: "The lesson of WannaCry is that slow patching and flat, unsegmented networks reinforce each other: once a worm enters, nothing slows its spread from one vulnerable host to the next.",
      el: "Το δίδαγμα του WannaCry είναι ότι η καθυστερημένη εφαρμογή ενημερώσεων και τα επίπεδα, μη κατατμημένα δίκτυα αλληλοενισχύονται: μόλις ένα σκουλήκι εισέλθει, τίποτα δεν επιβραδύνει τη διάδοσή του από τον έναν ευάλωτο υπολογιστή στον επόμενο.",
    },
  },
  {
    sev: "high",
    title: { en: "Fragmented Greek produced by a text-node dictionary", el: "Κατακερματισμένα ελληνικά λόγω λεξικού κόμβων κειμένου" },
    detail: {
      en: "Only 85 paragraphs were translated as whole units. Everywhere else the Greek was assembled at runtime by swapping 2,548 isolated fragments. Whenever a sentence contained bold or italic words, each piece was translated separately, producing broken syntax, wrong agreement and mixed-language sentences.",
      el: "Μόνο 85 παράγραφοι είχαν μεταφραστεί ως ενιαία σύνολα. Σε όλα τα άλλα σημεία το ελληνικό κείμενο συντίθετο κατά την εκτέλεση, αντικαθιστώντας 2.548 μεμονωμένα αποσπάσματα. Όταν μια πρόταση περιείχε έντονες ή πλάγιες λέξεις, κάθε τμήμα μεταφραζόταν χωριστά, με αποτέλεσμα σπασμένη σύνταξη, λανθασμένες συμφωνίες και προτάσεις με ανάμεικτες γλώσσες.",
    },
  },
  {
    sev: "high",
    title: { en: "Machine-translation errors in Greek", el: "Σφάλματα αυτόματης μετάφρασης στα ελληνικά" },
    detail: {
      en: "Abbreviated English phrases were translated literally and sometimes wrongly. The most visible example is “post-ex” (post-exploitation), which was rendered as “after the past”.",
      el: "Συντομευμένες αγγλικές φράσεις μεταφράστηκαν κατά λέξη και ενίοτε λανθασμένα. Το πιο χαρακτηριστικό παράδειγμα είναι το «post-ex» (post-exploitation), που αποδόθηκε ως «μετά το παρελθόν».",
    },
    before: "Προστέθηκε πρότυπο CVSS + όρια μετά το παρελθόν + χειρισμός αποδεικτικών στοιχείων",
    after: {
      en: "Added: a CVSS scoring template, the boundaries of the post-exploitation phase, and procedures for handling evidence.",
      el: "Προστέθηκαν: πρότυπο βαθμολόγησης CVSS, τα όρια της φάσης μετά την εκμετάλλευση (post-exploitation) και διαδικασίες χειρισμού αποδεικτικών στοιχείων.",
    },
  },
  {
    sev: "medium",
    title: { en: "Untranslated English terms inside Greek sentences", el: "Αμετάφραστοι αγγλικοί όροι μέσα σε ελληνικές προτάσεις" },
    detail: {
      en: "Terms such as worms, trojans, failover or playbook were left in English without explanation, even where well-established Greek equivalents exist. The revised text gives the Greek term and, on first use, the English one in parentheses.",
      el: "Όροι όπως worms, trojans, failover ή playbook παρέμεναν στα αγγλικά χωρίς επεξήγηση, ακόμη και όπου υπάρχουν καθιερωμένα ελληνικά ισοδύναμα. Το αναθεωρημένο κείμενο δίνει τον ελληνικό όρο και, στην πρώτη εμφάνιση, τον αγγλικό σε παρένθεση.",
    },
    before: "Ιοί · Worms · Trojans · Spyware · Ransomware · Fileless επιθέσεις · Rootkits",
    after: {
      en: "Viruses · Worms · Trojans · Spyware · Ransomware · Fileless attacks · Rootkits",
      el: "Ιοί · Σκουλήκια (worms) · Δούρειοι ίπποι (trojans) · Λογισμικό κατασκοπείας · Λυτρισμικό · Επιθέσεις χωρίς αρχεία · Rootkits",
    },
  },
  {
    sev: "medium",
    title: { en: "Jargon and acronyms without definitions", el: "Ορολογία και ακρωνύμια χωρίς ορισμό" },
    detail: {
      en: "Acronyms (JA3, LOLBins, RaaS, gMSA, SLSA …) appeared densely and often before they were defined. The revision defines every term at first use and adds a per-chapter glossary.",
      el: "Ακρωνύμια (JA3, LOLBins, RaaS, gMSA, SLSA κ.ά.) εμφανίζονταν πυκνά και συχνά πριν οριστούν. Η αναθεώρηση ορίζει κάθε όρο στην πρώτη εμφάνισή του και προσθέτει γλωσσάριο ανά κεφάλαιο.",
    },
    before: "Pedagogical discipline: single indicators suggest; correlated indicators confirm.",
    after: {
      en: "A single indicator, such as one unusual network connection, only suggests a compromise; confidence comes from several independent indicators that point to the same conclusion.",
      el: "Μια μεμονωμένη ένδειξη, όπως μια ασυνήθιστη δικτυακή σύνδεση, απλώς υποδηλώνει παραβίαση· βεβαιότητα προκύπτει μόνο όταν πολλές ανεξάρτητες ενδείξεις οδηγούν στο ίδιο συμπέρασμα.",
    },
  },
  {
    sev: "medium",
    title: { en: "Editorial meta-commentary inside the body text", el: "Σχόλια επιμέλειας μέσα στο κύριο κείμενο" },
    detail: {
      en: "Phrases such as “author pass”, “no text removed”, “★ new”, “expert-audited” or “Expert habit:” belong to the production process, not to an academic textbook. They have been removed or rewritten as proper explanatory prose.",
      el: "Φράσεις όπως «author pass», «δεν αφαιρέθηκε κείμενο», «★ νέο», «expert-audited» ή «Expert habit:» ανήκουν στη διαδικασία παραγωγής και όχι σε ένα ακαδημαϊκό σύγγραμμα. Αφαιρέθηκαν ή ξαναγράφτηκαν ως κανονικός επεξηγηματικός λόγος.",
    },
  },
  {
    sev: "low",
    title: { en: "Missing pedagogical scaffolding", el: "Έλλειψη παιδαγωγικής υποστήριξης" },
    detail: {
      en: "Chapters started abruptly and ended without synthesis. Each revised chapter now has an introduction, learning outcomes, worked examples, key terms, a summary and review questions.",
      el: "Τα κεφάλαια ξεκινούσαν απότομα και ολοκληρώνονταν χωρίς σύνθεση. Κάθε αναθεωρημένο κεφάλαιο διαθέτει πλέον εισαγωγή, μαθησιακά αποτελέσματα, παραδείγματα, βασικούς όρους, σύνοψη και ερωτήσεις ανασκόπησης.",
    },
  },
];

export const principles: L<string[]> = {
  en: [
    "Explain before you list: every enumeration is introduced by a sentence that says why it matters.",
    "Define every term and acronym at first use; keep one term for one concept throughout the book.",
    "Prefer full sentences with explicit causal connectives (because, therefore, however) over symbols.",
    "Anchor abstract ideas in a concrete example or case study.",
    "Write Greek as Greek: idiomatic syntax, established terminology, English term in parentheses only on first use.",
    "Keep the two language versions semantically equivalent, paragraph by paragraph, so that they can be read in parallel.",
  ],
  el: [
    "Εξήγηση πριν από την απαρίθμηση: κάθε λίστα εισάγεται με μια πρόταση που εξηγεί γιατί έχει σημασία.",
    "Ορισμός κάθε όρου και ακρωνυμίου στην πρώτη εμφάνιση· ένας όρος για μία έννοια σε όλο το βιβλίο.",
    "Πλήρεις προτάσεις με ρητούς αιτιακούς συνδέσμους (επειδή, επομένως, ωστόσο) αντί για σύμβολα.",
    "Σύνδεση των αφηρημένων εννοιών με συγκεκριμένο παράδειγμα ή μελέτη περίπτωσης.",
    "Ελληνικά γραμμένα ως ελληνικά: φυσική σύνταξη, καθιερωμένη ορολογία, αγγλικός όρος σε παρένθεση μόνο στην πρώτη εμφάνιση.",
    "Σημασιολογική αντιστοιχία των δύο γλωσσικών εκδοχών ανά παράγραφο, ώστε να μπορούν να διαβαστούν παράλληλα.",
  ],
};

/** Terminology concordance used for the Greek edition. */
export const terminology: [string, string][] = [
  ["Confidentiality / Integrity / Availability", "Εμπιστευτικότητα / Ακεραιότητα / Διαθεσιμότητα"],
  ["Non-repudiation", "Μη αποποίηση"],
  ["Accountability", "Λογοδοσία"],
  ["Least privilege", "Ελάχιστο προνόμιο"],
  ["Defence in depth", "Άμυνα σε βάθος"],
  ["Fail-safe defaults", "Ασφαλείς προεπιλογές"],
  ["Threat / Vulnerability / Risk", "Απειλή / Ευπάθεια / Κίνδυνος"],
  ["Residual risk", "Υπολειπόμενος κίνδυνος"],
  ["Attack surface", "Επιφάνεια επίθεσης"],
  ["Malware", "Κακόβουλο λογισμικό"],
  ["Worm / Trojan", "Σκουλήκι / Δούρειος ίππος"],
  ["Ransomware", "Λυτρισμικό"],
  ["Indicator of compromise (IoC)", "Ένδειξη παραβίασης (IoC)"],
  ["Social engineering", "Κοινωνική μηχανική"],
  ["Phishing", "Ηλεκτρονικό ψάρεμα (phishing)"],
  ["Man-in-the-middle", "Επίθεση ενδιάμεσου (MITM)"],
  ["Hash function", "Συνάρτηση κατακερματισμού"],
  ["Digital signature", "Ψηφιακή υπογραφή"],
  ["Public key infrastructure", "Υποδομή δημόσιου κλειδιού (ΥΔΚ/PKI)"],
  ["Single sign-on", "Ενιαία σύνδεση (SSO)"],
  ["Penetration testing", "Δοκιμή διείσδυσης"],
  ["Threat hunting", "Προληπτική αναζήτηση απειλών"],
  ["Incident response", "Απόκριση σε περιστατικά"],
  ["Order of volatility", "Σειρά πτητικότητας"],
  ["Business continuity", "Επιχειρησιακή συνέχεια"],
  ["Zero Trust", "Μηδενική εμπιστοσύνη (Zero Trust)"],
];

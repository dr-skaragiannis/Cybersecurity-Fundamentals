import type { CliLab, HandsOnLab, TechnicalProject, QuizQuestion } from "../types";

export const ch13CliLab: CliLab = {
  id: "ch13-cli",
  title: {
    en: "Cyber Governance, Risk Modeling & Post-Quantum Readiness Sandbox",
    el: "Προσομοιωτής Κυβερνοδιακυβέρνησης, Μοντελοποίησης Κινδύνου & Μετα-Κβαντικής Ετοιμότητας",
  },
  scenario: {
    en: "Execute an automated compliance audit against CIS Controls v8 benchmarks, compute quantitative residual risk scores using likelihood/impact matrices, test disaster recovery failover, and benchmark Post-Quantum ML-KEM algorithms.",
    el: "Εκτελέστε έλεγχο συμμόρφωσης έναντι των προτύπων CIS Controls v8, υπολογίστε υπολειπόμενο κίνδυνο, δοκιμάστε ανάκαμψη καταστροφών (DR) και μετρήστε αλγορίθμους Post-Quantum ML-KEM.",
  },
  initialPrompt: "ciso@governance-ops:~$",
  banner: {
    en: "=== Chapter 13 Cyber Resilience & Governance Sandbox ===\nFrameworks: NIST CSF 2.0 | ISO/IEC 27001:2022 | Post-Quantum Cryptography\nType 'help' for command assistance or follow the missions below.",
    el: "=== Εργαστήριο Κυβερνοανθεκτικότητας & Διακυβέρνησης Κεφαλαίου 13 ===\nΠλαίσια: NIST CSF 2.0 | ISO/IEC 27001:2022 | Μετα-Κβαντική Κρυπτογραφία\nΠληκτρολογήστε 'help' για βοήθεια ή ακολουθήστε τις παρακάτω αποστολές.",
  },
  fileSystem: {
    "cis_benchmark_policy.json": '{"benchmark":"CIS Ubuntu Linux 22.04 LTS Benchmark v1.0.0","profile":"Level 1 - Server","rules_count":153}',
    "risk_register.csv": "RiskID,Asset,Threat,Likelihood,Impact,Controls,ResidualRisk\nR-101,CustomerDB,Ransomware,4,5,MFA+Backups,18.4",
    "pqc_algorithms.txt": "ML-KEM-512 (Kyber512)\nML-KEM-768 (Kyber768 - NIST Level 3 Standard)\nML-DSA-65 (Dilithium3)",
  },
  tasks: [
    {
      id: "task-1",
      title: {
        en: "Execute Automated CIS Controls Benchmark Audit",
        el: "Εκτέλεση Αυτοματοποιημένου Ελέγχου CIS Controls Benchmark",
      },
      description: {
        en: "Run an automated compliance assessment against CIS Controls Level 1 using `cis-audit`.",
        el: "Εκτελέστε αυτοματοποιημένο έλεγχο συμμόρφωσης κατά το CIS Controls Level 1 με το `cis-audit`.",
      },
      hint: {
        en: "Execute: cis-audit --benchmark cis-ubuntu-v8",
        el: "Εκτελέστε: cis-audit --benchmark cis-ubuntu-v8",
      },
      solution: "cis-audit --benchmark cis-ubuntu-v8",
      validateRegex: "cis-audit.*cis-ubuntu-v8",
      successMessage: {
        en: "CIS Benchmark completed: 87.5% compliance score (134/153 controls passed).",
        el: "Ο έλεγχος CIS ολοκληρώθηκε: Ποσοστό συμμόρφωσης 87.5% (134/153 έλεγχοι επιτυχείς).",
      },
    },
    {
      id: "task-2",
      title: {
        en: "Calculate Residual Risk Score via Likelihood / Impact Matrix",
        el: "Υπολογισμός Υπολειπόμενου Κινδύνου μέσω Πίνακα Πιθανότητας / Επίπτωσης",
      },
      description: {
        en: "Compute residual risk for ransomware threats targeting customer databases with active MFA and immutable backups using `risk-calc`.",
        el: "Υπολογίστε τον υπολειπόμενο κίνδυνο ransomware με ενεργά μέτρα MFA και backups με το `risk-calc`.",
      },
      hint: {
        en: "Execute: risk-calc --threat ransomware --asset customer-db --controls mfa,backups",
        el: "Εκτελέστε: risk-calc --threat ransomware --asset customer-db --controls mfa,backups",
      },
      solution: "risk-calc --threat ransomware --asset customer-db --controls mfa,backups",
      validateRegex: "risk-calc.*ransomware",
      successMessage: {
        en: "Residual risk calculated: Inherent Risk (80.0) -> Residual Risk (18.4) [LOW RISK BAND].",
        el: "Ο υπολειπόμενος κίνδυνος υπολογίστηκε: Εγγενής (80.0) -> Υπολειπόμενος (18.4) [Χαμηλή Ζώνη].",
      },
    },
    {
      id: "task-3",
      title: {
        en: "Simulate Disaster Recovery Regional Failover Test",
        el: "Προσομοίωση Δοκιμής Ανάκαμψης Καταστροφών (DR Failover)",
      },
      description: {
        en: "Test disaster recovery failover automation to secondary cloud region using `dr-test`.",
        el: "Δοκιμάστε την αυτοματοποιημένη μετάπτωση ανάκαμψης καταστροφών στη δευτερεύουσα περιοχή με το `dr-test`.",
      },
      hint: {
        en: "Execute: dr-test --failover secondary-region",
        el: "Εκτελέστε: dr-test --failover secondary-region",
      },
      solution: "dr-test --failover secondary-region",
      validateRegex: "dr-test.*secondary-region",
      successMessage: {
        en: "DR Failover test SUCCESS: Recovery Point Objective (RPO) = 45s, Recovery Time Objective (RTO) = 4m 12s.",
        el: "Η δοκιμή DR ολοκληρώθηκε ΕΠΙΤΥΧΩΣ: RPO = 45 δευτερόλεπτα, RTO = 4 λεπτά 12 δευτερόλεπτα.",
      },
    },
    {
      id: "task-4",
      title: {
        en: "Benchmark Post-Quantum Cryptography (ML-KEM-768)",
        el: "Μέτρηση Επιδόσεων Μετα-Κβαντικής Κρυπτογραφίας (ML-KEM-768)",
      },
      description: {
        en: "Benchmark key generation, encapsulation, and decapsulation latency for Post-Quantum Kyber / ML-KEM-768 using `pqc-benchmark`.",
        el: "Μετρήστε την καθυστέρηση παραγωγής και ενθυλάκωσης κλειδιών για τον αλγόριθμο ML-KEM-768 με το `pqc-benchmark`.",
      },
      hint: {
        en: "Execute: pqc-benchmark --algorithm ML-KEM-768",
        el: "Εκτελέστε: pqc-benchmark --algorithm ML-KEM-768",
      },
      solution: "pqc-benchmark --algorithm ML-KEM-768",
      validateRegex: "pqc-benchmark.*ML-KEM-768",
      successMessage: {
        en: "PQC Benchmark complete: KeyGen = 0.045ms, Encap = 0.062ms, Decap = 0.051ms (Quantum-Resistant NIST Level 3 Verified).",
        el: "Η μέτρηση PQC ολοκληρώθηκε: KeyGen = 0.045ms, Encap = 0.062ms, Decap = 0.051ms (Πρότυπο NIST Level 3).",
      },
    },
  ],
};

export const ch13HandsOnLab: HandsOnLab = {
  title: {
    en: "Enterprise Cybersecurity Governance, Risk Assessment (NIST CSF 2.0 / ISO 27001) & Tabletop DR Simulation",
    el: "Επιχειρησιακή Διακυβέρνηση Κυβερνοασφάλειας, Αξιολόγηση Κινδύνου (NIST CSF 2.0 / ISO 27001) & Προσομοίωση DR",
  },
  subtitle: {
    en: "2-Hour Practical Lab: Governance Framework Alignment, FAIR Quantitative Risk Modeling, Business Impact Analysis (BIA), and Post-Quantum Migration Strategy",
    el: "Εργαστήριο 2 Ωρών: Ευθυγράμμιση Πλαισίων Διακυβέρνησης, Ποσοτική Μοντελοποίηση FAIR, Ανάλυση Επιχειρησιακών Επιπτώσεων (BIA) και Στρατηγική PQC",
  },
  duration: {
    en: "~2 Hours (120 minutes)",
    el: "~2 Ώρες (120 λεπτά)",
  },
  overview: {
    en: "In this 2-hour technical governance laboratory, students act as the Chief Information Security Officer (CISO) and Enterprise Risk Manager of a critical infrastructure operator. You will map organizational assets to the NIST Cybersecurity Framework (NIST CSF 2.0: Govern, Identify, Protect, Detect, Respond, Recover) and ISO/IEC 27001:2022 Annex A controls, perform Factor Analysis of Information Risk (FAIR) quantitative risk calculations, design a comprehensive Business Impact Analysis (BIA) with strict RPO/RTO parameters, conduct a tabletop disaster recovery simulation, and formulate a Post-Quantum Cryptography (PQC) readiness roadmap.",
    el: "Σε αυτό το εργαστήριο διακυβέρνησης 2 ωρών, οι φοιτητές αναλαμβάνουν τον ρόλο του CISO και Διαχειριστή Εταιρικού Κινδύνου. Θα αντιστοιχίσετε περιουσιακά στοιχεία στο NIST Cybersecurity Framework (NIST CSF 2.0) και στους ελέγχους ISO/IEC 27001:2022 Annex A, θα εκτελέσετε ποσοτική ανάλυση κινδύνου κατά το μοντέλο FAIR, θα συντάξετε μια Ανάλυση Επιχειρησιακών Επιπτώσεων (BIA) με παραμέτρους RPO/RTO, θα πραγματοποιήσετε προσομοίωση αποκατάστασης καταστροφών (Tabletop DR) και θα διαμορφώσετε έναν οδικό χάρτη μετάβασης σε Μετα-Κβαντική Κρυπτογραφία (PQC).",
  },
  environment: [
    "Governance Workstation with Python 3.11, OpenFAIR risk calculation tools, CIS-CAT toolset",
    "NIST CSF 2.0 Core Reference Mapping spreadsheets",
    "ISO/IEC 27001:2022 Statement of Applicability (SoA) templates",
    "Post-Quantum Cryptography OpenSSL / liboqs benchmarking binaries",
  ],
  phases: [
    {
      phaseNumber: 1,
      title: {
        en: "Governance Alignment: NIST CSF 2.0 & ISO/IEC 27001:2022",
        el: "Ευθυγράμμιση Διακυβέρνησης: NIST CSF 2.0 & ISO/IEC 27001:2022",
      },
      estimatedTime: { en: "25 min", el: "25 λεπτά" },
      objectives: {
        en: [
          "Structure governance across the 6 NIST CSF 2.0 functions (Govern, Identify, Protect, Detect, Respond, Recover).",
          "Draft the Statement of Applicability (SoA) for 20 critical ISO/IEC 27001:2022 controls.",
          "Identify regulatory compliance mandates (EU NIS2 Directive, DORA, GDPR).",
        ],
        el: [
          "Δόμηση διακυβέρνησης στις 6 λειτουργίες του NIST CSF 2.0 (Govern, Identify, Protect, Detect, Respond, Recover).",
          "Σύνταξη Δήλωσης Εφαρμοσιμότητας (SoA) για 20 κρίσιμους ελέγχους ISO/IEC 27001:2022.",
          "Εντοπισμός κανονιστικών απαιτήσεων (Οδηγία NIS2, Κανονισμός DORA, GDPR).",
        ],
      },
      steps: {
        en: [
          "1. Inspect `/workspace/governance/nist_csf_core.json`.\n2. Populate the Statement of Applicability matrix justifying control inclusion/exclusion.\n3. Map NIS2 incident reporting timelines (24-hour early warning, 72-hour notification).",
        ],
        el: [
          "1. Εξέταση του αρχείου `/workspace/governance/nist_csf_core.json`.\n2. Συμπλήρωση της Δήλωσης Εφαρμοσιμότητας (SoA) με αιτιολόγηση ελέγχων.\n3. Χαρτογράφηση των προθεσμιών αναφοράς περιστατικών της NIS2 (έγκαιρη προειδοποίηση 24 ωρών, επίσημη αναφορά 72 ωρών).",
        ],
      },
    },
    {
      phaseNumber: 2,
      title: {
        en: "Quantitative Risk Assessment (FAIR Model)",
        el: "Ποσοτική Αξιολόγηση Κινδύνου (Μοντέλο FAIR)",
      },
      estimatedTime: { en: "45 min", el: "45 λεπτά" },
      objectives: {
        en: [
          "Decompose risk scenarios using Factor Analysis of Information Risk (Threat Event Frequency × Vulnerability × Primary/Secondary Loss).",
          "Execute Monte Carlo simulations in Python to model Annual Loss Expectancy (ALE).",
          "Establish Cost-Benefit Analysis for prospective security investments.",
        ],
        el: [
          "Αποδόμηση σεναρίων κινδύνου βάσει του μοντέλου FAIR (Συχνότητα Συμβάντων × Ευπάθεια × Απώλεια).",
          "Εκτέλεση προσομοιώσεων Monte Carlo σε Python για υπολογισμό της Ετήσιας Αναμενόμενης Απώλειας (ALE).",
          "Σύνταξη ανάλυσης κόστους-οφέλους (Cost-Benefit Analysis) για επενδύσεις ασφάλειας.",
        ],
      },
      steps: {
        en: [
          "1. Run FAIR Monte Carlo simulation script:\n```bash\npython3 /workspace/scripts/run_fair_model.py --iterations 10000 --input risk_scenarios.json\n```\n2. Inspect 95th percentile Value at Risk (VaR) distribution curves.\n3. Quantify risk reduction achieved by enforcing hardware MFA across administrative tiers.",
        ],
        el: [
          "1. Εκτέλεση προσομοίωσης Monte Carlo κατά το μοντέλο FAIR:\n```bash\npython3 /workspace/scripts/run_fair_model.py --iterations 10000 --input risk_scenarios.json\n```\n2. Εξέταση καμπυλών κατανομής Value at Risk (VaR).\n3. Ποσοτικοποίηση της μείωσης κινδύνου από την εφαρμογή υλικού MFA σε διαχειριστές.",
        ],
      },
    },
    {
      phaseNumber: 3,
      title: {
        en: "Business Impact Analysis (BIA) & Tabletop DR Exercise",
        el: "Ανάλυση Επιχειρησιακών Επιπτώσεων (BIA) & Άσκηση Προσομοίωσης DR",
      },
      estimatedTime: { en: "30 min", el: "30 λεπτά" },
      objectives: {
        en: [
          "Define Maximum Tolerable Downtime (MTD), Recovery Time Objective (RTO), and Recovery Point Objective (RPO) for core applications.",
          "Conduct a structured tabletop disaster recovery exercise responding to a catastrophic datacenter outage.",
          "Verify offsite immutable backup restoration workflows (3-2-1-1-0 rule).",
        ],
        el: [
          "Καθορισμός MTD, RTO και RPO για κρίσιμες εφαρμογές.",
          "Διεξαγωγή δομημένης άσκησης επί χάρτου (Tabletop DR) για καταστροφική αστοχία datacenter.",
          "Επαλήθευση επαναφοράς από αναλλοίωτα αντίγραφα ασφαλείας (κανόνας 3-2-1-1-0).",
        ],
      },
      steps: {
        en: [
          "1. Review BIA parameters in `/workspace/governance/bia_matrix.xlsx`.\n2. Simulate datacenter loss and trigger disaster recovery failover automation scripts.\n3. Validate application integrity post-failover within target RTO < 15 minutes.",
        ],
        el: [
          "1. Έλεγχος παραμέτρων BIA στον πίνακα `/workspace/governance/bia_matrix.xlsx`.\n2. Προσομοίωση απώλειας datacenter και ενεργοποίηση σεναρίων failover.\n3. Επαλήθευση ακεραιότητας εφαρμογών μετά τη μετάπτωση εντός RTO < 15 λεπτών.",
        ],
      },
    },
    {
      phaseNumber: 4,
      title: {
        en: "Post-Quantum Cryptography (PQC) Migration Roadmap",
        el: "Στρατηγικός Οδικός Χάρτης Μετάβασης σε Μετα-Κβαντική Κρυπτογραφία",
      },
      estimatedTime: { en: "20 min", el: "20 λεπτά" },
      objectives: {
        en: [
          "Inventory vulnerable public-key cryptographic assets (RSA, ECC, DH) across the enterprise.",
          "Benchmark NIST-standardized PQC algorithms (ML-KEM/Kyber, ML-DSA/Dilithium, SLH-DSA/SPHINCS+).",
          "Formulate an enterprise Cryptographic Agility and Migration Roadmap for 2026–2030.",
        ],
        el: [
          "Καταγραφή ευάλωτων κλασικών κρυπτογραφικών στοιχείων (RSA, ECC) στην επιχείρηση.",
          "Μέτρηση απόδοσης αλγορίθμων PQC του NIST (ML-KEM/Kyber, ML-DSA/Dilithium).",
          "Σύνταξη οδικού χάρτη Κρυπτογραφικής Ευελιξίας (Crypto-Agility) για την περίοδο 2026–2030.",
        ],
      },
      steps: {
        en: [
          "1. Run cryptographic discovery scan identifying legacy RSA certificates across endpoints:\n```bash\npython3 /workspace/scripts/pqc_inventory.py --scan-dir /etc/ssl/\n```\n2. Test hybrid TLS 1.3 key exchange combining X25519 with ML-KEM-768.\n3. Compile final CISO Governance & Resilience Strategy Report.",
        ],
        el: [
          "1. Εκτέλεση σάρωσης κρυπτογραφικών περιουσιακών στοιχείων για εντοπισμό πιστοποιητικών RSA:\n```bash\npython3 /workspace/scripts/pqc_inventory.py --scan-dir /etc/ssl/\n```\n2. Δοκιμή υβριδικής ανταλλαγής κλειδιών TLS 1.3 συνδυάζοντας X25519 με ML-KEM-768.\n3. Σύνταξη της τελικής επιτελικής έκθεσης διακυβέρνησης και ανθεκτικότητας.",
        ],
      },
    },
  ],
  deliverables: {
    en: [
      "ISO/IEC 27001:2022 Statement of Applicability & NIST CSF 2.0 Mapping Matrix (`soa_matrix.xlsx`)",
      "FAIR Quantitative Risk Assessment & Monte Carlo Simulation Report (`fair_risk_analysis.pdf`)",
      "Business Impact Analysis (BIA) & Disaster Recovery Tabletop Summary (`dr_tabletop_summary.pdf`)",
      "Enterprise Post-Quantum Cryptography (PQC) Migration Roadmap (4–5 pages)",
    ],
    el: [
      "Δήλωση Εφαρμοσιμότητας ISO/IEC 27001:2022 & Πίνακας NIST CSF 2.0 (`soa_matrix.xlsx`)",
      "Έκθεση Ποσοτικής Αξιολόγησης Κινδύνου FAIR & Monte Carlo (`fair_risk_analysis.pdf`)",
      "Ανάλυση Επιχειρησιακών Επιπτώσεων (BIA) & Σύνοψη Άσκησης DR (`dr_tabletop_summary.pdf`)",
      "Στρατηγικός Οδικός Χάρτης Μετάβασης σε Μετα-Κβαντική Κρυπτογραφία (4–5 σελίδες)",
    ],
  },
  verificationChecklist: {
    en: [
      "NIST CSF 2.0 mapping includes the new 'Govern' (GV) function categories.",
      "FAIR quantitative risk calculations provide 95th percentile financial loss ranges.",
      "BIA parameters (MTD, RTO, RPO) are defined and tested in tabletop exercise.",
      "PQC migration roadmap identifies vulnerable cryptographic primitives and establishes hybrid transition plans.",
    ],
    el: [
      "Η χαρτογράφηση NIST CSF 2.0 περιλαμβάνει τις κατηγορίες της νέας λειτουργίας 'Govern' (GV).",
      "Οι υπολογισμοί FAIR παρέχουν σαφή εκτίμηση οικονομικής απώλειας σε διάστημα 95%.",
      "Οι παράμετροι BIA (MTD, RTO, RPO) καθορίζονται και επαληθεύονται στην άσκηση.",
      "Ο οδικός χάρτης PQC περιλαμβάνει σχέδιο υβριδικής μετάβασης στους αλγορίθμους του NIST.",
    ],
  },
};

export const ch13Project: TechnicalProject = {
  id: "ch13-arch",
  category: {
    en: "Enterprise Architecture & Assessment Blueprint",
    el: "Αρχιτεκτονική Επιχείρησης & Στρατηγικό Πλάνο",
  },
  title: {
    en: "Enterprise Cyber Resilience Strategy & Post-Quantum Cryptography Migration Plan",
    el: "Εταιρική Στρατηγική Κυβερνοανθεκτικότητας & Σχέδιο Μετάβασης σε Μετα-Κβαντική Κρυπτογραφία",
  },
  subtitle: {
    en: "Governance Architecture, NIS2/DORA Compliance Framework, Quantitative Risk Modeling, and PQC Implementation Charter",
    el: "Αρχιτεκτονική Διακυβέρνησης, Πλαίσιο Συμμόρφωσης NIS2/DORA, Ποσοτική Μοντελοποίηση Κινδύνου και Καταστατικό PQC",
  },
  scenario: {
    en: "A critical national energy and telecommunications conglomerate operates across 12 European countries under the regulatory mandates of the EU NIS2 Directive, the Digital Operational Resilience Act (DORA), and ISO/IEC 27001:2022. You are commissioned as Principal Cyber Governance & Resilience Strategist to formulate an enterprise-wide cyber resilience strategy, deploy quantitative risk modeling (FAIR), establish a continuous business continuity framework, and deliver a comprehensive 5-year Post-Quantum Cryptography migration charter.",
    el: "Ένας διεθνής όμιλος ενέργειας και τηλεπικοινωνιών λειτουργεί σε 12 ευρωπαϊκές χώρες υπό τις αυστηρές απαιτήσεις της Οδηγίας NIS2, του Κανονισμού DORA και του προτύπου ISO/IEC 27001:2022. Σας ανατίθεται ως Επικεφαλής Στρατηγικός Σύμβουλος Διακυβέρνησης να συντάξετε μια εταιρική στρατηγική κυβερνοανθεκτικότητας, να αναπτύξετε ποσοτική μοντελοποίηση κινδύνου (FAIR), να δομήσετε πλαίσιο επιχειρησιακής συνέχειας και να παραδώσετε ένα 5ετές σχέδιο μετάβασης σε Μετα-Κβαντική Κρυπτογραφία.",
  },
  objectives: {
    en: [
      "Architect an integrated enterprise governance matrix mapping ISO/IEC 27001:2022, NIST CSF 2.0, EU NIS2, and DORA.",
      "Develop a quantitative FAIR risk analysis engine in Python modeling 10 critical operational threat scenarios.",
      "Formulate a complete Business Continuity Plan (BCP) and Disaster Recovery (DR) playbook.",
      "Deliver a technical Post-Quantum Cryptography (PQC) migration blueprint adhering to NIST FIPS 203/204 standards.",
    ],
    el: [
      "Σχεδιασμός ενοποιημένου πίνακα διακυβέρνησης για ISO/IEC 27001, NIST CSF 2.0, NIS2 και DORA.",
      "Ανάπτυξη μηχανής ποσοτικής ανάλυσης κινδύνου FAIR σε Python για 10 κρίσιμα επιχειρησιακά σενάρια.",
      "Σύνταξη πλήρους Σχεδίου Επιχειρησιακής Συνέχειας (BCP) και εγχειριδίου Ανάκαμψης Καταστροφών (DR).",
      "Παράδοση τεχνικού σχεδίου μετάβασης σε Μετα-Κβαντική Κρυπτογραφία κατά τα πρότυπα NIST FIPS 203/204.",
    ],
  },
  scope: {
    en: [
      "Enterprise scope: Datacenters, SCADA/ICS industrial control systems, cloud multi-tenant infrastructure.",
      "Cryptographic inventory: 50,000 internal TLS certificates, VPN endpoints, code signing keys, and HSMs.",
    ],
    el: [
      "Εύρος: Κέντρα δεδομένων, βιομηχανικά συστήματα ελέγχου SCADA/ICS, υποδομές cloud.",
      "Κρυπτογραφική απογραφή: 50.000 πιστοποιητικά TLS, πύλες VPN, κλειδιά υπογραφής κώδικα και HSMs.",
    ],
  },
  milestones: [
    {
      milestoneNumber: 1,
      title: {
        en: "Regulatory Compliance & Integrated Governance Framework",
        el: "Κανονιστική Συμμόρφωση & Ενοποιημένο Πλαίσιο Διακυβέρνησης",
      },
      description: {
        en: "Synthesize compliance mandates across NIS2, DORA, and ISO 27001 into a unified control catalog with automated compliance reporting.",
        el: "Σύνθεση των απαιτήσεων NIS2, DORA και ISO 27001 σε ενιαίο κατάλογο μέτρων με αυτοματοποιημένες αναφορές.",
      },
      detailedSpec: {
        en: [
          "Conduct enterprise Business Impact Analysis (BIA) evaluating revenue loss per hour for all core business services.",
          "Define formal Maximum Tolerable Downtime (MTD), Recovery Time Objectives (RTO < 15m), and Recovery Point Objectives (RPO < 5m).",
          "Identify inter-service application dependencies and single points of failure (SPOF)."
],
        el: [
          "Διενέργεια Business Impact Analysis (BIA) με εκτίμηση οικονομικής απώλειας ανά ώρα διακοπής.",
          "Καθορισμός στόχων MTD, RTO (< 15 min) και RPO (< 5 min) για κρίσιμες υπηρεσίες.",
          "Εντοπισμός εξαρτήσεων εφαρμογών και μοναδικών σημείων αποτυχίας (SPOF)."
],
      },
      deliverable: {
        en: "Integrated Compliance Matrix (Excel/CSV) + Governance Charter.",
        el: "Πίνακας Ενοποιημένης Συμμόρφωσης + Καταστατικό Διακυβέρνησης.",
      },
    },
    {
      milestoneNumber: 2,
      title: {
        en: "Quantitative FAIR Risk Assessment & Monte Carlo Engine",
        el: "Ποσοτική Αξιολόγηση Κινδύνου FAIR & Μηχανή Monte Carlo",
      },
      description: {
        en: "Develop `fair_engine.py` modeling threat event frequencies, vulnerability probabilities, and financial loss distributions across 10 scenarios.",
        el: "Ανάπτυξη του `fair_engine.py` για μοντελοποίηση συχνότητας απειλών, πιθανοτήτων ευπάθειας και οικονομικών απωλειών σε 10 σενάρια.",
      },
      detailedSpec: {
        en: [
          "Implement quantitative Factor Analysis of Information Risk (FAIR) mathematical model calculating Annualized Loss Expectancy (ALE).",
          "Model Threat Event Frequency (TEF) and Loss Magnitude (LM) using Modified PERT distributions.",
          "Calculate Return on Security Investment (ROSI) for multi-million euro cyber defense enhancements."
],
        el: [
          "Εφαρμογή μοντέλου FAIR για ποσοτικό υπολογισμό Ετήσιας Εκτιμώμενης Απώλειας (ALE).",
          "Μοντελοποίηση συχνότητας απειλών και μεγέθους απωλειών με κατανομές Modified PERT.",
          "Υπολογισμός απόδοσης επένδυσης ασφάλειας (ROSI) για στρατηγικά μέτρα προστασίας."
],
      },
      deliverable: {
        en: "Python FAIR modeling engine + Risk Assessment Dossier.",
        el: "Μηχανή μοντελοποίησης FAIR σε Python + Φάκελος Αξιολόγησης Κινδύνου.",
      },
    },
    {
      milestoneNumber: 3,
      title: {
        en: "Business Continuity & Automated Disaster Recovery Playbook",
        el: "Επιχειρησιακή Συνέχεια & Αυτοματοποιημένος Οδηγός Ανάκαμψης DR",
      },
      description: {
        en: "Establish BIA parameters across core services, author recovery playbooks, and automate cross-region cloud failover workflows.",
        el: "Καθορισμός παραμέτρων BIA για κρίσιμες υπηρεσίες, σύνταξη οδηγών ανάκαμψης και αυτοματοποίηση cloud failover.",
      },
      detailedSpec: {
        en: [
          "Architect multi-region active-active cloud disaster recovery infrastructure with automated data replication.",
          "Implement DNS traffic steering and health-check failover divert in < 60 seconds upon primary region failure.",
          "Establish immutable air-gapped backup vault with Write-Once-Read-Many (WORM) retention for ransomware defense."
],
        el: [
          "Αρχιτεκτονική multi-region active-active cloud disaster recovery με αυτόματο replication.",
          "Υλοποίηση μεταγωγής DNS και health checks σε < 60 δευτερόλεπτα σε αστοχία κύριας περιοχής.",
          "Δημιουργία απομονωμένου air-gapped αντιγράφου ασφαλείας με WORM retention έναντι ransomware."
],
      },
      deliverable: {
        en: "BCP/DR Playbook + automated failover validation script.",
        el: "Εγχειρίδιο BCP/DR + σενάριο αυτοματοποιημένου failover.",
      },
    },
    {
      milestoneNumber: 4,
      title: {
        en: "Post-Quantum Cryptography (PQC) 2026–2030 Migration Charter",
        el: "Καταστατικό Μετάβασης σε Μετα-Κβαντική Κρυπτογραφία 2026–2030",
      },
      description: {
        en: "Deliver an enterprise-wide migration strategy establishing cryptographic agility, hybrid TLS transition timelines, and board-level risk briefings.",
        el: "Παράδοση στρατηγικής μετάβασης με κρυπτογραφική ευελιξία, χρονοδιαγράμματα υβριδικού TLS και ενημέρωση Διοικητικού Συμβουλίου.",
      },
      detailedSpec: {
        en: [
          "Design executive tabletop crisis simulation handbook with realistic scenarios (Ransomware Extortion, Supply Chain Blackout).",
          "Establish crisis management decision trees, executive communication protocols, and legal counsel coordination.",
          "Draft comprehensive Business Continuity & Operational Cyber Resilience Plan compliant with ISO 22301 and DORA."
],
        el: [
          "Σχεδιασμός εγχειριδίου ασκήσεων επί χάρτου (tabletop) για τη διοίκηση με ρεαλιστικά σενάρια κρίσεων.",
          "Καθορισμός δέντρων αποφάσεων διαχείρισης κρίσεων και πρωτοκόλλων επικοινωνίας.",
          "Σύνταξη Πλάνου Επιχειρησιακής Συνέχειας & Ανθεκτικότητας κατά ISO 22301 και κανονισμό DORA."
],
      },
      deliverable: {
        en: "PQC Migration Charter & Executive Board Deck (12–15 pages).",
        el: "Καταστατικό Μετάβασης PQC & Παρουσίαση Διοικητικού Συμβουλίου (12–15 σελίδες).",
      },
    },
  ],
  deliverables: {
    en: [
      "Integrated Enterprise Governance & Regulatory Control Matrix (`governance_matrix.xlsx`)",
      "Python FAIR Quantitative Risk Engine Codebase (`/fair_engine/`)",
      "Enterprise Business Continuity & Disaster Recovery Manual (`bcp_dr_manual.pdf`)",
      "Executive Post-Quantum Cryptography (PQC) Migration Charter (12–15 pages)",
    ],
    el: [
      "Πίνακας Ενοποιημένης Διακυβέρνησης & Κανονιστικών Ελέγχων (`governance_matrix.xlsx`)",
      "Πηγαίος Κώδικας Μηχανής Ποσοτικού Κινδύνου FAIR (`/fair_engine/`)",
      "Εγχειρίδιο Επιχειρησιακής Συνέχειας & Ανάκαμψης Καταστροφών (`bcp_dr_manual.pdf`)",
      "Επιτελικό Καταστατικό Μετάβασης σε Μετα-Κβαντική Κρυπτογραφία (12–15 σελίδες)",
    ],
  },
  rubric: [
    {
      criterion: {
        en: "Governance Alignment & Regulatory Thoroughness",
        el: "Ευθυγράμμιση Διακυβέρνησης & Πληρότητα Κανονισμών",
      },
      weight: "30%",
      description: {
        en: "Precision of cross-mapping between ISO 27001, NIST CSF 2.0, NIS2, and DORA, with clear accountability assignments.",
        el: "Ακρίβεια αντιστοίχισης μεταξύ ISO 27001, NIST CSF 2.0, NIS2 και DORA, με σαφή ανάθεση ρόλων και λογοδοσίας.",
      },
    },
    {
      criterion: {
        en: "Quantitative Risk Modeling (FAIR) Depth",
        el: "Βάθος Ποσοτικής Μοντελοποίησης Κινδύνου (FAIR)",
      },
      weight: "25%",
      description: {
        en: "Statistical validity of Monte Carlo calculations, realistic financial loss quantification, and cost-benefit accuracy.",
        el: "Στατιστική εγκυρότητα υπολογισμών Monte Carlo, ρεαλιστική ποσοτικοποίηση οικονομικής απώλειας και ανάλυση κόστους-οφέλους.",
      },
    },
    {
      criterion: {
        en: "Business Continuity & Tabletop DR Actionability",
        el: "Εφαρμοσιμότητα Επιχειρησιακής Συνέχειας & DR",
      },
      weight: "25%",
      description: {
        en: "Clarity of RTO/RPO targets, concrete failover procedures, and resilience against multi-system catastrophic outages.",
        el: "Σαφήνεια στόχων RTO/RPO, συγκεκριμένες διαδικασίες failover και ανθεκτικότητα έναντι γενικευμένης διακοπής λειτουργίας.",
      },
    },
    {
      criterion: {
        en: "Post-Quantum Cryptography (PQC) Strategy & Vision",
        el: "Στρατηγική & Όραμα Μετα-Κβαντικής Κρυπτογραφίας",
      },
      weight: "20%",
      description: {
        en: "Viability of the cryptographic agility roadmap, alignment with NIST FIPS 203/204, and executive communication quality.",
        el: "Βιωσιμότητα οδικού χάρτη κρυπτογραφικής ευελιξίας, ευθυγράμμιση με τα πρότυπα NIST FIPS 203/204 και ποιότητα επιτελικής παρουσίασης.",
      },
    },
  ],
};

export const ch13Quiz: QuizQuestion[] = [
  {
    id: 1,
    question: {
      en: "In quantitative cyber risk analysis using the FAIR (Factor Analysis of Information Risk) framework, what are the two primary components of Risk?",
      el: "Στην ποσοτική εκτίμηση κυβερνοκινδύνου με το πλαίσιο FAIR, ποια είναι τα δύο βασικά συστατικά του Κινδύνου (Risk);",
    },
    options: {
      en: [
        "Processor Clock Frequency (GHz) and Random Access Memory Capacity (GB) measured during benchmark tests, during standard continuous monitoring and administrative audits.",
        "Number of Open Firewall Ports and Total Network Cable Length in meters across datacenter facilities, to ensure high-availability operational compliance across systems.",
        "Employee Headcount and Total Office Square Footage across corporate physical geographic sites, using standardized organizational security policy configurations.",
        "Loss Event Frequency (LEF) and Loss Magnitude (LM), evaluated quantitatively through probabilistic modeling.",
        "Operating System Kernel Version and Hypervisor Patch Release level across server clusters, across distributed multi-region cloud production environments.",
      ],
      el: [
        "Συχνότητα Επεξεργαστή (GHz) και Χωρητικότητα Μνήμης RAM (GB) μετρούμενες κατά τη διάρκεια δοκιμών, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Πλήθος Ανοικτών Θυρών Firewall και Συνολικό Μήκος Καλωδίων Δικτύου σε μέτρα στα κέντρα δεδομένων, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Αριθμός Εργαζομένων και Συνολικό Εμβαδόν Γραφείων σε τετραγωνικά μέτρα στις εγκαταστάσεις, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Συχνότητα Συμβάντων Απώλειας (LEF) και Μέγεθος Απώλειας (LM), αξιολογούμενα μέσω πιθανοτικών μοντέλων.",
        "Έκδοση Πυρήνα Λειτουργικού Συστήματος και Επίπεδο Ενημερώσεων του Hypervisor στους διακομιστές, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
      ],
    },
    correctIndex: 3,
    explanation: {
      en: "FAIR models Risk = Loss Event Frequency (how often a loss occurs) \u00d7 Loss Magnitude (financial impact per event), using Monte Carlo simulations to express risk in currency distributions.",
      el: "Το FAIR ορίζει τον Κίνδυνο = Συχνότητα Συμβάντων Απώλειας (LEF) × Μέγεθος Απώλειας (LM), χρησιμοποιώντας προσομοιώσεις Monte Carlo για την έκφραση του κινδύνου σε χρηματικές κατανομές.",
    },
  },
  {
    id: 2,
    question: {
      en: "What is the primary technical difference between Recovery Time Objective (RTO) and Recovery Point Objective (RPO) in Disaster Recovery planning?",
      el: "Ποια είναι η βασική διαφορά μεταξύ Recovery Time Objective (RTO) και Recovery Point Objective (RPO) στον σχεδιασμό αποκατάστασης καταστροφών;",
    },
    options: {
      en: [
        "RTO applies exclusively to hardware cooling systems, while RPO applies exclusively to biometric entrance doors, to ensure high-availability operational compliance across systems.",
        "RTO is calculated in monetary currency values, while RPO is calculated in network packet transmission counts, using standardized organizational security policy configurations.",
        "RTO is mandated only for public government agencies, while RPO is mandated only for private universities, across distributed multi-region cloud production environments.",
        "RTO measures central processing unit clock speeds, while RPO measures optical disc archive capacities, without requiring manual intervention from systems engineering staff.",
        "RTO defines maximum acceptable system downtime, while RPO defines maximum acceptable data loss measured in time.",
      ],
      el: [
        "Το RTO αφορά μόνο συστήματα ψύξης, ενώ το RPO αφορά μόνο βιομετρικές πόρτες εισόδου εγκαταστάσεων, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Το RTO υπολογίζεται σε χρηματικές μονάδες, ενώ το RPO υπολογίζεται σε πλήθος πακέτων δικτύου, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Το RTO επιβάλλεται μόνο σε δημόσιους φορείς, ενώ το RPO επιβάλλεται μόνο σε ιδιωτικά πανεπιστήμια, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Το RTO μετρά τη συχνότητα του επεξεργαστή, ενώ το RPO μετρά τη χωρητικότητα οπτικών δίσκων, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Το RTO ορίζει τον μέγιστο αποδεκτό χρόνο διακοπής, ενώ το RPO ορίζει τη μέγιστη αποδεκτή απώλεια δεδομένων σε χρόνο.",
      ],
    },
    correctIndex: 4,
    explanation: {
      en: "RTO is the target time to restore business operations after a disaster (downtime). RPO is the maximum acceptable age of data that must be recovered from backup (data loss).",
      el: "Το RTO είναι ο μέγιστος χρόνος επαναφοράς των συστημάτων μετά από καταστροφή (χρόνος εκτός λειτουργίας). Το RPO είναι η μέγιστη αποδεκτή απώλεια δεδομένων από το τελευταίο backup (σε χρόνο).",
    },
  },
  {
    id: 3,
    question: {
      en: "Under the European Union NIS2 Directive, which key regulatory obligations are imposed on essential and important entities?",
      el: "Σύμφωνα με την Ευρωπαϊκή Οδηγία NIS2, ποιες βασικές κανονιστικές υποχρεώσεις επιβάλλονται σε βασικές και σημαντικές οντότητες;",
    },
    options: {
      en: [
        "Mandatory cybersecurity risk management, supply chain security, incident notification within 24 hours, and executive accountability.",
        "Compulsory replacement of all corporate network infrastructure with proprietary quantum computing optical links, using standardized organizational security policy configurations.",
        "Permanent elimination of all external internet connectivity for healthcare and financial sector institutions, across distributed multi-region cloud production environments.",
        "Exemption from all data protection audits provided that organizations maintain physical biometric site locks, without requiring manual intervention from systems engineering staff.",
        "Publishing unencrypted customer database password dumps on public international regulatory web portals, to mitigate potential unauthorized system configuration drift.",
      ],
      el: [
        "Διαχείριση κυβερνοκινδύνων, ασφάλεια εφοδιαστικής αλυσίδας, κοινοποίηση συμβάντων εντός 24 ωρών και ευθύνη διοίκησης.",
        "Υποχρεωτική αντικατάσταση όλης της δικτυακής υποδομής με ιδιόκτητες κβαντικές οπτικές συνδέσεις, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Μόνιμη διακοπή της σύνδεσης στο διαδίκτυο για νοσοκομεία και τραπεζικά ιδρύματα στην Ευρωπαϊκή Ένωση, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Πλήρης απαλλαγή από ελέγχους ασφάλειας εφόσον οι οργανισμοί διαθέτουν βιομετρικές κλειδαριές, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Δημοσίευση μη κρυπτογραφημένων κωδικών πρόσβασης πελατών σε δημόσιες πύλες των ρυθμιστικών αρχών, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "NIS2 expands cybersecurity requirements to critical sectors, mandating technical risk controls, supply chain assessments, early incident notification (within 24 hours), and direct board liability.",
      el: "Η οδηγία NIS2 επεκτείνει τις απαιτήσεις κυβερνοασφάλειας σε κρίσιμους τομείς, επιβάλλοντας τεχνικά μέτρα, ασφάλεια εφοδιαστικής αλυσίδας, έγκαιρη κοινοποίηση περιστατικών (εντός 24 ωρών) και ευθύνη διοίκησης.",
    },
  },
  {
    id: 4,
    question: {
      en: "What is the primary technical objective of the EU Digital Operational Resilience Act (DORA) for the financial sector?",
      el: "Ποιος είναι ο κύριος τεχνικός στόχος του Ευρωπαϊκού Κανονισμού DORA για τον χρηματοπιστωτικό τομέα;",
    },
    options: {
      en: [
        "Replacing national fiat currencies with decentralized peer-to-peer cryptocurrency blockchain networks, across distributed multi-region cloud production environments.",
        "Strengthening digital operational resilience against ICT disruptions through strict risk management, testing, and third-party oversight.",
        "Eliminating the requirement for financial institutions to encrypt customer account records in transit, without requiring manual intervention from systems engineering staff.",
        "Forcing all European banks to store data exclusively on unencrypted physical magnetic tape cartridges, to mitigate potential unauthorized system configuration drift.",
        "Banning the use of transport layer security certificates across consumer online banking web portals, in accordance with modern zero trust architectural principles.",
      ],
      el: [
        "Αντικατάσταση των εθνικών νομισμάτων με αποκεντρωμένα δίκτυα κρυπτονομισμάτων blockchain, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Ενίσχυση της ψηφιακής επιχειρησιακής ανθεκτικότητας έναντι διακοπών ΤΠΕ μέσω διαχείρισης κινδύνου και ελέγχου τρίτων.",
        "Κατάργηση της υποχρέωσης των τραπεζών να κρυπτογραφούν τα δεδομένα λογαριασμών κατά τη μεταφορά, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Υποχρέωση όλων των ευρωπαϊκών τραπεζών να αποθηκεύουν δεδομένα σε μη κρυπτογραφημένες μαγνητικές ταινίες, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Απαγόρευση χρήσης πιστοποιητικών TLS στις πύλες ηλεκτρονικής τραπεζικής των καταναλωτών, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "DORA establishes a consolidated regulatory framework ensuring financial entities (banks, insurance, fintech) can withstand, respond to, and recover from ICT disruptions, including critical cloud service provider oversight.",
      el: "Το DORA θεσπίζει ενιαίο πλαίσιο ώστε οι χρηματοπιστωτικοί φορείς να αντέχουν και να ανακάμπτουν από περιστατικά ΤΠΕ, επιβάλλοντας αυστηρό έλεγχο και στους κρίσιμους τρίτους παρόχους cloud.",
    },
  },
  {
    id: 5,
    question: {
      en: "What is the primary focus of an Information Security Management System (ISMS) constructed according to ISO/IEC 27001?",
      el: "Ποιο είναι το κύριο αντικείμενο ενός Συστήματος Διαχείρισης Ασφάλειας Πληροφοριών (ISMS) κατά το ISO/IEC 27001;",
    },
    options: {
      en: [
        "Mandating specific proprietary hardware firewall models for all corporate local area network perimeter gateways, without requiring manual intervention from systems engineering staff.",
        "Eliminating the need for employee background verification checks during corporate recruitment processes, to mitigate potential unauthorized system configuration drift.",
        "Establishing a systematic, risk-driven framework of policies, procedures, and technical controls for continuous security improvement.",
        "Compiling frontend web application source code into static standalone assembly device driver binaries, in accordance with modern zero trust architectural principles.",
        "Replacing relational SQL database query tables with unindexed flat text files stored locally on disk, before committing changes to central production repository nodes.",
      ],
      el: [
        "Επιβολή συγκεκριμένων μοντέλων υλικού firewall σε όλες τις πύλες περιμέτρου των τοπικών δικτύων, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Κατάργηση της ανάγκης ελέγχου ιστορικού υποψηφίων υπαλλήλων κατά τη διαδικασία προσλήψεων, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Καθιέρωση ενός συστηματικού πλαισίου πολιτικών, διαδικασιών και ελέγχων βάσει κινδύνου για συνεχή βελτίωση.",
        "Μεταγλώττιση του κώδικα εφαρμογών ιστού σε στατικούς οδηγούς συσκευών πυρήνα του λειτουργικού, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Αντικατάσταση σχεσιακών πινάκων SQL με απλά αρχεία κειμένου αποθηκευμένα τοπικά στον δίσκο, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "ISO/IEC 27001 provides a holistic framework for implementing an ISMS, emphasizing risk assessment, leadership commitment, policies, technical controls (Annex A), and continuous improvement (PDCA cycle).",
      el: "Το ISO/IEC 27001 παρέχει ένα ολιστικό πλαίσιο για τη διαχείριση ασφάλειας πληροφοριών (ISMS), εστιάζοντας στην εκτίμηση κινδύνων, τις πολιτικές, τους τεχνικούς ελέγχους και τη συνεχή βελτίωση.",
    },
  },
  {
    id: 6,
    question: {
      en: "In a Business Impact Analysis (BIA), what is the primary technical objective?",
      el: "Σε μια Ανάλυση Επιχειρησιακών Επιπτώσεων (BIA), ποιος είναι ο κύριος τεχνικός στόχος;",
    },
    options: {
      en: [
        "Compiling unprivileged Python application scripts into high-performance kernel assembly device drivers, to mitigate potential unauthorized system configuration drift.",
        "Replacing public cloud virtual private clouds with local unencrypted Ethernet broadcast domains, in accordance with modern zero trust architectural principles.",
        "Measuring physical datacenter heating ventilation and air conditioning power consumption levels, before committing changes to central production repository nodes.",
        "Identifying mission-critical business processes and quantifying the financial and operational impact of their disruption over time.",
        "Managing physical facility access control badges and datacenter biometric fingerprint sensor gates, under standard operating procedures defined in corporate ISMS policies.",
      ],
      el: [
        "Μεταγλώττιση απλών scripts Python σε οδηγούς συσκευών πυρήνα υψηλής υπολογιστικής ταχύτητας, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Αντικατάσταση εικονικών δικτύων cloud VPC με τοπικά μη κρυπτογραφημένα δίκτυα εκπομπής Ethernet, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Μέτρηση της κατανάλωσης ισχύος των συστημάτων κλιματισμού HVAC στα κέντρα δεδομένων, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Εντοπισμός κρίσιμων λειτουργιών και ποσοτικοποίηση των οικονομικών και επιχειρησιακών επιπτώσεων διακοπής τους.",
        "Διαχείριση καρτών φυσικής πρόσβασης και βιομετρικών αισθητήρων στις πύλες των κέντρων δεδομένων, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
      ],
    },
    correctIndex: 3,
    explanation: {
      en: "A BIA identifies critical business functions, establishes maximum tolerable downtime (MTD), and defines RTO and RPO requirements by evaluating financial, operational, and legal impacts of disruption.",
      el: "Η ανάλυση BIA προσδιορίζει τις κρίσιμες λειτουργίες του οργανισμού και εκτιμά τις οικονομικές, λειτουργικές και νομικές επιπτώσεις μιας διακοπής, καθορίζοντας τα απαιτούμενα όρια RTO και RPO.",
    },
  },
  {
    id: 7,
    question: {
      en: "What is the primary difference between a SOC 2 Type 1 and a SOC 2 Type 2 attestation report for service organizations?",
      el: "Ποια είναι η βασική διαφορά μεταξύ μιας έκθεσης SOC 2 Type 1 και μιας έκθεσης SOC 2 Type 2 για οργανισμούς παροχής υπηρεσιών;",
    },
    options: {
      en: [
        "Type 1 applies exclusively to physical locks, while Type 2 applies exclusively to software memory management units, in accordance with modern zero trust architectural principles.",
        "Type 1 is issued only by government intelligence agencies, while Type 2 is issued only by internal employee committees, before committing changes to central production repository nodes.",
        "Type 1 requires post-quantum asymmetric encryption, while Type 2 requires classical symmetric stream block ciphers, under standard operating procedures defined in corporate ISMS policies.",
        "Type 1 evaluates network switch packet latency, while Type 2 evaluates optical storage disc archive capacities, across all internal enterprise network segments and endpoints.",
        "Type 1 evaluates control design suitability at a single point in time, while Type 2 tests operating effectiveness over a period (e.g. 6\u201312 months).",
      ],
      el: [
        "Το Type 1 αφορά μόνο φυσικές κλειδαριές, ενώ το Type 2 αφορά μόνο μονάδες διαχείρισης μνήμης MMU, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Το Type 1 εκδίδεται μόνο από κρατικές υπηρεσίες, ενώ το Type 2 εκδίδεται μόνο από εσωτερικές επιτροπές, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Το Type 1 απαιτεί μετα-κβαντική ασύμμετρη κρυπτογράφηση, ενώ το Type 2 απαιτεί κλασικά συμμετρικά ciphers, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Το Type 1 αξιολογεί την καθυστέρηση μεταγωγέων δικτύου, ενώ το Type 2 αξιολογεί χωρητικότητες οπτικών δίσκων, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Το Type 1 εξετάζει τον σχεδιασμό των ελέγχων σε μια χρονική στιγμή, ενώ το Type 2 ελέγχει την αποτελεσματικότητά τους σε βάθος χρόνου (6–12 μήνες).",
      ],
    },
    correctIndex: 4,
    explanation: {
      en: "SOC 2 Type 1 assesses whether controls are designed properly as of a specific date. SOC 2 Type 2 verifies that controls operated effectively and consistently over an extended audit period (typically 6-12 months).",
      el: "Η έκθεση SOC 2 Type 1 αξιολογεί αν τα μέτρα ασφάλειας είναι σωστά σχεδιασμένα σε μια συγκεκριμένη ημερομηνία. Η έκθεση Type 2 ελέγχει αν εφαρμόζονταν αποτελεσματικά σε περίοδο 6 έως 12 μηνών.",
    },
  },
  {
    id: 8,
    question: {
      en: "How does automated cross-region cloud database replication support high availability and disaster recovery goals?",
      el: "Πώς υποστηρίζει η αυτοματοποιημένη διαπεριφερειακή αντιγραφή βάσεων δεδομένων cloud τους στόχους υψηλής διαθεσιμότητας και ανάκαμψης;",
    },
    options: {
      en: [
        "By maintaining synchronized read replicas in a secondary geographic region for near-instant failover with minimal RPO/RTO.",
        "By converting relational database SQL queries into unindexed flat text files stored locally on workstation disks, before committing changes to central production repository nodes.",
        "By disabling operating system kernel address space layout randomization protections during application boot, under standard operating procedures defined in corporate ISMS policies.",
        "By eliminating the requirement for multi-factor authentication across administrative cloud management consoles, across all internal enterprise network segments and endpoints.",
        "By compressing database storage volumes into lossy audio waveform representations for archive tape storage, during standard continuous monitoring and administrative audits.",
      ],
      el: [
        "Διατηρώντας συγχρονισμένα αντίγραφα σε δευτερεύουσα γεωγραφική περιφέρεια για άμεση μετάπτωση με ελάχιστο RPO/RTO.",
        "Μετατρέποντας ερωτήματα SQL σε μη ευρετηριασμένα αρχεία κειμένου αποθηκευμένα τοπικά στον δίσκο, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Απενεργοποιώντας την προστασία ASLR του πυρήνα του λειτουργικού συστήματος κατά την εκκίνηση, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Καταργώντας την ανάγκη ταυτοποίησης πολλαπλών παραγόντων στις διαχειριστικές κονσόλες cloud, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Συμπιέζοντας τους τόμους της βάσης σε ακουστικά σήματα για μακροχρόνια αρχειοθέτηση σε ταινίες, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Cross-region asynchronous/synchronous replication ensures that if an entire primary cloud region suffers an outage or disaster, database traffic can fail over to the secondary region with minimal data loss (low RPO).",
      el: "Η διαπεριφερειακή αντιγραφή εξασφαλίζει ότι σε περίπτωση ολικής κατάρρευσης μιας περιφέρειας cloud, η λειτουργία μπορεί να μεταφερθεί άμεσα στη δευτερεύουσα περιοχή με ελάχιστη απώλεια δεδομένων.",
    },
  },
  {
    id: 9,
    question: {
      en: "What is the primary objective of Crisis Management and executive communication protocols during a major ransomware incident?",
      el: "Ποιος είναι ο κύριος στόχος της Διαχείρισης Κρίσεων και των πρωτοκόλλων επικοινωνίας κατά τη διάρκεια ενός σοβαρού περιστατικού ransomware;",
    },
    options: {
      en: [
        "Immediately paying ransom extortion demands using corporate credit cards without consulting law enforcement, under standard operating procedures defined in corporate ISMS policies.",
        "Coordinating legal, technical, regulatory, and public communications while maintaining strategic decision-making authority.",
        "Permanently deleting all network audit logs and security telemetry records to avoid public regulatory scrutiny, across all internal enterprise network segments and endpoints.",
        "Disabling all internal corporate network firewall routing rules to maximize external recovery bandwidth, during standard continuous monitoring and administrative audits.",
        "Purchasing new physical server blade hardware units to replace uncompromised production infrastructure, to ensure high-availability operational compliance across systems.",
      ],
      el: [
        "Άμεση πληρωμή των λύτρων με εταιρικές πιστωτικές κάρτες χωρίς προηγούμενη ενημέρωση των διωκτικών αρχών, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Συντονισμός νομικών, τεχνικών, ρυθμιστικών και δημόσιων ανακοινώσεων διατηρώντας στρατηγική λήψη αποφάσεων.",
        "Μόνιμη διαγραφή όλων των αρχείων καταγραφής και τηλεμετρίας για αποφυγή ρυθμιστικών κυρώσεων, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Απενεργοποίηση όλων των κανόνων firewall του δικτύου για μεγιστοποίηση της ταχύτητας ανάκτησης, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Αγορά νέων εξυπηρετητών για την αντικατάσταση υποδομών που δεν επηρεάστηκαν από το περιστατικό, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Crisis management establishes executive governance during an emergency, aligning technical containment, legal counsel, regulatory reporting (GDPR 72-hour notice), customer communications, and business continuity.",
      el: "Η διαχείριση κρίσεων συντονίζει τη λήψη στρατηγικών αποφάσεων, συνδέοντας την τεχνική απόκριση με τη νομική εκπροσώπηση, τις υποχρεωτικές κοινοποιήσεις στις αρχές (GDPR εντός 72 ωρών) και την επικοινωνία με τους πελάτες.",
    },
  },
  {
    id: 10,
    question: {
      en: "Why do modern cyber insurance underwriters mandate technical controls like MFA, immutable backups, and EDR prior to issuing coverage policies?",
      el: "Γιατί οι σύγχρονες ασφαλιστικές εταιρείες κυβερνοχώρου απαιτούν τεχνικά μέτρα όπως MFA, αναλλοίωτα backups και EDR πριν την έκδοση συμβολαίου;",
    },
    options: {
      en: [
        "To gain permanent administrative superuser access to corporate production database clusters for continuous monitoring, across all internal enterprise network segments and endpoints.",
        "To replace standard relational SQL database tables with non-relational document collections during active operations, during standard continuous monitoring and administrative audits.",
        "To verify baseline defensive hygiene, reducing the frequency and severity of claims from common attack vectors like ransomware.",
        "To force all enterprise workstations to communicate exclusively over unencrypted analog dial-up telephone connections, to ensure high-availability operational compliance across systems.",
        "To eliminate the necessity for organizations to comply with European Union privacy and data protection directives, using standardized organizational security policy configurations.",
      ],
      el: [
        "Για να αποκτήσουν μόνιμα δικαιώματα διαχειριστή στις βάσεις δεδομένων παραγωγής για συνεχή παρακολούθηση, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Για να αντικαταστήσουν σχεσιακές βάσεις δεδομένων με μη σχεσιακά έγγραφα κατά τις καθημερινές λειτουργίες, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Για να διασφαλίσουν βασική υγιεινή ασφάλειας, μειώνοντας τη συχνότητα και τη σοβαρότητα αποζημιώσεων από ransomware.",
        "Για να επιβάλουν στους υπολογιστές να επικοινωνούν αποκλειστικά μέσω αναλογικών τηλεφωνικών συνδέσεων dial-up, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Για να απαλλάξουν τις επιχειρήσεις από την υποχρέωση συμμόρφωσης με τους ευρωπαϊκούς κανονισμούς προστασίας δεδομένων, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "Insurers require controls that directly mitigate the leading causes of massive cyber claims: MFA blocks credential theft, EDR detects endpoint intrusions early, and immutable backups guarantee ransomware recovery without ransom payments.",
      el: "Οι ασφαλιστικές εταιρείες απαιτούν μέτρα που αποδεδειγμένα μειώνουν τον κίνδυνο καταστροφικών ζημιών: το MFA σταματά την κλοπή κωδικών, το EDR εντοπίζει επιθέσεις νωρίς, και τα immutable backups εγγυώνται ανάκαμψη από ransomware.",
    },
  },
];

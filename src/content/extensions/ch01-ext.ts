import type { CliLab, HandsOnLab, TechnicalProject, QuizQuestion } from "../types";

export const ch01CliLab: CliLab = {
  id: "ch01-cli",
  title: {
    en: "Security Baseline Auditing & CIA Evaluation Sandbox",
    el: "Προσομοιωτής Ελέγχου Βασικής Ασφάλειας & Αξιολόγησης CIA",
  },
  scenario: {
    en: "Audit a financial data repository, verify cryptographic integrity, inspect sensitive file permissions, and apply the Principle of Least Privilege.",
    el: "Ελέγξτε ένα αποθετήριο χρηματοοικονομικών δεδομένων, επαληθεύστε την κρυπτογραφική ακεραιότητα, εξετάστε τα δικαιώματα ευαίσθητων αρχείων και εφαρμόστε την Αρχή του Ελάχιστου Προνομίου.",
  },
  initialPrompt: "analyst@cia-audit:~$",
  banner: {
    en: "=== Chapter 1 Security Auditing Sandbox ===\nTarget: Financial Data Host | Role: Security Auditor\nType 'help' for command assistance or follow the missions below.",
    el: "=== Εργαστήριο Ασφάλειας Κεφαλαίου 1 ===\nΣτόχος: Εξυπηρετητής Οικονομικών Δεδομένων | Ρόλος: Ελεγκτής Ασφάλειας\nΠληκτρολογήστε 'help' για βοήθεια ή ακολουθήστε τις παρακάτω αποστολές.",
  },
  fileSystem: {
    "ledger_2026.dat": "TRANSACTION_ID: 99401 | SENDER: ACCT_4810 | RECV: ACCT_9921 | AMOUNT: 1,500,000 EUR | SIGN: 8f9a2b",
    "secret_vault.key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQD3T8...\n-----END PRIVATE KEY-----",
    "audit_policy.conf": "LOG_INTEGRITY=ENABLED\nAUDIT_RETENTION_DAYS=365\nALERT_ON_TAMPER=TRUE",
    "system_report.txt": "HOST: FIN-SRV-01 | STATUS: ONLINE | INTEGRITY_CHECK: PENDING",
  },
  tasks: [
    {
      id: "task-1",
      title: {
        en: "Verify Data Integrity via Cryptographic Hash",
        el: "Επαλήθευση Ακεραιότητας Δεδομένων μέσω Κρυπτογραφικού Κατακερματισμού",
      },
      description: {
        en: "Calculate the SHA-256 hash of the financial transaction ledger `ledger_2026.dat` to confirm it has not been tampered with.",
        el: "Υπολογίστε το SHA-256 hash του καθολικού συναλλαγών `ledger_2026.dat` για να επιβεβαιώσετε ότι δεν έχει αλλοιωθεί.",
      },
      hint: {
        en: "Use the standard utility: sha256sum ledger_2026.dat",
        el: "Χρησιμοποιήστε το εργαλείο: sha256sum ledger_2026.dat",
      },
      solution: "sha256sum ledger_2026.dat",
      validateRegex: "^sha256sum\\s+ledger_2026\\.dat",
      successMessage: {
        en: "Integrity verified! The SHA-256 digest matches the baseline ledger hash.",
        el: "Η ακεραιότητα επαληθεύτηκε! Το αποτύπωμα SHA-256 ταιριάζει με τη βάση αναφοράς.",
      },
    },
    {
      id: "task-2",
      title: {
        en: "Inspect File Permissions & Identify Least Privilege Violation",
        el: "Έλεγχος Δικαιωμάτων Αρχείων & Εντοπισμός Παραβίασης Ελάχιστου Προνομίου",
      },
      description: {
        en: "Examine detailed metadata and access permissions of the master key file `secret_vault.key` using `stat`.",
        el: "Εξετάστε τα αναλυτικά μεταδεδομένα και τα δικαιώματα πρόσβασης του αρχείου `secret_vault.key` χρησιμοποιώντας την εντολή `stat`.",
      },
      hint: {
        en: "Execute: stat secret_vault.key",
        el: "Εκτελέστε: stat secret_vault.key",
      },
      solution: "stat secret_vault.key",
      validateRegex: "^stat\\s+secret_vault\\.key",
      successMessage: {
        en: "Vulnerability identified: Key permissions are overly permissive (world-readable).",
        el: "Εντοπίστηκε ευπάθεια: Τα δικαιώματα του κλειδιού είναι υπερβολικά χαλαρά (αναγνώσιμο από όλους).",
      },
    },
    {
      id: "task-3",
      title: {
        en: "Enforce Strict Confidentiality via Least Privilege",
        el: "Επιβολή Αυστηρής Εμπιστευτικότητας μέσω Ελάχιστου Προνομίου",
      },
      description: {
        en: "Restrict permissions on `secret_vault.key` so only the owner has read/write permissions (octal mode 600).",
        el: "Περιορίστε τα δικαιώματα στο `secret_vault.key` ώστε μόνο ο ιδιοκτήτης να έχει ανάγνωση/εγγραφή (οκταδικό 600).",
      },
      hint: {
        en: "Run: chmod 600 secret_vault.key",
        el: "Εκτελέστε: chmod 600 secret_vault.key",
      },
      solution: "chmod 600 secret_vault.key",
      validateRegex: "^chmod\\s+600\\s+secret_vault\\.key",
      successMessage: {
        en: "Least privilege enforced! Access restricted exclusively to the file owner.",
        el: "Επιβλήθηκε το ελάχιστο προνόμιο! Η πρόσβαση περιορίστηκε αποκλειστικά στον ιδιοκτήτη.",
      },
    },
    {
      id: "task-4",
      title: {
        en: "Audit System Integrity Configuration",
        el: "Έλεγχος Ρύθμισης Ακεραιότητας Συστήματος",
      },
      description: {
        en: "Read the configuration in `audit_policy.conf` to verify active tampering detection settings.",
        el: "Διαβάστε τις ρυθμίσεις στο `audit_policy.conf` για να επαληθεύσετε την ενεργή ανίχνευση αλλοιώσεων.",
      },
      hint: {
        en: "Run: cat audit_policy.conf",
        el: "Εκτελέστε: cat audit_policy.conf",
      },
      solution: "cat audit_policy.conf",
      validateRegex: "^cat\\s+audit_policy\\.conf",
      successMessage: {
        en: "Audit policy confirmed active. Log retention and tamper alerts verified.",
        el: "Η πολιτική ελέγχου είναι ενεργή. Επαληθεύτηκε η διατήρηση καταγραφών και οι ειδοποιήσεις αλλοίωσης.",
      },
    },
  ],
};

export const ch01HandsOnLab: HandsOnLab = {
  title: {
    en: "Enterprise Information Security Assessment & Multi-Tier Control Hardening",
    el: "Αξιολόγηση Ασφάλειας Πληροφοριών Επιχείρησης & Πολυεπίπεδη Ενίσχυση Ελέγχων",
  },
  subtitle: {
    en: "Structured 2-Hour Practical Lab: CIA Triad Modeling, Threat Decomposition, and Control Implementation",
    el: "Δομημένο Εργαστήριο 2 Ωρών: Μοντελοποίηση Τριάδας CIA, Αποδόμηση Απειλών και Εφαρμογή Μέτρων Προστασίας",
  },
  duration: {
    en: "~2 Hours (120 minutes)",
    el: "~2 Ώρες (120 λεπτά)",
  },
  overview: {
    en: "In this comprehensive 2-hour technical laboratory, students take the role of an Information Security Consultant hired by 'FinTech Global Inc.'. You will evaluate an enterprise payment architecture, decompose real-world assets against Confidentiality, Integrity, and Availability requirements, identify single points of failure, apply Saltzer–Schroeder security principles, and implement defensive hardening controls.",
    el: "Σε αυτό το ολοκληρωμένο τεχνικό εργαστήριο διάρκειας 2 ωρών, οι φοιτητές αναλαμβάνουν τον ρόλο Συμβούλου Ασφάλειας Πληροφοριών στην εταιρεία 'FinTech Global Inc.'. Θα αξιολογήσετε μια αρχιτεκτονική πληρωμών, θα αποδομήσετε εταιρικά περιουσιακά στοιχεία βάσει των απαιτήσεων Εμπιστευτικότητας, Ακεραιότητας και Διαθεσιμότητας (CIA), θα εντοπίσετε μοναδικά σημεία αποτυχίας (SPOF), θα εφαρμόσετε τις αρχές Saltzer–Schroeder και θα υλοποιήσετε τεχνικά μέτρα ενίσχυσης.",
  },
  environment: [
    "Ubuntu Linux 24.04 LTS / Debian 12 (Virtual Machine or Container)",
    "Core utilities: `sha256sum`, `stat`, `chmod`, `auditctl`, `diff`, `openssl`, `curl`",
    "Audit daemon (`auditd`) & Netfilter/iptables tools",
    "Text editor (VS Code, Nano or Vim) for audit log review and policy configuration",
  ],
  phases: [
    {
      phaseNumber: 1,
      title: {
        en: "Asset Inventory, Classification & CIA Mapping",
        el: "Καταγραφή Περιουσιακών Στοιχείων, Ταξινόμηση & Χαρτογράφηση CIA",
      },
      estimatedTime: { en: "25 min", el: "25 λεπτά" },
      objectives: {
        en: [
          "Catalog 5 critical digital assets in the transaction pipeline.",
          "Assign Confidentiality, Integrity, and Availability impact tiers (High/Moderate/Low).",
          "Identify trade-offs between availability and strict confidentiality.",
        ],
        el: [
          "Καταγραφή 5 κρίσιμων ψηφιακών περιουσιακών στοιχείων της ροής πληρωμών.",
          "Απόδοση διαβαθμίσεων επίπτωσης CIA (Υψηλή/Μέτρια/Χαμηλή) βάσει FIPS 199.",
          "Εντοπισμός συμβιβασμών μεταξύ διαθεσιμότητας και αυστηρής εμπιστευτικότητας.",
        ],
      },
      steps: {
        en: [
          "1. Inspect the simulated corporate assets directory under `/opt/fintech/assets/`.",
          "2. Execute the inventory scan script to generate raw asset metadata:\n```bash\nls -la /opt/fintech/assets/\nfile /opt/fintech/assets/*\n```",
          "3. Fill out the CIA Security Objective Matrix evaluating Customer PII, Payment Processing API, Transaction Ledger, Secret Signing Keys, and Web Portal.",
          {
            t: "table",
            caption: "Table 1.L1 — Enterprise CIA Classification Matrix",
            head: ["Asset Name", "Confidentiality", "Integrity", "Availability", "Primary Threat Vector"],
            rows: [
              ["Customer Cardholder PII", "High", "High", "Moderate", "Data exfiltration, unauthorized dumping"],
              ["Payment Processing API", "Moderate", "High", "Critical (High)", "DDoS, API injection, MITM"],
              ["Immutable Transaction Ledger", "Moderate", "Critical (High)", "High", "Unauthorized record modification / tampering"],
              ["HSM Private Key", "Critical (High)", "Critical (High)", "Moderate", "Side-channel theft, insider extraction"],
            ],
          },
        ],
        el: [
          "1. Εξετάστε τον κατάλογο εταιρικών περιουσιακών στοιχείων στη διαδρομή `/opt/fintech/assets/`.",
          "2. Εκτελέστε την εντολή καταγραφής για συλλογή μεταδεδομένων:\n```bash\nls -la /opt/fintech/assets/\nfile /opt/fintech/assets/*\n```",
          "3. Συμπληρώστε τον Πίνακα Στόχων Ασφάλειας CIA για τα δεδομένα PII, το API πληρωμών, το Καθολικό Συναλλαγών και τα Ιδιωτικά Κλειδιά HSM.",
          {
            t: "table",
            caption: "Πίνακας 1.L1 — Πίνακας Ταξινόμησης CIA Επιχείρησης",
            head: ["Περιουσιακό Στοιχείο", "Εμπιστευτικότητα", "Ακεραιότητα", "Διαθεσιμότητα", "Κύριο Διάνυσμα Απειλής"],
            rows: [
              ["Δεδομένα PII Πελατών", "Υψηλή", "Υψηλή", "Μέτρια", "Διαρροή δεδομένων, μη εξουσιοδοτημένη εξαγωγή"],
              ["API Επεξεργασίας Πληρωμών", "Μέτρια", "Υψηλή", "Κρίσιμη (Υψηλή)", "Επιθέσεις DDoS, API injection, MITM"],
              ["Καθολικό Συναλλαγών", "Μέτρια", "Κρίσιμη (Υψηλή)", "Υψηλή", "Μη εξουσιοδοτημένη τροποποίηση / αλλοίωση"],
              ["Ιδιωτικό Κλειδί HSM", "Κρίσιμη (Υψηλή)", "Κρίσιμη (Υψηλή)", "Μέτρια", "Κλοπή κλειδιού, εσωτερική κακόβουλη εξαγωγή"],
            ],
          },
        ],
      },
    },
    {
      phaseNumber: 2,
      title: {
        en: "Cryptographic Integrity Auditing & Tamper Detection",
        el: "Έλεγχος Κρυπτογραφικής Ακεραιότητας & Ανίχνευση Αλλοιώσεων",
      },
      estimatedTime: { en: "45 min", el: "45 λεπτά" },
      objectives: {
        en: [
          "Establish a baseline cryptographic manifest using SHA-256 digests.",
          "Simulate an unauthorized bit-level tampering attack on payment records.",
          "Detect discrepancies using automated hash verification and diff inspection.",
        ],
        el: [
          "Δημιουργία κρυπτογραφικού αρχείου βάσης αναφοράς με αποτυπώματα SHA-256.",
          "Προσομοίωση μη εξουσιοδοτημένης επίθεσης αλλοίωσης σε επίπεδο byte στα αρχεία πληρωμών.",
          "Ανίχνευση αποκλίσεων με αυτοματοποιημένη επαλήθευση κατακερματισμού και diff.",
        ],
      },
      steps: {
        en: [
          "1. Generate the baseline cryptographic checksum manifest for all production configuration files:\n```bash\nsha256sum /opt/fintech/assets/*.dat > /var/log/baseline_hashes.sha256\ncat /var/log/baseline_hashes.sha256\n```",
          "2. Simulate an adversary tampering with transaction record #4801:\n```bash\nsed -i 's/AMOUNT: 100/AMOUNT: 99000/' /opt/fintech/assets/ledger_2026.dat\n```",
          "3. Run automated verification against the baseline manifest:\n```bash\nsha256sum --check /var/log/baseline_hashes.sha256\n```",
          "4. Analyze the output: Note that `sha256sum` immediately flags `FAILED` on `ledger_2026.dat`. Trace exact changes using hexadecimal inspection:\n```bash\nhexdump -C /opt/fintech/assets/ledger_2026.dat | head -n 10\n```",
        ],
        el: [
          "1. Δημιουργήστε το αρχείο αναφοράς κρυπτογραφικών αποτυπωμάτων για όλα τα αρχεία ρυθμίσεων:\n```bash\nsha256sum /opt/fintech/assets/*.dat > /var/log/baseline_hashes.sha256\ncat /var/log/baseline_hashes.sha256\n```",
          "2. Προσομοιώστε επίθεση αλλοίωσης στη συναλλαγή #4801:\n```bash\nsed -i 's/AMOUNT: 100/AMOUNT: 99000/' /opt/fintech/assets/ledger_2026.dat\n```",
          "3. Εκτελέστε αυτοματοποιημένο έλεγχο έναντι του αρχείου βάσης:\n```bash\nsha256sum --check /var/log/baseline_hashes.sha256\n```",
          "4. Αναλύστε την έξοδο: Το εργαλείο επισημαίνει άμεσα `FAILED` στο `ledger_2026.dat`. Εντοπίστε την ακριβή αλλαγή με δεκαεξαδικό έλεγχο:\n```bash\nhexdump -C /opt/fintech/assets/ledger_2026.dat | head -n 10\n```",
        ],
      },
    },
    {
      phaseNumber: 3,
      title: {
        en: "Applying Saltzer–Schroeder Principles & Least Privilege",
        el: "Εφαρμογή Αρχών Saltzer–Schroeder & Ελάχιστου Προνομίου",
      },
      estimatedTime: { en: "30 min", el: "30 λεπτά" },
      objectives: {
        en: [
          "Audit file system DAC permissions across critical application directories.",
          "Eliminate World-Writable and World-Readable permissions on secret keys.",
          "Implement fail-safe defaults and complete mediation.",
        ],
        el: [
          "Έλεγχος δικαιωμάτων DAC σε κρίσιμους καταλόγους της εφαρμογής.",
          "Εξάλειψη δικαιωμάτων καθολικής ανάγνωσης/εγγραφής (777, 666) σε ιδιωτικά κλειδιά.",
          "Εφαρμογή ασφαλών προεπιλογών (fail-safe defaults) και πλήρους διαμεσολάβησης.",
        ],
      },
      steps: {
        en: [
          "1. Scan the filesystem for dangerously permissive files:\n```bash\nfind /opt/fintech -perm -o=w -o -perm -o=r -ls\n```",
          "2. Remediation: Reconfigure ownership to dedicated service user `fintech-svc` and restrict permissions to `600`:\n```bash\nsudo chown -R fintech-svc:fintech-group /opt/fintech/secrets\nsudo chmod 600 /opt/fintech/secrets/*.key\nsudo chmod 700 /opt/fintech/secrets\n```",
          "3. Verify using `stat`:\n```bash\nstat /opt/fintech/secrets/master.key\n```",
          "4. Enable continuous integrity monitoring via Linux `auditd` rules:\n```bash\nsudo auditctl -w /opt/fintech/secrets/master.key -p wa -k secret_key_tamper\nsudo auditctl -l\n```",
        ],
        el: [
          "1. Εντοπίστε επικίνδυνα δικαιώματα στο σύστημα αρχείων:\n```bash\nfind /opt/fintech -perm -o=w -o -perm -o=r -ls\n```",
          "2. Αποκατάσταση: Αναθέστε την ιδιοκτησία στον αποκλειστικό χρήστη `fintech-svc` και περιορίστε τα δικαιώματα σε `600`:\n```bash\nsudo chown -R fintech-svc:fintech-group /opt/fintech/secrets\nsudo chmod 600 /opt/fintech/secrets/*.key\nsudo chmod 700 /opt/fintech/secrets\n```",
          "3. Επαληθεύστε με την εντολή `stat`:\n```bash\nstat /opt/fintech/secrets/master.key\n```",
          "4. Ενεργοποιήστε συνεχή παρακολούθηση ακεραιότητας μέσω του δαίμονα `auditd`:\n```bash\nsudo auditctl -w /opt/fintech/secrets/master.key -p wa -k secret_key_tamper\nsudo auditctl -l\n```",
        ],
      },
    },
    {
      phaseNumber: 4,
      title: {
        en: "Residual Risk Calculation & Audit Documentation",
        el: "Υπολογισμός Υπολειπόμενου Κινδύνου & Σύνταξη Έκθεσης Ελέγχου",
      },
      estimatedTime: { en: "20 min", el: "20 λεπτά" },
      objectives: {
        en: [
          "Calculate Inherent vs. Residual Risk using the formula: Risk = Likelihood × Impact.",
          "Document controls implemented and remaining operational vulnerabilities.",
          "Formulate formal Common Criteria / EAL evaluation recommendations.",
        ],
        el: [
          "Υπολογισμός Εγγενούς έναντι Υπολειπόμενου Κινδύνου (Κίνδυνος = Πιθανότητα × Επίπτωση).",
          "Τεκμηρίωση των μέτρων που εφαρμόστηκαν και των εναπομενουσών ευπαθειών.",
          "Διατύπωση επίσημων συστάσεων αξιολόγησης βάσει Common Criteria / EAL.",
        ],
      },
      steps: {
        en: [
          "1. Review the risk assessment table before and after control implementation.",
          "2. Synthesize all findings into the final audit log summary:\n```bash\nsudo ausearch -k secret_key_tamper --format text > /var/log/audit_evidence.log\n```",
          "3. Verify that all 4 lab missions and deliverables meet enterprise compliance standards.",
        ],
        el: [
          "1. Εξετάστε τον πίνακα αξιολόγησης κινδύνου πριν και μετά την εφαρμογή των μέτρων.",
          "2. Συνθέστε τα ευρήματα στην τελική αναφορά ελέγχου:\n```bash\nsudo ausearch -k secret_key_tamper --format text > /var/log/audit_evidence.log\n```",
          "3. Επιβεβαιώστε ότι και οι 4 αποστολές του εργαστηρίου πληρούν τα πρότυπα συμμόρφωσης.",
        ],
      },
    },
  ],
  deliverables: {
    en: [
      "Completed CIA Asset Classification Matrix (`cia_matrix.xlsx` or Markdown table)",
      "Cryptographic Baseline Hash Manifest and Verification Log (`baseline_hashes.sha256`)",
      "Linux `auditd` Ruleset and Evidence Log (`secret_key_tamper.log`)",
      "Executive Technical Lab Report (2 pages) outlining Threat, Vulnerability, and Residual Risk",
    ],
    el: [
      "Συμπληρωμένος Πίνακας Ταξινόμησης CIA (`cia_matrix.xlsx` ή πίνακας Markdown)",
      "Αρχείο Βάσης Κρυπτογραφικών Αποτυπωμάτων και Καταγραφή Επαλήθευσης (`baseline_hashes.sha256`)",
      "Κανόνες `auditd` και Αρχείο Αποδεικτικών Ελέγχου (`secret_key_tamper.log`)",
      "Τεχνική Έκθεση Εργαστηρίου (2 σελίδων) με ανάλυση Απειλών, Ευπαθειών και Υπολειπόμενου Κινδύνου",
    ],
  },
  verificationChecklist: {
    en: [
      "Asset inventory correctly categorizes 5 assets with reasoned CIA impact ratings.",
      "SHA-256 verification reliably detects single-byte modifications in `ledger_2026.dat`.",
      "Permissions on `/opt/fintech/secrets` are strictly restricted to 0600/0700.",
      "`auditctl` actively records any write or attribute modification on key files.",
      "Residual risk equation is computed and justified for remaining third-party risks.",
    ],
    el: [
      "Η καταγραφή περιουσιακών στοιχείων κατηγοριοποιεί ορθά 5 στοιχεία με αιτιολογημένη βαθμολόγηση CIA.",
      "Η επαλήθευση SHA-256 εντοπίζει αξιόπιστα τροποποιήσεις ενός byte στο `ledger_2026.dat`.",
      "Τα δικαιώματα στο `/opt/fintech/secrets` είναι αυστηρά περιορισμένα σε 0600/0700.",
      "Το `auditctl` καταγράφει ενεργά οποιαδήποτε εγγραφή ή τροποποίηση ιδιοτήτων στα κλειδιά.",
      "Η εξίσωση υπολειπόμενου κινδύνου υπολογίζεται και αιτιολογείται πλήρως.",
    ],
  },
};

export const ch01Project: TechnicalProject = {
  id: "ch01-arch",
  category: {
    en: "Enterprise Architecture & Assessment Blueprint",
    el: "Αρχιτεκτονική Επιχείρησης & Στρατηγικό Πλάνο",
  },
  title: {
    en: "Enterprise Security Architecture & CIA Risk Assessment for a Digital Banking Gateway",
    el: "Αρχιτεκτονική Ασφάλειας Επιχείρησης & Αξιολόγηση Κινδύνου CIA για Ψηφιακή Τραπεζική Πύλη",
  },
  subtitle: {
    en: "Comprehensive Hands-On Practice Project: Threat Modeling, Defense-in-Depth Design, and Compliance Framework",
    el: "Ολοκληρωμένη Εργασία Εξάσκησης: Μοντελοποίηση Απειλών, Σχεδιασμός Άμυνας σε Βάθος και Πλαίσιο Συμμόρφωσης",
  },
  scenario: {
    en: "A European neo-bank is launching a real-time instant payment microservice infrastructure. As the Lead Security Architect, you are commissioned to design the comprehensive security architecture from the ground up, evaluate CIA dependencies, establish formal access control models (Bell–LaPadula vs. Biba), and deliver an enterprise-grade threat and risk analysis.",
    el: "Μια ευρωπαϊκή ψηφιακή τράπεζα (neo-bank) εγκαινιάζει μια υποδομή μικροϋπηρεσιών άμεσων πληρωμών. Ως Επικεφαλής Αρχιτέκτονας Ασφάλειας, σας ανατίθεται να σχεδιάσετε την αρχιτεκτονική ασφάλειας από το μηδέν, να αξιολογήσετε τις εξαρτήσεις CIA, να επιλέξετε τυπικά μοντέλα ελέγχου πρόσβασης (Bell–LaPadula έναντι Biba) και να παραδώσετε μια πλήρη ανάλυση απειλών και επικινδυνότητας.",
  },
  objectives: {
    en: [
      "Architect a multi-zone network and application topology enforcing Defense-in-Depth.",
      "Map data flows and define cryptographic integrity and confidentiality controls at rest, in transit, and in use.",
      "Apply the 8 Saltzer–Schroeder design principles to microservice communication.",
      "Formulate a complete Risk Treatment Plan adhering to ISO/IEC 27005 and NIST SP 800-30.",
    ],
    el: [
      "Σχεδιασμός πολυζωνικής τοπολογίας δικτύου και εφαρμογών με επιβολή Άμυνας σε Βάθος.",
      "Χαρτογράφηση ροών δεδομένων και ορισμός κρυπτογραφικών ελέγχων σε ηρεμία, μεταφορά και χρήση.",
      "Εφαρμογή των 8 αρχών σχεδιασμού των Saltzer–Schroeder στις επικοινωνίες μικροϋπηρεσιών.",
      "Σύνταξη πλήρους Σχεδίου Αντιμετώπισης Κινδύνων κατά ISO/IEC 27005 και NIST SP 800-30.",
    ],
  },
  scope: {
    en: [
      "Kubernetes-hosted microservice clusters handling payment initiation and ledger commits.",
      "Relational SQL cluster storing customer balances and transaction journals.",
      "External REST API integrations with Central Bank clearing switches.",
      "Privileged administrative access channels and CI/CD deployment pipelines.",
    ],
    el: [
      "Συστάδες Kubernetes που φιλοξενούν μικροϋπηρεσίες έναρξης πληρωμών και εκκαθάρισης.",
      "Συστοιχία βάσεων δεδομένων SQL για υπόλοιπα πελατών και τραπεζικά καθολικά.",
      "Εξωτερικές διεπαφές REST API με συστήματα εκκαθάρισης Κεντρικής Τράπεζας.",
      "Κανάλια προνομιακής διαχείρισης και αυτοματοποιημένοι αγωγοί CI/CD.",
    ],
  },
  milestones: [
    {
      milestoneNumber: 1,
      title: {
        en: "System Architecture & Threat Modeling Dossier",
        el: "Αρχιτεκτονική Συστήματος & Φάκελος Μοντελοποίησης Απειλών",
      },
      description: {
        en: "Produce an architectural diagram illustrating trust boundaries, authentication checkpoints, and data classification levels across all payment tiers.",
        el: "Δημιουργία αρχιτεκτονικού διαγράμματος με όρια εμπιστοσύνης, σημεία ελέγχου ταυτότητας και επίπεδα ταξινόμησης δεδομένων.",
      },
      detailedSpec: {
        en: [
          "Define 3 distinct security zones: DMZ (API Gateway), App Tier (Microservices), and Secure DB Tier.",
          "Map data classification levels (Public, Internal, Confidential, Restricted) to all data stores.",
          "Enumerate 5 trust boundaries and specify authentication/authorization requirements across each boundary."
],
        el: [
          "Ορισμός 3 διακριτών ζωνών ασφαλείας: DMZ (API Gateway), App Tier (Μικροϋπηρεσίες) και Secure DB Tier.",
          "Χαρτογράφηση επιπέδων ταξινόμησης (Public, Internal, Confidential, Restricted) σε όλες τις βάσεις δεδομένων.",
          "Καταγραφή 5 ορίων εμπιστοσύνης και προδιαγραφή απαιτήσεων αυθεντικοποίησης/εξουσιοδότησης σε κάθε όριο."
],
      },
      deliverable: {
        en: "Architecture diagram (Draw.io/Mermaid) + Data Classification Matrix.",
        el: "Αρχιτεκτονικό διάγραμμα + Πίνακας Ταξινόμησης Δεδομένων.",
      },
    },
    {
      milestoneNumber: 2,
      title: {
        en: "Saltzer–Schroeder Principles Implementation Blueprint",
        el: "Σχέδιο Εφαρμογής των Αρχών Saltzer–Schroeder",
      },
      description: {
        en: "Provide concrete technical specifications showing how Economy of Mechanism, Fail-Safe Defaults, Complete Mediation, and Least Privilege are enforced.",
        el: "Παροχή τεχνικών προδιαγραφών για την επιβολή της Οικονομίας Μηχανισμού, των Ασφαλών Προεπιλογών, της Πλήρους Διαμεσολάβησης και του Ελάχιστου Προνομίου.",
      },
      detailedSpec: {
        en: [
          "Specify Envoy proxy ingress configuration enforcing Complete Mediation on every inter-service API call.",
          "Define Kubernetes NetworkPolicies enforcing Fail-Safe Defaults (default deny-all ingress/egress).",
          "Construct granular Kubernetes RBAC RoleBindings implementing Least Privilege for service accounts."
],
        el: [
          "Προδιαγραφή παραμετροποίησης Envoy proxy για επιβολή Πλήρους Διαμεσολάβησης σε κάθε κλήση API.",
          "Ορισμός NetworkPolicies στο Kubernetes για επιβολή Fail-Safe Defaults (default deny).",
          "Δημιουργία RoleBindings στο Kubernetes για υλοποίηση του Ελάχιστου Προνομίου."
],
      },
      deliverable: {
        en: "Technical specification document (4 pages) with configuration code snippets.",
        el: "Έγγραφο τεχνικών προδιαγραφών (4 σελίδων) με παραδείγματα κώδικα ρυθμίσεων.",
      },
    },
    {
      milestoneNumber: 3,
      title: {
        en: "Formal Security Model Selection & Policy Definition",
        el: "Επιλογή Τυπικού Μοντέλου Ασφάλειας & Ορισμός Πολιτικής",
      },
      description: {
        en: "Compare Bell–LaPadula, Biba, and Clark–Wilson models for the financial database. Justify why Clark–Wilson is optimal for commercial financial integrity.",
        el: "Σύγκριση των μοντέλων Bell–LaPadula, Biba και Clark–Wilson. Τεκμηρίωση της υπεροχής του Clark–Wilson για εμπορική οικονομική ακεραιότητα.",
      },
      detailedSpec: {
        en: [
          "Formalize Constrained Data Items (CDIs), Unconstrained Data Items (UDIs), and Transformation Procedures (TPs).",
          "Define Separation of Duties (SoD) dual-control rules preventing single-operator payment authorization.",
          "Construct access control matrix contrasting Bell-LaPadula vs. Biba vs. Clark-Wilson models."
],
        el: [
          "Τυπικός ορισμός CDIs, UDIs και Transformation Procedures (TPs) κατά το μοντέλο Clark-Wilson.",
          "Ορισμός κανόνων Διαχωρισμού Καθηκόντων (SoD) με έλεγχο δύο ατόμων για έγκριση συναλλαγών.",
          "Κατασκευή πίνακα ελέγχου πρόσβασης συγκρίνοντας τα μοντέλα Bell-LaPadula, Biba και Clark-Wilson."
],
      },
      deliverable: {
        en: "Formal comparative analysis & Separation of Duties (SoD) rule table.",
        el: "Τυπική συγκριτική ανάλυση & Πίνακας Κανόνων Διαχωρισμού Καθηκόντων (SoD).",
      },
    },
    {
      milestoneNumber: 4,
      title: {
        en: "Comprehensive Risk Assessment & Executive Roadmap",
        el: "Ολοκληρωμένη Αξιολόγηση Κινδύνου & Στρατηγικός Οδικός Χάρτης",
      },
      description: {
        en: "Calculate inherent and residual risk for 10 identified threat scenarios. Present a prioritized 12-month mitigation roadmap for the Board of Directors.",
        el: "Υπολογισμός εγγενούς και υπολειπόμενου κινδύνου για 10 σενάρια απειλών. Παρουσίαση ιεραρχημένου οδικού χάρτη 12 μηνών για το Διοικητικό Συμβούλιο.",
      },
      detailedSpec: {
        en: [
          "Evaluate 10 realistic financial threat scenarios using ISO 27005 quantitative risk scoring (ALE = SLE * ARO).",
          "Synthesize findings into an executive matrix detailing Inherent Risk, Safeguards, and Residual Risk.",
          "Develop a prioritized 12-month mitigation roadmap for presentation to the Board of Directors."
],
        el: [
          "Αξιολόγηση 10 σεναρίων απειλών με ποσοτική βαθμολόγηση κατά ISO 27005 (ALE = SLE * ARO).",
          "Σύνθεση ευρημάτων σε επιτελικό πίνακα με Εγγενή Κίνδυνο, Μέτρα Προστασίας και Υπολειπόμενο Κίνδυνο.",
          "Ανάπτυξη ιεραρχημένου οδικού χάρτη αντιμετώπισης 12 μηνών για το Διοικητικό Συμβούλιο."
],
      },
      deliverable: {
        en: "Executive Risk Treatment Plan and presentation slide deck summary.",
        el: "Επιτελικό Σχέδιο Αντιμετώπισης Κινδύνων και σύνοψη διαφανειών παρουσίασης.",
      },
    },
  ],
  deliverables: {
    en: [
      "Final Project Technical Report (PDF/Markdown, 10–15 pages)",
      "System Architecture & Threat Boundary Diagram (PNG/SVG)",
      "Data Classification & CIA Impact Register (CSV/Excel)",
      "Risk Treatment Plan Matrix with Likelihood/Impact Scoring",
    ],
    el: [
      "Τελική Τεχνική Έκθεση Έργου (PDF/Markdown, 10–15 σελίδες)",
      "Διάγραμμα Αρχιτεκτονικής & Ορίων Εμπιστοσύνης (PNG/SVG)",
      "Μητρώο Ταξινόμησης Δεδομένων & Επιπτώσεων CIA (CSV/Excel)",
      "Πίνακας Σχεδίου Αντιμετώπισης Κινδύνων με Βαθμολόγηση Πιθανότητας/Επίπτωσης",
    ],
  },
  rubric: [
    {
      criterion: {
        en: "Architectural Rigor & Threat Modeling",
        el: "Αρχιτεκτονική Αυστηρότητα & Μοντελοποίηση Απειλών",
      },
      weight: "25%",
      description: {
        en: "Depth of trust boundary definitions, asset identification, and alignment with Defense-in-Depth principles.",
        el: "Βάθος ορισμού ορίων εμπιστοσύνης, εντοπισμός περιουσιακών στοιχείων και ευθυγράμμιση με την Άμυνα σε Βάθος.",
      },
    },
    {
      criterion: {
        en: "Application of Security Principles & Models",
        el: "Εφαρμογή Αρχών & Τυπικών Μοντέλων Ασφάλειας",
      },
      weight: "25%",
      description: {
        en: "Accurate technical enforcement of Saltzer–Schroeder principles and sound justification of the Clark–Wilson integrity model.",
        el: "Ακριβής τεχνική εφαρμογή των αρχών Saltzer–Schroeder και ορθή τεκμηρίωση του μοντέλου ακεραιότητας Clark–Wilson.",
      },
    },
    {
      criterion: {
        en: "Risk Assessment Methodology & Calculations",
        el: "Μεθοδολογία Αξιολόγησης Κινδύνου & Υπολογισμοί",
      },
      weight: "25%",
      description: {
        en: "Realistic likelihood/impact ratings, clear differentiation between inherent and residual risk, and actionable mitigation controls.",
        el: "Ρεαλιστική βαθμολόγηση πιθανότητας/επίπτωσης, σαφής διάκριση εγγενούς/υπολειπόμενου κινδύνου και εφαρμόσιμα μέτρα μετριασμού.",
      },
    },
    {
      criterion: {
        en: "Professional Documentation & Executive Synthesis",
        el: "Επαγγελματική Τεκμηρίωση & Επιτελική Σύνθεση",
      },
      weight: "25%",
      description: {
        en: "Clarity of technical writing, diagram quality, professional terminology, and executive decision-making suitability.",
        el: "Σαφήνεια τεχνικού λόγου, ποιότητα διαγραμμάτων, επαγγελματική ορολογία και καταλληλότητα για λήψη αποφάσεων διοίκησης.",
      },
    },
  ],
};

export const ch01Quiz: QuizQuestion[] = [
  {
    id: 1,
    question: {
      en: "An unauthorized attacker tampers with database transactions to alter customer account balances. Which core pillar of the CIA triad has been directly violated?",
      el: "Ένας μη εξουσιοδοτημένος εισβολέας παραποιεί τραπεζικές συναλλαγές για να αλλάξει τα υπόλοιπα πελατών. Ποιος πυλώνας της τριάδας CIA παραβιάστηκε άμεσα;",
    },
    options: {
      en: [
        "Confidentiality, by exposing private customer account balance details to unauthorized individuals.",
        "Integrity, by modifying transaction records and account data without legitimate authorization.",
        "Availability, by preventing legitimate account holders from accessing their online banking portals.",
        "Non-repudiation, by removing all digital signature timestamps from the transaction database log.",
        "Accountability, by deleting administrative audit trail logs and security event records entirely.",
      ],
      el: [
        "Εμπιστευτικότητα, εκθέτοντας ιδιωτικά τραπεζικά στοιχεία υπολοίπου σε μη εξουσιοδοτημένα άτομα.",
        "Ακεραιότητα, τροποποιώντας εγγραφές συναλλαγών και δεδομένα υπολοίπων χωρίς έγκυρη εξουσιοδότηση.",
        "Διαθεσιμότητα, εμποδίζοντας τους νόμιμους κατόχους λογαριασμών να εισέλθουν στην πύλη e-banking.",
        "Μη αποποίηση, αφαιρώντας όλες τις χρονοσημάνσεις ψηφιακών υπογραφών από τα αρχεία συναλλαγών.",
        "Υπευθυνότητα, διαγράφοντας πλήρως τα αρχεία καταγραφής ελέγχου και τα συμβάντα ασφάλειας.",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Integrity guarantees that data remains accurate, authentic, and protected against unauthorized modification or deletion. Tampering with financial records directly violates integrity.",
      el: "Η ακεραιότητα διασφαλίζει ότι τα δεδομένα παραμένουν ακριβή, αυθεντικά και προστατευμένα από μη εξουσιοδοτημένη τροποποίηση. Η παραποίηση τραπεζικών δεδομένων συνιστά παραβίαση ακεραιότητας.",
    },
  },
  {
    id: 2,
    question: {
      en: "How does the paradigm of 'cyber resilience' fundamentally differ from traditional preventive cybersecurity?",
      el: "Πώς διαφέρει θεμελιωδώς η 'κυβερνοανθεκτικότητα' (cyber resilience) από την παραδοσιακή προληπτική κυβερνοασφάλεια;",
    },
    options: {
      en: [
        "Cyber resilience focuses exclusively on perimeter firewalls and strict network intrusion prevention systems, during standard continuous monitoring and administrative audits.",
        "Cyber resilience eliminates the necessity for data encryption by enforcing biometric physical site controls, using standardized organizational security policy configurations.",
        "Cyber resilience assumes breaches will occur and focuses on anticipation, endurance, recovery, and adaptation.",
        "Cyber resilience guarantees absolute zero operational downtime through proprietary automated failover hardware.",
        "Cyber resilience focuses solely on regulatory compliance audits without implementing technical defense controls.",
      ],
      el: [
        "Η κυβερνοανθεκτικότητα εστιάζει αποκλειστικά σε τείχη προστασίας περιμέτρου και συστήματα αποτροπής εισβολών, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Η κυβερνοανθεκτικότητα εξαλείφει την ανάγκη κρυπτογράφησης μέσω αυστηρών βιομετρικών ελέγχων φυσικής πρόσβασης, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Η κυβερνοανθεκτικότητα θεωρεί δεδομένη την παραβίαση και εστιάζει στην πρόβλεψη, αντοχή, ανάκαμψη και προσαρμογή.",
        "Η κυβερνοανθεκτικότητα εγγυάται απόλυτα μηδενικό χρόνο διακοπής μέσω ιδιόκτητου υλικού αυτόματης ανακατεύθυνσης.",
        "Η κυβερνοανθεκτικότητα περιορίζεται αποκλειστικά σε ελέγχους συμμόρφωσης χωρίς εφαρμογή τεχνικών μέτρων.",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "Cyber resilience assumes that incidents and disruptions will inevitably happen, prioritizing the organization's capacity to withstand, adapt, and rapidly restore mission-critical functions.",
      el: "Η κυβερνοανθεκτικότητα αποδέχεται ότι οι παραβιάσεις είναι αναπόφευκτες, δίνοντας προτεραιότητα στην ικανότητα αντοχής, προσαρμογής και ταχείας αποκατάστασης των κρίσιμων λειτουργιών.",
    },
  },
  {
    id: 3,
    question: {
      en: "According to the Saltzer and Schroeder design principles, what does the principle of 'Fail-Safe Defaults' dictate?",
      el: "Σύμφωνα με τις αρχές σχεδίασης των Saltzer και Schroeder, τι επιτάσσει η αρχή των 'Ασφαλών Προεπιλογών' (Fail-Safe Defaults);",
    },
    options: {
      en: [
        "Systems should automatically reboot into an unprivileged kernel sandbox whenever any fault occurs, using standardized organizational security policy configurations.",
        "Cryptographic keys must be permanently hardcoded in firmware to prevent accidental loss or corruption.",
        "Hardware watchdogs must bypass authentication checks during catastrophic network outages or failures.",
        "Access decisions should be based on explicit permission rather than exclusion (default deny stance).",
        "Administrative credentials should automatically reset to vendor factory defaults during power loss, to mitigate potential unauthorized system configuration drift.",
      ],
      el: [
        "Τα συστήματα πρέπει να επανεκκινούν αυτόματα σε απομονωμένο περιβάλλον πυρήνα όταν προκύψει σφάλμα, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Τα κρυπτογραφικά κλειδιά πρέπει να είναι ενσωματωμένα στο firmware για αποφυγή απώλειας ή αλλοίωσης.",
        "Οι μηχανισμοί watchdog πρέπει να παρακάμπτουν τους ελέγχους ταυτοποίησης σε περιπτώσεις διακοπής δικτύου.",
        "Οι αποφάσεις πρόσβασης πρέπει να βασίζονται σε ρητή άδεια αντί για εξαίρεση (προεπιλεγμένη άρνηση / default deny).",
        "Τα διαχειριστικά διαπιστευτήρια πρέπει να επανέρχονται αυτόματα στις εργοστασιακές ρυθμίσεις σε διακοπή ρεύματος, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
      ],
    },
    correctIndex: 3,
    explanation: {
      en: "Fail-Safe Defaults mandates that access is denied by default; permission must be explicitly granted rather than implicitly assumed.",
      el: "Η αρχή των Ασφαλών Προεπιλογών ορίζει ότι η πρόσβαση απαγορεύεται από προεπιλογή και πρέπει να παραχωρείται ρητά και τεκμηριωμένα.",
    },
  },
  {
    id: 4,
    question: {
      en: "What is the primary conceptual distinction between a 'vulnerability' and a 'threat' in risk management?",
      el: "Ποια είναι η βασική εννοιολογική διαφορά μεταξύ μιας 'ευπάθειας' (vulnerability) και μιας 'απειλής' (threat);",
    },
    options: {
      en: [
        "A vulnerability is an active external adversary, whereas a threat is an internal software weakness, using standardized organizational security policy configurations.",
        "A vulnerability represents monetary impact, whereas a threat represents statistical exploit probability, without requiring manual intervention from systems engineering staff.",
        "A vulnerability applies only to network hardware, whereas a threat applies only to application databases, to mitigate potential unauthorized system configuration drift.",
        "A vulnerability is created by malicious intent, whereas a threat arises only from accidental system bugs, in accordance with modern zero trust architectural principles.",
        "A vulnerability is an inherent flaw in an asset, whereas a threat is a potential actor or event exploiting it.",
      ],
      el: [
        "Η ευπάθεια είναι ένας ενεργός εξωτερικός επιτιθέμενος, ενώ η απειλή είναι μια εσωτερική αδυναμία λογισμικού, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Η ευπάθεια αντιπροσωπεύει το οικονομικό κόστος, ενώ η απειλή αντιπροσωπεύει τη στατιστική πιθανότητα, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Η ευπάθεια αφορά αποκλειστικά υλικό δικτύου, ενώ η απειλή αφορά αποκλειστικά βάσεις δεδομένων εφαρμογών, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Η ευπάθεια δημιουργείται από κακόβουλη πρόθεση, ενώ η απειλή προκύπτει μόνο από τυχαία σφάλματα κώδικα, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Η ευπάθεια είναι μια εγγενής αδυναμία σε ένα στοιχείο, ενώ η απειλή είναι ο παράγοντας που την εκμεταλλεύεται.",
      ],
    },
    correctIndex: 4,
    explanation: {
      en: "A vulnerability is a flaw or weakness in architecture, code, or controls. A threat is an entity, event, or condition with the potential to exploit that flaw.",
      el: "Ευπάθεια είναι ένα κενό ή αδυναμία σε σχεδιασμό, κώδικα ή μέτρα ασφάλειας. Απειλή είναι κάθε δράστης ή συμβάν που μπορεί να εκμεταλλευτεί αυτό το κενό.",
    },
  },
  {
    id: 5,
    question: {
      en: "Which formal security model is specifically designed to enforce confidentiality in multi-level systems via 'No Read Up' and 'No Write Down' rules?",
      el: "Ποιο τυπικό μοντέλο ασφάλειας σχεδιάστηκε για την επιβολή εμπιστευτικότητας σε πολυεπίπεδα συστήματα μέσω των κανόνων 'No Read Up' και 'No Write Down';",
    },
    options: {
      en: [
        "The Bell\u2013LaPadula Model, preserving state confidentiality through simple and star security properties.",
        "The Biba Integrity Model, preventing contaminated data reads across hierarchical clearance levels, across distributed multi-region cloud production environments.",
        "The Clark\u2013Wilson Model, enforcing well-formed commercial transactions through certification rules, without requiring manual intervention from systems engineering staff.",
        "The Graham\u2013Denning Model, defining specific rights distribution rules across operating system objects.",
        "The Brewer\u2013Nash Chinese Wall Model, dynamically restricting access based on conflict of interest domains.",
      ],
      el: [
        "Το Μοντέλο Bell–LaPadula, διασφαλίζοντας την εμπιστευτικότητα μέσω της απλής ιδιότητας και της ιδιότητας-αστέρι.",
        "Το Μοντέλο Ακεραιότητας Biba, αποτρέποντας την ανάγνωση αλλοιωμένων δεδομένων μεταξύ επιπέδων διαβάθμισης, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Το Μοντέλο Clark–Wilson, επιβάλλοντας ορθά δομημένες εμπορικές συναλλαγές μέσω κανόνων πιστοποίησης, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Το Μοντέλο Graham–Denning, ορίζοντας συγκεκριμένους κανόνες κατανομής δικαιωμάτων σε αντικείμενα λειτουργικού.",
        "Το Μοντέλο Brewer–Nash (Κινεζικό Τείχος), περιορίζοντας την πρόσβαση βάσει συγκρούσεων συμφερόντων.",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "The Bell\u2013LaPadula (BLP) model enforces confidentiality: Simple Security Property (No Read Up) and *-Property (No Write Down).",
      el: "Το μοντέλο Bell–LaPadula επιβάλλει εμπιστευτικότητα μέσω της Απλής Ιδιότητας (No Read Up) και της Ιδιότητας-* (No Write Down).",
    },
  },
  {
    id: 6,
    question: {
      en: "What does the Biba integrity model's 'Simple Integrity Property' dictate regarding data access?",
      el: "Τι ορίζει η 'Απλή Ιδιότητα Ακεραιότητας' (Simple Integrity Property) του μοντέλου ακεραιότητας Biba;",
    },
    options: {
      en: [
        "A subject cannot write data to an object of higher integrity level (No Write Up), preserving higher states.",
        "A subject cannot read an object of lower integrity level (No Read Down), preventing corrupt data ingestion.",
        "A subject can execute operations only within an isolated chroot sandbox container environment, in accordance with modern zero trust architectural principles.",
        "A subject must establish mutual cryptographic authentication before initiating any transactional write, before committing changes to central production repository nodes.",
        "A subject cannot access conflicting commercial corporate records belonging to direct market competitors, under standard operating procedures defined in corporate ISMS policies.",
      ],
      el: [
        "Ένα υποκείμενο δεν μπορεί να εγγράψει σε αντικείμενο υψηλότερης ακεραιότητας (No Write Up), προστατεύοντας ανώτερα επίπεδα.",
        "Ένα υποκείμενο δεν μπορεί να διαβάσει αντικείμενο χαμηλότερης ακεραιότητας (No Read Down), αποτρέποντας μόλυνση.",
        "Ένα υποκείμενο μπορεί να εκτελεί λειτουργίες μόνο μέσα σε απομονωμένο περιβάλλον chroot sandbox, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Ένα υποκείμενο πρέπει να πραγματοποιεί αμοιβαία κρυπτογραφική ταυτοποίηση πριν από κάθε εγγραφή, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Ένα υποκείμενο δεν μπορεί να έχει πρόσβαση σε αντικρουόμενα δεδομένα ανταγωνιστικών επιχειρήσεων, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Biba's Simple Integrity Property dictates 'No Read Down': subjects cannot read lower-integrity objects to avoid becoming contaminated by untrusted information.",
      el: "Η Απλή Ιδιότητα Ακεραιότητας του Biba ορίζει το 'No Read Down': ένα υποκείμενο δεν επιτρέπεται να διαβάζει δεδομένα χαμηλότερης ακεραιότητας για να μην αλλοιωθεί.",
    },
  },
  {
    id: 7,
    question: {
      en: "Why is the Clark\u2013Wilson security model widely preferred over Bell\u2013LaPadula for commercial banking systems?",
      el: "Γιατί το μοντέλο ασφάλειας Clark–Wilson προτιμάται έναντι του Bell–LaPadula για εμπορικά τραπεζικά συστήματα;",
    },
    options: {
      en: [
        "Because it completely eliminates symmetric key encryption overhead in distributed database networks, to mitigate potential unauthorized system configuration drift.",
        "Because it permits unauthenticated users to modify audit logs during emergency maintenance windows, before committing changes to central production repository nodes.",
        "Because it enforces data integrity through Well-Formed Transactions and Separation of Duties controls.",
        "Because it optimizes network packet throughput across multi-region cloud load balancers and proxies, under standard operating procedures defined in corporate ISMS policies.",
        "Because it mandates military classification clearances for all frontline financial system operators, across all internal enterprise network segments and endpoints.",
      ],
      el: [
        "Επειδή εξαλείφει πλήρως το υπολογιστικό κόστος συμμετρικής κρυπτογράφησης σε κατανεμημένες βάσεις δεδομένων, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Επειδή επιτρέπει σε μη ταυτοποιημένους χρήστες να τροποποιούν αρχεία καταγραφής σε κατάσταση ανάγκης, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Επειδή επιβάλλει την ακεραιότητα μέσω Ορθά Δομημένων Συναλλαγών και Διαχωρισμού Καθηκόντων.",
        "Επειδή βελτιστοποιεί τη διαμεταγωγή πακέτων δικτύου σε κατανεμημένους εξισορροπητές φορτίου cloud, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Επειδή απαιτεί στρατιωτικές διαβαθμίσεις ασφάλειας για όλους τους τραπεζικούς υπαλλήλους πρώτης γραμμής, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "Commercial systems require data integrity and fraud prevention. Clark\u2013Wilson achieves this via Well-Formed Transactions (TPs) and Separation of Duties, rather than confidentiality labels.",
      el: "Τα εμπορικά συστήματα απαιτούν ακεραιότητα δεδομένων και αποτροπή απάτης. Το Clark–Wilson το επιτυγχάνει μέσω Ορθά Δομημένων Συναλλαγών και Διαχωρισμού Καθηκόντων.",
    },
  },
  {
    id: 8,
    question: {
      en: "What does the Principle of Least Privilege (PoLP) specifically require in modern access management architectures?",
      el: "Τι απαιτεί συγκεκριμένα η Αρχή του Ελάχιστου Προνομίου (PoLP) στις σύγχρονες αρχιτεκτονικές διαχείρισης πρόσβασης;",
    },
    options: {
      en: [
        "System administrators should be completely barred from accessing production application source code repositories.",
        "User passwords must be updated every twenty-four hours to mitigate credential stuffing attack vectors, under standard operating procedures defined in corporate ISMS policies.",
        "All network ports on peripheral routers must be permanently disabled regardless of protocol requirements, across all internal enterprise network segments and endpoints.",
        "Every entity should be granted only the minimum permissions necessary to perform its legitimate job tasks.",
        "All database records must be encrypted with separate ephemeral keys generated per individual row entry, during standard continuous monitoring and administrative audits.",
      ],
      el: [
        "Οι διαχειριστές συστημάτων πρέπει να αποκλείονται πλήρως από την πρόσβαση στον πηγαίο κώδικα εφαρμογών.",
        "Οι κωδικοί πρόσβασης των χρηστών πρέπει να ανανεώνονται κάθε 24 ώρες για αποτροπή επιθέσεων credential stuffing, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Όλες οι θύρες δικτύου στους περιφερειακούς δρομολογητές πρέπει να απενεργοποιούνται μόνιμα, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Κάθε οντότητα πρέπει να διαθέτει μόνο τα ελάχιστα δικαιώματα που είναι απαραίτητα για την εκτέλεση της εργασίας της.",
        "Όλες οι εγγραφές βάσεων δεδομένων πρέπει να κρυπτογραφούνται με ξεχωριστά εφήμερα κλειδιά ανά γραμμή, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
      ],
    },
    correctIndex: 3,
    explanation: {
      en: "Least privilege mandates that every user, process, or program must operate using the minimal set of privileges necessary to perform its intended function.",
      el: "Η αρχή του ελάχιστου προνομίου επιβάλλει κάθε χρήστης ή διεργασία να έχει μόνο τα απολύτως απαραίτητα δικαιώματα για τον ρόλο του.",
    },
  },
  {
    id: 9,
    question: {
      en: "Which quantitative metric in classical risk assessment represents the expected annual financial loss resulting from a specific threat?",
      el: "Ποιος ποσοτικός δείκτης στην κλασική εκτίμηση επικινδυνότητας αντιπροσωπεύει την αναμενόμενη ετήσια οικονομική ζημία από μια απειλή;",
    },
    options: {
      en: [
        "Single Loss Expectancy (SLE), calculated as asset value multiplied by exposure factor.",
        "Return on Security Investment (ROSI), calculated as risk mitigation minus control cost.",
        "Annualized Rate of Occurrence (ARO), measuring estimated frequency of incident occurrence.",
        "Mean Time to Recovery (MTTR), measuring the average duration required to restore systems.",
        "Annualized Loss Expectancy (ALE), calculated as the product of SLE multiplied by ARO.",
      ],
      el: [
        "Single Loss Expectancy (SLE), υπολογιζόμενο ως αξία στοιχείου πολλαπλασιασμένη με συντελεστή έκθεσης.",
        "Return on Security Investment (ROSI), υπολογιζόμενο ως μείωση κινδύνου μείον κόστος ελέγχων.",
        "Annualized Rate of Occurrence (ARO), μετρώντας την εκτιμώμενη συχνότητα εμφάνισης συμβάντων.",
        "Mean Time to Recovery (MTTR), μετρώντας τη μέση χρονική διάρκεια αποκατάστασης των συστημάτων.",
        "Annualized Loss Expectancy (ALE), υπολογιζόμενο ως το γινόμενο του SLE με το ARO.",
      ],
    },
    correctIndex: 4,
    explanation: {
      en: "Annualized Loss Expectancy (ALE = SLE \u00d7 ARO) represents the projected financial loss of a specific risk over the period of one year.",
      el: "Το Annualized Loss Expectancy (ALE = SLE × ARO) αντιπροσωπεύει την αναμενόμενη ετήσια οικονομική ζημία από έναν συγκεκριμένο κίνδυνο.",
    },
  },
  {
    id: 10,
    question: {
      en: "What core security benefit is achieved by enforcing 'Separation of Duties' (SoD) in high-value organizational workflows?",
      el: "Ποιο βασικό όφελος ασφάλειας επιτυγχάνεται με την επιβολή του 'Διαχωρισμού Καθηκόντων' (Separation of Duties) σε κρίσιμες ροές εργασίας;",
    },
    options: {
      en: [
        "It prevents fraud and critical errors by requiring collaboration or approval from more than one individual.",
        "It eliminates the need to maintain centralized identity providers and credential management systems, under standard operating procedures defined in corporate ISMS policies.",
        "It guarantees that server hardware utilization remains evenly balanced across all available CPU cores, across all internal enterprise network segments and endpoints.",
        "It automatically resolves transport layer latency spikes across distributed wide area networks, to ensure high-availability operational compliance across systems.",
        "It encrypts internal communication channels using post-quantum lattice-based asymmetric cryptography, using standardized organizational security policy configurations.",
      ],
      el: [
        "Αποτρέπει την απάτη και τα κρίσιμα σφάλματα απαιτώντας συνεργασία ή έγκριση από περισσότερα του ενός άτομα.",
        "Εξαλείφει την ανάγκη διατήρησης κεντρικών παρόχων ταυτότητας και συστημάτων διαχείρισης διαπιστευτηρίων, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Εγγυάται ότι η χρήση του υλικού διακομιστών παραμένει ομοιόμορφα κατανεμημένη στους πυρήνες CPU, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Επιλύει αυτόματα προβλήματα καθυστέρησης επιπέδου μεταφοράς σε κατανεμημένα δίκτυα ευρείας περιοχής, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Κρυπτογραφεί τα εσωτερικά κανάλια επικοινωνίας με μετα-κβαντική ασύμμετρη κρυπτογραφία πλεγμάτων, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Separation of Duties prevents fraud and critical errors by breaking high-risk processes into multi-person workflows, requiring collusion to commit unauthorized acts.",
      el: "Ο Διαχωρισμός Καθηκόντων αποτρέπει απάτες και κρίσιμα λάθη διασπώντας τις ευαίσθητες ενέργειες σε πολλαπλά πρόσωπα, απαιτώντας συνωμοσία για την τέλεση παραβίασης.",
    },
  },
];

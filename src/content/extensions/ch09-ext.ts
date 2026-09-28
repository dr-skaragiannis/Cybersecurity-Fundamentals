import type { CliLab, HandsOnLab, TechnicalProject, QuizQuestion } from "../types";

export const ch09CliLab: CliLab = {
  id: "ch09-cli",
  title: {
    en: "Static Code Security & Secret Scanning Sandbox",
    el: "Προσομοιωτής Στατικού Ελέγχου Κώδικα & Σάρωσης Μυστικών",
  },
  scenario: {
    en: "Scan an application repository for hardcoded API keys and credentials, execute static code analyzers (Bandit & Semgrep) to identify SQL Injection vulnerabilities, and verify secure parameterized query remediations.",
    el: "Σαρώστε ένα αποθετήριο κώδικα για σκληρά κωδικοποιημένα μυστικά (secrets), εκτελέστε στατική ανάλυση (Bandit/Semgrep) για εντοπισμό SQL Injection και επαληθεύστε παραμετροποιημένες διορθώσεις.",
  },
  initialPrompt: "developer@sec-devops:~$",
  banner: {
    en: "=== Chapter 9 Secure Software Engineering Sandbox ===\nRepo: /src/controllers/ | Language: Python / FastAPI / SQL\nType 'help' for command assistance or follow the missions below.",
    el: "=== Εργαστήριο Ασφαλούς Ανάπτυξης Λογισμικού Κεφαλαίου 9 ===\nΑποθετήριο: /src/controllers/ | Γλώσσα: Python / FastAPI / SQL\nΠληκτρολογήστε 'help' για βοήθεια ή ακολουθήστε τις παρακάτω αποστολές.",
  },
  fileSystem: {
    "src/controllers/auth.py": "def login(user, pwd):\n    query = f\"SELECT * FROM users WHERE username = '{user}' AND password = '{pwd}'\"\n    cursor.execute(query)\n    return cursor.fetchone()",
    "src/config/db.py": 'DB_HOST = "localhost"\nDB_PASS = "AKIAIOSFODNN7EXAMPLE_SECRET_KEY"',
  },
  tasks: [
    {
      id: "task-1",
      title: {
        en: "Scan Source Code for Hardcoded Secrets",
        el: "Σάρωση Πηγαίου Κώδικα για Ενσωματωμένα Μυστικά (Secrets)",
      },
      description: {
        en: "Run secret detection across repository files using `trufflehog` to identify exposed credentials.",
        el: "Εκτελέστε σάρωση για εντοπισμό διαρροής κλειδιών και διαπιστευτηρίων με το `trufflehog`.",
      },
      hint: {
        en: "Execute: trufflehog git file://.",
        el: "Εκτελέστε: trufflehog git file://.",
      },
      solution: "trufflehog git file://.",
      validateRegex: "trufflehog.*",
      successMessage: {
        en: "Secrets detected: Hardcoded AWS API secret key found in `src/config/db.py`!",
        el: "Εντοπίστηκαν μυστικά: Βρέθηκε σκληρά κωδικοποιημένο κλειδί AWS API στο `src/config/db.py`!",
      },
    },
    {
      id: "task-2",
      title: {
        en: "Execute SAST Security Linter (Bandit)",
        el: "Εκτέλεση Στατικού Ελέγχου Ασφάλειας (Bandit)",
      },
      description: {
        en: "Perform a static security review across all Python source files using `bandit`.",
        el: "Εκτελέστε στατικό έλεγχο ασφάλειας στα αρχεία Python με το εργαλείο `bandit`.",
      },
      hint: {
        en: "Execute: bandit -r src/",
        el: "Εκτελέστε: bandit -r src/",
      },
      solution: "bandit -r src/",
      validateRegex: "bandit\\s+-r\\s+src/?",
      successMessage: {
        en: "Bandit scan complete: Flagged high-severity security issue B608 (Hardcoded SQL string formatting).",
        el: "Η σάρωση Bandit ολοκληρώθηκε: Εντοπίστηκε σφάλμα υψηλής κρισιμότητας B608 (SQL formatting).",
      },
    },
    {
      id: "task-3",
      title: {
        en: "Pinpoint SQL Injection with Semgrep Rules",
        el: "Εντοπισμός SQL Injection με Κανόνες Semgrep",
      },
      description: {
        en: "Execute Semgrep targeting SQL injection vulnerabilities in `src/controllers/auth.py`.",
        el: "Εκτελέστε το Semgrep για εντοπισμό ευπαθειών SQL injection στο `src/controllers/auth.py`.",
      },
      hint: {
        en: "Execute: semgrep --config p/sql-injection src/",
        el: "Εκτελέστε: semgrep --config p/sql-injection src/",
      },
      solution: "semgrep --config p/sql-injection src/",
      validateRegex: "semgrep.*sql-injection",
      successMessage: {
        en: "Semgrep pattern matched: Direct string interpolation in SQL query identified at line 2.",
        el: "Ο κανόνας Semgrep ταυτοποιήθηκε: Εντοπίστηκε επικίνδυνη ένωση αλφαριθμητικών στο ερώτημα SQL στη γραμμή 2.",
      },
    },
    {
      id: "task-4",
      title: {
        en: "Verify Parameterized Query Remediation",
        el: "Επαλήθευση Διόρθωσης με Παραμετροποιημένα Ερωτήματα",
      },
      description: {
        en: "Test secure parameterized query remediation on `src/controllers/auth.py` with `sql-sanitize`.",
        el: "Ελέγξτε την ασφαλή διόρθωση παραμετροποιημένου ερωτήματος με το `sql-sanitize`.",
      },
      hint: {
        en: "Execute: sql-sanitize --test src/controllers/auth.py",
        el: "Εκτελέστε: sql-sanitize --test src/controllers/auth.py",
      },
      solution: "sql-sanitize --test src/controllers/auth.py",
      validateRegex: "sql-sanitize.*auth\\.py",
      successMessage: {
        en: "Remediation verified! Parameterized query prevents SQL injection regardless of malicious input payload.",
        el: "Η διόρθωση επιβεβαιώθηκε! Το παραμετροποιημένο ερώτημα αποτρέπει πλήρως το SQL injection.",
      },
    },
  ],
};

export const ch09HandsOnLab: HandsOnLab = {
  title: {
    en: "DevSecOps Pipeline Integration: Automated SAST/SCA, Threat Modeling (STRIDE) & Secure Coding Remediations",
    el: "Ενσωμάτωση Αγωγού DevSecOps: Αυτοματοποιημένο SAST/SCA, Μοντελοποίηση STRIDE & Ασφαλής Προγραμματισμός",
  },
  subtitle: {
    en: "2-Hour Practical Lab: STRIDE Threat Decomposition, CI/CD Security Quality Gates, Dependency Scanning, and Vulnerability Patching",
    el: "Εργαστήριο 2 Ωρών: Αποδόμηση Απειλών STRIDE, Πύλες Ποιότητας CI/CD, Έλεγχος Εξαρτήσεων και Διόρθωση Ευπαθειών",
  },
  duration: {
    en: "~2 Hours (120 minutes)",
    el: "~2 Ώρες (120 λεπτά)",
  },
  overview: {
    en: "In this 2-hour technical laboratory, students implement a robust Secure Software Development Lifecycle (SSDLC) and DevSecOps automated pipeline. You will construct a STRIDE threat model for a modern microservice API, integrate Static Application Security Testing (SAST with Semgrep/SonarQube) and Software Composition Analysis (SCA with Trivy/OSV) into a GitHub Actions / GitLab CI pipeline, remediate critical OWASP Top 10 vulnerabilities (SQLi, Stored XSS, CSRF, IDOR), and enforce automated pull-request security quality gates.",
    el: "Σε αυτό το εργαστήριο 2 ωρών, οι φοιτητές υλοποιούν έναν ολοκληρωμένο Κύκλο Ασφαλούς Ανάπτυξης Λογισμικού (SSDLC) και αγωγό DevSecOps. Θα σχεδιάσετε ένα μοντέλο απειλών STRIDE για ένα microservice API, θα ενσωματώσετε εργαλεία SAST (Semgrep/SonarQube) και SCA (Trivy) σε αγωγούς CI/CD, θα διορθώσετε κρίσιμες ευπάθειες του OWASP Top 10 (SQLi, XSS, CSRF, IDOR) και θα επιβάλετε αυτοματοποιημένες πύλες ποιότητας ασφάλειας σε pull requests.",
  },
  environment: [
    "Linux DevSecOps workstation with Git, Python 3.11, Node.js 20, Docker",
    "Security analysis tools: `semgrep`, `bandit`, `trufflehog`, `trivy`, `npm audit`, `pip-audit`",
    "Vulnerable web application repository (`/workspace/vulnerable_microservice/`)",
    "Local CI/CD runner sandbox simulating automated pipeline execution",
  ],
  phases: [
    {
      phaseNumber: 1,
      title: {
        en: "STRIDE Threat Modeling & Data Flow Diagram (DFD)",
        el: "Μοντελοποίηση Απειλών STRIDE & Διάγραμμα Ροής Δεδομένων (DFD)",
      },
      estimatedTime: { en: "25 min", el: "25 λεπτά" },
      objectives: {
        en: [
          "Decompose application components into Processes, Data Stores, Data Flows, and External Entities.",
          "Identify trust boundaries crossing between public Internet and database vaults.",
          "Map threats across all 6 STRIDE categories (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege).",
        ],
        el: [
          "Αποδόμηση εφαρμογής σε Διεργασίες, Αποθήκες Δεδομένων, Ροές Δεδομένων και Εξωτερικές Οντότητες.",
          "Εντοπισμός ορίων εμπιστοσύνης μεταξύ δημοσίου διαδικτύου και εσωτερικής βάσης.",
          "Χαρτογράφηση απειλών στις 6 κατηγορίες του STRIDE.",
        ],
      },
      steps: {
        en: [
          "1. Inspect the microservice architectural diagram in `/workspace/docs/architecture.png`.\n2. Fill out the STRIDE threat matrix identifying attack surfaces across REST endpoints.\n3. Document mitigation controls for each identified threat category.",
        ],
        el: [
          "1. Εξετάστε το αρχιτεκτονικό διάγραμμα στο `/workspace/docs/architecture.png`.\n2. Συμπληρώστε τον πίνακα απειλών STRIDE για τα REST endpoints.\n3. Καταγράψτε τεχνικά αντίμετρα για κάθε κατηγορία απειλής.",
        ],
      },
    },
    {
      phaseNumber: 2,
      title: {
        en: "Automated SAST & Software Composition Analysis (SCA) in CI/CD",
        el: "Αυτοματοποιημένο SAST & Έλεγχος Εξαρτήσεων (SCA) σε CI/CD",
      },
      estimatedTime: { en: "45 min", el: "45 λεπτά" },
      objectives: {
        en: [
          "Configure automated pipeline scanning rules blocking builds on High/Critical findings.",
          "Run dependency vulnerability analysis (`trivy fs .` and `pip-audit`).",
          "Identify vulnerable third-party dependencies with known CVEs.",
        ],
        el: [
          "Ρύθμιση αυτοματοποιημένης σάρωσης CI/CD που μπλοκάρει εκδόσεις με κρίσιμα ευρήματα.",
          "Εκτέλεση ανάλυσης ευπαθειών σε εξαρτήσεις (`trivy fs .` και `pip-audit`).",
          "Εντοπισμός ευάλωτων βιβλιοθηκών τρίτων με γνωστά CVEs.",
        ],
      },
      steps: {
        en: [
          "1. Run full SAST audit:\n```bash\nsemgrep scan --config auto --error /workspace/vulnerable_microservice/\n```",
          "2. Execute Software Composition Analysis on package dependencies:\n```bash\ntrivy fs --severity HIGH,CRITICAL /workspace/vulnerable_microservice/\n```",
          "3. Inspect pipeline output logs and review flagged CVEs.",
        ],
        el: [
          "1. Εκτέλεση πλήρους ελέγχου SAST:\n```bash\nsemgrep scan --config auto --error /workspace/vulnerable_microservice/\n```",
          "2. Εκτέλεση ελέγχου εξαρτήσεων (SCA):\n```bash\ntrivy fs --severity HIGH,CRITICAL /workspace/vulnerable_microservice/\n```",
          "3. Εξέταση των αποτελεσμάτων και καταγραφή των εντοπισθέντων CVEs.",
        ],
      },
    },
    {
      phaseNumber: 3,
      title: {
        en: "Secure Code Remediation (SQLi, Stored XSS & IDOR)",
        el: "Διόρθωση Ευπαθειών στον Κώδικα (SQLi, Stored XSS & IDOR)",
      },
      estimatedTime: { en: "30 min", el: "30 λεπτά" },
      objectives: {
        en: [
          "Refactor raw SQL string concatenation into parameterized Object-Relational Mapping (ORM) queries.",
          "Implement context-aware HTML output encoding to prevent Cross-Site Scripting.",
          "Enforce server-side authorization checks preventing Insecure Direct Object References (IDOR).",
        ],
        el: [
          "Μετατροπή μη ασφαλών ερωτημάτων SQL σε παραμετροποιημένα ερωτήματα ORM.",
          "Υλοποίηση κωδικοποίησης εξόδου HTML (context-aware encoding) για αποτροπή XSS.",
          "Επιβολή ελέγχων εξουσιοδότησης στο backend για αποτροπή ευπαθειών IDOR.",
        ],
      },
      steps: {
        en: [
          "1. Fix SQLi in `/src/controllers/users.py` by switching to SQLAlchemy parameterized queries.\n2. Fix XSS in template rendering using Jinja2 auto-escaping.\n3. Add owner ID check in `/src/controllers/documents.py` to remediate IDOR:\n```python\nif document.owner_id != current_user.id:\n    raise HTTPException(status_code=403, detail=\"Access Denied\")\n```",
        ],
        el: [
          "1. Διόρθωση SQLi στο `/src/controllers/users.py` με χρήση παραμετροποιημένων ερωτημάτων SQLAlchemy.\n2. Διόρθωση XSS με ενεργοποίηση αυτόματης διαφυγής χαρακτήρων στο Jinja2.\n3. Προσθήκη ελέγχου ταυτότητας ιδιοκτήτη στο `/src/controllers/documents.py` για διόρθωση IDOR:\n```python\nif document.owner_id != current_user.id:\n    raise HTTPException(status_code=403, detail=\"Access Denied\")\n```",
        ],
      },
    },
    {
      phaseNumber: 4,
      title: {
        en: "Secret Management & Pipeline Quality Gate Verification",
        el: "Διαχείριση Μυστικών & Επαλήθευση Πύλης Ποιότητας CI/CD",
      },
      estimatedTime: { en: "20 min", el: "20 λεπτά" },
      objectives: {
        en: [
          "Migrate hardcoded credentials to environment variables and HashiCorp Vault.",
          "Re-run the automated CI/CD pipeline and verify 100% pass score on security gates.",
          "Compile the final SSDLC Verification Report.",
        ],
        el: [
          "Μεταφορά σκληρά κωδικοποιημένων κλειδιών σε μεταβλητές περιβάλλοντος και HashiCorp Vault.",
          "Επανεκτέλεση του αγωγού CI/CD και επιβεβαίωση 100% επιτυχίας στις πύλες ασφάλειας.",
          "Σύνταξη της τελικής αναφοράς επαλήθευσης SSDLC.",
        ],
      },
      steps: {
        en: [
          "1. Execute pre-commit hook to verify no secrets are staged for git commit.\n2. Trigger final automated pipeline build:\n```bash\n./scripts/run_ci_pipeline.sh\n```\n3. Verify all SAST and SCA checks report clean (0 Critical, 0 High vulnerabilities).",
        ],
        el: [
          "1. Εκτέλεση ελέγχου pre-commit για αποτροπή καταχώρισης μυστικών στο git.\n2. Εκκίνηση της τελικής αυτοματοποιημένης εκτέλεσης CI/CD:\n```bash\n./scripts/run_ci_pipeline.sh\n```\n3. Επιβεβαίωση ότι όλοι οι έλεγχοι SAST και SCA ολοκληρώνονται επιτυχώς με μηδέν ευπάθειες.",
        ],
      },
    },
  ],
  deliverables: {
    en: [
      "STRIDE Threat Model & Data Flow Diagram (`stride_threat_model.pdf`)",
      "CI/CD DevSecOps Pipeline Configuration (`.gitlab-ci.yml` or `.github/workflows/security.yml`)",
      "Remediated and Verified Application Source Code Patch (`security_patch.diff`)",
      "Executive SSDLC & Security Quality Gate Audit Report (3–4 pages)",
    ],
    el: [
      "Μοντέλο Απειλών STRIDE & Διάγραμμα DFD (`stride_threat_model.pdf`)",
      "Αρχείο Ρύθμισης Αγωγού DevSecOps (`.github/workflows/security.yml`)",
      "Διορθωμένος & Επαληθευμένος Πηγαίος Κώδικας (`security_patch.diff`)",
      "Επιτελική Έκθεση Ελέγχου SSDLC & Πυλών Ποιότητας (3–4 σελίδες)",
    ],
  },
  verificationChecklist: {
    en: [
      "STRIDE threat model identifies vulnerabilities across all 6 categories.",
      "Semgrep and Trivy successfully run in automated pipeline mode.",
      "SQLi, XSS, and IDOR vulnerabilities are completely eliminated in patched source code.",
      "All credentials are removed from git history and managed via environment variables.",
    ],
    el: [
      "Το μοντέλο απειλών STRIDE καλύπτει και τις 6 κατηγορίες.",
      "Τα εργαλεία Semgrep και Trivy εκτελούνται επιτυχώς στον αυτοματοποιημένο αγωγό.",
      "Οι ευπάθειες SQLi, XSS και IDOR έχουν εξαλειφθεί πλήρως στον διορθωμένο κώδικα.",
      "Όλα τα διαπιστευτήρια αφαιρέθηκαν από το ιστορικό του git και φορτώνονται με ασφάλεια.",
    ],
  },
};

export const ch09Project: TechnicalProject = {
  id: "ch09-arch",
  category: {
    en: "Enterprise Architecture & Assessment Blueprint",
    el: "Αρχιτεκτονική Επιχείρησης & Στρατηγικό Πλάνο",
  },
  title: {
    en: "Secure Software Development Lifecycle (SSDLC) Framework & Resilient API Microservice",
    el: "Πλαίσιο Ασφαλούς Κύκλου Ανάπτυξης (SSDLC) & Ανθεκτικό Microservice API",
  },
  subtitle: {
    en: "Threat Modeling, Automated DevSecOps CI/CD Pipeline, Secure Microservice Architecture, and Dynamic Security Testing",
    el: "Μοντελοποίηση Απειλών, Αυτοματοποιημένος Αγωγός DevSecOps, Ασφαλής Αρχιτεκτονική Microservices και Δυναμικός Έλεγχος",
  },
  scenario: {
    en: "A health-tech software vendor developing an electronic health record (EHR) platform handling patient health data (HIPAA/GDPR) needs to overhaul its engineering lifecycle. As Lead DevSecOps Architect, you will design a comprehensive SSDLC governance policy, construct a multi-stage automated security pipeline (SAST, SCA, Secret Scanning, DAST), implement a hardened Python/FastAPI microservice, and deliver automated security assurance verification.",
    el: "Μια εταιρεία λογισμικού υγείας που αναπτύσσει πλατφόρμα ηλεκτρονικού ιατρικού φακέλου (EHR) υπόκειται σε αυστηρές κανονιστικές απαιτήσεις (GDPR/HIPAA). Ως Επικεφαλής Αρχιτέκτονας DevSecOps, θα σχεδιάσετε μια ολοκληρωμένη πολιτική SSDLC, θα κατασκευάσετε έναν αυτοματοποιημένο αγωγό ασφάλειας πολλαπλών σταδίων (SAST, SCA, Secret Scanning, DAST), θα υλοποιήσετε ένα ενισχυμένο microservice σε Python/FastAPI και θα παραδώσετε αυτοματοποιημένες δοκιμές επαλήθευσης.",
  },
  objectives: {
    en: [
      "Architect a complete SSDLC governance framework adhering to NIST SSDF (SP 800-218) and OWASP SAMM.",
      "Build a production CI/CD security pipeline running TruffleHog, Semgrep, Trivy, and OWASP ZAP.",
      "Develop a secure, hardened REST API enforcing input validation (Pydantic), parameterized database access, and cryptographic audit logging.",
      "Implement automated Software Bill of Materials (SBOM) generation in CycloneDX / SPDX format.",
    ],
    el: [
      "Σχεδιασμός πλαισίου διακυβέρνησης SSDLC κατά NIST SSDF (SP 800-218) και OWASP SAMM.",
      "Κατασκευή αγωγού ασφάλειας CI/CD με TruffleHog, Semgrep, Trivy και OWASP ZAP.",
      "Ανάπτυξη ασφαλούς REST API με επικύρωση εισόδου (Pydantic), παραμετροποιημένα ερωτήματα και κρυπτογραφική καταγραφή.",
      "Υλοποίηση αυτοματοποιημένης παραγωγής Software Bill of Materials (SBOM) σε μορφή CycloneDX.",
    ],
  },
  scope: {
    en: [
      "Tech stack: Python 3.11 / FastAPI / SQLAlchemy / PostgreSQL / Docker.",
      "Security standards: OWASP Top 10:2021, OWASP API Security Top 10:2023, NIST SP 800-218.",
    ],
    el: [
      "Τεχνολογίες: Python 3.11 / FastAPI / SQLAlchemy / PostgreSQL / Docker.",
      "Πρότυπα: OWASP Top 10:2021, OWASP API Security Top 10:2023, NIST SP 800-218.",
    ],
  },
  milestones: [
    {
      milestoneNumber: 1,
      title: {
        en: "SSDLC Policy Charter & STRIDE Threat Model",
        el: "Πολιτική SSDLC & Μοντέλο Απειλών STRIDE",
      },
      description: {
        en: "Author the organizational SSDLC standard and produce a threat model document analyzing data flows, trust boundaries, and risk mitigations.",
        el: "Σύνταξη του εταιρικού προτύπου SSDLC και δημιουργία φακέλου μοντελοποίησης απειλών με ανάλυση ροών δεδομένων και ορίων εμπιστοσύνης.",
      },
      detailedSpec: {
        en: [
          "Architect multi-cloud landing zone (AWS/Azure) with segregated organizational units (Security, Audit, Workloads).",
          "Implement Service Control Policies (SCPs) and Azure Management Group governance enforcing least privilege.",
          "Configure centralized CloudTrail/Activity Log aggregation to immutable storage buckets."
],
        el: [
          "Αρχιτεκτονική multi-cloud landing zone με διαχωρισμένες οργανωτικές μονάδες.",
          "Εφαρμογή Service Control Policies (SCPs) για επιβολή ελάχιστου προνομίου.",
          "Συγκεντρωτική συλλογή CloudTrail logs σε κλειδωμένα S3 buckets."
],
      },
      deliverable: {
        en: "SSDLC policy document + STRIDE threat model dossier.",
        el: "Έγγραφο πολιτικής SSDLC + φάκελος μοντέλου STRIDE.",
      },
    },
    {
      milestoneNumber: 2,
      title: {
        en: "Hardened Secure Microservice API Implementation",
        el: "Υλοποίηση Ενισχυμένου Microservice API",
      },
      description: {
        en: "Develop the FastAPI backend implementing strict input validation schemas, parameterized SQL queries, rate limiting, and secure JWT verification.",
        el: "Ανάπτυξη του backend FastAPI με αυστηρή επικύρωση εισόδου (Pydantic), παραμετροποιημένα ερωτήματα SQL, περιορισμό ρυθμού και ασφαλή έλεγχο JWT.",
      },
      detailedSpec: {
        en: [
          "Deploy Cloud Security Posture Management (CSPM) engine auditing infrastructure against CIS Cloud Benchmarks.",
          "Implement automated remediation for unencrypted S3 buckets, open security groups (0.0.0.0/0), and stale IAM keys.",
          "Configure Cloud Workload Protection (CWPP) runtime monitoring on virtual machines and serverless functions."
],
        el: [
          "Ανάπτυξη μηχανής CSPM για έλεγχο υποδομών βάσει CIS Cloud Benchmarks.",
          "Αυτοματοποιημένη αποκατάσταση για μη κρυπτογραφημένα buckets και ανοικτά security groups.",
          "Ρύθμιση προστασίας CWPP για virtual machines και serverless συναρτήσεις."
],
      },
      deliverable: {
        en: "Microservice codebase + automated PyTest unit test suite.",
        el: "Κώδικας microservice + σουίτα δοκιμών PyTest.",
      },
    },
    {
      milestoneNumber: 3,
      title: {
        en: "Multi-Stage DevSecOps Pipeline & SBOM Generator",
        el: "Αγωγός DevSecOps Πολλαπλών Σταδίων & Γεννήτρια SBOM",
      },
      description: {
        en: "Construct the CI/CD pipeline integrating secret scanning, SAST, SCA, container image scanning, and automated CycloneDX SBOM generation.",
        el: "Κατασκευή αγωγού CI/CD με secret scanning, SAST, SCA, σάρωση εικόνων container και αυτόματη εξαγωγή SBOM CycloneDX.",
      },
      detailedSpec: {
        en: [
          "Design secure Infrastructure-as-Code (Terraform) templates enforcing encryption and private networking by default.",
          "Implement Policy-as-Code checks in CI/CD using Open Policy Agent (OPA/Rego) and Checkov.",
          "Block deployment of non-compliant infrastructure with automated pull request comments."
],
        el: [
          "Σχεδιασμός ασφαλών προτύπων Terraform με προεπιλεγμένη κρυπτογράφηση και ιδιωτικά δίκτυα.",
          "Εφαρμογή ελέγχων Policy-as-Code με Open Policy Agent (OPA/Rego) και Checkov.",
          "Αποκλεισμός ανάπτυξης μη συμμορφούμενων υποδομών μέσω CI/CD."
],
      },
      deliverable: {
        en: "CI/CD pipeline workflow configuration + generated SBOM artifact.",
        el: "Ρυθμίσεις αγωγού CI/CD + παραγόμενο αρχείο SBOM.",
      },
    },
    {
      milestoneNumber: 4,
      title: {
        en: "Automated DAST Probing & Executive Assurance Dossier",
        el: "Αυτοματοποιημένος Δυναμικός Έλεγχος (DAST) & Επιτελικός Φάκελος",
      },
      description: {
        en: "Integrate OWASP ZAP baseline API scan into the deployment stage, compile security metrics, and deliver the executive SSDLC assurance report.",
        el: "Ενσωμάτωση δυναμικής σάρωσης OWASP ZAP στο στάδιο διάθεσης και σύνταξη της τελικής επιτελικής έκθεσης διασφάλισης SSDLC.",
      },
      detailedSpec: {
        en: [
          "Architect production Kubernetes hardening using Cilium eBPF network policies and mutual TLS.",
          "Enforce Kubernetes Pod Security Standards (Restricted profile) and gVisor container sandboxing.",
          "Establish Cloud Threat Modeling and Disaster Recovery cross-region migration playbook."
],
        el: [
          "Αρχιτεκτονική ενίσχυσης Kubernetes με Cilium eBPF network policies και mTLS.",
          "Επιβολή Pod Security Standards (Restricted profile) και sandboxing με gVisor.",
          "Σύνταξη πλάνου αντιμετώπισης απειλών cloud και cross-region disaster recovery."
],
      },
      deliverable: {
        en: "DAST scan report + Executive SSDLC Security Assurance Report (10–12 pages).",
        el: "Αναφορά σάρωσης DAST + Επιτελική Έκθεση Διασφάλισης SSDLC (10–12 σελίδες).",
      },
    },
  ],
  deliverables: {
    en: [
      "Hardened Microservice API Source Code (`/src/app/`)",
      "Automated CI/CD DevSecOps Pipeline Script (`.github/workflows/devsecops.yml`)",
      "Software Bill of Materials in CycloneDX format (`sbom.cyclonedx.json`)",
      "Comprehensive SSDLC Framework & Assurance Report (10–12 pages)",
    ],
    el: [
      "Πηγαίος Κώδικας Ενισχυμένου Microservice API (`/src/app/`)",
      "Αρχείο Ρύθμισης Αγωγού DevSecOps (`.github/workflows/devsecops.yml`)",
      "Αρχείο Software Bill of Materials σε μορφή CycloneDX (`sbom.cyclonedx.json`)",
      "Ολοκληρωμένη Έκθεση Πλαισίου SSDLC & Διασφάλισης Ασφάλειας (10–12 σελίδες)",
    ],
  },
  rubric: [
    {
      criterion: {
        en: "SSDLC Governance & Threat Modeling Rigor",
        el: "Διακυβέρνηση SSDLC & Μοντελοποίηση Απειλών",
      },
      weight: "25%",
      description: {
        en: "Completeness of STRIDE analysis, alignment with NIST SSDF, and actionable mitigation engineering.",
        el: "Πληρότητα ανάλυσης STRIDE, ευθυγράμμιση με το πρότυπο NIST SSDF και εφαρμόσιμα τεχνικά αντίμετρα.",
      },
    },
    {
      criterion: {
        en: "Secure Coding Implementation Quality",
        el: "Ποιότητα Ασφαλούς Προγραμματισμού",
      },
      weight: "30%",
      description: {
        en: "Effectiveness of input validation, SQL injection prevention, role-based authorization, and error handling.",
        el: "Αποτελεσματικότητα επικύρωσης εισόδου, αποτροπής SQL injection, εξουσιοδότησης ρόλων και διαχείρισης σφαλμάτων.",
      },
    },
    {
      criterion: {
        en: "DevSecOps Automation & Pipeline Quality Gates",
        el: "Αυτοματοποίηση DevSecOps & Πύλες Ποιότητας",
      },
      weight: "25%",
      description: {
        en: "Seamless integration of Secret Scanning, SAST, SCA, Container scanning, and SBOM generation.",
        el: "Ομαλή ενσωμάτωση σάρωσης μυστικών, SAST, SCA, σάρωσης containers και παραγωγής SBOM.",
      },
    },
    {
      criterion: {
        en: "Documentation & Executive Compliance Reporting",
        el: "Τεκμηρίωση & Επιτελικές Αναφορές Συμμόρφωσης",
      },
      weight: "20%",
      description: {
        en: "Clarity of technical documentation, code comments, and executive risk metrics communication.",
        el: "Σαφήνεια τεχνικής τεκμηρίωσης, σχολίων κώδικα και παρουσίασης μετρικών κινδύνου για τη διοίκηση.",
      },
    },
  ],
};

export const ch09Quiz: QuizQuestion[] = [
  {
    id: 1,
    question: {
      en: "In the Cloud Shared Responsibility Model for Infrastructure as a Service (IaaS), which security layer remains the customer's responsibility?",
      el: "Στο Μοντέλο Συνυπευθυνότητας Cloud για Infrastructure as a Service (IaaS), ποιο επίπεδο ασφάλειας παραμένει ευθύνη του πελάτη;",
    },
    options: {
      en: [
        "Physical data center perimeter security, biometric entrance locks, and facility power generators, across all internal enterprise network segments and endpoints.",
        "Hypervisor firmware updates and physical server blade maintenance across cloud availability zones, to ensure high-availability operational compliance across systems.",
        "Submarine fiber-optic telecommunication cable maintenance between geographic cloud regions, using standardized organizational security policy configurations.",
        "Hardware security module (HSM) physical enclosure destruction upon manufacturer hardware end-of-life, across distributed multi-region cloud production environments.",
        "Guest operating system patching, application configuration, network firewall rules, and data encryption.",
      ],
      el: [
        "Φυσική ασφάλεια κέντρου δεδομένων, βιομετρικές κλειδαριές εισόδου και γεννήτριες ισχύος εγκαταστάσεων, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Ενημερώσεις firmware του hypervisor και συντήρηση φυσικών διακομιστών στις ζώνες διαθεσιμότητας, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Συντήρηση υποθαλάσσιων καλωδίων οπτικών ινών μεταξύ γεωγραφικών περιφερειών του παρόχου cloud, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Φυσική καταστροφή μονάδων υλικού HSM κατά την απόσυρση εξοπλισμού από τον κατασκευαστή, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Ενημερώσεις λειτουργικού συστήματος, ρυθμίσεις εφαρμογών, κανόνες firewall και κρυπτογράφηση δεδομένων.",
      ],
    },
    correctIndex: 4,
    explanation: {
      en: "In IaaS, the cloud provider secures the physical infrastructure, facilities, and hypervisor (security OF the cloud). The customer is responsible for guest OS, applications, data, and access controls (security IN the cloud).",
      el: "Στο IaaS ο πάροχος ασφαλίζει τη φυσική υποδομή και τον hypervisor, ενώ ο πελάτης είναι υπεύθυνος για το λειτουργικό σύστημα, τις εφαρμογές, τα δεδομένα και τα δικαιώματα πρόσβασης.",
    },
  },
  {
    id: 2,
    question: {
      en: "What primary security hazard occurs when a Docker container is executed with the '--privileged' flag or binds '/var/run/docker.sock'?",
      el: "Ποιος βασικός κίνδυνος ασφάλειας προκύπτει όταν ένα Docker container εκτελείται με '--privileged' ή προσαρτά το '/var/run/docker.sock';",
    },
    options: {
      en: [
        "The container can escape namespace isolation, gain root on the underlying host, and execute arbitrary commands.",
        "The container is limited to sixty-four kilobytes of dynamic random access memory execution space, during standard continuous monitoring and administrative audits.",
        "The container automatically deletes all public cloud storage buckets across the active cloud tenant account, using standardized organizational security policy configurations.",
        "The container forces all network traffic to be encrypted with post-quantum lattice public-key schemes, across distributed multi-region cloud production environments.",
        "The container converts relational SQL database tables into flat unindexed plain text configuration files, without requiring manual intervention from systems engineering staff.",
      ],
      el: [
        "Το container μπορεί να διαφύγει από την απομόνωση, αποκτώντας δικαιώματα root στον κεντρικό υπολογιστή.",
        "Το container περιορίζεται αυστηρά σε χώρο εκτέλεσης μνήμης RAM μεγέθους εξήντα τεσσάρων kilobytes, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Το container διαγράφει αυτόματα όλους τους αποθηκευτικούς κάδους cloud του ενεργού λογαριασμού, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Το container επιβάλλει την κρυπτογράφηση όλης της κίνησης με μετα-κβαντικά σχήματα πλεγμάτων, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Το container μετατρέπει σχεσιακές βάσεις δεδομένων σε απλά αρχεία κειμένου τοπικά στον δίσκο, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Running containers as '--privileged' or exposing docker.sock gives the container full access to host devices and the Docker daemon, allowing trivial container breakout and host compromise.",
      el: "Η εκτέλεση με '--privileged' ή η έκθεση του docker.sock δίνει πλήρη πρόσβαση στον δαίμονα Docker και στις συσκευές του host, επιτρέποντας άμεση διαφυγή από το container και έλεγχο του εξυπηρετητή.",
    },
  },
  {
    id: 3,
    question: {
      en: "In Kubernetes Pod Security Standards (PSS), which profile provides the highest level of security hardening by restricting all privileged capabilities?",
      el: "Στα Πρότυπα Ασφάλειας Pods του Kubernetes (PSS), ποιο προφίλ παρέχει τη μέγιστη θωράκιση απαγορεύοντας όλα τα προνόμια;",
    },
    options: {
      en: [
        "Privileged Profile, allowing unrestricted execution permissions across all host devices and interfaces, to ensure high-availability operational compliance across systems.",
        "Restricted Profile, enforcing strict pod hardening (non-root, read-only root filesystem, dropping capabilities).",
        "Baseline Profile, preventing known privilege escalations while maintaining broad workload compatibility, using standardized organizational security policy configurations.",
        "Legacy Profile, maintaining backward compatibility with deprecated container runtime engine versions, without requiring manual intervention from systems engineering staff.",
        "Default Profile, assigning root execution rights to all incoming application container deployments, to mitigate potential unauthorized system configuration drift.",
      ],
      el: [
        "Privileged Profile, επιτρέποντας απεριόριστα δικαιώματα σε όλες τις συσκευές του υποκείμενου host, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Restricted Profile, επιβάλλοντας αυστηρή θωράκιση (non-root, read-only filesystem, αφαίρεση capabilities).",
        "Baseline Profile, αποτρέποντας γνωστές κλιμακώσεις προνομίων με ευρεία συμβατότητα εφαρμογών, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Legacy Profile, διατηρώντας συμβατότητα με παλαιότερες εκδόσεις μηχανών εκτέλεσης containers, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Default Profile, αποδίδοντας δικαιώματα εκτέλεσης root σε όλες τις νέες εφαρμογές containers, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "The 'Restricted' profile enforces security hardening best practices (running as non-root, dropping all Linux capabilities except NET_BIND_SERVICE, read-only root filesystems).",
      el: "Το προφίλ 'Restricted' επιβάλλει τις αυστηρότερες πρακτικές ασφάλειας (εκτέλεση χωρίς root, αφαίρεση Linux capabilities, read-only σύστημα αρχείων) αποτρέποντας διαφυγή.",
    },
  },
  {
    id: 4,
    question: {
      en: "What primary capability does Infrastructure as Code (IaC) static scanning (e.g. Checkov, tfsec) provide in cloud security?",
      el: "Ποια βασική δυνατότητα προσφέρει ο στατικός έλεγχος Infrastructure as Code (IaC) όπως το Checkov στην ασφάλεια cloud;",
    },
    options: {
      en: [
        "Compiling Terraform HCL configuration files into executable kernel assembly device driver binaries, across distributed multi-region cloud production environments.",
        "Replacing public cloud virtual private clouds with local unencrypted Ethernet broadcast domains, without requiring manual intervention from systems engineering staff.",
        "Detecting cloud misconfigurations (open S3 buckets, unencrypted disks, overly permissive IAM) prior to deployment.",
        "Automatically generating RSA-4096 private keys for all remote user mobile device applications, to mitigate potential unauthorized system configuration drift.",
        "Managing physical facility access control badges and datacenter biometric fingerprint systems, in accordance with modern zero trust architectural principles.",
      ],
      el: [
        "Μεταγλώττιση αρχείων Terraform HCL σε εκτελέσιμους οδηγούς συσκευών πυρήνα του λειτουργικού, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Αντικατάσταση εικονικών δικτύων VPC με τοπικά μη κρυπτογραφημένα δίκτυα εκπομπής Ethernet, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Εντοπισμό εσφαλμένων ρυθμίσεων cloud (ανοικτά S3 buckets, μη κρυπτογραφημένοι δίσκοι) πριν τη διάθεση.",
        "Αυτόματη παραγωγή ιδιωτικών κλειδιών RSA-4096 για όλες τις εφαρμογές κινητών τηλεφώνων, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Διαχείριση καρτών φυσικής πρόσβασης και βιομετρικών αισθητήρων στα κέντρα δεδομένων, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "IaC scanning evaluates Terraform, CloudFormation, or Kubernetes manifests in the CI/CD pipeline, catching security misconfigurations before infrastructure is provisioned.",
      el: "Ο έλεγχος IaC αναλύει αρχεία Terraform και Kubernetes στο pipeline CI/CD, εντοπίζοντας επικίνδυνες ρυθμίσεις πριν από τη δημιουργία των πόρων στο cloud.",
    },
  },
  {
    id: 5,
    question: {
      en: "In cloud IAM security architecture, what is the core benefit of using temporary Role Assumption over static IAM User Access Keys?",
      el: "Στην αρχιτεκτονική Cloud IAM, ποιο είναι το βασικό όφελος της προσωρινής Ανάληψης Ρόλων (Role Assumption) έναντι των στατικών κλειδιών πρόσβασης;",
    },
    options: {
      en: [
        "Roles allow any unauthenticated external entity to execute administrative root commands across all regions, without requiring manual intervention from systems engineering staff.",
        "Roles convert relational database tables into non-relational document collections during active queries, to mitigate potential unauthorized system configuration drift.",
        "Roles eliminate the requirement for transport layer security (TLS) encryption during API communication, in accordance with modern zero trust architectural principles.",
        "Roles provide short-lived, automatically expiring credentials, eliminating the risk of long-term hardcoded key leakage.",
        "Roles restrict server CPU execution clock frequencies during high-volume application compute workloads, before committing changes to central production repository nodes.",
      ],
      el: [
        "Οι ρόλοι επιτρέπουν σε μη ταυτοποιημένους χρήστες να εκτελούν εντολές διαχειριστή σε όλες τις περιοχές, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Οι ρόλοι μετατρέπουν σχεσιακούς πίνακες σε μη σχεσιακά έγγραφα δεδομένων κατά την εκτέλεση ερωτημάτων, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Οι ρόλοι καταργούν την ανάγκη κρυπτογράφησης TLS κατά την επικοινωνία με τα APIs του cloud, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Οι ρόλοι παρέχουν βραχύβια διαπιστευτήρια αυτόματης λήξης, εξαλείφοντας τον κίνδυνο διαρροής μόνιμων κλειδιών.",
        "Οι ρόλοι περιορίζουν τη συχνότητα του επεξεργαστή κατά την εκτέλεση απαιτητικών υπολογιστικών εργασιών, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
      ],
    },
    correctIndex: 3,
    explanation: {
      en: "Static access keys are frequently leaked in code or logs. Role assumption uses short-lived tokens (e.g. AWS STS) that expire within hours, minimizing the window of vulnerability.",
      el: "Τα στατικά κλειδιά διαρρέουν συχνά σε κώδικα. Η ανάληψη ρόλων χρησιμοποιεί προσωρινά διακριτικά αυτόματης λήξης, ελαχιστοποιώντας τον κίνδυνο παραβίασης.",
    },
  },
  {
    id: 6,
    question: {
      en: "What primary security capability does a Service Mesh (e.g. Istio, Linkerd) provide for microservices communication in Kubernetes?",
      el: "Ποια βασική δυνατότητα ασφάλειας παρέχει ένα Service Mesh (π.χ. Istio) για την επικοινωνία μικροϋπηρεσιών στο Kubernetes;",
    },
    options: {
      en: [
        "Automatic compilation of Python scripts into kernel-level assembly device drivers across cluster nodes, to mitigate potential unauthorized system configuration drift.",
        "Replacement of relational SQL database queries with unindexed flat text files stored in local directories, in accordance with modern zero trust architectural principles.",
        "Permanent removal of all network firewall rules to maximize inter-container packet routing throughput, before committing changes to central production repository nodes.",
        "Management of physical facility cooling systems and backup diesel generators inside enterprise data centers, under standard operating procedures defined in corporate ISMS policies.",
        "Transparent mutual TLS (mTLS) encryption, cryptographic service identity (SPIFFE), and fine-grained authorization.",
      ],
      el: [
        "Αυτόματη μεταγλώττιση scripts Python σε οδηγούς συσκευών πυρήνα σε όλους τους κόμβους του cluster, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Αντικατάσταση ερωτημάτων SQL με μη ευρετηριασμένα αρχεία κειμένου αποθηκευμένα σε τοπικούς φακέλους, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Μόνιμη κατάργηση όλων των κανόνων firewall για μεγιστοποίηση της ταχύτητας δρομολόγησης πακέτων, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Διαχείριση συστημάτων ψύξης και γεννητριών πετρελαίου στα εταιρικά κέντρα δεδομένων, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Διαφανή αμοιβαία κρυπτογράφηση mTLS, κρυπτογραφική ταυτότητα υπηρεσιών (SPIFFE) και εξουσιοδότηση.",
      ],
    },
    correctIndex: 4,
    explanation: {
      en: "A service mesh injects sidecar proxies to enforce mutual TLS (mTLS) authentication, workload identity, and access policies between microservices without altering application code.",
      el: "Το Service Mesh χρησιμοποιεί sidecar proxies για την επιβολή αμοιβαίας κρυπτογράφησης mTLS, ταυτότητας υπηρεσιών και πολιτικών πρόσβασης μεταξύ μικροϋπηρεσιών χωρίς αλλαγές στον κώδικα.",
    },
  },
  {
    id: 7,
    question: {
      en: "What cloud misconfiguration is most commonly responsible for catastrophic mass data exfiltration incidents?",
      el: "Ποια εσφαλμένη ρύθμιση cloud ευθύνεται συχνότερα για καταστροφικά περιστατικά μαζικής διαρροής δεδομένων;",
    },
    options: {
      en: [
        "Publicly accessible object storage buckets (e.g. AWS S3, Azure Blobs) lacking authentication policies.",
        "Using TLS 1.3 encryption ciphers instead of legacy SSL 3.0 transport layer protocols, in accordance with modern zero trust architectural principles.",
        "Configuring redundant power supplies across multi-zone cloud geographic availability regions, before committing changes to central production repository nodes.",
        "Allocating more than sixty-four gigabytes of physical RAM to backend relational database clusters, under standard operating procedures defined in corporate ISMS policies.",
        "Enforcing multi-factor authentication on administrative cloud management web console logins, across all internal enterprise network segments and endpoints.",
      ],
      el: [
        "Δημόσια προσβάσιμοι κάδοι αποθήκευσης (AWS S3, Azure Blobs) χωρίς πολιτικές ελέγχου πρόσβασης.",
        "Χρήση κρυπτογράφησης TLS 1.3 αντί για απαρχαιωμένα πρωτόκολλα επιπέδου μεταφοράς SSL 3.0, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Ρύθμιση εφεδρικών παροχών ισχύος σε πολλαπλές γεωγραφικές ζώνες διαθεσιμότητας cloud, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Δέσμευση άνω των εξήντα τεσσάρων gigabytes μνήμης RAM σε συστοιχίες βάσεων δεδομένων, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Επιβολή ταυτοποίησης πολλαπλών παραγόντων στις διαχειριστικές πύλες εισόδου του cloud, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Leaving cloud storage buckets (S3 buckets, Blob containers) configured with public read access allows anyone on the internet to exfiltrate proprietary data without authentication.",
      el: "Η διαμόρφωση κάδων αποθήκευσης cloud με δημόσια πρόσβαση (public read) επιτρέπει σε οποιονδήποτε στο διαδίκτυο να αντλήσει ευαίσθητα δεδομένα χωρίς ταυτοποίηση.",
    },
  },
  {
    id: 8,
    question: {
      en: "In Serverless computing (e.g. AWS Lambda, Google Cloud Functions), what is a key architectural security consideration?",
      el: "Στο Serverless computing (π.χ. AWS Lambda), ποιο είναι ένα κρίσιμο αρχιτεκτονικό ζήτημα ασφάλειας;",
    },
    options: {
      en: [
        "Managing physical server blade fan speeds and power supply redundancies in provider data centers, in accordance with modern zero trust architectural principles.",
        "Function-level least privilege IAM permissions, ephemeral execution environments, and dependency supply chain risks.",
        "Compiling backend serverless functions into static kernel device driver modules during deployment, under standard operating procedures defined in corporate ISMS policies.",
        "Eliminating the necessity for database connection encryption across distributed regional networks, across all internal enterprise network segments and endpoints.",
        "Disabling all runtime logging and cloud audit telemetry to reduce execution billing costs, during standard continuous monitoring and administrative audits.",
      ],
      el: [
        "Διαχείριση ταχύτητας ανεμιστήρων και εφεδρικών τροφοδοτικών στα κέντρα δεδομένων του παρόχου, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Εφαρμογή ελάχιστου προνομίου ανά συνάρτηση, εφήμερα περιβάλλοντα εκτέλεσης και εξαρτήσεις τρίτων.",
        "Μεταγλώττιση συναρτήσεων σε στατικούς οδηγούς συσκευών πυρήνα κατά τη διάρκεια της διάθεσης, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Κατάργηση της ανάγκης κρυπτογράφησης συνδέσεων βάσεων δεδομένων σε περιφερειακά δίκτυα, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Απενεργοποίηση καταγραφής καταγραφών για μείωση του κόστους χρέωσης εκτέλεσης υπολογισμών, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Serverless architectures require granular IAM roles per function, securing third-party dependencies, handling cold-start secrets securely, and monitoring ephemeral event-driven invocations.",
      el: "Οι αρχιτεκτονικές serverless απαιτούν αυστηρά δικαιώματα IAM ανά συνάρτηση, ασφάλεια στις εξαρτήσεις τρίτων, ασφαλή διαχείριση μυστικών και παρακολούθηση των εφήμερων εκτελέσεων.",
    },
  },
  {
    id: 9,
    question: {
      en: "What primary purpose does a Cloud Security Posture Management (CSPM) solution serve in multi-cloud environments?",
      el: "Ποιο βασικό σκοπό εξυπηρετεί μια λύση Cloud Security Posture Management (CSPM) σε περιβάλλοντα multi-cloud;",
    },
    options: {
      en: [
        "Decrypting end-to-end TLS communications in real time using hardcoded root certificate authority keys, under standard operating procedures defined in corporate ISMS policies.",
        "Replacing relational SQL database engines with unindexed flat text files stored on local disks, across all internal enterprise network segments and endpoints.",
        "Continuously auditing cloud infrastructure configurations against compliance benchmarks and detecting drift.",
        "Restricting remote employee workstation network bandwidth to sixty-four kilobits per second, during standard continuous monitoring and administrative audits.",
        "Managing physical facility security guards and perimeter biometric gate locks across data centers, to ensure high-availability operational compliance across systems.",
      ],
      el: [
        "Αποκρυπτογράφηση κίνησης TLS σε πραγματικό χρόνο χρησιμοποιώντας ενσωματωμένα κλειδιά CA, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Αντικατάσταση σχεσιακών βάσεων SQL με απλά αρχεία κειμένου αποθηκευμένα σε τοπικούς δίσκους, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Συνεχής έλεγχος των ρυθμίσεων υποδομής cloud έναντι προτύπων συμμόρφωσης και εντοπισμός αποκλίσεων.",
        "Περιορισμός του εύρους ζώνης των απομακρυσμένων υπαλλήλων σε εξήντα τέσσερα kilobits το δευτερόλεπτο, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Διαχείριση φυλάκων φυσικής ασφάλειας και βιομετρικών κλειδαριών στα κέντρα δεδομένων, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "CSPM tools continuously monitor cloud assets (IAM, networks, storage) to identify misconfigurations, enforce CIS benchmarks, and maintain compliance across AWS, Azure, and GCP.",
      el: "Τα εργαλεία CSPM παρακολουθούν συνεχώς τους πόρους cloud (δικαιώματα, δίκτυα, storage), εντοπίζοντας εσφαλμένες ρυθμίσεις και επιβάλλοντας πρότυπα ασφάλειας (CIS benchmarks).",
    },
  },
  {
    id: 10,
    question: {
      en: "How does Cloud Micro-segmentation enhance network security within Virtual Private Clouds (VPCs)?",
      el: "Πώς ενισχύει την ασφάλεια δικτύου η Μικρο-κατάτμηση (Micro-segmentation) μέσα σε Virtual Private Clouds (VPCs);",
    },
    options: {
      en: [
        "By combining all application and database servers into a single flat Layer 2 broadcast subnet, across all internal enterprise network segments and endpoints.",
        "By disabling all transport layer encryption across internal cloud virtual network interfaces, during standard continuous monitoring and administrative audits.",
        "By converting relational database records into non-indexed plain text configuration files, to ensure high-availability operational compliance across systems.",
        "By enforcing granular firewall policies at individual workload interfaces, preventing lateral attacker movement.",
        "By routing all internal traffic through external untrusted public dynamic proxy servers, using standardized organizational security policy configurations.",
      ],
      el: [
        "Συγχωνεύοντας όλους τους διακομιστές εφαρμογών και βάσεων σε ένα ενιαίο επίπεδο δίκτυο Layer 2, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Απενεργοποιώντας κάθε κρυπτογράφηση επιπέδου μεταφοράς στις εσωτερικές εικονικές κάρτες δικτύου, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Μετατρέποντας εγγραφές βάσεων δεδομένων σε απλά αρχεία κειμένου τοπικά στον υπολογιστή, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Επιβάλλοντας κανόνες firewall σε κάθε μεμονωμένο φόρτο εργασίας, αποτρέποντας την πλευρική μετακίνηση.",
        "Δρομολογώντας όλη την εσωτερική κίνηση μέσω μη ασφαλών δημόσιων εξωτερικών διακομιστών proxy, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
      ],
    },
    correctIndex: 3,
    explanation: {
      en: "Micro-segmentation uses software-defined security groups and network policies to isolate workloads individually, ensuring that compromising one server does not permit lateral access to others.",
      el: "Η μικρο-κατάτμηση εφαρμόζει αυστηρούς κανόνες ασφάλειας σε επίπεδο κάθε μεμονωμένης εικονικής μηχανής ή pod, αποτρέποντας την πλευρική μετακίνηση του εισβολέα σε περίπτωση παραβίασης.",
    },
  },
];

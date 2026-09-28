import type { CliLab, HandsOnLab, TechnicalProject, QuizQuestion } from "../types";

export const ch10CliLab: CliLab = {
  id: "ch10-cli",
  title: {
    en: "Web Vulnerability Assessment & Penetration Testing Sandbox",
    el: "Προσομοιωτής Αξιολόγησης Ευπαθειών & Δοκιμών Διείσδυσης Web",
  },
  scenario: {
    en: "Audit HTTP response security headers, discover hidden administrative endpoints using Gobuster directory enumeration, execute Nikto web server vulnerability scans, and probe injection parameters with SQLMap.",
    el: "Ελέγξτε επικεφαλίδες ασφάλειας HTTP, ανακαλύψτε κρυφά endpoints με το Gobuster, εκτελέστε σάρωση ευπαθειών με το Nikto και δοκιμάστε παραμέτρους με το SQLMap.",
  },
  initialPrompt: "pentester@kali-sec:~$",
  banner: {
    en: "=== Chapter 10 Security Testing & Penetration Testing Sandbox ===\nTarget: https://target-server.lab.internal | Authorization: Formal Rules of Engagement (RoE) Active\nType 'help' for command assistance or follow the missions below.",
    el: "=== Εργαστήριο Ελέγχου Ασφάλειας & Pentesting Κεφαλαίου 10 ===\nΣτόχος: https://target-server.lab.internal | Εξουσιοδότηση: Ενεργοί Κανόνες Εμπλοκής (RoE)\nΠληκτρολογήστε 'help' για βοήθεια ή ακολουθήστε τις παρακάτω αποστολές.",
  },
  fileSystem: {
    "target_manifest.txt": "TARGET_HOST: target-server.lab.internal\nSCOPE: 10.0.5.20\nALLOWED_HOURS: 00:00-23:59 UTC",
    "wordlists/common.txt": "admin\nbackup\napi\nconfig\ndebug\nlogin\nupload",
  },
  tasks: [
    {
      id: "task-1",
      title: {
        en: "Audit HTTP Security Headers",
        el: "Έλεγχος Επικεφαλίδων Ασφάλειας HTTP",
      },
      description: {
        en: "Inspect response headers on `target-server.lab.internal` using `curl -I` to identify missing security controls.",
        el: "Εξετάστε τις επικεφαλίδες απόκρισης του στόχου με την εντολή `curl -I`.",
      },
      hint: {
        en: "Execute: curl -I https://target-server.lab.internal",
        el: "Εκτελέστε: curl -I https://target-server.lab.internal",
      },
      solution: "curl -I https://target-server.lab.internal",
      validateRegex: "curl\\s+-I.*target-server",
      successMessage: {
        en: "Headers audited: Identified missing HSTS, CSP, and X-Content-Type-Options headers.",
        el: "Οι επικεφαλίδες ελέγχθηκαν: Εντοπίστηκε απουσία HSTS, Content Security Policy και X-Frame-Options.",
      },
    },
    {
      id: "task-2",
      title: {
        en: "Enumerate Hidden Web Directories with Gobuster",
        el: "Ανακάλυψη Κρυφών Καταλόγων με το Gobuster",
      },
      description: {
        en: "Brute-force hidden endpoints on `https://target-server.lab.internal` using wordlist `wordlists/common.txt`.",
        el: "Εκτελέστε ανακάλυψη καταλόγων στον στόχο με το εργαλείο `gobuster` και τη λίστα `wordlists/common.txt`.",
      },
      hint: {
        en: "Execute: gobuster dir -u https://target-server.lab.internal -w wordlists/common.txt",
        el: "Εκτελέστε: gobuster dir -u https://target-server.lab.internal -w wordlists/common.txt",
      },
      solution: "gobuster dir -u https://target-server.lab.internal -w wordlists/common.txt",
      validateRegex: "gobuster\\s+dir.*target-server",
      successMessage: {
        en: "Directories enumerated: Discovered hidden endpoint `/api/v1/admin/debug` (Status 403) and `/backup`.",
        el: "Οι κατάλογοι ανακαλύφθηκαν: Εντοπίστηκε το κρυφό endpoint `/api/v1/admin/debug` και ο φάκελος `/backup`.",
      },
    },
    {
      id: "task-3",
      title: {
        en: "Run Nikto Web Server Vulnerability Scanner",
        el: "Εκτέλεση Σαρωτή Ευπαθειών Web Server (Nikto)",
      },
      description: {
        en: "Perform automated web server configuration audit on `https://target-server.lab.internal` using `nikto`.",
        el: "Εκτελέστε αυτοματοποιημένο έλεγχο ευπαθειών web server στον στόχο με το `nikto`.",
      },
      hint: {
        en: "Execute: nikto -h https://target-server.lab.internal",
        el: "Εκτελέστε: nikto -h https://target-server.lab.internal",
      },
      solution: "nikto -h https://target-server.lab.internal",
      validateRegex: "nikto\\s+-h.*target-server",
      successMessage: {
        en: "Nikto scan complete: Outdated web server version and exposed debug headers logged.",
        el: "Η σάρωση Nikto ολοκληρώθηκε: Καταγράφηκαν παρωχημένη έκδοση web server και εκτεθειμένες επικεφαλίδες.",
      },
    },
    {
      id: "task-4",
      title: {
        en: "Automated SQL Injection Probing with SQLMap",
        el: "Αυτοματοποιημένος Έλεγχος SQL Injection με το SQLMap",
      },
      description: {
        en: "Probe parameter `id` on target endpoint `https://target-server.lab.internal/item?id=1` using `sqlmap`.",
        el: "Ελέγξτε την παράμετρο `id` στο endpoint `https://target-server.lab.internal/item?id=1` με το `sqlmap`.",
      },
      hint: {
        en: 'Execute: sqlmap -u "https://target-server.lab.internal/item?id=1" --batch',
        el: 'Εκτελέστε: sqlmap -u "https://target-server.lab.internal/item?id=1" --batch',
      },
      solution: 'sqlmap -u "https://target-server.lab.internal/item?id=1" --batch',
      validateRegex: "sqlmap.*target-server",
      successMessage: {
        en: "SQLMap verified vulnerability: Parameter 'id' is vulnerable to Boolean-based blind and Union-based SQL injection!",
        el: "Το SQLMap επιβεβαίωσε την ευπάθεια: Η παράμετρος 'id' είναι ευάλωτη σε Union-based και Boolean blind SQL injection!",
      },
    },
  ],
};

export const ch10HandsOnLab: HandsOnLab = {
  title: {
    en: "Full-Scope Vulnerability Assessment & Web Penetration Testing (OWASP Top 10 & WSTG)",
    el: "Ολοκληρωμένη Αξιολόγηση Ευπαθειών & Δοκιμές Διείσδυσης Web (OWASP Top 10 & WSTG)",
  },
  subtitle: {
    en: "2-Hour Practical Lab: Scope Definition, Active Reconnaissance, Controlled Exploitation, and CVSS v3.1/v4.0 Risk Scoring",
    el: "Εργαστήριο 2 Ωρών: Ορισμός Εύρους, Ενεργή Αναγνώριση, Ελεγχόμενη Εκμετάλλευση και Βαθμολόγηση Κινδύνου CVSS",
  },
  duration: {
    en: "~2 Hours (120 minutes)",
    el: "~2 Ώρες (120 λεπτά)",
  },
  overview: {
    en: "In this comprehensive 2-hour technical laboratory, students execute a professional web application penetration test following the OWASP Web Security Testing Guide (WSTG v4.2) and the Penetration Testing Execution Standard (PTES). You will establish formal Rules of Engagement (RoE), conduct passive and active reconnaissance, scan for unpatched network services (Nmap NSE), identify application vulnerabilities (OWASP ZAP / Burp Suite), execute controlled proof-of-concept exploits, calculate CVSS v3.1 base metrics, and deliver an executive penetration testing report.",
    el: "Σε αυτό το εργαστήριο 2 ωρών, οι φοιτητές εκτελούν μια επαγγελματική δοκιμή διείσδυσης web εφαρμογής ακολουθώντας τον οδηγό OWASP WSTG v4.2 και το πρότυπο PTES. Θα συντάξετε Κανόνες Εμπλοκής (RoE), θα εκτελέσετε αναγνώριση, θα σαρώσετε για ευπαθείς υπηρεσίες (Nmap NSE), θα εντοπίσετε σφάλματα εφαρμογής με το OWASP ZAP, θα εκτελέσετε ελεγχόμενα Proof-of-Concept exploits, θα υπολογίσετε σκορ CVSS v3.1 και θα συντάξετε μια πλήρη τεχνική έκθεση pentest.",
  },
  environment: [
    "Kali Linux 2024.x VM / Parrot Security OS",
    "Target environment: OWASP Juice Shop & Multi-tier vulnerable banking portal (`10.0.5.20`)",
    "Penetration testing suite: `nmap`, `nikto`, `gobuster`, `sqlmap`, `zap-cli`, `hydra`, `metasploit-framework`",
    "CVSS v3.1 / v4.0 Calculator toolset",
  ],
  phases: [
    {
      phaseNumber: 1,
      title: {
        en: "Pre-Engagement, Rules of Engagement & Reconnaissance",
        el: "Προκαταρκτικές Διαδικασίες, Κανόνες Εμπλοκής (RoE) & Αναγνώριση",
      },
      estimatedTime: { en: "25 min", el: "25 λεπτά" },
      objectives: {
        en: [
          "Define scope boundaries (In-Scope IP targets, excluded production endpoints).",
          "Execute passive OSINT reconnaissance and active DNS zone transfer checks (`dig AXFR`).",
          "Perform service version enumeration using Nmap NSE vulnerability scripts.",
        ],
        el: [
          "Καθορισμός ορίων εύρους (εγκεκριμένοι στόχοι IP, εξαιρούμενα συστήματα).",
          "Εκτέλεση παθητικής αναγνώρισης OSINT και ελέγχου μεταφοράς ζώνης DNS (`dig AXFR`).",
          "Καταγραφή εκδόσεων υπηρεσιών με σενάρια NSE του Nmap.",
        ],
      },
      steps: {
        en: [
          "1. Review signed RoE authorization letter in `/workspace/roe_authorization.pdf`.\n2. Run comprehensive service enumeration:\n```bash\nnmap -sV -sC --script vuln -p 1-65535 10.0.5.20 -oA /workspace/nmap_vuln_scan\n```\n3. Analyze open ports: Web (80/443), SSH (22), Management (8080).",
        ],
        el: [
          "1. Έλεγχος υπογεγραμμένου εγγράφου εξουσιοδότησης RoE στο `/workspace/roe_authorization.pdf`.\n2. Εκτέλεση σάρωσης ευπαθειών με το Nmap:\n```bash\nnmap -sV -sC --script vuln -p 1-65535 10.0.5.20 -oA /workspace/nmap_vuln_scan\n```\n3. Ανάλυση ανοιχτών θυρών: Web (80/443), SSH (22), Management (8080).",
        ],
      },
    },
    {
      phaseNumber: 2,
      title: {
        en: "Automated DAST & Vulnerability Assessment Scanning",
        el: "Αυτοματοποιημένη Σάρωση DAST & Αξιολόγηση Ευπαθειών",
      },
      estimatedTime: { en: "45 min", el: "45 λεπτά" },
      objectives: {
        en: [
          "Launch OWASP ZAP automated spider and active scanner against the web target.",
          "Fuzz hidden administrative parameters and backup archives using Gobuster / ffuf.",
          "Triage discovered findings and eliminate false positives.",
        ],
        el: [
          "Εκκίνηση spider και ενεργού σαρωτή OWASP ZAP εναντίον του στόχου web.",
          "Fuzzing κρυφών παραμέτρων και αντιγράφων ασφαλείας με Gobuster / ffuf.",
          "Διαλογή ευρημάτων και εξάλειψη ψευδώς θετικών ενδείξεων.",
        ],
      },
      steps: {
        en: [
          "1. Run directory and file fuzzing:\n```bash\ngobuster dir -u http://10.0.5.20:8080/ -w /usr/share/wordlists/dirb/big.txt -x php,json,bak,old -o /workspace/gobuster.txt\n```\n2. Execute automated ZAP baseline scan:\n```bash\nzap-baseline.py -t http://10.0.5.20:8080/ -r /workspace/zap_report.html\n```\n3. Review flagged vulnerabilities in HTML report.",
        ],
        el: [
          "1. Εκτέλεση fuzzing καταλόγων και αρχείων:\n```bash\ngobuster dir -u http://10.0.5.20:8080/ -w /usr/share/wordlists/dirb/big.txt -x php,json,bak,old -o /workspace/gobuster.txt\n```\n2. Εκτέλεση αυτοματοποιημένης σάρωσης ZAP:\n```bash\nzap-baseline.py -t http://10.0.5.20:8080/ -r /workspace/zap_report.html\n```\n3. Εξέταση των επισημασμένων ευπαθειών στην αναφορά HTML.",
        ],
      },
    },
    {
      phaseNumber: 3,
      title: {
        en: "Controlled Exploitation & Proof of Concept (PoC)",
        el: "Ελεγχόμενη Εκμετάλλευση & Απόδειξη Έννοιας (Proof of Concept - PoC)",
      },
      estimatedTime: { en: "30 min", el: "30 λεπτά" },
      objectives: {
        en: [
          "Execute controlled SQL injection exploit retrieving database version.",
          "Demonstrate Stored Cross-Site Scripting (XSS) triggering a non-destructive alert box.",
          "Exploit Broken Access Control (IDOR) to access another user's invoice.",
        ],
        el: [
          "Εκτέλεση ελεγχόμενου exploit SQL injection για ανάκτηση έκδοσης βάσης δεδομένων.",
          "Επίδειξη Stored XSS ενεργοποιώντας ένα ασφαλές πλαίσιο alert.",
          "Εκμετάλλευση IDOR για πρόσβαση σε τιμολόγιο άλλου χρήστη.",
        ],
      },
      steps: {
        en: [
          "1. Exploit SQL injection via SQLMap:\n```bash\nsqlmap -u \"http://10.0.5.20:8080/rest/products/search?q=apple\" --banner --current-db --batch\n```\n2. Verify proof of concept execution and capture screenshot evidence.\n3. Stop exploitation immediately to prevent database corruption.",
        ],
        el: [
          "1. Εκμετάλλευση SQL injection με το SQLMap:\n```bash\nsqlmap -u \"http://10.0.5.20:8080/rest/products/search?q=apple\" --banner --current-db --batch\n```\n2. Επαλήθευση του PoC και λήψη αποδεικτικών στιγμιοτύπων.\n3. Άμεση διακοπή για αποφυγή αλλοίωσης της βάσης.",
        ],
      },
    },
    {
      phaseNumber: 4,
      title: {
        en: "CVSS v3.1 Scoring & Penetration Testing Reporting",
        el: "Βαθμολόγηση CVSS v3.1 & Σύνταξη Έκθεσης Pentest",
      },
      estimatedTime: { en: "20 min", el: "20 λεπτά" },
      objectives: {
        en: [
          "Calculate CVSS v3.1 Base Vector string (AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H -> 9.8 Critical).",
          "Write clear technical root-cause descriptions and step-by-step remediation guidance.",
          "Compile the final Executive & Technical Penetration Testing Report.",
        ],
        el: [
          "Υπολογισμός διανύσματος CVSS v3.1 Base Vector (π.χ. 9.8 Critical για SQLi).",
          "Συγγραφή τεχνικών περιγραφών αιτίου και οδηγιών αποκατάστασης.",
          "Σύνθεση της τελικής Επιτελικής & Τεχνικής Έκθεσης Δοκιμών Διείσδυσης.",
        ],
      },
      steps: {
        en: [
          "1. Compute CVSS scores for all confirmed findings (SQLi, IDOR, Missing Headers).\n2. Format findings using standard issue templates (Title, Severity, CVSS, Impact, PoC Steps, Remediation).\n3. Deliver final executive summary slide deck.",
        ],
        el: [
          "1. Υπολογισμός βαθμολογιών CVSS για όλα τα επιβεβαιωμένα ευρήματα.\n2. Μορφοποίηση ευρημάτων σε πρότυπα (Τίτλος, Κρισιμότητα, CVSS, Επίπτωση, Βήματα PoC, Διόρθωση).\n3. Παράδοση της τελικής επιτελικής σύνοψης.",
        ],
      },
    },
  ],
  deliverables: {
    en: [
      "Rules of Engagement & Scope Document (`rules_of_engagement.pdf`)",
      "Raw Scanner Outputs & Tool Logs (`nmap_scan.xml`, `zap_report.html`)",
      "Proof of Concept Exploit Scripts & Evidence Screenshots (`poc_evidence/`)",
      "Executive & Technical Penetration Testing Report (10–15 pages)",
    ],
    el: [
      "Έγγραφο Κανόνων Εμπλοκής & Εύρους (`rules_of_engagement.pdf`)",
      "Αποτελέσματα Εργαλείων & Καταγραφές (`nmap_scan.xml`, `zap_report.html`)",
      "Σενάρια PoC & Στιγμιότυπα Αποδείξεων (`poc_evidence/`)",
      "Επιτελική & Τεχνική Έκθεση Δοκιμών Διείσδυσης (10–15 σελίδες)",
    ],
  },
  verificationChecklist: {
    en: [
      "All scanning and probing complied strictly with the approved RoE time windows.",
      "Identified vulnerabilities have verified PoCs with zero false positives.",
      "CVSS v3.1 metrics correctly reflect Attack Vector, Complexity, and Impact.",
      "Remediation recommendations provide actionable code-level fixes.",
    ],
    el: [
      "Όλες οι σαρώσεις πραγματοποιήθηκαν αυστηρά εντός του εγκεκριμένου χρονικού παραθύρου RoE.",
      "Οι ευπάθειες συνοδεύονται από επαληθευμένα PoCs με μηδέν ψευδώς θετικά.",
      "Οι βαθμολογίες CVSS v3.1 αντικατοπτρίζουν ορθά το Attack Vector και την Επίπτωση.",
      "Οι συστάσεις αποκατάστασης παρέχουν άμεσα εφαρμόσιμες διορθώσεις σε επίπεδο κώδικα.",
    ],
  },
};

export const ch10Project: TechnicalProject = {
  id: "ch10-arch",
  category: {
    en: "Enterprise Architecture & Assessment Blueprint",
    el: "Αρχιτεκτονική Επιχείρησης & Στρατηγικό Πλάνο",
  },
  title: {
    en: "Automated Vulnerability Management & Continuous Pentesting Pipeline",
    el: "Αυτοματοποιημένη Διαχείριση Ευπαθειών & Αγωγός Συνεχούς Pentesting",
  },
  subtitle: {
    en: "DAST Automation Engine, Asset Attack Surface Management (ASM), and Vulnerability Tracking Dashboard",
    el: "Αυτοματοποίηση DAST, Διαχείριση Επιφάνειας Επίθεσης (ASM) και Πίνακας Παρακολούθησης Ευπαθειών",
  },
  scenario: {
    en: "An online e-commerce conglomerate operating across 50 web applications and cloud API gateways needs an automated continuous penetration testing and vulnerability management platform. You are tasked with engineering a Python/Docker platform that orchestrates scheduled DAST scans (ZAP/Nuclei), tracks remediation SLAs, correlates findings against CVE databases, and visualizes organizational risk posture in an executive web dashboard.",
    el: "Ένας όμιλος ηλεκτρονικού εμπορίου που λειτουργεί 50 web εφαρμογές και API gateways απαιτεί μια αυτοματοποιημένη πλατφόρμα συνεχών δοκιμών διείσδυσης και διαχείρισης ευπαθειών. Σας ανατίθεται να αναπτύξετε μια πλατφόρμα σε Python/Docker που ενορχηστρώνει προγραμματισμένες σαρώσεις DAST (ZAP/Nuclei), παρακολουθεί τα SLAs διόρθωσης, συσχετίζει ευρήματα με βάσεις CVE και οπτικοποιεί την ασφάλεια σε διαδικτυακό πίνακα ελέγχου.",
  },
  objectives: {
    en: [
      "Build a Python orchestrator executing scheduled OWASP ZAP and Nuclei vulnerability scans.",
      "Implement automated CVSS v3.1 and EPSS (Exploit Prediction Scoring System) prioritization.",
      "Integrate Jira / GitHub Issues API for automated ticket dispatching and remediation tracking.",
      "Design an Attack Surface Management (ASM) crawler tracking external web assets.",
    ],
    el: [
      "Ανάπτυξη ενορχηστρωτή Python για προγραμματισμένες σαρώσεις OWASP ZAP και Nuclei.",
      "Υλοποίηση ιεράρχησης ευπαθειών με βάση το CVSS v3.1 και το EPSS (Exploit Prediction Scoring).",
      "Ενσωμάτωση API Jira / GitHub Issues για αυτόματη ανάθεση tickets και παρακολούθηση διόρθωσης.",
      "Σχεδιασμός συστήματος ASM για αυτόματη καταγραφή εξωτερικών ψηφιακών περιουσιακών στοιχείων.",
    ],
  },
  scope: {
    en: [
      "Scanning engines: OWASP ZAP API, ProjectDiscovery Nuclei, Nmap, Sublist3r.",
      "Target types: Single Page Applications (React/Angular), REST APIs, GraphQL endpoints.",
    ],
    el: [
      "Μηχανές σάρωσης: OWASP ZAP API, ProjectDiscovery Nuclei, Nmap, Sublist3r.",
      "Τύποι στόχων: Εφαρμογές SPA (React/Vue), REST APIs, GraphQL endpoints.",
    ],
  },
  milestones: [
    {
      milestoneNumber: 1,
      title: {
        en: "External Attack Surface Discovery Engine",
        el: "Μηχανή Ανακάλυψης Εξωτερικής Επιφάνειας Επίθεσης",
      },
      description: {
        en: "Build `asm_discovery.py` discovering subdomains, public cloud IP allocations, and open web service ports.",
        el: "Ανάπτυξη του `asm_discovery.py` για αυτόματη ανακάλυψη subdomains, διευθύνσεων IP cloud και ανοιχτών θυρών.",
      },
      detailedSpec: {
        en: [
          "Design quantitative Human Risk Scoring index measuring vulnerability based on simulation clicks and training history.",
          "Segment enterprise workforce into distinct risk tiers (High-Risk Finance, Privileged Admins, General Staff).",
          "Establish baseline measurement of organization-wide Phish-Prone Percentage (PPP)."
],
        el: [
          "Σχεδιασμός ποσοτικού δείκτη ανθρώπινου κινδύνου βάσει συμπεριφοράς και εκπαίδευσης.",
          "Κατηγοριοποίηση προσωπικού σε βαθμίδες επικινδυνότητας (Οικονομικά, Διαχειριστές, Υπάλληλοι).",
          "Μέτρηση αρχικού ποσοστού ευαλωτότητας σε phishing (PPP) της επιχείρησης."
],
      },
      deliverable: {
        en: "ASM discovery module + asset inventory JSON schema.",
        el: "Υπομονάδα ανακάλυψης ASM + σχήμα καταγραφής περιουσιακών στοιχείων.",
      },
    },
    {
      milestoneNumber: 2,
      title: {
        en: "DAST Orchestrator & Scan Engine (ZAP / Nuclei)",
        el: "Ενορχηστρωτής DAST & Μηχανή Σάρωσης (ZAP / Nuclei)",
      },
      description: {
        en: "Develop `dast_orchestrator.py` dispatching asynchronous Docker containers running parameterized vulnerability scan templates.",
        el: "Ανάπτυξη του `dast_orchestrator.py` για ασύγχρονη εκτέλεση containers με προσαρμοσμένα πρότυπα σάρωσης ευπαθειών.",
      },
      detailedSpec: {
        en: [
          "Develop role-specific adaptive micro-learning modules (5-minute interactive simulations every month).",
          "Create targeted spear-phishing and Business Email Compromise (BEC) defense training for C-suite and Treasury.",
          "Implement positive reinforcement reward program recognizing employees who report simulated phish."
],
        el: [
          "Ανάπτυξη προσαρμοσμένων μηνιαίων ενοτήτων micro-learning διάρκειας 5 λεπτών.",
          "Εξειδικευμένη εκπαίδευση αντιμετώπισης BEC για τη διοίκηση και το λογιστήριο.",
          "Πρόγραμμα επιβράβευσης εργαζομένων που αναφέρουν ύποπτα μηνύματα."
],
      },
      deliverable: {
        en: "Scan orchestrator codebase + execution test suite.",
        el: "Κώδικας ενορχηστρωτή σάρωσης + σουίτα δοκιμών.",
      },
    },
    {
      milestoneNumber: 3,
      title: {
        en: "CVSS / EPSS Risk Prioritization & Deduplication",
        el: "Ιεράρχηση Κινδύνου CVSS / EPSS & Αποδιπλασιασμός Ευρημάτων",
      },
      description: {
        en: "Implement deduplication algorithms grouping identical findings across endpoints and calculating dynamic risk scores combining CVSS base metrics with EPSS exploit probabilities.",
        el: "Υλοποίηση αλγορίθμων αποδιπλασιασμού ευρημάτων και υπολογισμού δυναμικού κινδύνου συνδυάζοντας CVSS και πιθανότητα EPSS.",
      },
      detailedSpec: {
        en: [
          "Architect enterprise email security gateway enforcing DMARC policy `p=reject`, SPF validation, and DKIM signing.",
          "Deploy Brand Indicators for Message Identification (BIMI) and MTA-STS for secure email transport.",
          "Implement AI-powered natural language processing (NLP) mailbox filter detecting impersonation and zero-link BEC."
],
        el: [
          "Αρχιτεκτονική email gateway με αυστηρό DMARC (`p=reject`), SPF και DKIM.",
          "Ανάπτυξη BIMI και MTA-STS για ασφαλή μεταφορά ηλεκτρονικού ταχυδρομείου.",
          "Ενσωμάτωση φίλτρου AI/NLP στα γραμματοκιβώτια για εντοπισμό επιθέσεων πλαστοπροσωπίας BEC."
],
      },
      deliverable: {
        en: "Risk prioritization module + database schema.",
        el: "Υπομονάδα ιεράρχησης κινδύνου + σχήμα βάσης δεδομένων.",
      },
    },
    {
      milestoneNumber: 4,
      title: {
        en: "Vulnerability Management Dashboard & SLA Enforcement",
        el: "Πίνακας Διαχείρισης Ευπαθειών & Επιβολή SLAs Διόρθωσης",
      },
      description: {
        en: "Build a web dashboard visualizing open vulnerabilities, mean time to remediate (MTTR), SLA breaches, and executive compliance reports.",
        el: "Κατασκευή διαδικτυακού πίνακα ελέγχου με ανοιχτές ευπάθειες, μέσο χρόνο αποκατάστασης (MTTR) και ειδοποιήσεις υπέρβασης SLA.",
      },
      detailedSpec: {
        en: [
          "Design one-click Phish Alarm email client add-in with automated SOC triage integration.",
          "Establish rapid credential revocation and mailbox search-and-purge playbook for active phishing attacks.",
          "Draft comprehensive Social Engineering Defense & Human Cyber Risk Program Charter."
],
        el: [
          "Σχεδιασμός κουμπιού αναφοράς Phish Alarm στο Outlook με αυτόματη σύνδεση στο SOC.",
          "Ορισμός διαδικασίας άμεσης ανάκλησης κωδικών και μαζικής διαγραφής κακόβουλων emails.",
          "Σύνταξη επίσημου Καταστατικού Προγράμματος Αντιμετώπισης Κοινωνικής Μηχανικής."
],
      },
      deliverable: {
        en: "Web Dashboard application + Executive Assurance Report (10–12 pages).",
        el: "Διαδικτυακή εφαρμογή Dashboard + Επιτελική Έκθεση Διασφάλισης (10–12 σελίδες).",
      },
    },
  ],
  deliverables: {
    en: [
      "Complete Vulnerability Platform Python Codebase (`/vuln_platform/`)",
      "Automated DAST Container Orchestration Pipeline (`docker-compose.yml`)",
      "Executive Vulnerability Management Web Dashboard UI",
      "Technical Architecture & Operations Guide (10–12 pages)",
    ],
    el: [
      "Πλήρης Πηγαίος Κώδικας Πλατφόρμας σε Python (`/vuln_platform/`)",
      "Αρχείο Ενορχήστρωσης DAST Containers (`docker-compose.yml`)",
      "Διεπαφή Διαδικτυακού Πίνακα Ελέγχου Διαχείρισης Ευπαθειών",
      "Οδηγός Τεχνικής Αρχιτεκτονικής & Λειτουργίας (10–12 σελίδες)",
    ],
  },
  rubric: [
    {
      criterion: {
        en: "Scan Orchestration Architecture & Reliability",
        el: "Αρχιτεκτονική Ενορχήστρωσης Σαρώσεων & Αξιοπιστία",
      },
      weight: "30%",
      description: {
        en: "Robustness of asynchronous container scheduling, error handling, rate-limiting, and scan completion tracking.",
        el: "Ανθεκτικότητα ασύγχρονου προγραμματισμού containers, διαχείριση σφαλμάτων και παρακολούθηση ολοκλήρωσης σαρώσεων.",
      },
    },
    {
      criterion: {
        en: "Risk Prioritization & EPSS / CVSS Scoring Depth",
        el: "Ιεράρχηση Κινδύνου & Βάθος Βαθμολόγησης EPSS / CVSS",
      },
      weight: "25%",
      description: {
        en: "Algorithmic accuracy of deduplication and intelligence-driven prioritization combining exploitability with asset criticality.",
        el: "Αλγοριθμική ακρίβεια αποδιπλασιασμού και ιεράρχηση βάσει πιθανότητας εκμετάλλευσης και κρισιμότητας περιουσιακού στοιχείου.",
      },
    },
    {
      criterion: {
        en: "Dashboard Usability & Remediation Workflow",
        el: "Ευχρηστία Πίνακα Ελέγχου & Ροή Αποκατάστασης",
      },
      weight: "25%",
      description: {
        en: "Clarity of visualizations, tracking of remediation SLAs (Critical <= 7 days), and ticketing integration.",
        el: "Σαφήνεια οπτικοποιήσεων, παρακολούθηση SLAs διόρθωσης (Critical <= 7 ημέρες) και σύνδεση με σύστημα ticketing.",
      },
    },
    {
      criterion: {
        en: "Technical Documentation & Operational Rigor",
        el: "Τεχνική Τεκμηρίωση & Επιχειρησιακή Αυστηρότητα",
      },
      weight: "20%",
      description: {
        en: "Quality of deployment manuals, code documentation, and executive risk metrics presentation.",
        el: "Ποιότητα οδηγών ανάπτυξης, τεκμηρίωση κώδικα και επαγγελματική παρουσίαση μετρικών κινδύνου.",
      },
    },
  ],
};

export const ch10Quiz: QuizQuestion[] = [
  {
    id: 1,
    question: {
      en: "In email authentication standards, what is the role of DMARC (Domain-based Message Authentication, Reporting, and Conformance)?",
      el: "Στα πρότυπα αυθεντικοποίησης ηλεκτρονικού ταχυδρομείου, ποιος είναι ο ρόλος του DMARC;",
    },
    options: {
      en: [
        "It defines domain policies for handling emails that fail SPF/DKIM checks and generates aggregate compliance reports.",
        "It compresses incoming email attachments using proprietary lossless archive algorithms during delivery, during standard continuous monitoring and administrative audits.",
        "It translates email body text into multiple foreign languages using neural machine learning translation, to ensure high-availability operational compliance across systems.",
        "It permanently deletes all spam messages from user inboxes without notifying system administrators, using standardized organizational security policy configurations.",
        "It replaces standard SMTP transmission protocols with unencrypted UDP datagram network broadcasts, across distributed multi-region cloud production environments.",
      ],
      el: [
        "Ορίζει πολιτικές διαχείρισης μηνυμάτων που αποτυγχάνουν σε SPF/DKIM και παράγει αναφορές συμμόρφωσης.",
        "Συμπιέζει τα επισυναπτόμενα αρχεία χρησιμοποιώντας ιδιόκτητους αλγορίθμους κατά την παράδοση, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Μεταφράζει το κείμενο του μηνύματος σε ξένες γλώσσες χρησιμοποιώντας νευρωνικά δίκτυα μηχανικής μάθησης, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Διαγράφει οριστικά όλα τα ανεπιθύμητα μηνύματα από τα εισερχόμενα χωρίς ειδοποίηση των διαχειριστών, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Αντικαθιστά το πρωτόκολλο SMTP με μη κρυπτογραφημένες εκπομπές datagrams UDP στο δίκτυο, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "DMARC leverages SPF and DKIM to verify domain alignment. It tells receiving mail servers how to treat failing emails (none, quarantine, reject) and generates reporting telemetry.",
      el: "Το DMARC συνδυάζει SPF και DKIM επιβάλλοντας πολιτικές (none, quarantine, reject) για αποτυχημένα μηνύματα και παράγει αναφορές για απόπειρες πλαστοπροσωπίας του domain.",
    },
  },
  {
    id: 2,
    question: {
      en: "What social engineering technique relies on creating a fabricated scenario to manipulate a victim into disclosing sensitive information?",
      el: "Ποια τεχνική κοινωνικής μηχανικής βασίζεται στη δημιουργία ενός κατασκευασμένου σεναρίου για τη χειραγώγηση του θύματος;",
    },
    options: {
      en: [
        "Baiting, leaving malware-infected USB flash drives in public office parking lots, during standard continuous monitoring and administrative audits.",
        "Pretexting, inventing a plausible persona and story to deceive the target into compliance.",
        "Tailgating, physically following an authorized employee through a secure security turnstile door.",
        "Quid Pro Quo, offering an explicit service (like fake IT support) in direct exchange for credentials.",
        "Watering Hole, compromising a legitimate third-party website frequently visited by target staff.",
      ],
      el: [
        "Baiting, αφήνοντας μολυσμένες μονάδες USB σε δημόσιους χώρους στάθμευσης της εταιρείας, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Pretexting, επινοώντας ένα αληθοφανές σενάριο και ρόλο για να παραπλανηθεί το θύμα.",
        "Tailgating, ακολουθώντας φυσικά έναν εξουσιοδοτημένο υπάλληλο μέσα από μια ασφαλή πόρτα.",
        "Quid Pro Quo, προσφέροντας μια υποτιθέμενη υπηρεσία (όπως τεχνική υποστήριξη) με αντάλλαγμα κωδικούς.",
        "Watering Hole, μολύνοντας έναν νόμιμο ιστότοπο που επισκέπτονται συχνά οι εργαζόμενοι-στόχοι.",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Pretexting involves crafting a believable false context (e.g. impersonating an auditor or executive) to establish trust and trick the victim into sharing protected information.",
      el: "Το Pretexting περιλαμβάνει τη δημιουργία ενός αληθοφανούς ψευδούς σεναρίου (π.χ. υπόδυση ελεγκτή ή ανώτερου στελέχους) για την εξαπάτηση του θύματος και την απόσπαση ευαίσθητων δεδομένων.",
    },
  },
  {
    id: 3,
    question: {
      en: "What attack vector characterizes Business Email Compromise (BEC)?",
      el: "Ποιο διάνυσμα επίθεσης χαρακτηρίζει το Business Email Compromise (BEC);",
    },
    options: {
      en: [
        "Flooding corporate email servers with volumetric distributed denial-of-service traffic to crash mail queues, using standardized organizational security policy configurations.",
        "Deploying ransomware binaries via infected physical universal serial bus storage devices left in offices, across distributed multi-region cloud production environments.",
        "Impersonating company executives or suppliers via compromised or spoofed email to authorize fraudulent wire transfers.",
        "Intercepting fiber-optic network communications using unauthorized optical splitter hardware taps, without requiring manual intervention from systems engineering staff.",
        "Exploiting memory buffer overflow flaws in client operating system kernel network device drivers, to mitigate potential unauthorized system configuration drift.",
      ],
      el: [
        "Κατακλυσμός διακομιστών ηλεκτρονικού ταχυδρομείου με ογκομετρική κίνηση DDoS για διακοπή υπηρεσιών, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Διάθεση κακόβουλου λογισμικού ransomware μέσω μολυσμένων συσκευών USB που αφήνονται σε γραφεία, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Υπόδυση στελεχών ή προμηθευτών μέσω πλαστών ή παραβιασμένων emails για εκτέλεση δόλιων τραπεζικών εμβασμάτων.",
        "Υποκλοπή επικοινωνιών οπτικών ινών χρησιμοποιώντας μη εξουσιοδοτημένους οπτικούς διαχωριστές, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Εκμετάλλευση κενών υπερχείλισης μνήμης buffer σε οδηγούς καρτών δικτύου του λειτουργικού συστήματος, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "Business Email Compromise (BEC) targets organizations by impersonating leadership (CEO fraud) or trusted vendors to trick finance staff into transferring funds to attacker-controlled bank accounts.",
      el: "Το BEC στοχεύει επιχειρήσεις υποδυόμενο στελέχη διοίκησης (CEO fraud) ή προμηθευτές για να εξαπατήσει το λογιστήριο ώστε να εκτελέσει πληρωμές σε τραπεζικούς λογαριασμούς του επιτιθέμενου.",
    },
  },
  {
    id: 4,
    question: {
      en: "What is 'MFA Fatigue' (Prompt Bombing) and how do attackers exploit it?",
      el: "Τι είναι το 'MFA Fatigue' (Prompt Bombing) και πώς το εκμεταλλεύονται οι επιτιθέμενοι;",
    },
    options: {
      en: [
        "Cracking password hashes offline using high-performance graphics processing unit cluster arrays, across distributed multi-region cloud production environments.",
        "Intercepting SMS text messages by exploiting vulnerabilities in the SS7 telecommunications signaling protocol, without requiring manual intervention from systems engineering staff.",
        "Compromising identity provider private keys to forge valid SAML 2.0 XML assertion signatures, to mitigate potential unauthorized system configuration drift.",
        "Flooding a user with repetitive push authentication requests until they inadvertently approve access out of frustration.",
        "Deploying physical hardware keyloggers on client desktop computers inside secure office facilities, in accordance with modern zero trust architectural principles.",
      ],
      el: [
        "Αποκρυπτογράφηση κωδικών πρόσβασης εκτός σύνδεσης μέσω συστοιχιών καρτών γραφικών υψηλής ισχύος, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Υποκλοπή γραπτών μηνυμάτων SMS εκμεταλλευόμενοι αδυναμίες στο πρωτόκολλο σηματοδοσίας SS7, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Υποκλοπή ιδιωτικών κλειδιών παρόχου ταυτότητας για πλαστογράφηση ψηφιακών βεβαιώσεων SAML 2.0, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Αποστολή συνεχών ειδοποιήσεων έγκρισης MFA μέχρι ο χρήστης να πατήσει κατά λάθος 'Έγκριση' λόγω κόπωσης.",
        "Εγκατάσταση καταγραφέων πληκτρολογίου (keyloggers) σε υπολογιστές μέσα στις εγκαταστάσεις, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
      ],
    },
    correctIndex: 3,
    explanation: {
      en: "MFA Fatigue occurs when an attacker with valid credentials sends endless MFA push notifications, hoping the victim approves one to silence the alerts. Defenses include Number Matching in MFA apps.",
      el: "Στο MFA Fatigue ο επιτιθέμενος στέλνει αλλεπάλληλες ειδοποιήσεις push στο κινητό του χρήστη ώστε να αποδεχτεί μία από κούραση. Αντιμετωπίζεται με αντιστοίχιση αριθμών (Number Matching).",
    },
  },
  {
    id: 5,
    question: {
      en: "Which behavioral indicator is commonly associated with malicious insider threat activity in organizations?",
      el: "Ποιος δείκτης συμπεριφοράς συνδέεται συνήθως με δραστηριότητα κακόβουλης εσωτερικής απειλής (Insider Threat);",
    },
    options: {
      en: [
        "Updating local workstation operating system security patches during scheduled corporate maintenance windows, without requiring manual intervention from systems engineering staff.",
        "Configuring multi-factor authentication hardware security keys on personal corporate laptop computers, to mitigate potential unauthorized system configuration drift.",
        "Attending voluntary corporate cybersecurity awareness training and phishing simulation workshops, in accordance with modern zero trust architectural principles.",
        "Submitting formal change management tickets for scheduled database index rebalancing operations, before committing changes to central production repository nodes.",
        "Accessing sensitive datasets outside working hours and attempting to transfer large volumes to external cloud storage.",
      ],
      el: [
        "Εγκατάσταση ενημερώσεων ασφάλειας του λειτουργικού συστήματος κατά τις προγραμματισμένες ώρες συντήρησης, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Χρήση φυσικών κλειδιών ασφαλείας MFA για την προστασία του εταιρικού φορητού υπολογιστή, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Συμμετοχή σε προαιρετικά σεμινάρια εκπαίδευσης ασφάλειας και προσομοιώσεις επιθέσεων phishing, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Υποβολή αιτημάτων διαχείρισης αλλαγών για προγραμματισμένη συντήρηση ευρετηρίων βάσεων δεδομένων, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Πρόσβαση σε ευαίσθητα δεδομένα εκτός ωραρίου και προσπάθεια εξαγωγής μεγάλου όγκου σε εξωτερικό cloud.",
      ],
    },
    correctIndex: 4,
    explanation: {
      en: "Insider threat indicators include anomalous data access patterns, unusual after-hours logins, attempting to access unauthorized systems, and massive file downloads or transfers to external media.",
      el: "Οι ενδείξεις εσωτερικής απειλής περιλαμβάνουν ασυνήθιστη πρόσβαση σε αρχεία εκτός ωραρίου, μαζική λήψη ευαίσθητων δεδομένων και προσπάθειες εξαγωγής σε εξωτερικά μέσα ή cloud storage.",
    },
  },
  {
    id: 6,
    question: {
      en: "What is the primary objective of running simulated phishing training campaigns within an enterprise?",
      el: "Ποιος είναι ο κύριος στόχος της εκτέλεσης προσομοιώσεων επιθέσεων phishing σε έναν οργανισμό;",
    },
    options: {
      en: [
        "To identify training gaps and educate staff on recognizing social engineering cues in a safe environment.",
        "To publicly shame employees who fail simulations by publishing their names on internal bulletin boards, to mitigate potential unauthorized system configuration drift.",
        "To justify immediate termination of employee contracts without conducting formal HR review processes, in accordance with modern zero trust architectural principles.",
        "To permanently disable external email communication for all corporate department staff members, before committing changes to central production repository nodes.",
        "To replace automated email filtering gateways with manual human message inspection procedures, under standard operating procedures defined in corporate ISMS policies.",
      ],
      el: [
        "Να εντοπιστούν κενά εκπαίδευσης και να εκπαιδευτούν οι υπάλληλοι στην αναγνώριση επιθέσεων με ασφάλεια.",
        "Να διαπομπευθούν οι υπάλληλοι που αποτυγχάνουν αναρτώντας τα ονόματά τους σε εσωτερικούς πίνακες, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Να δικαιολογηθεί η άμεση απόλυση εργαζομένων χωρίς επίσημη διαδικασία αξιολόγησης από το HR, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Να διακοπεί οριστικά η εξωτερική επικοινωνία email για όλα τα τμήματα της επιχείρησης, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Να αντικατασταθούν τα αυτόματα φίλτρα email με χειροκίνητο έλεγχο όλων των εισερχομένων μηνυμάτων, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Phishing simulations measure organizational risk, reinforce positive security behaviors, provide immediate learning opportunities for vulnerable staff, and cultivate a culture of reporting.",
      el: "Οι προσομοιώσεις phishing μετρούν την ευπάθεια του οργανισμού, εκπαιδεύουν το προσωπικό σε ασφαλείς συμπεριφορές και ενισχύουν την κουλτούρα άμεσης αναφοράς ύποπτων μηνυμάτων.",
    },
  },
  {
    id: 7,
    question: {
      en: "How do adversaries utilize AI-generated deepfake audio and video in modern social engineering attacks?",
      el: "Πώς χρησιμοποιούν οι επιτιθέμενοι deepfake ήχο και βίντεο τεχνητής νοημοσύνης σε σύγχρονες επιθέσεις κοινωνικής μηχανικής;",
    },
    options: {
      en: [
        "By cracking symmetric AES-256 database encryption keys using hardware-accelerated quantum neural networks, in accordance with modern zero trust architectural principles.",
        "By cloning executive voices or appearances in real time to authorize fraudulent financial transfers or credential disclosure.",
        "By corrupting operating system kernel scheduler memory tables to bypass local user password validation, before committing changes to central production repository nodes.",
        "By injecting malformed SQL commands into client browser cookie headers during transport layer handshakes, under standard operating procedures defined in corporate ISMS policies.",
        "By establishing unauthorized peer-to-peer tunnels across transatlantic subsea telecommunications lines, across all internal enterprise network segments and endpoints.",
      ],
      el: [
        "Σπάζοντας συμμετρικά κλειδιά κρυπτογράφησης AES-256 με επιταχυνόμενα κβαντικά νευρωνικά δίκτυα, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Κλωνοποιώντας φωνές στελεχών σε πραγματικό χρόνο για έγκριση παράνομων εμβασμάτων ή απόσπαση κωδικών.",
        "Αλλοιώνοντας πίνακες μνήμης του χρονοπρογραμματιστή του πυρήνα για παράκαμψη κωδικών πρόσβασης, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Εισάγοντας κακόβουλο κώδικα SQL σε κεφαλίδες cookies του περιηγητή κατά τη χειραψία επιπέδου μεταφοράς, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Δημιουργώντας μη εξουσιοδοτημένα peer-to-peer τούνελ σε υποθαλάσσια καλώδια διεθνών επικοινωνιών, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Deepfakes enable realistic voice and video impersonation of executives (vishing/video calls), bypassing traditional social engineering defenses. Defenses include secondary out-of-band verification.",
      el: "Τα deepfakes επιτρέπουν την αληθοφανή κλωνοποίηση φωνής και εικόνας στελεχών σε τηλεφωνικές ή βιντεοκλήσεις για απάτες. Αντιμετωπίζονται με δευτερεύουσα επαλήθευση μέσω άλλου καναλιού (out-of-band).",
    },
  },
  {
    id: 8,
    question: {
      en: "What does a 'Clean Desk and Clean Screen' corporate policy specifically require from employees?",
      el: "Τι απαιτεί συγκεκριμένα από τους εργαζόμενους μια εταιρική πολιτική 'Καθαρού Γραφείου και Καθαρής Οθόνης' (Clean Desk/Screen);",
    },
    options: {
      en: [
        "Sanitizing office furniture daily using certified industrial antibacterial cleaning solution agents, before committing changes to central production repository nodes.",
        "Replacing all desktop computer hardware displays with low-power monochrome liquid crystal panels, under standard operating procedures defined in corporate ISMS policies.",
        "Locking unattended computer screens and securing sensitive physical documents, tokens, and media away from view.",
        "Permanently disabling all graphical user interface desktop environments on employee workstation nodes, across all internal enterprise network segments and endpoints.",
        "Deleting all local temporary internet browser cache files at the conclusion of every working shift, during standard continuous monitoring and administrative audits.",
      ],
      el: [
        "Καθημερινή απολύμανση των επίπλων του γραφείου με πιστοποιημένα αντιβακτηριδιακά καθαριστικά, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Αντικατάσταση όλων των οθονών υπολογιστών με μονόχρωμα πάνελ υγρών κρυστάλλων χαμηλής ισχύος, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Κλείδωμα οθονών όταν απομακρύνονται και ασφαλή φύλαξη ευαίσθητων εγγράφων και ψηφιακών μέσων.",
        "Μόνιμη απενεργοποίηση γραφικών περιβαλλόντων διεπαφής (GUI) στους σταθμούς εργασίας των υπαλλήλων, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Διαγραφή όλων των τοπικών προσωρινών αρχείων του περιηγητή στο τέλος κάθε βάρδιας εργασίας, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "Clean desk and clean screen policies prevent unauthorized shoulder surfing and visual eavesdropping by requiring screens to be locked (Win+L) and physical papers/tokens locked in drawers.",
      el: "Η πολιτική καθαρού γραφείου και οθόνης αποτρέπει την οπτική υποκλοπή ευαίσθητων πληροφοριών, επιβάλλοντας το κλείδωμα των υπολογιστών και την ασφαλή φύλαξη εγγράφων σε συρτάρια.",
    },
  },
  {
    id: 9,
    question: {
      en: "What is the primary difference between 'Spear Phishing' and 'Whaling' in targeted social engineering?",
      el: "Ποια είναι η βασική διαφορά μεταξύ 'Spear Phishing' και 'Whaling' στην στοχευμένη κοινωνική μηχανική;",
    },
    options: {
      en: [
        "Spear phishing uses text SMS messaging, whereas whaling operates exclusively over analog voice telephony lines, under standard operating procedures defined in corporate ISMS policies.",
        "Spear phishing is conducted only by nation-states, whereas whaling is conducted only by automated botnets, across all internal enterprise network segments and endpoints.",
        "Spear phishing targets mobile phones, whereas whaling targets physical data center hardware servers, during standard continuous monitoring and administrative audits.",
        "Spear phishing targets specific individuals, whereas whaling specifically targets high-profile C-suite executives and board members.",
        "Spear phishing involves physical site break-ins, whereas whaling involves software memory corruption, to ensure high-availability operational compliance across systems.",
      ],
      el: [
        "Το spear phishing χρησιμοποιεί μηνύματα SMS, ενώ το whaling λειτουργεί αποκλειστικά μέσω αναλογικού τηλεφώνου, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Το spear phishing εκτελείται μόνο από κράτη, ενώ το whaling εκτελείται μόνο από αυτοματοποιημένα botnets, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Το spear phishing στοχεύει κινητά τηλέφωνα, ενώ το whaling στοχεύει φυσικούς εξυπηρετητές κέντρων δεδομένων, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Το spear phishing στοχεύει συγκεκριμένα άτομα, ενώ το whaling στοχεύει αποκλειστικά ανώτατα στελέχη (C-suite).",
        "Το spear phishing περιλαμβάνει φυσικές διαρρήξεις, ενώ το whaling περιλαμβάνει αλλοίωση μνήμης λογισμικού, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
      ],
    },
    correctIndex: 3,
    explanation: {
      en: "Spear phishing is customized for specific individuals or roles. Whaling is a specialized high-impact subcategory of spear phishing aimed specifically at high-profile executives (CEO, CFO, board members).",
      el: "Το spear phishing είναι εξατομικευμένο για συγκεκριμένα πρόσωπα. Το whaling είναι ειδική μορφή του που στοχεύει αποκλειστικά ανώτατα διευθυντικά στελέχη (CEO, CFO) με σκοπό μεγάλα οικονομικά κέρδη.",
    },
  },
  {
    id: 10,
    question: {
      en: "Why is a 'Blameless Incident Reporting Culture' essential for robust enterprise cybersecurity defense?",
      el: "Γιατί είναι απαραίτητη μια 'Κουλτούρα Αναφοράς Χωρίς Ενοχοποίηση' (Blameless Culture) για την αποτελεσματική κυβερνοάμυνα;",
    },
    options: {
      en: [
        "It eliminates the legal liability of the organization during mandatory regulatory data breach notifications, across all internal enterprise network segments and endpoints.",
        "It replaces the need for automated endpoint detection and response software on corporate workstations, during standard continuous monitoring and administrative audits.",
        "It allows system administrators to bypass change management approvals during production maintenance, to ensure high-availability operational compliance across systems.",
        "It automatically resolves transport layer network congestion spikes across distributed regional links, using standardized organizational security policy configurations.",
        "It encourages employees to report mistakes or suspicious events immediately without fear of punitive retaliation, reducing dwell time.",
      ],
      el: [
        "Εξαλείφει τη νομική ευθύνη του οργανισμού κατά τις υποχρεωτικές κοινοποιήσεις παραβιάσεων στις αρχές, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Καταργεί την ανάγκη χρήσης λογισμικού ανίχνευσης και απόκρισης τερματικών (EDR) στους υπολογιστές, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Επιτρέπει στους διαχειριστές να παρακάμπτουν τις εγκρίσεις αλλαγών κατά τη συντήρηση συστημάτων, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Επιλύει αυτόματα προβλήματα συμφόρησης δικτύου επιπέδου μεταφοράς σε κατανεμημένες συνδέσεις, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Ενθαρρύνει την άμεση αναφορά λαθών ή ύποπτων συμβάντων χωρίς φόβο τιμωρίας, μειώνοντας τον χρόνο παραμονής του εισβολέα.",
      ],
    },
    correctIndex: 4,
    explanation: {
      en: "When employees fear punishment, they conceal clicks on phishing links or accidental leaks. A blameless reporting culture ensures incidents are surfaced and contained within minutes rather than months.",
      el: "Όταν οι υπάλληλοι φοβούνται τιμωρία, αποκρύπτουν λάθη. Μια κουλτούρα χωρίς ενοχοποίηση διασφαλίζει ότι τα περιστατικά αναφέρονται αμέσως, επιτρέποντας την έγκαιρη αντιμετώπισή τους.",
    },
  },
];

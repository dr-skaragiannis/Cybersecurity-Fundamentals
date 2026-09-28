import type { CliLab, HandsOnLab, TechnicalProject, QuizQuestion } from "../types";

export const ch04CliLab: CliLab = {
  id: "ch04-cli",
  title: {
    en: "Static Malware Triaging & YARA Signature Sandbox",
    el: "Προσομοιωτής Στατικής Ανάλυσης Malware & Υπογραφών YARA",
  },
  scenario: {
    en: "Safely triage a suspicious executable payload in an isolated sandbox, calculate cryptographic hashes, extract embedded strings, evaluate PE entropy, and match against custom YARA rules.",
    el: "Αναλύστε με ασφάλεια ένα ύποπτο εκτελέσιμο σε απομονωμένο sandbox, υπολογίστε hashes, εξάγετε αλφαριθμητικά strings, αξιολογήστε την εντροπία PE και εκτελέστε κανόνες YARA.",
  },
  initialPrompt: "analyst@malware-lab:~$",
  banner: {
    en: "=== Chapter 4 Malware Triage Sandbox ===\nTarget: Suspicious Payload `suspicious_sample.bin` | Environment: Air-Gapped Analysis VM\nType 'help' for command assistance or follow the missions below.",
    el: "=== Εργαστήριο Ανάλυσης Malware Κεφαλαίου 4 ===\nΣτόχος: Ύποπτο Δείγμα `suspicious_sample.bin` | Περιβάλλον: Απομονωμένο VM\nΠληκτρολογήστε 'help' για βοήθεια ή ακολουθήστε τις παρακάτω αποστολές.",
  },
  fileSystem: {
    "suspicious_sample.bin": "\x4d\x5a\x90\x00 (PE32+ executable containing ransomware strings & packed payload)",
    "rules/ransomware.yar": 'rule rule_apt_ransomware_payload {\n  strings:\n    $str_c2_mutex = "Global\\\\CryptLocker_Mutex_99"\n    $enc_extension = ".locked_v4"\n  condition:\n    any of them\n}',
    "sample_manifest.json": '{"filename":"suspicious_sample.bin","filesize_kb":1420,"submission_source":"SOC_Quarantine"}',
  },
  tasks: [
    {
      id: "task-1",
      title: {
        en: "Calculate Cryptographic Hash for Malware Triage",
        el: "Υπολογισμός Κρυπτογραφικού Hash για Ανάλυση Malware",
      },
      description: {
        en: "Calculate the SHA-256 hash of `suspicious_sample.bin` to check against threat databases.",
        el: "Υπολογίστε το SHA-256 hash του `suspicious_sample.bin` για έλεγχο σε βάσεις δεδομένων απειλών.",
      },
      hint: {
        en: "Execute: sha256sum suspicious_sample.bin",
        el: "Εκτελέστε: sha256sum suspicious_sample.bin",
      },
      solution: "sha256sum suspicious_sample.bin",
      validateRegex: "sha256sum\\s+suspicious_sample\\.bin",
      successMessage: {
        en: "Hash generated: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855.",
        el: "Το hash δημιουργήθηκε: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855.",
      },
    },
    {
      id: "task-2",
      title: {
        en: "Extract Embedded Strings and C2 Indicators",
        el: "Εξαγωγή Ενσωματωμένων Strings και Δεικτών C2",
      },
      description: {
        en: "Extract readable ASCII and Unicode strings from the binary to identify embedded URLs and commands.",
        el: "Εξάγετε αναγνώσιμα strings από το εκτελέσιμο για εντοπισμό διευθύνσεων URL και εντολών.",
      },
      hint: {
        en: "Execute: strings suspicious_sample.bin",
        el: "Εκτελέστε: strings suspicious_sample.bin",
      },
      solution: "strings suspicious_sample.bin",
      validateRegex: "strings\\s+suspicious_sample\\.bin",
      successMessage: {
        en: "Strings extracted! Identified C2 beacon URL `http://c2-beacon.darkops-gateway.org` and shadow copy deletion commands.",
        el: "Τα strings εξήχθησαν! Εντοπίστηκε το C2 beacon URL και εντολές διαγραφής shadow copies.",
      },
    },
    {
      id: "task-3",
      title: {
        en: "Analyze PE Header & Section Entropy",
        el: "Ανάλυση Επικεφαλίδας PE & Εντροπίας Τμημάτων",
      },
      description: {
        en: "Examine Portable Executable (PE) headers and section entropy to detect packers using `pecheck`.",
        el: "Εξετάστε τις επικεφαλίδες PE και την εντροπία τμημάτων για εντοπισμό packers με το `pecheck`.",
      },
      hint: {
        en: "Execute: pecheck suspicious_sample.bin",
        el: "Εκτελέστε: pecheck suspicious_sample.bin",
      },
      solution: "pecheck suspicious_sample.bin",
      validateRegex: "pecheck\\s+suspicious_sample\\.bin",
      successMessage: {
        en: "PE analyzed: High entropy (7.84) detected in section `.upx1`, confirming packed executable payload.",
        el: "Η επικεφαλίδα PE αναλύθηκε: Υψηλή εντροπία (7.84) στο τμήμα `.upx1` επιβεβαιώνει πακεταρισμένο κώδικα (UPX).",
      },
    },
    {
      id: "task-4",
      title: {
        en: "Execute Custom YARA Detection Rule",
        el: "Εκτέλεση Προσαρμοσμένου Κανόνα YARA",
      },
      description: {
        en: "Scan the sample against the custom YARA rule `rules/ransomware.yar` using `yara`.",
        el: "Σαρώστε το δείγμα έναντι του κανόνα YARA `rules/ransomware.yar` χρησιμοποιώντας το `yara`.",
      },
      hint: {
        en: "Execute: yara rules/ransomware.yar suspicious_sample.bin",
        el: "Εκτελέστε: yara rules/ransomware.yar suspicious_sample.bin",
      },
      solution: "yara rules/ransomware.yar suspicious_sample.bin",
      validateRegex: "yara\\s+.*ransomware\\.yar\\s+suspicious_sample\\.bin",
      successMessage: {
        en: "YARA MATCH: Rule `rule_apt_ransomware_payload` triggered on mutex and extension indicators!",
        el: "ΕΠΙΤΥΧΗΣ ΑΝΙΧΝΕΥΣΗ YARA: Ο κανόνας εντόπισε το mutex και τους δείκτες ransomware!",
      },
    },
  ],
};

export const ch04HandsOnLab: HandsOnLab = {
  title: {
    en: "Safe Malware Triaging, Dynamic Behavioral Analysis in Sandbox & IOC Extraction",
    el: "Ασφαλής Διαλογή Malware, Δυναμική Συμπεριφορική Ανάλυση σε Sandbox & Εξαγωγή IOCs",
  },
  subtitle: {
    en: "2-Hour Practical Lab: Static Dissection, Process Injection Detection, Network C2 Interception, and YARA Rule Engineering",
    el: "Εργαστήριο 2 Ωρών: Στατική Αποδόμηση, Ανίχνευση Process Injection, Υποκλοπή C2 και Σύνταξη Κανόνων YARA",
  },
  duration: {
    en: "~2 Hours (120 minutes)",
    el: "~2 Ώρες (120 λεπτά)",
  },
  overview: {
    en: "In this 2-hour technical laboratory, students enter a sterile, isolated malware analysis sandbox. You will safely dissect an unknown binary payload, identify obfuscation and packing techniques (UPX/crypters), analyze imported Windows API functions (Process Hollowing, VirtualAllocEx), monitor real-time behavioral mutations (registry persistence, dropped files), intercept network Command & Control (C2) beaconing, and author an enterprise YARA detection signature.",
    el: "Σε αυτό το τεχνικό εργαστήριο 2 ωρών, οι φοιτητές εισέρχονται σε ένα απομονωμένο περιβάλλον ανάλυσης κακόβουλου λογισμικού (malware sandbox). Θα αναλύσετε με ασφάλεια ένα άγνωστο δυαδικό αρχείο, θα εντοπίσετε τεχνικές συσκότισης και πακεταρίσματος (UPX/crypters), θα αναλύσετε κλήσεις Windows API (Process Hollowing), θα παρακολουθήσετε αλλαγές στο μητρώο, θα καταγράψετε κίνηση C2 και θα συντάξετε έναν κανόνα ανίχνευσης YARA.",
  },
  environment: [
    "REMnux Linux VM (Static analysis suite: Ghidra, Cutter, YARA, pecheck, strings, capa)",
    "Windows Flare-VM (Dynamic analysis suite: Process Hacker, ProcMon, Wireshark, RegShot, x64dbg)",
    "Isolated internal host-only virtual switch (INetSim / FakeNet-NG active)",
    "Pre-packaged live sample repository (`/malware_samples/sample_lockbit_variant.bin`)",
  ],
  phases: [
    {
      phaseNumber: 1,
      title: {
        en: "Static Properties, Hashes & Obfuscation Detection",
        el: "Στατικές Ιδιότητες, Hashes & Ανίχνευση Συσκότισης",
      },
      estimatedTime: { en: "25 min", el: "25 λεπτά" },
      objectives: {
        en: [
          "Generate MD5, SHA-1, SHA-256, and SSDEEP fuzzy hashes.",
          "Inspect Portable Executable (PE) headers, compile timestamps, and digital certificate anomalies.",
          "Calculate section Shannon entropy to confirm packing.",
        ],
        el: [
          "Παραγωγή hashes MD5, SHA-1, SHA-256 και ασαφούς κατακερματισμού SSDEEP.",
          "Έλεγχος επικεφαλίδων PE, χρονικών σημάτων μεταγλώττισης και ψηφιακών πιστοποιητικών.",
          "Υπολογισμός εντροπίας Shannon ανά τμήμα για επιβεβαίωση πακεταρίσματος.",
        ],
      },
      steps: {
        en: [
          "1. Generate cryptographic hashes on the target binary:\n```bash\nsha256sum sample_lockbit_variant.bin\nssdeep sample_lockbit_variant.bin > sample.ssdeep\n```",
          "2. Analyze PE header with `pecheck`:\n```bash\npecheck sample_lockbit_variant.bin\n```",
          "3. Detect suspicious high-entropy sections (`.upx0`, `.upx1` > 7.2 entropy).",
          "4. Unpack binary using automated unpacker:\n```bash\nupx -d sample_lockbit_variant.bin -o sample_unpacked.bin\n```",
        ],
        el: [
          "1. Παραγωγή κρυπτογραφικών αποτυπωμάτων στο ύποπτο εκτελέσιμο:\n```bash\nsha256sum sample_lockbit_variant.bin\nssdeep sample_lockbit_variant.bin > sample.ssdeep\n```",
          "2. Ανάλυση της επικεφαλίδας PE με το `pecheck`:\n```bash\npecheck sample_lockbit_variant.bin\n```",
          "3. Εντοπισμός τμημάτων υψηλής εντροπίας (`.upx0`, `.upx1` με εντροπία > 7.2).",
          "4. Αποσυμπίεση του εκτελέσιμου με το εργαλείο UPX:\n```bash\nupx -d sample_lockbit_variant.bin -o sample_unpacked.bin\n```",
        ],
      },
    },
    {
      phaseNumber: 2,
      title: {
        en: "API Import Analysis & Capability Mapping with CAPA",
        el: "Ανάλυση Εισαγωγών API & Χαρτογράφηση Δυνατοτήτων με το CAPA",
      },
      estimatedTime: { en: "45 min", el: "45 λεπτά" },
      objectives: {
        en: [
          "Inspect Import Address Table (IAT) for evasion and injection APIs (`VirtualAllocEx`, `WriteProcessMemory`, `CreateRemoteThread`).",
          "Run Mandiant CAPA to automatically map binary capabilities to ATT&CK techniques.",
          "Identify anti-analysis and anti-debugging tricks (e.g., `IsDebuggerPresent`, `CheckRemoteDebuggerPresent`).",
        ],
        el: [
          "Έλεγχος Import Address Table (IAT) για συναρτήσεις έγχυσης κώδικα (`VirtualAllocEx`, `WriteProcessMemory`).",
          "Εκτέλεση του Mandiant CAPA για αυτόματη αντιστοίχιση δυνατοτήτων σε τεχνικές ATT&CK.",
          "Εντοπισμός τεχνικών αποφυγής εντοπισμού σφαλμάτων (`IsDebuggerPresent`).",
        ],
      },
      steps: {
        en: [
          "1. Run capability analysis using `capa`:\n```bash\ncapa sample_unpacked.bin\n```",
          "2. Dissect disassembled functions in Ghidra / Cutter around identified injection stubs.",
          "3. Document cryptocurrency ransom wallet strings and ransom note template text.",
        ],
        el: [
          "1. Εκτέλεση ανάλυσης δυνατοτήτων με το εργαλείο `capa`:\n```bash\ncapa sample_unpacked.bin\n```",
          "2. Αποσυναρμολόγηση και ανάλυση συναρτήσεων στο Ghidra / Cutter.",
          "3. Τεκμηρίωση διευθύνσεων πορτοφολιών κρυπτονομισμάτων και κειμένου σημειώματος λύτρων.",
        ],
      },
    },
    {
      phaseNumber: 3,
      title: {
        en: "Dynamic Sandbox Execution & Behavioral Profiling",
        el: "Δυναμική Εκτέλεση σε Sandbox & Συμπεριφορικό Προφίλ",
      },
      estimatedTime: { en: "30 min", el: "30 λεπτά" },
      objectives: {
        en: [
          "Execute the payload inside Flare-VM with ProcMon and Process Hacker recording.",
          "Capture filesystem creations, registry Run key modifications, and volume shadow copy deletion.",
          "Intercept simulated C2 traffic using FakeNet-NG and Wireshark.",
        ],
        el: [
          "Εκτέλεση του payload στο Flare-VM με καταγραφή από ProcMon και Process Hacker.",
          "Καταγραφή δημιουργίας αρχείων, τροποποιήσεων μητρώου (Run keys) και διαγραφής shadow copies.",
          "Υποκλοπή προσομοιωμένης κίνησης C2 με FakeNet-NG και Wireshark.",
        ],
      },
      steps: {
        en: [
          "1. Start FakeNet-NG to emulate Internet DNS and HTTP services.\n2. Execute sample and monitor ProcMon filters (`Process Name is sample_lockbit_variant.bin`).\n3. Capture command line executions: `vssadmin.exe delete shadows /all /quiet`.\n4. Save PCAP of HTTP POST beacons with encrypted host metadata.",
        ],
        el: [
          "1. Εκκίνηση του FakeNet-NG για προσομοίωση υπηρεσιών DNS και HTTP.\n2. Εκτέλεση του δείγματος και παρακολούθηση στο ProcMon.\n3. Καταγραφή εντολών: `vssadmin.exe delete shadows /all /quiet`.\n4. Αποθήκευση αρχείου PCAP με τις κλήσεις HTTP POST προς τον C2.",
        ],
      },
    },
    {
      phaseNumber: 4,
      title: {
        en: "YARA Rule Authoring, Validation & IOC Packaging",
        el: "Σύνταξη Κανόνα YARA, Επαλήθευση & Πακετοποίηση IOCs",
      },
      estimatedTime: { en: "20 min", el: "20 λεπτά" },
      objectives: {
        en: [
          "Author a production-ready YARA rule matching unique binary byte patterns and mutex strings.",
          "Test the YARA rule against a clean system repository to guarantee zero false positives.",
          "Export comprehensive IOC manifest (OpenIOC / MISP format).",
        ],
        el: [
          "Σύνταξη κανόνα YARA για εντοπισμό μοναδικών byte patterns και mutexes.",
          "Δοκιμή του κανόνα έναντι καθαρών αρχείων συστήματος για αποφυγή ψευδώς θετικών ενδείξεων.",
          "Εξαγωγή καταλόγου δεικτών IOC σε μορφή OpenIOC / MISP.",
        ],
      },
      steps: {
        en: [
          "1. Author `/rules/apt_lockbit.yar` containing specific hex byte sequences and ransom strings.\n2. Verify detection:\n```bash\nyara -w -s /rules/apt_lockbit.yar /malware_samples/\n```\n3. Validate zero false positives across `/bin` and `/usr/bin`.\n4. Compile final Malware Triage Report.",
        ],
        el: [
          "1. Σύνταξη του αρχείου `/rules/apt_lockbit.yar` με δεκαεξαδικές ακολουθίες και strings.\n2. Επαλήθευση ανίχνευσης:\n```bash\nyara -w -s /rules/apt_lockbit.yar /malware_samples/\n```\n3. Επιβεβαίωση μηδενικών ψευδώς θετικών στα `/bin` και `/usr/bin`.\n4. Σύνταξη της τελικής αναφοράς ανάλυσης κακόβουλου λογισμικού.",
        ],
      },
    },
  ],
  deliverables: {
    en: [
      "Malware Technical Analysis Report (PDF/Markdown, 4–5 pages)",
      "Validated Production YARA Rule (`apt_lockbit.yar`)",
      "Network C2 Traffic Capture (`c2_beacon_capture.pcap`)",
      "Standardized Threat Indicator Feed (`malware_iocs.json`)",
    ],
    el: [
      "Τεχνική Αναφορά Ανάλυσης Κακόβουλου Λογισμικού (4–5 σελίδες)",
      "Επικυρωμένος Κανόνας YARA Παραγωγής (`apt_lockbit.yar`)",
      "Καταγραφή Δικτυακής Κίνησης C2 (`c2_beacon_capture.pcap`)",
      "Τυποποιημένο Αρχείο Δεικτών Απειλής (`malware_iocs.json`)",
    ],
  },
  verificationChecklist: {
    en: [
      "Cryptographic hashes and fuzzy hashes (SSDEEP) match baseline.",
      "UPX packing was successfully unpacked and analyzed in Ghidra.",
      "ProcMon trace reveals exact registry persistence and shadow copy deletion.",
      "YARA rule successfully triggers on the malware sample with 0 false positives.",
    ],
    el: [
      "Τα hashes και το SSDEEP ταυτοποιήθηκαν πλήρως.",
      "Το πακετάρισμα UPX αποσυμπιέστηκε επιτυχώς και αναλύθηκε στο Ghidra.",
      "Η καταγραφή ProcMon αποκαλύπτει ακριβείς αλλαγές μητρώου και διαγραφή shadow copies.",
      "Ο κανόνας YARA ανιχνεύει επιτυχώς το δείγμα με μηδέν ψευδώς θετικά.",
    ],
  },
};

export const ch04Project: TechnicalProject = {
  id: "ch04-arch",
  category: {
    en: "Enterprise Architecture & Assessment Blueprint",
    el: "Αρχιτεκτονική Επιχείρησης & Στρατηγικό Πλάνο",
  },
  title: {
    en: "Automated Malware Triage Pipeline & Threat Intelligence Ingestion Engine",
    el: "Αυτοματοποιημένος Αγωγός Διαλογής Malware & Μηχανή Εισαγωγής Πληροφοριών Απειλών",
  },
  subtitle: {
    en: "Static & Dynamic Analysis Automation, YARA Clustering, and Automated EDR Response Orchestration",
    el: "Αυτοματοποίηση Στατικής & Δυναμικής Ανάλυσης, Ομαδοποίηση YARA και Ενορχήστρωση Απόκρισης EDR",
  },
  scenario: {
    en: "A Managed Security Service Provider (MSSP) handling over 10,000 suspicious file attachments daily requires an automated, cloud-scalable malware triage pipeline. You are tasked with developing a production-ready Python framework that automatically ingests suspicious binaries, extracts PE metadata and static features, runs sandboxed dynamic execution, evaluates YARA rulesets, and pushes actionable IOCs to EDR endpoints.",
    el: "Ένας Πάροχος Διαχειριζόμενων Υπηρεσιών Ασφάλειας (MSSP) που διαχειρίζεται καθημερινά πάνω από 10.000 ύποπτα συνημμένα αρχεία απαιτεί έναν αυτοματοποιημένο αγωγό διαλογής malware. Σας ανατίθεται να αναπτύξετε ένα πλαίσιο Python που λαμβάνει ύποπτα εκτελέσιμα, εξάγει μεταδεδομένα PE, εκτελεί δυναμική ανάλυση σε sandbox, εφαρμόζει κανόνες YARA και προωθεί δείκτες IOCs στα τερματικά EDR.",
  },
  objectives: {
    en: [
      "Build a Python pipeline using `pefile` and `yara-python` to automate static PE extraction.",
      "Integrate an automated sandbox harness (Cuckoo / CAPEv2 API) for behavioral telemetry.",
      "Implement SSDEEP / TLSH fuzzy hashing to cluster related malware families.",
      "Generate automated MISP-compatible threat events and EDR blocklists.",
    ],
    el: [
      "Ανάπτυξη αγωγού Python με `pefile` και `yara-python` για αυτοματοποιημένη στατική ανάλυση PE.",
      "Ενσωμάτωση API sandbox (Cuckoo / CAPEv2) για λήψη δυναμικής τηλεμετρίας.",
      "Υλοποίηση ασαφούς κατακερματισμού SSDEEP / TLSH για ομαδοποίηση οικογενειών malware.",
      "Παραγωγή συμβάντων απειλών συμβατών με MISP και λιστών αποκλεισμού για EDR.",
    ],
  },
  scope: {
    en: [
      "File types: Windows PE (EXE/DLL), Microsoft Office documents, PDF, ELF Linux binaries.",
      "Sandbox outputs: Process trees, dropped files, API call logs, PCAP network captures.",
    ],
    el: [
      "Τύποι αρχείων: Windows PE (EXE/DLL), έγγραφα Microsoft Office, PDF, εκτελέσιμα Linux ELF.",
      "Έξοδοι sandbox: Δέντρα διεργασιών, δημιουργηθέντα αρχεία, κλήσεις API, καταγραφές δικτύου PCAP.",
    ],
  },
  milestones: [
    {
      milestoneNumber: 1,
      title: {
        en: "Static PE & Document Feature Extractor Subsystem",
        el: "Υποσύστημα Εξαγωγής Στατικών Χαρακτηριστικών PE & Εγγράφων",
      },
      description: {
        en: "Develop `static_analyzer.py` parsing headers, sections, imports, exports, entropy, compiler info, and embedded resources.",
        el: "Ανάπτυξη του `static_analyzer.py` για εξαγωγή επικεφαλίδων, τμημάτων, εισαγωγών, εντροπίας και πόρων.",
      },
      detailedSpec: {
        en: [
          "Draft automated Bash/Ansible hardening scripts implementing CIS Linux Level 2 Benchmark.",
          "Disable legacy network protocols, unneeded filesystems (cramfs, squashfs), and insecure kernel modules.",
          "Configure `/etc/sysctl.conf` kernel parameters: ASLR full randomization, SYN cookies, and IP forwarding disabled."
],
        el: [
          "Σύνταξη σεναρίων Ansible για εφαρμογή του CIS Linux Level 2 Benchmark.",
          "Απενεργοποίηση παλαιών πρωτοκόλλων, μη αναγκαίων συστημάτων αρχείων και πυρήνα modules.",
          "Παραμετροποίηση `/etc/sysctl.conf`: πλήρες ASLR, SYN cookies και απαγόρευση IP forwarding."
],
      },
      deliverable: {
        en: "Static feature extraction module + JSON schema output.",
        el: "Υπομονάδα στατικής ανάλυσης + έξοδος JSON.",
      },
    },
    {
      milestoneNumber: 2,
      title: {
        en: "Dynamic Sandbox Execution & Network Telemetry Harvester",
        el: "Δυναμική Εκτέλεση Sandbox & Συλλέκτης Δικτυακής Τηλεμετρίας",
      },
      description: {
        en: "Develop `sandbox_client.py` submitting samples to sandbox APIs, polling execution status, and retrieving PCAPs and process trees.",
        el: "Ανάπτυξη του `sandbox_client.py` για υποβολή δειγμάτων σε API sandbox και ανάκτηση PCAPs και δέντρων διεργασιών.",
      },
      detailedSpec: {
        en: [
          "Design AppArmor profiles and SELinux policies in enforcing mode for public-facing daemons.",
          "Configure Linux PAM stack (`/etc/pam.d/common-auth`) with `pam_faillock` and `pam_pwquality`.",
          "Deploy comprehensive Linux `auditd` rules tracking `/etc/passwd`, `/etc/shadow`, and system call executions."
],
        el: [
          "Σχεδιασμός προφίλ AppArmor και πολιτικών SELinux σε κατάσταση enforcing.",
          "Παραμετροποίηση στοίβας PAM με `pam_faillock` και `pam_pwquality`.",
          "Ανάπτυξη κανόνων `auditd` για παρακολούθηση κρίσιμων αρχείων και syscalls."
],
      },
      deliverable: {
        en: "Sandbox connector script + mock API harness.",
        el: "Σύνδεσμος sandbox + περιβάλλον προσομοίωσης API.",
      },
    },
    {
      milestoneNumber: 3,
      title: {
        en: "YARA & Fuzzy Hash Malware Clustering Engine",
        el: "Μηχανή Ομαδοποίησης Malware με YARA & Ασαφή Hashes",
      },
      description: {
        en: "Compile a curated repository of 20 YARA rules and implement fuzzy similarity grouping to auto-classify samples into malware families.",
        el: "Συλλογή 20 κανόνων YARA και υλοποίηση ομαδοποίησης με ασαφή hashes για αυτόματη ταξινόμηση σε οικογένειες.",
      },
      detailedSpec: {
        en: [
          "Design immutable Golden Image pipeline using HashiCorp Packer and OpenSCAP compliance scanning.",
          "Automate vulnerability gating in CI/CD rejecting base images containing CVSS >= 7.0 flaws.",
          "Specify cryptographic signing of base OS disk images using Cosign and TPM 2.0 measurement."
],
        el: [
          "Σχεδιασμός αγωγού Immutable Golden Images με Packer και OpenSCAP.",
          "Αυτοματοποιημένος έλεγχος ευπαθειών CI/CD με απόρριψη εικόνων με CVSS >= 7.0.",
          "Ψηφιακή υπογραφή εικόνων δίσκου με Cosign και TPM 2.0."
],
      },
      deliverable: {
        en: "Clustering engine + rule validation benchmark.",
        el: "Μηχανή ομαδοποίησης + επαλήθευση κανόνων.",
      },
    },
    {
      milestoneNumber: 4,
      title: {
        en: "Automated Incident Response & Threat Intelligence Dispatcher",
        el: "Αυτοματοποιημένος Αποστολέας Πληροφοριών Απειλών & Απόκρισης",
      },
      description: {
        en: "Format all findings into MISP attributes, Sigma rules, and EDR network block rules, generating a web UI dashboard.",
        el: "Μορφοποίηση ευρημάτων σε γνωρίσματα MISP, κανόνες Sigma και μπλοκαρίσματα EDR με διεπαφή web.",
      },
      detailedSpec: {
        en: [
          "Architect enterprise EDR agent rollout across 5,000 hybrid endpoints with tamper-proof policies.",
          "Define automated response playbooks: network host isolation, live memory artifact capture, and forensic dump.",
          "Establish endpoint health telemetry dashboard tracking patching status and credential dumping attempts."
],
        el: [
          "Αρχιτεκτονική ανάπτυξης EDR agents σε 5.000 τερματικά με πολιτικές προστασίας από αλλοίωση.",
          "Ορισμός playbooks αυτόματης απόκρισης: απομόνωση host, εξαγωγή μνήμης και triage.",
          "Δημιουργία dashboard παρακολούθησης υγείας τερματικών και προσπαθειών υποκλοπής κωδικών."
],
      },
      deliverable: {
        en: "MISP/EDR export engine + Web Dashboard interface.",
        el: "Μηχανή εξαγωγής MISP/EDR + Διαδικτυακός Πίνακας Ελέγχου.",
      },
    },
  ],
  deliverables: {
    en: [
      "Complete Python Pipeline Codebase (`/triage_pipeline/`)",
      "Suite of 20 Enterprise YARA Rules (`/rules/enterprise_suite.yar`)",
      "Automated End-to-End Test Suite with Sample Mock Data",
      "System Architecture & Deployment Guide (10–12 pages)",
    ],
    el: [
      "Πλήρης Πηγαίος Κώδικας Αγωγού Python (`/triage_pipeline/`)",
      "Σουίτα 20 Εταιρικών Κανόνων YARA (`/rules/enterprise_suite.yar`)",
      "Αυτοματοποιημένη Σουίτα Δοκιμών με Δείγματα Δεδομένων",
      "Οδηγός Αρχιτεκτονικής & Ανάπτυξης Συστήματος (10–12 σελίδες)",
    ],
  },
  rubric: [
    {
      criterion: {
        en: "Pipeline Architecture & Static Extraction Depth",
        el: "Αρχιτεκτονική Αγωγού & Βάθος Στατικής Εξαγωγής",
      },
      weight: "30%",
      description: {
        en: "Completeness of PE/document parsing, error resiliency, and asynchronous throughput scalability.",
        el: "Πληρότητα ανάλυσης αρχείων PE/εγγράφων, ανθεκτικότητα σε σφάλματα και ασύγχρονη κλιμακωσιμότητα.",
      },
    },
    {
      criterion: {
        en: "YARA Rule Precision & Family Clustering Quality",
        el: "Ακρίβεια Κανόνων YARA & Ποιότητα Ομαδοποίησης Οικογενειών",
      },
      weight: "25%",
      description: {
        en: "Efficiency of YARA byte patterns, absence of false positives, and accuracy of fuzzy hashing clusters.",
        el: "Αποδοτικότητα κανόνων YARA, απουσία ψευδώς θετικών και ακρίβεια ομαδοποίησης με ασαφή hashes.",
      },
    },
    {
      criterion: {
        en: "Dynamic Telemetry Integration & Sandbox Resilience",
        el: "Ενσωμάτωση Δυναμικής Τηλεμετρίας & Ανθεκτικότητα Sandbox",
      },
      weight: "25%",
      description: {
        en: "Proper extraction of behavioral mutations, API call sequences, and network C2 artifacts.",
        el: "Ορθή εξαγωγή συμπεριφορικών αλλαγών, ακολουθιών κλήσεων API και δικτυακών δεικτών C2.",
      },
    },
    {
      criterion: {
        en: "Documentation & Threat Intelligence Interoperability",
        el: "Τεκμηρίωση & Διαλειτουργικότητα Πληροφοριών Απειλών",
      },
      weight: "20%",
      description: {
        en: "Adherence to STIX/MISP standards, clean code documentation, and executive dashboard UI quality.",
        el: "Τήρηση προτύπων STIX/MISP, καθαρή τεκμηρίωση κώδικα και ποιότητα διεπαφής του πίνακα ελέγχου.",
      },
    },
  ],
};

export const ch04Quiz: QuizQuestion[] = [
  {
    id: 1,
    question: {
      en: "What primary security risk is introduced when a Linux executable binary file is configured with the SUID (Set User ID) permission bit?",
      el: "Ποιος βασικός κίνδυνος ασφάλειας εισάγεται όταν ένα εκτελέσιμο αρχείο στο Linux έχει ενεργοποιημένο το SUID bit;",
    },
    options: {
      en: [
        "The executable is automatically compiled into unencrypted assembly code readable by all unprivileged users, across all internal enterprise network segments and endpoints.",
        "The executable permanently disables the Linux kernel audit subsystem whenever it initiates disk write operations, to ensure high-availability operational compliance across systems.",
        "The executable bypasses hardware memory management unit (MMU) address translation checks on modern x86 CPUs, using standardized organizational security policy configurations.",
        "The executable forces the network interface to enter promiscuous mode and capture raw network ethernet frames, across distributed multi-region cloud production environments.",
        "The executable runs with the privileges of the file owner (often root) regardless of who invokes it, risking privilege escalation.",
      ],
      el: [
        "Το εκτελέσιμο μεταγλωττίζεται αυτόματα σε μη κρυπτογραφημένο κώδικα assembly αναγνώσιμο από όλους, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Το εκτελέσιμο απενεργοποιεί μόνιμα το υποσύστημα ελέγχου auditd του πυρήνα κατά την εγγραφή στον δίσκο, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Το εκτελέσιμο παρακάμπτει τους ελέγχους μετάφρασης διευθύνσεων της μονάδας MMU στον επεξεργαστή x86, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Το εκτελέσιμο αναγκάζει την κάρτα δικτύου να τεθεί σε κατάσταση promiscuous mode για υποκλοπή πακέτων, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Το εκτελέσιμο εκτελείται με τα δικαιώματα του ιδιοκτήτη (συχνά root), εισάγοντας κίνδυνο κλιμάκωσης προνομίων.",
      ],
    },
    correctIndex: 4,
    explanation: {
      en: "SUID binaries run with the file owner's privileges (e.g. root). If a SUID binary contains a vulnerability or logic flaw, unprivileged users can exploit it to escalate privileges.",
      el: "Τα εκτελέσιμα SUID εκτελούνται με τα προνόμια του ιδιοκτήτη τους (συχνά root). Εάν περιέχουν σφάλμα, μη προνομιούχοι χρήστες μπορούν να το εκμεταλλευτούν για κλιμάκωση προνομίων.",
    },
  },
  {
    id: 2,
    question: {
      en: "How does Mandatory Access Control (MAC) implemented by SELinux differ fundamentally from standard Discretionary Access Control (DAC)?",
      el: "Πώς διαφέρει θεμελιωδώς ο Υποχρεωτικός Έλεγχος Πρόσβασης (MAC) του SELinux από τον Προαιρετικό Έλεγχο Πρόσβασης (DAC);",
    },
    options: {
      en: [
        "Under DAC, object owners determine access permissions; under MAC, centralized system policies enforce strict confinement.",
        "DAC relies entirely on hardware biometric tokens, whereas MAC relies on software password hashing algorithms, during standard continuous monitoring and administrative audits.",
        "DAC is enforced strictly by network firewalls, whereas MAC is enforced strictly by user-space shell environments, using standardized organizational security policy configurations.",
        "Under DAC, root superusers cannot modify files; under MAC, standard users possess unrestricted system privileges, across distributed multi-region cloud production environments.",
        "DAC encrypts filesystem blocks using AES-256, whereas MAC compresses files using standard lossless algorithms, without requiring manual intervention from systems engineering staff.",
      ],
      el: [
        "Στο DAC οι ιδιοκτήτες ορίζουν δικαιώματα, ενώ στο MAC κεντρικές πολιτικές του συστήματος επιβάλλουν αυστηρό περιορισμό.",
        "Το DAC βασίζεται αποκλειστικά σε βιομετρικά tokens υλικού, ενώ το MAC βασίζεται σε κωδικούς πρόσβασης, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Το DAC επιβάλλεται από τείχη προστασίας δικτύου, ενώ το MAC επιβάλλεται από το περιβάλλον φλοιού (shell), χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Στο DAC ο υπερχρήστης root δεν μπορεί να αλλάξει αρχεία, ενώ στο MAC οι απλοί χρήστες έχουν πλήρη δικαιώματα, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Το DAC κρυπτογραφεί τα μπλοκ αρχείων με AES-256, ενώ το MAC συμπιέζει αρχεία με αλγορίθμους χωρίς απώλειες, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "In DAC (standard Linux chmod), file owners decide access rights. In MAC (SELinux/AppArmor), the kernel enforces centralized security policies that confine even the root user.",
      el: "Στο DAC ο ιδιοκτήτης του αρχείου καθορίζει τα δικαιώματα. Στο MAC (SELinux) ο πυρήνας επιβάλλει αυστηρούς κεντρικούς κανόνες που περιορίζουν ακόμη και τον χρήστη root.",
    },
  },
  {
    id: 3,
    question: {
      en: "What exploit mitigation technique randomizes the memory locations of program execution segments (stack, heap, libraries) upon launch?",
      el: "Ποια τεχνική προστασίας τυχαιοποιεί τις διευθύνσεις μνήμης (στοίβα, σωρός, βιβλιοθήκες) κατά την εκτέλεση ενός προγράμματος;",
    },
    options: {
      en: [
        "Data Execution Prevention (DEP / NX bit), marking memory pages as non-executable to stop injected shellcode, to ensure high-availability operational compliance across systems.",
        "Address Space Layout Randomization (ASLR), making it difficult for attackers to predict memory target addresses.",
        "Stack Canaries, placing integrity verification values before the saved frame pointer and return address, across distributed multi-region cloud production environments.",
        "Control Flow Guard (CFG), verifying indirect call targets against a compiler-generated dispatch bitmap table, without requiring manual intervention from systems engineering staff.",
        "SafeSEH, ensuring structured exception handlers are registered within a validated module table list, to mitigate potential unauthorized system configuration drift.",
      ],
      el: [
        "Data Execution Prevention (DEP / NX bit), μαρκάροντας σελίδες μνήμης ως μη εκτελέσιμες για αποτροπή shellcode, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Address Space Layout Randomization (ASLR), καθιστώντας δύσκολη την πρόβλεψη διευθύνσεων στόχων στη μνήμη.",
        "Stack Canaries, τοποθετώντας τιμές ελέγχου ακεραιότητας πριν από τον δείκτη πλαισίου και τη διεύθυνση επιστροφής, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Control Flow Guard (CFG), επαληθεύοντας στόχους έμμεσων κλήσεων μέσω πινάκων που παράγει ο μεταγλωττιστής, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "SafeSEH, διασφαλίζοντας ότι οι συναρτήσεις διαχείρισης εξαιρέσεων είναι καταχωρημένες σε έγκυρο πίνακα, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "ASLR randomizes the memory addresses of the stack, heap, and shared libraries each time a program runs, making Return-Oriented Programming (ROP) and buffer overflow exploitation significantly harder.",
      el: "Το ASLR τυχαιοποιεί τις διευθύνσεις μνήμης σε κάθε εκτέλεση, καθιστώντας εξαιρετικά δύσκολη την αξιοποίηση υπερχειλίσεων μνήμης και τεχνικών ROP.",
    },
  },
  {
    id: 4,
    question: {
      en: "Which Linux kernel feature provides process isolation by partitioning system resources such as PIDs, network interfaces, and mount points?",
      el: "Ποιο χαρακτηριστικό του πυρήνα Linux παρέχει απομόνωση διεργασιών διαχωρίζοντας πόρους όπως PIDs, κάρτες δικτύου και σημεία προσάρτησης;",
    },
    options: {
      en: [
        "Control Groups (cgroups), enforcing hardware CPU and memory usage consumption limits on processes, using standardized organizational security policy configurations.",
        "Pluggable Authentication Modules (PAM), providing dynamic authentication infrastructure for system logins.",
        "Linux Namespaces, virtualizing system resources so processes have independent views of OS environments.",
        "Extended File Attributes (xattr), storing arbitrary filesystem metadata alongside POSIX file descriptors.",
        "Netfilter Hooks, intercepting and filtering network packets inside the Linux kernel networking stack, in accordance with modern zero trust architectural principles.",
      ],
      el: [
        "Control Groups (cgroups), επιβάλλοντας όρια κατανάλωσης πόρων επεξεργαστή και μνήμης RAM σε διεργασίες, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Pluggable Authentication Modules (PAM), παρέχοντας υποδομή δυναμικής ταυτοποίησης για εισόδους συστήματος.",
        "Linux Namespaces, απομονώνοντας πόρους ώστε οι διεργασίες να έχουν ανεξάρτητη θέαση του συστήματος.",
        "Extended File Attributes (xattr), αποθηκεύοντας πρόσθετα μεταδεδομένα μαζί με τους δείκτες αρχείων POSIX.",
        "Netfilter Hooks, υποκλέπτοντας και φιλτράροντας πακέτα δικτύου μέσα στη στοίβα δικτύωσης του πυρήνα, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "Linux Namespaces (pid, net, mnt, ipc, uts, user) isolate global system resources, allowing container runtimes like Docker to create isolated container environments.",
      el: "Τα Linux Namespaces απομονώνουν πόρους του συστήματος (pid, net, mnt κ.ά.), αποτελώντας τη βάση για τη δημιουργία απομονωμένων containers (π.χ. Docker).",
    },
  },
  {
    id: 5,
    question: {
      en: "What role do Linux Control Groups (cgroups v2) play in container security and resource management?",
      el: "Ποιο ρόλο διαδραματίζουν τα Linux Control Groups (cgroups v2) στην ασφάλεια και τη διαχείριση πόρων των containers;",
    },
    options: {
      en: [
        "They encrypt all network socket communications using ephemeral TLS 1.3 cryptographic session keys, without requiring manual intervention from systems engineering staff.",
        "They automatically patch vulnerable C library system calls without requiring service daemon restarts, to mitigate potential unauthorized system configuration drift.",
        "They generate cryptographic public-key certificates for internal container service mesh communication, in accordance with modern zero trust architectural principles.",
        "They limit, meter, and throttle resource allocation (CPU, memory, disk I/O) to prevent Denial of Service.",
        "They replace standard Linux user authentication with multi-factor biometric fingerprint scanning, before committing changes to central production repository nodes.",
      ],
      el: [
        "Κρυπτογραφούν όλες τις συνδέσεις δικτύου χρησιμοποιώντας εφήμερα κλειδιά κρυπτογράφησης TLS 1.3, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Εφαρμόζουν αυτόματα διορθώσεις ασφάλειας σε βιβλιοθήκες C χωρίς να απαιτείται επανεκκίνηση υπηρεσιών, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Παράγουν ψηφιακά πιστοποιητικά για την εσωτερική επικοινωνία υπηρεσιών σε πλέγματα service mesh, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Περιορίζουν και ρυθμίζουν την κατανάλωση πόρων (CPU, μνήμη, δίσκος), αποτρέποντας επιθέσεις Denial of Service.",
        "Αντικαθιστούν την κλασική ταυτοποίηση χρηστών με βιομετρική σάρωση δακτυλικών αποτυπωμάτων, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
      ],
    },
    correctIndex: 3,
    explanation: {
      en: "cgroups allocate and restrict physical hardware resources (CPU, RAM, block I/O, network bandwidth), preventing a rogue or compromised process from starving the host system.",
      el: "Τα cgroups περιορίζουν και ελέγχουν τη χρήση φυσικών πόρων (CPU, μνήμη, I/O), αποτρέποντας μια κακόβουλη διεργασία από το να εξαντλήσει τους πόρους του εξυπηρετητή.",
    },
  },
  {
    id: 6,
    question: {
      en: "How does Linux PAM (Pluggable Authentication Modules) streamline access management across system services?",
      el: "Πώς απλοποιεί το Linux PAM τη διαχείριση πρόσβασης σε διάφορες υπηρεσίες του λειτουργικού συστήματος;",
    },
    options: {
      en: [
        "By enforcing a single mandatory hardcoded password across all local service accounts and daemons, without requiring manual intervention from systems engineering staff.",
        "By compiling all system binaries into static standalone executables without dynamic shared libraries, in accordance with modern zero trust architectural principles.",
        "By routing all user login attempts through external third-party proprietary public cloud identity nodes, before committing changes to central production repository nodes.",
        "By permanently disabling SSH remote login access whenever an unprivileged user executes sudo commands, under standard operating procedures defined in corporate ISMS policies.",
        "By decoupling application authentication logic from underlying identity schemes via modular config files.",
      ],
      el: [
        "Επιβάλλοντας έναν ενιαίο υποχρεωτικό κωδικό πρόσβασης σε όλους τους λογαριασμούς υπηρεσιών τοπικά, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Μεταγλωττίζοντας όλα τα εκτελέσιμα του συστήματος σε στατικά αρχεία χωρίς δυναμικές βιβλιοθήκες, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Δρομολογώντας όλες τις προσπάθειες σύνδεσης μέσω ιδιόκτητων εξωτερικών κόμβων ταυτότητας στο cloud, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Απενεργοποιώντας μόνιμα την απομακρυσμένη πρόσβαση SSH όποτε ένας απλός χρήστης εκτελεί εντολές sudo, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Διαχωρίζοντας τη λογική ταυτοποίησης εφαρμογών από τους μηχανισμούς ταυτότητας μέσω αρθρωτών ρυθμίσεων.",
      ],
    },
    correctIndex: 4,
    explanation: {
      en: "PAM abstracts authentication, authorization, and session management, allowing administrators to configure policies (like MFA, password complexity, faillock) without modifying application code.",
      el: "Το PAM αποσυνδέει τους μηχανισμούς ταυτοποίησης από τις εφαρμογές, επιτρέποντας την εφαρμογή πολιτικών (MFA, πολυπλοκότητα κωδικών, κλείδωμα λογαριασμών) χωρίς αλλαγές στον κώδικα.",
    },
  },
  {
    id: 7,
    question: {
      en: "What is the primary function of the Linux Audit subsystem (auditd) in host-level security monitoring?",
      el: "Ποια είναι η βασική λειτουργία του υποσυστήματος ελέγχου του Linux (auditd) στην παρακολούθηση ασφάλειας συστήματος;",
    },
    options: {
      en: [
        "To intercept and log kernel system calls, file access events, and privilege transitions for forensic analysis.",
        "To optimize database SQL query execution performance by restructuring filesystem disk index partitions, in accordance with modern zero trust architectural principles.",
        "To generate automated symmetric encryption keys for all newly initialized user home directories, before committing changes to central production repository nodes.",
        "To prevent network packet loss during distributed volumetric denial-of-service flood events, under standard operating procedures defined in corporate ISMS policies.",
        "To compile unprivileged Python scripts into sandboxed kernel-level device driver modules, across all internal enterprise network segments and endpoints.",
      ],
      el: [
        "Να καταγράφει κλήσεις συστήματος του πυρήνα, προσβάσεις αρχείων και αλλαγές δικαιωμάτων για ανάλυση.",
        "Να βελτιστοποιεί την ταχύτητα εκτέλεσης ερωτημάτων SQL αναδιατάσσοντας τα ευρετήρια των δίσκων, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Να παράγει αυτόματα κλειδιά συμμετρικής κρυπτογράφησης για όλους τους νέους φακέλους χρηστών, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Να αποτρέπει την απώλεια πακέτων δικτύου κατά τη διάρκεια ογκομετρικών επιθέσεων άρνησης εξυπηρέτησης, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Να μεταγλωττίζει απλά scripts Python σε απομονωμένους οδηγούς συσκευών σε επίπεδο πυρήνα, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "The Linux Audit framework (auditd) captures security-relevant system calls (execve, open, chmod) and unauthorized access attempts directly from the kernel for compliance and incident forensics.",
      el: "Το auditd καταγράφει κρίσιμες κλήσεις συστήματος (execve, open, chmod) και προσπάθειες πρόσβασης απευθείας από τον πυρήνα για ιατροδικαστική ανάλυση και συμμόρφωση.",
    },
  },
  {
    id: 8,
    question: {
      en: "Which security measure protects the operating system kernel from executing unauthorized or tampered device drivers?",
      el: "Ποιο μέτρο ασφάλειας προστατεύει τον πυρήνα του λειτουργικού από την εκτέλεση μη εξουσιοδοτημένων οδηγών συσκευών;",
    },
    options: {
      en: [
        "Dynamic Address Translation, remapping physical memory blocks during hardware peripheral interrupts, in accordance with modern zero trust architectural principles.",
        "Cryptographic Kernel Module Signing, verifying digital signatures before loading kernel modules (.ko).",
        "Stack Buffer Padding, allocating random uninitialized bytes between consecutive user-space variables, under standard operating procedures defined in corporate ISMS policies.",
        "Discretionary Access Control, allowing file owners to modify kernel memory segments through sysctl, across all internal enterprise network segments and endpoints.",
        "DNSSEC Validation, verifying domain name resource records prior to establishing outbound network sockets.",
      ],
      el: [
        "Δυναμική Μετάφραση Διευθύνσεων, επαναχαρτογραφώντας μπλοκ φυσικής μνήμης κατά τις διακοπές συσκευών, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Κρυπτογραφική Υπογραφή Αρθρωμάτων Πυρήνα, επαληθεύοντας ψηφιακές υπογραφές πριν τη φόρτωση (.ko).",
        "Επένδυση Στοίβας (Stack Padding), δεσμεύοντας τυχαία bytes ανάμεσα σε μεταβλητές χρήστη, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Προαιρετικός Έλεγχος Πρόσβασης, επιτρέποντας στους ιδιοκτήτες αρχείων να αλλάζουν τη μνήμη του πυρήνα, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Επαλήθευση DNSSEC, επικυρώνοντας εγγραφές ονομάτων χώρου πριν από τη δημιουργία συνδέσεων δικτύου.",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Kernel module signing requires kernel modules (.ko files) to be cryptographically signed by a trusted private key, preventing rootkits and untrusted drivers from loading into ring 0.",
      el: "Η υπογραφή αρθρωμάτων πυρήνα απαιτεί τα αρχεία .ko να φέρουν έγκυρη ψηφιακή υπογραφή από έμπιστο κλειδί, αποτρέποντας τη φόρτωση rootkits στον πυρήνα (ring 0).",
    },
  },
  {
    id: 9,
    question: {
      en: "What is the primary function of a File Integrity Monitoring (FIM) tool such as AIDE or Tripwire?",
      el: "Ποια είναι η βασική λειτουργία ενός εργαλείου Ελέγχου Ακεραιότητας Αρχείων (FIM) όπως το AIDE ή το Tripwire;",
    },
    options: {
      en: [
        "To decrypt encrypted user home directories in real time during administrative maintenance windows, under standard operating procedures defined in corporate ISMS policies.",
        "To automatically restart failing system daemons whenever memory consumption exceeds ninety percent, across all internal enterprise network segments and endpoints.",
        "To periodically compare cryptographic hashes and attributes of critical files against a baseline database.",
        "To block incoming TCP connection attempts originating from untrusted public dynamic IP addresses, during standard continuous monitoring and administrative audits.",
        "To convert plaintext system passwords into salted SHA-512 hashes within the shadow database file, to ensure high-availability operational compliance across systems.",
      ],
      el: [
        "Να αποκρυπτογραφεί φακέλους χρηστών σε πραγματικό χρόνο κατά τη διάρκεια συντήρησης του συστήματος, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Να επανεκκινεί αυτόματα υπηρεσίες όποτε η κατανάλωση μνήμης υπερβεί το 90% των διαθέσιμων πόρων, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Να συγκρίνει περιοδικά κρυπτογραφικά hashes και δικαιώματα κρίσιμων αρχείων με μια βάση αναφοράς.",
        "Να απορρίπτει εισερχόμενες συνδέσεις TCP που προέρχονται από δυναμικές διευθύνσεις IP του διαδικτύου, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Να μετατρέπει κωδικούς πρόσβασης σε αποτυπώματα SHA-512 με salt μέσα στο αρχείο shadow, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "FIM tools monitor system files (e.g. binaries, /etc/passwd, configs) by comparing their cryptographic hashes and permissions against a known good baseline, alerting on unauthorized modifications.",
      el: "Τα εργαλεία FIM παρακολουθούν κρίσιμα αρχεία συγκρίνοντας τα hashes και τα δικαιώματά τους με μια ασφαλή βάση αναφοράς, ειδοποιώντας για οποιαδήποτε μη εξουσιοδοτημένη τροποποίηση.",
    },
  },
  {
    id: 10,
    question: {
      en: "What specific vulnerability in memory management does a Stack Canary mitigate during execution?",
      el: "Ποια συγκεκριμένη ευπάθεια διαχείρισης μνήμης αντιμετωπίζει το Stack Canary κατά την εκτέλεση;",
    },
    options: {
      en: [
        "SQL injection attacks attempting to bypass database authentication query logic, under standard operating procedures defined in corporate ISMS policies.",
        "Cross-site scripting (XSS) attacks injecting malicious scripts into client browsers, during standard continuous monitoring and administrative audits.",
        "Server-side request forgery (SSRF) querying link-local cloud metadata endpoints, to ensure high-availability operational compliance across systems.",
        "Stack-based buffer overflows attempting to overwrite the saved frame pointer and return address.",
        "Race condition vulnerabilities occurring during concurrent file write operations, using standardized organizational security policy configurations.",
      ],
      el: [
        "Επιθέσεις SQL injection που επιχειρούν να παρακάμψουν τη λογική ελέγχου ταυτότητας της βάσης, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Επιθέσεις Cross-site scripting (XSS) που εισάγουν κακόβουλο κώδικα στον περιηγητή του χρήστη, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Επιθέσεις Server-Side Request Forgery (SSRF) κατά τοπικών υπηρεσιών μεταδεδομένων cloud, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Υπερχειλίσεις μνήμης buffer στη στοίβα που επιχειρούν να αλλοιώσουν τη διεύθυνση επιστροφής.",
        "Σφάλματα συγχρονισμού (race conditions) κατά την ταυτόχρονη εγγραφή σε κοινόχρηστα αρχεία, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
      ],
    },
    correctIndex: 3,
    explanation: {
      en: "A stack canary is a guard value placed on the stack before the return address. If a buffer overflow overwrites the canary, the program detects the corruption and aborts before executing rogue code.",
      el: "Το stack canary είναι μια τιμή ασφαλείας στη στοίβα πριν από τη διεύθυνση επιστροφής. Εάν αλλοιωθεί από υπερχείλιση buffer, το πρόγραμμα τερματίζει αμέσως αποτρέποντας εκτέλεση shellcode.",
    },
  },
];

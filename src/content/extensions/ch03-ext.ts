import type { CliLab, HandsOnLab, TechnicalProject, QuizQuestion } from "../types";

export const ch03CliLab: CliLab = {
  id: "ch03-cli",
  title: {
    en: "MITRE ATT&CK & Attack Lifecycle Mapping Sandbox",
    el: "Προσομοιωτής Χαρτογράφησης MITRE ATT&CK & Κύκλου Ζωής Επιθέσεων",
  },
  scenario: {
    en: "Analyze threat actor telemetry, correlate observed indicators against the Lockheed Martin Cyber Kill Chain, query MITRE ATT&CK tactics/techniques, and formulate Diamond Model attributions.",
    el: "Αναλύστε τηλεμετρία δραστών απειλών, συσχετίστε παρατηρηθέντες δείκτες με το Cyber Kill Chain, αναζητήστε τεχνικές στο MITRE ATT&CK και συντάξτε αποδόσεις με το Μοντέλο Διαμαντιού.",
  },
  initialPrompt: "analyst@threat-intel:~$",
  banner: {
    en: "=== Chapter 3 Threat Intelligence & ATT&CK Sandbox ===\nTarget: Incident Investigation INC-4029 | Role: Cyber Threat Intelligence Analyst\nType 'help' for command assistance or follow the missions below.",
    el: "=== Εργαστήριο Πληροφοριών Απειλών & ATT&CK Κεφαλαίου 3 ===\nΣτόχος: Διερεύνηση Περιστατικού INC-4029 | Ρόλος: Αναλυτής Πληροφοριών Απειλών\nΠληκτρολογήστε 'help' για βοήθεια ή ακολουθήστε τις παρακάτω αποστολές.",
  },
  fileSystem: {
    "incident_telemetry.json": '{"id":"INC-4029","source_ip":"198.51.100.44","actor_suspect":"APT29","technique":"T1566.001"}',
    "killchain_stages.txt": "1. Recon -> 2. Weaponization -> 3. Delivery -> 4. Exploitation -> 5. Installation -> 6. C2 -> 7. Actions",
    "threat_actor_profiles.txt": "APT28: Fancy Bear (GRU)\nAPT29: Cozy Bear (SVR)\nFIN7: Carbanak (Cybercrime / Financial)\nLazarus: North Korea",
  },
  tasks: [
    {
      id: "task-1",
      title: {
        en: "Query Threat Intelligence for Known Adversary Groups",
        el: "Αναζήτηση Πληροφοριών Απειλών για Γνωστές Ομάδες Δραστών",
      },
      description: {
        en: "Query threat intelligence database for APT29 capabilities and observed tactics using `threat-intel`.",
        el: "Αναζητήστε στη βάση πληροφοριών απειλών τις δυνατότητες και τεχνικές του APT29 με το `threat-intel`.",
      },
      hint: {
        en: "Execute: threat-intel --actor APT29",
        el: "Εκτελέστε: threat-intel --actor APT29",
      },
      solution: "threat-intel --actor APT29",
      validateRegex: "threat-intel.*APT29",
      successMessage: {
        en: "Threat intel retrieved! APT29 tactics and historic campaigns loaded.",
        el: "Οι πληροφορίες απειλών ανακτήθηκαν! Οι τακτικές του APT29 φορτώθηκαν.",
      },
    },
    {
      id: "task-2",
      title: {
        en: "Map Adversary Techniques to MITRE ATT&CK Matrix",
        el: "Χαρτογράφηση Τεχνικών Δραστών στον Πίνακα MITRE ATT&CK",
      },
      description: {
        en: "Query MITRE ATT&CK for techniques associated with Initial Access tactic using `att&ck`.",
        el: "Αναζητήστε στο MITRE ATT&CK τις τεχνικές που σχετίζονται με την τακτική Αρχικής Πρόσβασης (Initial Access).",
      },
      hint: {
        en: "Execute: att&ck --tactic initial-access",
        el: "Εκτελέστε: att&ck --tactic initial-access",
      },
      solution: "att&ck --tactic initial-access",
      validateRegex: "att&ck.*initial-access",
      successMessage: {
        en: "ATT&CK mapping confirmed: Identified Technique T1566.001 (Spearphishing Attachment).",
        el: "Η χαρτογράφηση ATT&CK επιβεβαιώθηκε: Εντοπίστηκε η τεχνική T1566.001 (Spearphishing Attachment).",
      },
    },
    {
      id: "task-3",
      title: {
        en: "Trace Intrusion Lifecycle via Cyber Kill Chain",
        el: "Ιχνηλάτηση Κύκλου Ζωής Επίθεσης μέσω Cyber Kill Chain",
      },
      description: {
        en: "Reconstruct the chronological stages of incident INC-4029 across the 7 Kill Chain phases using `killchain-trace`.",
        el: "Ανακατασκευάστε τα χρονολογικά στάδια του περιστατικού INC-4029 στις 7 φάσεις του Kill Chain με το `killchain-trace`.",
      },
      hint: {
        en: "Execute: killchain-trace --incident INC-4029",
        el: "Εκτελέστε: killchain-trace --incident INC-4029",
      },
      solution: "killchain-trace --incident INC-4029",
      validateRegex: "killchain-trace.*INC-4029",
      successMessage: {
        en: "Kill Chain reconstruction complete! Correlated Delivery, Exploitation, and C2 stages.",
        el: "Η ανακατασκευή Kill Chain ολοκληρώθηκε! Συσχετίστηκαν τα στάδια Delivery, Exploitation και C2.",
      },
    },
    {
      id: "task-4",
      title: {
        en: "Correlate Infrastructure using Diamond Model",
        el: "Συσχέτιση Υποδομών μέσω του Μοντέλου Διαμαντιού",
      },
      description: {
        en: "Correlate adversary infrastructure `c2-beacon.darkops-gateway.org` to identify associated capabilities and victims.",
        el: "Συσχετίστε την υποδομή του αντιπάλου `c2-beacon.darkops-gateway.org` για εντοπισμό δυνατοτήτων και θυμάτων.",
      },
      hint: {
        en: "Run: diamond-model --correlate c2-beacon.darkops-gateway.org",
        el: "Εκτελέστε: diamond-model --correlate c2-beacon.darkops-gateway.org",
      },
      solution: "diamond-model --correlate c2-beacon.darkops-gateway.org",
      validateRegex: "diamond-model.*correlate",
      successMessage: {
        en: "Diamond Model node completed: Adversary -> Infrastructure -> Capability -> Victim linkage established.",
        el: "Ο κόμβος Μοντέλου Διαμαντιού ολοκληρώθηκε: Συνδέθηκαν Αντίπαλος, Υποδομή, Δυνατότητα και Θύμα.",
      },
    },
  ],
};

export const ch03HandsOnLab: HandsOnLab = {
  title: {
    en: "Threat Hunting & Attack Campaign Reconstruction using Diamond Model and MITRE ATT&CK",
    el: "Προληπτική Αναζήτηση Απειλών & Ανακατασκευή Εκστρατείας Επίθεσης με Μοντέλο Διαμαντιού και MITRE ATT&CK",
  },
  subtitle: {
    en: "2-Hour Practical Lab: Multi-Stage Intrusion Analysis, TTP Attribution, and MITRE D3FEND Countermeasures",
    el: "Εργαστήριο 2 Ωρών: Ανάλυση Πολυεπίπεδης Εισβολής, Απόδοση TTPs και Αντίμετρα MITRE D3FEND",
  },
  duration: {
    en: "~2 Hours (120 minutes)",
    el: "~2 Ώρες (120 λεπτά)",
  },
  overview: {
    en: "In this 2-hour technical laboratory, students operate inside a Cyber Threat Intelligence (CTI) center investigating an Advanced Persistent Threat (APT) intrusion campaign. You will ingest raw indicator feeds, dissect multi-phase attacker behaviors, map Tactics, Techniques, and Procedures (TTPs) to the MITRE ATT&CK Enterprise Matrix, build Diamond Model activity threads, and engineer defensive countermeasures using MITRE D3FEND.",
    el: "Σε αυτό το τεχνικό εργαστήριο 2 ωρών, οι φοιτητές λειτουργούν σε Κέντρο Πληροφοριών Κυβερνοαπειλών (CTI) διερευνώντας μια προηγμένη εκστρατεία επίθεσης APT. Θα επεξεργαστείτε δείκτες παραβίασης (IOCs), θα αναλύσετε επιθετικές συμπεριφορές, θα χαρτογραφήσετε Τακτικές, Τεχνικές και Διαδικασίες (TTPs) στο MITRE ATT&CK, θα συνδέσετε νήματα δραστηριότητας με το Μοντέλο Διαμαντιού και θα σχεδιάσετε αντίμετρα με το MITRE D3FEND.",
  },
  environment: [
    "Linux / macOS CTI workstation with Python 3.11+, jq, curl, git",
    "OpenCTI / MISP Threat Intelligence Platform (Docker sandbox instance)",
    "ATT&CK Navigator local JSON workbench",
    "STIX 2.1 validator & PyTAK / TAXII 2.1 client libraries",
  ],
  phases: [
    {
      phaseNumber: 1,
      title: {
        en: "Threat Intelligence Ingestion & IOC Normalization",
        el: "Εισαγωγή Πληροφοριών Απειλών & Κανονικοποίηση Δεικτών IOC",
      },
      estimatedTime: { en: "25 min", el: "25 λεπτά" },
      objectives: {
        en: [
          "Parse uncurated threat feeds in STIX 2.1 JSON format.",
          "Extract and normalize Indicators of Compromise (IPs, hashes, domain names, mutexes).",
          "Differentiate tactical atomic IOCs from strategic behavioural TTPs.",
        ],
        el: [
          "Επεξεργασία ανεπεξέργαστων ροών STIX 2.1 JSON.",
          "Εξαγωγή και κανονικοποίηση Δεικτών Παραβίασης (IPs, hashes, domains, mutexes).",
          "Διάκριση τακτικών ατομικών δεικτών από στρατηγικά συμπεριφορικά TTPs.",
        ],
      },
      steps: {
        en: [
          "1. Ingest the campaign STIX feed using `curl`:\n```bash\ncurl -s http://cti-feed.local/campaign_99.stix2 | jq '.objects[] | select(.type==\"indicator\")' > parsed_iocs.json\n```",
          "2. Classify IOCs according to David Bianco's Pyramid of Pain (Hash values, IP addresses, Domain names, Network/Host Artifacts, Tools, TTPs).",
          "3. Verify hash reputations via local Threat Intelligence caching server.",
        ],
        el: [
          "1. Εισαγωγή της ροής STIX της εκστρατείας με χρήση του `curl`:\n```bash\ncurl -s http://cti-feed.local/campaign_99.stix2 | jq '.objects[] | select(.type==\"indicator\")' > parsed_iocs.json\n```",
          "2. Κατηγοριοποίηση των IOCs βάσει της Πυραμίδας του Πόνου (Pyramid of Pain) του David Bianco.",
          "3. Επαλήθευση φήμης hashes μέσω τοπικού εξυπηρετητή CTI cache.",
        ],
      },
    },
    {
      phaseNumber: 2,
      title: {
        en: "Cyber Kill Chain Stage Reconstruction & Correlation",
        el: "Ανακατασκευή Σταδίων Cyber Kill Chain & Συσχέτιση",
      },
      estimatedTime: { en: "45 min", el: "45 λεπτά" },
      objectives: {
        en: [
          "Trace the 7 sequential stages: Recon, Weaponization, Delivery, Exploitation, Installation, C2, and Actions on Objectives.",
          "Identify exact timestamps and telemetry evidence corresponding to each phase.",
          "Pinpoint initial compromise vectors (CVE-2023-38831 WinRAR exploitation).",
        ],
        el: [
          "Ιχνηλάτηση των 7 διαδοχικών σταδίων του Kill Chain.",
          "Εντοπισμός ακριβών χρονικών σημάτων και τηλεμετρίας ανά φάση.",
          "Εντοπισμός του αρχικού διανύσματος εισβολής (εκμετάλλευση WinRAR CVE-2023-38831).",
        ],
      },
      steps: {
        en: [
          "1. Correlate delivery logs from mail security gateway with endpoint EDR telemetry:\n```bash\ngrep -E 'attachment|invoice.xlsm' /var/log/mail_gateway.log\n```",
          "2. Map observed process tree: `OUTLOOK.EXE` -> `WINRAR.EXE` -> `cmd.exe` -> `powershell.exe`.",
          "3. Document Command & Control (C2) beaconing patterns over HTTPS port 443 with jitter intervals.",
        ],
        el: [
          "1. Συσχέτιση καταγραφών πύλης ηλεκτρονικού ταχυδρομείου με τηλεμετρία EDR:\n```bash\ngrep -E 'attachment|invoice.xlsm' /var/log/mail_gateway.log\n```",
          "2. Χαρτογράφηση δέντρου διεργασιών: `OUTLOOK.EXE` -> `WINRAR.EXE` -> `cmd.exe` -> `powershell.exe`.",
          "3. Τεκμηρίωση μοτίβων επικοινωνίας C2 μέσω HTTPS θύρας 443 με διακυμάνσεις jitter.",
        ],
      },
    },
    {
      phaseNumber: 3,
      title: {
        en: "MITRE ATT&CK Matrix Mapping & Diamond Model Synthesis",
        el: "Χαρτογράφηση Πίνακα MITRE ATT&CK & Σύνθεση Μοντέλου Διαμαντιού",
      },
      estimatedTime: { en: "30 min", el: "30 λεπτά" },
      objectives: {
        en: [
          "Map 8 observed attacker techniques to specific MITRE ATT&CK Enterprise technique IDs.",
          "Construct a comprehensive Diamond Model graph (Adversary, Capability, Infrastructure, Victim).",
          "Assess confidence levels in threat actor attribution (APT28 vs. APT29 vs. FIN7).",
        ],
        el: [
          "Χαρτογράφηση 8 παρατηρηθεισών τεχνικών σε αναγνωριστικά τεχνικών MITRE ATT&CK.",
          "Κατασκευή πλήρους γραφήματος Μοντέλου Διαμαντιού (Αντίπαλος, Δυνατότητα, Υποδομή, Θύμα).",
          "Αξιολόγηση επιπέδου βεβαιότητας για την απόδοση ευθύνης (APT28 έναντι APT29 έναντι FIN7).",
        ],
      },
      steps: {
        en: [
          "1. Generate ATT&CK Navigator JSON layer highlighting active techniques:\n```bash\npython3 scripts/build_attck_layer.py --input observed_ttps.json --output layer.json\n```",
          "2. Build the Diamond Model Activity Thread linking repeated victimology across critical energy sector targets.",
          "3. Cross-reference compile timestamps and code similarities with known threat group tooling.",
        ],
        el: [
          "1. Δημιουργία επιπέδου ATT&CK Navigator JSON για τις ενεργές τεχνικές:\n```bash\npython3 scripts/build_attck_layer.py --input observed_ttps.json --output layer.json\n```",
          "2. Κατασκευή Νήματος Δραστηριότητας Μοντέλου Διαμαντιού συνδέοντας τη θυματολογία στον ενεργειακό τομέα.",
          "3. Αντιπαραβολή χρονικών σημάτων μεταγλώττισης και ομοιοτήτων κώδικα με γνωστές βιβλιοθήκες εργαλείων.",
        ],
      },
    },
    {
      phaseNumber: 4,
      title: {
        en: "Defensive Countermeasure Mapping with MITRE D3FEND",
        el: "Σχεδιασμός Αμυντικών Αντιμέτρων με το MITRE D3FEND",
      },
      estimatedTime: { en: "20 min", el: "20 λεπτά" },
      objectives: {
        en: [
          "Map offensive ATT&CK techniques directly to defensive D3FEND matrix components.",
          "Design specific detection rules (Sigma/YARA) to disrupt early-stage attack lifecycle steps.",
          "Compile the executive Threat Intelligence Report.",
        ],
        el: [
          "Άμεση αντιστοίχιση επιθετικών τεχνικών ATT&CK στα αμυντικά στοιχεία του MITRE D3FEND.",
          "Σχεδιασμός κανόνων ανίχνευσης (Sigma/YARA) για διακοπή των πρώιμων σταδίων της επίθεσης.",
          "Σύνταξη της επιτελικής έκθεσης Πληροφοριών Απειλών.",
        ],
      },
      steps: {
        en: [
          "1. Identify D3FEND defensive countermeasures for T1059.001 (PowerShell Execution -> Script Execution Analysis / Process Spawn Analysis).",
          "2. Export final threat hunt package containing Sigma rules and IOC blocklists.",
          "3. Present executive findings and attribution summary.",
        ],
        el: [
          "1. Εντοπισμός αντιμέτρων D3FEND για το T1059.001 (Εκτέλεση PowerShell -> Ανάλυση Εκτέλεσης Σεναρίων).",
          "2. Εξαγωγή πακέτου προληπτικής αναζήτησης απειλών με κανόνες Sigma και λίστες αποκλεισμού IOCs.",
          "3. Παρουσίαση επιτελικών συμπερασμάτων και σύνοψης απόδοσης ευθύνης.",
        ],
      },
    },
  ],
  deliverables: {
    en: [
      "ATT&CK Navigator Layer JSON file (`campaign_attck_layer.json`)",
      "Diamond Model Activity Thread Diagram (`diamond_model_graph.png`)",
      "Disrupted Kill Chain Analysis Table (`killchain_matrix.xlsx`)",
      "Executive Cyber Threat Intelligence Dossier (4 pages)",
    ],
    el: [
      "Αρχείο Επιπέδου ATT&CK Navigator JSON (`campaign_attck_layer.json`)",
      "Διάγραμμα Νήματος Δραστηριότητας Μοντέλου Διαμαντιού (`diamond_model_graph.png`)",
      "Πίνακας Ανάλυσης Διακοπής Kill Chain (`killchain_matrix.xlsx`)",
      "Επιτελικός Φάκελος Πληροφοριών Κυβερνοαπειλών (4 σελίδες)",
    ],
  },
  verificationChecklist: {
    en: [
      "All 7 Cyber Kill Chain stages accurately identified with corresponding evidence.",
      "At least 8 MITRE ATT&CK techniques mapped with correct sub-technique IDs.",
      "Diamond Model correctly attributes relationships between Infrastructure, Capability, and Victim.",
      "Defensive D3FEND countermeasures provide actionable technical controls.",
    ],
    el: [
      "Και τα 7 στάδια του Cyber Kill Chain ταυτοποιήθηκαν με σαφή αποδεικτικά στοιχεία.",
      "Τουλάχιστον 8 τεχνικές MITRE ATT&CK αντιστοιχίστηκαν με ορθά sub-technique IDs.",
      "Το Μοντέλο Διαμαντιού συνδέει ορθά Υποδομή, Δυνατότητα, Αντίπαλο και Θύμα.",
      "Τα αμυντικά αντίμετρα D3FEND παρέχουν άμεσα εφαρμόσιμους τεχνικούς ελέγχους.",
    ],
  },
};

export const ch03Project: TechnicalProject = {
  id: "ch03-arch",
  category: {
    en: "Enterprise Architecture & Assessment Blueprint",
    el: "Αρχιτεκτονική Επιχείρησης & Στρατηγικό Πλάνο",
  },
  title: {
    en: "Threat Actor Profiling & Automated ATT&CK Matrix Navigator Dashboard",
    el: "Κατάρτιση Προφίλ Δραστών Απειλών & Αυτοματοποιημένος Πίνακας MITRE ATT&CK Navigator",
  },
  subtitle: {
    en: "Threat Intelligence Engineering: STIX/TAXII Parsing, Adversary Emulation Plans, and Threat Attribution",
    el: "Μηχανική Πληροφοριών Απειλών: Ανάλυση STIX/TAXII, Σχέδια Προσομοίωσης Αντιπάλων και Απόδοση Ευθύνης",
  },
  scenario: {
    en: "A Critical National Infrastructure (CNI) consortium in the energy sector is facing coordinated cyber-espionage and ransomware campaigns. You are recruited as Principal Threat Intelligence Architect to build an automated platform that consumes real-time STIX/TAXII feeds, normalizes threat actor TTPs, generates dynamic MITRE ATT&CK heatmaps, and outputs automated adversary emulation plans.",
    el: "Μια κοινοπραξία Κρίσιμων Εθνικών Υποδομών στον ενεργειακό τομέα αντιμετωπίζει συντονισμένες εκστρατείες κυβερνοκατασκοπείας και ransomware. Προσλαμβάνεστε ως Επικεφαλής Αρχιτέκτονας Πληροφοριών Απειλών για να αναπτύξετε μια αυτοματοποιημένη πλατφόρμα που συλλέγει ροές STIX/TAXII, κανονικοποιεί TTPs δραστών, δημιουργεί δυναμικούς χάρτες θερμότητας MITRE ATT&CK και παράγει σχέδια προσομοίωσης αντιπάλων.",
  },
  objectives: {
    en: [
      "Develop a Python engine to connect to public/private TAXII 2.1 servers and parse STIX 2.1 bundles.",
      "Construct a web dashboard that overlays multiple threat actor profiles onto the MITRE ATT&CK matrix.",
      "Calculate adversary TTP similarity scores using Jaccard and Cosine distance algorithms.",
      "Generate automated Atomic Red Team adversary emulation test scripts.",
    ],
    el: [
      "Ανάπτυξη μηχανής Python για σύνδεση σε διακομιστές TAXII 2.1 και επεξεργασία πακέτων STIX 2.1.",
      "Κατασκευή διαδικτυακού πίνακα που επικαλύπτει προφίλ πολλαπλών δραστών στον πίνακα MITRE ATT&CK.",
      "Υπολογισμός δεικτών ομοιότητας TTPs δραστών με αλγορίθμους Jaccard και Cosine distance.",
      "Παραγωγή αυτοματοποιημένων σεναρίων δοκιμών προσομοίωσης αντιπάλων Atomic Red Team.",
    ],
  },
  scope: {
    en: [
      "Threat groups: APT28, APT29, Sandworm, FIN7, Wizard Spider, Lazarus Group.",
      "ATT&CK Enterprise v15 domains (Windows, Linux, Cloud, Identity).",
    ],
    el: [
      "Ομάδες απειλών: APT28, APT29, Sandworm, FIN7, Wizard Spider, Lazarus Group.",
      "Πεδία MITRE ATT&CK Enterprise v15 (Windows, Linux, Cloud, Identity).",
    ],
  },
  milestones: [
    {
      milestoneNumber: 1,
      title: {
        en: "STIX/TAXII Ingestion & Normalization Engine",
        el: "Μηχανή Εισαγωγής & Κανονικοποίησης STIX/TAXII",
      },
      description: {
        en: "Build `taxii_collector.py` to authenticate against TAXII servers, retrieve attack patterns, and store normalized relational graphs in SQLite/PostgreSQL.",
        el: "Ανάπτυξη του `taxii_collector.py` για σύνδεση σε TAXII servers, ανάκτηση attack patterns και αποθήκευση σε βάση δεδομένων.",
      },
      detailedSpec: {
        en: [
          "Design 802.1Q VLAN segmentation separating Management, Corporate, IoT, and Production DB zones.",
          "Specify Software-Defined Perimeter (SDP) architecture enforcing dynamic Zero-Trust network access.",
          "Define IP addressing scheme (RFC 1918) with dedicated transit subnets and strict NAT gateways."
],
        el: [
          "Σχεδιασμός τμηματοποίησης VLAN 802.1Q (Management, Corporate, IoT, Production DB).",
          "Προδιαγραφή αρχιτεκτονικής Software-Defined Perimeter (SDP) για πρόσβαση Zero-Trust.",
          "Ορισμός σχήματος διευθύνσεων IP (RFC 1918) με transit subnets και NAT gateways."
],
      },
      deliverable: {
        en: "Python collector script + normalized relational database schema.",
        el: "Σενάριο συλλογής Python + σχήμα σχεσιακής βάσης δεδομένων.",
      },
    },
    {
      milestoneNumber: 2,
      title: {
        en: "Adversary TTP Analytics & Similarity Engine",
        el: "Μηχανή Αναλυτικής TTPs & Υπολογισμού Ομοιότητας Δραστών",
      },
      description: {
        en: "Implement mathematical similarity metrics comparing technique overlap across nation-state and cybercriminal groups to identify shared infrastructure.",
        el: "Υλοποίηση μαθηματικών δεικτών ομοιότητας για σύγκριση επικάλυψης τεχνικών μεταξύ κρατικών και εγκληματικών ομάδων.",
      },
      detailedSpec: {
        en: [
          "Architect dual-firewall DMZ topology deploying heterogeneous firewall engines.",
          "Define stateful Netfilter/iptables rulesets with default-drop ingress and strict egress egress filtering.",
          "Integrate inline Suricata IPS with dynamic threat intelligence feeds and TLS inspection bypass policies."
],
        el: [
          "Αρχιτεκτονική DMZ διπλού τείχους προστασίας με ετερογενείς μηχανές firewall.",
          "Ορισμός κανόνων Netfilter/iptables με default-drop και αυστηρό egress filtering.",
          "Ενσωμάτωση Suricata IPS inline με ροές threat intelligence."
],
      },
      deliverable: {
        en: "Analytics module + similarity matrix visualization.",
        el: "Υπομονάδα αναλυτικής + οπτικοποίηση πίνακα ομοιότητας.",
      },
    },
    {
      milestoneNumber: 3,
      title: {
        en: "ATT&CK Navigator Dynamic Heatmap Generator",
        el: "Γεννήτρια Δυναμικών Χαρτών Θερμότητας ATT&CK Navigator",
      },
      description: {
        en: "Generate dynamic color-coded ATT&CK layers visualizing technique frequency, detection coverage, and defensive posture gaps.",
        el: "Παραγωγή δυναμικών επιπέδων ATT&CK με χρωματική κωδικοποίηση για συχνότητα τεχνικών και κενά κάλυψης.",
      },
      detailedSpec: {
        en: [
          "Specify IPsec IKEv2 site-to-site VPN tunnels with AES-256-GCM and PFS Diffie-Hellman Group 20.",
          "Configure WireGuard remote-access gateway with Noise protocol encryption and peer public key routing.",
          "Define split-tunneling policies and mandatory endpoint posture validation checks."
],
        el: [
          "Προδιαγραφή VPN tunnels IPsec IKEv2 με AES-256-GCM και PFS Diffie-Hellman Group 20.",
          "Παραμετροποίηση WireGuard gateway με κρυπτογράφηση Noise protocol.",
          "Ορισμός πολιτικών split-tunneling και ελέγχων ασφάλειας τερματικών."
],
      },
      deliverable: {
        en: "Interactive layer generator + exported JSON visual layers.",
        el: "Διαδραστική γεννήτρια επιπέδων + εξαγόμενα αρχεία JSON.",
      },
    },
    {
      milestoneNumber: 4,
      title: {
        en: "Adversary Emulation Playbook & Executive CTI Briefing",
        el: "Εγχειρίδιο Προσομοίωσης Αντιπάλου & Επιτελική Ενημέρωση CTI",
      },
      description: {
        en: "Compile automated test harnesses using Atomic Red Team YAML files and deliver a strategic Threat Intelligence briefing for executive leadership.",
        el: "Σύνταξη αυτοματοποιημένων δοκιμών με αρχεία YAML του Atomic Red Team και παράδοση στρατηγικής ενημέρωσης CTI.",
      },
      detailedSpec: {
        en: [
          "Design network telemetry aggregation pipeline streaming NetFlow/IPFIX and Zeek logs to SIEM.",
          "Implement automated anomaly alerting for DNS tunneling, beaconing, and unauthorized lateral movement.",
          "Construct network resilience matrix detailing BGP failover and DDoS mitigation scrubbers."
],
        el: [
          "Σχεδιασμός αγωγού συλλογής τηλεμετρίας δικτύου με ροές NetFlow/IPFIX και Zeek logs.",
          "Υλοποίηση ειδοποιήσεων ανωμαλιών για DNS tunneling και lateral movement.",
          "Κατασκευή πίνακα ανθεκτικότητας δικτύου με BGP failover και προστασία DDoS."
],
      },
      deliverable: {
        en: "Emulation playbook + strategic CTI executive presentation.",
        el: "Εγχειρίδιο προσομοίωσης + στρατηγική παρουσίαση CTI.",
      },
    },
  ],
  deliverables: {
    en: [
      "Complete Python Platform Codebase (`/src/collector/`, `/src/analytics/`)",
      "Dynamic ATT&CK Navigator Layer Files (`energy_sector_threats.json`)",
      "Adversary Emulation YAML Suite (`emulation_suite/`)",
      "Strategic Cyber Threat Intelligence Dossier (10–12 pages)",
    ],
    el: [
      "Πλήρης Πηγαίος Κώδικας Πλατφόρμας Python (`/src/collector/`, `/src/analytics/`)",
      "Δυναμικά Αρχεία Επιπέδων ATT&CK Navigator (`energy_sector_threats.json`)",
      "Σουίτα Σεναρίων Προσομοίωσης YAML (`emulation_suite/`)",
      "Στρατηγικός Φάκελος Πληροφοριών Κυβερνοαπειλών (10–12 σελίδες)",
    ],
  },
  rubric: [
    {
      criterion: {
        en: "TAXII/STIX Ingestion Architecture & Data Integrity",
        el: "Αρχιτεκτονική Εισαγωγής TAXII/STIX & Ακεραιότητα Δεδομένων",
      },
      weight: "25%",
      description: {
        en: "Robustness of API parsing, schema normalization, and error handling when ingesting malformed STIX bundles.",
        el: "Ανθεκτικότητα ανάλυσης API, κανονικοποίηση σχήματος και διαχείριση σφαλμάτων κατά την εισαγωγή πακέτων STIX.",
      },
    },
    {
      criterion: {
        en: "Mathematical Rigor in Threat Similarity Analytics",
        el: "Μαθηματική Αυστηρότητα στην Αναλυτική Ομοιότητας Απειλών",
      },
      weight: "25%",
      description: {
        en: "Correct algorithmic implementation of Jaccard and Cosine similarity metrics for technique overlap.",
        el: "Ορθή αλγοριθμική υλοποίηση δεικτών ομοιότητας Jaccard και Cosine για επικάλυψη τεχνικών.",
      },
    },
    {
      criterion: {
        en: "ATT&CK Mapping Accuracy & Emulation Viability",
        el: "Ακρίβεια Χαρτογράφησης ATT&CK & Βιωσιμότητα Προσομοίωσης",
      },
      weight: "25%",
      description: {
        en: "Precision of tactic/technique mappings and executable validity of generated Atomic Red Team tests.",
        el: "Ακρίβεια αντιστοίχισης τακτικών/τεχνικών και εκτελεστική εγκυρότητα των δοκιμών Atomic Red Team.",
      },
    },
    {
      criterion: {
        en: "Executive Reporting & Strategic CTI Presentation",
        el: "Επιτελικές Αναφορές & Στρατηγική Παρουσίαση CTI",
      },
      weight: "25%",
      description: {
        en: "Ability to translate technical indicators into business risk insights for non-technical stakeholders.",
        el: "Ικανότητα μετατροπής τεχνικών δεικτών σε επιχειρηματική κατανόηση κινδύνου για διοικητικά στελέχη.",
      },
    },
  ],
};

export const ch03Quiz: QuizQuestion[] = [
  {
    id: 1,
    question: {
      en: "At which layer of the OSI model does an Address Resolution Protocol (ARP) spoofing attack operate?",
      el: "Σε ποιο επίπεδο του μοντέλου OSI λειτουργεί μια επίθεση πλαστογράφησης ARP (ARP spoofing);",
    },
    options: {
      en: [
        "Layer 1 (Physical Layer), by altering electrical signal voltage across copper cables.",
        "Layer 3 (Network Layer), by injecting forged BGP autonomous system routing attributes.",
        "Layer 4 (Transport Layer), by manipulating TCP sequence numbers to hijack active sessions.",
        "Layer 2 (Data Link Layer), by poisoning local MAC-to-IP address mapping cache tables.",
        "Layer 7 (Application Layer), by injecting malicious JavaScript payloads into HTTP headers.",
      ],
      el: [
        "Επίπεδο 1 (Φυσικό Επίπεδο), αλλάζοντας την τάση των ηλεκτρικών σημάτων στα καλώδια χαλκού.",
        "Επίπεδο 3 (Επίπεδο Δικτύου), εισάγοντας πλαστά χαρακτηριστικά δρομολόγησης BGP αυτόνομων συστημάτων.",
        "Επίπεδο 4 (Επίπεδο Μεταφοράς), τροποποιώντας αριθμούς ακολουθίας TCP για υποκλοπή ενεργών συνόδων.",
        "Επίπεδο 2 (Επίπεδο Συνδέσμου Δεδομένων), δηλητηριάζοντας τους τοπικούς πίνακες αντιστοίχισης MAC προς IP.",
        "Επίπεδο 7 (Επίπεδο Εφαρμογής), εισάγοντας κακόβουλο κώδικα JavaScript σε κεφαλίδες αιτημάτων HTTP.",
      ],
    },
    correctIndex: 3,
    explanation: {
      en: "ARP operates at Layer 2 (Data Link Layer) to resolve IPv4 addresses to MAC addresses on local Ethernet broadcast domains.",
      el: "Το ARP λειτουργεί στο Επίπεδο 2 (Συνδέσμου Δεδομένων) για την αντιστοίχιση διευθύνσεων IPv4 σε διευθύνσεις MAC στο τοπικό δίκτυο.",
    },
  },
  {
    id: 2,
    question: {
      en: "How does TLS 1.3 significantly improve handshake latency and security compared to TLS 1.2?",
      el: "Πώς βελτιώνει το TLS 1.3 την καθυστέρηση χειραψίας και την ασφάλεια σε σύγκριση με το TLS 1.2;",
    },
    options: {
      en: [
        "By replacing all symmetric ciphers with unencrypted UDP datagram broadcasts across the WAN, during standard continuous monitoring and administrative audits.",
        "By removing the need for server digital certificates through mandatory client biometric verification, using standardized organizational security policy configurations.",
        "By forcing all clients to use 4096-bit RSA static key exchange rather than ephemeral Diffie\u2013Hellman, across distributed multi-region cloud production environments.",
        "By routing all encrypted traffic through third-party root certificate authority proxy servers, without requiring manual intervention from systems engineering staff.",
        "By reducing the full handshake to a single round-trip (1-RTT) and eliminating legacy insecure ciphers.",
      ],
      el: [
        "Αντικαθιστώντας όλους τους συμμετρικούς αλγορίθμους με μη κρυπτογραφημένη εκπομπή datagrams UDP, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Καταργώντας την ανάγκη ψηφιακών πιστοποιητικών διακομιστή μέσω υποχρεωτικής βιομετρικής ταυτοποίησης, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Επιβάλλοντας σε όλους τους πελάτες στατική ανταλλαγή RSA 4096-bit αντί για εφήμερο Diffie–Hellman, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Δρομολογώντας όλη την κρυπτογραφημένη κίνηση μέσω ενδιάμεσων διακομιστών proxy των Αρχών Πιστοποίησης, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Μειώνοντας την πλήρη χειραψία σε έναν μόνο κύκλο (1-RTT) και καταργώντας απαρχαιωμένα ανασφαλή ciphers.",
      ],
    },
    correctIndex: 4,
    explanation: {
      en: "TLS 1.3 cuts handshake latency from 2-RTT to 1-RTT (with 0-RTT resumption) and removes insecure legacy algorithms like RSA key exchange, RC4, and SHA-1.",
      el: "Το TLS 1.3 μειώνει την καθυστέρηση χειραψίας σε 1-RTT (με υποστήριξη 0-RTT) και αφαιρεί επισφαλή ciphers όπως στατικό RSA, RC4 και SHA-1.",
    },
  },
  {
    id: 3,
    question: {
      en: "What primary vulnerability in the Domain Name System (DNS) does DNSSEC effectively mitigate?",
      el: "Ποια βασική ευπάθεια του Συστήματος Ονομάτων Χώρου (DNS) αντιμετωπίζει αποτελεσματικά το DNSSEC;",
    },
    options: {
      en: [
        "DNS cache poisoning and spoofing, through cryptographic digital signatures on resource records.",
        "DNS amplification volumetric floods directed against authoritative nameservers, to ensure high-availability operational compliance across systems.",
        "Physical tapping of transatlantic fiber-optic subsea telecommunication cables, across distributed multi-region cloud production environments.",
        "Unauthorized administrative login brute-forcing on domain registrar control panels, without requiring manual intervention from systems engineering staff.",
        "Software memory buffer overflows within local recursive caching resolver daemons, to mitigate potential unauthorized system configuration drift.",
      ],
      el: [
        "Δηλητηρίαση προσωρινής μνήμης (cache poisoning) και πλαστογράφηση, μέσω ψηφιακών υπογραφών.",
        "Ογκομετρικές επιθέσεις ενίσχυσης DNS (DNS amplification) κατά έγκυρων διακομιστών ονομάτων, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Φυσική υποκλοπή σημάτων σε υπερατλαντικά υποβρύχια καλώδια οπτικών ινών τηλεπικοινωνιών, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Επιθέσεις εξαντλητικής αναζήτησης κωδικών πρόσβασης σε πίνακες διαχείρισης καταχωρητών domain, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Υπερχειλίσεις μνήμης buffer σε τοπικές υπηρεσίες αναδρομικής επίλυσης ονομάτων DNS, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "DNSSEC adds cryptographic signatures (RRSIG) to DNS records, enabling resolvers to verify authenticity and integrity, preventing DNS cache poisoning.",
      el: "Το DNSSEC προσθέτει κρυπτογραφικές υπογραφές (RRSIG) στις εγγραφές DNS, επιτρέποντας στους επιλυτές να επαληθεύουν την αυθεντικότητα και να αποτρέπουν το cache poisoning.",
    },
  },
  {
    id: 4,
    question: {
      en: "How does a stateful inspection firewall evaluate incoming network packets compared to a stateless packet filter?",
      el: "Πώς αξιολογεί τα εισερχόμενα πακέτα ένα stateful firewall σε σύγκριση με ένα stateless φίλτρο πακέτων;",
    },
    options: {
      en: [
        "Stateful firewalls inspect individual packets in total isolation without tracking connection contexts, using standardized organizational security policy configurations.",
        "Stateful firewalls track the state of active connections, evaluating packets against established flows.",
        "Stateful firewalls decrypt all end-to-end encrypted TLS application payloads using hardcoded CA keys, without requiring manual intervention from systems engineering staff.",
        "Stateful firewalls operate exclusively on Layer 2 MAC addresses, ignoring all IP and TCP header data, to mitigate potential unauthorized system configuration drift.",
        "Stateful firewalls replace standard routing tables with proprietary quantum random number filters, in accordance with modern zero trust architectural principles.",
      ],
      el: [
        "Τα stateful firewalls ελέγχουν κάθε πακέτο μεμονωμένα χωρίς να παρακολουθούν το πλαίσιο της σύνδεσης, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Τα stateful firewalls παρακολουθούν την κατάσταση των ενεργών συνδέσεων, αξιολογώντας ροές πακέτων.",
        "Τα stateful firewalls αποκρυπτογραφούν όλα τα δεδομένα TLS χρησιμοποιώντας ενσωματωμένα κλειδιά CA, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Τα stateful firewalls λειτουργούν αποκλειστικά σε επίπεδο MAC Layer 2, αγνοώντας κεφαλίδες IP και TCP, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Τα stateful firewalls αντικαθιστούν τους πίνακες δρομολόγησης με ιδιόκτητα κβαντικά φίλτρα τυχαιότητας, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Stateful firewalls maintain a state table of active TCP/UDP connections. They allow returning traffic that belongs to an established, recognized session without requiring open static ports.",
      el: "Τα stateful firewalls διατηρούν πίνακα ενεργών συνδέσεων TCP/UDP. Επιτρέπουν αυτόματα την επιστροφή απαντήσεων που ανήκουν σε ήδη εγκεκριμένη σύνοδο.",
    },
  },
  {
    id: 5,
    question: {
      en: "What operational mechanism does a signature-based Network Intrusion Detection System (NIDS) employ to detect malicious traffic?",
      el: "Ποιο μηχανισμό λειτουργίας χρησιμοποιεί ένα σύστημα NIDS βασισμένο σε υπογραφές για τον εντοπισμό κακόβουλης κίνησης;",
    },
    options: {
      en: [
        "It executes all incoming binary files inside an isolated bare-metal hypervisor before forwarding packets.",
        "It dynamically rewrites border gateway protocol routing tables to isolate entire autonomous systems.",
        "It matches network packet payloads and header sequences against a database of known threat patterns.",
        "It re-encrypts all local area network transmissions using ephemeral post-quantum lattice primitives.",
        "It permanently blocks all IP addresses originating from residential internet service provider subnets.",
      ],
      el: [
        "Εκτελεί όλα τα εισερχόμενα δυαδικά αρχεία σε απομονωμένο hypervisor πριν από την προώθηση των πακέτων.",
        "Επαναδρομολογεί δυναμικά τους πίνακες BGP για να απομονώσει ολόκληρα αυτόνομα συστήματα δικτύου.",
        "Συγκρίνει τα περιεχόμενα πακέτων και τις κεφαλίδες με μια βάση δεδομένων γνωστών μοτίβων απειλών.",
        "Επανακρυπτογραφεί όλες τις τοπικές μεταδόσεις δεδομένων με μετα-κβαντικούς αλγορίθμους πλεγμάτων.",
        "Μπλοκάρει μόνιμα όλες τις διευθύνσεις IP που προέρχονται από οικιακούς παρόχους διαδικτύου.",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "Signature-based NIDS (e.g. Suricata, Snort) scans packets for predefined byte sequences, regular expressions, and protocol anomalies that match known exploit patterns.",
      el: "Τα NIDS βασισμένα σε υπογραφές (π.χ. Suricata, Snort) σαρώνουν πακέτα αναζητώντας προκαθορισμένα μοτίβα bytes και ανωμαλίες που αντιστοιχούν σε γνωστές επιθέσεις.",
    },
  },
  {
    id: 6,
    question: {
      en: "What is the foundational security principle of a Zero Trust Architecture (ZTA)?",
      el: "Ποια είναι η θεμελιώδης αρχή ασφάλειας μιας Αρχιτεκτονικής Μηδενικής Εμπιστοσύνης (Zero Trust Architecture);",
    },
    options: {
      en: [
        "Trust all internal network traffic once an endpoint has successfully connected to the corporate VPN.",
        "Block all outbound internet access for enterprise workstation nodes regardless of business roles, in accordance with modern zero trust architectural principles.",
        "Require physical hardware security tokens for unencrypted local local-area network broadcast calls.",
        "Never trust, always verify: every access request must be authenticated, authorized, and encrypted.",
        "Delegate all perimeter access control decisions to external internet service provider edge routers.",
      ],
      el: [
        "Εμπιστοσύνη σε όλη την εσωτερική κίνηση δικτύου εφόσον η συσκευή έχει συνδεθεί στο εταιρικό VPN.",
        "Πλήρης αποκλεισμός εξωτερικής πρόσβασης στο διαδίκτυο για όλους τους σταθμούς εργασίας ανεξαιρέτως, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Απαίτηση φυσικών κλειδιών ασφαλείας για μη κρυπτογραφημένες τοπικές κλήσεις εκπομπής (broadcast).",
        "Ποτέ μην εμπιστεύεσαι, πάντα να επαληθεύεις: κάθε αίτημα πρέπει να ταυτοποιείται, να εγκρίνεται και να κρυπτογραφείται.",
        "Ανάθεση όλων των αποφάσεων ελέγχου πρόσβασης στους δρομολογητές του εξωτερικού παρόχου internet.",
      ],
    },
    correctIndex: 3,
    explanation: {
      en: "Zero Trust operates under 'never trust, always verify'. It removes implicit trust based on network location, enforcing continuous verification and micro-segmentation.",
      el: "Το Zero Trust επιβάλλει 'never trust, always verify'. Εξαλείφει την τυφλή εμπιστοσύνη βάσει τοποθεσίας δικτύου, απαιτώντας συνεχή αυθεντικοποίηση και μικρο-κατάτμηση.",
    },
  },
  {
    id: 7,
    question: {
      en: "How does a TCP SYN Flood attack exhaust target server resources during the transport layer handshake?",
      el: "Πώς εξαντλεί τους πόρους του διακομιστή-στόχου μια επίθεση TCP SYN Flood κατά τη χειραψία επιπέδου μεταφοράς;",
    },
    options: {
      en: [
        "By corrupting DNS zone transfer files to redirect domain queries to rogue recursive resolvers, to mitigate potential unauthorized system configuration drift.",
        "By saturating physical Ethernet switch ports with broadcast ARP request frames across all subnets, before committing changes to central production repository nodes.",
        "By establishing millions of fully completed TLS 1.3 sessions that remain idle indefinitely, under standard operating procedures defined in corporate ISMS policies.",
        "By exploiting unpatched buffer overflow flaws in the remote server operating system kernel scheduler, across all internal enterprise network segments and endpoints.",
        "By sending high volumes of SYN packets with spoofed IPs, filling the server half-open connection queue.",
      ],
      el: [
        "Αλλοιώνοντας τα αρχεία μεταφοράς ζώνης DNS για ανακατεύθυνση των ερωτημάτων σε κακόβουλους επιλυτές, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Υπερφορτώνοντας τις θύρες των Ethernet switches με πακέτα εκπομπής ARP σε όλα τα υποδίκτυα, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Δημιουργώντας εκατομμύρια πλήρως ολοκληρωμένες συνόδους TLS 1.3 που παραμένουν αδρανείς επ' άπειρον, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Εκμεταλλευόμενη κενά υπερχείλισης μνήμης buffer στον χρονοπρογραμματιστή του λειτουργικού συστήματος, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Στέλνοντας τεράστιο όγκο πακέτων SYN με πλαστές IP, γεμίζοντας την ουρά ημι-ανοικτών συνδέσεων (SYN queue).",
      ],
    },
    correctIndex: 4,
    explanation: {
      en: "In a SYN flood, the attacker sends SYN packets without completing the final ACK. The server allocates resources for each half-open connection in its SYN backlog queue until memory is exhausted.",
      el: "Στο SYN flood, ο επιτιθέμενος στέλνει πακέτα SYN χωρίς να στείλει το τελικό ACK. Ο διακομιστής δεσμεύει πόρους για κάθε ημι-ανοικτή σύνδεση μέχρι να εξαντληθεί η ουρά (backlog).",
    },
  },
  {
    id: 8,
    question: {
      en: "What is the primary architectural purpose of deploying a Demilitarized Zone (DMZ) in enterprise network security?",
      el: "Ποιος είναι ο κύριος αρχιτεκτονικός σκοπός της δημιουργίας μιας Αποστρατιωτικοποιημένης Ζώνης (DMZ) στην ασφάλεια δικτύων;",
    },
    options: {
      en: [
        "To host public-facing services in an isolated subnet, protecting internal corporate systems if compromised.",
        "To accelerate internal local area network data transfer speeds by removing all firewall routing rules, before committing changes to central production repository nodes.",
        "To replace traditional symmetric encryption with automated quantum key distribution backbones, under standard operating procedures defined in corporate ISMS policies.",
        "To permit external contractors unauthenticated access to internal financial database clusters, across all internal enterprise network segments and endpoints.",
        "To consolidate all employee workstation endpoints into a single flat Layer 2 broadcast network domain, during standard continuous monitoring and administrative audits.",
      ],
      el: [
        "Να φιλοξενεί δημόσια προσβάσιμες υπηρεσίες σε απομονωμένο υποδίκτυο, προστατεύοντας το εσωτερικό δίκτυο.",
        "Να επιταχύνει τη μεταφορά δεδομένων στο τοπικό δίκτυο καταργώντας όλους τους κανόνες δρομολόγησης firewall, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Να αντικαταστήσει την κλασική συμμετρική κρυπτογράφηση με αυτοματοποιημένα κβαντικά κανάλια διανομής, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Να επιτρέπει σε εξωτερικούς συνεργάτες πρόσβαση σε εσωτερικές βάσεις χωρίς ταυτοποίηση, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Να συγκεντρώσει όλους τους σταθμούς εργασίας των υπαλλήλων σε ένα ενιαίο επίπεδο δίκτυο Layer 2, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "A DMZ acts as a perimeter buffer zone holding public-facing servers (web, mail, DNS). If a DMZ host is breached, the firewall prevents lateral movement into the internal trusted LAN.",
      el: "Η DMZ λειτουργεί ως ενδιάμεση ζώνη απομόνωσης για δημόσιες υπηρεσίες. Εάν ένας διακομιστής στην DMZ παραβιαστεί, το τείχος προστασίας αποτρέπει την πλευρική μετακίνηση στο εσωτερικό LAN.",
    },
  },
  {
    id: 9,
    question: {
      en: "How does BGP Hijacking allow malicious actors to intercept or reroute global internet traffic?",
      el: "Πώς επιτρέπει η υποκλοπή BGP (BGP Hijacking) σε κακόβουλους δράστες να ανακατευθύνουν παγκόσμια κίνηση διαδικτύου;",
    },
    options: {
      en: [
        "By compromising root certificate authority private keys to decrypt fiber-optic communications in transit, under standard operating procedures defined in corporate ISMS policies.",
        "By injecting falsified route prefix announcements into the Border Gateway Protocol without valid authorization.",
        "By generating malformed ARP reply packets across global wide area network undersea telecommunication cables, across all internal enterprise network segments and endpoints.",
        "By exhausting CPU cycles on authoritative DNS servers through high-volume recursive query reflection attacks, during standard continuous monitoring and administrative audits.",
        "By modifying client operating system host files via compromised web browser JavaScript runtime engines, to ensure high-availability operational compliance across systems.",
      ],
      el: [
        "Υποκλέπτοντας ιδιωτικά κλειδιά Root CA για αποκρυπτογράφηση διεθνών επικοινωνιών οπτικών ινών, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Δημοσιεύοντας ψευδείς ανακοινώσεις προθεμάτων IP (route prefixes) στο πρωτόκολλο BGP χωρίς εξουσιοδότηση.",
        "Παράγοντας κακοσχηματισμένα πακέτα απαντήσεων ARP σε υποθαλάσσια καλώδια δικτύων ευρείας περιοχής, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Εξαντλώντας τους κύκλους CPU σε έγκυρους διακομιστές DNS μέσω ανακλώμενων αναδρομικών ερωτημάτων, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Τροποποιώντας τα αρχεία hosts των λειτουργικών συστημάτων μέσω ευπαθειών JavaScript στον περιηγητή, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "BGP relies heavily on trust between Autonomous Systems (AS). Attackers announce unauthorized IP prefixes (more specific routes), causing global routers to direct legitimate traffic to the rogue AS.",
      el: "Το BGP βασίζεται στην εμπιστοσύνη μεταξύ Αυτόνομων Συστημάτων. Οι επιτιθέμενοι ανακοινώνουν μη εξουσιοδοτημένα προθέματα IP, κάνοντας τους δρομολογητές να στέλνουν την κίνηση στον επιτιθέμενο.",
    },
  },
  {
    id: 10,
    question: {
      en: "What network telemetry protocol is specifically used to export summary flow statistics (IPs, ports, packet counts) from network devices to central collectors?",
      el: "Ποιο πρωτόκολλο τηλεμετρίας δικτύου χρησιμοποιείται για την εξαγωγή στατιστικών ροών (IPs, θύρες, πλήθος πακέτων) σε κεντρικούς συλλέκτες;",
    },
    options: {
      en: [
        "Border Gateway Protocol (BGP), advertising path vector reachability information across autonomous domains.",
        "Dynamic Host Configuration Protocol (DHCP), assigning dynamic network addressing parameters to clients.",
        "NetFlow / IPFIX, exporting flow records detailing source/destination endpoints and byte statistics.",
        "Simple Mail Transfer Protocol (SMTP), routing formatted email messages across mail transfer agents.",
        "Spanning Tree Protocol (STP), preventing bridge loops across redundant Layer 2 switched networks, using standardized organizational security policy configurations.",
      ],
      el: [
        "Border Gateway Protocol (BGP), διαφημίζοντας πληροφορίες προσβασιμότητας μεταξύ αυτόνομων συστημάτων.",
        "Dynamic Host Configuration Protocol (DHCP), αποδίδοντας δυναμικές ρυθμίσεις διευθύνσεων σε υπολογιστές.",
        "NetFlow / IPFIX, εξάγοντας εγγραφές ροών με διευθύνσεις προέλευσης/προορισμού και στατιστικά bytes.",
        "Simple Mail Transfer Protocol (SMTP), δρομολογώντας μηνύματα ηλεκτρονικού ταχυδρομείου σε πράκτορες.",
        "Spanning Tree Protocol (STP), αποτρέποντας βρόχους μεταγωγής σε δίκτυα Ethernet επιπέδου Layer 2, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "NetFlow and IPFIX export aggregated metadata about network flows (5-tuple: src/dst IP, src/dst port, protocol, plus packet/byte counts) for bandwidth monitoring and security analytics.",
      el: "Τα πρωτόκολλα NetFlow και IPFIX εξάγουν συγκεντρωτικά μεταδεδομένα ροών δικτύου (IPs, θύρες, πρωτόκολλο, όγκος πακέτων) για παρακολούθηση ασφάλειας και ανάλυση ανωμαλιών.",
    },
  },
];

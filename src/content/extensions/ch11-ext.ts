import type { CliLab, HandsOnLab, TechnicalProject, QuizQuestion } from "../types";

export const ch11CliLab: CliLab = {
  id: "ch11-cli",
  title: {
    en: "SOC SIEM Telemetry & Incident Containment Sandbox",
    el: "Προσομοιωτής Τηλεμετρίας SIEM SOC & Περιορισμού Περιστατικών",
  },
  scenario: {
    en: "Query Windows Security Event logs for credential access anomalies, match Sigma detection rules against Sysmon logs, search SIEM indices for encoded PowerShell execution, and execute endpoint containment isolation.",
    el: "Αναζητήστε συμβάντα ασφάλειας των Windows για απόπειρες υποκλοπής διαπιστευτηρίων, εκτελέστε κανόνες Sigma σε Sysmon logs, αναζητήστε κωδικοποιημένο PowerShell και απομονώστε το παραβιασμένο τερματικό.",
  },
  initialPrompt: "analyst@soc-tier2:~$",
  banner: {
    en: "=== Chapter 11 Detection & Incident Response Sandbox ===\nActive Incident: INC-8840 | Target: Host WS-FINANCE-04\nType 'help' for command assistance or follow the missions below.",
    el: "=== Εργαστήριο Ανίχνευσης & Απόκρισης Περιστατικών Κεφαλαίου 11 ===\nΕνεργό Περιστατικό: INC-8840 | Στόχος: Τερματικό WS-FINANCE-04\nΠληκτρολογήστε 'help' για βοήθεια ή ακολουθήστε τις παρακάτω αποστολές.",
  },
  fileSystem: {
    "/var/log/siem/auth.log": "2026-09-28T10:12:00Z EventID: 4625 Status: 0xC000006D User: admin\n2026-09-28T10:12:05Z EventID: 4625 Status: 0xC000006D User: admin\n2026-09-28T10:14:22Z EventID: 4688 Image: powershell.exe CommandLine: -enc SQBFAFgA...",
    "/var/log/sysmon.log": "Sysmon Event 10: ProcessAccess Source: procdump.exe Target: lsass.exe GrantedAccess: 0x1010",
    "rules/win_lsass_dump.yml": "title: LSASS Memory Dump Detection\nlogsource:\n  category: process_access\n  product: windows\ndetection:\n  selection:\n    TargetImage|endswith: '\\lsass.exe'\n  condition: selection",
  },
  tasks: [
    {
      id: "task-1",
      title: {
        en: "Filter Security Event Logs for Failed Logons",
        el: "Φιλτράρισμα Αρχείων Συμβάντων για Αποτυχημένες Συνδέσεις",
      },
      description: {
        en: "Query `/var/log/siem/auth.log` for failed Windows logon EventID 4625 using `grep`.",
        el: "Αναζητήστε στο `/var/log/siem/auth.log` αποτυχημένες συνδέσεις EventID 4625 με το `grep`.",
      },
      hint: {
        en: 'Execute: grep -E "EventID: 4625" /var/log/siem/auth.log',
        el: 'Εκτελέστε: grep -E "EventID: 4625" /var/log/siem/auth.log',
      },
      solution: 'grep -E "EventID: 4625" /var/log/siem/auth.log',
      validateRegex: "grep.*4625",
      successMessage: {
        en: "Event logs filtered: Multiple brute-force attempts detected against user `admin`.",
        el: "Τα logs φιλτραρίστηκαν: Εντοπίστηκαν μαζικές απόπειρες brute-force στον χρήστη `admin`.",
      },
    },
    {
      id: "task-2",
      title: {
        en: "Execute Sigma Detection Rule for Credential Dumping",
        el: "Εκτέλεση Κανόνα Sigma για Εντοπισμό Credential Dumping",
      },
      description: {
        en: "Evaluate Sigma rule `rules/win_lsass_dump.yml` against `/var/log/sysmon.log` using `sigma-cli`.",
        el: "Εκτελέστε τον κανόνα Sigma `rules/win_lsass_dump.yml` στο αρχείο `/var/log/sysmon.log` με το `sigma-cli`.",
      },
      hint: {
        en: "Execute: sigma-cli check -r rules/win_lsass_dump.yml /var/log/sysmon.log",
        el: "Εκτελέστε: sigma-cli check -r rules/win_lsass_dump.yml /var/log/sysmon.log",
      },
      solution: "sigma-cli check -r rules/win_lsass_dump.yml /var/log/sysmon.log",
      validateRegex: "sigma.*lsass_dump",
      successMessage: {
        en: "SIGMA MATCH: High severity alert! Detected LSASS process memory access by `procdump.exe`.",
        el: "ΕΠΙΤΥΧΗΣ ΑΝΙΧΝΕΥΣΗ SIGMA: Ειδοποίηση υψηλής κρισιμότητας! Πρόσβαση στη μνήμη του LSASS από το `procdump.exe`.",
      },
    },
    {
      id: "task-3",
      title: {
        en: "Query SIEM Index for Obfuscated PowerShell Executions",
        el: "Αναζήτηση στο SIEM για Εκτέλεση Συσκοτισμένου PowerShell",
      },
      description: {
        en: "Search the SIEM index for PowerShell executing Base64 encoded commands (`-enc`) using `elastic-query`.",
        el: "Αναζητήστε στο ευρετήριο SIEM εκτελέσεις PowerShell με κωδικοποίηση Base64 (`-enc`) με το `elastic-query`.",
      },
      hint: {
        en: 'Execute: elastic-query --index win-events --query "process.name:powershell.exe AND process.args:-enc"',
        el: 'Εκτελέστε: elastic-query --index win-events --query "process.name:powershell.exe AND process.args:-enc"',
      },
      solution: 'elastic-query --index win-events --query "process.name:powershell.exe AND process.args:-enc"',
      validateRegex: "elastic-query.*powershell",
      successMessage: {
        en: "SIEM query returned hit: Host `WS-FINANCE-04` executed encoded IEX download cradle.",
        el: "Το ερώτημα SIEM εντόπισε συμβάν: Το τερματικό `WS-FINANCE-04` εκτέλεσε κωδικοποιημένο IEX download cradle.",
      },
    },
    {
      id: "task-4",
      title: {
        en: "Execute EDR Host Containment Action",
        el: "Εκτέλεση Ενέργειας Απομόνωσης Τερματικού (Host Containment)",
      },
      description: {
        en: "Isolate compromised host `WS-FINANCE-04` from the network to prevent lateral movement using `isolate-host`.",
        el: "Απομονώστε το παραβιασμένο τερματικό `WS-FINANCE-04` από το δίκτυο με την εντολή `isolate-host`.",
      },
      hint: {
        en: "Execute: isolate-host WS-FINANCE-04",
        el: "Εκτελέστε: isolate-host WS-FINANCE-04",
      },
      solution: "isolate-host WS-FINANCE-04",
      validateRegex: "isolate-host\\s+WS-FINANCE-04",
      successMessage: {
        en: "HOST ISOLATED: Network traffic severed on WS-FINANCE-04; lateral movement halted.",
        el: "ΤΟ ΤΕΡΜΑΤΙΚΟ ΑΠΟΜΟΝΩΘΗΚΕ: Η δικτυακή κίνηση στο WS-FINANCE-04 διακόπηκε επιτυχώς.",
      },
    },
  ],
};

export const ch11HandsOnLab: HandsOnLab = {
  title: {
    en: "Hands-on SOC Incident Response: Live Ransomware Intrusion Triage, Root Cause Analysis & Containment",
    el: "Πρακτική Απόκριση Περιστατικών SOC: Διαλογή Εισβολής Ransomware, Ανάλυση Αιτίου & Περιορισμός",
  },
  subtitle: {
    en: "2-Hour Practical Lab: NIST SP 800-61r2 Lifecycle, SIEM Log Correlation, EDR Host Isolation, and Post-Incident Timeline Reconstruction",
    el: "Εργαστήριο 2 Ωρών: Κύκλος Ζωής NIST SP 800-61r2, Συσχέτιση Logs στο SIEM, Απομόνωση EDR και Ανακατασκευή Χρονολογίου",
  },
  duration: {
    en: "~2 Hours (120 minutes)",
    el: "~2 Ώρες (120 λεπτά)",
  },
  overview: {
    en: "In this 2-hour technical laboratory, students take on the role of a Tier-2/Tier-3 Incident Response Lead in an enterprise Security Operations Center (SOC). Responding to an active LockBit ransomware outbreak spreading across the corporate subnet, you will execute the NIST SP 800-61r2 Incident Response Lifecycle: ingest and correlate telemetry across SIEM logs (Sysmon/Windows Event Viewer), conduct threat hunting queries using Sigma rules, isolate patient-zero endpoints via EDR commands, eradicate persistence artifacts, and author an executive root-cause post-mortem timeline.",
    el: "Σε αυτό το εργαστήριο 2 ωρών, οι φοιτητές αναλαμβάνουν τον ρόλο Επικεφαλής Απόκρισης σε Περιστατικά (Incident Response Lead Tier-2/Tier-3) σε ένα εταιρικό SOC. Αντιμετωπίζοντας μια ενεργή εξάπλωση ransomware LockBit στο εσωτερικό δίκτυο, θα εφαρμόσετε τον κύκλο ζωής NIST SP 800-61r2: συσχέτιση τηλεμετρίας στο SIEM (Sysmon/Event Logs), προληπτική αναζήτηση απειλών με κανόνες Sigma, απομόνωση του πρώτου μολυσμένου συστήματος (patient zero) μέσω EDR, εξάλειψη μηχανισμών επιμονής και ανακατασκευή χρονολογίου για την τελική έκθεση.",
  },
  environment: [
    "SOC Workstation with Python 3.11, jq, Elasticsearch/OpenSearch client tools",
    "Security Information and Event Management (SIEM) log archive (`/var/log/soc_incident/`)",
    "Sigma CLI converter & compiler (`sigma-cli`, `pySigma`)",
    "Timeline generator toolset (`log2timeline`, `plasm-cli`, `timesketch`)",
  ],
  phases: [
    {
      phaseNumber: 1,
      title: {
        en: "Alert Triage, Severity Scoping & Initial Telemetry Ingestion",
        el: "Διαλογή Ειδοποιήσεων, Εκτίμηση Σοβαρότητας & Εισαγωγή Τηλεμετρίας",
      },
      estimatedTime: { en: "25 min", el: "25 λεπτά" },
      objectives: {
        en: [
          "Ingest SIEM telemetry and identify initial trigger alerts (multiple failed logons, unexpected LSASS memory access).",
          "Classify incident severity as SEV-1 (Critical Enterprise Threat).",
          "Identify patient zero hostname (`WS-FINANCE-04`) and compromised user account (`CORP\\jdoe`).",
        ],
        el: [
          "Εισαγωγή τηλεμετρίας SIEM και εντοπισμός αρχικών ειδοποιήσεων (αποτυχημένες συνδέσεις, πρόσβαση στο LSASS).",
          "Κατηγοριοποίηση σοβαρότητας ως SEV-1 (Κρίσιμη Απειλή).",
          "Εντοπισμός του αρχικού συστήματος μόλυνσης (`WS-FINANCE-04`) και του παραβιασμένου λογαριασμού (`CORP\\jdoe`).",
        ],
      },
      steps: {
        en: [
          "1. Inspect initial SOC alert stream:\n```bash\ncat /var/log/soc_incident/alerts.json | jq '.[] | select(.severity==\"critical\")'\n```",
          "2. Query logon history for `CORP\\jdoe` around 10:00 UTC:\n```bash\ngrep -E 'jdoe|4624|4625' /var/log/soc_incident/security_events.log | head -n 20\n```",
          "3. Initialize the formal Incident Ticket and declare Incident Command.",
        ],
        el: [
          "1. Έλεγχος των ειδοποιήσεων του SOC:\n```bash\ncat /var/log/soc_incident/alerts.json | jq '.[] | select(.severity==\"critical\")'\n```",
          "2. Αναζήτηση ιστορικού συνδέσεων του χρήστη `CORP\\jdoe`:\n```bash\ngrep -E 'jdoe|4624|4625' /var/log/soc_incident/security_events.log | head -n 20\n```",
          "3. Δημιουργία επίσημου δελτίου συμβάντος και ενεργοποίηση της ομάδας διαχείρισης κρίσεων.",
        ],
      },
    },
    {
      phaseNumber: 2,
      title: {
        en: "Threat Hunting & Lateral Movement Path Reconstruction",
        el: "Προληπτική Αναζήτηση Απειλών & Ιχνηλάτηση Πλευρικής Μετακίνησης",
      },
      estimatedTime: { en: "45 min", el: "45 λεπτά" },
      objectives: {
        en: [
          "Trace lateral movement over SMB/WMI (PsExec / EventID 4688 / Sysmon EventID 1).",
          "Detect privilege escalation to Domain Admin via dumped NTDS.dit credentials.",
          "Map attacker movement across secondary financial servers (`SRV-LEDGER-01`, `SRV-BACKUP-02`).",
        ],
        el: [
          "Ιχνηλάτηση πλευρικής μετακίνησης μέσω SMB/WMI (EventID 4688, Sysmon EventID 1).",
          "Ανίχνευση κλιμάκωσης προνομίων σε Domain Admin μέσω υποκλοπής του NTDS.dit.",
          "Χαρτογράφηση μετακίνησης του επιτιθέμενου σε δευτερεύοντες διακομιστές.",
        ],
      },
      steps: {
        en: [
          "1. Hunt for remote service creation (EventID 7045 / 4697):\n```bash\ngrep -E '7045|PSEXESVC' /var/log/soc_incident/system_events.log\n```",
          "2. Identify PowerShell script block logging (EventID 4104) containing obfuscated commands:\n```bash\ngrep -A 5 -E 'ScriptBlockText' /var/log/soc_incident/powershell_events.log\n```",
          "3. Reconstruct the lateral movement graph linking patient zero to the domain controller.",
        ],
        el: [
          "1. Αναζήτηση απομακρυσμένης δημιουργίας υπηρεσιών (EventID 7045):\n```bash\ngrep -E '7045|PSEXESVC' /var/log/soc_incident/system_events.log\n```",
          "2. Εντοπισμός καταγραφών σεναρίων PowerShell (EventID 4104) με συσκοτισμένες εντολές:\n```bash\ngrep -A 5 -E 'ScriptBlockText' /var/log/soc_incident/powershell_events.log\n```",
          "3. Σχεδίαση του γραφήματος πλευρικής μετακίνησης από το αρχικό τερματικό προς τον domain controller.",
        ],
      },
    },
    {
      phaseNumber: 3,
      title: {
        en: "Host Containment, Credential Revocation & Threat Eradication",
        el: "Απομόνωση Τερματικών, Ανάκληση Διαπιστευτηρίων & Εξάλειψη Απειλής",
      },
      estimatedTime: { en: "30 min", el: "30 λεπτά" },
      objectives: {
        en: [
          "Issue EDR network isolation commands across 3 compromised endpoints.",
          "Revoke active Kerberos ticket-granting tickets (TGT) and force enterprise-wide password resets for compromised accounts (KRBTGT password reset).",
          "Block external C2 IP addresses on perimeter firewalls.",
        ],
        el: [
          "Έκδοση εντολών δικτυακής απομόνωσης EDR στα 3 παραβιασμένα συστήματα.",
          "Ανάκληση εισιτηρίων Kerberos TGT και καθολική επαναφορά κωδικού του λογαριασμού KRBTGT.",
          "Αποκλεισμός διευθύνσεων C2 στο περιμετρικό firewall.",
        ],
      },
      steps: {
        en: [
          "1. Execute host isolation:\n```bash\n./scripts/edr_cli.py isolate --host WS-FINANCE-04 --host SRV-LEDGER-01\n```",
          "2. Block external C2 addresses:\n```bash\nsudo iptables -I INPUT -s 198.51.100.44 -j DROP\n```",
          "3. Terminate active malicious scheduled tasks and delete persistence keys from registry.",
        ],
        el: [
          "1. Εκτέλεση απομόνωσης τερματικών:\n```bash\n./scripts/edr_cli.py isolate --host WS-FINANCE-04 --host SRV-LEDGER-01\n```",
          "2. Αποκλεισμός διευθύνσεων C2 στο firewall:\n```bash\nsudo iptables -I INPUT -s 198.51.100.44 -j DROP\n```",
          "3. Τερματισμός κακόβουλων προγραμματισμένων εργασιών και διαγραφή κλειδιών επιμονής από το μητρώο.",
        ],
      },
    },
    {
      phaseNumber: 4,
      title: {
        en: "Incident Reconstruction, Timeline Generation & Post-Mortem",
        el: "Ανακατασκευή Περιστατικού, Χρονολόγιο & Έκθεση Διδαγμάτων (Post-Mortem)",
      },
      estimatedTime: { en: "20 min", el: "20 λεπτά" },
      objectives: {
        en: [
          "Synthesize chronological forensic timeline combining EDR, SIEM, firewall, and mail logs.",
          "Determine root cause (Spearphishing attachment executing macro without MFA prompt).",
          "Compile the formal Incident Post-Mortem and Lessons Learned Action Plan.",
        ],
        el: [
          "Σύνθεση ενιαίου χρονολογίου συνδυάζοντας EDR, SIEM, firewalls και email logs.",
          "Προσδιορισμός αρχικής αιτίας (Spearphishing έγγραφο με μακροεντολές).",
          "Σύνταξη της επίσημης Έκθεσης Διδαγμάτων (Lessons Learned) και σχεδίου βελτίωσης.",
        ],
      },
      steps: {
        en: [
          "1. Generate master forensic timeline table using Python script:\n```bash\npython3 scripts/build_timeline.py --input /var/log/soc_incident/ --output master_timeline.csv\n```",
          "2. Review root cause and calculate Mean Time to Detect (MTTD) and Mean Time to Remediate (MTTR).\n3. Deliver final executive incident briefing.",
        ],
        el: [
          "1. Παραγωγή συγκεντρωτικού πίνακα χρονολογίου:\n```bash\npython3 scripts/build_timeline.py --input /var/log/soc_incident/ --output master_timeline.csv\n```",
          "2. Υπολογισμός δεικτών MTTD (Μέσος Χρόνος Ανίχνευσης) και MTTR (Μέσος Χρόνος Αποκατάστασης).\n3. Παράδοση της τελικής επιτελικής ενημέρωσης διοίκησης.",
        ],
      },
    },
  ],
  deliverables: {
    en: [
      "SOC Incident Containment Log (`containment_actions.log`)",
      "Consolidated Master Forensic Incident Timeline (`incident_timeline.csv`)",
      "Custom Sigma Detection Rule Suite for Observed TTPs (`ransomware_hunt.yml`)",
      "Formal Post-Incident Root Cause & Lessons Learned Report (5–6 pages)",
    ],
    el: [
      "Καταγραφή Ενεργειών Περιορισμού του SOC (`containment_actions.log`)",
      "Ενοποιημένο Χρονολόγιο Περιστατικού (`incident_timeline.csv`)",
      "Σουίτα Κανόνων Ανίχνευσης Sigma για τα TTPs του περιστατικού (`ransomware_hunt.yml`)",
      "Επίσημη Έκθεση Ανάλυσης Αιτίου & Διδαγμάτων (5–6 σελίδες)",
    ],
  },
  verificationChecklist: {
    en: [
      "Initial compromise vector (spearphishing email) accurately identified with timestamp.",
      "Lateral movement steps over SMB/WMI correctly traced across all affected hosts.",
      "EDR host containment successfully stops beaconing without rebooting machines.",
      "Post-mortem report includes MTTD/MTTR metrics and actionable preventative hardening recommendations.",
    ],
    el: [
      "Το αρχικό διάνυσμα εισβολής ταυτοποιήθηκε πλήρως με ακριβές χρονικό σήμα.",
      "Η πλευρική μετακίνηση μέσω SMB/WMI ιχνηλατήθηκε σε όλα τα επηρεασθέντα συστήματα.",
      "Η απομόνωση EDR διέκοψε επιτυχώς τις συνδέσεις C2.",
      "Η τελική έκθεση περιλαμβάνει μετρικές MTTD/MTTR και σαφείς συστάσεις βελτίωσης.",
    ],
  },
};

export const ch11Project: TechnicalProject = {
  id: "ch11-arch",
  category: {
    en: "Enterprise Architecture & Assessment Blueprint",
    el: "Αρχιτεκτονική Επιχείρησης & Στρατηγικό Πλάνο",
  },
  title: {
    en: "Enterprise SOC Playbook & Automated Incident Response Orchestration (SOAR)",
    el: "Επιχειρησιακό Εγχειρίδιο SOC & Αυτοματοποιημένη Ενορχήστρωση Απόκρισης (SOAR)",
  },
  subtitle: {
    en: "Detection Engineering (Sigma/YARA-L), SOAR Playbook Automation, and Threat Hunting Hypothesis Testing",
    el: "Μηχανική Ανίχνευσης (Sigma/YARA-L), Αυτοματοποίηση Εγχειριδίων SOAR και Δοκιμή Υποθέσεων Threat Hunting",
  },
  scenario: {
    en: "A critical national infrastructure utility provider is modernizing its 24/7 Security Operations Center (SOC). As Principal SOC Detection and Response Architect, you are commissioned to build a standardized Detection Engineering pipeline (authoring Sigma rules and translating them into SIEM queries), construct automated SOAR playbooks (phishing containment, credential abuse, ransomware isolation), and formulate structured proactive threat hunting campaigns.",
    el: "Ένας πάροχος κρίσιμων υποδομών εκσυγχρονίζει το 24/7 Κέντρο Επιχειρήσεων Ασφάλειας (SOC). Ως Επικεφαλής Αρχιτέκτονας Ανίχνευσης & Απόκρισης, σας ανατίθεται να αναπτύξετε έναν αγωγό Μηχανικής Ανίχνευσης (Detection Engineering με κανόνες Sigma), να κατασκευάσετε αυτοματοποιημένα εγχειρίδια SOAR (για phishing, κατάχρηση διαπιστευτηρίων και ransomware) και να συντάξετε εκστρατείες προληπτικής αναζήτησης απειλών (Threat Hunting).",
  },
  objectives: {
    en: [
      "Develop a Python-based Detection Engineering pipeline converting Sigma rules to Splunk SPL, Elastic DSL, and Microsoft KQL.",
      "Construct automated SOAR workflows executing dynamic host isolation, firewall blacklisting, and user session termination.",
      "Formulate 5 structured threat hunting hypotheses mapped to MITRE ATT&CK techniques.",
      "Deliver an enterprise SOC Operations Playbook adhering to NIST SP 800-61r2.",
    ],
    el: [
      "Ανάπτυξη αγωγού Μηχανικής Ανίχνευσης σε Python για μετατροπή κανόνων Sigma σε Splunk SPL, Elastic DSL και KQL.",
      "Κατασκευή αυτοματοποιημένων ροών SOAR για απομόνωση τερματικών, ενημέρωση firewalls και τερματισμό συνεδριών.",
      "Σύνταξη 5 δομημένων υποθέσεων Threat Hunting αντιστοιχισμένων στο MITRE ATT&CK.",
      "Παράδοση ολοκληρωμένου Επιχειρησιακού Εγχειριδίου SOC κατά NIST SP 800-61r2.",
    ],
  },
  scope: {
    en: [
      "Log sources: Windows Security/Sysmon, Linux auditd/syslog, AWS CloudTrail, Zeek/Suricata network flows.",
      "SOAR targets: Firewall APIs, EDR agent APIs, Active Directory / Azure AD Graph API.",
    ],
    el: [
      "Πηγές καταγραφών: Windows Sysmon/Events, Linux auditd, AWS CloudTrail, Zeek/Suricata.",
      "Στόχοι SOAR: APIs Firewalls, APIs πρακτόρων EDR, Active Directory / Entra ID Graph API.",
    ],
  },
  milestones: [
    {
      milestoneNumber: 1,
      title: {
        en: "Detection Engineering Pipeline & Sigma Translation Engine",
        el: "Αγωγός Μηχανικής Ανίχνευσης & Μηχανή Μετατροπής Sigma",
      },
      description: {
        en: "Build `detection_compiler.py` validating Sigma rule schemas and automatically compiling detection logic into target SIEM formats.",
        el: "Ανάπτυξη του `detection_compiler.py` για επικύρωση κανόνων Sigma και αυτόματη μεταγλώττιση σε γλώσσες ερωτημάτων SIEM.",
      },
      detailedSpec: {
        en: [
          "Conduct comprehensive threat modeling on enterprise LLM applications using MITRE ATLAS and OWASP Top 10 for LLMs.",
          "Decompose risks: Direct Prompt Injection, Data Poisoning, Insecure Output Handling, and Model Inversion.",
          "Construct threat boundary architecture separating untrusted user prompts from internal agent tool APIs."
],
        el: [
          "Μοντελοποίηση απειλών σε εφαρμογές LLM βάσει MITRE ATLAS και OWASP Top 10 for LLMs.",
          "Ανάλυση κινδύνων: Direct Prompt Injection, Data Poisoning, Insecure Output Handling.",
          "Αρχιτεκτονική ορίων εμπιστοσύνης μεταξύ εισόδου χρήστη και εσωτερικών εργαλείων agent."
],
      },
      deliverable: {
        en: "Compiler codebase + suite of 15 validated Sigma rules.",
        el: "Κώδικας μεταγλωττιστή + σουίτα 15 επικυρωμένων κανόνων Sigma.",
      },
    },
    {
      milestoneNumber: 2,
      title: {
        en: "SOAR Automated Playbook Automation Engine",
        el: "Μηχανή Αυτοματοποίησης Εγχειριδίων SOAR",
      },
      description: {
        en: "Develop asynchronous Python orchestration handlers executing automated containment actions (IP block, host isolation, password reset) with human-in-the-loop approval gates.",
        el: "Ανάπτυξη ασύγχρονων handlers ενορχήστρωσης για αυτοματοποιημένες ενέργειες περιορισμού (μπλοκάρισμα IP, απομόνωση τερματικού) με έγκριση αναλυτή.",
      },
      detailedSpec: {
        en: [
          "Architect dual-tier LLM Guardrail gateway intercepting incoming user prompts and outgoing model responses.",
          "Implement semantic classification filtering jailbreak attempts, toxic content, and PII/credential exfiltration.",
          "Deploy dynamic Canary Token verification detecting system prompt leakage."
],
        el: [
          "Αρχιτεκτονική διπλού LLM Guardrail gateway για έλεγχο prompts και απαντήσεων.",
          "Σημασιολογικό φιλτράρισμα jailbreaks, τοξικού περιεχομένου και διαρροής PII/κωδικών.",
          "Ενσωμάτωση canary tokens για εντοπισμό υποκλοπής system prompt."
],
      },
      deliverable: {
        en: "SOAR playbook scripts + mock endpoint integration test.",
        el: "Σενάρια SOAR playbooks + δοκιμές ολοκλήρωσης.",
      },
    },
    {
      milestoneNumber: 3,
      title: {
        en: "Proactive Threat Hunting Hypothesis Campaign",
        el: "Εκστρατεία Δομημένης Προληπτικής Αναζήτησης Απειλών (Threat Hunting)",
      },
      description: {
        en: "Design and execute 5 threat hunting hypotheses targeting Living-off-the-Land Binaries (LOLBins), unquoted service paths, and Kerberoasting anomalies.",
        el: "Σχεδιασμός και εκτέλεση 5 υποθέσεων threat hunting για εργαλεία LOLBins, μη ασφαλή service paths και επιθέσεις Kerberoasting.",
      },
      detailedSpec: {
        en: [
          "Design secure Retrieval-Augmented Generation (RAG) vector database architecture with multi-tenant isolation.",
          "Implement cryptographic vector embedding verification and chunk-level Document Access Control Lists (ACLs).",
          "Enforce strict input sanitization on retrieved context chunks before synthesis into LLM prompts."
],
        el: [
          "Σχεδιασμός ασφαλούς RAG vector database με απομόνωση multi-tenant δεδομένων.",
          "Εφαρμογή ACLs πρόσβασης σε επίπεδο κειμενικών chunks και επαλήθευση embeddings.",
          "Καθαρισμός ανακτηθέντων δεδομένων πριν τη σύνθεση στο prompt του LLM."
],
      },
      deliverable: {
        en: "Threat hunting playbooks + query execution results.",
        el: "Εγχειρίδια threat hunting + αποτελέσματα εκτέλεσης ερωτημάτων.",
      },
    },
    {
      milestoneNumber: 4,
      title: {
        en: "SOC Governance Charter & Metrics Dashboard",
        el: "Καταστατικό Διακυβέρνησης SOC & Πίνακας Μετρικών",
      },
      description: {
        en: "Formulate SOC shift handover procedures, SLA tiers, MTTD/MTTR KPI tracking, and author the master SOC Operations Manual.",
        el: "Σύνταξη διαδικασιών παράδοσης βάρδιας SOC, επιπέδων SLA, δεικτών MTTD/MTTR και συγγραφή του τελικού Εγχειριδίου Λειτουργίας SOC.",
      },
      detailedSpec: {
        en: [
          "Architect automated CI/CD red-teaming harness executing adversarial prompt evaluation across model updates.",
          "Establish compliance framework aligning AI systems with the European Union Artificial Intelligence Act (EU AI Act).",
          "Draft Enterprise AI Governance, Ethics & Model Risk Management Policy."
],
        el: [
          "Αυτοματοποιημένο red-teaming στο CI/CD για έλεγχο ανθεκτικότητας σε adversarial prompts.",
          "Πλαίσιο συμμόρφωσης με την Ευρωπαϊκή Πράξη για την Τεχνητή Νοημοσύνη (EU AI Act).",
          "Σύνταξη Εταιρικής Πολιτικής Διακυβέρνησης AI & Διαχείρισης Μοντέλων."
],
      },
      deliverable: {
        en: "Executive SOC Operations Manual & Governance Charter (12–15 pages).",
        el: "Εγχειρίδιο Λειτουργίας SOC & Καταστατικό Διακυβέρνησης (12–15 σελίδες).",
      },
    },
  ],
  deliverables: {
    en: [
      "Detection Engineering Pipeline Codebase (`/detection_pipeline/`)",
      "Suite of 15 Enterprise Sigma Detection Rules (`/rules/sigma_enterprise/`)",
      "SOAR Automated Playbook Script Suite (`/soar_playbooks/`)",
      "Comprehensive SOC Operations & Governance Playbook (12–15 pages)",
    ],
    el: [
      "Πηγαίος Κώδικας Αγωγού Μηχανικής Ανίχνευσης (`/detection_pipeline/`)",
      "Σουίτα 15 Εταιρικών Κανόνων Ανίχνευσης Sigma (`/rules/sigma_enterprise/`)",
      "Σουίτα Αυτοματοποιημένων Σεναρίων SOAR (`/soar_playbooks/`)",
      "Ολοκληρωμένο Εγχειρίδιο Λειτουργίας & Διακυβέρνησης SOC (12–15 σελίδες)",
    ],
  },
  rubric: [
    {
      criterion: {
        en: "Detection Engineering Rigor & Query Quality",
        el: "Αυστηρότητα Μηχανικής Ανίχνευσης & Ποιότητα Ερωτημάτων",
      },
      weight: "30%",
      description: {
        en: "Precision of Sigma detection logic, absence of noisy false positives, and multi-platform compilation fidelity.",
        el: "Ακρίβεια λογικής ανίχνευσης Sigma, αποφυγή ψευδώς θετικών και πιστότητα μεταγλώττισης σε πολλαπλά SIEMs.",
      },
    },
    {
      criterion: {
        en: "SOAR Playbook Automation Robustness",
        el: "Ανθεκτικότητα Αυτοματοποίησης Εγχειριδίων SOAR",
      },
      weight: "25%",
      description: {
        en: "Reliability of automated containment APIs, rollback safety mechanisms, and exception handling.",
        el: "Αξιοπιστία κλήσεων API περιορισμού, μηχανισμοί ασφαλούς επαναφοράς και διαχείριση εξαιρέσεων.",
      },
    },
    {
      criterion: {
        en: "Threat Hunting Methodology & Hypothesis Depth",
        el: "Μεθοδολογία Threat Hunting & Βάθος Υποθέσεων",
      },
      weight: "25%",
      description: {
        en: "Scientific structure of hunting hypotheses, depth of MITRE ATT&CK mapping, and measurable detection uplift.",
        el: "Επιστημονική δομή υποθέσεων αναζήτησης, βάθος χαρτογράφησης ATT&CK και μετρήσιμη βελτίωση ανίχνευσης.",
      },
    },
    {
      criterion: {
        en: "SOC Governance, Playbook Clarity & Metrics",
        el: "Διακυβέρνηση SOC, Σαφήνεια Εγχειριδίων & Μετρικές",
      },
      weight: "20%",
      description: {
        en: "Clarity of operational shift procedures, incident escalation trees, and executive KPI reporting.",
        el: "Σαφήνεια διαδικασιών βάρδιας, δέντρων κλιμάκωσης περιστατικών και επιτελικών αναφορών δεικτών KPI.",
      },
    },
  ],
};

export const ch11Quiz: QuizQuestion[] = [
  {
    id: 1,
    question: {
      en: "What is the technical mechanism of a 'Direct Prompt Injection' attack against Large Language Model (LLM) applications?",
      el: "Ποιος είναι ο τεχνικός μηχανισμός μιας επίθεσης 'Direct Prompt Injection' κατά εφαρμογών Μεγάλων Γλωσσικών Μοντέλων (LLM);",
    },
    options: {
      en: [
        "Overflowing the hardware graphics processing unit (GPU) memory registers during model matrix tensor multiplications, during standard continuous monitoring and administrative audits.",
        "Crafting user inputs that override system safety instructions, coercing the model into executing unauthorized commands.",
        "Decrypting the foundational model pre-training dataset using classical Shor quantum factoring algorithms, to ensure high-availability operational compliance across systems.",
        "Intercepting Ethernet communication packets between the web frontend and API gateway using physical wire taps, using standardized organizational security policy configurations.",
        "Converting relational SQL database query tables into unindexed flat text files stored on local disks, across distributed multi-region cloud production environments.",
      ],
      el: [
        "Υπερχείλιση των καταχωρητών μνήμης της GPU κατά τον πολλαπλασιασμό τανυστών του μοντέλου, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Διαμόρφωση εισόδου χρήστη που υπερισχύει των οδηγιών συστήματος, εξαναγκάζοντας το μοντέλο σε μη εγκεκριμένες ενέργειες.",
        "Αποκρυπτογράφηση του συνόλου δεδομένων προ-εκπαίδευσης με χρήση κβαντικών αλγορίθμων παραγοντοποίησης, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Υποκλοπή πακέτων Ethernet μεταξύ διεπαφής ιστού και πύλης API χρησιμοποιώντας φυσικές παγίδες καλωδίων, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Μετατροπή σχεσιακών πινάκων SQL σε απλά αρχεία κειμένου αποθηκευμένα τοπικά στον δίσκο, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Direct Prompt Injection occurs when untrusted user inputs manipulate the LLM's context window, bypassing developer system prompts and safety guardrails to leak secrets or execute unauthorized actions.",
      el: "Το Direct Prompt Injection συμβαίνει όταν η είσοδος του χρήστη παρακάμπτει τις οδηγίες συστήματος (system prompts) του LLM, εξαναγκάζοντας το μοντέλο να εκτελέσει μη εξουσιοδοτημένες εντολές ή να διαρρεύσει μυστικά.",
    },
  },
  {
    id: 2,
    question: {
      en: "How does an 'Indirect Prompt Injection' attack differ from a direct injection?",
      el: "Πώς διαφέρει μια επίθεση 'Indirect Prompt Injection' από μια άμεση έγχυση prompt;",
    },
    options: {
      en: [
        "The attack requires physical hardware tampering with the datacenter server motherboard components, to ensure high-availability operational compliance across systems.",
        "The attack modifies the underlying neural network weight matrices directly on disk before inference, using standardized organizational security policy configurations.",
        "The malicious instructions are embedded in external untrusted data (web pages, PDFs, emails) retrieved by the model during runtime.",
        "The attack operates exclusively over analog public switched telephone network telephony lines, across distributed multi-region cloud production environments.",
        "The attack forces the client web browser to delete all local storage databases and cached assets, without requiring manual intervention from systems engineering staff.",
      ],
      el: [
        "Η επίθεση απαιτεί φυσική παρέμβαση στο υλικό της μητρικής κάρτας των εξυπηρετητών του κέντρου δεδομένων, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Η επίθεση τροποποιεί τα βάρη των νευρωνικών δικτύων απευθείας στον δίσκο πριν από την εκτέλεση, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Οι κακόβουλες οδηγίες είναι ενσωματωμένες σε εξωτερικά δεδομένα (ιστοσελίδες, PDFs, emails) που διαβάζει το μοντέλο.",
        "Η επίθεση εκτελείται αποκλειστικά μέσω αναλογικών τηλεφωνικών γραμμών του δημόσιου δικτύου, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Η επίθεση αναγκάζει τον περιηγητή να διαγράψει όλα τα τοπικά δεδομένα και τα προσωρινά αρχεία, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "In indirect prompt injection, the attacker places instructions in data the LLM ingests (e.g. a summarized website or email), causing the LLM to execute malicious tasks (e.g. data exfiltration).",
      el: "Στο indirect prompt injection, ο επιτιθέμενος τοποθετεί εντολές σε εξωτερικά αρχεία ή ιστοσελίδες που επεξεργάζεται το LLM, κάνοντάς το να εκτελέσει κακόβουλες ενέργειες (π.χ. εξαγωγή δεδομένων).",
    },
  },
  {
    id: 3,
    question: {
      en: "What is 'Training Data Poisoning' in machine learning security?",
      el: "Τι είναι η 'Δηλητηρίαση Δεδομένων Εκπαίδευσης' (Training Data Poisoning) στην ασφάλεια μηχανικής μάθησης;",
    },
    options: {
      en: [
        "Flooding the inference API endpoint with high-volume volumetric distributed denial-of-service traffic, using standardized organizational security policy configurations.",
        "Extracting model architecture hyperparameters by observing GPU power consumption fluctuations, across distributed multi-region cloud production environments.",
        "Encrypting database tables with ephemeral symmetric keys generated per individual row transaction, without requiring manual intervention from systems engineering staff.",
        "Manipulating training datasets to introduce backdoors, intentional biases, or degraded classification accuracy at inference.",
        "Disabling local operating system firewall rules during automated machine learning model retraining, to mitigate potential unauthorized system configuration drift.",
      ],
      el: [
        "Κατακλυσμός της πύλης API με τεράστιο όγκο κατανεμημένης κίνησης άρνησης εξυπηρέτησης (DDoS), χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Εξαγωγή των υπερπαραμέτρων του μοντέλου παρατηρώντας τις διακυμάνσεις κατανάλωσης ισχύος της GPU, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Κρυπτογράφηση πινάκων βάσεων δεδομένων με εφήμερα συμμετρικά κλειδιά ανά γραμμή συναλλαγής, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Αλλοίωση των δεδομένων εκπαίδευσης για εισαγωγή backdoors, προκαταλήψεων ή μείωση της ακρίβειας ταξινόμησης.",
        "Απενεργοποίηση των κανόνων firewall του λειτουργικού κατά την επανεκπαίδευση του μοντέλου, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
      ],
    },
    correctIndex: 3,
    explanation: {
      en: "Data poisoning occurs when an attacker corrupts the training data, embedding trigger words that cause the trained model to misclassify specific inputs (a backdoor) or generally perform poorly.",
      el: "Η δηλητηρίαση δεδομένων συμβαίνει όταν ο επιτιθέμενος αλλοιώνει το σύνολο εκπαίδευσης, εισάγοντας κρυφά μοτίβα (backdoors) που αναγκάζουν το μοντέλο να κάνει λάθη σε συγκεκριμένες εισόδους.",
    },
  },
  {
    id: 4,
    question: {
      en: "What security threat is addressed by 'Membership Inference Attacks' against machine learning models?",
      el: "Ποια απειλή ασφάλειας αφορά τις 'Επιθέσεις Εξαγωγής Μέλους' (Membership Inference Attacks) σε μοντέλα ML;",
    },
    options: {
      en: [
        "Executing arbitrary machine code inside the graphics processing unit hardware instruction buffer, across distributed multi-region cloud production environments.",
        "Compressing neural network weights into unencrypted lossy audio file representations on disk, without requiring manual intervention from systems engineering staff.",
        "Bypassing operating system access controls during live volatile memory kernel acquisition routines, to mitigate potential unauthorized system configuration drift.",
        "Altering physical facility environmental cooling temperatures inside enterprise data center rooms, in accordance with modern zero trust architectural principles.",
        "Determining whether a specific individual's private record was included in the model's training dataset.",
      ],
      el: [
        "Εκτέλεση αυθαίρετου κώδικα μηχανής μέσα στην προσωρινή μνήμη εντολών της κάρτας γραφικών GPU, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Συμπίεση των βαρών των νευρωνικών δικτύων σε μη κρυπτογραφημένα αρχεία ήχου στον δίσκο, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Παράκαμψη ελέγχων πρόσβασης του λειτουργικού κατά τη συλλογή πτητικής μνήμης RAM από τον πυρήνα, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Αλλοίωση των περιβαλλοντικών θερμοκρασιών ψύξης στις αίθουσες των κέντρων δεδομένων, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Εξακρίβωση του εάν τα ευαίσθητα δεδομένα ενός συγκεκριμένου ατόμου περιλαμβάνονταν στο σύνολο εκπαίδευσης.",
      ],
    },
    correctIndex: 4,
    explanation: {
      en: "Membership inference allows attackers to determine if a specific data point (e.g. a patient's medical record) was part of the model's training set by analyzing confidence scores and output variances.",
      el: "Οι επιθέσεις εξαγωγής μέλους επιτρέπουν στον επιτιθέμενο να εξακριβώσει εάν ένα συγκεκριμένο αρχείο (π.χ. ιατρικός φάκελος ασθενούς) χρησιμοποιήθηκε στην εκπαίδευση του μοντέλου, παραβιάζοντας την ιδιωτικότητα.",
    },
  },
  {
    id: 5,
    question: {
      en: "What is the purpose of deploying 'Canary Tokens' in AI system prompts and database context windows?",
      el: "Ποιος είναι ο σκοπός της χρήσης 'Canary Tokens' στις οδηγίες συστήματος και στα δεδομένα πλαισίου ενός AI;",
    },
    options: {
      en: [
        "Embedding unique trackable strings to detect when system prompts or confidential context data are leaked in output.",
        "Accelerating neural network tensor multiplication speeds across distributed cloud GPU clusters, without requiring manual intervention from systems engineering staff.",
        "Replacing public key asymmetric cryptography with symmetric block ciphers operating in counter mode, to mitigate potential unauthorized system configuration drift.",
        "Disabling all transport layer security certificate validation checks in client web browsers, in accordance with modern zero trust architectural principles.",
        "Managing physical facility security access badges and employee biometric fingerprint databases, before committing changes to central production repository nodes.",
      ],
      el: [
        "Ενσωμάτωση μοναδικών ανιχνεύσιμων συμβολοσειρών για τον εντοπισμό διαρροής των οδηγιών συστήματος στην έξοδο.",
        "Επιτάχυνση των πράξεων πολλαπλασιασμού τανυστών σε κατανεμημένες συστοιχίες GPUs στο cloud, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Αντικατάσταση της ασύμμετρης κρυπτογραφίας με συμμετρικούς αλγορίθμους σε κατάσταση counter mode, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Απενεργοποίηση των ελέγχων επαλήθευσης πιστοποιητικών TLS στους περιηγητές των τελικών χρηστών, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Διαχείριση καρτών φυσικής πρόσβασης και βάσεων βιομετρικών δεδομένων προσωπικού στις εγκαταστάσεις, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "A canary token is a secret, unique string hidden in the system prompt. If an attacker's prompt injection succeeds in dumping system instructions, the canary in the output triggers an immediate security alert.",
      el: "Το canary token είναι μια μυστική, μοναδική συμβολοσειρά στο system prompt. Αν ένας εισβολέας καταφέρει να αποσπάσει τις οδηγίες, η εμφάνιση του token στην έξοδο σημαίνει άμεσο συναγερμό διαρροής.",
    },
  },
  {
    id: 6,
    question: {
      en: "Under the European Union Artificial Intelligence Act (EU AI Act), which risk classification applies to AI systems used for biometric categorization and critical infrastructure?",
      el: "Σύμφωνα με τον Κανονισμό της ΕΕ για την Τεχνητή Νοημοσύνη (EU AI Act), ποια κατηγορία κινδύνου ισχύει για συστήματα βιομετρικής κατηγοριοποίησης και κρίσιμων υποδομών;",
    },
    options: {
      en: [
        "Minimal Risk, requiring no regulatory obligations or technical compliance audits, without requiring manual intervention from systems engineering staff.",
        "High Risk, requiring strict conformity assessments, risk management, human oversight, and cybersecurity logging.",
        "Zero Risk, exempting the software completely from European Union data protection regulations, in accordance with modern zero trust architectural principles.",
        "Standard Commercial Risk, requiring only general consumer electronic labeling certifications, before committing changes to central production repository nodes.",
        "Experimental Risk, permitting unrestricted deployment without technical security documentation, under standard operating procedures defined in corporate ISMS policies.",
      ],
      el: [
        "Ελάχιστος Κίνδυνος (Minimal Risk), χωρίς κανονιστικές υποχρεώσεις ή τεχνικούς ελέγχους, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Υψηλός Κίνδυνος (High Risk), απαιτώντας αξιολόγηση συμμόρφωσης, διαχείριση κινδύνων, ανθρώπινη εποπτεία και κυβερνοασφάλεια.",
        "Μηδενικός Κίνδυνος (Zero Risk), εξαιρώντας το λογισμικό από τους ευρωπαϊκούς κανονισμούς προστασίας δεδομένων, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Τυπικός Εμπορικός Κίνδυνος, απαιτώντας μόνο γενικές σημάνσεις καταναλωτικών ηλεκτρονικών προϊόντων, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Πειραματικός Κίνδυνος, επιτρέποντας διάθεση χωρίς τεχνική τεκμηρίωση ασφάλειας, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "The EU AI Act classifies AI used in critical infrastructure, medical devices, law enforcement, and biometric identification as 'High Risk', imposing strict technical requirements (risk management, logging, human-in-the-loop).",
      el: "Ο Κανονισμός AI της ΕΕ κατατάσσει τα συστήματα κρίσιμων υποδομών και βιομετρικής αναγνώρισης στον 'Υψηλό Κίνδυνο', επιβάλλοντας αυστηρές απαιτήσεις διαχείρισης κινδύνων, διαφάνειας και κυβερνοασφάλειας.",
    },
  },
  {
    id: 7,
    question: {
      en: "How do automated AST (Abstract Syntax Tree) security tools utilize AI to remediate vulnerable source code?",
      el: "Πώς χρησιμοποιούν τα αυτοματοποιημένα εργαλεία AST την τεχνητή νοημοσύνη για τη διόρθωση ευάλωτου πηγαίου κώδικα;",
    },
    options: {
      en: [
        "By compiling source files directly into encrypted assembly binaries that execute inside kernel space, in accordance with modern zero trust architectural principles.",
        "By disabling all transport layer security certificate validation routines across backend microservices, before committing changes to central production repository nodes.",
        "By analyzing syntax tree data flow patterns and generating contextual secure replacement code (e.g. parameterized queries).",
        "By replacing relational database SQL queries with unindexed flat text files stored locally on disk, under standard operating procedures defined in corporate ISMS policies.",
        "By converting client web browser JavaScript code into proprietary analog audio waveforms, across all internal enterprise network segments and endpoints.",
      ],
      el: [
        "Μεταγλωττίζοντας πηγαία αρχεία σε κρυπτογραφημένα δυαδικά αρχεία που εκτελούνται στον πυρήνα, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Απενεργοποιώντας όλες τις διαδικασίες επαλήθευσης πιστοποιητικών TLS στις μικροϋπηρεσίες, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Αναλύοντας τη ροή δεδομένων στο δέντρο σύνταξης και παράγοντας ασφαλή κώδικα (π.χ. παραμετροποιημένα ερωτήματα).",
        "Αντικαθιστώντας ερωτήματα SQL με μη ευρετηριασμένα αρχεία κειμένου αποθηκευμένα τοπικά στον δίσκο, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Μετατρέποντας τον κώδικα JavaScript των περιηγητών σε ιδιόκτητα αναλογικά ακουστικά σήματα, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "Modern AI-assisted AST scanners parse code into syntax trees, trace untrusted inputs to dangerous sinks (e.g. raw SQL/OS commands), and generate verified contextual patches (e.g. parameterized queries).",
      el: "Τα εργαλεία AST αναλύουν τη δομή του κώδικα και τη ροή δεδομένων από επικίνδυνες πηγές, χρησιμοποιώντας AI για την παραγωγή ασφαλών διορθώσεων (όπως parameterized queries και shlex escaping).",
    },
  },
  {
    id: 8,
    question: {
      en: "What is 'Model Inversion' in adversarial machine learning?",
      el: "Τι είναι η 'Αντιστροφή Μοντέλου' (Model Inversion) στην αντίπαλη μηχανική μάθηση;",
    },
    options: {
      en: [
        "Flipping the order of convolutional neural network layers to accelerate matrix inference computations, before committing changes to central production repository nodes.",
        "Converting a supervised deep neural network into an unsupervised reinforcement learning policy, under standard operating procedures defined in corporate ISMS policies.",
        "Extracting hardware serial numbers from the underlying graphics processing unit device firmware, across all internal enterprise network segments and endpoints.",
        "Reconstructing sensitive features of the training data (e.g. facial images) by repeatedly querying the model API.",
        "Altering database foreign key constraints during high-volume transactional query execution, during standard continuous monitoring and administrative audits.",
      ],
      el: [
        "Αντιστροφή της σειράς των επιπέδων νευρωνικών δικτύων για επιτάχυνση των υπολογισμών εκτέλεσης, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Μετατροπή ενός επιβλεπόμενου νευρωνικού δικτύου σε πολιτική ενισχυτικής μάθησης χωρίς επίβλεψη, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Εξαγωγή σειριακών αριθμών υλικού από το firmware της κάρτας γραφικών του εξυπηρετητή, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Ανακατασκευή ευαίσθητων χαρακτηριστικών των δεδομένων εκπαίδευσης (π.χ. πρόσωπα) μέσω ερωτημάτων στο API.",
        "Αλλαγή των περιορισμών ξένων κλειδιών της βάσης κατά την εκτέλεση μεγάλου όγκου συναλλαγών, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
      ],
    },
    correctIndex: 3,
    explanation: {
      en: "Model inversion attacks exploit prediction confidence values to reconstruct private training data representations (such as recognizable facial images of people used in facial recognition training).",
      el: "Η επίθεση αντιστροφής μοντέλου εκμεταλλεύεται τις τιμές εμπιστοσύνης των προβλέψεων για να ανακατασκευάσει ευαίσθητα δεδομένα εκπαίδευσης (όπως φωτογραφίες προσώπων που χρησιμοποιήθηκαν στην εκπαίδευση).",
    },
  },
  {
    id: 9,
    question: {
      en: "What defense mechanism is commonly deployed in front of enterprise LLMs to intercept malicious prompts and sanitize outputs?",
      el: "Ποιος αμυντικός μηχανισμός τοποθετείται μπροστά από εταιρικά LLMs για την αποκοπή κακόβουλων prompts και τον καθαρισμό εξόδου;",
    },
    options: {
      en: [
        "Stateless packet filtering firewalls operating exclusively on Ethernet Layer 2 MAC addresses, under standard operating procedures defined in corporate ISMS policies.",
        "Hardware uninterruptible power supply battery backups installed in datacenter facility racks, across all internal enterprise network segments and endpoints.",
        "Proprietary compiler optimization tools compiling Python scripts into static C++ machine code, during standard continuous monitoring and administrative audits.",
        "Network time protocol servers synchronizing system clock timestamps across wide area networks, to ensure high-availability operational compliance across systems.",
        "AI Guardrail Gateways, analyzing semantic intent, blocking jailbreaks, and filtering PII data exfiltration.",
      ],
      el: [
        "Stateless τείχη προστασίας πακέτων που λειτουργούν αποκλειστικά σε επίπεδο διευθύνσεων MAC Layer 2, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Μονάδες αδιάλειπτης παροχής ισχύος UPS εγκατεστημένες στα ικριώματα των κέντρων δεδομένων, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Εργαλεία βελτιστοποίησης μεταγλωττιστών που μετατρέπουν κώδικα Python σε στατικό κώδικα μηχανής C++, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Διακομιστές πρωτοκόλλου ώρας δικτύου NTP που συγχρονίζουν τα ρολόγια σε δίκτυα ευρείας περιοχής, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "AI Guardrail Gateways, αναλύοντας σημασιολογική πρόθεση, μπλοκάροντας jailbreaks και φιλτράροντας διαρροές PII.",
      ],
    },
    correctIndex: 4,
    explanation: {
      en: "AI Guardrail Gateways (e.g. NeMo Guardrails, Llama Guard) evaluate user inputs for jailbreak patterns and inspect model responses to prevent leaking PII, secrets, or harmful instructions.",
      el: "Οι πύλες AI Guardrails ελέγχουν τις εισόδους για απόπειρες jailbreak και φιλτράρουν τις εξόδους του μοντέλου αποτρέποντας τη διαρροή προσωπικών δεδομένων (PII) και εταιρικών μυστικών.",
    },
  },
  {
    id: 10,
    question: {
      en: "What is an 'Evasion Attack' (Adversarial Perturbation) against a machine learning malware classifier?",
      el: "Τι είναι μια 'Επίθεση Διαφυγής' (Evasion Attack) κατά ενός ταξινομητή κακόβουλου λογισμικού μηχανικής μάθησης;",
    },
    options: {
      en: [
        "Adding imperceptible modifications to a malware binary that cause the ML model to misclassify it as benign.",
        "Overheating the physical central processing unit hardware to trigger automated safety reboots, across all internal enterprise network segments and endpoints.",
        "Cracking symmetric AES-256 database encryption keys using brute-force hardware dictionary attacks, during standard continuous monitoring and administrative audits.",
        "Altering Domain Name System records to redirect network traffic to an unencrypted public web server, to ensure high-availability operational compliance across systems.",
        "Deleting operating system audit logs during scheduled nighttime system administrator maintenance windows, using standardized organizational security policy configurations.",
      ],
      el: [
        "Προσθήκη ανεπαίσθητων αλλαγών στο κακόβουλο δυαδικό αρχείο ώστε το μοντέλο ML να το θεωρήσει ασφαλές.",
        "Υπερθέρμανση του επεξεργαστή του υπολογιστή για πρόκληση αυτόματης επανεκκίνησης ασφαλείας, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Αποκρυπτογράφηση κλειδιών AES-256 με επιθέσεις λεξικού σε συστοιχίες καρτών γραφικών, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Αλλοίωση εγγραφών DNS για ανακατεύθυνση της κίνησης σε μη κρυπτογραφημένο εξυπηρετητή ιστού, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Διαγραφή αρχείων καταγραφής του λειτουργικού κατά τις νυχτερινές ώρες συντήρησης του συστήματος, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Evasion attacks apply subtle perturbations (e.g. dead code injection, section padding) that alter the ML classifier's feature vector without affecting the malicious payload, bypassing detection.",
      el: "Οι επιθέσεις διαφυγής προσθέτουν μικρές τροποποιήσεις (π.χ. αδρανή τμήματα κώδικα) στο κακόβουλο αρχείο, αλλοιώνοντας τα χαρακτηριστικά που εξετάζει το μοντέλο ML ώστε να το κατατάξει ως ακίνδυνο.",
    },
  },
];

import type { CliLab, HandsOnLab, TechnicalProject, QuizQuestion } from "../types";

export const ch12CliLab: CliLab = {
  id: "ch12-cli",
  title: {
    en: "Digital Forensics, Memory Analysis & OSINT Reconnaissance Sandbox",
    el: "Προσομοιωτής Ψηφιακής Εγκληματολογίας, Ανάλυσης Μνήμης & Αναγνώρισης OSINT",
  },
  scenario: {
    en: "Extract hidden author and software metadata from a leaked document with ExifTool, analyze a raw physical memory dump with Volatility 3 to detect process injection, and conduct passive OSINT domain investigation.",
    el: "Εξάγετε κρυφά μεταδεδομένα εγγράφου με το ExifTool, αναλύστε ένα memory dump με το Volatility 3 για εντοπισμό injected processes και εκτελέστε αναγνώριση OSINT.",
  },
  initialPrompt: "forensics@dfir-lab:~$",
  banner: {
    en: "=== Chapter 12 Digital Forensics & OSINT Sandbox ===\nEvidence Image: memory.raw (DDR4 8GB Dump) | Target Doc: confidential_leak.docx\nType 'help' for command assistance or follow the missions below.",
    el: "=== Εργαστήριο Ψηφιακής Εγκληματολογίας & OSINT Κεφαλαίου 12 ===\nΕίδωλο Μνήμης: memory.raw (8GB Dump) | Έγγραφο: confidential_leak.docx\nΠληκτρολογήστε 'help' για βοήθεια ή ακολουθήστε τις παρακάτω αποστολές.",
  },
  fileSystem: {
    "confidential_leak.docx": "[DOCX PKZIP Stream containing embedded XML metadata]",
    "memory.raw": "[Raw Physical RAM Image Header: Windows 10 x64 Build 19045]",
    "osint_targets.txt": "DOMAIN: darkops-gateway.org\nIP: 198.51.100.44\nREGISTRAR: PrivacyProtect LLC",
  },
  tasks: [
    {
      id: "task-1",
      title: {
        en: "Extract Hidden Document Metadata with ExifTool",
        el: "Εξαγωγή Κρυφών Μεταδεδομένων Εγγράφου με το ExifTool",
      },
      description: {
        en: "Extract author name, modification dates, and software version from `confidential_leak.docx` using `exiftool`.",
        el: "Εξάγετε όνομα συντάκτη, ημερομηνίες και έκδοση λογισμικού από το `confidential_leak.docx` με το `exiftool`.",
      },
      hint: {
        en: "Execute: exiftool confidential_leak.docx",
        el: "Εκτελέστε: exiftool confidential_leak.docx",
      },
      solution: "exiftool confidential_leak.docx",
      validateRegex: "exiftool.*confidential_leak",
      successMessage: {
        en: "Metadata extracted! Identified Author `Attacker_Alias_Ghost` and creation timestamps.",
        el: "Τα μεταδεδομένα εξήχθησαν! Εντοπίστηκε ο συντάκτης `Attacker_Alias_Ghost` και τα χρονικά σήματα.",
      },
    },
    {
      id: "task-2",
      title: {
        en: "Reconstruct Process Tree from Memory Dump",
        el: "Ανακατασκευή Δέντρου Διεργασιών από Memory Dump",
      },
      description: {
        en: "Analyze running processes in `memory.raw` using Volatility 3's `windows.pstree` plugin.",
        el: "Αναλύστε τις εκτελούμενες διεργασίες στο `memory.raw` με το πρόσθετο `windows.pstree` του Volatility 3.",
      },
      hint: {
        en: "Execute: volatility -f memory.raw windows.pstree",
        el: "Εκτελέστε: volatility -f memory.raw windows.pstree",
      },
      solution: "volatility -f memory.raw windows.pstree",
      validateRegex: "volatility.*windows\\.pstree",
      successMessage: {
        en: "Process tree parsed: Identified suspicious child process `ransom_core.exe` (PID 3940) spawned by `svchost.exe`.",
        el: "Το δέντρο διεργασιών αναλύθηκε: Εντοπίστηκε η ύποπτη διεργασία `ransom_core.exe` (PID 3940).",
      },
    },
    {
      id: "task-3",
      title: {
        en: "Detect Injected Code Memory Regions with Malfind",
        el: "Εντοπισμός Εγχυμένου Κώδικα στη Μνήμη με το Malfind",
      },
      description: {
        en: "Scan the memory dump for memory pages with Read/Write/Execute (PAGE_EXECUTE_READWRITE) permissions using `windows.malfind`.",
        el: "Σαρώστε τη μνήμη για σελίδες με δικαιώματα RWX (PAGE_EXECUTE_READWRITE) χρησιμοποιώντας το `windows.malfind`.",
      },
      hint: {
        en: "Execute: volatility -f memory.raw windows.malfind",
        el: "Εκτελέστε: volatility -f memory.raw windows.malfind",
      },
      solution: "volatility -f memory.raw windows.malfind",
      validateRegex: "volatility.*windows\\.malfind",
      successMessage: {
        en: "MALFIND HIT: Discovered injected MZ/PE header executable stub inside PID 1024 memory space!",
        el: "ΕΝΤΟΠΙΣΜΟΣ MALFIND: Ανακαλύφθηκε εγχυμένο εκτελέσιμο PE στον χώρο μνήμης του PID 1024!",
      },
    },
    {
      id: "task-4",
      title: {
        en: "Conduct Passive WHOIS OSINT Domain Investigation",
        el: "Εκτέλεση Παθητικής Έρευνας OSINT WHOIS σε Domain",
      },
      description: {
        en: "Query registration metadata and nameservers for malicious adversary domain `darkops-gateway.org`.",
        el: "Αναζητήστε μεταδεδομένα καταχώρισης και nameservers για το domain `darkops-gateway.org`.",
      },
      hint: {
        en: "Execute: whois darkops-gateway.org",
        el: "Εκτελέστε: whois darkops-gateway.org",
      },
      solution: "whois darkops-gateway.org",
      validateRegex: "whois\\s+darkops-gateway\\.org",
      successMessage: {
        en: "WHOIS data retrieved: Domain registered anonymously via privacy proxy; nameservers linked to bulletproof hosting.",
        el: "Τα στοιχεία WHOIS ανακτήθηκαν: Το domain κατοχυρώθηκε ανώνυμα σε bulletproof hosting provider.",
      },
    },
  ],
};

export const ch12HandsOnLab: HandsOnLab = {
  title: {
    en: "Digital Forensics & Incident Reconstruction: Memory Dump Analysis, Disk Artifact Extraction & Chain of Custody",
    el: "Ψηφιακή Εγκληματολογία & Ανακατασκευή Περιστατικού: Ανάλυση Μνήμης, Εξαγωγή Ευρημάτων Δίσκου & Αλυσίδα Επιμέλειας",
  },
  subtitle: {
    en: "2-Hour Practical Lab: Volatility 3 Memory Forensics, Windows Registry Dissection, MFT Parsing, and Forensic Timeline Reconstruction",
    el: "Εργαστήριο 2 Ωρών: Εγκληματολογική Ανάλυση Μνήμης με Volatility 3, Ανάλυση Μητρώου Windows, MFT και Σύνθεση Χρονολογίου",
  },
  duration: {
    en: "~2 Hours (120 minutes)",
    el: "~2 Ώρες (120 λεπτά)",
  },
  overview: {
    en: "In this 2-hour technical laboratory, students step into the role of a Digital Forensics and Incident Response (DFIR) Specialist assisting in a criminal investigation. You will establish legal Chain of Custody documentation, verify forensic image integrity hashes (E01 / DD), dissect volatile RAM captures with Volatility 3 (extracting injected DLLs and passwords from memory), analyze disk artifacts (Master File Table `$MFT`, Windows Prefetch, Shimcache, Shellbags), and construct a unified forensic timeline.",
    el: "Σε αυτό το εργαστήριο 2 ωρών, οι φοιτητές αναλαμβάνουν τον ρόλο Εμπειρογνώμονα Ψηφιακής Εγκληματολογίας (DFIR). Θα συντάξετε νομικά έγγραφα Αλυσίδας Επιμέλειας (Chain of Custody), θα επαληθεύσετε hashes ειδώλων (E01/DD), θα αναλύσετε αρχεία RAM με το Volatility 3, θα εξάγετε ευρήματα από τον δίσκο (Master File Table `$MFT`, Windows Prefetch, Shimcache, Shellbags) και θα ανακατασκευάσετε ένα ενοποιημένο χρονολόγιο γεγονότων.",
  },
  environment: [
    "SIFT Workstation (SANS Investigative Forensic Toolkit) / REMnux VM",
    "Forensic suites: `volatility3`, `exiftool`, `sleuthkit` (`fls`, `icat`, `mmls`), `log2timeline` / `plaso`",
    "Evidence archive: `/evidence/suspect_endpoint.raw` and `/evidence/c_drive.e01`",
    "Chain of Custody tracking forms (`/evidence/chain_of_custody_form.pdf`)",
  ],
  phases: [
    {
      phaseNumber: 1,
      title: {
        en: "Evidence Acquisition, Hashing & Chain of Custody Intake",
        el: "Συλλογή Πειστηρίων, Κατακερματισμός (Hashing) & Αλυσίδα Επιμέλειας",
      },
      estimatedTime: { en: "25 min", el: "25 λεπτά" },
      objectives: {
        en: [
          "Document evidence intake (Serial numbers, acquisition engineer, MD5/SHA-256 baseline hashes).",
          "Mount forensic disk images in read-only write-blocked mode.",
          "Examine partition tables using `mmls`.",
        ],
        el: [
          "Τεκμηρίωση παραλαβής πειστηρίων (σειριακοί αριθμοί, όνομα εξεταστή, hashes SHA-256).",
          "Προσάρτηση ειδώλων δίσκου σε λειτουργία μόνο ανάγνωσης με write-blocking.",
          "Εξέταση πινάκων κατατμήσεων με το εργαλείο `mmls`.",
        ],
      },
      steps: {
        en: [
          "1. Verify evidence hashes:\n```bash\nsha256sum /evidence/suspect_endpoint.raw /evidence/c_drive.e01\n```",
          "2. Complete intake entries on the formal Chain of Custody form.\n3. Inspect disk partitions:\n```bash\nmmls /evidence/c_drive.e01\n```",
        ],
        el: [
          "1. Επαλήθευση κρυπτογραφικών αποτυπωμάτων πειστηρίων:\n```bash\nsha256sum /evidence/suspect_endpoint.raw /evidence/c_drive.e01\n```",
          "2. Συμπλήρωση του επίσημου εντύπου Αλυσίδας Επιμέλειας (Chain of Custody).\n3. Εξέταση κατατμήσεων δίσκου:\n```bash\nmmls /evidence/c_drive.e01\n```",
        ],
      },
    },
    {
      phaseNumber: 2,
      title: {
        en: "Volatile Memory Forensics with Volatility 3",
        el: "Εγκληματολογική Ανάλυση Πτητικής Μνήμης με το Volatility 3",
      },
      estimatedTime: { en: "45 min", el: "45 λεπτά" },
      objectives: {
        en: [
          "Identify running processes and hidden / unlinked processes with `windows.pslist` and `windows.psscan`.",
          "Detect injected code using `windows.malfind` and dump process memory with `windows.dumpfiles`.",
          "Extract active network sockets and established TCP connections with `windows.netscan`.",
        ],
        el: [
          "Εντοπισμός ενεργών και κρυφών διεργασιών με `windows.pslist` και `windows.psscan`.",
          "Ανίχνευση εγχυμένου κώδικα με το `windows.malfind` και εξαγωγή αρχείων μνήμης.",
          "Εξαγωγή ενεργών συνδέσεων δικτύου και sockets με το `windows.netscan`.",
        ],
      },
      steps: {
        en: [
          "1. Scan process listings:\n```bash\nvol -f /evidence/suspect_endpoint.raw windows.pslist\n```",
          "2. Scan active network connections:\n```bash\nvol -f /evidence/suspect_endpoint.raw windows.netscan\n```",
          "3. Dump injected DLL executable from memory:\n```bash\nvol -f /evidence/suspect_endpoint.raw windows.dumpfiles --pid 1024\n```",
        ],
        el: [
          "1. Σάρωση λίστας διεργασιών:\n```bash\nvol -f /evidence/suspect_endpoint.raw windows.pslist\n```",
          "2. Σάρωση δικτυακών συνδέσεων:\n```bash\nvol -f /evidence/suspect_endpoint.raw windows.netscan\n```",
          "3. Εξαγωγή του εγχυμένου εκτελέσιμου αρχείου από τη μνήμη:\n```bash\nvol -f /evidence/suspect_endpoint.raw windows.dumpfiles --pid 1024\n```",
        ],
      },
    },
    {
      phaseNumber: 3,
      title: {
        en: "Disk Forensics: Registry, Prefetch, Shimcache & $MFT Parsing",
        el: "Εγκληματολογία Δίσκου: Μητρώο, Prefetch, Shimcache & Ανάλυση $MFT",
      },
      estimatedTime: { en: "30 min", el: "30 λεπτά" },
      objectives: {
        en: [
          "Extract and parse the NTFS Master File Table (`$MFT`) for file creation/modification timestamps ($STANDARD_INFORMATION vs. $FILE_NAME to detect timestomping).",
          "Dissect Windows Prefetch files (`.pf`) to prove execution of malicious binaries.",
          "Inspect Shimcache (Application Compatibility) and Shellbags for folder access history.",
        ],
        el: [
          "Εξαγωγή και ανάλυση του Master File Table (`$MFT`) για εντοπισμό timestomping.",
          "Ανάλυση αρχείων Windows Prefetch (`.pf`) για απόδειξη εκτέλεσης εκτελέσιμων.",
          "Έλεγχος Shimcache και Shellbags για ιστορικό εκτέλεσης και πρόσβασης σε φακέλους.",
        ],
      },
      steps: {
        en: [
          "1. Parse `$MFT` table using `analyzeMFT.py`:\n```bash\npython3 analyzeMFT.py -f /mnt/c_drive/\\$MFT -o /workspace/mft_parsed.csv\n```",
          "2. Parse Windows Prefetch directory:\n```bash\nPECmd.exe -d /mnt/c_drive/Windows/Prefetch/ --csv /workspace/prefetch_out/\n```",
          "3. Inspect Registry Run keys (`NTUSER.DAT` and `SYSTEM` hives) for persistence.",
        ],
        el: [
          "1. Ανάλυση του πίνακα `$MFT`:\n```bash\npython3 analyzeMFT.py -f /mnt/c_drive/\\$MFT -o /workspace/mft_parsed.csv\n```",
          "2. Ανάλυση αρχείων Prefetch:\n```bash\nPECmd.exe -d /mnt/c_drive/Windows/Prefetch/ --csv /workspace/prefetch_out/\n```",
          "3. Έλεγχος των κλειδιών Run στο μητρώο για μηχανισμούς επιμονής.",
        ],
      },
    },
    {
      phaseNumber: 4,
      title: {
        en: "Forensic Super-Timeline Generation & Expert Witness Dossier",
        el: "Παραγωγή Ενοποιημένου Χρονολογίου & Έκθεση Πραγματογνωμοσύνης",
      },
      estimatedTime: { en: "20 min", el: "20 λεπτά" },
      objectives: {
        en: [
          "Compile a super-timeline combining Plaso/Log2Timeline artifacts into Timesketch.",
          "Correlate attacker entry, execution, persistence, and data staging events.",
          "Author the formal Expert Forensic Witness Report suitable for court proceedings.",
        ],
        el: [
          "Σύνθεση ενιαίου super-timeline με το Plaso/Log2Timeline.",
          "Συσχέτιση των σταδίων εισβολής, εκτέλεσης, επιμονής και εξαγωγής δεδομένων.",
          "Συγγραφή της επίσημης Έκθεσης Πραγματογνωμοσύνης για δικαστική χρήση.",
        ],
      },
      steps: {
        en: [
          "1. Generate Plaso timeline storage:\n```bash\nlog2timeline.py /workspace/timeline.plaso /evidence/c_drive.e01\n```",
          "2. Export filtered CSV timeline around the attack window:\n```bash\npsort.py -o l2tcsv /workspace/timeline.plaso \"date > '2026-09-28'\" -w /workspace/final_timeline.csv\n```",
          "3. Compile final forensic witness report.",
        ],
        el: [
          "1. Παραγωγή αρχείου Plaso timeline:\n```bash\nlog2timeline.py /workspace/timeline.plaso /evidence/c_drive.e01\n```",
          "2. Εξαγωγή φιλτραρισμένου χρονολογίου σε CSV:\n```bash\npsort.py -o l2tcsv /workspace/timeline.plaso \"date > '2026-09-28'\" -w /workspace/final_timeline.csv\n```",
          "3. Σύνταξη της τελικής έκθεσης πραγματογνωμοσύνης.",
        ],
      },
    },
  ],
  deliverables: {
    en: [
      "Verified Chain of Custody & Evidence Intake Manifest (`chain_of_custody.pdf`)",
      "Volatility 3 Memory Extraction Artifacts & Process Dumps (`volatility_findings/`)",
      "Consolidated Master Forensic Super-Timeline (`final_super_timeline.csv`)",
      "Expert Forensic Witness Investigation Report (10–12 pages)",
    ],
    el: [
      "Επαληθευμένη Αλυσίδα Επιμέλειας & Πρωτόκολλο Παραλαβής (`chain_of_custody.pdf`)",
      "Ευρήματα Εγκληματολογικής Ανάλυσης Μνήμης Volatility (`volatility_findings/`)",
      "Ενοποιημένο Χρονολόγιο Συμβάντων Super-Timeline (`final_super_timeline.csv`)",
      "Επίσημη Έκθεση Πραγματογνωμοσύνης Ψηφιακών Πειστηρίων (10–12 σελίδες)",
    ],
  },
  verificationChecklist: {
    en: [
      "Cryptographic hashes verified before and after all forensic mounting operations.",
      "Injected processes and malicious memory sections identified with PID and base offset.",
      "MFT and Prefetch analysis accurately reconstructs file execution sequence.",
      "Expert report complies with international digital forensics evidentiary standards (ISO/IEC 27037).",
    ],
    el: [
      "Τα hashes επαληθεύτηκαν πριν και μετά από κάθε ενέργεια προσάρτησης.",
      "Οι εγχυμένες διεργασίες και τα κακόβουλα τμήματα μνήμης ταυτοποιήθηκαν με ακρίβεια PID.",
      "Η ανάλυση MFT και Prefetch ανακατασκευάζει πιστά την ακολουθία εκτέλεσης αρχείων.",
      "Η έκθεση συμμορφώνεται πλήρως με τα διεθνή πρότυπα ψηφιακών πειστηρίων (ISO/IEC 27037).",
    ],
  },
};

export const ch12Project: TechnicalProject = {
  id: "ch12-arch",
  category: {
    en: "Enterprise Architecture & Assessment Blueprint",
    el: "Αρχιτεκτονική Επιχείρησης & Στρατηγικό Πλάνο",
  },
  title: {
    en: "Full-Scope Digital Forensics & Threat Actor OSINT Investigation Report",
    el: "Ολοκληρωμένη Ψηφιακή Εγκληματολογία & Έρευνα OSINT Απόδοσης Απειλών",
  },
  subtitle: {
    en: "Disk & Memory Artifact Analysis, Open Source Intelligence (OSINT) Mapping, and Threat Actor Attribution Dossier",
    el: "Ανάλυση Ευρημάτων Δίσκου & Μνήμης, Χαρτογράφηση OSINT και Φάκελος Απόδοσης Ευθύνης Δραστών",
  },
  scenario: {
    en: "A critical government agency's classified server was compromised in a sophisticated cyber espionage campaign resulting in confidential data theft. As Lead Forensic Investigator and OSINT Analyst, you are commissioned to perform deep disk and memory forensics on the seized server image, unearth buried forensic artifacts, trace the adversary's command-and-control infrastructure through public OSINT channels, and deliver an expert threat attribution dossier.",
    el: "Ένας διακομιστής διαβαθμισμένων δεδομένων κρατικής υπηρεσίας παραβιάστηκε σε εκστρατεία κυβερνοκατασκοπείας με αποτέλεσμα διαρροή απορρήτων. Ως Επικεφαλής Εγκληματολόγος & Αναλυτής OSINT, σας ανατίθεται να εκτελέσετε εις βάθος ανάλυση δίσκου και μνήμης στο είδωλο του διακομιστή, να ανακαλύψετε κρυμμένα ψηφιακά πειστήρια, να ιχνηλατήσετε την υποδομή C2 του αντιπάλου μέσω καναλιών OSINT και να συντάξετε έναν φάκελο απόδοσης ευθύνης.",
  },
  objectives: {
    en: [
      "Perform deep forensic artifact extraction across NTFS metadata ($MFT, USN Journal, Volume Shadow Copies).",
      "Dissect memory dumps using Volatility 3 to extract injected payload shellcode and network artifacts.",
      "Conduct passive and active OSINT investigations (Passive DNS, Certificate Transparency logs, WHOIS history, ASN routing).",
      "Deliver an authoritative Threat Actor Attribution & Forensic Case Dossier.",
    ],
    el: [
      "Εξαγωγή ψηφιακών ευρημάτων από μεταδεδομένα NTFS ($MFT, USN Journal, Shadow Copies).",
      "Ανάλυση memory dumps με το Volatility 3 για εξαγωγή shellcode και συνδέσεων δικτύου.",
      "Εκτέλεση ερευνών OSINT (Passive DNS, Certificate Transparency logs, ιστορικό WHOIS, ASN routing).",
      "Παράδοση ολοκληρωμένου Φακέλου Πραγματογνωμοσύνης & Απόδοσης Απειλής.",
    ],
  },
  scope: {
    en: [
      "Forensic artifacts: Windows 10/Server 2022 raw memory dump, E01 disk image, Event logs.",
      "OSINT sources: Censys, Shodan, VirusTotal, crt.sh, SecurityTrails, Maltego graphs.",
    ],
    el: [
      "Εγκληματολογικά πειστήρια: Raw memory dump, είδωλο δίσκου E01, Event logs.",
      "Πηγές OSINT: Censys, Shodan, VirusTotal, crt.sh, SecurityTrails, γραφήματα Maltego.",
    ],
  },
  milestones: [
    {
      milestoneNumber: 1,
      title: {
        en: "Forensic Evidence Acquisition & Memory Dissection",
        el: "Συλλογή Πειστηρίων & Εγκληματολογική Ανάλυση Μνήμης",
      },
      description: {
        en: "Establish Chain of Custody, calculate SHA-256 baseline hashes, and parse the raw memory image with Volatility 3 to extract injected payloads.",
        el: "Σύνταξη Αλυσίδας Επιμέλειας, επαλήθευση hashes και ανάλυση του memory dump με το Volatility 3 για εξαγωγή κακόβουλων payloads.",
      },
      detailedSpec: {
        en: [
          "Architect dedicated DFIR analysis lab with isolated virtual networks and write-blocking hardware forensic stations.",
          "Establish cryptographically verified evidence vault with SHA-256 integrity hashing and RFC 3161 timestamping.",
          "Draft formal legal Chain of Custody procedures adhering to ISO/IEC 27037 standards."
],
        el: [
          "Σχεδιασμός απομονωμένου εργαστηρίου DFIR με hardware write-blockers.",
          "Δημιουργία ασφαλούς αποθήκης ψηφιακών πειστηρίων με SHA-256 hashes και RFC 3161 timestamps.",
          "Σύνταξη τυπικών διαδικασιών Chain of Custody κατά το πρότυπο ISO/IEC 27037."
],
      },
      deliverable: {
        en: "Memory forensics extraction log + extracted binary payloads.",
        el: "Αρχείο καταγραφής ανάλυσης μνήμης + εξαχθέντα εκτελέσιμα.",
      },
    },
    {
      milestoneNumber: 2,
      title: {
        en: "Disk Metadata & Timeline Dissection ($MFT / Shimcache)",
        el: "Ανάλυση Μεταδεδομένων Δίσκου & Χρονολογίου ($MFT / Shimcache)",
      },
      description: {
        en: "Extract $MFT, parse Shimcache and Prefetch files, and identify timestomping anomalies and unauthorized file staging operations.",
        el: "Εξαγωγή $MFT, ανάλυση Shimcache και Prefetch και εντοπισμός αλλοιώσεων χρονικών σημάτων (timestomping).",
      },
      detailedSpec: {
        en: [
          "Develop automated live triage acquisition scripts capturing volatile RAM, active network connections, and process memory.",
          "Automate disk forensic imaging over SSH / iSCSI preserving forensic metadata (MACB timestamps).",
          "Deploy centralized artifact parser collecting Windows Event Logs, MFT, Prefetch, and Shimcache."
],
        el: [
          "Ανάπτυξη σεναρίων άμεσης συλλογής πτητικών δεδομένων RAM, συνδέσεων δικτύου και διεργασιών.",
          "Αυτοματοποιημένη εξαγωγή αντιγράφων δίσκων μέσω SSH με διατήρηση χρονικών σημάτων MACB.",
          "Συλλογή και ανάλυση Windows Event Logs, MFT, Prefetch και Shimcache."
],
      },
      deliverable: {
        en: "Disk forensic artifact CSV + timestomping evidence report.",
        el: "Αρχεία CSV ευρημάτων δίσκου + αναφορά εντοπισμού timestomping.",
      },
    },
    {
      milestoneNumber: 3,
      title: {
        en: "Threat Infrastructure OSINT Investigation & Infrastructure Mapping",
        el: "Έρευνα OSINT Υποδομών Απειλών & Χαρτογράφηση Δικτύου Αντιπάλου",
      },
      description: {
        en: "Investigate discovered C2 IPs and domain names using Certificate Transparency logs (`crt.sh`), historical DNS, and IP ASN cluster analysis.",
        el: "Διερεύνηση των IPs και domains του C2 με χρήση logs Certificate Transparency (`crt.sh`), ιστορικού DNS και ανάλυσης ASN.",
      },
      detailedSpec: {
        en: [
          "Implement super-timeline reconstruction using Plaso / log2timeline correlating multi-source enterprise artifacts.",
          "Map attacker lateral movement, persistence mechanisms, and credential access to MITRE ATT&CK techniques.",
          "Perform reverse engineering on captured malware binaries extracting C2 IOCs and decryption algorithms."
],
        el: [
          "Ανακατασκευή super-timeline με Plaso/log2timeline για συσχέτιση συμβάντων.",
          "Χαρτογράφηση πλευρικής μετακίνησης (lateral movement) και μηχανισμών persistence στο MITRE ATT&CK.",
          "Ανάλυση κακόβουλου λογισμικού (reverse engineering) για εξαγωγή δεικτών IOCs και κλειδιών C2."
],
      },
      deliverable: {
        en: "OSINT infrastructure graph (Maltego/Draw.io) + domain dossier.",
        el: "Γράφημα υποδομών OSINT (Maltego/Draw.io) + φάκελος domains.",
      },
    },
    {
      milestoneNumber: 4,
      title: {
        en: "Master Forensic Timeline & Threat Attribution Dossier",
        el: "Ενοποιημένο Χρονολόγιο & Φάκελος Απόδοσης Ευθύνης Απειλής",
      },
      description: {
        en: "Synthesize all forensic and OSINT findings into a cohesive timeline, assess threat actor attribution confidence, and author the expert report.",
        el: "Σύνθεση όλων των ευρημάτων σε ενιαίο χρονολόγιο, αξιολόγηση επιπέδου βεβαιότητας απόδοσης και συγγραφή της τελικής έκθεσης.",
      },
      detailedSpec: {
        en: [
          "Produce comprehensive Root Cause Analysis (RCA) incident report detailing initial compromise to final containment.",
          "Formulate IOC threat intelligence packages formatted in STIX 2.1 / TAXII for external sharing.",
          "Establish regulatory breach notification playbook compliant with GDPR Article 33 (72-hour mandatory notification)."
],
        el: [
          "Σύνταξη τελικής έκθεσης Root Cause Analysis (RCA) από την αρχική παραβίαση έως τον περιορισμό.",
          "Παραγωγή πακέτων threat intelligence σε μορφή STIX 2.1 / TAXII.",
          "Ορισμός διαδικασίας κοινοποίησης παραβίασης κατά το Άρθρο 33 του GDPR (εντός 72 ωρών)."
],
      },
      deliverable: {
        en: "Comprehensive Expert Forensic & OSINT Attribution Report (12–15 pages).",
        el: "Ολοκληρωμένη Έκθεση Πραγματογνωμοσύνης & Απόδοσης OSINT (12–15 σελίδες).",
      },
    },
  ],
  deliverables: {
    en: [
      "Verified Chain of Custody & Forensic Manifest (`chain_of_custody_intake.pdf`)",
      "Consolidated Master Forensic Super-Timeline (`master_timeline.csv`)",
      "OSINT Adversary Infrastructure Graph (`threat_infrastructure_graph.png`)",
      "Full-Scope Expert Forensic & Threat Attribution Dossier (12–15 pages)",
    ],
    el: [
      "Επαληθευμένη Αλυσίδα Επιμέλειας & Πρωτόκολλο Παραλαβής (`chain_of_custody_intake.pdf`)",
      "Ενοποιημένο Χρονολόγιο Συμβάντων Super-Timeline (`master_timeline.csv`)",
      "Γράφημα Υποδομών Αντιπάλου OSINT (`threat_infrastructure_graph.png`)",
      "Πλήρης Φάκελος Πραγματογνωμοσύνης & Απόδοσης Απειλής (12–15 σελίδες)",
    ],
  },
  rubric: [
    {
      criterion: {
        en: "Forensic Methodology & Chain of Custody Rigor",
        el: "Εγκληματολογική Μεθοδολογία & Αλυσίδα Επιμέλειας",
      },
      weight: "30%",
      description: {
        en: "Strict integrity verification, write-blocking procedures, evidence preservation, and compliance with ISO/IEC 27037 standards.",
        el: "Αυστηρή επαλήθευση ακεραιότητας, διαδικασίες write-blocking, διατήρηση πειστηρίων και συμμόρφωση με το ISO/IEC 27037.",
      },
    },
    {
      criterion: {
        en: "Memory & Disk Artifact Analysis Depth",
        el: "Βάθος Ανάλυσης Ευρημάτων Μνήμης & Δίσκου",
      },
      weight: "25%",
      description: {
        en: "Accuracy of Volatility 3 dissection, detection of injected shellcode, and precise identification of timestomped NTFS records.",
        el: "Ακρίβεια ανάλυσης Volatility 3, εντοπισμός εγχυμένου shellcode και ακριβής ταυτοποίηση παραποιημένων εγγραφών NTFS.",
      },
    },
    {
      criterion: {
        en: "OSINT Threat Infrastructure Mapping Quality",
        el: "Ποιότητα Χαρτογράφησης Υποδομών OSINT",
      },
      weight: "25%",
      description: {
        en: "Thoroughness of passive DNS, SSL certificate pivot analysis, and correlation of adversary hosting assets.",
        el: "Πληρότητα αναζητήσεων passive DNS, συσχέτιση πιστοποιητικών SSL και χαρτογράφηση των εξυπηρετητών του αντιπάλου.",
      },
    },
    {
      criterion: {
        en: "Expert Witness Documentation & Evidentiary Value",
        el: "Τεκμηρίωση Πραγματογνωμοσύνης & Αποδεικτική Ισχύς",
      },
      weight: "20%",
      description: {
        en: "Professional legal writing style, clarity of timeline visualization, and justification of attribution confidence.",
        el: "Επαγγελματικός λόγος πραγματογνωμοσύνης, σαφήνεια οπτικοποίησης χρονολογίου και τεκμηρίωση βαθμού βεβαιότητας.",
      },
    },
  ],
};

export const ch12Quiz: QuizQuestion[] = [
  {
    id: 1,
    question: {
      en: "According to RFC 3227 (Order of Volatility), which evidence source must be acquired FIRST during a live digital forensics response?",
      el: "Σύμφωνα με το RFC 3227 (Σειρά Πτητικότητας), ποια πηγή πειστηρίων πρέπει να συλλέγεται ΠΡΩΤΗ κατά την ιατροδικαστική απόκριση;",
    },
    options: {
      en: [
        "Archival magnetic tape backup cartridges stored in off-site disaster recovery facility vaults, during standard continuous monitoring and administrative audits.",
        "Optical compact discs (CD-ROMs) and digital versatile discs stored in office filing cabinets, to ensure high-availability operational compliance across systems.",
        "Registers and cache memory, followed by physical RAM, network state, and temporary file systems.",
        "Printed paper administrative system documentation and network topology architectural blueprints.",
        "Hard disk drive unallocated storage partition space located on secondary storage array arrays, across distributed multi-region cloud production environments.",
      ],
      el: [
        "Μαγνητικές ταινίες αρχειοθέτησης αντιγράφων ασφαλείας αποθηκευμένες σε απομακρυσμένα θησαυροφυλάκια, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Οπτικοί δίσκοι (CD-ROMs) και ψηφιακοί δίσκοι DVD αποθηκευμένοι σε αρχειοθήκες γραφείων, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Καταχωρητές και κρυφή μνήμη (cache), ακολουθούμενα από φυσική RAM, κατάσταση δικτύου και προσωρινά αρχεία.",
        "Έντυπη τεκμηρίωση συστημάτων και σχεδιαγράμματα αρχιτεκτονικής τοπολογίας του εταιρικού δικτύου.",
        "Μη δεσμευμένος χώρος κατατμήσεων σκληρών δίσκων σε δευτερεύουσες συστοιχίες αποθήκευσης, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "RFC 3227 Order of Volatility: CPU registers/cache -> System RAM -> Network state -> Running processes -> Disk -> Archival media. The most volatile data is lost upon reboot and must be captured first.",
      el: "Η σειρά πτητικότητας κατά RFC 3227 ορίζει: Καταχωρητές/Cache -> RAM -> Κατάσταση Δικτύου -> Δίσκος -> Αρχεία Backup. Τα πιο πτητικά δεδομένα χάνονται σε επανεκκίνηση και συλλέγονται πρώτα.",
    },
  },
  {
    id: 2,
    question: {
      en: "In memory forensics using Volatility 3, what primary malicious activity does the 'windows.malfind' plugin detect?",
      el: "Στην ανάλυση μνήμης με το Volatility 3, ποια κακόβουλη δραστηριότητα εντοπίζει το plugin 'windows.malfind';",
    },
    options: {
      en: [
        "Unencrypted database SQL queries transmitted over local local-area network ethernet sockets, to ensure high-availability operational compliance across systems.",
        "Expired X.509 digital certificates installed in the operating system root trust store database, using standardized organizational security policy configurations.",
        "Hardware thermal overheating events occurring inside data center server blade cooling racks, across distributed multi-region cloud production environments.",
        "Hidden or injected code residing in memory segments marked with PAGE_EXECUTE_READWRITE (RWX) permissions.",
        "Unauthenticated user login attempts rejected by local pluggable authentication modules, without requiring manual intervention from systems engineering staff.",
      ],
      el: [
        "Μη κρυπτογραφημένα ερωτήματα SQL που μεταδίδονται στο τοπικό δίκτυο μέσω συνδέσεων ethernet, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Ληγμένα ψηφιακά πιστοποιητικά X.509 εγκατεστημένα στη βάση έμπιστων πιστοποιητικών του συστήματος, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Συμβάντα υπερθέρμανσης υλικού μέσα στις αίθουσες των εξυπηρετητών του κέντρου δεδομένων, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Κρυφό ή ενέσιμο κώδικα σε τμήματα μνήμης με δικαιώματα PAGE_EXECUTE_READWRITE (RWX).",
        "Αποτυχημένες προσπάθειες σύνδεσης χρηστών που απορρίφθηκαν από τις μονάδες ταυτοποίησης PAM, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
      ],
    },
    correctIndex: 3,
    explanation: {
      en: "The 'malfind' plugin scans process memory for unmapped virtual memory pages marked with Execute and Write permissions (RWX) containing executable code/shellcode, indicating code injection.",
      el: "Το plugin 'malfind' σαρώνει τη μνήμη διεργασιών για τμήματα με δικαιώματα RWX (εκτέλεση και εγγραφή) που περιέχουν εκτελέσιμο κώδικα (shellcode), αποκαλύπτοντας τεχνικές injection.",
    },
  },
  {
    id: 3,
    question: {
      en: "What is the primary technical capability of YARA in malware analysis and incident triage?",
      el: "Ποια είναι η βασική τεχνική δυνατότητα του YARA στην ανάλυση malware και στην απόκριση περιστατικών;",
    },
    options: {
      en: [
        "Automatically compiling Python application scripts into high-performance kernel assembly device drivers, using standardized organizational security policy configurations.",
        "Encrypting relational database tables using ephemeral symmetric block cipher keys generated per query, across distributed multi-region cloud production environments.",
        "Establishing high-speed direct peer-to-peer tunnels across transatlantic submarine communication cables, without requiring manual intervention from systems engineering staff.",
        "Managing physical facility security access control badges and employee biometric fingerprint databases, to mitigate potential unauthorized system configuration drift.",
        "Writing flexible pattern-matching rules (text, regex, hex) to classify malware families and scan files/memory.",
      ],
      el: [
        "Αυτόματη μεταγλώττιση scripts Python σε οδηγούς συσκευών πυρήνα υψηλής υπολογιστικής ταχύτητας, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Κρυπτογράφηση πινάκων βάσεων δεδομένων με εφήμερα συμμετρικά κλειδιά ανά αίτημα χρήστη, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Δημιουργία τούνελ peer-to-peer υψηλής ταχύτητας σε υποθαλάσσια καλώδια διεθνών επικοινωνιών, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Διαχείριση καρτών φυσικής πρόσβασης στις εγκαταστάσεις και βάσεων βιομετρικών δεδομένων προσωπικού, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Συγγραφή κανόνων ταυτοποίησης μοτίβων (κείμενο, regex, hex) για κατηγοριοποίηση malware σε αρχεία και μνήμη.",
      ],
    },
    correctIndex: 4,
    explanation: {
      en: "YARA allows security analysts to create rules based on textual and binary patterns (strings, hex, regex, PE headers) to detect and classify malware samples in files or active memory dumps.",
      el: "Το YARA επιτρέπει στους αναλυτές να δημιουργούν κανόνες αναγνώρισης δυαδικών μοτίβων (κείμενο, δεκαεξαδικά, regex) για τον εντοπισμό και την κατηγοριοποίηση δειγμάτων malware σε αρχεία ή στη RAM.",
    },
  },
  {
    id: 4,
    question: {
      en: "What is the fundamental difference between Static Malware Analysis and Dynamic Malware Analysis?",
      el: "Ποια είναι η βασική διαφορά μεταξύ Στατικής και Δυναμικής Ανάλυσης Κακόβουλου Λογισμικού;",
    },
    options: {
      en: [
        "Static analysis inspects binary code without execution, while dynamic analysis observes execution behavior in a sandbox.",
        "Static analysis operates exclusively on Linux servers, while dynamic analysis operates exclusively on Windows endpoints.",
        "Static analysis requires biometric smart cards, while dynamic analysis requires post-quantum asymmetric encryption, without requiring manual intervention from systems engineering staff.",
        "Static analysis is performed only by external law enforcement, while dynamic analysis is performed only by internal legal teams.",
        "Static analysis measures network switch latency, while dynamic analysis compiles executable assembly drivers, in accordance with modern zero trust architectural principles.",
      ],
      el: [
        "Η στατική ανάλυση εξετάζει το δυαδικό αρχείο χωρίς εκτέλεση, ενώ η δυναμική παρακολουθεί τη συμπεριφορά σε sandbox.",
        "Η στατική ανάλυση λειτουργεί μόνο σε Linux, ενώ η δυναμική ανάλυση λειτουργεί μόνο σε λειτουργικά Windows.",
        "Η στατική ανάλυση απαιτεί έξυπνες κάρτες, ενώ η δυναμική απαιτεί μετα-κβαντική ασύμμετρη κρυπτογράφηση, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Η στατική ανάλυση εκτελείται μόνο από διωκτικές αρχές, ενώ η δυναμική μόνο από εσωτερικές νομικές ομάδες.",
        "Η στατική ανάλυση μετρά την καθυστέρηση δικτύου, ενώ η δυναμική μεταγλωττίζει οδηγούς συσκευών, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Static analysis analyzes the binary without running it (headers, strings, disassembly, imports). Dynamic analysis executes the malware in an isolated sandbox (Cuckoo, Any.run) to observe runtime behavior (processes, registry, C2 traffic).",
      el: "Η στατική ανάλυση εξετάζει τον κώδικα χωρίς να τον εκτελεί (strings, headers, disassembly). Η δυναμική ανάλυση εκτελεί το malware σε απομονωμένο sandbox καταγράφοντας διεργασίες, αρχεία και κίνηση C2.",
    },
  },
  {
    id: 5,
    question: {
      en: "What anti-forensics technique is known as 'Timestomping'?",
      el: "Ποια τεχνική αποφυγής ιατροδικαστικής ανάλυσης είναι γνωστή ως 'Timestomping';",
    },
    options: {
      en: [
        "Overheating physical computer hardware to trigger automated safety reboots during live evidence capture, without requiring manual intervention from systems engineering staff.",
        "Manipulating filesystem metadata timestamps ($STANDARD_INFORMATION in NTFS) to blend malware with legitimate OS files.",
        "Encrypting database tables with ephemeral symmetric keys generated per individual row transaction, to mitigate potential unauthorized system configuration drift.",
        "Altering Domain Name System records to redirect network traffic to an unencrypted public web server, in accordance with modern zero trust architectural principles.",
        "Deleting operating system audit logs during scheduled nighttime system administrator maintenance windows, before committing changes to central production repository nodes.",
      ],
      el: [
        "Υπερθέρμανση του επεξεργαστή για πρόκληση αυτόματης επανεκκίνησης κατά τη συλλογή πειστηρίων, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Τροποποίηση χρονοσημάνσεων αρχείων ($STANDARD_INFORMATION στο NTFS) ώστε το malware να μοιάζει με αρχείο συστήματος.",
        "Κρυπτογράφηση πινάκων βάσεων δεδομένων με εφήμερα συμμετρικά κλειδιά ανά γραμμή συναλλαγής, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Αλλοίωση εγγραφών DNS για ανακατεύθυνση της κίνησης σε μη κρυπτογραφημένο εξυπηρετητή ιστού, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Διαγραφή αρχείων καταγραφής του λειτουργικού κατά τις νυχτερινές ώρες συντήρησης του συστήματος, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Timestomping modifies MACB (Modified, Accessed, Created, Born) timestamps of malicious files to match trusted operating system binaries, frustrating timeline reconstruction.",
      el: "Το Timestomping αλλάζει τις χρονοσημάνσεις (MACB) ενός κακόβουλου αρχείου ώστε να ταιριάζουν με νόμιμα αρχεία του λειτουργικού, δυσκολεύοντας τη χρονολογική ανακατασκευή της επίθεσης.",
    },
  },
  {
    id: 6,
    question: {
      en: "What forensic artifact in Windows operating systems tracks the execution history, path, and timestamp of recently launched GUI applications?",
      el: "Ποιο ιατροδικαστικό στοιχείο στα Windows καταγράφει το ιστορικό εκτέλεσης, τη διαδρομή και τη χρονοσήμανση εφαρμογών GUI;",
    },
    options: {
      en: [
        "The Domain Name System resolver cache stored temporarily within unpaged kernel memory pools, to mitigate potential unauthorized system configuration drift.",
        "The Address Resolution Protocol table mapping physical MAC addresses to dynamic IP subnets, in accordance with modern zero trust architectural principles.",
        "The UserAssist Registry keys (ROT13 encoded values stored within the user's NTUSER.DAT hive).",
        "The Spanning Tree Protocol database maintaining root bridge forwarding paths across switches.",
        "The Linux Pluggable Authentication Module configuration files stored within the /etc/pam.d path.",
      ],
      el: [
        "Η προσωρινή μνήμη επιλυτή DNS που αποθηκεύεται στην μη σελιδοποιημένη μνήμη του πυρήνα, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Ο πίνακας πρωτοκόλλου ARP που αντιστοιχίζει διευθύνσεις MAC σε δυναμικά υποδίκτυα IP, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Τα κλειδιά μητρώου UserAssist (τιμές κωδικοποιημένες με ROT13 στο αρχείο NTUSER.DAT του χρήστη).",
        "Η βάση δεδομένων Spanning Tree Protocol που διατηρεί διαδρομές προώθησης σε switches.",
        "Τα αρχεία ρυθμίσεων Linux PAM που βρίσκονται αποθηκευμένα στη διαδρομή /etc/pam.d.",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "UserAssist keys in the Windows Registry (NTUSER.DAT) store ROT13-encoded statistics detailing the execution count and last run timestamp of GUI programs launched by that user.",
      el: "Τα κλειδιά UserAssist στο μητρώο των Windows (NTUSER.DAT) αποθηκεύουν στατιστικά (κωδικοποιημένα με ROT13) για τον αριθμό εκτελέσεων και την τελευταία ώρα εκτέλεσης εφαρμογών.",
    },
  },
  {
    id: 7,
    question: {
      en: "What is the primary technical objective of creating a 'Super Timeline' during a digital forensics investigation?",
      el: "Ποιος είναι ο κύριος τεχνικός στόχος της δημιουργίας ενός 'Super Timeline' κατά τη διερεύνηση ψηφιακών πειστηρίων;",
    },
    options: {
      en: [
        "Accelerating graphics processing unit clock frequencies during offline cryptographic password dictionary attacks, in accordance with modern zero trust architectural principles.",
        "Replacing relational SQL database query tables with unindexed flat text files stored locally on disk, before committing changes to central production repository nodes.",
        "Bypassing operating system access controls during live volatile memory kernel acquisition routines, under standard operating procedures defined in corporate ISMS policies.",
        "Aggregating all temporal artifacts (MFT, Registry, event logs, browser history, prefetch) into a unified chronological sequence.",
        "Compressing forensic raw disk image files into lossy audio waveform representations for archive storage, across all internal enterprise network segments and endpoints.",
      ],
      el: [
        "Επιτάχυνση των καρτών γραφικών κατά την εκτέλεση επιθέσεων λεξικού σε κωδικούς πρόσβασης, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Αντικατάσταση σχεσιακών πινάκων SQL με απλά αρχεία κειμένου αποθηκευμένα τοπικά στον δίσκο, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Παράκαμψη ελέγχων πρόσβασης του λειτουργικού κατά τη συλλογή πτητικής μνήμης RAM από τον πυρήνα, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Συγκέντρωση όλων των χρονικών στοιχείων (MFT, Μητρώο, Logs, Ιστορικό) σε μια ενιαία χρονολογική ακολουθία.",
        "Συμπίεση αντιγράφων δίσκων σε ακουστικά σήματα για μακροχρόνια αρχειοθέτηση σε αποθήκες, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
      ],
    },
    correctIndex: 3,
    explanation: {
      en: "Tools like log2timeline/plaso aggregate filesystem timestamps, system logs, registry modifications, and browser history into a single cohesive timeline to correlate attacker actions chronologically.",
      el: "Το Super Timeline (μέσω εργαλείων όπως το Plaso) συγκεντρώνει όλα τα χρονικά ίχνη (αρχεία, μητρώο, καταγραφές, ιστορικό) σε μία ενιαία γραμμή χρόνου για την πλήρη κατανόηση της επίθεσης.",
    },
  },
  {
    id: 8,
    question: {
      en: "What is the role of the Master File Table (MFT) in NTFS filesystem digital forensics?",
      el: "Ποιος είναι ο ρόλος του Master File Table (MFT) στην ιατροδικαστική ανάλυση συστημάτων αρχείων NTFS;",
    },
    options: {
      en: [
        "It compiles unprivileged Python scripts into static kernel-level device driver modules during boot, before committing changes to central production repository nodes.",
        "It encrypts all network socket communications using ephemeral TLS 1.3 cryptographic session keys, under standard operating procedures defined in corporate ISMS policies.",
        "It manages physical facility cooling systems and backup diesel generators inside enterprise data centers, across all internal enterprise network segments and endpoints.",
        "It converts relational database tables into non-relational document collections in real time, during standard continuous monitoring and administrative audits.",
        "It maintains an index of every file and folder on the volume, containing metadata, timestamps, and resident data.",
      ],
      el: [
        "Μεταγλωττίζει απλά scripts Python σε οδηγούς συσκευών πυρήνα κατά την εκκίνηση του συστήματος, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Κρυπτογραφεί όλες τις συνδέσεις δικτύου χρησιμοποιώντας εφήμερα κλειδιά κρυπτογράφησης TLS 1.3, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Διαχειρίζεται τα συστήματα ψύξης και τις γεννήτριες πετρελαίου στα εταιρικά κέντρα δεδομένων, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Μετατρέπει σχεσιακούς πίνακες βάσεων δεδομένων σε μη σχεσιακά έγγραφα δεδομένων σε πραγματικό χρόνο, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Διατηρεί ευρετήριο κάθε αρχείου και φακέλου στον τόμο, περιέχοντας μεταδεδομένα, χρονοσημάνσεις και δεδομένα.",
      ],
    },
    correctIndex: 4,
    explanation: {
      en: "The $MFT is the core database of NTFS. Each record contains attributes ($STANDARD_INFORMATION, $FILE_NAME, $DATA) providing forensic evidence on file creation, modification, permissions, and small resident content.",
      el: "Το $MFT είναι η κεντρική βάση του NTFS. Κάθε εγγραφή περιέχει μεταδεδομένα για δημιουργία, τροποποίηση, διαγραφή, δικαιώματα και πιθανά υπολείμματα διαγραμμένων αρχείων (resident data).",
    },
  },
  {
    id: 9,
    question: {
      en: "How does dynamic analysis in a secure sandbox detect malware communicating with Command and Control (C2) servers?",
      el: "Πώς εντοπίζει η δυναμική ανάλυση σε ασφαλές sandbox τις επικοινωνίες ενός malware με διακομιστές C2;",
    },
    options: {
      en: [
        "By intercepting and logging DNS queries, HTTP/HTTPS beacons, and raw TCP/UDP outbound network connections in real time.",
        "By measuring the physical temperature of the server central processing unit hardware components, under standard operating procedures defined in corporate ISMS policies.",
        "By permanently deleting all operating system kernel device drivers stored within the system32 directory, across all internal enterprise network segments and endpoints.",
        "By replacing relational database SQL queries with unindexed flat text files stored locally on disk, during standard continuous monitoring and administrative audits.",
        "By disabling all transport layer security certificate validation routines across client web browsers, to ensure high-availability operational compliance across systems.",
      ],
      el: [
        "Καταγράφοντας ερωτήματα DNS, κλήσεις HTTP/HTTPS beacons και εξερχόμενες συνδέσεις TCP/UDP σε πραγματικό χρόνο.",
        "Μετρώντας τη φυσική θερμοκρασία των εξαρτημάτων του επεξεργαστή του εξυπηρετητή στο εργαστήριο, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Διαγράφοντας οριστικά όλους τους οδηγούς συσκευών του πυρήνα από τον φάκελο system32, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Αντικαθιστώντας ερωτήματα SQL με μη ευρετηριασμένα αρχεία κειμένου αποθηκευμένα τοπικά στον δίσκο, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Απενεργοποιώντας όλες τις διαδικασίες επαλήθευσης πιστοποιητικών TLS στους περιηγητές ιστού, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Sandboxes log network traffic (PCAP), capturing DNS lookups to malicious domains, IP addresses contacted, HTTP user agents, and beaconing intervals used by malware to receive attacker commands.",
      el: "Τα sandboxes καταγράφουν όλη την κίνηση δικτύου (PCAP), αποκαλύπτοντας ερωτήματα DNS σε κακόβουλα domains, διευθύνσεις IP επικοινωνίας και περιοδικά σήματα (beacons) προς τον C2.",
    },
  },
  {
    id: 10,
    question: {
      en: "What forensic artifact provides evidence of process execution on Windows by recording application launch count and prefetching pages into RAM?",
      el: "Ποιο ιατροδικαστικό στοιχείο στα Windows καταγράφει αποδείξεις εκτέλεσης διεργασιών και τον αριθμό εκκινήσεων εφαρμογών;",
    },
    options: {
      en: [
        "The Domain Name System hosts configuration file stored within the /etc/hosts filesystem path, across all internal enterprise network segments and endpoints.",
        "Windows Prefetch files (.pf files stored in C:\\Windows\\Prefetch), documenting executable name, launch count, and timestamps.",
        "The Linux Pluggable Authentication Module configuration directory located at /etc/pam.d, during standard continuous monitoring and administrative audits.",
        "The Address Resolution Protocol cache mapping physical Layer 2 MAC addresses to IP subnets, to ensure high-availability operational compliance across systems.",
        "The Spanning Tree Protocol root bridge topology database maintained across Ethernet switches, using standardized organizational security policy configurations.",
      ],
      el: [
        "Το αρχείο ρυθμίσεων hosts του DNS που βρίσκεται αποθηκευμένο στη διαδρομή /etc/hosts, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Τα αρχεία Windows Prefetch (.pf στο C:\\Windows\\Prefetch), καταγράφοντας όνομα εκτελέσιμου, πλήθος εκκινήσεων και ώρες.",
        "Ο φάκελος ρυθμίσεων των μονάδων ταυτοποίησης Linux PAM στη διαδρομή /etc/pam.d, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Η προσωρινή μνήμη του πρωτοκόλλου ARP που αντιστοιχίζει διευθύνσεις MAC σε υποδίκτυα IP, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Η βάση δεδομένων τοπολογίας Spanning Tree Protocol που διατηρείται στους διακόπτες δικτύου, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Windows Prefetch files (.pf) are designed to speed up application loading. Forensically, they prove whether a binary executed, how many times it was run, and the last 8 execution timestamps.",
      el: "Τα αρχεία Prefetch (.pf) αποδεικνύουν ιατροδικαστικά την εκτέλεση ενός προγράμματος στα Windows, παρέχοντας το όνομα του εκτελέσιμου, το πλήθος εκκινήσεων και τις τελευταίες 8 χρονοσημάνσεις εκτέλεσης.",
    },
  },
];

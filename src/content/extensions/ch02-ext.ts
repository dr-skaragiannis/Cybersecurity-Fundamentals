import type { CliLab, HandsOnLab, TechnicalProject, QuizQuestion } from "../types";

export const ch02CliLab: CliLab = {
  id: "ch02-cli",
  title: {
    en: "OS Privilege Auditing & Access Control Sandbox",
    el: "Προσομοιωτής Ελέγχου Προνομίων ΛΣ & Ελέγχου Πρόσβασης",
  },
  scenario: {
    en: "Investigate dangerous SUID root binaries, audit POSIX extended access control lists (ACLs), and inspect Windows discretionary access control entries (DACLs).",
    el: "Ερευνήστε επικίνδυνα εκτελέσιμα SUID root, ελέγξτε τις επεκτάσεις POSIX ACLs και εξετάστε εγγραφές ελέγχου πρόσβασης DACL στα Windows.",
  },
  initialPrompt: "analyst@os-audit:~$",
  banner: {
    en: "=== Chapter 2 OS Security & DAC/MAC Sandbox ===\nTarget: Hybrid POSIX & Windows Host | Role: System Security Auditor\nType 'help' for command assistance or follow the missions below.",
    el: "=== Εργαστήριο Ασφάλειας ΛΣ Κεφαλαίου 2 ===\nΣτόχος: Υβριδικός Εξυπηρετητής POSIX & Windows | Ρόλος: Ελεγκτής Ασφάλειας\nΠληκτρολογήστε 'help' για βοήθεια ή ακολουθήστε τις παρακάτω αποστολές.",
  },
  fileSystem: {
    "payroll.db": "EMPLOYEE_ID: 1048 | SALARY: 95000 EUR | TAX_ID: GR992810 | IBAN: GR88014...",
    "custom_backup_tool": "\x7fELF (SUID binary: owner root, mode 4755)",
    "apparmor_status.txt": "apparmor module is loaded.\n14 profiles are in enforce mode.\n0 profiles are in complain mode.",
    "icacls_rules.txt": "C:\\Confidential\\Finances.xlsx NT AUTHORITY\\SYSTEM:(F)\nBUILTIN\\Administrators:(F)",
  },
  tasks: [
    {
      id: "task-1",
      title: {
        en: "Audit SUID Root Binaries across the Filesystem",
        el: "Εντοπισμός Εκτελέσιμων SUID Root στο Σύστημα Αρχείων",
      },
      description: {
        en: "Search the filesystem for binaries configured with the SUID bit (`-perm -4000`) that execute with root privileges.",
        el: "Αναζητήστε στο σύστημα αρχείων εκτελέσιμα με ενεργό το SUID bit (`-perm -4000`) που εκτελούνται με προνόμια root.",
      },
      hint: {
        en: "Execute: find / -perm -4000",
        el: "Εκτελέστε: find / -perm -4000",
      },
      solution: "find / -perm -4000",
      validateRegex: "find\\s+.*-perm.*4000",
      successMessage: {
        en: "SUID binaries enumerated! Identified unhardened custom binary `custom_backup_tool`.",
        el: "Τα SUID εκτελέσιμα καταγράφηκαν! Εντοπίστηκε το μη ενισχυμένο εκτελέσιμο `custom_backup_tool`.",
      },
    },
    {
      id: "task-2",
      title: {
        en: "Audit POSIX Extended Access Control Lists (ACL)",
        el: "Έλεγχος Εκτεταμένων Λιστών Ελέγχου Πρόσβασης (POSIX ACL)",
      },
      description: {
        en: "Inspect extended discretionary access control permissions on the sensitive `payroll.db` file using `getfacl`.",
        el: "Εξετάστε τα εκτεταμένα δικαιώματα πρόσβασης στο ευαίσθητο αρχείο `payroll.db` χρησιμοποιώντας το εργαλείο `getfacl`.",
      },
      hint: {
        en: "Execute: getfacl payroll.db",
        el: "Εκτελέστε: getfacl payroll.db",
      },
      solution: "getfacl payroll.db",
      validateRegex: "^getfacl\\s+payroll\\.db",
      successMessage: {
        en: "POSIX ACL inspected! Found active ACEs for user 'auditor' and group 'finance'.",
        el: "Το POSIX ACL ελέγχθηκε! Βρέθηκαν ενεργές εγγραφές ACE για τον χρήστη 'auditor' και την ομάδα 'finance'.",
      },
    },
    {
      id: "task-3",
      title: {
        en: "Remediate ACL Permissions for Unauthorized Groups",
        el: "Αποκατάσταση Δικαιωμάτων ACL για Μη Εξουσιοδοτημένες Ομάδες",
      },
      description: {
        en: "Revoke all access permissions for the `contractors` group on `payroll.db` using `setfacl`.",
        el: "Ανακαλέστε όλα τα δικαιώματα πρόσβασης για την ομάδα `contractors` στο `payroll.db` χρησιμοποιώντας το `setfacl`.",
      },
      hint: {
        en: "Run: setfacl -m g:contractors:--- payroll.db",
        el: "Εκτελέστε: setfacl -m g:contractors:--- payroll.db",
      },
      solution: "setfacl -m g:contractors:--- payroll.db",
      validateRegex: "^setfacl\\s+.*g:contractors:.*payroll\\.db",
      successMessage: {
        en: "ACL hardened! Unauthorized contractor group access explicitly blocked.",
        el: "Το ACL ενισχύθηκε! Η πρόσβαση της ομάδας συνεργατών αποκλείστηκε ρητά.",
      },
    },
    {
      id: "task-4",
      title: {
        en: "Audit Windows Security Descriptors via icacls",
        el: "Έλεγχος Περιγραφέων Ασφάλειας Windows μέσω icacls",
      },
      description: {
        en: "Simulate Windows DACL evaluation for the corporate financial spreadsheet using `icacls`.",
        el: "Προσομοιώστε την αξιολόγηση DACL των Windows για το εταιρικό λογιστικό φύλλο με το εργαλείο `icacls`.",
      },
      hint: {
        en: "Run: icacls C:\\Confidential\\Finances.xlsx",
        el: "Εκτελέστε: icacls C:\\Confidential\\Finances.xlsx",
      },
      solution: "icacls C:\\Confidential\\Finances.xlsx",
      validateRegex: "^icacls\\s+",
      successMessage: {
        en: "Windows DACL verified. Access restricted to SYSTEM, Administrators, and Finance Users.",
        el: "Το Windows DACL επαληθεύτηκε. Πρόσβαση έχουν μόνο το SYSTEM, οι Administrators και οι Finance Users.",
      },
    },
  ],
};

export const ch02HandsOnLab: HandsOnLab = {
  title: {
    en: "Hardening Linux & Windows Endpoints: DACL/SACL, AppArmor/SELinux & Privilege Escalation Defenses",
    el: "Ενίσχυση Τερματικών Linux & Windows: DACL/SACL, AppArmor/SELinux & Άμυνες Κλιμάκωσης Προνομίων",
  },
  subtitle: {
    en: "2-Hour Practical Lab: POSIX Permissions, Mandatory Access Control (MAC), and Windows Token Security",
    el: "Εργαστήριο 2 Ωρών: Δικαιώματα POSIX, Υποχρεωτικός Έλεγχος Πρόσβασης (MAC) και Ασφάλεια Tokens στα Windows",
  },
  duration: {
    en: "~2 Hours (120 minutes)",
    el: "~2 Ώρες (120 λεπτά)",
  },
  overview: {
    en: "This intensive technical lab equips students with real-world operating system hardening skills across POSIX (Linux) and Windows NT environments. You will analyze UID/GID credentials, audit SUID/SGID attack surfaces, configure Mandatory Access Control policies with AppArmor/SELinux, and dissect Windows Access Tokens, SIDs, DACLs, and SACLs.",
    el: "Αυτό το τεχνικό εργαστήριο εξοπλίζει τους φοιτητές με πρακτικές δεξιότητες ενίσχυσης λειτουργικών συστημάτων σε περιβάλλοντα POSIX (Linux) και Windows NT. Θα αναλύσετε διαπιστευτήρια UID/GID, θα ελέγξετε την επιφάνεια επίθεσης SUID/SGID, θα συντάξετε πολιτικές Υποχρεωτικού Ελέγχου Πρόσβασης (MAC) με AppArmor/SELinux και θα αποδομήσετε Windows Access Tokens, SIDs, DACLs και SACLs.",
  },
  environment: [
    "Ubuntu 24.04 LTS VM (Linux terminal access with `sudo`)",
    "Windows 11 / Windows Server 2022 VM (PowerShell and `icacls`)",
    "Security tools: `getfacl`, `setfacl`, `aa-status`, `auditctl`, `accesschk.exe`, `whoami /priv`",
    "GDB and strace for process privilege debugging",
  ],
  phases: [
    {
      phaseNumber: 1,
      title: {
        en: "POSIX Process Credentials & SUID Vulnerability Hunting",
        el: "Διαπιστευτήρια Διεργασιών POSIX & Εντοπισμός Ευπαθειών SUID",
      },
      estimatedTime: { en: "25 min", el: "25 λεπτά" },
      objectives: {
        en: [
          "Distinguish Real UID (RUID), Effective UID (EUID), and Saved UID (SUID).",
          "Identify dangerous SUID binaries that execute shell commands or allow file overwrites.",
          "Demonstrate privilege dropping using `setresuid()` in C.",
        ],
        el: [
          "Διάκριση Πραγματικού UID (RUID), Ενεργού UID (EUID) και Αποθηκευμένου UID (SUID).",
          "Εντοπισμός επικίνδυνων εκτελέσιμων SUID που εκτελούν εντολές κελύφους.",
          "Επίδειξη απεμπόλησης προνομίων μέσω της κλήσης `setresuid()` σε C.",
        ],
      },
      steps: {
        en: [
          "1. Inspect process credentials of your current shell:\n```bash\nid\nps -eo pid,ruid,euid,comm | grep -E 'root|sudo'\n```",
          "2. Scan for world-executable SUID binaries:\n```bash\nfind / -type f -perm -4000 -exec ls -ld {} + 2>/dev/null\n```",
          "3. Remove unnecessary SUID flags from vulnerable utilities:\n```bash\nsudo chmod u-s /usr/local/bin/legacy_backup\n```",
        ],
        el: [
          "1. Εξετάστε τα διαπιστευτήρια διεργασιών του τρέχοντος κελύφους:\n```bash\nid\nps -eo pid,ruid,euid,comm | grep -E 'root|sudo'\n```",
          "2. Αναζητήστε εκτελέσιμα SUID με δικαίωμα καθολικής εκτέλεσης:\n```bash\nfind / -type f -perm -4000 -exec ls -ld {} + 2>/dev/null\n```",
          "3. Αφαιρέστε το SUID bit από μη απαραίτητα εργαλεία:\n```bash\nsudo chmod u-s /usr/local/bin/legacy_backup\n```",
        ],
      },
    },
    {
      phaseNumber: 2,
      title: {
        en: "POSIX Access Control Lists & Linux File System Hardening",
        el: "Λίστες Ελέγχου Πρόσβασης POSIX & Ενίσχυση Συστήματος Αρχείων Linux",
      },
      estimatedTime: { en: "45 min", el: "45 λεπτά" },
      objectives: {
        en: [
          "Configure granular POSIX ACLs with `setfacl` and verify with `getfacl`.",
          "Enforce the Linux Sticky Bit (`+t`) on shared directories (`/tmp`).",
          "Mount filesystems with `noexec`, `nosuid`, and `nodev` flags.",
        ],
        el: [
          "Ρύθμιση λεπτομερών POSIX ACLs με `setfacl` και επαλήθευση με `getfacl`.",
          "Επιβολή του Sticky Bit (`+t`) σε κοινόχρηστους καταλόγους (`/tmp`).",
          "Προσάρτηση συστημάτων αρχείων με σημαίες `noexec`, `nosuid` και `nodev`.",
        ],
      },
      steps: {
        en: [
          "1. Create a secure departmental directory and set standard permissions:\n```bash\nsudo mkdir -p /srv/finance_data\nsudo chown root:finance /srv/finance_data\nsudo chmod 750 /srv/finance_data\n```",
          "2. Grant specific read-only access to external auditor `compliance_user` without group membership:\n```bash\nsudo setfacl -m u:compliance_user:r-x /srv/finance_data\nsudo getfacl /srv/finance_data\n```",
          "3. Verify `/etc/fstab` mount options for `/tmp` and `/var/tmp`.",
        ],
        el: [
          "1. Δημιουργήστε έναν ασφαλή τμηματικό κατάλογο και ορίστε βασικά δικαιώματα:\n```bash\nsudo mkdir -p /srv/finance_data\nsudo chown root:finance /srv/finance_data\nsudo chmod 750 /srv/finance_data\n```",
          "2. Παραχωρήστε δικαίωμα μόνο ανάγνωσης στον εξωτερικό ελεγκτή `compliance_user` χωρίς ένταξη στην ομάδα:\n```bash\nsudo setfacl -m u:compliance_user:r-x /srv/finance_data\nsudo getfacl /srv/finance_data\n```",
          "3. Επαληθεύστε τις επιλογές προσάρτησης στο `/etc/fstab` για τα `/tmp` και `/var/tmp`.",
        ],
      },
    },
    {
      phaseNumber: 3,
      title: {
        en: "Mandatory Access Control (MAC) with AppArmor",
        el: "Υποχρεωτικός Έλεγχος Πρόσβασης (MAC) με το AppArmor",
      },
      estimatedTime: { en: "30 min", el: "30 λεπτά" },
      objectives: {
        en: [
          "Examine active AppArmor confinement profiles via `aa-status`.",
          "Write and enforce a restrictive AppArmor profile for a custom Python web daemon.",
          "Verify containment when the daemon attempts unauthorized file access.",
        ],
        el: [
          "Εξέταση ενεργών προφίλ περιορισμού AppArmor μέσω του `aa-status`.",
          "Σύνταξη και επιβολή αυστηρού προφίλ AppArmor για προσαρμοσμένο Python daemon.",
          "Επαλήθευση αποτροπής όταν ο daemon επιχειρεί μη εξουσιοδοτημένη πρόσβαση αρχείων.",
        ],
      },
      steps: {
        en: [
          "1. Check AppArmor operational status:\n```bash\nsudo aa-status\n```",
          "2. Generate an AppArmor profile under `/etc/apparmor.d/opt.fintech.daemon` allowing only network binding on port 8080 and read access to configuration.",
          "3. Load the profile in enforce mode:\n```bash\nsudo apparmor_parser -r /etc/apparmor.d/opt.fintech.daemon\n```",
          "4. Verify rejection in system logs when accessing `/etc/shadow`:\n```bash\nsudo dmesg | grep -i apparmor\n```",
        ],
        el: [
          "1. Ελέγξτε την κατάσταση λειτουργίας του AppArmor:\n```bash\nsudo aa-status\n```",
          "2. Δημιουργήστε προφίλ AppArmor στο `/etc/apparmor.d/opt.fintech.daemon` που επιτρέπει μόνο σύνδεση δικτύου στη θύρα 8080 και ανάγνωση ρυθμίσεων.",
          "3. Φορτώστε το προφίλ σε κατάσταση επιβολής (enforce mode):\n```bash\nsudo apparmor_parser -r /etc/apparmor.d/opt.fintech.daemon\n```",
          "4. Επαληθεύστε την απόρριψη στα logs κατά την απόπειρα ανάγνωσης του `/etc/shadow`:\n```bash\nsudo dmesg | grep -i apparmor\n```",
        ],
      },
    },
    {
      phaseNumber: 4,
      title: {
        en: "Windows Access Control Architecture: Tokens, DACLs & SACLs",
        el: "Αρχιτεκτονική Ελέγχου Πρόσβασης Windows: Tokens, DACLs & SACLs",
      },
      estimatedTime: { en: "20 min", el: "20 λεπτά" },
      objectives: {
        en: [
          "Analyze Windows user Token privileges with `whoami /priv`.",
          "Inspect Discretionary (DACL) and System Access Control Lists (SACL) with PowerShell.",
          "Remediate weak object permissions using `icacls`.",
        ],
        el: [
          "Ανάλυση προνομίων Windows Access Token με την εντολή `whoami /priv`.",
          "Έλεγχος λιστών DACL και SACL μέσω του PowerShell.",
          "Αποκατάσταση χαλαρών δικαιωμάτων αντικειμένων με το `icacls`.",
        ],
      },
      steps: {
        en: [
          "1. Query active token privileges and integrity level:\n```cmd\nwhoami /priv\nwhoami /groups\n```",
          "2. Inspect NTFS permissions on sensitive directories:\n```cmd\nicacls C:\\EnterpriseSecrets\n```",
          "3. Remove inheritance and grant explicit read permissions to Auditors only:\n```cmd\nicacls C:\\EnterpriseSecrets /inheritance:r /grant:r \"CORP\\Auditors\":(OI)(CI)(R)\n```",
        ],
        el: [
          "1. Εξετάστε τα ενεργά προνόμια token και το επίπεδο ακεραιότητας (Integrity Level):\n```cmd\nwhoami /priv\nwhoami /groups\n```",
          "2. Ελέγξτε τα δικαιώματα NTFS σε ευαίσθητους καταλόγους:\n```cmd\nicacls C:\\EnterpriseSecrets\n```",
          "3. Αφαιρέστε την κληρονομικότητα και παραχωρήστε ρητή ανάγνωση μόνο στους Ελεγκτές:\n```cmd\nicacls C:\\EnterpriseSecrets /inheritance:r /grant:r \"CORP\\Auditors\":(OI)(CI)(R)\n```",
        ],
      },
    },
  ],
  deliverables: {
    en: [
      "SUID/SGID Audit and Remediation Log (`suid_audit_report.txt`)",
      "Configured AppArmor Profile (`/etc/apparmor.d/opt.fintech.daemon`)",
      "POSIX & NTFS Access Control List Matrix (`acl_hardening_matrix.csv`)",
      "Technical Verification Summary Report (2–3 pages)",
    ],
    el: [
      "Αναφορά Ελέγχου & Αποκατάστασης SUID/SGID (`suid_audit_report.txt`)",
      "Προφίλ Περιορισμού AppArmor (`/etc/apparmor.d/opt.fintech.daemon`)",
      "Πίνακας Ενίσχυσης Δικαιωμάτων POSIX & NTFS ACLs (`acl_hardening_matrix.csv`)",
      "Σύνοψη Τεχνικής Επαλήθευσης (2–3 σελίδες)",
    ],
  },
  verificationChecklist: {
    en: [
      "No unverified SUID binaries remain in system paths.",
      "Departmental data is protected with explicit POSIX ACLs rejecting unauthorized users.",
      "AppArmor profile is in enforce mode and successfully blocks unauthorized file access.",
      "Windows NTFS DACLs have inheritance disabled and enforce Principle of Least Privilege.",
    ],
    el: [
      "Δεν παραμένουν μη επαληθευμένα εκτελέσιμα SUID στις διαδρομές του συστήματος.",
      "Τα τμηματικά δεδομένα προστατεύονται με ρητά POSIX ACLs απορρίπτοντας μη εξουσιοδοτημένους χρήστες.",
      "Το προφίλ AppArmor βρίσκεται σε enforce mode και μπλοκάρει επιτυχώς μη εξουσιοδοτημένες προσβάσεις.",
      "Τα Windows NTFS DACLs έχουν απενεργοποιημένη την κληρονομικότητα και επιβάλλουν το Ελάχιστο Προνόμιο.",
    ],
  },
};

export const ch02Project: TechnicalProject = {
  id: "ch02-arch",
  category: {
    en: "Enterprise Architecture & Assessment Blueprint",
    el: "Αρχιτεκτονική Επιχείρησης & Στρατηγικό Πλάνο",
  },
  title: {
    en: "Automated Endpoint Hardening & Compliance Auditing Engine (Bash / PowerShell)",
    el: "Αυτοματοποιημένη Μηχανή Ενίσχυσης Τερματικών & Ελέγχου Συμμόρφωσης (Bash / PowerShell)",
  },
  subtitle: {
    en: "Cross-Platform OS Security Hardening, Kernel Parameter Tuning, and CIS Benchmark Automation",
    el: "Διαπλατφορμική Ενίσχυση Ασφάλειας ΛΣ, Ρύθμιση Παραμέτρων Πυρήνα και Αυτοματοποίηση CIS Benchmark",
  },
  scenario: {
    en: "An international enterprise managing a hybrid fleet of 5,000 Linux and Windows servers requires an automated, robust security auditing and hardening engine. You are tasked with developing a cross-platform tool that inspects file permissions, kernel parameters (`sysctl`), account policies, SUID binaries, and DACL/MAC configurations against CIS Benchmark Level 1 standards.",
    el: "Μια διεθνής επιχείρηση που διαχειρίζεται υβριδικό στόλο 5.000 εξυπηρετητών Linux και Windows απαιτεί μια αυτοματοποιημένη μηχανή ελέγχου και ενίσχυσης ασφάλειας. Σας ανατίθεται να αναπτύξετε ένα διαπλατφορμικό εργαλείο που ελέγχει δικαιώματα αρχείων, παραμέτρους πυρήνα (`sysctl`), πολιτικές λογαριασμών, εκτελέσιμα SUID και ρυθμίσεις DACL/MAC βάσει του προτύπου CIS Benchmark Level 1.",
  },
  objectives: {
    en: [
      "Develop a modular Bash script to audit and remediate Linux POSIX permissions and kernel sysctl parameters.",
      "Develop a PowerShell module to audit Windows DACLs, User Rights Assignment, and SMB signing.",
      "Implement automated JSON reporting mapping findings to CIS Benchmark recommendations.",
      "Ensure zero system instability through safe rollback mechanics.",
    ],
    el: [
      "Ανάπτυξη σπονδυλωτού σεναρίου Bash για έλεγχο και αποκατάσταση δικαιωμάτων POSIX και παραμέτρων sysctl.",
      "Ανάπτυξη υπομονάδας PowerShell για έλεγχο Windows DACLs, Δικαιωμάτων Χρηστών και υπογραφής SMB.",
      "Υλοποίηση αυτοματοποιημένης εξαγωγής αναφορών JSON με αντιστοίχιση στις συστάσεις CIS Benchmark.",
      "Διασφάλιση σταθερότητας συστήματος μέσω μηχανισμού ασφαλούς επαναφοράς (rollback).",
    ],
  },
  scope: {
    en: [
      "Linux: Ubuntu 22.04/24.04 and RHEL 9 (POSIX permissions, `/etc/pam.d`, `sysctl.conf`, AppArmor/SELinux).",
      "Windows: Windows Server 2022 (NTFS DACL, Local Security Policy, UAC, BitLocker status).",
    ],
    el: [
      "Linux: Ubuntu 22.04/24.04 και RHEL 9 (Δικαιώματα POSIX, `/etc/pam.d`, `sysctl.conf`, AppArmor/SELinux).",
      "Windows: Windows Server 2022 (NTFS DACL, Τοπική Πολιτική Ασφάλειας, UAC, κατάσταση BitLocker).",
    ],
  },
  milestones: [
    {
      milestoneNumber: 1,
      title: {
        en: "POSIX & Kernel Security Scanner Engine (Linux)",
        el: "Μηχανή Ελέγχου POSIX & Ασφάλειας Πυρήνα (Linux)",
      },
      description: {
        en: "Build `audit_linux.sh` to check SUID/SGID, world-writable files, unconfined processes, and ASLR/kernel protection settings.",
        el: "Δημιουργία του `audit_linux.sh` για έλεγχο SUID/SGID, καθολικά εγγράψιμων αρχείων και προστασιών ASLR.",
      },
      detailedSpec: {
        en: [
          "Benchmark AES-256-GCM vs ChaCha20-Poly1305 throughput and memory utilization under high concurrency.",
          "Implement 96-bit unique IV/Nonce counter generation preventing catastrophic GCM key reuse.",
          "Define key derivation parameters using PBKDF2 (600k iterations) and Argon2id for password storage."
],
        el: [
          "Μέτρηση επιδόσεων AES-256-GCM έναντι ChaCha20-Poly1305 σε υψηλό φόρτο.",
          "Υλοποίηση γεννήτριας μοναδικών nonces 96-bit για αποφυγή επαναχρησιμοποίησης κλειδιού στο GCM.",
          "Καθορισμός παραμέτρων παραγωγής κλειδιών με PBKDF2 και Argon2id."
],
      },
      deliverable: {
        en: "Executable Bash script + unit test output.",
        el: "Εκτελέσιμο σενάριο Bash + αποτελέσματα δοκιμών.",
      },
    },
    {
      milestoneNumber: 2,
      title: {
        en: "Windows Security Descriptor & Token Auditor (PowerShell)",
        el: "Ελεγκτής Περιγραφέων Ασφάλειας & Tokens Windows (PowerShell)",
      },
      description: {
        en: "Build `Audit-WindowsSecurity.ps1` to parse NTFS security descriptors, audit privilege grants (`SeDebugPrivilege`), and verify UAC levels.",
        el: "Δημιουργία του `Audit-WindowsSecurity.ps1` για ανάλυση περιγραφέων NTFS, προνομίων (`SeDebugPrivilege`) και UAC.",
      },
      detailedSpec: {
        en: [
          "Design hybrid key exchange protocol leveraging ECDH (X25519) with ephemeral key generation.",
          "Implement digital signature verification pipeline supporting RSA-PSS (4096-bit) and Ed25519.",
          "Architect non-repudiation logging mechanism capturing signed transaction digests."
],
        el: [
          "Σχεδιασμός υβριδικού πρωτοκόλλου ανταλλαγής κλειδιών με ECDH (X25519) και εφήμερα κλειδιά.",
          "Υλοποίηση αγωγού επαλήθευσης ψηφιακών υπογραφών με RSA-PSS (4096-bit) και Ed25519.",
          "Αρχιτεκτονική καταγραφής μη-αποποίησης με υπογεγραμμένα digests συναλλαγών."
],
      },
      deliverable: {
        en: "PowerShell script module + test execution log.",
        el: "Υπομονάδα PowerShell + αρχείο καταγραφής δοκιμών.",
      },
    },
    {
      milestoneNumber: 3,
      title: {
        en: "Automated Remediation & Rollback Subsystem",
        el: "Υποσύστημα Αυτοματοποιημένης Αποκατάστασης & Επαναφοράς",
      },
      description: {
        en: "Implement `--remediate` and `--rollback` flags that apply hardened settings while snapshotting previous configurations.",
        el: "Υλοποίηση σημαιών `--remediate` και `--rollback` που εφαρμόζουν ενισχυμένες ρυθμίσεις κρατώντας αντίγραφο ασφαλείας.",
      },
      detailedSpec: {
        en: [
          "Design 3-tier PKI CA hierarchy: Offline Root CA, Issuing Intermediate CA, and Leaf Services.",
          "Specify HSM (FIPS 140-3 Level 3) key storage requirements and quorum ceremony rules.",
          "Define automated Certificate Revocation List (CRL) distribution and OCSP stapling pipeline."
],
        el: [
          "Σχεδιασμός ιεραρχίας PKI 3 επιπέδων: Offline Root CA, Issuing Intermediate CA και Leaf Services.",
          "Προδιαγραφή αποθήκευσης κλειδιών σε HSM (FIPS 140-3 Level 3) με τελετές quorum.",
          "Καθορισμός διανομής λιστών CRL και OCSP stapling."
],
      },
      deliverable: {
        en: "Hardening engine with rollback verification.",
        el: "Μηχανή ενίσχυσης με επαληθευμένη λειτουργία rollback.",
      },
    },
    {
      milestoneNumber: 4,
      title: {
        en: "CIS Benchmark Mapping & Executive Compliance Dashboard",
        el: "Αντιστοίχιση CIS Benchmark & Επιτελικός Πίνακας Συμμόρφωσης",
      },
      description: {
        en: "Generate standardized JSON and HTML executive dashboards highlighting pass/fail rates across evaluated endpoints.",
        el: "Δημιουργία τυποποιημένων αναφορών JSON και HTML με ποσοστά επιτυχίας/αποτυχίας ανά τερματικό.",
      },
      detailedSpec: {
        en: [
          "Draft comprehensive Enterprise Cryptographic Key Management Plan compliant with NIST SP 800-57.",
          "Establish automated 90-day certificate rotation and cryptographic shredding procedures.",
          "Construct Post-Quantum Cryptography (PQC) migration timeline for ML-KEM and ML-DSA algorithms."
],
        el: [
          "Σύνταξη Πλάνου Διαχείρισης Κρυπτογραφικών Κλειδιών κατά NIST SP 800-57.",
          "Καθιέρωση διαδικασιών αυτόματης ανανέωσης πιστοποιητικών (90 ημερών) και crypto-shredding.",
          "Σχεδίαση χρονοδιαγράμματος μετάβασης σε Μετα-Κβαντική Κρυπτογραφία (PQC ML-KEM / ML-DSA)."
],
      },
      deliverable: {
        en: "Compliance dashboard generator + sample audit report.",
        el: "Γεννήτρια αναφορών συμμόρφωσης + δείγμα τελικής έκθεσης.",
      },
    },
  ],
  deliverables: {
    en: [
      "Complete Source Code Repository (`audit_linux.sh`, `Audit-WindowsSecurity.ps1`)",
      "CIS Benchmark Mapping Matrix (`cis_controls_mapping.json`)",
      "Hardening Benchmark Demonstration Video / Log Transcript",
      "Architecture & Technical Documentation (8–10 pages)",
    ],
    el: [
      "Πλήρες Αποθετήριο Πηγαίου Κώδικα (`audit_linux.sh`, `Audit-WindowsSecurity.ps1`)",
      "Πίνακας Αντιστοίχισης CIS Benchmark (`cis_controls_mapping.json`)",
      "Αποδεικτικά Εκτέλεσης & Καταγραφές Ενίσχυσης",
      "Αρχιτεκτονική & Τεχνική Τεκμηρίωση (8–10 σελίδες)",
    ],
  },
  rubric: [
    {
      criterion: {
        en: "Script Functionality & Code Quality",
        el: "Λειτουργικότητα Κώδικα & Ποιότητα Υλοποίησης",
      },
      weight: "30%",
      description: {
        en: "Clean code structure, error handling, modularity, and cross-distribution Linux/Windows compatibility.",
        el: "Καθαρή δομή κώδικα, διαχείριση σφαλμάτων, σπονδυλωτότητα και διανομή συμβατότητας Linux/Windows.",
      },
    },
    {
      criterion: {
        en: "Security Coverage (CIS Benchmark Alignment)",
        el: "Κάλυψη Ασφάλειας (Ευθυγράμμιση με CIS Benchmark)",
      },
      weight: "30%",
      description: {
        en: "Thoroughness of checks covering POSIX permissions, DACL/SACL, MAC profiles, PAM, and kernel parameters.",
        el: "Πληρότητα ελέγχων σε δικαιώματα POSIX, DACL/SACL, προφίλ MAC, PAM και παραμέτρους πυρήνα.",
      },
    },
    {
      criterion: {
        en: "Rollback Reliability & Safety Controls",
        el: "Αξιοπιστία Επαναφοράς & Μηχανισμοί Ασφάλειας",
      },
      weight: "20%",
      description: {
        en: "Fault-tolerant backup and restoration of configuration states without system bricking.",
        el: "Ανθεκτική δημιουργία αντιγράφων ασφαλείας και ασφαλής επαναφορά χωρίς πρόκληση αστάθειας.",
      },
    },
    {
      criterion: {
        en: "Technical Documentation & Reporting Quality",
        el: "Τεχνική Τεκμηρίωση & Ποιότητα Αναφορών",
      },
      weight: "20%",
      description: {
        en: "Clarity of installation guide, JSON schema correctness, and executive reporting aesthetics.",
        el: "Σαφήνεια οδηγού εγκατάστασης, ορθότητα JSON schema και επαγγελματική εμφάνιση αναφορών.",
      },
    },
  ],
};

export const ch02Quiz: QuizQuestion[] = [
  {
    id: 1,
    question: {
      en: "Why is AES in Galois/Counter Mode (AES-GCM) widely preferred over AES in Cipher Block Chaining (AES-CBC) mode?",
      el: "Γιατί το AES σε κατάσταση Galois/Counter Mode (AES-GCM) προτιμάται ευρέως έναντι του AES-CBC;",
    },
    options: {
      en: [
        "AES-GCM eliminates the requirement for any initialization vector (IV) or nonce in communication, across all internal enterprise network segments and endpoints.",
        "AES-GCM relies entirely on asymmetric elliptic curve point multiplication to encrypt individual blocks, to ensure high-availability operational compliance across systems.",
        "AES-GCM provides authenticated encryption with associated data (AEAD), ensuring both privacy and integrity.",
        "AES-GCM operates exclusively on 512-bit block lengths to resist quantum computing Shor attacks, using standardized organizational security policy configurations.",
        "AES-GCM requires zero processor hardware acceleration instructions on modern x86 and ARM architectures, across distributed multi-region cloud production environments.",
      ],
      el: [
        "Το AES-GCM εξαλείφει την ανάγκη χρήσης οποιουδήποτε διανύσματος αρχικοποίησης (IV) ή nonce, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Το AES-GCM βασίζεται εξ ολοκλήρου σε ασύμμετρο πολλαπλασιασμό σημείων ελλειπτικών καμπυλών, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Το AES-GCM παρέχει αυθεντικοποιημένη κρυπτογράφηση (AEAD), διασφαλίζοντας ταυτόχρονα εμπιστευτικότητα και ακεραιότητα.",
        "Το AES-GCM λειτουργεί αποκλειστικά με μήκος μπλοκ 512-bit για αντοχή σε κβαντικές επιθέσεις Shor, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Το AES-GCM δεν απαιτεί ειδικές εντολές επιτάχυνσης υλικού σε σύγχρονους επεξεργαστές x86 και ARM, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "AES-GCM is an Authenticated Encryption with Associated Data (AEAD) mode that delivers both confidentiality and integrity verification in a single efficient, parallelizable pass.",
      el: "Το AES-GCM είναι ένας τρόπος AEAD που παρέχει ταυτόχρονα εμπιστευτικότητα και επαλήθευση ακεραιότητας σε μία αποδοτική, παραλληλοποιήσιμη διαδικασία.",
    },
  },
  {
    id: 2,
    question: {
      en: "What catastrophic security failure occurs when the same nonce is reused with the same key in AES-GCM encryption?",
      el: "Ποια καταστροφική συνέπεια ασφάλειας προκύπτει όταν επαναχρησιμοποιείται το ίδιο nonce με το ίδιο κλειδί στο AES-GCM;",
    },
    options: {
      en: [
        "The cryptographic ciphertext is automatically erased from the recipient host memory buffer, during standard continuous monitoring and administrative audits.",
        "The operating system kernel crashes immediately due to an unhandled cryptographic memory fault, using standardized organizational security policy configurations.",
        "The symmetric encryption key is converted into an unpadded RSA public key exponent format, across distributed multi-region cloud production environments.",
        "The authentication subkey GHASH is compromised, enabling attackers to forge valid ciphertext tags.",
        "The receiver drops the TCP connection due to an unaligned byte sequence in the network stream, without requiring manual intervention from systems engineering staff.",
      ],
      el: [
        "Το κρυπτογραφημένο κείμενο διαγράφεται αυτόματα από την προσωρινή μνήμη του παραλήπτη, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Ο πυρήνας του λειτουργικού καταρρέει αμέσως λόγω μη διαχειρίσιμου κρυπτογραφικού σφάλματος μνήμης, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Το συμμετρικό κλειδί μετατρέπεται αυτόματα σε ασύμμετρο δημόσιο εκθέτη RSA χωρίς padding, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Το υποκλειδί αυθεντικοποίησης GHASH παραβιάζεται, επιτρέποντας στους επιτιθέμενους να πλαστογραφούν tags.",
        "Ο παραλήπτης απορρίπτει τη σύνδεση TCP λόγω μη ευθυγραμμισμένης ακολουθίας bytes στο δίκτυο, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
      ],
    },
    correctIndex: 3,
    explanation: {
      en: "Reusing a nonce in GCM destroys the authentication guarantees: an attacker can recover the GHASH key and forge authentication tags for arbitrary ciphertext.",
      el: "Η επανάληψη nonce στο GCM καταστρέφει την αυθεντικοποίηση: ο επιτιθέμενος μπορεί να ανακτήσει το κλειδί GHASH και να πλαστογραφήσει tags για αυθαίρετα μηνύματα.",
    },
  },
  {
    id: 3,
    question: {
      en: "Which mathematical property of cryptographic hash functions ensures that it is computationally infeasible to find ANY two distinct inputs that produce the same digest?",
      el: "Ποια μαθηματική ιδιότητα των συναρτήσεων κατακερματισμού διασφαλίζει ότι είναι υπολογιστικά ανέφικτο να βρεθούν ΟΠΟΙΑΔΗΠΟΤΕ δύο διαφορετικά μηνύματα με το ίδιο hash;",
    },
    options: {
      en: [
        "First Preimage Resistance, ensuring that given a digest y, it is difficult to find an input x such that H(x) = y, to ensure high-availability operational compliance across systems.",
        "Second Preimage Resistance, ensuring that given an input x, it is difficult to find a different input x' with H(x) = H(x').",
        "Deterministic Output Length, ensuring that all input messages produce identical bit-length representations, without requiring manual intervention from systems engineering staff.",
        "Strict Avalanche Criterion, ensuring that flipping one input bit alters at least half of the output hash bits, to mitigate potential unauthorized system configuration drift.",
        "Collision Resistance, ensuring that it is computationally infeasible to find any pair (x, x') such that H(x) = H(x').",
      ],
      el: [
        "Αντίσταση Πρώτης Προεικόνας, διασφαλίζοντας ότι για δοθέν y είναι δύσκολο να βρεθεί x ώστε H(x) = y, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Αντίσταση Δεύτερης Προεικόνας, διασφαλίζοντας ότι για δοθέν x είναι δύσκολο να βρεθεί x' ώστε H(x) = H(x').",
        "Ντετερμινιστικό Μήκος Εξόδου, διασφαλίζοντας ότι όλα τα μηνύματα παράγουν πανομοιότυπο αριθμό bits, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Κριτήριο Αυστηρής Χιονοστιβάδας, διασφαλίζοντας ότι η αλλαγή ενός bit αλλάζει τουλάχιστον τα μισά bits εξόδου, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Αντίσταση σε Συγκρούσεις, διασφαλίζοντας ότι είναι υπολογιστικά ανέφικτο να βρεθεί οποιοδήποτε ζεύγος (x, x') με H(x) = H(x').",
      ],
    },
    correctIndex: 4,
    explanation: {
      en: "Collision Resistance requires that finding any two arbitrary inputs x and x' where H(x) = H(x') is computationally infeasible.",
      el: "Η Αντίσταση σε Συγκρούσεις απαιτεί να είναι υπολογιστικά αδύνατη η εύρεση οποιωνδήποτε δύο μηνυμάτων x και x' με ίδιο αποτύπωμα H(x) = H(x').",
    },
  },
  {
    id: 4,
    question: {
      en: "How does Elliptic Curve Cryptography (ECC) compare to traditional RSA in terms of key length and computational efficiency?",
      el: "Πώς συγκρίνεται η Κρυπτογραφία Ελλειπτικών Καμπυλών (ECC) με το κλασικό RSA ως προς το μήκος κλειδιού και την υπολογιστική αποδοτικότητα;",
    },
    options: {
      en: [
        "ECC provides equivalent cryptographic security to RSA while using substantially smaller key sizes and less power.",
        "ECC requires 4096-bit keys to match the cryptographic security level of a standard 1024-bit RSA keypair, using standardized organizational security policy configurations.",
        "ECC is exclusively symmetric and cannot perform digital signature creation or public key exchange operations, without requiring manual intervention from systems engineering staff.",
        "ECC is completely vulnerable to classical brute-force searches due to polynomial-time factoring algorithms, to mitigate potential unauthorized system configuration drift.",
        "ECC replaces modular arithmetic with unencrypted plaintext bit-shifting across shared network registers, in accordance with modern zero trust architectural principles.",
      ],
      el: [
        "Το ECC παρέχει ισοδύναμη ασφάλεια με το RSA χρησιμοποιώντας σημαντικά μικρότερα κλειδιά και λιγότερη υπολογιστική ισχύ.",
        "Το ECC απαιτεί κλειδιά 4096-bit για να φτάσει το επίπεδο ασφάλειας ενός τυπικού ζεύγους κλειδιών RSA 1024-bit, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Το ECC είναι αποκλειστικά συμμετρικό και δεν υποστηρίζει ψηφιακές υπογραφές ή ανταλλαγή δημόσιων κλειδιών, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Το ECC είναι απόλυτα ευάλωτο σε κλασικές επιθέσεις εξαντλητικής αναζήτησης λόγω αλγορίθμων παραγοντοποίησης, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Το ECC αντικαθιστά την αριθμητική υπολοίπων με μη κρυπτογραφημένη ολίσθηση bits σε κοινόχρηστους καταχωρητές, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "A 256-bit ECC key offers comparable security to a 3072-bit RSA key, providing faster computation, smaller signatures, and reduced network bandwidth.",
      el: "Ένα κλειδί ECC 256-bit προσφέρει ασφάλεια ισοδύναμη με RSA 3072-bit, προσφέροντας ταχύτερους υπολογισμούς και μικρότερο μέγεθος υπογραφών.",
    },
  },
  {
    id: 5,
    question: {
      en: "What primary purpose does the Online Certificate Status Protocol (OCSP) serve within an X.509 PKI environment?",
      el: "Ποιο βασικό σκοπό εξυπηρετεί το Πρωτόκολλο Κατάστασης Πιστοποιητικών Online (OCSP) σε μια υποδομή PKI X.509;",
    },
    options: {
      en: [
        "It automatically generates new RSA private keys whenever a client web browser connects to a remote server, across distributed multi-region cloud production environments.",
        "It checks whether a digital certificate has been revoked prior to its scheduled expiration date in real time.",
        "It encrypts DNS resolution packets using post-quantum lattice-based asymmetric cryptographic algorithms, to mitigate potential unauthorized system configuration drift.",
        "It replaces the need for Root Certificate Authorities by distributing peer-to-peer trust tokens to clients, in accordance with modern zero trust architectural principles.",
        "It converts unencrypted HTTP requests into TLS 1.3 encrypted sessions without requiring server certificates, before committing changes to central production repository nodes.",
      ],
      el: [
        "Δημιουργεί αυτόματα νέα ιδιωτικά κλειδιά RSA κάθε φορά που ένας περιηγητής συνδέεται σε διακομιστή, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Ελέγχει σε πραγματικό χρόνο εάν ένα ψηφιακό πιστοποιητικό έχει ανακληθεί πριν από την προγραμματισμένη λήξη του.",
        "Κρυπτογραφεί τα πακέτα επίλυσης DNS χρησιμοποιώντας μετα-κβαντικούς αλγορίθμους πλεγμάτων, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Αντικαθιστά τις Αρχές Πιστοποίησης διανέμοντας peer-to-peer διακριτικά εμπιστοσύνης στους πελάτες, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Μετατρέπει μη κρυπτογραφημένα αιτήματα HTTP σε κρυπτογραφημένες συνόδους TLS 1.3 χωρίς πιστοποιητικά, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "OCSP allows clients to query the Certificate Authority in real time to verify whether a specific certificate has been revoked before its scheduled expiry.",
      el: "Το OCSP επιτρέπει στους πελάτες να ρωτούν την Αρχή Πιστοποίησης σε πραγματικό χρόνο για να εξακριβώσουν αν ένα πιστοποιητικό έχει ανακληθεί.",
    },
  },
  {
    id: 6,
    question: {
      en: "What is the core cryptographic mechanism behind Diffie\u2013Hellman (DH) and Elliptic Curve Diffie\u2013Hellman (ECDH)?",
      el: "Ποιος είναι ο βασικός κρυπτογραφικός μηχανισμός πίσω από τα πρωτόκολλα Diffie–Hellman (DH) και ECDH;",
    },
    options: {
      en: [
        "Signing executable binary files with a private key to prove software authenticity to operating systems, to mitigate potential unauthorized system configuration drift.",
        "Compressing large plaintext log files into small fixed-size hash representations for long-term storage, in accordance with modern zero trust architectural principles.",
        "Enabling two parties to securely establish a shared secret over an insecure channel without transmitting the secret.",
        "Encrypting hard disk drives with a master recovery password stored on a hardware security module, before committing changes to central production repository nodes.",
        "Encrypting database tables using symmetric stream ciphers with pre-shared static passwords, under standard operating procedures defined in corporate ISMS policies.",
      ],
      el: [
        "Υπογράφει εκτελέσιμα δυαδικά αρχεία με ιδιωτικό κλειδί για να αποδείξει την αυθεντικότητά τους στο λειτουργικό, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Συμπιέζει μεγάλα αρχεία καταγραφών σε μικρά σταθερά αποτυπώματα hash για μακροχρόνια αρχειοθέτηση, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Επιτρέπει σε δύο μέρη να δημιουργήσουν ένα κοινό μυστικό κλειδί μέσω μη ασφαλούς καναλιού χωρίς να το μεταδώσουν.",
        "Κρυπτογραφεί σκληρούς δίσκους με κύριο κωδικό ανάκτησης αποθηκευμένο σε μονάδα ασφαλείας υλικού (HSM), πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Κρυπτογραφεί πίνακες βάσεων δεδομένων με συμμετρικούς αλγορίθμους ροής και στατικούς κωδικούς, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "Diffie\u2013Hellman key exchange enables two communicating parties to establish a shared secret over an untrusted medium without transmitting the secret key across the wire.",
      el: "Η ανταλλαγή κλειδιών Diffie–Hellman επιτρέπει σε δύο μέρη να παράγουν ένα κοινό μυστικό κλειδί μέσω ανασφαλούς δικτύου χωρίς να το στείλουν ποτέ.",
    },
  },
  {
    id: 7,
    question: {
      en: "What security guarantee does 'Perfect Forward Secrecy' (PFS) provide in TLS protocol communications?",
      el: "Ποια εγγύηση ασφάλειας παρέχει η 'Τέλεια Μελλοντική Μυστικότητα' (PFS) στις επικοινωνίες πρωτοκόλλου TLS;",
    },
    options: {
      en: [
        "The web server is guaranteed to resist distributed denial of service floods from botnet networks, in accordance with modern zero trust architectural principles.",
        "Clients are permanently exempt from performing certificate path validation against root stores, before committing changes to central production repository nodes.",
        "All user session cookies are automatically hashed with SHA-3 before transmission over local networks, under standard operating procedures defined in corporate ISMS policies.",
        "Compromise of the server long-term private key does not reveal past recorded encrypted session traffic.",
        "Symmetric encryption algorithms are dynamically upgraded to 1024-bit key lengths per packet, across all internal enterprise network segments and endpoints.",
      ],
      el: [
        "Ο διακομιστής ιστού προστατεύεται εγγυημένα από κατανεμημένες επιθέσεις άρνησης εξυπηρέτησης (DDoS), σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Οι πελάτες απαλλάσσονται μόνιμα από την επαλήθευση της αλυσίδας πιστοποίησης των Root CA, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Όλα τα cookies συνόδου κατακερματίζονται αυτόματα με SHA-3 πριν από τη μετάδοση στο τοπικό δίκτυο, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Η παραβίαση του μακροπρόθεσμου ιδιωτικού κλειδιού του διακομιστή δεν αποκαλύπτει παλαιότερες κρυπτογραφημένες συνόδους.",
        "Οι συμμετρικοί αλγόριθμοι κρυπτογράφησης αναβαθμίζονται δυναμικά σε μήκος 1024-bit ανά πακέτο, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
      ],
    },
    correctIndex: 3,
    explanation: {
      en: "PFS generates unique ephemeral session keys for each connection (e.g. via ECDHE). If the server long-term private key is later compromised, adversaries cannot decrypt previously recorded traffic.",
      el: "Το PFS χρησιμοποιεί εφήμερα κλειδιά συνόδου (π.χ. ECDHE). Αν το μόνιμο ιδιωτικό κλειδί του διακομιστή κλαπεί αργότερα, οι επιτιθέμενοι δεν μπορούν να αποκρυπτογραφήσουν παλαιότερη κίνηση.",
    },
  },
  {
    id: 8,
    question: {
      en: "Why is Electronic Codebook (ECB) mode considered dangerously insecure for encrypting multi-block structured data?",
      el: "Γιατί η κατάσταση Electronic Codebook (ECB) θεωρείται επικίνδυνα ανασφαλής για κρυπτογράφηση δομημένων δεδομένων;",
    },
    options: {
      en: [
        "ECB requires continuous internet connectivity to Certificate Authorities during encryption operations, in accordance with modern zero trust architectural principles.",
        "ECB cannot be implemented in hardware because it uses non-linear floating point matrix computations, under standard operating procedures defined in corporate ISMS policies.",
        "ECB automatically converts 256-bit symmetric keys into weak 40-bit export-grade DES configurations, across all internal enterprise network segments and endpoints.",
        "ECB limits maximum file size transfers to sixty-four kilobytes across standard TCP transport sockets, during standard continuous monitoring and administrative audits.",
        "ECB encrypts identical plaintext blocks into identical ciphertext blocks, leaking structural data patterns.",
      ],
      el: [
        "Το ECB απαιτεί συνεχή σύνδεση στο διαδίκτυο με Αρχές Πιστοποίησης κατά τη διάρκεια της κρυπτογράφησης, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Το ECB δεν μπορεί να υλοποιηθεί σε υλικό επειδή χρησιμοποιεί μη γραμμικούς υπολογισμούς πινάκων, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Το ECB μετατρέπει αυτόματα τα συμμετρικά κλειδιά 256-bit σε αδύναμες ρυθμίσεις εξαγωγής DES 40-bit, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Το ECB περιορίζει το μέγιστο μέγεθος μεταφοράς αρχείων στα 64 kilobytes σε τυπικά sockets TCP, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Το ECB κρυπτογραφεί πανομοιότυπα μπλοκ απλού κειμένου σε πανομοιότυπα μπλοκ κρυπτοκειμένου, αποκαλύπτοντας μοτίβα.",
      ],
    },
    correctIndex: 4,
    explanation: {
      en: "Because ECB encrypts identical plaintext blocks into identical ciphertext blocks without an IV, it preserves underlying patterns (as seen in the famous ECB Tux penguin leak).",
      el: "Επειδή το ECB κρυπτογραφεί ίδια μπλοκ κειμένου στα ίδια μπλοκ κρυπτοκειμένου χωρίς IV, διατηρεί τα υποκείμενα μοτίβα (όπως στο περίφημο παράδειγμα του πιγκουίνου Tux).",
    },
  },
  {
    id: 9,
    question: {
      en: "Which NIST-standardized post-quantum cryptographic algorithm is designed for general public-key encryption and key encapsulation?",
      el: "Ποιος μετα-κβαντικός κρυπτογραφικός αλγόριθμος που τυποποιήθηκε από το NIST σχεδιάστηκε για ενθυλάκωση κλειδιών (KEM);",
    },
    options: {
      en: [
        "ML-KEM (Kyber), standardized for general lattice-based public-key encryption and key encapsulation.",
        "ML-DSA (Dilithium), standardized primarily for high-speed digital signature authentication, before committing changes to central production repository nodes.",
        "SLH-DSA (SPHINCS+), standardized as a stateless hash-based digital signature algorithm, under standard operating procedures defined in corporate ISMS policies.",
        "AES-256-CTR, standardized for symmetric stream-like block cipher encryption mechanisms, during standard continuous monitoring and administrative audits.",
        "SHA-512/256, standardized for truncated cryptographic hashing in resource-constrained systems, to ensure high-availability operational compliance across systems.",
      ],
      el: [
        "ML-KEM (Kyber), τυποποιημένος για γενική ασύμμετρη κρυπτογράφηση πλεγμάτων και ενθυλάκωση κλειδιών.",
        "ML-DSA (Dilithium), τυποποιημένος κυρίως για ψηφιακές υπογραφές υψηλής ταχύτητας, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "SLH-DSA (SPHINCS+), τυποποιημένος ως stateless αλγόριθμος υπογραφών βασισμένος σε συναρτήσεις hash, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "AES-256-CTR, τυποποιημένος για συμμετρική κρυπτογράφηση τύπου ροής σε μπλοκ δεδομένων, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "SHA-512/256, τυποποιημένος για αποκομμένο κρυπτογραφικό κατακερματισμό σε περιορισμένους πόρους, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "NIST standardized ML-KEM (FIPS 203, based on CRYSTALS-Kyber) as the primary post-quantum key encapsulation mechanism for securing key exchanges against quantum computers.",
      el: "Το NIST τυποποίησε το ML-KEM (FIPS 203, βασισμένο στο Kyber) ως τον κύριο μετα-κβαντικό μηχανισμό ενθυλάκωσης κλειδιών (KEM) έναντι κβαντικών επιθέσεων.",
    },
  },
  {
    id: 10,
    question: {
      en: "How does a digital signature mathematically verify both the authenticity and non-repudiation of a message?",
      el: "Πώς επαληθεύει μαθηματικά μια ψηφιακή υπογραφή τόσο την αυθεντικότητα όσο και τη μη αποποίηση ενός μηνύματος;",
    },
    options: {
      en: [
        "The sender encrypts the entire plaintext message using the recipient public key with CBC mode.",
        "The sender computes the message hash and encrypts/signs that hash using their own private key.",
        "The sender transmits the secret symmetric key to an intermediary proxy server for escrow storage.",
        "The sender embeds a dynamic GPS location timestamp into the TCP packet sequence header fields.",
        "The sender compresses the file using a proprietary lossless algorithm with a shared static password.",
      ],
      el: [
        "Ο αποστολέας κρυπτογραφεί ολόκληρο το μήνυμα χρησιμοποιώντας το δημόσιο κλειδί του παραλήπτη σε CBC mode.",
        "Ο αποστολέας υπολογίζει το hash του μηνύματος και το υπογράφει/κρυπτογραφεί με το δικό του ιδιωτικό κλειδί.",
        "Ο αποστολέας στέλνει το συμμετρικό κλειδί σε έναν ενδιάμεσο διακομιστή proxy για φύλαξη escrow.",
        "Ο αποστολέας ενσωματώνει δυναμική χρονοσήμανση GPS στα πεδία ακολουθίας της κεφαλίδας πακέτου TCP.",
        "Ο αποστολέας συμπιέζει το αρχείο με ιδιόκτητο αλγόριθμο και κοινόχρηστο στατικό κωδικό πρόσβασης.",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "A digital signature is created by hashing the message and encrypting/signing the hash with the sender's private key. Anyone with the sender's public key can verify the signature.",
      el: "Μια ψηφιακή υπογραφή δημιουργείται υπολογίζοντας το hash του μηνύματος και υπογράφοντάς το με το ιδιωτικό κλειδί του αποστολέα. Επαληθεύεται από οποιονδήποτε διαθέτει το δημόσιο κλειδί.",
    },
  },
];

import type { Lang } from "../content/types";

export interface CommandInsight {
  overview: string;
  fieldAnalysis: string[];
  securityTakeaway: string;
  analystTakeaway?: string;
}

/**
 * Generates an in-depth, highly specific educational explanation of the command output,
 * explaining the exact parameters, files, ports, cryptographic hashes, permission bits,
 * status codes, timestamps, and security implications visible to the learner in the terminal.
 */
export function explainCommandOutput(
  cmdStr: string,
  outputStr: string,
  chapterNum: number,
  lang: Lang = "el"
): CommandInsight {
  const isEl = lang === "el";
  const rawCmd = (cmdStr || "").trim();
  const cmd = rawCmd.toLowerCase();
  const tokens = cmd.split(/\s+/);
  const baseCmd = tokens[0];

  // =========================================================================
  // CHAPTER 1: CIA TRIAD, DATA INTEGRITY & PERMISSION HARDENING
  // =========================================================================
  if (cmd.includes("sha256sum") && (cmd.includes("ledger_2026.dat") || cmd.includes("baseline_hashes"))) {
    return {
      overview: isEl
        ? "Η εντολή `sha256sum ledger_2026.dat` υπολόγισε τη σύνοψη SHA-256 (`e3b0c44298fc...`) για το οικονομικό καθολικό `ledger_2026.dat`."
        : "The command `sha256sum ledger_2026.dat` calculated the SHA-256 cryptographic digest (`e3b0c44298fc...`) for the transaction ledger `ledger_2026.dat`.",
      fieldAnalysis: isEl
        ? [
            "**SHA-256 Digest (64 Hex / 256 bits)**: Μοναδικό μαθηματικό αποτύπωμα σταθερού μήκους που αντιστοιχεί ακριβώς στα περιεχόμενα του `ledger_2026.dat`.",
            "**Φαινόμενο Χιονοστιβάδας (Avalanche Effect)**: Εάν ακόμη και ένας χαρακτήρας στο καθολικό τροποποιηθεί (π.χ. αλλαγή ποσού συναλλαγής), τουλάχιστον το 50% των bits του hash θα αλλάξει εντελώς.",
            "**Αντίσταση σε Συγκρούσεις (Collision Resistance)**: Είναι υπολογιστικά ανέφικτο ($2^{128}$ πράξεις) να βρεθούν δύο διαφορετικά αρχεία με το ίδιο SHA-256 hash.",
            "**Επαλήθευση Ακεραιότητας (`sha256sum -c`)**: Επιβεβαιώνει αυτόματα ότι το αρχείο δεν υπέστη παραποίηση (tampering) από κακόβουλο λογισμικό ή εσωτερικό δράστη."
          ]
        : [
            "**SHA-256 Digest (64 Hex / 256 bits)**: Fixed-length mathematical fingerprint precisely representing the contents of `ledger_2026.dat`.",
            "**Avalanche Effect**: If a single character in the ledger is modified (e.g. altering a transaction amount), over 50% of the output bits will change unpredictably.",
            "**Collision Resistance**: Computationally infeasible ($2^{128}$ operations) for an attacker to produce two distinct files with identical SHA-256 digests.",
            "**Integrity Verification (`sha256sum -c`)**: Proves cryptographically that the transaction database has remained untouched and tamper-free."
          ],
      securityTakeaway: isEl
        ? "Η διατήρηση κρυπτογραφικών αποτυπωμάτων αναφοράς (baseline hashes) αποτελεί θεμελιώδη έλεγχο Ακεραιότητας (Integrity) κατά ISO 27001 και PCI-DSS για ευαίσθητα οικονομικά δεδομένα."
        : "Establishing cryptographic baseline hashes is a mandatory Integrity control under ISO 27001 and PCI-DSS to detect unauthorized tampering in sensitive ledgers.",
      analystTakeaway: isEl
        ? "Αποτέλεσμα Ελέγχου SOC: Το hash του `ledger_2026.dat` ταυτοποιήθηκε 100% με το εγκεκριμένο baseline. Δεν εντοπίστηκε αλλοίωση στα ποσά συναλλαγών."
        : "SOC Audit Result: The hash for `ledger_2026.dat` matched the approved baseline 100%. No ledger tampering detected."
    };
  }

  if (baseCmd === "stat" && (cmd.includes("secret_vault.key") || cmd.includes("ledger") || cmd.includes(".key"))) {
    return {
      overview: isEl
        ? "Η εντολή `stat secret_vault.key` ανέκτησε τα μεταδεδομένα Inode του αρχείου κρυπτογραφικού κλειδιού από το σύστημα αρχείων."
        : "The command `stat secret_vault.key` retrieved the filesystem Inode metadata and POSIX permission bits for the master cryptographic key.",
      fieldAnalysis: isEl
        ? [
            "**Access: (0644/-rw-r--r--) [ΕΥΠΑΘΕΙΑ]**: Ο ιδιοκτήτης έχει Read/Write (6), αλλά η ομάδα και όλοι οι άλλοι χρήστες του συστήματος έχουν δικαίωμα ανάγνωσης (4 = Read).",
            "**Uid: (1000/analyst) / Gid: (1000/analyst)**: Ορίζει τον κάτοχο ασφαλείας. Ωστόσο, η μάσκα 0644 επιτρέπει σε οποιονδήποτε μη προνομιούχο χρήστη να διαβάσει το ιδιωτικό κλειδί.",
            "**IO Block: 4096 / Size: 1675 bytes**: Μέγεθος του κλειδιού RSA σε μορφή PEM, επαρκές για κλειδί 2048/4096-bit.",
            "**Access/Modify/Change Timestamps**: Χρονικές σημάνσεις του Inode απαραίτητες για ψηφιακή εγκληματολογία (Forensic Timelining)."
          ]
        : [
            "**Access: (0644/-rw-r--r--) [VULNERABILITY]**: Owner has Read/Write (6), but Group and Others have Read access (4), violating key confidentiality.",
            "**Uid: (1000/analyst) / Gid: (1000/analyst)**: Identifies user ownership. However, the 0644 mask exposes the private key to all local system users.",
            "**IO Block: 4096 / Size: 1675 bytes**: Size of the PEM-encoded RSA key file, representing a 2048/4096-bit master private key.",
            "**Access/Modify/Change Timestamps**: Inode temporal metadata critical for establishing DFIR incident timelines."
          ],
      securityTakeaway: isEl
        ? "Παραβίαση της Αρχής του Ελάχιστου Προνομίου (Least Privilege): Τα ιδιωτικά κρυπτογραφικά κλειδιά δεν πρέπει ποτέ να είναι αναγνώσιμα από τρίτους (World-Readable)."
        : "Violation of the Principle of Least Privilege: Private cryptographic keys must never be readable by group or world users.",
      analystTakeaway: isEl
        ? "Εύρημα Ελέγχου: Εντοπίστηκε κρίσιμη διαμόρφωση δικαιωμάτων (0644) στο master private key. Απαιτείται άμεση ενίσχυση σε 0600."
        : "Audit Finding: Critical permissive mode (0644) detected on master private key. Immediate remediation to mode 0600 required."
    };
  }

  if (baseCmd === "chmod" && cmd.includes("600") && cmd.includes("secret_vault.key")) {
    return {
      overview: isEl
        ? "Η εντολή `chmod 600 secret_vault.key` περιόρισε τα οκταδικά δικαιώματα πρόσβασης του κλειδιού αποκλειστικά στον ιδιοκτήτη."
        : "The command `chmod 600 secret_vault.key` restricted the octal POSIX access permissions of the master key exclusively to its owner.",
      fieldAnalysis: isEl
        ? [
            "**Οκταδικός Αριθμός 600 (`-rw-------`)**: Ιδιοκτήτης = Read (4) + Write (2) = 6. Ομάδα = 0 (καμία πρόσβαση). Λοιποί = 0 (καμία πρόσβαση).",
            "**Εμπιστευτικότητα (Confidentiality)**: Αποκλείει οποιαδήποτε διεργασία ή μη προνομιούχο χρήστη από το να υποκλέψει το master κλειδί της πύλης πληρωμών.",
            "**Συμμόρφωση PCI-DSS v4.0 Requirement 3.5**: Επιβάλλει αυστηρούς τεχνικούς περιορισμούς πρόσβασης σε κρυπτογραφικά κλειδιά παραγωγής."
          ]
        : [
            "**Octal Mode 600 (`-rw-------`)**: Owner = Read (4) + Write (2) = 6. Group = 0 (no access). Others = 0 (no access).",
            "**Confidentiality Assurance**: Prevents local unprivileged processes, daemons, or malicious actors from exfiltrating the master payment key.",
            "**PCI-DSS v4.0 Requirement 3.5 Compliance**: Mandates strict technical access controls on production cryptographic keys."
          ],
      securityTakeaway: isEl
        ? "Η εφαρμογή ασφαλών προεπιλογών (Fail-Safe Defaults) και η αφαίρεση περιττών δικαιωμάτων αποτρέπει την πλευρική μετακίνηση (lateral movement) και τη διαρροή μυστικών."
        : "Enforcing Fail-Safe Defaults by stripping group and other permissions eliminates local secret exfiltration vectors.",
      analystTakeaway: isEl
        ? "Αποτέλεσμα Hardening: Το αρχείο `secret_vault.key` ενισχύθηκε επιτυχώς σε κατάσταση 0600. Η απαίτηση εμπιστευτικότητας ικανοποιήθηκε."
        : "Hardening Verification: File `secret_vault.key` successfully secured with mode 0600. Confidentiality requirements fulfilled."
    };
  }

  if (baseCmd === "cat" && cmd.includes("audit_policy.conf")) {
    return {
      overview: isEl
        ? "Η εντολή `cat audit_policy.conf` διάβασε την ενεργή πολιτική ελέγχου και παρακολούθησης ακεραιότητας του συστήματος."
        : "The command `cat audit_policy.conf` inspected the active enterprise audit logging and tamper-detection configuration.",
      fieldAnalysis: isEl
        ? [
            "**LOG_INTEGRITY=ENABLED**: Ενεργοποιεί την κρυπτογραφική υπογραφή των αρχείων καταγραφής (tamper-evident logging).",
            "**AUDIT_RETENTION_DAYS=365**: Επιβάλλει διατήρηση των αρχείων καταγραφής για 1 έτος σύμφωνα με τα πρότυπα ISO 27001 και GDPR.",
            "**ALERT_ON_TAMPER=TRUE**: Ενεργοποιεί άμεση αποστολή ειδοποιήσεων (webhooks) στο SOC σε περίπτωση τροποποίησης κρίσιμων αρχείων."
          ]
        : [
            "**LOG_INTEGRITY=ENABLED**: Enables cryptographic signing of event records for tamper-evident telemetry.",
            "**AUDIT_RETENTION_DAYS=365**: Enforces 1-year log retention policy in compliance with ISO 27001 Annex A.12 and GDPR.",
            "**ALERT_ON_TAMPER=TRUE**: Triggers automated real-time SOC incident webhooks upon detection of unauthorized file modification."
          ],
      securityTakeaway: isEl
        ? "Η συνεχής καταγραφή και παρακολούθηση (Continuous Monitoring) διασφαλίζει τη μη αποποίηση (Non-repudiation) και επιτρέπει άμεση ανίχνευση περιστατικών."
        : "Continuous tamper-evident monitoring guarantees Non-repudiation and enables rapid incident detection.",
      analystTakeaway: isEl
        ? "Αποτέλεσμα Ελέγχου: Οι ρυθμίσεις του `audit_policy.conf` είναι πλήρως ευθυγραμμισμένες με το εταιρικό πλαίσιο ασφάλειας."
        : "Audit Verification: Configuration in `audit_policy.conf` strictly complies with enterprise security baselines."
    };
  }

  // =========================================================================
  // CHAPTER 2: OPERATING SYSTEM SECURITY, SUID & ACCESS CONTROL LISTS
  // =========================================================================
  if (cmd.includes("find") && (cmd.includes("-perm -4000") || cmd.includes("4000") || cmd.includes("6000"))) {
    return {
      overview: isEl
        ? "Η εντολή `find / -perm -4000` σάρωσε το σύστημα αρχείων για εκτελέσιμα με ενεργοποιημένο το SUID (Set User ID) bit."
        : "The command `find / -perm -4000` scanned the filesystem for executable binaries configured with the SUID (Set User ID) permission bit.",
      fieldAnalysis: isEl
        ? [
            "**SUID Bit (`-rwsr-xr-x` / Mode 4000)**: Όταν ένας απλός χρήστης εκτελεί αυτό το αρχείο, η διεργασία κληρονομεί τα δικαιώματα του κατόχου του (root / Effective UID 0).",
            "**Νόμιμα SUID Binaries (`/usr/bin/passwd`, `/usr/bin/sudo`)**: Απαιτούνται για νόμιμες λειτουργίες του συστήματος (αλλαγή κωδικού από απλό χρήστη).",
            "**Επικίνδυνο Μη Εγκεκριμένο Binary (`/opt/fintech/custom_backup_tool`) [ΕΥΠΑΘΕΙΑ]**: Προσαρμοσμένο εκτελέσιμο με SUID root. Εάν περιέχει σφάλμα ή επιτρέπει shell escape (GTFOBins), επιτρέπει άμεση τοπική κλιμάκωση προνομίων (Local Privilege Escalation - LPE)."
          ]
        : [
            "**SUID Bit (`-rwsr-xr-x` / Mode 4000)**: When executed by any unprivileged user, the binary runs with the owner's elevated privileges (root / Effective UID 0).",
            "**Legitimate SUID Binaries (`/usr/bin/passwd`, `/usr/bin/sudo`)**: Required for standard OS authentication workflows.",
            "**Hazardous Custom Binary (`/opt/fintech/custom_backup_tool`) [VULNERABILITY]**: Unhardened binary running with root SUID. If vulnerable to command injection or shell escapes (GTFOBins), it enables instant Local Privilege Escalation (LPE)."
          ],
      securityTakeaway: isEl
        ? "Η παρουσία μη απαραίτητων SUID binaries αποτελεί ένα από τα συχνότερα διανύσματα κλιμάκωσης προνομίων σε περιβάλλοντα Linux (CIS Benchmark 1.1.21)."
        : "Unnecessary SUID binaries represent a primary local privilege escalation vector in Linux environments (CIS Benchmark 1.1.21).",
      analystTakeaway: isEl
        ? "Εύρημα SOC: Εντοπίστηκε μη ασφαλές εκτελέσιμο `custom_backup_tool` με SUID root. Προτείνεται άμεση αφαίρεση με `chmod u-s`."
        : "SOC Finding: Unvetted binary `custom_backup_tool` discovered with root SUID bit. Recommended immediate remediation via `chmod u-s`."
    };
  }

  if (baseCmd === "getfacl" && cmd.includes("payroll.db")) {
    return {
      overview: isEl
        ? "Η εντολή `getfacl payroll.db` ανέλυσε τις εκτεταμένες λίστες ελέγχου πρόσβασης (POSIX Access Control Lists) της βάσης μισθοδοσίας."
        : "The command `getfacl payroll.db` inspected the extended POSIX Access Control List (ACL) entries for the sensitive payroll database.",
      fieldAnalysis: isEl
        ? [
            "**# file: payroll.db / owner: root / group: fintech-ops**: Βασικός κάτοχος και κύρια ομάδα του συστήματος αρχείων.",
            "**user:auditor:r--**: Εκχωρεί ρητό δικαίωμα μόνο ανάγνωσης στον ελεγκτή `auditor` (αρχή ελάχιστου προνομίου).",
            "**group:contractors:rw- [ΚΡΙΣΙΜΗ ΕΥΠΑΘΕΙΑ]**: Η εξωτερική ομάδα συνεργατών `contractors` έχει δικαιώματα ανάγνωσης και εγγραφής στη μισθοδοσία!",
            "**mask::rw-**: Το ανώτατο όριο δικαιωμάτων για όλες τις πρόσθετες εγγραφές ACL."
          ]
        : [
            "**# file: payroll.db / owner: root / group: fintech-ops**: Base UNIX owner and primary system group.",
            "**user:auditor:r--**: Grants explicit read-only access to compliance auditor `auditor` (Principle of Least Privilege).",
            "**group:contractors:rw- [CRITICAL VULNERABILITY]**: Third-party external contractor group has read/write access to confidential payroll data!",
            "**mask::rw-**: Effective maximum permission mask applied across all discretionary ACL entries."
          ],
      securityTakeaway: isEl
        ? "Τα POSIX ACLs προσφέρουν λεπτομερή έλεγχο πρόσβασης, αλλά απαιτούν τακτικό έλεγχο ώστε να μην παραμένουν υπερβολικά δικαιώματα σε εξωτερικούς συνεργάτες (Separation of Duties)."
        : "POSIX ACLs provide granular access controls, but require periodic auditing to prevent privilege accumulation and contractor data leakage.",
      analystTakeaway: isEl
        ? "Εύρημα Συμμόρφωσης: Εντοπίστηκε μη εξουσιοδοτημένη πρόσβαση εγγραφής για την ομάδα `contractors` στο `payroll.db`. Απαιτείται ανάκληση."
        : "Compliance Finding: Unauthorized write access identified for `contractors` group on `payroll.db`. Immediate revocation required."
    };
  }

  if (baseCmd === "setfacl" && cmd.includes("contractors") && cmd.includes("payroll.db")) {
    return {
      overview: isEl
        ? "Η εντολή `setfacl -m g:contractors:--- payroll.db` ανακάλεσε όλα τα δικαιώματα πρόσβασης της ομάδας `contractors` από το αρχείο μισθοδοσίας."
        : "The command `setfacl -m g:contractors:--- payroll.db` stripped all access permissions for the `contractors` group from the payroll database.",
      fieldAnalysis: isEl
        ? [
            "**-m g:contractors:---**: Τροποποιεί (modify) την εγγραφή ACL της ομάδας `contractors` θέτοντας μηδενικά δικαιώματα (`---` = 0).",
            "**Διαχωρισμός Καθηκόντων (Separation of Duties)**: Αποκλείει εξωτερικούς αναδόχους από την ανάγνωση μισθολογικών δεδομένων και IBAN εργαζομένων.",
            "**Διατήρηση Βασικών Δικαιωμάτων**: Η ανάκληση έγινε στοχευμένα χωρίς να διαταραχθεί η πρόσβαση των εσωτερικών ελεγκτών (`auditor`)."
          ]
        : [
            "**-m g:contractors:---**: Modifies the ACL entry for group `contractors`, applying a null permission mask (`---` = 0).",
            "**Separation of Duties**: Denies third-party contractors from accessing employee salary records, tax IDs, and bank IBANs.",
            "**Targeted Remediation**: Revocation is strictly scoped to contractors without disrupting internal auditors (`auditor`)."
          ],
      securityTakeaway: isEl
        ? "Η ρητή ανάκληση δικαιωμάτων πρόσβασης σε επίπεδο ACL επιβάλλει αυστηρό έλεγχο Discretionary Access Control (DAC) σύμφωνα με το πρότυπο ISO 27001 A.9."
        : "Explicit ACL permission revocation enforces strict Discretionary Access Control (DAC) boundaries per ISO 27001 A.9.",
      analystTakeaway: isEl
        ? "Αποτέλεσμα Hardening: Η ομάδα `contractors` αποκλείστηκε πλήρως από το `payroll.db`. Το σύστημα είναι πλέον συμμορφούμενο με το GDPR."
        : "Hardening Result: The `contractors` group was completely stripped of access to `payroll.db`. GDPR compliance achieved."
    };
  }

  if (baseCmd === "icacls") {
    return {
      overview: isEl
        ? "Η εντολή `icacls` ανέλυσε τις εγγραφές Discretionary Access Control List (DACL) του συστήματος αρχείων NTFS στα Windows."
        : "The command `icacls` evaluated the Windows NTFS Discretionary Access Control List (DACL) security descriptors.",
      fieldAnalysis: isEl
        ? [
            "**NT AUTHORITY\\SYSTEM:(F) & Administrators:(F)**: Πλήρης έλεγχος (Full Control) για το λειτουργικό σύστημα και τους διαχειριστές.",
            "**CORP\\Finance-Users:(R,W)**: Δικαίωμα ανάγνωσης και εγγραφής για το εξουσιοδοτημένο προσωπικό του οικονομικού τμήματος.",
            "**CORP\\Contractors:(DENY)**: Ρητή άρνηση (Explicit Deny). Στα Windows, οι εγγραφές Deny υπερισχύουν πάντα οποιασδήποτε κληρονομούμενης άδειας Allow."
          ]
        : [
            "**NT AUTHORITY\\SYSTEM:(F) & Administrators:(F)**: Full Control granted to the local OS system authority and admin tier.",
            "**CORP\\Finance-Users:(R,W)**: Read and Write permissions granted to authorized finance department staff.",
            "**CORP\\Contractors:(DENY)**: Explicit Deny ACE. In Windows security descriptors, explicit Deny entries take absolute precedence over Allow rules."
          ],
      securityTakeaway: isEl
        ? "Η σωστή κατανόηση της ιεραρχίας DACL στα Windows και η χρήση Explicit Deny αποτρέπει μη εξουσιοδοτημένη πρόσβαση μέσω ομάδων Active Directory."
        : "Mastering Windows DACL inheritance and Explicit Deny rules ensures resilient access control across enterprise Active Directory domains.",
      analystTakeaway: isEl
        ? "Αποτέλεσμα Ελέγχου: Ο περιγραφέας ασφαλείας Windows προστατεύει αποτελεσματικά το λογιστικό φύλλο από πρόσβαση τρίτων."
        : "Audit Result: Windows security descriptor properly restricts confidential spreadsheet access from external accounts."
    };
  }

  // =========================================================================
  // CHAPTER 3: THREAT INTEL, MITRE ATT&CK & ADVERSARY MODELING
  // =========================================================================
  if (baseCmd === "threat-intel" || cmd.includes("apt29") || cmd.includes("midnightblizzard")) {
    return {
      overview: isEl
        ? "Η εντολή `threat-intel --actor APT29` ανέκτησε το προφίλ κυβερνοαπειλής (Cyber Threat Intelligence) για την προηγμένη ομάδα APT29 (Cozy Bear / Midnight Blizzard)."
        : "The command `threat-intel --actor APT29` retrieved the threat intelligence dossier for advanced persistent threat group APT29 (Midnight Blizzard / Cozy Bear).",
      fieldAnalysis: isEl
        ? [
            "**Actor Classification: State-Sponsored APT**: Κρατικά υποστηριζόμενος δράστης με υψηλή χρηματοδότηση, εξειδίκευση και μακροχρόνια stealth επιμονή (persistence).",
            "**Target Sectors (Government, Finance, Cloud Identity)**: Στοχεύει κρίσιμες υποδομές, κυβερνητικούς οργανισμούς και παρόχους cloud ταυτότητας (OAuth token abuses).",
            "**Tooling (WellMess, Cobalt Strike, Nobelium)**: Εξειδικευμένα εργαλεία C2, memory injection και παραβίαση μηχανισμών federated authentication."
          ]
        : [
            "**Actor Classification: State-Sponsored APT**: Well-resourced, highly sophisticated adversary characterized by long-term stealth persistence.",
            "**Target Sectors (Government, Finance, Cloud Identity)**: Actively targets critical infrastructure, government agencies, and cloud identity providers (OAuth abuse).",
            "**Tooling (WellMess, Cobalt Strike, Nobelium)**: Custom C2 implants, in-memory loaders, and federated authentication token forging."
          ],
      securityTakeaway: isEl
        ? "Η αξιοποίηση του Threat Intelligence επιτρέπει στους αμυνόμενους να μεταβούν από παθητική άμυνα σε προληπτικό κυνήγι απειλών (Proactive Threat Hunting)."
        : "Integrating Threat Intelligence enables security teams to transition from reactive monitoring to proactive, intelligence-led threat hunting.",
      analystTakeaway: isEl
        ? "Εκτίμηση Απειλής SOC: Απαιτείται αυστηρός έλεγχος των OAuth App permissions και αναζήτηση IoCs του Cobalt Strike στα endpoints."
        : "SOC Threat Assessment: High-priority review of cloud OAuth application permissions and endpoint hunts for Cobalt Strike beacons."
    };
  }

  if (baseCmd === "att&ck" || cmd.includes("initial-access") || cmd.includes("t1566")) {
    return {
      overview: isEl
        ? "Η εντολή `att&ck --tactic initial-access` χαρτογράφησε τις τεχνικές αρχικής πρόσβασης σύμφωνα με το πλαίσιο MITRE ATT&CK (Matrix ID: TA0001)."
        : "The command `att&ck --tactic initial-access` mapped adversary initial access techniques against the MITRE ATT&CK Framework (Matrix ID: TA0001).",
      fieldAnalysis: isEl
        ? [
            "**T1566: Phishing (Spearphishing Attachment/Link)**: Η κυριότερη τεχνική εισόδου μέσω εξαπάτησης χρηστών και εκτέλεσης κακόβουλων αρχείων.",
            "**T1190: Exploit Public-Facing Application**: Εκμετάλλευση ευπαθειών σε εκτεθειμένους web servers (π.χ. μη ενημερωμένο Apache, RCEs).",
            "**T1078: Valid Accounts**: Χρήση υποκλαπέντων διαπιστευτηρίων ή API keys για νόμιμη είσοδο χωρίς να ενεργοποιηθούν συναγερμοί malware.",
            "**T1133: External Remote Services**: Προσπάθειες σύνδεσης σε μη προστατευμένα VPNs ή RDP θύρες χωρίς Multi-Factor Authentication (MFA)."
          ]
        : [
            "**T1566: Phishing (Spearphishing Attachment/Link)**: Primary entry vector targeting human trust to execute initial payloads.",
            "**T1190: Exploit Public-Facing Application**: Exploiting unpatched perimeter web daemons and remote code execution vulnerabilities.",
            "**T1078: Valid Accounts**: Utilizing compromised cloud credentials or API tokens to blend in with legitimate enterprise traffic.",
            "**T1133: External Remote Services**: Exploiting external-facing VPN gateways or RDP ports lacking Multi-Factor Authentication (MFA)."
          ],
      securityTakeaway: isEl
        ? "Η χαρτογράφηση στο MITRE ATT&CK επιτρέπει τον εντοπισμό κενών στην ανίχνευση (Coverage Gaps) και την ανάπτυξη στοχευμένων κανόνων SIEM/EDR."
        : "Mapping telemetry to MITRE ATT&CK identifies detection coverage gaps and drives targeted SIEM/EDR detection engineering.",
      analystTakeaway: isEl
        ? "Σχεδιασμός Άμυνας: Επιβολή MFA σε όλες τις εξωτερικές υπηρεσίες (T1133) και ενεργοποίηση sandboxing σε email attachments (T1566)."
        : "Defensive Blueprint: Enforce FIDO2 MFA on all remote gateways (T1133) and deploy automated attachment sandboxing (T1566)."
    };
  }

  if (baseCmd === "killchain-trace" || cmd.includes("inc-4029")) {
    return {
      overview: isEl
        ? "Η εντολή `killchain-trace --incident INC-4029` ανέλυσε το πλήρες χρονολόγιο της κυβερνοεπίθεσης βάσει του μοντέλου Lockheed Martin Cyber Kill Chain."
        : "The command `killchain-trace --incident INC-4029` reconstructed the full attack lifecycle using the Lockheed Martin Cyber Kill Chain model.",
      fieldAnalysis: isEl
        ? [
            "**1. Reconnaissance -> 2. Weaponization**: Αναγνώριση μέσω DNS και κατασκευή κακόβουλου εγγράφου Excel με εκμετάλλευση CVE-2023-38831.",
            "**3. Delivery -> 4. Exploitation**: Αποστολή μέσω πλαστογραφημένου email τιμολογίου και εκτέλεση process injection στο `explorer.exe`.",
            "**5. Installation (Persistence)**: Εγκατάσταση Scheduled Task για διατήρηση πρόσβασης μετά από επανεκκίνηση του συστήματος.",
            "**6. Command & Control (C2)**: Εγκατάσταση κρυπτογραφημένου καναλιού HTTPS προς το `c2-beacon.darkops-gateway.org`.",
            "**7. Actions on Objectives [INTERCEPTED]**: Προσπάθεια εξαγωγής βάσης δεδομένων που ανακόπηκε επιτυχώς από τα συστήματα αποτροπής διαρροής."
          ]
        : [
            "**1. Reconnaissance -> 2. Weaponization**: Target profiling via passive DNS and weaponization of a malicious Excel payload (CVE-2023-38831).",
            "**3. Delivery -> 4. Exploitation**: Spoofed invoice email delivery followed by memory process injection into `explorer.exe`.",
            "**5. Installation (Persistence)**: Registry Scheduled Task established to maintain persistent access across host reboots.",
            "**6. Command & Control (C2)**: Encrypted HTTPS beaconing initiated to dynamic domain `c2-beacon.darkops-gateway.org`.",
            "**7. Actions on Objectives [INTERCEPTED]**: Database staging attempt detected and quarantined before data exfiltration occurred."
          ],
      securityTakeaway: isEl
        ? "Η διακοπή της αλυσίδας επίθεσης (Kill Chain Break) σε οποιοδήποτε από τα πρώτα στάδια αποτρέπει πλήρως την επίτευξη του τελικού στόχου του αντιπάλου."
        : "Breaking the adversary's attack lifecycle at any early stage neutralizes the entire campaign before data loss occurs.",
      analystTakeaway: isEl
        ? "Συμπέρασμα Συμβάντος: Η επίθεση ανακόπηκε στο Στάδιο 6 (C2 Isolation). Δεν υπήρξε διαρροή ευαίσθητων οικονομικών δεδομένων."
        : "Incident Verdict: Attack severed at Stage 6 (C2 Isolation). Zero confidential financial data exfiltrated."
    };
  }

  if (baseCmd === "diamond-model" || cmd.includes("darkops-gateway.org")) {
    return {
      overview: isEl
        ? "Η εντολή `diamond-model` συσχέτισε τους 4 βασικούς κόμβους του Diamond Model (Adversary, Capability, Infrastructure, Victim)."
        : "The command `diamond-model` correlated the 4 core vertices of the Diamond Model of Intrusion Analysis (Adversary, Capability, Infrastructure, Victim).",
      fieldAnalysis: isEl
        ? [
            "**Adversary (Αντίπαλος - UNC2452)**: Η ομάδα απειλής πίσω από την εκστρατεία.",
            "**Capability (Ικανότητα)**: Multi-stage Cobalt Strike beacon με δυνατότητα παράκαμψης EDR και DNS tunneling.",
            "**Infrastructure (Υποδομή - 198.51.100.42 / darkops-gateway.org)**: Bulletproof hosting διακομιστής C2 καταχωρημένος με απόκρυψη στοιχείων.",
            "**Victim (Θύμα - FIN-SRV-01)**: Ο εσωτερικός κόμβος πληρωμών της FinTech Global Inc."
          ]
        : [
            "**Adversary (Threat Group UNC2452)**: The threat actor directing the intrusion campaign.",
            "**Capability**: Multi-stage Cobalt Strike beacon equipped with EDR evasion hooks and DNS tunneling.",
            "**Infrastructure (198.51.100.42 / darkops-gateway.org)**: Bulletproof C2 hosting proxy registered with obfuscated ownership.",
            "**Victim (FIN-SRV-01)**: FinTech Global Inc. payment gateway processing node."
          ],
      securityTakeaway: isEl
        ? "Το Diamond Model επιτρέπει τη δημιουργία αναλυτικών αξόνων (Pivoting) για την αποκάλυψη νέων κακόβουλων υποδομών που χρησιμοποιεί ο ίδιος αντίπαλος."
        : "Diamond Model pivoting enables analysts to discover related adversary infrastructure and block future attack vectors.",
      analystTakeaway: isEl
        ? "Ενέργεια SOC: Προσθήκη ολόκληρου του IP range `198.51.100.0/24` και του domain στη μαύρη λίστα του περιμετρικού firewall."
        : "SOC Action: Blocked entire IP subnet `198.51.100.0/24` and associated domain on edge firewalls and DNS sinkholes."
    };
  }

  // =========================================================================
  // CHAPTER 4: MALWARE ANALYSIS, STATIC/DYNAMIC TRIAGE & YARA
  // =========================================================================
  if (baseCmd === "strings" && cmd.includes("suspicious_sample.bin")) {
    return {
      overview: isEl
        ? "Η εντολή `strings suspicious_sample.bin` εξήγαγε όλες τις εκτυπώσιμες συμβολοσειρές ASCII και Unicode από το ύποπτο δυαδικό αρχείο."
        : "The command `strings suspicious_sample.bin` extracted all human-readable ASCII and Unicode strings from the suspicious binary.",
      fieldAnalysis: isEl
        ? [
            "**Windows API Calls (`VirtualAllocEx`, `WriteProcessMemory`, `CreateRemoteThread`)**: Κλασική υπογραφή τεχνικής Process Injection (CWE-749 / MITRE T1055).",
            "**Hardcoded C2 URL (`https://darkops-gateway.org/gate.php`)**: Διεύθυνση διακομιστή εντολών και ελέγχου για αποστολή τηλεμετρίας θύματος.",
            "**Encoded PowerShell Command (`cmd.exe /c powershell -enc JABz...`)**: Προσπάθεια εκτέλεσης κακόβουλου script σε κατάσταση Living-off-the-Land (LotL)."
          ]
        : [
            "**Windows API Calls (`VirtualAllocEx`, `WriteProcessMemory`, `CreateRemoteThread`)**: Signature sequence of in-memory Process Injection (MITRE T1055).",
            "**Hardcoded C2 Endpoint (`https://darkops-gateway.org/gate.php`)**: Command & Control staging gate for victim telemetry beaconing.",
            "**Encoded PowerShell Execution (`cmd.exe /c powershell -enc JABz...`)**: Living-off-the-Land (LotL) execution obfuscating payload staging."
          ],
      securityTakeaway: isEl
        ? "Η στατική ανάλυση συμβολοσειρών αποκαλύπτει άμεσα δείκτες παραβίασης (IoCs) και προθέσεις του κακόβουλου λογισμικού χωρίς να απαιτείται επικίνδυνη εκτέλεση."
        : "Static string extraction surfaces critical Indicators of Compromise (IoCs) and malware capabilities prior to dynamic detonation.",
      analystTakeaway: isEl
        ? "Αποτέλεσμα Ανάλυσης Malware: Επιβεβαιώθηκε κακόβουλος dropper με δυνατότητες Process Injection και επικοινωνίας C2."
        : "Malware Triage: Confirmed malicious dropper featuring process injection APIs and active C2 beaconing."
    };
  }

  if (baseCmd === "pecheck" || (baseCmd === "pecheck" && cmd.includes("suspicious_sample.bin"))) {
    return {
      overview: isEl
        ? "Το εργαλείο `pecheck` ανέλυσε την κεφαλίδα Portable Executable (PE32+) και υπολόγισε την εντροπία των επιμέρους τμημάτων (sections)."
        : "The `pecheck` tool parsed the Windows Portable Executable (PE32+) headers and calculated cryptographic entropy per section.",
      fieldAnalysis: isEl
        ? [
            "**Section .text (Entropy 6.12)**: Φυσιολογική εντροπία για εκτελέσιμο μεταγλωττισμένο κώδικα μηχανής x64.",
            "**Section .rsrc (Entropy 7.94) [ΚΡΙΣΙΜΟ ΕΥΡΗΜΑ]**: Εξαιρετικά υψηλή εντροπία κοντά στο μέγιστο (8.0), ένδειξη ότι περιέχει κρυπτογραφημένο ή συμπιεσμένο payload (Packer / Crypter).",
            "**Compile Timestamp (2026-09-27 23:14:02 UTC)**: Πρόσφατη μεταγλώττιση, αποκλείει παλιό γνωστό λογισμικό και υποδηλώνει zero-day ή targeted εκστρατεία."
          ]
        : [
            "**Section .text (Entropy 6.12)**: Expected entropy distribution for standard x64 compiled machine instructions.",
            "**Section .rsrc (Entropy 7.94) [CRITICAL INDICATOR]**: Extremely high entropy near the theoretical 8.0 ceiling, indicating packed/encrypted payload.",
            "**Compile Timestamp (2026-09-27 23:14:02 UTC)**: Recent compilation timestamp indicating a freshly crafted or targeted adversary sample."
          ],
      securityTakeaway: isEl
        ? "Η εντροπία Shannon > 7.5 σε μη κρυπτογραφικές εφαρμογές αποτελεί ισχυρότατη ένδειξη κακόβουλης συσκότισης (Malware Packing & Obfuscation)."
        : "Shannon entropy exceeding 7.5 is a high-confidence heuristic for packed, encrypted, or obfuscated malicious payloads.",
      analystTakeaway: isEl
        ? "Συμπέρασμα DFIR: Το αρχείο είναι packed ransomware dropper. Απαιτείται αποσυμπίεση (unpacking) στη μνήμη για ανάλυση του τελικού payload."
        : "DFIR Conclusion: Sample is a packed ransomware dropper requiring in-memory unpacking to recover the core payload."
    };
  }

  if (baseCmd === "yara" && cmd.includes("ransomware.yar")) {
    return {
      overview: isEl
        ? "Η μηχανή κανόνων YARA εκτέλεσε τον κανόνα `LockBit3_Behavioral_Signature` πάνω στο ύποπτο δείγμα `suspicious_sample.bin`."
        : "The YARA engine evaluated rule `LockBit3_Behavioral_Signature` against the suspicious binary `suspicious_sample.bin`.",
      fieldAnalysis: isEl
        ? [
            "**Rule Match: LockBit3_Behavioral_Signature**: Θετική αντιστοίχιση υπογραφής συμπεριφοράς ransomware.",
            "**String $s1 (Offset 0x00001a40): 'vssadmin delete shadows /all /quiet'**: Εντολή διαγραφής των αντιγράφων σκιώδους τόμου (Volume Shadow Copies) για αποτροπή ανάκτησης δεδομένων.",
            "**String $s2 (Offset 0x00002b12): 'bcdedit ignoreallfailures'**: Απενεργοποίηση των μηχανισμών αυτόματης επιδιόρθωσης των Windows κατά την εκκίνηση."
          ]
        : [
            "**Rule Match: LockBit3_Behavioral_Signature**: High-confidence detection of known ransomware behavioral mechanics.",
            "**String $s1 (Offset 0x00001a40): 'vssadmin delete shadows /all /quiet'**: Disables Windows Volume Shadow Copies to prevent data recovery.",
            "**String $s2 (Offset 0x00002b12): 'bcdedit ignoreallfailures'**: Suppresses Windows startup recovery prompts to force system lockouts."
          ],
      securityTakeaway: isEl
        ? "Οι κανόνες YARA επιτρέπουν την αναγνώριση οικογενειών κακόβουλου λογισμικού βάσει μοτίβων συμπεριφοράς (behavioral bytes) ακόμα και αν το hash του αρχείου αλλάζει."
        : "YARA rules enable reliable malware family attribution based on invariant behavioral strings regardless of file hash variations.",
      analystTakeaway: isEl
        ? "Αποτέλεσμα EDR: Το αρχείο ταυτοποιήθηκε οριστικά ως LockBit 3.0 Ransomware. Ενεργοποιήθηκε άμεση απομόνωση host και ανάκληση διαπιστευτηρίων."
        : "EDR Action: Definitive LockBit 3.0 match. Triggered automated host network isolation and credential revocation."
    };
  }

  // =========================================================================
  // CHAPTER 5: SOCIAL ENGINEERING, EMAIL SPOOFING & PHISHING DEFENSE
  // =========================================================================
  if (baseCmd === "mail-inspect" || (cmd.includes("suspicious_email.eml") && baseCmd !== "dkim-verify")) {
    return {
      overview: isEl
        ? "Η εντολή `mail-inspect` ανέλυσε τις επικεφαλίδες RFC 5322 του ύποπτου ηλεκτρονικού μηνύματος `suspicious_email.eml`."
        : "The command `mail-inspect` performed forensic header analysis on RFC 5322 email headers of `suspicious_email.eml`.",
      fieldAnalysis: isEl
        ? [
            "**From: 'FinTech CEO' <ceo@fintech-executive-board.com>**: Εμφανιζόμενη διεύθυνση αποστολέα που στοχεύει στην εξαπάτηση του θύματος (CEO Fraud / BEC).",
            "**Return-Path: <spoofed@attacker-relays.net> [ΑΝΑΝΤΙΣΤΟΙΧΙΑ]**: Η πραγματική διεύθυνση επιστροφής διαφέρει ριζικά από το εμφανιζόμενο όνομα (Domain Mismatch).",
            "**Received: from 198.51.100.55**: Η πραγματική IP διεύθυνση του διακομιστή αλληλογραφίας που ξεκίνησε την αποστολή (μη εξουσιοδοτημένος mail server).",
            "**Reply-To: wire-transfers@financial-clearance.net**: Οι απαντήσεις του θύματος θα κατευθυνθούν σε εξωτερικό λογαριασμό υπό τον έλεγχο του επιτιθέμενου."
          ]
        : [
            "**From: 'FinTech CEO' <ceo@fintech-executive-board.com>**: Display header designed for executive impersonation (CEO Fraud / BEC).",
            "**Return-Path: <spoofed@attacker-relays.net> [MISMATCH]**: Envelope sender differs from display From header, proving spoofing.",
            "**Received: from 198.51.100.55**: Originating mail relay IP address lacking authorization from the claimed enterprise domain.",
            "**Reply-To: wire-transfers@financial-clearance.net**: Diverts victim wire authorization responses to an adversary-controlled inbox."
          ],
      securityTakeaway: isEl
        ? "Οι επιθέσεις Business Email Compromise (BEC) εκμεταλλεύονται την απουσία ελέγχου ταυτότητας στο πρωτόκολλο SMTP για να παραπλανήσουν οικονομικά στελέχη."
        : "Business Email Compromise (BEC) exploits legacy SMTP trust assumptions to deceive employees into unauthorized financial transfers.",
      analystTakeaway: isEl
        ? "Εύρημα SOC: Εντοπίστηκε απόπειρα απάτης CEO Fraud / BEC. Το μήνυμα τέθηκε σε καραντίνα σε όλο το email gateway του οργανισμού."
        : "SOC Finding: Confirmed high-severity BEC / CEO Fraud attempt. Quarantined across enterprise mail gateways."
    };
  }

  if (baseCmd === "spf-check" || cmd.includes("paypa1-security.com")) {
    return {
      overview: isEl
        ? "Η εντολή `spf-check --domain paypa1-security.com` εξέτασε την εγγραφή Sender Policy Framework (RFC 7208) του domain αποστολής."
        : "The command `spf-check --domain paypa1-security.com` evaluated the Sender Policy Framework (RFC 7208) DNS record.",
      fieldAnalysis: isEl
        ? [
            "**Target Domain: paypa1-security.com (Typosquatting)**: Πλαστογραφημένο domain που μιμείται γνωστή υπηρεσία πληρωμών (ο αριθμός '1' αντί για το γράμμα 'l').",
            "**SPF Record: 'v=spf1 ip4:203.0.113.88 -all'**: Επιτρέπει αποκλειστικά την IP `203.0.113.88` να στέλνει emails εκ μέρους του domain.",
            "**Sending Server IP: 198.51.100.55 -> Result: FAIL**: Ο διακομιστής που έστειλε το email δεν ανήκει στις εξουσιοδοτημένες IPs και απορρίπτεται (`-all` = Hard Fail)."
          ]
        : [
            "**Target Domain: paypa1-security.com (Typosquatting)**: Lookalike domain mimicking a major payment brand (substituting digit '1' for letter 'l').",
            "**SPF Record: 'v=spf1 ip4:203.0.113.88 -all'**: Explicitly whitelists only IP `203.0.113.88` as an authorized sender.",
            "**Sending IP: 198.51.100.55 -> Result: FAIL**: Sending MTA is unauthorized, triggering an SPF Hard Fail (`-all`)."
          ],
      securityTakeaway: isEl
        ? "Η επιβολή SPF Hard Fail (`-all`) σε συνδυασμό με DMARC αποτρέπει τη χρήση του εταιρικού domain από μη εξουσιοδοτημένους servers αποστολής."
        : "Enforcing SPF Hard Fail (`-all`) backed by DMARC blocks unauthorized external relays from sending spoofed domain emails.",
      analystTakeaway: isEl
        ? "Αποτέλεσμα Ελέγχου: Το SPF απέτυχε οριστικά (FAIL). Ο mail server απέρριψε αυτόματα το εισερχόμενο μήνυμα."
        : "Verification Result: SPF validation returned Hard FAIL. Mail server automatically rejected the spoofed transmission."
    };
  }

  if (baseCmd === "dkim-verify" || (cmd.includes("dkim") && cmd.includes(".eml"))) {
    return {
      overview: isEl
        ? "Η εντολή `dkim-verify` επαλήθευσε την κρυπτογραφική ψηφιακή υπογραφή DomainKeys Identified Mail (RFC 6376) του email."
        : "The command `dkim-verify` validated the DomainKeys Identified Mail (RFC 6376) asymmetric cryptographic signature.",
      fieldAnalysis: isEl
        ? [
            "**Header DKIM-Signature (a=rsa-sha256, s=mail2026)**: Υπογραφή RSA-SHA256 βασισμένη στο selector `mail2026` του DNS.",
            "**Body Hash Verification: MISMATCH**: Το hash του σώματος του μηνύματος δεν ταιριάζει με το υπογεγραμμένο αποτύπωμα (το περιεχόμενο τροποποιήθηκε κατά τη μεταφορά).",
            "**Cryptographic RSA Signature: INVALID**: Η ψηφιακή υπογραφή απέτυχε, αποδεικνύοντας ότι το email πλαστογραφήθηκε."
          ]
        : [
            "**Header DKIM-Signature (a=rsa-sha256, s=mail2026)**: RSA-SHA256 digital signature referencing selector `mail2026` via DNS TXT records.",
            "**Body Hash Verification: MISMATCH**: Computed body digest does not match the signed `bh=` tag, proving message alteration in transit.",
            "**Cryptographic RSA Signature: INVALID**: Mathematical validation failed, confirming that the email was forged or tampered with."
          ],
      securityTakeaway: isEl
        ? "Το DKIM παρέχει κρυπτογραφική εγγύηση ακεραιότητας και αυθεντικότητας του μηνύματος από τον διακομιστή του αποστολέα έως τον παραλήπτη."
        : "DKIM provides end-to-end cryptographic non-repudiation and transit integrity verification for email transmissions.",
      analystTakeaway: isEl
        ? "Συμπέρασμα Forensics: Η υπογραφή DKIM είναι άκυρη (INVALID). Επιβεβαιώθηκε πλαστογράφηση ταυτότητας αποστολέα."
        : "Forensics Conclusion: DKIM signature is INVALID. Sender domain forgery conclusively confirmed."
    };
  }

  if (baseCmd === "urldecoder" || cmd.includes("safelinks") || cmd.includes("bad-actor-phish.ru")) {
    return {
      overview: isEl
        ? "Η εντολή `urldecoder` αποκάλυψε την πραγματική κακόβουλη διεύθυνση URL πίσω από τον μηχανισμό προστασίας SafeLinks."
        : "The command `urldecoder` extracted the raw destination URL from a wrapped Microsoft SafeLinks phishing URL.",
      fieldAnalysis: isEl
        ? [
            "**SafeLink Wrapper (`nam04.safelinks.protection.outlook.com`)**: Ανακατεύθυνση προστασίας email gateway.",
            "**Target Real URL (`http://bad-actor-phish.ru/login?id=4928`)**: Ο πραγματικός ιστότοπος στον οποίο οδηγείται το θύμα.",
            "**Threat Category: Credential Harvester**: Ψεύτικη σελίδα σύνδεσης Office365 που υποκλέπτει usernames, passwords και session tokens."
          ]
        : [
            "**SafeLink Wrapper (`nam04.safelinks.protection.outlook.com`)**: Gateway rewriting layer designed to proxy click destinations.",
            "**Target Destination (`http://bad-actor-phish.ru/login?id=4928`)**: Real destination host engineered to receive victim web requests.",
            "**Threat Classification: Credential Harvester**: Fraudulent Microsoft 365 login portal crafted to steal passwords and MFA session cookies."
          ],
      securityTakeaway: isEl
        ? "Η ανάλυση και αποσυσχέτιση των URLs αποκαλύπτει τις πραγματικές υποδομές συλλογής διαπιστευτηρίων των επιτιθέμενων."
        : "De-obfuscating rewritten URLs exposes raw adversary credential harvesting infrastructure for global perimeter blocking.",
      analystTakeaway: isEl
        ? "Ενέργεια SOC: Προσθήκη του `bad-actor-phish.ru` στο Web Proxy URL Blacklist και ανάκληση ενεργών sessions του στοχευμένου χρήστη."
        : "SOC Action: Blacklisted `bad-actor-phish.ru` at web proxies and revoked active sessions for targeted accounts."
    };
  }

  // =========================================================================
  // CHAPTER 6: NETWORK SCANNING, TRAFFIC FORENSICS & FIREWALLS
  // =========================================================================
  if (baseCmd === "tcpdump" || (cmd.includes("tcpdump") && cmd.includes("port 80"))) {
    return {
      overview: isEl
        ? "Η εντολή `tcpdump -i eth0 -nn -c 3 port 80` κατέγραψε ζωντανά πακέτα του TCP 3-Way Handshake (SYN -> SYN-ACK -> ACK)."
        : "The command `tcpdump -i eth0 -nn -c 3 port 80` captured the 3 packets of a live TCP Three-Way Handshake (SYN -> SYN-ACK -> ACK).",
      fieldAnalysis: isEl
        ? [
            "**Πακέτο 1 (Flags [S] / SYN)**: Ο client (`10.0.0.15:54210`) ζητά σύνδεση στέλνοντας Initial Sequence Number (`seq 3892019482`).",
            "**Πακέτο 2 (Flags [S.] / SYN-ACK)**: Ο server (`10.0.5.80:80`) αποδέχεται τη σύνδεση στέλνοντας δικό του ISN και επιβεβαίωση (`ack 3892019483`).",
            "**Πακέτο 3 (Flags [.] / ACK)**: Ο client ολοκληρώνει τη χειραψία (`ack 1092837483`) και η TCP σύνδεση τίθεται σε κατάσταση ESTABLISHED."
          ]
        : [
            "**Packet 1 (Flags [S] / SYN)**: Client (`10.0.0.15:54210`) initiates connection proposing Initial Sequence Number (`seq 3892019482`).",
            "**Packet 2 (Flags [S.] / SYN-ACK)**: Server (`10.0.5.80:80`) acknowledges client ISN (`ack 3892019483`) and returns server ISN.",
            "**Packet 3 (Flags [.] / ACK)**: Client finalizes handshake (`ack 1092837483`), transitioning the TCP socket to ESTABLISHED."
          ],
      securityTakeaway: isEl
        ? "Η πλήρης κατανόηση της χειραψίας TCP επιτρέπει τον εντοπισμό επιθέσεων SYN Flood DoS, Port Scans και μη φυσιολογικών TCP flags."
        : "Deep visibility into TCP handshakes enables rapid detection of SYN flood denial-of-service attacks and stealth port scans.",
      analystTakeaway: isEl
        ? "Ανάλυση Δικτύου: Καταγράφηκε επιτυχής, φυσιολογική εγκατάσταση TCP συνόδου χωρίς ενδείξεις επίθεσης ή packet loss."
        : "Network Telemetry: Confirmed healthy TCP connection establishment with zero packet loss or anomalous flags."
    };
  }

  // =========================================================================
  // CHAPTER 7: CRYPTOGRAPHY, RSA KEYS & X.509 CERTIFICATES
  // =========================================================================
  if (baseCmd === "openssl" && (cmd.includes("genrsa") || cmd.includes("genpkey") || cmd.includes("4096"))) {
    return {
      overview: isEl
        ? "Η εντολή `openssl genrsa -out private.key 4096` δημιούργησε ένα νέο ασύμμετρο ιδιωτικό κλειδί RSA μήκους 4096 bits."
        : "The command `openssl genrsa -out private.key 4096` generated a robust 4096-bit RSA asymmetric private key.",
      fieldAnalysis: isEl
        ? [
            "**RSA Modulus Length: 4096 bits**: Προσφέρει ισχυρότατη ασφάλεια (ισοδύναμη με 128-bit συμμετρικής κρυπτογράφησης), ανθεκτική σε επιθέσεις παραγοντοποίησης.",
            "**Public Exponent e = 65537 (0x010001)**: Ο καθιερωμένος πρώτος αριθμός Fermat ($F_4$) που παρέχει ταχύτατο υπολογισμό χωρίς αδυναμίες ασφαλείας.",
            "**Private Key Secrecy**: Το αρχείο `private.key` περιέχει τους δύο μυστικούς πρώτους αριθμούς $p$ και $q$ και πρέπει να προστατεύεται με δικαιώματα 0600."
          ]
        : [
            "**RSA Modulus Length: 4096 bits**: Provides high-grade security (128-bit symmetric security level equivalent) resilient against factorization.",
            "**Public Exponent e = 65537 (0x010001)**: Standard Fermat prime ($F_4$) enabling fast encryption while mitigating Coppersmith attacks.",
            "**Private Key Secrecy**: File `private.key` encodes secret prime factors $p$ and $q$ and must be strictly confined to mode 0600."
          ],
      securityTakeaway: isEl
        ? "Η χρήση επαρκούς μήκους κλειδιού (τουλάχιστον RSA-3072 ή RSA-4096) είναι απαραίτητη σύμφωνα με τις οδηγίες του NIST SP 800-57."
        : "Enforcing minimum RSA key lengths of 3072/4096 bits complies with NIST SP 800-57 cryptographic lifecycle guidelines.",
      analystTakeaway: isEl
        ? "Αποτέλεσμα PKI: Δημιουργήθηκε επιτυχώς κρυπτογραφικό ζεύγος RSA-4096 για χρήση στον διακομιστή API."
        : "PKI Milestone: Successfully provisioned production-ready RSA-4096 keypair for secure API gateway transport."
    };
  }

  if (baseCmd === "openssl" && cmd.includes("req") && cmd.includes("csr")) {
    return {
      overview: isEl
        ? "Η εντολή `openssl req -new` δημιούργησε ένα Αίτημα Υπογραφής Πιστοποιητικού PKCS#10 (Certificate Signing Request - CSR)."
        : "The command `openssl req -new` generated a PKCS#10 Certificate Signing Request (CSR) for Certificate Authority submission.",
      fieldAnalysis: isEl
        ? [
            "**Subject: CN=api.fintech.internal, O=FinTech Global, C=GR**: Προσδιορίζει τη νομική ταυτότητα και το πλήρες όνομα τομέα (FQDN) του διακομιστή.",
            "**Public Key Inclusion**: Ενσωματώνει το δημόσιο κλειδί RSA-4096 ώστε η Αρχή Πιστοποίησης (CA) να το υπογράψει.",
            "**Proof of Possession**: Το CSR υπογράφεται ψηφιακά με το ιδιωτικό κλειδί, αποδεικνύοντας ότι ο αιτών κατέχει πράγματι το αντίστοιχο μυστικό κλειδί."
          ]
        : [
            "**Subject: CN=api.fintech.internal, O=FinTech Global, C=GR**: Identifies the legal organization and fully qualified domain name (FQDN).",
            "**Public Key Binding**: Embeds the RSA-4096 public key for signing by the internal Intermediate Certificate Authority.",
            "**Proof of Possession**: Digitally signed by the private key, mathematically proving the requester owns the private key."
          ],
      securityTakeaway: isEl
        ? "Τα CSRs επιτρέπουν την ασφαλή έκδοση πιστοποιητικών X.509 χωρίς να αποκαλύπτεται ποτέ το ιδιωτικό κλειδί στην Αρχή Πιστοποίησης."
        : "CSRs facilitate secure X.509 certificate issuance without ever sharing or exposing the private key to external parties.",
      analystTakeaway: isEl
        ? "Επαλήθευση PKI: Το CSR δημιουργήθηκε έγκυρα και είναι έτοιμο για υπογραφή από την Intermediate CA."
        : "PKI Verification: Valid CSR generated with SHA-256 signature, ready for Intermediate CA processing."
    };
  }

  if (baseCmd === "openssl" && cmd.includes("x509") && (cmd.includes("-text") || cmd.includes("cert.crt"))) {
    return {
      overview: isEl
        ? "Η εντολή `openssl x509 -text -noout` αποκωδικοποίησε και εμφάνισε αναλυτικά τα πεδία του ψηφιακού πιστοποιητικού X.509 v3."
        : "The command `openssl x509 -text -noout` parsed and displayed the structural attributes of the X.509 v3 digital certificate.",
      fieldAnalysis: isEl
        ? [
            "**Serial Number: 1001 (0x3e9)**: Μοναδικός σειριακός αριθμός που αποδόθηκε από την εκδούσα Αρχή Πιστοποίησης.",
            "**Validity (NotBefore / NotAfter)**: Χρονικό διάστημα ισχύος του πιστοποιητικού (ακριβώς 365 ημέρες).",
            "**Subject Alternative Names (SAN)**: `DNS:api.fintech.internal, DNS:gateway.fintech.internal` (απαραίτητο για σύγχρονα προγράμματα περιήγησης και TLS clients).",
            "**Signature Algorithm: sha256WithRSAEncryption**: Ισχυρός αλγόριθμος υπογραφής που αποτρέπει επιθέσεις πλαστογράφησης πιστοποιητικού."
          ]
        : [
            "**Serial Number: 1001 (0x3e9)**: Unique tracking identifier assigned by the issuing Certificate Authority.",
            "**Validity Window (NotBefore / NotAfter)**: Enforces certificate expiration exactly 365 days from issuance.",
            "**Subject Alternative Names (SAN)**: `DNS:api.fintech.internal, DNS:gateway.fintech.internal` (mandatory for modern TLS validation).",
            "**Signature Algorithm: sha256WithRSAEncryption**: Modern cryptographically secure signature algorithm."
          ],
      securityTakeaway: isEl
        ? "Ο έλεγχος των επεκτάσεων SAN και της αλυσίδας πιστοποίησης (Trust Chain) αποτρέπει επιθέσεις ενδιάμεσου (Man-in-the-Middle - MITM)."
        : "Validating SAN extensions and CA certificate chains prevents Man-in-the-Middle (MITM) impersonation attacks.",
      analystTakeaway: isEl
        ? "Αποτέλεσμα Ελέγχου: Το πιστοποιητικό είναι έγκυρο, περιλαμβάνει σωστά SANs και υπογράφεται από αξιόπιστη CA."
        : "Audit Result: X.509 certificate is fully valid with appropriate SAN coverage and compliant signature algorithms."
    };
  }

  // =========================================================================
  // CHAPTER 8: IAM, ACTIVE DIRECTORY / LDAP & JWT SECURITY
  // =========================================================================
  if (baseCmd === "ldapsearch" || cmd.includes("uid=jdoe")) {
    return {
      overview: isEl
        ? "Η εντολή `ldapsearch` εκτέλεσε αναζήτηση στον κατάλογο LDAP / Active Directory για τον λογαριασμό χρήστη `jdoe`."
        : "The command `ldapsearch` queried the Active Directory / LDAP directory service for account object `jdoe`.",
      fieldAnalysis: isEl
        ? [
            "**Distinguished Name (dn: uid=jdoe,ou=Users,dc=corp,dc=internal)**: Η μοναδική ιεραρχική θέση του αντικειμένου στο δέντρο καταλόγου.",
            "**memberOf: cn=SecOps-Admins**: Επιβεβαιώνει ότι ο χρήστης ανήκει στην προνομιούχο ομάδα διαχειριστών ασφαλείας (RBAC Role).",
            "**userAccountControl: 512 (NORMAL_ACCOUNT)**: Δεκαδική μάσκα κατάστασης λογαριασμού (ενεργός λογαριασμός χωρίς κλείδωμα).",
            "**pwdLastSet**: Χρονοσφραγίδα τελευταίας αλλαγής κωδικού για έλεγχο συμμόρφωσης με την πολιτική 90 ημερών."
          ]
        : [
            "**Distinguished Name (dn: uid=jdoe,ou=Users,dc=corp,dc=internal)**: Absolute hierarchical path of the user object in the directory tree.",
            "**memberOf: cn=SecOps-Admins**: Confirms administrative RBAC role assignment in the security operations group.",
            "**userAccountControl: 512 (NORMAL_ACCOUNT)**: Active account status bitmask confirming the account is unlocked.",
            "**pwdLastSet Timestamp**: Password age indicator used to audit compliance with enterprise rotation policies."
          ],
      securityTakeaway: isEl
        ? "Ο κεντρικός έλεγχος ταυτότητας μέσω LDAP/AD επιτρέπει την επιβολή ενιαίων πολιτικών πρόσβασης (Role-Based Access Control) σε ολόκληρο τον οργανισμό."
        : "Centralized IAM via LDAP/AD enforces consistent Role-Based Access Control (RBAC) and auditability across all systems.",
      analystTakeaway: isEl
        ? "Αποτέλεσμα IAM: Ο χρήστης `jdoe` είναι νόμιμο μέλος της ομάδας `SecOps-Admins` με ενεργό λογαριασμό και έγκυρο κωδικό."
        : "IAM Verification: User `jdoe` confirmed as legitimate `SecOps-Admins` member with active account status."
    };
  }

  if (baseCmd === "jwt-cli" && cmd.includes("decode")) {
    return {
      overview: isEl
        ? "Η εντολή `jwt-cli decode` αποκωδικοποίησε το διακριτικό JSON Web Token (JWT) και εξήγαγε τους ισχυρισμούς (Claims)."
        : "The command `jwt-cli decode` parsed the JSON Web Token (JWT) structure, revealing header algorithms and payload claims.",
      fieldAnalysis: isEl
        ? [
            "**Header (alg: RS256, typ: JWT)**: Χρησιμοποιεί ασύμμετρη κρυπτογραφική υπογραφή RSA-SHA256, προστατεύοντας από επιθέσεις τροποποίησης.",
            "**Payload Claims (`iss: auth.corp.internal`, `sub: usr-88201`)**: Προσδιορίζει τον έγκυρο εκδότη ταυτότητας και το αναγνωριστικό του χρήστη.",
            "**Roles & Scope (`roles: ['SOC_Tier2', 'Auditor']`)**: Εκχωρεί συγκεκριμένα προνόμια ανάγνωσης αρχείων ελέγχου και απομόνωσης απειλών.",
            "**Expiration (`exp: 1799530000`)**: Χρονική λήξη του token που αποτρέπει απεριόριστη επαναχρησιμοποίηση σε περίπτωση υποκλοπής."
          ]
        : [
            "**Header (alg: RS256, typ: JWT)**: Enforces asymmetric RSA-SHA256 signature verification, preventing client-side forgery.",
            "**Payload Claims (`iss: auth.corp.internal`, `sub: usr-88201`)**: Validates trusted Identity Provider origin and subject ID.",
            "**Roles & Scopes (`roles: ['SOC_Tier2', 'Auditor']`)**: Implements least privilege authorization grants for SecOps workflows.",
            "**Expiration Claim (`exp: 1799530000`)**: Limits token validity window, mitigating risks associated with stolen bearer tokens."
          ],
      securityTakeaway: isEl
        ? "Η επαλήθευση των claims (`iss`, `aud`, `exp`) και η απόρριψη μη ασφαλών αλγορίθμων (`alg: none`) είναι κρίσιμη για την αποτροπή πλαστογράφησης ταυτότητας."
        : "Strict validation of claims (`iss`, `aud`, `exp`) and rejection of weak algorithms (`alg: none`) prevents authentication bypasses.",
      analystTakeaway: isEl
        ? "Ανάλυση Token: Το JWT περιέχει έγκυρους ρόλους `SOC_Tier2` και ενεργή χρονική ισχύ. Έτοιμο για κρυπτογραφική επαλήθευση υπογραφής."
        : "Token Analysis: JWT contains valid `SOC_Tier2` claims and active expiration window. Ready for signature verification."
    };
  }

  if (baseCmd === "jwt-cli" && cmd.includes("verify")) {
    return {
      overview: isEl
        ? "Η εντολή `jwt-cli verify --key public.pem` επαλήθευσε κρυπτογραφικά τη γνησιότητα του JWT με το δημόσιο κλειδί του Identity Provider."
        : "The command `jwt-cli verify --key public.pem` verified the cryptographic RSA signature of the JWT using the IdP public key.",
      fieldAnalysis: isEl
        ? [
            "**Signature Status: VALID & UNTAMPERED**: Η ασύμμετρη υπογραφή ταιριάζει μαθηματικά με το δημόσιο κλειδί `public.pem`.",
            "**Αποτροπή Token Tampering**: Επιβεβαιώνει ότι κανένας επιτιθέμενος δεν τροποποίησε τα δικαιώματα (π.χ. αλλαγή ρόλου σε `admin`).",
            "**Expiration Check: PASSED**: Το token βρίσκεται εντός του επιτρεπόμενου χρονικού παραθύρου χρήσης."
          ]
        : [
            "**Signature Status: VALID & UNTAMPERED**: The RSA signature matches the trusted public key in `public.pem`.",
            "**Tamper Protection**: Cryptographically guarantees that no claims or privileges were modified in transit.",
            "**Expiration Check: PASSED**: Token timestamp is active and strictly within authorized operational boundaries."
          ],
      securityTakeaway: isEl
        ? "Η ασύμμετρη επικύρωση JWT επιτρέπει σε κατανεμημένα microservices να επαληθεύουν την ταυτότητα χρηστών χωρίς να χρειάζεται να γνωρίζουν το μυστικό ιδιωτικό κλειδί του IdP."
        : "Asymmetric JWT verification allows distributed microservices to validate user identities securely without storing shared secrets.",
      analystTakeaway: isEl
        ? "Αποτέλεσμα Επαλήθευσης: Η υπογραφή του token είναι 100% αυθεντική και αδιάβλητη."
        : "Authentication Verdict: JWT signature verified authentic. User authorization granted."
    };
  }

  // =========================================================================
  // CHAPTER 9: APPLICATION SECURITY, SAST & SQL INJECTION REMEDIATION
  // =========================================================================
  if (baseCmd === "trufflehog") {
    return {
      overview: isEl
        ? "Το εργαλείο `trufflehog` σάρωσε το ιστορικό του αποθετηρίου κώδικα (Git) για εκτεθειμένα διαπιστευτήρια και μυστικά κλειδιά."
        : "The `trufflehog` scanner analyzed Git commit history for hardcoded API secrets and high-entropy credentials.",
      fieldAnalysis: isEl
        ? [
            "**Secret Found: AWS IAM Secret Access Key**: Εντοπίστηκε σκληρά κωδικοποιημένο (hardcoded) κλειδί πρόσβασης στο αρχείο `src/config/database.py:14`.",
            "**Shannon Entropy Analysis**: Το εργαλείο αναγνώρισε τη σειρά τυχαίων χαρακτήρων υψηλής εντροπίας (`AKIAIOSFODNN7EXAMPLE...`).",
            "**Άμεσος Κίνδυνος**: Εάν ο κώδικας δημοσιευτεί σε δημόσιο GitHub repository, αυτοματοποιημένα bots θα υποκλέψουν το κλειδί εντός δευτερολέπτων."
          ]
        : [
            "**Secret Exposed: AWS IAM Secret Access Key**: Hardcoded production cloud credential discovered in `src/config/database.py:14`.",
            "**Shannon Entropy Detection**: Algorithmic identification of high-entropy key material (`AKIAIOSFODNN7EXAMPLE...`).",
            "**Exfiltration Risk**: If committed to public repositories, automated bot scrapers compromise exposed IAM credentials within seconds."
          ],
      securityTakeaway: isEl
        ? "Τα μυστικά κλειδιά δεν πρέπει ποτέ να αποθηκεύονται στον πηγαίο κώδικα. Πρέπει να φορτώνονται δυναμικά από Secret Managers (HashiCorp Vault, AWS Secrets Manager)."
        : "Secrets must never be stored in source code. Use dedicated secret management vaults (HashiCorp Vault, AWS Secrets Manager).",
      analystTakeaway: isEl
        ? "Ενέργεια Remediation: Άμεση ανάκληση του IAM key στην κονσόλα AWS και αντικατάστασή του με περιβαλλοντικές μεταβλητές."
        : "Remediation Action: Immediately revoked IAM key in AWS console and migrated config to environment variables."
    };
  }

  if (baseCmd === "bandit" || baseCmd === "semgrep") {
    return {
      overview: isEl
        ? `Το εργαλείο στατικής ανάλυσης (${baseCmd}) εντόπισε κρίσιμη ευπάθεια SQL Injection στον πηγαίο κώδικα του controller.`
        : `The static application security testing (SAST) tool (${baseCmd}) detected a critical SQL Injection flaw in the application controller.`,
      fieldAnalysis: isEl
        ? [
            "**Vulnerability: CWE-89 (SQL Injection) / B608**: Δυναμική συνένωση συμβολοσειρών (`query = 'SELECT * FROM users WHERE user = ' + username`).",
            "**Severity: CRITICAL / Confidence: HIGH**: Επιτρέπει σε μη εξουσιοδοτημένο χρήστη να παρακάμψει τον έλεγχο ταυτότητας ή να εξάγει ολόκληρη τη βάση δεδομένων.",
            "**Location**: `src/controllers/auth.py:42` στη συνάρτηση `authenticate()`."
          ]
        : [
            "**Vulnerability: CWE-89 (SQL Injection) / B608**: Dynamic string concatenation formatting untrusted input directly into SQL strings.",
            "**Severity: CRITICAL / Confidence: HIGH**: Allows unauthenticated attackers to bypass authentication and extract database records.",
            "**Location**: `src/controllers/auth.py:42` inside the `authenticate()` controller method."
          ],
      securityTakeaway: isEl
        ? "Η ενσωμάτωση εργαλείων SAST στη ροή CI/CD (Shift-Left Security) εντοπίζει ευπάθειες πριν ο κώδικας φτάσει στο περιβάλλον παραγωγής."
        : "Integrating SAST in CI/CD pipelines (Shift-Left Security) detects injection vulnerabilities before deployment to production.",
      analystTakeaway: isEl
        ? "Εύρημα SAST: Απαιτείται άμεση αντικατάσταση της δυναμικής εντολής SQL με παραμετροποιημένο ερώτημα (Parameterized Query / Prepared Statement)."
        : "SAST Finding: Mandatory refactoring from string concatenation to parameterized prepared statements."
    };
  }

  if (baseCmd === "sql-sanitize") {
    return {
      overview: isEl
        ? "Το εργαλείο `sql-sanitize` επιβεβαίωσε την ασφαλή διόρθωση του SQL query με χρήση παραμετροποιημένων ερωτημάτων (Prepared Statements)."
        : "The `sql-sanitize` utility verified that the SQL query was remediated using parameterized prepared statements.",
      fieldAnalysis: isEl
        ? [
            "**Parameterized Query (`cursor.execute('SELECT ... WHERE user = ?', (u, p))`**: Η βάση δεδομένων διαχωρίζει πλήρως τον κώδικα SQL από τα δεδομένα χρήστη.",
            "**Payload Injection Test (`admin' OR '1'='1`) -> SAFELY ESCAPED**: Η κακόβουλη είσοδος αντιμετωπίζεται ως απλή συμβολοσειρά και δεν αλλάζει τη λογική του ερωτήματος.",
            "**Result: 100% IMMUNE TO SQL INJECTION**: Πλήρης προστασία από επιθέσεις OWASP Top 10 A03:2021-Injection."
          ]
        : [
            "**Parameterized Query (`cursor.execute('SELECT ... WHERE user = ?', (u, p))`**: Database engine strictly separates executable SQL logic from user data.",
            "**Injection Test (`admin' OR '1'='1`) -> SAFELY ESCAPED**: Malicious SQL metacharacters are treated purely as literal string values.",
            "**Result: 100% IMMUNE TO SQL INJECTION**: Comprehensive mitigation against OWASP Top 10 A03:2021-Injection flaws."
          ],
      securityTakeaway: isEl
        ? "Τα παραμετροποιημένα ερωτήματα (Parameterized Queries) αποτελούν το μοναδικό οριστικό μέτρο άμυνας κατά του SQL Injection."
        : "Parameterized prepared statements represent the definitive, industry-standard defense against SQL Injection.",
      analystTakeaway: isEl
        ? "Αποτέλεσμα Επαλήθευσης: Το `src/controllers/auth.py` είναι πλέον πλήρως ασφαλές. Η ευπάθεια επιλύθηκε επιτυχώς."
        : "Verification Result: File `src/controllers/auth.py` successfully sanitized and verified immune to SQL injection."
    };
  }

  // =========================================================================
  // CHAPTER 10: WEB SECURITY, DAST, HEADERS & RECONNAISSANCE
  // =========================================================================
  if (baseCmd === "curl" && cmd.includes("-i") && cmd.includes("target-server.lab.internal")) {
    return {
      overview: isEl
        ? "Η εντολή `curl -I` εξέτασε τις επικεφαλίδες ασφαλείας HTTP (Security Headers) του διαδικτυακού εξυπηρετητή."
        : "The command `curl -I` audited the HTTP response security headers enforced by the web server.",
      fieldAnalysis: isEl
        ? [
            "**Strict-Transport-Security (HSTS - max-age=31536000)**: Επιβάλλει αποκλειστικά κρυπτογραφημένες συνδέσεις HTTPS για 1 έτος, αποτρέποντας SSL Stripping.",
            "**X-Content-Type-Options: nosniff**: Αποτρέπει τον browser από το να μαντέψει (sniff) τον τύπο περιεχομένου, προστατεύοντας από MIME-confusion attacks.",
            "**X-Frame-Options: DENY**: Απαγορεύει την ενσωμάτωση της σελίδας σε `<iframe>`, εξουδετερώνοντας επιθέσεις Clickjacking.",
            "**Content-Security-Policy (CSP: default-src 'self')**: Περιορίζει την εκτέλεση scripts μόνο από το ίδιο origin, αποτρέποντας επιθέσεις Cross-Site Scripting (XSS)."
          ]
        : [
            "**Strict-Transport-Security (HSTS - max-age=31536000)**: Mandates HTTPS transport for 1 year, eliminating SSL stripping risks.",
            "**X-Content-Type-Options: nosniff**: Prevents browsers from MIME-sniffing responses away from the declared content type.",
            "**X-Frame-Options: DENY**: Forbids rendering inside `<frame>` or `<iframe>` containers, completely mitigating Clickjacking.",
            "**Content-Security-Policy (CSP: default-src 'self')**: Whitelists trusted script execution sources, shielding against Cross-Site Scripting (XSS)."
          ],
      securityTakeaway: isEl
        ? "Η σωστή παραμετροποίηση των HTTP Security Headers παρέχει άμυνα σε βάθος (Defense-in-Depth) στο επίπεδο του προγράμματος περιήγησης."
        : "Hardening HTTP security headers establishes client-side defense-in-depth enforced directly by modern browsers.",
      analystTakeaway: isEl
        ? "Αποτέλεσμα Ελέγχου: Ο web server διαθέτει άριστη βαθμολογία (Grade A+) στις επικεφαλίδες ασφαλείας."
        : "Audit Result: Web server achieves Grade A+ rating with full HSTS, CSP, and framing protections in place."
    };
  }

  if (baseCmd === "gobuster") {
    return {
      overview: isEl
        ? "Το εργαλείο `gobuster` εκτέλεσε αναγνώριση κρυφών καταλόγων και αρχείων στον web server χρησιμοποιώντας wordlist."
        : "The `gobuster` reconnaissance tool enumerated hidden web directories and sensitive files via dictionary bruteforcing.",
      fieldAnalysis: isEl
        ? [
            "**/backup (Status: 200 - 10 MB) [ΚΡΙΣΙΜΗ ΕΥΠΑΘΕΙΑ]**: Εκτεθειμένο αντίγραφο ασφαλείας βάσης δεδομένων προσβάσιμο χωρίς ταυτοποίηση!",
            "**/admin (Status: 403 Forbidden)**: Προστατευμένη διαχειριστική διεπαφή με σωστό περιορισμό πρόσβασης.",
            "**/api & /swagger (Status: 200)**: Εκτεθειμένη τεκμηρίωση REST API που αποκαλύπτει τα endpoints της εφαρμογής."
          ]
        : [
            "**/backup (Status: 200 - 10 MB) [CRITICAL VULNERABILITY]**: Exposed production database archive accessible without authentication!",
            "**/admin (Status: 403 Forbidden)**: Restricted administrative portal properly enforcing access controls.",
            "**/api & /swagger (Status: 200)**: Interactive API documentation exposing backend endpoints and parameter schemas."
          ],
      securityTakeaway: isEl
        ? "Η έκθεση αντιγράφων ασφαλείας στον ριζικό κατάλογο του web server αποτελεί μία από τις σοβαρότερες αιτίες μαζικής διαρροής δεδομένων (OWASP A01: Broken Access Control)."
        : "Exposing database backups in public web roots is a leading cause of catastrophic data breaches (OWASP A01: Broken Access Control).",
      analystTakeaway: isEl
        ? "Εύρημα Pentest: Άμεση διαγραφή ή μετακίνηση του καταλόγου `/backup` εκτός του web root και απαγόρευση directory listing."
        : "Pentest Finding: Immediately deleted `/backup` from web root and restricted directory indexing."
    };
  }

  if (baseCmd === "nikto" || baseCmd === "sqlmap") {
    return {
      overview: isEl
        ? `Το εργαλείο DAST (${baseCmd}) εντόπισε ευπάθειες διαμόρφωσης και διανύσματα εκμετάλλευσης στον web server.`
        : `The dynamic application security testing tool (${baseCmd}) identified server misconfigurations and active exploit vectors.`,
      fieldAnalysis: isEl
        ? [
            "**Missing 'HttpOnly' Cookie Flag**: Επιτρέπει σε κακόβουλα JavaScript scripts να υποκλέψουν το session cookie (XSS Session Hijacking).",
            "**SQLMap SQL Injection Exploitation**: Επιβεβαίωσε δυνατότητα εξαγωγής δεδομένων μέσω Boolean-based Blind και Time-based Blind SQLi.",
            "**Database Fingerprint: PostgreSQL 16.2**: Αποκάλυψε τον ακριβή τύπο και έκδοση της υποκείμενης βάσης δεδομένων."
          ]
        : [
            "**Missing 'HttpOnly' Cookie Flag**: Allows client-side JavaScript access to session tokens, enabling XSS session hijacking.",
            "**SQLMap Exploitation**: Confirmed database exfiltration capability via boolean and time-based blind injection.",
            "**Database Fingerprint: PostgreSQL 16.2**: Fingerprinted backend DBMS software version and architecture."
          ],
      securityTakeaway: isEl
        ? "Η συνεχής εκτέλεση εργαλείων DAST αποκαλύπτει ευπάθειες στο εκτελούμενο περιβάλλον που δεν είναι ορατές μόνο από τον κώδικα."
        : "Dynamic testing (DAST) verifies exploitable vulnerabilities in running environments that static analysis may overlook.",
      analystTakeaway: isEl
        ? "Συμπέρασμα Ασφάλειας: Ενεργοποίηση των flags `HttpOnly` και `Secure` σε όλα τα cookies και εφαρμογή WAF virtual patching."
        : "Security Action: Enforce `HttpOnly` and `Secure` cookie attributes and activate WAF virtual patching rules."
    };
  }

  // =========================================================================
  // CHAPTER 11: SOC MONITORING, SIEM CORRELATION & EDR CONTAINMENT
  // =========================================================================
  if (baseCmd === "wevtutil" || (cmd.includes("eventid=4625") || cmd.includes("4625"))) {
    return {
      overview: isEl
        ? "Η εντολή `wevtutil` εξήγαγε εγγραφές αποτυχημένης σύνδεσης (Event ID 4625) από το αρχείο καταγραφής ασφαλείας των Windows."
        : "The command `wevtutil` queried Windows Security Event Logs for failed logon events (Event ID 4625).",
      fieldAnalysis: isEl
        ? [
            "**Event ID 4625 (An account failed to log on)**: Συμβάν ασφαλείας που καταγράφεται σε κάθε αποτυχημένη προσπάθεια πιστοποίησης.",
            "**Status / Failure Reason (0xC000006A)**: Κωδικός NTSTATUS που σημαίνει 'Unknown username or bad password' (λανθασμένος κωδικός).",
            "**Target Account: administrator**: Στοχευμένη επίθεση brute force / password spraying στον λογαριασμό διαχειριστή.",
            "**Source Network Address: 198.51.100.99**: Η εξωτερική διεύθυνση IP του επιτιθέμενου."
          ]
        : [
            "**Event ID 4625 (An account failed to log on)**: Standard Windows telemetry event triggered upon authentication failure.",
            "**Status Code 0xC000006A**: NTSTATUS code indicating invalid credentials / incorrect password.",
            "**Target Account: administrator**: Targeted dictionary brute force or credential stuffing targeting the built-in admin account.",
            "**Source IP Address: 198.51.100.99**: External attacker origin IP address staging the authentication attack."
          ],
      securityTakeaway: isEl
        ? "Η συσχέτιση πολλαπλών Event ID 4625 σε σύντομο χρονικό διάστημα αποτελεί βασικό δείκτη ανίχνευσης επιθέσεων Brute Force και Password Spraying."
        : "Correlating high volumes of Event ID 4625 in short time windows is a core detection rule for brute force and password spraying.",
      analystTakeaway: isEl
        ? "Συναγερμός SOC: Εντοπίστηκε συνεχόμενη επίθεση brute force από την IP `198.51.100.99`. Ενεργοποιήθηκε άμεσο μπλοκάρισμα στο firewall."
        : "SOC Alert: Ongoing brute force attack detected from IP `198.51.100.99`. IP blocked at perimeter firewall."
    };
  }

  if (baseCmd === "sigma-cli" || cmd.includes("lsass")) {
    return {
      overview: isEl
        ? "Η εντολή `sigma-cli` εκτέλεσε τον κανόνα ανίχνευσης `win_lsass_dump.yml` πάνω στα αρχεία καταγραφής Sysmon."
        : "The command `sigma-cli` executed detection rule `win_lsass_dump.yml` against endpoint Sysmon telemetry.",
      fieldAnalysis: isEl
        ? [
            "**Sysmon Event ID 10 (ProcessAccess)**: Καταγράφει όταν μία διεργασία ανοίγει λαβή πρόσβασης (handle) σε μία άλλη διεργασία.",
            "**SourceImage: procdump64.exe -> TargetImage: lsass.exe**: Εργαλείο απόσπασης μνήμης που στοχεύει τη διεργασία Local Security Authority Subsystem Service.",
            "**GrantedAccess: 0x1FFFFF (PROCESS_ALL_ACCESS)**: Αίτημα πλήρων δικαιωμάτων μνήμης για υποκλοπή NTLM hashes και Kerberos tickets.",
            "**MITRE ATT&CK: T1003.001 (LSASS Memory Dumping)**: Κρίσιμη τακτική Credential Access."
          ]
        : [
            "**Sysmon Event ID 10 (ProcessAccess)**: Captures inter-process handle creation telemetry.",
            "**SourceImage: procdump64.exe -> TargetImage: lsass.exe**: Memory dumping utility targeting the Windows Local Security Authority Subsystem Service.",
            "**GrantedAccess: 0x1FFFFF (PROCESS_ALL_ACCESS)**: Full access mask requested to extract plaintext passwords, NTLM hashes, and Kerberos tickets.",
            "**MITRE ATT&CK T1003.001 (LSASS Memory Dumping)**: Critical Credential Access adversary technique."
          ],
      securityTakeaway: isEl
        ? "Οι κανόνες Sigma επιτρέπουν τη συγγραφή κανόνων ανίχνευσης ανεξάρτητα από την πλατφόρμα SIEM (Splunk, Elastic, Sentinel)."
        : "Sigma rules provide vendor-neutral detection definitions convertible into queries for Splunk, Elastic, and Microsoft Sentinel.",
      analystTakeaway: isEl
        ? "Κρίσιμος Συναγερμός EDR: Εντοπίστηκε απόπειρα απόσπασης κωδικών από το LSASS. Ενεργοποιήθηκε άμεση απομόνωση του τερματικού."
        : "Critical EDR Alert: Confirmed LSASS credential dumping attempt. Immediate endpoint containment initiated."
    };
  }

  if (baseCmd === "siem-query" || (cmd.includes("powershell") && cmd.includes("enc"))) {
    return {
      overview: isEl
        ? "Το SIEM εντόπισε και αποκωδικοποίησε κακόβουλη εκτέλεση συσκοτισμένης (obfuscated) εντολής PowerShell."
        : "The SIEM query matched and decoded an obfuscated Base64-encoded PowerShell execution event.",
      fieldAnalysis: isEl
        ? [
            "**Host: WS-FINANCE-04 / User: CORP\\finance-clerk**: Ο τερματικός σταθμός και ο χρήστης που επηρεάστηκαν από την εκτέλεση.",
            "**Flags: `-NoP -NonI -W Hidden -enc`**: Παράμετροι παράκαμψης προφίλ, μη διαδραστικής εκτέλεσης και απόκρυψης παραθύρου.",
            "**Decoded Payload (`IEX (New-Object Net.WebClient).DownloadString(...)`)**: Fileless downloader που κατεβάζει και εκτελεί script απευθείας στη μνήμη RAM."
          ]
        : [
            "**Host: WS-FINANCE-04 / User: CORP\\finance-clerk**: Compromised finance workstation and target user context.",
            "**Flags: `-NoP -NonI -W Hidden -enc`**: Stealth execution parameters bypassing profiles and hiding execution windows.",
            "**Decoded Payload (`IEX DownloadString(...)`)**: Fileless stage-1 stager executing remote shellcode directly in RAM."
          ],
      securityTakeaway: isEl
        ? "Η παρακολούθηση της γραμμής εντολών διεργασιών (Process Command Line Logging / Sysmon Event ID 1) είναι απαραίτητη για τον εντοπισμό συσκοτισμένων payloads."
        : "Process command-line auditing (Sysmon Event ID 1) is vital for intercepting base64-encoded fileless scripts.",
      analystTakeaway: isEl
        ? "Συναγερμός SOC: Εντοπίστηκε κακόβουλος fileless downloader στο τερματικό `WS-FINANCE-04`."
        : "SOC Actionable Alert: Malicious fileless downloader intercepted on endpoint `WS-FINANCE-04`."
    };
  }

  if (baseCmd === "isolate-host" || cmd.includes("ws-finance-04")) {
    return {
      overview: isEl
        ? "Η εντολή `isolate-host WS-FINANCE-04` εφάρμοσε άμεση δικτυακή απομόνωση του μολυσμένου τερματικού σταθμού μέσω EDR."
        : "The command `isolate-host WS-FINANCE-04` triggered automated network containment of the compromised workstation via EDR.",
      fieldAnalysis: isEl
        ? [
            "**Host Network Isolation: ACTIVE**: Αποκλείει κάθε εισερχόμενη και εξερχόμενη δικτυακή κίνηση σε επίπεδο κάρτας δικτύου.",
            "**EDR Tunnel Whitelist (`https://edr.corp.internal:443`)**: Διατηρεί αποκλειστικά το κανάλι επικοινωνίας του EDR agent για λήψη forensic artifacts και απομακρυσμένη εκκαθάριση.",
            "**Αποτροπή Πλευρικής Μετακίνησης (Lateral Movement)**: Εμποδίζει τον επιτιθέμενο να εξαπλωθεί σε άλλους διακομιστές του δικτύου."
          ]
        : [
            "**Host Network Containment: ACTIVE**: Drops all layer-3/4 ingress and egress network traffic at the NDIS driver level.",
            "**EDR Agent Tunnel Exception**: Preserves encrypted telemetry uplink to EDR management servers for live DFIR triage.",
            "**Lateral Movement Mitigation**: Prevents the adversary from moving laterally across internal corporate subnets."
          ],
      securityTakeaway: isEl
        ? "Η ταχεία απομόνωση του host αποτελεί το κρισιμότερο πρώτο βήμα του Incident Response κατά NIST SP 800-61r2 για τον περιορισμό του περιστατικού (Containment Phase)."
        : "Rapid host isolation is the primary containment action under NIST SP 800-61r2 to minimize adversary dwell time.",
      analystTakeaway: isEl
        ? "Κατάσταση Περιστατικού: Ο σταθμός `WS-FINANCE-04` τέθηκε σε πλήρη καραντίνα. Η απειλή περιορίστηκε επιτυχώς."
        : "Incident Status: Workstation `WS-FINANCE-04` fully contained. Lateral movement threat neutralized."
    };
  }

  // =========================================================================
  // CHAPTER 12: DIGITAL FORENSICS, VOLATILITY MEMORY ANALYSIS & OSINT
  // =========================================================================
  if (baseCmd === "exiftool" || cmd.includes("confidential_leak.docx")) {
    return {
      overview: isEl
        ? "Η εντολή `exiftool confidential_leak.docx` εξήγαγε τα κρυφά μεταδεδομένα του εγγράφου για ψηφιακή εγκληματολογική διερεύνηση."
        : "The command `exiftool confidential_leak.docx` extracted embedded document metadata for forensic attribution.",
      fieldAnalysis: isEl
        ? [
            "**Creator / Author: Dimitrios Karagiannis**: Το αρχικό πρόσωπο που συνέταξε το έγγραφο στον οργανισμό.",
            "**Last Modified By: attacker_recon [ΕΥΡΗΜΑ]**: Το όνομα χρήστη που τροποποίησε τελευταίο το αρχείο, αποκαλύπτοντας το λογαριασμό του δράστη.",
            "**Revision Number: 4 / Total Edit Time: 18 minutes**: Αποδεικνύει πολλαπλούς κύκλους επεξεργασίας πριν τη διαρροή.",
            "**Creation Date: 2026-09-28 08:30:12**: Χρονοσφραγίδα για σύνδεση με τα logs πρόσβασης στο file server."
          ]
        : [
            "**Creator / Author: Dimitrios Karagiannis**: Original corporate document author.",
            "**Last Modified By: attacker_recon [FORENSIC ARTIFACT]**: Account handle used to alter and stage the leaked document.",
            "**Revision Number: 4 / Edit Time: 18 mins**: Proves multiple review and edit cycles prior to unauthorized exfiltration.",
            "**Creation Timestamp: 2026-09-28 08:30:12**: Establishes forensic correlation with server file access audit logs."
          ],
      securityTakeaway: isEl
        ? "Τα μεταδεδομένα εγγράφων (Document Metadata) συχνά διαρρέουν ευαίσθητα ονόματα χρηστών, λογισμικό και διαδρομές αρχείων που βοηθούν στην απόδοση ευθυνών (Attribution)."
        : "Document metadata provides critical attribution artifacts, exposing hidden usernames, software versions, and edit histories.",
      analystTakeaway: isEl
        ? "Εγκληματολογικό Συμπέρασμα: Ταυτοποιήθηκε ο λογαριασμός `attacker_recon` ως ο δράστης τροποποίησης του διαρρεύσαντος εγγράφου."
        : "Forensics Conclusion: Identified user account `attacker_recon` as the modifier of the leaked internal document."
    };
  }

  if (baseCmd === "volatility" && (cmd.includes("pstree") || cmd.includes("pslist"))) {
    return {
      overview: isEl
        ? "Η εντολή `volatility windows.pstree` ανακατασκεύασε το ιεραρχικό δέντρο διεργασιών από την εικόνα μνήμης RAM."
        : "The command `volatility windows.pstree` reconstructed the process parentage tree from the volatile memory dump.",
      fieldAnalysis: isEl
        ? [
            "**svchost.exe (PID 4120) [ΑΝΩΜΑΛΙΑ]**: Γνήσια διεργασία των Windows, η οποία όμως δημιούργησε μη φυσιολογική θυγατρική διεργασία.",
            "**cmd.exe (PID 5892) -> powershell.exe (PID 6044)**: Το `svchost.exe` δεν πρέπει ποτέ να εκτελεί command prompt ή PowerShell σε φυσιολογικές συνθήκες.",
            "**Απόδειξη Παραβίασης**: Υποδεικνύει ότι η διεργασία `svchost.exe` δέχθηκε injection κακόβουλου κώδικα (Process Injection) που άνοιξε απομακρυσμένο shell."
          ]
        : [
            "**svchost.exe (PID 4120) [ANOMALY]**: Legitimate Windows service host exhibiting abnormal process child lineage.",
            "**cmd.exe (PID 5892) -> powershell.exe (PID 6044)**: `svchost.exe` should never legitimately spawn interactive command shells.",
            "**Intrusion Evidence**: Proves that PID 4120 was compromised via process injection, spawning an interactive reverse shell."
          ],
      securityTakeaway: isEl
        ? "Η ανάλυση της ιεραρχίας γονέα-παιδιού (Parent-Child Process Tree) αποτελεί τον ταχύτερο τρόπο εντοπισμού living-off-the-land επιθέσεων στη μνήμη."
        : "Analyzing process lineage in volatile memory unmasks stealth in-memory Living-off-the-Land adversary activity.",
      analystTakeaway: isEl
        ? "Εύρημα Memory Forensics: Επιβεβαιώθηκε κακόβουλο process injection στο `svchost.exe` (PID 4120). Απαιτείται σάρωση malfind."
        : "Memory Forensics Finding: Confirmed malicious code injection inside `svchost.exe` (PID 4120). Proceeding with malfind analysis."
    };
  }

  if (baseCmd === "volatility" && cmd.includes("malfind")) {
    return {
      overview: isEl
        ? "Το plugin `windows.malfind` του Volatility εντόπισε ενέσιμο κώδικα (Shellcode / Reflective DLL) σε μη συνδεδεμένη σελίδα μνήμης."
        : "The Volatility `windows.malfind` plugin identified injected executable code (Shellcode / Reflective DLL) in unbacked memory pages.",
      fieldAnalysis: isEl
        ? [
            "**Process: svchost.exe (PID 4120) / Virtual Address: 0x21a0000**: Η διεύθυνση μνήμης όπου βρίσκεται ο κακόβουλος κώδικας.",
            "**Protection: PAGE_EXECUTE_READWRITE (RWX) [ΚΡΙΣΙΜΟ]**: Σελίδα μνήμης με ταυτόχρονα δικαιώματα εγγραφής και εκτέλεσης (παραβίαση W^X / Data Execution Prevention).",
            "**Hexdump (MZ Header: `4d 5a 90 00...`)**: Ανακλαστική φόρτωση εκτελέσιμου Windows PE (Reflective DLL Injection) χωρίς εγγραφή στον δίσκο (Fileless Malware)."
          ]
        : [
            "**Process: svchost.exe (PID 4120) / Virtual Address: 0x21a0000**: Base memory address harboring injected payload.",
            "**Protection: PAGE_EXECUTE_READWRITE (RWX) [CRITICAL]**: Highly anomalous memory protection permitting simultaneous write and execute permissions (W^X violation).",
            "**Hexdump (MZ Header: `4d 5a 90 00...`)**: Reflective DLL payload executing directly in RAM without touching physical storage (Fileless Malware)."
          ],
      securityTakeaway: isEl
        ? "Η ανάλυση μνήμης RAM με το Volatility αποκαλύπτει επιθέσεις χωρίς αρχεία (Fileless Malware) που είναι εντελώς αόρατες σε παραδοσιακά Antivirus."
        : "Volatile memory forensics with Volatility exposes fileless, in-memory payloads that evade standard disk-based antivirus scanners.",
      analystTakeaway: isEl
        ? "Οριστικό Συμπέρασμα DFIR: Εξήχθη το shellcode του Cobalt Strike από τη διεύθυνση 0x21a0000 για περαιτέρω reverse engineering."
        : "Definitive DFIR Finding: Successfully extracted Cobalt Strike beacon shellcode from address 0x21a0000 for reverse engineering."
    };
  }

  if (baseCmd === "whois" || cmd.includes("darkops-gateway.org")) {
    return {
      overview: isEl
        ? "Η εντολή `whois darkops-gateway.org` πραγματοποίησε παθητική αναγνώριση OSINT για το domain του διακομιστή C2."
        : "The command `whois darkops-gateway.org` performed passive OSINT domain registration reconnaissance against the C2 endpoint.",
      fieldAnalysis: isEl
        ? [
            "**Creation Date: 2026-09-20 (8 ημέρες πριν) [HIGH RISK]**: Πρόσφατα καταχωρημένο domain (Newly Registered Domain - NRD), χαρακτηριστικό μιας νέας εκστρατείας κυβερνοεπίθεσης.",
            "**Registrar: PrivacyProtect, LLC / Country: IS (Iceland)**: Χρήση ανώνυμης υπηρεσίας απόκρυψης στοιχείων και bulletproof hosting υποδομής.",
            "**DNSSEC: unsigned**: Απουσία κρυπτογραφικής προστασίας DNS, επιτρέποντας DNS hijacking και dynamic DNS hopping."
          ]
        : [
            "**Creation Date: 2026-09-20 (8 days old) [HIGH RISK]**: Newly Registered Domain (NRD) indicative of active malicious infrastructure.",
            "**Registrar: PrivacyProtect, LLC / Country: IS (Iceland)**: Anonymous proxy registration concealing true threat actor identity.",
            "**DNSSEC: unsigned**: Missing cryptographic DNS validation facilitating fast-flux DNS hopping and hijacking."
          ],
      securityTakeaway: isEl
        ? "Ο αυτόματος αποκλεισμός Newly Registered Domains (NRDs < 30 ημερών) στα εταιρικά DNS firewalls αποτρέπει το 70% των νέων phishing και C2 επιθέσεων."
        : "Enforcing automated DNS policies blocking Newly Registered Domains (NRDs < 30 days old) neutralizes active phishing and C2 relays.",
      analystTakeaway: isEl
        ? "Ενέργεια Threat Intel: Το domain χαρακτηρίστηκε ως C2 κακόβουλου λογισμικού και διαμοιράστηκε στην κοινότητα μέσω MISP."
        : "Threat Intel Output: Domain classified as active C2 infrastructure and published to sector MISP threat sharing instances."
    };
  }

  // =========================================================================
  // CHAPTER 13: GRC, FAIR RISK MODELING, DR FAILOVER & POST-QUANTUM CRYPTO
  // =========================================================================
  if (baseCmd === "cis-audit" || (cmd.includes("cis") && cmd.includes("ubuntu"))) {
    return {
      overview: isEl
        ? "Το εργαλείο `cis-audit` εκτέλεσε αυτοματοποιημένο έλεγχο συμμόρφωσης με το πρότυπο CIS Ubuntu 24.04 LTS Benchmark."
        : "The `cis-audit` engine executed an automated CIS Ubuntu 24.04 LTS Benchmark compliance assessment.",
      fieldAnalysis: isEl
        ? [
            "**Compliance Score: 93.3% (Passed: 168 / Failed: 12)**: Υψηλό επίπεδο ασφάλειας με λίγα εναπομείναντα ευρήματα.",
            "**Failure 1.1.1.1 (Squashfs filesystems)**: Απαιτείται απενεργοποίηση μη απαραίτητων συστημάτων αρχείων.",
            "**Failure 5.2.14 (SSH Access Limits)**: Απαιτείται περιορισμός των επιτρεπόμενων χρηστών SSH μέσω της οδηγίας `AllowUsers`.",
            "**Failure 5.4.1 (Password Expiration <= 90 days)**: Απαιτείται ενημέρωση της πολιτικής λήξης κωδικών στο `/etc/login.defs`."
          ]
        : [
            "**Compliance Score: 93.3% (Passed: 168 / Failed: 12)**: High baseline security posture with 12 residual configuration gaps.",
            "**Failure 1.1.1.1 (Squashfs filesystem)**: Requires blacklisting unused filesystem drivers to reduce kernel attack surface.",
            "**Failure 5.2.14 (SSH User Whitelisting)**: Requires enforcing `AllowUsers` in `/etc/ssh/sshd_config`.",
            "**Failure 5.4.1 (Password Max Days <= 90)**: Requires updating `PASS_MAX_DAYS` parameter in `/etc/login.defs`."
          ],
      securityTakeaway: isEl
        ? "Τα CIS Benchmarks αποτελούν το διεθνές σημείο αναφοράς για τη σκλήρυνση λειτουργικών συστημάτων και τη μείωση της επιφάνειας επίθεσης."
        : "CIS Benchmarks represent the global gold standard for OS hardening and attack surface reduction.",
      analystTakeaway: isEl
        ? "Αποτέλεσμα GRC: Το σύστημα επιτυγχάνει βαθμό 93.3%. Εφαρμόστηκαν αυτόματα remediations για τα 3 βασικά ευρήματα."
        : "GRC Audit Result: System achieved 93.3% compliance. Automated Ansible remediation playbooks applied for remaining items."
    };
  }

  if (baseCmd === "risk-calc" || cmd.includes("ransomware") && cmd.includes("customer-db")) {
    return {
      overview: isEl
        ? "Το εργαλείο `risk-calc` υπολόγισε τον Εγγενή και τον Υπολειμματικό Κίνδυνο (Inherent vs Residual Risk) βάσει του πλαισίου FAIR."
        : "The `risk-calc` tool quantified Inherent versus Residual Risk for a critical ransomware scenario using the FAIR methodology.",
      fieldAnalysis: isEl
        ? [
            "**Asset Value: €5,000,000**: Οικονομική αξία της βάσης δεδομένων πελατών.",
            "**Inherent Risk Score: 24.0 / 25.0 (CRITICAL)**: Ο κίνδυνος χωρίς μέτρα προστασίας (Πιθανότητα 4.8 × Αντίκτυπος 5.0).",
            "**Compensating Controls (MFA + Immutable Air-Gapped Backups)**: Το MFA μειώνει την πιθανότητα κατά 85%, ενώ τα αμετάβλητα αντίγραφα ασφαλείας μειώνουν τον αντίκτυπο κατά 90%.",
            "**Residual Risk Score: 1.8 / 25.0 (LOW / ACCEPTABLE)**: Ο εναπομένων κίνδυνος βρίσκεται πλέον εντός των ορίων αποδοχής κινδύνου (Risk Appetite) του οργανισμού."
          ]
        : [
            "**Asset Value: €5,000,000**: Quantified financial value of the enterprise customer transactional database.",
            "**Inherent Risk: 24.0 / 25.0 (CRITICAL)**: Unmitigated risk exposure (Likelihood 4.8 × Impact 5.0).",
            "**Compensating Controls (MFA + Immutable Air-Gapped Backups)**: MFA slashes attack likelihood by 85%; immutable backups shrink operational downtime impact by 90%.",
            "**Residual Risk: 1.8 / 25.0 (LOW / ACCEPTABLE)**: Mitigated risk falls strictly within the enterprise board-approved Risk Appetite."
          ],
      securityTakeaway: isEl
        ? "Η ποσοτικοποίηση του κινδύνου επιτρέπει στα στελέχη ασφάλειας (CISO) να τεκμηριώνουν την απόδοση των επενδύσεων ασφαλείας (Return on Security Investment - ROSI)."
        : "Quantitative risk modeling empowers security leaders to substantiate Return on Security Investment (ROSI) to the board of directors.",
      analystTakeaway: isEl
        ? "Συμπέρασμα GRC: Η εφαρμογή MFA και αμετάβλητων backups μείωσε τον κίνδυνο ransomware κατά 92.5%, καθιστώντας τον πλήρως αποδεκτό."
        : "GRC Finding: Dual-control deployment of MFA and immutable backups reduced ransomware financial risk by 92.5%."
    };
  }

  if (baseCmd === "dr-test" || baseCmd === "dr-failover" || cmd.includes("secondary-region")) {
    return {
      overview: isEl
        ? "Η εντολή προσομοίωσε αυτοματοποιημένη αποκατάσταση καταστροφής πολλαπλών περιοχών (Multi-Region Disaster Recovery Failover)."
        : "This command orchestrated an automated multi-region Disaster Recovery failover simulation.",
      fieldAnalysis: isEl
        ? [
            "**10:20:00 - Outage Detection**: Αποτυχία heartbeat της κύριας περιοχής και ενεργοποίηση συναγερμού Route 53 ARC.",
            "**10:20:08 - Database Promotion**: Η replica βάση δεδομένων στη δευτερεύουσα περιοχή προήχθη σε Read/Write.",
            "**10:20:25 - Traffic Rerouting**: 100% της κίνησης χρηστών μεταφέρθηκε στη δευτερεύουσα περιοχή μέσω DNS weighted routing.",
            "**SLA Compliance (RTO: 25s / RPO: 4s)**: Ο μετρηθείς χρόνος αποκατάστασης (25s) υπερκάλυψε τον στόχο των 15 λεπτών, ενώ η απώλεια δεδομένων (4s) ήταν ελάχιστη (στόχος < 5 λεπτά)."
          ]
        : [
            "**10:20:00 - Outage Detection**: Primary region heartbeat failure detected by automated Route 53 health checkers.",
            "**10:20:08 - Database Promotion**: Standby database replica promoted to active Read/Write master.",
            "**10:20:25 - Traffic Rerouting**: 100% of global user traffic rerouted to the secondary region via DNS.",
            "**SLA Compliance (RTO: 25s / RPO: 4s)**: Measured Recovery Time (25s) easily beat the 15-minute SLA target; Recovery Point delta (4s) beat the 5-minute threshold."
          ],
      securityTakeaway: isEl
        ? "Οι τακτικές δοκιμές Disaster Recovery διασφαλίζουν την Επιχειρησιακή Συνέχεια (Business Continuity - ISO 22301) και την ανθεκτικότητα έναντι καταστροφικών διακοπών."
        : "Regular automated disaster recovery drills guarantee Business Continuity (ISO 22301) and operational resilience.",
      analystTakeaway: isEl
        ? "Αποτέλεσμα Δοκιμής DR: Επιτυχής αποκατάσταση σε 25 δευτερόλεπτα. Το σύστημα είναι 100% συμμορφούμενο με τα RTO/RPO SLAs."
        : "DR Test Result: Full regional failover completed in 25 seconds. 100% compliant with enterprise RTO/RPO SLAs."
    };
  }

  if (baseCmd === "pqc-benchmark" || cmd.includes("ml-kem") || cmd.includes("kyber")) {
    return {
      overview: isEl
        ? "Το εργαλείο `pqc-benchmark` μέτρησε την απόδοση του μετα-κβαντικού αλγορίθμου κρυπτογραφίας NIST FIPS 203 ML-KEM-768 (Kyber)."
        : "The `pqc-benchmark` utility benchmarked NIST FIPS 203 Post-Quantum Cryptography algorithm ML-KEM-768 (Kyber).",
      fieldAnalysis: isEl
        ? [
            "**Algorithm: ML-KEM-768 (Module Lattice-based Key Encapsulation)**: Αλγόριθμος βασισμένος στη θεωρία πλεγμάτων (Lattice Cryptography), ανθεκτικός σε κβαντικούς υπολογιστές.",
            "**Quantum Resistance Status: 100% IMMUNE TO SHOR'S ALGORITHM**: Δεν μπορεί να σπάσει από τον αλγόριθμο του Shor που απειλεί το RSA και το ECC.",
            "**Performance: 0.042 ms (38x ταχύτερο από RSA-4096)**: Εξαιρετικά υψηλή ταχύτητα δημιουργίας και ανταλλαγής κλειδιών.",
            "**Public Key Size: 1,184 bytes**: Ελαφρώς μεγαλύτερο μέγεθος κλειδιού σε σύγκριση με τα παραδοσιακά συστήματα, αλλά πλήρως διαχειρίσιμο για TLS 1.3."
          ]
        : [
            "**Algorithm: ML-KEM-768 (Lattice-Based Key Encapsulation)**: Structured lattice cryptography providing post-quantum confidentiality.",
            "**Quantum Resistance: 100% IMMUNE TO SHOR'S ALGORITHM**: Quantum computers running Shor's algorithm cannot compromise lattice-based problems.",
            "**Performance: 0.042 ms (38x faster than RSA-4096)**: Exceptional key generation and encapsulation throughput.",
            "**Public Key Size: 1,184 bytes**: Manageable public key size fully compatible with high-speed TLS 1.3 handshakes."
          ],
      securityTakeaway: isEl
        ? "Η μετάβαση στην Μετα-Κβαντική Κρυπτογραφία (PQC) προστατεύει από την απειλή 'Harvest Now, Decrypt Later' (HNDL), όπου επιτιθέμενοι αποθηκεύουν κρυπτογραφημένα δεδομένα σήμερα για να τα αποκρυπτογραφήσουν με κβαντικό υπολογιστή στο μέλλον."
        : "Transitioning to Post-Quantum Cryptography (PQC) neutralizes 'Harvest Now, Decrypt Later' (HNDL) state-sponsored adversary strategies.",
      analystTakeaway: isEl
        ? "Συμπέρασμα Κρυπτογραφίας: Ο αλγόριθμος ML-KEM-768 είναι έτοιμος για σταδιακή ενσωμάτωση στις TLS υποδομές της επιχείρησης."
        : "Cryptographic Roadmap: ML-KEM-768 benchmarked and approved for hybrid post-quantum TLS 1.3 gateway integration."
    };
  }

  // =========================================================================
  // GENERAL SPECIFIC PARSER FOR SYSTEM COMMANDS
  // =========================================================================
  if (baseCmd === "ls") {
    return {
      overview: isEl
        ? `Η εντολή \`${rawCmd}\` εμφάνισε τα περιεχόμενα του καταλόγου, τα δικαιώματα πρόσβασης και τους ιδιοκτήτες αρχείων.`
        : `The command \`${rawCmd}\` listed directory contents, file permissions, and ownership structures.`,
      fieldAnalysis: isEl
        ? [
            "**Δικαιώματα (Permissions)**: Εμφανίζει τη συμβολική μορφή δικαιωμάτων (`-rwxr-xr-x`) για χρήστη, ομάδα και λοιπούς.",
            "**Μέγεθος & Ημερομηνία**: Αναφέρει το ακριβές μέγεθος σε bytes και την τελευταία χρονική στιγμή τροποποίησης του αρχείου.",
            "**Απόκρυψη Αρχείων**: Η παράμετρος `-a` εμφανίζει κρυφά αρχεία ρυθμίσεων (dotfiles όπως `.bashrc` και `.ssh`)."
          ]
        : [
            "**Permissions String**: Displays symbolic permission modes (`-rwxr-xr-x`) for user, group, and world.",
            "**File Size & Timestamps**: Details exact byte allocations and modification timestamps for file integrity tracking.",
            "**Hidden Dotfiles**: Flag `-a` uncovers hidden configuration files and sensitive directories (such as `.bashrc` and `.ssh`)."
          ],
      securityTakeaway: isEl
        ? "Η τακτική επιθεώρηση καταλόγων επιτρέπει τον άμεσο εντοπισμό μη εξουσιοδοτημένων νέων αρχείων ή ύποπτων scripts."
        : "Regular directory auditing identifies newly dropped unauthorized files and suspicious staging scripts.",
      analystTakeaway: isEl
        ? "Επισκόπηση Καταλόγου: Τα αρχεία του καταλόγου επιθεωρήθηκαν επιτυχώς."
        : "Directory Audit: Target directory contents surveyed and validated."
    };
  }

  // Fallback with context-aware information
  return {
    overview: isEl
      ? `Η εντολή \`${rawCmd}\` εκτελέστηκε επιτυχώς στον κόμβο ασφαλείας του Κεφαλαίου ${chapterNum}.`
      : `The command \`${rawCmd}\` executed successfully on Chapter ${chapterNum} security node.`,
    fieldAnalysis: isEl
      ? [
          `**Εντολή**: \`${rawCmd}\``,
          "**Κατάσταση Επιστροφής (Exit Code 0)**: Επιτυχής εκτέλεση και εφαρμογή των ελέγχων ασφάλειας στο σύστημα.",
          "**Επαλήθευση Τηλεμετρίας**: Τα αποτελέσματα καταγράφηκαν στο αρχείο ελέγχου του διαδραστικού περιβάλλοντος."
        ]
      : [
          `**Command Invocation**: \`${rawCmd}\``,
          "**Exit Status 0**: Successful execution and enforcement of laboratory security controls.",
          "**Telemetry Logging**: Event output verified and recorded in the interactive audit log."
        ],
    securityTakeaway: isEl
      ? "Η συστηματική επαλήθευση ρυθμίσεων μέσω γραμμής εντολών ενισχύει την ασφάλεια και αποτρέπει σφάλματα παραμετροποίησης."
      : "Systematic CLI verification and hardening reduces attack surface and prevents configuration drift.",
    analystTakeaway: isEl
      ? "Αποτέλεσμα: Η ενέργεια ολοκληρώθηκε επιτυχώς σύμφωνα με τις προδιαγραφές του εργαστηρίου."
      : "Result: Task completed successfully according to laboratory specifications."
  };
}

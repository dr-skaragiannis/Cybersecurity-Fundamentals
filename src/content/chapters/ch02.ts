import type { Chapter } from "../types";

const ch02: Chapter = {
  n: 2,
  part: 1,
  title: { en: "Operating System Security: POSIX and Windows Architecture", el: "Ασφάλεια Λειτουργικών Συστημάτων: Αρχιτεκτονική POSIX και Windows" },
  subtitle: {
    en: "Discretionary access control · Special permission bits · ACLs and capabilities · Mandatory controls · Windows tokens, UAC and integrity levels",
    el: "Διακριτικός έλεγχος πρόσβασης · Ειδικά δικαιώματα · ACL και capabilities · Υποχρεωτικοί έλεγχοι · Token, UAC και επίπεδα ακεραιότητας στα Windows",
  },
  level: { en: "Beginner–Intermediate · Systems", el: "Εισαγωγικό–Μεσαίο επίπεδο · Συστήματα" },
  hours: "7–9",
  intro: {
    en: [
      "The operating system is the first concrete security boundary a student meets. Every file, process and network socket is ultimately mediated by the kernel, which decides who may do what. If the operating system's access control is misconfigured, higher-level defences such as firewalls or antivirus software can often be bypassed with little effort.",
      "This chapter compares the two dominant families of access control. It first explains the POSIX model used by Linux, macOS and other Unix-like systems, including the special permission bits that are a frequent source of privilege escalation. It then moves beyond simple permission modes to access control lists, Linux capabilities and mandatory access control frameworks. The second half is devoted to Windows: security identifiers, access tokens, User Account Control, the registry and mandatory integrity levels.",
    ],
    el: [
      "Το λειτουργικό σύστημα είναι το πρώτο απτό όριο ασφάλειας που συναντά ο φοιτητής. Κάθε αρχείο, κάθε διεργασία και κάθε δικτυακή υποδοχή (socket) ελέγχεται τελικά από τον πυρήνα, ο οποίος αποφασίζει ποιος μπορεί να κάνει τι. Αν ο έλεγχος πρόσβασης του λειτουργικού συστήματος είναι λανθασμένα διαμορφωμένος, οι άμυνες υψηλότερου επιπέδου, όπως τα τείχη προστασίας ή το λογισμικό προστασίας από ιούς, συχνά παρακάμπτονται με ελάχιστη προσπάθεια.",
      "Το κεφάλαιο συγκρίνει τις δύο κυρίαρχες οικογένειες ελέγχου πρόσβασης. Αρχικά εξηγεί το μοντέλο POSIX που χρησιμοποιούν το Linux, το macOS και τα υπόλοιπα συστήματα τύπου Unix, συμπεριλαμβανομένων των ειδικών δικαιωμάτων που αποτελούν συχνή αιτία κλιμάκωσης προνομίων. Στη συνέχεια προχωρά πέρα από τα απλά δικαιώματα, στις λίστες ελέγχου πρόσβασης (ACL), στις δυνατότητες (capabilities) του Linux και στα πλαίσια υποχρεωτικού ελέγχου πρόσβασης. Το δεύτερο μισό αφιερώνεται στα Windows: αναγνωριστικά ασφάλειας, διακριτικά πρόσβασης (access tokens), Έλεγχος Λογαριασμού Χρήστη (UAC), το μητρώο (registry) και τα υποχρεωτικά επίπεδα ακεραιότητας.",
    ],
  },
  outcomes: {
    en: [
      "Read, interpret and set POSIX permissions in both symbolic and octal notation.",
      "Explain the purpose and the risks of the SetUID, SetGID and sticky bits.",
      "Describe how ACLs, capabilities and mandatory access control (SELinux, AppArmor) refine the basic permission model.",
      "Explain the roles of SIDs, access tokens, UAC and integrity levels in Windows.",
      "Identify common operating-system misconfigurations that enable privilege escalation or lateral movement.",
    ],
    el: [
      "Να διαβάζετε, να ερμηνεύετε και να ορίζετε δικαιώματα POSIX σε συμβολική και οκταδική μορφή.",
      "Να εξηγείτε τον σκοπό και τους κινδύνους των ειδικών δικαιωμάτων SetUID, SetGID και sticky bit.",
      "Να περιγράφετε πώς οι ACL, οι δυνατότητες (capabilities) και ο υποχρεωτικός έλεγχος πρόσβασης (SELinux, AppArmor) εξειδικεύουν το βασικό μοντέλο δικαιωμάτων.",
      "Να εξηγείτε τον ρόλο των SID, των διακριτικών πρόσβασης, του UAC και των επιπέδων ακεραιότητας στα Windows.",
      "Να εντοπίζετε συνήθεις εσφαλμένες ρυθμίσεις λειτουργικών συστημάτων που επιτρέπουν κλιμάκωση προνομίων ή πλευρική κίνηση.",
    ],
  },
  sections: [
    {
      id: "2.1",
      title: { en: "POSIX discretionary access control: model and mechanics", el: "Διακριτικός έλεγχος πρόσβασης POSIX: μοντέλο και λειτουργία" },
      body: {
        en: [
          "POSIX systems implement **discretionary access control (DAC)**: the owner of a file decides who else may access it. Every file carries an owner (a user ID), a group (a group ID) and three sets of permission bits—for the *owner*, the *group* and *others*. Each set contains three rights: **read (r)**, **write (w)** and **execute (x)**. For directories the meaning changes slightly: read allows listing the names, write allows creating or deleting entries, and execute allows entering the directory and reaching files inside it.",
          "Permissions are commonly written in octal, where read = 4, write = 2 and execute = 1. The mode `640` therefore means *rw-* for the owner, *r--* for the group and *---* for everyone else—a typical setting for a configuration file that contains secrets. When a process requests access, the kernel checks the categories in order (owner, then group, then others) and applies only the *first* category that matches. As a result, an owner who has removed their own read permission is denied access even if 'others' could read the file.",
          { t: "box", kind: "example", title: "Worked example", text: "The command `chmod 750 /srv/reports` gives the owner full control (7 = 4+2+1), allows group members to list and enter the directory (5 = 4+1), and denies all access to other users (0). A web server running as an unrelated account will therefore be unable to read the reports, even if a vulnerability allows it to guess their path." },
        ],
        el: [
          "Τα συστήματα POSIX εφαρμόζουν **διακριτικό έλεγχο πρόσβασης** (Discretionary Access Control, DAC): ο κάτοχος ενός αρχείου αποφασίζει ποιοι άλλοι μπορούν να έχουν πρόσβαση σε αυτό. Κάθε αρχείο έχει έναν κάτοχο (αναγνωριστικό χρήστη), μια ομάδα (αναγνωριστικό ομάδας) και τρία σύνολα δικαιωμάτων —για τον *κάτοχο*, την *ομάδα* και τους *λοιπούς*. Κάθε σύνολο περιλαμβάνει τρία δικαιώματα: **ανάγνωση (r)**, **εγγραφή (w)** και **εκτέλεση (x)**. Στους καταλόγους η σημασία διαφοροποιείται ελαφρώς: η ανάγνωση επιτρέπει την εμφάνιση των ονομάτων, η εγγραφή τη δημιουργία ή διαγραφή εγγραφών και η εκτέλεση την είσοδο στον κατάλογο και την πρόσβαση στα αρχεία που περιέχει.",
          "Τα δικαιώματα γράφονται συνήθως σε οκταδική μορφή, όπου η ανάγνωση αντιστοιχεί στο 4, η εγγραφή στο 2 και η εκτέλεση στο 1. Επομένως, η τιμή `640` σημαίνει *rw-* για τον κάτοχο, *r--* για την ομάδα και *---* για όλους τους υπόλοιπους —μια τυπική ρύθμιση για αρχείο ρυθμίσεων που περιέχει μυστικά. Όταν μια διεργασία ζητά πρόσβαση, ο πυρήνας ελέγχει τις κατηγορίες με σειρά (κάτοχος, ομάδα, λοιποί) και εφαρμόζει μόνο την *πρώτη* κατηγορία που ταιριάζει. Κατά συνέπεια, ένας κάτοχος που έχει αφαιρέσει από τον εαυτό του το δικαίωμα ανάγνωσης δεν αποκτά πρόσβαση, ακόμη κι αν οι «λοιποί» μπορούν να διαβάσουν το αρχείο.",
          { t: "box", kind: "example", title: "Παράδειγμα εφαρμογής", text: "Η εντολή `chmod 750 /srv/reports` παρέχει στον κάτοχο πλήρη έλεγχο (7 = 4+2+1), επιτρέπει στα μέλη της ομάδας να βλέπουν και να εισέρχονται στον κατάλογο (5 = 4+1) και απαγορεύει κάθε πρόσβαση στους υπόλοιπους χρήστες (0). Ένας διακομιστής ιστού που εκτελείται με άσχετο λογαριασμό δεν θα μπορεί, επομένως, να διαβάσει τις αναφορές, ακόμη κι αν μια ευπάθεια του επιτρέπει να μαντέψει τη διαδρομή τους." },
        ],
      },
    },
    {
      id: "2.2",
      title: { en: "Special permissions: SetUID, SetGID and the sticky bit", el: "Ειδικά δικαιώματα: SetUID, SetGID και sticky bit" },
      body: {
        en: [
          "Three additional bits modify how the basic permissions behave. The **SetUID** bit (octal 4000) causes an executable to run with the privileges of its *owner* rather than of the user who launched it. This is how an ordinary user can change their own password with `passwd`, a program owned by root that must write to the protected `/etc/shadow` file. The **SetGID** bit (2000) works analogously for the group; on a directory it also makes new files inherit the directory's group, which is useful for shared project folders. The **sticky bit** (1000) on a world-writable directory such as `/tmp` allows users to delete only the files they own.",
          "SetUID programs owned by root are among the most attractive targets for attackers, because any flaw in them—a buffer overflow, an unsafe call to another program, a writable library path—immediately yields full administrative control. For this reason, system administrators should periodically inventory them (for example with `find / -perm -4000 -type f`), remove the bit wherever it is not strictly necessary, and prefer finer-grained mechanisms such as capabilities.",
        ],
        el: [
          "Τρία πρόσθετα bit τροποποιούν τη συμπεριφορά των βασικών δικαιωμάτων. Το **SetUID** (οκταδικό 4000) προκαλεί την εκτέλεση ενός προγράμματος με τα προνόμια του *κατόχου* του και όχι του χρήστη που το εκκίνησε. Με αυτόν τον τρόπο ένας απλός χρήστης μπορεί να αλλάξει τον κωδικό του με την εντολή `passwd`, ένα πρόγραμμα που ανήκει στον root και πρέπει να γράψει στο προστατευμένο αρχείο `/etc/shadow`. Το **SetGID** (2000) λειτουργεί ανάλογα για την ομάδα· όταν εφαρμόζεται σε κατάλογο, κάνει επιπλέον τα νέα αρχεία να κληρονομούν την ομάδα του καταλόγου, κάτι χρήσιμο για κοινόχρηστους φακέλους έργων. Το **sticky bit** (1000) σε κατάλογο με δικαίωμα εγγραφής για όλους, όπως ο `/tmp`, επιτρέπει σε κάθε χρήστη να διαγράφει μόνο τα δικά του αρχεία.",
          "Τα προγράμματα SetUID που ανήκουν στον root είναι από τους πιο ελκυστικούς στόχους για τους επιτιθέμενους, επειδή οποιοδήποτε σφάλμα τους —υπερχείλιση ενδιάμεσης μνήμης, μη ασφαλής κλήση άλλου προγράμματος, διαδρομή βιβλιοθήκης με δικαίωμα εγγραφής— οδηγεί αμέσως σε πλήρη διαχειριστικό έλεγχο. Γι' αυτό οι διαχειριστές συστημάτων οφείλουν να τα καταγράφουν περιοδικά (για παράδειγμα με την εντολή `find / -perm -4000 -type f`), να αφαιρούν το bit όπου δεν είναι απολύτως αναγκαίο και να προτιμούν λεπτομερέστερους μηχανισμούς, όπως οι δυνατότητες (capabilities).",
        ],
      },
    },
    {
      id: "2.3",
      title: { en: "Beyond permission modes: ACLs, capabilities and mandatory access control", el: "Πέρα από τα βασικά δικαιώματα: ACL, capabilities και υποχρεωτικός έλεγχος πρόσβασης" },
      body: {
        en: [
          "The owner–group–others model is simple, but it cannot express rules such as *Alice may read this file and Bob may write it, but no one else may do either*. **POSIX access control lists (ACLs)** solve this by attaching additional entries for named users and groups, managed with `setfacl` and inspected with `getfacl`. A *mask* entry limits the maximum rights any named entry can receive, which allows administrators to tighten access quickly.",
          "**Linux capabilities** divide the all-powerful root privilege into roughly forty independent units. A web server that only needs to bind to port 80 can receive `CAP_NET_BIND_SERVICE` instead of running as root, so that a compromise of the server does not grant control over the whole system. Finally, **mandatory access control (MAC)** frameworks such as **SELinux** and **AppArmor** enforce a system-wide policy that even the file owner cannot override. Under MAC, a compromised process remains confined to the resources its policy explicitly allows—an application of the fail-safe defaults principle introduced in Chapter 1.",
        ],
        el: [
          "Το μοντέλο κάτοχος–ομάδα–λοιποί είναι απλό, αλλά δεν μπορεί να εκφράσει κανόνες όπως *η Αλίκη μπορεί να διαβάσει αυτό το αρχείο και ο Βασίλης να το τροποποιήσει, ενώ κανείς άλλος δεν μπορεί να κάνει τίποτα από τα δύο*. Οι **λίστες ελέγχου πρόσβασης POSIX (ACL)** επιλύουν το πρόβλημα, προσθέτοντας εγγραφές για συγκεκριμένους χρήστες και ομάδες, οι οποίες διαχειρίζονται με την εντολή `setfacl` και εμφανίζονται με την `getfacl`. Μια εγγραφή *μάσκας* περιορίζει τα μέγιστα δικαιώματα που μπορεί να λάβει οποιαδήποτε ονομαστική εγγραφή, επιτρέποντας στους διαχειριστές να περιορίζουν γρήγορα την πρόσβαση.",
          "Οι **δυνατότητες (capabilities) του Linux** διασπούν το παντοδύναμο προνόμιο του root σε περίπου σαράντα ανεξάρτητες μονάδες. Ένας διακομιστής ιστού που χρειάζεται μόνο να δεσμεύσει τη θύρα 80 μπορεί να λάβει τη δυνατότητα `CAP_NET_BIND_SERVICE` αντί να εκτελείται ως root, ώστε η παραβίασή του να μην παρέχει έλεγχο ολόκληρου του συστήματος. Τέλος, τα πλαίσια **υποχρεωτικού ελέγχου πρόσβασης** (Mandatory Access Control, MAC), όπως τα **SELinux** και **AppArmor**, επιβάλλουν μια πολιτική σε επίπεδο συστήματος την οποία δεν μπορεί να παρακάμψει ούτε ο κάτοχος του αρχείου. Υπό καθεστώς MAC, μια παραβιασμένη διεργασία παραμένει περιορισμένη στους πόρους που της επιτρέπει ρητά η πολιτική —εφαρμογή της αρχής των ασφαλών προεπιλογών που εισήχθη στο Κεφάλαιο 1.",
        ],
      },
    },
    {
      id: "2.4",
      title: { en: "Windows security architecture: identities, tokens, UAC and the registry", el: "Αρχιτεκτονική ασφάλειας των Windows: ταυτότητες, token, UAC και μητρώο" },
      body: {
        en: [
          "Windows identifies every user, group and computer by a **security identifier (SID)**, a unique value that remains stable even if the account is renamed. When a user logs on, the Local Security Authority creates an **access token** that lists the user's SID, group SIDs and privileges. Every process the user starts inherits a copy of this token. Objects such as files, registry keys and services carry a **security descriptor** whose **discretionary access control list (DACL)** contains allow and deny entries. When a process requests access, the Security Reference Monitor compares the token against the DACL; explicit deny entries are evaluated before allow entries.",
          "**User Account Control (UAC)** addresses a historical problem: for years, most Windows users worked permanently as administrators. With UAC, an administrator receives two tokens at logon—a *filtered* standard-user token used for everyday work and a *full* token that is activated only after explicit consent. The **registry**, the hierarchical database that stores system and application configuration, is protected by the same security descriptors. Registry keys such as `HKLM\\...\\Run` are a favourite persistence location for malware, which is why their permissions and changes must be monitored.",
        ],
        el: [
          "Τα Windows αναγνωρίζουν κάθε χρήστη, ομάδα και υπολογιστή μέσω ενός **αναγνωριστικού ασφάλειας** (Security Identifier, SID), μιας μοναδικής τιμής που παραμένει σταθερή ακόμη κι αν ο λογαριασμός μετονομαστεί. Όταν ένας χρήστης συνδέεται, η Τοπική Αρχή Ασφάλειας (LSA) δημιουργεί ένα **διακριτικό πρόσβασης** (access token), το οποίο περιέχει το SID του χρήστη, τα SID των ομάδων του και τα προνόμιά του. Κάθε διεργασία που εκκινεί ο χρήστης κληρονομεί αντίγραφο αυτού του διακριτικού. Αντικείμενα όπως αρχεία, κλειδιά μητρώου και υπηρεσίες φέρουν έναν **περιγραφέα ασφάλειας** (security descriptor), του οποίου η **λίστα διακριτικού ελέγχου πρόσβασης** (DACL) περιέχει εγγραφές που επιτρέπουν ή απαγορεύουν την πρόσβαση. Όταν μια διεργασία ζητά πρόσβαση, η Οθόνη Αναφοράς Ασφάλειας (Security Reference Monitor) συγκρίνει το διακριτικό με τη DACL· οι ρητές απαγορεύσεις αξιολογούνται πριν από τις άδειες.",
          "Ο **Έλεγχος Λογαριασμού Χρήστη** (User Account Control, UAC) αντιμετωπίζει ένα ιστορικό πρόβλημα: για χρόνια, οι περισσότεροι χρήστες των Windows εργάζονταν μόνιμα ως διαχειριστές. Με το UAC, ένας διαχειριστής λαμβάνει κατά τη σύνδεση δύο διακριτικά —ένα *φιλτραρισμένο* διακριτικό απλού χρήστη για την καθημερινή εργασία και ένα *πλήρες* διακριτικό που ενεργοποιείται μόνο μετά από ρητή συγκατάθεση. Το **μητρώο** (registry), η ιεραρχική βάση δεδομένων που αποθηκεύει τις ρυθμίσεις του συστήματος και των εφαρμογών, προστατεύεται από τους ίδιους περιγραφείς ασφάλειας. Κλειδιά μητρώου όπως το `HKLM\\...\\Run` αποτελούν αγαπημένο σημείο εγκατάστασης μόνιμης παρουσίας (persistence) για το κακόβουλο λογισμικό· γι' αυτό τα δικαιώματα και οι μεταβολές τους πρέπει να παρακολουθούνται.",
        ],
      },
    },
    {
      id: "2.5",
      title: { en: "Windows in depth: integrity levels, privileges and the lateral-movement surface", el: "Τα Windows σε βάθος: επίπεδα ακεραιότητας, προνόμια και επιφάνεια πλευρικής κίνησης" },
      body: {
        en: [
          "Since Windows Vista, every process and object also carries a **mandatory integrity level**: *Low*, *Medium*, *High* or *System*. A process may not write to an object with a higher integrity level, regardless of what the DACL says. This is a direct application of the Biba model (Chapter 1). Web browsers exploit it by running content-rendering processes at Low integrity, so that malicious web content cannot modify user files even if it achieves code execution.",
          "Certain **privileges** in a token are so powerful that they are effectively equivalent to full control. `SeDebugPrivilege` allows reading the memory of any process—including LSASS, where credentials are cached—while `SeImpersonatePrivilege` and `SeBackupPrivilege` have repeatedly been abused for privilege escalation. In a domain, these local weaknesses become a network problem: cached credentials, shared local administrator passwords and remote administration protocols (SMB, WMI, WinRM, RDP) allow an attacker to move laterally from one compromised workstation to many others. Countermeasures include unique local administrator passwords (Windows LAPS), Credential Guard, tiered administration and restricting which accounts may log on to which systems.",
          {
            t: "table",
            caption: "Table 2.1 — POSIX and Windows access control compared",
            head: ["Aspect", "POSIX (Linux)", "Windows"],
            rows: [
              ["Identity", "UID / GID", "SID"],
              ["Per-object policy", "Mode bits + optional ACL", "Security descriptor with DACL"],
              ["Privilege elevation", "SetUID, sudo, capabilities", "UAC consent, privileges in token"],
              ["Mandatory control", "SELinux, AppArmor", "Integrity levels, AppContainer"],
              ["Common escalation path", "Vulnerable SetUID binary", "Abused token privilege, weak service ACL"],
            ],
          },
        ],
        el: [
          "Από τα Windows Vista και έπειτα, κάθε διεργασία και κάθε αντικείμενο φέρει επιπλέον ένα **υποχρεωτικό επίπεδο ακεραιότητας**: *Χαμηλό*, *Μεσαίο*, *Υψηλό* ή *Συστήματος*. Μια διεργασία δεν μπορεί να γράψει σε αντικείμενο υψηλότερου επιπέδου ακεραιότητας, ανεξάρτητα από το τι ορίζει η DACL. Πρόκειται για άμεση εφαρμογή του μοντέλου Biba (Κεφάλαιο 1). Οι φυλλομετρητές ιστού αξιοποιούν αυτόν τον μηχανισμό, εκτελώντας τις διεργασίες απόδοσης περιεχομένου σε Χαμηλό επίπεδο ακεραιότητας, ώστε κακόβουλο περιεχόμενο ιστού να μην μπορεί να τροποποιήσει τα αρχεία του χρήστη ακόμη κι αν επιτύχει εκτέλεση κώδικα.",
          "Ορισμένα **προνόμια** ενός διακριτικού είναι τόσο ισχυρά, ώστε ισοδυναμούν ουσιαστικά με πλήρη έλεγχο. Το `SeDebugPrivilege` επιτρέπει την ανάγνωση της μνήμης οποιασδήποτε διεργασίας —συμπεριλαμβανομένης της LSASS, όπου διατηρούνται διαπιστευτήρια— ενώ τα `SeImpersonatePrivilege` και `SeBackupPrivilege` έχουν επανειλημμένα χρησιμοποιηθεί για κλιμάκωση προνομίων. Σε ένα περιβάλλον τομέα (domain), αυτές οι τοπικές αδυναμίες μετατρέπονται σε δικτυακό πρόβλημα: τα αποθηκευμένα διαπιστευτήρια, οι κοινοί κωδικοί τοπικού διαχειριστή και τα πρωτόκολλα απομακρυσμένης διαχείρισης (SMB, WMI, WinRM, RDP) επιτρέπουν σε έναν επιτιθέμενο να κινηθεί πλευρικά από έναν παραβιασμένο σταθμό εργασίας σε πολλούς άλλους. Τα αντίμετρα περιλαμβάνουν μοναδικούς κωδικούς τοπικού διαχειριστή (Windows LAPS), το Credential Guard, την κλιμακωτή (tiered) διαχείριση και τον περιορισμό των λογαριασμών που επιτρέπεται να συνδέονται σε κάθε σύστημα.",
          {
            t: "table",
            caption: "Πίνακας 2.1 — Σύγκριση ελέγχου πρόσβασης σε POSIX και Windows",
            head: ["Χαρακτηριστικό", "POSIX (Linux)", "Windows"],
            rows: [
              ["Ταυτότητα", "UID / GID", "SID"],
              ["Πολιτική ανά αντικείμενο", "Βασικά δικαιώματα + προαιρετική ACL", "Περιγραφέας ασφάλειας με DACL"],
              ["Ανύψωση προνομίων", "SetUID, sudo, capabilities", "Συγκατάθεση UAC, προνόμια στο διακριτικό"],
              ["Υποχρεωτικός έλεγχος", "SELinux, AppArmor", "Επίπεδα ακεραιότητας, AppContainer"],
              ["Συνήθης οδός κλιμάκωσης", "Ευάλωτο εκτελέσιμο SetUID", "Κατάχρηση προνομίου διακριτικού, αδύναμη ACL υπηρεσίας"],
            ],
          },
        ],
      },
    },
  ],
  terms: {
    en: [
      { term: "DAC", def: "Discretionary access control: the owner of a resource decides who may access it." },
      { term: "SetUID", def: "Permission bit that makes a program run with its owner's privileges." },
      { term: "Capability (Linux)", def: "An individual unit of root privilege that can be granted separately." },
      { term: "MAC", def: "Mandatory access control: a system-wide policy that owners cannot override (SELinux, AppArmor)." },
      { term: "Access token", def: "Windows structure that carries a process's identity, group memberships and privileges." },
      { term: "Integrity level", def: "Windows label (Low–System) that prevents lower-integrity processes from writing to higher-integrity objects." },
    ],
    el: [
      { term: "DAC", def: "Διακριτικός έλεγχος πρόσβασης: ο κάτοχος ενός πόρου αποφασίζει ποιος έχει πρόσβαση σε αυτόν." },
      { term: "SetUID", def: "Ειδικό δικαίωμα που κάνει ένα πρόγραμμα να εκτελείται με τα προνόμια του κατόχου του." },
      { term: "Δυνατότητα (capability)", def: "Αυτοτελής μονάδα του προνομίου root που μπορεί να παραχωρηθεί χωριστά." },
      { term: "MAC", def: "Υποχρεωτικός έλεγχος πρόσβασης: πολιτική σε επίπεδο συστήματος που δεν μπορεί να παρακάμψει ο κάτοχος (SELinux, AppArmor)." },
      { term: "Διακριτικό πρόσβασης", def: "Δομή των Windows που περιέχει την ταυτότητα, τις ομάδες και τα προνόμια μιας διεργασίας." },
      { term: "Επίπεδο ακεραιότητας", def: "Ετικέτα των Windows (Χαμηλό–Συστήματος) που εμποδίζει διεργασίες χαμηλότερου επιπέδου να γράφουν σε αντικείμενα υψηλότερου." },
    ],
  },
  summary: {
    en: [
      "POSIX systems control access through owner, group and others permissions; the first matching category decides.",
      "SetUID and SetGID are necessary in a few places but are a prime target for privilege escalation and must be inventoried.",
      "ACLs add fine-grained discretionary rules, capabilities split root privilege, and MAC confines even compromised processes.",
      "Windows combines SIDs, access tokens and DACLs; UAC separates everyday work from administrative actions.",
      "Integrity levels and careful privilege management limit both local escalation and lateral movement across a domain.",
    ],
    el: [
      "Τα συστήματα POSIX ελέγχουν την πρόσβαση μέσω δικαιωμάτων για κάτοχο, ομάδα και λοιπούς· αποφασίζει η πρώτη κατηγορία που ταιριάζει.",
      "Τα SetUID και SetGID είναι αναγκαία σε λίγα σημεία, αλλά αποτελούν βασικό στόχο κλιμάκωσης προνομίων και πρέπει να καταγράφονται.",
      "Οι ACL προσθέτουν λεπτομερείς διακριτικούς κανόνες, οι δυνατότητες διασπούν το προνόμιο του root και ο MAC περιορίζει ακόμη και παραβιασμένες διεργασίες.",
      "Τα Windows συνδυάζουν SID, διακριτικά πρόσβασης και DACL· το UAC διαχωρίζει την καθημερινή εργασία από τις διαχειριστικές ενέργειες.",
      "Τα επίπεδα ακεραιότητας και η προσεκτική διαχείριση προνομίων περιορίζουν τόσο την τοπική κλιμάκωση όσο και την πλευρική κίνηση σε έναν τομέα.",
    ],
  },
  questions: {
    en: [
      "A file has mode `604` and is owned by alice. Can alice read it? Can bob? Explain the evaluation order that produces your answer.",
      "Why is a vulnerable root-owned SetUID binary more dangerous than the same vulnerability in an ordinary program?",
      "Compare Linux capabilities with Windows token privileges. Which security principle do both mechanisms implement?",
      "Explain how shared local administrator passwords enable lateral movement, and describe two countermeasures.",
    ],
    el: [
      "Ένα αρχείο έχει δικαιώματα `604` και κάτοχο την alice. Μπορεί η alice να το διαβάσει; Μπορεί ο bob; Εξηγήστε τη σειρά αξιολόγησης που οδηγεί στην απάντησή σας.",
      "Γιατί ένα ευάλωτο εκτελέσιμο SetUID που ανήκει στον root είναι πιο επικίνδυνο από την ίδια ευπάθεια σε ένα συνηθισμένο πρόγραμμα;",
      "Συγκρίνετε τις δυνατότητες του Linux με τα προνόμια διακριτικού των Windows. Ποια αρχή ασφάλειας υλοποιούν και οι δύο μηχανισμοί;",
      "Εξηγήστε πώς οι κοινοί κωδικοί τοπικού διαχειριστή διευκολύνουν την πλευρική κίνηση και περιγράψτε δύο αντίμετρα.",
    ],
  },
};

export default ch02;

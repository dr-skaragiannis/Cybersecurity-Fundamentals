import type { Chapter } from "../types";

const ch04: Chapter = {
  n: 4,
  part: 2,
  title: { en: "Taxonomy of Malware and Malicious Code", el: "Ταξινόμηση του Κακόβουλου Λογισμικού και του Κακόβουλου Κώδικα" },
  subtitle: {
    en: "Viruses · Worms · Trojans · Spyware · Ransomware · Fileless attacks · Rootkits · Indicators of compromise · Stuxnet, WannaCry, Emotet",
    el: "Ιοί · Σκουλήκια (worms) · Δούρειοι ίπποι (trojans) · Λογισμικό κατασκοπείας · Λυτρισμικό · Επιθέσεις χωρίς αρχεία · Rootkits · Ενδείξεις παραβίασης · Stuxnet, WannaCry, Emotet",
  },
  level: { en: "Intermediate · Malicious code", el: "Μεσαίο επίπεδο · Κακόβουλος κώδικας" },
  hours: "8–10",
  intro: {
    en: [
      "Malicious software is the most visible instrument of cyberattacks, yet media reports often use its terminology loosely. Calling every infection a 'virus' is not only imprecise; it can lead to the wrong response. A worm must be contained by isolating networks, whereas a trojan must be stopped by preventing execution. Precise classification is therefore an operational necessity, not an academic exercise.",
      "This chapter organises malware by *mechanism*—how it spreads, how it hides and what it does—rather than by the names of individual families. It then examines the advanced techniques that allow modern implants to evade detection, explains how compromise can be recognised on hosts and networks, dissects the modern ransomware operation and draws lessons from three landmark cases.",
    ],
    el: [
      "Το κακόβουλο λογισμικό είναι το πιο ορατό εργαλείο των κυβερνοεπιθέσεων, ωστόσο τα μέσα ενημέρωσης χρησιμοποιούν συχνά την ορολογία του χαλαρά. Ο χαρακτηρισμός κάθε μόλυνσης ως «ιού» δεν είναι μόνο ανακριβής· μπορεί να οδηγήσει σε λανθασμένη απόκριση. Ένα σκουλήκι περιορίζεται με την απομόνωση δικτύων, ενώ ένας δούρειος ίππος σταματά με την παρεμπόδιση της εκτέλεσής του. Η ακριβής ταξινόμηση αποτελεί επομένως επιχειρησιακή αναγκαιότητα και όχι ακαδημαϊκή άσκηση.",
      "Το κεφάλαιο οργανώνει το κακόβουλο λογισμικό με βάση τον *μηχανισμό* του —πώς διαδίδεται, πώς κρύβεται και τι κάνει— και όχι με βάση τα ονόματα μεμονωμένων οικογενειών. Στη συνέχεια εξετάζει τις προηγμένες τεχνικές που επιτρέπουν στα σύγχρονα εμφυτεύματα να αποφεύγουν την ανίχνευση, εξηγεί πώς αναγνωρίζεται μια παραβίαση σε υπολογιστές και δίκτυα, αναλύει τη σύγχρονη επιχείρηση λυτρισμικού και αντλεί διδάγματα από τρεις ιστορικές περιπτώσεις.",
    ],
  },
  outcomes: {
    en: [
      "Distinguish malware classes by replication, propagation and payload, and choose the appropriate containment strategy.",
      "Explain fileless execution, polymorphism and rootkits, and why they defeat signature-based detection.",
      "Recognise host and network indicators of compromise and explain why correlation is required.",
      "Describe the stages of a modern ransomware attack and the correct order of response.",
      "Extract defensive lessons from Stuxnet, WannaCry and Emotet.",
    ],
    el: [
      "Να διακρίνετε τις κατηγορίες κακόβουλου λογισμικού με βάση την αναπαραγωγή, τη διάδοση και το ωφέλιμο φορτίο τους και να επιλέγετε την κατάλληλη στρατηγική περιορισμού.",
      "Να εξηγείτε την εκτέλεση χωρίς αρχεία, τον πολυμορφισμό και τα rootkits, καθώς και τον λόγο για τον οποίο παρακάμπτουν την ανίχνευση με υπογραφές.",
      "Να αναγνωρίζετε ενδείξεις παραβίασης σε υπολογιστές και δίκτυα και να εξηγείτε γιατί απαιτείται συσχέτισή τους.",
      "Να περιγράφετε τα στάδια μιας σύγχρονης επίθεσης λυτρισμικού και τη σωστή σειρά απόκρισης.",
      "Να αντλείτε αμυντικά διδάγματα από τις περιπτώσεις Stuxnet, WannaCry και Emotet.",
    ],
  },
  sections: [
    {
      id: "4.1",
      title: { en: "Core classifications: what replicates, what deceives, what profits", el: "Βασικές κατηγορίες: τι αναπαράγεται, τι εξαπατά, τι αποφέρει κέρδος" },
      body: {
        en: [
          "A **virus** attaches itself to a host file or document and replicates only when that host is executed, so it usually depends on some user action. A **worm**, by contrast, is self-contained and spreads across networks on its own by exploiting vulnerable services; the Morris Worm and WannaCry's propagation over the SMB protocol are classic examples. A **trojan** does not replicate at all. It masquerades as legitimate software to persuade the victim to run it, and its danger lies in its social plausibility and in the payloads it carries.",
          "Other classes are defined by what they do rather than how they spread. **Spyware** secretly collects user activity or data; **adware** monetises the victim's attention and often serves as a gateway for spyware; **keyloggers** record keystrokes to capture passwords. **Ransomware** denies access to data, either by encrypting files (*crypto-ransomware*) or by locking the system (*locker ransomware*), and today usually combines encryption with data theft—the so-called *double extortion*.",
          {
            t: "table",
            caption: "Table 4.1 — Malware classes and their primary defences",
            head: ["Class", "Self-replicating?", "Needs user action?", "Primary defence"],
            rows: [
              ["Virus", "Yes, via host files", "Usually", "Execution prevention, antivirus, patching"],
              ["Worm", "Yes, across the network", "No", "Network segmentation, prompt patching of services, IDS"],
              ["Trojan", "No", "Yes (deception)", "Application allow-listing, code signing, user awareness"],
              ["Ransomware", "Sometimes (worm-like)", "Often (phishing, exposed RDP)", "Immutable backups, MFA, EDR, patching"],
              ["Spyware / keylogger", "No", "Yes (bundled software)", "Least privilege, monitoring of outbound traffic"],
            ],
          },
        ],
        el: [
          "Ένας **ιός** προσκολλάται σε ένα αρχείο-ξενιστή ή έγγραφο και αναπαράγεται μόνο όταν αυτό εκτελεστεί· επομένως, εξαρτάται συνήθως από κάποια ενέργεια του χρήστη. Αντίθετα, ένα **σκουλήκι** (worm) είναι αυτοτελές και διαδίδεται από μόνο του στα δίκτυα, εκμεταλλευόμενο ευάλωτες υπηρεσίες· το Morris Worm και η διάδοση του WannaCry μέσω του πρωτοκόλλου SMB είναι κλασικά παραδείγματα. Ένας **δούρειος ίππος** (trojan) δεν αναπαράγεται καθόλου. Παρουσιάζεται ως νόμιμο λογισμικό, ώστε να πείσει το θύμα να τον εκτελέσει, και η επικινδυνότητά του έγκειται στην κοινωνική του αληθοφάνεια και στα ωφέλιμα φορτία που μεταφέρει.",
          "Άλλες κατηγορίες ορίζονται από το τι κάνουν και όχι από το πώς διαδίδονται. Το **λογισμικό κατασκοπείας** (spyware) συλλέγει κρυφά τη δραστηριότητα ή τα δεδομένα του χρήστη· το **διαφημιστικό λογισμικό** (adware) εκμεταλλεύεται οικονομικά την προσοχή του θύματος και συχνά λειτουργεί ως πύλη για λογισμικό κατασκοπείας· οι **καταγραφείς πληκτρολογήσεων** (keyloggers) καταγράφουν ό,τι πληκτρολογείται για να υποκλέψουν κωδικούς. Το **λυτρισμικό** (ransomware) στερεί την πρόσβαση στα δεδομένα, είτε κρυπτογραφώντας αρχεία (*κρυπτογραφικό λυτρισμικό*) είτε κλειδώνοντας το σύστημα (*λυτρισμικό κλειδώματος*), και σήμερα συνήθως συνδυάζει την κρυπτογράφηση με κλοπή δεδομένων —τον λεγόμενο *διπλό εκβιασμό*.",
          {
            t: "table",
            caption: "Πίνακας 4.1 — Κατηγορίες κακόβουλου λογισμικού και κύριες άμυνες",
            head: ["Κατηγορία", "Αυτοαναπαράγεται;", "Απαιτεί ενέργεια χρήστη;", "Κύρια άμυνα"],
            rows: [
              ["Ιός", "Ναι, μέσω αρχείων-ξενιστών", "Συνήθως", "Παρεμπόδιση εκτέλεσης, antivirus, ενημερώσεις"],
              ["Σκουλήκι", "Ναι, μέσω δικτύου", "Όχι", "Κατάτμηση δικτύου, άμεση ενημέρωση υπηρεσιών, IDS"],
              ["Δούρειος ίππος", "Όχι", "Ναι (εξαπάτηση)", "Λίστες επιτρεπόμενων εφαρμογών, υπογραφή κώδικα, ευαισθητοποίηση"],
              ["Λυτρισμικό", "Ενίοτε (όπως σκουλήκι)", "Συχνά (ψάρεμα, εκτεθειμένο RDP)", "Αμετάβλητα αντίγραφα ασφαλείας, MFA, EDR, ενημερώσεις"],
              ["Λογισμικό κατασκοπείας / keylogger", "Όχι", "Ναι (ενσωματωμένο σε λογισμικό)", "Ελάχιστο προνόμιο, παρακολούθηση εξερχόμενης κίνησης"],
            ],
          },
        ],
      },
    },
    {
      id: "4.2",
      title: { en: "Advanced mechanics: fileless execution, polymorphism and rootkits", el: "Προηγμένοι μηχανισμοί: εκτέλεση χωρίς αρχεία, πολυμορφισμός και rootkits" },
      body: {
        en: [
          "Traditional antivirus products scan files on disk and compare them with known signatures. Modern implants are designed to defeat exactly this approach. **Fileless malware** resides in memory, in the registry, in WMI subscriptions or in scheduled tasks, and abuses legitimate system tools such as PowerShell, `mshta` or `wmic`. This practice is called *living off the land*, because the attacker uses what is already installed. Techniques such as *reflective DLL injection* and *process hollowing* load malicious code into the memory of a trusted process, so that no suspicious executable ever touches the disk.",
          "**Polymorphic** and **metamorphic** code changes its byte representation with every infection—through encryption wrappers or instruction substitution—while its behaviour remains the same. A signature written for one copy therefore fails to match the next, which is why defenders turn to behavioural detection and pattern-based rules such as YARA (Chapter 11). **Rootkits** go one step further: operating in user mode, in the kernel, in the boot process or even in firmware, they intercept system queries in order to hide files, processes and network connections. Because a rootkit controls what the compromised system reports about itself, it must be detected from *outside* that system—through secure boot, memory forensics or offline disk analysis.",
        ],
        el: [
          "Τα παραδοσιακά προϊόντα προστασίας από ιούς σαρώνουν αρχεία στον δίσκο και τα συγκρίνουν με γνωστές υπογραφές. Τα σύγχρονα εμφυτεύματα σχεδιάζονται ακριβώς για να παρακάμπτουν αυτή την προσέγγιση. Το **κακόβουλο λογισμικό χωρίς αρχεία** (fileless malware) βρίσκεται στη μνήμη, στο μητρώο, σε συνδρομές WMI ή σε προγραμματισμένες εργασίες και κάνει κατάχρηση νόμιμων εργαλείων του συστήματος, όπως το PowerShell, το `mshta` ή το `wmic`. Η πρακτική αυτή ονομάζεται *living off the land*, επειδή ο επιτιθέμενος χρησιμοποιεί ό,τι είναι ήδη εγκατεστημένο. Τεχνικές όπως η *ανακλαστική έγχυση DLL* (reflective DLL injection) και η *εκκένωση διεργασίας* (process hollowing) φορτώνουν κακόβουλο κώδικα στη μνήμη μιας αξιόπιστης διεργασίας, ώστε κανένα ύποπτο εκτελέσιμο να μη γράφεται ποτέ στον δίσκο.",
          "Ο **πολυμορφικός** και ο **μεταμορφικός** κώδικας μεταβάλλει τη δυαδική του αναπαράσταση σε κάθε μόλυνση —μέσω κρυπτογραφικών περιτυλιγμάτων ή αντικατάστασης εντολών— ενώ η συμπεριφορά του παραμένει ίδια. Μια υπογραφή που γράφτηκε για ένα αντίγραφο αποτυγχάνει επομένως να ταιριάξει με το επόμενο· γι' αυτό οι αμυνόμενοι στρέφονται στην ανίχνευση συμπεριφοράς και σε κανόνες προτύπων όπως οι κανόνες YARA (Κεφάλαιο 11). Τα **rootkits** προχωρούν ένα βήμα παραπέρα: λειτουργώντας σε επίπεδο χρήστη, στον πυρήνα, στη διαδικασία εκκίνησης ή ακόμη και στο υλικολογισμικό, παρεμβάλλονται στα ερωτήματα προς το σύστημα για να αποκρύψουν αρχεία, διεργασίες και δικτυακές συνδέσεις. Επειδή ένα rootkit ελέγχει τι αναφέρει το παραβιασμένο σύστημα για τον εαυτό του, πρέπει να ανιχνεύεται *εκτός* αυτού του συστήματος —μέσω ασφαλούς εκκίνησης (secure boot), εγκληματολογικής ανάλυσης μνήμης ή ανάλυσης του δίσκου εκτός λειτουργίας.",
        ],
      },
    },
    {
      id: "4.3",
      title: { en: "Indicators of compromise on hosts and networks", el: "Ενδείξεις παραβίασης σε υπολογιστές και δίκτυα" },
      body: {
        en: [
          "A compromise usually reveals itself as a **deviation from the normal baseline**. On a host, typical signs include sustained CPU, disk or network activity without a corresponding user workload; new persistence mechanisms such as registry *Run* keys, services, cron jobs or WMI subscriptions; unusual process trees, for example a word processor launching a command shell; and evidence that defences were tampered with, such as a disabled endpoint agent or a cleared security log (Windows Event ID 1102). On the network, suspicious signs include regular 'beaconing' connections at fixed intervals, very long or random-looking domain names, and TLS client fingerprints that do not match any legitimate software in the organisation.",
          "An important principle of analysis is that **a single indicator only suggests; several correlated indicators confirm**. Administrators occasionally run PowerShell, and legitimate software sometimes contacts unusual domains. Confidence grows when independent observations point to the same conclusion—for example, an Office document spawning PowerShell, which then creates a Run key and begins contacting a newly registered domain every sixty seconds. Chapter 11 turns this principle into detection rules, and Chapter 12 applies it to forensic analysis.",
        ],
        el: [
          "Μια παραβίαση συνήθως αποκαλύπτεται ως **απόκλιση από τη φυσιολογική συμπεριφορά αναφοράς** (baseline). Σε έναν υπολογιστή, τυπικές ενδείξεις είναι η παρατεταμένη δραστηριότητα επεξεργαστή, δίσκου ή δικτύου χωρίς αντίστοιχο φόρτο εργασίας του χρήστη· νέοι μηχανισμοί μόνιμης παρουσίας, όπως κλειδιά *Run* στο μητρώο, υπηρεσίες, εργασίες cron ή συνδρομές WMI· ασυνήθιστα δέντρα διεργασιών, για παράδειγμα ένας επεξεργαστής κειμένου που εκκινεί γραμμή εντολών· και στοιχεία παραποίησης των αμυνών, όπως απενεργοποιημένος πράκτορας προστασίας ή διαγραμμένο αρχείο καταγραφής ασφάλειας (συμβάν 1102 στα Windows). Στο δίκτυο, ύποπτες ενδείξεις αποτελούν οι τακτικές συνδέσεις «σηματοδότησης» (beaconing) σε σταθερά διαστήματα, τα πολύ μεγάλα ή φαινομενικά τυχαία ονόματα τομέα και τα αποτυπώματα πελάτη TLS που δεν αντιστοιχούν σε κανένα νόμιμο λογισμικό του οργανισμού.",
          "Μια σημαντική αρχή της ανάλυσης είναι ότι **μια μεμονωμένη ένδειξη απλώς υποδηλώνει· πολλές συσχετισμένες ενδείξεις επιβεβαιώνουν**. Οι διαχειριστές εκτελούν περιστασιακά PowerShell και το νόμιμο λογισμικό επικοινωνεί μερικές φορές με ασυνήθιστους τομείς. Η βεβαιότητα αυξάνεται όταν ανεξάρτητες παρατηρήσεις οδηγούν στο ίδιο συμπέρασμα —για παράδειγμα, ένα έγγραφο Office εκκινεί PowerShell, το οποίο δημιουργεί ένα κλειδί Run και αρχίζει να επικοινωνεί κάθε εξήντα δευτερόλεπτα με έναν πρόσφατα καταχωρισμένο τομέα. Το Κεφάλαιο 11 μετατρέπει αυτή την αρχή σε κανόνες ανίχνευσης και το Κεφάλαιο 12 την εφαρμόζει στην εγκληματολογική ανάλυση.",
        ],
      },
    },
    {
      id: "4.4",
      title: { en: "Droppers, loaders, remote-access trojans and wipers", el: "Droppers, loaders, trojans απομακρυσμένης πρόσβασης και wipers" },
      body: {
        en: [
          "Modern intrusions are rarely carried out by a single program. Instead, a chain of specialised components hands control from one stage to the next. A **dropper** carries its payload inside itself and writes it to the system. A **downloader** or **loader**—Emotet, TrickBot and QakBot are well-known examples—fetches further modules from the internet after the initial infection, which has enabled a *crimeware-as-a-service* economy in which one group sells access to another. A **remote access trojan (RAT)** gives the attacker interactive control: keystroke logging, screen capture, file transfer and use of the victim as a proxy.",
          "A **wiper** such as Shamoon, WhisperGate or HermeticWiper is designed purely for destruction, although it may disguise itself as ransomware. Correct identification is critical here: because no decryption key exists, a response plan that considers paying the ransom is not only futile but actively harmful, as it delays recovery from backups. When analysing an incident, analysts should therefore name the *stage* they have observed, not merely the family—'QakBot loader, before RAT deployment' is far more useful to responders than 'QakBot'.",
        ],
        el: [
          "Οι σύγχρονες εισβολές σπάνια πραγματοποιούνται από ένα μόνο πρόγραμμα. Αντίθετα, μια αλυσίδα εξειδικευμένων στοιχείων μεταβιβάζει τον έλεγχο από το ένα στάδιο στο επόμενο. Ένας **dropper** μεταφέρει το ωφέλιμο φορτίο μέσα του και το εγγράφει στο σύστημα. Ένας **downloader** ή **loader** —γνωστά παραδείγματα είναι τα Emotet, TrickBot και QakBot— ανακτά πρόσθετες μονάδες από το διαδίκτυο μετά την αρχική μόλυνση, γεγονός που επέτρεψε την ανάπτυξη μιας οικονομίας *εγκληματικού λογισμικού ως υπηρεσίας*, στην οποία μια ομάδα πωλεί πρόσβαση σε άλλη. Ένας **δούρειος ίππος απομακρυσμένης πρόσβασης** (Remote Access Trojan, RAT) παρέχει στον επιτιθέμενο διαδραστικό έλεγχο: καταγραφή πληκτρολογήσεων, λήψη στιγμιοτύπων οθόνης, μεταφορά αρχείων και χρήση του θύματος ως ενδιάμεσου κόμβου.",
          "Ένας **wiper**, όπως τα Shamoon, WhisperGate ή HermeticWiper, σχεδιάζεται αποκλειστικά για καταστροφή, αν και μπορεί να μεταμφιέζεται σε λυτρισμικό. Η σωστή αναγνώριση είναι εδώ κρίσιμη: επειδή δεν υπάρχει κλειδί αποκρυπτογράφησης, ένα σχέδιο απόκρισης που εξετάζει την καταβολή λύτρων δεν είναι απλώς μάταιο αλλά και επιζήμιο, διότι καθυστερεί την ανάκαμψη από τα αντίγραφα ασφαλείας. Κατά την ανάλυση ενός περιστατικού, οι αναλυτές πρέπει επομένως να κατονομάζουν το *στάδιο* που παρατήρησαν και όχι μόνο την οικογένεια —η διατύπωση «loader του QakBot, πριν από την εγκατάσταση RAT» είναι πολύ πιο χρήσιμη για την ομάδα απόκρισης από το σκέτο «QakBot».",
        ],
      },
    },
    {
      id: "4.5",
      title: { en: "Anatomy of modern ransomware", el: "Ανατομία του σύγχρονου λυτρισμικού" },
      body: {
        en: [
          "Contemporary crypto-ransomware relies on **hybrid encryption**. Each file is encrypted with a fast symmetric algorithm (AES or ChaCha20) and a unique key; these keys are in turn encrypted with the attacker's public key (RSA or elliptic-curve), so that only the attacker can recover them. Before encryption begins, the malware typically deletes Windows shadow copies and backup catalogues (for example with `vssadmin delete shadows`) in order to prevent easy recovery, and it attempts to disable security tools, sometimes by rebooting the system into safe mode where endpoint agents do not run.",
          "Pressure on the victim is applied through **multiple extortion**: data are encrypted, stolen data are threatened with publication on a leak site, and some groups add denial-of-service attacks or contact the victim's customers directly. The correct response follows a disciplined order: first **isolate** affected hosts and compromised identities; then **preserve evidence**, including memory images and the ransom notes, which contain victim identifiers; next **identify the strain** and check whether a free decryptor exists (for instance on the No More Ransom portal); and only then **restore** from backups that are known to be clean. Paying the ransom guarantees neither decryption nor deletion of the stolen data, and it may also raise legal issues.",
          { t: "box", kind: "key", title: "Key principle", text: "The single most effective technical control against ransomware is a backup that the attacker cannot reach or modify: offline or immutable, regularly tested, and protected by separate credentials (see Chapter 13)." },
        ],
        el: [
          "Το σύγχρονο κρυπτογραφικό λυτρισμικό βασίζεται στην **υβριδική κρυπτογράφηση**. Κάθε αρχείο κρυπτογραφείται με έναν ταχύ συμμετρικό αλγόριθμο (AES ή ChaCha20) και ένα μοναδικό κλειδί· τα κλειδιά αυτά κρυπτογραφούνται με τη σειρά τους με το δημόσιο κλειδί του επιτιθέμενου (RSA ή ελλειπτικών καμπυλών), ώστε μόνο εκείνος να μπορεί να τα ανακτήσει. Πριν αρχίσει η κρυπτογράφηση, το κακόβουλο λογισμικό διαγράφει συνήθως τα σκιώδη αντίγραφα (shadow copies) και τους καταλόγους αντιγράφων ασφαλείας των Windows (για παράδειγμα με την εντολή `vssadmin delete shadows`), ώστε να αποτρέψει την εύκολη ανάκτηση, και επιχειρεί να απενεργοποιήσει τα εργαλεία ασφάλειας, ενίοτε επανεκκινώντας το σύστημα σε ασφαλή λειτουργία, όπου οι πράκτορες προστασίας δεν εκτελούνται.",
          "Η πίεση προς το θύμα ασκείται μέσω **πολλαπλού εκβιασμού**: τα δεδομένα κρυπτογραφούνται, τα κλεμμένα δεδομένα απειλούνται με δημοσιοποίηση σε ιστότοπο διαρροών και ορισμένες ομάδες προσθέτουν επιθέσεις άρνησης υπηρεσίας ή επικοινωνούν απευθείας με τους πελάτες του θύματος. Η σωστή απόκριση ακολουθεί αυστηρή σειρά: πρώτα **απομονώνονται** οι επηρεασμένοι υπολογιστές και οι παραβιασμένες ταυτότητες· έπειτα **διαφυλάσσονται τα αποδεικτικά στοιχεία**, συμπεριλαμβανομένων των ειδώλων μνήμης και των σημειωμάτων λύτρων, που περιέχουν αναγνωριστικά του θύματος· στη συνέχεια **προσδιορίζεται το στέλεχος** και ελέγχεται αν υπάρχει δωρεάν εργαλείο αποκρυπτογράφησης (για παράδειγμα στην πύλη No More Ransom)· και μόνο τότε γίνεται **αποκατάσταση** από αντίγραφα ασφαλείας που είναι γνωστό ότι δεν έχουν μολυνθεί. Η καταβολή λύτρων δεν εγγυάται ούτε την αποκρυπτογράφηση ούτε τη διαγραφή των κλεμμένων δεδομένων και μπορεί επιπλέον να δημιουργήσει νομικά ζητήματα.",
          { t: "box", kind: "key", title: "Βασική αρχή", text: "Το πιο αποτελεσματικό τεχνικό μέτρο απέναντι στο λυτρισμικό είναι ένα αντίγραφο ασφαλείας που ο επιτιθέμενος δεν μπορεί να προσεγγίσει ή να τροποποιήσει: εκτός σύνδεσης ή αμετάβλητο, τακτικά δοκιμασμένο και προστατευμένο με ξεχωριστά διαπιστευτήρια (βλ. Κεφάλαιο 13)." },
        ],
      },
    },
    {
      id: "4.6",
      title: { en: "Landmark case studies: Stuxnet, WannaCry and Emotet", el: "Ιστορικές μελέτες περίπτωσης: Stuxnet, WannaCry και Emotet" },
      body: {
        en: [
          "**Stuxnet** (discovered in 2010) targeted Siemens programmable logic controllers that operated uranium-enrichment centrifuges. It used several zero-day vulnerabilities, crossed an air gap via USB media, carried drivers signed with stolen certificates, and altered the physical behaviour of machinery while showing operators normal readings. Its lesson is that operational-technology environments cannot rely on isolation alone (Chapter 13).",
          "**WannaCry** (2017) combined ransomware with a worm that exploited the SMBv1 vulnerability MS17-010 (the *EternalBlue* exploit). Within hours it disrupted organisations worldwide, including hospitals of the UK's National Health Service, even though a patch had been available for two months. The lesson is that slow patching and flat, unsegmented networks reinforce each other: once a worm enters, nothing slows its spread. **Emotet** (2014–2021) evolved from a banking trojan into a loader-as-a-service distributed through malicious email, delivering TrickBot and ultimately Ryuk ransomware, until an international law-enforcement operation dismantled its infrastructure. Its lesson is that criminal ecosystems operate like supply chains, and defending against the initial loader stage prevents everything that follows.",
        ],
        el: [
          "Το **Stuxnet** (ανακαλύφθηκε το 2010) στόχευε προγραμματιζόμενους λογικούς ελεγκτές της Siemens που λειτουργούσαν φυγοκεντρητές εμπλουτισμού ουρανίου. Χρησιμοποίησε αρκετές ευπάθειες μηδενικής ημέρας, διέσχισε ένα φυσικά απομονωμένο δίκτυο (air gap) μέσω μέσων USB, έφερε οδηγούς υπογεγραμμένους με κλεμμένα πιστοποιητικά και μετέβαλε τη φυσική συμπεριφορά των μηχανημάτων, ενώ εμφάνιζε στους χειριστές κανονικές ενδείξεις. Το δίδαγμά του είναι ότι τα περιβάλλοντα επιχειρησιακής τεχνολογίας δεν μπορούν να βασίζονται μόνο στην απομόνωση (Κεφάλαιο 13).",
          "Το **WannaCry** (2017) συνδύασε λυτρισμικό με σκουλήκι που εκμεταλλευόταν την ευπάθεια MS17-010 του SMBv1 (την εκμετάλλευση *EternalBlue*). Μέσα σε λίγες ώρες διατάραξε οργανισμούς σε όλο τον κόσμο, μεταξύ των οποίων νοσοκομεία του Εθνικού Συστήματος Υγείας του Ηνωμένου Βασιλείου, παρότι η σχετική ενημέρωση ήταν διαθέσιμη εδώ και δύο μήνες. Το δίδαγμα είναι ότι η καθυστερημένη εφαρμογή ενημερώσεων και τα επίπεδα, μη κατατμημένα δίκτυα αλληλοενισχύονται: μόλις ένα σκουλήκι εισέλθει, τίποτα δεν επιβραδύνει τη διάδοσή του. Το **Emotet** (2014–2021) εξελίχθηκε από τραπεζικός δούρειος ίππος σε υπηρεσία φόρτωσης (loader-as-a-service) που διανεμόταν μέσω κακόβουλων μηνυμάτων ηλεκτρονικού ταχυδρομείου και εγκαθιστούσε το TrickBot και, τελικά, το λυτρισμικό Ryuk, έως ότου μια διεθνής επιχείρηση των διωκτικών αρχών εξάρθρωσε την υποδομή του. Το δίδαγμά του είναι ότι τα εγκληματικά οικοσυστήματα λειτουργούν όπως οι εφοδιαστικές αλυσίδες και ότι η άμυνα στο αρχικό στάδιο του loader αποτρέπει όλα όσα ακολουθούν.",
        ],
      },
    },
  ],
  terms: {
    en: [
      { term: "Worm", def: "Self-contained malware that spreads across networks without user action." },
      { term: "Trojan", def: "Malware disguised as legitimate software that does not self-replicate." },
      { term: "Fileless malware", def: "Malicious code that runs from memory or system tools without dropping executables on disk." },
      { term: "Rootkit", def: "Malware that hides its presence by intercepting the operating system's own reporting." },
      { term: "Loader", def: "Malware stage that downloads and runs further modules after initial infection." },
      { term: "Double extortion", def: "Ransomware tactic combining encryption with the threat of publishing stolen data." },
    ],
    el: [
      { term: "Σκουλήκι (worm)", def: "Αυτοτελές κακόβουλο λογισμικό που διαδίδεται στα δίκτυα χωρίς ενέργεια του χρήστη." },
      { term: "Δούρειος ίππος", def: "Κακόβουλο λογισμικό μεταμφιεσμένο σε νόμιμο, το οποίο δεν αυτοαναπαράγεται." },
      { term: "Κακόβουλο λογισμικό χωρίς αρχεία", def: "Κακόβουλος κώδικας που εκτελείται από τη μνήμη ή μέσω εργαλείων του συστήματος χωρίς να γράφει εκτελέσιμα στον δίσκο." },
      { term: "Rootkit", def: "Κακόβουλο λογισμικό που κρύβει την παρουσία του παρεμβαίνοντας στις αναφορές του ίδιου του λειτουργικού συστήματος." },
      { term: "Loader", def: "Στάδιο κακόβουλου λογισμικού που κατεβάζει και εκτελεί πρόσθετες μονάδες μετά την αρχική μόλυνση." },
      { term: "Διπλός εκβιασμός", def: "Τακτική λυτρισμικού που συνδυάζει την κρυπτογράφηση με την απειλή δημοσιοποίησης κλεμμένων δεδομένων." },
    ],
  },
  summary: {
    en: [
      "Malware is best classified by mechanism—replication, propagation and payload—because each mechanism calls for a different containment strategy.",
      "Fileless techniques, polymorphism and rootkits defeat file signatures and require behavioural and out-of-band detection.",
      "Indicators of compromise gain meaning through correlation; a single anomaly is only a lead.",
      "Modern intrusions are staged chains of droppers, loaders, RATs and final payloads such as ransomware or wipers.",
      "Stuxnet, WannaCry and Emotet illustrate the limits of isolation, the cost of slow patching and the supply-chain nature of cybercrime.",
    ],
    el: [
      "Το κακόβουλο λογισμικό ταξινομείται καλύτερα με βάση τον μηχανισμό —αναπαραγωγή, διάδοση και ωφέλιμο φορτίο— επειδή κάθε μηχανισμός απαιτεί διαφορετική στρατηγική περιορισμού.",
      "Οι τεχνικές χωρίς αρχεία, ο πολυμορφισμός και τα rootkits παρακάμπτουν τις υπογραφές αρχείων και απαιτούν ανίχνευση συμπεριφοράς και ανίχνευση εκτός του παραβιασμένου συστήματος.",
      "Οι ενδείξεις παραβίασης αποκτούν νόημα μέσω της συσχέτισης· μια μεμονωμένη ανωμαλία είναι απλώς ένα στοιχείο προς διερεύνηση.",
      "Οι σύγχρονες εισβολές είναι σταδιακές αλυσίδες από droppers, loaders, RAT και τελικά φορτία, όπως λυτρισμικό ή wipers.",
      "Τα Stuxnet, WannaCry και Emotet αναδεικνύουν τα όρια της απομόνωσης, το κόστος της καθυστερημένης ενημέρωσης και τον χαρακτήρα εφοδιαστικής αλυσίδας του κυβερνοεγκλήματος.",
    ],
  },
  questions: {
    en: [
      "Why does the containment strategy for a worm differ from that for a trojan? Give one concrete measure for each.",
      "Explain why process hollowing defeats hash-based application allow-listing.",
      "List three host indicators and two network indicators that, together, would convince you that a workstation is compromised.",
      "Why is it dangerous to treat a wiper as if it were ransomware?",
    ],
    el: [
      "Γιατί η στρατηγική περιορισμού ενός σκουληκιού διαφέρει από εκείνη ενός δούρειου ίππου; Δώστε ένα συγκεκριμένο μέτρο για καθένα.",
      "Εξηγήστε γιατί η εκκένωση διεργασίας (process hollowing) παρακάμπτει τις λίστες επιτρεπόμενων εφαρμογών που βασίζονται σε τιμές κατακερματισμού.",
      "Αναφέρετε τρεις ενδείξεις σε υπολογιστή και δύο δικτυακές ενδείξεις που, συνδυαστικά, θα σας έπειθαν ότι ένας σταθμός εργασίας έχει παραβιαστεί.",
      "Γιατί είναι επικίνδυνο να αντιμετωπιστεί ένας wiper σαν να ήταν λυτρισμικό;",
    ],
  },
};

export default ch04;

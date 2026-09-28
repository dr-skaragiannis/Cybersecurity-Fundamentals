import type { Chapter } from "../types";

const ch12: Chapter = {
  n: 12,
  part: 4,
  title: { en: "Malware Analysis, Digital Forensics and OSINT Reconnaissance", el: "Ανάλυση Κακόβουλου Λογισμικού, Ψηφιακή Εγκληματολογία και Αναγνώριση μέσω OSINT" },
  subtitle: {
    en: "Static triage · Dynamic and behavioural analysis · Passive and active reconnaissance · DNS enumeration · OSINT ethics · Order of volatility · Timelines and carving",
    el: "Στατική αρχική αξιολόγηση · Δυναμική ανάλυση και ανάλυση συμπεριφοράς · Παθητική και ενεργητική αναγνώριση · Απαρίθμηση DNS · Δεοντολογία OSINT · Σειρά πτητικότητας · Χρονολόγια και ανάκτηση δεδομένων",
  },
  level: { en: "Advanced · Investigation", el: "Προχωρημένο επίπεδο · Διερεύνηση" },
  hours: "10–12",
  intro: {
    en: [
      "When an incident occurs, three investigative questions arise. What does the malicious code do? What can the organisation's exposure reveal to an adversary? And what exactly happened on the affected systems? This chapter introduces the disciplines that answer them: malware analysis, open-source intelligence (OSINT) reconnaissance and digital forensics.",
      "The three disciplines share a common ethic. Analysts work in controlled environments, collect information lawfully and handle evidence in a way that preserves its integrity and admissibility. The chapter moves from static and dynamic analysis of a suspicious file, through the mapping of an organisation's external attack surface, to the principles of forensic acquisition and the reconstruction of events from filesystem artefacts.",
    ],
    el: [
      "Όταν σημειώνεται ένα περιστατικό, προκύπτουν τρία ερευνητικά ερωτήματα. Τι κάνει ο κακόβουλος κώδικας; Τι μπορεί να αποκαλύψει σε έναν αντίπαλο η έκθεση του οργανισμού; Και τι ακριβώς συνέβη στα επηρεαζόμενα συστήματα; Το κεφάλαιο εισάγει τους κλάδους που απαντούν σε αυτά: την ανάλυση κακόβουλου λογισμικού, την αναγνώριση μέσω πληροφοριών ανοιχτών πηγών (OSINT) και την ψηφιακή εγκληματολογία.",
      "Οι τρεις κλάδοι μοιράζονται μια κοινή δεοντολογία. Οι αναλυτές εργάζονται σε ελεγχόμενα περιβάλλοντα, συλλέγουν πληροφορίες νόμιμα και χειρίζονται τα αποδεικτικά στοιχεία με τρόπο που διαφυλάσσει την ακεραιότητα και το παραδεκτό τους. Το κεφάλαιο κινείται από τη στατική και δυναμική ανάλυση ενός ύποπτου αρχείου, στη χαρτογράφηση της εξωτερικής επιφάνειας επίθεσης ενός οργανισμού και, τέλος, στις αρχές της εγκληματολογικής απόκτησης δεδομένων και στην ανασύνθεση των γεγονότων από τα ίχνη του συστήματος αρχείων.",
    ],
  },
  outcomes: {
    en: [
      "Perform static triage of a suspicious file using hashes, headers, entropy and strings.",
      "Design a safe dynamic analysis and interpret behavioural artefacts.",
      "Distinguish passive from active reconnaissance and map an organisation's attack surface through DNS and search-engine techniques.",
      "Apply legal, ethical and operational-security rules to OSINT work.",
      "Apply the order of volatility and chain of custody, and build a timeline from filesystem artefacts.",
    ],
    el: [
      "Να πραγματοποιείτε στατική αρχική αξιολόγηση ενός ύποπτου αρχείου με συνόψεις, κεφαλίδες, εντροπία και συμβολοσειρές.",
      "Να σχεδιάζετε μια ασφαλή δυναμική ανάλυση και να ερμηνεύετε τα ίχνη συμπεριφοράς.",
      "Να διακρίνετε την παθητική από την ενεργητική αναγνώριση και να χαρτογραφείτε την επιφάνεια επίθεσης ενός οργανισμού μέσω τεχνικών DNS και μηχανών αναζήτησης.",
      "Να εφαρμόζετε νομικούς, δεοντολογικούς κανόνες και κανόνες επιχειρησιακής ασφάλειας στην εργασία OSINT.",
      "Να εφαρμόζετε τη σειρά πτητικότητας και την αλυσίδα επιμέλειας και να κατασκευάζετε χρονολόγιο από τα ίχνη του συστήματος αρχείων.",
    ],
  },
  sections: [
    {
      id: "12.1",
      title: { en: "Static triage: hashes, headers, entropy, strings and packers", el: "Στατική αρχική αξιολόγηση: συνόψεις, κεφαλίδες, εντροπία, συμβολοσειρές και packers" },
      body: {
        en: [
          "**Static analysis** examines a file without executing it and is always the first, safest step. The analyst begins by computing **cryptographic hashes** (SHA-256) to identify the sample uniquely and to check threat-intelligence databases for previous reports. Next, the file **header** reveals its true type regardless of its extension: Windows executables begin with the bytes `MZ`, and their *Portable Executable (PE)* structure lists compilation timestamps, sections and imported functions. Imports such as `VirtualAllocEx` and `CreateRemoteThread` hint at process injection; `CryptEncrypt` together with file-enumeration functions may suggest ransomware.",
          "**Entropy** measures randomness on a scale from 0 to 8 bits per byte. Ordinary code has moderate entropy, whereas sections with entropy close to 8 are likely compressed or encrypted—a typical sign of a **packer**, a tool that wraps the real payload so that it is revealed only in memory. Extracting readable **strings** can expose URLs, IP addresses, registry paths or error messages, although malware authors often obfuscate them. When deeper understanding is needed, **disassemblers and decompilers** such as Ghidra or IDA translate machine code into assembly or pseudo-C, allowing the analyst to follow the program's logic.",
        ],
        el: [
          "Η **στατική ανάλυση** εξετάζει ένα αρχείο χωρίς να το εκτελεί και αποτελεί πάντοτε το πρώτο και ασφαλέστερο βήμα. Ο αναλυτής ξεκινά υπολογίζοντας **κρυπτογραφικές συνόψεις** (SHA-256), ώστε να ταυτοποιήσει μοναδικά το δείγμα και να αναζητήσει προηγούμενες αναφορές σε βάσεις πληροφοριών απειλών. Στη συνέχεια, η **κεφαλίδα** του αρχείου αποκαλύπτει τον πραγματικό του τύπο ανεξάρτητα από την επέκταση: τα εκτελέσιμα των Windows ξεκινούν με τα bytes `MZ` και η δομή τους *Portable Executable (PE)* περιλαμβάνει χρονοσφραγίδες μεταγλώττισης, ενότητες και εισαγόμενες συναρτήσεις. Εισαγωγές όπως οι `VirtualAllocEx` και `CreateRemoteThread` υποδηλώνουν έγχυση σε διεργασίες· η `CryptEncrypt` μαζί με συναρτήσεις απαρίθμησης αρχείων μπορεί να παραπέμπει σε λυτρισμικό.",
          "Η **εντροπία** μετρά την τυχαιότητα σε κλίμακα από 0 έως 8 bit ανά byte. Ο συνηθισμένος κώδικας έχει μέτρια εντροπία, ενώ ενότητες με εντροπία κοντά στο 8 είναι πιθανότατα συμπιεσμένες ή κρυπτογραφημένες —τυπική ένδειξη ενός **packer**, δηλαδή ενός εργαλείου που περιτυλίγει το πραγματικό φορτίο ώστε αυτό να αποκαλύπτεται μόνο στη μνήμη. Η εξαγωγή αναγνώσιμων **συμβολοσειρών** μπορεί να αποκαλύψει URL, διευθύνσεις IP, διαδρομές μητρώου ή μηνύματα σφάλματος, αν και οι δημιουργοί κακόβουλου λογισμικού συχνά τις συσκοτίζουν. Όταν απαιτείται βαθύτερη κατανόηση, οι **αποσυμβολομεταφραστές και αποσυμπιλητές** (disassemblers, decompilers), όπως τα Ghidra ή IDA, μεταφράζουν τον κώδικα μηχανής σε συμβολική γλώσσα ή ψευδο-C, επιτρέποντας στον αναλυτή να παρακολουθήσει τη λογική του προγράμματος.",
        ],
      },
    },
    {
      id: "12.2",
      title: { en: "Dynamic and behavioural analysis", el: "Δυναμική ανάλυση και ανάλυση συμπεριφοράς" },
      body: {
        en: [
          "**Dynamic analysis** executes the sample in the isolated laboratory described in Chapter 11 and observes what it does. Automated **sandboxes** such as CAPE or commercial equivalents run the file, record its activity and produce a report within minutes. Manual analysis gives more control: the analyst takes a snapshot, starts monitoring tools, executes the sample, interacts with it if necessary and then compares the system state before and after execution.",
          "**Behavioural auditing** focuses on the traces the sample leaves. On the filesystem, analysts look for dropped files and modified documents; in the registry, for new *Run* keys or services; in the process tree, for child processes and injection into legitimate processes; and on the network, for DNS queries and connections to command-and-control servers. Tools such as Process Monitor, Process Explorer, Regshot and Wireshark capture these events, while API monitoring reveals which system functions the malware calls. Analysts must remember that sophisticated malware may detect the sandbox—by checking for virtual hardware, short uptimes or the absence of user activity—and remain dormant, so a 'clean' sandbox report is never proof of innocence.",
        ],
        el: [
          "Η **δυναμική ανάλυση** εκτελεί το δείγμα στο απομονωμένο εργαστήριο που περιγράφηκε στο Κεφάλαιο 11 και παρατηρεί τι κάνει. Αυτοματοποιημένα **περιβάλλοντα απομονωμένης εκτέλεσης** (sandboxes), όπως το CAPE ή αντίστοιχα εμπορικά, εκτελούν το αρχείο, καταγράφουν τη δραστηριότητά του και παράγουν αναφορά μέσα σε λίγα λεπτά. Η χειροκίνητη ανάλυση προσφέρει περισσότερο έλεγχο: ο αναλυτής λαμβάνει στιγμιότυπο, ενεργοποιεί εργαλεία παρακολούθησης, εκτελεί το δείγμα, αλληλεπιδρά μαζί του αν χρειάζεται και στη συνέχεια συγκρίνει την κατάσταση του συστήματος πριν και μετά την εκτέλεση.",
          "Ο **έλεγχος συμπεριφοράς** εστιάζει στα ίχνη που αφήνει το δείγμα. Στο σύστημα αρχείων, οι αναλυτές αναζητούν αρχεία που δημιουργήθηκαν και έγγραφα που τροποποιήθηκαν· στο μητρώο, νέα κλειδιά *Run* ή υπηρεσίες· στο δέντρο διεργασιών, θυγατρικές διεργασίες και έγχυση σε νόμιμες διεργασίες· και στο δίκτυο, ερωτήματα DNS και συνδέσεις με διακομιστές διοίκησης και ελέγχου. Εργαλεία όπως τα Process Monitor, Process Explorer, Regshot και Wireshark καταγράφουν αυτά τα συμβάντα, ενώ η παρακολούθηση κλήσεων API αποκαλύπτει ποιες λειτουργίες του συστήματος καλεί το κακόβουλο λογισμικό. Οι αναλυτές πρέπει να θυμούνται ότι ένα εξελιγμένο κακόβουλο πρόγραμμα μπορεί να αναγνωρίσει το sandbox —ελέγχοντας για εικονικό υλικό, μικρό χρόνο λειτουργίας ή απουσία δραστηριότητας χρήστη— και να παραμείνει αδρανές· επομένως, μια «καθαρή» αναφορά sandbox δεν αποτελεί ποτέ απόδειξη αθωότητας.",
        ],
      },
    },
    {
      id: "12.3",
      title: { en: "Reconnaissance: passive and active techniques, dorking and DNS", el: "Αναγνώριση: παθητικές και ενεργητικές τεχνικές, dorking και DNS" },
      body: {
        en: [
          "Reconnaissance is the first phase of the Kill Chain, and defenders perform it too, in order to see their organisation as an attacker would. **Passive reconnaissance** gathers information without interacting directly with the target's systems: public websites, social media, job advertisements that reveal technologies in use, WHOIS records, certificate-transparency logs and internet-wide scan databases such as Shodan or Censys. **Active reconnaissance** interacts with the target—port scanning, banner grabbing, directory brute-forcing—and is therefore detectable and legally permissible only with authorisation.",
          "Search engines are powerful reconnaissance tools. **Google dorking** uses advanced operators such as `site:`, `filetype:` and `intitle:` to find exposed documents, login pages, configuration files or directory listings that were never meant to be public. **DNS enumeration** maps an organisation's internet presence: querying record types (A, MX, TXT, NS), discovering subdomains through certificate-transparency logs and passive-DNS databases, and testing whether misconfigured name servers allow *zone transfers* that reveal every record. Forgotten subdomains that still point to decommissioned cloud resources can even be *taken over* by an attacker—a risk that regular attack-surface reviews are designed to catch.",
        ],
        el: [
          "Η αναγνώριση είναι η πρώτη φάση του Kill Chain, και την πραγματοποιούν επίσης οι αμυνόμενοι, ώστε να βλέπουν τον οργανισμό τους όπως θα τον έβλεπε ένας επιτιθέμενος. Η **παθητική αναγνώριση** συλλέγει πληροφορίες χωρίς άμεση αλληλεπίδραση με τα συστήματα του στόχου: δημόσιους ιστοτόπους, μέσα κοινωνικής δικτύωσης, αγγελίες εργασίας που αποκαλύπτουν τις τεχνολογίες που χρησιμοποιούνται, εγγραφές WHOIS, αρχεία διαφάνειας πιστοποιητικών και βάσεις δεδομένων σαρώσεων ολόκληρου του διαδικτύου, όπως τα Shodan ή Censys. Η **ενεργητική αναγνώριση** αλληλεπιδρά με τον στόχο —σάρωση θυρών, λήψη εμβλημάτων υπηρεσιών (banner grabbing), δοκιμή καταλόγων με ωμή βία— και είναι επομένως ανιχνεύσιμη και νομικά επιτρεπτή μόνο με εξουσιοδότηση.",
          "Οι μηχανές αναζήτησης είναι ισχυρά εργαλεία αναγνώρισης. Το **Google dorking** χρησιμοποιεί προηγμένους τελεστές, όπως οι `site:`, `filetype:` και `intitle:`, για τον εντοπισμό εκτεθειμένων εγγράφων, σελίδων σύνδεσης, αρχείων ρυθμίσεων ή λιστών καταλόγων που δεν προορίζονταν ποτέ για δημόσια χρήση. Η **απαρίθμηση DNS** χαρτογραφεί την παρουσία ενός οργανισμού στο διαδίκτυο: υποβολή ερωτημάτων για τύπους εγγραφών (A, MX, TXT, NS), ανακάλυψη υποτομέων μέσω αρχείων διαφάνειας πιστοποιητικών και βάσεων παθητικού DNS, και έλεγχος αν λανθασμένα ρυθμισμένοι διακομιστές ονομάτων επιτρέπουν *μεταφορές ζώνης* που αποκαλύπτουν κάθε εγγραφή. Ξεχασμένοι υποτομείς που εξακολουθούν να παραπέμπουν σε καταργημένους πόρους νέφους μπορούν ακόμη και να *καταληφθούν* από έναν επιτιθέμενο —κίνδυνος που οι τακτικές επισκοπήσεις της επιφάνειας επίθεσης έχουν σχεδιαστεί να εντοπίζουν.",
        ],
      },
    },
    {
      id: "12.4",
      title: { en: "OSINT ethics, operational security and actionable reporting", el: "Δεοντολογία OSINT, επιχειρησιακή ασφάλεια και αξιοποιήσιμη αναφορά" },
      body: {
        en: [
          "That information is publicly accessible does not mean it may be collected and used without limits. OSINT work must respect the law—data-protection rules such as the GDPR apply to personal data even when they are public—as well as the terms of service of platforms and the agreed scope of the engagement. Analysts should collect only what is necessary for the stated purpose and never attempt to access accounts or bypass access controls, which would turn reconnaissance into intrusion.",
          "**Operational security (OPSEC)** protects the investigation itself: analysts use dedicated research environments and accounts, avoid revealing their identity or organisation to the target, and document their sources with timestamps and archived copies so that findings are reproducible. The value of reconnaissance lies in what follows. An **attack-surface report** should translate findings into prioritised, owned remediation tickets—'decommission the dangling subdomain `old-shop.example.com`', 'remove the exposed backup file'—rather than presenting an undifferentiated list of discoveries.",
        ],
        el: [
          "Το ότι μια πληροφορία είναι δημόσια προσβάσιμη δεν σημαίνει ότι μπορεί να συλλεχθεί και να χρησιμοποιηθεί χωρίς όρια. Η εργασία OSINT πρέπει να σέβεται τον νόμο —οι κανόνες προστασίας δεδομένων, όπως ο ΓΚΠΔ, εφαρμόζονται στα προσωπικά δεδομένα ακόμη κι όταν αυτά είναι δημόσια— καθώς και τους όρους χρήσης των πλατφορμών και το συμφωνημένο πεδίο της ανάθεσης. Οι αναλυτές πρέπει να συλλέγουν μόνο ό,τι είναι αναγκαίο για τον δηλωμένο σκοπό και να μην επιχειρούν ποτέ πρόσβαση σε λογαριασμούς ή παράκαμψη ελέγχων πρόσβασης, κάτι που θα μετέτρεπε την αναγνώριση σε εισβολή.",
          "Η **επιχειρησιακή ασφάλεια** (OPSEC) προστατεύει την ίδια την έρευνα: οι αναλυτές χρησιμοποιούν αποκλειστικά ερευνητικά περιβάλλοντα και λογαριασμούς, αποφεύγουν να αποκαλύψουν στον στόχο την ταυτότητα ή τον οργανισμό τους και τεκμηριώνουν τις πηγές τους με χρονοσφραγίδες και αρχειοθετημένα αντίγραφα, ώστε τα ευρήματα να είναι αναπαραγώγιμα. Η αξία της αναγνώρισης βρίσκεται σε όσα ακολουθούν. Μια **αναφορά επιφάνειας επίθεσης** πρέπει να μετατρέπει τα ευρήματα σε ιεραρχημένα δελτία αποκατάστασης με συγκεκριμένο υπεύθυνο —«κατάργηση του ορφανού υποτομέα `old-shop.example.com`», «αφαίρεση του εκτεθειμένου αρχείου αντιγράφου ασφαλείας»— αντί να παρουσιάζει έναν αδιαφοροποίητο κατάλογο ανακαλύψεων.",
        ],
      },
    },
    {
      id: "12.5",
      title: { en: "Forensic principles, the order of volatility and chain of custody", el: "Αρχές εγκληματολογικής ανάλυσης, σειρά πτητικότητας και αλυσίδα επιμέλειας" },
      body: {
        en: [
          "**Digital forensics** is the scientific collection, preservation, analysis and presentation of digital evidence in a manner that can withstand legal scrutiny. Its foundational principle, derived from Locard's exchange principle, is that every action leaves a trace—including the actions of the investigator. Evidence must therefore be acquired in a way that changes it as little as possible, and every step must be documented. Disks are copied bit by bit into forensic images using **write blockers**, and each image is verified by comparing its hash with that of the original.",
          "Because some data disappear faster than others, evidence is collected according to the **order of volatility** (RFC 3227): first CPU registers and cache, then memory (RAM), including running processes and network connections; then temporary files and swap space; then disk contents; and finally remote logs and archival media. Pulling the power cable first would destroy the most volatile—and often the most revealing—evidence. Every item is recorded in a **chain-of-custody** log stating who collected it, when, how, where it was stored and to whom it was transferred. A gap in this chain can render otherwise valid evidence inadmissible.",
        ],
        el: [
          "Η **ψηφιακή εγκληματολογία** είναι η επιστημονική συλλογή, διαφύλαξη, ανάλυση και παρουσίαση ψηφιακών αποδεικτικών στοιχείων με τρόπο που μπορεί να αντέξει τον νομικό έλεγχο. Η θεμελιώδης αρχή της, που απορρέει από την αρχή ανταλλαγής του Locard, είναι ότι κάθε ενέργεια αφήνει ίχνος —συμπεριλαμβανομένων των ενεργειών του ίδιου του ερευνητή. Τα αποδεικτικά στοιχεία πρέπει, επομένως, να αποκτώνται με τρόπο που τα μεταβάλλει όσο το δυνατόν λιγότερο, και κάθε βήμα πρέπει να τεκμηριώνεται. Οι δίσκοι αντιγράφονται bit προς bit σε εγκληματολογικά είδωλα με τη χρήση **αναστολέων εγγραφής** (write blockers), και κάθε είδωλο επαληθεύεται συγκρίνοντας τη σύνοψή του με εκείνη του πρωτοτύπου.",
          "Επειδή ορισμένα δεδομένα εξαφανίζονται ταχύτερα από άλλα, τα αποδεικτικά στοιχεία συλλέγονται σύμφωνα με τη **σειρά πτητικότητας** (RFC 3227): πρώτα οι καταχωρητές και η κρυφή μνήμη του επεξεργαστή, έπειτα η κύρια μνήμη (RAM), συμπεριλαμβανομένων των διεργασιών σε εκτέλεση και των δικτυακών συνδέσεων· στη συνέχεια τα προσωρινά αρχεία και ο χώρος εναλλαγής· έπειτα τα περιεχόμενα του δίσκου· και, τέλος, τα απομακρυσμένα αρχεία καταγραφής και τα αρχειακά μέσα. Αν αποσυνδεθεί πρώτα το καλώδιο ρεύματος, καταστρέφονται τα πιο πτητικά —και συχνά τα πιο αποκαλυπτικά— αποδεικτικά στοιχεία. Κάθε στοιχείο καταχωρίζεται σε ένα αρχείο **αλυσίδας επιμέλειας** (chain of custody), το οποίο δηλώνει ποιος το συνέλεξε, πότε, πώς, πού φυλάχθηκε και σε ποιον παραδόθηκε. Ένα κενό σε αυτή την αλυσίδα μπορεί να καταστήσει μη παραδεκτά αποδεικτικά στοιχεία που κατά τα λοιπά είναι έγκυρα.",
        ],
      },
    },
    {
      id: "12.6",
      title: { en: "Filesystem artefacts, carving and timelines", el: "Ίχνη του συστήματος αρχείων, ανάκτηση δεδομένων και χρονολόγια" },
      body: {
        en: [
          "Filesystems record far more than file contents. On Windows, the NTFS **Master File Table (MFT)** stores metadata for every file, including four timestamps—creation, modification, access and MFT-entry change—in two separate attributes, which helps investigators detect *timestomping*, the deliberate falsification of timestamps. Other valuable artefacts include the **$UsnJrnl** change journal, **Prefetch** files that prove a program was executed, **LNK** shortcut files and **Jump Lists** that reveal recently opened documents, **ShellBags** that record folder access, and the Windows event logs. Deleting a file usually removes only its directory entry, so its contents may remain on disk until the space is reused.",
          "**File carving** recovers such deleted data by searching unallocated space for known file signatures—for instance, the header and footer of a JPEG image—without relying on filesystem metadata. Finally, investigators combine timestamps from all sources into a single **super-timeline**, using tools such as Plaso or Autopsy. A timeline turns thousands of isolated artefacts into a narrative: the phishing email arrived at 09:12, the attachment was opened at 09:14, PowerShell ran at 09:14:07, a scheduled task was created at 09:15, and data were compressed and sent out at 02:30 the following night.",
        ],
        el: [
          "Τα συστήματα αρχείων καταγράφουν πολύ περισσότερα από τα περιεχόμενα των αρχείων. Στα Windows, ο **Κύριος Πίνακας Αρχείων** (Master File Table, MFT) του NTFS αποθηκεύει μεταδεδομένα για κάθε αρχείο, συμπεριλαμβανομένων τεσσάρων χρονοσφραγίδων —δημιουργίας, τροποποίησης, πρόσβασης και αλλαγής της εγγραφής MFT— σε δύο χωριστά χαρακτηριστικά, κάτι που βοηθά τους ερευνητές να εντοπίζουν το *timestomping*, δηλαδή τη σκόπιμη παραποίηση χρονοσφραγίδων. Άλλα πολύτιμα ίχνη είναι το ημερολόγιο αλλαγών **$UsnJrnl**, τα αρχεία **Prefetch** που αποδεικνύουν ότι ένα πρόγραμμα εκτελέστηκε, τα αρχεία συντομεύσεων **LNK** και οι **Jump Lists** που αποκαλύπτουν πρόσφατα ανοιγμένα έγγραφα, τα **ShellBags** που καταγράφουν την πρόσβαση σε φακέλους και τα αρχεία συμβάντων των Windows. Η διαγραφή ενός αρχείου συνήθως αφαιρεί μόνο την εγγραφή του στον κατάλογο, οπότε τα περιεχόμενά του μπορεί να παραμένουν στον δίσκο έως ότου επαναχρησιμοποιηθεί ο χώρος.",
          "Η **ανάκτηση αρχείων με βάση το περιεχόμενο** (file carving) ανακτά τέτοια διαγραμμένα δεδομένα αναζητώντας στον μη κατανεμημένο χώρο γνωστές υπογραφές αρχείων —για παράδειγμα την αρχή και το τέλος μιας εικόνας JPEG— χωρίς να βασίζεται στα μεταδεδομένα του συστήματος αρχείων. Τέλος, οι ερευνητές συνδυάζουν τις χρονοσφραγίδες όλων των πηγών σε ένα ενιαίο **υπερ-χρονολόγιο** (super-timeline), με εργαλεία όπως τα Plaso ή Autopsy. Ένα χρονολόγιο μετατρέπει χιλιάδες μεμονωμένα ίχνη σε αφήγηση: το μήνυμα ηλεκτρονικού ψαρέματος έφτασε στις 09:12, το συνημμένο άνοιξε στις 09:14, το PowerShell εκτελέστηκε στις 09:14:07, μια προγραμματισμένη εργασία δημιουργήθηκε στις 09:15 και τα δεδομένα συμπιέστηκαν και αποστάλθηκαν εκτός οργανισμού στις 02:30 της επόμενης νύχτας.",
        ],
      },
    },
  ],
  terms: {
    en: [
      { term: "Entropy", def: "A measure of randomness; high values suggest compressed or encrypted (packed) content." },
      { term: "Sandbox", def: "An isolated environment that executes samples and records their behaviour." },
      { term: "Passive reconnaissance", def: "Information gathering without direct interaction with the target's systems." },
      { term: "Order of volatility", def: "Collecting evidence from the most to the least short-lived source." },
      { term: "Chain of custody", def: "A documented record of who handled evidence, when and how." },
      { term: "Super-timeline", def: "A unified chronology of events built from many artefact sources." },
    ],
    el: [
      { term: "Εντροπία", def: "Μέτρο τυχαιότητας· υψηλές τιμές υποδηλώνουν συμπιεσμένο ή κρυπτογραφημένο (packed) περιεχόμενο." },
      { term: "Sandbox", def: "Απομονωμένο περιβάλλον που εκτελεί δείγματα και καταγράφει τη συμπεριφορά τους." },
      { term: "Παθητική αναγνώριση", def: "Συλλογή πληροφοριών χωρίς άμεση αλληλεπίδραση με τα συστήματα του στόχου." },
      { term: "Σειρά πτητικότητας", def: "Συλλογή αποδεικτικών στοιχείων από την πιο βραχύβια προς την πιο μόνιμη πηγή." },
      { term: "Αλυσίδα επιμέλειας", def: "Τεκμηριωμένο αρχείο του ποιος χειρίστηκε τα αποδεικτικά στοιχεία, πότε και πώς." },
      { term: "Υπερ-χρονολόγιο", def: "Ενιαία χρονολογική αλληλουχία γεγονότων που κατασκευάζεται από πολλές πηγές ιχνών." },
    ],
  },
  summary: {
    en: [
      "Static triage—hashes, headers, imports, entropy and strings—is the safe first step and guides deeper analysis.",
      "Dynamic analysis reveals behaviour, but evasive malware means that a clean sandbox result proves nothing.",
      "Passive reconnaissance, dorking and DNS enumeration let defenders see their exposure as attackers do.",
      "OSINT must be lawful, proportionate and OPSEC-aware, and its results must become owned remediation actions.",
      "Forensics follows the order of volatility and chain of custody, and timelines turn artefacts into a reliable narrative.",
    ],
    el: [
      "Η στατική αρχική αξιολόγηση —συνόψεις, κεφαλίδες, εισαγόμενες συναρτήσεις, εντροπία και συμβολοσειρές— είναι το ασφαλές πρώτο βήμα και καθοδηγεί τη βαθύτερη ανάλυση.",
      "Η δυναμική ανάλυση αποκαλύπτει τη συμπεριφορά, όμως το κακόβουλο λογισμικό με τεχνικές αποφυγής σημαίνει ότι ένα «καθαρό» αποτέλεσμα sandbox δεν αποδεικνύει τίποτα.",
      "Η παθητική αναγνώριση, το dorking και η απαρίθμηση DNS επιτρέπουν στους αμυνόμενους να βλέπουν την έκθεσή τους όπως οι επιτιθέμενοι.",
      "Η εργασία OSINT πρέπει να είναι νόμιμη, αναλογική και να λαμβάνει υπόψη την επιχειρησιακή ασφάλεια, ενώ τα αποτελέσματά της πρέπει να μετατρέπονται σε ενέργειες αποκατάστασης με συγκεκριμένο υπεύθυνο.",
      "Η εγκληματολογική ανάλυση ακολουθεί τη σειρά πτητικότητας και την αλυσίδα επιμέλειας, ενώ τα χρονολόγια μετατρέπουν τα ίχνη σε αξιόπιστη αφήγηση.",
    ],
  },
  questions: {
    en: [
      "A PE file has a section with entropy 7.9 and very few imports. What do you conclude, and what is your next step?",
      "Why is a 'no malicious activity' sandbox verdict insufficient to clear a suspicious file?",
      "Classify the following as passive or active: certificate-transparency search, Nmap scan, Shodan lookup, zone-transfer attempt.",
      "Why should memory be captured before a disk image during live response?",
    ],
    el: [
      "Ένα αρχείο PE έχει μια ενότητα με εντροπία 7,9 και ελάχιστες εισαγόμενες συναρτήσεις. Τι συμπεραίνετε και ποιο είναι το επόμενο βήμα σας;",
      "Γιατί ένα αποτέλεσμα sandbox «καμία κακόβουλη δραστηριότητα» δεν επαρκεί για να θεωρηθεί ασφαλές ένα ύποπτο αρχείο;",
      "Κατατάξτε ως παθητικές ή ενεργητικές τις εξής ενέργειες: αναζήτηση σε αρχεία διαφάνειας πιστοποιητικών, σάρωση με Nmap, αναζήτηση στο Shodan, απόπειρα μεταφοράς ζώνης.",
      "Γιατί πρέπει να συλλέγεται η μνήμη πριν από το είδωλο του δίσκου κατά την απόκριση σε σύστημα σε λειτουργία;",
    ],
  },
};

export default ch12;

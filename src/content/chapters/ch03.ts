import type { Chapter } from "../types";

const ch03: Chapter = {
  n: 3,
  part: 2,
  title: { en: "Threat Actors, Motivations and Attack Lifecycle Models", el: "Δράστες Απειλών, Κίνητρα και Μοντέλα Κύκλου Ζωής Επιθέσεων" },
  subtitle: {
    en: "Actor taxonomy · The hacker spectrum · Cyber Kill Chain · MITRE ATT&CK · Diamond Model and D3FEND · Threat intelligence and sharing",
    el: "Ταξινόμηση δραστών · Το φάσμα των χάκερ · Cyber Kill Chain · MITRE ATT&CK · Μοντέλο Διαμαντιού και D3FEND · Πληροφορίες απειλών και ανταλλαγή τους",
  },
  level: { en: "Beginner–Intermediate · Adversary thinking", el: "Εισαγωγικό–Μεσαίο επίπεδο · Σκέψη του αντιπάλου" },
  hours: "6–8",
  intro: {
    en: [
      "Defences are only meaningful in relation to the adversaries they are meant to stop. A small business and a national energy operator face very different opponents, with different goals, resources and patience. This chapter therefore shifts the perspective from the system to the attacker.",
      "We begin by classifying threat actors according to motivation and capability, and by clarifying the ethical and legal distinctions behind the familiar 'hat' terminology. We then study three complementary models that describe how attacks unfold: the Lockheed Martin Cyber Kill Chain, the MITRE ATT&CK knowledge base and the Diamond Model of intrusion analysis. The chapter concludes with cyber threat intelligence—how knowledge about adversaries is produced, evaluated and shared responsibly.",
    ],
    el: [
      "Οι άμυνες αποκτούν νόημα μόνο σε σχέση με τους αντιπάλους που καλούνται να σταματήσουν. Μια μικρή επιχείρηση και ένας εθνικός πάροχος ενέργειας αντιμετωπίζουν πολύ διαφορετικούς αντιπάλους, με διαφορετικούς στόχους, πόρους και υπομονή. Για τον λόγο αυτό, το κεφάλαιο μετατοπίζει την οπτική από το σύστημα στον επιτιθέμενο.",
      "Αρχικά ταξινομούμε τους δράστες απειλών με βάση το κίνητρο και τις ικανότητές τους και αποσαφηνίζουμε τις ηθικές και νομικές διακρίσεις πίσω από τη γνωστή ορολογία των «καπέλων». Στη συνέχεια μελετάμε τρία συμπληρωματικά μοντέλα που περιγράφουν την εξέλιξη μιας επίθεσης: το Cyber Kill Chain της Lockheed Martin, τη βάση γνώσης MITRE ATT&CK και το Μοντέλο Διαμαντιού για την ανάλυση εισβολών. Το κεφάλαιο ολοκληρώνεται με τις πληροφορίες κυβερνοαπειλών (Cyber Threat Intelligence) —πώς παράγεται, αξιολογείται και ανταλλάσσεται υπεύθυνα η γνώση για τους αντιπάλους.",
    ],
  },
  outcomes: {
    en: [
      "Classify threat actors by motivation, capability and persistence, and relate them to appropriate defences.",
      "Distinguish white-, grey- and black-hat activity on the basis of authorisation and intent.",
      "Map an attack to the phases of the Cyber Kill Chain and to ATT&CK tactics and techniques.",
      "Use the Diamond Model to structure the analysis of an intrusion.",
      "Describe the intelligence lifecycle and apply the Traffic Light Protocol when sharing information.",
    ],
    el: [
      "Να ταξινομείτε τους δράστες απειλών με βάση το κίνητρο, τις ικανότητες και την επιμονή τους και να τους συσχετίζετε με κατάλληλες άμυνες.",
      "Να διακρίνετε τη δραστηριότητα white-, grey- και black-hat με κριτήριο την εξουσιοδότηση και την πρόθεση.",
      "Να αντιστοιχίζετε μια επίθεση στις φάσεις του Cyber Kill Chain και στις τακτικές και τεχνικές του ATT&CK.",
      "Να χρησιμοποιείτε το Μοντέλο Διαμαντιού για τη δομημένη ανάλυση μιας εισβολής.",
      "Να περιγράφετε τον κύκλο ζωής των πληροφοριών απειλών και να εφαρμόζετε το Πρωτόκολλο Φωτεινού Σηματοδότη (TLP) κατά την ανταλλαγή τους.",
    ],
  },
  sections: [
    {
      id: "3.1",
      title: { en: "A taxonomy of threat actors", el: "Ταξινόμηση των δραστών απειλών" },
      body: {
        en: [
          "Threat actors are usefully grouped by what they want and what they can do. **Nation-state groups**, often called *advanced persistent threats (APTs)*, pursue espionage, sabotage or influence; they can afford zero-day exploits and supply-chain operations and may remain inside a network for months or years. **Cybercriminals** are motivated by profit; the ransomware-as-a-service economy has given even moderately skilled affiliates access to professional tooling. **Hacktivists** seek publicity for a political or social cause, typically through denial-of-service attacks, website defacement or leaks.",
          "**Insiders** deserve special attention because they already hold legitimate access and therefore defeat perimeter-based assumptions. A *malicious* insider may steal data or sabotage systems out of greed or grievance, whereas a *negligent* insider causes harm unintentionally, for instance through misconfiguration or by falling for a phishing email. Understanding which actors are relevant allows an organisation to select controls in proportion to the real risk rather than to the most sensational headlines.",
          {
            t: "table",
            caption: "Table 3.1 — Threat actor profiles",
            head: ["Actor", "Motivation", "Capability", "Typical dwell time", "Characteristic techniques"],
            rows: [
              ["Nation-state APT", "Espionage, sabotage, influence", "Very high", "Months to years", "Spear-phishing, living-off-the-land, covert command and control"],
              ["Cybercriminal", "Financial gain", "Medium to high", "Days to weeks", "Phishing, ransomware, data theft for extortion"],
              ["Hacktivist", "Ideology, publicity", "Low to medium", "Hours to days", "DDoS, defacement, doxing"],
              ["Malicious insider", "Gain, grievance", "Medium (authorised access)", "Variable", "Privilege abuse, data exfiltration"],
              ["Negligent insider", "None (error)", "Low (unwitting)", "—", "Misconfiguration, password reuse"],
            ],
          },
        ],
        el: [
          "Οι δράστες απειλών ομαδοποιούνται χρήσιμα με βάση το τι επιδιώκουν και τι μπορούν να κάνουν. Οι **κρατικά υποστηριζόμενες ομάδες**, γνωστές και ως *προηγμένες επίμονες απειλές* (Advanced Persistent Threats, APT), επιδιώκουν κατασκοπεία, δολιοφθορά ή επηρεασμό· διαθέτουν τους πόρους για εκμεταλλεύσεις μηδενικής ημέρας (zero-day) και για επιχειρήσεις μέσω της εφοδιαστικής αλυσίδας και μπορούν να παραμένουν σε ένα δίκτυο για μήνες ή χρόνια. Οι **κυβερνοεγκληματίες** έχουν οικονομικά κίνητρα· η οικονομία του λυτρισμικού ως υπηρεσίας (Ransomware-as-a-Service) έχει δώσει ακόμη και σε συνεργάτες μέτριας δεξιότητας πρόσβαση σε επαγγελματικά εργαλεία. Οι **χακτιβιστές** επιδιώκουν δημοσιότητα για έναν πολιτικό ή κοινωνικό σκοπό, συνήθως μέσω επιθέσεων άρνησης υπηρεσίας, αλλοίωσης ιστοτόπων ή διαρροών.",
          "Οι **εσωτερικοί δράστες** χρειάζονται ιδιαίτερη προσοχή, διότι διαθέτουν ήδη νόμιμη πρόσβαση και, επομένως, ακυρώνουν τις παραδοχές που βασίζονται στην περίμετρο. Ένας *κακόβουλος* εσωτερικός δράστης μπορεί να υποκλέψει δεδομένα ή να δολιοφθείρει συστήματα από απληστία ή μνησικακία, ενώ ένας *αμελής* προκαλεί ζημιά ακούσια, για παράδειγμα μέσω λανθασμένης ρύθμισης ή επειδή ενέδωσε σε ένα μήνυμα ηλεκτρονικού ψαρέματος. Η κατανόηση των δραστών που αφορούν πραγματικά έναν οργανισμό τού επιτρέπει να επιλέγει μέτρα ανάλογα με τον πραγματικό κίνδυνο και όχι με τους πιο εντυπωσιακούς τίτλους ειδήσεων.",
          {
            t: "table",
            caption: "Πίνακας 3.1 — Προφίλ δραστών απειλών",
            head: ["Δράστης", "Κίνητρο", "Ικανότητα", "Τυπική διάρκεια παραμονής", "Χαρακτηριστικές τεχνικές"],
            rows: [
              ["Κρατική ομάδα APT", "Κατασκοπεία, δολιοφθορά, επηρεασμός", "Πολύ υψηλή", "Μήνες έως χρόνια", "Στοχευμένο ψάρεμα, χρήση νόμιμων εργαλείων του συστήματος, κρυφή διοίκηση και έλεγχος"],
              ["Κυβερνοεγκληματίας", "Οικονομικό όφελος", "Μέτρια έως υψηλή", "Ημέρες έως εβδομάδες", "Ψάρεμα, λυτρισμικό, κλοπή δεδομένων για εκβιασμό"],
              ["Χακτιβιστής", "Ιδεολογία, δημοσιότητα", "Χαμηλή έως μέτρια", "Ώρες έως ημέρες", "DDoS, αλλοίωση ιστοτόπων, δημοσιοποίηση προσωπικών στοιχείων"],
              ["Κακόβουλος εσωτερικός", "Όφελος, μνησικακία", "Μέτρια (εξουσιοδοτημένη πρόσβαση)", "Μεταβλητή", "Κατάχρηση προνομίων, διαρροή δεδομένων"],
              ["Αμελής εσωτερικός", "Κανένα (σφάλμα)", "Χαμηλή (ακούσια)", "—", "Λανθασμένες ρυθμίσεις, επαναχρησιμοποίηση κωδικών"],
            ],
          },
        ],
      },
    },
    {
      id: "3.2",
      title: { en: "The hacker spectrum: ethics and legality", el: "Το φάσμα των χάκερ: ηθική και νομιμότητα" },
      body: {
        en: [
          "The popular 'hat' vocabulary classifies **authorisation and intent**, not technical skill. A **white-hat** (ethical) hacker tests systems only with explicit, written permission and within an agreed scope, reporting findings so that they can be fixed. A **black-hat** hacker acts without authorisation and with malicious or self-serving intent. Between them lies the **grey-hat**, who may act without permission but without clear malice—for example, by scanning a company's website and then informing it of a vulnerability.",
          "Students should understand that good intentions do not create legal authorisation. In most jurisdictions, including those implementing the EU Directive on attacks against information systems, accessing a system without permission is a criminal offence even if no damage occurs. This is why professional penetration testing (Chapter 10) always begins with a signed scope and rules of engagement, and why coordinated vulnerability disclosure programmes and bug bounties exist: they convert grey-hat curiosity into authorised, protected research.",
        ],
        el: [
          "Η δημοφιλής ορολογία των «καπέλων» ταξινομεί την **εξουσιοδότηση και την πρόθεση**, όχι την τεχνική δεξιότητα. Ένας **white-hat** (ηθικός) χάκερ ελέγχει συστήματα μόνο με ρητή, γραπτή άδεια και εντός συμφωνημένου πεδίου, αναφέροντας τα ευρήματα ώστε να διορθωθούν. Ένας **black-hat** χάκερ ενεργεί χωρίς εξουσιοδότηση και με κακόβουλη ή ιδιοτελή πρόθεση. Ανάμεσά τους βρίσκεται ο **grey-hat**, ο οποίος μπορεί να ενεργεί χωρίς άδεια αλλά χωρίς σαφή κακοβουλία —για παράδειγμα, σαρώνει τον ιστότοπο μιας εταιρείας και στη συνέχεια την ενημερώνει για μια ευπάθεια.",
          "Οι φοιτητές πρέπει να κατανοήσουν ότι οι καλές προθέσεις δεν δημιουργούν νομική εξουσιοδότηση. Στις περισσότερες έννομες τάξεις, συμπεριλαμβανομένων εκείνων που ενσωματώνουν την Οδηγία της ΕΕ για τις επιθέσεις κατά συστημάτων πληροφοριών, η πρόσβαση σε σύστημα χωρίς άδεια αποτελεί ποινικό αδίκημα ακόμη κι αν δεν προκληθεί ζημιά. Γι' αυτό η επαγγελματική δοκιμή διείσδυσης (Κεφάλαιο 10) ξεκινά πάντοτε με υπογεγραμμένο πεδίο εφαρμογής και κανόνες εμπλοκής, και γι' αυτό υπάρχουν τα προγράμματα συντονισμένης γνωστοποίησης ευπαθειών και τα προγράμματα επιβράβευσης (bug bounties): μετατρέπουν την περιέργεια του grey-hat σε εξουσιοδοτημένη και νομικά προστατευμένη έρευνα.",
        ],
      },
    },
    {
      id: "3.3",
      title: { en: "The Lockheed Martin Cyber Kill Chain", el: "Το Cyber Kill Chain της Lockheed Martin" },
      body: {
        en: [
          "The **Cyber Kill Chain**, published by Lockheed Martin in 2011, describes a targeted intrusion as seven consecutive phases: **reconnaissance** (gathering information about the target), **weaponisation** (pairing an exploit with a payload), **delivery** (for example, an email attachment), **exploitation** (triggering the vulnerability), **installation** (establishing persistence), **command and control** (opening a remote channel) and **actions on objectives** (data theft, encryption, sabotage).",
          "The model's key insight is defensive: because the attacker must succeed at *every* phase, the defender needs to break the chain only *once*. Early interruption is cheaper—blocking a malicious attachment during delivery avoids an expensive incident response later. The model has limitations, however. It was designed around malware-based intrusions entering from outside, and it describes insider threats, credential abuse and cloud attacks less well. For that reason it is usually combined with the more granular ATT&CK framework.",
        ],
        el: [
          "Το **Cyber Kill Chain**, που δημοσίευσε η Lockheed Martin το 2011, περιγράφει μια στοχευμένη εισβολή ως επτά διαδοχικές φάσεις: **αναγνώριση** (συλλογή πληροφοριών για τον στόχο), **οπλοποίηση** (σύζευξη μιας εκμετάλλευσης με ένα ωφέλιμο φορτίο), **παράδοση** (για παράδειγμα, ένα συνημμένο ηλεκτρονικού ταχυδρομείου), **εκμετάλλευση** (ενεργοποίηση της ευπάθειας), **εγκατάσταση** (εδραίωση μόνιμης παρουσίας), **διοίκηση και έλεγχος** (δημιουργία απομακρυσμένου καναλιού) και **ενέργειες επί των στόχων** (κλοπή δεδομένων, κρυπτογράφηση, δολιοφθορά).",
          "Η βασική ιδέα του μοντέλου είναι αμυντική: επειδή ο επιτιθέμενος πρέπει να επιτύχει σε *κάθε* φάση, ο αμυνόμενος αρκεί να σπάσει την αλυσίδα *μία* φορά. Η έγκαιρη διακοπή είναι φθηνότερη —ο αποκλεισμός ενός κακόβουλου συνημμένου στη φάση της παράδοσης αποτρέπει μια δαπανηρή απόκριση σε περιστατικό αργότερα. Το μοντέλο έχει όμως περιορισμούς. Σχεδιάστηκε με βάση εισβολές με κακόβουλο λογισμικό που προέρχονται από το εξωτερικό και περιγράφει λιγότερο ικανοποιητικά τις εσωτερικές απειλές, την κατάχρηση διαπιστευτηρίων και τις επιθέσεις στο νέφος. Για τον λόγο αυτό συνδυάζεται συνήθως με το λεπτομερέστερο πλαίσιο ATT&CK.",
        ],
      },
    },
    {
      id: "3.4",
      title: { en: "MITRE ATT&CK: tactics, techniques and procedures", el: "MITRE ATT&CK: τακτικές, τεχνικές και διαδικασίες" },
      body: {
        en: [
          "**MITRE ATT&CK** is a publicly available knowledge base of adversary behaviour, built from observations of real intrusions. It is organised as a matrix. The columns are **tactics**—the attacker's short-term goals, such as *Initial Access*, *Execution*, *Persistence*, *Privilege Escalation*, *Defense Evasion*, *Credential Access*, *Lateral Movement* and *Exfiltration*. Each column contains **techniques** that describe *how* the goal is achieved; for example, T1059.001 denotes command execution through PowerShell. **Procedures** are the concrete ways a specific group has used a technique.",
          "ATT&CK gives defenders a common language. A security team can map its detection rules to techniques and immediately see where coverage is missing; a threat-intelligence report can state which techniques a group uses; and a red team can emulate those techniques to test whether the defences actually work. The emphasis on *behaviour* rather than on easily changed indicators such as file hashes is what makes the framework durable.",
        ],
        el: [
          "Το **MITRE ATT&CK** είναι μια δημόσια διαθέσιμη βάση γνώσης για τη συμπεριφορά των αντιπάλων, η οποία έχει δημιουργηθεί από παρατηρήσεις πραγματικών εισβολών. Οργανώνεται ως πίνακας. Οι στήλες είναι οι **τακτικές** —οι βραχυπρόθεσμοι στόχοι του επιτιθέμενου, όπως η *Αρχική Πρόσβαση*, η *Εκτέλεση*, η *Μόνιμη Παρουσία*, η *Κλιμάκωση Προνομίων*, η *Αποφυγή Άμυνας*, η *Πρόσβαση σε Διαπιστευτήρια*, η *Πλευρική Κίνηση* και η *Διαρροή Δεδομένων*. Κάθε στήλη περιέχει **τεχνικές** που περιγράφουν *πώς* επιτυγχάνεται ο στόχος· για παράδειγμα, η T1059.001 δηλώνει εκτέλεση εντολών μέσω PowerShell. Οι **διαδικασίες** είναι οι συγκεκριμένοι τρόποι με τους οποίους μια ομάδα έχει χρησιμοποιήσει μια τεχνική.",
          "Το ATT&CK παρέχει στους αμυνόμενους μια κοινή γλώσσα. Μια ομάδα ασφάλειας μπορεί να αντιστοιχίσει τους κανόνες ανίχνευσής της σε τεχνικές και να διαπιστώσει αμέσως πού υπάρχουν κενά κάλυψης· μια αναφορά πληροφοριών απειλών μπορεί να δηλώνει ποιες τεχνικές χρησιμοποιεί μια ομάδα· και μια κόκκινη ομάδα (red team) μπορεί να προσομοιώσει αυτές τις τεχνικές για να ελέγξει αν οι άμυνες λειτουργούν πράγματι. Η έμφαση στη *συμπεριφορά* και όχι σε εύκολα μεταβαλλόμενες ενδείξεις, όπως οι τιμές κατακερματισμού αρχείων, είναι αυτό που καθιστά το πλαίσιο ανθεκτικό στον χρόνο.",
        ],
      },
    },
    {
      id: "3.5",
      title: { en: "The Diamond Model and MITRE D3FEND", el: "Το Μοντέλο Διαμαντιού και το MITRE D3FEND" },
      body: {
        en: [
          "The **Diamond Model of Intrusion Analysis** represents every malicious event through four connected features: the **adversary**, the **capability** (tools and malware), the **infrastructure** (domains, servers, IP addresses) and the **victim**. The strength of the model lies in *pivoting*: once an analyst knows one vertex, the connections suggest where to look next. A malware sample (capability) may reveal a command-and-control domain (infrastructure), whose registration details may connect to other victims and eventually to an adversary profile.",
          "Whereas ATT&CK catalogues offensive behaviour, **MITRE D3FEND** catalogues defensive countermeasures—such as *process spawn analysis* or *credential hardening*—and links them to the offensive techniques they counter. Used together, the Kill Chain answers *when* to intervene, ATT&CK *what* the adversary does, the Diamond Model *who and with what*, and D3FEND *which control* addresses each behaviour.",
        ],
        el: [
          "Το **Μοντέλο Διαμαντιού για την Ανάλυση Εισβολών** (Diamond Model) αναπαριστά κάθε κακόβουλο γεγονός μέσω τεσσάρων συνδεδεμένων στοιχείων: του **αντιπάλου**, της **δυνατότητας** (εργαλεία και κακόβουλο λογισμικό), της **υποδομής** (ονόματα τομέα, διακομιστές, διευθύνσεις IP) και του **θύματος**. Η δύναμη του μοντέλου βρίσκεται στη *μετάβαση* (pivoting) από στοιχείο σε στοιχείο: μόλις ο αναλυτής γνωρίζει μία κορυφή, οι συνδέσεις υποδεικνύουν πού να αναζητήσει στη συνέχεια. Ένα δείγμα κακόβουλου λογισμικού (δυνατότητα) μπορεί να αποκαλύψει έναν τομέα διοίκησης και ελέγχου (υποδομή), του οποίου τα στοιχεία καταχώρισης μπορεί να οδηγούν σε άλλα θύματα και, τελικά, σε ένα προφίλ αντιπάλου.",
          "Ενώ το ATT&CK καταγράφει την επιθετική συμπεριφορά, το **MITRE D3FEND** καταγράφει αμυντικά αντίμετρα —όπως η *ανάλυση δημιουργίας διεργασιών* ή η *θωράκιση διαπιστευτηρίων*— και τα συνδέει με τις επιθετικές τεχνικές που αντιμετωπίζουν. Σε συνδυασμό, το Kill Chain απαντά στο *πότε* να παρέμβουμε, το ATT&CK στο *τι* κάνει ο αντίπαλος, το Μοντέλο Διαμαντιού στο *ποιος και με ποια μέσα* και το D3FEND στο *ποιο μέτρο* αντιμετωπίζει κάθε συμπεριφορά.",
        ],
      },
    },
    {
      id: "3.6",
      title: { en: "Cyber threat intelligence: lifecycle, types and responsible sharing", el: "Πληροφορίες κυβερνοαπειλών: κύκλος ζωής, είδη και υπεύθυνη ανταλλαγή" },
      body: {
        en: [
          "**Cyber threat intelligence (CTI)** is information about adversaries that has been collected, analysed and put into context so that it supports a decision. It is produced through an **intelligence lifecycle**: *direction* (defining what decision-makers need to know), *collection*, *processing*, *analysis*, *dissemination* and *feedback*. Intelligence is often divided into three levels. **Strategic** intelligence informs executives about trends and risks; **operational** intelligence describes campaigns and actors; **tactical** intelligence provides technical details such as techniques and indicators of compromise.",
          "Intelligence gains value when it is shared, but sharing must respect the source's wishes. The **Traffic Light Protocol (TLP 2.0)** labels information as *TLP:RED* (named recipients only), *TLP:AMBER* (the recipient's organisation, on a need-to-know basis), *TLP:GREEN* (the wider community) or *TLP:CLEAR* (public). Machine-readable exchange relies on **STIX**, a standard language for describing threat information, and **TAXII**, a protocol for transporting it. Sector communities such as Information Sharing and Analysis Centres (ISACs) allow organisations facing similar threats to warn each other quickly.",
        ],
        el: [
          "Οι **πληροφορίες κυβερνοαπειλών** (Cyber Threat Intelligence, CTI) είναι πληροφορίες για τους αντιπάλους που έχουν συλλεχθεί, αναλυθεί και τοποθετηθεί σε πλαίσιο, ώστε να υποστηρίζουν τη λήψη αποφάσεων. Παράγονται μέσω ενός **κύκλου ζωής πληροφοριών**: *καθοδήγηση* (προσδιορισμός του τι χρειάζεται να γνωρίζουν όσοι λαμβάνουν αποφάσεις), *συλλογή*, *επεξεργασία*, *ανάλυση*, *διάχυση* και *ανατροφοδότηση*. Οι πληροφορίες διακρίνονται συχνά σε τρία επίπεδα. Οι **στρατηγικές** ενημερώνουν τη διοίκηση για τάσεις και κινδύνους· οι **επιχειρησιακές** περιγράφουν εκστρατείες και δράστες· οι **τακτικές** παρέχουν τεχνικές λεπτομέρειες, όπως τεχνικές επίθεσης και ενδείξεις παραβίασης.",
          "Οι πληροφορίες αποκτούν αξία όταν ανταλλάσσονται, όμως η ανταλλαγή πρέπει να σέβεται τις επιθυμίες της πηγής. Το **Πρωτόκολλο Φωτεινού Σηματοδότη** (Traffic Light Protocol, TLP 2.0) χαρακτηρίζει τις πληροφορίες ως *TLP:RED* (μόνο ονομαστικοί παραλήπτες), *TLP:AMBER* (ο οργανισμός του παραλήπτη, βάσει ανάγκης γνώσης), *TLP:GREEN* (η ευρύτερη κοινότητα) ή *TLP:CLEAR* (δημόσιες). Η μηχανικά αναγνώσιμη ανταλλαγή βασίζεται στο **STIX**, μια τυποποιημένη γλώσσα περιγραφής πληροφοριών απειλών, και στο **TAXII**, ένα πρωτόκολλο μεταφοράς τους. Κλαδικές κοινότητες, όπως τα Κέντρα Ανταλλαγής και Ανάλυσης Πληροφοριών (ISAC), επιτρέπουν σε οργανισμούς που αντιμετωπίζουν παρόμοιες απειλές να προειδοποιούν γρήγορα ο ένας τον άλλον.",
        ],
      },
    },
  ],
  terms: {
    en: [
      { term: "APT", def: "Advanced persistent threat: a well-resourced actor that maintains long-term covert access." },
      { term: "Kill Chain", def: "Seven-phase model of a targeted intrusion, from reconnaissance to actions on objectives." },
      { term: "TTPs", def: "Tactics, techniques and procedures: the behavioural description of how an adversary operates." },
      { term: "Diamond Model", def: "Analytic model linking adversary, capability, infrastructure and victim." },
      { term: "TLP", def: "Traffic Light Protocol: labels that define how widely shared information may be redistributed." },
      { term: "STIX / TAXII", def: "Standard language (STIX) and transport protocol (TAXII) for exchanging threat intelligence." },
    ],
    el: [
      { term: "APT", def: "Προηγμένη επίμονη απειλή: δράστης με σημαντικούς πόρους που διατηρεί μακροχρόνια κρυφή πρόσβαση." },
      { term: "Kill Chain", def: "Μοντέλο επτά φάσεων μιας στοχευμένης εισβολής, από την αναγνώριση έως τις ενέργειες επί των στόχων." },
      { term: "TTP", def: "Τακτικές, τεχνικές και διαδικασίες: η συμπεριφορική περιγραφή του τρόπου δράσης ενός αντιπάλου." },
      { term: "Μοντέλο Διαμαντιού", def: "Αναλυτικό μοντέλο που συνδέει αντίπαλο, δυνατότητα, υποδομή και θύμα." },
      { term: "TLP", def: "Πρωτόκολλο Φωτεινού Σηματοδότη: χαρακτηρισμοί που ορίζουν πόσο ευρέως μπορεί να αναδιανεμηθεί μια πληροφορία." },
      { term: "STIX / TAXII", def: "Τυποποιημένη γλώσσα (STIX) και πρωτόκολλο μεταφοράς (TAXII) για την ανταλλαγή πληροφοριών απειλών." },
    ],
  },
  summary: {
    en: [
      "Threat actors differ in motivation, capability and persistence; defences should be proportionate to the actors that are actually relevant.",
      "The 'hat' terminology concerns authorisation and intent; unauthorised access is illegal regardless of motive.",
      "The Kill Chain shows that breaking any single phase stops an intrusion, and earlier interruption is cheaper.",
      "ATT&CK describes adversary behaviour in detail and provides a common language for detection, intelligence and testing.",
      "The Diamond Model supports pivoting during analysis, and intelligence must be shared under clear rules such as TLP.",
    ],
    el: [
      "Οι δράστες απειλών διαφέρουν ως προς το κίνητρο, τις ικανότητες και την επιμονή· οι άμυνες πρέπει να είναι ανάλογες με τους δράστες που πράγματι αφορούν τον οργανισμό.",
      "Η ορολογία των «καπέλων» αφορά την εξουσιοδότηση και την πρόθεση· η μη εξουσιοδοτημένη πρόσβαση είναι παράνομη ανεξάρτητα από το κίνητρο.",
      "Το Kill Chain δείχνει ότι η διακοπή οποιασδήποτε φάσης σταματά την εισβολή και ότι η έγκαιρη διακοπή κοστίζει λιγότερο.",
      "Το ATT&CK περιγράφει λεπτομερώς τη συμπεριφορά των αντιπάλων και παρέχει κοινή γλώσσα για την ανίχνευση, τις πληροφορίες απειλών και τις δοκιμές.",
      "Το Μοντέλο Διαμαντιού υποστηρίζει τη μετάβαση μεταξύ στοιχείων κατά την ανάλυση, ενώ οι πληροφορίες πρέπει να ανταλλάσσονται με σαφείς κανόνες, όπως το TLP.",
    ],
  },
  questions: {
    en: [
      "Why are insider threats difficult to address with perimeter-based controls? Propose two controls that are effective against them.",
      "Map a typical phishing-to-ransomware attack onto the seven phases of the Cyber Kill Chain.",
      "Explain why detections based on ATT&CK techniques are more durable than detections based on file hashes.",
      "A partner shares a report marked TLP:AMBER. May you forward it to a supplier? Justify your answer.",
    ],
    el: [
      "Γιατί οι εσωτερικές απειλές αντιμετωπίζονται δύσκολα με μέτρα που βασίζονται στην περίμετρο; Προτείνετε δύο μέτρα αποτελεσματικά απέναντί τους.",
      "Αντιστοιχίστε μια τυπική επίθεση που ξεκινά με ηλεκτρονικό ψάρεμα και καταλήγει σε λυτρισμικό στις επτά φάσεις του Cyber Kill Chain.",
      "Εξηγήστε γιατί οι ανιχνεύσεις που βασίζονται σε τεχνικές του ATT&CK είναι πιο ανθεκτικές από εκείνες που βασίζονται σε τιμές κατακερματισμού αρχείων.",
      "Ένας συνεργάτης σάς αποστέλλει αναφορά με χαρακτηρισμό TLP:AMBER. Μπορείτε να την προωθήσετε σε έναν προμηθευτή; Τεκμηριώστε την απάντησή σας.",
    ],
  },
};

export default ch03;

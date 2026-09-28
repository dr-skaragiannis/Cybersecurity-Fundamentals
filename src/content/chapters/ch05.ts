import type { Chapter } from "../types";

const ch05: Chapter = {
  n: 5,
  part: 2,
  title: { en: "Human Factors, Social Engineering and Digital Safety", el: "Ανθρώπινος Παράγοντας, Κοινωνική Μηχανική και Ψηφιακή Ασφάλεια" },
  subtitle: {
    en: "Psychology of persuasion · Phishing and its variants · Physical vectors · Stalkerware and metadata · Business email compromise · Security culture",
    el: "Ψυχολογία της πειθούς · Ηλεκτρονικό ψάρεμα και οι παραλλαγές του · Φυσικά κανάλια · Stalkerware και μεταδεδομένα · Παραβίαση επιχειρηματικού email · Κουλτούρα ασφάλειας",
  },
  level: { en: "Beginner · Human-centred", el: "Εισαγωγικό επίπεδο · Ανθρωποκεντρική προσέγγιση" },
  hours: "5–7",
  intro: {
    en: [
      "Technical controls protect systems, but systems are operated by people, and people can be persuaded. Social engineering exploits trust, helpfulness, fear and habit to make a legitimate user perform an action that benefits the attacker—opening an attachment, revealing a password, approving a payment. Industry breach reports consistently find that the human element is involved in the majority of successful intrusions.",
      "This chapter explains why social engineering works, surveys the main attack methods, and examines two threats that have grown sharply in recent years: business email compromise and multi-factor authentication fatigue. It also addresses personal digital safety, including stalkerware and metadata leakage. The chapter closes with a constructive message: users are not the 'weakest link' to be blamed, but a detection layer to be strengthened through good design and a positive reporting culture.",
    ],
    el: [
      "Τα τεχνικά μέτρα προστατεύουν τα συστήματα, όμως τα συστήματα τα χειρίζονται άνθρωποι, και οι άνθρωποι μπορούν να πειστούν. Η κοινωνική μηχανική εκμεταλλεύεται την εμπιστοσύνη, την προθυμία για βοήθεια, τον φόβο και τη συνήθεια, ώστε ένας νόμιμος χρήστης να εκτελέσει μια ενέργεια που ωφελεί τον επιτιθέμενο —να ανοίξει ένα συνημμένο, να αποκαλύψει έναν κωδικό, να εγκρίνει μια πληρωμή. Οι κλαδικές αναφορές παραβιάσεων διαπιστώνουν σταθερά ότι ο ανθρώπινος παράγοντας εμπλέκεται στην πλειονότητα των επιτυχημένων εισβολών.",
      "Το κεφάλαιο εξηγεί γιατί λειτουργεί η κοινωνική μηχανική, παρουσιάζει τις κύριες μεθόδους επίθεσης και εξετάζει δύο απειλές που έχουν αυξηθεί σημαντικά τα τελευταία χρόνια: την παραβίαση επιχειρηματικού ηλεκτρονικού ταχυδρομείου και την «κόπωση» του ελέγχου ταυτότητας πολλαπλών παραγόντων. Εξετάζει επίσης την προσωπική ψηφιακή ασφάλεια, συμπεριλαμβανομένου του λογισμικού παρακολούθησης (stalkerware) και της διαρροής μεταδεδομένων. Το κεφάλαιο κλείνει με ένα εποικοδομητικό μήνυμα: οι χρήστες δεν είναι ο «πιο αδύναμος κρίκος» που πρέπει να κατηγορείται, αλλά ένα επίπεδο ανίχνευσης που μπορεί να ενισχυθεί μέσω καλού σχεδιασμού και μιας θετικής κουλτούρας αναφοράς.",
    ],
  },
  outcomes: {
    en: [
      "Explain the psychological principles that social engineers exploit.",
      "Distinguish phishing, spear-phishing, whaling, vishing, smishing, pretexting and baiting.",
      "Describe physical and observational attack vectors and their countermeasures.",
      "Analyse a business email compromise and an MFA-fatigue attack, and propose layered defences.",
      "Design awareness measures and metrics that reduce susceptibility without blaming users.",
    ],
    el: [
      "Να εξηγείτε τις ψυχολογικές αρχές που εκμεταλλεύονται οι κοινωνικοί μηχανικοί.",
      "Να διακρίνετε το ηλεκτρονικό ψάρεμα, το στοχευμένο ψάρεμα, το whaling, το vishing, το smishing, την κατασκευή προσχήματος και το δόλωμα.",
      "Να περιγράφετε τα φυσικά κανάλια επίθεσης και τα κανάλια παρατήρησης, καθώς και τα αντίμετρά τους.",
      "Να αναλύετε μια παραβίαση επιχειρηματικού email και μια επίθεση κόπωσης MFA και να προτείνετε πολυεπίπεδες άμυνες.",
      "Να σχεδιάζετε μέτρα ευαισθητοποίησης και δείκτες που μειώνουν την ευαλωτότητα χωρίς να επιρρίπτουν ευθύνες στους χρήστες.",
    ],
  },
  sections: [
    {
      id: "5.1",
      title: { en: "The psychology of exploitation", el: "Η ψυχολογία της εκμετάλλευσης" },
      body: {
        en: [
          "Social engineering succeeds because it targets mental shortcuts that normally serve us well. The psychologist Robert Cialdini described several **principles of persuasion** that attackers routinely exploit. *Authority*: people tend to obey instructions that appear to come from a manager, the IT department or the police. *Urgency and scarcity*: a deadline ('your account will be closed in one hour') reduces the time available for careful thought. *Social proof*: we assume an action is safe if others seem to be doing it. *Liking* and *reciprocity*: we are more willing to help someone who is friendly or who has done us a small favour.",
          "These principles are powerful because they bypass deliberate reasoning and trigger fast, automatic responses. Stress, fatigue and information overload make everyone more susceptible, regardless of intelligence or technical skill. Effective defences therefore do not rely on people being permanently alert; they introduce *friction at the right moment*—for example, a mandatory call-back before any change of bank details—so that the automatic response is interrupted when it matters most.",
        ],
        el: [
          "Η κοινωνική μηχανική επιτυγχάνει επειδή στοχεύει νοητικές συντομεύσεις που υπό κανονικές συνθήκες μάς εξυπηρετούν. Ο ψυχολόγος Robert Cialdini περιέγραψε ορισμένες **αρχές της πειθούς** που οι επιτιθέμενοι εκμεταλλεύονται συστηματικά. *Αυθεντία*: οι άνθρωποι τείνουν να υπακούουν σε οδηγίες που φαίνεται να προέρχονται από έναν προϊστάμενο, το τμήμα πληροφορικής ή την αστυνομία. *Επείγον και σπανιότητα*: μια προθεσμία («ο λογαριασμός σας θα κλείσει σε μία ώρα») μειώνει τον διαθέσιμο χρόνο για προσεκτική σκέψη. *Κοινωνική απόδειξη*: υποθέτουμε ότι μια ενέργεια είναι ασφαλής αν φαίνεται ότι την κάνουν και άλλοι. *Συμπάθεια* και *αμοιβαιότητα*: είμαστε πιο πρόθυμοι να βοηθήσουμε κάποιον που είναι φιλικός ή που μας έχει κάνει μια μικρή χάρη.",
          "Οι αρχές αυτές είναι ισχυρές επειδή παρακάμπτουν τη συνειδητή σκέψη και ενεργοποιούν γρήγορες, αυτόματες αντιδράσεις. Το άγχος, η κούραση και ο υπερβολικός όγκος πληροφοριών καθιστούν όλους πιο ευάλωτους, ανεξάρτητα από την ευφυΐα ή τις τεχνικές τους γνώσεις. Οι αποτελεσματικές άμυνες δεν βασίζονται, επομένως, στη διαρκή εγρήγορση των ανθρώπων· εισάγουν *τριβή την κατάλληλη στιγμή* —για παράδειγμα, υποχρεωτική επιβεβαιωτική κλήση πριν από οποιαδήποτε αλλαγή τραπεζικών στοιχείων— ώστε η αυτόματη αντίδραση να διακόπτεται ακριβώς όταν έχει σημασία.",
        ],
      },
    },
    {
      id: "5.2",
      title: { en: "Attack methods: from bulk phishing to pretexting", el: "Μέθοδοι επίθεσης: από το μαζικό ψάρεμα έως την κατασκευή προσχήματος" },
      body: {
        en: [
          "**Phishing** is the mass distribution of fraudulent messages that imitate trusted organisations in order to steal credentials or deliver malware. **Spear-phishing** targets a specific person or group and uses researched details—names of colleagues, current projects—to appear credible. **Whaling** is spear-phishing aimed at senior executives. The same techniques are applied over other channels: **vishing** uses voice calls, often with spoofed caller IDs and, increasingly, AI-generated voices, while **smishing** uses SMS or messaging apps.",
          "**Pretexting** involves inventing a plausible scenario—an auditor who needs a report, a technician who must 'verify' a password—to obtain information or access. **Baiting** leaves an attractive item, such as a USB stick labelled 'Salaries 2026', where a victim will find it and plug it in. The common element is that the attacker creates a situation in which the harmful action feels normal, helpful or urgent.",
        ],
        el: [
          "Το **ηλεκτρονικό ψάρεμα** (phishing) είναι η μαζική αποστολή δόλιων μηνυμάτων που μιμούνται αξιόπιστους οργανισμούς, με σκοπό την υποκλοπή διαπιστευτηρίων ή την εγκατάσταση κακόβουλου λογισμικού. Το **στοχευμένο ψάρεμα** (spear-phishing) απευθύνεται σε συγκεκριμένο πρόσωπο ή ομάδα και χρησιμοποιεί στοιχεία που έχουν συλλεχθεί με έρευνα —ονόματα συναδέλφων, τρέχοντα έργα— ώστε να φαίνεται αξιόπιστο. Το **whaling** είναι στοχευμένο ψάρεμα που απευθύνεται σε ανώτατα στελέχη. Οι ίδιες τεχνικές εφαρμόζονται και σε άλλα κανάλια: το **vishing** χρησιμοποιεί τηλεφωνικές κλήσεις, συχνά με πλαστογραφημένη αναγνώριση καλούντος και, όλο και περισσότερο, με φωνές που παράγονται από τεχνητή νοημοσύνη, ενώ το **smishing** χρησιμοποιεί SMS ή εφαρμογές ανταλλαγής μηνυμάτων.",
          "Η **κατασκευή προσχήματος** (pretexting) συνίσταται στην επινόηση ενός αληθοφανούς σεναρίου —ένας ελεγκτής που χρειάζεται μια αναφορά, ένας τεχνικός που πρέπει να «επαληθεύσει» έναν κωδικό— για την απόκτηση πληροφοριών ή πρόσβασης. Το **δόλωμα** (baiting) αφήνει ένα ελκυστικό αντικείμενο, όπως ένα USB με την ετικέτα «Μισθοδοσία 2026», σε σημείο όπου το θύμα θα το βρει και θα το συνδέσει στον υπολογιστή του. Το κοινό στοιχείο είναι ότι ο επιτιθέμενος δημιουργεί μια κατάσταση στην οποία η επιβλαβής ενέργεια μοιάζει φυσιολογική, εξυπηρετική ή επείγουσα.",
        ],
      },
    },
    {
      id: "5.3",
      title: { en: "Physical and observational vectors", el: "Φυσικά κανάλια και κανάλια παρατήρησης" },
      body: {
        en: [
          "Not every social-engineering attack happens online. **Tailgating** (or *piggybacking*) means following an authorised person through a secured door, often while carrying boxes so that holding the door open feels like simple courtesy. **Shoulder surfing** is observing a screen or keypad to capture passwords or PINs, and **dumpster diving** is searching discarded paper and equipment for useful information. Physical access is particularly dangerous because it can bypass many network controls entirely—an attacker who reaches an unlocked workstation or a network port is already 'inside'.",
          "Countermeasures combine technology and behaviour: mantraps and turnstiles that admit one person at a time, visible visitor badges, a clear-desk and clear-screen policy, privacy filters on displays, cross-cut shredding and certified destruction of storage media. Staff should feel entitled to challenge an unfamiliar person politely; this is easier when management explicitly supports it.",
        ],
        el: [
          "Δεν πραγματοποιούνται όλες οι επιθέσεις κοινωνικής μηχανικής στο διαδίκτυο. Το **tailgating** (ή *piggybacking*) σημαίνει να ακολουθεί κανείς ένα εξουσιοδοτημένο πρόσωπο μέσα από μια ασφαλισμένη πόρτα, συχνά κρατώντας κούτες, ώστε το να του κρατήσει κάποιος την πόρτα να φαίνεται απλή ευγένεια. Η **παρακολούθηση πάνω από τον ώμο** (shoulder surfing) είναι η παρατήρηση μιας οθόνης ή ενός πληκτρολογίου για την υποκλοπή κωδικών ή PIN, ενώ η **έρευνα στα απορρίμματα** (dumpster diving) είναι η αναζήτηση χρήσιμων πληροφοριών σε πεταμένα έγγραφα και εξοπλισμό. Η φυσική πρόσβαση είναι ιδιαίτερα επικίνδυνη, επειδή μπορεί να παρακάμψει εντελώς πολλά δικτυακά μέτρα —ένας επιτιθέμενος που φτάνει σε έναν ξεκλείδωτο σταθμό εργασίας ή σε μια δικτυακή θύρα βρίσκεται ήδη «μέσα».",
          "Τα αντίμετρα συνδυάζουν τεχνολογία και συμπεριφορά: θαλάμους διπλής πόρτας (mantraps) και περιστροφικές πύλες που επιτρέπουν τη διέλευση ενός ατόμου κάθε φορά, εμφανείς κάρτες επισκεπτών, πολιτική καθαρού γραφείου και κλειδωμένης οθόνης, φίλτρα απορρήτου στις οθόνες, καταστροφή εγγράφων σε τεμαχιστές εγκάρσιας κοπής και πιστοποιημένη καταστροφή αποθηκευτικών μέσων. Το προσωπικό πρέπει να αισθάνεται ότι δικαιούται να ζητήσει ευγενικά στοιχεία από ένα άγνωστο πρόσωπο· αυτό γίνεται ευκολότερο όταν η διοίκηση το υποστηρίζει ρητά.",
        ],
      },
    },
    {
      id: "5.4",
      title: { en: "Personal digital safety: stalkerware and metadata leakage", el: "Προσωπική ψηφιακή ασφάλεια: stalkerware και διαρροή μεταδεδομένων" },
      body: {
        en: [
          "Some of the most harmful attacks are carried out not by distant criminals but by people close to the victim. **Stalkerware** is commercially available software that, once installed on a phone, secretly forwards messages, location, photos and call logs to another person. It is frequently associated with intimate-partner abuse. Warning signs include unexplained battery drain, unknown device-administrator apps and a partner who knows things they should not. Because removing stalkerware can alert the abuser and escalate danger, victims should seek support from specialist organisations before acting.",
          "**Metadata**—data about data—can reveal far more than intended. A photograph's EXIF metadata may contain the exact GPS coordinates where it was taken, the device model and the time; office documents may include the author's name and revision history. Before sharing files publicly, users should remove such metadata, for instance with the `exiftool -all=` command or the built-in 'remove properties' features of operating systems and office suites.",
        ],
        el: [
          "Ορισμένες από τις πιο επιβλαβείς επιθέσεις δεν πραγματοποιούνται από απομακρυσμένους εγκληματίες, αλλά από πρόσωπα του στενού περιβάλλοντος του θύματος. Το **stalkerware** είναι εμπορικά διαθέσιμο λογισμικό το οποίο, μόλις εγκατασταθεί σε ένα κινητό τηλέφωνο, προωθεί κρυφά μηνύματα, τοποθεσία, φωτογραφίες και ιστορικό κλήσεων σε άλλο πρόσωπο. Συνδέεται συχνά με την κακοποίηση από σύντροφο. Προειδοποιητικά σημάδια αποτελούν η ανεξήγητη εξάντληση της μπαταρίας, άγνωστες εφαρμογές με δικαιώματα διαχειριστή συσκευής και ένας σύντροφος που γνωρίζει πράγματα που δεν θα έπρεπε. Επειδή η αφαίρεση του stalkerware μπορεί να ειδοποιήσει τον θύτη και να αυξήσει τον κίνδυνο, τα θύματα πρέπει να αναζητούν υποστήριξη από εξειδικευμένους φορείς πριν προβούν σε οποιαδήποτε ενέργεια.",
          "Τα **μεταδεδομένα** —δεδομένα για τα δεδομένα— μπορεί να αποκαλύπτουν πολύ περισσότερα από όσα σκοπεύαμε. Τα μεταδεδομένα EXIF μιας φωτογραφίας μπορεί να περιέχουν τις ακριβείς συντεταγμένες GPS του σημείου λήψης, το μοντέλο της συσκευής και την ώρα· τα έγγραφα γραφείου μπορεί να περιλαμβάνουν το όνομα του συντάκτη και το ιστορικό αναθεωρήσεων. Πριν από τη δημόσια κοινοποίηση αρχείων, οι χρήστες πρέπει να αφαιρούν αυτά τα μεταδεδομένα, για παράδειγμα με την εντολή `exiftool -all=` ή με τις ενσωματωμένες λειτουργίες «κατάργησης ιδιοτήτων» των λειτουργικών συστημάτων και των σουιτών γραφείου.",
        ],
      },
    },
    {
      id: "5.5",
      title: { en: "Business email compromise and MFA fatigue", el: "Παραβίαση επιχειρηματικού email και κόπωση MFA" },
      body: {
        en: [
          "**Business email compromise (BEC)** is a fraud in which the attacker impersonates an executive, supplier or lawyer—either by compromising a real mailbox or by registering a look-alike domain—and requests an urgent payment or a change of bank details. BEC often involves no malware at all, so it evades technical filters; it relies entirely on authority and urgency. Effective defences are procedural as well as technical: payment changes must be verified through a known phone number, high-value transfers require approval by two people (*maker–checker*), and email authentication (SPF, DKIM and a DMARC policy of `p=reject`) makes domain spoofing much harder.",
          "**MFA fatigue** (or *push bombing*) targets users of push-notification authentication. Having stolen a password, the attacker triggers dozens of login approvals, often late at night, until the exhausted user taps 'Approve'—sometimes after a phone call from a fake help desk. Countermeasures include *number matching* (the user must type a code shown on the login screen), limits on the number of prompts, and phishing-resistant methods such as FIDO2 security keys (Chapter 8).",
        ],
        el: [
          "Η **παραβίαση επιχειρηματικού ηλεκτρονικού ταχυδρομείου** (Business Email Compromise, BEC) είναι μια απάτη κατά την οποία ο επιτιθέμενος υποδύεται ένα ανώτατο στέλεχος, έναν προμηθευτή ή έναν δικηγόρο —είτε παραβιάζοντας ένα πραγματικό γραμματοκιβώτιο είτε καταχωρίζοντας ένα παρόμοιο όνομα τομέα— και ζητά μια επείγουσα πληρωμή ή αλλαγή τραπεζικών στοιχείων. Η BEC συχνά δεν περιλαμβάνει καθόλου κακόβουλο λογισμικό και, επομένως, διαφεύγει από τα τεχνικά φίλτρα· βασίζεται αποκλειστικά στην αυθεντία και στο επείγον. Οι αποτελεσματικές άμυνες είναι τόσο διαδικαστικές όσο και τεχνικές: οι αλλαγές στοιχείων πληρωμής επαληθεύονται μέσω γνωστού αριθμού τηλεφώνου, οι μεταφορές υψηλής αξίας απαιτούν έγκριση από δύο πρόσωπα (*δημιουργός–ελεγκτής*) και ο έλεγχος αυθεντικότητας email (SPF, DKIM και πολιτική DMARC `p=reject`) δυσχεραίνει σημαντικά την πλαστογράφηση τομέα.",
          "Η **κόπωση MFA** (MFA fatigue ή *push bombing*) στοχεύει χρήστες που επαληθεύουν την ταυτότητά τους μέσω ειδοποιήσεων push. Έχοντας υποκλέψει έναν κωδικό, ο επιτιθέμενος προκαλεί δεκάδες αιτήματα έγκρισης σύνδεσης, συχνά αργά τη νύχτα, έως ότου ο εξαντλημένος χρήστης πατήσει «Έγκριση» —μερικές φορές μετά από τηλεφώνημα ενός ψεύτικου γραφείου υποστήριξης. Τα αντίμετρα περιλαμβάνουν την *αντιστοίχιση αριθμού* (ο χρήστης πρέπει να πληκτρολογήσει έναν κωδικό που εμφανίζεται στην οθόνη σύνδεσης), όρια στον αριθμό των αιτημάτων και μεθόδους ανθεκτικές στο ψάρεμα, όπως τα κλειδιά ασφαλείας FIDO2 (Κεφάλαιο 8).",
        ],
      },
    },
    {
      id: "5.6",
      title: { en: "Building a report-positive security culture", el: "Οικοδόμηση κουλτούρας ασφάλειας που ενθαρρύνει την αναφορά" },
      body: {
        en: [
          "Awareness programmes often measure the wrong thing. The **click rate** in simulated phishing campaigns mainly reflects how difficult the simulation was; it can be pushed up or down at will. A far more meaningful metric is the **report rate**—the proportion of users who report a suspicious message—together with the **time to first report**. A single early report allows the security team to remove a malicious message from every mailbox before most recipients have even opened it.",
          "Culture determines whether people report. If employees who click on a phishing link are publicly shamed or punished, they will hide their mistakes, and the organisation loses its earliest warning. A report-positive culture makes reporting easy (a single button in the mail client), thanks people for every report—including false alarms—and treats mistakes as learning opportunities. In this way, users become an active detection layer rather than a liability.",
        ],
        el: [
          "Τα προγράμματα ευαισθητοποίησης συχνά μετρούν το λάθος πράγμα. Το **ποσοστό κλικ** στις προσομοιωμένες εκστρατείες ηλεκτρονικού ψαρέματος αντανακλά κυρίως τη δυσκολία της προσομοίωσης· μπορεί να αυξηθεί ή να μειωθεί κατά βούληση. Πολύ πιο ουσιαστικός δείκτης είναι το **ποσοστό αναφοράς** —το ποσοστό των χρηστών που αναφέρουν ένα ύποπτο μήνυμα— σε συνδυασμό με τον **χρόνο έως την πρώτη αναφορά**. Μία μόνο έγκαιρη αναφορά επιτρέπει στην ομάδα ασφάλειας να αφαιρέσει ένα κακόβουλο μήνυμα από όλα τα γραμματοκιβώτια πριν το ανοίξουν οι περισσότεροι παραλήπτες.",
          "Η κουλτούρα καθορίζει αν οι άνθρωποι θα προβούν σε αναφορά. Αν οι εργαζόμενοι που πατούν σε έναν σύνδεσμο ψαρέματος εκτίθενται δημόσια ή τιμωρούνται, θα αποκρύπτουν τα λάθη τους και ο οργανισμός θα χάνει την πιο έγκαιρη προειδοποίησή του. Μια κουλτούρα που ενθαρρύνει την αναφορά την καθιστά εύκολη (ένα κουμπί στο πρόγραμμα ηλεκτρονικού ταχυδρομείου), ευχαριστεί τους ανθρώπους για κάθε αναφορά —ακόμη και για τους ψευδείς συναγερμούς— και αντιμετωπίζει τα λάθη ως ευκαιρίες μάθησης. Με αυτόν τον τρόπο οι χρήστες γίνονται ενεργό επίπεδο ανίχνευσης και όχι αδυναμία του οργανισμού.",
        ],
      },
    },
  ],
  terms: {
    en: [
      { term: "Social engineering", def: "Manipulating people into performing actions or revealing information that benefit the attacker." },
      { term: "Spear-phishing", def: "Phishing tailored to a specific individual or group using researched details." },
      { term: "Pretexting", def: "Inventing a plausible scenario to obtain information or access." },
      { term: "BEC", def: "Business email compromise: fraud that impersonates trusted parties to redirect payments." },
      { term: "MFA fatigue", def: "Flooding a user with authentication prompts until one is approved." },
      { term: "DMARC", def: "Email policy that tells receivers how to treat messages failing SPF/DKIM checks." },
    ],
    el: [
      { term: "Κοινωνική μηχανική", def: "Χειραγώγηση ανθρώπων ώστε να εκτελέσουν ενέργειες ή να αποκαλύψουν πληροφορίες προς όφελος του επιτιθέμενου." },
      { term: "Στοχευμένο ψάρεμα", def: "Ηλεκτρονικό ψάρεμα προσαρμοσμένο σε συγκεκριμένο πρόσωπο ή ομάδα με στοιχεία που συλλέχθηκαν με έρευνα." },
      { term: "Κατασκευή προσχήματος", def: "Επινόηση αληθοφανούς σεναρίου για την απόκτηση πληροφοριών ή πρόσβασης." },
      { term: "BEC", def: "Παραβίαση επιχειρηματικού email: απάτη με υπόδυση αξιόπιστων προσώπων για εκτροπή πληρωμών." },
      { term: "Κόπωση MFA", def: "Κατάκλυση ενός χρήστη με αιτήματα επαλήθευσης έως ότου εγκρίνει κάποιο." },
      { term: "DMARC", def: "Πολιτική email που ορίζει στους παραλήπτες πώς να χειρίζονται μηνύματα που αποτυγχάνουν στους ελέγχους SPF/DKIM." },
    ],
  },
  summary: {
    en: [
      "Social engineering exploits automatic responses to authority, urgency, social proof, liking and reciprocity.",
      "Phishing appears in many forms and channels; pretexting and baiting create situations in which harmful actions feel normal.",
      "Physical access can bypass network controls and must be protected by both technology and staff behaviour.",
      "BEC and MFA fatigue are countered by verification procedures, dual approval, email authentication and phishing-resistant MFA.",
      "Report rate, not click rate, is the metric that matters; a blame-free culture turns users into a detection layer.",
    ],
    el: [
      "Η κοινωνική μηχανική εκμεταλλεύεται αυτόματες αντιδράσεις απέναντι στην αυθεντία, το επείγον, την κοινωνική απόδειξη, τη συμπάθεια και την αμοιβαιότητα.",
      "Το ηλεκτρονικό ψάρεμα εμφανίζεται σε πολλές μορφές και κανάλια· η κατασκευή προσχήματος και το δόλωμα δημιουργούν καταστάσεις όπου οι επιβλαβείς ενέργειες μοιάζουν φυσιολογικές.",
      "Η φυσική πρόσβαση μπορεί να παρακάμψει τα δικτυακά μέτρα και πρέπει να προστατεύεται τόσο με τεχνολογία όσο και με τη συμπεριφορά του προσωπικού.",
      "Η BEC και η κόπωση MFA αντιμετωπίζονται με διαδικασίες επαλήθευσης, διπλή έγκριση, έλεγχο αυθεντικότητας email και MFA ανθεκτικό στο ψάρεμα.",
      "Ο κρίσιμος δείκτης είναι το ποσοστό αναφοράς και όχι το ποσοστό κλικ· μια κουλτούρα χωρίς απόδοση ευθυνών μετατρέπει τους χρήστες σε επίπεδο ανίχνευσης.",
    ],
  },
  questions: {
    en: [
      "Identify the persuasion principles used in the message: 'This is the CEO. I need the supplier payment sent in the next 30 minutes—do not call, I am in a meeting.'",
      "Why is BEC difficult to stop with antivirus or sandboxing? Which controls are effective?",
      "Explain how number matching defeats a basic MFA-fatigue attack.",
      "Argue why report rate is a better awareness metric than click rate.",
    ],
    el: [
      "Εντοπίστε τις αρχές πειθούς που χρησιμοποιούνται στο μήνυμα: «Είμαι ο Διευθύνων Σύμβουλος. Χρειάζομαι την πληρωμή του προμηθευτή μέσα στα επόμενα 30 λεπτά —μην τηλεφωνήσετε, είμαι σε σύσκεψη».",
      "Γιατί η BEC δύσκολα σταματά με λογισμικό προστασίας από ιούς ή με περιβάλλοντα απομονωμένης εκτέλεσης; Ποια μέτρα είναι αποτελεσματικά;",
      "Εξηγήστε πώς η αντιστοίχιση αριθμού αποτρέπει μια βασική επίθεση κόπωσης MFA.",
      "Τεκμηριώστε γιατί το ποσοστό αναφοράς είναι καλύτερος δείκτης ευαισθητοποίησης από το ποσοστό κλικ.",
    ],
  },
};

export default ch05;

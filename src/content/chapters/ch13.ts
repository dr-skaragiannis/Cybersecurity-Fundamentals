import type { Chapter } from "../types";

const ch13: Chapter = {
  n: 13,
  part: 4,
  title: { en: "Cyber Resilience, Governance and Future Trends", el: "Κυβερνοανθεκτικότητα, Διακυβέρνηση και Μελλοντικές Τάσεις" },
  subtitle: {
    en: "Backups and recovery · BCP, RPO and RTO · Risk management · NIST CSF 2.0, ISO/IEC 27001, CIS · GDPR and NIS2 · Metrics · OT security · Zero Trust and cloud",
    el: "Αντίγραφα ασφαλείας και ανάκαμψη · BCP, RPO και RTO · Διαχείριση κινδύνου · NIST CSF 2.0, ISO/IEC 27001, CIS · ΓΚΠΔ και NIS2 · Δείκτες · Ασφάλεια OT · Μηδενική εμπιστοσύνη και νέφος",
  },
  level: { en: "Advanced · Strategy and governance", el: "Προχωρημένο επίπεδο · Στρατηγική και διακυβέρνηση" },
  hours: "10–12",
  intro: {
    en: [
      "The final chapter returns to the question raised in Chapter 1: *can the organisation continue to operate, and recover, when things go wrong?* Technical controls are necessary but not sufficient. Resilience also depends on backups that work when needed, on plans that have been rehearsed, on decisions about risk that are taken consciously by accountable people, and on compliance with a growing body of law.",
      "The chapter first covers resilience engineering, backup architectures and business continuity. It then turns to governance: risk management in practice, the major frameworks and regulations, and the metrics that tell leadership whether security is improving. It concludes by looking at environments and trends that will shape the coming years—operational technology and critical infrastructure, Zero Trust architecture, and cloud and supply-chain security.",
    ],
    el: [
      "Το τελευταίο κεφάλαιο επιστρέφει στο ερώτημα που τέθηκε στο Κεφάλαιο 1: *μπορεί ο οργανισμός να συνεχίσει να λειτουργεί και να ανακάμψει όταν τα πράγματα πάνε στραβά;* Τα τεχνικά μέτρα είναι αναγκαία αλλά όχι επαρκή. Η ανθεκτικότητα εξαρτάται επίσης από αντίγραφα ασφαλείας που λειτουργούν όταν χρειάζονται, από σχέδια που έχουν δοκιμαστεί, από αποφάσεις για τον κίνδυνο που λαμβάνονται συνειδητά από υπόλογα πρόσωπα και από τη συμμόρφωση με ένα διαρκώς διευρυνόμενο νομικό πλαίσιο.",
      "Το κεφάλαιο καλύπτει πρώτα τη μηχανική ανθεκτικότητας, τις αρχιτεκτονικές αντιγράφων ασφαλείας και την επιχειρησιακή συνέχεια. Στη συνέχεια στρέφεται στη διακυβέρνηση: τη διαχείριση κινδύνου στην πράξη, τα κυριότερα πλαίσια και κανονιστικά κείμενα και τους δείκτες που δείχνουν στη διοίκηση αν η ασφάλεια βελτιώνεται. Ολοκληρώνεται εξετάζοντας περιβάλλοντα και τάσεις που θα διαμορφώσουν τα επόμενα χρόνια —την επιχειρησιακή τεχνολογία και τις κρίσιμες υποδομές, την αρχιτεκτονική μηδενικής εμπιστοσύνης και την ασφάλεια του νέφους και της εφοδιαστικής αλυσίδας.",
    ],
  },
  outcomes: {
    en: [
      "Design a backup strategy that survives ransomware and define RPO and RTO for critical services.",
      "Build a risk register and choose appropriate treatment options.",
      "Compare NIST CSF 2.0, ISO/IEC 27001 and the CIS Controls, and summarise the obligations of GDPR and NIS2.",
      "Distinguish meaningful security metrics from vanity metrics.",
      "Explain the particular constraints of OT security and the principles of Zero Trust and cloud shared responsibility.",
    ],
    el: [
      "Να σχεδιάζετε στρατηγική αντιγράφων ασφαλείας που αντέχει σε λυτρισμικό και να ορίζετε RPO και RTO για κρίσιμες υπηρεσίες.",
      "Να καταρτίζετε μητρώο κινδύνων και να επιλέγετε κατάλληλες επιλογές αντιμετώπισης.",
      "Να συγκρίνετε τα NIST CSF 2.0, ISO/IEC 27001 και CIS Controls και να συνοψίζετε τις υποχρεώσεις του ΓΚΠΔ και της NIS2.",
      "Να διακρίνετε τους ουσιαστικούς δείκτες ασφάλειας από τους δείκτες «βιτρίνας».",
      "Να εξηγείτε τους ιδιαίτερους περιορισμούς της ασφάλειας OT, καθώς και τις αρχές της μηδενικής εμπιστοσύνης και της κοινής ευθύνης στο νέφος.",
    ],
  },
  sections: [
    {
      id: "13.1",
      title: { en: "Resilience engineering and backup architectures", el: "Μηχανική ανθεκτικότητας και αρχιτεκτονικές αντιγράφων ασφαλείας" },
      body: {
        en: [
          "**Resilience engineering** accepts that some attacks and failures will succeed and designs systems to degrade gracefully rather than collapse. Its tools include redundancy without shared single points of failure, the ability to isolate damaged components, and pre-planned modes of reduced operation—for example, a hospital that can continue admitting patients on paper when its electronic system is unavailable.",
          "Backups are the foundation of recovery, and modern ransomware deliberately targets them. The classic **3-2-1 rule**—three copies of the data, on two different types of media, one of them off-site—has therefore been extended to **3-2-1-1-0**: at least one copy should be **offline or immutable** (write-once storage or object lock that even an administrator cannot delete during the retention period), and restores should be tested so that there are **zero** unverified errors. Backup systems need their own separate credentials and MFA, because an attacker with domain-administrator rights will otherwise simply delete them before launching the encryption.",
        ],
        el: [
          "Η **μηχανική ανθεκτικότητας** αποδέχεται ότι ορισμένες επιθέσεις και αστοχίες θα επιτύχουν και σχεδιάζει τα συστήματα ώστε να υποβαθμίζονται ομαλά αντί να καταρρέουν. Τα εργαλεία της περιλαμβάνουν πλεονασμό χωρίς κοινά μεμονωμένα σημεία αστοχίας, δυνατότητα απομόνωσης των στοιχείων που έχουν υποστεί ζημιά και προσχεδιασμένους τρόπους περιορισμένης λειτουργίας —για παράδειγμα, ένα νοσοκομείο που μπορεί να συνεχίσει να δέχεται ασθενείς σε χαρτί όταν το ηλεκτρονικό του σύστημα δεν είναι διαθέσιμο.",
          "Τα αντίγραφα ασφαλείας αποτελούν το θεμέλιο της ανάκαμψης, και το σύγχρονο λυτρισμικό τα στοχεύει σκόπιμα. Ο κλασικός **κανόνας 3-2-1** —τρία αντίγραφα των δεδομένων, σε δύο διαφορετικούς τύπους μέσων, ένα από τα οποία εκτός εγκατάστασης— έχει γι' αυτό επεκταθεί σε **3-2-1-1-0**: τουλάχιστον ένα αντίγραφο πρέπει να είναι **εκτός σύνδεσης ή αμετάβλητο** (αποθήκευση εφάπαξ εγγραφής ή κλείδωμα αντικειμένων που ούτε ένας διαχειριστής δεν μπορεί να διαγράψει κατά την περίοδο διατήρησης), και οι επαναφορές πρέπει να δοκιμάζονται, ώστε να υπάρχουν **μηδέν** ανεπιβεβαίωτα σφάλματα. Τα συστήματα αντιγράφων ασφαλείας χρειάζονται δικά τους, ξεχωριστά διαπιστευτήρια και MFA, διότι διαφορετικά ένας επιτιθέμενος με δικαιώματα διαχειριστή τομέα απλώς θα τα διαγράψει πριν ξεκινήσει την κρυπτογράφηση.",
        ],
      },
    },
    {
      id: "13.2",
      title: { en: "Business continuity and disaster recovery: RPO and RTO", el: "Επιχειρησιακή συνέχεια και ανάκαμψη από καταστροφές: RPO και RTO" },
      body: {
        en: [
          "**Business continuity planning (BCP)** ensures that critical business functions continue during a disruption, whereas **disaster recovery (DR)** focuses on restoring the IT systems that support them. Both start with a **business impact analysis**, which identifies critical processes and the consequences of their interruption over time. Two parameters then guide technical design. The **recovery point objective (RPO)** is the maximum acceptable amount of data loss, measured in time: an RPO of one hour requires backups or replication at least hourly. The **recovery time objective (RTO)** is the maximum acceptable time to restore the service. Shorter objectives are more expensive, so they should be justified by business impact.",
          "Plans are only credible if they are exercised. **DR playbooks** describe step by step how to restore each critical system, in what order (identity services and networking usually come first) and who is responsible. They are validated through tabletop exercises, partial restore tests and full failover drills, and the measured recovery times are compared with the RTO. A plan that has never been tested should be assumed not to work.",
        ],
        el: [
          "Ο **σχεδιασμός επιχειρησιακής συνέχειας** (Business Continuity Planning, BCP) διασφαλίζει ότι οι κρίσιμες επιχειρησιακές λειτουργίες συνεχίζονται κατά τη διάρκεια μιας διαταραχής, ενώ η **ανάκαμψη από καταστροφές** (Disaster Recovery, DR) εστιάζει στην αποκατάσταση των συστημάτων πληροφορικής που τις υποστηρίζουν. Και οι δύο ξεκινούν με μια **ανάλυση επιχειρησιακών επιπτώσεων**, η οποία εντοπίζει τις κρίσιμες διεργασίες και τις συνέπειες της διακοπής τους σε βάθος χρόνου. Δύο παράμετροι καθοδηγούν στη συνέχεια τον τεχνικό σχεδιασμό. Ο **στόχος σημείου ανάκαμψης** (Recovery Point Objective, RPO) είναι η μέγιστη αποδεκτή απώλεια δεδομένων, μετρούμενη σε χρόνο: RPO μίας ώρας απαιτεί αντίγραφα ή αναπαραγωγή τουλάχιστον ανά ώρα. Ο **στόχος χρόνου ανάκαμψης** (Recovery Time Objective, RTO) είναι ο μέγιστος αποδεκτός χρόνος αποκατάστασης της υπηρεσίας. Οι αυστηρότεροι στόχοι κοστίζουν περισσότερο και πρέπει, επομένως, να δικαιολογούνται από τις επιχειρησιακές επιπτώσεις.",
          "Τα σχέδια είναι αξιόπιστα μόνο εφόσον δοκιμάζονται. Τα **εγχειρίδια ανάκαμψης** (DR playbooks) περιγράφουν βήμα προς βήμα πώς αποκαθίσταται κάθε κρίσιμο σύστημα, με ποια σειρά (οι υπηρεσίες ταυτότητας και η δικτύωση προηγούνται συνήθως) και ποιος είναι υπεύθυνος. Επικυρώνονται μέσω ασκήσεων επί χάρτου (tabletop), μερικών δοκιμών επαναφοράς και πλήρων ασκήσεων μετάπτωσης, και οι μετρούμενοι χρόνοι ανάκαμψης συγκρίνονται με τον RTO. Ένα σχέδιο που δεν έχει δοκιμαστεί ποτέ πρέπει να θεωρείται ότι δεν λειτουργεί.",
        ],
      },
    },
    {
      id: "13.3",
      title: { en: "Enterprise risk management in practice", el: "Διαχείριση επιχειρησιακού κινδύνου στην πράξη" },
      body: {
        en: [
          "Chapter 1 defined risk; governance turns that definition into a management process. A **risk register** records each risk with a clear statement (*threat* exploiting *vulnerability* causing *impact* on *asset*), an owner, the existing controls, ratings of likelihood and impact, the chosen treatment and a review date. A **risk matrix**—commonly five by five—helps to visualise and compare risks, although qualitative scales should be defined carefully so that 'likely' means the same thing to everyone. Quantitative methods such as FAIR express risk in monetary terms and can support investment decisions.",
          "Every risk must receive an explicit **treatment decision**: *mitigate* with additional controls, *transfer* through insurance or contracts, *avoid* by discontinuing the activity, or *accept* it formally. Acceptance is legitimate only when it is made by someone with the authority to bear the consequences, is documented, and is reviewed periodically. Technical scores such as CVSS (Chapter 10) are inputs to this process, not substitutes for it.",
        ],
        el: [
          "Το Κεφάλαιο 1 όρισε τον κίνδυνο· η διακυβέρνηση μετατρέπει αυτόν τον ορισμό σε διαδικασία διαχείρισης. Ένα **μητρώο κινδύνων** καταγράφει κάθε κίνδυνο με σαφή διατύπωση (*απειλή* που εκμεταλλεύεται *ευπάθεια* προκαλώντας *επίπτωση* σε *περιουσιακό στοιχείο*), υπεύθυνο, υφιστάμενα μέτρα, εκτιμήσεις πιθανότητας και επίπτωσης, την επιλεγμένη αντιμετώπιση και ημερομηνία επανεξέτασης. Ένας **πίνακας κινδύνων** —συνήθως πέντε επί πέντε— βοηθά στην οπτικοποίηση και σύγκριση των κινδύνων, αν και οι ποιοτικές κλίμακες πρέπει να ορίζονται προσεκτικά, ώστε το «πιθανό» να σημαίνει το ίδιο για όλους. Ποσοτικές μέθοδοι όπως η FAIR εκφράζουν τον κίνδυνο σε χρηματικούς όρους και μπορούν να υποστηρίξουν αποφάσεις επενδύσεων.",
          "Κάθε κίνδυνος πρέπει να λαμβάνει ρητή **απόφαση αντιμετώπισης**: *μείωση* με πρόσθετα μέτρα, *μεταφορά* μέσω ασφάλισης ή συμβάσεων, *αποφυγή* με διακοπή της δραστηριότητας ή επίσημη *αποδοχή*. Η αποδοχή είναι θεμιτή μόνο όταν αποφασίζεται από πρόσωπο με την αρμοδιότητα να φέρει τις συνέπειες, τεκμηριώνεται και επανεξετάζεται περιοδικά. Οι τεχνικές βαθμολογίες, όπως το CVSS (Κεφάλαιο 10), αποτελούν δεδομένα εισόδου αυτής της διαδικασίας και όχι υποκατάστατό της.",
        ],
      },
    },
    {
      id: "13.4",
      title: { en: "Frameworks and regulation: NIST CSF 2.0, ISO/IEC 27001, CIS, GDPR and NIS2", el: "Πλαίσια και ρυθμίσεις: NIST CSF 2.0, ISO/IEC 27001, CIS, ΓΚΠΔ και NIS2" },
      body: {
        en: [
          "Frameworks give structure to a security programme. The **NIST Cybersecurity Framework 2.0** (2024) organises outcomes into six functions: *Govern*, *Identify*, *Protect*, *Detect*, *Respond* and *Recover*; the new Govern function emphasises that cybersecurity is a leadership responsibility. **ISO/IEC 27001** specifies the requirements of an *information security management system* (ISMS)—a cycle of risk assessment, control selection, monitoring and improvement—and is the basis for independent certification; its Annex A lists 93 reference controls. The **CIS Critical Security Controls** are a prioritised set of concrete technical safeguards, grouped into implementation groups for organisations of different maturity.",
          "Regulation makes certain practices mandatory. The EU **General Data Protection Regulation (GDPR)** requires appropriate security for personal data, data protection by design and by default, and notification of personal-data breaches to the supervisory authority within 72 hours. The **NIS2 Directive** extends cybersecurity obligations to a wide range of essential and important entities—energy, health, transport, digital infrastructure and more—requiring risk-management measures, supply-chain security, incident reporting (an early warning within 24 hours) and personal accountability of management bodies. In the United States, **HIPAA** imposes comparable safeguards on health information.",
          {
            t: "table",
            caption: "Table 13.1 — Frameworks and regulations at a glance",
            head: ["Instrument", "Nature", "Primary focus", "Typical use"],
            rows: [
              ["NIST CSF 2.0", "Voluntary framework", "Outcomes across six functions", "Programme structure, maturity profiling"],
              ["ISO/IEC 27001", "Certifiable standard", "Management system (ISMS)", "Certification, customer assurance"],
              ["CIS Controls v8", "Prioritised control set", "Concrete technical safeguards", "Implementation roadmap"],
              ["GDPR", "EU regulation (binding)", "Personal-data protection", "Legal compliance, breach notification"],
              ["NIS2", "EU directive (binding)", "Security of essential/important entities", "Risk management, incident reporting"],
            ],
          },
        ],
        el: [
          "Τα πλαίσια δίνουν δομή σε ένα πρόγραμμα ασφάλειας. Το **NIST Cybersecurity Framework 2.0** (2024) οργανώνει τα επιδιωκόμενα αποτελέσματα σε έξι λειτουργίες: *Διακυβέρνηση*, *Αναγνώριση*, *Προστασία*, *Ανίχνευση*, *Απόκριση* και *Ανάκαμψη*· η νέα λειτουργία της Διακυβέρνησης υπογραμμίζει ότι η κυβερνοασφάλεια είναι ευθύνη της ηγεσίας. Το **ISO/IEC 27001** ορίζει τις απαιτήσεις ενός *συστήματος διαχείρισης ασφάλειας πληροφοριών* (ΣΔΑΠ/ISMS) —ενός κύκλου αξιολόγησης κινδύνου, επιλογής μέτρων, παρακολούθησης και βελτίωσης— και αποτελεί τη βάση για ανεξάρτητη πιστοποίηση· το Παράρτημα Α περιλαμβάνει 93 μέτρα αναφοράς. Τα **CIS Critical Security Controls** είναι ένα ιεραρχημένο σύνολο συγκεκριμένων τεχνικών μέτρων, ομαδοποιημένων σε ομάδες υλοποίησης για οργανισμούς διαφορετικής ωριμότητας.",
          "Το κανονιστικό πλαίσιο καθιστά ορισμένες πρακτικές υποχρεωτικές. Ο **Γενικός Κανονισμός για την Προστασία Δεδομένων** (ΓΚΠΔ/GDPR) της ΕΕ απαιτεί κατάλληλη ασφάλεια για τα προσωπικά δεδομένα, προστασία δεδομένων ήδη από τον σχεδιασμό και εξ ορισμού, καθώς και γνωστοποίηση των παραβιάσεων προσωπικών δεδομένων στην εποπτική αρχή εντός 72 ωρών. Η **Οδηγία NIS2** επεκτείνει τις υποχρεώσεις κυβερνοασφάλειας σε ευρύ φάσμα βασικών και σημαντικών οντοτήτων —ενέργεια, υγεία, μεταφορές, ψηφιακές υποδομές κ.ά.— απαιτώντας μέτρα διαχείρισης κινδύνου, ασφάλεια της εφοδιαστικής αλυσίδας, αναφορά περιστατικών (έγκαιρη προειδοποίηση εντός 24 ωρών) και προσωπική λογοδοσία των διοικητικών οργάνων. Στις Ηνωμένες Πολιτείες, ο νόμος **HIPAA** επιβάλλει ανάλογες διασφαλίσεις για τις πληροφορίες υγείας.",
          {
            t: "table",
            caption: "Πίνακας 13.1 — Πλαίσια και κανονιστικά κείμενα με μια ματιά",
            head: ["Κείμενο", "Φύση", "Κύρια εστίαση", "Τυπική χρήση"],
            rows: [
              ["NIST CSF 2.0", "Προαιρετικό πλαίσιο", "Αποτελέσματα σε έξι λειτουργίες", "Δομή προγράμματος, αποτύπωση ωριμότητας"],
              ["ISO/IEC 27001", "Πιστοποιήσιμο πρότυπο", "Σύστημα διαχείρισης (ΣΔΑΠ)", "Πιστοποίηση, διαβεβαίωση πελατών"],
              ["CIS Controls v8", "Ιεραρχημένο σύνολο μέτρων", "Συγκεκριμένα τεχνικά μέτρα", "Οδικός χάρτης υλοποίησης"],
              ["ΓΚΠΔ", "Κανονισμός ΕΕ (δεσμευτικός)", "Προστασία προσωπικών δεδομένων", "Νομική συμμόρφωση, γνωστοποίηση παραβιάσεων"],
              ["NIS2", "Οδηγία ΕΕ (δεσμευτική)", "Ασφάλεια βασικών/σημαντικών οντοτήτων", "Διαχείριση κινδύνου, αναφορά περιστατικών"],
            ],
          },
        ],
      },
    },
    {
      id: "13.5",
      title: { en: "Security metrics: signal versus vanity", el: "Δείκτες ασφάλειας: ουσιαστική πληροφορία έναντι βιτρίνας" },
      body: {
        en: [
          "Leadership needs evidence that security investment reduces risk. Many commonly reported numbers are **vanity metrics**: 'millions of attacks blocked' mostly counts automated internet noise, and 'number of tools deployed' says nothing about their effectiveness. **Meaningful metrics** are tied to decisions and outcomes: the percentage of critical assets covered by EDR and logging; the time to patch internet-facing vulnerabilities that are known to be exploited; MTTD and MTTR (Chapter 11); the phishing report rate (Chapter 5); the proportion of privileged accounts protected by phishing-resistant MFA; and the success rate and duration of backup restore tests compared with the RTO.",
          "Good metrics have a defined data source, a target and a trend over time, and each one should suggest an action if it moves in the wrong direction. Reporting a small number of such indicators consistently is far more useful to a board than a dashboard of hundreds of unexplained figures.",
        ],
        el: [
          "Η διοίκηση χρειάζεται τεκμήρια ότι η επένδυση στην ασφάλεια μειώνει τον κίνδυνο. Πολλοί συνήθως αναφερόμενοι αριθμοί είναι **δείκτες βιτρίνας**: τα «εκατομμύρια επιθέσεων που αποκλείστηκαν» μετρούν κυρίως τον αυτοματοποιημένο «θόρυβο» του διαδικτύου, ενώ ο «αριθμός των εργαλείων που έχουν εγκατασταθεί» δεν λέει τίποτα για την αποτελεσματικότητά τους. Οι **ουσιαστικοί δείκτες** συνδέονται με αποφάσεις και αποτελέσματα: το ποσοστό των κρίσιμων περιουσιακών στοιχείων που καλύπτονται από EDR και καταγραφή· ο χρόνος εφαρμογής ενημερώσεων για ευπάθειες σε συστήματα εκτεθειμένα στο διαδίκτυο που είναι γνωστό ότι αποτελούν αντικείμενο εκμετάλλευσης· οι MTTD και MTTR (Κεφάλαιο 11)· το ποσοστό αναφοράς μηνυμάτων ψαρέματος (Κεφάλαιο 5)· το ποσοστό των προνομιούχων λογαριασμών που προστατεύονται με MFA ανθεκτικό στο ψάρεμα· και το ποσοστό επιτυχίας και η διάρκεια των δοκιμών επαναφοράς αντιγράφων ασφαλείας σε σύγκριση με τον RTO.",
          "Οι καλοί δείκτες έχουν καθορισμένη πηγή δεδομένων, στόχο και τάση στον χρόνο, και ο καθένας πρέπει να υποδεικνύει μια ενέργεια αν κινηθεί προς τη λάθος κατεύθυνση. Η συνεπής αναφορά λίγων τέτοιων δεικτών είναι πολύ πιο χρήσιμη για ένα διοικητικό συμβούλιο από έναν πίνακα με εκατοντάδες ανεξήγητα νούμερα.",
        ],
      },
    },
    {
      id: "13.6",
      title: { en: "Critical infrastructure and operational technology", el: "Κρίσιμες υποδομές και επιχειρησιακή τεχνολογία" },
      body: {
        en: [
          "**Operational technology (OT)**—industrial control systems (ICS), SCADA systems and programmable logic controllers that run power grids, water treatment, manufacturing and medical devices—has priorities different from office IT. Safety and availability come first, systems may run for twenty years or more, and many industrial protocols such as Modbus were designed without authentication. Patching may require stopping a production line, and an aggressive network scan can crash a fragile controller. As Stuxnet and later attacks on energy grids showed, consequences can be physical.",
          "OT security therefore relies heavily on architecture. The **Purdue model** divides the environment into levels, from physical processes (level 0) and controllers (level 1) up to enterprise IT (levels 4–5). The standard **ISA/IEC 62443** groups assets into *zones* and permits communication only through controlled *conduits*, with an industrial demilitarised zone between IT and OT. Passive network monitoring designed for industrial protocols provides visibility without disturbing sensitive devices, while strict control of remote vendor access closes one of the most frequently abused entry points.",
        ],
        el: [
          "Η **επιχειρησιακή τεχνολογία** (Operational Technology, OT) —βιομηχανικά συστήματα ελέγχου (ICS), συστήματα SCADA και προγραμματιζόμενοι λογικοί ελεγκτές που λειτουργούν δίκτυα ηλεκτρικής ενέργειας, εγκαταστάσεις επεξεργασίας νερού, παραγωγικές μονάδες και ιατροτεχνολογικά προϊόντα— έχει προτεραιότητες διαφορετικές από την πληροφορική γραφείου. Η ασφάλεια των ανθρώπων και η διαθεσιμότητα προηγούνται, τα συστήματα μπορεί να λειτουργούν για είκοσι χρόνια ή και περισσότερο, και πολλά βιομηχανικά πρωτόκολλα, όπως το Modbus, σχεδιάστηκαν χωρίς έλεγχο ταυτότητας. Η εφαρμογή ενημερώσεων μπορεί να απαιτεί διακοπή μιας γραμμής παραγωγής, ενώ μια επιθετική δικτυακή σάρωση μπορεί να θέσει εκτός λειτουργίας έναν ευαίσθητο ελεγκτή. Όπως έδειξαν το Stuxnet και μεταγενέστερες επιθέσεις σε ενεργειακά δίκτυα, οι συνέπειες μπορεί να είναι φυσικές.",
          "Η ασφάλεια OT βασίζεται επομένως σε μεγάλο βαθμό στην αρχιτεκτονική. Το **μοντέλο Purdue** διαιρεί το περιβάλλον σε επίπεδα, από τις φυσικές διεργασίες (επίπεδο 0) και τους ελεγκτές (επίπεδο 1) έως την επιχειρησιακή πληροφορική (επίπεδα 4–5). Το πρότυπο **ISA/IEC 62443** ομαδοποιεί τα στοιχεία σε *ζώνες* και επιτρέπει την επικοινωνία μόνο μέσω ελεγχόμενων *αγωγών* (conduits), με μια βιομηχανική αποστρατιωτικοποιημένη ζώνη μεταξύ IT και OT. Η παθητική παρακολούθηση του δικτύου, σχεδιασμένη για βιομηχανικά πρωτόκολλα, παρέχει ορατότητα χωρίς να διαταράσσει τις ευαίσθητες συσκευές, ενώ ο αυστηρός έλεγχος της απομακρυσμένης πρόσβασης των προμηθευτών κλείνει ένα από τα σημεία εισόδου που γίνονται συχνότερα αντικείμενο κατάχρησης.",
        ],
      },
    },
    {
      id: "13.7",
      title: { en: "Zero Trust, cloud security and emerging threats", el: "Μηδενική εμπιστοσύνη, ασφάλεια νέφους και αναδυόμενες απειλές" },
      body: {
        en: [
          "**Zero Trust Architecture** (NIST SP 800-207) abandons the idea that anything inside the network perimeter is trustworthy. Every access request is evaluated explicitly, using the identity of the user, the health of the device and the sensitivity of the resource; access is granted with least privilege, for a limited session; and the design assumes that a breach has already occurred. A *policy decision point* evaluates each request, and a *policy enforcement point* in front of each resource applies the decision. Zero Trust is a journey rather than a product: organisations typically progress from strong identity and MFA, through device compliance and micro-segmentation, to continuous, risk-adaptive access decisions.",
          "In the **cloud**, security follows a **shared responsibility model**: the provider secures the underlying infrastructure, while the customer remains responsible for identities, configuration and data. Most cloud breaches result from customer-side misconfigurations—publicly readable storage buckets, excessive permissions, exposed keys—which *cloud security posture management* tools are designed to detect. Containers add their own requirements: minimal, scanned images, non-root execution, and default-deny Kubernetes network policies. Looking ahead, defenders must prepare for the transition to **post-quantum cryptography**, for AI-assisted phishing and deepfake-based fraud, and for continued attacks on the software supply chain. The principles of this book—least privilege, defence in depth, verification and resilience—remain the most reliable guide through these changes.",
        ],
        el: [
          "Η **αρχιτεκτονική μηδενικής εμπιστοσύνης** (Zero Trust Architecture, NIST SP 800-207) εγκαταλείπει την ιδέα ότι οτιδήποτε βρίσκεται μέσα στην περίμετρο του δικτύου είναι αξιόπιστο. Κάθε αίτημα πρόσβασης αξιολογείται ρητά, με βάση την ταυτότητα του χρήστη, την κατάσταση της συσκευής και την ευαισθησία του πόρου· η πρόσβαση παραχωρείται με ελάχιστο προνόμιο, για περιορισμένη συνεδρία· και ο σχεδιασμός προϋποθέτει ότι μια παραβίαση έχει ήδη συμβεί. Ένα *σημείο λήψης απόφασης πολιτικής* αξιολογεί κάθε αίτημα και ένα *σημείο επιβολής πολιτικής* μπροστά από κάθε πόρο εφαρμόζει την απόφαση. Η μηδενική εμπιστοσύνη είναι πορεία και όχι προϊόν: οι οργανισμοί συνήθως προχωρούν από την ισχυρή ταυτότητα και το MFA, στη συμμόρφωση των συσκευών και στη μικροκατάτμηση και, τέλος, σε συνεχείς αποφάσεις πρόσβασης προσαρμοσμένες στον κίνδυνο.",
          "Στο **νέφος**, η ασφάλεια ακολουθεί ένα **μοντέλο κοινής ευθύνης**: ο πάροχος προστατεύει την υποκείμενη υποδομή, ενώ ο πελάτης παραμένει υπεύθυνος για τις ταυτότητες, τη διαμόρφωση και τα δεδομένα. Οι περισσότερες παραβιάσεις στο νέφος οφείλονται σε λανθασμένες ρυθμίσεις από την πλευρά του πελάτη —δημόσια αναγνώσιμους χώρους αποθήκευσης, υπερβολικά δικαιώματα, εκτεθειμένα κλειδιά— τις οποίες έχουν σχεδιαστεί να εντοπίζουν τα εργαλεία *διαχείρισης της στάσης ασφάλειας στο νέφος* (CSPM). Τα κοντέινερ προσθέτουν τις δικές τους απαιτήσεις: ελάχιστα και ελεγμένα είδωλα, εκτέλεση χωρίς δικαιώματα root και πολιτικές δικτύου Kubernetes με άρνηση εξ ορισμού. Κοιτάζοντας μπροστά, οι αμυνόμενοι πρέπει να προετοιμαστούν για τη μετάβαση στη **μετακβαντική κρυπτογραφία**, για το ηλεκτρονικό ψάρεμα με υποβοήθηση τεχνητής νοημοσύνης και τις απάτες με deepfakes, καθώς και για τη συνέχιση των επιθέσεων στην εφοδιαστική αλυσίδα λογισμικού. Οι αρχές αυτού του βιβλίου —ελάχιστο προνόμιο, άμυνα σε βάθος, επαλήθευση και ανθεκτικότητα— παραμένουν ο πιο αξιόπιστος οδηγός μέσα σε αυτές τις αλλαγές.",
        ],
      },
    },
  ],
  terms: {
    en: [
      { term: "3-2-1-1-0", def: "Backup rule: 3 copies, 2 media, 1 off-site, 1 offline/immutable, 0 unverified restore errors." },
      { term: "RPO / RTO", def: "Maximum acceptable data loss (RPO) and maximum acceptable downtime (RTO)." },
      { term: "Risk register", def: "A structured record of risks, owners, controls, ratings and treatment decisions." },
      { term: "ISMS", def: "Information security management system, as specified by ISO/IEC 27001." },
      { term: "Purdue model", def: "Layered reference architecture separating industrial control levels from enterprise IT." },
      { term: "Shared responsibility", def: "Division of security duties between a cloud provider and its customer." },
    ],
    el: [
      { term: "3-2-1-1-0", def: "Κανόνας αντιγράφων: 3 αντίγραφα, 2 μέσα, 1 εκτός εγκατάστασης, 1 εκτός σύνδεσης/αμετάβλητο, 0 ανεπιβεβαίωτα σφάλματα επαναφοράς." },
      { term: "RPO / RTO", def: "Μέγιστη αποδεκτή απώλεια δεδομένων (RPO) και μέγιστος αποδεκτός χρόνος διακοπής (RTO)." },
      { term: "Μητρώο κινδύνων", def: "Δομημένη καταγραφή κινδύνων, υπευθύνων, μέτρων, εκτιμήσεων και αποφάσεων αντιμετώπισης." },
      { term: "ΣΔΑΠ (ISMS)", def: "Σύστημα διαχείρισης ασφάλειας πληροφοριών, όπως ορίζεται στο ISO/IEC 27001." },
      { term: "Μοντέλο Purdue", def: "Πολυεπίπεδη αρχιτεκτονική αναφοράς που διαχωρίζει τα επίπεδα βιομηχανικού ελέγχου από την επιχειρησιακή πληροφορική." },
      { term: "Κοινή ευθύνη", def: "Κατανομή των καθηκόντων ασφάλειας μεταξύ ενός παρόχου νέφους και του πελάτη του." },
    ],
  },
  summary: {
    en: [
      "Resilience assumes failure: immutable, tested backups with separate credentials are the core of ransomware recovery.",
      "BCP and DR are driven by business impact, expressed through RPO and RTO, and are credible only when exercised.",
      "Risk management records, rates and explicitly treats each risk, with acceptance decided by accountable owners.",
      "NIST CSF 2.0, ISO/IEC 27001 and CIS Controls structure security programmes; GDPR and NIS2 make key practices mandatory.",
      "OT security, Zero Trust and cloud shared responsibility extend the book's core principles to new environments.",
    ],
    el: [
      "Η ανθεκτικότητα προϋποθέτει την αστοχία: τα αμετάβλητα, δοκιμασμένα αντίγραφα ασφαλείας με ξεχωριστά διαπιστευτήρια αποτελούν τον πυρήνα της ανάκαμψης από λυτρισμικό.",
      "Η επιχειρησιακή συνέχεια και η ανάκαμψη από καταστροφές καθοδηγούνται από τις επιχειρησιακές επιπτώσεις, εκφράζονται μέσω RPO και RTO και είναι αξιόπιστες μόνο όταν δοκιμάζονται.",
      "Η διαχείριση κινδύνου καταγράφει, αξιολογεί και αντιμετωπίζει ρητά κάθε κίνδυνο, με την αποδοχή να αποφασίζεται από υπόλογους υπευθύνους.",
      "Τα NIST CSF 2.0, ISO/IEC 27001 και CIS Controls δομούν τα προγράμματα ασφάλειας· ο ΓΚΠΔ και η NIS2 καθιστούν υποχρεωτικές βασικές πρακτικές.",
      "Η ασφάλεια OT, η μηδενική εμπιστοσύνη και η κοινή ευθύνη στο νέφος επεκτείνουν τις βασικές αρχές του βιβλίου σε νέα περιβάλλοντα.",
    ],
  },
  questions: {
    en: [
      "Why does the 3-2-1 rule alone not guarantee recovery from ransomware? What do the additional '1' and '0' add?",
      "An online shop can tolerate losing 15 minutes of orders and being offline for 2 hours. Translate this into RPO/RTO and propose a technical design.",
      "Who should be allowed to accept a high residual risk, and why must acceptance be documented?",
      "Explain why active vulnerability scanning common in IT may be inappropriate in an OT environment.",
    ],
    el: [
      "Γιατί ο κανόνας 3-2-1 από μόνος του δεν εγγυάται την ανάκαμψη από λυτρισμικό; Τι προσθέτουν το επιπλέον «1» και το «0»;",
      "Ένα ηλεκτρονικό κατάστημα μπορεί να ανεχθεί απώλεια παραγγελιών 15 λεπτών και διακοπή λειτουργίας 2 ωρών. Μετατρέψτε αυτά σε RPO/RTO και προτείνετε τεχνικό σχεδιασμό.",
      "Ποιος πρέπει να επιτρέπεται να αποδεχθεί έναν υψηλό υπολειπόμενο κίνδυνο και γιατί η αποδοχή πρέπει να τεκμηριώνεται;",
      "Εξηγήστε γιατί η ενεργητική σάρωση ευπαθειών, συνήθης στην πληροφορική, μπορεί να είναι ακατάλληλη σε περιβάλλον OT.",
    ],
  },
};

export default ch13;

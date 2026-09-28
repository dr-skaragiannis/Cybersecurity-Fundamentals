import type { Chapter } from "../types";

const ch10: Chapter = {
  n: 10,
  part: 3,
  title: { en: "Security Testing: SAST, DAST, Vulnerability Assessment and Penetration Testing", el: "Έλεγχος Ασφάλειας: SAST, DAST, Αξιολόγηση Ευπαθειών και Δοκιμές Διείσδυσης" },
  subtitle: {
    en: "Static analysis · Dynamic analysis · Vulnerability management lifecycle · Penetration testing methodology and ethics · CVSS and professional reporting",
    el: "Στατική ανάλυση · Δυναμική ανάλυση · Κύκλος διαχείρισης ευπαθειών · Μεθοδολογία και δεοντολογία δοκιμών διείσδυσης · CVSS και επαγγελματική αναφορά",
  },
  level: { en: "Intermediate–Advanced · Assurance", el: "Μεσαίο–Προχωρημένο επίπεδο · Διασφάλιση" },
  hours: "7–9",
  intro: {
    en: [
      "Chapter 9 described how to build software securely; this chapter asks how we can *verify* that it is secure. No single technique finds every weakness. Static analysis reads code without running it, dynamic analysis probes a running application from outside, vulnerability assessment surveys an entire environment for known weaknesses, and penetration testing demonstrates what a skilled adversary could actually achieve. Each answers a different question, at a different cost and stage.",
      "Because several of these activities use genuinely offensive techniques, the chapter gives equal weight to method and to ethics. It explains the legal foundations of authorised testing, the boundaries of post-exploitation activity and the handling of sensitive evidence, and it shows how findings should be scored and reported so that they lead to remediation rather than to an unread document.",
    ],
    el: [
      "Το Κεφάλαιο 9 περιέγραψε πώς αναπτύσσεται λογισμικό με ασφάλεια· το παρόν κεφάλαιο εξετάζει πώς μπορούμε να *επαληθεύσουμε* ότι είναι ασφαλές. Καμία μεμονωμένη τεχνική δεν εντοπίζει κάθε αδυναμία. Η στατική ανάλυση διαβάζει τον κώδικα χωρίς να τον εκτελεί, η δυναμική ανάλυση εξετάζει μια εφαρμογή σε λειτουργία από έξω, η αξιολόγηση ευπαθειών ελέγχει ολόκληρο ένα περιβάλλον για γνωστές αδυναμίες και η δοκιμή διείσδυσης αποδεικνύει τι θα μπορούσε πράγματι να επιτύχει ένας ικανός αντίπαλος. Καθεμιά απαντά σε διαφορετικό ερώτημα, με διαφορετικό κόστος και σε διαφορετικό στάδιο.",
      "Επειδή ορισμένες από αυτές τις δραστηριότητες χρησιμοποιούν πραγματικά επιθετικές τεχνικές, το κεφάλαιο δίνει ίση βαρύτητα στη μέθοδο και στη δεοντολογία. Εξηγεί τα νομικά θεμέλια του εξουσιοδοτημένου ελέγχου, τα όρια της δραστηριότητας μετά την εκμετάλλευση και τον χειρισμό ευαίσθητων αποδεικτικών στοιχείων, και δείχνει πώς πρέπει να βαθμολογούνται και να αναφέρονται τα ευρήματα, ώστε να οδηγούν σε αποκατάσταση και όχι σε ένα έγγραφο που δεν διαβάζει κανείς.",
    ],
  },
  outcomes: {
    en: [
      "Compare SAST, DAST, vulnerability assessment and penetration testing in terms of scope, strengths and limitations.",
      "Describe the vulnerability management lifecycle and prioritise findings using CVSS and exploitation likelihood.",
      "Explain penetration-testing models, phases and recognised methodologies.",
      "State the legal and ethical requirements of authorised testing, including rules of engagement.",
      "Write a finding that combines evidence, risk rating and actionable remediation.",
    ],
    el: [
      "Να συγκρίνετε τα SAST, DAST, την αξιολόγηση ευπαθειών και τη δοκιμή διείσδυσης ως προς το εύρος, τα πλεονεκτήματα και τους περιορισμούς τους.",
      "Να περιγράφετε τον κύκλο διαχείρισης ευπαθειών και να ιεραρχείτε τα ευρήματα με βάση το CVSS και την πιθανότητα εκμετάλλευσης.",
      "Να εξηγείτε τα μοντέλα, τις φάσεις και τις αναγνωρισμένες μεθοδολογίες των δοκιμών διείσδυσης.",
      "Να διατυπώνετε τις νομικές και δεοντολογικές απαιτήσεις του εξουσιοδοτημένου ελέγχου, συμπεριλαμβανομένων των κανόνων εμπλοκής.",
      "Να συντάσσετε ένα εύρημα που συνδυάζει τεκμηρίωση, αξιολόγηση κινδύνου και εφαρμόσιμη πρόταση αποκατάστασης.",
    ],
  },
  sections: [
    {
      id: "10.1",
      title: { en: "Static application security testing (SAST)", el: "Στατικός έλεγχος ασφάλειας εφαρμογών (SAST)" },
      body: {
        en: [
          "**Static application security testing (SAST)** analyses source code, bytecode or binaries *without executing them*. It is a white-box technique: the tool sees the entire code base. Modern SAST tools build a model of the program and perform **taint analysis**, tracking data from *sources* (such as HTTP parameters) to dangerous *sinks* (such as SQL execution or HTML output). If tainted data reach a sink without passing through a recognised *sanitiser*, the tool reports a potential vulnerability together with the exact line of code.",
          "SAST's great advantage is timing: it can run in the developer's editor and on every commit, long before an application is deployed. Its main weakness is precision. Because it cannot observe runtime behaviour, it produces **false positives** (reported issues that are not exploitable) and misses flaws that depend on configuration or on business logic. Successful programmes therefore tune rules to their frameworks, triage results, and treat SAST as one layer among several.",
        ],
        el: [
          "Ο **στατικός έλεγχος ασφάλειας εφαρμογών** (Static Application Security Testing, SAST) αναλύει πηγαίο κώδικα, ενδιάμεσο κώδικα ή εκτελέσιμα *χωρίς να τα εκτελεί*. Είναι τεχνική «λευκού κουτιού»: το εργαλείο έχει πρόσβαση σε ολόκληρο τον κώδικα. Τα σύγχρονα εργαλεία SAST κατασκευάζουν ένα μοντέλο του προγράμματος και εκτελούν **ανάλυση μόλυνσης** (taint analysis), παρακολουθώντας τα δεδομένα από τις *πηγές* (όπως οι παράμετροι HTTP) έως τα επικίνδυνα *σημεία κατάληξης* (όπως η εκτέλεση SQL ή η έξοδος HTML). Αν μολυσμένα δεδομένα φτάσουν σε σημείο κατάληξης χωρίς να περάσουν από αναγνωρισμένο *μηχανισμό εξυγίανσης*, το εργαλείο αναφέρει πιθανή ευπάθεια μαζί με την ακριβή γραμμή του κώδικα.",
          "Το μεγάλο πλεονέκτημα του SAST είναι ο χρόνος εφαρμογής του: μπορεί να εκτελείται στον επεξεργαστή κώδικα του προγραμματιστή και σε κάθε υποβολή, πολύ πριν εγκατασταθεί η εφαρμογή. Η κύρια αδυναμία του είναι η ακρίβεια. Επειδή δεν μπορεί να παρατηρήσει τη συμπεριφορά κατά την εκτέλεση, παράγει **ψευδώς θετικά** αποτελέσματα (αναφερόμενα ζητήματα που δεν είναι εκμεταλλεύσιμα) και παραλείπει σφάλματα που εξαρτώνται από τη διαμόρφωση ή από την επιχειρησιακή λογική. Τα επιτυχημένα προγράμματα προσαρμόζουν επομένως τους κανόνες στα πλαίσια ανάπτυξης που χρησιμοποιούν, αξιολογούν τα αποτελέσματα και αντιμετωπίζουν το SAST ως ένα από πολλά επίπεδα.",
        ],
      },
    },
    {
      id: "10.2",
      title: { en: "Dynamic application security testing (DAST)", el: "Δυναμικός έλεγχος ασφάλειας εφαρμογών (DAST)" },
      body: {
        en: [
          "**Dynamic application security testing (DAST)** examines a *running* application from the outside, as an attacker would, without access to the source code. A DAST scanner such as OWASP ZAP first *crawls* the application to discover pages, parameters and API endpoints, then sends crafted inputs and analyses the responses for signs of vulnerability—an SQL error message, a reflected script, a missing security header. Because it observes real behaviour, a DAST finding is usually genuinely exploitable, and it can detect configuration and server problems that SAST cannot see.",
          "DAST also has limits. It can test only what it manages to reach, so pages behind complex authentication or multi-step workflows may be missed, and it cannot point to the responsible line of code. It runs late in the lifecycle, against a deployed test environment. **Interactive testing (IAST)** combines the two approaches by instrumenting the application while dynamic tests run, linking each observed issue to its location in the code.",
        ],
        el: [
          "Ο **δυναμικός έλεγχος ασφάλειας εφαρμογών** (Dynamic Application Security Testing, DAST) εξετάζει μια εφαρμογή *σε λειτουργία* από έξω, όπως θα έκανε ένας επιτιθέμενος, χωρίς πρόσβαση στον πηγαίο κώδικα. Ένας σαρωτής DAST, όπως το OWASP ZAP, πρώτα *ανιχνεύει* την εφαρμογή για να ανακαλύψει σελίδες, παραμέτρους και σημεία πρόσβασης API και στη συνέχεια αποστέλλει ειδικά διαμορφωμένες εισόδους και αναλύει τις αποκρίσεις για ενδείξεις ευπάθειας —ένα μήνυμα σφάλματος SQL, ένα ανακλώμενο σενάριο, μια κεφαλίδα ασφάλειας που λείπει. Επειδή παρατηρεί την πραγματική συμπεριφορά, ένα εύρημα DAST είναι συνήθως πράγματι εκμεταλλεύσιμο, και μπορεί να εντοπίσει προβλήματα διαμόρφωσης και διακομιστή που το SAST δεν βλέπει.",
          "Το DAST έχει επίσης όρια. Μπορεί να ελέγξει μόνο όσα καταφέρνει να προσεγγίσει, οπότε σελίδες πίσω από σύνθετη ταυτοποίηση ή ροές πολλών βημάτων ενδέχεται να παραλειφθούν, και δεν μπορεί να υποδείξει την υπεύθυνη γραμμή κώδικα. Εκτελείται σε όψιμο στάδιο του κύκλου ζωής, σε εγκατεστημένο περιβάλλον δοκιμών. Ο **διαδραστικός έλεγχος** (Interactive Application Security Testing, IAST) συνδυάζει τις δύο προσεγγίσεις, εξοπλίζοντας την εφαρμογή με αισθητήρες ενώ εκτελούνται οι δυναμικές δοκιμές, ώστε κάθε παρατηρούμενο ζήτημα να συνδέεται με τη θέση του στον κώδικα.",
        ],
      },
    },
    {
      id: "10.3",
      title: { en: "The vulnerability management lifecycle", el: "Ο κύκλος διαχείρισης ευπαθειών" },
      body: {
        en: [
          "**Vulnerability assessment** systematically identifies known weaknesses—missing patches, insecure configurations, default credentials—across networks, hosts and applications, usually with automated scanners such as Nessus, OpenVAS or Nmap scripts. It is broad but shallow: it reports what *may* be exploitable without attempting exploitation. Assessment is one stage of a continuous **vulnerability management lifecycle**: *asset discovery* (you cannot protect what you do not know you have), *scanning*, *analysis and prioritisation*, *remediation*, *verification* that the fix works, and *reporting* on trends.",
          "Prioritisation is where most programmes struggle, because scanners typically report thousands of findings. Severity alone is not enough. A sound approach combines the technical severity (CVSS), the likelihood of exploitation—for instance the **EPSS** score or inclusion in CISA's *Known Exploited Vulnerabilities* catalogue—and the business importance and exposure of the affected asset. An internet-facing server with an actively exploited vulnerability deserves attention today, even if a 'critical' finding on an isolated test machine waits.",
        ],
        el: [
          "Η **αξιολόγηση ευπαθειών** εντοπίζει συστηματικά γνωστές αδυναμίες —ενημερώσεις που λείπουν, μη ασφαλείς διαμορφώσεις, εργοστασιακά διαπιστευτήρια— σε δίκτυα, υπολογιστές και εφαρμογές, συνήθως με αυτοματοποιημένους σαρωτές όπως τα Nessus, OpenVAS ή τα σενάρια του Nmap. Είναι εκτενής αλλά ρηχή: αναφέρει τι *ενδέχεται* να είναι εκμεταλλεύσιμο χωρίς να επιχειρεί εκμετάλλευση. Η αξιολόγηση αποτελεί ένα στάδιο του συνεχούς **κύκλου διαχείρισης ευπαθειών**: *ανακάλυψη περιουσιακών στοιχείων* (δεν μπορείς να προστατεύσεις ό,τι δεν γνωρίζεις ότι έχεις), *σάρωση*, *ανάλυση και ιεράρχηση*, *αποκατάσταση*, *επαλήθευση* ότι η διόρθωση λειτουργεί και *αναφορά* των τάσεων.",
          "Η ιεράρχηση είναι το σημείο όπου δυσκολεύονται τα περισσότερα προγράμματα, επειδή οι σαρωτές αναφέρουν συνήθως χιλιάδες ευρήματα. Η σοβαρότητα από μόνη της δεν αρκεί. Μια τεκμηριωμένη προσέγγιση συνδυάζει την τεχνική σοβαρότητα (CVSS), την πιθανότητα εκμετάλλευσης —για παράδειγμα τη βαθμολογία **EPSS** ή την καταχώριση στον κατάλογο *Known Exploited Vulnerabilities* της CISA— και την επιχειρησιακή σημασία και έκθεση του επηρεαζόμενου στοιχείου. Ένας διακομιστής εκτεθειμένος στο διαδίκτυο με ευπάθεια που εκμεταλλεύονται ενεργά οι επιτιθέμενοι χρειάζεται προσοχή σήμερα, ακόμη κι αν ένα «κρίσιμο» εύρημα σε ένα απομονωμένο μηχάνημα δοκιμών περιμένει.",
        ],
      },
    },
    {
      id: "10.4",
      title: { en: "Penetration testing: models, phases, ethics and frameworks", el: "Δοκιμές διείσδυσης: μοντέλα, φάσεις, δεοντολογία και πλαίσια" },
      body: {
        en: [
          "A **penetration test** is an authorised, simulated attack that attempts to exploit vulnerabilities in order to demonstrate their real impact. Tests are classified by the knowledge given to the tester: **black-box** (no prior information, like an external attacker), **grey-box** (some information, such as a user account) and **white-box** (full documentation and source code, which gives the most thorough coverage in the available time). A typical engagement proceeds through *pre-engagement* and scoping, *reconnaissance*, *scanning and enumeration*, *exploitation*, *post-exploitation*, and *reporting*. Recognised methodologies such as PTES, the OWASP Web Security Testing Guide, OSSTMM and NIST SP 800-115 structure these phases and make results repeatable.",
          "Legality rests entirely on **authorisation**. Before any testing begins, the client must sign a contract and **rules of engagement** that define the scope (which systems, addresses and applications), the permitted techniques, the testing windows, emergency contacts and how sensitive data will be handled. Testing a system outside the agreed scope—even one that seems obviously related—is unauthorised access. Professional testers also avoid destructive actions and stop immediately if they encounter evidence of a real, ongoing compromise.",
        ],
        el: [
          "Μια **δοκιμή διείσδυσης** είναι μια εξουσιοδοτημένη, προσομοιωμένη επίθεση που επιχειρεί να εκμεταλλευτεί ευπάθειες, ώστε να αποδείξει την πραγματική τους επίπτωση. Οι δοκιμές κατατάσσονται με βάση τη γνώση που δίνεται στον ελεγκτή: **μαύρου κουτιού** (χωρίς προηγούμενη πληροφόρηση, όπως ένας εξωτερικός επιτιθέμενος), **γκρίζου κουτιού** (ορισμένες πληροφορίες, όπως ένας λογαριασμός χρήστη) και **λευκού κουτιού** (πλήρης τεκμηρίωση και πηγαίος κώδικας, που προσφέρει την πληρέστερη κάλυψη στον διαθέσιμο χρόνο). Μια τυπική ανάθεση εξελίσσεται σε φάσεις: *προετοιμασία* και καθορισμός πεδίου, *αναγνώριση*, *σάρωση και απαρίθμηση*, *εκμετάλλευση*, *δραστηριότητα μετά την εκμετάλλευση* και *αναφορά*. Αναγνωρισμένες μεθοδολογίες, όπως οι PTES, OWASP Web Security Testing Guide, OSSTMM και NIST SP 800-115, δομούν αυτές τις φάσεις και καθιστούν τα αποτελέσματα επαναλήψιμα.",
          "Η νομιμότητα στηρίζεται αποκλειστικά στην **εξουσιοδότηση**. Πριν ξεκινήσει οποιαδήποτε δοκιμή, ο πελάτης πρέπει να υπογράψει σύμβαση και **κανόνες εμπλοκής** (rules of engagement) που ορίζουν το πεδίο (ποια συστήματα, διευθύνσεις και εφαρμογές), τις επιτρεπόμενες τεχνικές, τα χρονικά παράθυρα, τα πρόσωπα επικοινωνίας έκτακτης ανάγκης και τον τρόπο χειρισμού ευαίσθητων δεδομένων. Ο έλεγχος ενός συστήματος εκτός του συμφωνημένου πεδίου —ακόμη κι ενός που φαίνεται προφανώς σχετικό— αποτελεί μη εξουσιοδοτημένη πρόσβαση. Οι επαγγελματίες ελεγκτές αποφεύγουν επίσης τις καταστροφικές ενέργειες και σταματούν αμέσως αν εντοπίσουν ενδείξεις πραγματικής, εν εξελίξει παραβίασης.",
        ],
      },
    },
    {
      id: "10.5",
      title: { en: "Post-exploitation boundaries and evidence handling", el: "Όρια της φάσης μετά την εκμετάλλευση και χειρισμός αποδεικτικών στοιχείων" },
      body: {
        en: [
          "The **post-exploitation** phase demonstrates the business impact of a compromise: which data could be reached, whether privileges could be escalated, and how far the tester could move through the network. It is also the phase with the greatest ethical risk. The guiding rule is **minimum necessary action**: prove access, do not exploit it. A tester who reaches a customer database should record a screenshot of the table structure and a row count, not download the records. Any persistence mechanisms, accounts or files created during the test must be documented and removed afterwards.",
          "Evidence collected during a test—screenshots, captured credentials, extracts of sensitive data—is itself sensitive. It must be stored encrypted, shared only with authorised recipients, retained only as long as the contract requires, and then securely destroyed. Where personal data are involved, the processing must also comply with data-protection law such as the GDPR (Chapter 13).",
        ],
        el: [
          "Η φάση **μετά την εκμετάλλευση** (post-exploitation) αποδεικνύει την επιχειρησιακή επίπτωση μιας παραβίασης: ποια δεδομένα θα μπορούσαν να προσπελαστούν, αν ήταν δυνατή η κλιμάκωση προνομίων και πόσο μακριά θα μπορούσε να κινηθεί ο ελεγκτής μέσα στο δίκτυο. Είναι επίσης η φάση με τον μεγαλύτερο δεοντολογικό κίνδυνο. Ο κατευθυντήριος κανόνας είναι η **ελάχιστη αναγκαία ενέργεια**: αποδεικνύεις την πρόσβαση, δεν την εκμεταλλεύεσαι. Ένας ελεγκτής που φτάνει σε μια βάση δεδομένων πελατών καταγράφει ένα στιγμιότυπο της δομής του πίνακα και τον αριθμό των εγγραφών, όχι τις ίδιες τις εγγραφές. Κάθε μηχανισμός μόνιμης παρουσίας, λογαριασμός ή αρχείο που δημιουργείται κατά τη δοκιμή πρέπει να τεκμηριώνεται και να αφαιρείται στη συνέχεια.",
          "Τα αποδεικτικά στοιχεία που συλλέγονται κατά τη δοκιμή —στιγμιότυπα, υποκλαπέντα διαπιστευτήρια, αποσπάσματα ευαίσθητων δεδομένων— είναι και τα ίδια ευαίσθητα. Πρέπει να αποθηκεύονται κρυπτογραφημένα, να κοινοποιούνται μόνο σε εξουσιοδοτημένους παραλήπτες, να διατηρούνται μόνο για όσο διάστημα απαιτεί η σύμβαση και στη συνέχεια να καταστρέφονται με ασφάλεια. Όταν εμπλέκονται προσωπικά δεδομένα, η επεξεργασία πρέπει επιπλέον να συμμορφώνεται με τη νομοθεσία προστασίας δεδομένων, όπως ο ΓΚΠΔ (Κεφάλαιο 13).",
        ],
      },
    },
    {
      id: "10.6",
      title: { en: "Scoring and reporting: CVSS, proof and remediation", el: "Βαθμολόγηση και αναφορά: CVSS, τεκμηρίωση και αποκατάσταση" },
      body: {
        en: [
          "The **Common Vulnerability Scoring System (CVSS)** expresses the technical severity of a vulnerability as a score from 0 to 10. Its *base metrics* describe how the vulnerability can be exploited (attack vector, attack complexity, privileges required, user interaction) and what its impact is on confidentiality, integrity and availability. The score is accompanied by a *vector string*, such as `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H` (score 9.8), which makes the reasoning transparent. CVSS measures severity, not risk; the organisational context must still be considered.",
          "A professional report serves two audiences. The **executive summary** explains, in non-technical language, the overall risk and the most important recommendations. Each **technical finding** contains a clear title, the affected assets, a description, step-by-step *reproduction* evidence, the severity with its CVSS vector, the business impact, and a specific, actionable **remediation**—not 'improve security', but 'replace string concatenation in `search.php` line 42 with a parameterised query and deploy a WAF rule as an interim measure'. A re-test then verifies that the fixes are effective.",
          {
            t: "table",
            caption: "Table 10.1 — Comparison of testing approaches",
            head: ["Approach", "Access", "When", "Strength", "Limitation"],
            rows: [
              ["SAST", "Source code (white box)", "During development", "Early, points to exact line", "False positives, no runtime view"],
              ["DAST", "Running app (black box)", "Test/staging", "Confirms real behaviour", "Limited coverage, late"],
              ["Vulnerability assessment", "Network, hosts, apps", "Continuous", "Broad coverage", "No proof of exploitability"],
              ["Penetration test", "Agreed scope", "Periodic / major change", "Demonstrates real impact", "Time-boxed, costly, point-in-time"],
            ],
          },
        ],
        el: [
          "Το **Common Vulnerability Scoring System (CVSS)** εκφράζει την τεχνική σοβαρότητα μιας ευπάθειας με βαθμολογία από 0 έως 10. Οι *βασικές μετρικές* του περιγράφουν πώς μπορεί να γίνει εκμετάλλευση της ευπάθειας (διάνυσμα επίθεσης, πολυπλοκότητα, απαιτούμενα προνόμια, αλληλεπίδραση χρήστη) και ποια είναι η επίπτωσή της στην εμπιστευτικότητα, την ακεραιότητα και τη διαθεσιμότητα. Η βαθμολογία συνοδεύεται από μια *συμβολοσειρά διανύσματος*, όπως `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H` (βαθμολογία 9,8), η οποία καθιστά διαφανή τη συλλογιστική. Το CVSS μετρά τη σοβαρότητα και όχι τον κίνδυνο· το πλαίσιο του οργανισμού πρέπει πάντοτε να λαμβάνεται υπόψη.",
          "Μια επαγγελματική αναφορά απευθύνεται σε δύο κοινά. Η **σύνοψη για τη διοίκηση** εξηγεί, σε μη τεχνική γλώσσα, τον συνολικό κίνδυνο και τις σημαντικότερες συστάσεις. Κάθε **τεχνικό εύρημα** περιλαμβάνει σαφή τίτλο, τα επηρεαζόμενα στοιχεία, περιγραφή, τεκμηρίωση *αναπαραγωγής* βήμα προς βήμα, τη σοβαρότητα με το διάνυσμα CVSS, την επιχειρησιακή επίπτωση και μια συγκεκριμένη, εφαρμόσιμη **πρόταση αποκατάστασης** —όχι «βελτιώστε την ασφάλεια», αλλά «αντικαταστήστε τη συνένωση συμβολοσειρών στη γραμμή 42 του `search.php` με παραμετροποιημένο ερώτημα και εφαρμόστε έναν κανόνα WAF ως προσωρινό μέτρο». Ένας επανέλεγχος επαληθεύει στη συνέχεια ότι οι διορθώσεις είναι αποτελεσματικές.",
          {
            t: "table",
            caption: "Πίνακας 10.1 — Σύγκριση προσεγγίσεων ελέγχου",
            head: ["Προσέγγιση", "Πρόσβαση", "Πότε", "Πλεονέκτημα", "Περιορισμός"],
            rows: [
              ["SAST", "Πηγαίος κώδικας (λευκό κουτί)", "Κατά την ανάπτυξη", "Πρώιμο, υποδεικνύει την ακριβή γραμμή", "Ψευδώς θετικά, καμία εικόνα εκτέλεσης"],
              ["DAST", "Εφαρμογή σε λειτουργία (μαύρο κουτί)", "Περιβάλλον δοκιμών", "Επιβεβαιώνει την πραγματική συμπεριφορά", "Περιορισμένη κάλυψη, όψιμο"],
              ["Αξιολόγηση ευπαθειών", "Δίκτυο, υπολογιστές, εφαρμογές", "Συνεχώς", "Ευρεία κάλυψη", "Καμία απόδειξη εκμεταλλευσιμότητας"],
              ["Δοκιμή διείσδυσης", "Συμφωνημένο πεδίο", "Περιοδικά / μετά από σημαντική αλλαγή", "Αποδεικνύει την πραγματική επίπτωση", "Χρονικά περιορισμένη, δαπανηρή, στιγμιαία εικόνα"],
            ],
          },
        ],
      },
    },
  ],
  terms: {
    en: [
      { term: "Taint analysis", def: "Tracking untrusted data from sources to dangerous sinks in code." },
      { term: "False positive", def: "A reported issue that is not actually exploitable." },
      { term: "EPSS", def: "Exploit Prediction Scoring System: the estimated probability that a vulnerability will be exploited." },
      { term: "Rules of engagement", def: "The signed document defining scope, methods, timing and contacts for a test." },
      { term: "Post-exploitation", def: "Activities after initial access that demonstrate impact, bounded by minimum necessary action." },
      { term: "CVSS vector", def: "A string that records each metric used to compute a CVSS score." },
    ],
    el: [
      { term: "Ανάλυση μόλυνσης", def: "Παρακολούθηση μη αξιόπιστων δεδομένων από τις πηγές έως τα επικίνδυνα σημεία κατάληξης στον κώδικα." },
      { term: "Ψευδώς θετικό", def: "Αναφερόμενο ζήτημα που στην πραγματικότητα δεν είναι εκμεταλλεύσιμο." },
      { term: "EPSS", def: "Σύστημα πρόβλεψης εκμετάλλευσης: η εκτιμώμενη πιθανότητα να γίνει εκμετάλλευση μιας ευπάθειας." },
      { term: "Κανόνες εμπλοκής", def: "Υπογεγραμμένο έγγραφο που ορίζει το πεδίο, τις μεθόδους, τον χρόνο και τα πρόσωπα επικοινωνίας μιας δοκιμής." },
      { term: "Μετά την εκμετάλλευση", def: "Δραστηριότητες μετά την αρχική πρόσβαση που αποδεικνύουν την επίπτωση, με όριο την ελάχιστη αναγκαία ενέργεια." },
      { term: "Διάνυσμα CVSS", def: "Συμβολοσειρά που καταγράφει κάθε μετρική που χρησιμοποιήθηκε για τον υπολογισμό μιας βαθμολογίας CVSS." },
    ],
  },
  summary: {
    en: [
      "SAST, DAST, vulnerability assessment and penetration testing answer different questions and complement one another.",
      "Vulnerability management is a continuous lifecycle; prioritisation must combine severity, exploitation likelihood and asset context.",
      "Penetration tests follow recognised phases and methodologies and are legal only within signed scope and rules of engagement.",
      "Post-exploitation should prove access with minimum necessary action, and test evidence must be protected like production data.",
      "Good reports pair transparent CVSS scoring with reproducible evidence and specific remediation.",
    ],
    el: [
      "Τα SAST, DAST, η αξιολόγηση ευπαθειών και η δοκιμή διείσδυσης απαντούν σε διαφορετικά ερωτήματα και αλληλοσυμπληρώνονται.",
      "Η διαχείριση ευπαθειών είναι συνεχής κύκλος· η ιεράρχηση πρέπει να συνδυάζει σοβαρότητα, πιθανότητα εκμετάλλευσης και πλαίσιο του στοιχείου.",
      "Οι δοκιμές διείσδυσης ακολουθούν αναγνωρισμένες φάσεις και μεθοδολογίες και είναι νόμιμες μόνο εντός υπογεγραμμένου πεδίου και κανόνων εμπλοκής.",
      "Η φάση μετά την εκμετάλλευση πρέπει να αποδεικνύει την πρόσβαση με την ελάχιστη αναγκαία ενέργεια, ενώ τα αποδεικτικά στοιχεία της δοκιμής προστατεύονται όπως τα δεδομένα παραγωγής.",
      "Οι καλές αναφορές συνδυάζουν διαφανή βαθμολόγηση CVSS με αναπαραγώγιμη τεκμηρίωση και συγκεκριμένη αποκατάσταση.",
    ],
  },
  questions: {
    en: [
      "Why might SAST report a vulnerability that DAST cannot confirm, and vice versa?",
      "Two findings: CVSS 9.1 on an isolated lab server and CVSS 7.5 on an internet-facing server listed in CISA KEV. Which do you fix first, and why?",
      "During a test you discover that a system just outside your scope is vulnerable. What should you do?",
      "Rewrite the recommendation 'Fix the XSS issue' so that it becomes an actionable remediation.",
    ],
    el: [
      "Γιατί το SAST μπορεί να αναφέρει μια ευπάθεια που το DAST δεν μπορεί να επιβεβαιώσει, και αντιστρόφως;",
      "Δύο ευρήματα: CVSS 9,1 σε έναν απομονωμένο εργαστηριακό διακομιστή και CVSS 7,5 σε έναν διακομιστή εκτεθειμένο στο διαδίκτυο που περιλαμβάνεται στον κατάλογο CISA KEV. Ποιο διορθώνετε πρώτο και γιατί;",
      "Κατά τη διάρκεια μιας δοκιμής ανακαλύπτετε ότι ένα σύστημα λίγο έξω από το πεδίο σας είναι ευάλωτο. Τι πρέπει να κάνετε;",
      "Αναδιατυπώστε τη σύσταση «Διορθώστε το πρόβλημα XSS» ώστε να γίνει εφαρμόσιμη πρόταση αποκατάστασης.",
    ],
  },
};

export default ch10;

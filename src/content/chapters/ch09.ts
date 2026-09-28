import type { Chapter } from "../types";

const ch09: Chapter = {
  n: 9,
  part: 3,
  title: { en: "Secure Software Design and Engineering", el: "Ασφαλής Σχεδίαση και Ανάπτυξη Λογισμικού" },
  subtitle: {
    en: "Shift-left and DevSecOps · Injection · Cross-site scripting · CSRF and clickjacking · API security, SSRF and broken access control · Secrets and the software supply chain",
    el: "Shift-left και DevSecOps · Έγχυση κώδικα · Cross-site scripting · CSRF και clickjacking · Ασφάλεια API, SSRF και σπασμένος έλεγχος πρόσβασης · Μυστικά και εφοδιαστική αλυσίδα λογισμικού",
  },
  level: { en: "Intermediate · Development", el: "Μεσαίο επίπεδο · Ανάπτυξη λογισμικού" },
  hours: "8–10",
  intro: {
    en: [
      "Most vulnerabilities are not created by attackers; they are written, unintentionally, by developers. A single missing validation check can expose millions of records, and fixing a flaw after release costs far more than preventing it during design. Secure software engineering therefore aims to make security a normal property of everyday development work rather than a final inspection before release.",
      "This chapter first presents the *shift-left* philosophy and the engineering principles that guide secure design. It then explains, for each of the most important web vulnerability classes—injection, cross-site scripting, cross-site request forgery, server-side request forgery and broken access control—why the flaw occurs and which defence addresses its root cause. It concludes with secrets management, logging and the protection of the software supply chain. The vulnerability classes discussed here correspond closely to the OWASP Top 10.",
    ],
    el: [
      "Οι περισσότερες ευπάθειες δεν δημιουργούνται από τους επιτιθέμενους· γράφονται, ακούσια, από τους προγραμματιστές. Ένας μόνο έλεγχος επικύρωσης που λείπει μπορεί να εκθέσει εκατομμύρια εγγραφές, ενώ η διόρθωση ενός σφάλματος μετά την κυκλοφορία κοστίζει πολύ περισσότερο από την πρόληψή του κατά τον σχεδιασμό. Η ασφαλής μηχανική λογισμικού στοχεύει, επομένως, να καταστήσει την ασφάλεια φυσιολογική ιδιότητα της καθημερινής αναπτυξιακής εργασίας και όχι έναν τελικό έλεγχο πριν από την κυκλοφορία.",
      "Το κεφάλαιο παρουσιάζει πρώτα τη φιλοσοφία *shift-left* και τις αρχές μηχανικής που καθοδηγούν τον ασφαλή σχεδιασμό. Στη συνέχεια εξηγεί, για καθεμιά από τις σημαντικότερες κατηγορίες ευπαθειών ιστού —έγχυση, cross-site scripting, πλαστογράφηση αιτημάτων μεταξύ ιστοτόπων, πλαστογράφηση αιτημάτων από την πλευρά του διακομιστή και σπασμένο έλεγχο πρόσβασης— γιατί προκύπτει το σφάλμα και ποια άμυνα αντιμετωπίζει τη βασική του αιτία. Ολοκληρώνεται με τη διαχείριση μυστικών, την καταγραφή και την προστασία της εφοδιαστικής αλυσίδας λογισμικού. Οι κατηγορίες ευπαθειών που εξετάζονται αντιστοιχούν σε μεγάλο βαθμό στο OWASP Top 10.",
    ],
  },
  outcomes: {
    en: [
      "Explain shift-left security and how security activities are embedded in a DevSecOps pipeline.",
      "Explain the root cause of injection and apply parameterised queries.",
      "Distinguish stored, reflected and DOM-based XSS and apply context-aware output encoding and CSP.",
      "Describe CSRF, clickjacking, SSRF and broken access control, with their defences.",
      "Describe how SCA, SBOMs and SLSA protect the software supply chain.",
    ],
    el: [
      "Να εξηγείτε την ασφάλεια shift-left και πώς ενσωματώνονται οι δραστηριότητες ασφάλειας σε μια ροή DevSecOps.",
      "Να εξηγείτε τη βασική αιτία της έγχυσης και να εφαρμόζετε παραμετροποιημένα ερωτήματα.",
      "Να διακρίνετε το αποθηκευμένο, το ανακλώμενο και το βασισμένο στο DOM XSS και να εφαρμόζετε κωδικοποίηση εξόδου ανάλογα με το πλαίσιο και CSP.",
      "Να περιγράφετε τις επιθέσεις CSRF, clickjacking, SSRF και τον σπασμένο έλεγχο πρόσβασης, μαζί με τις άμυνές τους.",
      "Να περιγράφετε πώς η ανάλυση σύνθεσης λογισμικού, τα SBOM και το SLSA προστατεύουν την εφοδιαστική αλυσίδα λογισμικού.",
    ],
  },
  sections: [
    {
      id: "9.1",
      title: { en: "Shift-left security, DevSecOps and core engineering principles", el: "Ασφάλεια shift-left, DevSecOps και βασικές αρχές μηχανικής" },
      body: {
        en: [
          "**Shift-left** means moving security activities earlier—'to the left'—in the development timeline. Security requirements are defined together with functional requirements; **threat modelling** (for example with the STRIDE method: spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege) identifies risks while the design can still be changed cheaply; and automated checks run on every code change. **DevSecOps** integrates these checks into the continuous integration and delivery pipeline, so that a commit introducing a known-vulnerable library or a hard-coded password fails the build just like a failing unit test.",
          "Several engineering principles guide secure code. **Validate input** on the server side against an allow-list of what is expected, because every input from outside the trust boundary may be hostile. **Encode output** for the context in which it is used. Keep the **attack surface minimal** by removing unused features and endpoints. **Fail securely**, so that errors deny access and do not leak internal details. And prefer well-tested **framework security features** over home-made mechanisms, in the spirit of the economy-of-mechanism principle from Chapter 1.",
        ],
        el: [
          "Ο όρος **shift-left** σημαίνει τη μετακίνηση των δραστηριοτήτων ασφάλειας νωρίτερα —«προς τα αριστερά»— στο χρονοδιάγραμμα της ανάπτυξης. Οι απαιτήσεις ασφάλειας ορίζονται μαζί με τις λειτουργικές· η **μοντελοποίηση απειλών** (για παράδειγμα με τη μέθοδο STRIDE: πλαστοπροσωπία, αλλοίωση, αποποίηση, αποκάλυψη πληροφοριών, άρνηση υπηρεσίας, κλιμάκωση προνομίων) εντοπίζει τους κινδύνους όσο ο σχεδιασμός μπορεί ακόμη να αλλάξει με χαμηλό κόστος· και αυτοματοποιημένοι έλεγχοι εκτελούνται σε κάθε αλλαγή του κώδικα. Το **DevSecOps** ενσωματώνει αυτούς τους ελέγχους στη ροή συνεχούς ενοποίησης και παράδοσης, ώστε μια υποβολή κώδικα που εισάγει μια βιβλιοθήκη με γνωστή ευπάθεια ή έναν ενσωματωμένο κωδικό να αποτυγχάνει στη μεταγλώττιση, όπως ακριβώς και ένας αποτυχημένος έλεγχος μονάδας.",
          "Ορισμένες αρχές μηχανικής καθοδηγούν τη συγγραφή ασφαλούς κώδικα. **Επικύρωση της εισόδου** στην πλευρά του διακομιστή, με βάση λίστα όσων αναμένονται, επειδή κάθε είσοδος από έξω από το όριο εμπιστοσύνης μπορεί να είναι εχθρική. **Κωδικοποίηση της εξόδου** σύμφωνα με το πλαίσιο στο οποίο χρησιμοποιείται. **Ελαχιστοποίηση της επιφάνειας επίθεσης** με την αφαίρεση αχρησιμοποίητων λειτουργιών και σημείων πρόσβασης. **Ασφαλής αποτυχία**, ώστε τα σφάλματα να απορρίπτουν την πρόσβαση και να μη διαρρέουν εσωτερικές λεπτομέρειες. Και προτίμηση των δοκιμασμένων **λειτουργιών ασφάλειας των πλαισίων ανάπτυξης** έναντι αυτοσχέδιων μηχανισμών, στο πνεύμα της αρχής της οικονομίας μηχανισμού από το Κεφάλαιο 1.",
        ],
      },
    },
    {
      id: "9.2",
      title: { en: "SQL and NoSQL injection: parameterisation versus concatenation", el: "Έγχυση SQL και NoSQL: παραμετροποίηση έναντι συνένωσης συμβολοσειρών" },
      body: {
        en: [
          "**Injection** occurs when untrusted data are interpreted as part of a command. The classic case is SQL built by string concatenation, such as `\"SELECT * FROM users WHERE name = '\" + input + \"'\"`. If an attacker enters `' OR '1'='1`, the condition becomes always true and the query returns every user; more elaborate payloads can read other tables, modify data or, in some configurations, execute operating-system commands. The root cause is the *mixing of code and data* in a single string.",
          "The definitive defence is the **parameterised query** (prepared statement), in which the SQL structure is sent to the database separately from the values: `SELECT * FROM users WHERE name = ?`. The database then treats the input strictly as data, whatever characters it contains. Object-relational mappers provide the same protection when used correctly. Input validation and least-privilege database accounts are valuable additional layers, but escaping special characters by hand is error-prone and should not be relied upon. NoSQL databases are not immune: accepting JSON objects such as `{\"$ne\": null}` in a MongoDB query can bypass authentication in exactly the same way.",
        ],
        el: [
          "Η **έγχυση** (injection) συμβαίνει όταν μη αξιόπιστα δεδομένα ερμηνεύονται ως μέρος μιας εντολής. Η κλασική περίπτωση είναι ένα ερώτημα SQL που κατασκευάζεται με συνένωση συμβολοσειρών, όπως `\"SELECT * FROM users WHERE name = '\" + input + \"'\"`. Αν ένας επιτιθέμενος εισαγάγει `' OR '1'='1`, η συνθήκη γίνεται πάντα αληθής και το ερώτημα επιστρέφει όλους τους χρήστες· πιο σύνθετα φορτία μπορούν να διαβάσουν άλλους πίνακες, να τροποποιήσουν δεδομένα ή, σε ορισμένες διαμορφώσεις, να εκτελέσουν εντολές του λειτουργικού συστήματος. Η βασική αιτία είναι η *ανάμειξη κώδικα και δεδομένων* σε μία συμβολοσειρά.",
          "Η οριστική άμυνα είναι το **παραμετροποιημένο ερώτημα** (prepared statement), στο οποίο η δομή του SQL αποστέλλεται στη βάση δεδομένων χωριστά από τις τιμές: `SELECT * FROM users WHERE name = ?`. Η βάση δεδομένων αντιμετωπίζει τότε την είσοδο αυστηρά ως δεδομένα, όποιους χαρακτήρες κι αν περιέχει. Οι βιβλιοθήκες αντιστοίχισης αντικειμένων–σχέσεων (ORM) παρέχουν την ίδια προστασία όταν χρησιμοποιούνται σωστά. Η επικύρωση εισόδου και οι λογαριασμοί βάσης δεδομένων με ελάχιστα προνόμια είναι πολύτιμα πρόσθετα επίπεδα, όμως η χειροκίνητη διαφυγή ειδικών χαρακτήρων είναι επιρρεπής σε σφάλματα και δεν πρέπει να αποτελεί τη βασική άμυνα. Οι βάσεις NoSQL δεν είναι απρόσβλητες: η αποδοχή αντικειμένων JSON όπως `{\"$ne\": null}` σε ένα ερώτημα MongoDB μπορεί να παρακάμψει την ταυτοποίηση με ακριβώς τον ίδιο τρόπο.",
        ],
      },
    },
    {
      id: "9.3",
      title: { en: "Cross-site scripting: stored, reflected and DOM-based", el: "Cross-site scripting: αποθηκευμένο, ανακλώμενο και βασισμένο στο DOM" },
      body: {
        en: [
          "**Cross-site scripting (XSS)** is injection into the web browser. An attacker causes a website to deliver JavaScript that runs in the victim's browser with the full privileges of that site—reading session data, performing actions on the user's behalf or altering the page. In **stored XSS**, the malicious script is saved on the server (for example in a comment) and served to every visitor. In **reflected XSS**, the script is part of a crafted link and is immediately echoed back in the response. In **DOM-based XSS**, the vulnerability lies entirely in client-side code that writes untrusted data into the page, for instance through `innerHTML`.",
          "The primary defence is **context-aware output encoding**: data inserted into HTML, into an HTML attribute, into JavaScript or into a URL must each be encoded according to the rules of that context. Modern frameworks such as React and Angular encode by default, and developers should avoid bypasses such as `dangerouslySetInnerHTML` unless the content has been sanitised with a library like DOMPurify. A **Content Security Policy (CSP)** adds defence in depth by instructing the browser to execute only scripts from approved sources, while the `HttpOnly` cookie flag prevents scripts from reading session cookies.",
        ],
        el: [
          "Το **cross-site scripting (XSS)** είναι έγχυση στον φυλλομετρητή ιστού. Ο επιτιθέμενος κάνει έναν ιστότοπο να παραδώσει κώδικα JavaScript που εκτελείται στον φυλλομετρητή του θύματος με όλα τα προνόμια του ιστοτόπου —διαβάζοντας δεδομένα συνεδρίας, εκτελώντας ενέργειες εκ μέρους του χρήστη ή αλλοιώνοντας τη σελίδα. Στο **αποθηκευμένο XSS**, το κακόβουλο σενάριο αποθηκεύεται στον διακομιστή (για παράδειγμα σε ένα σχόλιο) και σερβίρεται σε κάθε επισκέπτη. Στο **ανακλώμενο XSS**, το σενάριο είναι μέρος ενός ειδικά κατασκευασμένου συνδέσμου και επιστρέφεται αμέσως στην απόκριση. Στο **XSS βασισμένο στο DOM**, η ευπάθεια βρίσκεται εξ ολοκλήρου σε κώδικα της πλευράς του πελάτη που γράφει μη αξιόπιστα δεδομένα στη σελίδα, για παράδειγμα μέσω της ιδιότητας `innerHTML`.",
          "Η κύρια άμυνα είναι η **κωδικοποίηση εξόδου ανάλογα με το πλαίσιο**: δεδομένα που εισάγονται σε HTML, σε χαρακτηριστικό HTML, σε JavaScript ή σε URL πρέπει να κωδικοποιούνται σύμφωνα με τους κανόνες του αντίστοιχου πλαισίου. Τα σύγχρονα πλαίσια ανάπτυξης, όπως τα React και Angular, κωδικοποιούν εξ ορισμού, και οι προγραμματιστές πρέπει να αποφεύγουν παρακάμψεις όπως το `dangerouslySetInnerHTML`, εκτός αν το περιεχόμενο έχει εξυγιανθεί με μια βιβλιοθήκη όπως η DOMPurify. Μια **Πολιτική Ασφάλειας Περιεχομένου** (Content Security Policy, CSP) προσθέτει άμυνα σε βάθος, δίνοντας εντολή στον φυλλομετρητή να εκτελεί μόνο σενάρια από εγκεκριμένες πηγές, ενώ η σημαία `HttpOnly` στα cookies εμποδίζει τα σενάρια να διαβάζουν τα cookies συνεδρίας.",
        ],
      },
    },
    {
      id: "9.4",
      title: { en: "Cross-site request forgery and clickjacking", el: "Πλαστογράφηση αιτημάτων μεταξύ ιστοτόπων και clickjacking" },
      body: {
        en: [
          "In **cross-site request forgery (CSRF)**, a malicious website causes the victim's browser to send a request to another site where the victim is logged in. Because browsers automatically attach cookies, the target site sees an authenticated request—for example, to change the account's email address or transfer money—that the user never intended. Defences include **anti-CSRF tokens** (unpredictable values embedded in forms and verified by the server), the **SameSite** cookie attribute, which prevents cookies from being sent with most cross-site requests, and re-authentication for sensitive actions.",
          "**Clickjacking** embeds the target site invisibly inside a frame on an attacker's page and tricks the user into clicking buttons they cannot see. It is prevented by forbidding framing through the `frame-ancestors` directive of CSP or the older `X-Frame-Options` header.",
        ],
        el: [
          "Στην **πλαστογράφηση αιτημάτων μεταξύ ιστοτόπων** (Cross-Site Request Forgery, CSRF), ένας κακόβουλος ιστότοπος κάνει τον φυλλομετρητή του θύματος να στείλει αίτημα σε άλλον ιστότοπο στον οποίο το θύμα είναι συνδεδεμένο. Επειδή οι φυλλομετρητές επισυνάπτουν αυτόματα τα cookies, ο ιστότοπος-στόχος βλέπει ένα ταυτοποιημένο αίτημα —για παράδειγμα αλλαγής της διεύθυνσης email του λογαριασμού ή μεταφοράς χρημάτων— που ο χρήστης δεν σκόπευε ποτέ να στείλει. Οι άμυνες περιλαμβάνουν τα **διακριτικά anti-CSRF** (απρόβλεπτες τιμές ενσωματωμένες στις φόρμες, τις οποίες επαληθεύει ο διακομιστής), το χαρακτηριστικό **SameSite** των cookies, το οποίο εμποδίζει την αποστολή τους με τα περισσότερα αιτήματα μεταξύ ιστοτόπων, και την επανεπαλήθευση ταυτότητας για ευαίσθητες ενέργειες.",
          "Το **clickjacking** ενσωματώνει αόρατα τον ιστότοπο-στόχο μέσα σε ένα πλαίσιο (frame) στη σελίδα του επιτιθέμενου και εξαπατά τον χρήστη ώστε να πατήσει κουμπιά που δεν βλέπει. Αποτρέπεται με την απαγόρευση της ενσωμάτωσης σε πλαίσια μέσω της οδηγίας `frame-ancestors` της CSP ή της παλαιότερης κεφαλίδας `X-Frame-Options`.",
        ],
      },
    },
    {
      id: "9.5",
      title: { en: "API security: broken access control, SSRF and XXE", el: "Ασφάλεια API: σπασμένος έλεγχος πρόσβασης, SSRF και XXE" },
      body: {
        en: [
          "**Broken access control** is the most prevalent category in the OWASP Top 10. Its most common API form is the *insecure direct object reference* (IDOR, also called BOLA): a request such as `GET /api/invoices/1043` returns the invoice even when it belongs to another customer, because the server checks *that* the user is logged in but not *whether* they own the object. Every request must be authorised on the server, for every object, following the complete-mediation principle. APIs should also enforce authentication with properly validated tokens, apply rate limits, and return only the fields the client needs.",
          "**Server-side request forgery (SSRF)** tricks a server into making requests on the attacker's behalf—for example, a 'fetch image from URL' feature that is pointed at internal services or at the cloud metadata endpoint `169.254.169.254`, which may reveal temporary credentials. Defences include allow-listing destinations, blocking internal address ranges and using the hardened metadata service (IMDSv2). **XML external entity (XXE)** attacks abuse XML parsers that resolve external references, allowing files to be read from the server; the remedy is to disable external entities and document type definitions in the parser configuration.",
        ],
        el: [
          "Ο **σπασμένος έλεγχος πρόσβασης** είναι η πιο διαδεδομένη κατηγορία του OWASP Top 10. Η συνηθέστερη μορφή του στις διεπαφές API είναι η *μη ασφαλής άμεση αναφορά σε αντικείμενο* (IDOR, γνωστή και ως BOLA): ένα αίτημα όπως `GET /api/invoices/1043` επιστρέφει το τιμολόγιο ακόμη κι όταν ανήκει σε άλλον πελάτη, επειδή ο διακομιστής ελέγχει *ότι* ο χρήστης είναι συνδεδεμένος αλλά όχι *αν* του ανήκει το αντικείμενο. Κάθε αίτημα πρέπει να εξουσιοδοτείται στον διακομιστή, για κάθε αντικείμενο, σύμφωνα με την αρχή της πλήρους διαμεσολάβησης. Οι διεπαφές API πρέπει επίσης να επιβάλλουν ταυτοποίηση με σωστά επικυρωμένα διακριτικά, να εφαρμόζουν όρια ρυθμού αιτημάτων και να επιστρέφουν μόνο τα πεδία που χρειάζεται ο πελάτης.",
          "Η **πλαστογράφηση αιτημάτων από την πλευρά του διακομιστή** (Server-Side Request Forgery, SSRF) εξαπατά έναν διακομιστή ώστε να πραγματοποιήσει αιτήματα για λογαριασμό του επιτιθέμενου —για παράδειγμα, μια λειτουργία «λήψη εικόνας από URL» που κατευθύνεται σε εσωτερικές υπηρεσίες ή στο σημείο μεταδεδομένων του νέφους `169.254.169.254`, το οποίο μπορεί να αποκαλύψει προσωρινά διαπιστευτήρια. Οι άμυνες περιλαμβάνουν λίστες επιτρεπόμενων προορισμών, αποκλεισμό εσωτερικών περιοχών διευθύνσεων και χρήση της θωρακισμένης υπηρεσίας μεταδεδομένων (IMDSv2). Οι επιθέσεις **εξωτερικής οντότητας XML** (XML External Entity, XXE) εκμεταλλεύονται αναλυτές XML που επιλύουν εξωτερικές αναφορές, επιτρέποντας την ανάγνωση αρχείων από τον διακομιστή· η θεραπεία είναι η απενεργοποίηση των εξωτερικών οντοτήτων και των ορισμών τύπου εγγράφου στη ρύθμιση του αναλυτή.",
        ],
      },
    },
    {
      id: "9.6",
      title: { en: "Secrets, logging and the software supply chain", el: "Μυστικά, καταγραφή και εφοδιαστική αλυσίδα λογισμικού" },
      body: {
        en: [
          "**Secrets**—passwords, API keys, private keys—must never be written into source code or configuration files committed to version control, because repositories are copied, shared and sometimes made public. They belong in a dedicated secrets manager (such as HashiCorp Vault or a cloud key vault), are injected at runtime, and are rotated regularly; secret-scanning tools in the pipeline catch accidental commits. **Security logging** should record authentication events, access-control failures and administrative actions with enough context for investigation, but must never record passwords, tokens or unnecessary personal data.",
          "Modern applications consist mostly of third-party code: a typical project may depend on hundreds of open-source packages. **Software composition analysis (SCA)** identifies these dependencies and flags those with known vulnerabilities, as in the Log4Shell incident of 2021. A **software bill of materials (SBOM)**, in formats such as SPDX or CycloneDX, lists every component so that affected systems can be found within minutes when a new vulnerability is announced. The **SLSA** framework (*Supply-chain Levels for Software Artifacts*) defines increasing levels of assurance for the build process—such as signed, reproducible builds with verifiable provenance—so that attacks like the SolarWinds build compromise become detectable.",
        ],
        el: [
          "Τα **μυστικά** —κωδικοί, κλειδιά API, ιδιωτικά κλειδιά— δεν πρέπει ποτέ να γράφονται σε πηγαίο κώδικα ή σε αρχεία ρυθμίσεων που καταχωρίζονται στο σύστημα ελέγχου εκδόσεων, επειδή τα αποθετήρια αντιγράφονται, κοινοποιούνται και ενίοτε δημοσιοποιούνται. Φυλάσσονται σε ειδικό διαχειριστή μυστικών (όπως το HashiCorp Vault ή ένα θησαυροφυλάκιο κλειδιών στο νέφος), εισάγονται κατά την εκτέλεση και εναλλάσσονται τακτικά· εργαλεία σάρωσης μυστικών στη ροή ανάπτυξης εντοπίζουν τις ακούσιες καταχωρίσεις. Η **καταγραφή ασφάλειας** πρέπει να καταγράφει συμβάντα ταυτοποίησης, αποτυχίες ελέγχου πρόσβασης και διαχειριστικές ενέργειες με επαρκές πλαίσιο για τη διερεύνηση, αλλά δεν πρέπει ποτέ να καταγράφει κωδικούς, διακριτικά ή περιττά προσωπικά δεδομένα.",
          "Οι σύγχρονες εφαρμογές αποτελούνται κυρίως από κώδικα τρίτων: ένα τυπικό έργο μπορεί να εξαρτάται από εκατοντάδες πακέτα ανοιχτού κώδικα. Η **ανάλυση σύνθεσης λογισμικού** (Software Composition Analysis, SCA) εντοπίζει αυτές τις εξαρτήσεις και επισημαίνει όσες έχουν γνωστές ευπάθειες, όπως στο περιστατικό Log4Shell του 2021. Ένας **κατάλογος υλικών λογισμικού** (Software Bill of Materials, SBOM), σε μορφές όπως SPDX ή CycloneDX, απαριθμεί κάθε στοιχείο, ώστε τα επηρεαζόμενα συστήματα να εντοπίζονται μέσα σε λίγα λεπτά όταν ανακοινώνεται μια νέα ευπάθεια. Το πλαίσιο **SLSA** (*Supply-chain Levels for Software Artifacts*) ορίζει αυξανόμενα επίπεδα διασφάλισης για τη διαδικασία κατασκευής λογισμικού —όπως υπογεγραμμένες, αναπαραγώγιμες εκδόσεις με επαληθεύσιμη προέλευση— ώστε επιθέσεις όπως η παραβίαση της διαδικασίας κατασκευής της SolarWinds να γίνονται ανιχνεύσιμες.",
        ],
      },
    },
  ],
  terms: {
    en: [
      { term: "Shift-left", def: "Moving security activities earlier in the development lifecycle." },
      { term: "Threat modelling", def: "Systematic identification of threats to a design, e.g. with STRIDE." },
      { term: "Parameterised query", def: "A query whose structure is fixed and whose values are passed separately as data." },
      { term: "XSS", def: "Cross-site scripting: injection of script that runs in the victim's browser under the site's origin." },
      { term: "IDOR / BOLA", def: "Access to objects by identifier without checking that the requester is authorised for them." },
      { term: "SBOM", def: "Software bill of materials: an inventory of all components in a piece of software." },
    ],
    el: [
      { term: "Shift-left", def: "Μετακίνηση των δραστηριοτήτων ασφάλειας σε πρωιμότερα στάδια του κύκλου ανάπτυξης." },
      { term: "Μοντελοποίηση απειλών", def: "Συστηματικός εντοπισμός απειλών κατά ενός σχεδιασμού, π.χ. με τη μέθοδο STRIDE." },
      { term: "Παραμετροποιημένο ερώτημα", def: "Ερώτημα με σταθερή δομή, του οποίου οι τιμές διαβιβάζονται χωριστά ως δεδομένα." },
      { term: "XSS", def: "Cross-site scripting: έγχυση σεναρίου που εκτελείται στον φυλλομετρητή του θύματος υπό την προέλευση του ιστοτόπου." },
      { term: "IDOR / BOLA", def: "Πρόσβαση σε αντικείμενα μέσω αναγνωριστικού χωρίς έλεγχο αν ο αιτών είναι εξουσιοδοτημένος γι' αυτά." },
      { term: "SBOM", def: "Κατάλογος υλικών λογισμικού: απογραφή όλων των στοιχείων ενός λογισμικού." },
    ],
  },
  summary: {
    en: [
      "Security is cheapest when built in early: threat modelling and automated pipeline checks are the core of DevSecOps.",
      "Injection arises from mixing code and data; parameterised queries remove the root cause.",
      "XSS is prevented by context-aware output encoding, safe framework defaults and CSP.",
      "CSRF, clickjacking, SSRF and XXE each have specific, well-established defences; broken access control requires server-side authorisation of every object.",
      "Secrets managers, careful logging, SCA, SBOMs and SLSA protect the application and its supply chain.",
    ],
    el: [
      "Η ασφάλεια κοστίζει λιγότερο όταν ενσωματώνεται νωρίς: η μοντελοποίηση απειλών και οι αυτοματοποιημένοι έλεγχοι στη ροή ανάπτυξης αποτελούν τον πυρήνα του DevSecOps.",
      "Η έγχυση προκύπτει από την ανάμειξη κώδικα και δεδομένων· τα παραμετροποιημένα ερωτήματα εξαλείφουν τη βασική αιτία.",
      "Το XSS αποτρέπεται με κωδικοποίηση εξόδου ανάλογα με το πλαίσιο, ασφαλείς προεπιλογές των πλαισίων ανάπτυξης και CSP.",
      "Τα CSRF, clickjacking, SSRF και XXE έχουν συγκεκριμένες, καθιερωμένες άμυνες· ο σπασμένος έλεγχος πρόσβασης απαιτεί εξουσιοδότηση κάθε αντικειμένου στην πλευρά του διακομιστή.",
      "Οι διαχειριστές μυστικών, η προσεκτική καταγραφή, η SCA, τα SBOM και το SLSA προστατεύουν την εφαρμογή και την εφοδιαστική της αλυσίδα.",
    ],
  },
  questions: {
    en: [
      "Explain why escaping quotes is a weaker defence against SQL injection than parameterised queries.",
      "Classify the following as stored, reflected or DOM-based XSS: a search page that prints the query from the URL using innerHTML.",
      "Why does the SameSite cookie attribute mitigate CSRF but not XSS?",
      "When Log4Shell was announced, how would an SBOM have helped an organisation respond?",
    ],
    el: [
      "Εξηγήστε γιατί η διαφυγή των εισαγωγικών είναι ασθενέστερη άμυνα κατά της έγχυσης SQL σε σύγκριση με τα παραμετροποιημένα ερωτήματα.",
      "Κατατάξτε ως αποθηκευμένο, ανακλώμενο ή βασισμένο στο DOM XSS την εξής περίπτωση: μια σελίδα αναζήτησης που εμφανίζει το ερώτημα από το URL χρησιμοποιώντας innerHTML.",
      "Γιατί το χαρακτηριστικό SameSite των cookies περιορίζει το CSRF αλλά όχι το XSS;",
      "Όταν ανακοινώθηκε το Log4Shell, πώς θα βοηθούσε ένα SBOM έναν οργανισμό να ανταποκριθεί;",
    ],
  },
};

export default ch09;

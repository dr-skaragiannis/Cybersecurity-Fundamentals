import type { Chapter } from "../types";

const ch01: Chapter = {
  n: 1,
  part: 1,
  title: {
    en: "Foundations of Information Security and the CIA Triad",
    el: "Θεμελιώδεις Έννοιες της Ασφάλειας Πληροφοριών και η Τριάδα CIA",
  },
  subtitle: {
    en: "Definitions · CIA and its extensions · Design principles · Historical evolution · Security models · Evaluation criteria",
    el: "Ορισμοί · Η τριάδα CIA και οι επεκτάσεις της · Αρχές σχεδίασης · Ιστορική εξέλιξη · Μοντέλα ασφάλειας · Κριτήρια αξιολόγησης",
  },
  level: { en: "Beginner · Theory-first", el: "Εισαγωγικό επίπεδο · Έμφαση στη θεωρία" },
  hours: "6–8",
  intro: {
    en: [
      "Every later chapter of this book—whether it deals with operating systems, cryptography, identity or incident response—relies on a small set of shared ideas. This chapter introduces that vocabulary. It explains what we mean when we speak of *security*, which properties of information we are trying to protect, and which design principles experienced engineers apply before they choose any specific product or technology.",
      "The chapter proceeds from definitions to principles and then to formal models. We first distinguish cybersecurity from the broader notions of information assurance and cyber resilience. We then examine the CIA triad and the properties that extend it, the classic design principles of Saltzer and Schroeder, and the historical events that shaped modern defensive thinking. The chapter closes with the formal models (Bell–LaPadula, Biba, Clark–Wilson) and evaluation schemes that allow security claims to be stated precisely and verified independently.",
    ],
    el: [
      "Κάθε επόμενο κεφάλαιο του βιβλίου —είτε αφορά λειτουργικά συστήματα, κρυπτογραφία, διαχείριση ταυτότητας είτε απόκριση σε περιστατικά— στηρίζεται σε ένα μικρό σύνολο κοινών εννοιών. Το παρόν κεφάλαιο εισάγει αυτό το λεξιλόγιο. Εξηγεί τι εννοούμε όταν μιλάμε για *ασφάλεια*, ποιες ιδιότητες της πληροφορίας επιδιώκουμε να προστατεύσουμε και ποιες αρχές σχεδίασης εφαρμόζουν οι έμπειροι μηχανικοί πριν επιλέξουν οποιοδήποτε συγκεκριμένο προϊόν ή τεχνολογία.",
      "Η παρουσίαση κινείται από τους ορισμούς στις αρχές και, στη συνέχεια, στα τυπικά μοντέλα. Αρχικά διακρίνουμε την κυβερνοασφάλεια από τις ευρύτερες έννοιες της διασφάλισης πληροφοριών και της κυβερνοανθεκτικότητας. Ακολούθως εξετάζουμε την τριάδα CIA και τις ιδιότητες που τη συμπληρώνουν, τις κλασικές αρχές σχεδίασης των Saltzer και Schroeder, καθώς και τα ιστορικά γεγονότα που διαμόρφωσαν τη σύγχρονη αμυντική σκέψη. Το κεφάλαιο ολοκληρώνεται με τα τυπικά μοντέλα (Bell–LaPadula, Biba, Clark–Wilson) και τα σχήματα αξιολόγησης που επιτρέπουν να διατυπώνονται οι ισχυρισμοί ασφάλειας με ακρίβεια και να επαληθεύονται ανεξάρτητα.",
    ],
  },
  outcomes: {
    en: [
      "Define cybersecurity, information assurance and cyber resilience, and explain how the three concepts differ in scope.",
      "Decompose a security requirement into confidentiality, integrity and availability, and recognise when extended properties (authenticity, accountability, non-repudiation, possession, utility) are needed.",
      "Apply least privilege, defence in depth, fail-safe defaults and security by design when reviewing an architecture.",
      "Distinguish threat, vulnerability and risk, and describe how controls reduce likelihood or impact.",
      "Explain the purpose of formal security models and of independent evaluation schemes such as the Common Criteria.",
    ],
    el: [
      "Να ορίζετε την κυβερνοασφάλεια, τη διασφάλιση πληροφοριών και την κυβερνοανθεκτικότητα και να εξηγείτε σε τι διαφέρει το εύρος καθεμιάς.",
      "Να αναλύετε μια απαίτηση ασφάλειας σε εμπιστευτικότητα, ακεραιότητα και διαθεσιμότητα και να αναγνωρίζετε πότε απαιτούνται πρόσθετες ιδιότητες (αυθεντικότητα, λογοδοσία, μη αποποίηση, κατοχή, χρησιμότητα).",
      "Να εφαρμόζετε τις αρχές του ελάχιστου προνομίου, της άμυνας σε βάθος, των ασφαλών προεπιλογών και της ασφάλειας εκ σχεδιασμού κατά την αξιολόγηση μιας αρχιτεκτονικής.",
      "Να διακρίνετε την απειλή, την ευπάθεια και τον κίνδυνο και να περιγράφετε πώς τα μέτρα ελέγχου μειώνουν την πιθανότητα ή τις συνέπειες.",
      "Να εξηγείτε τον σκοπό των τυπικών μοντέλων ασφάλειας και των ανεξάρτητων σχημάτων αξιολόγησης, όπως τα Common Criteria.",
    ],
  },
  sections: [
    {
      id: "1.1",
      title: {
        en: "Definitions: cybersecurity, information assurance and cyber resilience",
        el: "Ορισμοί: κυβερνοασφάλεια, διασφάλιση πληροφοριών και κυβερνοανθεκτικότητα",
      },
      body: {
        en: [
          "**Cybersecurity** is the discipline of protecting networked systems, data and services against unauthorised access, modification, disruption and destruction, while preserving their legitimate operation even under adversarial conditions. The phrase *under adversarial conditions* is important: unlike reliability engineering, which deals with random faults, security assumes an intelligent opponent who deliberately searches for the weakest point.",
          "**Information assurance (IA)** has a broader scope. It combines technical, procedural and managerial measures in order to maintain *justified confidence* in information throughout its lifecycle—from creation and storage to transmission, use and eventual destruction. IA is therefore concerned not only with resisting attacks, but also with authenticity, provenance and the continued usefulness of information.",
          "**Cyber resilience** extends both ideas. It describes an organisation's capacity to anticipate, withstand, recover from and adapt to adverse cyber events, including those that succeed despite preventive controls. Put simply, cybersecurity asks *how do we prevent and detect compromise?*, information assurance asks *can we trust our information?*, and resilience asks *can we keep operating, and how quickly can we recover?*",
          {
            t: "table",
            caption: "Table 1.1 — Three related but distinct concepts",
            head: ["Concept", "Guiding question", "Typical controls", "Consequence if neglected"],
            rows: [
              ["Cybersecurity", "Can an adversary breach or disrupt the system?", "Firewalls, IDS/IPS, patching, MFA, encryption", "Intrusion, data breach, service outage"],
              ["Information assurance", "Can we trust the information?", "Hashing, digital signatures, provenance, classification", "Silent corruption, repudiation, misinformation"],
              ["Cyber resilience", "Can we operate through failure?", "Backups, failover, playbooks, BCP/DR", "Prolonged outage, unrecoverable loss"],
            ],
          },
        ],
        el: [
          "Η **κυβερνοασφάλεια** είναι ο επιστημονικός και επαγγελματικός κλάδος που προστατεύει δικτυωμένα συστήματα, δεδομένα και υπηρεσίες από μη εξουσιοδοτημένη πρόσβαση, τροποποίηση, διακοπή και καταστροφή, διασφαλίζοντας ταυτόχρονα τη νόμιμη λειτουργία τους ακόμη και υπό εχθρικές συνθήκες. Η φράση *υπό εχθρικές συνθήκες* έχει ιδιαίτερη σημασία: σε αντίθεση με τη μηχανική αξιοπιστίας, η οποία αντιμετωπίζει τυχαία σφάλματα, η ασφάλεια προϋποθέτει έναν ευφυή αντίπαλο που αναζητά συστηματικά το πιο αδύναμο σημείο.",
          "Η **διασφάλιση πληροφοριών** (Information Assurance, IA) έχει ευρύτερο πεδίο. Συνδυάζει τεχνικά, διαδικαστικά και διοικητικά μέτρα, ώστε να διατηρείται *τεκμηριωμένη εμπιστοσύνη* στην πληροφορία σε όλο τον κύκλο ζωής της —από τη δημιουργία και την αποθήκευση έως τη μετάδοση, τη χρήση και την τελική καταστροφή της. Επομένως, η διασφάλιση πληροφοριών δεν αφορά μόνο την αντίσταση σε επιθέσεις, αλλά και τη γνησιότητα, την προέλευση και τη διαρκή χρησιμότητα της πληροφορίας.",
          "Η **κυβερνοανθεκτικότητα** διευρύνει και τις δύο έννοιες. Περιγράφει την ικανότητα ενός οργανισμού να προβλέπει, να αντέχει, να ανακάμπτει και να προσαρμόζεται σε δυσμενή κυβερνογεγονότα, συμπεριλαμβανομένων εκείνων που επιτυγχάνουν παρά τα προληπτικά μέτρα. Με απλά λόγια, η κυβερνοασφάλεια ρωτά *πώς αποτρέπουμε και εντοπίζουμε μια παραβίαση;*, η διασφάλιση πληροφοριών *μπορούμε να εμπιστευτούμε την πληροφορία μας;* και η ανθεκτικότητα *μπορούμε να συνεχίσουμε να λειτουργούμε και πόσο γρήγορα θα ανακάμψουμε;*",
          {
            t: "table",
            caption: "Πίνακας 1.1 — Τρεις συγγενείς αλλά διακριτές έννοιες",
            head: ["Έννοια", "Βασικό ερώτημα", "Τυπικά μέτρα", "Συνέπεια αν παραμεληθεί"],
            rows: [
              ["Κυβερνοασφάλεια", "Μπορεί ένας αντίπαλος να παραβιάσει ή να διαταράξει το σύστημα;", "Τείχη προστασίας, IDS/IPS, ενημερώσεις, MFA, κρυπτογράφηση", "Εισβολή, διαρροή δεδομένων, διακοπή υπηρεσίας"],
              ["Διασφάλιση πληροφοριών", "Μπορούμε να εμπιστευτούμε την πληροφορία;", "Κατακερματισμός, ψηφιακές υπογραφές, προέλευση, διαβάθμιση", "Αθόρυβη αλλοίωση, αποποίηση ευθύνης, παραπληροφόρηση"],
              ["Κυβερνοανθεκτικότητα", "Μπορούμε να λειτουργούμε παρά την αστοχία;", "Αντίγραφα ασφαλείας, εφεδρεία, σχέδια απόκρισης, BCP/DR", "Παρατεταμένη διακοπή, μη ανακτήσιμη απώλεια"],
            ],
          },
        ],
      },
    },
    {
      id: "1.2",
      title: { en: "The CIA triad and its extensions", el: "Η τριάδα CIA και οι επεκτάσεις της" },
      body: {
        en: [
          "The **CIA triad**—Confidentiality, Integrity and Availability—is the standard way of breaking a security requirement into its core objectives. **Confidentiality** limits disclosure of information to authorised parties; it is typically enforced through access control and encryption. **Integrity** protects information against unauthorised or undetected modification, so that data remain accurate and complete; hashes, digital signatures, version control and validated transactions all serve this goal. **Availability** ensures timely and reliable access for authorised users, and is supported by redundancy, capacity planning, rate limiting and recovery procedures.",
          "Several further properties refine the triad rather than replace it. **Authenticity** establishes that data or a party is genuinely what it claims to be. **Accountability** links every action to an identifiable subject by means of trustworthy audit records. **Non-repudiation** provides evidence that makes it difficult for a party to deny an action later—although its strength ultimately depends on key custody, identity proofing and the legal context.",
          "The three objectives interact and frequently compete. Encryption strengthens confidentiality, but if the keys are lost the data become unavailable. Redundancy improves availability, yet every additional replica is one more system that must be protected and kept consistent. A well-reasoned architecture therefore states which objectives each control supports, identifies any new exposure that the control introduces, and explains how the remaining (residual) risk will be managed.",
          { t: "box", kind: "example", title: "Worked example", text: "A hospital encrypts its patient database (confidentiality) and replicates it to a second site (availability). If the only copy of the decryption key is stored on the primary server and that server is destroyed by ransomware, the replica is useless: confidentiality has been preserved at the expense of availability. Sound key management is the control that reconciles the two goals." },
        ],
        el: [
          "Η **τριάδα CIA** —Εμπιστευτικότητα (Confidentiality), Ακεραιότητα (Integrity) και Διαθεσιμότητα (Availability)— αποτελεί τον καθιερωμένο τρόπο ανάλυσης μιας απαίτησης ασφάλειας στους βασικούς της στόχους. Η **εμπιστευτικότητα** περιορίζει την αποκάλυψη της πληροφορίας μόνο σε εξουσιοδοτημένα μέρη· επιβάλλεται συνήθως μέσω ελέγχου πρόσβασης και κρυπτογράφησης. Η **ακεραιότητα** προστατεύει την πληροφορία από μη εξουσιοδοτημένη ή μη ανιχνεύσιμη τροποποίηση, ώστε τα δεδομένα να παραμένουν ακριβή και πλήρη· σε αυτόν τον στόχο συμβάλλουν οι συναρτήσεις κατακερματισμού, οι ψηφιακές υπογραφές, ο έλεγχος εκδόσεων και οι επικυρωμένες συναλλαγές. Η **διαθεσιμότητα** εξασφαλίζει έγκαιρη και αξιόπιστη πρόσβαση στους εξουσιοδοτημένους χρήστες και υποστηρίζεται από πλεονασμό, σχεδιασμό χωρητικότητας, περιορισμό ρυθμού αιτημάτων και διαδικασίες ανάκαμψης.",
          "Ορισμένες πρόσθετες ιδιότητες εξειδικεύουν την τριάδα χωρίς να την αντικαθιστούν. Η **αυθεντικότητα** βεβαιώνει ότι ένα δεδομένο ή ένα μέρος είναι πράγματι αυτό που ισχυρίζεται ότι είναι. Η **λογοδοσία** συνδέει κάθε ενέργεια με ένα αναγνωρίσιμο υποκείμενο μέσω αξιόπιστων αρχείων καταγραφής. Η **μη αποποίηση** παρέχει αποδεικτικά στοιχεία που καθιστούν δύσκολη τη μεταγενέστερη άρνηση μιας ενέργειας· η ισχύς της, ωστόσο, εξαρτάται τελικά από τη φύλαξη των κλειδιών, την ταυτοποίηση των προσώπων και το νομικό πλαίσιο.",
          "Οι τρεις στόχοι αλληλεπιδρούν και συχνά ανταγωνίζονται μεταξύ τους. Η κρυπτογράφηση ενισχύει την εμπιστευτικότητα, όμως αν χαθούν τα κλειδιά τα δεδομένα καθίστανται μη διαθέσιμα. Ο πλεονασμός βελτιώνει τη διαθεσιμότητα, αλλά κάθε επιπλέον αντίγραφο είναι ένα ακόμη σύστημα που πρέπει να προστατεύεται και να διατηρείται συνεπές. Μια τεκμηριωμένη αρχιτεκτονική δηλώνει, επομένως, ποιους στόχους υπηρετεί κάθε μέτρο, εντοπίζει τυχόν νέα έκθεση που αυτό εισάγει και εξηγεί πώς θα αντιμετωπιστεί ο κίνδυνος που απομένει (υπολειπόμενος κίνδυνος).",
          { t: "box", kind: "example", title: "Παράδειγμα εφαρμογής", text: "Ένα νοσοκομείο κρυπτογραφεί τη βάση δεδομένων ασθενών (εμπιστευτικότητα) και τη συγχρονίζει με δεύτερη εγκατάσταση (διαθεσιμότητα). Αν το μοναδικό αντίγραφο του κλειδιού αποκρυπτογράφησης βρίσκεται στον κύριο διακομιστή και αυτός καταστραφεί από λυτρισμικό, το αντίγραφο της βάσης είναι άχρηστο: η εμπιστευτικότητα διατηρήθηκε εις βάρος της διαθεσιμότητας. Το μέτρο που συμφιλιώνει τους δύο στόχους είναι η ορθή διαχείριση κλειδιών." },
        ],
      },
    },
    {
      id: "1.3",
      title: { en: "Design principles that govern all later chapters", el: "Αρχές σχεδίασης που διέπουν όλα τα επόμενα κεφάλαια" },
      body: {
        en: [
          "Four principles recur throughout this book as architectural constraints. **Security by design** requires security properties to be specified, modelled, implemented and verified from the very beginning of the lifecycle, rather than added after deployment, when changes are costly and incomplete. **Defence in depth** combines independent and diverse preventive, detective and corrective controls, so that the failure of any single layer does not decide the outcome. The **principle of least privilege** grants each user, process or service only the authority required for a defined task and for a defined period, and removes that authority when it is no longer needed. **Fail-safe defaults** deny access unless it is explicitly permitted, and require components to fail into a known safe state.",
          "These principles originate in the seminal 1975 paper by Saltzer and Schroeder, which also introduced *economy of mechanism* (keep designs small and simple so that they can be inspected), *complete mediation* (check every access, not only the first), *open design* (security must not depend on the secrecy of the design), *separation of privilege* (require more than one independent condition for sensitive actions), *least common mechanism* (minimise shared components between users) and *psychological acceptability* (security must be usable, or people will circumvent it).",
          "The principles are complementary and must be applied together. Layering without least privilege simply multiplies the number of powerful accounts an attacker can steal; a strict deny-by-default policy without workable procedures encourages users to find unsafe workarounds. A useful professional habit is to name the violated principle in every post-incident review—for example, a wire transfer approved by a single person violates separation of privilege.",
        ],
        el: [
          "Τέσσερις αρχές επανέρχονται σε όλο το βιβλίο ως αρχιτεκτονικοί περιορισμοί. Η **ασφάλεια εκ σχεδιασμού** (security by design) απαιτεί οι ιδιότητες ασφάλειας να προσδιορίζονται, να μοντελοποιούνται, να υλοποιούνται και να επαληθεύονται από την αρχή του κύκλου ζωής και όχι να προστίθενται μετά την παραγωγική λειτουργία, όταν οι αλλαγές είναι δαπανηρές και αποσπασματικές. Η **άμυνα σε βάθος** συνδυάζει ανεξάρτητα και ποικίλα προληπτικά, ανιχνευτικά και διορθωτικά μέτρα, ώστε η αστοχία ενός μεμονωμένου επιπέδου να μην κρίνει την έκβαση. Η **αρχή του ελάχιστου προνομίου** παραχωρεί σε κάθε χρήστη, διεργασία ή υπηρεσία μόνο την εξουσία που απαιτείται για συγκεκριμένη εργασία και για συγκεκριμένο χρονικό διάστημα, και την ανακαλεί όταν δεν είναι πλέον αναγκαία. Οι **ασφαλείς προεπιλογές** (fail-safe defaults) απορρίπτουν την πρόσβαση εκτός αν έχει ρητά επιτραπεί και απαιτούν από τα συστατικά ενός συστήματος να καταλήγουν, σε περίπτωση αστοχίας, σε γνωστή ασφαλή κατάσταση.",
          "Οι αρχές αυτές προέρχονται από το θεμελιώδες άρθρο των Saltzer και Schroeder (1975), το οποίο εισήγαγε επίσης την *οικονομία μηχανισμού* (απλοί και μικροί σχεδιασμοί, ώστε να μπορούν να ελεγχθούν), την *πλήρη διαμεσολάβηση* (έλεγχος κάθε πρόσβασης και όχι μόνο της πρώτης), τον *ανοιχτό σχεδιασμό* (η ασφάλεια δεν πρέπει να εξαρτάται από τη μυστικότητα του σχεδιασμού), τον *διαχωρισμό προνομίων* (περισσότερες από μία ανεξάρτητες προϋποθέσεις για ευαίσθητες ενέργειες), τον *ελάχιστο κοινό μηχανισμό* (περιορισμός των κοινόχρηστων στοιχείων μεταξύ χρηστών) και την *ψυχολογική αποδοχή* (η ασφάλεια πρέπει να είναι εύχρηστη, διαφορετικά οι χρήστες θα την παρακάμψουν).",
          "Οι αρχές είναι συμπληρωματικές και πρέπει να εφαρμόζονται από κοινού. Η πολυεπίπεδη άμυνα χωρίς ελάχιστο προνόμιο απλώς πολλαπλασιάζει τους ισχυρούς λογαριασμούς που μπορεί να υποκλέψει ένας επιτιθέμενος· μια αυστηρή πολιτική άρνησης εξ ορισμού χωρίς λειτουργικές διαδικασίες ωθεί τους χρήστες σε μη ασφαλείς παρακάμψεις. Μια χρήσιμη επαγγελματική πρακτική είναι να κατονομάζεται η αρχή που παραβιάστηκε σε κάθε ανασκόπηση μετά από περιστατικό· για παράδειγμα, μια τραπεζική μεταφορά που εγκρίνεται από ένα μόνο πρόσωπο παραβιάζει τον διαχωρισμό προνομίων.",
        ],
      },
    },
    {
      id: "1.4",
      title: { en: "Historical evolution: from Creeper to the hyper-connected enterprise", el: "Ιστορική εξέλιξη: από το Creeper στον υπερσυνδεδεμένο οργανισμό" },
      body: {
        en: [
          "Modern security architecture is best understood as an accumulation of lessons, not as a sequence of threats that replaced one another. Early ARPANET experiments such as *Creeper* and its counterpart *Reaper* (early 1970s) demonstrated both self-propagating code and automated removal. The *Morris Worm* of 1988 showed how a single software flaw could cascade through interconnected hosts, and led directly to the creation of the first Computer Emergency Response Team (CERT).",
          "The commercial Internet and the World Wide Web then dramatically widened the attack surface: remotely reachable services, SQL injection, cross-site scripting, botnets and organised cybercrime became everyday concerns. In the following decades, cloud computing, mobile platforms, ransomware-as-a-service, identity-centric attacks, software supply-chain compromises and the convergence of IT with operational technology (OT) introduced new administrative domains and new dependencies.",
          "Each era rested on a trust assumption that attackers eventually disproved. Today's enterprise is hybrid, highly interconnected and dependent on external identity, software and infrastructure providers. The practical conclusion is that network location alone can no longer establish trust; identity, device health and authorisation must be verified continuously—the core idea of Zero Trust, which Chapter 13 examines in detail.",
          {
            t: "table",
            caption: "Table 1.2 — Trust assumptions and the failures that disproved them",
            head: ["Era", "Trust assumption", "Representative failure", "Resulting control innovation"],
            rows: [
              ["1970s–80s", "Trusted hosts and trusted users", "Creeper, Morris Worm", "Access control, CERTs"],
              ["1990s–2000s", "Trusted inside, hostile outside", "Code Red, SQL Slammer", "Firewalls, patch management, antivirus"],
              ["2010s", "Trusted vendors, VPN perimeter", "Target breach, WannaCry", "Segmentation, EDR, MFA"],
              ["2020s", "Never trust, always verify", "SolarWinds, OT ransomware", "Zero Trust, SBOM, XDR"],
            ],
          },
        ],
        el: [
          "Η σύγχρονη αρχιτεκτονική ασφάλειας γίνεται καλύτερα κατανοητή ως συσσώρευση διδαγμάτων και όχι ως αλληλουχία απειλών που η μία αντικατέστησε την άλλη. Τα πρώιμα πειράματα στο ARPANET, όπως το *Creeper* και το αντίστοιχο *Reaper* (αρχές της δεκαετίας του 1970), έδειξαν τόσο τη δυνατότητα αυτοδιαδιδόμενου κώδικα όσο και την αυτοματοποιημένη αφαίρεσή του. Το *Morris Worm* του 1988 ανέδειξε πώς ένα μεμονωμένο σφάλμα λογισμικού μπορεί να εξαπλωθεί αλυσιδωτά σε διασυνδεδεμένους υπολογιστές και οδήγησε άμεσα στη δημιουργία της πρώτης Ομάδας Απόκρισης σε Υπολογιστικά Περιστατικά (CERT).",
          "Στη συνέχεια, το εμπορικό Διαδίκτυο και ο Παγκόσμιος Ιστός διεύρυναν δραματικά την επιφάνεια επίθεσης: οι απομακρυσμένα προσβάσιμες υπηρεσίες, η έγχυση SQL, το cross-site scripting, τα botnet και το οργανωμένο κυβερνοέγκλημα έγιναν καθημερινά ζητήματα. Τις επόμενες δεκαετίες, το υπολογιστικό νέφος, οι κινητές πλατφόρμες, το λυτρισμικό ως υπηρεσία, οι επιθέσεις με επίκεντρο την ταυτότητα, οι παραβιάσεις της εφοδιαστικής αλυσίδας λογισμικού και η σύγκλιση της πληροφορικής με την επιχειρησιακή τεχνολογία (OT) εισήγαγαν νέα διοικητικά πεδία και νέες εξαρτήσεις.",
          "Κάθε εποχή στηρίχθηκε σε μια παραδοχή εμπιστοσύνης που οι επιτιθέμενοι τελικά διέψευσαν. Ο σημερινός οργανισμός είναι υβριδικός, έντονα διασυνδεδεμένος και εξαρτημένος από εξωτερικούς παρόχους ταυτότητας, λογισμικού και υποδομών. Το πρακτικό συμπέρασμα είναι ότι η θέση μέσα στο δίκτυο δεν αρκεί πλέον για να θεμελιώσει εμπιστοσύνη· η ταυτότητα, η κατάσταση της συσκευής και η εξουσιοδότηση πρέπει να επαληθεύονται συνεχώς. Αυτή είναι η βασική ιδέα της αρχιτεκτονικής μηδενικής εμπιστοσύνης (Zero Trust), την οποία εξετάζει αναλυτικά το Κεφάλαιο 13.",
          {
            t: "table",
            caption: "Πίνακας 1.2 — Παραδοχές εμπιστοσύνης και οι αστοχίες που τις διέψευσαν",
            head: ["Περίοδος", "Παραδοχή εμπιστοσύνης", "Χαρακτηριστική αστοχία", "Καινοτομία ελέγχου που προέκυψε"],
            rows: [
              ["1970–1980", "Αξιόπιστοι υπολογιστές και χρήστες", "Creeper, Morris Worm", "Έλεγχος πρόσβασης, CERT"],
              ["1990–2000", "Ασφαλές εσωτερικό, εχθρικό εξωτερικό", "Code Red, SQL Slammer", "Τείχη προστασίας, διαχείριση ενημερώσεων, antivirus"],
              ["2010–2020", "Αξιόπιστοι προμηθευτές, περίμετρος VPN", "Παραβίαση Target, WannaCry", "Κατάτμηση δικτύου, EDR, MFA"],
              ["2020 κ.ε.", "Ποτέ μην εμπιστεύεσαι, πάντα επαλήθευε", "SolarWinds, λυτρισμικό σε OT", "Zero Trust, SBOM, XDR"],
            ],
          },
        ],
      },
    },
    {
      id: "1.5",
      title: { en: "Threat, vulnerability and risk: the working vocabulary", el: "Απειλή, ευπάθεια και κίνδυνος: το βασικό λεξιλόγιο" },
      body: {
        en: [
          "Three terms are often used interchangeably in everyday speech, but they have distinct technical meanings. A **threat** is any circumstance, event or actor capable of causing harm—a criminal group, a disgruntled employee, a flood. A **vulnerability** is a weakness that a threat can exploit or trigger—an unpatched service, a weak password, a missing backup. **Risk** is the potential for adverse impact under uncertainty; it only exists when a relevant threat meets an exploitable vulnerability in an asset that matters.",
          "The familiar expression *risk ≈ likelihood × impact* is a useful prioritisation model, not a physical law. Organisations must define their own scales, state their assumptions and acknowledge uncertainty. A **control** is any measure that modifies likelihood, impact or both: multi-factor authentication lowers the likelihood of account takeover, while immutable backups lower the impact of ransomware.",
          "After controls are applied, **residual risk** remains and must be treated explicitly. There are four options: *mitigate* it further, *accept* it (by a manager who has the authority to do so), *transfer* it where meaningful (for example, through insurance or contracts), or *avoid* it by abandoning the risky activity. Mature programmes evaluate their control portfolio by coverage, independence and actual operating effectiveness—not by counting the number of products deployed.",
        ],
        el: [
          "Τρεις όροι χρησιμοποιούνται συχνά εναλλακτικά στην καθημερινή γλώσσα, έχουν όμως διακριτό τεχνικό περιεχόμενο. **Απειλή** είναι κάθε περίσταση, γεγονός ή δράστης που μπορεί να προκαλέσει βλάβη —μια εγκληματική ομάδα, ένας δυσαρεστημένος υπάλληλος, μια πλημμύρα. **Ευπάθεια** είναι μια αδυναμία που μπορεί να εκμεταλλευτεί ή να ενεργοποιήσει μια απειλή —μια υπηρεσία χωρίς ενημερώσεις, ένας αδύναμος κωδικός πρόσβασης, η απουσία αντιγράφων ασφαλείας. **Κίνδυνος** είναι η δυνατότητα δυσμενούς επίπτωσης υπό συνθήκες αβεβαιότητας· υπάρχει μόνο όταν μια σχετική απειλή συναντά μια εκμεταλλεύσιμη ευπάθεια σε ένα περιουσιακό στοιχείο που έχει αξία.",
          "Η γνωστή έκφραση *κίνδυνος ≈ πιθανότητα × επίπτωση* είναι χρήσιμο μοντέλο ιεράρχησης και όχι φυσικός νόμος. Κάθε οργανισμός οφείλει να ορίζει τις δικές του κλίμακες, να δηλώνει τις παραδοχές του και να αναγνωρίζει την αβεβαιότητα. **Μέτρο ελέγχου** είναι κάθε ενέργεια που μεταβάλλει την πιθανότητα, την επίπτωση ή και τα δύο: ο έλεγχος ταυτότητας πολλαπλών παραγόντων μειώνει την πιθανότητα κατάληψης λογαριασμού, ενώ τα αμετάβλητα αντίγραφα ασφαλείας μειώνουν την επίπτωση ενός λυτρισμικού.",
          "Μετά την εφαρμογή των μέτρων απομένει ο **υπολειπόμενος κίνδυνος**, ο οποίος πρέπει να αντιμετωπίζεται ρητά. Υπάρχουν τέσσερις επιλογές: η περαιτέρω *μείωση*, η *αποδοχή* (από στέλεχος που έχει τη σχετική αρμοδιότητα), η *μεταφορά* όπου αυτό έχει νόημα (για παράδειγμα, μέσω ασφάλισης ή συμβάσεων) και η *αποφυγή*, δηλαδή η εγκατάλειψη της επικίνδυνης δραστηριότητας. Τα ώριμα προγράμματα ασφάλειας αξιολογούν το σύνολο των μέτρων τους με βάση την κάλυψη, την ανεξαρτησία και την πραγματική λειτουργική αποτελεσματικότητα —όχι με βάση τον αριθμό των προϊόντων που έχουν εγκαταστήσει.",
        ],
      },
    },
    {
      id: "1.6",
      title: { en: "The Parkerian Hexad and the McCumber Cube", el: "Η εξάδα του Parker και ο κύβος του McCumber" },
      body: {
        en: [
          "The CIA triad is necessary but not always sufficient. Donn Parker proposed the **Parkerian Hexad**, which adds *authenticity*, *possession (control)* and *utility* to the three classic properties. The additions capture situations that the triad describes poorly. When an encrypted laptop is stolen, confidentiality may remain intact, yet possession has clearly been lost. When encrypted data survive but the keys are irrecoverably lost, the data are still confidential, but they have lost all utility.",
          "The **McCumber Cube** offers a complementary, three-dimensional view. It examines security across the three *states* of information (storage, processing and transmission), the three *safeguard classes* (technology, policy and practice, and people) and the security goals themselves. Used together, the two models expose incomplete claims such as “the data are encrypted, therefore they are secure”. A reviewer is prompted to ask: which properties are protected, in which state, and by which combination of technology, procedure and human behaviour?",
        ],
        el: [
          "Η τριάδα CIA είναι αναγκαία, αλλά δεν είναι πάντοτε επαρκής. Ο Donn Parker πρότεινε την **εξάδα του Parker** (Parkerian Hexad), η οποία προσθέτει στις τρεις κλασικές ιδιότητες την *αυθεντικότητα*, την *κατοχή (έλεγχο)* και τη *χρησιμότητα*. Οι προσθήκες αυτές αποτυπώνουν καταστάσεις που η τριάδα περιγράφει ελλιπώς. Όταν κλαπεί ένας κρυπτογραφημένος φορητός υπολογιστής, η εμπιστευτικότητα μπορεί να παραμένει άθικτη, όμως η κατοχή έχει σαφώς απολεσθεί. Όταν τα κρυπτογραφημένα δεδομένα διασώζονται αλλά τα κλειδιά έχουν χαθεί οριστικά, τα δεδομένα παραμένουν εμπιστευτικά, έχουν όμως χάσει κάθε χρησιμότητα.",
          "Ο **κύβος του McCumber** προσφέρει μια συμπληρωματική, τρισδιάστατη οπτική. Εξετάζει την ασφάλεια στις τρεις *καταστάσεις* της πληροφορίας (αποθήκευση, επεξεργασία, μετάδοση), στις τρεις *κατηγορίες μέτρων προστασίας* (τεχνολογία, πολιτικές και πρακτικές, άνθρωποι) και στους ίδιους τους στόχους ασφάλειας. Η συνδυαστική χρήση των δύο μοντέλων αποκαλύπτει ελλιπείς ισχυρισμούς όπως «τα δεδομένα είναι κρυπτογραφημένα, άρα είναι ασφαλή». Ο αξιολογητής καλείται να ρωτήσει: ποιες ιδιότητες προστατεύονται, σε ποια κατάσταση της πληροφορίας και με ποιον συνδυασμό τεχνολογίας, διαδικασιών και ανθρώπινης συμπεριφοράς;",
        ],
      },
    },
    {
      id: "1.7",
      title: { en: "Formal security models: Bell–LaPadula, Biba and Clark–Wilson", el: "Τυπικά μοντέλα ασφάλειας: Bell–LaPadula, Biba και Clark–Wilson" },
      body: {
        en: [
          "Principles tell us *what* to aim for; formal models state *precisely* which system behaviours are permitted, so that a design can be analysed and, ideally, proven correct. The **Bell–LaPadula (BLP)** model, developed for military systems in the 1970s, protects confidentiality through two rules: *no read up* (a subject may not read objects at a higher classification) and *no write down* (a subject may not write information to a lower classification, which would leak secrets).",
          "The **Biba** model is the integrity counterpart of BLP and inverts its rules: *no read down* (a trusted process should not consume less trustworthy data) and *no write up* (an untrusted subject may not modify more trustworthy objects). Commercial environments, however, care less about classification levels and more about correct transactions. The **Clark–Wilson** model therefore enforces integrity through *well-formed transactions*, which may only be executed by authorised users via certified programs, combined with *separation of duties* and complete audit trails.",
          { t: "box", kind: "note", title: "Why this matters in practice", text: "Mandatory integrity levels in Windows (Chapter 2) are a direct descendant of Biba, and the maker–checker approval of financial transfers (Chapter 5) is a textbook Clark–Wilson control." },
        ],
        el: [
          "Οι αρχές μάς λένε *τι* επιδιώκουμε· τα τυπικά μοντέλα ορίζουν *με ακρίβεια* ποιες συμπεριφορές ενός συστήματος επιτρέπονται, ώστε ένας σχεδιασμός να μπορεί να αναλυθεί και, ιδανικά, να αποδειχθεί ορθός. Το μοντέλο **Bell–LaPadula (BLP)**, που αναπτύχθηκε για στρατιωτικά συστήματα τη δεκαετία του 1970, προστατεύει την εμπιστευτικότητα με δύο κανόνες: *όχι ανάγνωση προς τα πάνω* (ένα υποκείμενο δεν μπορεί να διαβάσει αντικείμενα υψηλότερης διαβάθμισης) και *όχι εγγραφή προς τα κάτω* (ένα υποκείμενο δεν μπορεί να γράψει πληροφορία σε χαμηλότερη διαβάθμιση, κάτι που θα διέρρεε απόρρητα).",
          "Το μοντέλο **Biba** αποτελεί το αντίστοιχο του BLP για την ακεραιότητα και αντιστρέφει τους κανόνες του: *όχι ανάγνωση προς τα κάτω* (μια αξιόπιστη διεργασία δεν πρέπει να καταναλώνει λιγότερο αξιόπιστα δεδομένα) και *όχι εγγραφή προς τα πάνω* (ένα μη αξιόπιστο υποκείμενο δεν μπορεί να τροποποιεί πιο αξιόπιστα αντικείμενα). Στα εμπορικά περιβάλλοντα, ωστόσο, ενδιαφέρουν λιγότερο τα επίπεδα διαβάθμισης και περισσότερο η ορθότητα των συναλλαγών. Γι' αυτό το μοντέλο **Clark–Wilson** επιβάλλει την ακεραιότητα μέσω *καλά σχηματισμένων συναλλαγών*, οι οποίες εκτελούνται μόνο από εξουσιοδοτημένους χρήστες μέσω πιστοποιημένων προγραμμάτων, σε συνδυασμό με τον *διαχωρισμό καθηκόντων* και την πλήρη καταγραφή ελέγχου.",
          { t: "box", kind: "note", title: "Γιατί έχει πρακτική σημασία", text: "Τα υποχρεωτικά επίπεδα ακεραιότητας των Windows (Κεφάλαιο 2) προέρχονται άμεσα από το μοντέλο Biba, ενώ η έγκριση τραπεζικών μεταφορών από δύο πρόσωπα —δημιουργό και ελεγκτή (Κεφάλαιο 5)— αποτελεί κλασικό μέτρο τύπου Clark–Wilson." },
        ],
      },
    },
    {
      id: "1.8",
      title: { en: "Evaluation criteria: from TCSEC to the Common Criteria", el: "Κριτήρια αξιολόγησης: από το TCSEC στα Common Criteria" },
      body: {
        en: [
          "How can a customer know whether a product actually delivers the security its vendor claims? Evaluation schemes answer this question through independent, repeatable assessment. The U.S. **Trusted Computer System Evaluation Criteria (TCSEC)**, known as the *Orange Book* (1983), graded operating systems in divisions from D (minimal protection) to A1 (formally verified design). Europe followed with **ITSEC**, which separated functionality from assurance.",
          "Both were superseded by the international **Common Criteria (ISO/IEC 15408)**. Under the Common Criteria, a *Protection Profile* describes the security requirements for a class of products (for example, firewalls), and a vendor's *Security Target* states how a specific product meets them. Accredited laboratories then evaluate the product to an **Evaluation Assurance Level (EAL1–EAL7)**. It is essential to understand what an EAL means: it measures the *rigour* of the evaluation, not the *strength* of the product. An EAL4 product has been examined more thoroughly than an EAL2 product, but only against the requirements its Security Target declared.",
        ],
        el: [
          "Πώς μπορεί ένας πελάτης να γνωρίζει αν ένα προϊόν παρέχει πράγματι την ασφάλεια που ισχυρίζεται ο κατασκευαστής του; Τα σχήματα αξιολόγησης απαντούν σε αυτό το ερώτημα μέσω ανεξάρτητης και επαναλήψιμης αξιολόγησης. Τα αμερικανικά **Trusted Computer System Evaluation Criteria (TCSEC)**, γνωστά ως *Πορτοκαλί Βιβλίο* (Orange Book, 1983), κατέτασσαν τα λειτουργικά συστήματα σε κατηγορίες από D (ελάχιστη προστασία) έως A1 (τυπικά επαληθευμένος σχεδιασμός). Η Ευρώπη ακολούθησε με το **ITSEC**, το οποίο διαχώρισε τη λειτουργικότητα από τη διασφάλιση.",
          "Και τα δύο αντικαταστάθηκαν από τα διεθνή **Common Criteria (ISO/IEC 15408)**. Στο πλαίσιο αυτό, ένα *Προφίλ Προστασίας* (Protection Profile) περιγράφει τις απαιτήσεις ασφάλειας για μια κατηγορία προϊόντων (για παράδειγμα, τείχη προστασίας), ενώ ο *Στόχος Ασφάλειας* (Security Target) του κατασκευαστή δηλώνει πώς ένα συγκεκριμένο προϊόν τις ικανοποιεί. Διαπιστευμένα εργαστήρια αξιολογούν στη συνέχεια το προϊόν σε ένα **Επίπεδο Διασφάλισης Αξιολόγησης (EAL1–EAL7)**. Είναι κρίσιμο να κατανοηθεί τι σημαίνει το EAL: μετρά την *αυστηρότητα* της αξιολόγησης και όχι την *ισχύ* του προϊόντος. Ένα προϊόν EAL4 έχει εξεταστεί διεξοδικότερα από ένα προϊόν EAL2, αλλά μόνο ως προς τις απαιτήσεις που δήλωσε ο δικός του Στόχος Ασφάλειας.",
        ],
      },
    },
  ],
  terms: {
    en: [
      { term: "CIA triad", def: "Confidentiality, integrity and availability: the three core objectives of information security." },
      { term: "Non-repudiation", def: "Evidence that prevents a party from credibly denying an action it performed." },
      { term: "Least privilege", def: "Granting only the minimum authority required for a task, for the minimum time." },
      { term: "Defence in depth", def: "Layering independent, diverse controls so that no single failure is decisive." },
      { term: "Residual risk", def: "The risk that remains after controls have been applied and must be explicitly treated." },
      { term: "EAL", def: "Evaluation Assurance Level (Common Criteria): the rigour of an independent product evaluation." },
    ],
    el: [
      { term: "Τριάδα CIA", def: "Εμπιστευτικότητα, ακεραιότητα και διαθεσιμότητα: οι τρεις βασικοί στόχοι της ασφάλειας πληροφοριών." },
      { term: "Μη αποποίηση", def: "Αποδεικτικά στοιχεία που εμποδίζουν ένα μέρος να αρνηθεί αξιόπιστα μια ενέργεια που εκτέλεσε." },
      { term: "Ελάχιστο προνόμιο", def: "Παραχώρηση μόνο της ελάχιστης αναγκαίας εξουσίας για μια εργασία και για τον ελάχιστο αναγκαίο χρόνο." },
      { term: "Άμυνα σε βάθος", def: "Διαστρωμάτωση ανεξάρτητων και ποικίλων μέτρων, ώστε καμία μεμονωμένη αστοχία να μην είναι καθοριστική." },
      { term: "Υπολειπόμενος κίνδυνος", def: "Ο κίνδυνος που απομένει μετά την εφαρμογή των μέτρων και πρέπει να αντιμετωπιστεί ρητά." },
      { term: "EAL", def: "Επίπεδο Διασφάλισης Αξιολόγησης (Common Criteria): η αυστηρότητα μιας ανεξάρτητης αξιολόγησης προϊόντος." },
    ],
  },
  summary: {
    en: [
      "Cybersecurity, information assurance and cyber resilience answer different questions: preventing compromise, trusting information and continuing to operate through failure.",
      "The CIA triad remains the foundation, but authenticity, accountability, non-repudiation, possession and utility are needed to describe many real situations.",
      "Security controls are chosen by principle—least privilege, defence in depth, fail-safe defaults, security by design—before they are chosen by product.",
      "Risk emerges when a threat meets a vulnerability in a valuable asset; residual risk must always be explicitly mitigated, accepted, transferred or avoided.",
      "Formal models and evaluation schemes make security claims precise and independently verifiable.",
    ],
    el: [
      "Η κυβερνοασφάλεια, η διασφάλιση πληροφοριών και η κυβερνοανθεκτικότητα απαντούν σε διαφορετικά ερωτήματα: την αποτροπή της παραβίασης, την εμπιστοσύνη στην πληροφορία και τη συνέχιση της λειτουργίας παρά την αστοχία.",
      "Η τριάδα CIA παραμένει το θεμέλιο, όμως η αυθεντικότητα, η λογοδοσία, η μη αποποίηση, η κατοχή και η χρησιμότητα είναι απαραίτητες για την περιγραφή πολλών πραγματικών καταστάσεων.",
      "Τα μέτρα ασφάλειας επιλέγονται πρώτα με βάση τις αρχές —ελάχιστο προνόμιο, άμυνα σε βάθος, ασφαλείς προεπιλογές, ασφάλεια εκ σχεδιασμού— και μόνο έπειτα με βάση τα προϊόντα.",
      "Ο κίνδυνος προκύπτει όταν μια απειλή συναντά μια ευπάθεια σε ένα πολύτιμο περιουσιακό στοιχείο· ο υπολειπόμενος κίνδυνος πρέπει πάντοτε να μειώνεται, να γίνεται αποδεκτός, να μεταφέρεται ή να αποφεύγεται ρητά.",
      "Τα τυπικά μοντέλα και τα σχήματα αξιολόγησης καθιστούν τους ισχυρισμούς ασφάλειας ακριβείς και ανεξάρτητα επαληθεύσιμους.",
    ],
  },
  questions: {
    en: [
      "Explain, with an example of your own, why cyber resilience remains necessary even in an organisation with excellent preventive controls.",
      "Describe a scenario in which improving availability weakens confidentiality. How would you reconcile the two objectives?",
      "Which Saltzer–Schroeder principle is violated when all administrators share one domain-administrator password? Justify your answer.",
      "Why does a Common Criteria EAL rating not, on its own, tell you whether a product is suitable for your environment?",
    ],
    el: [
      "Εξηγήστε, με δικό σας παράδειγμα, γιατί η κυβερνοανθεκτικότητα παραμένει αναγκαία ακόμη και σε έναν οργανισμό με εξαιρετικά προληπτικά μέτρα.",
      "Περιγράψτε ένα σενάριο στο οποίο η βελτίωση της διαθεσιμότητας αποδυναμώνει την εμπιστευτικότητα. Πώς θα συμφιλιώνατε τους δύο στόχους;",
      "Ποια αρχή των Saltzer και Schroeder παραβιάζεται όταν όλοι οι διαχειριστές μοιράζονται έναν κοινό κωδικό διαχειριστή τομέα; Τεκμηριώστε την απάντησή σας.",
      "Γιατί η διαβάθμιση EAL των Common Criteria δεν αρκεί από μόνη της για να κρίνετε αν ένα προϊόν είναι κατάλληλο για το δικό σας περιβάλλον;",
    ],
  },
};

export default ch01;

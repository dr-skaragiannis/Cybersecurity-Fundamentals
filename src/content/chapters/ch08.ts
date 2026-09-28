import type { Chapter } from "../types";

const ch08: Chapter = {
  n: 8,
  part: 3,
  title: { en: "Identity, Directory Services and Federated Single Sign-On", el: "Ταυτότητα, Υπηρεσίες Καταλόγου και Ομοσπονδιακή Ενιαία Σύνδεση" },
  subtitle: {
    en: "IAM · Authentication factors and MFA · FIDO2 · RBAC and ABAC · LDAP and Active Directory · Kerberos · SAML, OAuth 2.0 and OpenID Connect",
    el: "IAM · Παράγοντες ταυτοποίησης και MFA · FIDO2 · RBAC και ABAC · LDAP και Active Directory · Kerberos · SAML, OAuth 2.0 και OpenID Connect",
  },
  level: { en: "Intermediate · Identity", el: "Μεσαίο επίπεδο · Ταυτότητα" },
  hours: "9–11",
  intro: {
    en: [
      "As organisations move to cloud services and remote work, the network perimeter loses its meaning and **identity becomes the new perimeter**. Most modern intrusions do not break encryption or exploit exotic vulnerabilities; they log in with stolen or abused credentials. Understanding how identities are created, verified, authorised and federated is therefore central to contemporary defence.",
      "This chapter builds on the cryptographic foundations of Chapter 7. It begins with the architecture of identity and access management and the factors used for authentication, including phishing-resistant FIDO2. It then compares access-control models, explains directory services and the Kerberos protocol that underpins Windows domains—together with the attacks against it—and concludes with the federation protocols SAML, OAuth 2.0 and OpenID Connect that enable single sign-on across organisational boundaries.",
    ],
    el: [
      "Καθώς οι οργανισμοί μεταφέρονται σε υπηρεσίες νέφους και στην απομακρυσμένη εργασία, η περίμετρος του δικτύου χάνει το νόημά της και **η ταυτότητα γίνεται η νέα περίμετρος**. Οι περισσότερες σύγχρονες εισβολές δεν σπάνε την κρυπτογράφηση ούτε εκμεταλλεύονται εξωτικές ευπάθειες· συνδέονται με κλεμμένα ή καταχρηστικά χρησιμοποιούμενα διαπιστευτήρια. Η κατανόηση του τρόπου με τον οποίο δημιουργούνται, επαληθεύονται, εξουσιοδοτούνται και ομοσπονδοποιούνται οι ταυτότητες είναι επομένως κεντρική για τη σύγχρονη άμυνα.",
      "Το κεφάλαιο στηρίζεται στα κρυπτογραφικά θεμέλια του Κεφαλαίου 7. Ξεκινά με την αρχιτεκτονική της διαχείρισης ταυτότητας και πρόσβασης και με τους παράγοντες που χρησιμοποιούνται για την ταυτοποίηση, συμπεριλαμβανομένου του ανθεκτικού στο ψάρεμα FIDO2. Στη συνέχεια συγκρίνει τα μοντέλα ελέγχου πρόσβασης, εξηγεί τις υπηρεσίες καταλόγου και το πρωτόκολλο Kerberos στο οποίο στηρίζονται οι τομείς Windows —μαζί με τις επιθέσεις εναντίον του— και ολοκληρώνεται με τα πρωτόκολλα ομοσπονδίας SAML, OAuth 2.0 και OpenID Connect, που επιτρέπουν την ενιαία σύνδεση πέρα από τα όρια ενός οργανισμού.",
    ],
  },
  outcomes: {
    en: [
      "Distinguish identification, authentication, authorisation and accounting.",
      "Compare authentication factors and explain why FIDO2 resists phishing.",
      "Choose between RBAC, ABAC and rule-based access control for a given scenario.",
      "Explain the Kerberos ticket flow and the principles behind Kerberoasting, pass-the-ticket and golden-ticket attacks.",
      "Describe the roles of SAML, OAuth 2.0 and OpenID Connect and common federation weaknesses.",
    ],
    el: [
      "Να διακρίνετε την αναγνώριση, την ταυτοποίηση (αυθεντικοποίηση), την εξουσιοδότηση και την καταγραφή.",
      "Να συγκρίνετε τους παράγοντες ταυτοποίησης και να εξηγείτε γιατί το FIDO2 αντιστέκεται στο ηλεκτρονικό ψάρεμα.",
      "Να επιλέγετε μεταξύ RBAC, ABAC και ελέγχου πρόσβασης βάσει κανόνων για ένα δεδομένο σενάριο.",
      "Να εξηγείτε τη ροή εισιτηρίων του Kerberos και τις αρχές πίσω από τις επιθέσεις Kerberoasting, pass-the-ticket και golden ticket.",
      "Να περιγράφετε τον ρόλο των SAML, OAuth 2.0 και OpenID Connect, καθώς και συνήθεις αδυναμίες της ομοσπονδίας ταυτοτήτων.",
    ],
  },
  sections: [
    {
      id: "8.1",
      title: { en: "IAM architecture: identification, authentication, authorisation and accounting", el: "Αρχιτεκτονική IAM: αναγνώριση, ταυτοποίηση, εξουσιοδότηση και καταγραφή" },
      body: {
        en: [
          "**Identity and access management (IAM)** is organised around four distinct steps, often abbreviated as *IAAA*. **Identification** is the claim of an identity, such as typing a username. **Authentication** is the verification of that claim, for instance by checking a password or a security key. **Authorisation** determines what the authenticated subject is allowed to do. **Accounting** (or auditing) records what the subject actually did, which supports accountability and investigations. Confusing these steps leads to design errors—for example, treating a successfully authenticated user as automatically authorised for every resource.",
          "IAM also covers the **identity lifecycle**: accounts must be created when people join (*joiner*), adjusted when they change roles (*mover*) and disabled promptly when they leave (*leaver*). Orphaned accounts of former employees and the gradual accumulation of permissions over a career—*privilege creep*—are among the most common findings of security audits. Periodic **access reviews**, in which managers confirm that each permission is still needed, are the standard countermeasure.",
        ],
        el: [
          "Η **διαχείριση ταυτότητας και πρόσβασης** (Identity and Access Management, IAM) οργανώνεται γύρω από τέσσερα διακριτά βήματα. Η **αναγνώριση** είναι η δήλωση μιας ταυτότητας, όπως η πληκτρολόγηση ενός ονόματος χρήστη. Η **ταυτοποίηση** ή **αυθεντικοποίηση** είναι η επαλήθευση αυτής της δήλωσης, για παράδειγμα με έλεγχο ενός κωδικού ή ενός κλειδιού ασφαλείας. Η **εξουσιοδότηση** καθορίζει τι επιτρέπεται να κάνει το υποκείμενο που ταυτοποιήθηκε. Η **καταγραφή** (ή λογιστική παρακολούθηση) καταγράφει τι έκανε πράγματι το υποκείμενο, υποστηρίζοντας τη λογοδοσία και τις έρευνες. Η σύγχυση αυτών των βημάτων οδηγεί σε σχεδιαστικά σφάλματα —για παράδειγμα, στην αντιμετώπιση ενός επιτυχώς ταυτοποιημένου χρήστη ως αυτομάτως εξουσιοδοτημένου για κάθε πόρο.",
          "Η IAM καλύπτει επίσης τον **κύκλο ζωής της ταυτότητας**: οι λογαριασμοί πρέπει να δημιουργούνται όταν κάποιος εντάσσεται στον οργανισμό, να προσαρμόζονται όταν αλλάζει ρόλο και να απενεργοποιούνται άμεσα όταν αποχωρεί. Οι ορφανοί λογαριασμοί πρώην εργαζομένων και η σταδιακή συσσώρευση δικαιωμάτων κατά τη διάρκεια μιας επαγγελματικής πορείας —η λεγόμενη *διολίσθηση προνομίων* (privilege creep)— συγκαταλέγονται στα πιο συνηθισμένα ευρήματα των ελέγχων ασφάλειας. Το καθιερωμένο αντίμετρο είναι οι περιοδικές **επισκοπήσεις πρόσβασης**, κατά τις οποίες οι προϊστάμενοι επιβεβαιώνουν ότι κάθε δικαίωμα εξακολουθεί να είναι αναγκαίο.",
        ],
      },
    },
    {
      id: "8.2",
      title: { en: "Authentication factors, MFA and phishing-resistant FIDO2", el: "Παράγοντες ταυτοποίησης, MFA και FIDO2 ανθεκτικό στο ψάρεμα" },
      body: {
        en: [
          "Authentication factors are traditionally grouped into three categories: **something you know** (a password or PIN), **something you have** (a phone, smart card or security key) and **something you are** (a biometric trait such as a fingerprint). **Multi-factor authentication (MFA)** combines factors from *different* categories, so that stealing one factor is not enough. Not all MFA is equally strong, however. One-time codes sent by SMS can be intercepted through SIM swapping; time-based codes from an authenticator app (TOTP, defined by the OATH standards) and push notifications can still be relayed by a real-time phishing proxy.",
          "**FIDO2/WebAuthn** changes this picture fundamentally. During registration, the authenticator—a security key or the secure hardware in a phone or laptop—creates a key pair specific to the website. At login, it signs a challenge that includes the website's origin. A fake site with a different domain therefore receives a signature that is useless for the real site, and there is no shared secret to steal. This is why FIDO2 is described as **phishing-resistant**, and why *passkeys* based on it are replacing passwords in many services.",
        ],
        el: [
          "Οι παράγοντες ταυτοποίησης ομαδοποιούνται παραδοσιακά σε τρεις κατηγορίες: **κάτι που γνωρίζεις** (κωδικός ή PIN), **κάτι που έχεις** (κινητό τηλέφωνο, έξυπνη κάρτα ή κλειδί ασφαλείας) και **κάτι που είσαι** (βιομετρικό χαρακτηριστικό, όπως το δακτυλικό αποτύπωμα). Ο **έλεγχος ταυτότητας πολλαπλών παραγόντων** (Multi-Factor Authentication, MFA) συνδυάζει παράγοντες από *διαφορετικές* κατηγορίες, ώστε η υποκλοπή ενός παράγοντα να μην αρκεί. Ωστόσο, δεν είναι όλες οι μορφές MFA εξίσου ισχυρές. Οι κωδικοί μίας χρήσης μέσω SMS μπορούν να υποκλαπούν με αντικατάσταση κάρτας SIM (SIM swapping)· οι χρονικά μεταβαλλόμενοι κωδικοί εφαρμογών ταυτοποίησης (TOTP, σύμφωνα με τα πρότυπα OATH) και οι ειδοποιήσεις push μπορούν ακόμη να αναμεταδοθούν από έναν διακομιστή ψαρέματος σε πραγματικό χρόνο.",
          "Το **FIDO2/WebAuthn** αλλάζει ριζικά αυτή την εικόνα. Κατά την εγγραφή, ο αυθεντικοποιητής —ένα κλειδί ασφαλείας ή το ασφαλές υλικό ενός κινητού ή φορητού υπολογιστή— δημιουργεί ένα ζεύγος κλειδιών ειδικά για τον συγκεκριμένο ιστότοπο. Κατά τη σύνδεση, υπογράφει μια πρόκληση που περιλαμβάνει την προέλευση (origin) του ιστοτόπου. Ένας ψεύτικος ιστότοπος με διαφορετικό όνομα τομέα λαμβάνει επομένως μια υπογραφή άχρηστη για τον πραγματικό ιστότοπο, και δεν υπάρχει κοινό μυστικό προς υποκλοπή. Γι' αυτό το FIDO2 χαρακτηρίζεται **ανθεκτικό στο ηλεκτρονικό ψάρεμα** και γι' αυτό τα *passkeys* που βασίζονται σε αυτό αντικαθιστούν τους κωδικούς σε πολλές υπηρεσίες.",
        ],
      },
    },
    {
      id: "8.3",
      title: { en: "Access-control models: RBAC, ABAC and rule-based control", el: "Μοντέλα ελέγχου πρόσβασης: RBAC, ABAC και έλεγχος βάσει κανόνων" },
      body: {
        en: [
          "Once a subject is authenticated, the system must decide what it may do. In **role-based access control (RBAC)**, permissions are assigned to roles (for example, *nurse*, *accountant*, *database administrator*) and users receive roles. RBAC is easy to understand and audit, but large organisations can suffer from *role explosion* when every exception requires a new role. **Attribute-based access control (ABAC)** evaluates policies over attributes of the subject, the resource, the action and the environment—for instance, 'doctors may read records of patients in their own ward, during their shift, from a managed device'. ABAC is more expressive but harder to reason about and test.",
          "**Rule-based access control** applies global rules that do not depend on the individual user, such as firewall rules or 'no logins between midnight and 5 a.m.'. In practice, organisations combine the models: roles provide a stable baseline, attributes refine decisions in context, and global rules enforce organisation-wide constraints.",
        ],
        el: [
          "Αφού ταυτοποιηθεί ένα υποκείμενο, το σύστημα πρέπει να αποφασίσει τι επιτρέπεται να κάνει. Στον **έλεγχο πρόσβασης βάσει ρόλων** (Role-Based Access Control, RBAC), τα δικαιώματα ανατίθενται σε ρόλους (για παράδειγμα *νοσηλευτής*, *λογιστής*, *διαχειριστής βάσης δεδομένων*) και οι χρήστες λαμβάνουν ρόλους. Το RBAC είναι εύκολο στην κατανόηση και στον έλεγχο, όμως οι μεγάλοι οργανισμοί μπορεί να αντιμετωπίσουν *έκρηξη ρόλων* όταν κάθε εξαίρεση απαιτεί νέο ρόλο. Ο **έλεγχος πρόσβασης βάσει χαρακτηριστικών** (Attribute-Based Access Control, ABAC) αξιολογεί πολιτικές επί χαρακτηριστικών του υποκειμένου, του πόρου, της ενέργειας και του περιβάλλοντος —για παράδειγμα, «οι ιατροί μπορούν να διαβάζουν τους φακέλους ασθενών της δικής τους κλινικής, κατά τη διάρκεια της βάρδιάς τους, από διαχειριζόμενη συσκευή». Το ABAC είναι πιο εκφραστικό, αλλά δυσκολότερο στην ανάλυση και στον έλεγχο.",
          "Ο **έλεγχος πρόσβασης βάσει κανόνων** εφαρμόζει γενικούς κανόνες που δεν εξαρτώνται από τον μεμονωμένο χρήστη, όπως οι κανόνες ενός τείχους προστασίας ή ο κανόνας «καμία σύνδεση μεταξύ μεσονυκτίου και 5 π.μ.». Στην πράξη οι οργανισμοί συνδυάζουν τα μοντέλα: οι ρόλοι παρέχουν μια σταθερή βάση, τα χαρακτηριστικά εξειδικεύουν τις αποφάσεις ανάλογα με το πλαίσιο και οι γενικοί κανόνες επιβάλλουν περιορισμούς για ολόκληρο τον οργανισμό.",
        ],
      },
    },
    {
      id: "8.4",
      title: { en: "Directory services: X.500, LDAP and Active Directory", el: "Υπηρεσίες καταλόγου: X.500, LDAP και Active Directory" },
      body: {
        en: [
          "A **directory service** is a specialised, hierarchical database that stores information about users, groups, computers and other resources, and that is optimised for frequent reads. Its conceptual model comes from the **X.500** standards, and the **Lightweight Directory Access Protocol (LDAP)** is the common way to query and modify it. Every entry is identified by a *distinguished name*, such as `CN=Maria Papadopoulou,OU=Finance,DC=example,DC=com`.",
          "Microsoft **Active Directory Domain Services (AD DS)** combines an LDAP directory with Kerberos authentication, DNS and Group Policy. It organises objects into *domains*, *trees* and *forests*, and *domain controllers* replicate the directory among themselves. Because AD controls authentication for almost every system in a Windows enterprise, compromising a domain administrator account usually means compromising the entire organisation. This is why AD security is organised around **tiered administration**: highly privileged accounts are used only on dedicated, hardened systems and never on ordinary workstations, where their credentials could be stolen.",
        ],
        el: [
          "Μια **υπηρεσία καταλόγου** είναι μια εξειδικευμένη, ιεραρχική βάση δεδομένων που αποθηκεύει πληροφορίες για χρήστες, ομάδες, υπολογιστές και άλλους πόρους και είναι βελτιστοποιημένη για συχνές αναγνώσεις. Το εννοιολογικό της μοντέλο προέρχεται από τα πρότυπα **X.500**, ενώ το **Lightweight Directory Access Protocol (LDAP)** είναι ο συνήθης τρόπος υποβολής ερωτημάτων και τροποποίησης. Κάθε εγγραφή προσδιορίζεται από ένα *διακεκριμένο όνομα* (distinguished name), όπως `CN=Maria Papadopoulou,OU=Finance,DC=example,DC=com`.",
          "Οι **Active Directory Domain Services (AD DS)** της Microsoft συνδυάζουν έναν κατάλογο LDAP με ταυτοποίηση Kerberos, DNS και πολιτικές ομάδας (Group Policy). Οργανώνουν τα αντικείμενα σε *τομείς*, *δέντρα* και *δάση*, ενώ οι *ελεγκτές τομέα* αναπαράγουν τον κατάλογο μεταξύ τους. Επειδή το AD ελέγχει την ταυτοποίηση σχεδόν κάθε συστήματος σε μια επιχείρηση Windows, η παραβίαση ενός λογαριασμού διαχειριστή τομέα σημαίνει συνήθως παραβίαση ολόκληρου του οργανισμού. Γι' αυτό η ασφάλεια του AD οργανώνεται γύρω από την **κλιμακωτή διαχείριση** (tiered administration): οι λογαριασμοί υψηλών προνομίων χρησιμοποιούνται μόνο σε αποκλειστικά, θωρακισμένα συστήματα και ποτέ σε συνηθισμένους σταθμούς εργασίας, όπου τα διαπιστευτήριά τους θα μπορούσαν να υποκλαπούν.",
        ],
      },
    },
    {
      id: "8.5",
      title: { en: "Kerberos and the attacks against it", el: "Το Kerberos και οι επιθέσεις εναντίον του" },
      body: {
        en: [
          "**Kerberos** allows users to authenticate once and then access many services without sending their password over the network. A trusted **Key Distribution Center (KDC)**—in AD, every domain controller—contains two logical services. At logon, the **Authentication Service (AS)** verifies the user and issues a **Ticket-Granting Ticket (TGT)**, encrypted with the key of the special `krbtgt` account. When the user wants to reach a service, the client presents the TGT to the **Ticket-Granting Service (TGS)**, which issues a *service ticket* encrypted with the key of the account that runs the service. The service decrypts the ticket and grants access. Tickets have limited lifetimes, and the protocol relies on synchronised clocks.",
          "This design enables several well-known attacks. In **Kerberoasting**, any domain user requests service tickets for accounts with a *service principal name (SPN)* and cracks them offline; weak service-account passwords fall quickly. In **pass-the-ticket**, stolen tickets are reused from another machine. A **golden ticket** is a forged TGT created with the stolen `krbtgt` key and grants unlimited access to the domain. Countermeasures include long random passwords or group-managed service accounts (gMSA), AES-only encryption, protecting domain controllers as Tier 0 assets, resetting the `krbtgt` password twice after a compromise, and monitoring for anomalous ticket requests.",
        ],
        el: [
          "Το **Kerberos** επιτρέπει στους χρήστες να ταυτοποιούνται μία φορά και στη συνέχεια να έχουν πρόσβαση σε πολλές υπηρεσίες χωρίς να αποστέλλουν τον κωδικό τους μέσω του δικτύου. Ένα αξιόπιστο **Κέντρο Διανομής Κλειδιών** (Key Distribution Center, KDC) —στο AD, κάθε ελεγκτής τομέα— περιλαμβάνει δύο λογικές υπηρεσίες. Κατά τη σύνδεση, η **Υπηρεσία Ταυτοποίησης** (Authentication Service, AS) επαληθεύει τον χρήστη και εκδίδει ένα **Εισιτήριο Χορήγησης Εισιτηρίων** (Ticket-Granting Ticket, TGT), κρυπτογραφημένο με το κλειδί του ειδικού λογαριασμού `krbtgt`. Όταν ο χρήστης θέλει να προσπελάσει μια υπηρεσία, ο πελάτης παρουσιάζει το TGT στην **Υπηρεσία Χορήγησης Εισιτηρίων** (Ticket-Granting Service, TGS), η οποία εκδίδει ένα *εισιτήριο υπηρεσίας* κρυπτογραφημένο με το κλειδί του λογαριασμού που εκτελεί την υπηρεσία. Η υπηρεσία αποκρυπτογραφεί το εισιτήριο και παραχωρεί την πρόσβαση. Τα εισιτήρια έχουν περιορισμένη διάρκεια ισχύος και το πρωτόκολλο προϋποθέτει συγχρονισμένα ρολόγια.",
          "Ο σχεδιασμός αυτός επιτρέπει αρκετές γνωστές επιθέσεις. Στο **Kerberoasting**, οποιοσδήποτε χρήστης του τομέα ζητά εισιτήρια υπηρεσίας για λογαριασμούς που διαθέτουν *όνομα κύριας υπηρεσίας* (Service Principal Name, SPN) και τα «σπάει» εκτός σύνδεσης· οι αδύναμοι κωδικοί λογαριασμών υπηρεσιών υποχωρούν γρήγορα. Στο **pass-the-ticket**, κλεμμένα εισιτήρια επαναχρησιμοποιούνται από άλλο μηχάνημα. Ένα **golden ticket** είναι ένα πλαστό TGT που δημιουργείται με το κλεμμένο κλειδί του `krbtgt` και παρέχει απεριόριστη πρόσβαση στον τομέα. Τα αντίμετρα περιλαμβάνουν μεγάλους τυχαίους κωδικούς ή διαχειριζόμενους λογαριασμούς υπηρεσιών ομάδας (gMSA), χρήση αποκλειστικά κρυπτογράφησης AES, προστασία των ελεγκτών τομέα ως στοιχείων της ανώτατης βαθμίδας (Tier 0), διπλή επαναφορά του κωδικού του `krbtgt` μετά από παραβίαση και παρακολούθηση ασυνήθιστων αιτημάτων εισιτηρίων.",
        ],
      },
    },
    {
      id: "8.6",
      title: { en: "Federated identity and single sign-on: SAML, OAuth 2.0 and OpenID Connect", el: "Ομοσπονδιακή ταυτότητα και ενιαία σύνδεση: SAML, OAuth 2.0 και OpenID Connect" },
      body: {
        en: [
          "**Federation** extends single sign-on beyond one organisation: a user authenticates with their own **identity provider (IdP)**, and many **service providers** accept that authentication. **SAML 2.0** exchanges digitally signed XML *assertions* and is widely used for enterprise web applications. **OAuth 2.0** is, strictly speaking, not an authentication protocol but an *authorisation* framework: it lets a user grant an application limited access to their resources (for example, 'read my calendar') by issuing an *access token*, without sharing a password. **OpenID Connect (OIDC)** adds an identity layer on top of OAuth 2.0 through a signed *ID token* that states who the user is.",
          "Federation concentrates trust, and therefore risk. If an attacker steals the IdP's token-signing key, they can forge access to every connected service—as happened in the *Golden SAML* technique used during the SolarWinds campaign. Other common weaknesses include applications that fail to validate token signatures, audiences or expiry times; stolen session tokens replayed from another device; and *consent phishing*, in which users are tricked into granting broad OAuth permissions to a malicious application. Defences include protecting signing keys in HSMs, strict token validation, short token lifetimes bound to devices, and administrator approval for high-risk OAuth consents.",
        ],
        el: [
          "Η **ομοσπονδία ταυτοτήτων** (federation) επεκτείνει την ενιαία σύνδεση πέρα από έναν οργανισμό: ο χρήστης ταυτοποιείται στον δικό του **πάροχο ταυτότητας** (Identity Provider, IdP) και πολλοί **πάροχοι υπηρεσιών** αποδέχονται αυτή την ταυτοποίηση. Το **SAML 2.0** ανταλλάσσει ψηφιακά υπογεγραμμένους *ισχυρισμούς* (assertions) σε XML και χρησιμοποιείται ευρέως σε επιχειρησιακές εφαρμογές ιστού. Το **OAuth 2.0** δεν είναι, αυστηρά μιλώντας, πρωτόκολλο ταυτοποίησης αλλά πλαίσιο *εξουσιοδότησης*: επιτρέπει σε έναν χρήστη να παραχωρήσει σε μια εφαρμογή περιορισμένη πρόσβαση στους πόρους του (για παράδειγμα «ανάγνωση του ημερολογίου μου») μέσω έκδοσης ενός *διακριτικού πρόσβασης* (access token), χωρίς να κοινοποιήσει τον κωδικό του. Το **OpenID Connect (OIDC)** προσθέτει ένα επίπεδο ταυτότητας πάνω από το OAuth 2.0, μέσω ενός υπογεγραμμένου *διακριτικού ταυτότητας* (ID token) που δηλώνει ποιος είναι ο χρήστης.",
          "Η ομοσπονδία συγκεντρώνει την εμπιστοσύνη και, επομένως, τον κίνδυνο. Αν ένας επιτιθέμενος υποκλέψει το κλειδί υπογραφής διακριτικών του παρόχου ταυτότητας, μπορεί να πλαστογραφήσει πρόσβαση σε κάθε συνδεδεμένη υπηρεσία —όπως συνέβη με την τεχνική *Golden SAML* που χρησιμοποιήθηκε κατά την εκστρατεία SolarWinds. Άλλες συνήθεις αδυναμίες είναι οι εφαρμογές που δεν επικυρώνουν την υπογραφή, τον αποδέκτη ή τον χρόνο λήξης των διακριτικών· τα κλεμμένα διακριτικά συνεδρίας που επαναχρησιμοποιούνται από άλλη συσκευή· και το *ψάρεμα συγκατάθεσης* (consent phishing), κατά το οποίο οι χρήστες εξαπατώνται ώστε να παραχωρήσουν ευρεία δικαιώματα OAuth σε κακόβουλη εφαρμογή. Οι άμυνες περιλαμβάνουν την προστασία των κλειδιών υπογραφής σε HSM, την αυστηρή επικύρωση των διακριτικών, τη μικρή διάρκεια ισχύος διακριτικών δεσμευμένων σε συσκευή και την έγκριση από διαχειριστή για συγκαταθέσεις OAuth υψηλού κινδύνου.",
        ],
      },
    },
  ],
  terms: {
    en: [
      { term: "Authentication vs. authorisation", def: "Verifying who a subject is versus deciding what it may do." },
      { term: "FIDO2 / passkey", def: "Origin-bound public-key authentication that resists phishing and has no shared secret." },
      { term: "ABAC", def: "Access control based on attributes of subject, resource, action and environment." },
      { term: "TGT", def: "Kerberos ticket-granting ticket, used to obtain service tickets without re-entering credentials." },
      { term: "Kerberoasting", def: "Requesting service tickets and cracking service-account passwords offline." },
      { term: "OIDC", def: "OpenID Connect: an identity layer on OAuth 2.0 that issues signed ID tokens." },
    ],
    el: [
      { term: "Ταυτοποίηση έναντι εξουσιοδότησης", def: "Επαλήθευση του ποιος είναι ένα υποκείμενο έναντι απόφασης για το τι επιτρέπεται να κάνει." },
      { term: "FIDO2 / passkey", def: "Ταυτοποίηση δημόσιου κλειδιού δεσμευμένη στην προέλευση, ανθεκτική στο ψάρεμα και χωρίς κοινό μυστικό." },
      { term: "ABAC", def: "Έλεγχος πρόσβασης με βάση χαρακτηριστικά του υποκειμένου, του πόρου, της ενέργειας και του περιβάλλοντος." },
      { term: "TGT", def: "Εισιτήριο χορήγησης εισιτηρίων του Kerberos, για τη λήψη εισιτηρίων υπηρεσίας χωρίς εκ νέου εισαγωγή διαπιστευτηρίων." },
      { term: "Kerberoasting", def: "Αίτηση εισιτηρίων υπηρεσίας και «σπάσιμο» των κωδικών λογαριασμών υπηρεσιών εκτός σύνδεσης." },
      { term: "OIDC", def: "OpenID Connect: επίπεδο ταυτότητας πάνω από το OAuth 2.0 που εκδίδει υπογεγραμμένα διακριτικά ταυτότητας." },
    ],
  },
  summary: {
    en: [
      "Identity is the modern perimeter; IAM separates identification, authentication, authorisation and accounting and manages the whole identity lifecycle.",
      "MFA combines factors from different categories; FIDO2 is phishing-resistant because signatures are bound to the website's origin.",
      "RBAC offers simplicity, ABAC offers context-aware precision, and rule-based controls enforce global constraints.",
      "Active Directory and Kerberos are high-value targets; tiered administration and strong service-account hygiene are essential.",
      "Federation protocols enable SSO but concentrate risk in signing keys and token validation.",
    ],
    el: [
      "Η ταυτότητα είναι η σύγχρονη περίμετρος· η IAM διακρίνει την αναγνώριση, την ταυτοποίηση, την εξουσιοδότηση και την καταγραφή και διαχειρίζεται ολόκληρο τον κύκλο ζωής της ταυτότητας.",
      "Το MFA συνδυάζει παράγοντες από διαφορετικές κατηγορίες· το FIDO2 αντιστέκεται στο ψάρεμα επειδή οι υπογραφές δεσμεύονται στην προέλευση του ιστοτόπου.",
      "Το RBAC προσφέρει απλότητα, το ABAC ακρίβεια με βάση το πλαίσιο και ο έλεγχος βάσει κανόνων επιβάλλει γενικούς περιορισμούς.",
      "Το Active Directory και το Kerberos είναι στόχοι υψηλής αξίας· η κλιμακωτή διαχείριση και η σωστή διαχείριση των λογαριασμών υπηρεσιών είναι απαραίτητες.",
      "Τα πρωτόκολλα ομοσπονδίας επιτρέπουν την ενιαία σύνδεση, αλλά συγκεντρώνουν τον κίνδυνο στα κλειδιά υπογραφής και στην επικύρωση των διακριτικών.",
    ],
  },
  questions: {
    en: [
      "Why is an SMS one-time code weaker than a FIDO2 security key against a real-time phishing proxy?",
      "Design an access policy for a hospital records system using RBAC, then refine it with ABAC attributes.",
      "Explain why Kerberoasting is possible for any authenticated domain user, and how gMSAs mitigate it.",
      "Why is OAuth 2.0 alone not sufficient for user authentication, and what does OIDC add?",
    ],
    el: [
      "Γιατί ένας κωδικός μίας χρήσης μέσω SMS είναι πιο αδύναμος από ένα κλειδί ασφαλείας FIDO2 απέναντι σε έναν διακομιστή ψαρέματος πραγματικού χρόνου;",
      "Σχεδιάστε μια πολιτική πρόσβασης για ένα σύστημα ιατρικών φακέλων με RBAC και, στη συνέχεια, εξειδικεύστε την με χαρακτηριστικά ABAC.",
      "Εξηγήστε γιατί το Kerberoasting είναι εφικτό για οποιονδήποτε ταυτοποιημένο χρήστη του τομέα και πώς το περιορίζουν οι λογαριασμοί gMSA.",
      "Γιατί το OAuth 2.0 από μόνο του δεν επαρκεί για την ταυτοποίηση χρηστών και τι προσθέτει το OIDC;",
    ],
  },
};

export default ch08;

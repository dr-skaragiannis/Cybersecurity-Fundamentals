import type { Chapter } from "../types";

const ch07: Chapter = {
  n: 7,
  part: 3,
  title: { en: "Cryptographic Mechanisms and Public Key Infrastructure", el: "Κρυπτογραφικοί Μηχανισμοί και Υποδομή Δημόσιου Κλειδιού" },
  subtitle: {
    en: "Symmetric and asymmetric encryption · Hash functions · Digital signatures · PKI and X.509 · TLS 1.3 · Key management",
    el: "Συμμετρική και ασύμμετρη κρυπτογράφηση · Συναρτήσεις κατακερματισμού · Ψηφιακές υπογραφές · ΥΔΚ και X.509 · TLS 1.3 · Διαχείριση κλειδιών",
  },
  level: { en: "Intermediate · Applied cryptography", el: "Μεσαίο επίπεδο · Εφαρμοσμένη κρυπτογραφία" },
  hours: "9–11",
  intro: {
    en: [
      "Cryptography is the mathematical foundation of confidentiality, integrity and authenticity in digital systems. Chapter 6 ended with attacks that intercept and modify traffic; this chapter provides the tools that make such interception useless. The aim is not to derive the underlying mathematics but to build a precise understanding of what each primitive guarantees, how primitives are combined, and where real systems fail.",
      "The chapter first contrasts symmetric and asymmetric encryption and explains hash functions and digital signatures. It then shows how public key infrastructure (PKI) binds keys to identities through certificates, and dissects the TLS 1.3 handshake that protects most internet traffic today. It concludes with key management—the area where, in practice, most cryptographic failures occur.",
    ],
    el: [
      "Η κρυπτογραφία αποτελεί το μαθηματικό θεμέλιο της εμπιστευτικότητας, της ακεραιότητας και της αυθεντικότητας στα ψηφιακά συστήματα. Το Κεφάλαιο 6 ολοκληρώθηκε με επιθέσεις που υποκλέπτουν και αλλοιώνουν την κίνηση· το παρόν κεφάλαιο παρέχει τα εργαλεία που καθιστούν άχρηστη μια τέτοια υποκλοπή. Στόχος δεν είναι η παραγωγή των υποκείμενων μαθηματικών, αλλά η ακριβής κατανόηση του τι εγγυάται κάθε κρυπτογραφικό δομικό στοιχείο, πώς συνδυάζονται τα στοιχεία αυτά και πού αποτυγχάνουν τα πραγματικά συστήματα.",
      "Το κεφάλαιο αντιπαραβάλλει αρχικά τη συμμετρική με την ασύμμετρη κρυπτογράφηση και εξηγεί τις συναρτήσεις κατακερματισμού και τις ψηφιακές υπογραφές. Στη συνέχεια δείχνει πώς η υποδομή δημόσιου κλειδιού (ΥΔΚ ή PKI) συνδέει κλειδιά με ταυτότητες μέσω πιστοποιητικών και αναλύει τη χειραψία του TLS 1.3, που προστατεύει σήμερα το μεγαλύτερο μέρος της κίνησης στο διαδίκτυο. Κλείνει με τη διαχείριση κλειδιών —το πεδίο όπου, στην πράξη, σημειώνονται οι περισσότερες κρυπτογραφικές αποτυχίες.",
    ],
  },
  outcomes: {
    en: [
      "Explain the difference between symmetric and asymmetric encryption and why practical systems combine them.",
      "State the security properties of cryptographic hash functions and distinguish hashing from encryption.",
      "Describe how digital signatures provide integrity, authenticity and (qualified) non-repudiation.",
      "Explain the roles of CAs, RAs, certificate chains and revocation in a PKI.",
      "Outline the TLS 1.3 handshake and identify common key-management failures.",
    ],
    el: [
      "Να εξηγείτε τη διαφορά μεταξύ συμμετρικής και ασύμμετρης κρυπτογράφησης και γιατί τα πρακτικά συστήματα τις συνδυάζουν.",
      "Να διατυπώνετε τις ιδιότητες ασφάλειας των κρυπτογραφικών συναρτήσεων κατακερματισμού και να διακρίνετε τον κατακερματισμό από την κρυπτογράφηση.",
      "Να περιγράφετε πώς οι ψηφιακές υπογραφές παρέχουν ακεραιότητα, αυθεντικότητα και (υπό προϋποθέσεις) μη αποποίηση.",
      "Να εξηγείτε τον ρόλο των αρχών πιστοποίησης, των αρχών καταχώρισης, των αλυσίδων πιστοποιητικών και της ανάκλησης σε μια ΥΔΚ.",
      "Να σκιαγραφείτε τη χειραψία του TLS 1.3 και να εντοπίζετε συνήθεις αστοχίες στη διαχείριση κλειδιών.",
    ],
  },
  sections: [
    {
      id: "7.1",
      title: { en: "Symmetric and asymmetric encryption", el: "Συμμετρική και ασύμμετρη κρυπτογράφηση" },
      body: {
        en: [
          "In **symmetric encryption**, the same secret key is used to encrypt and to decrypt. Modern symmetric algorithms such as **AES** and **ChaCha20** are extremely fast and, with 128- or 256-bit keys, are considered secure against all known practical attacks. Their weakness is logistical: both parties must already share the key, and a network of *n* participants would need about n²/2 separate keys. Symmetric ciphers must also be used in an appropriate *mode*; authenticated modes such as AES-GCM protect integrity as well as confidentiality.",
          "**Asymmetric (public-key) encryption** uses a mathematically related key pair. The **public key** can be distributed freely, while the **private key** is kept secret. Data encrypted with the public key can be decrypted only with the private key. Algorithms such as **RSA** and **elliptic-curve cryptography (ECC)** solve the key-distribution problem, but they are thousands of times slower than symmetric ciphers. Practical systems therefore use **hybrid encryption**: asymmetric techniques establish or protect a random symmetric *session key*, and that key then encrypts the bulk data. Every TLS connection, and—as Chapter 4 showed—every modern ransomware attack, follows this pattern.",
        ],
        el: [
          "Στη **συμμετρική κρυπτογράφηση** χρησιμοποιείται το ίδιο μυστικό κλειδί για την κρυπτογράφηση και την αποκρυπτογράφηση. Σύγχρονοι συμμετρικοί αλγόριθμοι, όπως οι **AES** και **ChaCha20**, είναι εξαιρετικά γρήγοροι και, με κλειδιά 128 ή 256 bit, θεωρούνται ασφαλείς απέναντι σε όλες τις γνωστές πρακτικές επιθέσεις. Η αδυναμία τους είναι οργανωτική: τα δύο μέρη πρέπει να μοιράζονται ήδη το κλειδί, ενώ ένα δίκτυο *n* συμμετεχόντων θα χρειαζόταν περίπου n²/2 διαφορετικά κλειδιά. Οι συμμετρικοί αλγόριθμοι πρέπει επίσης να χρησιμοποιούνται με κατάλληλο *τρόπο λειτουργίας*· οι τρόποι με ενσωματωμένη αυθεντικοποίηση, όπως ο AES-GCM, προστατεύουν τόσο την εμπιστευτικότητα όσο και την ακεραιότητα.",
          "Η **ασύμμετρη κρυπτογράφηση** (κρυπτογράφηση δημόσιου κλειδιού) χρησιμοποιεί ένα ζεύγος μαθηματικά συσχετισμένων κλειδιών. Το **δημόσιο κλειδί** μπορεί να διανέμεται ελεύθερα, ενώ το **ιδιωτικό κλειδί** παραμένει μυστικό. Δεδομένα που κρυπτογραφούνται με το δημόσιο κλειδί αποκρυπτογραφούνται μόνο με το ιδιωτικό. Αλγόριθμοι όπως ο **RSA** και η **κρυπτογραφία ελλειπτικών καμπυλών (ECC)** επιλύουν το πρόβλημα της διανομής κλειδιών, είναι όμως χιλιάδες φορές πιο αργοί από τους συμμετρικούς. Γι' αυτό τα πρακτικά συστήματα χρησιμοποιούν **υβριδική κρυπτογράφηση**: οι ασύμμετρες τεχνικές δημιουργούν ή προστατεύουν ένα τυχαίο συμμετρικό *κλειδί συνεδρίας* και αυτό το κλειδί κρυπτογραφεί στη συνέχεια τον κύριο όγκο των δεδομένων. Κάθε σύνδεση TLS —και, όπως έδειξε το Κεφάλαιο 4, κάθε σύγχρονη επίθεση λυτρισμικού— ακολουθεί αυτό το πρότυπο.",
        ],
      },
    },
    {
      id: "7.2",
      title: { en: "Cryptographic hash functions", el: "Κρυπτογραφικές συναρτήσεις κατακερματισμού" },
      body: {
        en: [
          "A **cryptographic hash function** maps input of any length to a fixed-length output, the *digest*. SHA-256, for instance, always produces 256 bits. Three properties make a hash function suitable for security. **Pre-image resistance**: given a digest, it is infeasible to find an input that produces it. **Second pre-image resistance**: given one input, it is infeasible to find a different input with the same digest. **Collision resistance**: it is infeasible to find *any* two inputs with the same digest. MD5 and SHA-1 have lost collision resistance and must no longer be used for signatures; SHA-256, SHA-3 and BLAKE2 remain secure.",
          "Hashing is not encryption: there is no key and no way to 'decrypt' a digest. Hashes are used to verify file integrity, to index evidence in forensics (Chapter 12) and as building blocks of signatures. Combined with a secret key, they form an **HMAC**, which proves that a message came from someone who knows the key. For storing passwords, ordinary fast hashes are unsuitable, because attackers can test billions of guesses per second. Dedicated **password-hashing functions** such as Argon2, scrypt or bcrypt are deliberately slow and use a unique random *salt* for each password.",
        ],
        el: [
          "Μια **κρυπτογραφική συνάρτηση κατακερματισμού** αντιστοιχίζει είσοδο οποιουδήποτε μήκους σε έξοδο σταθερού μήκους, τη *σύνοψη* (digest). Η SHA-256, για παράδειγμα, παράγει πάντοτε 256 bit. Τρεις ιδιότητες καθιστούν μια συνάρτηση κατακερματισμού κατάλληλη για εφαρμογές ασφάλειας. **Αντίσταση προεικόνας**: δεδομένης μιας σύνοψης, είναι υπολογιστικά ανέφικτο να βρεθεί είσοδος που την παράγει. **Αντίσταση δεύτερης προεικόνας**: δεδομένης μιας εισόδου, είναι ανέφικτο να βρεθεί διαφορετική είσοδος με την ίδια σύνοψη. **Αντίσταση συγκρούσεων**: είναι ανέφικτο να βρεθούν *οποιεσδήποτε* δύο είσοδοι με την ίδια σύνοψη. Οι MD5 και SHA-1 έχουν απολέσει την αντίσταση συγκρούσεων και δεν πρέπει πλέον να χρησιμοποιούνται σε υπογραφές· οι SHA-256, SHA-3 και BLAKE2 παραμένουν ασφαλείς.",
          "Ο κατακερματισμός δεν είναι κρυπτογράφηση: δεν υπάρχει κλειδί ούτε τρόπος «αποκρυπτογράφησης» μιας σύνοψης. Οι συνόψεις χρησιμοποιούνται για την επαλήθευση της ακεραιότητας αρχείων, για την ταυτοποίηση αποδεικτικών στοιχείων στην εγκληματολογική ανάλυση (Κεφάλαιο 12) και ως δομικά στοιχεία των υπογραφών. Σε συνδυασμό με ένα μυστικό κλειδί σχηματίζουν έναν κώδικα **HMAC**, ο οποίος αποδεικνύει ότι ένα μήνυμα προέρχεται από κάποιον που γνωρίζει το κλειδί. Για την αποθήκευση κωδικών πρόσβασης οι συνήθεις γρήγορες συναρτήσεις είναι ακατάλληλες, επειδή οι επιτιθέμενοι μπορούν να δοκιμάζουν δισεκατομμύρια μαντεψιές ανά δευτερόλεπτο. Ειδικές **συναρτήσεις κατακερματισμού κωδικών**, όπως οι Argon2, scrypt ή bcrypt, είναι σκόπιμα αργές και χρησιμοποιούν ένα μοναδικό τυχαίο *αλάτι* (salt) για κάθε κωδικό.",
        ],
      },
    },
    {
      id: "7.3",
      title: { en: "Digital signatures and non-repudiation", el: "Ψηφιακές υπογραφές και μη αποποίηση" },
      body: {
        en: [
          "A **digital signature** reverses the roles of the key pair. The signer computes a hash of the message and transforms it with their *private* key; anyone can verify the result with the corresponding *public* key. A valid signature demonstrates three things: the message has not been altered since it was signed (**integrity**), it was signed by the holder of the private key (**authenticity**), and the signer cannot easily claim otherwise later (**non-repudiation**). Common algorithms include RSA-PSS, ECDSA and Ed25519.",
          "Non-repudiation, however, is only as strong as the surrounding process. If the private key was stored unprotected on a shared computer, the signer can plausibly argue that someone else used it. Legal frameworks such as the EU **eIDAS** regulation therefore distinguish ordinary electronic signatures from *qualified* electronic signatures, which require a qualified certificate and a certified signature-creation device, and which carry the legal effect of a handwritten signature.",
        ],
        el: [
          "Μια **ψηφιακή υπογραφή** αντιστρέφει τους ρόλους του ζεύγους κλειδιών. Ο υπογράφων υπολογίζει τη σύνοψη του μηνύματος και τη μετασχηματίζει με το *ιδιωτικό* του κλειδί· οποιοσδήποτε μπορεί να επαληθεύσει το αποτέλεσμα με το αντίστοιχο *δημόσιο* κλειδί. Μια έγκυρη υπογραφή αποδεικνύει τρία πράγματα: ότι το μήνυμα δεν έχει αλλοιωθεί από τη στιγμή της υπογραφής (**ακεραιότητα**), ότι υπογράφηκε από τον κάτοχο του ιδιωτικού κλειδιού (**αυθεντικότητα**) και ότι ο υπογράφων δεν μπορεί εύκολα να ισχυριστεί αργότερα το αντίθετο (**μη αποποίηση**). Συνήθεις αλγόριθμοι είναι οι RSA-PSS, ECDSA και Ed25519.",
          "Η μη αποποίηση, ωστόσο, είναι τόσο ισχυρή όσο η διαδικασία που την περιβάλλει. Αν το ιδιωτικό κλειδί ήταν αποθηκευμένο χωρίς προστασία σε κοινόχρηστο υπολογιστή, ο υπογράφων μπορεί εύλογα να υποστηρίξει ότι το χρησιμοποίησε κάποιος άλλος. Γι' αυτό νομικά πλαίσια όπως ο Κανονισμός **eIDAS** της ΕΕ διακρίνουν τις απλές ηλεκτρονικές υπογραφές από τις *εγκεκριμένες* ηλεκτρονικές υπογραφές, οι οποίες απαιτούν εγκεκριμένο πιστοποιητικό και πιστοποιημένη διάταξη δημιουργίας υπογραφής και έχουν έννομο αποτέλεσμα ισοδύναμο με εκείνο της ιδιόχειρης υπογραφής.",
        ],
      },
    },
    {
      id: "7.4",
      title: { en: "Public key infrastructure and the X.509 certificate lifecycle", el: "Υποδομή δημόσιου κλειδιού και ο κύκλος ζωής των πιστοποιητικών X.509" },
      body: {
        en: [
          "Public-key cryptography raises a new question: how do you know that a public key really belongs to the party you think it does? An attacker in the middle could substitute their own key. A **public key infrastructure (PKI)** answers this question by having a trusted **certificate authority (CA)** sign a **certificate** that binds a public key to an identity, such as a domain name. A **registration authority (RA)** verifies the applicant's identity before the CA issues the certificate. Certificates follow the **X.509** standard and contain, among other fields, the subject, the issuer, a validity period, the public key and extensions such as the *Subject Alternative Name (SAN)*, which lists the domain names the certificate covers.",
          "Trust is organised as a **chain**: an offline *root CA*, whose certificate is pre-installed in operating systems and browsers, signs *intermediate CAs*, which in turn sign end-entity certificates. Verification walks up the chain to a trusted root. Certificates have a **lifecycle**—request (via a certificate signing request, CSR), issuance, deployment, renewal and, if a key is compromised, **revocation**, which is communicated through revocation lists (CRLs) or the online status protocol (OCSP). Because revocation checking is unreliable in practice, the industry is moving towards short-lived certificates renewed automatically with the ACME protocol.",
        ],
        el: [
          "Η κρυπτογραφία δημόσιου κλειδιού θέτει ένα νέο ερώτημα: πώς γνωρίζουμε ότι ένα δημόσιο κλειδί ανήκει πράγματι σε αυτόν που νομίζουμε; Ένας ενδιάμεσος επιτιθέμενος θα μπορούσε να το αντικαταστήσει με το δικό του. Μια **υποδομή δημόσιου κλειδιού** (ΥΔΚ ή PKI) απαντά σε αυτό το ερώτημα: μια αξιόπιστη **αρχή πιστοποίησης** (Certificate Authority, CA) υπογράφει ένα **πιστοποιητικό** που συνδέει ένα δημόσιο κλειδί με μια ταυτότητα, όπως ένα όνομα τομέα. Μια **αρχή καταχώρισης** (Registration Authority, RA) επαληθεύει την ταυτότητα του αιτούντος πριν η CA εκδώσει το πιστοποιητικό. Τα πιστοποιητικά ακολουθούν το πρότυπο **X.509** και περιέχουν, μεταξύ άλλων, το υποκείμενο, τον εκδότη, την περίοδο ισχύος, το δημόσιο κλειδί και επεκτάσεις όπως το *Εναλλακτικό Όνομα Υποκειμένου* (Subject Alternative Name, SAN), που απαριθμεί τα ονόματα τομέα που καλύπτει το πιστοποιητικό.",
          "Η εμπιστοσύνη οργανώνεται ως **αλυσίδα**: μια *ριζική CA* εκτός σύνδεσης, της οποίας το πιστοποιητικό είναι προεγκατεστημένο στα λειτουργικά συστήματα και στους φυλλομετρητές, υπογράφει *ενδιάμεσες CA*, οι οποίες με τη σειρά τους υπογράφουν τα πιστοποιητικά τελικών οντοτήτων. Η επαλήθευση ακολουθεί την αλυσίδα προς τα πάνω έως μια αξιόπιστη ρίζα. Τα πιστοποιητικά έχουν **κύκλο ζωής** —αίτηση (μέσω αιτήματος υπογραφής πιστοποιητικού, CSR), έκδοση, εγκατάσταση, ανανέωση και, σε περίπτωση διαρροής του κλειδιού, **ανάκληση**, η οποία γνωστοποιείται μέσω λιστών ανάκλησης (CRL) ή του πρωτοκόλλου άμεσης κατάστασης (OCSP). Επειδή ο έλεγχος ανάκλησης είναι στην πράξη αναξιόπιστος, ο κλάδος κινείται προς πιστοποιητικά μικρής διάρκειας που ανανεώνονται αυτόματα με το πρωτόκολλο ACME.",
        ],
      },
    },
    {
      id: "7.5",
      title: { en: "TLS 1.3 and the applications of PKI", el: "Το TLS 1.3 και οι εφαρμογές της ΥΔΚ" },
      body: {
        en: [
          "**Transport Layer Security (TLS)** protects web browsing (HTTPS), email transport, APIs and many other protocols. Version 1.3 (2018) simplified the protocol and removed obsolete, vulnerable options. The handshake requires only one round trip. The client sends a *ClientHello* with its supported cipher suites and an ephemeral Diffie–Hellman key share; the server replies with its own key share, its certificate and a signature proving possession of the private key. Both sides then derive the same session keys. Because the Diffie–Hellman keys are ephemeral, TLS 1.3 always provides **forward secrecy**: stealing the server's private key later does not allow previously recorded traffic to be decrypted.",
          "The same PKI principles support other applications. **S/MIME** signs and encrypts email; **code signing** lets operating systems verify that software comes from a known publisher and has not been modified—which is why the stolen certificates used by Stuxnet were so damaging; and **mutual TLS (mTLS)** requires the client as well as the server to present a certificate, a pattern widely used for service-to-service authentication in modern architectures.",
        ],
        el: [
          "Το **Transport Layer Security (TLS)** προστατεύει την περιήγηση στον ιστό (HTTPS), τη μεταφορά ηλεκτρονικού ταχυδρομείου, τις διεπαφές προγραμματισμού (API) και πολλά άλλα πρωτόκολλα. Η έκδοση 1.3 (2018) απλοποίησε το πρωτόκολλο και αφαίρεσε παρωχημένες και ευάλωτες επιλογές. Η χειραψία απαιτεί μόνο έναν κύκλο επικοινωνίας. Ο πελάτης στέλνει ένα μήνυμα *ClientHello* με τις σουίτες κρυπτογράφησης που υποστηρίζει και ένα εφήμερο μερίδιο κλειδιού Diffie–Hellman· ο διακομιστής απαντά με το δικό του μερίδιο, το πιστοποιητικό του και μια υπογραφή που αποδεικνύει ότι κατέχει το ιδιωτικό κλειδί. Στη συνέχεια οι δύο πλευρές παράγουν τα ίδια κλειδιά συνεδρίας. Επειδή τα κλειδιά Diffie–Hellman είναι εφήμερα, το TLS 1.3 παρέχει πάντοτε **εμπρόσθια μυστικότητα** (forward secrecy): η μεταγενέστερη υποκλοπή του ιδιωτικού κλειδιού του διακομιστή δεν επιτρέπει την αποκρυπτογράφηση κίνησης που είχε καταγραφεί στο παρελθόν.",
          "Οι ίδιες αρχές της ΥΔΚ υποστηρίζουν και άλλες εφαρμογές. Το **S/MIME** υπογράφει και κρυπτογραφεί μηνύματα ηλεκτρονικού ταχυδρομείου· η **υπογραφή κώδικα** επιτρέπει στα λειτουργικά συστήματα να επαληθεύουν ότι ένα λογισμικό προέρχεται από γνωστό εκδότη και δεν έχει τροποποιηθεί —γι' αυτό τα κλεμμένα πιστοποιητικά που χρησιμοποίησε το Stuxnet ήταν τόσο επιζήμια· και το **αμοιβαίο TLS (mTLS)** απαιτεί πιστοποιητικό τόσο από τον διακομιστή όσο και από τον πελάτη, πρότυπο που χρησιμοποιείται ευρέως για τον έλεγχο ταυτότητας μεταξύ υπηρεσιών στις σύγχρονες αρχιτεκτονικές.",
        ],
      },
    },
    {
      id: "7.6",
      title: { en: "Key management: where cryptography actually fails", el: "Διαχείριση κλειδιών: εκεί όπου η κρυπτογραφία πραγματικά αποτυγχάνει" },
      body: {
        en: [
          "Modern algorithms are rarely broken mathematically; systems fail because keys are generated poorly, stored carelessly or never rotated. Typical failures include private keys committed to public source-code repositories, hard-coded credentials in applications, predictable random-number generators, and certificates that expire unnoticed and cause outages. **Key management** covers the entire lifecycle: secure generation with a cryptographically secure random source, protected storage, controlled distribution, regular rotation, revocation and, finally, destruction.",
          "High-value keys belong in dedicated hardware. A **hardware security module (HSM)** or a cloud key-management service performs cryptographic operations internally, so that the private key never leaves the device. Access to keys should follow least privilege and separation of duties, and every use should be logged. Looking ahead, organisations should also maintain an inventory of where each algorithm is used (*crypto-agility*), so that vulnerable algorithms can be replaced—for example, as post-quantum algorithms standardised by NIST are adopted.",
        ],
        el: [
          "Οι σύγχρονοι αλγόριθμοι σπάνια παραβιάζονται μαθηματικά· τα συστήματα αποτυγχάνουν επειδή τα κλειδιά παράγονται πρόχειρα, αποθηκεύονται απρόσεκτα ή δεν ανανεώνονται ποτέ. Τυπικές αστοχίες είναι τα ιδιωτικά κλειδιά που δημοσιεύονται κατά λάθος σε δημόσια αποθετήρια κώδικα, τα ενσωματωμένα διαπιστευτήρια στις εφαρμογές, οι προβλέψιμες γεννήτριες τυχαίων αριθμών και τα πιστοποιητικά που λήγουν χωρίς να το αντιληφθεί κανείς, προκαλώντας διακοπές λειτουργίας. Η **διαχείριση κλειδιών** καλύπτει ολόκληρο τον κύκλο ζωής: ασφαλή παραγωγή από κρυπτογραφικά ασφαλή πηγή τυχαιότητας, προστατευμένη αποθήκευση, ελεγχόμενη διανομή, τακτική εναλλαγή, ανάκληση και, τέλος, καταστροφή.",
          "Τα κλειδιά υψηλής αξίας πρέπει να φυλάσσονται σε ειδικό υλικό. Μια **μονάδα ασφάλειας υλικού** (Hardware Security Module, HSM) ή μια υπηρεσία διαχείρισης κλειδιών στο νέφος εκτελεί τις κρυπτογραφικές λειτουργίες εσωτερικά, ώστε το ιδιωτικό κλειδί να μην εγκαταλείπει ποτέ τη συσκευή. Η πρόσβαση στα κλειδιά πρέπει να ακολουθεί τις αρχές του ελάχιστου προνομίου και του διαχωρισμού καθηκόντων, και κάθε χρήση πρέπει να καταγράφεται. Με ματιά στο μέλλον, οι οργανισμοί οφείλουν επίσης να τηρούν απογραφή του πού χρησιμοποιείται κάθε αλγόριθμος (*κρυπτογραφική ευελιξία*), ώστε οι ευάλωτοι αλγόριθμοι να μπορούν να αντικατασταθούν —για παράδειγμα, καθώς υιοθετούνται οι μετακβαντικοί αλγόριθμοι που τυποποίησε το NIST.",
        ],
      },
    },
  ],
  terms: {
    en: [
      { term: "Hybrid encryption", def: "Using asymmetric cryptography to protect a symmetric session key that encrypts the data." },
      { term: "Collision resistance", def: "The infeasibility of finding two different inputs with the same hash digest." },
      { term: "Digital signature", def: "A value computed with a private key that proves a message's integrity and origin." },
      { term: "Certificate authority", def: "A trusted entity that signs certificates binding public keys to identities." },
      { term: "Forward secrecy", def: "The property that compromise of long-term keys does not expose past session traffic." },
      { term: "HSM", def: "Hardware security module: a tamper-resistant device that stores keys and performs cryptographic operations." },
    ],
    el: [
      { term: "Υβριδική κρυπτογράφηση", def: "Χρήση ασύμμετρης κρυπτογραφίας για την προστασία ενός συμμετρικού κλειδιού συνεδρίας που κρυπτογραφεί τα δεδομένα." },
      { term: "Αντίσταση συγκρούσεων", def: "Η αδυναμία εύρεσης δύο διαφορετικών εισόδων με την ίδια σύνοψη." },
      { term: "Ψηφιακή υπογραφή", def: "Τιμή που υπολογίζεται με ιδιωτικό κλειδί και αποδεικνύει την ακεραιότητα και την προέλευση ενός μηνύματος." },
      { term: "Αρχή πιστοποίησης", def: "Αξιόπιστη οντότητα που υπογράφει πιστοποιητικά τα οποία συνδέουν δημόσια κλειδιά με ταυτότητες." },
      { term: "Εμπρόσθια μυστικότητα", def: "Η ιδιότητα κατά την οποία η διαρροή μακροπρόθεσμων κλειδιών δεν εκθέτει την κίνηση προηγούμενων συνεδριών." },
      { term: "HSM", def: "Μονάδα ασφάλειας υλικού: ανθεκτική σε παραβίαση συσκευή που φυλάσσει κλειδιά και εκτελεί κρυπτογραφικές λειτουργίες." },
    ],
  },
  summary: {
    en: [
      "Symmetric ciphers are fast but need a shared key; asymmetric algorithms solve key distribution; hybrid schemes combine both.",
      "Hash functions provide integrity checks, not confidentiality; passwords require slow, salted password-hashing functions.",
      "Digital signatures provide integrity and authenticity; non-repudiation also depends on key custody and legal context.",
      "PKI binds keys to identities through certificate chains; lifecycle management and revocation are essential.",
      "TLS 1.3 offers a fast handshake with forward secrecy, but most real failures arise from poor key management.",
    ],
    el: [
      "Οι συμμετρικοί αλγόριθμοι είναι γρήγοροι αλλά απαιτούν κοινό κλειδί· οι ασύμμετροι επιλύουν τη διανομή κλειδιών· τα υβριδικά σχήματα συνδυάζουν και τα δύο.",
      "Οι συναρτήσεις κατακερματισμού παρέχουν έλεγχο ακεραιότητας και όχι εμπιστευτικότητα· οι κωδικοί απαιτούν αργές συναρτήσεις κατακερματισμού με αλάτι.",
      "Οι ψηφιακές υπογραφές παρέχουν ακεραιότητα και αυθεντικότητα· η μη αποποίηση εξαρτάται επιπλέον από τη φύλαξη των κλειδιών και το νομικό πλαίσιο.",
      "Η ΥΔΚ συνδέει κλειδιά με ταυτότητες μέσω αλυσίδων πιστοποιητικών· η διαχείριση του κύκλου ζωής και η ανάκληση είναι απαραίτητες.",
      "Το TLS 1.3 προσφέρει γρήγορη χειραψία με εμπρόσθια μυστικότητα, όμως οι περισσότερες πραγματικές αποτυχίες οφείλονται σε κακή διαχείριση κλειδιών.",
    ],
  },
  questions: {
    en: [
      "Why do practical systems not encrypt large files directly with RSA?",
      "A developer stores passwords as unsalted SHA-256 digests. Explain the risk and propose a better design.",
      "Walk through how a browser verifies the certificate chain of a website.",
      "Explain forward secrecy and why TLS 1.3 removed static RSA key exchange.",
    ],
    el: [
      "Γιατί τα πρακτικά συστήματα δεν κρυπτογραφούν μεγάλα αρχεία απευθείας με RSA;",
      "Ένας προγραμματιστής αποθηκεύει τους κωδικούς ως συνόψεις SHA-256 χωρίς αλάτι. Εξηγήστε τον κίνδυνο και προτείνετε καλύτερο σχεδιασμό.",
      "Περιγράψτε βήμα προς βήμα πώς ένας φυλλομετρητής επαληθεύει την αλυσίδα πιστοποιητικών ενός ιστοτόπου.",
      "Εξηγήστε την εμπρόσθια μυστικότητα και γιατί το TLS 1.3 κατάργησε τη στατική ανταλλαγή κλειδιών RSA.",
    ],
  },
};

export default ch07;

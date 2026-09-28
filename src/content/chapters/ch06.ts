import type { Chapter } from "../types";

const ch06: Chapter = {
  n: 6,
  part: 2,
  title: { en: "Network Security: Attacks, Defences and Botnet Topologies", el: "Ασφάλεια Δικτύων: Επιθέσεις, Άμυνες και Τοπολογίες Botnet" },
  subtitle: {
    en: "DoS and DDoS · Amplification · Botnets and command-and-control · Man-in-the-middle · Firewalls · VPNs · Segmentation, NAC and wireless security",
    el: "DoS και DDoS · Ενίσχυση · Botnet και διοίκηση-έλεγχος · Επιθέσεις ενδιάμεσου · Τείχη προστασίας · VPN · Κατάτμηση, NAC και ασφάλεια ασύρματων δικτύων",
  },
  level: { en: "Intermediate · Networks", el: "Μεσαίο επίπεδο · Δίκτυα" },
  hours: "8–10",
  intro: {
    en: [
      "Networks connect everything, and whatever connects can also be attacked. This chapter examines how adversaries abuse network protocols to disrupt availability, to intercept or manipulate traffic, and to coordinate thousands of compromised devices. It assumes basic familiarity with the TCP/IP model; where a protocol detail is essential, it is explained in the text.",
      "The first half of the chapter focuses on attacks: denial of service and its distributed and amplified forms, the architecture and lifecycle of botnets, and man-in-the-middle techniques. The second half turns to defence. It shows how layered DDoS mitigation works in practice and introduces the building blocks of network defence—firewalls, virtual private networks, segmentation, network access control and wireless security—each with a clear statement of what it can and cannot achieve.",
    ],
    el: [
      "Τα δίκτυα συνδέουν τα πάντα, και ό,τι συνδέεται μπορεί επίσης να δεχθεί επίθεση. Το κεφάλαιο εξετάζει πώς οι αντίπαλοι κάνουν κατάχρηση των δικτυακών πρωτοκόλλων για να διαταράξουν τη διαθεσιμότητα, να υποκλέψουν ή να αλλοιώσουν την κίνηση και να συντονίσουν χιλιάδες παραβιασμένες συσκευές. Προϋποθέτει βασική εξοικείωση με το μοντέλο TCP/IP· όπου μια λεπτομέρεια πρωτοκόλλου είναι απαραίτητη, εξηγείται στο κείμενο.",
      "Το πρώτο μισό του κεφαλαίου εστιάζει στις επιθέσεις: την άρνηση υπηρεσίας και τις κατανεμημένες και ενισχυμένες μορφές της, την αρχιτεκτονική και τον κύκλο ζωής των botnet, καθώς και τις τεχνικές ενδιάμεσου (man-in-the-middle). Το δεύτερο μισό στρέφεται στην άμυνα. Δείχνει πώς λειτουργεί στην πράξη η πολυεπίπεδη αντιμετώπιση επιθέσεων DDoS και παρουσιάζει τα δομικά στοιχεία της δικτυακής άμυνας —τείχη προστασίας, εικονικά ιδιωτικά δίκτυα, κατάτμηση, έλεγχο πρόσβασης στο δίκτυο και ασφάλεια ασύρματων δικτύων— με σαφή διατύπωση του τι μπορεί και τι δεν μπορεί να επιτύχει το καθένα.",
    ],
  },
  outcomes: {
    en: [
      "Distinguish volumetric, protocol and application-layer denial-of-service attacks, and explain amplification.",
      "Compare centralised and peer-to-peer botnet architectures and describe the botnet lifecycle.",
      "Explain ARP spoofing, DNS spoofing and TLS stripping, and the controls that prevent them.",
      "Design a layered DDoS defence from the network edge to the application.",
      "Describe the roles and limits of firewalls, VPNs, segmentation, 802.1X and WPA3.",
    ],
    el: [
      "Να διακρίνετε τις επιθέσεις άρνησης υπηρεσίας ογκομετρικού τύπου, επιπέδου πρωτοκόλλου και επιπέδου εφαρμογής και να εξηγείτε την ενίσχυση (amplification).",
      "Να συγκρίνετε τις κεντρικές και τις ομότιμες αρχιτεκτονικές botnet και να περιγράφετε τον κύκλο ζωής ενός botnet.",
      "Να εξηγείτε την πλαστογράφηση ARP, την πλαστογράφηση DNS και την απογύμνωση TLS, καθώς και τα μέτρα που τις αποτρέπουν.",
      "Να σχεδιάζετε μια πολυεπίπεδη άμυνα κατά DDoS, από την άκρη του δικτύου έως την εφαρμογή.",
      "Να περιγράφετε τον ρόλο και τα όρια των τειχών προστασίας, των VPN, της κατάτμησης, του 802.1X και του WPA3.",
    ],
  },
  sections: [
    {
      id: "6.1",
      title: { en: "Denial of service: DoS, DDoS and amplification", el: "Άρνηση υπηρεσίας: DoS, DDoS και ενίσχυση" },
      body: {
        en: [
          "A **denial-of-service (DoS)** attack aims to make a service unavailable to its legitimate users. When the attack traffic comes from many sources at once, it is called a **distributed denial of service (DDoS)**, and it becomes much harder to block because no single source can simply be filtered out. DDoS attacks fall into three broad families. **Volumetric** attacks saturate the victim's bandwidth. **Protocol** attacks exhaust state in servers or network devices; the classic *SYN flood* sends many TCP connection requests without completing the handshake, filling the server's table of half-open connections. **Application-layer** attacks send seemingly legitimate but expensive requests—such as search queries—that exhaust the application itself.",
          "**Amplification** allows an attacker with modest bandwidth to generate enormous floods. The attacker sends small requests with a forged source address (the victim's) to public servers that return much larger responses. Protocols such as DNS, NTP and memcached have been abused in this way, with amplification factors ranging from tens to tens of thousands. Two measures address the root cause: networks should drop outgoing packets with forged source addresses (*ingress filtering*, BCP 38), and operators should not expose open resolvers or other amplifiers to the internet.",
        ],
        el: [
          "Μια επίθεση **άρνησης υπηρεσίας** (Denial of Service, DoS) στοχεύει να καταστήσει μια υπηρεσία μη διαθέσιμη στους νόμιμους χρήστες της. Όταν η κίνηση της επίθεσης προέρχεται ταυτόχρονα από πολλές πηγές, ονομάζεται **κατανεμημένη άρνηση υπηρεσίας** (Distributed Denial of Service, DDoS) και γίνεται πολύ δυσκολότερο να αποκλειστεί, επειδή δεν υπάρχει μία πηγή που να μπορεί απλώς να φιλτραριστεί. Οι επιθέσεις DDoS χωρίζονται σε τρεις γενικές οικογένειες. Οι **ογκομετρικές** κατακλύζουν το εύρος ζώνης του θύματος. Οι επιθέσεις **επιπέδου πρωτοκόλλου** εξαντλούν τους πόρους κατάστασης διακομιστών ή δικτυακών συσκευών· η κλασική *πλημμύρα SYN* στέλνει πολλά αιτήματα σύνδεσης TCP χωρίς να ολοκληρώνει τη χειραψία, γεμίζοντας τον πίνακα ημιανοιχτών συνδέσεων του διακομιστή. Οι επιθέσεις **επιπέδου εφαρμογής** στέλνουν φαινομενικά νόμιμα αλλά απαιτητικά αιτήματα —όπως ερωτήματα αναζήτησης— που εξαντλούν την ίδια την εφαρμογή.",
          "Η **ενίσχυση** (amplification) επιτρέπει σε έναν επιτιθέμενο με περιορισμένο εύρος ζώνης να παράγει τεράστιες πλημμύρες κίνησης. Ο επιτιθέμενος στέλνει μικρά αιτήματα με πλαστογραφημένη διεύθυνση προέλευσης (τη διεύθυνση του θύματος) σε δημόσιους διακομιστές, οι οποίοι επιστρέφουν πολύ μεγαλύτερες απαντήσεις. Πρωτόκολλα όπως τα DNS, NTP και memcached έχουν χρησιμοποιηθεί με αυτόν τον τρόπο, με συντελεστές ενίσχυσης από μερικές δεκάδες έως δεκάδες χιλιάδες. Δύο μέτρα αντιμετωπίζουν τη ρίζα του προβλήματος: τα δίκτυα πρέπει να απορρίπτουν εξερχόμενα πακέτα με πλαστογραφημένες διευθύνσεις προέλευσης (*φιλτράρισμα εισόδου*, BCP 38) και οι διαχειριστές δεν πρέπει να εκθέτουν στο διαδίκτυο ανοιχτούς αναλυτές DNS ή άλλους ενισχυτές.",
        ],
      },
    },
    {
      id: "6.2",
      title: { en: "Botnets: architectures, lifecycle and IoT conscription", el: "Botnet: αρχιτεκτονικές, κύκλος ζωής και στρατολόγηση συσκευών IoT" },
      body: {
        en: [
          "A **botnet** is a network of compromised devices ('bots') controlled remotely by an operator. In a **centralised** architecture, bots receive commands from one or a few command-and-control (C2) servers, historically over IRC and today mostly over HTTPS. This design is simple but fragile: seizing the C2 servers disables the botnet. **Peer-to-peer** botnets distribute commands among the bots themselves, which makes takedowns much harder. Operators also use *domain generation algorithms* that produce thousands of candidate domain names every day, so that defenders cannot pre-emptively block them all.",
          "A botnet's lifecycle comprises **recruitment** (infecting new devices), **command and control**, **monetisation** (DDoS-for-hire, spam, credential stuffing, cryptocurrency mining) and **maintenance** (updating and defending the bots). The **Mirai** botnet of 2016 showed how weak the Internet of Things was: it simply tried a list of about sixty factory-default usernames and passwords on cameras and routers, recruited hundreds of thousands of devices, and launched attacks that disrupted major internet services. The lesson for manufacturers and operators is clear—unique credentials, automatic updates and no unnecessary remote services.",
        ],
        el: [
          "Ένα **botnet** είναι ένα δίκτυο παραβιασμένων συσκευών («bots») που ελέγχονται απομακρυσμένα από έναν διαχειριστή. Σε μια **κεντρική** αρχιτεκτονική, τα bots λαμβάνουν εντολές από έναν ή λίγους διακομιστές διοίκησης και ελέγχου (Command and Control, C2), ιστορικά μέσω IRC και σήμερα κυρίως μέσω HTTPS. Ο σχεδιασμός αυτός είναι απλός αλλά εύθραυστος: η κατάσχεση των διακομιστών C2 απενεργοποιεί το botnet. Τα **ομότιμα** (peer-to-peer) botnet κατανέμουν τις εντολές στα ίδια τα bots, κάτι που καθιστά την εξάρθρωσή τους πολύ δυσκολότερη. Οι διαχειριστές χρησιμοποιούν επίσης *αλγορίθμους παραγωγής ονομάτων τομέα* (DGA), οι οποίοι δημιουργούν χιλιάδες υποψήφια ονόματα κάθε ημέρα, ώστε οι αμυνόμενοι να μην μπορούν να τα αποκλείσουν όλα εκ των προτέρων.",
          "Ο κύκλος ζωής ενός botnet περιλαμβάνει τη **στρατολόγηση** (μόλυνση νέων συσκευών), τη **διοίκηση και τον έλεγχο**, την **αξιοποίηση** (DDoS επί πληρωμή, ανεπιθύμητη αλληλογραφία, μαζική δοκιμή διαπιστευτηρίων, εξόρυξη κρυπτονομισμάτων) και τη **συντήρηση** (ενημέρωση και προστασία των bots). Το botnet **Mirai** του 2016 έδειξε πόσο αδύναμο ήταν το Διαδίκτυο των Πραγμάτων: απλώς δοκίμαζε μια λίστα περίπου εξήντα εργοστασιακών ονομάτων χρήστη και κωδικών σε κάμερες και δρομολογητές, στρατολόγησε εκατοντάδες χιλιάδες συσκευές και εξαπέλυσε επιθέσεις που διατάραξαν σημαντικές υπηρεσίες του διαδικτύου. Το δίδαγμα για κατασκευαστές και διαχειριστές είναι σαφές —μοναδικά διαπιστευτήρια, αυτόματες ενημερώσεις και καμία περιττή απομακρυσμένη υπηρεσία.",
        ],
      },
    },
    {
      id: "6.3",
      title: { en: "Interception and manipulation: man-in-the-middle attacks", el: "Υποκλοπή και αλλοίωση: επιθέσεις ενδιάμεσου" },
      body: {
        en: [
          "In a **man-in-the-middle (MITM)** attack, the adversary positions themselves between two communicating parties, so that traffic passes through a system they control. On a local network, **ARP spoofing** achieves this by sending forged messages that associate the attacker's hardware address with the IP address of the default gateway; victims then send their traffic to the attacker. **DNS spoofing** returns false answers to name queries, redirecting users to malicious servers. On public Wi-Fi, an *evil twin* access point with a familiar network name can attract unsuspecting clients.",
          "Once in the middle, the attacker can passively **sniff** unencrypted traffic or actively modify it—for instance through *TLS stripping*, which downgrades a connection from HTTPS to HTTP. Cryptography is the fundamental countermeasure: properly validated TLS (Chapter 7) makes intercepted traffic unreadable and tampering detectable, and **HTTP Strict Transport Security (HSTS)** prevents downgrades. At the network level, *dynamic ARP inspection* and *DHCP snooping* on switches, DNSSEC validation and 802.1X authentication reduce the opportunities for interception.",
        ],
        el: [
          "Σε μια **επίθεση ενδιάμεσου** (Man-in-the-Middle, MITM), ο αντίπαλος παρεμβάλλεται ανάμεσα σε δύο μέρη που επικοινωνούν, ώστε η κίνηση να διέρχεται από ένα σύστημα που ελέγχει. Σε ένα τοπικό δίκτυο, η **πλαστογράφηση ARP** το επιτυγχάνει αποστέλλοντας ψευδή μηνύματα που συσχετίζουν τη φυσική διεύθυνση του επιτιθέμενου με τη διεύθυνση IP της προεπιλεγμένης πύλης· τα θύματα στέλνουν στη συνέχεια την κίνησή τους στον επιτιθέμενο. Η **πλαστογράφηση DNS** επιστρέφει ψευδείς απαντήσεις σε ερωτήματα ονομάτων, ανακατευθύνοντας τους χρήστες σε κακόβουλους διακομιστές. Σε δημόσια δίκτυα Wi-Fi, ένα σημείο πρόσβασης *«κακός δίδυμος»* (evil twin) με γνώριμο όνομα δικτύου μπορεί να προσελκύσει ανυποψίαστους χρήστες.",
          "Μόλις βρεθεί στη μέση, ο επιτιθέμενος μπορεί είτε να **υποκλέπτει** παθητικά τη μη κρυπτογραφημένη κίνηση είτε να την τροποποιεί ενεργά —για παράδειγμα μέσω της *απογύμνωσης TLS* (TLS stripping), η οποία υποβαθμίζει μια σύνδεση από HTTPS σε HTTP. Η κρυπτογραφία είναι το θεμελιώδες αντίμετρο: το σωστά επικυρωμένο TLS (Κεφάλαιο 7) καθιστά την υποκλαπείσα κίνηση μη αναγνώσιμη και την αλλοίωση ανιχνεύσιμη, ενώ ο μηχανισμός **HTTP Strict Transport Security (HSTS)** αποτρέπει την υποβάθμιση. Σε επίπεδο δικτύου, η *δυναμική επιθεώρηση ARP* και η *παρακολούθηση DHCP* (DHCP snooping) στους μεταγωγείς, η επικύρωση DNSSEC και ο έλεγχος ταυτότητας 802.1X περιορίζουν τις ευκαιρίες υποκλοπής.",
        ],
      },
    },
    {
      id: "6.4",
      title: { en: "Layered DDoS defence in practice", el: "Πολυεπίπεδη άμυνα κατά DDoS στην πράξη" },
      body: {
        en: [
          "No single device can absorb every DDoS attack, so defence is organised in layers, each handling what it does best. At the **upstream** layer, internet service providers and cloud scrubbing services absorb volumetric floods using capacity far larger than any individual organisation's link; anycast routing spreads the load across many data centres. At the **network edge**, routers apply access lists and rate limits, and *remote-triggered black-holing* can sacrifice a single attacked address to protect the rest of the network.",
          "Closer to the service, **protocol defences** such as *SYN cookies* allow servers to handle floods of half-open connections without storing state. At the **application** layer, content delivery networks, web application firewalls, caching and per-client rate limiting filter expensive requests, while challenges such as CAPTCHAs separate humans from bots. Finally, a documented **runbook**—who to call, how to activate scrubbing, how to communicate with customers—ensures that the organisation reacts in minutes rather than hours.",
        ],
        el: [
          "Καμία μεμονωμένη συσκευή δεν μπορεί να απορροφήσει κάθε επίθεση DDoS· γι' αυτό η άμυνα οργανώνεται σε επίπεδα, καθένα από τα οποία χειρίζεται αυτό που κάνει καλύτερα. Στο **ανάντη** επίπεδο, οι πάροχοι διαδικτύου και οι υπηρεσίες «καθαρισμού» κίνησης στο νέφος απορροφούν τις ογκομετρικές πλημμύρες, αξιοποιώντας χωρητικότητα πολύ μεγαλύτερη από τη σύνδεση οποιουδήποτε μεμονωμένου οργανισμού· η δρομολόγηση anycast κατανέμει το φορτίο σε πολλά κέντρα δεδομένων. Στην **άκρη του δικτύου**, οι δρομολογητές εφαρμόζουν λίστες πρόσβασης και όρια ρυθμού, ενώ η *απομακρυσμένα ενεργοποιούμενη «μαύρη τρύπα»* (remote-triggered black-holing) μπορεί να θυσιάσει μία διεύθυνση που δέχεται επίθεση για να προστατεύσει το υπόλοιπο δίκτυο.",
          "Πιο κοντά στην υπηρεσία, **άμυνες επιπέδου πρωτοκόλλου**, όπως τα *SYN cookies*, επιτρέπουν στους διακομιστές να χειρίζονται πλημμύρες ημιανοιχτών συνδέσεων χωρίς να αποθηκεύουν κατάσταση. Στο επίπεδο της **εφαρμογής**, τα δίκτυα διανομής περιεχομένου (CDN), τα τείχη προστασίας εφαρμογών ιστού (WAF), η προσωρινή αποθήκευση και ο περιορισμός ρυθμού ανά πελάτη φιλτράρουν τα απαιτητικά αιτήματα, ενώ δοκιμασίες όπως τα CAPTCHA διαχωρίζουν τους ανθρώπους από τα bots. Τέλος, ένα τεκμηριωμένο **εγχειρίδιο ενεργειών** (runbook) —ποιον καλούμε, πώς ενεργοποιούμε τον καθαρισμό κίνησης, πώς επικοινωνούμε με τους πελάτες— εξασφαλίζει ότι ο οργανισμός αντιδρά σε λεπτά και όχι σε ώρες.",
        ],
      },
    },
    {
      id: "6.5",
      title: { en: "Firewalls and virtual private networks", el: "Τείχη προστασίας και εικονικά ιδιωτικά δίκτυα" },
      body: {
        en: [
          "A **firewall** enforces a policy about which traffic may pass between network zones. *Packet filters* examine individual packets by address, port and protocol. *Stateful* firewalls track connections, so that a reply is allowed only if it matches a request that was sent. *Next-generation firewalls* additionally identify applications and users and may integrate intrusion prevention. Regardless of generation, one design rule is fundamental: the policy should **deny by default** and allow only explicitly required flows, in line with the fail-safe defaults principle.",
          "A **virtual private network (VPN)** creates an encrypted tunnel across an untrusted network. **IPsec** operates at the network layer and is common for site-to-site links; **TLS-based VPNs** are convenient for remote users; **WireGuard** is a modern protocol with a deliberately small code base and fixed, contemporary cryptography. It is important to understand what a VPN does *not* do: it protects traffic in transit but does not make the connecting device trustworthy. A compromised laptop connected via VPN brings the attacker inside the network, which is one reason why organisations are moving towards Zero Trust access (Chapter 13).",
        ],
        el: [
          "Ένα **τείχος προστασίας** (firewall) επιβάλλει μια πολιτική σχετικά με το ποια κίνηση επιτρέπεται να διέρχεται μεταξύ ζωνών του δικτύου. Τα *φίλτρα πακέτων* εξετάζουν μεμονωμένα πακέτα με βάση τη διεύθυνση, τη θύρα και το πρωτόκολλο. Τα τείχη προστασίας *με διατήρηση κατάστασης* (stateful) παρακολουθούν τις συνδέσεις, ώστε μια απάντηση να επιτρέπεται μόνο αν αντιστοιχεί σε αίτημα που έχει σταλεί. Τα *τείχη προστασίας νέας γενιάς* αναγνωρίζουν επιπλέον εφαρμογές και χρήστες και μπορεί να ενσωματώνουν πρόληψη εισβολών. Ανεξάρτητα από τη γενιά, ένας κανόνας σχεδίασης είναι θεμελιώδης: η πολιτική πρέπει να **απορρίπτει εξ ορισμού** και να επιτρέπει μόνο τις ρητά αναγκαίες ροές, σύμφωνα με την αρχή των ασφαλών προεπιλογών.",
          "Ένα **εικονικό ιδιωτικό δίκτυο** (Virtual Private Network, VPN) δημιουργεί ένα κρυπτογραφημένο τούνελ μέσα από ένα μη αξιόπιστο δίκτυο. Το **IPsec** λειτουργεί στο επίπεδο δικτύου και χρησιμοποιείται συχνά για συνδέσεις μεταξύ εγκαταστάσεων· τα **VPN που βασίζονται σε TLS** είναι βολικά για απομακρυσμένους χρήστες· το **WireGuard** είναι ένα σύγχρονο πρωτόκολλο με σκόπιμα μικρό όγκο κώδικα και σταθερή, σύγχρονη κρυπτογραφία. Είναι σημαντικό να κατανοηθεί τι *δεν* κάνει ένα VPN: προστατεύει την κίνηση κατά τη μεταφορά, αλλά δεν καθιστά αξιόπιστη τη συσκευή που συνδέεται. Ένας παραβιασμένος φορητός υπολογιστής που συνδέεται μέσω VPN φέρνει τον επιτιθέμενο μέσα στο δίκτυο —ένας από τους λόγους για τους οποίους οι οργανισμοί μεταβαίνουν σε πρόσβαση μηδενικής εμπιστοσύνης (Κεφάλαιο 13).",
        ],
      },
    },
    {
      id: "6.6",
      title: { en: "Segmentation, network access control and wireless security", el: "Κατάτμηση, έλεγχος πρόσβασης στο δίκτυο και ασφάλεια ασύρματων δικτύων" },
      body: {
        en: [
          "**Network segmentation** divides a network into zones—for example, user workstations, servers, management interfaces and guest Wi-Fi—and allows only the traffic that each zone genuinely needs. Segmentation does not prevent the first compromise, but it limits how far an attacker can move afterwards; the WannaCry case in Chapter 4 showed the cost of flat networks. *Micro-segmentation* applies the same idea down to individual workloads.",
          "**Network access control (NAC)** decides whether a device may join the network at all. The IEEE **802.1X** standard requires each device to authenticate—usually with a certificate—before a switch port or wireless connection is activated, and can place non-compliant devices in a quarantine network. Wireless security has evolved considerably: WEP is completely broken, WPA2 is vulnerable to offline password guessing when weak passphrases are used, and **WPA3** introduces the SAE handshake, which resists such guessing and provides forward secrecy. In enterprises, WPA2/WPA3-Enterprise with 802.1X remains the recommended configuration.",
        ],
        el: [
          "Η **κατάτμηση δικτύου** (segmentation) διαιρεί ένα δίκτυο σε ζώνες —για παράδειγμα σταθμούς εργασίας χρηστών, διακομιστές, διεπαφές διαχείρισης και Wi-Fi επισκεπτών— και επιτρέπει μόνο την κίνηση που πραγματικά χρειάζεται κάθε ζώνη. Η κατάτμηση δεν αποτρέπει την πρώτη παραβίαση, περιορίζει όμως το πόσο μακριά μπορεί να κινηθεί ο επιτιθέμενος στη συνέχεια· η περίπτωση του WannaCry στο Κεφάλαιο 4 έδειξε το κόστος των επίπεδων δικτύων. Η *μικροκατάτμηση* εφαρμόζει την ίδια ιδέα έως το επίπεδο των μεμονωμένων φόρτων εργασίας.",
          "Ο **έλεγχος πρόσβασης στο δίκτυο** (Network Access Control, NAC) αποφασίζει αν μια συσκευή επιτρέπεται καν να συνδεθεί στο δίκτυο. Το πρότυπο **IEEE 802.1X** απαιτεί από κάθε συσκευή να επαληθεύσει την ταυτότητά της —συνήθως με πιστοποιητικό— πριν ενεργοποιηθεί η θύρα του μεταγωγέα ή η ασύρματη σύνδεση, και μπορεί να τοποθετεί μη συμμορφούμενες συσκευές σε δίκτυο καραντίνας. Η ασφάλεια των ασύρματων δικτύων έχει εξελιχθεί σημαντικά: το WEP είναι πλήρως παραβιασμένο, το WPA2 είναι ευάλωτο σε μαντεψιά κωδικών εκτός σύνδεσης όταν χρησιμοποιούνται αδύναμες φράσεις πρόσβασης, ενώ το **WPA3** εισάγει τη χειραψία SAE, η οποία αντιστέκεται σε τέτοιες μαντεψιές και παρέχει εμπρόσθια μυστικότητα. Στις επιχειρήσεις, η συνιστώμενη ρύθμιση παραμένει το WPA2/WPA3-Enterprise με 802.1X.",
        ],
      },
    },
  ],
  terms: {
    en: [
      { term: "DDoS", def: "Distributed denial of service: an availability attack launched from many sources simultaneously." },
      { term: "Amplification", def: "Using third-party servers that return large responses to small, spoofed requests." },
      { term: "Botnet / C2", def: "A network of compromised devices and the command-and-control channel that directs them." },
      { term: "ARP spoofing", def: "Forging ARP messages to redirect local traffic through the attacker." },
      { term: "Stateful firewall", def: "A firewall that tracks connections and permits replies only to legitimate requests." },
      { term: "802.1X", def: "Port-based network access control that authenticates devices before granting connectivity." },
    ],
    el: [
      { term: "DDoS", def: "Κατανεμημένη άρνηση υπηρεσίας: επίθεση κατά της διαθεσιμότητας από πολλές πηγές ταυτόχρονα." },
      { term: "Ενίσχυση", def: "Αξιοποίηση τρίτων διακομιστών που επιστρέφουν μεγάλες απαντήσεις σε μικρά, πλαστογραφημένα αιτήματα." },
      { term: "Botnet / C2", def: "Δίκτυο παραβιασμένων συσκευών και το κανάλι διοίκησης και ελέγχου που τις κατευθύνει." },
      { term: "Πλαστογράφηση ARP", def: "Αποστολή ψευδών μηνυμάτων ARP για την ανακατεύθυνση της τοπικής κίνησης μέσω του επιτιθέμενου." },
      { term: "Τείχος προστασίας με κατάσταση", def: "Τείχος προστασίας που παρακολουθεί τις συνδέσεις και επιτρέπει απαντήσεις μόνο σε νόμιμα αιτήματα." },
      { term: "802.1X", def: "Έλεγχος πρόσβασης ανά θύρα που επαληθεύει την ταυτότητα των συσκευών πριν τους παραχωρήσει συνδεσιμότητα." },
    ],
  },
  summary: {
    en: [
      "DDoS attacks target bandwidth, protocol state or application resources; amplification multiplies the attacker's power through spoofing.",
      "Botnets are controlled through centralised or peer-to-peer C2 and are monetised in many ways; Mirai exposed the weakness of default IoT credentials.",
      "MITM attacks exploit trust in local protocols; validated TLS, HSTS and switch-level protections are the primary countermeasures.",
      "DDoS defence is layered, from upstream scrubbing to application rate limiting, and depends on a prepared runbook.",
      "Firewalls, VPNs, segmentation and NAC each solve specific problems—none of them makes a compromised device trustworthy.",
    ],
    el: [
      "Οι επιθέσεις DDoS στοχεύουν το εύρος ζώνης, την κατάσταση των πρωτοκόλλων ή τους πόρους της εφαρμογής· η ενίσχυση πολλαπλασιάζει τη δύναμη του επιτιθέμενου μέσω πλαστογράφησης.",
      "Τα botnet ελέγχονται μέσω κεντρικής ή ομότιμης διοίκησης-ελέγχου και αξιοποιούνται με πολλούς τρόπους· το Mirai ανέδειξε την αδυναμία των εργοστασιακών διαπιστευτηρίων στις συσκευές IoT.",
      "Οι επιθέσεις ενδιάμεσου εκμεταλλεύονται την εμπιστοσύνη στα τοπικά πρωτόκολλα· τα κύρια αντίμετρα είναι το επικυρωμένο TLS, το HSTS και οι προστασίες στους μεταγωγείς.",
      "Η άμυνα κατά DDoS είναι πολυεπίπεδη, από τον καθαρισμό κίνησης στο ανάντη δίκτυο έως τον περιορισμό ρυθμού στην εφαρμογή, και εξαρτάται από ένα προετοιμασμένο εγχειρίδιο ενεργειών.",
      "Τα τείχη προστασίας, τα VPN, η κατάτμηση και ο NAC επιλύουν συγκεκριμένα προβλήματα —κανένα δεν καθιστά αξιόπιστη μια παραβιασμένη συσκευή.",
    ],
  },
  questions: {
    en: [
      "Explain why an attacker using DNS amplification needs to forge the source IP address of their requests.",
      "Why are peer-to-peer botnets harder to take down than centralised ones?",
      "Describe how HSTS defeats a TLS-stripping attack on a public Wi-Fi network.",
      "A company says, 'All remote staff use our VPN, so their laptops are safe.' Critically evaluate this statement.",
    ],
    el: [
      "Εξηγήστε γιατί ένας επιτιθέμενος που χρησιμοποιεί ενίσχυση DNS πρέπει να πλαστογραφεί τη διεύθυνση IP προέλευσης των αιτημάτων του.",
      "Γιατί τα ομότιμα botnet εξαρθρώνονται δυσκολότερα από τα κεντρικά;",
      "Περιγράψτε πώς το HSTS αποτρέπει μια επίθεση απογύμνωσης TLS σε δημόσιο δίκτυο Wi-Fi.",
      "Μια εταιρεία δηλώνει: «Όλοι οι απομακρυσμένοι εργαζόμενοι χρησιμοποιούν το VPN μας, άρα οι φορητοί τους υπολογιστές είναι ασφαλείς». Αξιολογήστε κριτικά αυτή τη δήλωση.",
    ],
  },
};

export default ch06;

import type { Chapter } from "../types";

const ch11: Chapter = {
  n: 11,
  part: 4,
  title: { en: "Detection, Threat Hunting, Incident Response and Lab Operations", el: "Ανίχνευση, Προληπτική Αναζήτηση Απειλών, Απόκριση σε Περιστατικά και Εργαστηριακές Λειτουργίες" },
  subtitle: {
    en: "IDS/IPS · Signatures and anomaly detection · Evasion · Threat hunting · YARA and Sigma · Isolated labs · NIST incident response · SOC operations",
    el: "IDS/IPS · Υπογραφές και ανίχνευση ανωμαλιών · Τεχνικές αποφυγής · Προληπτική αναζήτηση απειλών · YARA και Sigma · Απομονωμένα εργαστήρια · Απόκριση σε περιστατικά κατά NIST · Λειτουργίες SOC",
  },
  level: { en: "Intermediate–Advanced · Operations", el: "Μεσαίο–Προχωρημένο επίπεδο · Λειτουργίες" },
  hours: "10–12",
  intro: {
    en: [
      "Prevention eventually fails. Chapter 1 introduced defence in depth precisely because every preventive control has gaps, and the preceding chapters have shown how skilled adversaries find them. This chapter therefore concerns what happens next: how an organisation *detects* malicious activity, *searches* proactively for threats that evaded its alerts, and *responds* in a disciplined way that limits damage and preserves evidence.",
      "We begin with intrusion detection and prevention systems, the two main inspection paradigms and the techniques attackers use to evade them. We then turn to proactive threat hunting, the YARA and Sigma rule languages, and the design of isolated laboratories in which malware can be studied safely. The chapter concludes with the incident response lifecycle defined by NIST and with the organisation of a Security Operations Centre (SOC).",
    ],
    el: [
      "Η πρόληψη αργά ή γρήγορα αποτυγχάνει. Το Κεφάλαιο 1 εισήγαγε την άμυνα σε βάθος ακριβώς επειδή κάθε προληπτικό μέτρο έχει κενά, και τα προηγούμενα κεφάλαια έδειξαν πώς τα εντοπίζουν οι ικανοί αντίπαλοι. Το παρόν κεφάλαιο αφορά, επομένως, όσα ακολουθούν: πώς ένας οργανισμός *ανιχνεύει* κακόβουλη δραστηριότητα, *αναζητά* προληπτικά απειλές που διέφυγαν από τους συναγερμούς του και *αποκρίνεται* με πειθαρχημένο τρόπο που περιορίζει τη ζημιά και διαφυλάσσει τα αποδεικτικά στοιχεία.",
      "Ξεκινάμε με τα συστήματα ανίχνευσης και πρόληψης εισβολών, τα δύο κύρια παραδείγματα επιθεώρησης και τις τεχνικές με τις οποίες οι επιτιθέμενοι τα αποφεύγουν. Στη συνέχεια στρεφόμαστε στην προληπτική αναζήτηση απειλών, στις γλώσσες κανόνων YARA και Sigma και στον σχεδιασμό απομονωμένων εργαστηρίων, όπου το κακόβουλο λογισμικό μπορεί να μελετηθεί με ασφάλεια. Το κεφάλαιο ολοκληρώνεται με τον κύκλο απόκρισης σε περιστατικά όπως τον ορίζει το NIST και με την οργάνωση ενός Κέντρου Επιχειρήσεων Ασφάλειας (SOC).",
    ],
  },
  outcomes: {
    en: [
      "Compare network- and host-based IDS/IPS and the signature and anomaly inspection paradigms.",
      "Explain common IDS evasion techniques and the role of traffic normalisation.",
      "Plan a hypothesis-driven threat hunt using endpoint and memory telemetry.",
      "Write basic YARA and Sigma rules and manage detections as code.",
      "Apply the NIST incident response lifecycle and describe SOC tiers and the SIEM pipeline.",
    ],
    el: [
      "Να συγκρίνετε τα δικτυακά και τα τοπικά IDS/IPS, καθώς και την επιθεώρηση βάσει υπογραφών και βάσει ανωμαλιών.",
      "Να εξηγείτε συνήθεις τεχνικές αποφυγής των IDS και τον ρόλο της κανονικοποίησης της κίνησης.",
      "Να σχεδιάζετε μια προληπτική αναζήτηση απειλών βασισμένη σε υποθέσεις, αξιοποιώντας τηλεμετρία τερματικών και μνήμης.",
      "Να συντάσσετε βασικούς κανόνες YARA και Sigma και να διαχειρίζεστε τις ανιχνεύσεις ως κώδικα.",
      "Να εφαρμόζετε τον κύκλο απόκρισης σε περιστατικά του NIST και να περιγράφετε τις βαθμίδες ενός SOC και τη ροή ενός SIEM.",
    ],
  },
  sections: [
    {
      id: "11.1",
      title: { en: "IDS and IPS architectures and inspection paradigms", el: "Αρχιτεκτονικές IDS και IPS και παραδείγματα επιθεώρησης" },
      body: {
        en: [
          "An **intrusion detection system (IDS)** monitors activity and raises alerts; an **intrusion prevention system (IPS)** sits in the traffic path and can block malicious activity automatically. A **network IDS (NIDS)**, such as Suricata, Snort or Zeek, analyses copies of network traffic from a switch mirror port or a network tap and sees communication between many hosts. A **host IDS (HIDS)**, such as Wazuh or OSSEC, runs on individual systems and observes file changes, logs and processes—including activity inside encrypted connections that a network sensor cannot read. The two views are complementary.",
          "Detection logic follows two paradigms. **Signature-based** detection matches known patterns, such as a specific exploit string; it is precise and easy to explain but blind to new attacks. **Anomaly- or behaviour-based** detection models what is normal and flags deviations, such as a workstation suddenly transferring gigabytes at night; it can find unknown attacks but generates more false positives and requires a careful baseline. Mature programmes combine both and tune them continuously, because an alert that analysts learn to ignore is worse than no alert at all.",
        ],
        el: [
          "Ένα **σύστημα ανίχνευσης εισβολών** (Intrusion Detection System, IDS) παρακολουθεί τη δραστηριότητα και εκδίδει ειδοποιήσεις· ένα **σύστημα πρόληψης εισβολών** (Intrusion Prevention System, IPS) βρίσκεται στη διαδρομή της κίνησης και μπορεί να αποκλείει αυτόματα την κακόβουλη δραστηριότητα. Ένα **δικτυακό IDS** (NIDS), όπως τα Suricata, Snort ή Zeek, αναλύει αντίγραφα της δικτυακής κίνησης από θύρα κατοπτρισμού ενός μεταγωγέα ή από δικτυακό διακλαδωτή (tap) και βλέπει την επικοινωνία μεταξύ πολλών υπολογιστών. Ένα **τοπικό IDS** (HIDS), όπως τα Wazuh ή OSSEC, εκτελείται σε μεμονωμένα συστήματα και παρατηρεί αλλαγές αρχείων, αρχεία καταγραφής και διεργασίες —συμπεριλαμβανομένης δραστηριότητας μέσα σε κρυπτογραφημένες συνδέσεις που ένας δικτυακός αισθητήρας δεν μπορεί να διαβάσει. Οι δύο οπτικές είναι συμπληρωματικές.",
          "Η λογική της ανίχνευσης ακολουθεί δύο παραδείγματα. Η ανίχνευση **βάσει υπογραφών** αναζητά γνωστά μοτίβα, όπως μια συγκεκριμένη συμβολοσειρά εκμετάλλευσης· είναι ακριβής και εύκολα εξηγήσιμη, αλλά τυφλή απέναντι σε νέες επιθέσεις. Η ανίχνευση **βάσει ανωμαλιών ή συμπεριφοράς** μοντελοποιεί το φυσιολογικό και επισημαίνει αποκλίσεις, όπως έναν σταθμό εργασίας που ξαφνικά μεταφέρει gigabytes τη νύχτα· μπορεί να εντοπίσει άγνωστες επιθέσεις, αλλά παράγει περισσότερα ψευδώς θετικά αποτελέσματα και απαιτεί προσεκτικά καθορισμένη συμπεριφορά αναφοράς. Τα ώριμα προγράμματα συνδυάζουν και τα δύο και τα βελτιστοποιούν συνεχώς, επειδή μια ειδοποίηση που οι αναλυτές έχουν μάθει να αγνοούν είναι χειρότερη από την απουσία ειδοποίησης.",
        ],
      },
    },
    {
      id: "11.2",
      title: { en: "Evasion techniques and automated mitigation", el: "Τεχνικές αποφυγής και αυτοματοποιημένη αντιμετώπιση" },
      body: {
        en: [
          "Attackers try to make the IDS see something different from what the target actually receives. **Fragmentation** splits a malicious payload across many small packets or overlapping fragments; **encoding** and obfuscation disguise known strings; manipulating timing or *TTL* values can cause the sensor and the destination to reassemble a stream differently; and, increasingly, attacks are simply hidden inside **encrypted** TLS traffic. Countermeasures include **traffic normalisation**, which reassembles streams in the same way as the end host, TLS inspection at controlled points where it is lawful and proportionate, and a greater reliance on host-based telemetry and metadata such as connection timing.",
          "When an IPS or an automated playbook responds, it can **drop** the offending packets, **reset** the TCP connection, **block** the source address for a period, **reconfigure** a firewall, or **isolate** an endpoint from the network. Automation shortens response time dramatically, but a wrongly tuned rule can also cut off legitimate business activity. Automatic blocking is therefore reserved for high-confidence detections, while lower-confidence alerts are routed to analysts.",
        ],
        el: [
          "Οι επιτιθέμενοι προσπαθούν να κάνουν το IDS να «βλέπει» κάτι διαφορετικό από αυτό που λαμβάνει πράγματι ο στόχος. Ο **κατακερματισμός** διασπά ένα κακόβουλο φορτίο σε πολλά μικρά πακέτα ή σε επικαλυπτόμενα τμήματα· η **κωδικοποίηση** και η συσκότιση μεταμφιέζουν γνωστές συμβολοσειρές· η χειραγώγηση του χρονισμού ή των τιμών *TTL* μπορεί να κάνει τον αισθητήρα και τον προορισμό να ανασυνθέτουν μια ροή με διαφορετικό τρόπο· και, όλο και συχνότερα, οι επιθέσεις απλώς κρύβονται μέσα σε **κρυπτογραφημένη** κίνηση TLS. Τα αντίμετρα περιλαμβάνουν την **κανονικοποίηση της κίνησης**, η οποία ανασυνθέτει τις ροές με τον ίδιο τρόπο όπως ο τελικός υπολογιστής, την επιθεώρηση TLS σε ελεγχόμενα σημεία όπου αυτό είναι νόμιμο και αναλογικό, καθώς και τη μεγαλύτερη αξιοποίηση της τοπικής τηλεμετρίας και των μεταδεδομένων, όπως ο χρονισμός των συνδέσεων.",
          "Όταν ένα IPS ή ένα αυτοματοποιημένο σχέδιο ενεργειών αποκρίνεται, μπορεί να **απορρίψει** τα επίμαχα πακέτα, να **επαναφέρει** τη σύνδεση TCP, να **αποκλείσει** τη διεύθυνση προέλευσης για ένα διάστημα, να **αναδιαμορφώσει** ένα τείχος προστασίας ή να **απομονώσει** ένα τερματικό από το δίκτυο. Ο αυτοματισμός μειώνει δραματικά τον χρόνο απόκρισης, όμως ένας λανθασμένα ρυθμισμένος κανόνας μπορεί επίσης να διακόψει νόμιμη επιχειρησιακή δραστηριότητα. Γι' αυτό ο αυτόματος αποκλεισμός επιφυλάσσεται για ανιχνεύσεις υψηλής βεβαιότητας, ενώ οι ειδοποιήσεις χαμηλότερης βεβαιότητας διοχετεύονται στους αναλυτές.",
        ],
      },
    },
    {
      id: "11.3",
      title: { en: "Proactive threat hunting and endpoint telemetry", el: "Προληπτική αναζήτηση απειλών και τηλεμετρία τερματικών" },
      body: {
        en: [
          "**Threat hunting** starts from the assumption that an adversary may already be present without having triggered any alert. A hunt is driven by a **hypothesis**, typically derived from threat intelligence or from ATT&CK—for example, 'an attacker is using scheduled tasks for persistence on our servers'. The hunter then queries the available telemetry, investigates anomalies and reaches a conclusion. Whatever the outcome, a good hunt ends by turning its logic into an automated detection, so that the same behaviour will be caught in future.",
          "Hunting depends on rich **endpoint telemetry**. Tools such as Microsoft Sysmon record process creation with full command lines, network connections, driver loads and registry changes; EDR platforms collect similar data at scale; and on Linux, `auditd` and eBPF-based sensors provide equivalent visibility. **Memory analysis** with frameworks such as Volatility can reveal injected code, hidden processes and decrypted malware configurations that never touched the disk—an essential capability against the fileless techniques described in Chapter 4.",
        ],
        el: [
          "Η **προληπτική αναζήτηση απειλών** (threat hunting) ξεκινά από την παραδοχή ότι ένας αντίπαλος μπορεί να βρίσκεται ήδη στο περιβάλλον χωρίς να έχει ενεργοποιήσει κανέναν συναγερμό. Η αναζήτηση καθοδηγείται από μια **υπόθεση**, που συνήθως προέρχεται από πληροφορίες απειλών ή από το ATT&CK —για παράδειγμα «ένας επιτιθέμενος χρησιμοποιεί προγραμματισμένες εργασίες για μόνιμη παρουσία στους διακομιστές μας». Ο αναλυτής υποβάλλει στη συνέχεια ερωτήματα στη διαθέσιμη τηλεμετρία, διερευνά τις ανωμαλίες και καταλήγει σε συμπέρασμα. Όποιο κι αν είναι το αποτέλεσμα, μια καλή αναζήτηση ολοκληρώνεται με τη μετατροπή της λογικής της σε αυτοματοποιημένη ανίχνευση, ώστε η ίδια συμπεριφορά να εντοπίζεται στο μέλλον.",
          "Η αναζήτηση απειλών εξαρτάται από πλούσια **τηλεμετρία τερματικών**. Εργαλεία όπως το Sysmon της Microsoft καταγράφουν τη δημιουργία διεργασιών με την πλήρη γραμμή εντολών, τις δικτυακές συνδέσεις, τη φόρτωση οδηγών και τις αλλαγές στο μητρώο· οι πλατφόρμες EDR συλλέγουν παρόμοια δεδομένα σε μεγάλη κλίμακα· και στο Linux, το `auditd` και οι αισθητήρες που βασίζονται στο eBPF παρέχουν ισοδύναμη ορατότητα. Η **ανάλυση μνήμης** με πλαίσια όπως το Volatility μπορεί να αποκαλύψει εγχυμένο κώδικα, κρυφές διεργασίες και αποκρυπτογραφημένες ρυθμίσεις κακόβουλου λογισμικού που δεν γράφτηκαν ποτέ στον δίσκο —ικανότητα απαραίτητη απέναντι στις τεχνικές χωρίς αρχεία που περιγράφηκαν στο Κεφάλαιο 4.",
        ],
      },
    },
    {
      id: "11.4",
      title: { en: "YARA, Sigma and detection-as-code", el: "YARA, Sigma και ανιχνεύσεις ως κώδικας" },
      body: {
        en: [
          "**YARA** is a pattern-matching language for classifying files and memory. A rule has three parts: *meta* (descriptive information), *strings* (text, hexadecimal or regular-expression patterns) and a *condition* that combines them, for example `uint16(0) == 0x5A4D and 2 of ($s*)`, meaning 'a Windows executable containing at least two of the listed strings'. Good rules target characteristics that the malware author cannot easily change—unique code sequences, configuration structures—rather than a single string, and they are tested against a corpus of legitimate files to avoid false positives.",
          "Whereas YARA inspects files, **Sigma** describes suspicious patterns in *log events* in a vendor-neutral format that can be converted into queries for different SIEM platforms. **Detection-as-code** applies software-engineering discipline to both: rules are stored in version control, peer-reviewed, tested automatically against sample data, mapped to ATT&CK techniques and deployed through a pipeline. **SOAR** (security orchestration, automation and response) platforms then execute playbooks when a detection fires—enriching the alert, opening a ticket and, if confidence is high, isolating the host.",
        ],
        el: [
          "Η **YARA** είναι μια γλώσσα αντιστοίχισης προτύπων για την ταξινόμηση αρχείων και περιοχών μνήμης. Ένας κανόνας έχει τρία μέρη: *meta* (περιγραφικές πληροφορίες), *strings* (πρότυπα κειμένου, δεκαεξαδικά ή κανονικές εκφράσεις) και μια *condition* που τα συνδυάζει, για παράδειγμα `uint16(0) == 0x5A4D and 2 of ($s*)`, που σημαίνει «εκτελέσιμο Windows που περιέχει τουλάχιστον δύο από τις δηλωμένες συμβολοσειρές». Οι καλοί κανόνες στοχεύουν χαρακτηριστικά που ο δημιουργός του κακόβουλου λογισμικού δεν μπορεί να αλλάξει εύκολα —μοναδικές ακολουθίες κώδικα, δομές ρυθμίσεων— και όχι μία μόνο συμβολοσειρά, και δοκιμάζονται σε συλλογή νόμιμων αρχείων για την αποφυγή ψευδώς θετικών αποτελεσμάτων.",
          "Ενώ η YARA επιθεωρεί αρχεία, η **Sigma** περιγράφει ύποπτα μοτίβα σε *συμβάντα αρχείων καταγραφής*, σε μορφή ανεξάρτητη από προμηθευτή, η οποία μπορεί να μετατραπεί σε ερωτήματα για διαφορετικές πλατφόρμες SIEM. Η προσέγγιση των **ανιχνεύσεων ως κώδικα** (detection-as-code) εφαρμόζει και στις δύο την πειθαρχία της μηχανικής λογισμικού: οι κανόνες αποθηκεύονται σε σύστημα ελέγχου εκδόσεων, ελέγχονται από ομοτίμους, δοκιμάζονται αυτόματα σε δείγματα δεδομένων, αντιστοιχίζονται σε τεχνικές του ATT&CK και εγκαθίστανται μέσω μιας ροής ανάπτυξης. Οι πλατφόρμες **SOAR** (ενορχήστρωση, αυτοματοποίηση και απόκριση ασφάλειας) εκτελούν στη συνέχεια σχέδια ενεργειών όταν ενεργοποιείται μια ανίχνευση —εμπλουτίζοντας την ειδοποίηση, ανοίγοντας ένα δελτίο και, αν η βεβαιότητα είναι υψηλή, απομονώνοντας τον υπολογιστή.",
        ],
      },
    },
    {
      id: "11.5",
      title: { en: "Designing isolated analysis laboratories", el: "Σχεδιασμός απομονωμένων εργαστηρίων ανάλυσης" },
      body: {
        en: [
          "Detection engineering and malware analysis require a place where hostile code can run without endangering real systems. A safe laboratory relies on **virtualisation**: analysis machines run as virtual machines on a dedicated host, with **snapshots** that allow them to be restored to a clean state after every experiment. Networking is set to *host-only* or to an internal network with no route to the internet or the production environment; where network behaviour must be observed, simulated services such as INetSim or FakeNet answer the malware's requests.",
          "Isolation must also be procedural. Shared folders and clipboard synchronisation between host and guest should be disabled, samples should be stored in password-protected archives and clearly labelled, and analysts should remember that some malware detects virtual machines and changes its behaviour. These precautions are an application of the same containment thinking that governs incident response.",
        ],
        el: [
          "Η μηχανική ανιχνεύσεων και η ανάλυση κακόβουλου λογισμικού απαιτούν έναν χώρο όπου ο εχθρικός κώδικας μπορεί να εκτελεστεί χωρίς να θέτει σε κίνδυνο πραγματικά συστήματα. Ένα ασφαλές εργαστήριο βασίζεται στην **εικονικοποίηση**: τα μηχανήματα ανάλυσης λειτουργούν ως εικονικές μηχανές σε αποκλειστικό φυσικό υπολογιστή, με **στιγμιότυπα** (snapshots) που επιτρέπουν την επαναφορά τους σε καθαρή κατάσταση μετά από κάθε πείραμα. Η δικτύωση ορίζεται ως *host-only* ή ως εσωτερικό δίκτυο χωρίς διαδρομή προς το διαδίκτυο ή το περιβάλλον παραγωγής· όπου πρέπει να παρατηρηθεί η δικτυακή συμπεριφορά, προσομοιωμένες υπηρεσίες όπως τα INetSim ή FakeNet απαντούν στα αιτήματα του κακόβουλου λογισμικού.",
          "Η απομόνωση πρέπει να είναι και διαδικαστική. Οι κοινόχρηστοι φάκελοι και ο συγχρονισμός του προχείρου μεταξύ φυσικού και εικονικού μηχανήματος πρέπει να απενεργοποιούνται, τα δείγματα να αποθηκεύονται σε αρχεία συμπίεσης με κωδικό και με σαφή σήμανση, ενώ οι αναλυτές πρέπει να θυμούνται ότι ορισμένα κακόβουλα προγράμματα ανιχνεύουν τις εικονικές μηχανές και αλλάζουν συμπεριφορά. Οι προφυλάξεις αυτές εφαρμόζουν την ίδια λογική περιορισμού που διέπει την απόκριση σε περιστατικά.",
        ],
      },
    },
    {
      id: "11.6",
      title: { en: "The incident response lifecycle (NIST SP 800-61)", el: "Ο κύκλος απόκρισης σε περιστατικά (NIST SP 800-61)" },
      body: {
        en: [
          "NIST Special Publication 800-61 describes incident response as a cycle of four phases. **Preparation** comes first and determines everything else: an approved plan, defined roles, contact lists, communication templates, tools, logging and regular exercises. **Detection and analysis** confirms that an incident has occurred, determines its scope and severity, and documents every step. **Containment, eradication and recovery** limits the damage—short-term by isolating systems and disabling compromised accounts, long-term by rebuilding them—removes the attacker's footholds and restores normal operation from trusted sources. **Post-incident activity** holds a blameless lessons-learned review within a few weeks and feeds improvements back into preparation.",
          "Two tensions run through every incident. The first is between **speed and evidence**: switching off a machine stops the attack but destroys the contents of memory, so evidence should be captured before disruptive actions whenever possible (Chapter 12). The second is between **containment and intelligence**: removing the attacker too early, before their full footprint is known, may simply alert them and cause them to use another backdoor. The revised guidance (Rev. 3, 2025) aligns these activities with the functions of the NIST Cybersecurity Framework 2.0.",
          { t: "box", kind: "note", title: "Legal and regulatory clocks", text: "Many incidents trigger mandatory notifications—for example, 72 hours to the supervisory authority under the GDPR for personal-data breaches, and an early warning within 24 hours under NIS2 for significant incidents (Chapter 13). The response plan must identify who decides and who notifies." },
        ],
        el: [
          "Η Ειδική Έκδοση 800-61 του NIST περιγράφει την απόκριση σε περιστατικά ως κύκλο τεσσάρων φάσεων. Πρώτη έρχεται η **προετοιμασία**, η οποία καθορίζει όλα τα υπόλοιπα: εγκεκριμένο σχέδιο, καθορισμένοι ρόλοι, κατάλογοι επαφών, πρότυπα επικοινωνίας, εργαλεία, καταγραφή και τακτικές ασκήσεις. Η **ανίχνευση και ανάλυση** επιβεβαιώνει ότι σημειώθηκε περιστατικό, προσδιορίζει το εύρος και τη σοβαρότητά του και τεκμηριώνει κάθε βήμα. Ο **περιορισμός, η εξάλειψη και η ανάκαμψη** περιορίζουν τη ζημιά —βραχυπρόθεσμα με την απομόνωση συστημάτων και την απενεργοποίηση παραβιασμένων λογαριασμών, μακροπρόθεσμα με την ανακατασκευή τους— αφαιρούν τα ερείσματα του επιτιθέμενου και αποκαθιστούν την κανονική λειτουργία από αξιόπιστες πηγές. Η **δραστηριότητα μετά το περιστατικό** περιλαμβάνει μια ανασκόπηση διδαγμάτων χωρίς απόδοση ευθυνών μέσα σε λίγες εβδομάδες και επιστρέφει τις βελτιώσεις στη φάση της προετοιμασίας.",
          "Δύο εντάσεις διατρέχουν κάθε περιστατικό. Η πρώτη είναι μεταξύ **ταχύτητας και αποδεικτικών στοιχείων**: η απενεργοποίηση ενός μηχανήματος σταματά την επίθεση, αλλά καταστρέφει τα περιεχόμενα της μνήμης· γι' αυτό τα αποδεικτικά στοιχεία πρέπει, όπου είναι δυνατόν, να συλλέγονται πριν από τις ενέργειες που διαταράσσουν το σύστημα (Κεφάλαιο 12). Η δεύτερη είναι μεταξύ **περιορισμού και συλλογής πληροφοριών**: η πρόωρη απομάκρυνση του επιτιθέμενου, πριν γίνει γνωστό ολόκληρο το αποτύπωμά του, μπορεί απλώς να τον προειδοποιήσει και να τον ωθήσει να χρησιμοποιήσει άλλη κερκόπορτα. Η αναθεωρημένη καθοδήγηση (Rev. 3, 2025) ευθυγραμμίζει αυτές τις δραστηριότητες με τις λειτουργίες του NIST Cybersecurity Framework 2.0.",
          { t: "box", kind: "note", title: "Νομικές και κανονιστικές προθεσμίες", text: "Πολλά περιστατικά ενεργοποιούν υποχρεωτικές γνωστοποιήσεις —για παράδειγμα, εντός 72 ωρών στην εποπτική αρχή βάσει του ΓΚΠΔ για παραβιάσεις προσωπικών δεδομένων και έγκαιρη προειδοποίηση εντός 24 ωρών βάσει της NIS2 για σημαντικά περιστατικά (Κεφάλαιο 13). Το σχέδιο απόκρισης πρέπει να προσδιορίζει ποιος αποφασίζει και ποιος προβαίνει στη γνωστοποίηση." },
        ],
      },
    },
    {
      id: "11.7",
      title: { en: "SOC operations: tiers, the SIEM pipeline and use-case engineering", el: "Λειτουργίες SOC: βαθμίδες, η ροή του SIEM και σχεδιασμός σεναρίων χρήσης" },
      body: {
        en: [
          "A **Security Operations Centre (SOC)** is the team and infrastructure that monitors an organisation continuously. Work is traditionally divided into tiers: **Tier 1** analysts triage incoming alerts, **Tier 2** investigates confirmed incidents in depth, and **Tier 3** specialists hunt for threats, analyse malware and engineer detections. The central tool is the **SIEM** (security information and event management) platform, whose pipeline *collects* logs from many sources, *normalises* them into a common schema, *enriches* them with context such as asset owners and threat intelligence, *correlates* events into alerts and *stores* them for investigation and compliance.",
          "A SIEM is only as good as its **use cases**—the specific threats it is configured to detect. Each use case should state the threat it addresses (ideally as an ATT&CK technique), the data sources it requires, the detection logic, the expected false-positive rate and the response procedure. SOC performance is commonly measured through the **mean time to detect (MTTD)** and the **mean time to respond (MTTR)**, together with the proportion of alerts that turn out to be actionable—a key indicator of analyst workload and burnout.",
        ],
        el: [
          "Ένα **Κέντρο Επιχειρήσεων Ασφάλειας** (Security Operations Centre, SOC) είναι η ομάδα και η υποδομή που παρακολουθούν συνεχώς έναν οργανισμό. Η εργασία κατανέμεται παραδοσιακά σε βαθμίδες: οι αναλυτές της **Βαθμίδας 1** διαλογούν τις εισερχόμενες ειδοποιήσεις, η **Βαθμίδα 2** διερευνά σε βάθος τα επιβεβαιωμένα περιστατικά και οι ειδικοί της **Βαθμίδας 3** αναζητούν απειλές, αναλύουν κακόβουλο λογισμικό και σχεδιάζουν ανιχνεύσεις. Το κεντρικό εργαλείο είναι η πλατφόρμα **SIEM** (διαχείριση πληροφοριών και συμβάντων ασφάλειας), της οποίας η ροή *συλλέγει* αρχεία καταγραφής από πολλές πηγές, τα *κανονικοποιεί* σε ένα κοινό σχήμα, τα *εμπλουτίζει* με πλαίσιο, όπως οι υπεύθυνοι των στοιχείων και οι πληροφορίες απειλών, *συσχετίζει* συμβάντα σε ειδοποιήσεις και τα *αποθηκεύει* για διερεύνηση και κανονιστική συμμόρφωση.",
          "Ένα SIEM είναι τόσο καλό όσο τα **σενάρια χρήσης** του —οι συγκεκριμένες απειλές που έχει ρυθμιστεί να ανιχνεύει. Κάθε σενάριο χρήσης πρέπει να δηλώνει την απειλή που αντιμετωπίζει (ιδανικά ως τεχνική του ATT&CK), τις πηγές δεδομένων που απαιτεί, τη λογική ανίχνευσης, το αναμενόμενο ποσοστό ψευδώς θετικών και τη διαδικασία απόκρισης. Η απόδοση ενός SOC μετράται συνήθως μέσω του **μέσου χρόνου ανίχνευσης (MTTD)** και του **μέσου χρόνου απόκρισης (MTTR)**, σε συνδυασμό με το ποσοστό των ειδοποιήσεων που αποδεικνύονται αξιοποιήσιμες —βασικό δείκτη του φόρτου εργασίας και της εξουθένωσης των αναλυτών.",
        ],
      },
    },
  ],
  terms: {
    en: [
      { term: "NIDS / HIDS", def: "Network-based and host-based intrusion detection systems." },
      { term: "Traffic normalisation", def: "Reassembling traffic as the destination would, to defeat evasion." },
      { term: "Threat hunting", def: "Hypothesis-driven, proactive search for adversaries that evaded detection." },
      { term: "YARA / Sigma", def: "Rule languages for matching patterns in files (YARA) and in log events (Sigma)." },
      { term: "Containment", def: "Incident-response actions that limit the spread and impact of an attack." },
      { term: "SIEM", def: "Platform that collects, normalises, correlates and stores security events." },
    ],
    el: [
      { term: "NIDS / HIDS", def: "Δικτυακά και τοπικά συστήματα ανίχνευσης εισβολών." },
      { term: "Κανονικοποίηση κίνησης", def: "Ανασύνθεση της κίνησης όπως θα την ανασυνέθετε ο προορισμός, για την ακύρωση τεχνικών αποφυγής." },
      { term: "Προληπτική αναζήτηση απειλών", def: "Προληπτική αναζήτηση αντιπάλων που διέφυγαν της ανίχνευσης, καθοδηγούμενη από υποθέσεις." },
      { term: "YARA / Sigma", def: "Γλώσσες κανόνων για την αντιστοίχιση προτύπων σε αρχεία (YARA) και σε συμβάντα καταγραφής (Sigma)." },
      { term: "Περιορισμός", def: "Ενέργειες απόκρισης που περιορίζουν τη διάδοση και την επίπτωση μιας επίθεσης." },
      { term: "SIEM", def: "Πλατφόρμα που συλλέγει, κανονικοποιεί, συσχετίζει και αποθηκεύει συμβάντα ασφάλειας." },
    ],
  },
  summary: {
    en: [
      "Network and host sensors provide complementary visibility; signature and anomaly detection each have strengths and weaknesses.",
      "Attackers evade inspection through fragmentation, encoding and encryption; normalisation and host telemetry counter them.",
      "Threat hunting is hypothesis-driven and should end by creating new automated detections.",
      "YARA and Sigma rules, managed as code and connected to SOAR, turn knowledge into repeatable detection and response.",
      "Incident response follows the NIST lifecycle, balancing speed with evidence preservation, and the SOC operationalises it through tiers, a SIEM and measurable use cases.",
    ],
    el: [
      "Οι δικτυακοί και οι τοπικοί αισθητήρες παρέχουν συμπληρωματική ορατότητα· η ανίχνευση βάσει υπογραφών και βάσει ανωμαλιών έχει η καθεμιά πλεονεκτήματα και αδυναμίες.",
      "Οι επιτιθέμενοι αποφεύγουν την επιθεώρηση μέσω κατακερματισμού, κωδικοποίησης και κρυπτογράφησης· η κανονικοποίηση και η τοπική τηλεμετρία τούς αντιμετωπίζουν.",
      "Η προληπτική αναζήτηση απειλών καθοδηγείται από υποθέσεις και πρέπει να καταλήγει στη δημιουργία νέων αυτοματοποιημένων ανιχνεύσεων.",
      "Οι κανόνες YARA και Sigma, όταν διαχειρίζονται ως κώδικας και συνδέονται με SOAR, μετατρέπουν τη γνώση σε επαναλήψιμη ανίχνευση και απόκριση.",
      "Η απόκριση σε περιστατικά ακολουθεί τον κύκλο του NIST, εξισορροπώντας την ταχύτητα με τη διαφύλαξη των αποδεικτικών στοιχείων, και το SOC την υλοποιεί μέσω βαθμίδων, ενός SIEM και μετρήσιμων σεναρίων χρήσης.",
    ],
  },
  questions: {
    en: [
      "Why can a host-based sensor detect an attack inside HTTPS traffic that a network IDS misses?",
      "Formulate a hunting hypothesis for credential dumping from LSASS and list the telemetry you would need.",
      "Why should a YARA rule not rely on a single string such as a C2 domain name?",
      "During an incident, a manager wants to shut down the affected server immediately. Discuss the trade-offs.",
    ],
    el: [
      "Γιατί ένας τοπικός αισθητήρας μπορεί να ανιχνεύσει μια επίθεση μέσα σε κίνηση HTTPS που διαφεύγει από ένα δικτυακό IDS;",
      "Διατυπώστε μια υπόθεση αναζήτησης για την υποκλοπή διαπιστευτηρίων από τη διεργασία LSASS και αναφέρετε την τηλεμετρία που θα χρειαζόσασταν.",
      "Γιατί ένας κανόνας YARA δεν πρέπει να βασίζεται σε μία μόνο συμβολοσειρά, όπως ένα όνομα τομέα C2;",
      "Κατά τη διάρκεια ενός περιστατικού, ένας προϊστάμενος θέλει να απενεργοποιήσει αμέσως τον επηρεαζόμενο διακομιστή. Συζητήστε τα αντισταθμιστικά οφέλη και κόστη.",
    ],
  },
};

export default ch11;

import type { CliLab, HandsOnLab, TechnicalProject, QuizQuestion } from "../types";

export const ch05CliLab: CliLab = {
  id: "ch05-cli",
  title: {
    en: "Phishing Header Forensics & Social Engineering Defense Sandbox",
    el: "Προσομοιωτής Εγκληματολογίας Επικεφαλίδων Phishing & Άμυνας Κοινωνικής Μηχανικής",
  },
  scenario: {
    en: "Analyze a reported executive impersonation email, inspect raw RFC 5322 headers, validate SPF/DKIM/DMARC records, and de-obfuscate credential harvester URLs.",
    el: "Αναλύστε ένα ύποπτο email πλαστοπροσωπίας διοίκησης, εξετάστε επικεφαλίδες RFC 5322, ελέγξτε εγγραφές SPF/DKIM/DMARC και αποκωδικοποιήστε κακόβουλες διευθύνσεις URL.",
  },
  initialPrompt: "analyst@email-forensics:~$",
  banner: {
    en: "=== Chapter 5 Phishing Triage Sandbox ===\nTarget: Suspicious Message `suspicious_email.eml` | Role: Email Security Incident Handler\nType 'help' for command assistance or follow the missions below.",
    el: "=== Εργαστήριο Ανάλυσης Phishing Κεφαλαίου 5 ===\nΣτόχος: Ύποπτο Μήνυμα `suspicious_email.eml` | Ρόλος: Αναλυτής Ασφάλειας Ηλεκτρονικού Ταχυδρομείου\nΠληκτρολογήστε 'help' για βοήθεια ή ακολουθήστε τις παρακάτω αποστολές.",
  },
  fileSystem: {
    "suspicious_email.eml": 'From: "CEO Office" <ceo@corp-executive-pay.com>\nTo: finance@corp.com\nSubject: URGENT Wire Transfer Required\nReceived: from mail.spoofed-server.ru (203.0.113.88)',
    "mail_policy.json": '{"spf_enforcement":"STRICT","dmarc_action":"REJECT","dkim_check":true}',
    "whitelist_domains.txt": "corp.com\npartner-bank.gr\neu-clearing.eu",
  },
  tasks: [
    {
      id: "task-1",
      title: {
        en: "Inspect Raw Email Headers for Sender Spoofing",
        el: "Έλεγχος Επικεφαλίδων Email για Πλαστογράφηση Αποστολέα",
      },
      description: {
        en: "Inspect header anomalies in `suspicious_email.eml` using `mail-inspect`.",
        el: "Εξετάστε τις επικεφαλίδες στο `suspicious_email.eml` χρησιμοποιώντας το `mail-inspect`.",
      },
      hint: {
        en: "Execute: mail-inspect suspicious_email.eml",
        el: "Εκτελέστε: mail-inspect suspicious_email.eml",
      },
      solution: "mail-inspect suspicious_email.eml",
      validateRegex: "mail-inspect\\s+suspicious_email\\.eml",
      successMessage: {
        en: "Header inspected: Sender mismatch detected! Display Name claims CEO but originating domain is spoofed.",
        el: "Η επικεφαλίδα ελέγχθηκε: Εντοπίστηκε αναντιστοιχία! Το εμφανιζόμενο όνομα είναι πλαστό.",
      },
    },
    {
      id: "task-2",
      title: {
        en: "Validate SPF Authentication for Sending Domain",
        el: "Έλεγχος Αυθεντικοποίησης SPF για τον Τομέα Αποστολής",
      },
      description: {
        en: "Check if the sending IP is authorized in the domain's SPF record using `spf-check`.",
        el: "Ελέγξτε αν η IP αποστολής είναι εξουσιοδοτημένη στην εγγραφή SPF με το `spf-check`.",
      },
      hint: {
        en: "Execute: spf-check --domain paypa1-security.com",
        el: "Εκτελέστε: spf-check --domain paypa1-security.com",
      },
      solution: "spf-check --domain paypa1-security.com",
      validateRegex: "spf-check.*paypa1-security\\.com",
      successMessage: {
        en: "SPF Result: FAIL! Sending IP 203.0.113.88 is not authorized in SPF DNS record.",
        el: "Αποτέλεσμα SPF: FAIL! Η IP 203.0.113.88 δεν είναι εξουσιοδοτημένη στις εγγραφές DNS.",
      },
    },
    {
      id: "task-3",
      title: {
        en: "Verify DKIM Signature Cryptographic Authenticity",
        el: "Επαλήθευση Κρυπτογραφικής Υπογραφής DKIM",
      },
      description: {
        en: "Verify the public key signature integrity of the message using `dkim-verify`.",
        el: "Επαληθεύστε την κρυπτογραφική υπογραφή του μηνύματος με το `dkim-verify`.",
      },
      hint: {
        en: "Execute: dkim-verify suspicious_email.eml",
        el: "Εκτελέστε: dkim-verify suspicious_email.eml",
      },
      solution: "dkim-verify suspicious_email.eml",
      validateRegex: "dkim-verify\\s+suspicious_email\\.eml",
      successMessage: {
        en: "DKIM Result: INVALID! Message signature is missing or has been forged.",
        el: "Αποτέλεσμα DKIM: INVALID! Η υπογραφή λείπει ή έχει παραποιηθεί.",
      },
    },
    {
      id: "task-4",
      title: {
        en: "De-obfuscate SafeLink Phishing URL",
        el: "Αποκωδικοποίηση Συσκοτισμένου Συνδέσμου Phishing (SafeLink)",
      },
      description: {
        en: "De-obfuscate the hidden credential harvester target URL using `urldecoder`.",
        el: "Αποκωδικοποιήστε την κρυφή διεύθυνση υποκλοπής διαπιστευτηρίων με το `urldecoder`.",
      },
      hint: {
        en: "Execute: urldecoder https://nam04.safelinks.protection.outlook.com/?url=http%3A%2F%2Fbad-actor-phish.ru%2Flogin%3Fid%3D4928",
        el: "Εκτελέστε: urldecoder https://nam04.safelinks.protection.outlook.com/?url=http%3A%2F%2Fbad-actor-phish.ru%2Flogin%3Fid%3D4928",
      },
      solution: "urldecoder https://nam04.safelinks.protection.outlook.com/?url=http%3A%2F%2Fbad-actor-phish.ru%2Flogin%3Fid%3D4928",
      validateRegex: "urldecoder.*bad-actor-phish",
      successMessage: {
        en: "URL Decoded! Real target: `http://bad-actor-phish.ru/login?id=4928` (Identified Credential Harvester).",
        el: "Το URL αποκωδικοποιήθηκε! Πραγματικός στόχος: `http://bad-actor-phish.ru/login?id=4928` (Σελίδα Υποκλοπής).",
      },
    },
  ],
};

export const ch05HandsOnLab: HandsOnLab = {
  title: {
    en: "Advanced Social Engineering Defense: Phishing Triage, Mail Gateway Hardening & Awareness Metrics",
    el: "Προηγμένη Άμυνα κατά της Κοινωνικής Μηχανικής: Διαλογή Phishing, Ενίσχυση Mail Gateway & Μετρικές Ευαισθητοποίησης",
  },
  subtitle: {
    en: "2-Hour Practical Lab: RFC 5322 Header Forensics, DMARC/SPF/DKIM Alignment, and BEC Attack Containment",
    el: "Εργαστήριο 2 Ωρών: Εγκληματολογία Επικεφαλίδων RFC 5322, Ευθυγράμμιση DMARC/SPF/DKIM και Αντιμετώπιση Επιθέσεων BEC",
  },
  duration: {
    en: "~2 Hours (120 minutes)",
    el: "~2 Ώρες (120 λεπτά)",
  },
  overview: {
    en: "This 2-hour technical laboratory guides students through the complete operational workflow of an enterprise anti-phishing operations center. You will investigate complex Business Email Compromise (BEC) and credential harvesting attacks, perform raw email header forensics, configure and enforce strict SPF, DKIM, and DMARC policies in DNS, configure Secure Email Gateway (SEG) content filters, and design actionable employee awareness metrics.",
    el: "Αυτό το εργαστήριο 2 ωρών καθοδηγεί τους φοιτητές στην πλήρη επιχειρησιακή ροή ενός κέντρου προστασίας από phishing. Θα διερευνήσετε σύνθετες επιθέσεις Business Email Compromise (BEC) και υποκλοπής διαπιστευτηρίων, θα αναλύσετε επικεφαλίδες RFC 5322, θα ρυθμίσετε αυστηρές πολιτικές SPF, DKIM και DMARC στο DNS, θα διαμορφώσετε φίλτρα Secure Email Gateway (SEG) και θα σχεδιάσετε μετρικές ευαισθητοποίησης προσωπικού.",
  },
  environment: [
    "Linux / macOS workstation with `dig`, `swaks`, Python 3.11, OpenDKIM tools",
    "Simulated Mail Transfer Agent (Postfix) & Dovecot IMAP sandbox",
    "DNS Server sandbox (BIND9 / CoreDNS) for SPF/DKIM/DMARC TXT record publishing",
    "Mail samples directory containing benign, spoofed, and weaponized `.eml` files",
  ],
  phases: [
    {
      phaseNumber: 1,
      title: {
        en: "Raw Email Header Forensics & Sender Authentication",
        el: "Εγκληματολογία Επικεφαλίδων Email & Αυθεντικοποίηση Αποστολέα",
      },
      estimatedTime: { en: "25 min", el: "25 λεπτά" },
      objectives: {
        en: [
          "Parse RFC 5322 and RFC 5321 headers (`From:`, `Reply-To:`, `Return-Path:`, `Received:` chains).",
          "Identify IP hop trajectories and GeoIP origin discrepancies.",
          "Examine homograph / lookalike domain impersonation (punycode attacks).",
        ],
        el: [
          "Ανάλυση επικεφαλίδων RFC 5322/5321 (`From:`, `Reply-To:`, `Return-Path:`, αλυσίδες `Received:`).",
          "Εντοπισμός διαδρομής αναμετάδοσης IP και γεωγραφικών αποκλίσεων GeoIP.",
          "Έλεγχος επιθέσεων ομογράφων και παραπλήσιων τομέων (lookalike domains / punycode).",
        ],
      },
      steps: {
        en: [
          "1. Inspect the incoming raw email file:\n```bash\ncat /var/mail/phish_sample_01.eml | head -n 35\n```",
          "2. Trace all `Received: from` hops from originating client to MX gateway.\n3. Identify mismatched `Return-Path` vs. header `From`.\n4. Extract embedded hyperlink URLs using Python parser:\n```bash\npython3 scripts/extract_urls.py /var/mail/phish_sample_01.eml\n```",
        ],
        el: [
          "1. Εξετάστε το αρχείο του εισερχόμενου μηνύματος:\n```bash\ncat /var/mail/phish_sample_01.eml | head -n 35\n```",
          "2. Ιχνηλατήστε τις αναμεταδόσεις `Received: from` από τον αρχικό πελάτη μέχρι την πύλη MX.\n3. Εντοπίστε την αναντιστοιχία μεταξύ `Return-Path` και επικεφαλίδας `From`.\n4. Εξάγετε τους συνδέσμους URL με σενάριο Python:\n```bash\npython3 scripts/extract_urls.py /var/mail/phish_sample_01.eml\n```",
        ],
      },
    },
    {
      phaseNumber: 2,
      title: {
        en: "DNS Authentication Deployment: SPF, DKIM & DMARC",
        el: "Ανάπτυξη Αυθεντικοποίησης DNS: SPF, DKIM & DMARC",
      },
      estimatedTime: { en: "45 min", el: "45 λεπτά" },
      objectives: {
        en: [
          "Draft and publish an enterprise SPF TXT record restricting authorized sending IPs.",
          "Generate 2048-bit RSA DKIM keypairs and configure selector records in DNS.",
          "Configure strict DMARC policy (`v=DMARC1; p=reject; pct=100; rua=mailto:dmarc-rua@corp.com`).",
        ],
        el: [
          "Σύνταξη και δημοσίευση εγγραφής SPF TXT που περιορίζει τις εξουσιοδοτημένες IPs αποστολής.",
          "Δημιουργία ζεύγους κλειδιών RSA 2048-bit DKIM και ρύθμιση εγγραφής selector στο DNS.",
          "Ρύθμιση αυστηρής πολιτικής DMARC (`v=DMARC1; p=reject; pct=100; rua=mailto:dmarc-rua@corp.com`).",
        ],
      },
      steps: {
        en: [
          "1. Publish SPF record in DNS zone file:\n```dns\n@   IN  TXT \"v=spf1 ip4:198.51.100.10 include:_spf.google.com -all\"\n```",
          "2. Generate OpenDKIM keys:\n```bash\nopendkim-genkey -s 2026mail -d corp.internal\n```",
          "3. Publish DKIM public key and DMARC enforcement policy record in DNS:\n```dns\n_dmarc  IN  TXT \"v=DMARC1; p=reject; sp=reject; aspf=s; adkim=s; rua=mailto:dmarc@corp.internal\"\n```",
          "4. Verify records using `dig`:\n```bash\ndig +short TXT _dmarc.corp.internal\n```",
        ],
        el: [
          "1. Δημοσίευση εγγραφής SPF στο αρχείο ζώνης DNS:\n```dns\n@   IN  TXT \"v=spf1 ip4:198.51.100.10 include:_spf.google.com -all\"\n```",
          "2. Παραγωγή κλειδιών OpenDKIM:\n```bash\nopendkim-genkey -s 2026mail -d corp.internal\n```",
          "3. Δημοσίευση δημόσιου κλειδιού DKIM και εγγραφής πολιτικής DMARC:\n```dns\n_dmarc  IN  TXT \"v=DMARC1; p=reject; sp=reject; aspf=s; adkim=s; rua=mailto:dmarc@corp.internal\"\n```",
          "4. Επαλήθευση εγγραφών με την εντολή `dig`:\n```bash\ndig +short TXT _dmarc.corp.internal\n```",
        ],
      },
    },
    {
      phaseNumber: 3,
      title: {
        en: "Secure Email Gateway (SEG) Content Filtering Rules",
        el: "Κανόνες Φιλτραρίσματος Περιεχομένου Secure Email Gateway (SEG)",
      },
      estimatedTime: { en: "30 min", el: "30 λεπτά" },
      objectives: {
        en: [
          "Configure inbound mail gateway rules to strip dangerous attachments (ISO, VHD, LNK, EXE, XLSM).",
          "Inject visual warning banners for external emails containing financial urgency keywords.",
          "Block outbound communication to newly registered lookalike domains.",
        ],
        el: [
          "Ρύθμιση κανόνων πύλης για αφαίρεση επικίνδυνων συνημμένων (ISO, VHD, LNK, EXE, XLSM).",
          "Εισαγωγή οπτικών προειδοποιητικών banners για εξωτερικά emails με λέξεις-κλειδιά οικονομικής επείγουσας ανάγκης.",
          "Αποκλεισμός εξερχόμενης επικοινωνίας προς πρόσφατα κατοχυρωμένους παραπλήσιους τομείς.",
        ],
      },
      steps: {
        en: [
          "1. Edit Postfix / Gateway header checks:\n```text\n/^From:.*(CEO|CFO|Payroll).*/ WARN [EXTERNAL-SPOOF-ALERT]\n```",
          "2. Test simulated attack message transmission using `swaks`:\n```bash\nswaks --to finance@corp.internal --from ceo@corp-fake.com --server 127.0.0.1\n```",
          "3. Verify that gateway logs report message rejection due to DMARC failure.",
        ],
        el: [
          "1. Επεξεργασία κανόνων ελέγχου επικεφαλίδων στο Postfix:\n```text\n/^From:.*(CEO|CFO|Payroll).*/ WARN [EXTERNAL-SPOOF-ALERT]\n```",
          "2. Δοκιμή αποστολής προσομοιωμένου μηνύματος με το εργαλείο `swaks`:\n```bash\nswaks --to finance@corp.internal --from ceo@corp-fake.com --server 127.0.0.1\n```",
          "3. Επιβεβαίωση ότι η πύλη απορρίπτει το μήνυμα λόγω αποτυχίας DMARC.",
        ],
      },
    },
    {
      phaseNumber: 4,
      title: {
        en: "Human Risk Metric Formulation & Security Awareness Design",
        el: "Διαμόρφωση Μετρικών Ανθρώπινου Κινδύνου & Σχεδιασμός Ευαισθητοποίησης",
      },
      estimatedTime: { en: "20 min", el: "20 λεπτά" },
      objectives: {
        en: [
          "Calculate Phish-Prone Percentage (PPP) and Repeat Clicker Rate across departments.",
          "Design a non-punitive, just-in-time training feedback loop for employees.",
          "Formulate an incident response checklist for compromised user credentials.",
        ],
        el: [
          "Υπολογισμός Ποσοστού Ευπάθειας σε Phishing (PPP) και Επαναλαμβανόμενων Κλικ ανά τμήμα.",
          "Σχεδιασμός μη τιμωρητικού κύκλου άμεσης εκπαίδευσης για τους εργαζομένους.",
          "Σύνταξη λίστας ελέγχου απόκρισης σε περιστατικά υποκλοπής διαπιστευτηρίων.",
        ],
      },
      steps: {
        en: [
          "1. Compute baseline PPP metrics from campaign simulation data.\n2. Formulate credential revocation runbook (MFA reset, active token invalidation, mailbox forwarding rule audit).\n3. Synthesize the final lab deliverable dossier.",
        ],
        el: [
          "1. Υπολογισμός βασικών μετρικών PPP από δεδομένα προσομοίωσης εκστρατείας.\n2. Σύνταξη οδηγού ανάκλησης διαπιστευτηρίων (επαναφορά MFA, ακύρωση tokens, έλεγχος κανόνων προώθησης).\n3. Σύνθεση του τελικού φακέλου παραδοτέων εργαστηρίου.",
        ],
      },
    },
  ],
  deliverables: {
    en: [
      "Email Header Forensic Breakdown Report (`email_forensics_analysis.pdf`)",
      "DNS Zone File containing SPF, DKIM, and DMARC TXT records (`dns_auth_records.txt`)",
      "Mail Gateway Hardening Filter Configuration (`gateway_rules.conf`)",
      "Enterprise Human Risk Management Framework (3–4 pages)",
    ],
    el: [
      "Αναφορά Εγκληματολογικής Ανάλυσης Επικεφαλίδων Email (`email_forensics_analysis.pdf`)",
      "Αρχείο Ζώνης DNS με εγγραφές SPF, DKIM και DMARC (`dns_auth_records.txt`)",
      "Ρυθμίσεις Φίλτρων Πύλης Ηλεκτρονικού Ταχυδρομείου (`gateway_rules.conf`)",
      "Πλαίσιο Διαχείρισης Ανθρώπινου Κινδύνου Επιχείρησης (3–4 σελίδες)",
    ],
  },
  verificationChecklist: {
    en: [
      "Header forensics accurately maps originating IP and identifies display-name spoofing.",
      "SPF record enforces strict `-all` hardfail policy.",
      "DKIM signatures validate successfully against published DNS public keys.",
      "DMARC policy is set to `p=reject` with reporting mailto URIs.",
      "Human risk metrics include clear remediation pathways for high-risk departments.",
    ],
    el: [
      "Η ανάλυση επικεφαλίδων εντοπίζει ορθά την αρχική IP και την πλαστογράφηση ονόματος.",
      "Η εγγραφή SPF επιβάλλει αυστηρή πολιτική `-all` (hardfail).",
      "Οι υπογραφές DKIM επικυρώνονται επιτυχώς έναντι των κλειδιών στο DNS.",
      "Η πολιτική DMARC είναι ρυθμισμένη σε `p=reject` με διευθύνσεις αναφορών.",
      "Οι μετρικές ανθρώπινου κινδύνου περιλαμβάνουν σαφή βήματα επανεκπαίδευσης.",
    ],
  },
};

export const ch05Project: TechnicalProject = {
  id: "ch05-arch",
  category: {
    en: "Enterprise Architecture & Assessment Blueprint",
    el: "Αρχιτεκτονική Επιχείρησης & Στρατηγικό Πλάνο",
  },
  title: {
    en: "Corporate Anti-Phishing Defense Architecture & Simulated Training Platform",
    el: "Εταιρική Αρχιτεκτονική Άμυνας Anti-Phishing & Πλατφόρμα Προσομοίωσης Εκπαίδευσης",
  },
  subtitle: {
    en: "Automated Phishing Triage Engine, DMARC Aggregate Analysis, and Gamified Awareness Platform",
    el: "Αυτοματοποιημένη Μηχανή Διαλογής Phishing, Ανάλυση Συγκεντρωτικών Αναφορών DMARC και Πλατφόρμα Ευαισθητοποίησης",
  },
  scenario: {
    en: "A multinational healthcare enterprise with 15,000 employees is suffering frequent Business Email Compromise (BEC) and patient data harvesting attempts. As Lead Cybersecurity Engineer, you are commissioned to engineer an end-to-end anti-phishing ecosystem: deploy automated abuse-mailbox triage scripts, parse DMARC XML aggregate reports, harden mail routing infrastructure, and build an ethical social engineering awareness simulation platform.",
    el: "Ένας πολυεθνικός όμιλος παροχής υπηρεσιών υγείας με 15.000 εργαζομένους δέχεται συχνές επιθέσεις Business Email Compromise (BEC) και απόπειρες υποκλοπής ιατρικών δεδομένων. Ως Επικεφαλής Μηχανικός Κυβερνοασφάλειας, σας ανατίθεται να σχεδιάσετε ένα ολοκληρωμένο οικοσύστημα προστασίας: αυτοματοποιημένη διαλογή ύποπτων μηνυμάτων, ανάλυση συγκεντρωτικών αναφορών DMARC XML, ενίσχυση υποδομών email και κατασκευή πλατφόρμας εκπαιδευτικών προσομοιώσεων.",
  },
  objectives: {
    en: [
      "Develop an automated Python email triage pipeline parsing inbound abuse mailbox submissions.",
      "Build a DMARC aggregate XML report parser visualizing SPF/DKIM authentication pass/fail trends.",
      "Implement automated URL sandboxing and brand impersonation detection.",
      "Formulate a complete Security Awareness and Human Risk reduction program.",
    ],
    el: [
      "Ανάπτυξη αυτοματοποιημένου αγωγού Python για διαλογή αναφερόμενων ύποπτων μηνυμάτων.",
      "Κατασκευή αναλυτή συγκεντρωτικών αναφορών DMARC XML με οπτικοποίηση τάσεων επιτυχίας/αποτυχίας.",
      "Υλοποίηση αυτοματοποιημένου ελέγχου συνδέσμων URL σε sandbox και εντοπισμού πλαστοπροσωπίας.",
      "Σύνταξη πλήρους προγράμματος Ευαισθητοποίησης Προσωπικού και μείωσης ανθρώπινου κινδύνου.",
    ],
  },
  scope: {
    en: [
      "Exchange Online / Office 365 and Google Workspace email integration.",
      "DMARC aggregate (RUA) and forensic (RUF) XML feed processing.",
      "Automated threat intelligence feeds (PhishTank, URLhaus, VirusTotal API).",
    ],
    el: [
      "Ενοποίηση με Exchange Online / Office 365 και Google Workspace.",
      "Επεξεργασία ροών DMARC συγκεντρωτικών (RUA) και εγκληματολογικών (RUF) αναφορών XML.",
      "Αυτοματοποιημένες ροές πληροφοριών απειλών (PhishTank, URLhaus, API VirusTotal).",
    ],
  },
  milestones: [
    {
      milestoneNumber: 1,
      title: {
        en: "Abuse Mailbox Ingestion & Header Parser Subsystem",
        el: "Υποσύστημα Συλλογής & Ανάλυσης Επικεφαλίδων Αναφερόμενων Emails",
      },
      description: {
        en: "Build `phish_triage.py` connecting via IMAP/Graph API to ingest reported `.eml` files, extract headers, and score threat levels.",
        el: "Ανάπτυξη του `phish_triage.py` για σύνδεση μέσω IMAP/API, ανάλυση αρχείων `.eml` και βαθμολόγηση επιπέδου απειλής.",
      },
      detailedSpec: {
        en: [
          "Design centralized identity directory schema supporting SCIM 2.0 automated provisioning and de-provisioning.",
          "Construct Role-Based and Attribute-Based Access Control (RBAC/ABAC) policy matrices for 50 organizational roles.",
          "Define automated joiner-mover-leaver (JML) identity lifecycle workflows."
],
        el: [
          "Σχεδιασμός καταλόγου ταυτοτήτων με SCIM 2.0 για αυτοματοποιημένο provisioning.",
          "Κατασκευή πινάκων RBAC/ABAC για 50 εταιρικούς ρόλους.",
          "Καθορισμός ροών διαχείρισης κύκλου ζωής εργαζομένων (JML)."
],
      },
      deliverable: {
        en: "Python parser script + JSON output schema.",
        el: "Σενάριο ανάλυσης Python + σχήμα εξόδου JSON.",
      },
    },
    {
      milestoneNumber: 2,
      title: {
        en: "DMARC XML Aggregate Analytics Dashboard",
        el: "Πίνακας Αναλυτικής Συγκεντρωτικών Αναφορών DMARC XML",
      },
      description: {
        en: "Develop `dmarc_analytics.py` parsing daily RUA zip/xml archives to identify unauthorized third-party senders abusing corporate domains.",
        el: "Ανάπτυξη του `dmarc_analytics.py` για επεξεργασία αναφορών RUA και εντοπισμό μη εξουσιοδοτημένων αποστολέων.",
      },
      detailedSpec: {
        en: [
          "Architect SAML 2.0 and OpenID Connect (OIDC) federation with modern SaaS and internal portals.",
          "Enforce mandatory hardware-bound FIDO2 / WebAuthn Multi-Factor Authentication for all corporate accounts.",
          "Implement conditional access policies restricting logins based on device health, IP reputation, and geolocation."
],
        el: [
          "Αρχιτεκτονική ομοσπονδίας SAML 2.0 και OIDC με SaaS και εσωτερικές εφαρμογές.",
          "Επιβολή ελέγχου ταυτότητας δύο παραγόντων με FIDO2 / WebAuthn.",
          "Υλοποίηση πολιτικών conditional access βάσει συσκευής, IP και τοποθεσίας."
],
      },
      deliverable: {
        en: "DMARC parser + visual charting dashboard.",
        el: "Αναλυτής DMARC + πίνακας γραφημάτων.",
      },
    },
    {
      milestoneNumber: 3,
      title: {
        en: "Automated URL & Attachment Sandboxing Engine",
        el: "Μηχανή Αυτοματοποιημένου Ελέγχου URLs & Συνημμένων σε Sandbox",
      },
      description: {
        en: "Integrate headless browser crawler (Playwright/Puppeteer) taking screenshots of landing pages and analyzing DOM elements for password input harvesting.",
        el: "Ενσωμάτωση crawler περιηγητή για λήψη στιγμιοτύπων σελίδων και ανάλυση φορμών υποκλοπής κωδικών.",
      },
      detailedSpec: {
        en: [
          "Architect enterprise Privileged Access Management (PAM) vault for domain admin and root credentials.",
          "Implement Just-In-Time (JIT) ephemeral credential checkout with dual-authorization approval workflows.",
          "Enforce complete session keystroke recording and automated privileged credential rotation every 24 hours."
],
        el: [
          "Αρχιτεκτονική PAM vault για διαχείριση λογαριασμών root και domain admin.",
          "Υλοποίηση Just-In-Time (JIT) προσωρινών διαπιστευτηρίων με διπλή έγκριση.",
          "Καταγραφή συνεδριών και αυτόματη εναλλαγή προνομιακών κωδικών κάθε 24 ώρες."
],
      },
      deliverable: {
        en: "URL analysis module + screenshot harvester.",
        el: "Υπομονάδα ανάλυσης URL + συλλέκτης στιγμιοτύπων.",
      },
    },
    {
      milestoneNumber: 4,
      title: {
        en: "Enterprise Awareness Campaign & Incident Runbook",
        el: "Εκστρατεία Ευαισθητοποίησης Επιχείρησης & Οδηγός Περιστατικών",
      },
      description: {
        en: "Formulate a simulated training curriculum, KPI dashboard (Click Rate, Report Rate), and a comprehensive SOC BEC Incident Response Runbook.",
        el: "Σύνταξη εκπαιδευτικού προγράμματος, πίνακα δεικτών KPI και πλήρους οδηγού απόκρισης σε περιστατικά BEC για το SOC.",
      },
      detailedSpec: {
        en: [
          "Design Continuous Adaptive Risk and Trust Assessment (CARTA) engine monitoring live user session risk.",
          "Define automated step-up authentication triggers and session termination on anomaly detection.",
          "Construct identity governance audit report demonstrating compliance with SOX 404 and ISO 27001 Annex A.9."
],
        el: [
          "Σχεδιασμός μηχανής CARTA για συνεχή παρακολούθηση κινδύνου συνεδρίας χρήστη.",
          "Ορισμός κανόνων step-up authentication και άμεσου τερματισμού συνεδρίας σε ανωμαλίες.",
          "Σύνταξη έκθεσης συμμόρφωσης ελέγχου ταυτοτήτων κατά SOX 404 και ISO 27001."
],
      },
      deliverable: {
        en: "Comprehensive awareness strategy + SOC incident response runbook.",
        el: "Στρατηγική ευαισθητοποίησης + οδηγός απόκρισης περιστατικών SOC.",
      },
    },
  ],
  deliverables: {
    en: [
      "Complete Python Pipeline Codebase (`/phish_defense/`)",
      "DMARC Analytics Web Dashboard (HTML/JS/Python)",
      "Automated URL Sandbox Crawler Module",
      "Executive Anti-Phishing & Human Risk Strategy Report (10–12 pages)",
    ],
    el: [
      "Πλήρης Πηγαίος Κώδικας Συστήματος (`/phish_defense/`)",
      "Διαδικτυακός Πίνακας Αναλυτικής DMARC (HTML/JS/Python)",
      "Υπομονάδα Crawler Ανάλυσης URLs σε Sandbox",
      "Επιτελική Έκθεση Στρατηγικής Anti-Phishing & Ανθρώπινου Κινδύνου (10–12 σελίδες)",
    ],
  },
  rubric: [
    {
      criterion: {
        en: "Email Header Parsing & Scoring Accuracy",
        el: "Ακρίβεια Ανάλυσης Επικεφαλίδων & Βαθμολόγησης Απειλής",
      },
      weight: "25%",
      description: {
        en: "Precision of RFC 5322 parsing, extraction of intermediate hops, and scoring heuristic effectiveness.",
        el: "Ακρίβεια ανάλυσης RFC 5322, εξαγωγή ενδιάμεσων κόμβων και αποτελεσματικότητα ευρετικής βαθμολόγησης.",
      },
    },
    {
      criterion: {
        en: "DMARC/SPF/DKIM Compliance Architecture",
        el: "Αρχιτεκτονική Συμμόρφωσης DMARC/SPF/DKIM",
      },
      weight: "25%",
      description: {
        en: "Correctness of DNS record generation, XML report ingestion, and spoofing mitigation rigor.",
        el: "Ορθότητα παραγωγής εγγραφών DNS, ανάλυσης αναφορών XML και αυστηρότητα αποτροπής πλαστογράφησης.",
      },
    },
    {
      criterion: {
        en: "URL Sandboxing & Automation Reliability",
        el: "Αξιοπιστία Ελέγχου URLs & Αυτοματοποίησης",
      },
      weight: "25%",
      description: {
        en: "Robustness of headless browser automation, evasion handling, and brand impersonation detection.",
        el: "Ανθεκτικότητα αυτοματισμού περιηγητή, διαχείριση τεχνικών αποφυγής και εντοπισμός πλαστοπροσωπίας brand.",
      },
    },
    {
      criterion: {
        en: "Human Risk Strategy & Operational Runbooks",
        el: "Στρατηγική Ανθρώπινου Κινδύνου & Επιχειρησιακοί Οδηγοί",
      },
      weight: "25%",
      description: {
        en: "Quality of awareness metrics, adult learning pedagogy, and actionable SOC incident response workflows.",
        el: "Ποιότητα μετρικών ευαισθητοποίησης, παιδαγωγική προσέγγιση και εφαρμόσιμες ροές απόκρισης για το SOC.",
      },
    },
  ],
};

export const ch05Quiz: QuizQuestion[] = [
  {
    id: 1,
    question: {
      en: "In modern Multi-Factor Authentication (MFA), which three distinct authentication categories must be combined?",
      el: "Στη σύγχρονη Ταυτοποίηση Πολλαπλών Παραγόντων (MFA), ποιες τρεις διακριτές κατηγορίες παραγόντων συνδυάζονται;",
    },
    options: {
      en: [
        "Something you know (password), something you have (hardware token), and something you are (biometrics).",
        "Something you write (signature), something you transmit (IP address), and something you read (QR code).",
        "Something you compute (hash), something you store (cookie), and something you send (email address), to ensure high-availability operational compliance across systems.",
        "Something you install (software), something you configure (firewall), and something you patch (kernel).",
        "Something you encrypt (AES key), something you sign (RSA cert), and something you hash (SHA-256 digest).",
      ],
      el: [
        "Κάτι που γνωρίζεις (κωδικός), κάτι που κατέχεις (token υλικού) και κάτι που είσαι (βιομετρικά στοιχεία).",
        "Κάτι που γράφεις (υπογραφή), κάτι που εκπέμπεις (διεύθυνση IP) και κάτι που διαβάζεις (κωδικός QR).",
        "Κάτι που υπολογίζεις (hash), κάτι που αποθηκεύεις (cookie) και κάτι που στέλνεις (διεύθυνση email), για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Κάτι που εγκαθιστάς (λογισμικό), κάτι που ρυθμίζεις (firewall) και κάτι που αναβαθμίζεις (πυρήνας).",
        "Κάτι που κρυπτογραφείς (κλειδί AES), κάτι που υπογράφεις (πιστοποιητικό) και κάτι που κατακερματίζεις.",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "True MFA requires combining factors from at least two different categories: Knowledge (something you know), Possession (something you have), or Inherence (something you are).",
      el: "Η πραγματική MFA απαιτεί συνδυασμό παραγόντων από τουλάχιστον δύο διαφορετικές κατηγορίες: Γνώση (τι ξέρεις), Κατοχή (τι έχεις), ή Εγγενές στοιχείο (τι είσαι).",
    },
  },
  {
    id: 2,
    question: {
      en: "What is the fundamental functional distinction between OAuth 2.0 and OpenID Connect (OIDC)?",
      el: "Ποια είναι η θεμελιώδης λειτουργική διαφορά μεταξύ του OAuth 2.0 και του OpenID Connect (OIDC);",
    },
    options: {
      en: [
        "OAuth 2.0 is designed for user identity verification, while OIDC is designed solely for hardware encryption, during standard continuous monitoring and administrative audits.",
        "OAuth 2.0 is an authorization framework (access delegation), while OIDC adds an identity layer for authentication.",
        "OAuth 2.0 operates exclusively over unencrypted UDP, while OIDC requires encrypted TCP socket connections, using standardized organizational security policy configurations.",
        "OAuth 2.0 replaces asymmetric public keys with symmetric passwords, while OIDC eliminates access tokens, across distributed multi-region cloud production environments.",
        "OAuth 2.0 is strictly restricted to mobile clients, while OIDC is strictly restricted to server backends, without requiring manual intervention from systems engineering staff.",
      ],
      el: [
        "Το OAuth 2.0 σχεδιάστηκε για ταυτοποίηση χρήστη, ενώ το OIDC σχεδιάστηκε αποκλειστικά για κρυπτογράφηση υλικού, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Το OAuth 2.0 είναι πλαίσιο εξουσιοδότησης (εκχώρηση πρόσβασης), ενώ το OIDC προσθέτει επίπεδο ταυτότητας (ταυτοποίηση).",
        "Το OAuth 2.0 λειτουργεί αποκλειστικά μέσω UDP, ενώ το OIDC απαιτεί κρυπτογραφημένες συνδέσεις TCP, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Το OAuth 2.0 αντικαθιστά ασύμμετρα κλειδιά με κωδικούς, ενώ το OIDC καταργεί τα διακριτικά πρόσβασης (tokens), σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Το OAuth 2.0 αφορά μόνο κινητές συσκευές, ενώ το OIDC αφορά μόνο εξυπηρετητές παρασκηνίου (backends), χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "OAuth 2.0 grants authorization (Access Token for APIs), whereas OpenID Connect (OIDC) builds on top of OAuth 2.0 to provide user authentication and identity claims (ID Token in JWT format).",
      el: "Το OAuth 2.0 αφορά την εξουσιοδότηση (Access Tokens για APIs), ενώ το OIDC χτίζεται πάνω του παρέχοντας ταυτοποίηση χρήστη και στοιχεία ταυτότητας (ID Tokens σε μορφή JWT).",
    },
  },
  {
    id: 3,
    question: {
      en: "Why is the PKCE (Proof Key for Code Exchange) extension essential when using OAuth 2.0 Authorization Code flow in single-page apps (SPAs)?",
      el: "Γιατί η επέκταση PKCE είναι απαραίτητη κατά τη χρήση του OAuth 2.0 Authorization Code flow σε Single-Page Apps (SPAs);",
    },
    options: {
      en: [
        "It eliminates the need for transport layer security (TLS) encryption during token exchange operations, to ensure high-availability operational compliance across systems.",
        "It replaces JSON Web Tokens with encrypted XML SAML 2.0 assertions for mobile application devices, across distributed multi-region cloud production environments.",
        "It protects public clients from authorization code interception attacks without requiring a client secret.",
        "It prevents database administrators from viewing user hashed passwords stored in central repositories, without requiring manual intervention from systems engineering staff.",
        "It forces client web browsers to execute all JavaScript inside an isolated kernel memory segment, to mitigate potential unauthorized system configuration drift.",
      ],
      el: [
        "Εξαλείφει την ανάγκη χρήσης κρυπτογράφησης TLS κατά την ανταλλαγή διακριτικών πρόσβασης (tokens), για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Αντικαθιστά τα JWTs με κρυπτογραφημένες βεβαιώσεις XML SAML 2.0 για εφαρμογές κινητών τηλεφώνων, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Προστατεύει δημόσιους πελάτες από υποκλοπή authorization code χωρίς να απαιτείται μυστικό (client secret).",
        "Αποτρέπει τους διαχειριστές βάσεων από το να δουν τους κατακερματισμένους κωδικούς των χρηστών, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Αναγκάζει τον περιηγητή να εκτελεί τη JavaScript σε απομονωμένο τμήμα μνήμης του πυρήνα, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "Public clients (SPAs, mobile apps) cannot securely store client secrets. PKCE dynamically generates a code_verifier and code_challenge, preventing attackers from intercepting and redeeming the authorization code.",
      el: "Οι δημόσιοι πελάτες (SPAs) δεν μπορούν να κρύψουν client secrets. Το PKCE παράγει δυναμικά code_verifier και challenge, αποτρέποντας την εξαργύρωση υποκλαπέντων κωδικών εξουσιοδότησης.",
    },
  },
  {
    id: 4,
    question: {
      en: "How does Attribute-Based Access Control (ABAC) provide greater flexibility compared to standard Role-Based Access Control (RBAC)?",
      el: "Πώς παρέχει ο Έλεγχος Πρόσβασης Βάσει Ιδιοτήτων (ABAC) μεγαλύτερη ευελιξία σε σύγκριση με τον Έλεγχο Βάσει Ρόλων (RBAC);",
    },
    options: {
      en: [
        "ABAC assigns static permissions strictly to predefined job titles without considering runtime context variables.",
        "ABAC completely removes the necessity for user authentication by relying on anonymous cryptographic hashes, without requiring manual intervention from systems engineering staff.",
        "ABAC requires all access control evaluation engines to run directly inside physical hardware security modules, to mitigate potential unauthorized system configuration drift.",
        "ABAC makes access decisions dynamically using subject, resource, action, and contextual environment attributes.",
        "ABAC allows any user to grant administrative superuser permissions to any arbitrary network node, in accordance with modern zero trust architectural principles.",
      ],
      el: [
        "Το ABAC αποδίδει στατικά δικαιώματα αυστηρά σε προκαθορισμένους ρόλους χωρίς να εξετάζει το πλαίσιο.",
        "Το ABAC καταργεί πλήρως την ανάγκη ταυτοποίησης χρηστών βασιζόμενο σε ανώνυμα κρυπτογραφικά hashes, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Το ABAC απαιτεί όλες οι μηχανές αξιολόγησης να εκτελούνται απευθείας σε μονάδες ασφαλείας υλικού (HSM), για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Το ABAC λαμβάνει αποφάσεις πρόσβασης δυναμικά βάσει ιδιοτήτων χρήστη, πόρου, ενέργειας και περιβάλλοντος.",
        "Το ABAC επιτρέπει σε οποιονδήποτε χρήστη να αποδίδει δικαιώματα διαχειριστή σε τυχαίους κόμβους, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
      ],
    },
    correctIndex: 3,
    explanation: {
      en: "ABAC evaluates fine-grained policies based on attributes of the user (e.g. department, clearance), resource (e.g. sensitivity), action (e.g. read), and context (e.g. time, IP, device posture).",
      el: "Το ABAC αξιολογεί δυναμικές πολιτικές βάσει ιδιοτήτων του χρήστη, του πόρου, της ενέργειας και του περιβάλλοντος (π.χ. ώρα, τοποθεσία, κατάσταση ασφάλειας συσκευής).",
    },
  },
  {
    id: 5,
    question: {
      en: "Why is Argon2id currently recommended over standard SHA-256 for password hashing and storage?",
      el: "Γιατί το Argon2id συνιστάται σήμερα έναντι του κλασικού SHA-256 για την αποθήκευση και κατακερματισμό κωδικών πρόσβασης;",
    },
    options: {
      en: [
        "Argon2id produces variable-length binary output streams that bypass relational database schema restrictions.",
        "Argon2id operates as an asymmetric public-key cryptosystem, eliminating the need for salt parameters, to mitigate potential unauthorized system configuration drift.",
        "Argon2id automatically transmits compromised user password alerts to international law enforcement agencies.",
        "Argon2id encrypts passwords using ephemeral quantum key distribution channels across enterprise LANs, before committing changes to central production repository nodes.",
        "Argon2id is a memory-hard algorithm designed to resist high-speed GPU and ASIC offline brute-force cracking.",
      ],
      el: [
        "Το Argon2id παράγει έξοδο μεταβλητού μήκους που παρακάμπτει τους περιορισμούς σχημάτων βάσεων δεδομένων.",
        "Το Argon2id λειτουργεί ως ασύμμετρο κρυπτοσύστημα δημόσιου κλειδιού, καταργώντας την ανάγκη για salt, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Το Argon2id στέλνει αυτόματα ειδοποιήσεις παραβιασμένων κωδικών σε διεθνείς διωκτικές αρχές.",
        "Το Argon2id κρυπτογραφεί κωδικούς με εφήμερα κανάλια κβαντικής διανομής κλειδιών σε τοπικά δίκτυα, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Το Argon2id είναι αλγόριθμος υψηλής απαίτησης μνήμης (memory-hard), ανθεκτικός σε επιθέσεις GPUs και ASICs.",
      ],
    },
    correctIndex: 4,
    explanation: {
      en: "Standard hashes like SHA-256 are fast, allowing attackers to compute billions of guesses per second on GPUs. Argon2id requires significant RAM and CPU time, rendering hardware-accelerated cracking infeasible.",
      el: "Οι κλασικές συναρτήσεις όπως η SHA-256 είναι γρήγορες, επιτρέποντας δισεκατομμύρια δοκιμές το δευτερόλεπτο σε GPUs. Το Argon2id απαιτεί σημαντική μνήμη RAM, εξουδετερώνοντας επιθέσεις με κάρτες γραφικών.",
    },
  },
  {
    id: 6,
    question: {
      en: "In a Kerberos authentication infrastructure, what is the critical impact of a 'Golden Ticket' attack?",
      el: "Σε μια υποδομή ταυτοποίησης Kerberos, ποιος είναι ο κρίσιμος αντίκτυπος μιας επίθεσης 'Golden Ticket';",
    },
    options: {
      en: [
        "The attacker uses the compromised KRBTGT account key to forge arbitrary Ticket Granting Tickets (TGTs) with unrestricted domain access.",
        "The attacker steals user browser cookies to bypass transport layer security certificate warnings, without requiring manual intervention from systems engineering staff.",
        "The attacker exhausts local Active Directory server memory through recursive DNS amplification floods, in accordance with modern zero trust architectural principles.",
        "The attacker modifies client workstation registry keys to disable local BitLocker disk encryption, before committing changes to central production repository nodes.",
        "The attacker converts unencrypted LDAP search queries into signed SAML 2.0 metadata documents, under standard operating procedures defined in corporate ISMS policies.",
      ],
      el: [
        "Ο επιτιθέμενος χρησιμοποιεί το κλειδί του λογαριασμού KRBTGT για να πλαστογραφεί TGTs με πλήρη πρόσβαση σε όλο το domain.",
        "Ο επιτιθέμενος κλέβει cookies περιηγητή για να παρακάμψει προειδοποιήσεις πιστοποιητικών TLS, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Ο επιτιθέμενος εξαντλεί τη μνήμη των διακομιστών Active Directory μέσω επιθέσεων ενίσχυσης DNS, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Ο επιτιθέμενος αλλάζει κλειδιά μητρώου των υπολογιστών για να απενεργοποιήσει την κρυπτογράφηση δίσκων, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Ο επιτιθέμενος μετατρέπει μη κρυπτογραφημένα ερωτήματα LDAP σε υπογεγραμμένα έγγραφα SAML 2.0, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "A Golden Ticket attack uses the hash of the Kerberos Key Distribution Center service account (KRBTGT) to forge valid TGTs for any user, granting persistent administrative access across the entire Active Directory domain.",
      el: "Η επίθεση Golden Ticket χρησιμοποιεί το κλειδί του λογαριασμού KRBTGT για την πλαστογράφηση έγκυρων TGTs για οποιονδήποτε χρήστη, αποκτώντας πλήρη και διαρκή έλεγχο σε ολόκληρο το Active Directory domain.",
    },
  },
  {
    id: 7,
    question: {
      en: "What primary defense mechanism prevents automated 'Credential Stuffing' attacks against web authentication portals?",
      el: "Ποιος βασικός αμυντικός μηχανισμός αποτρέπει αυτοματοποιημένες επιθέσεις 'Credential Stuffing' σε πύλες εισόδου ιστού;",
    },
    options: {
      en: [
        "Compiling frontend web JavaScript into proprietary static C++ assembly executables before deployment, in accordance with modern zero trust architectural principles.",
        "Rate limiting, risk-based adaptive MFA, CAPTCHA challenges, and monitoring for breached credential databases.",
        "Disabling TLS session resumption tickets on all external reverse proxy load balancers, before committing changes to central production repository nodes.",
        "Forcing all remote users to establish PPTP virtual private network tunnels prior to web browsing, under standard operating procedures defined in corporate ISMS policies.",
        "Converting relational database tables into non-indexed flat text files stored in local directories, across all internal enterprise network segments and endpoints.",
      ],
      el: [
        "Μεταγλώττιση του κώδικα JavaScript σε ιδιόκτητα εκτελέσιμα C++ πριν από τη διάθεση στην παραγωγή, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Περιορισμός ρυθμού (rate limiting), προσαρμοστική MFA βάσει κινδύνου, CAPTCHAs και έλεγχος διαρροών.",
        "Απενεργοποίηση των διακριτικών επαναφοράς συνόδου TLS στους εξωτερικούς εξισορροπητές φορτίου, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Επιβολή σύνδεσης όλων των χρηστών μέσω τούνελ PPTP VPN πριν από την πλοήγηση στον ιστό, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Μετατροπή των πινάκων βάσεων δεδομένων σε απλά αρχεία κειμένου αποθηκευμένα σε τοπικούς φακέλους, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Credential stuffing exploits leaked username/password pairs. Effective defenses include adaptive MFA, IP/user rate limiting, CAPTCHAs, bot detection, and checking inputs against known compromised password lists.",
      el: "Το credential stuffing εκμεταλλεύεται διαρροές κωδικών. Αντιμετωπίζεται με προσαρμοστική MFA, περιορισμό ρυθμού (rate limiting), CAPTCHA, ανίχνευση bots και έλεγχο σε βάσεις διαρροών (HaveIBeenPwned).",
    },
  },
  {
    id: 8,
    question: {
      en: "What security vulnerability arises in SAML 2.0 Single Sign-On (SSO) implementations known as 'XML Signature Wrapping' (XSW)?",
      el: "Ποια ευπάθεια ασφάλειας προκύπτει σε υλοποιήσεις SAML 2.0 SSO γνωστή ως 'XML Signature Wrapping' (XSW);",
    },
    options: {
      en: [
        "Attackers decrypt TLS private keys using quantum Shor algorithm factorizations across network cables, before committing changes to central production repository nodes.",
        "Attackers flood identity providers with malformed DNS request queries to exhaust available server memory, under standard operating procedures defined in corporate ISMS policies.",
        "Attackers forge or reposition signed XML elements so the validator verifies the signature while the application processes forged claims.",
        "Attackers modify relational database schemas to disable foreign key integrity constraints entirely, across all internal enterprise network segments and endpoints.",
        "Attackers convert SAML identity tokens into unauthenticated cleartext HTTP basic authentication headers, during standard continuous monitoring and administrative audits.",
      ],
      el: [
        "Οι επιτιθέμενοι αποκρυπτογραφούν ιδιωτικά κλειδιά TLS με κβαντικούς αλγορίθμους παραγοντοποίησης, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Οι επιτιθέμενοι κατακλύζουν τους παρόχους ταυτότητας με ερωτήματα DNS για να εξαντλήσουν τη μνήμη, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Οι επιτιθέμενοι αναδιατάσσουν υπογεγραμμένα στοιχεία XML ώστε η υπογραφή να επαληθεύεται ενώ η εφαρμογή διαβάζει πλαστά δεδομένα.",
        "Οι επιτιθέμενοι αλλάζουν τα σχήματα βάσεων δεδομένων απενεργοποιώντας τους περιορισμούς ξένων κλειδιών, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Οι επιτιθέμενοι μετατρέπουν τα SAML tokens σε μη ασφαλείς κεφαλίδες HTTP basic authentication, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "In XSW attacks, attackers inject a forged assertion while moving the legitimately signed assertion elsewhere in the XML structure, tricking the service provider into trusting unauthorized identities.",
      el: "Στις επιθέσεις XSW, ο επιτιθέμενος εισάγει μια πλαστή βεβαίωση μετακινώντας την έγκυρη υπογεγραμμένη βεβαίωση σε άλλο σημείο του XML, ξεγελώντας την εφαρμογή ώστε να αποδεχτεί πλαστά δικαιώματα.",
    },
  },
  {
    id: 9,
    question: {
      en: "What is the core principle of Just-in-Time (JIT) Privileged Access Management (PAM)?",
      el: "Ποια είναι η βασική αρχή της Διαχείρισης Προνομιακής Πρόσβασης Just-in-Time (JIT PAM);",
    },
    options: {
      en: [
        "Permanently assigning local administrative root access to all software development engineering staff, before committing changes to central production repository nodes.",
        "Storing administrative root passwords in unencrypted plain text configuration files on git servers, across all internal enterprise network segments and endpoints.",
        "Disabling all session logging and audit recording during emergency scheduled maintenance windows, during standard continuous monitoring and administrative audits.",
        "Granting elevated permissions temporarily only when needed for a specific task and automatically revoking them.",
        "Routing all administrative SSH connections through unauthenticated public dynamic proxy servers, to ensure high-availability operational compliance across systems.",
      ],
      el: [
        "Μόνιμη απόδοση δικαιωμάτων διαχειριστή root σε όλο το προσωπικό ανάπτυξης λογισμικού, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Αποθήκευση κωδικών διαχειριστή σε μη κρυπτογραφημένα αρχεία ρυθμίσεων σε διακομιστές git, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Απενεργοποίηση καταγραφής συνόδων και ελέγχου κατά τη διάρκεια προγραμματισμένης συντήρησης, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Προσωρινή παραχώρηση αναβαθμισμένων δικαιωμάτων μόνο όταν απαιτείται για συγκεκριμένη εργασία και αυτόματη ανάκληση.",
        "Δρομολόγηση συνδέσεων διαχείρισης SSH μέσω μη ταυτοποιημένων δημόσιων διακομιστών proxy, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
      ],
    },
    correctIndex: 3,
    explanation: {
      en: "JIT PAM eliminates standing privileges by providing temporary, ephemeral elevation with multi-factor approval and automatic expiration, minimizing the attack surface for credential theft.",
      el: "Το JIT PAM εξαλείφει τα μόνιμα δικαιώματα παραχωρώντας προσωρινή πρόσβαση με έγκριση και αυτόματη λήξη, ελαχιστοποιώντας την επιφάνεια επίθεσης για υποκλοπή διαπιστευτηρίων.",
    },
  },
  {
    id: 10,
    question: {
      en: "How does Session Hijacking typically occur against web applications utilizing session identifiers?",
      el: "Πώς πραγματοποιείται συνήθως η Υποκλοπή Συνόδου (Session Hijacking) σε διαδικτυακές εφαρμογές που χρησιμοποιούν session cookies;",
    },
    options: {
      en: [
        "An attacker executes offline brute-force attacks against the database server hardware security module, across all internal enterprise network segments and endpoints.",
        "An attacker modifies DNS records to redirect network traffic to an unencrypted public NTP server, during standard continuous monitoring and administrative audits.",
        "An attacker converts relational database tables into non-relational document collections in real time, to ensure high-availability operational compliance across systems.",
        "An attacker reboots the client workstation into an unprivileged recovery kernel environment, using standardized organizational security policy configurations.",
        "An attacker captures or predicts a valid session token (via XSS, sniffing, or fixation) to impersonate the victim.",
      ],
      el: [
        "Ο επιτιθέμενος εκτελεί επιθέσεις εξαντλητικής αναζήτησης στη μονάδα ασφαλείας υλικού (HSM) της βάσης, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Ο επιτιθέμενος αλλάζει εγγραφές DNS για ανακατεύθυνση της κίνησης σε μη ασφαλείς διακομιστές NTP, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Ο επιτιθέμενος μετατρέπει σχεσιακούς πίνακες σε μη σχεσιακά έγγραφα δεδομένων σε πραγματικό χρόνο, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Ο επιτιθέμενος επανεκκινεί τον υπολογιστή του χρήστη σε περιβάλλον ανάκτησης χωρίς προνόμια, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Ο επιτιθέμενος υποκλέπτει ή προβλέπει ένα έγκυρο session token (μέσω XSS, sniffing ή fixation) για να υποδυθεί το θύμα.",
      ],
    },
    correctIndex: 4,
    explanation: {
      en: "Session hijacking happens when an attacker acquires a victim's session identifier (through XSS, network eavesdropping on non-HTTPS, or predictable session IDs) to bypass authentication.",
      el: "Η υποκλοπή συνόδου συμβαίνει όταν ο επιτιθέμενος αποκτά το session ID του θύματος (μέσω XSS, υποκλοπής κίνησης ή προβλέψιμων tokens) για να αποκτήσει πρόσβαση ως ο νόμιμος χρήστης.",
    },
  },
];

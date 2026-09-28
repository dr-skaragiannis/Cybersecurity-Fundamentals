import type { CliLab, HandsOnLab, TechnicalProject, QuizQuestion } from "../types";

export const ch07CliLab: CliLab = {
  id: "ch07-cli",
  title: {
    en: "OpenSSL Cryptography, Key Generation & PKI Sandbox",
    el: "Προσομοιωτής Κρυπτογραφίας OpenSSL, Παραγωγής Κλειδιών & PKI",
  },
  scenario: {
    en: "Generate an asymmetric RSA 4096-bit keypair, extract the public key, formulate a Certificate Signing Request (CSR), and inspect X.509 digital certificate attributes with OpenSSL.",
    el: "Δημιουργήστε ζεύγος κλειδιών RSA 4096-bit, εξάγετε το δημόσιο κλειδί, δημιουργήστε αίτημα υπογραφής πιστοποιητικού (CSR) και εξετάστε πιστοποιητικά X.509 με το OpenSSL.",
  },
  initialPrompt: "analyst@crypto-lab:~$",
  banner: {
    en: "=== Chapter 7 Cryptography & PKI Sandbox ===\nOpenSSL 3.2.1 FIPS Module Active | Role: PKI Cryptographic Officer\nType 'help' for command assistance or follow the missions below.",
    el: "=== Εργαστήριο Κρυπτογραφίας & PKI Κεφαλαίου 7 ===\nOpenSSL 3.2.1 FIPS Ενεργό | Ρόλος: Υπεύθυνος Κρυπτογραφίας PKI\nΠληκτρολογήστε 'help' για βοήθεια ή ακολουθήστε τις παρακάτω αποστολές.",
  },
  fileSystem: {
    "openssl.cnf": "[ req ]\ndefault_bits = 4096\ndefault_md = sha256\nprompt = no\ndistinguished_name = req_distinguished_name",
    "cert.crt": "-----BEGIN CERTIFICATE-----\nMIIFdzCCA1+gAwIBAgIUZ8j0kX9l5P1vWqQ...\n-----END CERTIFICATE-----",
  },
  tasks: [
    {
      id: "task-1",
      title: {
        en: "Generate 4096-bit RSA Private Key",
        el: "Παραγωγή Ιδιωτικού Κλειδιού RSA 4096-bit",
      },
      description: {
        en: "Generate an enterprise-grade 4096-bit RSA private key and save it to `private.key` using `openssl genrsa`.",
        el: "Δημιουργήστε ένα ιδιωτικό κλειδί RSA 4096-bit και αποθηκεύστε το στο `private.key` με το `openssl genrsa`.",
      },
      hint: {
        en: "Execute: openssl genrsa -out private.key 4096",
        el: "Εκτελέστε: openssl genrsa -out private.key 4096",
      },
      solution: "openssl genrsa -out private.key 4096",
      validateRegex: "openssl\\s+genrsa.*4096",
      successMessage: {
        en: "RSA 4096-bit private key generated successfully with prime modulus e=65537.",
        el: "Το ιδιωτικό κλειδί RSA 4096-bit δημιουργήθηκε επιτυχώς με εκθέτη e=65537.",
      },
    },
    {
      id: "task-2",
      title: {
        en: "Extract RSA Public Key from Private Key",
        el: "Εξαγωγή Δημόσιου Κλειδιού RSA από το Ιδιωτικό Κλειδί",
      },
      description: {
        en: "Extract the matching public key component from `private.key` and export it to `public.key`.",
        el: "Εξάγετε το αντίστοιχο δημόσιο κλειδί από το `private.key` στο αρχείο `public.key`.",
      },
      hint: {
        en: "Execute: openssl rsa -in private.key -pubout -out public.key",
        el: "Εκτελέστε: openssl rsa -in private.key -pubout -out public.key",
      },
      solution: "openssl rsa -in private.key -pubout -out public.key",
      validateRegex: "openssl\\s+rsa.*-pubout",
      successMessage: {
        en: "Public key successfully extracted and formatted in PEM format.",
        el: "Το δημόσιο κλειδί εξήχθη επιτυχώς σε μορφή PEM.",
      },
    },
    {
      id: "task-3",
      title: {
        en: "Create Certificate Signing Request (CSR)",
        el: "Δημιουργία Αιτήματος Υπογραφής Πιστοποιητικού (CSR)",
      },
      description: {
        en: "Generate a SHA-256 Certificate Signing Request `req.csr` for Common Name `api.secure-gateway.corp`.",
        el: "Δημιουργήστε ένα αίτημα υπογραφής πιστοποιητικού SHA-256 `req.csr` για το όνομα `api.secure-gateway.corp`.",
      },
      hint: {
        en: "Execute: openssl req -new -key private.key -out req.csr",
        el: "Εκτελέστε: openssl req -new -key private.key -out req.csr",
      },
      solution: "openssl req -new -key private.key -out req.csr",
      validateRegex: "openssl\\s+req\\s+-new",
      successMessage: {
        en: "CSR generated with SHA-256 digest! Ready for submission to Certification Authority.",
        el: "Το CSR δημιουργήθηκε με αποτύπωμα SHA-256! Έτοιμο για υποβολή στην Αρχή Πιστοποίησης.",
      },
    },
    {
      id: "task-4",
      title: {
        en: "Inspect X.509 Certificate Attributes & Validity",
        el: "Έλεγχος Ιδιοτήτων & Εγκυρότητας Πιστοποιητικού X.509",
      },
      description: {
        en: "Parse and display human-readable X.509 certificate fields (Subject, Issuer, Validity) from `cert.crt`.",
        el: "Εμφανίστε τα αναγνώσιμα πεδία του πιστοποιητικού X.509 (Subject, Issuer, Validity) από το `cert.crt`.",
      },
      hint: {
        en: "Execute: openssl x509 -in cert.crt -text -noout",
        el: "Εκτελέστε: openssl x509 -in cert.crt -text -noout",
      },
      solution: "openssl x509 -in cert.crt -text -noout",
      validateRegex: "openssl\\s+x509.*-text",
      successMessage: {
        en: "Certificate validated! Verified Subject CN, RSA 4096 key modulus, and active validity period.",
        el: "Το πιστοποιητικό επικυρώθηκε! Επιβεβαιώθηκαν το CN, το κλειδί RSA 4096 και η περίοδος εγκυρότητας.",
      },
    },
  ],
};

export const ch07HandsOnLab: HandsOnLab = {
  title: {
    en: "Enterprise Two-Tier PKI Architecture Deployment, Certificate Lifecycle Management & TLS 1.3 Hardening",
    el: "Ανάπτυξη Υποδομής PKI Δύο Επιπέδων, Διαχείριση Κύκλου Ζωής Πιστοποιητικών & Ενίσχυση TLS 1.3",
  },
  subtitle: {
    en: "2-Hour Practical Lab: Offline Root CA, Issuing Subordinate CA, Automated CRL/OCSP Revocation, and TLS Cipher Hardening",
    el: "Εργαστήριο 2 Ωρών: Offline Root CA, Εκδίδουσα Ενδιάμεση CA, Ανάκληση CRL/OCSP και Ενίσχυση TLS Ciphers",
  },
  duration: {
    en: "~2 Hours (120 minutes)",
    el: "~2 Ώρες (120 λεπτά)",
  },
  overview: {
    en: "In this comprehensive 2-hour technical laboratory, students build an enterprise Public Key Infrastructure (PKI) from scratch using OpenSSL and standard cryptographic primitives. You will construct an air-gapped Offline Root Certificate Authority (CA), establish an Issuing Subordinate Intermediate CA, configure Certificate Revocation Lists (CRL) and Online Certificate Status Protocol (OCSP) responders, issue server certificates with SAN (Subject Alternative Names), and harden Nginx/Apache web servers to enforce TLS 1.3 with Perfect Forward Secrecy (PFS).",
    el: "Σε αυτό το ολοκληρωμένο εργαστήριο 2 ωρών, οι φοιτητές κατασκευάζουν μια εταιρική Υποδομή Δημόσιου Κλειδιού (PKI) από το μηδέν με το OpenSSL. Θα δημιουργήσετε μια απομονωμένη (offline) Root Αρχή Πιστοποίησης (CA), μια Ενδιάμεση Εκδίδουσα CA (Subordinate CA), θα ρυθμίσετε λίστες ανάκλησης CRL και πρωτόκολλο OCSP, θα εκδώσετε πιστοποιητικά εξυπηρετητών με SAN (Subject Alternative Names) και θα ενισχύσετε web servers με TLS 1.3 και Perfect Forward Secrecy (PFS).",
  },
  environment: [
    "Linux PKI workstation with OpenSSL 3.0+ / 3.2+ FIPS compliant utilities",
    "Directory structure: `/root/ca/root-ca/` and `/root/ca/intermediate-ca/`",
    "Nginx web server with TLS 1.3 support",
    "Command line tools: `openssl`, `curl -v`, `sslscan`, `testssl.sh`",
  ],
  phases: [
    {
      phaseNumber: 1,
      title: {
        en: "Offline Root CA Initialization & Self-Signed Root Certificate",
        el: "Αρχικοποίηση Offline Root CA & Αυτοϋπογεγραμμένο Πιστοποιητικό Root",
      },
      estimatedTime: { en: "25 min", el: "25 λεπτά" },
      objectives: {
        en: [
          "Establish secure PKI directory hierarchy and OpenSSL configuration files.",
          "Generate encrypted 4096-bit RSA Root CA private key with AES-256.",
          "Self-sign the 20-year Root Certificate with `basicConstraints=critical,CA:TRUE`.",
        ],
        el: [
          "Δημιουργία ασφαλούς ιεραρχίας καταλόγων PKI και αρχείων ρυθμίσεων OpenSSL.",
          "Παραγωγή κρυπτογραφημένου ιδιωτικού κλειδιού Root CA RSA 4096-bit με AES-256.",
          "Αυτοϋπογραφή του 20ετούς Πιστοποιητικού Root με `basicConstraints=critical,CA:TRUE`.",
        ],
      },
      steps: {
        en: [
          "1. Initialize Root CA directory structure:\n```bash\nmkdir -p /root/ca/root-ca/{certs,crl,newcerts,private}\nchmod 700 /root/ca/root-ca/private\ntouch /root/ca/root-ca/index.txt\necho 1000 > /root/ca/root-ca/serial\n```",
          "2. Generate Root CA private key:\n```bash\nopenssl genrsa -aes256 -out /root/ca/root-ca/private/root-ca.key 4096\n```",
          "3. Create self-signed Root Certificate:\n```bash\nopenssl req -config /root/ca/root-ca/openssl.cnf -key /root/ca/root-ca/private/root-ca.key -new -x509 -days 7300 -sha256 -extensions v3_ca -out /root/ca/root-ca/certs/root-ca.crt\n```",
        ],
        el: [
          "1. Αρχικοποίηση δομής καταλόγων Root CA:\n```bash\nmkdir -p /root/ca/root-ca/{certs,crl,newcerts,private}\nchmod 700 /root/ca/root-ca/private\ntouch /root/ca/root-ca/index.txt\necho 1000 > /root/ca/root-ca/serial\n```",
          "2. Παραγωγή ιδιωτικού κλειδιού Root CA:\n```bash\nopenssl genrsa -aes256 -out /root/ca/root-ca/private/root-ca.key 4096\n```",
          "3. Δημιουργία αυτοϋπογεγραμμένου πιστοποιητικού Root:\n```bash\nopenssl req -config /root/ca/root-ca/openssl.cnf -key /root/ca/root-ca/private/root-ca.key -new -x509 -days 7300 -sha256 -extensions v3_ca -out /root/ca/root-ca/certs/root-ca.crt\n```",
        ],
      },
    },
    {
      phaseNumber: 2,
      title: {
        en: "Intermediate CA Issuance & Subordinate Trust Chain",
        el: "Έκδοση Ενδιάμεσης CA & Αλυσίδα Εμπιστοσύνης",
      },
      estimatedTime: { en: "45 min", el: "45 λεπτά" },
      objectives: {
        en: [
          "Generate Intermediate CA private key and Certificate Signing Request.",
          "Sign the Intermediate CA certificate using the Root CA key with path length constraint `pathlen:0`.",
          "Construct the full certificate trust bundle (CA-bundle).",
        ],
        el: [
          "Παραγωγή ιδιωτικού κλειδιού Ενδιάμεσης CA και CSR.",
          "Υπογραφή του πιστοποιητικού Ενδιάμεσης CA με το κλειδί της Root CA και περιορισμό `pathlen:0`.",
          "Σύνθεση του πλήρους πακέτου αλυσίδας πιστοποιητικών (CA-bundle).",
        ],
      },
      steps: {
        en: [
          "1. Generate Intermediate key and CSR:\n```bash\nopenssl genrsa -aes256 -out /root/ca/intermediate-ca/private/intermediate-ca.key 4096\nopenssl req -config /root/ca/intermediate-ca/openssl.cnf -new -sha256 -key /root/ca/intermediate-ca/private/intermediate-ca.key -out /root/ca/intermediate-ca/csr/intermediate-ca.csr\n```",
          "2. Sign Intermediate certificate using Root CA:\n```bash\nopenssl ca -config /root/ca/root-ca/openssl.cnf -extensions v3_intermediate_ca -days 3650 -notext -md sha256 -in /root/ca/intermediate-ca/csr/intermediate-ca.csr -out /root/ca/intermediate-ca/certs/intermediate-ca.crt\n```",
          "3. Create certificate chain file:\n```bash\ncat /root/ca/intermediate-ca/certs/intermediate-ca.crt /root/ca/root-ca/certs/root-ca.crt > /root/ca/intermediate-ca/certs/ca-chain.cert.pem\n```",
        ],
        el: [
          "1. Παραγωγή κλειδιού και CSR Ενδιάμεσης CA:\n```bash\nopenssl genrsa -aes256 -out /root/ca/intermediate-ca/private/intermediate-ca.key 4096\nopenssl req -config /root/ca/intermediate-ca/openssl.cnf -new -sha256 -key /root/ca/intermediate-ca/private/intermediate-ca.key -out /root/ca/intermediate-ca/csr/intermediate-ca.csr\n```",
          "2. Υπογραφή του πιστοποιητικού Ενδιάμεσης CA από τη Root CA:\n```bash\nopenssl ca -config /root/ca/root-ca/openssl.cnf -extensions v3_intermediate_ca -days 3650 -notext -md sha256 -in /root/ca/intermediate-ca/csr/intermediate-ca.csr -out /root/ca/intermediate-ca/certs/intermediate-ca.crt\n```",
          "3. Δημιουργία αρχείου αλυσίδας εμπιστοσύνης (chain):\n```bash\ncat /root/ca/intermediate-ca/certs/intermediate-ca.crt /root/ca/root-ca/certs/root-ca.crt > /root/ca/intermediate-ca/certs/ca-chain.cert.pem\n```",
        ],
      },
    },
    {
      phaseNumber: 3,
      title: {
        en: "End-Entity Server Certificate Issuance with Subject Alternative Names (SAN)",
        el: "Έκδοση Πιστοποιητικού Εξυπηρετητή με Subject Alternative Names (SAN)",
      },
      estimatedTime: { en: "30 min", el: "30 λεπτά" },
      objectives: {
        en: [
          "Generate a server private key and CSR containing multiple SAN DNS entries (`api.corp.internal`, `gateway.corp.internal`).",
          "Sign the server certificate with the Issuing Intermediate CA.",
          "Verify the trust chain with `openssl verify -CAfile ca-chain.cert.pem server.crt`.",
        ],
        el: [
          "Παραγωγή ιδιωτικού κλειδιού server και CSR με πολλαπλά SAN DNS entries.",
          "Υπογραφή του πιστοποιητικού server από την Ενδιάμεση CA.",
          "Επαλήθευση της αλυσίδας εμπιστοσύνης με `openssl verify`.",
        ],
      },
      steps: {
        en: [
          "1. Generate server key:\n```bash\nopenssl genrsa -out /etc/ssl/server.key 2048\n```",
          "2. Issue server certificate with SAN extensions using Intermediate CA:\n```bash\nopenssl ca -config /root/ca/intermediate-ca/openssl.cnf -extensions server_cert -days 375 -notext -md sha256 -in server.csr -out server.crt\n```",
          "3. Verify cryptographic trust chain:\n```bash\nopenssl verify -CAfile /root/ca/intermediate-ca/certs/ca-chain.cert.pem server.crt\n```",
        ],
        el: [
          "1. Παραγωγή ιδιωτικού κλειδιού server:\n```bash\nopenssl genrsa -out /etc/ssl/server.key 2048\n```",
          "2. Έκδοση πιστοποιητικού server με επεκτάσεις SAN από την Ενδιάμεση CA:\n```bash\nopenssl ca -config /root/ca/intermediate-ca/openssl.cnf -extensions server_cert -days 375 -notext -md sha256 -in server.csr -out server.crt\n```",
          "3. Επαλήθευση αλυσίδας εμπιστοσύνης:\n```bash\nopenssl verify -CAfile /root/ca/intermediate-ca/certs/ca-chain.cert.pem server.crt\n```",
        ],
      },
    },
    {
      phaseNumber: 4,
      title: {
        en: "Web Server TLS 1.3 Hardening & Certificate Revocation (CRL/OCSP)",
        el: "Ενίσχυση Web Server TLS 1.3 & Ανάκληση Πιστοποιητικών (CRL/OCSP)",
      },
      estimatedTime: { en: "20 min", el: "20 λεπτά" },
      objectives: {
        en: [
          "Configure Nginx to disable legacy SSLv3, TLS 1.0, TLS 1.1, and enforce TLS 1.3 with ECDHE suites.",
          "Revoke a compromised certificate in OpenSSL and publish a signed CRL.",
          "Audit the server TLS posture using `sslscan`.",
        ],
        el: [
          "Ρύθμιση του Nginx για απενεργοποίηση παλαιών πρωτοκόλλων και επιβολή TLS 1.3 με σουίτες ECDHE.",
          "Ανάκληση παραβιασμένου πιστοποιητικού στο OpenSSL και δημοσίευση υπογεγραμμένης CRL.",
          "Έλεγχος ασφάλειας TLS του εξυπηρετητή με το εργαλείο `sslscan`.",
        ],
      },
      steps: {
        en: [
          "1. Configure Nginx TLS settings:\n```nginx\nssl_protocols TLSv1.2 TLSv1.3;\nssl_prefer_server_ciphers off;\nssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';\n```",
          "2. Revoke certificate:\n```bash\nopenssl ca -config /root/ca/intermediate-ca/openssl.cnf -revoke /root/ca/intermediate-ca/certs/compromised.crt\nopenssl ca -config /root/ca/intermediate-ca/openssl.cnf -gencrl -out /var/www/pki/intermediate.crl\n```",
          "3. Audit web server TLS cipher strength with `sslscan 127.0.0.1:443`.",
        ],
        el: [
          "1. Ρύθμιση παραμέτρων TLS στο Nginx:\n```nginx\nssl_protocols TLSv1.2 TLSv1.3;\nssl_prefer_server_ciphers off;\nssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';\n```",
          "2. Ανάκληση πιστοποιητικού:\n```bash\nopenssl ca -config /root/ca/intermediate-ca/openssl.cnf -revoke /root/ca/intermediate-ca/certs/compromised.crt\nopenssl ca -config /root/ca/intermediate-ca/openssl.cnf -gencrl -out /var/www/pki/intermediate.crl\n```",
          "3. Έλεγχος ποιότητας κρυπτογραφικών σουιτών με `sslscan 127.0.0.1:443`.",
        ],
      },
    },
  ],
  deliverables: {
    en: [
      "Two-Tier PKI Hierarchy Configuration Files (`openssl_root.cnf`, `openssl_intermediate.cnf`)",
      "Signed CA Bundle and Verification Transcript (`ca-chain.cert.pem`)",
      "Cryptographic Certificate Revocation List (`intermediate.crl`)",
      "Nginx TLS 1.3 Hardened Configuration File (`nginx_ssl_hardened.conf`)",
    ],
    el: [
      "Αρχεία Ρυθμίσεων Ιεραρχίας PKI 2 Επιπέδων (`openssl_root.cnf`, `openssl_intermediate.cnf`)",
      "Υπογεγραμμένο Πακέτο Αλυσίδας Πιστοποιητικών (`ca-chain.cert.pem`)",
      "Υπογεγραμμένη Λίστα Ανάκλησης Πιστοποιητικών (`intermediate.crl`)",
      "Ενισχυμένο Αρχείο Ρυθμίσεων Nginx TLS 1.3 (`nginx_ssl_hardened.conf`)",
    ],
  },
  verificationChecklist: {
    en: [
      "Root CA has `basicConstraints=critical,CA:TRUE` and private key has mode 0400.",
      "Intermediate CA pathlen is constrained to 0.",
      "Server certificate contains valid SAN DNS attributes and passes chain verification.",
      "Nginx rejects TLS 1.0/1.1 and weak CBC ciphers during `sslscan` assessment.",
    ],
    el: [
      "Η Root CA έχει `basicConstraints=critical,CA:TRUE` και ιδιωτικό κλειδί με δικαιώματα 0400.",
      "Η Ενδιάμεση CA έχει περιορισμό pathlen=0.",
      "Το πιστοποιητικό server περιέχει έγκυρα SANs και περνά τον έλεγχο `openssl verify`.",
      "Ο Nginx απορρίπτει TLS 1.0/1.1 και αδύναμους ciphers CBC κατά τη σάρωση με `sslscan`.",
    ],
  },
};

export const ch07Project: TechnicalProject = {
  id: "ch07-arch",
  category: {
    en: "Enterprise Architecture & Assessment Blueprint",
    el: "Αρχιτεκτονική Επιχείρησης & Στρατηγικό Πλάνο",
  },
  title: {
    en: "End-to-End Cryptographic Key Management & Hybrid Encryption Protocol Design",
    el: "Διαχείριση Κρυπτογραφικών Κλειδιών & Σχεδιασμός Υβριδικού Πρωτοκόλλου Κρυπτογράφησης",
  },
  subtitle: {
    en: "Hybrid Cryptosystem Engineering (AES-256-GCM + X25519/RSA), Automated Certificate Automation, and KMS Architecture",
    el: "Μηχανική Υβριδικού Κρυπτοσυστήματος (AES-256-GCM + X25519/RSA), Αυτοματοποίηση ACME και Αρχιτεκτονική KMS",
  },
  scenario: {
    en: "A defense aerospace contractor requires an ultra-secure, tamper-proof hybrid cryptographic communications protocol for telemetry data exchange between ground stations and autonomous aerial vehicles. You are commissioned as Principal Cryptographic Architect to design a hybrid cryptosystem combining symmetric authenticated ciphers (AES-256-GCM) with asymmetric key exchange (ECDH over Curve25519), construct an automated PKI lifecycle pipeline, and formalize a Key Management System (KMS) policy.",
    el: "Μια αεροδιαστημική αμυντική βιομηχανία απαιτεί ένα εξαιρετικά ασφαλές, υβριδικό κρυπτογραφικό πρωτόκολλο επικοινωνίας για ανταλλαγή δεδομένων τηλεμετρίας μεταξύ σταθμών βάσης και αυτόνομων οχημάτων. Σας ανατίθεται ως Επικεφαλής Αρχιτέκτονας Κρυπτογραφίας να σχεδιάσετε ένα υβριδικό σύστημα (AES-256-GCM + X25519 ECDH), να υλοποιήσετε έναν αγωγό αυτοματοποίησης πιστοποιητικών και να συντάξετε μια επίσημη πολιτική KMS.",
  },
  objectives: {
    en: [
      "Implement a Python cryptographic library supporting hybrid encryption (AES-256-GCM + X25519/Ed25519).",
      "Enforce Authenticated Encryption with Associated Data (AEAD) to prevent ciphertext tampering.",
      "Design an automated Certificate Lifecycle Management agent adhering to the ACME protocol (RFC 8555).",
      "Formulate a complete Cryptographic Key Lifecycle and Escrow policy meeting NIST SP 800-57 guidelines.",
    ],
    el: [
      "Ανάπτυξη βιβλιοθήκης κρυπτογραφίας Python για υβριδική κρυπτογράφηση (AES-256-GCM + X25519/Ed25519).",
      "Επιβολή Αυθεντικοποιημένης Κρυπτογράφησης (AEAD) για αποτροπή αλλοίωσης κρυπτοκειμένου.",
      "Σχεδιασμός πράκτορα αυτοματοποιημένης ανανέωσης πιστοποιητικών βάσει του πρωτοκόλλου ACME (RFC 8555).",
      "Σύνταξη πλήρους πολιτικής Διαχείρισης Κύκλου Ζωής Κλειδιών κατά τις οδηγίες NIST SP 800-57.",
    ],
  },
  scope: {
    en: [
      "Algorithms: AES-256-GCM, ChaCha20-Poly1305, Curve25519 (X25519), Ed25519, SHA-384, HKDF (RFC 5869).",
      "Key Management: Generation, distribution, rotation, revocation, and zeroization.",
    ],
    el: [
      "Αλγόριθμοι: AES-256-GCM, ChaCha20-Poly1305, Curve25519 (X25519), Ed25519, SHA-384, HKDF.",
      "Διαχείριση Κλειδιών: Παραγωγή, διανομή, περιστροφή, ανάκληση και καταστροφή (zeroization).",
    ],
  },
  milestones: [
    {
      milestoneNumber: 1,
      title: {
        en: "Hybrid Cryptosystem Protocol Specification & Core Engine",
        el: "Προδιαγραφή Υβριδικού Πρωτοκόλλου & Κεντρική Μηχανή Κρυπτογράφησης",
      },
      description: {
        en: "Build `hybrid_crypto.py` utilizing `cryptography.io` to perform ephemeral ECDH key exchange, HKDF key derivation, and AES-256-GCM authenticated encryption.",
        el: "Ανάπτυξη του `hybrid_crypto.py` για εφήμερη ανταλλαγή κλειδιών ECDH, παραγωγή κλειδιών με HKDF και κρυπτογράφηση AES-256-GCM.",
      },
      detailedSpec: {
        en: [
          "Architect high-throughput log ingestion pipeline handling 20,000 EPS across multi-cloud and on-premises tiers.",
          "Design Kafka buffer and Logstash/Vector parsing workers mapping logs to Open Cybersecurity Schema Framework (OCSF).",
          "Specify tiered hot-warm-cold storage with immutable cryptographic write-once-read-many (WORM) archiving."
],
        el: [
          "Αρχιτεκτονική αγωγού συλλογής logs για διαχείριση 20.000 EPS σε hybrid cloud περιβάλλον.",
          "Σχεδιασμός Kafka buffers και parsers για κανονικοποίηση σε σχήμα OCSF.",
          "Προδιαγραφή κλιμακωτής αποθήκευσης hot-warm-cold με WORM αρχειοθέτηση."
],
      },
      deliverable: {
        en: "Python crypto module + cryptographic test vector verification.",
        el: "Υπομονάδα κρυπτογραφίας Python + επαλήθευση δοκιμαστικών διανυσμάτων.",
      },
    },
    {
      milestoneNumber: 2,
      title: {
        en: "Digital Signature & Non-Repudiation Subsystem",
        el: "Υποσύστημα Ψηφιακών Υπογραφών & Μη Αποποίησης",
      },
      description: {
        en: "Implement Ed25519 public key digital signature wrapping for all telemetry packets with embedded timestamp verification and replay protection.",
        el: "Υλοποίηση ψηφιακών υπογραφών Ed25519 σε πακέτα τηλεμετρίας με ενσωματωμένη προστασία από επιθέσεις επανάληψης (replay).",
      },
      detailedSpec: {
        en: [
          "Develop 25 production-grade Sigma YAML detection rules mapped to MITRE ATT&CK enterprise techniques.",
          "Implement stateful correlation rules detecting multi-stage attack chains (Pass-the-Hash, Cobalt Strike beaconing).",
          "Build dynamic suppression and whitelisting engine reducing false-positive alert volume by 80%."
],
        el: [
          "Ανάπτυξη 25 κανόνων ανίχνευσης Sigma YAML αντιστοιχισμένων στο MITRE ATT&CK.",
          "Υλοποίηση κανόνων συσχέτισης πολλαπλών σταδίων (Pass-the-Hash, C2 beaconing).",
          "Κατασκευή μηχανής δυναμικής καταστολής ψευδών συναγερμών (μείωση 80%)."
],
      },
      deliverable: {
        en: "Signature validation module + benchmark report.",
        el: "Υπομονάδα επαλήθευσης υπογραφών + αναφορά επιδόσεων.",
      },
    },
    {
      milestoneNumber: 3,
      title: {
        en: "Automated Certificate Enrollment & Renewal Service (ACME Client)",
        el: "Αυτοματοποιημένη Υπηρεσία Έκδοσης & Ανανέωσης Πιστοποιητικών (ACME)",
      },
      description: {
        en: "Build an automated agent that communicates with a local Smallstep / Let's Encrypt CA to automatically rotate TLS/mTLS certificates every 60 days.",
        el: "Ανάπτυξη πράκτορα που επικοινωνεί με ACME CA για αυτόματη περιστροφή πιστοποιητικών mTLS κάθε 60 ημέρες.",
      },
      detailedSpec: {
        en: [
          "Architect automated Security Orchestration, Automation, and Response (SOAR) playbook engine.",
          "Implement automated playbooks: Host Isolation via EDR API, Phishing Domain Sinkholing, and User Token Revocation.",
          "Design human-in-the-loop interactive approval checkpoints via Slack/Teams webhooks for high-impact actions."
],
        el: [
          "Αρχιτεκτονική μηχανής αυτοματοποιημένων playbooks SOAR.",
          "Υλοποίηση playbooks: απομόνωση host μέσω EDR API, sinkholing κακόβουλων domains και ανάκληση tokens.",
          "Σχεδιασμός σημείων έγκρισης human-in-the-loop μέσω Slack/Teams."
],
      },
      deliverable: {
        en: "ACME renewal daemon + integration test script.",
        el: "Δαίμονας ανανέωσης ACME + σενάριο δοκιμών.",
      },
    },
    {
      milestoneNumber: 4,
      title: {
        en: "Enterprise Cryptographic Key Management (KMS) Charter",
        el: "Επιχειρησιακή Πολιτική Διαχείρισης Κρυπτογραφικών Κλειδιών (KMS)",
      },
      description: {
        en: "Author the complete enterprise Key Management Policy covering HSM storage, key split mechanics (Shamir Secret Sharing), rotation schedules, and post-quantum crypto roadmap.",
        el: "Σύνταξη της πλήρους πολιτικής KMS με αποθήκευση HSM, διαμοιρασμό μυστικών Shamir και οδικό χάρτη μετάβασης σε μετα-κβαντική κρυπτογραφία.",
      },
      detailedSpec: {
        en: [
          "Construct real-time SOC operations dashboard tracking Mean Time to Detect (MTTD) and Mean Time to Respond (MTTR).",
          "Establish Tier 1/2/3 analyst shift escalation matrix and alert triage quality assurance runbooks.",
          "Draft comprehensive SOC Engineering & Threat Hunting Operating Charter (15 pages)."
],
        el: [
          "Κατασκευή real-time dashboard λειτουργίας SOC με μετρικές MTTD (< 15 min) και MTTR (< 60 min).",
          "Καθορισμός διαδικασιών κλιμάκωσης αναλυτών Tier 1/2/3 και οδηγών triage.",
          "Σύνταξη πλήρους Εγχειριδίου Λειτουργίας SOC & Threat Hunting (15 σελίδες)."
],
      },
      deliverable: {
        en: "Comprehensive KMS Architecture & Policy Document (10–12 pages).",
        el: "Ολοκληρωμένο Έγγραφο Αρχιτεκτονικής & Πολιτικής KMS (10–12 σελίδες).",
      },
    },
  ],
  deliverables: {
    en: [
      "Hybrid Cryptographic Library Codebase (`/src/hybrid_crypto/`)",
      "Automated ACME Certificate Renewal Client (`/src/acme_agent/`)",
      "Cryptographic Test Vectors & Performance Benchmarks (`benchmarks.json`)",
      "Enterprise Key Management Policy & Architecture Dossier (10–12 pages)",
    ],
    el: [
      "Πηγαίος Κώδικας Υβριδικής Βιβλιοθήκης Κρυπτογραφίας (`/src/hybrid_crypto/`)",
      "Πράκτορας Αυτόματης Ανανέωσης Πιστοποιητικών ACME (`/src/acme_agent/`)",
      "Δοκιμαστικά Διανύσματα & Μετρήσεις Απόδοσης (`benchmarks.json`)",
      "Φάκελος Πολιτικής & Αρχιτεκτονικής Διαχείρισης Κλειδιών KMS (10–12 σελίδες)",
    ],
  },
  rubric: [
    {
      criterion: {
        en: "Cryptographic Implementation Correctness & AEAD Security",
        el: "Ορθότητα Κρυπτογραφικής Υλοποίησης & Ασφάλεια AEAD",
      },
      weight: "30%",
      description: {
        en: "Strict prevention of nonce reuse, robust authentication tag validation, and correct ephemeral key exchange.",
        el: "Αυστηρή αποτροπή επαναχρησιμοποίησης nonce, έλεγχος ετικετών αυθεντικοποίησης και ορθή εφήμερη ανταλλαγή κλειδιών.",
      },
    },
    {
      criterion: {
        en: "Certificate Automation & ACME Protocol Integrity",
        el: "Αυτοματοποίηση Πιστοποιητικών & Ακεραιότητα Πρωτοκόλλου ACME",
      },
      weight: "25%",
      description: {
        en: "Reliability of automated certificate request, validation challenge processing, and keypair generation.",
        el: "Αξιοπιστία αυτοματοποιημένης αίτησης πιστοποιητικών, επεξεργασίας προκλήσεων ελέγχου και παραγωγής κλειδιών.",
      },
    },
    {
      criterion: {
        en: "KMS Policy Rigor & Compliance with NIST SP 800-57",
        el: "Αυστηρότητα Πολιτικής KMS & Συμμόρφωση με NIST SP 800-57",
      },
      weight: "25%",
      description: {
        en: "Depth of key state lifecycle models (Pre-activation, Active, Suspended, Deactivated, Destroyed) and HSM integration.",
        el: "Βάθος μοντέλων κύκλου ζωής κλειδιών (Ενεργό, Ανασταλμένο, Κατεστραμμένο) και ενσωμάτωση υλικού HSM.",
      },
    },
    {
      criterion: {
        en: "Documentation & Future-Proofing (Post-Quantum Roadmap)",
        el: "Τεκμηρίωση & Μετα-Κβαντική Ετοιμότητα (PQC Roadmap)",
      },
      weight: "20%",
      description: {
        en: "Clarity of mathematical explanations and viability of the migration plan toward ML-KEM/Kyber algorithms.",
        el: "Σαφήνεια μαθηματικών αναλύσεων και βιωσιμότητα του σχεδίου μετάβασης στους αλγορίθμους ML-KEM/Kyber.",
      },
    },
  ],
};

export const ch07Quiz: QuizQuestion[] = [
  {
    id: 1,
    question: {
      en: "In a Security Operations Center (SOC), what is the primary architectural purpose of a SIEM system?",
      el: "Σε ένα Κέντρο Επιχειρήσεων Ασφάλειας (SOC), ποιος είναι ο βασικός αρχιτεκτονικός σκοπός ενός συστήματος SIEM;",
    },
    options: {
      en: [
        "To compile unprivileged user scripts into isolated kernel device driver modules during host startup, during standard continuous monitoring and administrative audits.",
        "To replace traditional symmetric block cipher algorithms with post-quantum lattice public-key primitives, to ensure high-availability operational compliance across systems.",
        "To aggregate, normalize, and correlate multi-source security telemetry logs for threat detection and compliance.",
        "To establish high-speed direct peer-to-peer tunnels across transoceanic submarine communication cables, using standardized organizational security policy configurations.",
        "To manage physical facility access control badges and employee biometric fingerprint sensor databases, across distributed multi-region cloud production environments.",
      ],
      el: [
        "Να μεταγλωττίζει απλά scripts χρηστών σε οδηγούς συσκευών πυρήνα κατά την εκκίνηση του συστήματος, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Να αντικαθιστά συμμετρικούς αλγορίθμους με μετα-κβαντικά ασύμμετρα κρυπτογραφικά σχήματα πλεγμάτων, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Να συγκεντρώνει, να κανονικοποιεί και να συσχετίζει αρχεία καταγραφής από πολλαπλές πηγές για εντοπισμό απειλών.",
        "Να δημιουργεί τούνελ peer-to-peer υψηλής ταχύτητας σε υποθαλάσσια καλώδια διεθνών επικοινωνιών, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Να διαχειρίζεται κάρτες φυσικής πρόσβασης στις εγκαταστάσεις και βάσεις βιομετρικών δεδομένων προσωπικού, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "SIEM (Security Information and Event Management) ingests logs from endpoints, networks, and cloud services, normalizing them and running correlation rules to alert analysts to malicious activity.",
      el: "Το SIEM συλλέγει logs από endpoints, δίκτυο και cloud, τα κανονικοποιεί και εκτελεί κανόνες συσχέτισης για τον εντοπισμό επιθέσεων και την άμεση ειδοποίηση των αναλυτών.",
    },
  },
  {
    id: 2,
    question: {
      en: "How does the MITRE ATT&CK framework assist security analysts in threat detection and adversary emulation?",
      el: "Πώς βοηθά το πλαίσιο MITRE ATT&CK τους αναλυτές ασφάλειας στον εντοπισμό απειλών και στην προσομοίωση αντιπάλων;",
    },
    options: {
      en: [
        "By automatically generating valid RSA-4096 private keys for all enterprise workstation endpoints, to ensure high-availability operational compliance across systems.",
        "By replacing relational database SQL queries with unindexed flat text files stored in local directories, using standardized organizational security policy configurations.",
        "By enforcing strict physical biometric access controls on external perimeter facility gates, across distributed multi-region cloud production environments.",
        "By categorizing real-world adversary behaviors into a structured matrix of Tactics, Techniques, and Procedures (TTPs).",
        "By translating frontend JavaScript source code into proprietary hardware-level machine instructions, without requiring manual intervention from systems engineering staff.",
      ],
      el: [
        "Παράγοντας αυτόματα έγκυρα ιδιωτικά κλειδιά RSA-4096 για όλους τους σταθμούς εργασίας της επιχείρησης, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Αντικαθιστώντας ερωτήματα SQL με μη ευρετηριασμένα αρχεία κειμένου αποθηκευμένα σε τοπικούς φακέλους, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Επιβάλλοντας αυστηρούς φυσικούς βιομετρικούς ελέγχους στις εξωτερικές πύλες εισόδου των εγκαταστάσεων, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Κατηγοριοποιώντας τις συμπεριφορές επιτιθέμενων σε έναν δομημένο πίνακα Τακτικών, Τεχνικών και Διαδικασιών (TTPs).",
        "Μεταφράζοντας τον κώδικα JavaScript σε ιδιόκτητες εντολές μηχανής επιπέδου υλικού επεξεργαστή, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
      ],
    },
    correctIndex: 3,
    explanation: {
      en: "MITRE ATT&CK is a globally accessible knowledge base of adversary Tactics, Techniques, and Procedures based on real-world observations, providing a common taxonomy for defense and threat hunting.",
      el: "Το MITRE ATT&CK είναι μια παγκόσμια βάση γνώσης τακτικών, τεχνικών και διαδικασιών (TTPs) βασισμένη σε πραγματικές επιθέσεις, προσφέροντας κοινή γλώσσα για ανάλυση και άμυνα.",
    },
  },
  {
    id: 3,
    question: {
      en: "What is the primary technical advantage of expressing detection logic using the open Sigma rule standard?",
      el: "Ποιο είναι το βασικό τεχνικό πλεονέκτημα της περιγραφής κανόνων ανίχνευσης μέσω του ανοικτού προτύπου Sigma;",
    },
    options: {
      en: [
        "Sigma rules convert relational SQL tables into non-relational document collections during runtime, to ensure high-availability operational compliance across systems.",
        "Sigma eliminates the need for log storage by discarding security events immediately after ingestion, across distributed multi-region cloud production environments.",
        "Sigma encrypts operating system swap partitions using post-quantum lattice-based key primitives, without requiring manual intervention from systems engineering staff.",
        "Sigma restricts root superuser access on production servers during emergency maintenance windows, to mitigate potential unauthorized system configuration drift.",
        "Sigma provides a vendor-agnostic YAML format that compiles into queries for Splunk, Elastic, Sentinel, and QRadar.",
      ],
      el: [
        "Οι κανόνες Sigma μετατρέπουν σχεσιακούς πίνακες SQL σε μη σχεσιακά έγγραφα δεδομένων κατά την εκτέλεση, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Το Sigma καταργεί την ανάγκη αποθήκευσης καταγραφών διαγράφοντας τα συμβάντα αμέσως μετά τη συλλογή, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Το Sigma κρυπτογραφεί τα swap partitions του λειτουργικού με μετα-κβαντικούς αλγορίθμους πλεγμάτων, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Το Sigma περιορίζει τα δικαιώματα του διαχειριστή root κατά τη διάρκεια προγραμματισμένης συντήρησης, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Το Sigma παρέχει μια ανεξάρτητη μορφή YAML που μεταγλωττίζεται σε ερωτήματα για Splunk, Elastic, Sentinel κ.ά.",
      ],
    },
    correctIndex: 4,
    explanation: {
      en: "Sigma is a generic signature format for log events. It allows security teams to write detection rules once in YAML and compile them to any target SIEM/EDR platform query language.",
      el: "Το Sigma είναι ένα ανοικτό πρότυπο YAML που επιτρέπει τη συγγραφή κανόνων ανίχνευσης μία φορά και τη μεταγλώττισή τους στη γλώσσα ερωτημάτων οποιουδήποτε SIEM (Splunk, Elastic, QRadar).",
    },
  },
  {
    id: 4,
    question: {
      en: "What primary capability does a SOAR (Security Orchestration, Automation, and Response) platform provide to a modern SOC?",
      el: "Ποια κύρια δυνατότητα προσφέρει μια πλατφόρμα SOAR σε ένα σύγχρονο Κέντρο Επιχειρήσεων Ασφάλειας (SOC);",
    },
    options: {
      en: [
        "It automates incident response workflows (playbooks) to execute containment actions at machine speed.",
        "It compiles unprivileged application source code into high-performance kernel assembly drivers, using standardized organizational security policy configurations.",
        "It eliminates the need for digital certificates across all internal and external communication links.",
        "It manages physical HVAC cooling systems and power backup generators inside enterprise data centers, to mitigate potential unauthorized system configuration drift.",
        "It routes all internal corporate local area network traffic through untrusted external proxy nodes, in accordance with modern zero trust architectural principles.",
      ],
      el: [
        "Αυτοματοποιεί ροές αντιμετώπισης περιστατικών (playbooks) εκτελώντας ενέργειες περιορισμού σε ταχύτητα μηχανής.",
        "Μεταγλωττίζει τον πηγαίο κώδικα εφαρμογών σε οδηγούς συσκευών πυρήνα υψηλής υπολογιστικής ταχύτητας, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Καταργεί πλήρως την ανάγκη χρήσης ψηφιακών πιστοποιητικών σε όλα τα εσωτερικά και εξωτερικά δίκτυα.",
        "Διαχειρίζεται τα συστήματα κλιματισμού HVAC και τις γεννήτριες ισχύος στα εταιρικά κέντρα δεδομένων, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Δρομολογεί όλη την εσωτερική κίνηση του τοπικού δικτύου μέσω αναξιόπιστων εξωτερικών κόμβων proxy, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "SOAR connects disparate security tools (firewalls, EDR, SIEM, threat intel) and executes automated playbooks (e.g. isolating hosts, blocking IPs, revoking tokens) to contain threats rapidly.",
      el: "Το SOAR διασυνδέει εργαλεία ασφάλειας και εκτελεί αυτοματοποιημένα playbooks (απομόνωση σταθμών, αποκλεισμός IPs, ανάκληση tokens) για την άμεση αντιμετώπιση απειλών σε δευτερόλεπτα.",
    },
  },
  {
    id: 5,
    question: {
      en: "In the PICERL incident response lifecycle (Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned), what is the primary goal of the 'Containment' phase?",
      el: "Στον κύκλο ζωής απόκρισης περιστατικών PICERL, ποιος είναι ο κύριος στόχος της φάσης 'Περιορισμού' (Containment);",
    },
    options: {
      en: [
        "To write post-incident forensic reports and distribute executive summaries to the board of directors, across distributed multi-region cloud production environments.",
        "To stop the active spread of the incident and prevent further damage while preserving forensic evidence.",
        "To purchase new server hardware components and replace all existing network router switches, to mitigate potential unauthorized system configuration drift.",
        "To conduct scheduled annual penetration testing and red-team adversary simulation exercises, in accordance with modern zero trust architectural principles.",
        "To restore all corrupted database backup archives to production cloud clusters immediately, before committing changes to central production repository nodes.",
      ],
      el: [
        "Να συντάξει εκθέσεις διερεύνησης περιστατικού και να διανείμει περιλήψεις στο διοικητικό συμβούλιο, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Να σταματήσει την εξάπλωση του συμβάντος και να αποτρέψει περαιτέρω ζημιά διατηρώντας τα ιατροδικαστικά πειστήρια.",
        "Να αγοράσει νέο υλικό εξυπηρετητών και να αντικαταστήσει όλους τους δρομολογητές του δικτύου, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Να εκτελέσει ετήσιες δοκιμές διείσδυσης (penetration testing) και ασκήσεις προσομοίωσης red team, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Να επαναφέρει άμεσα όλα τα αντίγραφα ασφαλείας των βάσεων δεδομένων στο περιβάλλον παραγωγής, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Containment aims to limit the scope and blast radius of an attack (e.g. network isolation, disabling accounts) while ensuring digital evidence is preserved for subsequent forensic analysis.",
      el: "Ο Περιορισμός (Containment) αποσκοπεί στον άμεσο έλεγχο της εξάπλωσης της επίθεσης (απομόνωση δικτύου, απενεργοποίηση λογαριασμών), διαφυλάσσοντας παράλληλα τα ψηφιακά πειστήρια.",
    },
  },
  {
    id: 6,
    question: {
      en: "Why is establishing and maintaining a strict 'Chain of Custody' essential during digital forensic investigations?",
      el: "Γιατί είναι απαραίτητη η τήρηση μιας αυστηρής 'Αλυσίδας Επιμέλειας' (Chain of Custody) κατά τις ψηφιακές ιατροδικαστικές έρευνες;",
    },
    options: {
      en: [
        "To optimize forensic hard disk drive input/output throughput during sector-by-sector copying, to mitigate potential unauthorized system configuration drift.",
        "To convert binary memory dump files into human-readable plain text documentation in real time, in accordance with modern zero trust architectural principles.",
        "To document chronological evidence custody, verifying integrity and admissibility in legal proceedings.",
        "To bypass operating system kernel access controls during live volatile memory acquisition, before committing changes to central production repository nodes.",
        "To allow unprivileged users to modify incident response ticketing status records directly, under standard operating procedures defined in corporate ISMS policies.",
      ],
      el: [
        "Για να βελτιστοποιεί την ταχύτητα εγγραφής του δίσκου κατά τη δημιουργία αντιγράφων τομέα-προς-τομέα, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Για να μετατρέπει δυαδικά αρχεία μνήμης σε αναγνώσιμο κείμενο κατά τη διάρκεια της ανάλυσης, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Για να τεκμηριώνει χρονολογικά την κατοχή πειστηρίων, διασφαλίζοντας ακεραιότητα και αποδεκτή ισχύ στο δικαστήριο.",
        "Για να παρακάμπτει τους ελέγχους ασφάλειας του λειτουργικού κατά τη συλλογή πτητικής μνήμης RAM, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Για να επιτρέπει σε απλούς χρήστες να αλλάζουν την κατάσταση των καταγεγραμμένων περιστατικών, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "Chain of Custody documents who collected, handled, transferred, and analyzed evidence, proving with cryptographic hashes that the evidence was not tampered with, ensuring court admissibility.",
      el: "Η Αλυσίδα Επιμέλειας καταγράφει ποιος συνέλεξε, μετέφερε και ανέλυσε τα ψηφιακά πειστήρια, αποδεικνύοντας μέσω κρυπτογραφικών hashes ότι δεν αλλοιώθηκαν ώστε να γίνονται δεκτά στο δικαστήριο.",
    },
  },
  {
    id: 7,
    question: {
      en: "What is the primary difference between Indicators of Compromise (IoCs) and Indicators of Attack (IoAs)?",
      el: "Ποια είναι η βασική διαφορά μεταξύ Δεικτών Παραβίασης (IoCs) και Δεικτών Επίθεσης (IoAs);",
    },
    options: {
      en: [
        "IoCs apply exclusively to physical locks, while IoAs apply exclusively to software memory management units, in accordance with modern zero trust architectural principles.",
        "IoCs are generated only by quantum computers, while IoAs are generated only by classical hardware servers, before committing changes to central production repository nodes.",
        "IoCs are encrypted with symmetric AES keys, while IoAs are hashed using unkeyed MD5 checksums, under standard operating procedures defined in corporate ISMS policies.",
        "IoCs are forensic artifacts of past compromise (hashes, IPs), while IoAs identify active adversary intent and behavior.",
        "IoCs are analyzed exclusively by legal teams, while IoAs are monitored exclusively by HR departments, across all internal enterprise network segments and endpoints.",
      ],
      el: [
        "Τα IoCs αφορούν μόνο φυσικές κλειδαριές, ενώ τα IoAs αφορούν μόνο μονάδες διαχείρισης μνήμης MMU, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Τα IoCs παράγονται μόνο από κβαντικούς υπολογιστές, ενώ τα IoAs παράγονται μόνο από κλασικούς διακομιστές, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Τα IoCs κρυπτογραφούνται με κλειδιά AES, ενώ τα IoAs κατακερματίζονται με απλά checksums MD5, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Τα IoCs είναι ιατροδικαστικά ίχνη παρελθούσας παραβίασης (hashes, IPs), ενώ τα IoAs εντοπίζουν ενεργή συμπεριφορά.",
        "Τα IoCs εξετάζονται μόνο από νομικές ομάδες, ενώ τα IoAs παρακολουθούνται μόνο από το τμήμα HR, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
      ],
    },
    correctIndex: 3,
    explanation: {
      en: "IoCs represent what happened in the past (e.g. known malware file hashes, malicious IPs). IoAs focus on the attacker's active behavioral patterns and intent regardless of the specific malware used.",
      el: "Τα IoCs δείχνουν τι συνέβη στο παρελθόν (hashes κακόβουλων αρχείων, κακόβουλες IPs). Τα IoAs εστιάζουν στη συμπεριφορά και την πρόθεση του επιτιθέμενου κατά την εξέλιξη της επίθεσης.",
    },
  },
  {
    id: 8,
    question: {
      en: "What proactive security practice involves iteratively searching through corporate network telemetry to detect stealthy threats that evaded automated detection tools?",
      el: "Ποια προληπτική πρακτική ασφάλειας περιλαμβάνει τη διερεύνηση τηλεμετρίας δικτύου για τον εντοπισμό απειλών που διέφυγαν από τα εργαλεία ανίχνευσης;",
    },
    options: {
      en: [
        "Disaster Recovery Failover, migrating cloud application container workloads across geographic availability zones.",
        "Static Source Code Obfuscation, scrambling binary instruction sequences to hinder reverse engineering, under standard operating procedures defined in corporate ISMS policies.",
        "Penetration Testing Scope Negotiation, establishing contractual liability clauses before red-team engagements.",
        "Hardware Thermal Throttling, reducing central processing unit clock speeds to prevent overheating damage, during standard continuous monitoring and administrative audits.",
        "Threat Hunting, testing hypothesis-driven inquiries against log data to uncover hidden adversary activity.",
      ],
      el: [
        "Disaster Recovery Failover, μεταφέροντας φορτία containers μεταξύ γεωγραφικών ζωνών διαθεσιμότητας cloud.",
        "Στατική Συσκότιση Κώδικα (Obfuscation), αναδιατάσσοντας εντολές μηχανής για παρεμπόδιση αντίστροφης μηχανικής, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Διαπραγμάτευση Εύρους Pen Testing, καθορίζοντας συμβατικούς όρους ευθύνης πριν από ασκήσεις red team.",
        "Θερμική Επιβράδυνση Υλικού, μειώνοντας τη συχνότητα του επεξεργαστή για αποτροπή υπερθέρμανσης, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Threat Hunting, δοκιμάζοντας υποθέσεις σε δεδομένα τηλεμετρίας για τον εντοπισμό κρυφών ενεργειών επιτιθέμενων.",
      ],
    },
    correctIndex: 4,
    explanation: {
      en: "Threat hunting is a proactive, hypothesis-driven human analyst methodology that scours endpoint and network telemetry to uncover advanced persistent threats (APTs) that bypassed automated alerts.",
      el: "Το Threat Hunting είναι μια προληπτική διαδικασία όπου οι αναλυτές διατυπώνουν υποθέσεις και αναλύουν δεδομένα για να εντοπίσουν προηγμένες απειλές (APTs) που απέφυγαν τις αυτόματες ειδοποιήσεις.",
    },
  },
  {
    id: 9,
    question: {
      en: "Why is the 'Lessons Learned' phase considered critical in long-term enterprise incident management?",
      el: "Γιατί η φάση των 'Διδαγμάτων' (Lessons Learned) θεωρείται κρίσιμη στη μακροπρόθεσμη διαχείριση περιστατικών;",
    },
    options: {
      en: [
        "To conduct a blameless root cause analysis and implement defensive improvements preventing recurrence.",
        "To permanently decommission all affected network hardware routers and replace them with wireless access points.",
        "To publicly disclose proprietary customer database credentials on social media communication platforms.",
        "To eliminate the requirement for future continuous monitoring and security information logging systems.",
        "To convert all internal relational database tables into non-relational document collections in real time.",
      ],
      el: [
        "Για τη διεξαγωγή ανάλυσης ριζικών αιτιών χωρίς απόδοση ευθυνών και την εφαρμογή μέτρων για αποτροπή επανάληψης.",
        "Για τη μόνιμη απόσυρση όλων των δρομολογητών και την αντικατάστασή τους με ασύρματα σημεία πρόσβασης.",
        "Για τη δημόσια αποκάλυψη των διαπιστευτηρίων πελατών σε πλατφόρμες μέσων κοινωνικής δικτύωσης.",
        "Για την κατάργηση της ανάγκης μελλοντικής συνεχούς παρακολούθησης και καταγραφής αρχείων ασφάλειας.",
        "Για τη μετατροπή όλων των σχεσιακών πινάκων βάσεων δεδομένων σε μη σχεσιακά έγγραφα δεδομένων.",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Lessons Learned ensures that an organization conducts Root Cause Analysis (RCA), identifies detection and response gaps, updates playbooks, and implements controls to prevent similar incidents.",
      el: "Τα Διδάγματα (Lessons Learned) διασφαλίζουν την ανάλυση ριζικών αιτιών (RCA), τον εντοπισμό κενών στην απόκριση και την εφαρμογή νέων μέτρων ώστε να αποτραπεί η επανάληψη του συμβάντος.",
    },
  },
  {
    id: 10,
    question: {
      en: "What primary purpose does Common Event Format (CEF) or JSON schema normalization serve during SIEM log ingestion?",
      el: "Ποιο βασικό σκοπό εξυπηρετεί η κανονικοποίηση αρχείων καταγραφής σε μορφή CEF ή JSON κατά τη συλλογή από το SIEM;",
    },
    options: {
      en: [
        "Encrypting log files with ephemeral quantum key distribution algorithms across wide area networks, across all internal enterprise network segments and endpoints.",
        "Standardizing disparate log formats into a common schema, enabling cross-platform correlation and search.",
        "Compressing log data into lossy audio waveform representations for long-term optical disc archiving, during standard continuous monitoring and administrative audits.",
        "Bypassing operating system access controls during live volatile memory kernel acquisition operations, to ensure high-availability operational compliance across systems.",
        "Disabling system audit logs whenever central processing unit utilization exceeds eighty percent, using standardized organizational security policy configurations.",
      ],
      el: [
        "Κρυπτογράφηση αρχείων καταγραφής με αλγορίθμους κβαντικής διανομής κλειδιών σε δίκτυα ευρείας περιοχής, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Ομογενοποίηση διαφορετικών μορφών καταγραφής σε κοινό σχήμα, επιτρέποντας συσχέτιση και ενιαία αναζήτηση.",
        "Συμπίεση δεδομένων καταγραφής σε ακουστικά σήματα για μακροχρόνια αρχειοθέτηση σε οπτικούς δίσκους, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Παράκαμψη ελέγχων πρόσβασης του λειτουργικού κατά τη συλλογή πτητικής μνήμης RAM από τον πυρήνα, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Απενεργοποίηση καταγραφών όποτε η χρήση του επεξεργαστή υπερβεί το 80% των διαθέσιμων πόρων, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Log normalization transforms raw, heterogeneous logs from firewalls, servers, and applications into standard key-value fields (e.g. src_ip, dst_port), enabling unified search and correlation.",
      el: "Η κανονικοποίηση μετατρέπει ετερογενή logs από διαφορετικές συσκευές σε ενιαία πεδία (π.χ. src_ip, user), επιτρέποντας την κοινή αναζήτηση και τη συσχέτιση κανόνων.",
    },
  },
];

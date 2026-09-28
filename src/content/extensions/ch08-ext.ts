import type { CliLab, HandsOnLab, TechnicalProject, QuizQuestion } from "../types";

export const ch08CliLab: CliLab = {
  id: "ch08-cli",
  title: {
    en: "LDAP Directory & JWT/OAuth2 Identity Security Sandbox",
    el: "Προσομοιωτής Ασφάλειας Καταλόγου LDAP & Ταυτότητας JWT/OAuth2",
  },
  scenario: {
    en: "Query enterprise LDAP directories for user group memberships, decode and inspect JSON Web Tokens (JWT), verify asymmetric cryptographic signatures, and audit OAuth2 scopes.",
    el: "Αναζητήστε μέλη ομάδων σε καταλόγους LDAP, αποκωδικοποιήστε JSON Web Tokens (JWT), επαληθεύστε ψηφιακές υπογραφές και ελέγξτε δικαιώματα OAuth2.",
  },
  initialPrompt: "analyst@identity-ops:~$",
  banner: {
    en: "=== Chapter 8 Identity & Directory Services Sandbox ===\nLDAP Server: ldap://directory.corp.internal:389 | Auth Realm: OIDC/OAuth2\nType 'help' for command assistance or follow the missions below.",
    el: "=== Εργαστήριο Ταυτότητας & Υπηρεσιών Καταλόγου Κεφαλαίου 8 ===\nΔιακομιστής LDAP: ldap://directory.corp.internal:389 | Πλαίσιο: OIDC/OAuth2\nΠληκτρολογήστε 'help' για βοήθεια ή ακολουθήστε τις παρακάτω αποστολές.",
  },
  fileSystem: {
    "sample_jwt.txt": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImtleS0yMDI2LWF1dGgifQ.eyJzdWIiOiJ1c2VyXzk4NDEyIiwibmFtZSI6IlNlY3VyaXR5IEFuYWx5c3QiLCJyb2xlcyI6WyJTT0NfVGllcjIiLCJJbmNpZGVudFJlc3BvbmRlciJdLCJpc3MiOiJodHRwczovL2F1dGguY29ycC5pbnRlcm5hbC9vYXV0aDIvdjEiLCJhdWQiOiJodHRwczovL2FwaS5jb3JwLmludGVybmFsIiwiZXhwIjoxNzkwNjAwMDAwLCJuYmYiOjE3OTA1OTY0MDB9.SIGNATURE_DATA",
    "public.pem": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx6j9Q4Y7vP1k...\n-----END PUBLIC KEY-----",
    "oauth_config.json": '{"client_id":"crm_app","allowed_grants":["authorization_code","refresh_token"],"redirect_uris":["https://crm.corp.internal/callback"]}',
  },
  tasks: [
    {
      id: "task-1",
      title: {
        en: "Query Active Directory / LDAP for User Attributes",
        el: "Αναζήτηση Χαρακτηριστικών Χρήστη σε Active Directory / LDAP",
      },
      description: {
        en: "Execute an LDAP search query to retrieve account details and group memberships for user `jdoe`.",
        el: "Εκτελέστε αναζήτηση LDAP για ανάκτηση στοιχείων λογαριασμού και ομάδων του χρήστη `jdoe`.",
      },
      hint: {
        en: 'Execute: ldapsearch -x -b "dc=corp,dc=internal" "uid=jdoe"',
        el: 'Εκτελέστε: ldapsearch -x -b "dc=corp,dc=internal" "uid=jdoe"',
      },
      solution: 'ldapsearch -x -b "dc=corp,dc=internal" "uid=jdoe"',
      validateRegex: "ldapsearch.*uid=jdoe",
      successMessage: {
        en: "LDAP attributes retrieved: User is member of `cn=SecOps-Admins,ou=Groups,dc=corp,dc=internal`.",
        el: "Τα γνωρίσματα LDAP ανακτήθηκαν: Ο χρήστης είναι μέλος της ομάδας `SecOps-Admins`.",
      },
    },
    {
      id: "task-2",
      title: {
        en: "Decode and Inspect JSON Web Token (JWT) Claims",
        el: "Αποκωδικοποίηση & Έλεγχος Ισχυρισμών (Claims) σε JSON Web Token (JWT)",
      },
      description: {
        en: "Decode the encoded header and payload of `sample_jwt.txt` using `jwt-cli`.",
        el: "Αποκωδικοποιήστε την επικεφαλίδα και το σώμα του `sample_jwt.txt` με το `jwt-cli`.",
      },
      hint: {
        en: "Execute: jwt-cli decode sample_jwt.txt",
        el: "Εκτελέστε: jwt-cli decode sample_jwt.txt",
      },
      solution: "jwt-cli decode sample_jwt.txt",
      validateRegex: "jwt-cli\\s+decode",
      successMessage: {
        en: "JWT payload parsed! Identified algorithm RS256, user roles `SOC_Tier2` and issuer `https://auth.corp.internal`.",
        el: "Το JWT αποκωδικοποιήθηκε! Εντοπίστηκε ο αλγόριθμος RS256 και οι ρόλοι `SOC_Tier2`.",
      },
    },
    {
      id: "task-3",
      title: {
        en: "Verify Asymmetric RS256 JWT Signature",
        el: "Επαλήθευση Ασύμμετρης Υπογραφής RS256 σε JWT",
      },
      description: {
        en: "Cryptographically verify the authenticity of the JWT using the IdP public key `public.pem`.",
        el: "Επαληθεύστε κρυπτογραφικά την εγκυρότητα του JWT με το δημόσιο κλειδί `public.pem`.",
      },
      hint: {
        en: "Execute: jwt-cli verify --key public.pem",
        el: "Εκτελέστε: jwt-cli verify --key public.pem",
      },
      solution: "jwt-cli verify --key public.pem",
      validateRegex: "jwt-cli\\s+verify",
      successMessage: {
        en: "Signature VALID: Token verified authentic and untampered against IdP public key.",
        el: "Υπογραφή ΕΓΚΥΡΗ: Το διακριτικό είναι αυθεντικό και δεν έχει αλλοιωθεί.",
      },
    },
    {
      id: "task-4",
      title: {
        en: "Audit OAuth 2.0 Client Scopes and Grants",
        el: "Έλεγχος Δικαιωμάτων (Scopes) και Αδειών Πελάτη OAuth 2.0",
      },
      description: {
        en: "Inspect active OAuth client configuration for client ID `crm_app` using `oauth-token`.",
        el: "Εξετάστε τις ρυθμίσεις του πελάτη OAuth για το `crm_app` με το εργαλείο `oauth-token`.",
      },
      hint: {
        en: "Execute: oauth-token --inspect client_id=crm_app",
        el: "Εκτελέστε: oauth-token --inspect client_id=crm_app",
      },
      solution: "oauth-token --inspect client_id=crm_app",
      validateRegex: "oauth-token.*crm_app",
      successMessage: {
        en: "OAuth configuration validated! Strict Authorization Code flow with PKCE confirmed.",
        el: "Οι ρυθμίσεις OAuth επιβεβαιώθηκαν! Επιβεβαιώθηκε η χρήση Authorization Code με PKCE.",
      },
    },
  ],
};

export const ch08HandsOnLab: HandsOnLab = {
  title: {
    en: "Enterprise Identity Governance: Federated SSO (SAML/OIDC), Role-Based Access Control & PAM Hardening",
    el: "Επιχειρησιακή Διακυβέρνηση Ταυτότητας: Ομοσπονδιακό SSO (SAML/OIDC), RBAC & Ενίσχυση PAM",
  },
  subtitle: {
    en: "2-Hour Practical Lab: OpenID Connect Identity Provider Setup, Multi-Factor Authentication (MFA), and Privileged Session Recording",
    el: "Εργαστήριο 2 Ωρών: Εγκατάσταση Παρόχου Ταυτότητας OIDC, Ταυτοποίηση Πολλαπλών Παραγόντων (MFA) και Καταγραφή Προνομιακών Συνεδριών",
  },
  duration: {
    en: "~2 Hours (120 minutes)",
    el: "~2 Ώρες (120 λεπτά)",
  },
  overview: {
    en: "In this 2-hour technical laboratory, students implement an enterprise identity governance and Single Sign-On (SSO) architecture. You will configure an OpenID Connect (OIDC) and SAML 2.0 Identity Provider (Keycloak / Authentik), build fine-grained Role-Based Access Control (RBAC) role hierarchies, enforce FIDO2 / WebAuthn and TOTP Multi-Factor Authentication, and deploy a Privileged Access Management (PAM) jump-box proxy enforcing just-in-time access and session recording.",
    el: "Σε αυτό το εργαστήριο 2 ωρών, οι φοιτητές υλοποιούν μια εταιρική αρχιτεκτονική διακυβέρνησης ταυτότητας και Ενιαίας Σύνδεσης (SSO). Θα ρυθμίσετε έναν Πάροχο Ταυτότητας (IdP) με OIDC και SAML 2.0 (Keycloak / Authentik), θα σχεδιάσετε ιεραρχίες ρόλων RBAC, θα επιβάλετε ταυτοποίηση MFA με FIDO2 / WebAuthn και TOTP, και θα αναπτύξετε έναν διακομιστή PAM (Privileged Access Management) με καταγραφή συνεδριών.",
  },
  environment: [
    "Ubuntu 24.04 Server with Docker & Docker Compose",
    "Keycloak IAM / OpenID Connect Identity Provider instance (`http://idp.lab.internal:8080`)",
    "OpenLDAP directory service with phpLDAPadmin interface",
    "Command line tools: `ldapsearch`, `curl`, `jwt-cli`, `oauth2-proxy`, `oathtool`",
  ],
  phases: [
    {
      phaseNumber: 1,
      title: {
        en: "LDAP Directory Schema & Organizational Unit (OU) Hierarchy",
        el: "Σχήμα Καταλόγου LDAP & Ιεραρχία Οργανωσιακών Μονάδων (OU)",
      },
      estimatedTime: { en: "25 min", el: "25 λεπτά" },
      objectives: {
        en: [
          "Deploy an OpenLDAP tree structure with distinct OUs (`Users`, `Groups`, `ServiceAccounts`).",
          "Populate directory with posixAccount and inetOrgPerson schemas.",
          "Implement fine-grained password policy overlays (ppolicy).",
        ],
        el: [
          "Ανάπτυξη ιεραρχίας OpenLDAP με διακριτές OUs (`Users`, `Groups`, `ServiceAccounts`).",
          "Εισαγωγή λογαριασμών με σχήματα posixAccount και inetOrgPerson.",
          "Εφαρμογή πολιτικών κωδικών πρόσβασης μέσω του module ppolicy.",
        ],
      },
      steps: {
        en: [
          "1. Inspect LDAP tree:\n```bash\nldapsearch -x -H ldap://127.0.0.1:389 -b \"dc=corp,dc=internal\" -s sub \"(objectClass=*)\"\n```",
          "2. Add a new department security group in LDIF format:\n```text\ndn: cn=DevSecOps,ou=Groups,dc=corp,dc=internal\nobjectClass: top\nobjectClass: posixGroup\ngidNumber: 5001\nmemberUid: jdoe\n```",
          "3. Commit LDIF changes using `ldapadd`.",
        ],
        el: [
          "1. Έλεγχος δέντρου LDAP:\n```bash\nldapsearch -x -H ldap://127.0.0.1:389 -b \"dc=corp,dc=internal\" -s sub \"(objectClass=*)\"\n```",
          "2. Προσθήκη νέας ομάδας ασφάλειας σε μορφή LDIF:\n```text\ndn: cn=DevSecOps,ou=Groups,dc=corp,dc=internal\nobjectClass: top\nobjectClass: posixGroup\ngidNumber: 5001\nmemberUid: jdoe\n```",
          "3. Εισαγωγή αλλαγών με το `ldapadd`.",
        ],
      },
    },
    {
      phaseNumber: 2,
      title: {
        en: "Federated OpenID Connect (OIDC) & OAuth 2.1 Configuration",
        el: "Ρύθμιση Ομοσπονδιακού OpenID Connect (OIDC) & OAuth 2.1",
      },
      estimatedTime: { en: "45 min", el: "45 λεπτά" },
      objectives: {
        en: [
          "Configure Keycloak Realm federating user identity from the LDAP user federation provider.",
          "Register a confidential client applying Authorization Code Flow with PKCE (Proof Key for Code Exchange).",
          "Inspect ID tokens and Access tokens for standard claims (`sub`, `iss`, `aud`, `exp`, `roles`).",
        ],
        el: [
          "Ρύθμιση Keycloak Realm με ομοσπονδιακή σύνδεση στο LDAP.",
          "Καταχώριση εμπιστευτικού πελάτη με Authorization Code Flow και PKCE.",
          "Έλεγχος των ID tokens και Access tokens για τυπικούς ισχυρισμούς (claims).",
        ],
      },
      steps: {
        en: [
          "1. Link LDAP user federation in Keycloak administration console.\n2. Obtain OAuth2 authorization code by initiating browser redirect flow:\n```bash\ncurl -X POST \"http://idp.lab.internal:8080/realms/corp/protocol/openid-connect/token\" \\\n  -d \"grant_type=authorization_code\" \\\n  -d \"client_id=portal_app\" \\\n  -d \"code=AUTHORIZATION_CODE\" \\\n  -d \"code_verifier=VERIFIER_STRING\" \\\n  -d \"redirect_uri=http://portal.lab.internal/callback\"\n```\n3. Decode and validate received JWT access token.",
        ],
        el: [
          "1. Σύνδεση της ομοσπονδίας χρηστών LDAP στο Keycloak.\n2. Λήψη κωδικού εξουσιοδότησης OAuth2 και ανταλλαγή με token:\n```bash\ncurl -X POST \"http://idp.lab.internal:8080/realms/corp/protocol/openid-connect/token\" \\\n  -d \"grant_type=authorization_code\" \\\n  -d \"client_id=portal_app\" \\\n  -d \"code=AUTHORIZATION_CODE\" \\\n  -d \"code_verifier=VERIFIER_STRING\" \\\n  -d \"redirect_uri=http://portal.lab.internal/callback\"\n```\n3. Αποκωδικοποίηση και επαλήθευση του ληφθέντος JWT token.",
        ],
      },
    },
    {
      phaseNumber: 3,
      title: {
        en: "Multi-Factor Authentication (MFA) & Conditional Access Policies",
        el: "Ταυτοποίηση Πολλαπλών Παραγόντων (MFA) & Πολιτικές Υπό Όρους Πρόσβασης",
      },
      estimatedTime: { en: "30 min", el: "30 λεπτά" },
      objectives: {
        en: [
          "Enforce mandatory Time-based One-Time Password (TOTP) and WebAuthn / FIDO2 authentication for privileged roles.",
          "Configure risk-based Conditional Access rules (blocking logins from unauthorized geographical IP ranges).",
          "Test offline TOTP calculation using `oathtool`.",
        ],
        el: [
          "Επιβολή υποχρεωτικού TOTP και WebAuthn / FIDO2 για προνομιούχους ρόλους.",
          "Ρύθμιση πολιτικών Υπό Όρους Πρόσβασης βάσει επικινδυνότητας (γεωγραφικός αποκλεισμός IPs).",
          "Δοκιμή τοπικού υπολογισμού TOTP με το εργαλείο `oathtool`.",
        ],
      },
      steps: {
        en: [
          "1. Generate TOTP secret key for administrative user:\n```bash\noathtool --totp -b -d 6 \"JBSWY3DPEHPK3PXP\"\n```",
          "2. Configure Keycloak Authentication Flow to make WebAuthn/TOTP execution REQUIRED for `AdminRealm`.\n3. Validate that attempts to access management endpoints without secondary factor are denied.",
        ],
        el: [
          "1. Παραγωγή κωδικού TOTP για διαχειριστικό λογαριασμό:\n```bash\noathtool --totp -b -d 6 \"JBSWY3DPEHPK3PXP\"\n```",
          "2. Ρύθμιση της ροής ταυτοποίησης στο Keycloak ώστε το MFA να είναι ΥΠΟΧΡΕΩΤΙΚΟ για διαχειριστές.\n3. Επιβεβαίωση απόρριψης συνδέσεων χωρίς δεύτερο παράγοντα.",
        ],
      },
    },
    {
      phaseNumber: 4,
      title: {
        en: "Privileged Access Management (PAM) & Session Telemetry",
        el: "Διαχείριση Προνομιακής Πρόσβασης (PAM) & Τηλεμετρία Συνεδριών",
      },
      estimatedTime: { en: "20 min", el: "20 λεπτά" },
      objectives: {
        en: [
          "Deploy a jump-host bastion gateway for administrative SSH/RDP access.",
          "Enforce Just-In-Time (JIT) privilege elevation and ephemeral certificate issuance.",
          "Audit recorded administrative terminal sessions.",
        ],
        el: [
          "Ανάπτυξη διακομιστή Jump-Host (Bastion) για προνομιακή πρόσβαση SSH/RDP.",
          "Επιβολή κλιμάκωσης προνομίων Just-In-Time (JIT) και έκδοση εφήμερων πιστοποιητικών.",
          "Έλεγχος καταγεγραμμένων διαχειριστικών συνεδριών.",
        ],
      },
      steps: {
        en: [
          "1. Configure SSH bastion with PAM OpenSSH Certificate authentication.\n2. Log into bastion and verify automatic session recording in `/var/log/audit/session_recordings/`.\n3. Review compliance audit logs.",
        ],
        el: [
          "1. Ρύθμιση SSH Bastion με ταυτοποίηση πιστοποιητικών OpenSSH.\n2. Σύνδεση στον διακομιστή και επαλήθευση αυτόματης καταγραφής συνεδρίας.\n3. Έλεγχος καταγραφών συμμόρφωσης.",
        ],
      },
    },
  ],
  deliverables: {
    en: [
      "OpenLDAP Directory LDIF Configuration Dump (`directory_schema.ldif`)",
      "Keycloak OIDC Realm JSON Export (`corp_realm_export.json`)",
      "OAuth 2.1 PKI & JWT Access Token Validation Log (`jwt_validation.log`)",
      "Privileged Identity Architecture Report (3–4 pages)",
    ],
    el: [
      "Εξαγωγή Σχήματος Καταλόγου OpenLDAP σε LDIF (`directory_schema.ldif`)",
      "Εξαγωγή Keycloak OIDC Realm σε JSON (`corp_realm_export.json`)",
      "Καταγραφή Επαλήθευσης JWT Access Token & OAuth 2.1 (`jwt_validation.log`)",
      "Τεχνική Έκθεση Αρχιτεκτονικής Προνομιακής Ταυτότητας (3–4 σελίδες)",
    ],
  },
  verificationChecklist: {
    en: [
      "LDAP directory structure enforces unique UIDs and password policy constraints.",
      "Keycloak federates users and issues RS256-signed JWT access tokens with valid claims.",
      "Authorization Code flow with PKCE prevents authorization code interception attacks.",
      "MFA is strictly enforced for all administrative and privileged roles.",
    ],
    el: [
      "Ο κατάλογος LDAP επιβάλλει μοναδικά UIDs και πολιτικές ισχυρών κωδικών.",
      "Το Keycloak εκδίδει υπογεγραμμένα tokens JWT RS256 με έγκυρους ισχυρισμούς.",
      "Η ροή Authorization Code με PKCE αποτρέπει επιθέσεις υποκλοπής κωδικών.",
      "Το MFA είναι αυστηρά υποχρεωτικό για όλους τους προνομιούχους ρόλους.",
    ],
  },
};

export const ch08Project: TechnicalProject = {
  id: "ch08-arch",
  category: {
    en: "Enterprise Architecture & Assessment Blueprint",
    el: "Αρχιτεκτονική Επιχείρησης & Στρατηγικό Πλάνο",
  },
  title: {
    en: "Zero-Trust Identity Provider Architecture & Microservice JWT Token Broker",
    el: "Αρχιτεκτονική Παρόχου Ταυτότητας Μηδενικής Εμπιστοσύνης & Broker Διακριτικών JWT",
  },
  subtitle: {
    en: "Distributed Identity Management, Continuous Adaptive Risk-Based Authentication, and OPA Authorization Engine",
    el: "Κατανεμημένη Διαχείριση Ταυτότητας, Συνεχής Προσαρμοστική Ταυτοποίηση και Μηχανή Εξουσιοδότησης OPA",
  },
  scenario: {
    en: "An international fintech institution running 200 microservices across multi-cloud Kubernetes clusters is replacing its fragmented authentication systems. As Principal Identity Architect, you are commissioned to build a modern Zero-Trust Identity Broker that issues, cryptographically verifies, and revokes JWT/PASETO tokens, integrates with Open Policy Agent (OPA) for Attribute-Based Access Control (ABAC), and calculates continuous adaptive risk scores per request.",
    el: "Ένας διεθνής οργανισμός fintech που λειτουργεί 200 μικροϋπηρεσίες σε Kubernetes αντικαθιστά τα κατακερματισμένα συστήματα ταυτοποίησής του. Ως Επικεφαλής Αρχιτέκτονας Ταυτότητας, σας ανατίθεται να αναπτύξετε έναν σύγχρονο Identity Broker Μηδενικής Εμπιστοσύνης που εκδίδει, επικυρώνει και ανακαλεί διακριτικά JWT/PASETO, ενσωματώνει το Open Policy Agent (OPA) για έλεγχο πρόσβασης βάσει γνωρισμάτων (ABAC) και υπολογίζει συνεχή προσαρμοστική επικινδυνότητα ανά αίτημα.",
  },
  objectives: {
    en: [
      "Develop a high-throughput Python/FastAPI Identity Token Broker service issuing asymmetric RS256 / Ed25519 JWT tokens.",
      "Integrate Open Policy Agent (OPA) with Rego policies enforcing fine-grained ABAC rules.",
      "Implement real-time token revocation via distributed Redis Bloom filters and JTI blacklists.",
      "Formulate a comprehensive Identity Threat Detection and Response (ITDR) playbook.",
    ],
    el: [
      "Ανάπτυξη υπηρεσίας Identity Token Broker σε Python/FastAPI για έκδοση διακριτικών JWT με RS256 / Ed25519.",
      "Ενσωμάτωση του Open Policy Agent (OPA) με γλώσσα Rego για επιβολή κανόνων ABAC.",
      "Υλοποίηση ανάκλησης tokens σε πραγματικό χρόνο μέσω Redis Bloom filters και λιστών JTI.",
      "Σύνταξη πλήρους οδηγού Ανίχνευσης & Απόκρισης σε Απειλές Ταυτότητας (ITDR).",
    ],
  },
  scope: {
    en: [
      "Standards: OAuth 2.1, OIDC Core 1.0, RFC 7519 (JWT), RFC 7636 (PKCE), RFC 9068 (JWT Profile for OAuth 2.0).",
      "Policy engines: Open Policy Agent (OPA) & Rego.",
    ],
    el: [
      "Πρότυπα: OAuth 2.1, OIDC Core 1.0, RFC 7519 (JWT), RFC 7636 (PKCE), RFC 9068.",
      "Μηχανές πολιτικής: Open Policy Agent (OPA) & γλώσσα Rego.",
    ],
  },
  milestones: [
    {
      milestoneNumber: 1,
      title: {
        en: "Core Identity Token Broker & Asymmetric Signer Subsystem",
        el: "Υποσύστημα Κεντρικού Token Broker & Ασύμμετρης Υπογραφής",
      },
      description: {
        en: "Build `token_broker.py` to mint signed JWTs with short expiry (15 min), cryptographically verified against public JWKS endpoints.",
        el: "Ανάπτυξη του `token_broker.py` για έκδοση υπογεγραμμένων JWTs σύντομης διάρκειας (15 λεπτά) με έλεγχο μέσω JWKS.",
      },
      detailedSpec: {
        en: [
          "Integrate STRIDE threat modeling into the software architecture phase with automated data flow diagrams.",
          "Define security non-functional requirements (NFRs) mapped to OWASP ASVS 4.0 Level 3.",
          "Establish secure coding standards and mandatory developer security training curriculum."
],
        el: [
          "Ενσωμάτωση μοντελοποίησης απειλών STRIDE στη φάση σχεδιασμού λογισμικού.",
          "Ορισμός μη-λειτουργικών απαιτήσεων ασφάλειας κατά OWASP ASVS 4.0 Level 3.",
          "Καθιέρωση προτύπων ασφαλούς προγραμματισμού και εκπαίδευσης προγραμματιστών."
],
      },
      deliverable: {
        en: "Token Broker service codebase + JWKS endpoint test verification.",
        el: "Κώδικας υπηρεσίας Token Broker + δοκιμές JWKS.",
      },
    },
    {
      milestoneNumber: 2,
      title: {
        en: "Attribute-Based Access Control (ABAC) with Open Policy Agent",
        el: "Έλεγχος Πρόσβασης Βάσει Γνωρισμάτων (ABAC) με Open Policy Agent (OPA)",
      },
      description: {
        en: "Author Rego policy rules evaluating request context (user clearance, geographical location, time of day, device health state).",
        el: "Σύνταξη κανόνων Rego για αξιολόγηση παραμέτρων αιτήματος (διαβάθμιση, γεωγραφική θέση, κατάσταση συσκευής).",
      },
      detailedSpec: {
        en: [
          "Architect automated CI/CD DevSecOps pipeline with blocking security gates in GitHub Actions / GitLab CI.",
          "Integrate SAST (Semgrep), SCA (Trivy/Dependency-Check), and Secret Scanning (TruffleHog) into every pull request.",
          "Enforce zero critical/high vulnerability policy before code merge approval."
],
        el: [
          "Αρχιτεκτονική αυτοματοποιημένου CI/CD DevSecOps αγωγού με blocking gates στο GitHub Actions.",
          "Ενσωμάτωση SAST (Semgrep), SCA (Trivy) και Secret Scanning (TruffleHog) σε κάθε PR.",
          "Επιβολή πολιτικής μηδενικών κρίσιμων ευπαθειών πριν τη συγχώνευση κώδικα."
],
      },
      deliverable: {
        en: "Rego policy suite (`policy.rego`) + unit test runner.",
        el: "Σουίτα πολιτικών Rego (`policy.rego`) + αυτοματοποιημένες δοκιμές.",
      },
    },
    {
      milestoneNumber: 3,
      title: {
        en: "Real-Time Distributed Token Revocation Engine",
        el: "Μηχανή Ανάκλησης Διακριτικών σε Πραγματικό Χρόνο",
      },
      description: {
        en: "Implement distributed JTI (JWT ID) revocation checks using Redis memory cache with sub-millisecond query latency.",
        el: "Υλοποίηση ελέγχων ανάκλησης JTI μέσω Redis cache με καθυστέρηση κάτω του 1 millisecond.",
      },
      detailedSpec: {
        en: [
          "Implement Software Supply Chain Security conforming to SLSA Level 3 framework.",
          "Generate CycloneDX / SPDX Software Bill of Materials (SBOM) for all containerized applications.",
          "Implement cryptographic container image signing and admission verification using Sigstore Cosign and Kyverno."
],
        el: [
          "Υλοποίηση ασφάλειας εφοδιαστικής αλυσίδας λογισμικού κατά το πλαίσιο SLSA Level 3.",
          "Παραγωγή Software Bill of Materials (SBOM) σε μορφή CycloneDX/SPDX.",
          "Ψηφιακή υπογραφή εικόνων containers με Sigstore Cosign και επαλήθευση εισόδου με Kyverno."
],
      },
      deliverable: {
        en: "Revocation middleware + latency benchmark transcript.",
        el: "Middleware ανάκλησης + αναφορά μετρήσεων καθυστέρησης.",
      },
    },
    {
      milestoneNumber: 4,
      title: {
        en: "Identity Threat Detection & Response (ITDR) Framework",
        el: "Πλαίσιο Ανίχνευσης & Απόκρισης σε Απειλές Ταυτότητας (ITDR)",
      },
      description: {
        en: "Develop behavioral detection rules for Golden SAML attacks, Kerberoasting, and token replay, presenting the final architecture charter.",
        el: "Ανάπτυξη κανόνων ανίχνευσης για επιθέσεις Golden SAML, Kerberoasting και token replay, και παράδοση τελικού φακέλου αρχιτεκτονικής.",
      },
      detailedSpec: {
        en: [
          "Deploy Dynamic Application Security Testing (DAST) and continuous API fuzzing harness in staging environment.",
          "Establish Responsible Vulnerability Disclosure Program (VDP) and bug bounty triage workflow.",
          "Draft comprehensive Enterprise Application Security Assurance Governance Policy."
],
        el: [
          "Ανάπτυξη DAST και συνεχούς API fuzz testing στο περιβάλλον δοκιμών.",
          "Καθιέρωση προγράμματος υπεύθυνης αποκάλυψης ευπαθειών (VDP) και bug bounty.",
          "Σύνταξη Εταιρικής Πολιτικής Διασφάλισης Ασφάλειας Εφαρμογών."
],
      },
      deliverable: {
        en: "ITDR detection ruleset + Executive Identity Security Blueprint (10–12 pages).",
        el: "Σουίτα κανόνων ITDR + Επιτελικό σχέδιο ασφάλειας ταυτότητας (10–12 σελίδες).",
      },
    },
  ],
  deliverables: {
    en: [
      "Complete Token Broker & OPA Middleware Codebase (`/src/token_broker/`)",
      "OPA Rego Policy Repository (`/src/policies/abac.rego`)",
      "Redis Token Revocation Test Suite (`/tests/test_revocation.py`)",
      "Zero-Trust Identity Architecture Strategy Dossier (10–12 pages)",
    ],
    el: [
      "Πλήρης Πηγαίος Κώδικας Token Broker & OPA Middleware (`/src/token_broker/`)",
      "Αποθετήριο Πολιτικών OPA Rego (`/src/policies/abac.rego`)",
      "Σουίτα Δοκιμών Ανάκλησης Tokens με Redis (`/tests/test_revocation.py`)",
      "Φάκελος Στρατηγικής Ταυτότητας Μηδενικής Εμπιστοσύνης (10–12 σελίδες)",
    ],
  },
  rubric: [
    {
      criterion: {
        en: "Token Broker Architecture & Cryptographic Rigor",
        el: "Αρχιτεκτονική Token Broker & Κρυπτογραφική Αυστηρότητα",
      },
      weight: "30%",
      description: {
        en: "Security of key handling, correct RS256/Ed25519 signing, adherence to RFC 9068, and zero nonce reuse.",
        el: "Ασφάλεια διαχείρισης κλειδιών, ορθή υπογραφή RS256/Ed25519 και τήρηση των προδιαγραφών RFC 9068.",
      },
    },
    {
      criterion: {
        en: "OPA Rego Policy Precision & ABAC Coverage",
        el: "Ακρίβεια Πολιτικών OPA Rego & Κάλυψη ABAC",
      },
      weight: "25%",
      description: {
        en: "Granularity of contextual attribute evaluation (IP, time, device posture) and test suite coverage.",
        el: "Λεπτομέρεια αξιολόγησης παραμέτρων (IP, χρόνος, ασφάλεια συσκευής) και πληρότητα δοκιμών.",
      },
    },
    {
      criterion: {
        en: "Real-Time Revocation Throughput & Performance",
        el: "Ταχύτητα Διαμεταγωγής & Απόδοση Ανάκλησης",
      },
      weight: "25%",
      description: {
        en: "Low latency verification (<2ms) under load and resiliency of the distributed Redis cache.",
        el: "Χαμηλή καθυστέρηση ελέγχου (<2ms) υπό φορτίο και ανθεκτικότητα της κατανεμημένης Redis cache.",
      },
    },
    {
      criterion: {
        en: "ITDR Incident Response & Executive Strategy",
        el: "Απόκριση Περιστατικών ITDR & Επιτελική Στρατηγική",
      },
      weight: "20%",
      description: {
        en: "Detection depth against modern credential abuse techniques and executive presentation clarity.",
        el: "Βάθος ανίχνευσης σύγχρονων επιθέσεων κατάχρησης ταυτότητας και σαφήνεια επιτελικής παρουσίασης.",
      },
    },
  ],
};

export const ch08Quiz: QuizQuestion[] = [
  {
    id: 1,
    question: {
      en: "What is the primary security objective of the browser's Same-Origin Policy (SOP)?",
      el: "Ποιος είναι ο κύριος στόχος ασφάλειας της Πολιτικής Ίδιας Προέλευσης (Same-Origin Policy - SOP) στον περιηγητή;",
    },
    options: {
      en: [
        "To compress frontend JavaScript bundles into unencrypted bytecode representations before network transport, during standard continuous monitoring and administrative audits.",
        "To force all web applications to communicate exclusively over unencrypted UDP datagram network sockets, to ensure high-availability operational compliance across systems.",
        "To replace standard relational SQL database tables with non-indexed flat text files stored locally, using standardized organizational security policy configurations.",
        "To prevent scripts loaded from one origin from reading or manipulating DOM/data from another distinct origin.",
        "To restrict operating system hardware CPU clock frequencies during intensive web graphics rendering, across distributed multi-region cloud production environments.",
      ],
      el: [
        "Να συμπιέζει αρχεία JavaScript σε μη κρυπτογραφημένο κώδικα bytecode πριν από τη μετάδοση στο δίκτυο, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Να επιβάλλει σε όλες τις εφαρμογές ιστού να επικοινωνούν αποκλειστικά μέσω μη ασφαλών συνδέσεων UDP, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Να αντικαθιστά σχεσιακές βάσεις δεδομένων με απλά αρχεία κειμένου αποθηκευμένα τοπικά στον υπολογιστή, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Να αποτρέπει scripts από μία προέλευση να διαβάζουν ή να τροποποιούν δεδομένα/DOM από διαφορετική προέλευση.",
        "Να περιορίζει τη συχνότητα του επεξεργαστή κατά την εκτέλεση απαιτητικών γραφικών στον περιηγητή, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
      ],
    },
    correctIndex: 3,
    explanation: {
      en: "The Same-Origin Policy (SOP) restricts how a document or script loaded from one origin (protocol + host + port) can interact with resources from another origin, isolating untrusted web pages.",
      el: "Η Πολιτική Ίδιας Προέλευσης (SOP) περιορίζει τον τρόπο με τον οποίο ένα script από μία προέλευση (πρωτόκολλο + host + θύρα) αλληλεπιδρά με δεδομένα άλλης προέλευσης, προστατεύοντας τον χρήστη.",
    },
  },
  {
    id: 2,
    question: {
      en: "What critical security vulnerability occurs in JSON Web Token (JWT) implementations when accepting the 'none' algorithm header?",
      el: "Ποια κρίσιμη ευπάθεια προκύπτει σε υλοποιήσεις JWT όταν ο εξυπηρετητής αποδέχεται την κεφαλίδα αλγορίθμου 'none';",
    },
    options: {
      en: [
        "The token becomes completely encrypted using 4096-bit asymmetric elliptic curve private keys, during standard continuous monitoring and administrative audits.",
        "The web application automatically locks out all administrative accounts after three failed attempts, using standardized organizational security policy configurations.",
        "The client browser executes an infinite loop attempting to resolve external domain nameservers, across distributed multi-region cloud production environments.",
        "The token payload is converted into unformatted plain text and printed to physical network printers, without requiring manual intervention from systems engineering staff.",
        "An attacker can forge arbitrary claims without providing a valid cryptographic signature, bypassing authentication.",
      ],
      el: [
        "Το token κρυπτογραφείται πλήρως χρησιμοποιώντας ασύμμετρα κλειδιά ελλειπτικών καμπυλών 4096-bit, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Η εφαρμογή κλειδώνει αυτόματα όλους τους διαχειριστικούς λογαριασμούς μετά από τρεις αποτυχίες, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Ο περιηγητής εκτελεί ατέρμονα βρόχο προσπαθώντας να επιλύσει εξωτερικούς διακομιστές DNS, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Το περιεχόμενο του token μετατρέπεται σε απλό κείμενο και αποστέλλεται σε εκτυπωτές δικτύου, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Ο επιτιθέμενος μπορεί να πλαστογραφήσει αυθαίρετα claims χωρίς υπογραφή, παρακάμπτοντας τον έλεγχο.",
      ],
    },
    correctIndex: 4,
    explanation: {
      en: "If a server accepts alg='none', it treats unsigned tokens as valid, allowing attackers to modify the payload (e.g. changing user_id to admin) and gain unauthorized administrative access.",
      el: "Εάν ο διακομιστής αποδέχεται alg='none', θεωρεί έγκυρα τα ανυπόγραφα tokens, επιτρέποντας στον επιτιθέμενο να τροποποιήσει τα claims (π.χ. role: admin) και να αποκτήσει πλήρη πρόσβαση.",
    },
  },
  {
    id: 3,
    question: {
      en: "What primary defense does Content Security Policy (CSP) provide against Cross-Site Scripting (XSS) attacks?",
      el: "Ποια βασική άμυνα παρέχει η Πολιτική Ασφάλειας Περιεχομένου (CSP) κατά των επιθέσεων Cross-Site Scripting (XSS);",
    },
    options: {
      en: [
        "It restricts where scripts, stylesheets, and images can be loaded from and disables inline script execution.",
        "It compiles client-side JavaScript into proprietary obfuscated binary assemblies during transport, using standardized organizational security policy configurations.",
        "It automatically deletes user browser cookies whenever an unencrypted HTTP link is clicked, across distributed multi-region cloud production environments.",
        "It encrypts database tables using ephemeral symmetric block cipher keys generated per request, without requiring manual intervention from systems engineering staff.",
        "It prevents remote users from establishing virtual private network connections to the web host, to mitigate potential unauthorized system configuration drift.",
      ],
      el: [
        "Περιορίζει τις πηγές από τις οποίες φορτώνονται scripts και εικόνες και απαγορεύει την εκτέλεση inline scripts.",
        "Μεταγλωττίζει τον κώδικα JavaScript σε ιδιόκτητα δυαδικά αρχεία κατά τη μεταφορά στο δίκτυο, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Διαγράφει αυτόματα τα cookies του περιηγητή όποτε επιλεγεί ένας μη κρυπτογραφημένος σύνδεσμος HTTP, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Κρυπτογραφεί πίνακες βάσεων δεδομένων με εφήμερα συμμετρικά κλειδιά ανά αίτημα χρήστη, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Αποτρέπει απομακρυσμένους χρήστες από τη δημιουργία συνδέσεων VPN προς τον εξυπηρετητή ιστού, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "CSP headers (e.g. script-src 'self' 'nonce-...') instruct the browser to only execute scripts from trusted whitelisted domains, blocking injected malicious inline scripts.",
      el: "Οι κεφαλίδες CSP ορίζουν ποιες πηγές scripts είναι έμπιστες και απαγορεύουν την εκτέλεση μη εγκεκριμένων inline scripts, εξουδετερώνοντας επιθέσεις XSS.",
    },
  },
  {
    id: 4,
    question: {
      en: "What is Broken Object Level Authorization (BOLA / IDOR) in API security?",
      el: "Τι είναι η Ευπάθεια Εξουσιοδότησης σε Επίπεδο Αντικειμένου (BOLA / IDOR) στην ασφάλεια APIs;",
    },
    options: {
      en: [
        "An API transmits data over unencrypted HTTP channels rather than enforcing TLS 1.3 encryption, across distributed multi-region cloud production environments.",
        "An API fails to validate whether the authenticated user has permission to access the requested resource ID.",
        "An API returns structured JSON data instead of formatted XML document responses to clients, without requiring manual intervention from systems engineering staff.",
        "An API rate-limiting token bucket overflows during high-volume legitimate network traffic, to mitigate potential unauthorized system configuration drift.",
        "An API server crashes due to an unhandled memory pointer null dereference in kernel drivers, in accordance with modern zero trust architectural principles.",
      ],
      el: [
        "Το API μεταδίδει δεδομένα μέσω μη κρυπτογραφημένου HTTP αντί να επιβάλλει κρυπτογράφηση TLS 1.3, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Το API παραλείπει να ελέγξει αν ο ταυτοποιημένος χρήστης έχει δικαίωμα πρόσβασης στο συγκεκριμένο ID πόρου.",
        "Το API επιστρέφει δομημένα δεδομένα JSON αντί για έγγραφα XML στους πελάτες που το καλούν, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Ο μηχανισμός περιορισμού ρυθμού (token bucket) του API υπερχειλίζει κατά τη διάρκεια νόμιμης κίνησης, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Ο εξυπηρετητής του API καταρρέει λόγω σφάλματος μη έγκυρου δείκτη μνήμης σε οδηγούς συσκευών, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "BOLA/IDOR happens when an API endpoint takes an object identifier (e.g. /api/users/102/invoices) without verifying that the requesting user actually owns or is permitted to view that object.",
      el: "Το BOLA/IDOR συμβαίνει όταν ένα API δέχεται ένα ID πόρου (π.χ. /api/invoices/105) χωρίς να ελέγξει αν ο συνδεδεμένος χρήστης είναι πράγματι ο νόμιμος κάτοχος του συγκεκριμένου πόρου.",
    },
  },
  {
    id: 5,
    question: {
      en: "What primary security mechanism does HTTP Strict Transport Security (HSTS) enforce on web clients?",
      el: "Ποιον βασικό μηχανισμό ασφάλειας επιβάλλει το HTTP Strict Transport Security (HSTS) στους περιηγητές ιστού;",
    },
    options: {
      en: [
        "It requires users to enter multi-factor authentication credentials before viewing any public web pages, without requiring manual intervention from systems engineering staff.",
        "It converts relational database tables into non-relational document collections in real time, to mitigate potential unauthorized system configuration drift.",
        "It forces browsers to interact with the domain exclusively over encrypted HTTPS, preventing SSL stripping.",
        "It disables local operating system firewall rules during client file download operations, in accordance with modern zero trust architectural principles.",
        "It encrypts all network packets using post-quantum lattice asymmetric algorithms across the LAN, before committing changes to central production repository nodes.",
      ],
      el: [
        "Απαιτεί από τους χρήστες ταυτοποίηση πολλαπλών παραγόντων πριν την προβολή δημόσιων ιστοσελίδων, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Μετατρέπει σχεσιακούς πίνακες βάσεων δεδομένων σε μη σχεσιακά έγγραφα δεδομένων σε πραγματικό χρόνο, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Επιβάλλει στους περιηγητές να συνδέονται αποκλειστικά μέσω κρυπτογραφημένου HTTPS, αποτρέποντας SSL stripping.",
        "Απενεργοποιεί τους τοπικούς κανόνες firewall του υπολογιστή κατά τη λήψη αρχείων από το διαδίκτυο, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Κρυπτογραφεί όλα τα πακέτα δικτύου με μετα-κβαντικούς αλγορίθμους πλεγμάτων στο τοπικό δίκτυο, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "HSTS (Strict-Transport-Security header) instructs browsers to automatically convert all HTTP requests to HTTPS and reject connections if certificate errors occur, stopping SSL stripping attacks.",
      el: "Το HSTS αναγκάζει τον περιηγητή να μετατρέπει αυτόματα κάθε κλήση HTTP σε HTTPS και απαγορεύει τη σύνδεση εάν υπάρχουν σφάλματα πιστοποιητικού, αποτρέποντας επιθέσεις SSL stripping.",
    },
  },
  {
    id: 6,
    question: {
      en: "How does API Rate Limiting using the Token Bucket algorithm protect backend application services?",
      el: "Πώς προστατεύει τις υπηρεσίες εφαρμογών ο Περιορισμός Ρυθμού (Rate Limiting) με τον αλγόριθμο Token Bucket;",
    },
    options: {
      en: [
        "By automatically encrypting all database records with ephemeral AES-256 session keys, to mitigate potential unauthorized system configuration drift.",
        "By replacing relational SQL database queries with unindexed flat text files stored locally, in accordance with modern zero trust architectural principles.",
        "By disabling operating system kernel address space layout randomization protections during boot, before committing changes to central production repository nodes.",
        "By restricting client request rates, preventing brute-force attacks and resource exhaustion (DoS).",
        "By routing all outgoing HTTP requests through unauthenticated external dynamic proxy servers, under standard operating procedures defined in corporate ISMS policies.",
      ],
      el: [
        "Κρυπτογραφώντας αυτόματα όλες τις εγγραφές της βάσης δεδομένων με εφήμερα κλειδιά AES-256, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Αντικαθιστώντας ερωτήματα SQL με μη ευρετηριασμένα αρχεία κειμένου αποθηκευμένα τοπικά στον δίσκο, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Απενεργοποιώντας την προστασία ASLR του πυρήνα του λειτουργικού συστήματος κατά την εκκίνηση, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Περιορίζοντας τον ρυθμό κλήσεων ανά πελάτη, αποτρέποντας επιθέσεις brute-force και εξάντληση πόρων (DoS).",
        "Δρομολογώντας όλα τα εξερχόμενα αιτήματα HTTP μέσω μη εξουσιοδοτημένων εξωτερικών διακομιστών proxy, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
      ],
    },
    correctIndex: 3,
    explanation: {
      en: "Rate limiting restricts the number of API requests an entity can make in a given timeframe (e.g. 100 req/min), preventing brute-force attacks, scraping, and Denial of Service.",
      el: "Το Rate Limiting περιορίζει τον αριθμό κλήσεων ανά χρήστη ή IP σε ορισμένο χρόνο (π.χ. 100 req/min), προστατεύοντας το σύστημα από επιθέσεις εξάντλησης πόρων και brute-force.",
    },
  },
  {
    id: 7,
    question: {
      en: "What primary vulnerability is addressed by enforcing Cross-Origin Resource Sharing (CORS) headers properly?",
      el: "Ποια βασική ευπάθεια αντιμετωπίζεται με τη σωστή ρύθμιση των κεφαλίδων Cross-Origin Resource Sharing (CORS);",
    },
    options: {
      en: [
        "Preventing network switches from dropping fragmented TCP packets during peak traffic periods, in accordance with modern zero trust architectural principles.",
        "Preventing database servers from executing recursive join operations on large index tables, before committing changes to central production repository nodes.",
        "Preventing client workstations from updating operating system security patches automatically, under standard operating procedures defined in corporate ISMS policies.",
        "Preventing web servers from generating self-signed X.509 digital certificates during startup, across all internal enterprise network segments and endpoints.",
        "Preventing unauthorized external web domains from reading sensitive API responses via client browsers.",
      ],
      el: [
        "Αποτροπή απόρριψης τεμαχισμένων πακέτων TCP από μεταγωγείς δικτύου σε περιόδους αιχμής, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Αποτροπή εκτέλεσης αναδρομικών ερωτημάτων join από εξυπηρετητές βάσεων δεδομένων, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Αποτροπή αυτόματης ενημέρωσης διορθώσεων ασφάλειας στους υπολογιστές των τελικών χρηστών, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Αποτροπή δημιουργίας αυτο-υπογεγραμμένων ψηφιακών πιστοποιητικών X.509 κατά την εκκίνηση, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Αποτροπή μη εξουσιοδοτημένων εξωτερικών domains από την ανάγνωση ευαίσθητων δεδομένων API μέσω περιηγητών.",
      ],
    },
    correctIndex: 4,
    explanation: {
      en: "CORS headers (Access-Control-Allow-Origin) allow servers to explicitly specify which external web origins are permitted to read API response data in the context of cross-origin browser requests.",
      el: "Οι κεφαλίδες CORS επιτρέπουν στον εξυπηρετητή να ορίζει ρητά ποια εξωτερικά domains επιτρέπεται να διαβάζουν απαντήσεις API μέσω του περιηγητή του χρήστη.",
    },
  },
  {
    id: 8,
    question: {
      en: "What security issue occurs in GraphQL APIs when query depth and complexity limits are not enforced?",
      el: "Ποιο πρόβλημα ασφάλειας προκύπτει σε APIs GraphQL όταν δεν επιβάλλονται όρια βάθους και πολυπλοκότητας ερωτημάτων;",
    },
    options: {
      en: [
        "Attackers can construct deeply nested circular queries that exhaust server CPU and database resources (DoS).",
        "Attackers can decrypt TLS private keys using classical modular factoring algorithms in transit, before committing changes to central production repository nodes.",
        "Attackers can forge biometric fingerprint authentication signatures on mobile devices, under standard operating procedures defined in corporate ISMS policies.",
        "Attackers can alter local operating system routing tables to redirect local network traffic, across all internal enterprise network segments and endpoints.",
        "Attackers can force client web browsers to clear local web storage and indexed databases, during standard continuous monitoring and administrative audits.",
      ],
      el: [
        "Οι επιτιθέμενοι μπορούν να στείλουν βαθιά εμφωλευμένα κυκλικά ερωτήματα που εξαντλούν τη CPU και τη βάση (DoS).",
        "Οι επιτιθέμενοι μπορούν να αποκρυπτογραφήσουν ιδιωτικά κλειδιά TLS με κλασικούς αλγορίθμους, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Οι επιτιθέμενοι μπορούν να πλαστογραφήσουν βιομετρικά αποτυπώματα σε κινητά τηλέφωνα, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Οι επιτιθέμενοι μπορούν να αλλάξουν τους πίνακες δρομολόγησης του τοπικού δικτύου, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Οι επιτιθέμενοι μπορούν να εξαναγκάσουν τους περιηγητές να διαγράψουν την τοπική αποθήκευση, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Because GraphQL allows clients to request relational data, attackers can submit nested recursive queries (e.g. author -> posts -> author -> posts...) causing excessive database joins and server crashes.",
      el: "Επειδή το GraphQL επιτρέπει αιτήματα σχεσιακών δεδομένων, οι επιτιθέμενοι μπορούν να στείλουν αναδρομικά εμφωλευμένα ερωτήματα προκαλώντας εξάντληση πόρων και κατάρρευση του διακομιστή.",
    },
  },
  {
    id: 9,
    question: {
      en: "How does setting the 'HttpOnly' flag on a session cookie protect web application users?",
      el: "Πώς προστατεύει τους χρήστες μιας εφαρμογής ιστού η ρύθμιση της ιδιότητας 'HttpOnly' σε ένα session cookie;",
    },
    options: {
      en: [
        "It encrypts database tables using ephemeral symmetric block cipher keys generated per request, under standard operating procedures defined in corporate ISMS policies.",
        "It prevents client-side JavaScript (e.g. document.cookie) from accessing the cookie, mitigating XSS token theft.",
        "It forces all web application users to connect through dedicated hardware IPsec virtual private networks, across all internal enterprise network segments and endpoints.",
        "It automatically compresses image files before transmitting them across wide area network links, during standard continuous monitoring and administrative audits.",
        "It prevents operating system kernel crashes caused by unhandled dynamic memory pointer dereferences, to ensure high-availability operational compliance across systems.",
      ],
      el: [
        "Κρυπτογραφεί πίνακες βάσεων δεδομένων με εφήμερα συμμετρικά κλειδιά ανά αίτημα χρήστη, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Εμποδίζει την πρόσβαση στο cookie μέσω JavaScript (document.cookie), αποτρέποντας την υποκλοπή μέσω XSS.",
        "Υποχρεώνει όλους τους χρήστες να συνδέονται μέσω ιδιωτικών τούνελ IPsec VPN πριν από την πλοήγηση, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Συμπιέζει αυτόματα αρχεία εικόνων πριν από τη μετάδοσή τους σε δίκτυα ευρείας περιοχής, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Αποτρέπει καταρρεύσεις του πυρήνα του λειτουργικού συστήματος από μη έγκυρους δείκτες μνήμης, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "The HttpOnly flag blocks client-side scripts from reading the cookie via document.cookie. Even if an attacker executes XSS, they cannot directly steal the session cookie value.",
      el: "Η ιδιότητα HttpOnly απαγορεύει την ανάγνωση του cookie από scripts στον περιηγητή (document.cookie), εμποδίζοντας την άμεση υποκλοπή του session token σε περίπτωση επίθεσης XSS.",
    },
  },
  {
    id: 10,
    question: {
      en: "What is the primary operational role of a Web Application Firewall (WAF) in application defense?",
      el: "Ποιος είναι ο βασικός επιχειρησιακός ρόλος ενός Web Application Firewall (WAF) στην άμυνα εφαρμογών;",
    },
    options: {
      en: [
        "To compile unprivileged application source code into high-performance kernel assembly drivers, across all internal enterprise network segments and endpoints.",
        "To replace traditional symmetric block cipher algorithms with post-quantum lattice public-key primitives.",
        "To inspect incoming HTTP/HTTPS traffic at Layer 7, detecting and filtering web attacks like SQLi and XSS.",
        "To establish high-speed direct peer-to-peer tunnels across transoceanic submarine communication cables, to ensure high-availability operational compliance across systems.",
        "To manage physical facility access control badges and employee biometric fingerprint sensor databases, using standardized organizational security policy configurations.",
      ],
      el: [
        "Να μεταγλωττίζει τον πηγαίο κώδικα εφαρμογών σε οδηγούς συσκευών πυρήνα υψηλής υπολογιστικής ταχύτητας, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Να αντικαθιστά συμμετρικούς αλγορίθμους με μετα-κβαντικά ασύμμετρα κρυπτογραφικά σχήματα πλεγμάτων.",
        "Να ελέγχει την κίνηση HTTP/HTTPS στο Επίπεδο 7, εντοπίζοντας και απορρίπτοντας επιθέσεις όπως SQLi και XSS.",
        "Να δημιουργεί τούνελ peer-to-peer υψηλής ταχύτητας σε υποθαλάσσια καλώδια διεθνών επικοινωνιών, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Να διαχειρίζεται κάρτες φυσικής πρόσβασης στις εγκαταστάσεις και βάσεις βιομετρικών δεδομένων προσωπικού, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "A WAF inspects application-layer HTTP requests and responses, applying rules (e.g. OWASP Core Rule Set) to filter out common web exploits before they reach backend application servers.",
      el: "Το WAF ελέγχει τα αιτήματα HTTP/HTTPS στο επίπεδο εφαρμογής (Layer 7), εφαρμόζοντας κανόνες προστασίας για τον αποκλεισμό επιθέσεων ιστού πριν φτάσουν στον εξυπηρετητή.",
    },
  },
];

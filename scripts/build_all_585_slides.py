#!/usr/bin/env python3
# scripts/build_all_585_slides.py
import json
import os
import sys

def generate_presentation_ts():
    # Load chapter metadata definitions
    chapters_data = []
    
    # 13 Chapters metadata
    ch_definitions = [
        {
            "num": 1,
            "part": 1,
            "title": {"en": "Foundations & Security Principles", "el": "Θεμελιώδεις Αρχές Κυβερνοασφάλειας"},
            "subtitle": {"en": "The CIA Triad, Threat Modeling, Saltzer-Schroeder Rules & Defense in Depth", "el": "Η Τριάδα CIA, Μοντελοποίηση Απειλών, Κανόνες Saltzer-Schroeder & Άμυνα σε Βάθος"},
            "topics": [
                "CIA Triad & Parkerian Hexad", "Threat vs Vulnerability vs Risk", "Saltzer & Schroeder Principles",
                "Defense in Depth Multi-Tier Architecture", "Target 2013 & Capital One 2019 Incidents",
                "Enterprise Security Assessment & Lab"
            ]
        },
        {
            "num": 2,
            "part": 1,
            "title": {"en": "Operating System & Memory Security", "el": "Ασφάλεια Λειτουργικών Συστημάτων & Μνήμης"},
            "subtitle": {"en": "Kernel Mode, Process Isolation, Buffer Overflows & Modern Mitigations", "el": "Kernel Mode, Απομόνωση Διεργασιών, Buffer Overflows & Σύγχρονα Μέτρα Προστασίας"},
            "topics": [
                "CPU Rings & Kernel / User Mode", "Process Memory (Stack, Heap, Text)", "Stack Smashing & Shellcode",
                "ASLR, DEP/NX & Stack Canaries", "Dirty COW (CVE-2016-5195) & EternalBlue",
                "Linux Privilege Audit & SUID Hardening"
            ]
        },
        {
            "num": 3,
            "part": 2,
            "title": {"en": "Threat Actors, Motivation & Malware", "el": "Δράστες Απειλών, Κίνητρα & Κακόβουλο Λογισμικό"},
            "subtitle": {"en": "Nation-State APTs, Ransomware Ecosystem, Rootkits & Supply Chains", "el": "Κρατικοί Δράστες (APTs), Οικοσύστημα Ransomware, Rootkits & Εφοδιαστική Αλυσίδα"},
            "topics": [
                "Nation-State APTs vs Cybercriminals", "Viruses, Worms, Trojans & Rootkits", "Ransomware Economics & RaaS",
                "MITRE ATT&CK & Cyber Kill Chain", "Stuxnet & NotPetya Destruction",
                "Threat Intelligence & Malware Analysis Lab"
            ]
        },
        {
            "num": 4,
            "part": 2,
            "title": {"en": "Social Engineering & Human Factors", "el": "Κοινωνική Μηχανική & Ανθρώπινος Παράγοντας"},
            "subtitle": {"en": "Phishing Vectors, Cognitive Biases, Vishing & Organizational Resilience", "el": "Μορφές Phishing, Γνωστικές Προκαταλήψεις, Vishing & Οργανωσιακή Ανθεκτικότητα"},
            "topics": [
                "Cialdini's Weapons of Influence", "Spear Phishing, Whaling & Business Email Compromise", "Vishing, Smishing & MFA Fatigue",
                "Baiting & Pretexting Scenarios", "Twitter 2020 Admin SIM-Swap & RSA 2011",
                "Security Awareness & Anti-Phishing Defense Lab"
            ]
        },
        {
            "num": 5,
            "part": 2,
            "title": {"en": "Network Attacks & Perimeter Defense", "el": "Δικτυακές Επιθέσεις & Περιμετρική Άμυνα"},
            "subtitle": {"en": "OSI Security, ARP/DNS Spoofing, DDoS, Firewalls & Network Segmentation", "el": "Ασφάλεια OSI, ARP/DNS Spoofing, DDoS, Firewalls & Κατάτμηση Δικτύου"},
            "topics": [
                "OSI Layer 2/3 Attacks (ARP & IP Spoofing)", "TCP SYN Flood & Session Hijacking", "DNS Cache Poisoning & BGP Hijacking",
                "Next-Gen Firewalls, IDS & IPS", "Mirai 1.2 Tbps DDoS & Kaminsky DNS Bug",
                "Wireshark Inspection & Snort Rules Lab"
            ]
        },
        {
            "num": 6,
            "part": 3,
            "title": {"en": "Cryptography & Public Key Infrastructure", "el": "Κρυπτογραφία & Υποδομή Δημόσιου Κλειδιού"},
            "subtitle": {"en": "Symmetric Ciphers, Asymmetric Math, Digital Signatures, PKI & TLS 1.3", "el": "Συμμετρικοί Αλγόριθμοι, Ασύμμετρα Μαθηματικά, Ψηφιακές Υπογραφές, PKI & TLS 1.3"},
            "topics": [
                "Kerckhoffs's Principle & AES-256-GCM", "Asymmetric Cryptography (RSA / ECC)", "Hashes, SHA-2/3 & HMAC",
                "PKI Hierarchy & X.509 Certificate Chain", "TLS 1.3 Handshake & DigiNotar Breach",
                "OpenSSL CA & Cryptographic Lab"
            ]
        },
        {
            "num": 7,
            "part": 3,
            "title": {"en": "Identity, Authentication & Access Control", "el": "Ταυτότητα, Αυθεντικοποίηση & Έλεγχος Πρόσβασης"},
            "subtitle": {"en": "AAA Framework, MFA/FIDO2, SSO, OAuth2/OIDC, RBAC/ABAC & Zero Trust", "el": "Πλαίσιο AAA, MFA/FIDO2, SSO, OAuth2/OIDC, RBAC/ABAC & Μηδενική Εμπιστοσύνη"},
            "topics": [
                "Identification, Authentication & Authorization", "MFA, TOTP & FIDO2 / WebAuthn", "SAML 2.0, OAuth 2.0 & OpenID Connect",
                "RBAC vs ABAC Matrix Models", "Uber 2022 MFA Fatigue & Okta / Lapsus$",
                "Keycloak IAM & Zero Trust Architecture Lab"
            ]
        },
        {
            "num": 8,
            "part": 3,
            "title": {"en": "Secure Software Engineering & Vulnerabilities", "el": "Ασφαλής Ανάπτυξη Λογισμικού & Ευπάθειες"},
            "subtitle": {"en": "SSDLC, Threat Modeling (STRIDE), OWASP Top 10, SAST/DAST & Code Review", "el": "Ασφαλές SDLC, Μοντελοποίηση Απειλών (STRIDE), OWASP Top 10, SAST/DAST & Έλεγχος Κώδικα"},
            "topics": [
                "Shift-Left Security & Secure SDLC", "STRIDE Threat Modeling Methodology", "OWASP Top 10 (SQLi, XSS, CSRF, SSRF)",
                "SAST, DAST & Software Composition Analysis", "Equifax Struts & Log4Shell Disasters",
                "DevSecOps CI/CD Pipeline & Code Hardening Lab"
            ]
        },
        {
            "num": 9,
            "part": 3,
            "title": {"en": "Security Auditing, Pen Testing & Vulnerability Mgmt", "el": "Έλεγχος Ασφάλειας, Penetration Testing & Διαχείριση Ευπαθειών"},
            "subtitle": {"en": "PTES Methodology, Reconnaissance, Scanning, Exploitation, CVSS v3.1 & Patching", "el": "Μεθοδολογία PTES, Αναγνώριση, Σάρωση, Exploitation, CVSS v3.1 & Επιδιόρθωση"},
            "topics": [
                "Auditing vs Vulnerability Assessment vs Pen Testing", "PTES 7-Phase Penetration Testing Standard", "Nmap Port Scanning & Service Enumeration",
                "Metasploit Exploitation & Privilege Escalation", "CVSS v3.1 Vector Scoring Calculation",
                "Nessus Vulnerability Scan & Remediation Lab"
            ]
        },
        {
            "num": 10,
            "part": 4,
            "title": {"en": "Security Operations, Threat Detection & Incident Response", "el": "Επιχειρησιακή Ασφάλεια, Ανίχνευση & Απόκριση σε Περιστατικά"},
            "subtitle": {"en": "SOC Tier 1-3, SIEM (Splunk/ELK), SOAR, EDR/XDR, NIST SP 800-61r2 & Threat Hunting", "el": "SOC Tier 1-3, SIEM (Splunk/ELK), SOAR, EDR/XDR, NIST SP 800-61r2 & Αναζήτηση Απειλών"},
            "topics": [
                "Security Operations Center (SOC) Tiering", "SIEM Log Aggregation & Correlation Rules", "SOAR Automated Playbooks & EDR/XDR",
                "NIST SP 800-61r2 Incident Response Phases", "SolarWinds SUNBURST & Sony Pictures Attack",
                "Splunk Threat Hunting & Incident Response Lab"
            ]
        },
        {
            "num": 11,
            "part": 4,
            "title": {"en": "Malware Analysis, Reverse Engineering & Forensics", "el": "Ανάλυση Κακόβουλου Λογισμικού & Ψηφιακή Εγκληματολογία"},
            "subtitle": {"en": "Static/Dynamic Analysis, Cuckoo Sandbox, Ghidra, Volatility Memory Triage & Custody", "el": "Στατική/Δυναμική Ανάλυση, Cuckoo Sandbox, Ghidra, Ανάλυση Μνήμης Volatility & Αλυσίδα Επιμέλειας"},
            "topics": [
                "Isolated Safe Lab Setup & Static Analysis", "Dynamic Sandboxing & Behavioral Triage", "Ghidra Reverse Engineering & Assembly Basics",
                "Chain of Custody & Order of Volatility", "Colonial Pipeline & Emotet Forensic Triage",
                "Volatility 3 Memory Extraction & Forensic Lab"
            ]
        },
        {
            "num": 12,
            "part": 4,
            "title": {"en": "Business Continuity, Disaster Recovery & Resilience", "el": "Επιχειρησιακή Συνέχεια, Ανάκαμψη από Καταστροφές & Ανθεκτικότητα"},
            "subtitle": {"en": "BIA, RPO vs RTO, Hot/Warm/Cold Sites, 3-2-1 Backups, Cyber Insurance & Crisis Mgmt", "el": "BIA, RPO vs RTO, Hot/Warm/Cold Sites, Αντίγραφα 3-2-1, Cyber Insurance & Διαχείριση Κρίσεων"},
            "topics": [
                "Business Impact Analysis (BIA) & MTD", "Recovery Point (RPO) vs Recovery Time (RTO)", "Hot, Warm & Cold Secondary Datacenter Sites",
                "3-2-1 Backup Strategy & Immutable Snapshots", "Maersk NotPetya Recovery & OVHcloud Fire",
                "Enterprise DR Drill & Failover Simulation Lab"
            ]
        },
        {
            "num": 13,
            "part": 4,
            "title": {"en": "Governance, Risk, Compliance & Emerging Frontiers", "el": "Διακυβέρνηση, Διαχείριση Κινδύνου, Κανονισμοί & Νέοι Ορίζοντες"},
            "subtitle": {"en": "NIST CSF 2.0, ISO 27001, GDPR, NIS2, DORA, AI Threats (LLMs) & Post-Quantum Crypto", "el": "NIST CSF 2.0, ISO 27001, GDPR, NIS2, DORA, Απειλές AI (LLMs) & Μετα-Κβαντική Κρυπτογραφία"},
            "topics": [
                "CISO Governance & NIST CSF 2.0 / ISO 27001", "EU Regulations: GDPR, NIS2 Directive & DORA", "Enterprise Third-Party Risk Management",
                "AI Security: LLM Prompt Injection & Deepfakes", "Post-Quantum Cryptography (ML-KEM / ML-DSA)",
                "Full Course Synthesis, Capstone & Final Exam"
            ]
        }
    ]

    all_chapter_slides = []

    for defn in ch_definitions:
        ch_num = defn["num"]
        ch_slides = []

        # 45 Slides per Chapter
        for s_idx in range(1, 46):
            hour = 1 if s_idx <= 15 else (2 if s_idx <= 30 else 3)
            h_title = {
                1: {"en": f"Hour 1: Core Principles, Concepts & Definitions", "el": f"Ώρα 1: Βασικές Αρχές, Έννοιες & Ορισμοί"},
                2: {"en": f"Hour 2: Architectural Deep-Dive, Protocols & Defensive Controls", "el": f"Ώρα 2: Αρχιτεκτονική Εμβάθυνση, Πρωτόκολλα & Μηχανισμοί"},
                3: {"en": f"Hour 3: Real Incidents, Lab Walkthrough & Knowledge Assessment", "el": f"Ώρα 3: Πραγματικά Περιστατικά, Εργαστήριο & Αξιολόγηση"}
            }[hour]

            # Assign Layout
            if s_idx == 1:
                layout = "hero"
            elif s_idx in [5, 12, 19, 25, 34]:
                layout = "diagram"
            elif s_idx in [6, 13, 20, 26, 35]:
                layout = "split-compare"
            elif s_idx in [7, 14, 21, 27, 36]:
                layout = "code-terminal"
            elif s_idx in [8, 22, 31, 32, 37]:
                layout = "case-study"
            elif s_idx in [9, 28, 38, 39, 40]:
                layout = "lab-preview"
            elif s_idx in [10, 15, 29, 30, 41, 42, 43]:
                layout = "discussion-quiz"
            elif s_idx in [44, 45]:
                layout = "summary-matrix"
            else:
                layout = "concept-grid"

            slide_obj = create_slide_content(ch_num, defn, s_idx, hour, h_title, layout)
            ch_slides.append(slide_obj)

        all_chapter_slides.append({
            "chapterNum": ch_num,
            "chapterTitle": defn["title"],
            "chapterSubtitle": defn["subtitle"],
            "slides": ch_slides
        })

    # Generate TypeScript file
    out_ts = f"""// src/content/presentation-decks.ts
// Comprehensive 13-Chapter Classroom Presentation Deck (45 Slides per Chapter = 585 Slides)
// Tailored for landscape 16:9 widescreen presentation mode with zero vertical scrolling.

export type SlideLayout =
  | "hero"
  | "concept-grid"
  | "diagram"
  | "split-compare"
  | "code-terminal"
  | "case-study"
  | "lab-preview"
  | "discussion-quiz"
  | "summary-matrix";

export interface DeckSlide {{
  id: string;
  chapterNum: number;
  slideNum: number;
  hour: 1 | 2 | 3;
  hourTitle: {{ en: string; el: string }};
  category: {{ en: string; el: string }};
  title: {{ en: string; el: string }};
  subtitle?: {{ en: string; el: string }};
  layout: SlideLayout;
  badge?: {{ en: string; el: string }};

  heroData?: {{
    chapterTitle: {{ en: string; el: string }};
    chapterSubtitle: {{ en: string; el: string }};
    author: string;
    edition: string;
    partName: {{ en: string; el: string }};
    duration: string;
    roadmap: {{ hour: number; topic: {{ en: string; el: string }} }}[];
  }};

  cards?: {{
    icon: string;
    title: {{ en: string; el: string }};
    subtitle?: {{ en: string; el: string }};
    bullets: {{ en: string[]; el: string[] }};
    badge?: {{ en: string; el: string }};
    highlight?: boolean;
  }}[];

  diagramData?: {{
    diagramType: string;
    caption: {{ en: string; el: string }};
    nodes: {{
      id: string;
      label: {{ en: string; el: string }};
      desc: {{ en: string; el: string }};
      icon: string;
      color: string;
    }}[];
    flowSteps?: {{ step: number; text: {{ en: string; el: string }} }}[];
    takeaway: {{ en: string; el: string }};
  }};

  compareData?: {{
    left: {{
      title: {{ en: string; el: string }};
      badge: {{ en: string; el: string }};
      color: string;
      bullets: {{ en: string[]; el: string[] }};
      pros?: {{ en: string[]; el: string[] }};
      cons?: {{ en: string[]; el: string[] }};
    }};
    right: {{
      title: {{ en: string; el: string }};
      badge: {{ en: string; el: string }};
      color: string;
      bullets: {{ en: string[]; el: string[] }};
      pros?: {{ en: string[]; el: string[] }};
      cons?: {{ en: string[]; el: string[] }};
    }};
    verdict: {{ en: string; el: string }};
  }};

  terminalData?: {{
    language: string;
    filename?: string;
    command: string;
    output?: {{ en: string; el: string }};
    codeSnippet?: string;
    explanations: {{ line?: string; text: {{ en: string; el: string }} }}[];
    securityInsight: {{ en: string; el: string }};
  }};

  caseStudyData?: {{
    incidentName: string;
    targetEntity: string;
    date: string;
    impactMetric: string;
    attackVector: {{ en: string; el: string }};
    killChainBreakdown: {{ phase: string; details: {{ en: string; el: string }} }}[];
    rootCause: {{ en: string; el: string }};
    mitigationLessons: {{ en: string[]; el: string[] }};
  }};

  labData?: {{
    labTitle: {{ en: string; el: string }};
    estimatedTime: string;
    topology: {{ en: string[]; el: string[] }};
    tasks: {{ step: number; task: {{ en: string; el: string }}; cmd: string }}[];
    deliverable: {{ en: string; el: string }};
  }};

  quizData?: {{
    question: {{ en: string; el: string }};
    options: {{ key: string; text: {{ en: string; el: string }} }}[];
    correctKey: string;
    explanation: {{ en: string; el: string }};
    discussionPrompt?: {{ en: string; el: string }};
  }};

  summaryData?: {{
    coreTakeaways: {{ en: string[]; el: string[] }};
    keyRules: {{ rule: {{ en: string; el: string }}; desc: {{ en: string; el: string }} }}[];
    nextChapterTeaser: {{ en: string; el: string }};
  }};

  speakerNotes: {{ en: string[]; el: string[] }};
}}

export interface ChapterDeck {{
  chapterNum: number;
  chapterTitle: {{ en: string; el: string }};
  chapterSubtitle: {{ en: string; el: string }};
  slides: DeckSlide[];
}}

export const presentationDecks: ChapterDeck[] = {json.dumps(all_chapter_slides, ensure_ascii=False, indent=2)};
"""
    return out_ts

def create_slide_content(ch_num, defn, s_idx, hour, h_title, layout):
    slide_id = f"ch{ch_num:02d}-s{s_idx:02d}"
    topics = defn["topics"]
    topic_focus = topics[(s_idx - 1) % len(topics)]

    # Base Slide Object
    slide = {
        "id": slide_id,
        "chapterNum": ch_num,
        "slideNum": s_idx,
        "hour": hour,
        "hourTitle": h_title,
        "category": {
            "en": "Foundational Theory" if hour == 1 else ("Architecture & Protocols" if hour == 2 else "Real Incidents & Labs"),
            "el": "Θεωρητικές Βάσεις" if hour == 1 else ("Αρχιτεκτονική & Πρωτόκολλα" if hour == 2 else "Πραγματικά Περιστατικά & Εργαστήριο")
        },
        "title": {
            "en": f"Ch {ch_num}.{s_idx}: {topic_focus}",
            "el": f"Κεφ. {ch_num}.{s_idx}: {topic_focus}"
        },
        "subtitle": {
            "en": f"Part {defn['part']} · {defn['title']['en']} — 3-Hour Curriculum Delivery",
            "el": f"Μέρος {defn['part']} · {defn['title']['el']} — Διδασκαλία 3 Ωρών"
        },
        "layout": layout,
        "badge": {
            "en": f"SLIDE {s_idx:02d}/45 · HOUR {hour}",
            "el": f"ΔΙΑΦΑΝΕΙΑ {s_idx:02d}/45 · ΩΡΑ {hour}"
        },
        "speakerNotes": {
            "en": [
                f"Highlight the strategic importance of {topic_focus} in modern security operations.",
                "Engage students by connecting theoretical definitions with real-world enterprise constraints.",
                "Encourage questions regarding defense-in-depth trade-offs and practical verification."
            ],
            "el": [
                f"Τονίστε τη στρατηγική σημασία του αντικειμένου '{topic_focus}' στις σύγχρονες λειτουργίες ασφάλειας.",
                "Συνδέστε τους θεωρητικούς ορισμούς με πραγματικούς περιορισμούς επιχειρησιακών περιβαλλόντων.",
                "Ενθαρρύνετε ερωτήσεις σχετικά με τους συμβιβασμούς άμυνας σε βάθος και πρακτικής επαλήθευσης."
            ]
        }
    }

    if layout == "hero":
        slide["title"] = defn["title"]
        slide["subtitle"] = defn["subtitle"]
        slide["heroData"] = {
            "chapterTitle": defn["title"],
            "chapterSubtitle": defn["subtitle"],
            "author": "Dr. S. Karagiannis",
            "edition": "Revised Academic Curriculum · 2026",
            "partName": {
                "en": f"Part {defn['part']}: Foundations & Core Architectures",
                "el": f"Μέρος {defn['part']}: Θεμέλια & Βασικές Αρχιτεκτονικές"
            },
            "duration": "3 Hours (135 min Lecture + 45 min Guided Lab)",
            "roadmap": [
                {"hour": 1, "topic": {"en": "Theory, Threat Vectors & Core Definitions", "el": "Θεωρία, Διανύσματα Απειλών & Βασικοί Ορισμοί"}},
                {"hour": 2, "topic": {"en": "Deep Architecture, Technical Protocols & Defensive Controls", "el": "Εις Βάθος Αρχιτεκτονική, Τεχνικά Πρωτόκολλα & Μέτρα Προστασίας"}},
                {"hour": 3, "topic": {"en": "Real-World Incidents, 2-Hour Lab Demo & Assessment Exam", "el": "Πραγματικά Περιστατικά, Επίδειξη Εργαστηρίου 2h & Κουίζ Αξιολόγησης"}}
            ]
        }

    elif layout == "diagram":
        slide["diagramData"] = {
            "diagramType": "Architecture Workflow",
            "caption": {
                "en": f"Figure {ch_num}.{s_idx} — Multi-Stage Architectural Security Model for {topic_focus}",
                "el": f"Σχήμα {ch_num}.{s_idx} — Πολυεπίπεδο Αρχιτεκτονικό Μοντέλο Ασφάλειας για {topic_focus}"
            },
            "nodes": [
                {"id": "n1", "label": {"en": "1. External Ingress", "el": "1. Εξωτερική Είσοδος"}, "desc": {"en": "Perimeter inspection, TLS termination, WAF rate limiting", "el": "Έλεγχος περιμέτρου, τερματισμός TLS, WAF rate limiting"}, "icon": "Shield", "color": "teal"},
                {"id": "n2", "label": {"en": "2. Authentication & IAM", "el": "2. Αυθεντικοποίηση & IAM"}, "desc": {"en": "MFA validation, JWT signature check, RBAC policy", "el": "Έλεγχος MFA, επαλήθευση JWT, πολιτική RBAC"}, "icon": "KeyRound", "color": "blue"},
                {"id": "n3", "label": {"en": "3. Application & Core", "el": "3. Εφαρμογή & Πυρήνας"}, "desc": {"en": "Memory bounds checking, input sanitization, least privilege", "el": "Έλεγχος ορίων μνήμης, εξυγίανση εισόδου, ελάχιστο προνόμιο"}, "icon": "Cpu", "color": "indigo"},
                {"id": "n4", "label": {"en": "4. Data Ledger & Storage", "el": "4. Αποθήκευση & Δεδομένα"}, "desc": {"en": "AES-256 encryption at rest, immutable append-only audit trail", "el": "Κρυπτογράφηση AES-256 at rest, αμετάβλητο αρχείο καταγραφής"}, "icon": "Lock", "color": "emerald"}
            ],
            "flowSteps": [
                {"step": 1, "text": {"en": "Untrusted client payload arrives via TLS 1.3 encrypted tunnel.", "el": "Το μη αξιόπιστο payload φτάνει μέσω κρυπτογραφημένου καναλιού TLS 1.3."}},
                {"step": 2, "text": {"en": "Identity boundary evaluates claims and enforces zero-trust token validity.", "el": "Το όριο ταυτότητας αξιολογεί τα διαπιστευτήρια και επιβάλλει ελέγχους zero-trust."}},
                {"step": 3, "text": {"en": "Execution engine processes data within sandboxed isolation boundaries.", "el": "Η μηχανή εκτέλεσης επεξεργάζεται τα δεδομένα σε απομονωμένο περιβάλλον (sandbox)."}},
                {"step": 4, "text": {"en": "Cryptographic proof and audit event logged to tamper-evident SIEM.", "el": "Κρυπτογραφική απόδειξη και συμβάν ελέγχου καταγράφονται στο απαραβίαστο SIEM."}}
            ],
            "takeaway": {
                "en": f"Key Principle: Never trust single-layer defenses. Every tier must independently authenticate and validate.",
                "el": f"Βασική Αρχή: Ποτέ μην εμπιστεύεστε άμυνες ενός επιπέδου. Κάθε βαθμίδα πρέπει να αυθεντικοποιεί και να ελέγχει ανεξάρτητα."
            }
        }

    elif layout == "split-compare":
        slide["compareData"] = {
            "left": {
                "title": {"en": "Traditional / Vulnerable Pattern", "el": "Παραδοσιακό / Ευάλωτο Πρότυπο"},
                "badge": {"en": "Legacy Architecture", "el": "Κλασική Αρχιτεκτονική"},
                "color": "rose",
                "bullets": {
                    "en": [
                        "Flat internal network with implicit trust inside the perimeter.",
                        "Static credentials stored in configuration files or hardcoded.",
                        "Infrequent manual security reviews and post-incident patching.",
                        "Single point of failure: Perimeter breach leads to full compromise."
                    ],
                    "el": [
                        "Επίπεδο εσωτερικό δίκτυο με σιωπηρή εμπιστοσύνη εντός περιμέτρου.",
                        "Στατικά διαπιστευτήρια αποθηκευμένα σε αρχεία ρυθμίσεων ή κώδικα.",
                        "Σπάνιοι χειροκίνητοι έλεγχοι και επιδιορθώσεις κατόπιν περιστατικού.",
                        "Μοναδικό σημείο αποτυχίας: Παραβίαση περιμέτρου σημαίνει πλήρη κατάληψη."
                    ]
                },
                "cons": {
                    "en": ["High blast radius", "Zero lateral movement defense", "Compliance non-conformance"],
                    "el": ["Τεράστια ακτίνα καταστροφής", "Μηδενική άμυνα σε πλευρική κίνηση", "Μη συμμόρφωση"]
                }
            },
            "right": {
                "title": {"en": "Modern Zero-Trust Defense in Depth", "el": "Σύγχρονη Άμυνα Μηδενικής Εμπιστοσύνης (Zero Trust)"},
                "badge": {"en": "Enterprise Standard", "el": "Επιχειρησιακό Πρότυπο"},
                "color": "emerald",
                "bullets": {
                    "en": [
                        "Micro-segmentation with mutual TLS (mTLS) between all microservices.",
                        "Ephemeral dynamic tokens with short time-to-live (TTL) and hardware MFA.",
                        "Automated continuous CI/CD security scanning (SAST/DAST/SCA).",
                        "Assume breach mindset: Sandboxing, strict least privilege, and EDR."
                    ],
                    "el": [
                        "Μικρο-κατάτμηση με mutual TLS (mTLS) μεταξύ όλων των υπηρεσιών.",
                        "Εφήμερα δυναμικά tokens με σύντομο χρόνο ζωής (TTL) και hardware MFA.",
                        "Αυτοματοποιημένη συνεχής σάρωση ασφάλειας στο CI/CD (SAST/DAST/SCA).",
                        "Προσέγγιση 'Assume Breach': Sandboxing, ελάχιστο προνόμιο και EDR."
                    ]
                },
                "pros": {
                    "en": ["Isolated fault domains", "Rapid automated containment", "Full auditability"],
                    "el": ["Απομονωμένα όρια βλάβης", "Άμεσος αυτοματοποιημένος περιορισμός", "Πλήρης λογοδοσία"]
                }
            },
            "verdict": {
                "en": "Engineering Verdict: Adopting defense-in-depth and continuous verification drastically reduces MTTR and breach impact.",
                "el": "Μηχανικό Συμπέρασμα: Η υιοθέτηση άμυνας σε βάθος και συνεχούς επαλήθευσης μειώνει δραστικά τον χρόνο MTTR και τις επιπτώσεις."
            }
        }

    elif layout == "code-terminal":
        slide["terminalData"] = {
            "language": "bash",
            "filename": f"secops-audit-{ch_num}.sh",
            "command": f"auditctl -l && sha256sum /opt/fintech/bin/* | head -n 3",
            "output": {
                "en": "-w /etc/passwd -p wa -k identity_tamper\n-w /etc/shadow -p wa -k shadow_tamper\ne3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  /opt/fintech/bin/gateway",
                "el": "-w /etc/passwd -p wa -k identity_tamper\n-w /etc/shadow -p wa -k shadow_tamper\ne3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  /opt/fintech/bin/gateway"
            },
            "explanations": [
                {"line": "auditctl -l", "text": {"en": "Lists active Linux kernel audit rules monitoring critical security files.", "el": "Απαριθμεί τους ενεργούς κανόνες ελέγχου πυρήνα Linux για κρίσιμα αρχεία."}},
                {"line": "-w /etc/shadow -p wa", "text": {"en": "Triggers immediate audit alert if shadow password file is written or appended.", "el": "Ενεργοποιεί άμεση ειδοποίηση εάν τροποποιηθεί ή εγγραφεί το αρχείο shadow."}},
                {"line": "sha256sum /opt/bin/*", "text": {"en": "Cryptographic integrity baseline to detect trojanized binary tampering.", "el": "Κρυπτογραφική βάση ακεραιότητας για εντοπισμό παραποιημένων εκτελέσιμων."}}
            ],
            "securityInsight": {
                "en": "Security Analyst Tip: Always combine real-time kernel file auditing with offline cryptographic integrity checks.",
                "el": "Συμβουλή Αναλυτή: Συνδυάζετε πάντα τον έλεγχο αρχείων πυρήνα πραγματικού χρόνου με κρυπτογραφικούς ελέγχους ακεραιότητας."
            }
        }

    elif layout == "case-study":
        incidents = [
            ("Equifax Apache Struts Breach", "Equifax Inc.", "2017", "147.9 Million Records ($1.4B Cost)", "Unpatched OGNL Injection (CVE-2017-5638)"),
            ("SolarWinds SUNBURST Supply Chain", "SolarWinds Orion", "2020", "18,000+ Enterprise & Gov Orgs", "Build-System Trojan Injection (C2 DLL)"),
            ("NotPetya Destructive Cyber Weapon", "Maersk, Merck, FedEx", "2017", "$10+ Billion Global Damage", "MeDoc Update Hijack & EternalBlue SMB Worm"),
            ("Target HVAC Credential Breach", "Target Stores", "2013", "40M Credit Cards / 70M PII", "Third-Party Vendor Phishing & Flat Network Pivot"),
            ("Capital One SSRF Cloud Breach", "Capital One / AWS", "2019", "106 Million Customer Accounts", "SSRF Vulnerability in Misconfigured WAF Instance")
        ]
        inc = incidents[(s_idx + ch_num) % len(incidents)]
        slide["caseStudyData"] = {
            "incidentName": inc[0],
            "targetEntity": inc[1],
            "date": inc[2],
            "impactMetric": inc[3],
            "attackVector": {"en": inc[4], "el": inc[4]},
            "killChainBreakdown": [
                {"phase": "Initial Access", "details": {"en": f"Attacker exploited {inc[4]} to bypass perimeter defense.", "el": f"Ο επιτιθέμενος εκμεταλλεύτηκε το {inc[4]} παρακάμπτοντας την περίμετρο."}},
                {"phase": "Lateral Movement", "details": {"en": "Pivot across unsegmented internal networks using hardcoded credentials.", "el": "Πλευρική μετακίνηση στο μη κατατμημένο δίκτυο με στατικά διαπιστευτήρια."}},
                {"phase": "Data Exfiltration", "details": {"en": "Mass extraction of unencrypted sensitive customer records via encrypted egress.", "el": "Μαζική εξαγωγή μη κρυπτογραφημένων δεδομένων μέσω καναλιών egress."}}
            ],
            "rootCause": {
                "en": "Lack of timely patch management, absence of network micro-segmentation, and failure of egress filtering.",
                "el": "Έλλειψη έγκαιρης επιδιόρθωσης ευπαθειών, απουσία μικρο-κατάτμησης δικτύου και αποτυχία φιλτραρίσματος εξόδου."
            },
            "mitigationLessons": {
                "en": [
                    "Implement automated vulnerability discovery and 14-day critical patch SLAs.",
                    "Enforce strict Zero-Trust network segmentation between DMZ and database tiers.",
                    "Deploy egress traffic inspection to detect anomalous outbound exfiltration."
                ],
                "el": [
                    "Εφαρμογή αυτοματοποιημένης ανίχνευσης ευπαθειών με SLA επιδιόρθωσης 14 ημερών.",
                    "Επιβολή αυστηρής κατάτμησης Zero-Trust μεταξύ ζώνης DMZ και βάσεων δεδομένων.",
                    "Επιτήρηση εξερχόμενης κίνησης (egress) για εντοπισμό ανώμαλης εξαγωγής δεδομένων."
                ]
            }
        }

    elif layout == "lab-preview":
        slide["labData"] = {
            "labTitle": {
                "en": f"Chapter {ch_num} Hands-on Laboratory: Enterprise Practical Implementation",
                "el": f"Πρακτικό Εργαστήριο Κεφαλαίου {ch_num}: Επιχειρησιακή Εφαρμογή & Έλεγχος"
            },
            "estimatedTime": "120 Minutes (~2 Hours)",
            "topology": {
                "en": [
                    "Ubuntu Linux 24.04 Target VM (`192.168.10.50`)",
                    "Security Operations Analyst Station (`192.168.10.10`)",
                    "Isolated Threat Simulation Network (`192.168.50.0/24`)"
                ],
                "el": [
                    "Ubuntu Linux 24.04 VM Στόχος (`192.168.10.50`)",
                    "Σταθμός Εργασίας Αναλυτή SOC (`192.168.10.10`)",
                    "Απομονωμένο Δίκτυο Προσομοίωσης Απειλών (`192.168.50.0/24`)"
                ]
            },
            "tasks": [
                {"step": 1, "task": {"en": "Baseline reconnaissance & topology mapping", "el": "Αναγνώριση βάσης & χαρτογράφηση τοπολογίας"}, "cmd": f"nmap -sS -p- 192.168.10.50"},
                {"step": 2, "task": {"en": "Identify misconfigured permissions & weak hashes", "el": "Εντοπισμός εσφαλμένων δικαιωμάτων & αδύναμων hashes"}, "cmd": "find / -perm -4000 -type f 2>/dev/null"},
                {"step": 3, "task": {"en": "Deploy defense-in-depth security hardening", "el": "Εφαρμογή μέτρων ενίσχυσης άμυνας σε βάθος"}, "cmd": "chmod 600 /etc/security/vault.key"},
                {"step": 4, "task": {"en": "Execute automated compliance verification", "el": "Εκτέλεση αυτοματοποιημένου ελέγχου συμμόρφωσης"}, "cmd": "./verify_lab_hardening.sh"}
            ],
            "deliverable": {
                "en": "Signed Laboratory Report (PDF) with command logs, cryptographic hashes, and verification checklist.",
                "el": "Υπογεγραμμένη Αναφορά Εργαστηρίου (PDF) με αρχεία καταγραφής, hashes και λίστα ελέγχου."
            }
        }

    elif layout == "discussion-quiz":
        slide["quizData"] = {
            "question": {
                "en": f"In the context of {topic_focus}, which architectural measure provides the highest resilience against persistent lateral compromise?",
                "el": f"Στο πλαίσιο του/της {topic_focus}, ποιο αρχιτεκτονικό μέτρο παρέχει τη μέγιστη ανθεκτικότητα έναντι πλευρικής παραβίασης;"
            },
            "options": [
                {"key": "A", "text": {"en": "Relying entirely on perimeter firewall packet filtering without host controls.", "el": "Βασιζόμενοι αποκλειστικά στο firewall περιμέτρου χωρίς ελέγχους στους hosts."}},
                {"key": "B", "text": {"en": "Enforcing Zero-Trust micro-segmentation, mutual TLS (mTLS) & least privilege.", "el": "Επιβολή μικρο-κατάτμησης Zero-Trust, mutual TLS (mTLS) & ελάχιστου προνομίου."}},
                {"key": "C", "text": {"en": "Increasing password complexity requirements from 8 characters to 16 characters.", "el": "Αύξηση της πολυπλοκότητας των κωδικών πρόσβασης από 8 σε 16 χαρακτήρες."}},
                {"key": "D", "text": {"en": "Disabling logging to reduce CPU overhead on database servers.", "el": "Απενεργοποίηση καταγραφής για μείωση φόρτου CPU στους database servers."}},
                {"key": "E", "text": {"en": "Granting all developers permanent administrative sudo privileges for convenience.", "el": "Χορήγηση μόνιμων δικαιωμάτων sudo σε όλους τους προγραμματιστές για ευκολία."}}
            ],
            "correctKey": "B",
            "explanation": {
                "en": "Zero-Trust micro-segmentation with mTLS and strict least privilege ensures that even if one node is breached, lateral movement is mathematically blocked without valid cryptographically-signed short-lived tokens.",
                "el": "Η μικρο-κατάτμηση Zero-Trust με mTLS και αυστηρό ελάχιστο προνόμιο διασφαλίζει ότι ακόμα και αν παραβιαστεί ένας κόμβος, η πλευρική κίνηση μπλοκάρεται αυτόματα χωρίς έγκυρα κρυπτογραφημένα tokens."
            },
            "discussionPrompt": {
                "en": "Classroom Debate: How do enterprise organizations balance strict micro-segmentation with developer agility?",
                "el": "Ερώτημα Συζήτησης: Πώς μπορούν οι οργανισμοί να εξισορροπήσουν την αυστηρή μικρο-κατάτμηση με την ταχύτητα των ομάδων ανάπτυξης;"
            }
        }

    elif layout == "summary-matrix":
        slide["summaryData"] = {
            "coreTakeaways": {
                "en": [
                    f"Mastered core principles and threat models governing {defn['title']['en']}.",
                    "Decomposed real-world enterprise architectures and identified single points of failure.",
                    "Analyzed historical catastrophic incidents to extract actionable defensive mitigations.",
                    "Executed structured hands-on procedures to verify multi-tier security hardening."
                ],
                "el": [
                    f"Εμπέδωση των βασικών αρχών και μοντέλων απειλών για το πεδίο '{defn['title']['el']}'.",
                    "Αποδόμηση επιχειρησιακών αρχιτεκτονικών και εντοπισμός μοναδικών σημείων αποτυχίας (SPOF).",
                    "Ανάλυση πραγματικών καταστροφικών περιστατικών για εξαγωγή εφαρμόσιμων μέτρων άμυνας.",
                    "Εκτέλεση δομημένων εργαστηριακών διαδικασιών για επαλήθευση ενίσχυσης ασφάλειας."
                ]
            },
            "keyRules": [
                {"rule": {"en": "Rule 1: Assume Breach", "el": "Κανόνας 1: Θεωρήστε Δεδομένη την Παραβίαση"}, "desc": {"en": "Design systems knowing the perimeter will eventually fail.", "el": "Σχεδιάστε συστήματα γνωρίζοντας ότι η περίμετρος θα παραβιαστεί."}},
                {"rule": {"en": "Rule 2: Complete Mediation", "el": "Κανόνας 2: Πλήρης Διαμεσολάβηση"}, "desc": {"en": "Verify access permissions on every single request, not just at login.", "el": "Επαληθεύετε τα δικαιώματα σε κάθε αίτημα, όχι μόνο κατά το login."}},
                {"rule": {"en": "Rule 3: Defense in Depth", "el": "Κανόνας 3: Άμυνα σε Βάθος"}, "desc": {"en": "Layer independent defensive controls across network, host, and data.", "el": "Εφαρμόστε ανεξάρτητα επίπεδα άμυνας σε δίκτυο, host και δεδομένα."}}
            ],
            "nextChapterTeaser": {
                "en": f"Up Next: Advancing to Chapter {min(13, ch_num + 1)} — Building upon these foundations.",
                "el": f"Επόμενο Κεφάλαιο: Μετάβαση στο Κεφάλαιο {min(13, ch_num + 1)} — Χτίζοντας πάνω σε αυτά τα θεμέλια."
            }
        }

    else: # concept-grid
        slide["cards"] = [
            {
                "icon": "ShieldCheck",
                "title": {"en": f"Core Concept: {topic_focus}", "el": f"Βασική Έννοια: {topic_focus}"},
                "subtitle": {"en": "Foundational Security Definition", "el": "Θεμελιώδης Ορισμός Ασφάλειας"},
                "bullets": {
                    "en": [
                        "Establishes formal boundaries to preserve confidentiality, integrity, and availability.",
                        "Identifies high-value enterprise digital assets and maps primary threat vectors.",
                        "Enforces deterministic access control policies across all trust zones."
                    ],
                    "el": [
                        "Καθορίζει επίσημα όρια για τη διατήρηση εμπιστευτικότητας, ακεραιότητας και διαθεσιμότητας.",
                        "Εντοπίζει κρίσιμα εταιρικά περιουσιακά στοιχεία και χαρτογραφεί τα κύρια διανύσματα απειλών.",
                        "Επιβάλλει ντετερμινιστικές πολιτικές ελέγχου πρόσβασης σε όλες τις ζώνες εμπιστοσύνης."
                    ]
                },
                "badge": {"en": "Fundamental", "el": "Θεμελιώδες"},
                "highlight": True
            },
            {
                "icon": "Layers",
                "title": {"en": "Architectural Mechanism", "el": "Αρχιτεκτονικός Μηχανισμός"},
                "subtitle": {"en": "Engineering Implementation", "el": "Μηχανική Υλοποίηση"},
                "bullets": {
                    "en": [
                        "Multi-tiered defensive barriers prevent single-point cascading failures.",
                        "Cryptographic validation protects state transitions and data-in-transit.",
                        "Automated telemetry captures behavioral anomalies in real-time."
                    ],
                    "el": [
                        "Πολυεπίπεδα εμπόδια άμυνας αποτρέπουν αλυσιδωτές καταρρεύσεις από μοναδικά σημεία αποτυχίας.",
                        "Κρυπτογραφική επαλήθευση προστατεύει τις μεταβάσεις κατάστασης και τα δεδομένα υπό μεταφορά.",
                        "Αυτοματοποιημένη τηλεμετρία καταγράφει ανωμαλίες συμπεριφοράς σε πραγματικό χρόνο."
                    ]
                },
                "badge": {"en": "Architecture", "el": "Αρχιτεκτονική"}
            },
            {
                "icon": "Wrench",
                "title": {"en": "Operational Verification", "el": "Επιχειρησιακή Επαλήθευση"},
                "subtitle": {"en": "Auditing & Testing", "el": "Έλεγχος & Δοκιμές"},
                "bullets": {
                    "en": [
                        "Routine penetration testing validates configuration resilience against active exploits.",
                        "Immutable audit logs provide non-repudiation during forensic investigations.",
                        "Continuous compliance alignment with NIST CSF 2.0 and ISO/IEC 27001."
                    ],
                    "el": [
                        "Τακτικές δοκιμές διείσδυσης επιβεβαιώνουν την ανθεκτικότητα των ρυθμίσεων έναντι ενεργών exploits.",
                        "Απαραβίαστα αρχεία καταγραφής παρέχουν μη αποποίηση κατά τις εγκληματολογικές έρευνες.",
                        "Συνεχής ευθυγράμμιση συμμόρφωσης με τα πρότυπα NIST CSF 2.0 και ISO/IEC 27001."
                    ]
                },
                "badge": {"en": "Verification", "el": "Επαλήθευση"}
            }
        ]

    return slide

def main():
    print("Generating complete presentation decks for all 13 chapters (585 slides)...")
    content = generate_presentation_ts()
    out_path = os.path.join(os.getcwd(), "src", "content", "presentation-decks.ts")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Presentation deck successfully written to {out_path} ({len(content) / 1024:.1f} KB)")

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
# scripts/build_presentation_decks.py
"""
Generates 585 presentation slides across all 13 chapters (45 slides per chapter).
Designed specifically for landscape 16:9 widescreen presentation mode with zero vertical scrolling,
rich architectural diagrams, real-world case studies, terminal inspection boxes, and interactive challenges.
"""

import json
import os
import sys

def get_chapter_meta(ch_num):
    meta = [
        {
            "num": 1,
            "part": 1,
            "title": {"en": "Foundations & Security Principles", "el": "Θεμελιώδεις Αρχές Κυβερνοασφάλειας"},
            "subtitle": {"en": "The CIA Triad, Threat Modeling, Saltzer-Schroeder Rules & Defense in Depth", "el": "Η Τριάδα CIA, Μοντελοποίηση Απειλών, Κανόνες Saltzer-Schroeder & Άμυνα σε Βάθος"},
            "h1": {"en": "Hour 1: Core Principles, Concepts & Definitions", "el": "Ώρα 1: Βασικές Αρχές, Έννοιες & Ορισμοί"},
            "h2": {"en": "Hour 2: Saltzer-Schroeder Principles & Defense in Depth", "el": "Ώρα 2: Αρχές Saltzer-Schroeder & Άμυνα σε Βάθος"},
            "h3": {"en": "Hour 3: Real Incidents, Lab Walkthrough & Knowledge Assessment", "el": "Ώρα 3: Πραγματικά Περιστατικά, Εργαστήριο & Αξιολόγηση"}
        },
        {
            "num": 2,
            "part": 1,
            "title": {"en": "Operating System & Memory Security", "el": "Ασφάλεια Λειτουργικών Συστημάτων & Μνήμης"},
            "subtitle": {"en": "Kernel Mode, Process Isolation, Buffer Overflows & Modern Mitigations", "el": "Kernel Mode, Απομόνωση Διεργασιών, Buffer Overflows & Σύγχρονα Μέτρα Προστασίας"},
            "h1": {"en": "Hour 1: OS Boundaries, CPU Rings & Process Memory Architecture", "el": "Ώρα 1: Όρια ΛΣ, CPU Rings & Αρχιτεκτονική Μνήμης Διεργασιών"},
            "h2": {"en": "Hour 2: Memory Corruption, Exploit Mitigations & Access Controls", "el": "Ώρα 2: Αλλοίωση Μνήμης, Μέτρα Προστασίας & Έλεγχος Πρόσβασης"},
            "h3": {"en": "Hour 3: Kernel Exploits (Dirty COW), Lab Demo & Hardening", "el": "Ώρα 3: Kernel Exploits (Dirty COW), Εργαστήριο & Ενίσχυση (Hardening)"}
        },
        {
            "num": 3,
            "part": 2,
            "title": {"en": "Threat Actors, Motivation & Malware", "el": "Δράστες Απειλών, Κίνητρα & Κακόβουλο Λογισμικό"},
            "subtitle": {"en": "Nation-State APTs, Ransomware Ecosystem, Rootkits & Supply Chains", "el": "Κρατικοί Δράστες (APTs), Οικοσύστημα Ransomware, Rootkits & Εφοδιαστική Αλυσίδα"},
            "h1": {"en": "Hour 1: Threat Actor Taxonomy, Motivations & Cyber Warfare", "el": "Ώρα 1: Ταξινόμηση Δραστών Απειλών, Κίνητρα & Κυβερνοπόλεμος"},
            "h2": {"en": "Hour 2: Malware Categories, Anatomy & Persistence Techniques", "el": "Ώρα 2: Κατηγορίες Κακόβουλου Λογισμικού, Ανατομία & Τεχνικές Επιμονής"},
            "h3": {"en": "Hour 3: Real APT Attacks (Stuxnet, NotPetya), Lab Demo & Defense", "el": "Ώρα 3: Πραγματικές Επιθέσεις APT (Stuxnet, NotPetya), Εργαστήριο & Άμυνα"}
        },
        {
            "num": 4,
            "part": 2,
            "title": {"en": "Social Engineering & Human Factors", "el": "Κοινωνική Μηχανική & Ανθρώπινος Παράγοντας"},
            "subtitle": {"en": "Phishing Vectors, Cognitive Biases, Vishing & Organizational Resilience", "el": "Μορφές Phishing, Γνωστικές Προκαταλήψεις, Vishing & Οργανωσιακή Ανθεκτικότητα"},
            "h1": {"en": "Hour 1: Psychological Vectors, Cialdini Principles & Attack Spectrum", "el": "Ώρα 1: Ψυχολογικά Διανύσματα, Αρχές Cialdini & Φάσμα Επιθέσεων"},
            "h2": {"en": "Hour 2: Technical Social Engineering, Smishing, Vishing & MFA Bypass", "el": "Ώρα 2: Τεχνική Κοινωνική Μηχανική, Smishing, Vishing & Παράκαμψη MFA"},
            "h3": {"en": "Hour 3: Case Studies (Twitter 2020, RSA), Lab Preview & Anti-Phishing Defense", "el": "Ώρα 3: Case Studies (Twitter 2020, RSA), Εργαστήριο & Άμυνα Anti-Phishing"}
        },
        {
            "num": 5,
            "part": 2,
            "title": {"en": "Network Attacks & Perimeter Defense", "el": "Δικτυακές Επιθέσεις & Περιμετρική Άμυνα"},
            "subtitle": {"en": "OSI Security, ARP/DNS Spoofing, DDoS, Firewalls & Network Segmentation", "el": "Ασφάλεια OSI, ARP/DNS Spoofing, DDoS, Firewalls & Κατάτμηση Δικτύου"},
            "h1": {"en": "Hour 1: Network Protocols, Packet Sniffing & Layer 2/3 Attacks", "el": "Ώρα 1: Δικτυακά Πρωτόκολλα, Packet Sniffing & Επιθέσεις Επιπέδων 2/3"},
            "h2": {"en": "Hour 2: Transport Layer Attacks, DNS Poisoning, MITM & DDoS Vectors", "el": "Ώρα 2: Επιθέσεις Επιπέδου Μεταφοράς, DNS Poisoning, MITM & Διανύσματα DDoS"},
            "h3": {"en": "Hour 3: Case Studies (Mirai Botnet, Kaminsky Bug), Lab Demo & IDS/IPS Rules", "el": "Ώρα 3: Case Studies (Mirai Botnet, Kaminsky Bug), Εργαστήριο & Κανόνες IDS/IPS"}
        },
        {
            "num": 6,
            "part": 3,
            "title": {"en": "Cryptography & Public Key Infrastructure", "el": "Κρυπτογραφία & Υποδομή Δημόσιου Κλειδιού"},
            "subtitle": {"en": "Symmetric Ciphers, Asymmetric Math, Digital Signatures, PKI & TLS 1.3", "el": "Συμμετρικοί Αλγόριθμοι, Ασύμμετρα Μαθηματικά, Ψηφιακές Υπογραφές, PKI & TLS 1.3"},
            "h1": {"en": "Hour 1: Cryptographic Principles, Kerckhoffs's Law & Symmetric Encryption (AES)", "el": "Ώρα 1: Αρχές Κρυπτογραφίας, Νόμος Kerckhoffs & Συμμετρική Κρυπτογράφηση (AES)"},
            "h2": {"en": "Hour 2: Asymmetric Cryptography (RSA/ECC), Hashes, HMAC & Digital Signatures", "el": "Ώρα 2: Ασύμμετρη Κρυπτογραφία (RSA/ECC), Hashes, HMAC & Ψηφιακές Υπογραφές"},
            "h3": {"en": "Hour 3: PKI, X.509 Certificates, TLS 1.3 Handshake, DigiNotar Case & Lab Demo", "el": "Ώρα 3: PKI, Πιστοποιητικά X.509, Χειραψία TLS 1.3, Υπόθεση DigiNotar & Εργαστήριο"}
        },
        {
            "num": 7,
            "part": 3,
            "title": {"en": "Identity, Authentication & Access Control", "el": "Ταυτότητα, Αυθεντικοποίηση & Έλεγχος Πρόσβασης"},
            "subtitle": {"en": "AAA Framework, MFA/FIDO2, SSO, OAuth2/OIDC, RBAC/ABAC & Zero Trust", "el": "Πλαίσιο AAA, MFA/FIDO2, SSO, OAuth2/OIDC, RBAC/ABAC & Μηδενική Εμπιστοσύνη"},
            "h1": {"en": "Hour 1: Identification vs Authentication, Passwords, MFA & FIDO2/WebAuthn", "el": "Ώρα 1: Ταυτοποίηση vs Αυθεντικοποίηση, Κωδικοί, MFA & FIDO2/WebAuthn"},
            "h2": {"en": "Hour 2: Federated Identity, SAML 2.0, OAuth 2.0, OpenID Connect & RBAC/ABAC", "el": "Ώρα 2: Ομόσπονδη Ταυτότητα, SAML 2.0, OAuth 2.0, OpenID Connect & RBAC/ABAC"},
            "h3": {"en": "Hour 3: Real Incidents (Uber 2022 MFA Fatigue, Okta/Lapsus$), Lab Demo & Zero Trust", "el": "Ώρα 3: Πραγματικά Περιστατικά (Uber 2022 MFA Fatigue, Okta), Εργαστήριο & Zero Trust"}
        },
        {
            "num": 8,
            "part": 3,
            "title": {"en": "Secure Software Engineering & Vulnerabilities", "el": "Ασφαλής Ανάπτυξη Λογισμικού & Ευπάθειες"},
            "subtitle": {"en": "SSDLC, Threat Modeling (STRIDE), OWASP Top 10, SAST/DAST & Code Review", "el": "Ασφαλές SDLC, Μοντελοποίηση Απειλών (STRIDE), OWASP Top 10, SAST/DAST & Έλεγχος Κώδικα"},
            "h1": {"en": "Hour 1: Secure Development Lifecycle (SSDLC), Shift-Left & Threat Modeling (STRIDE)", "el": "Ώρα 1: Ασφαλής Κύκλος Ανάπτυξης (SSDLC), Shift-Left & Μοντελοποίηση Απειλών (STRIDE)"},
            "h2": {"en": "Hour 2: OWASP Top 10 Deep Dive (SQLi, XSS, CSRF, SSRF & Broken Auth)", "el": "Ώρα 2: Εις Βάθος Ανάλυση OWASP Top 10 (SQLi, XSS, CSRF, SSRF & Broken Auth)"},
            "h3": {"en": "Hour 3: Case Studies (Equifax Struts, Log4Shell), SAST/DAST Tooling, Lab Demo & Fixes", "el": "Ώρα 3: Case Studies (Equifax Struts, Log4Shell), Εργαλεία SAST/DAST, Εργαστήριο & Διορθώσεις"}
        },
        {
            "num": 9,
            "part": 3,
            "title": {"en": "Security Auditing, Pen Testing & Vulnerability Mgmt", "el": "Έλεγχος Ασφάλειας, Penetration Testing & Διαχείριση Ευπαθειών"},
            "subtitle": {"en": "PTES Methodology, Reconnaissance, Scanning, Exploitation, CVSS v3.1 & Patching", "el": "Μεθοδολογία PTES, Αναγνώριση, Σάρωση, Exploitation, CVSS v3.1 & Επιδιόρθωση"},
            "h1": {"en": "Hour 1: Auditing vs Assessment vs Pen Testing, Ethical Boundaries & Scope", "el": "Ώρα 1: Έλεγχος vs Αξιολόγηση vs Pen Testing, Ηθικά Όρια & Πεδίο Εφαρμογής"},
            "h2": {"en": "Hour 2: The 7 Phases of PTES, Nmap Scanning, Nessus Audits & Metasploit Framework", "el": "Ώρα 2: Οι 7 Φάσεις του PTES, Σάρωση Nmap, Έλεγχοι Nessus & Πλαίσιο Metasploit"},
            "h3": {"en": "Hour 3: Case Study (Yahoo Breach), CVSS v3.1 Scoring Calculator, Lab Demo & Remediation", "el": "Ώρα 3: Case Study (Yahoo Breach), Υπολογισμός CVSS v3.1, Εργαστήριο & Remediation"}
        },
        {
            "num": 10,
            "part": 4,
            "title": {"en": "Security Operations, Threat Detection & Incident Response", "el": "Επιχειρησιακή Ασφάλεια, Ανίχνευση & Απόκριση σε Περιστατικά"},
            "subtitle": {"en": "SOC Tier 1-3, SIEM (Splunk/ELK), SOAR, EDR/XDR, NIST SP 800-61r2 & Threat Hunting", "el": "SOC Tier 1-3, SIEM (Splunk/ELK), SOAR, EDR/XDR, NIST SP 800-61r2 & Αναζήτηση Απειλών"},
            "h1": {"en": "Hour 1: Security Operations Center (SOC) Architecture, Roles & SIEM Telemetry", "el": "Ώρα 1: Αρχιτεκτονική SOC, Ρόλοι Αναλυτών & Τηλεμετρία SIEM"},
            "h2": {"en": "Hour 2: The NIST SP 800-61r2 Lifecycle, SOAR Automation & EDR/XDR Detection", "el": "Ώρα 2: Ο Κύκλος Ζωής NIST SP 800-61r2, Αυτοματοποίηση SOAR & Ανίχνευση EDR/XDR"},
            "h3": {"en": "Hour 3: Case Studies (SolarWinds SUNBURST, Sony Pictures), Threat Hunting & Lab Demo", "el": "Ώρα 3: Case Studies (SolarWinds SUNBURST, Sony Pictures), Threat Hunting & Εργαστήριο"}
        },
        {
            "num": 11,
            "part": 4,
            "title": {"en": "Malware Analysis, Reverse Engineering & Forensics", "el": "Ανάλυση Κακόβουλου Λογισμικού & Ψηφιακή Εγκληματολογία"},
            "subtitle": {"en": "Static/Dynamic Analysis, Cuckoo Sandbox, Ghidra, Volatility Memory Triage & Custody", "el": "Στατική/Δυναμική Ανάλυση, Cuckoo Sandbox, Ghidra, Ανάλυση Μνήμης Volatility & Αλυσίδα Επιμέλειας"},
            "h1": {"en": "Hour 1: Malware Analysis Lab Setup, Safety Rules & Static Analysis (PE/Strings/Hashes)", "el": "Ώρα 1: Εγκατάσταση Εργαστηρίου Malware, Κανόνες Ασφάλειας & Στατική Ανάλυση (PE/Strings)"},
            "h2": {"en": "Hour 2: Dynamic Behavioral Analysis (Sandboxing), Disassembly (Ghidra) & Anti-Analysis Evasion", "el": "Ώρα 2: Δυναμική Ανάλυση Συμπεριφοράς, Αποσυναρμολόγηση (Ghidra) & Τεχνικές Evasion"},
            "h3": {"en": "Hour 3: Digital Forensics Principles, Order of Volatility, Volatility Triage & Lab Demo", "el": "Ώρα 3: Αρχές Ψηφιακής Εγκληματολογίας, Σειρά Πτητικότητας, Volatility Triage & Εργαστήριο"}
        },
        {
            "num": 12,
            "part": 4,
            "title": {"en": "Business Continuity, Disaster Recovery & Resilience", "el": "Επιχειρησιακή Συνέχεια, Ανάκαμψη από Καταστροφές & Ανθεκτικότητα"},
            "subtitle": {"en": "BIA, RPO vs RTO, Hot/Warm/Cold Sites, 3-2-1 Backups, Cyber Insurance & Crisis Mgmt", "el": "BIA, RPO vs RTO, Hot/Warm/Cold Sites, Αντίγραφα 3-2-1, Cyber Insurance & Διαχείριση Κρίσεων"},
            "h1": {"en": "Hour 1: Business Impact Analysis (BIA), Critical Assets & Maximum Tolerable Downtime (MTD)", "el": "Ώρα 1: Ανάλυση Επιχειρησιακών Επιπτώσεων (BIA), Κρίσιμα Συστήματα & Όριο Διακοπής (MTD)"},
            "h2": {"en": "Hour 2: Defining RPO and RTO, DR Site Architectures (Hot/Warm/Cold) & 3-2-1 Backup Strategy", "el": "Ώρα 2: Καθορισμός RPO και RTO, Αρχιτεκτονικές Εναλλακτικών Sites & Στρατηγική 3-2-1"},
            "h3": {"en": "Hour 3: Case Studies (Maersk NotPetya Recovery, OVHcloud Fire), Incident Drills & Lab Demo", "el": "Ώρα 3: Case Studies (Ανάκαμψη Maersk από NotPetya, Πυρκαγιά OVHcloud), Ασκήσεις & Εργαστήριο"}
        },
        {
            "num": 13,
            "part": 4,
            "title": {"en": "Governance, Risk, Compliance & Emerging Frontiers", "el": "Διακυβέρνηση, Διαχείριση Κινδύνου, Κανονισμοί & Νέοι Ορίζοντες"},
            "subtitle": {"en": "NIST CSF 2.0, ISO 27001, GDPR, NIS2, DORA, AI Threats (LLMs) & Post-Quantum Crypto", "el": "NIST CSF 2.0, ISO 27001, GDPR, NIS2, DORA, Απειλές AI (LLMs) & Μετα-Κβαντική Κρυπτογραφία"},
            "h1": {"en": "Hour 1: Security Governance, CISO Role, Risk Management Frameworks (NIST CSF 2.0 / ISO 27001)", "el": "Ώρα 1: Διακυβέρνηση Ασφάλειας, Ρόλος CISO, Πλαίσια Διαχείρισης Κινδύνου (NIST CSF / ISO)"},
            "h2": {"en": "Hour 2: Regulatory Compliance in the EU & Globally: GDPR, NIS2 Directive, DORA & CRA", "el": "Ώρα 2: Κανονιστική Συμμόρφωση στην ΕΕ & Παγκοσμίως: GDPR, Οδηγία NIS2, DORA & CRA"},
            "h3": {"en": "Hour 3: Emerging Frontiers: AI Security, Prompt Injection, Deepfakes, Post-Quantum Crypto & Capstone", "el": "Ώρα 3: Νέοι Ορίζοντες: Ασφάλεια AI, Prompt Injection, Deepfakes, Post-Quantum & Σύνοψη"}
        }
    ]
    return meta[ch_num - 1]

print("Script template ready.")

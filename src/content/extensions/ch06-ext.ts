import type { CliLab, HandsOnLab, TechnicalProject, QuizQuestion } from "../types";

export const ch06CliLab: CliLab = {
  id: "ch06-cli",
  title: {
    en: "Network Scanning, Packet Analysis & Firewall Defense Sandbox",
    el: "Προσομοιωτής Σάρωσης Δικτύου, Ανάλυσης Πακέτων & Άμυνας Firewall",
  },
  scenario: {
    en: "Perform TCP SYN port scanning, inspect raw TCP handshakes in packet captures with tcpdump, and configure stateful Linux iptables firewall rules to mitigate unauthorized exposure.",
    el: "Εκτελέστε σάρωση θυρών TCP SYN, αναλύστε χειραψίες TCP με το tcpdump και ρυθμίστε κανόνες firewall iptables για προστασία του εξυπηρετητή.",
  },
  initialPrompt: "analyst@net-sec:~$",
  banner: {
    en: "=== Chapter 6 Network Security Sandbox ===\nTarget Host: 10.0.5.20 | Subnet: 10.0.5.0/24\nType 'help' for command assistance or follow the missions below.",
    el: "=== Εργαστήριο Ασφάλειας Δικτύων Κεφαλαίου 6 ===\nΕξυπηρετητής Στόχος: 10.0.5.20 | Υποδίκτυο: 10.0.5.0/24\nΠληκτρολογήστε 'help' για βοήθεια ή ακολουθήστε τις παρακάτω αποστολές.",
  },
  fileSystem: {
    "network_topology.map": "DMZ [10.0.5.0/24] <---> Internal Core [10.0.0.0/16] <---> DB Tier [172.16.0.0/24]",
    "active_connections.txt": "Proto Recv-Q Send-Q Local Address Foreign Address State\ntcp 0 0 0.0.0.0:22 0.0.0.0:* LISTEN\ntcp 0 0 0.0.0.0:80 0.0.0.0:* LISTEN\ntcp 0 0 0.0.0.0:3306 0.0.0.0:* LISTEN",
    "firewall_rules.v4": "*filter\n:INPUT ACCEPT [0:0]\n:FORWARD DROP [0:0]\n:OUTPUT ACCEPT [0:0]\nCOMMIT",
  },
  tasks: [
    {
      id: "task-1",
      title: {
        en: "Conduct Stealth TCP SYN Port Scan",
        el: "Εκτέλεση Αθόρυβης Σάρωσης Θυρών TCP SYN",
      },
      description: {
        en: "Scan target `10.0.5.20` across ports 1-1000 using Nmap stealth SYN scan (`-sS`).",
        el: "Σαρώστε τον στόχο `10.0.5.20` στις θύρες 1-1000 με χρήση σάρωσης Nmap SYN (`-sS`).",
      },
      hint: {
        en: "Execute: nmap -sS -p 1-1000 10.0.5.20",
        el: "Εκτελέστε: nmap -sS -p 1-1000 10.0.5.20",
      },
      solution: "nmap -sS -p 1-1000 10.0.5.20",
      validateRegex: "nmap.*10\\.0\\.5\\.20",
      successMessage: {
        en: "Nmap scan complete! Discovered open ports 22 (SSH), 80 (HTTP), 443 (HTTPS), 3306 (MySQL).",
        el: "Η σάρωση Nmap ολοκληρώθηκε! Εντοπίστηκαν ανοιχτές οι θύρες 22, 80, 443 και 3306.",
      },
    },
    {
      id: "task-2",
      title: {
        en: "Capture Live TCP Three-Way Handshake Packets",
        el: "Καταγραφή Πακέτων Χειραψίας Τριών Κατευθύνσεων TCP",
      },
      description: {
        en: "Capture 3 packets on interface `eth0` for HTTP port 80 traffic using `tcpdump`.",
        el: "Καταγράψτε 3 πακέτα στη διεπαφή `eth0` για κίνηση HTTP στη θύρα 80 με το `tcpdump`.",
      },
      hint: {
        en: "Execute: tcpdump -i eth0 -nn -c 3 port 80",
        el: "Εκτελέστε: tcpdump -i eth0 -nn -c 3 port 80",
      },
      solution: "tcpdump -i eth0 -nn -c 3 port 80",
      validateRegex: "tcpdump.*port\\s+80",
      successMessage: {
        en: "Packet capture verified! Successfully analyzed SYN [S], SYN-ACK [S.], and ACK [.] flags.",
        el: "Η καταγραφή πακέτων επαληθεύτηκε! Αναλύθηκαν οι σημαίες SYN [S], SYN-ACK [S.] και ACK [.].",
      },
    },
    {
      id: "task-3",
      title: {
        en: "Configure Firewall Allow Rule for Internal Management Subnet",
        el: "Ρύθμιση Κανόνα Αποδοχής Firewall για το Εσωτερικό Υποδίκτυο",
      },
      description: {
        en: "Configure iptables to accept inbound SSH (port 22) strictly from internal subnet `10.0.0.0/8`.",
        el: "Ρυθμίστε το iptables να επιτρέπει εισερχόμενες συνδέσεις SSH (θύρα 22) μόνο από το υποδίκτυο `10.0.0.0/8`.",
      },
      hint: {
        en: "Execute: iptables -A INPUT -p tcp --dport 22 -s 10.0.0.0/8 -j ACCEPT",
        el: "Εκτελέστε: iptables -A INPUT -p tcp --dport 22 -s 10.0.0.0/8 -j ACCEPT",
      },
      solution: "iptables -A INPUT -p tcp --dport 22 -s 10.0.0.0/8 -j ACCEPT",
      validateRegex: "iptables.*-A\\s+INPUT.*22.*ACCEPT",
      successMessage: {
        en: "Firewall rule committed: Internal administrative access authorized.",
        el: "Ο κανόνας firewall αποθηκεύτηκε: Εξουσιοδοτήθηκε η εσωτερική πρόσβαση διαχείρισης.",
      },
    },
    {
      id: "task-4",
      title: {
        en: "Enforce Default Drop on Inbound SSH from Public Networks",
        el: "Επιβολή Κανόνα Απόρριψης για Εξωτερική Πρόσβαση SSH",
      },
      description: {
        en: "Append an iptables rule dropping all other external SSH connection attempts on port 22.",
        el: "Προσθέστε κανόνα iptables για απόρριψη όλων των άλλων εξωτερικών συνδέσεων SSH στη θύρα 22.",
      },
      hint: {
        en: "Execute: iptables -A INPUT -p tcp --dport 22 -j DROP",
        el: "Εκτελέστε: iptables -A INPUT -p tcp --dport 22 -j DROP",
      },
      solution: "iptables -A INPUT -p tcp --dport 22 -j DROP",
      validateRegex: "iptables.*-A\\s+INPUT.*22.*DROP",
      successMessage: {
        en: "Firewall hardened! Public SSH access blocked, eliminating brute-force attack vectors.",
        el: "Το firewall ενισχύθηκε! Η δημόσια πρόσβαση SSH αποκλείστηκε, εξαλείφοντας επιθέσεις brute-force.",
      },
    },
  ],
};

export const ch06HandsOnLab: HandsOnLab = {
  title: {
    en: "Network Segmentation, Perimeter IDS/IPS Deployment (Suricata) & DDoS Mitigation",
    el: "Τμηματοποίηση Δικτύου, Ανάπτυξη Περιμετρικού IDS/IPS (Suricata) & Μετριασμός DDoS",
  },
  subtitle: {
    en: "2-Hour Practical Lab: VLAN Isolation, Stateful Packet Filtering, Snort/Suricata Rule Engineering, and Botnet C2 Disruption",
    el: "Εργαστήριο 2 Ωρών: Απομόνωση VLAN, Φιλτράρισμα Πακέτων, Σύνταξη Κανόνων Suricata και Διακοπή Botnet C2",
  },
  duration: {
    en: "~2 Hours (120 minutes)",
    el: "~2 Ώρες (120 λεπτά)",
  },
  overview: {
    en: "In this comprehensive 2-hour technical laboratory, students take charge of network defense for an enterprise hosting mission-critical services. You will design multi-tier DMZ network segmentation, configure Linux netfilter/iptables stateful packet inspection, deploy the Suricata Intrusion Detection and Prevention System (IDS/IPS), craft custom signatures to intercept botnet command and control traffic, and implement rate-limiting defenses against TCP SYN floods and volumetric DDoS attacks.",
    el: "Σε αυτό το ολοκληρωμένο εργαστήριο 2 ωρών, οι φοιτητές αναλαμβάνουν την άμυνα δικτύου για μια επιχείρηση με κρίσιμες υπηρεσίες. Θα σχεδιάσετε τμηματοποίηση δικτύου DMZ, θα ρυθμίσετε φιλτράρισμα πακέτων stateful με το iptables, θα αναπτύξετε το σύστημα IDS/IPS Suricata, θα συντάξετε υπογραφές για εντοπισμό κίνησης Botnet C2 και θα υλοποιήσετε μηχανισμούς περιορισμού ρυθμού (rate limiting) κατά επιθέσεων DDoS και SYN floods.",
  },
  environment: [
    "Ubuntu 24.04 LTS Gateway VM with multi-homed virtual interfaces (`eth0`, `eth1`, `eth2`)",
    "Network tools: `suricata`, `iptables`, `nftables`, `tcpdump`, `tshark`, `hping3`, `nmap`",
    "Traffic generator toolset for SYN flood emulation and C2 replay",
    "Wireshark packet capture analyzer for protocol dissection",
  ],
  phases: [
    {
      phaseNumber: 1,
      title: {
        en: "Network Topology Discovery & Segmentation Baseline",
        el: "Ανακάλυψη Τοπολογίας Δικτύου & Βάση Τμηματοποίησης",
      },
      estimatedTime: { en: "25 min", el: "25 λεπτά" },
      objectives: {
        en: [
          "Enumerate network interfaces, routing tables, and active listening sockets with `ip`, `route`, and `ss`.",
          "Design a 3-tier segmentation architecture (Public DMZ, Internal App Tier, Restricted Database Vault).",
          "Verify inter-VLAN isolation rules.",
        ],
        el: [
          "Καταγραφή διεπαφών δικτύου, πινάκων δρομολόγησης και ανοιχτών θυρών με `ip`, `route` και `ss`.",
          "Σχεδιασμός αρχιτεκτονικής 3 επιπέδων (Public DMZ, Εφαρμογές, Βάσεις Δεδομένων).",
          "Επαλήθευση κανόνων απομόνωσης μεταξύ VLANs.",
        ],
      },
      steps: {
        en: [
          "1. Inspect network configuration:\n```bash\nip addr show\nip route show\nss -tulpn\n```",
          "2. Map subnet boundaries: DMZ (`192.168.10.0/24`), App Tier (`10.10.20.0/24`), DB Tier (`10.10.30.0/24`).",
          "3. Perform connectivity baseline checks using `ping` and `traceroute`.",
        ],
        el: [
          "1. Ελέγξτε τις ρυθμίσεις δικτύου:\n```bash\nip addr show\nip route show\nss -tulpn\n```",
          "2. Χαρτογραφήστε τα υποδίκτυα: DMZ (`192.168.10.0/24`), App Tier (`10.10.20.0/24`), DB Tier (`10.10.30.0/24`).",
          "3. Εκτελέστε ελέγχους συνδεσιμότητας με `ping` και `traceroute`.",
        ],
      },
    },
    {
      phaseNumber: 2,
      title: {
        en: "Stateful Packet Filtering with iptables / nftables",
        el: "Φιλτράρισμα Πακέτων Stateful με iptables / nftables",
      },
      estimatedTime: { en: "45 min", el: "45 λεπτά" },
      objectives: {
        en: [
          "Configure default DROP policy on INPUT, FORWARD, and OUTPUT chains.",
          "Allow established and related connections using `conntrack` state tracking.",
          "Enforce strict DMZ-to-DB pinhole routing rules.",
        ],
        el: [
          "Ρύθμιση προεπιλεγμένης πολιτικής DROP στις αλυσίδες INPUT, FORWARD και OUTPUT.",
          "Αποδοχή υφιστάμενων συνδέσεων με παρακολούθηση κατάστασης `conntrack` (ESTABLISHED, RELATED).",
          "Επιβολή αυστηρών κανόνων δρομολόγησης από το DMZ στη βάση δεδομένων.",
        ],
      },
      steps: {
        en: [
          "1. Flush existing rules and set default DROP policies:\n```bash\nsudo iptables -F\nsudo iptables -P INPUT DROP\nsudo iptables -P FORWARD DROP\nsudo iptables -P OUTPUT ACCEPT\n```",
          "2. Allow loopback and established stateful connections:\n```bash\nsudo iptables -A INPUT -i lo -j ACCEPT\nsudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT\nsudo iptables -A FORWARD -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT\n```",
          "3. Allow DMZ Web servers to query DB port 3306:\n```bash\nsudo iptables -A FORWARD -i eth1 -o eth2 -p tcp --dport 3306 -d 10.10.30.50 -j ACCEPT\n```",
        ],
        el: [
          "1. Εκκαθάριση υπαρχόντων κανόνων και ορισμός πολιτικής DROP:\n```bash\nsudo iptables -F\nsudo iptables -P INPUT DROP\nsudo iptables -P FORWARD DROP\nsudo iptables -P OUTPUT ACCEPT\n```",
          "2. Αποδοχή loopback και υφιστάμενων καταστάσεων συνδέσεων:\n```bash\nsudo iptables -A INPUT -i lo -j ACCEPT\nsudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT\nsudo iptables -A FORWARD -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT\n```",
          "3. Άδεια επικοινωνίας των web servers του DMZ προς τη βάση στη θύρα 3306:\n```bash\nsudo iptables -A FORWARD -i eth1 -o eth2 -p tcp --dport 3306 -d 10.10.30.50 -j ACCEPT\n```",
        ],
      },
    },
    {
      phaseNumber: 3,
      title: {
        en: "Suricata IDS/IPS Signature Deployment & Botnet C2 Interception",
        el: "Ανάπτυξη Υπογραφών IDS/IPS Suricata & Εντοπισμός Botnet C2",
      },
      estimatedTime: { en: "30 min", el: "30 λεπτά" },
      objectives: {
        en: [
          "Deploy Suricata engine in inline IPS mode on the perimeter gateway.",
          "Author custom Suricata rules detecting IRC/HTTP Botnet C2 beacon patterns.",
          "Verify automated packet drop and alert generation in `/var/log/suricata/fast.log` and `eve.json`.",
        ],
        el: [
          "Ανάπτυξη του Suricata σε λειτουργία inline IPS στην περιμετρική πύλη.",
          "Σύνταξη κανόνων Suricata για εντοπισμό σημάτων C2 (IRC/HTTP).",
          "Επαλήθευση απόρριψης πακέτων και παραγωγής ειδοποιήσεων στα αρχεία `fast.log` και `eve.json`.",
        ],
      },
      steps: {
        en: [
          "1. Create `/etc/suricata/rules/botnet.rules`:\n```text\ndrop tcp any any -> any [6667,8080] (msg:\"BOTNET C2 Beacon Detected\"; flow:to_server,established; content:\"USER bot_\"; sid:1000001; rev:1;)\n```",
          "2. Reload Suricata service:\n```bash\nsudo suricata -T -c /etc/suricata/suricata.yaml\nsudo systemctl restart suricata\n```",
          "3. Replay malicious C2 traffic and inspect live alerts:\n```bash\ntail -f /var/log/suricata/fast.log\n```",
        ],
        el: [
          "1. Δημιουργία κανόνα στο `/etc/suricata/rules/botnet.rules`:\n```text\ndrop tcp any any -> any [6667,8080] (msg:\"BOTNET C2 Beacon Detected\"; flow:to_server,established; content:\"USER bot_\"; sid:1000001; rev:1;)\n```",
          "2. Επανεκκίνηση και έλεγχος σύνταξης του Suricata:\n```bash\nsudo suricata -T -c /etc/suricata/suricata.yaml\nsudo systemctl restart suricata\n```",
          "3. Αναπαραγωγή κακόβουλης κίνησης C2 και παρακολούθηση ειδοποιήσεων:\n```bash\ntail -f /var/log/suricata/fast.log\n```",
        ],
      },
    },
    {
      phaseNumber: 4,
      title: {
        en: "TCP SYN Flood & DDoS Defense Implementation",
        el: "Υλοποίηση Άμυνας κατά TCP SYN Floods & Επιθέσεων DDoS",
      },
      estimatedTime: { en: "20 min", el: "20 λεπτά" },
      objectives: {
        en: [
          "Enable TCP SYN Cookies in the Linux kernel (`net.ipv4.tcp_syncookies = 1`).",
          "Configure iptables `hashlimit` rate limiting to block volumetric SYN floods.",
          "Simulate flood with `hping3` and observe connection state resiliency.",
        ],
        el: [
          "Ενεργοποίηση TCP SYN Cookies στον πυρήνα του Linux (`net.ipv4.tcp_syncookies = 1`).",
          "Ρύθμιση περιορισμού ρυθμού `hashlimit` στο iptables για αποτροπή SYN floods.",
          "Προσομοίωση επίθεσης με `hping3` και παρατήρηση της ανθεκτικότητας των συνδέσεων.",
        ],
      },
      steps: {
        en: [
          "1. Enable SYN Cookies via sysctl:\n```bash\nsudo sysctl -w net.ipv4.tcp_syncookies=1\nsudo sysctl -w net.ipv4.tcp_max_syn_backlog=4096\n```",
          "2. Apply iptables SYN rate limiter:\n```bash\nsudo iptables -A INPUT -p tcp --syn -m hashlimit --hashlimit-name syn_flood --hashlimit-mode srcip --hashlimit-above 25/sec --hashlimit-burst 50 -j DROP\n```",
          "3. Validate protection under high load:\n```bash\nhping3 --flood -S -p 80 127.0.0.1 -c 1000\n```",
        ],
        el: [
          "1. Ενεργοποίηση SYN Cookies μέσω sysctl:\n```bash\nsudo sysctl -w net.ipv4.tcp_syncookies=1\nsudo sysctl -w net.ipv4.tcp_max_syn_backlog=4096\n```",
          "2. Εφαρμογή κανόνα περιορισμού ρυθμού SYN στο iptables:\n```bash\nsudo iptables -A INPUT -p tcp --syn -m hashlimit --hashlimit-name syn_flood --hashlimit-mode srcip --hashlimit-above 25/sec --hashlimit-burst 50 -j DROP\n```",
          "3. Επαλήθευση προστασίας υπό υψηλό φορτίο:\n```bash\nhping3 --flood -S -p 80 127.0.0.1 -c 1000\n```",
        ],
      },
    },
  ],
  deliverables: {
    en: [
      "Hardened iptables / nftables Firewall Script (`firewall_production.sh`)",
      "Custom Suricata IDS/IPS Ruleset (`botnet_defense.rules`)",
      "DDoS Defense & Kernel Sysctl Configuration (`sysctl_net_hardening.conf`)",
      "Technical Laboratory Report (3–4 pages) with Wireshark PCAP screenshots",
    ],
    el: [
      "Σενάριο Ενισχυμένου Firewall iptables / nftables (`firewall_production.sh`)",
      "Σουίτα Προσαρμοσμένων Κανόνων Suricata IDS/IPS (`botnet_defense.rules`)",
      "Ρυθμίσεις Πυρήνα Sysctl για Προστασία από DDoS (`sysctl_net_hardening.conf`)",
      "Τεχνική Έκθεση Εργαστηρίου (3–4 σελίδες) με στιγμιότυπα αναλύσεων PCAP",
    ],
  },
  verificationChecklist: {
    en: [
      "Default DROP policy enforced on all firewall chains.",
      "Conntrack properly maintains state for established flows.",
      "Suricata IPS successfully drops simulated C2 beacon packets in real time.",
      "SYN cookies and hashlimit rate-limiting prevent service exhaustion during SYN floods.",
    ],
    el: [
      "Η προεπιλεγμένη πολιτική DROP επιβάλλεται σε όλες τις αλυσίδες του firewall.",
      "Το Conntrack διατηρεί ορθά την κατάσταση για τις νόμιμες συνδέσεις.",
      "Το Suricata IPS απορρίπτει σε πραγματικό χρόνο τα πακέτα σημάτων C2.",
      "Τα SYN cookies και το hashlimit αποτρέπουν την εξάντληση πόρων κατά τη διάρκεια SYN floods.",
    ],
  },
};

export const ch06Project: TechnicalProject = {
  id: "ch06-arch",
  category: {
    en: "Enterprise Architecture & Assessment Blueprint",
    el: "Αρχιτεκτονική Επιχείρησης & Στρατηγικό Πλάνο",
  },
  title: {
    en: "Zero-Trust Enterprise Network Architecture & Botnet C2 Disruption Engine",
    el: "Αρχιτεκτονική Δικτύου Μηδενικής Εμπιστοσύνης & Μηχανή Εξουδετέρωσης Botnet C2",
  },
  subtitle: {
    en: "Microsegmentation Design, Automated Network Telemetry Processing, and C2 Traffic Egress Filtering",
    el: "Σχεδιασμός Μικροτμηματοποίησης, Αυτοματοποιημένη Επεξεργασία Τηλεμετρίας Δικτύου και Φιλτράρισμα Εξόδου C2",
  },
  scenario: {
    en: "A global telecommunications provider is overhauling its datacenter infrastructure to adopt Zero Trust Network Architecture (ZTNA). As Chief Network Security Architect, you must eliminate flat network legacy routing, design automated microsegmentation across software-defined networks (SDN), deploy automated IDS/IPS telemetry pipelines, and build an active botnet C2 disruption and DNS sinkholing engine.",
    el: "Ένας διεθνής τηλεπικοινωνιακός πάροχος αναβαθμίζει τις υποδομές των κέντρων δεδομένων του για υιοθέτηση Αρχιτεκτονικής Μηδενικής Εμπιστοσύνης (ZTNA). Ως Επικεφαλής Αρχιτέκτονας Ασφάλειας Δικτύων, πρέπει να καταργήσετε την επίπεδη δρομολόγηση, να σχεδιάσετε αυτοματοποιημένη μικροτμηματοποίηση σε SDN, να αναπτύξετε αγωγούς τηλεμετρίας IDS/IPS και να δημιουργήσετε μια μηχανή εξουδετέρωσης Botnet C2 με DNS Sinkholing.",
  },
  objectives: {
    en: [
      "Architect a Zero-Trust microsegmented network topology isolating east-west lateral movement.",
      "Develop a real-time network flow analyzer in Python using `pyshark` or `scapy`.",
      "Implement automated DNS sinkholing and IP reputation dynamic blocking.",
      "Simulate and mitigate P2P and DGA (Domain Generation Algorithm) botnet communications.",
    ],
    el: [
      "Σχεδιασμός μικροτμηματοποιημένης τοπολογίας Μηδενικής Εμπιστοσύνης για αποτροπή πλευρικής μετακίνησης.",
      "Ανάπτυξη αναλυτή ροών δικτύου πραγματικού χρόνου σε Python με `pyshark` ή `scapy`.",
      "Υλοποίηση αυτοματοποιημένου DNS Sinkholing και δυναμικού αποκλεισμού διευθύνσεων IP.",
      "Προσομοίωση και εξουδετέρωση επικοινωνιών Botnet P2P και DGA (Domain Generation Algorithms).",
    ],
  },
  scope: {
    en: [
      "Enterprise datacenter VLANs, DMZ web tiers, Kubernetes service mesh, and remote VPN gateways.",
      "Network protocols: TCP, UDP, DNS, TLS 1.3, BGP, GRE tunneling.",
    ],
    el: [
      "VLANs κέντρου δεδομένων, επίπεδα DMZ, Kubernetes service mesh και πύλες VPN.",
      "Πρωτόκολλα δικτύου: TCP, UDP, DNS, TLS 1.3, BGP, τούνελ GRE.",
    ],
  },
  milestones: [
    {
      milestoneNumber: 1,
      title: {
        en: "Zero-Trust Microsegmentation & Data Flow Matrix",
        el: "Μικροτμηματοποίηση Μηδενικής Εμπιστοσύνης & Πίνακας Ροών Δεδομένων",
      },
      description: {
        en: "Produce comprehensive network architectural blueprint defining overlay zones, security groups, and microsegmentation policies.",
        el: "Δημιουργία ολοκληρωμένου αρχιτεκτονικού σχεδίου με ζώνες επικάλυψης, ομάδες ασφάλειας και πολιτικές μικροτμηματοποίησης.",
      },
      detailedSpec: {
        en: [
          "Architect continuous asset discovery engine ingesting network active scans, cloud APIs, and CMDB records.",
          "Classify external attack surface assets and discover rogue shadow IT infrastructure.",
          "Establish asset inventory database with real-time tagging and criticality scoring."
],
        el: [
          "Σχεδιασμός μηχανής συνεχούς καταγραφής περιουσιακών στοιχείων μέσω σαρώσεων, cloud APIs και CMDB.",
          "Κατηγοριοποίηση εξωτερικής επιφάνειας επίθεσης και εντοπισμός Shadow IT.",
          "Δημιουργία βάσης δεδομένων ενεργητικού με βαθμολόγηση κρισιμότητας."
],
      },
      deliverable: {
        en: "Architectural blueprint diagram + Inter-zone traffic matrix.",
        el: "Αρχιτεκτονικό διάγραμμα + Πίνακας διαζωνικής κίνησης.",
      },
    },
    {
      milestoneNumber: 2,
      title: {
        en: "Live Packet Telemetry & Flow Classification Engine",
        el: "Μηχανή Τηλεμετρίας Πακέτων & Ταξινόμησης Ροών Πραγματικού Χρόνου",
      },
      description: {
        en: "Build `flow_monitor.py` capturing network streams, calculating entropy, detecting port scans, and identifying protocol anomalies.",
        el: "Ανάπτυξη του `flow_monitor.py` για καταγραφή ροών δικτύου, υπολογισμό εντροπίας και εντοπισμό σαρώσεων θυρών.",
      },
      detailedSpec: {
        en: [
          "Design vulnerability prioritization algorithm combining CVSS 4.0, EPSS probability, and CISA KEV data.",
          "Define risk formula: `Priority_Score = CVSS_Base * (1 + 2*EPSS) * (1.5 if in_CISA_KEV else 1.0) * Asset_Criticality`.",
          "Construct automated triage pipeline assigning SLAs (Critical: 48h, High: 7d, Medium: 30d)."
],
        el: [
          "Σχεδιασμός αλγορίθμου ιεράρχησης ευπαθειών με συνδυασμό CVSS 4.0, EPSS και CISA KEV.",
          "Ορισμός μαθηματικού τύπου επικινδυνότητας και αυτόματη ανάθεση SLAs (Critical: 48h, High: 7d).",
          "Κατασκευή αγωγού αυτόματης διαλογής ευπαθειών."
],
      },
      deliverable: {
        en: "Python network telemetry engine + benchmark test suite.",
        el: "Μηχανή τηλεμετρίας Python + σουίτα δοκιμών απόδοσης.",
      },
    },
    {
      milestoneNumber: 3,
      title: {
        en: "Automated DNS Sinkholing & Botnet DGA Classifier",
        el: "Αυτοματοποιημένο DNS Sinkholing & Ταξινομητής Botnet DGA",
      },
      description: {
        en: "Develop an algorithm detecting high-entropy algorithmic domain names (DGA) in DNS queries and redirecting C2 queries to a local sinkhole.",
        el: "Ανάπτυξη αλγορίθμου εντοπισμού ονομάτων DGA υψηλής εντροπίας στο DNS και ανακατεύθυνση των ερωτημάτων C2 σε τοπικό sinkhole.",
      },
      detailedSpec: {
        en: [
          "Architect automated patching orchestration across Linux (apt/dnf) and Windows Server (WSUS/Intune).",
          "Design canary deployment staging (Dev -> Staging -> 10% Prod -> 100% Prod) with automated rollback triggers.",
          "Establish compensating virtual patching rules in WAF/IPS for zero-day vulnerabilities."
],
        el: [
          "Αρχιτεκτονική αυτοματοποιημένης εγκατάστασης patches σε Linux και Windows Server.",
          "Σχεδιασμός σταδιακής διάθεσης (canary staging) με αυτόματο rollback.",
          "Καθορισμός κανόνων virtual patching σε WAF/IPS για ευπάθειες zero-day."
],
      },
      deliverable: {
        en: "DNS Sinkhole proxy module + DGA detection script.",
        el: "Υπομονάδα DNS Sinkhole + σενάριο ανίχνευσης DGA.",
      },
    },
    {
      milestoneNumber: 4,
      title: {
        en: "DDoS Mitigation Engine & Executive Network Defense Plan",
        el: "Μηχανή Μετριασμού DDoS & Επιτελικό Σχέδιο Άμυνας Δικτύου",
      },
      description: {
        en: "Implement automated BGP FlowSpec / dynamic iptables blackholing during flood attacks, delivering an executive network resilience charter.",
        el: "Υλοποίηση αυτοματοποιημένου dynamic blackholing κατά τη διάρκεια επιθέσεων flood και παράδοση επιτελικού σχεδίου ανθεκτικότητας.",
      },
      detailedSpec: {
        en: [
          "Construct interactive MITRE ATT&CK coverage heatmap mapping discovered CVEs to threat actor TTPs.",
          "Design executive CTEM governance dashboard displaying vulnerability dwell time and SLA compliance.",
          "Draft annual threat exposure and remediation strategy for the Executive Committee."
],
        el: [
          "Κατασκευή διαδραστικού χάρτη κάλυψης MITRE ATT&CK συνδέοντας CVEs με τεχνικές επιτιθέμενων.",
          "Σχεδιασμός executive CTEM dashboard με χρόνο παραμονής ευπαθειών και συμμόρφωση SLA.",
          "Σύνταξη ετήσιας στρατηγικής διαχείρισης έκθεσης σε απειλές."
],
      },
      deliverable: {
        en: "DDoS mitigation scripts + Executive Network Defense charter.",
        el: "Σενάρια μετριασμού DDoS + Επιτελικό σχέδιο άμυνας δικτύου.",
      },
    },
  ],
  deliverables: {
    en: [
      "Zero-Trust Architecture & Topology Blueprint (PDF / Visio / Draw.io)",
      "Python Network Flow Monitoring Codebase (`/net_engine/`)",
      "DNS Sinkholing & DGA Classifier Suite (`/dga_sinkhole/`)",
      "Executive Network Security & Resilience Strategy (10–12 pages)",
    ],
    el: [
      "Αρχιτεκτονικό Σχέδιο Μηδενικής Εμπιστοσύνης (PDF / Draw.io)",
      "Πηγαίος Κώδικας Παρακολούθησης Ροών Δικτύου Python (`/net_engine/`)",
      "Σουίτα DNS Sinkholing & Ταξινομητή DGA (`/dga_sinkhole/`)",
      "Επιτελική Στρατηγική Ασφάλειας & Ανθεκτικότητας Δικτύου (10–12 σελίδες)",
    ],
  },
  rubric: [
    {
      criterion: {
        en: "Zero-Trust Architecture & Microsegmentation Rigor",
        el: "Αρχιτεκτονική Μηδενικής Εμπιστοσύνης & Μικροτμηματοποίηση",
      },
      weight: "30%",
      description: {
        en: "Comprehensive isolation of east-west network traffic, strict boundary enforcement, and least-privilege routing.",
        el: "Πλήρης απομόνωση της πλευρικής (east-west) κίνησης, αυστηρά όρια προστασίας και δρομολόγηση ελάχιστου προνομίου.",
      },
    },
    {
      criterion: {
        en: "Real-Time Telemetry & Flow Processing Quality",
        el: "Ποιότητα Τηλεμετρίας & Επεξεργασίας Ροών Πραγματικού Χρόνου",
      },
      weight: "25%",
      description: {
        en: "Accuracy and throughput of packet capture, low CPU overhead, and robust protocol dissection.",
        el: "Ακρίβεια και ταχύτητα διαμεταγωγής καταγραφής πακέτων, χαμηλή κατανάλωση CPU και αξιόπιστη ανάλυση πρωτοκόλλων.",
      },
    },
    {
      criterion: {
        en: "Botnet DGA Detection & Sinkholing Efficacy",
        el: "Αποτελεσματικότητα Ανίχνευσης DGA & DNS Sinkholing",
      },
      weight: "25%",
      description: {
        en: "Precision of entropy-based DGA classification, minimal false positives on legitimate CDNs, and reliable redirection.",
        el: "Ακρίβεια ταξινόμησης DGA βάσει εντροπίας, ελάχιστα ψευδώς θετικά σε νόμιμα CDNs και αξιόπιστη ανακατεύθυνση.",
      },
    },
    {
      criterion: {
        en: "DDoS Mitigation Resilience & Executive Documentation",
        el: "Ανθεκτικότητα Μετριασμού DDoS & Επιτελική Τεκμηρίωση",
      },
      weight: "20%",
      description: {
        en: "Effectiveness of SYN cookie and rate-limiting scripts, combined with clear executive strategic communication.",
        el: "Αποτελεσματικότητα SYN cookies και περιορισμού ρυθμού, σε συνδυασμό με σαφή επιτελική τεκμηρίωση.",
      },
    },
  ],
};

export const ch06Quiz: QuizQuestion[] = [
  {
    id: 1,
    question: {
      en: "In the CVSS 4.0 vulnerability scoring framework, which three core metric groups are combined to evaluate risk severity?",
      el: "Στο πλαίσιο αξιολόγησης ευπαθειών CVSS 4.0, ποιες τρεις βασικές ομάδες δεικτών συνδυάζονται για τον υπολογισμό της σοβαρότητας;",
    },
    options: {
      en: [
        "Source Code Lines (SLOC), Compiler Optimization Level (O3), and Operating System Kernel Version number, during standard continuous monitoring and administrative audits.",
        "Base Metrics (intrinsic qualities), Threat Metrics (exploit maturity), and Environmental Metrics (context controls).",
        "Network Bandwidth (Gbps), Processor Clock Frequency (GHz), and RAM Utilization percentage metrics, to ensure high-availability operational compliance across systems.",
        "Physical Security Clearances, Employee Background Checks, and Hardware Biometric Sensor accuracies, using standardized organizational security policy configurations.",
        "Database Transaction Rates, Hard Disk Seek Latencies, and Dynamic Memory Allocation page sizes, across distributed multi-region cloud production environments.",
      ],
      el: [
        "Γραμμές Κώδικα (SLOC), Επίπεδο Βελτιστοποίησης Μεταγλωττιστή (O3) και Έκδοση Πυρήνα Λειτουργικού, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Βασικοί Δείκτες (εγγενή χαρακτηριστικά), Δείκτες Απειλής (ωριμότητα exploit) και Περιβαλλοντικοί Δείκτες.",
        "Εύρος Ζώνης Δικτύου (Gbps), Συχνότητα Επεξεργαστή (GHz) και Ποσοστό Χρήσης Μνήμης RAM, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Διαβαθμίσεις Φυσικής Ασφάλειας, Έλεγχοι Προσωπικού και Ακρίβεια Βιομετρικών Αισθητήρων Υλικού, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
        "Ρυθμοί Συναλλαγών Βάσης, Χρόνοι Αναζήτησης Δίσκου και Μεγέθη Σελίδων Δυναμικής Μνήμης, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "CVSS 4.0 structures severity into Base (intrinsic technical flaw), Threat (real-world exploit maturity / weaponization), and Environmental (organization-specific mitigations and impact).",
      el: "Το CVSS 4.0 δομεί τη σοβαρότητα σε Βασικούς (εγγενές τεχνικό κενό), Απειλής (ωριμότητα εκμετάλλευσης) και Περιβαλλοντικούς δείκτες (εφαρμοσμένα μέτρα και επιπτώσεις στον οργανισμό).",
    },
  },
  {
    id: 2,
    question: {
      en: "What is the primary technical root cause of SQL Injection (SQLi) vulnerabilities in web applications?",
      el: "Ποια είναι η κύρια τεχνική αιτία των ευπαθειών SQL Injection (SQLi) σε διαδικτυακές εφαρμογές;",
    },
    options: {
      en: [
        "Configuring database tables without primary keys or unique foreign key relational constraints.",
        "Using TLS 1.2 instead of TLS 1.3 for encrypting database network connection transport channels.",
        "Concatenating unsanitized user input directly into dynamic database SQL query command strings.",
        "Hosting database services on Linux operating systems rather than Windows Server enterprise editions.",
        "Allocating less than sixteen gigabytes of physical RAM to the database query caching buffer pool.",
      ],
      el: [
        "Διαμόρφωση πινάκων βάσης χωρίς πρωτεύοντα κλειδιά ή περιορισμούς ακεραιότητας ξένων κλειδιών.",
        "Χρήση TLS 1.2 αντί για TLS 1.3 για την κρυπτογράφηση του καναλιού σύνδεσης με τη βάση δεδομένων.",
        "Συνένωση μη απολυμασμένων δεδομένων εισόδου χρήστη απευθείας σε δυναμικά ερωτήματα SQL της βάσης.",
        "Φιλοξενία βάσεων σε λειτουργικά συστήματα Linux αντί για Windows Server enterprise editions.",
        "Δέσμευση λιγότερων από 16 GB μνήμης RAM για την προσωρινή μνήμη προσωρινής αποθήκευσης ερωτημάτων.",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "SQLi occurs when untrusted user input is directly concatenated into SQL queries rather than using Parameterized Queries (Prepared Statements) or Object-Relational Mappings (ORMs).",
      el: "Το SQLi συμβαίνει όταν δεδομένα χρήστη συνενώνονται απευθείας σε ερωτήματα SQL αντί να χρησιμοποιούνται Παραμετροποιημένα Ερωτήματα (Prepared Statements) ή ORMs.",
    },
  },
  {
    id: 3,
    question: {
      en: "How does Cross-Site Scripting (XSS) compromise client browsers interacting with web applications?",
      el: "Πώς προσβάλλει το Cross-Site Scripting (XSS) τους περιηγητές χρηστών που επισκέπτονται μια εφαρμογή ιστού;",
    },
    options: {
      en: [
        "By overflowing CPU registers on the backend database server during complex join operations, to ensure high-availability operational compliance across systems.",
        "By exhausting physical network switch bandwidth through high-volume ICMP echo request packets, across distributed multi-region cloud production environments.",
        "By altering DNS root zone files to point traffic to rogue recursive nameserver infrastructure, without requiring manual intervention from systems engineering staff.",
        "By injecting malicious client-side scripts (e.g. JavaScript) executed within the victim's browser context.",
        "By disabling operating system firewall kernel rules during local administrative logins, to mitigate potential unauthorized system configuration drift.",
      ],
      el: [
        "Υπερχειλίζοντας τους καταχωρητές CPU στον εξυπηρετητή βάσης δεδομένων κατά την εκτέλεση ερωτημάτων, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Εξαντλώντας το εύρος ζώνης των δικτυακών μεταγωγέων μέσω τεράστιου όγκου πακέτων ICMP echo, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Αλλοιώνοντας αρχεία ριζικών ζωνών DNS για ανακατεύθυνση κίνησης σε κακόβουλους επιλυτές ονομάτων, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Εισάγοντας κακόβουλο κώδικα (π.χ. JavaScript) που εκτελείται στο πλαίσιο του περιηγητή του θύματος.",
        "Απενεργοποιώντας κανόνες τείχους προστασίας του πυρήνα κατά τη σύνδεση τοπικού διαχειριστή, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
      ],
    },
    correctIndex: 3,
    explanation: {
      en: "XSS allows attackers to execute arbitrary JavaScript in the victim's browser session, enabling session token theft, DOM manipulation, credential harvesting, or unauthorized actions.",
      el: "Το XSS επιτρέπει την εκτέλεση κακόβουλης JavaScript στον περιηγητή του χρήστη, οδηγώντας σε υποκλοπή session cookies, τροποποίηση του DOM ή εκτέλεση μη εξουσιοδοτημένων ενεργειών.",
    },
  },
  {
    id: 4,
    question: {
      en: "What is the primary difference in methodology between Static Application Security Testing (SAST) and Dynamic Application Security Testing (DAST)?",
      el: "Ποια είναι η βασική διαφορά μεθοδολογίας μεταξύ Στατικής (SAST) και Δυναμικής (DAST) Δοκιμής Ασφάλειας Εφαρμογών;",
    },
    options: {
      en: [
        "SAST operates exclusively on production database tables, whereas DAST operates exclusively on local git repositories, across distributed multi-region cloud production environments.",
        "SAST requires physical biometric smart card readers, whereas DAST requires post-quantum asymmetric encryption, without requiring manual intervention from systems engineering staff.",
        "SAST tests network switch packet buffer limits, whereas DAST compiles executable assembly binary drivers, to mitigate potential unauthorized system configuration drift.",
        "SAST is performed only by external law enforcement, whereas DAST is performed only by internal legal teams, in accordance with modern zero trust architectural principles.",
        "SAST analyzes source code without executing the application (white-box), whereas DAST tests running applications from the outside (black-box).",
      ],
      el: [
        "Το SAST λειτουργεί αποκλειστικά σε πίνακες παραγωγής, ενώ το DAST λειτουργεί αποκλειστικά σε αποθετήρια git, σε κατανεμημένα περιβάλλοντα παραγωγής cloud πολλαπλών περιφερειών.",
        "Το SAST απαιτεί αναγνώστες έξυπνων καρτών, ενώ το DAST απαιτεί μετα-κβαντική ασύμμετρη κρυπτογράφηση, χωρίς να απαιτείται χειροκίνητη παρέμβαση από το τεχνικό προσωπικό.",
        "Το SAST ελέγχει τα όρια buffer των switches, ενώ το DAST μεταγλωττίζει δυαδικούς οδηγούς συσκευών, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Το SAST εκτελείται μόνο από διωκτικές αρχές, ενώ το DAST εκτελείται μόνο από εσωτερικές νομικές ομάδες, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Το SAST αναλύει πηγαίο κώδικα χωρίς εκτέλεση (white-box), ενώ το DAST ελέγχει την εφαρμογή εν ώρα εκτέλεσης (black-box).",
      ],
    },
    correctIndex: 4,
    explanation: {
      en: "SAST inspects non-running source code/bytecode (white-box) to find coding flaws early. DAST attacks running applications via HTTP (black-box) to identify runtime vulnerabilities.",
      el: "Το SAST εξετάζει τον πηγαίο κώδικα χωρίς να τον εκτελεί (white-box). Το DAST επιτίθεται στην εφαρμογή κατά την εκτέλεσή της μέσω HTTP (black-box) εντοπίζοντας runtime ευπάθειες.",
    },
  },
  {
    id: 5,
    question: {
      en: "In threat modeling using the STRIDE framework, which specific security threat category addresses an attacker tampering with data in transit or storage?",
      el: "Στη μοντελοποίηση απειλών με το πλαίσιο STRIDE, ποια κατηγορία αφορά την αλλοίωση δεδομένων κατά τη μεταφορά ή την αποθήκευση;",
    },
    options: {
      en: [
        "Tampering, modifying data or system state without legitimate authorization.",
        "Spoofing, impersonating another valid identity or network entity to gain illicit entry.",
        "Repudiation, denying having performed a specific transaction or administrative action.",
        "Information Disclosure, leaking confidential records or tokens to unauthorized recipients.",
        "Elevation of Privilege, gaining higher execution rights than originally authorized.",
      ],
      el: [
        "Tampering, παραποιώντας δεδομένα ή την κατάσταση του συστήματος χωρίς εξουσιοδότηση.",
        "Spoofing, υποδυόμενος μια έγκυρη ταυτότητα ή οντότητα για απόκτηση πρόσβασης.",
        "Repudiation, αρνούμενος την τέλεση μιας συγκεκριμένης ενέργειας ή συναλλαγής.",
        "Information Disclosure, διαρρέοντας εμπιστευτικά δεδομένα σε μη εξουσιοδοτημένα άτομα.",
        "Elevation of Privilege, αποκτώντας ανώτερα δικαιώματα από τα αρχικά εγκεκριμένα.",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "STRIDE stands for Spoofing (Confidentiality/Auth), Tampering (Integrity violation), Repudiation (Non-repudiation), Information Disclosure (Confidentiality), Denial of Service (Availability), and Elevation of Privilege (Authorization).",
      el: "Το STRIDE περιλαμβάνει Spoofing (πλαστοπροσωπία), Tampering (αλλοίωση/ακεραιότητα), Repudiation (αποποίηση), Information Disclosure (διαρροή), Denial of Service (άρνηση) και Elevation of Privilege (κλιμάκωση).",
    },
  },
  {
    id: 6,
    question: {
      en: "What primary purpose does a Software Bill of Materials (SBOM) serve in modern supply chain security?",
      el: "Ποιο βασικό σκοπό εξυπηρετεί ένα Software Bill of Materials (SBOM) στην ασφάλεια της εφοδιαστικής αλυσίδας λογισμικού;",
    },
    options: {
      en: [
        "It automatically encrypts all backend database records using ephemeral elliptic curve private keys, to mitigate potential unauthorized system configuration drift.",
        "It provides an inventory of all third-party dependencies, libraries, and licenses embedded in software.",
        "It generates automated synthetic test user accounts for frontend quality assurance functional testing, in accordance with modern zero trust architectural principles.",
        "It replaces the need for continuous integration build servers by compiling binaries directly in memory.",
        "It converts relational database tables into non-relational document collections during application boot.",
      ],
      el: [
        "Κρυπτογραφεί αυτόματα όλες τις εγγραφές της βάσης δεδομένων χρησιμοποιώντας εφήμερα ιδιωτικά κλειδιά ECC, για τον μετριασμό πιθανών μη εξουσιοδοτημένων αποκλίσεων ρυθμίσεων.",
        "Παρέχει αναλυτική καταγραφή όλων των βιβλιοθηκών, εξαρτήσεων τρίτων και αδειών που περιέχονται στο λογισμικό.",
        "Παράγει συνθετικούς λογαριασμούς χρηστών για δοκιμές διασφάλισης ποιότητας της διεπαφής χρήστη, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Καταργεί τους διακομιστές CI μεταγλωττίζοντας εκτελέσιμα αρχεία απευθείας στην προσωρινή μνήμη RAM.",
        "Μετατρέπει σχεσιακούς πίνακες σε μη σχεσιακά έγγραφα δεδομένων κατά την εκκίνηση της εφαρμογής.",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "An SBOM (in CycloneDX or SPDX format) lists all components, libraries, and modules used in an application, enabling rapid identification of vulnerable packages (e.g. Log4j, OpenSSL CVEs).",
      el: "Το SBOM καταγράφει αναλυτικά όλα τα εξαρτώμενα πακέτα και βιβλιοθήκες ενός λογισμικού, επιτρέποντας τον άμεσο εντοπισμό ευπαθειών (π.χ. Log4j) στην εφοδιαστική αλυσίδα.",
    },
  },
  {
    id: 7,
    question: {
      en: "How does Server-Side Request Forgery (SSRF) allow attackers to access internal cloud resources?",
      el: "Πώς επιτρέπει το Server-Side Request Forgery (SSRF) σε επιτιθέμενους να αποκτήσουν πρόσβαση σε εσωτερικούς πόρους cloud;",
    },
    options: {
      en: [
        "By executing offline dictionary password cracking against local workstation active directory cache hashes, in accordance with modern zero trust architectural principles.",
        "By injecting malformed SQL commands into client browser cookie headers during transport layer handshakes, before committing changes to central production repository nodes.",
        "By coercing the vulnerable backend server to make unauthorized HTTP requests to internal endpoints or metadata APIs.",
        "By establishing unauthorized peer-to-peer tunnels across transatlantic subsea telecommunications lines, under standard operating procedures defined in corporate ISMS policies.",
        "By disabling operating system kernel address space layout randomization protections during application boot, across all internal enterprise network segments and endpoints.",
      ],
      el: [
        "Εκτελώντας επιθέσεις λεξικού κατά των τοπικών προσωρινών αποθηκευμένων κωδικών του Active Directory, σύμφωνα με τις σύγχρονες αρχιτεκτονικές αρχές μηδενικής εμπιστοσύνης.",
        "Εισάγοντας κακόβουλο κώδικα SQL σε κεφαλίδες cookies του περιηγητή κατά τη χειραψία επιπέδου μεταφοράς, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Εξαναγκάζοντας τον ευάλωτο εξυπηρετητή να στείλει αιτήματα HTTP σε εσωτερικές υπηρεσίες ή APIs μεταδεδομένων cloud.",
        "Δημιουργώντας μη εξουσιοδοτημένα peer-to-peer τούνελ σε υποθαλάσσια καλώδια διεθνών επικοινωνιών, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Απενεργοποιώντας την προστασία ASLR του πυρήνα του λειτουργικού συστήματος κατά την εκκίνηση, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "SSRF tricks a server into fetching remote URLs provided by the attacker, allowing them to access internal network services (e.g. cloud metadata instance at 169.254.169.254) hidden behind firewalls.",
      el: "Το SSRF εξαπατά τον εξυπηρετητή ώστε να καλέσει διευθύνσεις URL του επιτιθέμενου, αποκτώντας πρόσβαση σε εσωτερικά endpoints (όπως το cloud metadata 169.254.169.254) πίσω από το firewall.",
    },
  },
  {
    id: 8,
    question: {
      en: "What is the primary technical objective of a 'Bug Bounty' vulnerability disclosure program?",
      el: "Ποιος είναι ο πρωταρχικός τεχνικός στόχος ενός προγράμματος Bug Bounty για την αποκάλυψη ευπαθειών;",
    },
    options: {
      en: [
        "Outsourcing all corporate software development responsibilities to freelance independent contractors, before committing changes to central production repository nodes.",
        "Permanently replacing internal software quality assurance teams with automated regression test scripts, under standard operating procedures defined in corporate ISMS policies.",
        "Selling zero-day vulnerability exploits to commercial offensive cyber intelligence broker organizations, across all internal enterprise network segments and endpoints.",
        "Incentivizing ethical security researchers to discover and responsibly report security flaws before malicious exploitation.",
        "Eliminating the necessity for continuous integration security scanning and penetration testing audits, during standard continuous monitoring and administrative audits.",
      ],
      el: [
        "Ανάθεση όλης της ευθύνης ανάπτυξης λογισμικού της επιχείρησης σε ανεξάρτητους εξωτερικούς προγραμματιστές, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Μόνιμη αντικατάσταση των εσωτερικών ομάδων δοκιμών ποιότητας από αυτοματοποιημένα scripts ελέγχου, υπό τις τυπικές διαδικασίες λειτουργίας των εταιρικών πολιτικών ISMS.",
        "Πώληση ευπαθειών μηδενικής ημέρας (zero-days) σε εμπορικές εταιρείες κυβερνοεπιχειρήσεων, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Παροχή κινήτρων σε ερευνητές ασφάλειας για τον εντοπισμό και υπεύθυνη αναφορά κενών πριν από κακόβουλη εκμετάλλευση.",
        "Κατάργηση της ανάγκης για συνεχείς ελέγχους ασφάλειας και δοκιμές διείσδυσης (penetration testing), κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
      ],
    },
    correctIndex: 3,
    explanation: {
      en: "Bug bounty programs provide legal frameworks and monetary rewards for external researchers to discover and report vulnerabilities responsibly, hardening systems before attackers exploit them.",
      el: "Τα προγράμματα Bug Bounty παρέχουν νόμιμο πλαίσιο και αμοιβές σε ηθικούς ερευνητές για την ανακάλυψη και υπεύθυνη αναφορά ευπαθειών πριν τις εκμεταλλευτούν κακόβουλοι δράστες.",
    },
  },
  {
    id: 9,
    question: {
      en: "What memory corruption vulnerability occurs when dynamically allocated memory is freed but subsequently accessed by a program pointer?",
      el: "Ποια ευπάθεια αλλοίωσης μνήμης προκύπτει όταν αποδεσμευμένη δυναμική μνήμη προσπελαύνεται εκ νέου μέσω ενός δείκτη;",
    },
    options: {
      en: [
        "Buffer Underflow, reading data located immediately before the allocated array boundary index, before committing changes to central production repository nodes.",
        "Format String Vulnerability, parsing untrusted format specifiers inside printf family function calls, across all internal enterprise network segments and endpoints.",
        "Integer Overflow, wrapping arithmetic operations past the maximum allowable bit register boundary, during standard continuous monitoring and administrative audits.",
        "Null Pointer Dereference, attempting to read or write to address zero causing an unhandled fault, to ensure high-availability operational compliance across systems.",
        "Use-After-Free (UAF), accessing memory after it has been deallocated, risking arbitrary code execution.",
      ],
      el: [
        "Buffer Underflow, διαβάζοντας δεδομένα που βρίσκονται αμέσως πριν από το όριο του πίνακα στη μνήμη, πριν την οριστικοποίηση αλλαγών στους κεντρικούς κόμβους αποθετηρίων.",
        "Format String Vulnerability, αναλύοντας μη αξιόπιστους προσδιοριστές μορφοποίησης στη συνάρτηση printf, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Integer Overflow, υπερβαίνοντας το μέγιστο όριο αναπαράστασης ακεραίων στον καταχωρητή του επεξεργαστή, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Null Pointer Dereference, επιχειρώντας πρόσβαση στη διεύθυνση μηδέν προκαλώντας κατάρρευση διεργασίας, για τη διασφάλιση επιχειρησιακής συμμόρφωσης υψηλής διαθεσιμότητας.",
        "Use-After-Free (UAF), προσπελαύνοντας μνήμη μετά την αποδέσμευσή της, οδηγώντας σε εκτέλεση αυθαίρετου κώδικα.",
      ],
    },
    correctIndex: 4,
    explanation: {
      en: "Use-After-Free (UAF) occurs when a program continues to use a pointer after the memory chunk has been freed. Attackers can reallocate that memory with attacker-controlled data to hijack control flow.",
      el: "Το Use-After-Free (UAF) συμβαίνει όταν ένας δείκτης χρησιμοποιεί μνήμη που έχει ήδη αποδεσμευτεί. Εάν ο επιτιθέμενος καταλάβει αυτό το τμήμα μνήμης, μπορεί να εκτελέσει αυθαίρετο κώδικα.",
    },
  },
  {
    id: 10,
    question: {
      en: "Which defensive coding practice directly neutralizes Cross-Site Request Forgery (CSRF) vulnerabilities in state-changing HTTP requests?",
      el: "Ποια πρακτική ασφαλούς προγραμματισμού εξουδετερώνει άμεσα τις ευπάθειες CSRF σε αιτήματα HTTP που αλλάζουν κατάσταση;",
    },
    options: {
      en: [
        "Employing unique, cryptographically random Anti-CSRF tokens and configuring SameSite=Strict cookie attributes.",
        "Replacing relational SQL database queries with unindexed flat text files stored in local user directories, across all internal enterprise network segments and endpoints.",
        "Disabling transport layer security certificate validation checks across client frontend web browser engines, during standard continuous monitoring and administrative audits.",
        "Forcing all web application users to connect through dedicated hardware IPsec virtual private network tunnels.",
        "Compiling backend server endpoints into proprietary obfuscated binary assemblies prior to deployment, using standardized organizational security policy configurations.",
      ],
      el: [
        "Χρήση μοναδικών κρυπτογραφικά τυχαίων Anti-CSRF tokens και ρύθμιση της παραμέτρου SameSite=Strict στα cookies.",
        "Αντικατάσταση σχεσιακών βάσεων με μη ευρετηριασμένα αρχεία κειμένου αποθηκευμένα σε τοπικούς φακέλους, σε όλα τα εσωτερικά τμήματα δικτύου και τερματικά της επιχείρησης.",
        "Απενεργοποίηση των ελέγχων επαλήθευσης πιστοποιητικών TLS στους περιηγητές των τελικών χρηστών, κατά τη διάρκεια συνεχούς παρακολούθησης και διαχειριστικών ελέγχων.",
        "Υποχρεωτική σύνδεση όλων των χρηστών μέσω ιδιωτικών τούνελ IPsec VPN πριν από την πρόσβαση στην εφαρμογή.",
        "Μεταγλώττιση των υπηρεσιών παρασκηνίου σε ιδιόκτητα δυαδικά αρχεία πριν από τη διάθεση στην παραγωγή, χρησιμοποιώντας τυποποιημένες ρυθμίσεις πολιτικής ασφάλειας οργανισμού.",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "CSRF is prevented by requiring unpredictable, cryptographically strong Anti-CSRF tokens for all state-changing actions (POST/PUT/DELETE) and using the SameSite cookie attribute (Strict/Lax).",
      el: "Το CSRF αντιμετωπίζεται με μοναδικά, απρόβλεπτα Anti-CSRF tokens σε κάθε αίτημα αλλαγής κατάστασης και με τη σωστή χρήση της ιδιότητας SameSite (Strict/Lax) στα cookies.",
    },
  },
];

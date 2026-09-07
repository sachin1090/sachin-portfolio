/**
 * Single source of truth for every piece of content on the site.
 * Edit this file to update the portfolio — no component changes needed.
 */

export const PROFILE = {
  name: "Sachin Pandey",
  initials: "SP",
  role: "Senior System Administrator",
  discipline: "Cloud · Security · Automation",
  location: "Nepal",
  email: "sachinn.pandeyy@gmail.com",
  phone: "+977 9860234601",
  phoneHref: "tel:+9779860234601",
  linkedin: "https://www.linkedin.com/in/sachinn-pandeyy/",
  // Regenerate with: node scripts/build-cv.mjs  (source: cv/cv.html)
  resume: "/Sachin_Pandey_CV.pdf",
  quote: "If a person could be ISO certified, I'd be the first.",
  summary:
    "Senior System Administrator with 8+ years owning and operating enterprise IT infrastructure across cloud, virtualization, security, and automation. Currently the sole administrator for a technology company — accountable for system availability, security posture, compliance, and scalability.",
  short:
    "I own infrastructure end to end: cloud, virtualization, networking, and the compliance programmes that keep it auditable.",
};

export const STATS = [
  { value: "8+", label: "Years owning infrastructure" },
  { value: "6", label: "ISO standards implemented" },
  { value: "3", label: "Organisations supported" },
  { value: "Sole", label: "Owner of IT & security ops" },
];

/** Core competencies — the eight areas of ownership, shown as a band under the hero. */
export const COMPETENCIES = [
  { title: "System administration & operations", note: "Infrastructure ownership end to end" },
  { title: "Cloud infrastructure & IAM", note: "Google Cloud, AWS, Azure" },
  { title: "Virtualization & capacity planning", note: "Proxmox VE, VM lifecycle" },
  { title: "Backup & disaster recovery", note: "Architecture, encryption, tested restores" },
  { title: "Security architecture & compliance", note: "ISO 27001 ISMS, risk treatment" },
  { title: "Infrastructure automation", note: "Bash, Python, Make.com, Zapier" },
  { title: "Network architecture & firewalls", note: "LAN/WAN, routing, VPN, VoIP" },
  { title: "IT asset & platform administration", note: "Lifecycle tracking, SaaS estate" },
];

/**
 * ISO / IEC management-system standards.
 * `tone` maps to the .tone-* accent classes in index.css.
 */
export const CERTIFICATIONS = [
  {
    code: "ISO 9001",
    edition: "2015",
    family: "Quality",
    title: "Quality Management System",
    abbr: "QMS",
    blurb:
      "Process ownership, documented procedures, and continual improvement — the backbone every other management system plugs into.",
    focus: ["Process control", "Document control", "Corrective action"],
    tone: "amber",
  },
  {
    code: "ISO 14001",
    edition: "2015",
    family: "Environment",
    title: "Environmental Management System",
    abbr: "EMS",
    blurb:
      "Environmental aspects and impacts of IT operations — e-waste handling, energy footprint, and lifecycle disposal of hardware.",
    focus: ["Lifecycle impact", "E-waste policy", "Legal register"],
    tone: "emerald",
  },
  {
    code: "ISO/IEC 27001",
    edition: "2022",
    family: "Information security",
    title: "Information Security Management System",
    abbr: "ISMS",
    blurb:
      "Led a full ISMS implementation as certified Lead Implementer: risk assessment and treatment, Annex A control selection, internal security training, and audit readiness.",
    focus: ["Lead Implementer", "Risk treatment", "Annex A controls"],
    tone: "sky",
    flagship: true,
  },
  {
    code: "ISO/IEC 27017",
    edition: "2015",
    family: "Cloud security",
    title: "Cloud Services Security Controls",
    abbr: "Cloud",
    blurb:
      "Cloud-specific extension of 27002 — shared responsibility boundaries, tenant isolation, and hardening of virtual environments.",
    focus: ["Shared responsibility", "Tenant isolation", "VM hardening"],
    tone: "cyan",
  },
  {
    code: "ISO/IEC 27018",
    edition: "2019",
    family: "Cloud privacy",
    title: "PII Protection in Public Clouds",
    abbr: "PII",
    blurb:
      "Safeguards for personally identifiable information processed in public cloud — consent, transparency, and data return or deletion.",
    focus: ["PII processing", "Data retention", "Transparency"],
    tone: "indigo",
  },
  {
    code: "ISO/IEC 42001",
    edition: "2023",
    family: "Artificial intelligence",
    title: "AI Management System",
    abbr: "AIMS",
    blurb:
      "Governance for AI systems — impact assessment, responsible-use policy, and lifecycle oversight of models in production.",
    focus: ["AI impact assessment", "Responsible use", "Model lifecycle"],
    tone: "violet",
  },
];

export const EXPERIENCE = [
  {
    company: "Intuji Pvt. Ltd.",
    role: "Senior IT Executive / System Administrator",
    period: "Aug 2023 — Present",
    current: true,
    blurb:
      "Sole owner of IT infrastructure, security operations, and platform administration for a technology company — and the lead on its entire ISO management-system programme.",
    highlights: [
      "Own every layer of IT infrastructure, security operations, and platform administration.",
      "Led implementation of all six ISO management systems — 9001, 14001, 27001, 27017, 27018 and 42001 — covering quality, environment, information security, cloud security, cloud privacy, and AI governance.",
      "Ran the integrated management system end to end: risk assessment and treatment, control selection, documented policy set, internal audit, and company-wide security training.",
      "Designed and operate Proxmox virtualization hosting business-critical systems.",
      "Architected secure backup, restoration, and disaster recovery processes with tested restores.",
      "Automated recurring workflows, cutting manual operations and operational cost.",
      "Built a centralised IT asset lifecycle management system.",
    ],
    stack: ["Proxmox", "Multi-cloud", "6 × ISO", "Backup & DR", "Automation"],
  },
  {
    company: "Foodmandu Pvt. Ltd.",
    role: "Senior IT Officer",
    period: "Feb 2022 — Aug 2023",
    blurb:
      "Server, network, and communications infrastructure for one of Nepal's largest delivery platforms.",
    highlights: [
      "Managed cloud-hosted Windows and Linux server estates supporting the core platform.",
      "Designed and maintained enterprise network infrastructure across sites.",
      "Optimised VoIP platforms for reliability and cost efficiency.",
      "Implemented IT asset tracking on AppSheet, replacing manual spreadsheets.",
    ],
    stack: ["Windows Server", "Linux", "Network design", "VoIP", "AppSheet"],
  },
  {
    company: "Goldstar Shoes",
    role: "IT Officer",
    period: "Jun 2020 — Jan 2022",
    blurb:
      "Network administration and business systems rollout for a manufacturing group.",
    highlights: [
      "Administered Sophos and Cisco-based enterprise networks.",
      "Implemented ERP and SaaS platforms, including migration and user onboarding.",
      "Developed Power BI dashboards for executive reporting.",
      "Maintained on-premise server infrastructure.",
    ],
    stack: ["Sophos", "Cisco", "ERP", "Power BI", "On-prem"],
  },
];

export const TOOLKIT = [
  {
    group: "System administration",
    items: ["Infrastructure ownership", "Patching & change management", "Access control", "Monitoring", "Capacity planning"],
  },
  {
    group: "Cloud & virtualization",
    items: [
      "Google Cloud — Compute, Networking, Storage, IAM",
      "AWS",
      "Microsoft Azure",
      "Proxmox VE",
      "VM lifecycle management",
    ],
  },
  {
    group: "Operating systems",
    items: ["Linux — Ubuntu, Debian, CentOS", "Windows Server", "Windows 10 / 11", "Linux CLI & shell tooling"],
  },
  {
    group: "Backup & recovery",
    items: [
      "Backup architecture design",
      "Encrypted backups",
      "Snapshot strategy",
      "Restoration testing",
      "Disaster recovery planning",
    ],
  },
  {
    group: "Security & compliance",
    items: [
      "ISO 27001:2022 Lead Implementer",
      "ISMS operation",
      "Risk assessments",
      "Vulnerability mitigation",
      "Security architecture",
    ],
  },
  {
    group: "Networking",
    items: ["LAN / WAN architecture", "Routing & switching", "Firewall policy design", "VPNs", "VoIP platforms"],
  },
  {
    group: "Identity & access",
    items: ["Google Workspace Admin", "Active Directory", "Entra ID", "RBAC"],
  },
  {
    group: "Automation & scripting",
    items: ["Advanced Bash", "Python automation", "Make.com", "Zapier", "cron scheduling"],
  },
  {
    group: "Monitoring & reporting",
    items: [
      "System health monitoring",
      "Backup verification",
      "Incident response",
      "Power BI dashboards",
      "Operational reporting",
    ],
  },
];

/** Named products and services, shown as a chip strip under the toolkit. */
export const PLATFORMS = [
  "Google Cloud Platform",
  "Proxmox VE",
  "Google Workspace Admin",
  "Active Directory",
  "Sophos Firewall",
  "Cisco",
  "Bash",
  "Python",
  "Make.com",
  "Zapier",
  "Power BI",
  "AppSheet",
  "ClickUp",
  "Slack",
  "VoIP platforms",
  "Windows Admin utilities",
];

export const EDUCATION = {
  degree: "BSc in Computer Science and Information Technology",
  institution: "Kathmandu Bernhardt College",
  university: "Tribhuvan University",
  year: "2018",
};

export const NAV_LINKS = [
  { id: "certifications", label: "Certifications" },
  { id: "experience", label: "Experience" },
  { id: "toolkit", label: "Toolkit" },
  { id: "contact", label: "Contact" },
];

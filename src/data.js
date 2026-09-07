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
  linkedin: "https://www.linkedin.com/in/sachinn-pandeyy/",
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
      "Led a full ISMS implementation: risk assessment and treatment, Annex A control selection, internal security training, and audit readiness.",
    focus: ["Risk treatment", "Annex A controls", "Internal audit"],
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
      "Sole owner of IT infrastructure, security operations, and platform administration for a technology company.",
    highlights: [
      "Own every layer of IT infrastructure, security operations, and platform administration.",
      "Led the full ISO 27001:2022 ISMS implementation and ran internal security training across the company.",
      "Designed and operate Proxmox virtualization hosting business-critical systems.",
      "Architected secure backup, restoration, and disaster recovery processes with tested restores.",
      "Automated recurring workflows, cutting manual operations and operational cost.",
      "Built a centralised IT asset lifecycle management system.",
    ],
    stack: ["Proxmox", "Multi-cloud", "ISO 27001", "Backup & DR", "Automation"],
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
    group: "Cloud & virtualization",
    items: [
      "Google Cloud — Compute, Storage, IAM",
      "AWS",
      "Microsoft Azure",
      "Proxmox VE",
      "VM lifecycle & capacity planning",
    ],
  },
  {
    group: "Systems & operating systems",
    items: ["Linux (Ubuntu, Debian, CentOS)", "Windows Server", "Windows 10 / 11", "Patching & change management"],
  },
  {
    group: "Backup & disaster recovery",
    items: ["Backup architecture design", "Encrypted backups", "Snapshot strategy", "Restoration testing", "DR planning"],
  },
  {
    group: "Security & compliance",
    items: ["ISO 27001:2022 ISMS", "Risk assessments", "Vulnerability mitigation", "Security architecture", "Internal training"],
  },
  {
    group: "Networking & identity",
    items: [
      "LAN / WAN architecture",
      "Routing & switching",
      "Firewall policy design",
      "VPNs & VoIP",
      "Google Workspace, Entra ID, AD & RBAC",
    ],
  },
  {
    group: "Automation & reporting",
    items: ["Advanced Bash", "Python automation", "Make.com & Zapier", "cron scheduling", "Power BI dashboards"],
  },
];

export const NAV_LINKS = [
  { id: "certifications", label: "Certifications" },
  { id: "experience", label: "Experience" },
  { id: "toolkit", label: "Toolkit" },
  { id: "contact", label: "Contact" },
];

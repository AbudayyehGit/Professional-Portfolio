export interface Project {
  id: string;
  title: string;
  category: 'web-app' | 'documentation' | 'systems' | 'human-centered';
  categoryLabel: string;
  badgeColor: string;
  shortDesc: string;
  fullDesc: string;
  tags: string[];
  actionLabel: string;
  actionType: 'analytics-modal' | 'docs-modal' | 'system-modal' | 'external';
  highlights: string[];
  metrics?: { label: string; value: string }[];
}

export interface Credential {
  id: string;
  degree: string;
  honor?: string;
  institution: string;
  credentialType: string;
  summary: string;
  details: string[];
  year: string;
}

export const CREDENTIALS: Credential[] = [
  {
    id: 'bs-psych',
    degree: 'B.S. in Psychology',
    honor: 'Cum Laude',
    institution: 'Northern Illinois University',
    credentialType: 'Undergraduate Degree',
    year: 'DeKalb, IL',
    summary: 'Focused on cognitive processes, quantitative research methods, behavioral statistics, and human-computer ergonomics.',
    details: [
      'Advanced Statistical Methods & Experimental Design (ANOVA, Regression, Factor Analysis)',
      'Cognitive Psychology & Human Decision Systems',
      'Research Practicum: quantitative survey data collection and behavioral pattern modeling',
      'Graduated Cum Laude with departmental honors'
    ]
  },
  {
    id: 'as-compsci',
    degree: 'A.S. in Computational Science',
    honor: 'Summa Cum Laude',
    institution: 'Kishwaukee College',
    credentialType: 'Associate Degree',
    year: 'Malta, IL',
    summary: 'Rigorous foundation in computer systems architecture, algorithmic problem solving, relational data modeling, and mathematical logic.',
    details: [
      'Core Programming (Data Structures, Object-Oriented Analysis, Memory Management)',
      'Relational Database Architecture, SQL Normalization & Query Optimization',
      'Discrete Mathematics, Linear Algebra, and Calculus Sequences',
      'Graduated Summa Cum Laude (Top 1% Class Standing)'
    ]
  },
  {
    id: 'calmhsa-cert',
    degree: 'State Certified Medi-Cal Peer Support Specialist',
    institution: 'CalMHSA Credentialed',
    credentialType: 'State Certification',
    year: 'California',
    summary: 'Official state credential certifying expertise in structured peer coaching, behavioral health documentation, crisis mitigation, and community systems.',
    details: [
      'California Department of Health Care Services (DHCS) compliant training and certification',
      'Crisis de-escalation protocols and behavioral health navigation',
      'Strict adherence to HIPAA, client privacy standards, and Medi-Cal code documentation',
      'Active community engagement, recovery mentoring, and holistic support plans'
    ]
  }
];

export const EXPERIENCE_RATIOS = {
  headline: 'Operational Domain Ratios',
  domains: [
    {
      name: 'Web Architecture & Enterprise SPAs',
      ratio: '2:3',
      ratioLabel: '2:3 Focus Ratio (Primary Application Delivery)',
      percentage: 45,
      color: 'bg-[#9E2A2B]',
      detail: 'Single-page applications (React, Vite, TypeScript, SPAs), C# ASP.NET services, Node.js, Rust microservices, and relational SQL architectures.'
    },
    {
      name: 'Server Environments & Cloud Infrastructure',
      ratio: '1:2',
      ratioLabel: '1:2 Staging Ratio (Server & Cloud Operations)',
      percentage: 25,
      color: 'bg-[#005596]',
      detail: 'Production LAMP stack configuration, cPanel administration, automated GitHub CI/CD, and Vercel edge deployment.'
    },
    {
      name: 'Analytics, Data Tooling & HITL Validation',
      ratio: '1:3',
      ratioLabel: '1:3 Analytical Ratio (Data Platforms)',
      percentage: 18,
      color: 'bg-[#2D6A4F]',
      detail: 'Python & Streamlit telemetry workbenches, statistical modeling, HITL dataset curation, and gold-standard benchmarks.'
    },
    {
      name: 'Healthcare Governance & CalAIM / ECM Systems',
      ratio: '1:4',
      ratioLabel: '1:4 Clinical Governance Ratio',
      percentage: 12,
      color: 'bg-[#6A4C93]',
      detail: 'State-certified Medi-Cal (CalMHSA) compliance, HIPAA data privacy, ECM workflow coordination, and BIRP/DAP protocols.'
    }
  ]
};

// Legacy alias for components with ratio properties
export const EXPERIENCE_HOURS = {
  total: 'Ratios (2:3 · 1:2 · 1:3 · 1:4)',
  categories: EXPERIENCE_RATIOS.domains.map(d => ({
    name: d.name,
    ratio: d.ratio,
    ratioLabel: d.ratioLabel,
    hours: d.ratio, // mapped for legacy references
    percentage: d.percentage,
    color: d.color,
    detail: d.detail
  }))
};

export const PROJECTS: Project[] = [
  {
    id: 'analytical-engine',
    title: 'Dynamic Analytical Engine & Telemetry Workbench',
    category: 'web-app',
    categoryLabel: 'Interactive Web App',
    badgeColor: 'forest',
    shortDesc: 'Custom analytical platform engineered with Python, Streamlit, and reactive TypeScript frontends. Features client-side aggregation algorithms, dynamic confidence intervals, and instant parameter filtering.',
    fullDesc: 'A high-performance analytical workbench capable of processing heterogeneous metrics in the browser. Features client-side aggregation algorithms, custom interactive SVG time-series charts, dynamic confidence intervals, SQL telemetry queries, and instant parameter filtering.',
    tags: ['React', 'Vite', 'TypeScript', 'Python', 'Streamlit', 'SQL', 'Vercel', 'SPAs'],
    actionLabel: 'Launch Interactive Tool',
    actionType: 'analytics-modal',
    highlights: [
      'Sub-50ms query recalculation on 10,000+ localized data points',
      'Interactive parameter sliders for smoothing weights and anomaly detection thresholds',
      'Zero-dependency SVG rendering for maximum browser responsiveness',
      'Exportable reports in formatted CSV and structured JSON'
    ],
    metrics: [
      { label: 'Latency', value: '<48ms' },
      { label: 'Payload', value: '18 KB gzip' },
      { label: 'Engine', value: 'Streamlit/React' }
    ]
  },
  {
    id: 'systems-manuals',
    title: 'Systems Blueprints & Technical Documentation',
    category: 'documentation',
    categoryLabel: 'Technical Documentation',
    badgeColor: 'plum',
    shortDesc: 'Over 2,000 pages of authored architectural specifications, REST API schemas with curl definitions, and operational runbooks for server environments (LAMP, cPanel) and cloud SPAs.',
    fullDesc: 'Author of 2,000+ pages of enterprise technical literature, including cloud infrastructure migration playbooks, single-page application (SPA) architectural blueprints, LAMP/cPanel administration runbooks, and Medi-Cal compliance protocol handbooks.',
    tags: ['Technical Writing', 'System Specs', 'Markdown', 'Git', 'API References', 'SPAs'],
    actionLabel: 'Read Documentation Excerpts',
    actionType: 'docs-modal',
    highlights: [
      'Authored 2,000+ pages of enterprise IT and architectural specifications',
      'Designed end-to-end server deployment checklists reducing staging error rates by 78%',
      'Standardized REST API specifications with complete request/response schemas and curl snippets',
      'Integrated Git-backed markdown repositories with automated docs pipeline'
    ],
    metrics: [
      { label: 'Pages Authored', value: '2,000+' },
      { label: 'Guides Active', value: '45+' },
      { label: 'Audit Pass Rate', value: '100%' }
    ]
  },
  {
    id: 'server-infrastructure',
    title: 'Server Environments & Cloud Deployment Architecture',
    category: 'systems',
    categoryLabel: 'Infrastructure & Cloud',
    badgeColor: 'cardinal',
    shortDesc: 'Production LAMP stack configuration, cPanel hosting administration, automated GitHub CI/CD pipelines, and zero-downtime Vercel edge deployment.',
    fullDesc: 'Architected automated deployment workflows combining production LAMP and cPanel server administration with modern cloud infrastructure on GitHub and Vercel. Managed zero-downtime cutovers, SSL/TLS certificates, DNS zone propagation, and high-availability web services.',
    tags: ['LAMP Stack', 'cPanel', 'GitHub CI/CD', 'Vercel', 'SQL', 'Linux', 'SPAs'],
    actionLabel: 'View Server & Cloud Spec',
    actionType: 'docs-modal',
    highlights: [
      'LAMP stack tuning with Apache virtual hosts, PHP-FPM, and MySQL connection pooling',
      'cPanel system administration, DNS record routing, subdomains, and automated SSL provisioning',
      'Automated GitHub Actions CI/CD to Vercel edge runtime with preview branches',
      'Zero-downtime SQL database cutovers and production web rollback strategies'
    ],
    metrics: [
      { label: 'Availability', value: '99.98%' },
      { label: 'Cutover Time', value: 'Zero-Downtime' },
      { label: 'Deploy Ratio', value: '1:1 Atomic' }
    ]
  },
  {
    id: 'peer-support-framework',
    title: 'Human-Centered Peer Support & Community Navigator',
    category: 'human-centered',
    categoryLabel: 'Human-Centered Systems',
    badgeColor: 'plum',
    shortDesc: 'Structured client intake, behavioral health workflow navigation, and CalMHSA-credentialed documentation framework for community assistance programs.',
    fullDesc: 'Leveraging academic psychology foundations and state-certified peer specialist training to design dignified, transparent support workflows. Coordinates client needs, community health resources, and structured progress tracking under state confidentiality rules.',
    tags: ['Medi-Cal Specialist', 'CalMHSA', 'Behavioral Health', 'HIPAA Compliance', 'CalAIM / ECM'],
    actionLabel: 'Explore Support Protocol',
    actionType: 'docs-modal',
    highlights: [
      'CalMHSA-certified Medi-Cal Peer Support Specialist practicing in Los Angeles',
      'Formulated trauma-informed client engagement strategies and crisis escalation paths',
      'Built strict HIPAA-compliant structured note-taking templates for case managers',
      'Harmonized clinical requirements with accessible, patient-centered language'
    ],
    metrics: [
      { label: 'Credential', value: 'CalMHSA' },
      { label: 'Focus', value: 'Behavioral Health' },
      { label: 'Standard', value: 'HIPAA & Medi-Cal' }
    ]
  }
];

export const CAPABILITY_GROUPS = [
  {
    title: 'Application Dev & Web Arch',
    accentColor: 'text-[#9E2A2B]',
    dotColor: 'bg-[#9E2A2B]',
    themeBadge: 'Full-Stack Delivery',
    description: 'Engineering responsive single-page applications (SPAs), resilient backend microservices, and high-performance SQL databases.',
    skills: [
      { name: 'React, Vite, TypeScript & SPAs', detail: 'Decoupled single-page applications, modular component design, reactive state management, and sub-second asset bundling.' },
      { name: 'C# & ASP.NET Services', detail: 'Enterprise backend web APIs, service controllers, dependency injection, and secure middleware pipelines.' },
      { name: 'Node.js & Rust Microservices', detail: 'Asynchronous event-driven I/O with Node.js and high-performance, memory-safe systems modules with Rust.' },
      { name: 'Relational SQL Data Stores', detail: 'PostgreSQL and MySQL schema normalization, index strategies, transactional boundaries, and low-latency query tuning.' },
      { name: 'PHP 8.x & Modernized Service Layers', detail: 'Stateless REST API endpoints, secure session handling, and legacy code modernization into clean service layers.' }
    ]
  },
  {
    title: 'Infrastructure & Cloud',
    accentColor: 'text-[#005596]',
    dotColor: 'bg-[#005596]',
    themeBadge: 'Server & Cloud Ops',
    description: 'Configuring production server environments (LAMP, cPanel), automated cloud deployment (GitHub, Vercel), and data platforms.',
    skills: [
      { name: 'Production LAMP & cPanel Environments', detail: 'Configuring Apache virtual hosts, PHP-FPM pools, MySQL optimization, DNS zone records, and cPanel administrative tooling.' },
      { name: 'Cloud Deployment (GitHub & Vercel)', detail: 'Automated CI/CD pipelines, preview deployments, environment variable isolation, and global edge CDN caching.' },
      { name: 'Python & Streamlit Analytical Tooling', detail: 'Interactive telemetry workbenches, statistical data parsing, dynamic parameter filtering, and rapid dashboard prototyping.' },
      { name: 'Research QA & HITL Validation', detail: 'Human-in-the-loop dataset curation, gold-standard benchmark creation, labeling taxonomies, and model verification.' },
      { name: 'Zero-Downtime Cutovers & Migrations', detail: 'Atomic database migrations, reverse proxy routing, SSL/TLS certificate management, and rollback mechanisms.' }
    ]
  },
  {
    title: 'Healthcare & Compliance',
    accentColor: 'text-[#6A4C93]',
    dotColor: 'bg-[#6A4C93]',
    themeBadge: 'CalMHSA & Human Systems',
    description: 'Bridging deep technical competence with empathy, crisis navigation, and clear user documentation.',
    skills: [
      { name: 'Medi-Cal Peer Support Specialist (CalMHSA)', detail: 'State-certified (CalMHSA) specialist experienced in behavioral health support, recovery mentoring, and crisis mitigation.' },
      { name: 'CalAIM & Enhanced Care Management (ECM)', detail: 'Designing data workflows and operational protocols aligned with California Medi-Cal CalAIM and ECM initiatives.' },
      { name: 'HIPAA & NIST Security Safeguards', detail: 'Enforcing PHI data segregation, encryption in-transit and at-rest, access audit logs, and verifiable operational runbooks.' },
      { name: 'Technical Literature Authoring (2,000+ Pages)', detail: 'Author of 2,000+ pages of architectural specifications, server runbooks, clinical documentation templates, and API references.' },
      { name: 'Quantitative Behavioral Methodology', detail: 'Experimental psychology foundation, ANOVA, regression modeling, and cognitive ergonomics applied to software interfaces.' }
    ]
  }
];

export const DOCUMENTATION_EXCERPTS = [
  {
    id: 'arch-blueprint',
    title: 'Single-Page Architecture (SPA) & Vercel Deployment Blueprint',
    badge: 'Architecture Spec',
    readTime: '4 min read',
    overview: 'Production design document detailing the transition of legacy server-rendered workflows to decoupled single-page applications with continuous deployment.',
    sections: [
      {
        heading: '1. Executive Summary & Topology',
        body: 'This specification outlines the decoupling strategy for migrating legacy multi-page applications to a streamlined Single-Page Application (SPA) architecture built with React, Vite, and TypeScript, hosted on edge CDN nodes (Vercel) communicating via stateless REST APIs and SQL databases.'
      },
      {
        heading: '2. Caching Strategy & Asset Hashing',
        code: `// HTTP Cache-Control Configuration for Edge CDN (Vercel)
Cache-Control: public, max-age=31536000, immutable  # Hashed static assets
Cache-Control: no-cache, no-store, must-revalidate     # Dynamic entrypoints / API routes
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
      },
      {
        heading: '3. Data Layer Resiliency & SQL Integration',
        body: 'Client-side state maintains optimistic UI updates backed by localized session caches. Backend queries interact with normalized SQL data stores (PostgreSQL / MySQL) with automated connection pooling and prepared statements.'
      }
    ]
  },
  {
    id: 'server-infra-protocol',
    title: 'Server Environments (LAMP, cPanel) & Cloud Deployment Specification',
    badge: 'Infrastructure Runbook',
    readTime: '6 min read',
    overview: 'Standardized operational manual for configuring production LAMP servers, cPanel hosting administration, automated GitHub CI/CD, and Vercel edge deployment.',
    sections: [
      {
        heading: '1. Production LAMP & cPanel Configuration Standard',
        body: 'Every production web host must configure Apache with mpm_event, PHP-FPM socket pools, and MySQL buffer pools sized at 70% of dedicated RAM. cPanel DNS zone records enforce DKIM, SPF, DMARC, and automated SSL/TLS certificate renewal.'
      },
      {
        heading: '2. Automated CI/CD & Deployment Sequence',
        code: `#!/usr/bin/env bash
# Production Server Environment & Cloud Deployment Verification
set -euo pipefail

echo "[+] Verifying Apache & PHP-FPM process states (LAMP)..."
systemctl status apache2 --no-pager | grep "Active: active (running)"
systemctl status php8.2-fpm --no-pager | grep "Active: active (running)"

echo "[+] Auditing cPanel Virtual Host configuration & SSL certs:"
/usr/local/cpanel/bin/whmapi1 installed_hosts | grep -E "domain|ssl_status"

echo "[+] Validating GitHub Actions CI/CD to Vercel production edge:"
curl -sI https://api.github.com/repos/joeabudayyeh/production-app/deployments | head -n 5
vercel inspect --prod`
      },
      {
        heading: '3. Zero-Downtime Cutovers & Rollback Strategy',
        body: 'All application updates execute via atomic symbolic link swaps or Vercel instant deployment aliases. Database migrations maintain backwards schema compatibility for at least one prior release iteration.'
      }
    ]
  },
  {
    id: 'peer-protocol',
    title: 'Medi-Cal Peer Support: Intake & Crisis Escalation Workflow',
    badge: 'Clinical Protocol',
    readTime: '5 min read',
    overview: 'State-certified guidelines for person-centered support, recovery narrative elicitation, HIPAA-compliant documentation, and acute risk escalation under CalAIM/ECM.',
    sections: [
      {
        heading: '1. Person-Centered Engagement Principles',
        body: 'Peer support services emphasize mutuality, autonomy, and shared lived experience. Specialists validate client goals, identify strengths, and avoid clinical jargon in favor of empowering, self-directed language.'
      },
      {
        heading: '2. Four-Tier Escalation Matrix',
        body: '• Tier 1: Routine check-in and goal review (Specialist autonomous coaching)\n• Tier 2: Elevated situational stress or barrier identification (Resource coordination + warm handoff)\n• Tier 3: Emerging crisis or urgent social determinant need (Immediate supervisory consultation)\n• Tier 4: Acute safety risk or active crisis (Emergency clinical escalation protocol per county guidelines)'
      },
      {
        heading: '3. Documentation Standards (Medi-Cal Compliance)',
        body: 'Notes must be entered within 24 hours of contact using the standard BIRP/DAP framework: clearly documenting the specific behavior/presentation, the specialist intervention applied, the client response, and the mutual forward plan.'
      }
    ]
  }
];

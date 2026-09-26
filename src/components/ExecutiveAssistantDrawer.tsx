import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, ShieldCheck, Copy, Check, ArrowRight, RotateCcw } from 'lucide-react';

interface ExecutiveAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAnalytics: () => void;
  onOpenDocs: (docId?: string) => void;
  onNavigate: (sectionId: string) => void;
  onOpenResume?: () => void;
}

interface ActionLink {
  label: string;
  presetKey?: string;
  actionType?: 'analytics' | 'docs' | 'contact' | 'capabilities' | 'about';
  targetDocId?: string;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  content: string;
  actionLinks?: ActionLink[];
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'welcome',
    sender: 'assistant',
    timestamp: 'Active Session',
    content: `### Executive Briefing Office
I am the official Interactive Portfolio Assistant for **Joe Abudayyeh**, Systems Architect | Application Delivery Lead.

I provide engineering executives, recruiters, and technical leaders with authoritative briefings on Joe's technical governance, enterprise server environments (LAMP, cPanel), cloud deployment (GitHub, Vercel), single-page applications (React, Vite, TypeScript, SPAs), backend engineering (C#, ASP.NET, Node.js, Rust, SQL), Python/Streamlit data tooling, and government healthcare compliance standards (HIPAA, NIST, CalMHSA, CalAIM, ECM).

Select a structured inquiry below or submit a specific architectural question:`,
    actionLinks: [
      { label: 'Executive Summary', presetKey: 'executive-summary' },
      { label: 'Dual Technical Pillars', presetKey: 'dual-pillars' },
      { label: 'Full Engineering Stack', presetKey: 'tech-stack' },
      { label: 'Server & Cloud (LAMP / cPanel / Vercel)', presetKey: 'server-cloud' },
      { label: 'Operational Ratios Matrix', presetKey: 'ratios' },
      { label: 'Healthcare Compliance (CalAIM/ECM)', presetKey: 'healthcare' },
    ]
  }
];

export function ExecutiveAssistantDrawer({
  isOpen,
  onClose,
  onOpenAnalytics,
  onOpenDocs,
  onNavigate,
}: ExecutiveAssistantDrawerProps) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleActionClick = (link: ActionLink) => {
    if (link.presetKey) {
      handlePresetQuery(link.presetKey);
    } else if (link.actionType === 'analytics') {
      onClose();
      onOpenAnalytics();
    } else if (link.actionType === 'docs') {
      onClose();
      onOpenDocs(link.targetDocId);
    } else if (link.actionType === 'contact') {
      onClose();
      onNavigate('contact');
    } else if (link.actionType === 'capabilities') {
      onClose();
      onNavigate('capabilities');
    } else if (link.actionType === 'about') {
      onClose();
      onNavigate('about');
    }
  };

  const getAssistantResponse = (query: string): { content: string; actionLinks?: ActionLink[] } => {
    const q = query.toLowerCase();

    // 1. Executive Summary query
    if (q.includes('summary') || q.includes('overview') || q.includes('who is') || q.includes('executive narrative') || q.includes('background') || q.includes('bio')) {
      return {
        content: `### Executive Profile: Joe Abudayyeh · Systems Architect | Application Delivery Lead

Joe Abudayyeh is a Systems Architect and Application Delivery Lead whose interdisciplinary foundation bridges direct technical execution with multi-site operational leadership across enterprise IT, production server environments, community healthcare, and business systems.

He specializes in decoupled single-page application architectures (React, Vite, TypeScript, SPAs), robust backend services (C#, ASP.NET, Node.js, Rust, SQL), production server infrastructure (LAMP, cPanel), automated cloud deployment pipelines (GitHub, Vercel), high-throughput analytical platforms (Python, Streamlit), and has authored over 2,000 pages of enterprise system blueprints and clinical protocols.

Uniquely differentiated as a state-certified Medi-Cal Peer Support Specialist (CalMHSA), he synthesizes technical governance with human-centered methodologies, engineering digital systems tailored for strict government healthcare compliance and security standards including HIPAA, NIST, CalAIM, and Enhanced Care Management (ECM).

He operates out of Los Angeles, California, available for principal architecture consulting, application delivery leadership, and high-impact systems contracts.`,
        actionLinks: [
          { label: 'Launch Interactive Analytics Engine', actionType: 'analytics' },
          { label: 'Inspect Systems Architecture Specs', actionType: 'docs', targetDocId: 'arch-blueprint' },
          { label: 'Scroll to Contact Interface', actionType: 'contact' }
        ]
      };
    }

    // 2. Full Tech Stack Query
    if (q.includes('stack') || q.includes('c#') || q.includes('asp.net') || q.includes('sql') || q.includes('rust') || q.includes('node') || q.includes('react') || q.includes('vite') || q.includes('typescript') || q.includes('spa')) {
      return {
        content: `### Technical Stack & Systems Spectrum

Joe Abudayyeh delivers production-grade applications across modern web, backend services, relational databases, and server environments:

- **Frontend & SPAs**: Decoupled Single-Page Applications (SPAs) engineered with **React**, **Vite**, **TypeScript**, modern ES6+, and Tailwind CSS for instant edge delivery and zero layout thrash.
- **Backend Services**: Enterprise web APIs and microservices built with **C# / ASP.NET Core**, **Node.js**, **Rust** (memory-safe systems modules), and **PHP 8.x** service modernization.
- **Relational Databases (SQL)**: **SQL** relational modeling, schema normalization (3NF), indexing strategies, transactional isolation boundaries, and query tuning for **PostgreSQL** and **MySQL**.
- **Data & Telemetry**: **Python** statistical pipelines and interactive **Streamlit** telemetry workbenches for client-side analytical exploration.
- **Infrastructure & Cloud**: Production **LAMP** stack tuning, **cPanel** system administration, automated **GitHub Actions** CI/CD, and **Vercel** edge deployment.`,
        actionLinks: [
          { label: 'Examine Technical Capabilities Matrix', actionType: 'capabilities' },
          { label: 'Read Single-Page App Architecture Spec', actionType: 'docs', targetDocId: 'arch-blueprint' }
        ]
      };
    }

    // 3. Server Environments & Cloud Deployment Query
    if (q.includes('lamp') || q.includes('cpanel') || q.includes('server') || q.includes('cloud') || q.includes('github') || q.includes('vercel') || q.includes('hosting')) {
      return {
        content: `### Server Environments & Cloud Deployment Architecture

Joe Abudayyeh manages enterprise server operations combining dedicated Linux hosts with modern cloud edge deployment:

- **Production LAMP Stacks**: Configuring and optimizing Linux, Apache (mpm_event), MySQL (buffer pools, slow query indexing), and PHP 8.x / PHP-FPM pools for high concurrency under sustained traffic.
- **cPanel System Administration**: Automated provisioning of DNS zone records (DKIM, SPF, DMARC), subdomain routing, Apache virtual host configuration, and automated SSL/TLS certificates.
- **GitHub Actions CI/CD**: Automated integration pipelines running static type checking (\`tsc --noEmit\`), test suites, and atomic multi-branch staging workflows.
- **Vercel Edge Deployment**: Instant global edge distribution, preview URL branches, immutable asset hashing, and zero-downtime production cutovers with instant rollback safeguards.`,
        actionLinks: [
          { label: 'Inspect Server & Cloud Specification', actionType: 'docs', targetDocId: 'server-infra-protocol' },
          { label: 'Examine Capabilities Matrix', actionType: 'capabilities' }
        ]
      };
    }

    // 4. Dual Technical Pillars query
    if (q.includes('pillar') || q.includes('technical skills') || q.includes('skills') || q.includes('architecture')) {
      return {
        content: `### Dual Technical Pillars Architecture

Joe's engineering capabilities are structured across two foundational operational pillars:

#### Pillar 1: Application Development & Web Architecture
- **Single-Page Applications (SPAs)**: Decoupled client-rendered web architectures using **React**, **Vite**, and **TypeScript**, with sub-second asset bundling and edge routing.
- **Backend & Relational Systems**: Enterprise APIs in **C# / ASP.NET**, **Node.js**, **Rust**, and **PHP 8.x** backed by normalized **SQL** schemas (**PostgreSQL / MySQL**).
- **Technical Literature Governance**: Author of **2,000+ pages** of comprehensive architectural blueprints, API documentation with curl schemas, and operational SOP manuals.

#### Pillar 2: Infrastructure, Server Environments & Cloud Deployment
- **Server Administration & Hosting**: Production **LAMP** environments, **cPanel** management, Linux daemon orchestration, and automated SSL lifecycle renewals.
- **Cloud Deployment & CI/CD**: **GitHub Actions** automated test and build workflows feeding continuous deployment to **Vercel** edge CDNs.
- **Analytics & Data Tooling**: Interactive data platforms powered by **Python** and **Streamlit**, alongside human-in-the-loop (HITL) dataset validation protocols.`,
        actionLinks: [
          { label: 'Examine Technical Capabilities Matrix', actionType: 'capabilities' },
          { label: 'Read Single-Page App Architecture Spec', actionType: 'docs', targetDocId: 'arch-blueprint' }
        ]
      };
    }

    // 5. Operational Ratios Matrix
    if (q.includes('ratio') || q.includes('hours') || q.includes('experience') || q.includes('allocation') || q.includes('breakdown')) {
      return {
        content: `### Operational Domain Ratios Matrix

Joe's multi-disciplinary engineering track record is balanced across four distinct operational delivery ratios:

- **Ratio 2:3 — Web Architecture & Enterprise SPAs (Primary Application Delivery)**
  Decoupled SPAs (React, Vite, TypeScript), C# ASP.NET services, Node.js, Rust microservices, and relational SQL architectures.
- **Ratio 1:2 — Server Environments & Cloud Infrastructure (Staging & Deployment)**
  Production LAMP stack tuning, cPanel administration, automated GitHub CI/CD, and Vercel edge deployment.
- **Ratio 1:3 — Analytics, Data Tooling & HITL Validation (Data Platforms)**
  Python & Streamlit telemetry workbenches, statistical modeling, HITL dataset curation, and gold-standard benchmarks.
- **Ratio 1:4 — Healthcare Governance & Clinical Systems (CalAIM / ECM)**
  State-certified Medi-Cal (CalMHSA) compliance, HIPAA data privacy, ECM workflow coordination, and BIRP/DAP protocols.`,
        actionLinks: [
          { label: 'Inspect Interactive Ratios Matrix', actionType: 'about' },
          { label: 'Launch Dynamic Analytics Engine', actionType: 'analytics' }
        ]
      };
    }

    // 6. Healthcare & Compliance (CalMHSA / CalAIM / ECM / HIPAA / NIST)
    if (q.includes('health') || q.includes('calmhsa') || q.includes('calaim') || q.includes('ecm') || q.includes('hipaa') || q.includes('nist') || q.includes('compliance') || q.includes('peer')) {
      return {
        content: `### Healthcare Governance, Compliance & Human-Centered Engineering

Joe offers a rare synthesis of enterprise technical architecture and state-certified human-centered clinical systems delivery:

| Framework / Standard | Scope & Implementation Rigor |
| :--- | :--- |
| **CalMHSA Credential** | State-certified Medi-Cal Peer Support Specialist certified by the California Department of Health Care Services (DHCS). |
| **CalAIM & ECM** | Architecture and workflow coordination tailored for Enhanced Care Management (ECM) and Community Supports under California's CalAIM modernization initiative. |
| **HIPAA Data Privacy** | Strict implementation of PHI encryption in-transit and at-rest, access audit logs, de-identification procedures, and structured BIRP/DAP clinical documentation templates. |
| **NIST Security Controls** | Hardening server operating environments, zero-allocation memory diagnostics, role-based access control (RBAC), and verifiable operational runbooks. |
| **Human-Centered Care** | Incorporating trauma-informed communication, harm reduction principles, and crisis mitigation paths into digital intake and case routing systems. |`,
        actionLinks: [
          { label: 'Read Medi-Cal Intake & Escalation Protocol', actionType: 'docs', targetDocId: 'peer-protocol' },
          { label: 'Inspect CalMHSA Academic Credential', actionType: 'about' }
        ]
      };
    }

    // 7. HITL & Research QA
    if (q.includes('hitl') || q.includes('qa') || q.includes('validation') || q.includes('data annotation') || q.includes('testing') || q.includes('dataset')) {
      return {
        content: `### Human-in-the-Loop (HITL) Validation & Research QA

Grounded in an academic foundation in Experimental Psychology and Quantitative Behavioral Statistics from Northern Illinois University (*Cum Laude*):

1. **HITL Pipeline Design**: Building deterministic verification gates that pair automated statistical anomaly detection with human review, preventing hallucinations and edge-case drift in production feeds.
2. **Gold-Standard Curation**: Establishing granular data labeling taxonomies, inter-annotator agreement metrics (Cohen's Kappa), and benchmark test suites.
3. **Statistical Significance**: Rigorous hypothesis testing, ANOVA, factor analysis, and regression modeling applied to user interaction telemetry and systems performance projections.
4. **Empirical Usability Audits**: Eliminating cognitive friction in operational tools, balancing system capability with intuitive mental models for both clinical specialists and engineering teams.`,
        actionLinks: [
          { label: 'Open Dynamic Analytical Workbench', actionType: 'analytics' }
        ]
      };
    }

    // 8. Contact / Availability
    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('available') || q.includes('rate') || q.includes('contract')) {
      return {
        content: `### Engagement & Availability Directives

- **Status**: Currently Available for Select Engagements.
- **Engagement Types**:
  - Principal Systems Architecture & Web Modernization (SPAs, React, Vite, C#, ASP.NET, SQL)
  - Application Delivery Leadership & Engineering Governance
  - Server Environments (LAMP, cPanel) & Cloud CI/CD (GitHub, Vercel)
  - Enterprise Technical Documentation & Operational Runbook Contracts (2,000+ pages)
  - Healthcare Compliance & Workflow Design (CalAIM / ECM / HIPAA)
- **Base of Operations**: Los Angeles, California (PST). Open to on-site California engagements and distributed remote leadership.
- **Direct Dispatch**: Contact form available on this portal, with standard response SLA within 24 business hours (\`joeabudayyeh@gmail.com\`).`,
        actionLinks: [
          { label: 'Open Direct Contact Form', actionType: 'contact' }
        ]
      };
    }

    // Default authoritative response
    return {
      content: `### Systems Architecture Briefing: "${query}"

Regarding **${query}**, Joe Abudayyeh's engineering philosophy is governed by structural delivery and measurable operational reliability:

- **Architecture Standards**: Preferring decoupled single-page applications (React, Vite, TypeScript, SPAs), stateless edge compute on Vercel, and strict API payload contracts (C#, ASP.NET, Node.js, Rust).
- **Server Environments**: Balancing production LAMP stack performance and cPanel management with automated GitHub CI/CD pipelines.
- **Compliance Integration**: Embedding HIPAA, NIST, and CalAIM/ECM security and documentation safeguards at the schema design stage rather than treating compliance as an afterthought.

Would you like to examine specific documentation excerpts or inspect the analytical platform?`,
      actionLinks: [
        { label: 'Dual Technical Pillars Breakdown', presetKey: 'dual-pillars' },
        { label: 'Full Engineering Stack (C#, ASP.NET, SQL...)', presetKey: 'tech-stack' },
        { label: 'Read Technical Manuals (2,000+ Pages)', actionType: 'docs' },
        { label: 'Contact Joe Direct', actionType: 'contact' }
      ]
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: text
    };

    const response = getAssistantResponse(text);
    const assistantMessage: Message = {
      id: `ast-${Date.now() + 1}`,
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: response.content,
      actionLinks: response.actionLinks
    };

    setMessages(prev => [...prev, userMessage, assistantMessage]);
    setInputValue('');
  };

  const handlePresetQuery = (presetKey: string) => {
    const presets: Record<string, string> = {
      'executive-summary': 'Provide the executive summary and background for Joe Abudayyeh.',
      'dual-pillars': 'Explain the Dual Technical Pillars: Application Development vs Infrastructure.',
      'tech-stack': 'What is Joe\'s complete technology stack (C#, ASP.NET, SQL, Python, Streamlit, Node, Rust, React, Vite, SPAs)?',
      'server-cloud': 'Detail Joe\'s server environments (LAMP, cPanel) and cloud deployment (GitHub, Vercel).',
      'ratios': 'Explain the operational domain ratios matrix (2:3 · 1:2 · 1:3 · 1:4).',
      'healthcare': 'What is Joe\'s healthcare compliance and CalMHSA/CalAIM experience?',
      'hitl': 'Explain the Human-in-the-loop (HITL) and Research QA methodology.'
    };
    const text = presets[presetKey] || presetKey;
    handleSendMessage(text);
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  const quickPills = [
    { label: 'Executive Summary', key: 'executive-summary' },
    { label: 'Dual Technical Pillars', key: 'dual-pillars' },
    { label: 'Full Tech Stack', key: 'tech-stack' },
    { label: 'LAMP & cPanel / Cloud', key: 'server-cloud' },
    { label: 'Operational Ratios Matrix', key: 'ratios' },
    { label: 'CalAIM / ECM Compliance', key: 'healthcare' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div key="assistant-drawer-container" className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            key="assistant-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1E252B]/60 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Slide-out Drawer */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <motion.div
              key="assistant-drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-lg bg-[#F6F2EC] border-l border-[#D5CCC0] shadow-2xl flex flex-col overflow-hidden text-[#1E252B]"
              role="dialog"
              aria-modal="true"
              aria-labelledby="assistant-drawer-title"
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-[#E2DAD0] bg-[#FAF7F3] flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#9E2A2B]/10 border border-[#9E2A2B]/30 flex items-center justify-center text-[#9E2A2B]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 id="assistant-drawer-title" className="text-sm font-bold text-[#1E252B] flex items-center gap-1.5">
                      Executive Portfolio Assistant
                      <span className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-pulse" />
                    </h3>
                    <p className="text-[11px] font-mono text-[#5C6773]">
                      Joe Abudayyeh · Systems Architect | Application Delivery Lead
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handleResetChat}
                    className="p-1.5 text-[#7C8794] hover:text-[#1E252B] rounded-lg hover:bg-[#EFEAE1] transition-colors"
                    title="Reset Conversation"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-1.5 text-[#7C8794] hover:text-[#1E252B] rounded-lg hover:bg-[#EFEAE1] transition-colors"
                    aria-label="Close Assistant Drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Quick Query Selector Bar */}
              <div className="px-4 py-2.5 bg-[#EFEAE1]/70 border-b border-[#E2DAD0] overflow-x-auto">
                <div className="flex items-center gap-1.5 whitespace-nowrap text-xs font-mono">
                  <span className="text-[11px] text-[#7C8794] mr-1 uppercase">Quick Briefings:</span>
                  {quickPills.map(pill => (
                    <button
                      key={pill.key}
                      onClick={() => handlePresetQuery(pill.key)}
                      className="px-2.5 py-1 bg-white hover:bg-[#FAF7F3] text-[#2C353D] hover:text-[#9E2A2B] border border-[#D5CCC0] rounded-md text-[11px] transition-colors shadow-2xs"
                    >
                      {pill.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    {/* Timestamp / Sender header */}
                    <div className="flex items-center gap-2 mb-1 px-1 text-[10px] font-mono text-[#7C8794]">
                      <span>{msg.sender === 'user' ? 'Stakeholder / Recruiter' : 'Official Briefing'}</span>
                      <span>·</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    {/* Content Box */}
                    <div
                      className={`max-w-[92%] rounded-xl p-3.5 sm:p-4 leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#9E2A2B] text-white shadow-xs'
                          : 'bg-white border border-[#E2DAD0] text-[#1E252B] shadow-xs'
                      }`}
                    >
                      {/* Formatted body */}
                      <div className="prose prose-sm max-w-none text-xs leading-relaxed space-y-2">
                        {msg.content.split('\n\n').map((block, bIdx) => {
                          if (block.startsWith('### ')) {
                            return (
                              <h4 key={bIdx} className="font-bold text-sm text-[#1E252B] border-b border-[#EAE4DC] pb-1 mt-2">
                                {block.replace('### ', '')}
                              </h4>
                            );
                          }
                          if (block.startsWith('#### ')) {
                            return (
                              <h5 key={bIdx} className="font-semibold text-xs text-[#9E2A2B] mt-2">
                                {block.replace('#### ', '')}
                              </h5>
                            );
                          }
                          if (block.startsWith('|')) {
                            // Table parsing
                            const rows = block.split('\n').filter(r => !r.includes(':---'));
                            return (
                              <div key={bIdx} className="overflow-x-auto my-2 border border-[#E2DAD0] rounded-lg">
                                <table className="w-full text-[11px] text-left">
                                  <tbody>
                                    {rows.map((row, rIdx) => {
                                      const cells = row.split('|').filter(c => c.trim().length > 0);
                                      if (cells.length === 0) return null;
                                      return (
                                        <tr key={rIdx} className={rIdx === 0 ? 'bg-[#FAF7F3] font-bold border-b border-[#E2DAD0]' : 'border-b border-[#EAE4DC] last:border-b-0'}>
                                          {cells.map((cell, cIdx) => (
                                            <td key={cIdx} className="p-2 text-[#2C353D]">
                                              {cell.replace(/\*\*/g, '').trim()}
                                            </td>
                                          ))}
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            );
                          }
                          if (block.startsWith('- ') || block.startsWith('1. ')) {
                            const lines = block.split('\n');
                            return (
                              <ul key={bIdx} className="space-y-1 pl-1">
                                {lines.map((line, lIdx) => (
                                  <li key={lIdx} className="flex items-start gap-1.5">
                                    <span className="text-[#9E2A2B]">•</span>
                                    <span>{line.replace(/^[-*•]\s+/, '').replace(/^\d+\.\s+/, '')}</span>
                                  </li>
                                ))}
                              </ul>
                            );
                          }
                          return (
                            <p key={bIdx} className={msg.sender === 'user' ? 'text-white' : 'text-[#2C353D]'}>
                              {block}
                            </p>
                          );
                        })}
                      </div>

                      {/* Action Links */}
                      {msg.actionLinks && msg.actionLinks.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-[#EAE4DC] flex flex-wrap gap-2">
                          {msg.actionLinks.map((link, lIdx) => (
                            <button
                              key={lIdx}
                              onClick={() => handleActionClick(link)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FAF7F3] hover:bg-[#EFEAE1] text-[#9E2A2B] hover:text-[#852324] border border-[#D5CCC0] rounded text-[11px] font-mono transition-colors"
                            >
                              <span>{link.label}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Copy snippet button for assistant responses */}
                      {msg.sender === 'assistant' && (
                        <div className="mt-2 pt-1 flex justify-end">
                          <button
                            onClick={() => handleCopy(msg.id, msg.content)}
                            className="text-[10px] font-mono text-[#7C8794] hover:text-[#1E252B] flex items-center gap-1 transition-colors"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-[#2D6A4F]" /> Copied Briefing
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" /> Copy Text
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3.5 sm:p-4 border-t border-[#E2DAD0] bg-[#FAF7F3]">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about SPAs, C#, ASP.NET, SQL, LAMP, cPanel, Vercel, CalAIM..."
                    className="flex-1 bg-white border border-[#D5CCC0] rounded-lg px-3.5 py-2.5 text-xs text-[#1E252B] placeholder-[#9CA3AF] focus:outline-none focus:border-[#9E2A2B] focus:ring-1 focus:ring-[#9E2A2B]/20 shadow-xs"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="p-2.5 bg-[#9E2A2B] hover:bg-[#852324] disabled:opacity-50 text-white rounded-lg transition-colors shadow-xs"
                    aria-label="Send Query"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <div className="flex justify-between items-center text-[10px] font-mono text-[#7C8794] mt-2 px-1">
                  <span>Authoritative Representative: Joe Abudayyeh</span>
                  <span>Press ESC to close</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

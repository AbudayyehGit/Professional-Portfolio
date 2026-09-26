import { useState } from 'react';
import { X, Printer, Copy, Check, Award, GraduationCap, BarChart3 } from 'lucide-react';
import { CREDENTIALS, EXPERIENCE_RATIOS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copiedBio, setCopiedBio] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyBio = () => {
    const text = `JOE ABUDAYYEH - Systems Architect | Application Delivery Lead (Los Angeles, CA)
Core Expertise: Single-Page Applications (React, Vite, TypeScript, SPAs), Backend Services (C#, ASP.NET, Node.js, Rust, PHP 8.x), Relational SQL (PostgreSQL, MySQL), Server Environments (LAMP, cPanel), Cloud Deployment (GitHub Actions, Vercel), Analytics & Tooling (Python, Streamlit, HITL QA), Technical Documentation (2,000+ pages authored), and CalMHSA/CalAIM Healthcare Compliance.
Operational Allocation: 2:3 Focus Ratio (Web & SPAs), 1:2 Staging Ratio (Server & Cloud), 1:3 Analytical Ratio (Data Tooling), 1:4 Clinical Governance Ratio (Healthcare Systems).
Credentials:
- B.S. in Psychology (Cum Laude, Northern Illinois University)
- A.S. in Computational Science (Summa Cum Laude, Kishwaukee College)
- State Certified Medi-Cal Peer Support Specialist (CalMHSA Credentialed, DHCS)`;
    
    navigator.clipboard.writeText(text);
    setCopiedBio(true);
    setTimeout(() => setCopiedBio(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E252B]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#F6F2EC] border border-[#D5CCC0] rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden print:bg-white print:text-black print:border-none print:shadow-none print:max-w-none print:h-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2DAD0] bg-[#FAF7F3] print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#9E2A2B]/10 border border-[#9E2A2B]/30 flex items-center justify-center text-[#9E2A2B]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 id="resume-title" className="text-base font-semibold text-[#1E252B]">
                Professional Dossier &amp; Resume Summary
              </h3>
              <p className="text-xs text-[#5C6773]">Joe Abudayyeh · Systems Architect | Application Delivery Lead · Los Angeles, CA</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#7C8794] hover:text-[#1E252B] rounded-lg hover:bg-[#EFEAE1] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable/Viewable Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-[#2C353D] print:text-black print:p-0">
          {/* Header block */}
          <div className="border-b border-[#E2DAD0] pb-6 print:border-slate-300">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h1 className="text-2xl font-bold text-[#1E252B] print:text-black">JOE ABUDAYYEH</h1>
                <p className="text-sm font-mono text-[#9E2A2B] print:text-[#9E2A2B] font-semibold mt-0.5">
                  Systems Architect | Application Delivery Lead
                </p>
                <p className="text-xs text-[#5C6773] print:text-slate-600 mt-1">
                  Los Angeles, California · Available for Full-Time, Contract, &amp; Principal Systems Architecture
                </p>
              </div>
              <div className="text-right text-xs font-mono text-[#5C6773] print:text-slate-600">
                <p>Email: joeabudayyeh@gmail.com</p>
                <p>Status: Open for Engagements</p>
                <p>Clearance: Credentialed State Specialist (CalMHSA)</p>
              </div>
            </div>
          </div>

          {/* Professional Narrative */}
          <div>
            <h4 className="text-xs font-mono text-[#9E2A2B] uppercase tracking-wider mb-2 font-semibold">
              Executive Profile
            </h4>
            <p className="text-sm text-[#48535E] print:text-slate-700 leading-relaxed">
              Multidisciplinary technologist bridging computational systems architecture with rigorous cognitive science methodologies. Experienced in decoupled single-page web applications (React, Vite, TypeScript, SPAs), enterprise server environments (LAMP, cPanel), automated cloud deployment (GitHub, Vercel), backend services (C#, ASP.NET, Node.js, Rust, SQL), data workbenches (Python, Streamlit), comprehensive technical literature (2,000+ pages), and state-certified human-centered healthcare compliance (CalAIM / ECM / HIPAA).
            </p>
          </div>

          {/* Operational Domain Ratios Matrix */}
          <div className="bg-white/85 print:bg-slate-100 p-4 rounded-xl border border-[#E2DAD0] print:border-slate-300 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#9E2A2B]" />
                <h4 className="text-xs font-mono text-[#1E252B] uppercase font-semibold">
                  Operational Domain Ratios Matrix
                </h4>
              </div>
              <span className="text-[11px] font-mono text-[#2D6A4F] font-semibold">2:3 · 1:2 · 1:3 · 1:4</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {EXPERIENCE_RATIOS.domains.map((d, idx) => (
                <div key={idx} className="flex justify-between items-center p-2.5 rounded bg-[#FAF7F3] print:bg-white border border-[#EAE4DC] print:border-slate-200">
                  <span className="text-[#48535E] print:text-slate-700 font-medium">{d.name}</span>
                  <span className="font-mono font-bold text-[#9E2A2B] print:text-black bg-[#EFEAE1] px-2 py-0.5 rounded border border-[#D5CCC0]">
                    Ratio {d.ratio}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Credentials */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-4 h-4 text-[#6A4C93]" />
              <h4 className="text-xs font-mono text-[#6A4C93] uppercase tracking-wider font-semibold">
                Education &amp; State Certifications
              </h4>
            </div>
            <div className="space-y-3">
              {CREDENTIALS.map((cred) => (
                <div key={cred.id} className="p-3 bg-white/85 print:bg-white border border-[#E2DAD0] print:border-slate-300 rounded-lg shadow-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-sm text-[#1E252B] print:text-black">
                        {cred.degree}
                        {cred.honor && (
                          <span className="ml-2 text-xs font-mono text-[#9E2A2B] font-semibold">
                            ({cred.honor})
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-[#5C6773]">
                        {cred.institution} · {cred.year}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-[#7C8794]">
                      {cred.credentialType}
                    </span>
                  </div>
                  <p className="text-xs text-[#48535E] mt-2 leading-relaxed">
                    {cred.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Competencies Matrix */}
          <div>
            <h4 className="text-xs font-mono text-[#2D6A4F] uppercase tracking-wider mb-2 font-semibold">
              Core Technical Competencies
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-white/85 rounded border border-[#E2DAD0] shadow-xs">
                <span className="font-semibold text-[#9E2A2B] block mb-1">App Dev &amp; Web Arch</span>
                <p className="text-[#5C6773] leading-normal">
                  React, Vite, TypeScript, SPAs, C#, ASP.NET, Node.js, Rust, SQL (PostgreSQL, MySQL), PHP 8.x
                </p>
              </div>
              <div className="p-3 bg-white/85 rounded border border-[#E2DAD0] shadow-xs">
                <span className="font-semibold text-[#005596] block mb-1">Server &amp; Cloud Infra</span>
                <p className="text-[#5C6773] leading-normal">
                  LAMP Stacks, cPanel Administration, GitHub Actions CI/CD, Vercel Edge Deployment, Linux
                </p>
              </div>
              <div className="p-3 bg-white/85 rounded border border-[#E2DAD0] shadow-xs">
                <span className="font-semibold text-[#6A4C93] block mb-1">Analytics &amp; Compliance</span>
                <p className="text-[#5C6773] leading-normal">
                  Python, Streamlit, HITL Validation, CalMHSA Medi-Cal Specialist, CalAIM/ECM, 2,000+ pgs Specs
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer controls */}
        <div className="px-6 py-3 border-t border-[#E2DAD0] bg-[#FAF7F3] flex flex-wrap justify-between items-center gap-3 print:hidden">
          <button
            onClick={handleCopyBio}
            className="px-3 py-1.5 bg-[#EFEAE1] hover:bg-[#E4DCCE] text-[#2C353D] border border-[#D5CCC0] rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5"
          >
            {copiedBio ? <Check className="w-3.5 h-3.5 text-[#2D6A4F]" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedBio ? 'Copied to Clipboard' : 'Copy Brief Bio'}
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-[#EFEAE1] hover:bg-[#E4DCCE] text-[#2C353D] border border-[#D5CCC0] rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" /> Print / Save as PDF
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#9E2A2B] hover:bg-[#852324] text-white rounded-lg text-xs font-medium transition-colors shadow-xs"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

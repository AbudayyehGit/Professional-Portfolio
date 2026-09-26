import { useState } from 'react';
import { X, BookOpen, Copy, Check, ChevronRight, Terminal, Search } from 'lucide-react';
import { DOCUMENTATION_EXCERPTS } from '../data/portfolioData';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialExcerptId?: string;
}

export function DocumentationModal({ isOpen, onClose, initialExcerptId }: DocumentationModalProps) {
  const [activeExcerptId, setActiveExcerptId] = useState<string>(initialExcerptId || 'arch-blueprint');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);

  if (!isOpen) return null;

  const currentExcerpt = DOCUMENTATION_EXCERPTS.find(e => e.id === activeExcerptId) || DOCUMENTATION_EXCERPTS[0];

  const filteredExcerpts = DOCUMENTATION_EXCERPTS.filter(e => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.badge.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIdx(idx);
    setTimeout(() => setCopiedCodeIdx(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E252B]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#F6F2EC] border border-[#D5CCC0] rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="docs-modal-title"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2DAD0] bg-[#FAF7F3]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#6A4C93]/10 border border-[#6A4C93]/30 flex items-center justify-center text-[#6A4C93]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 id="docs-modal-title" className="text-base font-semibold text-[#1E252B] flex items-center gap-2">
                Systems Documentation &amp; Spec Repository
                <span className="text-xs font-mono text-[#6A4C93] font-semibold">2,000+ Pages Authored</span>
              </h3>
              <p className="text-xs text-[#5C6773]">Architectural blueprints, operational runbooks, and compliance specifications</p>
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

        {/* Modal Body: Sidebar + Main Reader */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Spec Navigation Sidebar */}
          <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-[#E2DAD0] bg-[#FAF7F3]/70 flex flex-col">
            <div className="p-3 border-b border-[#E2DAD0]">
              <div className="relative">
                <Search className="w-4 h-4 text-[#7C8794] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter specifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-[#D5CCC0] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#1E252B] placeholder-[#9CA3AF] focus:outline-none focus:border-[#6A4C93]"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
              {filteredExcerpts.map((excerpt) => {
                const isActive = excerpt.id === currentExcerpt.id;
                return (
                  <button
                    key={excerpt.id}
                    onClick={() => setActiveExcerptId(excerpt.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all border ${
                      isActive
                        ? 'bg-[#6A4C93]/15 border-[#6A4C93]/40 text-[#1E252B] shadow-xs'
                        : 'border-transparent text-[#5C6773] hover:bg-[#EFEAE1] hover:text-[#1E252B]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <span className={isActive ? 'text-[#6A4C93] font-bold' : 'text-[#7C8794]'}>
                        {excerpt.badge}
                      </span>
                      <span className="text-[#A39B8F]">{excerpt.readTime}</span>
                    </div>
                    <p className={`text-xs font-medium leading-snug ${isActive ? 'text-[#1E252B]' : 'text-[#48535E]'}`}>
                      {excerpt.title}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="p-3 border-t border-[#E2DAD0] text-[11px] text-[#7C8794] font-mono">
              Indexed: Markdown · Docusaurus · Git-versioned
            </div>
          </div>

          {/* Right Spec Reader Pane */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-white/70">
            <div className="border-b border-[#E2DAD0] pb-5">
              <div className="flex items-center gap-2 text-xs font-mono text-[#6A4C93] uppercase tracking-wider mb-2 font-semibold">
                <span>{currentExcerpt.badge}</span>
                <span className="text-[#A39B8F]">·</span>
                <span>{currentExcerpt.readTime}</span>
              </div>
              <h2 className="text-2xl font-bold text-[#1E252B] tracking-tight">
                {currentExcerpt.title}
              </h2>
              <p className="text-sm text-[#48535E] mt-2 leading-relaxed">
                {currentExcerpt.overview}
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-6">
              {currentExcerpt.sections.map((sec, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="text-sm font-semibold text-[#1E252B] flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-[#6A4C93]" />
                    {sec.heading}
                  </h4>
                  {sec.body && (
                    <p className="text-sm text-[#2C353D] leading-relaxed pl-6 whitespace-pre-line font-normal">
                      {sec.body}
                    </p>
                  )}
                  {sec.code && (
                    <div className="ml-6 relative rounded-xl overflow-hidden border border-[#2E3942] bg-[#1A2127] font-mono text-xs shadow-inner">
                      <div className="flex justify-between items-center px-4 py-2 bg-[#141B20] border-b border-[#253038] text-slate-300 text-[11px]">
                        <span className="flex items-center gap-1.5 text-[#C599DB]">
                          <Terminal className="w-3.5 h-3.5 text-[#A070B8]" /> Spec Source Snippet
                        </span>
                        <button
                          onClick={() => handleCopyCode(sec.code!, idx)}
                          className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
                        >
                          {copiedCodeIdx === idx ? (
                            <>
                              <Check className="w-3 h-3 text-[#52B788]" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" /> Copy Snippet
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 text-slate-200 overflow-x-auto leading-relaxed">
                        <code>{sec.code}</code>
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-xl bg-[#6A4C93]/10 border border-[#6A4C93]/30 text-xs text-[#2C353D] leading-relaxed">
              <span className="font-semibold text-[#6A4C93]">Technical Rigor Standard:</span> All documentation produced under Joe Abudayyeh's architectural oversight adheres to strict editorial clarity, verifiable reproduction steps, and role-appropriate abstraction layers (executive, operational, and clinical).
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#E2DAD0] bg-[#FAF7F3] flex justify-between items-center text-xs text-[#5C6773]">
          <span>Author: Joe Abudayyeh · Systems Architect | Application Delivery Lead</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#EFEAE1] hover:bg-[#E4DCCE] text-[#1E252B] border border-[#D5CCC0] rounded-lg text-xs font-medium transition-colors"
          >
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { motion, type Variants } from 'motion/react';
import { CREDENTIALS, EXPERIENCE_RATIOS } from '../data/portfolioData';
import { ChevronDown, ChevronUp, BarChart3, Layers, Sparkles } from 'lucide-react';

export function Background() {
  const [expandedCredentialId, setExpandedCredentialId] = useState<string | null>(null);
  const [activeDomainIndex, setActiveDomainIndex] = useState<number | null>(null);

  const toggleCredential = (id: string) => {
    setExpandedCredentialId(prev => (prev === id ? null : id));
  };

  const getHonorColor = (id: string) => {
    if (id === 'bs-psych') return 'text-[#9E2A2B] bg-[#9E2A2B]/10'; // NIU Cardinal
    if (id === 'as-compsci') return 'text-[#2D6A4F] bg-[#2D6A4F]/10'; // Kishwaukee Forest
    return 'text-[#6A4C93] bg-[#6A4C93]/10'; // Rochelle Plum
  };

  const getAccentDot = (id: string) => {
    if (id === 'bs-psych') return 'text-[#9E2A2B]';
    if (id === 'as-compsci') return 'text-[#2D6A4F]';
    return 'text-[#6A4C93]';
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section id="about" className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-16 sm:pb-20 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full min-w-0"
      >
        {/* Left Column: Narrative & Operational Domain Ratios Visualizer */}
        <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6 min-w-0">
          <div className="space-y-3 min-w-0">
            <h2 className="text-xs font-mono text-[#9E2A2B] uppercase tracking-widest font-semibold">
              Background &amp; Systems Foundation
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-[#1E252B] tracking-tight break-words">
              Joe Abudayyeh · Operational Architecture
            </p>
            <p className="text-[#48535E] text-xs sm:text-sm leading-relaxed pt-1 break-words">
              Joe Abudayyeh bridges direct full-stack web execution with multi-site operational leadership across enterprise IT, production server environments (LAMP, cPanel), cloud deployment (GitHub, Vercel), community healthcare, and business systems under strict production SLAs and state compliance frameworks.
            </p>
          </div>

          {/* Operational Domain Ratios Heat Visualizer */}
          <div className="bg-white/90 border border-[#E2DAD0] p-4 sm:p-5 rounded-xl space-y-4 shadow-xs min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#5C6773] uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                <BarChart3 className="w-3.5 h-3.5 text-[#9E2A2B] shrink-0" /> Operational Ratios Matrix
              </span>
              <span className="text-[11px] font-mono text-[#2D6A4F] flex items-center gap-1 font-semibold">
                <Layers className="w-3 h-3" /> Delivery Allocation
              </span>
            </div>

            {/* Composite Heat Visualizer Strip */}
            <div className="h-3 w-full bg-[#EAE4DC] rounded-full overflow-hidden flex shadow-inner">
              {EXPERIENCE_RATIOS.domains.map((d, idx) => (
                <div
                  key={idx}
                  style={{ width: `${d.percentage}%` }}
                  className={`${d.color} h-full transition-all cursor-pointer hover:opacity-90`}
                  title={`${d.name}: Ratio ${d.ratio} (${d.percentage}%)`}
                  onClick={() => setActiveDomainIndex(activeDomainIndex === idx ? null : idx)}
                />
              ))}
            </div>

            {/* Individual Domain Heat Visualizer Bars with Exact Ratios */}
            <div className="space-y-3 pt-1 text-xs font-mono min-w-0">
              {EXPERIENCE_RATIOS.domains.map((domain, idx) => {
                const isActive = activeDomainIndex === idx;

                return (
                  <div
                    key={idx}
                    onClick={() => setActiveDomainIndex(isActive ? null : idx)}
                    className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#FAF7F3] border-[#9E2A2B]/40 shadow-xs'
                        : 'bg-white/60 border-[#EAE4DC] hover:border-[#D5CCC0] hover:bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[#5C6773] gap-2 min-w-0">
                      <div className="flex items-center gap-2 min-w-0 truncate">
                        <span className={`w-2.5 h-2.5 rounded-full ${domain.color} shrink-0`} />
                        <span className="text-[#1E252B] font-medium truncate">{domain.name}</span>
                      </div>
                      {/* Ratio Heat Badge */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold font-mono bg-[#EFEAE1] text-[#9E2A2B] border border-[#D5CCC0] shadow-2xs">
                          Ratio {domain.ratio}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar reflecting operational weight */}
                    <div className="mt-2 h-1.5 w-full bg-[#EAE4DC] rounded-full overflow-hidden">
                      <div
                        style={{ width: `${domain.percentage * 2}%`, maxWidth: '100%' }}
                        className={`h-full ${domain.color} rounded-full`}
                      />
                    </div>

                    {isActive && (
                      <p className="text-[11px] text-[#48535E] mt-2 pt-1 border-t border-[#EAE4DC] leading-relaxed break-words font-sans">
                        {domain.detail}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-1 text-[11px] font-mono text-[#7C8794] flex items-center justify-between border-t border-[#EAE4DC]">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Interactive heat matrix
              </span>
              <span>Click any bar for details</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Credentials & Education */}
        <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6 min-w-0">
          <div className="flex items-center justify-between min-w-0">
            <h3 className="text-sm font-mono text-[#7C8794] uppercase tracking-wider">
              Education &amp; Credentials
            </h3>
            <span className="text-xs font-mono text-[#5C6773]">Click to inspect details</span>
          </div>

          <div className="space-y-4 min-w-0">
            {CREDENTIALS.map((cred) => {
              const isExpanded = expandedCredentialId === cred.id;

              return (
                <div
                  key={cred.id}
                  className="bg-white/90 border border-[#E2DAD0] rounded-xl overflow-hidden hover:border-[#D5CCC0] transition-all shadow-xs min-w-0"
                >
                  <button
                    onClick={() => toggleCredential(cred.id)}
                    className="w-full p-4 sm:p-5 flex justify-between items-start text-left focus:outline-none min-w-0"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <p className="font-semibold text-[#1E252B] text-sm sm:text-base break-words">
                          {cred.degree}
                        </p>
                        {cred.honor && (
                          <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${getHonorColor(cred.id)} whitespace-nowrap`}>
                            {cred.honor}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#5C6773] break-words">
                        {cred.institution} · <span className="font-mono text-[#7C8794]">{cred.year}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 pt-1 text-[#7C8794]">
                      <span className="text-xs font-mono hidden sm:inline text-[#5C6773]">
                        {cred.credentialType}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#9E2A2B]" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {/* Expandable Coursework and Context */}
                  {isExpanded && (
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 border-t border-[#EAE4DC] bg-[#FAF7F3] text-xs text-[#2C353D] space-y-3 animate-in fade-in min-w-0">
                      <p className="text-[#48535E] leading-relaxed break-words">
                        {cred.summary}
                      </p>
                      <div className="space-y-1.5 pt-1 min-w-0">
                        <span className="font-mono text-[11px] text-[#7C8794] uppercase block font-semibold">
                          Core Focus Areas:
                        </span>
                        {cred.details.map((detail, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2 break-words">
                            <span className={`shrink-0 ${getAccentDot(cred.id)}`}>•</span>
                            <span className="text-[#2C353D] min-w-0">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

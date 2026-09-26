import { useState } from 'react';
import { motion, type Variants } from 'motion/react';
import { ExternalLink, Activity, BookOpen, Server, HeartHandshake, ArrowUpRight } from 'lucide-react';
import { PROJECTS, Project } from '../data/portfolioData';

interface ProjectsProps {
  onOpenAnalytics: () => void;
  onOpenDocs: (initialExcerptId?: string) => void;
}

export function Projects({ onOpenAnalytics, onOpenDocs }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  const handleAction = (project: Project) => {
    if (project.actionType === 'analytics-modal') {
      onOpenAnalytics();
    } else if (project.actionType === 'docs-modal') {
      if (project.id === 'systems-manuals') {
        onOpenDocs('arch-blueprint');
      } else if (project.id === 'server-infrastructure' || project.id === 'hardware-logistics') {
        onOpenDocs('server-infra-protocol');
      } else if (project.id === 'peer-support-framework') {
        onOpenDocs('peer-protocol');
      } else {
        onOpenDocs();
      }
    }
  };

  const getAccentColor = (badgeColor: string) => {
    if (badgeColor === 'forest') return 'text-[#2D6A4F]';
    if (badgeColor === 'plum') return 'text-[#6A4C93]';
    return 'text-[#9E2A2B]';
  };

  const getActionColor = (badgeColor: string) => {
    if (badgeColor === 'forest') return 'text-[#489572] hover:text-[#74C69D]';
    if (badgeColor === 'plum') return 'text-[#A070B8] hover:text-[#C599DB]';
    return 'text-[#E07A5F] hover:text-[#F4A261]';
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
    hidden: { opacity: 0, y: 16 },
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
    <section id="work" className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-16 sm:pb-20 overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 min-w-0"
      >
        <div className="min-w-0">
          <h2 className="text-xs font-mono text-[#9E2A2B] uppercase tracking-widest font-semibold">
            Portfolio &amp; Deployments
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-[#1E252B] mt-1 break-words">
            Featured Systems &amp; Live Demos
          </p>
        </div>
        <p className="text-[#5C6773] text-xs sm:text-sm max-w-md break-words">
          Production web applications, architectural governance specifications, and enterprise deployment pipelines.
        </p>
      </motion.div>

      {/* Interactive Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10 pb-1 max-w-full">
        {[
          { id: 'all', label: 'All Deployments' },
          { id: 'web-app', label: 'Interactive Web Apps' },
          { id: 'documentation', label: 'Technical Specs' },
          { id: 'systems', label: 'Infrastructure & Cloud' },
          { id: 'human-centered', label: 'Healthcare & CalAIM' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-3 sm:px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
              activeCategory === tab.id
                ? 'bg-[#9E2A2B] text-white shadow-xs shadow-[#9E2A2B]/20 font-semibold'
                : 'bg-[#EFEAE1] text-[#48535E] hover:text-[#1E252B] hover:bg-[#E4DCCE]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Project Cards Grid with Staggered Entrance */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="space-y-8 sm:space-y-12 w-full min-w-0"
      >
        {filteredProjects.map((project) => {
          const isAnalytical = project.id === 'analytical-engine';
          const isDocs = project.id === 'systems-manuals';
          const isServerInfra = project.id === 'server-infrastructure' || project.id === 'hardware-logistics';
          const isPeer = project.id === 'peer-support-framework';

          return (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center bg-white/90 border border-[#E2DAD0] p-5 sm:p-8 rounded-2xl hover:border-[#D5CCC0] transition-colors shadow-xs w-full min-w-0"
            >
              {/* Left Column: Details & Narrative */}
              <div className="lg:col-span-6 space-y-4 min-w-0">
                {/* Clean unboxed text kicker */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className={`font-semibold ${getAccentColor(project.badgeColor)}`}>
                    {project.categoryLabel}
                  </span>
                  <span className="text-[#A39B8F]">·</span>
                  <span className="text-[#7C8794]">Production Verified</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#1E252B] tracking-tight break-words">
                  {project.title}
                </h3>

                <p className="text-[#48535E] text-xs sm:text-sm leading-relaxed break-words">
                  {project.shortDesc}
                </p>

                {/* Highlights List */}
                <ul className="space-y-1.5 pt-1 text-xs text-[#2C353D]">
                  {project.highlights.slice(0, 3).map((item, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2 break-words">
                      <span className={`mt-0.5 shrink-0 ${getAccentColor(project.badgeColor)}`}>•</span>
                      <span className="min-w-0">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Metrics / Quant Proof */}
                {project.metrics && (
                  <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-[#EAE4DC] font-mono text-xs">
                    {project.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="min-w-[60px]">
                        <span className="text-[#7C8794] block text-[10px] uppercase truncate">{m.label}</span>
                        <span className="text-[#1E252B] font-semibold tabular-nums">{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack - Clean unboxed text metadata with typographic separators */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-[#5C6773] pt-2 max-w-full">
                  <span className="text-[#7C8794]">Stack:</span>
                  {project.tags.map((tag, tIdx) => (
                    <span key={tag} className="inline-flex items-center">
                      <span className="text-[#2C353D] break-all">{tag}</span>
                      {tIdx < project.tags.length - 1 && (
                        <span className="text-[#A39B8F] ml-2">/</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Interactive Live Preview Container */}
              <div className="lg:col-span-6 bg-[#1A2127] border border-[#2E3942] rounded-xl min-h-60 sm:min-h-64 flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden group shadow-inner min-w-0 w-full">
                {/* Dynamic visual preview content */}
                {isAnalytical && (
                  <div className="space-y-3 min-w-0">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="flex items-center gap-1.5 text-[#52B788] truncate">
                        <Activity className="w-4 h-4 text-[#52B788] shrink-0" /> Dynamic Telemetry
                      </span>
                      <span className="text-[#74C69D] shrink-0 font-semibold">Live 48ms</span>
                    </div>

                    <div className="h-24 sm:h-28 w-full bg-[#11171C] rounded-lg p-2 flex items-center justify-center border border-[#253038] overflow-hidden">
                      <svg viewBox="0 0 300 80" className="w-full h-full text-[#40916C]">
                        <path
                          d="M 10 50 Q 50 15 90 40 T 170 30 T 230 65 T 290 25"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <circle cx="170" cy="30" r="4" fill="#74C69D" />
                        <circle cx="230" cy="65" r="4" fill="#D4A373" />
                      </svg>
                    </div>

                    <p className="text-slate-200 font-medium text-xs sm:text-sm break-words">
                      Live Dynamic Application Window
                    </p>
                  </div>
                )}

                {isDocs && (
                  <div className="space-y-3 min-w-0">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="flex items-center gap-1.5 text-[#C599DB] truncate">
                        <BookOpen className="w-4 h-4 text-[#A070B8] shrink-0" /> Governance &amp; Specs
                      </span>
                      <span className="text-[#C599DB] shrink-0 font-semibold">2,000+ Pages</span>
                    </div>

                    <div className="h-24 sm:h-28 w-full bg-[#11171C] rounded-lg p-3 font-mono text-[11px] text-slate-300 border border-[#253038] overflow-hidden leading-relaxed">
                      <div className="text-[#C599DB] font-semibold mb-1 truncate"># SPEC-2026-SPA-DEPLOY</div>
                      <div className="truncate">→ Decoupled Edge Routing (Vercel)</div>
                      <div className="truncate">→ Automated Health Checks &amp; Zero-Downtime</div>
                      <div className="text-slate-400 truncate">→ Full API Payload Schema Validation...</div>
                    </div>

                    <p className="text-slate-200 font-medium text-xs sm:text-sm break-words">
                      Documentation Repository &amp; Sample Guides
                    </p>
                  </div>
                )}

                {isServerInfra && (
                  <div className="space-y-3 min-w-0">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="flex items-center gap-1.5 text-[#005596] truncate">
                        <Server className="w-4 h-4 text-[#005596] shrink-0" /> LAMP &amp; Cloud Staging
                      </span>
                      <span className="text-[#005596] shrink-0 font-semibold">99.98% Uptime</span>
                    </div>

                    <div className="h-24 sm:h-28 w-full bg-[#11171C] rounded-lg p-3 font-mono text-[11px] text-slate-300 border border-[#253038] flex flex-col justify-center space-y-1 overflow-hidden">
                      <div className="flex justify-between text-slate-400">
                        <span>Apache &amp; PHP-FPM:</span>
                        <span className="text-[#74C69D]">ACTIVE [mpm_event]</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>cPanel Host SSL:</span>
                        <span className="text-[#74C69D]">VALIDATED [TLS 1.3]</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>GitHub CI/CD → Vercel:</span>
                        <span className="text-[#74C69D]">ATOMIC EDGE DEPLOY</span>
                      </div>
                    </div>

                    <p className="text-slate-200 font-medium text-xs sm:text-sm break-words">
                      Server Environments &amp; Cloud Deployment Matrix
                    </p>
                  </div>
                )}

                {isPeer && (
                  <div className="space-y-3 min-w-0">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="flex items-center gap-1.5 text-[#C599DB] truncate">
                        <HeartHandshake className="w-4 h-4 text-[#A070B8] shrink-0" /> CalAIM / ECM Care
                      </span>
                      <span className="text-[#C599DB] shrink-0 font-semibold">CalMHSA Credential</span>
                    </div>

                    <div className="h-24 sm:h-28 w-full bg-[#11171C] rounded-lg p-3 font-mono text-[11px] text-slate-300 border border-[#253038] flex flex-col justify-center space-y-1.5 overflow-hidden">
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-2 h-2 rounded-full bg-[#74C69D] shrink-0"></span>
                        <span className="truncate">State-Certified Medi-Cal Peer Specialist</span>
                      </div>
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-2 h-2 rounded-full bg-[#E07A5F] shrink-0"></span>
                        <span className="truncate">HIPAA-Compliant Case Management</span>
                      </div>
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-2 h-2 rounded-full bg-[#C599DB] shrink-0"></span>
                        <span className="truncate">Trauma-Informed Crisis Escalation</span>
                      </div>
                    </div>

                    <p className="text-slate-200 font-medium text-xs sm:text-sm break-words">
                      Human-Centered Peer Mentorship &amp; Navigation
                    </p>
                  </div>
                )}

                {/* Primary Action Button */}
                <div className="pt-4 border-t border-[#253038] flex justify-between items-center min-w-0">
                  <button
                    onClick={() => handleAction(project)}
                    className={`text-xs font-mono font-medium transition-colors flex items-center gap-1 underline underline-offset-4 truncate ${getActionColor(project.badgeColor)}`}
                  >
                    <span>{project.actionLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </button>
                  <span className="text-[11px] font-mono text-slate-400 shrink-0">
                    Interactive
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

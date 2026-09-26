import { useState } from 'react';
import { motion } from 'motion/react';
import { CAPABILITY_GROUPS } from '../data/portfolioData';

import type { Variants } from 'motion/react';

export function Capabilities() {
  const [selectedSkill, setSelectedSkill] = useState<{ name: string; detail: string } | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
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
    <section id="capabilities" className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-16 sm:pb-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 min-w-0"
      >
        <div className="min-w-0">
          <h2 className="text-xs font-mono text-[#9E2A2B] uppercase tracking-widest font-semibold">
            Capabilities Matrix
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-[#1E252B] mt-1 break-words">
            Dual Technical Pillars &amp; Operational Governance
          </p>
        </div>
        <p className="text-[#5C6773] text-xs sm:text-sm max-w-md break-words">
          Application development governance, server environments (LAMP, cPanel), cloud deployment (GitHub, Vercel), and state-certified healthcare systems.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full min-w-0"
      >
        {CAPABILITY_GROUPS.map((group, gIdx) => (
          <motion.div
            key={gIdx}
            variants={itemVariants}
            className="bg-white/90 border border-[#E2DAD0] p-5 sm:p-7 rounded-xl flex flex-col justify-between hover:border-[#D5CCC0] transition-all shadow-xs group min-w-0 w-full"
          >
            <div className="min-w-0">
              <div className="flex items-center justify-between mb-2 min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-[#1E252B] flex items-center min-w-0 break-words">
                  <span className={`w-2.5 h-2.5 rounded-full ${group.dotColor} mr-2.5 shrink-0`}></span>
                  <span className="truncate">{group.title}</span>
                </h3>
              </div>

              <p className="text-xs text-[#5C6773] mb-5 leading-relaxed break-words">
                {group.description}
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-[#2C353D] min-w-0">
                {group.skills.map((skill, sIdx) => {
                  const isSelected = selectedSkill?.name === skill.name;
                  return (
                    <li
                      key={sIdx}
                      onClick={() => setSelectedSkill(isSelected ? null : skill)}
                      className={`cursor-pointer rounded-lg p-2 -mx-2 transition-colors min-w-0 ${
                        isSelected ? 'bg-[#EFEAE1] text-[#1E252B]' : 'hover:bg-[#EFEAE1]/60 text-[#2C353D]'
                      }`}
                    >
                      <div className="flex items-start min-w-0">
                        <span className="text-[#7C8794] mr-2 font-mono shrink-0">•</span>
                        <div className="flex-1 min-w-0">
                          <span className="font-medium text-[#1E252B] block text-xs sm:text-sm break-words">
                            {skill.name}
                          </span>
                          {isSelected ? (
                            <p className="text-xs text-[#48535E] mt-1.5 leading-relaxed bg-[#F6F2EC] p-2.5 rounded border border-[#D5CCC0] animate-in fade-in break-words">
                              {skill.detail}
                            </p>
                          ) : (
                            <span className="text-[11px] text-[#7C8794] block truncate group-hover:text-[#5C6773]">
                              {skill.detail}
                            </span>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="pt-5 mt-5 border-t border-[#EAE4DC] text-[11px] font-mono text-[#7C8794] flex justify-between items-center">
              <span>{group.skills.length} Core Competencies</span>
              <span className="text-[#5C6773] group-hover:text-[#9E2A2B] transition-colors">Click to expand</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

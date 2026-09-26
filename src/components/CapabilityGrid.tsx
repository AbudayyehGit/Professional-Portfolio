import React from 'react';
import { CAPABILITY_GROUPS } from '../data/portfolioData';

export const CapabilityGrid: React.FC = () => {
  return (
    <section id="capabilities" className="py-12 bg-[#FBF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-mono font-bold tracking-widest text-[#9E2A2B] uppercase mb-1">
            Capabilities Matrix
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Dual Technical Pillars & Operational Governance
          </h2>
          <p className="mt-2 text-sm text-gray-700 max-w-2xl">
            Application development governance, server environments (LAMP/cPanel), cloud deployment (GitHub, Vercel), and state-certified healthcare systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITY_GROUPS.map((group, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${group.dotColor}`} />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-600">
                    {group.themeBadge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {group.title}
                </h3>
                <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                  {group.description}
                </p>

                <ul className="space-y-3 border-t border-gray-100 pt-4">
                  {group.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="text-xs">
                      <div className="font-semibold text-gray-900">
                        {skill.name}
                      </div>
                      <div className="text-gray-600 mt-0.5 leading-normal">
                        {skill.detail}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-3 border-t border-gray-100">
                <span className="text-[11px] font-mono text-gray-500 font-medium">
                  Core Competencies • Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

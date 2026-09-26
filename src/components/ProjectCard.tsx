import React from 'react';
import { Project } from '../data/portfolioData';
import { ExternalLink, Terminal, BarChart2, FileText, ChevronRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  const getActionIcon = () => {
    switch (project.actionType) {
      case 'analytics-modal':
        return <BarChart2 className="w-4 h-4 mr-2"/>;
      case 'docs-modal':
        return <FileText className="w-4 h-4 mr-2"/>;
      default:
        return <ExternalLink className="w-4 h-4 mr-2"/>;
    }
  };

  return (
    <article className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between hover:border-gray-300 transition-all duration-200">
      <div className="p-5 md:p-6 space-y-4">
        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-800 uppercase tracking-wider">
            {project.categoryLabel}
          </span>
          <span className="inline-flex items-center text-xs font-mono font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Production Verified
          </span>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 tracking-tight leading-snug">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-gray-700 leading-relaxed font-normal">
            {project.shortDesc}
          </p>
        </div>

        {/* Key Bullet Points */}
        {project.highlights && project.highlights.length > 0 && (
          <ul className="space-y-1.5 py-1">
            {project.highlights.map((highlight, idx) => (
              <li key={idx} className="text-xs text-gray-800 flex items-start">
                <span className="text-gray-400 mr-2 font-bold">•</span>
                <span className="leading-normal">{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Metrics Grid */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-2 py-2 bg-gray-50/80 rounded-lg p-3 border border-gray-100">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="text-center">
                <div className="text-[10px] uppercase tracking-wider text-gray-600 font-semibold">
                  {metric.label}
                </div>
                <div className="text-xs font-mono font-bold text-gray-900 mt-0.5">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stack Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Dark Console Action Bar */}
      <div className="bg-[#121824] p-4 text-gray-100 flex flex-col justify-between border-t border-gray-800">
        <div className="flex items-center justify-between text-xs font-mono text-gray-400 pb-2 border-b border-gray-800 mb-3">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-red-400"/>
            {project.id}-console
          </span>
          <span className="text-emerald-400">Interactive</span>
        </div>

        <button
          onClick={() => onOpenModal(project)}
          className="w-full min-h-[44px] inline-flex items-center justify-between px-4 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium text-xs transition-colors duration-150 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <span className="flex items-center font-medium">
            {getActionIcon()}
            {project.actionLabel}
          </span>
          <ChevronRight className="w-4 h-4 text-gray-400"/>
        </button>
      </div>
    </article>
  );
};

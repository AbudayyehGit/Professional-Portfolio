import React, { useState } from 'react';
import { motion, type Variants } from 'motion/react';
import { PROJECTS, Project } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';

interface ProjectsProps {
  onOpenAnalytics: () => void;
  onOpenDocs: (initialExcerptId?: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenAnalytics, onOpenDocs }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  const handleOpenModal = (project: Project) => {
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
    } else {
      onOpenDocs();
    }
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
        duration: 0.4,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section id="work" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 min-w-0">
        <div className="min-w-0">
          <p className="text-xs font-mono font-bold tracking-widest text-[#9E2A2B] uppercase mb-1">
            Portfolio &amp; Deployments
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Featured Systems &amp; Live Demos
          </h2>
        </div>
        <p className="text-gray-700 text-xs sm:text-sm max-w-md">
          Production web applications, architectural governance specifications, and enterprise deployment pipelines.
        </p>
      </div>

      {/* Interactive Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8 pb-1 max-w-full">
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
                ? 'bg-[#9E2A2B] text-white shadow-xs font-semibold'
                : 'bg-gray-100 text-gray-700 hover:text-gray-900 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Project Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full min-w-0"
      >
        {filteredProjects.map((project) => (
          <motion.div key={project.id} variants={itemVariants} className="flex">
            <ProjectCard
              project={project}
              onOpenModal={handleOpenModal}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

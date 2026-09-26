import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Mail, Layers, ChevronRight, MessageSquareCode, ShieldCheck } from 'lucide-react';

import type { Variants } from 'motion/react';

interface HeroProps {
  onOpenAnalytics: () => void;
  onOpenDocs: () => void;
  onOpenAssistant: () => void;
}

export function Hero({ onOpenAnalytics, onOpenDocs, onOpenAssistant }: HeroProps) {
  const [activeTrustBadge, setActiveTrustBadge] = useState<number | null>(null);

  const trustItems = [
    {
      label: 'Full-Stack Core',
      value: 'React · Vite · TypeScript · SPAs',
      tooltip: 'Engineered responsive single-page applications (SPAs), modular component architectures, and sub-second edge bundle delivery.'
    },
    {
      label: 'Backend & Systems',
      value: 'C# · ASP.NET · Node · Rust · SQL',
      tooltip: 'Enterprise services in C# / ASP.NET, Node.js microservices, Rust systems components, and normalized SQL schemas (PostgreSQL / MySQL).'
    },
    {
      label: 'Infrastructure & Cloud',
      value: 'LAMP · cPanel · GitHub · Vercel',
      tooltip: 'Production server environments (LAMP, cPanel), automated GitHub CI/CD deployment pipelines, and zero-downtime Vercel edge cutovers.'
    },
    {
      label: 'Analytics & Compliance',
      value: 'Python · Streamlit · CalAIM / HIPAA',
      tooltip: 'Interactive data platforms with Python & Streamlit, HITL dataset curation, and state-certified CalMHSA/CalAIM compliance.'
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
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
    <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-16 sm:pb-20 overflow-hidden">
      {/* Subtle regional atmospheric glows */}
      <div className="absolute top-1/4 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-[#9E2A2B]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-20 w-72 sm:w-96 h-72 sm:h-96 bg-[#2D6A4F]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full min-w-0"
      >
        {/* Left Column: Typographic Narrative */}
        <div className="lg:col-span-8 space-y-6 min-w-0">
          <motion.div variants={itemVariants} className="inline-flex flex-wrap items-center gap-2 max-w-full">
            <span className="font-mono text-xs text-[#9E2A2B] font-bold tracking-wider uppercase break-words">
              Joe Abudayyeh
            </span>
            <span className="text-[#A39B8F] hidden sm:inline">·</span>
            <span className="font-mono text-xs text-[#1E252B] font-semibold tracking-wider uppercase break-words">
              Systems Architect | Application Delivery Lead
            </span>
            <span className="text-[#A39B8F] hidden sm:inline">·</span>
            <span className="text-xs font-mono text-[#5C6773] break-words">Los Angeles, CA</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1E252B] leading-tight break-words max-w-full"
            style={{ textWrap: 'balance' }}
          >
            Engineering robust systems, dynamic web apps, &amp; clear technical narrative.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-[#48535E] leading-relaxed max-w-2xl break-words"
          >
            Bridging direct technical execution with multi-site operational leadership. Proven systems architecture spanning decoupled single-page applications (React, Vite, TypeScript, SPAs), enterprise server environments (LAMP, cPanel), cloud deployment (GitHub, Vercel), backend services (C#, ASP.NET, Node.js, Rust, SQL), Python/Streamlit data tooling, and state-certified healthcare systems (CalMHSA/CalAIM).
          </motion.p>

          {/* Action CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 sm:gap-4 items-center pt-2 max-w-full">
            <a
              href="#work"
              className="px-5 sm:px-6 py-3 rounded-lg bg-[#9E2A2B] hover:bg-[#852324] text-white font-medium text-xs sm:text-sm transition-all shadow-md shadow-[#9E2A2B]/20 flex items-center gap-2 group whitespace-nowrap"
            >
              <span>Explore Featured Work</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <button
              onClick={onOpenAssistant}
              className="px-4 sm:px-5 py-3 rounded-lg bg-[#FAF7F3] hover:bg-white border border-[#D5CCC0] text-[#9E2A2B] font-medium text-xs sm:text-sm transition-all flex items-center gap-2 shadow-xs whitespace-nowrap"
            >
              <MessageSquareCode className="w-4 h-4 text-[#9E2A2B]" />
              <span>Ask Executive Assistant</span>
            </button>

            <button
              onClick={onOpenAnalytics}
              className="px-3.5 sm:px-4 py-3 rounded-lg bg-white/90 hover:bg-white border border-[#D5CCC0] text-[#2D6A4F] font-mono text-xs transition-colors flex items-center gap-2 shadow-xs whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-pulse" />
              <span>Launch Analytics Workbench</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: Architectural Telemetry Card */}
        <motion.div variants={itemVariants} className="lg:col-span-4 min-w-0 w-full">
          <div className="bg-white/95 border border-[#E2DAD0] rounded-2xl p-5 sm:p-6 backdrop-blur-sm space-y-4 shadow-sm min-w-0">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE4DC]">
              <span className="text-xs font-mono text-[#5C6773] uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                <Layers className="w-3.5 h-3.5 text-[#9E2A2B]" /> Delivery Metrics
              </span>
              <span className="text-[11px] font-mono text-[#2D6A4F] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]" /> Verified SLAs
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center py-1 border-b border-[#EAE4DC]">
                <span className="text-[#5C6773]">Server Environments</span>
                <span className="text-[#1E252B] font-semibold">LAMP · cPanel · Linux</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#EAE4DC]">
                <span className="text-[#5C6773]">Cloud Deployments</span>
                <span className="text-[#005596] font-semibold">GitHub CI/CD · Vercel</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#EAE4DC]">
                <span className="text-[#5C6773]">Authored Literature</span>
                <span className="text-[#6A4C93] font-semibold tabular-nums">2,000+ Pages</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#EAE4DC]">
                <span className="text-[#5C6773]">Core Pillars</span>
                <span className="text-[#9E2A2B] font-semibold">App Dev &amp; Infrastructure</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#5C6773]">Compliance Rigor</span>
                <span className="text-[#2D6A4F] font-semibold">HIPAA · NIST · CalAIM</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenDocs}
                className="w-full py-2.5 px-3 bg-[#EFEAE1] hover:bg-[#E4DCCE] border border-[#D5CCC0] rounded-xl text-xs font-mono text-[#6A4C93] hover:text-[#523A73] transition-colors flex items-center justify-between group"
              >
                <span>Browse Architectural Specs</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Trust & Credential Strip (Section 1.A: Zero-pill clean text metadata, responsive grid) */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="mt-12 sm:mt-16 pt-8 border-t border-[#E2DAD0] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-xs w-full min-w-0"
      >
        {trustItems.map((item, idx) => (
          <div
            key={idx}
            className="group cursor-pointer space-y-1 min-w-0"
            onClick={() => setActiveTrustBadge(activeTrustBadge === idx ? null : idx)}
          >
            <span className="block font-mono text-[#7C8794] uppercase tracking-wider text-[11px] truncate">
              {item.label}
            </span>
            <span className="font-semibold text-[#1E252B] group-hover:text-[#9E2A2B] transition-colors block break-words">
              {item.value}
            </span>
            <p className="text-[11px] text-[#5C6773] leading-relaxed pt-0.5 break-words">
              {item.tooltip}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

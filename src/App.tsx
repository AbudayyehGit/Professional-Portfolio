/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Capabilities } from './components/Capabilities';
import { Background } from './components/Background';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AnalyticalEngineModal } from './components/AnalyticalEngineModal';
import { DocumentationModal } from './components/DocumentationModal';
import { ResumeModal } from './components/ResumeModal';
import { TerminalConsole } from './components/TerminalConsole';
import { ExecutiveAssistantDrawer } from './components/ExecutiveAssistantDrawer';
import { MessageSquareCode } from 'lucide-react';

import { SectionSeparator } from './components/SectionSeparator';

export default function App() {
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [initialDocId, setInitialDocId] = useState<string | undefined>(undefined);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const handleOpenDocs = (docId?: string) => {
    setInitialDocId(docId);
    setIsDocsOpen(true);
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-full min-h-screen bg-[#F6F2EC] text-[#1E252B] selection:bg-[#9E2A2B] selection:text-white flex flex-col font-sans transition-colors overflow-x-hidden">
      {/* Sticky Header with 3-Zone Contract */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
        isTerminalOpen={isTerminalOpen}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden min-w-0">
        <Hero
          onOpenAnalytics={() => setIsAnalyticsOpen(true)}
          onOpenDocs={() => handleOpenDocs('arch-blueprint')}
          onOpenAssistant={() => setIsAssistantOpen(true)}
        />

        <SectionSeparator />

        <Projects
          onOpenAnalytics={() => setIsAnalyticsOpen(true)}
          onOpenDocs={handleOpenDocs}
        />

        <SectionSeparator />

        <Capabilities />

        <SectionSeparator />

        <Background />

        <SectionSeparator />

        <Contact />
      </main>

      {/* Footer */}
      <Footer
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenAssistant={() => setIsAssistantOpen(true)}
      />

      {/* Ambient Floating Assistant Quick-Trigger Button (Bottom-Left) */}
      <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-30">
        <button
          onClick={() => setIsAssistantOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 bg-white/95 hover:bg-white text-[#9E2A2B] border border-[#D5CCC0] rounded-full shadow-lg hover:shadow-xl transition-all group font-mono text-xs shadow-[#1E252B]/5 backdrop-blur-sm"
          title="Open Executive Assistant Q&A"
        >
          <span className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-pulse" />
          <MessageSquareCode className="w-4 h-4 text-[#9E2A2B] group-hover:scale-105 transition-transform" />
          <span className="font-semibold hidden sm:inline">Executive Assistant</span>
          <span className="font-semibold sm:hidden">Briefing</span>
        </button>
      </div>

      {/* Executive Portfolio Assistant Drawer */}
      <ExecutiveAssistantDrawer
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
        onOpenDocs={handleOpenDocs}
        onOpenResume={() => setIsResumeOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Modals & Interactive Overlays */}
      <AnalyticalEngineModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
      />

      <DocumentationModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
        initialExcerptId={initialDocId}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <TerminalConsole
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
        onOpenDocs={() => handleOpenDocs('arch-blueprint')}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

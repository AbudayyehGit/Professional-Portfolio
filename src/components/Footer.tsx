import { ArrowUp, Github, Linkedin, MessageSquareCode } from 'lucide-react';

interface FooterProps {
  onOpenResume: () => void;
  onOpenAssistant: () => void;
}

export function Footer({ onOpenResume, onOpenAssistant }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#E2DAD0] py-10 text-xs text-[#5C6773] bg-[#EFEAE1]/60 w-full max-w-full overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-6 min-w-0">
        <div className="space-y-1 text-center sm:text-left min-w-0">
          <p className="text-[#1E252B] font-semibold break-words">© 2026 Joe Abudayyeh. All rights reserved.</p>
          <p className="text-[#7C8794] font-mono text-[11px] break-words">
            Systems Architect | Application Delivery Lead · Los Angeles, CA
          </p>
        </div>

        {/* Links and Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-xs">
          <button
            onClick={onOpenAssistant}
            className="hover:text-[#9E2A2B] transition-colors flex items-center gap-1.5 font-semibold text-[#9E2A2B]"
          >
            <MessageSquareCode className="w-3.5 h-3.5" />
            <span>Assistant Q&amp;A</span>
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#9E2A2B] transition-colors flex items-center gap-1.5"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#9E2A2B] transition-colors flex items-center gap-1.5"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>

          <button
            onClick={onOpenResume}
            className="hover:text-[#6A4C93] transition-colors"
          >
            Dossier
          </button>

          <button
            onClick={scrollToTop}
            className="hover:text-[#1E252B] transition-colors flex items-center gap-1 p-1 rounded hover:bg-[#EAE4DC]"
            title="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

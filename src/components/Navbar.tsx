import { useState, useEffect } from 'react';
import { Menu, X, FileText, Terminal, MessageSquareCode } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenAssistant: () => void;
  onToggleTerminal: () => void;
  isTerminalOpen: boolean;
}

export function Navbar({ onOpenResume, onOpenAssistant, onToggleTerminal, isTerminalOpen }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Track scroll position for active link indicator
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['work', 'capabilities', 'about', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work', id: 'work' },
    { label: 'Capabilities', href: '#capabilities', id: 'capabilities' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#F6F2EC]/90 border-b border-[#E2DAD0] transition-colors shadow-xs w-full max-w-full overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between min-w-0">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="font-mono font-bold text-base sm:text-lg tracking-tight text-[#1E252B] hover:text-[#9E2A2B] transition-colors shrink-0"
          title="Joe Abudayyeh - Systems Architect | Application Delivery Lead"
        >
          JOE<span className="text-[#9E2A2B]">.DEV</span>
        </a>

        {/* Zone 2: 4-6 text navigation links */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-medium text-[#48535E]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`transition-colors relative py-1 hover:text-[#9E2A2B] ${
                  isActive ? 'text-[#9E2A2B] font-semibold' : 'text-[#48535E]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9E2A2B] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          {/* Executive Assistant Drawer Trigger */}
          <button
            onClick={onOpenAssistant}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium bg-[#9E2A2B]/10 hover:bg-[#9E2A2B]/15 text-[#9E2A2B] border border-[#9E2A2B]/30 transition-all shadow-2xs whitespace-nowrap"
            title="Ask Executive Portfolio Assistant"
          >
            <MessageSquareCode className="w-3.5 h-3.5 text-[#9E2A2B]" />
            <span className="hidden sm:inline font-semibold">Assistant</span>
            <span className="sm:hidden font-semibold">Q&amp;A</span>
          </button>

          {/* Terminal CLI Toggle */}
          <button
            onClick={onToggleTerminal}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors border ${
              isTerminalOpen
                ? 'bg-[#9E2A2B]/10 text-[#9E2A2B] border-[#9E2A2B]/30'
                : 'bg-[#EFEAE1] hover:bg-[#E6DEC2] text-[#2C353D] border-[#D5CCC0]'
            }`}
            title="Toggle Systems Terminal"
          >
            <Terminal className="w-3.5 h-3.5 text-[#9E2A2B]" />
            <span>CLI</span>
          </button>

          {/* Resume Dossier Quick View */}
          <button
            onClick={onOpenResume}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#EFEAE1] hover:bg-[#E4DCCE] text-[#2C353D] border border-[#D5CCC0] transition-all hover:text-[#1E252B] whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5 text-[#6A4C93]" />
            <span>Dossier</span>
          </button>

          {/* Availability Status Badge (Kishwaukee Forest) */}
          <a
            href="#contact"
            className="inline-flex items-center px-2 sm:px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-mono font-medium bg-[#2D6A4F]/10 text-[#2D6A4F] border border-[#2D6A4F]/25 hover:bg-[#2D6A4F]/20 transition-colors whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] mr-1.5 animate-pulse shrink-0"></span>
            <span className="hidden sm:inline">Available for Hire</span>
            <span className="sm:hidden">Available</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#48535E] hover:text-[#1E252B] rounded-lg hover:bg-[#EFEAE1] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E2DAD0] bg-[#F6F2EC] px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#2C353D] hover:text-[#9E2A2B] py-1.5"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-[#E2DAD0] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAssistant();
              }}
              className="w-full py-2.5 px-3 text-center text-xs font-medium bg-[#9E2A2B] text-white rounded-lg flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageSquareCode className="w-4 h-4" />
              <span>Ask Executive Portfolio Assistant</span>
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onToggleTerminal();
                }}
                className="flex-1 py-2 text-center text-xs font-mono bg-[#EFEAE1] rounded-lg text-[#2C353D] hover:text-[#1E252B] border border-[#D5CCC0]"
              >
                Launch CLI Console
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex-1 py-2 text-center text-xs font-medium bg-[#FAF7F3] rounded-lg text-[#1E252B] border border-[#D5CCC0]"
              >
                View Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

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
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FBF9F5]/90 border-b border-gray-200 transition-colors shadow-xs w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between min-w-0">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="font-mono font-bold text-base sm:text-lg tracking-tight text-gray-900 hover:text-[#9E2A2B] transition-colors shrink-0"
          title="Joe Abudayyeh - Systems Architect | Application Delivery Lead"
        >
          JOE<span className="text-[#9E2A2B]">.DEV</span>
        </a>

        {/* Zone 2: 4-6 text navigation links */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-medium text-gray-700">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`transition-colors relative py-1 hover:text-[#9E2A2B] ${
                  isActive ? 'text-[#9E2A2B] font-semibold' : 'text-gray-700'
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
                : 'bg-white hover:bg-gray-100 text-gray-800 border-gray-200'
            }`}
            title="Toggle Systems Terminal"
          >
            <Terminal className="w-3.5 h-3.5 text-[#9E2A2B]" />
            <span>CLI</span>
          </button>

          {/* Resume Dossier Quick View */}
          <button
            onClick={onOpenResume}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-gray-100 text-gray-800 border border-gray-200 transition-all hover:text-gray-900 whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5 text-[#005596]" />
            <span>Dossier</span>
          </button>

          {/* Availability Status Badge (Kishwaukee Forest) */}
          <a
            href="#contact"
            className="inline-flex items-center px-2 sm:px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-mono font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1.5 animate-pulse shrink-0"></span>
            <span className="hidden sm:inline">Available for Hire</span>
            <span className="sm:hidden">Available</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-200 bg-[#FBF9F5] px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-gray-800 hover:text-[#9E2A2B] py-1.5"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-gray-200 flex flex-col gap-2">
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
                className="flex-1 py-2 text-center text-xs font-mono bg-white rounded-lg text-gray-800 hover:text-gray-900 border border-gray-200"
              >
                Launch CLI Console
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex-1 py-2 text-center text-xs font-medium bg-white rounded-lg text-gray-900 border border-gray-200"
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

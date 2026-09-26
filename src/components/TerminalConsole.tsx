import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, CornerDownLeft, Maximize2, Minimize2 } from 'lucide-react';

interface TerminalConsoleProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAnalytics: () => void;
  onOpenDocs: () => void;
  onOpenResume: () => void;
  onOpenAssistant: () => void;
  onNavigate: (sectionId: string) => void;
}

interface CommandLog {
  id: number;
  type: 'input' | 'output' | 'error';
  text: string;
}

export function TerminalConsole({
  isOpen,
  onClose,
  onOpenAnalytics,
  onOpenDocs,
  onOpenResume,
  onOpenAssistant,
  onNavigate
}: TerminalConsoleProps) {
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [history, setHistory] = useState<CommandLog[]>([
    { id: 1, type: 'output', text: 'JOE ABUDAYYEH Systems CLI v2.9.0 [Systems Architect | Application Delivery Lead]' },
    { id: 2, type: 'output', text: 'Type "help" to inspect system commands or "assistant" for executive briefing.' }
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    const newLogs: CommandLog[] = [
      ...history,
      { id: Date.now(), type: 'input', text: `$ ${cmd}` }
    ];

    const lower = cmd.toLowerCase();

    switch (lower) {
      case 'help':
        newLogs.push({
          id: Date.now() + 1,
          type: 'output',
          text: `Available commands:
  help        - List terminal capabilities
  assistant   - Open Executive Portfolio Assistant drawer
  stack       - Inspect full technical stack (C#, ASP.NET, SQL, React, Vite, Rust...)
  ratios      - View operational domain ratios matrix (2:3 · 1:2 · 1:3 · 1:4)
  projects    - Jump to featured projects & demos
  analytics   - Launch live Dynamic Analytical Engine (Python & Streamlit)
  docs        - Read Systems Architecture Manuals (2,000+ pages)
  skills      - Inspect Dual Technical Pillars matrix
  credentials - View academic degrees & state certifications (NIU, Kishwaukee, CalMHSA)
  resume      - Open printable professional dossier
  contact     - Scroll to direct contact interface
  clear       - Clear console output`
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'stack':
      case 'tech':
        newLogs.push({
          id: Date.now() + 1,
          type: 'output',
          text: `Core Engineering Stack:
  - Frontend: React, Vite, TypeScript, SPAs, Tailwind CSS
  - Backend: C#, ASP.NET, Node.js, Rust, PHP 8.x, Stateless REST APIs
  - Database: SQL (PostgreSQL, MySQL), Schema Normalization & Indexing
  - Server Environments: LAMP Stacks (Linux, Apache, MySQL, PHP), cPanel Administration
  - Cloud & Deployment: GitHub Actions CI/CD, Vercel Edge Runtime
  - Analytics & Data: Python, Streamlit, HITL Data Validation, Gemini API`
        });
        break;

      case 'assistant':
      case 'qa':
      case 'ai':
        newLogs.push({ id: Date.now() + 1, type: 'output', text: 'Mounting Executive Portfolio Assistant drawer...' });
        onOpenAssistant();
        break;

      case 'analytics':
        newLogs.push({ id: Date.now() + 1, type: 'output', text: 'Initializing Dynamic Analytical Engine Workbench...' });
        onOpenAnalytics();
        break;

      case 'docs':
      case 'specs':
        newLogs.push({ id: Date.now() + 1, type: 'output', text: 'Mounting Systems Manuals & Spec Libraries repository...' });
        onOpenDocs();
        break;

      case 'resume':
      case 'bio':
        newLogs.push({ id: Date.now() + 1, type: 'output', text: 'Rendering professional resume dossier...' });
        onOpenResume();
        break;

      case 'projects':
      case 'work':
        newLogs.push({ id: Date.now() + 1, type: 'output', text: 'Navigating viewport to #work section...' });
        onNavigate('work');
        break;

      case 'skills':
      case 'capabilities':
        newLogs.push({ id: Date.now() + 1, type: 'output', text: 'Navigating viewport to #capabilities section...' });
        onNavigate('capabilities');
        break;

      case 'credentials':
      case 'about':
      case 'education':
        newLogs.push({ id: Date.now() + 1, type: 'output', text: 'Navigating viewport to #about section...' });
        onNavigate('about');
        break;

      case 'contact':
        newLogs.push({ id: Date.now() + 1, type: 'output', text: 'Navigating viewport to #contact section...' });
        onNavigate('contact');
        break;

      case 'ratios':
      case 'hours':
        newLogs.push({
          id: Date.now() + 1,
          type: 'output',
          text: `Operational Domain Ratios Matrix:
  - Ratio 2:3 (Web & SPAs): React, Vite, TypeScript, C#, ASP.NET, Node.js, Rust, SQL
  - Ratio 1:2 (Server & Cloud): Production LAMP, cPanel, GitHub Actions, Vercel
  - Ratio 1:3 (Analytics & Tooling): Python, Streamlit, HITL QA
  - Ratio 1:4 (Healthcare Governance): CalMHSA, CalAIM / ECM, HIPAA, NIST`
        });
        break;

      default:
        newLogs.push({
          id: Date.now() + 1,
          type: 'error',
          text: `Command not recognized: "${cmd}". Type "help" or "assistant".`
        });
        break;
    }

    setHistory(newLogs);
    setInput('');
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 w-[calc(100vw-32px)] sm:w-full max-w-lg shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
      <div className={`bg-[#1A2127]/95 border border-[#2E3942] rounded-xl overflow-hidden backdrop-blur-md flex flex-col ${isExpanded ? 'h-96' : 'h-64'} shadow-2xl`}>
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#141B20] border-b border-[#253038] text-xs font-mono select-none">
          <div className="flex items-center gap-2 text-slate-300 truncate">
            <TerminalIcon className="w-3.5 h-3.5 text-[#9E2A2B] shrink-0" />
            <span className="truncate">joe@sys-terminal:~</span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-[#253038]"
              title={isExpanded ? 'Minimize height' : 'Expand height'}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-[#253038]"
              title="Close terminal"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Output pane */}
        <div className="flex-1 p-3 overflow-y-auto font-mono text-xs text-slate-300 space-y-1.5">
          {history.map((item) => (
            <div
              key={item.id}
              className={
                item.type === 'input'
                  ? 'text-[#E07A5F] font-semibold break-all'
                  : item.type === 'error'
                  ? 'text-rose-400 break-words'
                  : 'text-slate-300 whitespace-pre-line break-words'
              }
            >
              {item.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <form onSubmit={handleCommand} className="flex items-center px-3 py-2 bg-[#141B20] border-t border-[#253038] font-mono text-xs">
          <span className="text-[#74C69D] mr-2 flex items-center gap-1 font-bold">
            <span>$</span>
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help', 'assistant', 'analytics'..."
            className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none min-w-0"
          />
          <button type="submit" className="text-slate-400 hover:text-white p-1 shrink-0">
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

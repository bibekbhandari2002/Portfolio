import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, ChevronRight } from 'lucide-react';

const commands: Record<string, { output: string; action?: string }> = {
  'help': {
    output: `Available commands:
  help          - Show this help message
  about         - Navigate to About section
  research      - Navigate to Research section
  projects      - Navigate to Projects section
  skills        - Navigate to Skills section
  certs         - Navigate to Certifications section
  achievements  - Navigate to Achievements section
  contact       - Navigate to Contact section
  whoami        - Display identity info
  status        - Show system status
  clear         - Clear terminal
  exit          - Close terminal`
  },
  'whoami': {
    output: `USER: Bibek Bhandari
ROLE: Cybersecurity Researcher & Engineer
AFFILIATION: SRM University AP
STATUS: Active
CLEARANCE: Level 5`
  },
  'status': {
    output: `SYSTEM STATUS: OPERATIONAL
THREAT LEVEL: LOW
ENCRYPTION: AES-256
CONNECTION: SECURE
UPTIME: 99.9%`
  },
  'about': {
    output: 'Navigating to Identity Dossier...',
    action: '#aboutme'
  },
  'research': {
    output: 'Accessing Case Files...',
    action: '#research'
  },
  'projects': {
    output: 'Loading Active Missions...',
    action: '#projects'
  },
  'skills': {
    output: 'Initializing Loaded Modules...',
    action: '#skills'
  },
  'certs': {
    output: 'Fetching Credentials...',
    action: '#certifications'
  },
  'achievements': {
    output: 'Displaying Milestones...',
    action: '#achievements'
  },
  'contact': {
    output: 'Opening Encrypted Channel...',
    action: '#contact'
  },
};

interface HistoryEntry {
  command: string;
  output: string;
}

export const TerminalInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    }

    if (trimmedCmd === 'exit') {
      setIsOpen(false);
      setHistory([]);
      return;
    }

    const commandData = commands[trimmedCmd];
    let output = commandData?.output || `Command not found: ${trimmedCmd}. Type 'help' for available commands.`;
    
    setHistory(prev => [...prev, { command: cmd, output }]);
    setCommandHistory(prev => [cmd, ...prev]);
    setHistoryIndex(-1);

    if (commandData?.action) {
      setTimeout(() => {
        const element = document.querySelector(commandData.action!);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setIsOpen(false);
        }
      }, 500);
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || (e.ctrlKey && e.key === 'k')) {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-lg bg-primary text-primary-foreground shadow-cyber hover:shadow-cyber-lg transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open terminal"
      >
        <Terminal className="w-6 h-6" />
      </motion.button>

      {/* Terminal modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-20 right-6 left-6 md:left-auto md:w-[500px] max-h-[60vh] z-50 rounded-lg cyber-border bg-card overflow-hidden"
            >
              {/* Terminal header */}
              <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/80" />
                    <div className="w-3 h-3 rounded-full bg-warning/80" />
                    <div className="w-3 h-3 rounded-full bg-accent/80" />
                  </div>
                  <span className="ml-2 font-terminal text-sm text-muted-foreground">
                    veytrix@terminal
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:text-primary transition-colors"
                  aria-label="Close terminal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Terminal content */}
              <div className="p-4 font-terminal text-sm max-h-[300px] overflow-y-auto">
                {/* Welcome message */}
                <div className="text-muted-foreground mb-4">
                  <p className="text-accent">VEYTRIX COMMAND INTERFACE v2.0</p>
                  <p>Type 'help' for available commands.</p>
                  <p className="text-xs mt-1">Press Ctrl+K or ` to toggle terminal</p>
                </div>

                {/* History */}
                {history.map((entry, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex items-center gap-2 text-foreground">
                      <span className="text-primary">root@veytrix</span>
                      <span className="text-muted-foreground">:</span>
                      <span className="text-accent">~</span>
                      <span className="text-muted-foreground">$</span>
                      <span>{entry.command}</span>
                    </div>
                    <pre className="text-muted-foreground whitespace-pre-wrap mt-1 pl-4">
                      {entry.output}
                    </pre>
                  </div>
                ))}

                {/* Input line */}
                <div className="flex items-center gap-2 text-foreground">
                  <span className="text-primary">root@veytrix</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="text-accent">~</span>
                  <span className="text-muted-foreground">$</span>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="flex-1 bg-transparent border-none outline-none font-terminal text-foreground"
                    placeholder="Enter command..."
                  />
                  <span className="animate-terminal-blink text-accent">█</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootSequenceProps {
  onComplete: () => void;
}

const bootMessages = [
  { text: "INITIALIZING SECURE CHANNEL...", delay: 0 },
  { text: "LOADING DEFENSE MODULES...", delay: 800 },
  { text: "ESTABLISHING ENCRYPTED CONNECTION...", delay: 1600 },
  { text: "VERIFYING TRUST BOUNDARIES...", delay: 2400 },
  { text: "SCANNING FOR THREATS...", delay: 3200 },
  { text: "THREAT LEVEL: LOW", delay: 4000, color: "accent" },
  { text: "AUTHENTICATION SUCCESSFUL", delay: 4800, color: "accent" },
  { text: "ACCESS GRANTED", delay: 5600, color: "primary" },
];

export const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  const handleSkip = useCallback(() => {
    setIsComplete(true);
    setTimeout(onComplete, 500);
  }, [onComplete]);

  useEffect(() => {
    const timer = setTimeout(() => setShowSkip(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleSkip]);

  useEffect(() => {
    if (currentLine < bootMessages.length) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setProgress((currentLine + 1) / bootMessages.length * 100);
      }, bootMessages[currentLine].delay + 600);
      return () => clearTimeout(timer);
    } else if (currentLine === bootMessages.length) {
      const completeTimer = setTimeout(() => {
        setIsComplete(true);
        setTimeout(onComplete, 800);
      }, 1200);
      return () => clearTimeout(completeTimer);
    }
  }, [currentLine, onComplete]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Scanlines overlay */}
          <div className="absolute inset-0 scanlines opacity-30" />
          
          {/* Grid background */}
          <div className="absolute inset-0 cyber-grid opacity-20" />
          
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full"
                initial={{ 
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: -10,
                  opacity: 0.5
                }}
                animate={{ 
                  y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 10,
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          {/* Terminal container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-2xl mx-4 p-1 rounded-lg cyber-border bg-card/90 backdrop-blur-sm"
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-warning/80" />
                <div className="w-3 h-3 rounded-full bg-accent/80" />
              </div>
              <span className="ml-4 font-terminal text-sm text-muted-foreground">
                VEYTRIX_SECURITY_TERMINAL v2.0.25
              </span>
            </div>

            {/* Terminal content */}
            <div className="p-6 font-terminal text-sm md:text-base min-h-[300px]">
              <div className="mb-4 text-muted-foreground">
                <span className="text-primary">root@veytrix</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-accent">~</span>
                <span className="text-muted-foreground">$ </span>
                <span className="text-foreground">./initialize_secure_session.sh</span>
              </div>

              {bootMessages.slice(0, currentLine).map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-2 ${
                    msg.color === 'accent' 
                      ? 'text-accent neon-text-green' 
                      : msg.color === 'primary' 
                        ? 'text-primary neon-text' 
                        : 'text-foreground'
                  }`}
                >
                  <span className="text-muted-foreground mr-2">[{String(idx + 1).padStart(2, '0')}]</span>
                  {msg.text}
                  {idx === currentLine - 1 && (
                    <span className="text-accent ml-1">✓</span>
                  )}
                </motion.div>
              ))}

              {currentLine < bootMessages.length && (
                <div className="text-muted-foreground">
                  <span className="text-muted-foreground mr-2">[{String(currentLine + 1).padStart(2, '0')}]</span>
                  <span className="animate-pulse">Processing...</span>
                  <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>█</span>
                </div>
              )}
            </div>

            {/* Progress bar */}
            <div className="px-6 pb-4">
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground font-terminal">
                <span>SYSTEM INITIALIZATION</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>
          </motion.div>

          {/* Skip instruction */}
          <AnimatePresence>
            {showSkip && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-8 text-center z-10"
              >
                <button
                  onClick={handleSkip}
                  className="group relative px-6 py-2 font-terminal text-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Skip simulation"
                >
                  <div className="absolute inset-0 bg-primary/5 rounded border border-primary/20 group-hover:bg-primary/10 group-hover:border-primary/40 transition-colors" />
                  <p className="relative text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-2 whitespace-nowrap">
                    <span className="hidden sm:inline">Press</span>
                    <span className="text-primary border border-primary/30 px-1.5 py-0.5 rounded bg-primary/10 hidden sm:inline text-xs">ENTER</span>
                    <span className="hidden sm:inline">or</span>
                    <span className="text-primary border border-primary/30 px-1.5 py-0.5 rounded bg-primary/10 text-xs">TAP HERE</span>
                    <span>to skip</span>
                  </p>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-primary/30" />
          <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-primary/30" />
          <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-primary/30" />
          <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-primary/30" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const CyberHUD = () => {
  const [time, setTime] = useState(new Date());
  const [threatLevel, setThreatLevel] = useState('LOW');
  const [systemStatus, setSystemStatus] = useState('OPERATIONAL');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Scanlines overlay */}
      <div className="fixed inset-0 pointer-events-none z-40 scanlines opacity-20" />
      
      {/* Top HUD bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-30 pointer-events-none"
      >
        <div className="flex justify-between items-center px-4 py-2 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm">
          <div className="flex items-center gap-4 font-terminal text-xs text-muted-foreground">
            <span className="hidden sm:inline">
              <span className="text-primary">SYS:</span> {systemStatus}
            </span>
            <span className="hidden md:inline">
              <span className="text-primary">THREAT:</span>{' '}
              <span className={threatLevel === 'LOW' ? 'text-accent' : 'text-warning'}>
                {threatLevel}
              </span>
            </span>
          </div>
          <div className="font-terminal text-xs text-muted-foreground">
            <span className="text-primary">UTC:</span> {time.toISOString().slice(11, 19)}
          </div>
        </div>
      </motion.div>

      {/* Corner brackets */}
      <div className="fixed top-16 left-4 w-8 h-8 border-l border-t border-primary/20 pointer-events-none z-30" />
      <div className="fixed top-16 right-4 w-8 h-8 border-r border-t border-primary/20 pointer-events-none z-30" />
      <div className="fixed bottom-4 left-4 w-8 h-8 border-l border-b border-primary/20 pointer-events-none z-30" />
      <div className="fixed bottom-4 right-4 w-8 h-8 border-r border-b border-primary/20 pointer-events-none z-30" />

      {/* Side data streams */}
      <div className="fixed left-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent pointer-events-none z-30 hidden lg:block">
        <div className="absolute inset-0 data-stream" />
      </div>
      <div className="fixed right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent pointer-events-none z-30 hidden lg:block">
        <div className="absolute inset-0 data-stream" style={{ animationDelay: '-1.5s' }} />
      </div>
    </>
  );
};

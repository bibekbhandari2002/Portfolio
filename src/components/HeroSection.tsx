import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const typewriterTexts = [
  "Cybersecurity Researcher",
  "AI/LLM Security Analyst",
  "Threat Hunter",
  "Malware Analyst"
];

export const HeroSection = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = typewriterTexts[currentTextIndex];
    
    const typeSpeed = isDeleting ? 50 : 100;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentFullText.length) {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % typewriterTexts.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentTextIndex]);

 

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background grid */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 rounded border border-primary/30 bg-primary/10 font-terminal text-sm text-primary mb-4">
                <span className="animate-pulse inline-block w-2 h-2 bg-accent rounded-full mr-2" />
                SYSTEM ACTIVE
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-orbitron font-bold mb-4"
            >
              <span className="text-foreground">Bibek</span>
              <br />
              <span className="text-primary neon-text">Bhandari</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="h-8 mb-6"
            >
              <span className="font-terminal text-lg sm:text-xl text-accent">
                {displayedText}
                <span className="animate-terminal-blink ml-1">|</span>
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="font-terminal text-sm text-muted-foreground mb-8 max-w-md mx-auto lg:mx-0"
            >
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center lg:justify-start gap-8"
            >
              <div className="text-center">
                <div className="text-4xl font-orbitron font-bold text-primary neon-text">4</div>
                <div className="font-terminal text-xs text-muted-foreground mt-1">
                  Research<br /> Work
                </div>
              </div>
              <div className="w-px bg-border" />
              <div className="text-center">
                <div className="text-4xl font-orbitron font-bold text-primary neon-text">5+</div>
                <div className="font-terminal text-xs text-muted-foreground mt-1">
                  Projects<br />Completed
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl animate-pulse-glow" />
              
              {/* Video container */}
              <div className="relative rounded-lg overflow-hidden cyber-border p-2">
                <img
                  src="images/image.png"
                  alt="Cybersecurity visualization"
                  className="w-full h-full object-cover rounded"
                />

                
                {/* Video overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 px-3 py-1 bg-card border border-primary/30 rounded font-terminal text-xs text-primary"
              >
                ACTIVE
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 px-3 py-1 bg-card border border-accent/30 rounded font-terminal text-xs text-accent"
              >
                SECURED
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-terminal text-xs text-muted-foreground">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

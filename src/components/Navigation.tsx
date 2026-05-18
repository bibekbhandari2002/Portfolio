import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Linkedin, Github, Mail } from 'lucide-react';

const navItems = [
  { href: '#aboutme', label: 'About' },
  { href: '#research', label: 'Research' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#certifications', label: 'Certs' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#contact', label: 'Contact' },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Scroll spy
      const sections = navItems.map(item => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3 }}
        className={`fixed top-8 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-background/90 backdrop-blur-md border-b border-border/50' 
            : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 rounded border border-primary/50 flex items-center justify-center bg-primary/10">
              <span className="font-orbitron text-primary text-xl font-bold">V</span>
            </div>
            <span className="hidden sm:block font-orbitron text-lg text-foreground">
              VEYTRIX
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`px-3 py-2 font-terminal text-sm transition-all relative ${
                  activeSection === item.href.slice(1)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Social links + Mobile menu button */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <motion.a
                href="https://www.linkedin.com/in/bibek-bhandari/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://github.com/abhinavbibek"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="mailto:bibekavi22@gmail.com"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-foreground"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-card border-l border-border z-50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <span className="font-orbitron text-primary">NAVIGATION</span>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="flex-1 p-4">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleNavClick(item.href)}
                      className={`w-full text-left px-4 py-3 font-terminal border-l-2 transition-all mb-2 ${
                        activeSection === item.href.slice(1)
                          ? 'border-primary text-primary bg-primary/10'
                          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-primary/50'
                      }`}
                    >
                      <span className="text-primary/50 mr-2">&gt;</span>
                      {item.label}
                    </motion.button>
                  ))}
                </nav>
                <div className="p-4 border-t border-border">
                  <p className="font-terminal text-xs text-muted-foreground text-center">
                    Press ESC to close
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

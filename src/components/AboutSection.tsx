import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Cpu, Eye, X } from 'lucide-react';

export const AboutSection = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <section id="aboutme" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hex-pattern opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded border border-primary/30 bg-primary/5 mb-4">
            <Shield className="w-4 h-4 text-primary" />
            <span className="font-terminal text-sm text-primary">CLEARANCE: LEVEL 5</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-2">
            IDENTITY <span className="text-primary">DOSSIER</span>
          </h2>
          <p className="font-terminal text-muted-foreground">Subject identification and background analysis</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative group">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-lg bg-primary/20 blur-2xl group-hover:bg-primary/30 transition-all" />
              
              {/* Image frame */}
              <div className="relative p-1 rounded-lg cyber-border bg-card">
                <div className="relative overflow-hidden rounded">
                  <img
                    src="/images/mypic.jpg"
                    alt="Bibek Bhandari"
                    className="w-64 h-80 object-cover cursor-pointer transition-transform group-hover:scale-105"
                    onClick={() => setIsLightboxOpen(true)}
                  />
                  
                  {/* Scan overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute left-0 right-0 h-1 bg-primary/50 animate-scan" />
                    </div>
                  </div>
                </div>
                
                {/* Frame decorations */}
                <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary" />
                <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-primary" />
                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-primary" />
              </div>

              {/* Click tooltip */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-2 py-1 bg-card/90 rounded font-terminal text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                Bibek Bhandari
              </div>
            </div>
          </motion.div>

          {/* Bio content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="cyber-border rounded-lg p-6 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-4 h-4 text-accent" />
                <span className="font-terminal text-sm text-accent">DECRYPTED</span>
              </div>
              
              <h3 className="text-2xl font-orbitron font-bold text-foreground mb-4">
                Who Am I?
              </h3>
              
              <div className="space-y-4 font-terminal text-sm text-muted-foreground leading-relaxed">
                <p>
                  I'm <span className="text-foreground font-bold">Bibek Bhandari</span>, a cybersecurity-focused Computer Science undergraduate at SRM University AP with a strong interest in <span className="text-primary">AI/LLM security, adversarial machine learning, and trustworthy AI systems</span>. Over the last two years, I have been actively involved in research exploring how modern AI systems behave under adversarial and security-critical conditions.
                </p>
              
                <p>
                  My work has focused on areas including <span className="text-primary">LLM privacy and prompt-injection risks, federated learning security, adversarial robustness, and secure multi-agent AI architectures</span>. I have worked on projects involving PII identification and masking for LLM chatbots, trust-aware federated learning under adversarial settings, and zero-trust communication protocols for autonomous AI agents.
                </p>
              
                <p>
                  Beyond AI security research, I also work with malware analysis, reverse engineering, threat modeling, and cloud/container security using tools and platforms such as Ghidra, Docker, Kubernetes, and AWS security services. I enjoy understanding how attacks work at both the systems and model level to design security mechanisms that are practical, resilient, and trustworthy.
                </p>
              
                <p>
                  My long-term goal is to contribute to research at the intersection of cybersecurity and trustworthy AI, particularly in building secure intelligent systems that can operate reliably in real-world environments.
                </p>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Cpu, label: 'Systems', value: 'Secured' },
                { icon: Eye, label: 'Threats', value: 'Monitored' },
                { icon: Shield, label: 'Status', value: 'Active' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center p-3 rounded border border-border/50 bg-card/30"
                >
                  <stat.icon className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <div className="font-terminal text-xs text-muted-foreground">{stat.label}</div>
                  <div className="font-terminal text-sm text-accent">{stat.value}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>

        </motion.div>
      )}
    </section>
  );
};

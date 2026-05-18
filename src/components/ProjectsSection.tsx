import { motion } from 'framer-motion';
import { Code, Github, ExternalLink, Crosshair } from 'lucide-react';

const projectsData = [
  {
    title: "CI/CD Update Malware Scanner — VersionDiff Sentinel",
    description: `A lightweight security tool for CI/CD pipelines that detects malicious changes between v1 → v2 software updates.
Automates static diff analysis, flags suspicious modifications, and generates forensic HTML reports for analysts.
Designed to enforce secure update validation before deployment, ensuring only trusted code reaches production.`,
    github: "https://github.com/abhinavbibek/software-update-security-analyzer",
    tags: ["CI/CD", "Malware Detection", "Static Analysis"]
  },
  {
    title: "Malware Payload Analysis & Penetration Testing",
    description: `Simulated end-to-end malware attack via a fake React app, delivering multiple payloads.
Developed Python payloads (clipboard hijack, registry persistence, stealth evasion, C2 patterns).
Used Wireshark, Autoruns, and Process Explorer for incident response and forensic analysis.`,
    github: "https://github.com/abhinavbibek/Analyzing-Malware-and-Remove-Hidden-Payloads",
    tags: ["Malware Analysis", "Penetration Testing", "Forensics"]
  },
  {
    title: "Privacy-Preserving Medical Text Simplification",
    description: `Fine-tuned BERT (T5) achieving 87% SARI and 40% complexity reduction.
Integrated PII masking with SpaCy NER (96% accuracy).
Balanced secure NLP processing and responsible AI.`,
    github: "https://github.com/abhinavbibek/Medical-Text-Simplifer",
    tags: ["NLP", "Privacy", "AI Security"]
  }
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="relative py-24">
      <div className="absolute inset-0 hex-pattern opacity-20" />
      
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
            <Crosshair className="w-4 h-4 text-primary" />
            <span className="font-terminal text-sm text-primary">ACTIVE MISSIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-2">
            <span className="text-primary">PROJECTS</span>
          </h2>
          <p className="font-terminal text-muted-foreground">Applied security and innovation</p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full flex flex-col p-6 rounded-lg cyber-border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all relative overflow-hidden">
                {/* Scan line effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute left-0 right-0 h-0.5 bg-primary/30 animate-scan" />
                </div>

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <Code className="w-6 h-6 text-primary" />
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="View on GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </motion.a>
                </div>

                {/* Title */}
                <h3 className="text-lg font-orbitron font-bold text-foreground mb-3 group-hover:text-primary transition-colors flex-shrink-0">
                  {project.title}
                </h3>

                {/* Description */}
                <div className="font-terminal text-sm text-muted-foreground space-y-2 mb-4 flex-grow">
                  {project.description.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/50">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded bg-primary/10 border border-primary/20 font-terminal text-xs text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Mission status */}
                <div className="flex items-center gap-2 mt-4 text-accent/60">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="font-terminal text-xs">MISSION COMPLETE</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

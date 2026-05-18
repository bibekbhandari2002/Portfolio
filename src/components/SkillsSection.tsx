import { motion } from 'framer-motion';
import { Cpu, Wrench, Cloud, BookOpen, Brain } from 'lucide-react';

const skillCategories = [
  {
    title: "Programming & RE",
    icon: Cpu,
    skills: "C • Python • Shell Scripting • Assembly • pwntools • Ghidra • x64dbg"
  },
  {
    title: "Security Tools",
    icon: Wrench,
    skills: "Wireshark • Burp Suite • OWASP ZAP • Metasploit • Nessus • Snort • Trivy • Falco • PEstudio • DIE • YARA"
  },
  {
    title: "Cloud & Containers",
    icon: Cloud,
    skills: "Docker • Kubernetes • AWS (IAM, GuardDuty) • Terraform + Checkov"
  },
  {
    title: "Frameworks & Standards",
    icon: BookOpen,
    skills: "MITRE ATT&CK • MITRE ATLAS • NIST AI RMF • OWASP LLM Top 10 • NIST SSDF • CISA KEV"
  },
  {
    title: "Research Interests",
    icon: Brain,
    skills: "AI/LLM Security • Adversarial ML • Threat Modeling • Malware Analysis • Cloud/Container Security"
  }
];

export const SkillsSection = () => {
  return (
    <section id="skills" className="relative py-24 bg-secondary/30">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
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
            <Cpu className="w-4 h-4 text-primary" />
            <span className="font-terminal text-sm text-primary">LOADED MODULES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-2">
            <span className="text-primary">SKILLS</span>
          </h2>
          <p className="font-terminal text-muted-foreground">Technical expertise and tools</p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group ${index === skillCategories.length - 1 && skillCategories.length % 3 === 1 ? 'lg:col-start-2' : ''}`}
            >
              <div className="h-full p-6 rounded-lg cyber-border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all">
                {/* Icon and title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-all">
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-orbitron font-bold text-foreground group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                </div>

                {/* Skills list */}
                <p className="font-terminal text-sm text-muted-foreground leading-relaxed">
                  {category.skills}
                </p>

                {/* Loading bar decoration */}
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-terminal text-xs text-muted-foreground">MODULE STATUS</span>
                    <span className="font-terminal text-xs text-accent">LOADED</span>
                  </div>
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-gradient-to-r from-primary to-accent"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

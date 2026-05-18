import { motion } from 'framer-motion';
import { FlaskConical, ExternalLink } from 'lucide-react';

const researchData = [
  {
    title: "LLM Privacy Risk Evaluation & PII Masking Framework",
    description: `Research-focused work on evaluating sensitive information disclosure risks in LLM-based chatbot systems using adversarial prompt testing techniques.
Fine-tuned a DeBERTa-based model on ECHR datasets for PII identification and masking, achieving 94% detection accuracy. Mapped identified attack patterns and privacy leakage behaviors to MITRE ATLAS techniques for AI threat modeling and security evaluation.`,
    year: "2025",
    status: "COMPLETED"
  },

  {
    title: "Trusted Boundary Protocol (TBP) for Secure Agentic AI Systems",
    description: `Research project focused on designing a zero-trust security architecture for secure communication between autonomous AI agents across organizational trust boundaries.
Developed a secure communication framework integrating mutual TLS (X.509), ECDSA-based message signing, SHA-256 provenance logging, and policy-driven trust validation pipelines. Evaluated resilience against prompt injection, replay attacks, orchestration abuse, tool misuse, and message tampering in distributed multi-agent environments.`,
    year: "2025–2026",
    status: "COMPLETED"
  },

  {
    title: "TAP-FL: Trust-Aware Privacy-Preserving Federated Learning",
    description: `Research on federated learning security under adversarial and heterogeneous environments using trust-aware aggregation and local differential privacy mechanisms.
Studied robustness against malicious client updates, privacy–utility trade-offs, and interpretability stability under non-IID data distributions. Applied the framework to cross-domain credit risk assessment using heterogeneous learning models.`,
    year: "2025–2026",
    status: "COMPLETED"
  },

  {
    title: "Adversarial Robustness Analysis of Deep Learning Models",
    description: `Research internship work focused on studying adversarial evasion and poisoning attacks on deep neural networks under white-box threat settings.
Performed perturbation-based robustness evaluation and analyzed classifier stability under adversarial conditions. Explored robustness–accuracy trade-offs and training-time hardening approaches for improving adversarial resilience.`,
    year: "2025–Present",
    status: "IN-PROGRESS"
  }
];

export const ResearchSection = () => {
  return (
    <section id="research" className="relative py-24 bg-secondary/30">
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
            <FlaskConical className="w-4 h-4 text-primary" />
            <span className="font-terminal text-sm text-primary">CASE FILES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-2">
            RESEARCH <span className="text-primary">EXPERIENCE</span>
          </h2>

          <p className="font-terminal text-muted-foreground">
            Research contributions in AI security, trustworthy systems, and adversarial machine learning
          </p>
        </motion.div>

        {/* Research cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {researchData.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-6 rounded-lg cyber-border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FlaskConical className="w-5 h-5 text-primary" />

                    <span
                      className={`px-2 py-1 rounded font-terminal text-xs ${
                        item.status === 'IN PROGRESS'
                          ? 'bg-warning/20 text-warning border border-warning/30'
                          : 'bg-accent/20 text-accent border border-accent/30'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <span className="font-terminal text-xs text-muted-foreground">
                    {item.year}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-orbitron font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <div className="font-terminal text-sm text-muted-foreground space-y-2">
                  {item.description.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>

                {/* Bottom decoration */}
                <div className="mt-6 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2 text-primary/60">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="font-terminal text-xs">
                      TRUSTWORTHY AI RESEARCH
                    </span>
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

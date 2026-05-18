import { motion } from 'framer-motion';
import { Award, BadgeCheck, Calendar } from 'lucide-react';

const certifications = [
  {
    title: "Cybersecurity & Hacker Tactics Training",
    issuer: "Infosys Springboard",
    date: "Feb 2025"
  },
  {
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Coursera",
    date: "Dec 2024"
  },
  {
    title: "AWS Fundamentals",
    issuer: "Coursera",
    date: "Nov 2024"
  }
];

export const CertificationsSection = () => {
  return (
    <section id="certifications" className="relative py-24">
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
            <BadgeCheck className="w-4 h-4 text-primary" />
            <span className="font-terminal text-sm text-primary">CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-2">
            <span className="text-primary">CERTIFICATIONS</span>
          </h2>
          <p className="font-terminal text-muted-foreground">Proof of learning and skills</p>
        </motion.div>

        {/* Certifications grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-6 rounded-lg cyber-border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all text-center">
                {/* Badge icon */}
                <div className="inline-flex p-3 rounded-full bg-primary/10 border border-primary/20 mb-4 group-hover:bg-primary/20 transition-all">
                  <Award className="w-8 h-8 text-primary" />
                </div>

                {/* Title */}
                <h3 className="font-orbitron font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <p className="font-terminal text-sm text-muted-foreground mb-3">
                  {cert.issuer}
                </p>

                {/* Date */}
                <div className="flex items-center justify-center gap-2 text-accent">
                  <Calendar className="w-4 h-4" />
                  <span className="font-terminal text-sm">{cert.date}</span>
                </div>

                {/* Verified badge */}
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="flex items-center justify-center gap-2 text-accent/60">
                    <BadgeCheck className="w-4 h-4" />
                    <span className="font-terminal text-xs">VERIFIED</span>
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

import { motion } from 'framer-motion';
import { Trophy, Star, Globe } from 'lucide-react';

const achievements = [
  {
    title: "Top 1% Merit Scholar",
    organization: "SRM University AP",
    period: "2022–Present",
    description: "Full tuition waiver for academic excellence.",
    icon: Trophy
  },
  {
    title: "Stantec Equity and Diversity Scholarship",
    organization: "Stantec Inc, Canada",
    period: "2024",
    description: "One of 46 global recipients for academic excellence & leadership.",
    icon: Star
  },
  {
    title: "Delegate of Nepal — IGN MUN",
    organization: "WHO Committee",
    period: "2020",
    description: "Represented Nepal addressing global vaccination equity.",
    icon: Globe
  }
];

export const AchievementsSection = () => {
  return (
    <section id="achievements" className="relative py-24 bg-secondary/30">
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
            <Trophy className="w-4 h-4 text-primary" />
            <span className="font-terminal text-sm text-primary">MILESTONES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-2">
            <span className="text-primary">ACHIEVEMENTS</span>
          </h2>
          <p className="font-terminal text-muted-foreground">Recognitions and milestones</p>
        </motion.div>

        {/* Achievements grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-6 rounded-lg cyber-border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all">
                {/* Icon */}
                <div className="inline-flex p-3 rounded bg-primary/10 border border-primary/20 mb-4 group-hover:bg-primary/20 transition-all">
                  <achievement.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Title */}
                <h3 className="font-orbitron font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {achievement.title}
                </h3>

                {/* Organization and period */}
                <p className="font-terminal text-sm text-primary mb-1">
                  {achievement.organization}
                </p>
                <p className="font-terminal text-xs text-muted-foreground mb-3">
                  {achievement.period}
                </p>

                {/* Description */}
                <p className="font-terminal text-sm text-muted-foreground">
                  {achievement.description}
                </p>

                {/* Status bar */}
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2 text-warning/60">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-terminal text-xs">CLEARANCE MILESTONE</span>
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

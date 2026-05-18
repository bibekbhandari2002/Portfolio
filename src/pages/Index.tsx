import { useState, useEffect } from 'react';
import { BootSequence } from '@/components/BootSequence';
import { CyberHUD } from '@/components/CyberHUD';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ResearchSection } from '@/components/ResearchSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { SkillsSection } from '@/components/SkillsSection';
import { CertificationsSection } from '@/components/CertificationsSection';
import { AchievementsSection } from '@/components/AchievementsSection';
import { ContactSection } from '@/components/ContactSection';
import { TerminalInterface } from '@/components/TerminalInterface';

const Index = () => {
  const [showBoot, setShowBoot] = useState(true);
  const [hasBooted, setHasBooted] = useState(false);

  useEffect(() => {
    // Check if user has already seen boot sequence in this session
    const hasSeenBoot = sessionStorage.getItem('veytrix_boot_complete');
    if (hasSeenBoot) {
      setShowBoot(false);
      setHasBooted(true);
    }
  }, []);

  const handleBootComplete = () => {
    setShowBoot(false);
    setHasBooted(true);
    sessionStorage.setItem('veytrix_boot_complete', 'true');
  };

  return (
    <>
      {/* Boot sequence */}
      {showBoot && <BootSequence onComplete={handleBootComplete} />}

      {/* Main content */}
      {hasBooted && (
        <>
          {/* Cyber HUD overlay */}
          <CyberHUD />

          {/* Navigation */}
          <Navigation />

          {/* Main sections */}
          <main className="relative">
            <HeroSection />
            <AboutSection />
            <ResearchSection />
            <ProjectsSection />
            <SkillsSection />
            <CertificationsSection />
            <AchievementsSection />
            <ContactSection />
          </main>

          {/* Terminal interface */}
          <TerminalInterface />
        </>
      )}
    </>
  );
};

export default Index;

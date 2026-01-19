import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import VideoPortfolio from '@/components/VideoPortfolio';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [skipIntro, setSkipIntro] = useState(false);

  // Skip loading on keypress
  useEffect(() => {
    const handleKeyPress = () => {
      if (isLoading) {
        setSkipIntro(true);
        setIsLoading(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isLoading]);

  // Also allow click to skip
  useEffect(() => {
    const handleClick = () => {
      if (isLoading) {
        setSkipIntro(true);
        setIsLoading(false);
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [isLoading]);

  if (isLoading && !skipIntro) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* CRT Scanlines Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 scanlines opacity-30" />
      
      {/* Vignette Effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, hsl(220 20% 8% / 0.4) 100%)'
        }}
      />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        <HeroSection />
        <SkillsSection />
        <VideoPortfolio />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;

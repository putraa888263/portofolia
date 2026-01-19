import { useEffect, useState } from 'react';
import { profileData } from '@/data/profile';
import { Github, Linkedin, Youtube, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const HeroSection = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = profileData.title;

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    // Cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [fullText]);

  const socialLinks = [
    { icon: Github, url: profileData.socials.github, label: 'GitHub' },
    { icon: Linkedin, url: profileData.socials.linkedin, label: 'LinkedIn' },
    { icon: Youtube, url: profileData.socials.youtube, label: 'YouTube' },
    { icon: Instagram, url: profileData.socials.instagram, label: 'Instagram' },
  ].filter(link => link.url);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 blur-3xl rounded-full" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-accent/20 blur-3xl rounded-full" />
      </div>

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Profile Image */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
              {/* Pixel Border Frame */}
              <div className="absolute inset-0 border-4 border-primary animate-pixel-pulse" />
              <div className="absolute -inset-2 border-4 border-accent/50" />
              <div className="absolute -inset-4 border-2 border-secondary/30" />
              
              {/* Image Container */}
              <div className="absolute inset-2 bg-muted overflow-hidden">
                <img
                  src={profileData.profileImage}
                  alt={profileData.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%231a1f2e" width="100" height="100"/><text x="50" y="55" font-family="monospace" font-size="40" fill="%2300ff41" text-anchor="middle">?</text></svg>';
                  }}
                />
              </div>

              {/* Decorative Pixels */}
              <div className="absolute -top-6 -left-6 w-4 h-4 bg-primary animate-pixel-float" />
              <div className="absolute -top-4 -right-8 w-3 h-3 bg-accent animate-pixel-float" style={{ animationDelay: '0.5s' }} />
              <div className="absolute -bottom-6 -left-8 w-5 h-5 bg-secondary animate-pixel-float" style={{ animationDelay: '1s' }} />
              <div className="absolute -bottom-4 -right-6 w-4 h-4 bg-primary animate-pixel-float" style={{ animationDelay: '1.5s' }} />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Greeting */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <span className="font-pixel text-pixel-xs text-muted-foreground mb-4 block">
                {'> HELLO WORLD, I AM'}
              </span>
            </div>

            {/* Name */}
            <h1 
              className="font-pixel text-pixel-xl md:text-pixel-2xl lg:text-pixel-3xl text-primary text-glow mb-4 animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              {profileData.name.toUpperCase()}
            </h1>

            {/* Typewriter Title */}
            <div 
              className="font-silkscreen text-xl md:text-2xl lg:text-3xl text-accent mb-6 h-10 animate-fade-in-up"
              style={{ animationDelay: '0.5s' }}
            >
              <span>{displayedText}</span>
              <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} text-primary`}>_</span>
            </div>

            {/* Subtitle */}
            <p 
              className="font-silkscreen text-secondary mb-6 animate-fade-in-up"
              style={{ animationDelay: '0.6s' }}
            >
              {profileData.subtitle}
            </p>

            {/* Description */}
            <p 
              className="font-silkscreen text-muted-foreground max-w-xl mb-8 leading-relaxed animate-fade-in-up"
              style={{ animationDelay: '0.7s' }}
            >
              {profileData.description}
            </p>

            {/* Contact Info */}
            <div 
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8 animate-fade-in-up"
              style={{ animationDelay: '0.8s' }}
            >
              <a 
                href={`mailto:${profileData.email}`}
                className="flex items-center gap-2 font-silkscreen text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail size={16} className="text-primary" />
                {profileData.email}
              </a>
              <span className="flex items-center gap-2 font-silkscreen text-sm text-muted-foreground">
                <MapPin size={16} className="text-accent" />
                {profileData.location}
              </span>
            </div>

            {/* Social Links */}
            <div 
              className="flex justify-center lg:justify-start gap-4 mb-8 animate-fade-in-up"
              style={{ animationDelay: '0.9s' }}
            >
              {socialLinks.map(({ icon: Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center border-2 border-border bg-card hover:border-primary hover:bg-primary hover:text-background transition-all group"
                  aria-label={label}
                >
                  <Icon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div 
              className="flex flex-wrap justify-center lg:justify-start gap-4 animate-fade-in-up"
              style={{ animationDelay: '1s' }}
            >
              <a href="#portfolio" className="pixel-btn">
                VIEW PORTFOLIO
              </a>
              <a href="#contact" className="pixel-btn pixel-btn-outline">
                CONTACT ME
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="font-pixel text-pixel-xs text-muted-foreground">SCROLL</span>
          <div className="w-4 h-8 border-2 border-primary flex items-start justify-center p-1">
            <div className="w-1.5 h-2 bg-primary animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

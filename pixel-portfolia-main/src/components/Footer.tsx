import { profileData } from '@/data/profile';
import { Github, Linkedin, Youtube, Instagram, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, url: profileData.socials.github, label: 'GitHub' },
    { icon: Linkedin, url: profileData.socials.linkedin, label: 'LinkedIn' },
    { icon: Youtube, url: profileData.socials.youtube, label: 'YouTube' },
    { icon: Instagram, url: profileData.socials.instagram, label: 'Instagram' },
  ].filter(link => link.url);

  return (
    <footer className="relative py-12 border-t-4 border-border bg-card">
      {/* Scanlines */}
      <div className="absolute inset-0 scanlines pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="font-pixel text-pixel-lg text-primary text-glow mb-6">
            {'</>'}
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mb-6">
            {socialLinks.map(({ icon: Icon, url, label }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border-2 border-border text-muted-foreground hover:border-primary hover:text-primary transition-all"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {['Home', 'About', 'Skills', 'Portfolio', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-silkscreen text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="font-silkscreen text-sm text-muted-foreground mb-2">
              Made with <Heart size={14} className="inline text-destructive animate-pulse" /> & Pixels
            </p>
            <p className="font-pixel text-pixel-xs text-muted-foreground/60">
              © {currentYear} {profileData.name} | ALL RIGHTS RESERVED
            </p>
          </div>

          {/* Easter Egg */}
          <div className="mt-6 flex items-center gap-2 text-muted-foreground/40">
            <span className="font-pixel text-pixel-xs">↑ ↑ ↓ ↓ ← → ← → B A</span>
          </div>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-border" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-border" />
    </footer>
  );
};

export default Footer;

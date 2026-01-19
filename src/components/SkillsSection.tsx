import { useEffect, useRef, useState } from 'react';
import { skillsData, skillCategories, Skill } from '@/data/skills';
import PixelCard from './PixelCard';

const SkillBar = ({ skill, isVisible }: { skill: Skill; isVisible: boolean }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setWidth(skill.level);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible, skill.level]);

  const getColorClass = (level: number) => {
    if (level >= 90) return 'bg-primary';
    if (level >= 75) return 'bg-accent';
    if (level >= 50) return 'bg-secondary';
    return 'bg-muted-foreground';
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-silkscreen text-sm text-foreground">{skill.name}</span>
        <span className="font-pixel text-pixel-xs text-primary">{skill.level}%</span>
      </div>
      <div className="pixel-progress">
        <div
          className={`pixel-progress-bar ${getColorClass(skill.level)} transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
      {skill.description && (
        <p className="font-silkscreen text-xs text-muted-foreground mt-1">{skill.description}</p>
      )}
    </div>
  );
};

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = ['all', ...Object.keys(skillCategories)] as const;
  
  const filteredSkills = activeCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" ref={sectionRef} className="py-20 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="font-pixel text-pixel-xs text-muted-foreground block mb-2">
            {'// KEMAMPUAN'}
          </span>
          <h2 className="font-pixel text-pixel-lg md:text-pixel-xl text-primary text-glow mb-4">
            SKILL JARINGAN
          </h2>
          <p className="font-silkscreen text-muted-foreground max-w-2xl mx-auto">
            Keahlian dalam konfigurasi dan manajemen jaringan Mikrotik
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            const categoryData = category === 'all' 
              ? { label: 'SEMUA', icon: '🎯' }
              : skillCategories[category as keyof typeof skillCategories];
            
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`font-pixel text-pixel-xs px-4 py-2 border-2 transition-all ${
                  isActive 
                    ? 'border-primary bg-primary text-background' 
                    : 'border-border bg-card text-muted-foreground hover:border-primary hover:text-primary'
                }`}
              >
                <span className="mr-2">{categoryData.icon}</span>
                {categoryData.label}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PixelCard hoverable={false}>
                <SkillBar skill={skill} isVisible={isVisible} />
              </PixelCard>
            </div>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
          {[
            { label: 'Total Skills', value: skillsData.length, icon: '📊' },
            { label: 'Expert Level', value: skillsData.filter(s => s.level >= 90).length, icon: '⭐' },
            { label: 'Tahun Exp.', value: '5+', icon: '📅' },
            { label: 'Projects', value: '50+', icon: '🏆' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="pixel-card p-4 text-center animate-fade-in-up"
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              <span className="text-2xl mb-2 block">{stat.icon}</span>
              <span className="font-pixel text-pixel-lg text-primary block mb-1">{stat.value}</span>
              <span className="font-silkscreen text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

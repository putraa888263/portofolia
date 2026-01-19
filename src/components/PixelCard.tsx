import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PixelCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'glow' | 'accent';
  hoverable?: boolean;
}

const PixelCard = ({ 
  children, 
  className, 
  variant = 'default',
  hoverable = true 
}: PixelCardProps) => {
  const variantClasses = {
    default: 'border-border',
    glow: 'border-primary glow-green',
    accent: 'border-accent glow-cyan',
  };

  return (
    <div
      className={cn(
        'pixel-card p-6',
        hoverable && 'pixel-border-hover cursor-pointer',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
};

export default PixelCard;

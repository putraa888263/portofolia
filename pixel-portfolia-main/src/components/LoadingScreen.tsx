import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('BOOTING SYSTEM');

  const loadingStages = [
    'BOOTING SYSTEM',
    'LOADING ASSETS',
    'INITIALIZING NETWORK',
    'CONNECTING TO SERVER',
    'READY!',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        
        // Update loading text based on progress
        if (newProgress < 25) {
          setLoadingText(loadingStages[0]);
        } else if (newProgress < 50) {
          setLoadingText(loadingStages[1]);
        } else if (newProgress < 75) {
          setLoadingText(loadingStages[2]);
        } else if (newProgress < 95) {
          setLoadingText(loadingStages[3]);
        } else {
          setLoadingText(loadingStages[4]);
        }

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return newProgress;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      {/* Scanline effect */}
      <div className="absolute inset-0 scanlines pointer-events-none" />
      
      {/* CRT Border Effect */}
      <div className="absolute inset-4 border-4 border-primary/30 pointer-events-none" />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center space-y-8 px-4">
        {/* Pixel Art Logo */}
        <div className="relative">
          <div className="text-4xl md:text-6xl font-pixel text-primary text-glow animate-pixel-pulse">
            {'</>'}
          </div>
          {/* Floating pixels */}
          <div className="absolute -top-4 -left-4 w-4 h-4 bg-accent animate-pixel-float" style={{ animationDelay: '0s' }} />
          <div className="absolute -top-2 -right-6 w-3 h-3 bg-secondary animate-pixel-float" style={{ animationDelay: '0.5s' }} />
          <div className="absolute -bottom-4 -left-6 w-2 h-2 bg-primary animate-pixel-float" style={{ animationDelay: '1s' }} />
          <div className="absolute -bottom-2 -right-4 w-4 h-4 bg-accent animate-pixel-float" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <p className="font-pixel text-pixel-sm md:text-pixel-base text-muted-foreground mb-2">
            {loadingText}
          </p>
          <div className="flex items-center gap-1 justify-center">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-2 h-2 bg-primary animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 md:w-80">
          <div className="pixel-progress">
            <div
              className="pixel-progress-bar transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 font-pixel text-pixel-xs text-muted-foreground">
            <span>0%</span>
            <span className="text-primary">{progress}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Bottom Text */}
        <p className="font-silkscreen text-pixel-xs text-muted-foreground/60 mt-8">
          PRESS ANY KEY TO SKIP...
        </p>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-primary/50" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-primary/50" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-primary/50" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-primary/50" />
    </div>
  );
};

export default LoadingScreen;

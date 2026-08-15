import React, { useEffect, useState } from 'react';

interface TopLoadingBarProps {
  isLoading: boolean;
}

export const TopLoadingBar: React.FC<TopLoadingBarProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
      setProgress(25);
      const t1 = setTimeout(() => setProgress(65), 150);
      const t2 = setTimeout(() => setProgress(85), 350);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    } else {
      setProgress(100);
      const t = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isLoading]);

  if (!visible && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[10000] h-1 bg-transparent overflow-hidden pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-emerald-400 to-amber-400 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(59,130,246,0.6)]"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
          transition: progress === 100 ? 'width 0.2s ease-out, opacity 0.3s ease 0.1s' : 'width 0.3s ease-out'
        }}
      />
    </div>
  );
};

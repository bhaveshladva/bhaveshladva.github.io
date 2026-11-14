import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export const LiquidBackground: React.FC = () => {
  const { palette } = useTheme();
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleCounter = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (Math.random() > 0.88) {
        rippleCounter.current += 1;
        const newRipple: Ripple = {
          id: rippleCounter.current,
          x: e.clientX,
          y: e.clientY,
          size: Math.floor(Math.random() * 80) + 120
        };
        setRipples(prev => [...prev.slice(-8), newRipple]);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-1000">
      <div
        className="absolute inset-0 transition-colors duration-1000"
        style={{ backgroundColor: palette.base }}
      />

      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <div className="absolute -top-[20%] -left-[10%] w-[65vw] h-[65vw] max-w-[800px] max-h-[800px] filter blur-[90px] animate-blob-1 transition-all duration-1000">
        <div className={`w-full h-full rounded-full ${palette.blob1}`} />
      </div>

      <div className="absolute top-[35%] -right-[15%] w-[60vw] h-[60vw] max-w-[750px] max-h-[750px] filter blur-[100px] animate-blob-2 transition-all duration-1000">
        <div className={`w-full h-full rounded-full ${palette.blob2}`} />
      </div>

      <div className="absolute -bottom-[20%] left-[20%] w-[70vw] h-[70vw] max-w-[850px] max-h-[850px] filter blur-[110px] animate-blob-3 transition-all duration-1000">
        <div className={`w-full h-full rounded-full ${palette.blob3}`} />
      </div>

      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 ease-out opacity-80"
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          background: palette.cursor
        }}
      />

      {ripples.map(r => (
        <div
          key={r.id}
          className="absolute rounded-full border border-white/20 animate-ping pointer-events-none"
          style={{
            left: `${r.x - r.size / 2}px`,
            top: `${r.y - r.size / 2}px`,
            width: `${r.size}px`,
            height: `${r.size}px`,
            animationDuration: '1.4s'
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30 pointer-events-none" />
    </div>
  );
};

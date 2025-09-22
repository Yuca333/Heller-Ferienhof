
import React, { useState, useEffect } from 'react';

const LivingFieldlines: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => {
    const isReducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
    if (!isReducedMotion) {
      setOffsetY(window.pageYOffset);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fieldlineStyle = 'absolute inset-x-0 bottom-0 w-full h-auto transition-transform duration-300 ease-out';

  return (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-50" aria-hidden="true">
        <svg
            className={`${fieldlineStyle} text-[var(--color-sage)]`}
            style={{ transform: `translateY(${offsetY * 0.15}px)`, animation: 'drift 20s linear infinite alternate' }}
            width="1440" height="320" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-4 170.5C216.5 257.5 642.5 330 916 226C1189.5 122 1383 50.5 1442 27.5V320.5H-4V170.5Z" fill="currentColor" fillOpacity="0.1"/>
            <path d="M1442 27.5C1383 50.5 1189.5 122 916 226C642.5 330 216.5 257.5 -4 170.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
        </svg>
        <svg
            className={`${fieldlineStyle} text-[var(--color-forest)]`}
            style={{ transform: `translateY(${offsetY * 0.1}px)`, animation: 'drift 25s linear infinite alternate-reverse' }}
            width="1440" height="320" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1444 100C1224.5 187 798.5 260 525 156C251.5 52 57 -19.5 -2 5.5V320H1444V100Z" fill="currentColor" fillOpacity="0.08"/>
            <path d="M-2 5.5C57 -19.5 251.5 52 525 156C798.5 260 1224.5 187 1444 100" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        </svg>
        <style>{`
            @keyframes drift {
                from { stroke-dashoffset: 0; }
                to { stroke-dashoffset: 40; }
            }
        `}</style>
    </div>
  );
};

const Hero: React.FC<{ onCTAClick: () => void }> = ({ onCTAClick }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const baseDelay = 200;
  const stagger = 100;

  return (
    <section className="relative min-h-[80vh] md:min-h-[70vh] lg:min-h-[85vh] flex items-center justify-center text-center overflow-hidden">
        <LivingFieldlines />
        <div className="relative z-10 p-5 max-w-3xl mx-auto">
            <h1
                className={`font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-balance transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${baseDelay}ms` }}
            >
                Willkommen auf dem Ferienhof Heller
            </h1>
            <p
                className={`mt-5 text-lg md:text-xl text-[var(--color-forest)]/80 max-w-2xl mx-auto text-balance transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${baseDelay + stagger}ms` }}
            >
                Wir sind ein Familienbetrieb, der einfache, aber gemütliche Zimmer anbietet. Bei uns finden Sie Ruhe und Entspannung, sind aber trotzdem schnell in München oder an der Messe.
            </p>
            <div
                className={`mt-8 flex flex-wrap justify-center gap-x-5 gap-y-3 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${baseDelay + stagger * 2}ms` }}
            >
                <span className="font-medium">Nähe Messe</span>
                <span className="text-[var(--color-sage)]">·</span>
                <span className="font-medium">Parken</span>
                <span className="text-[var(--color-sage)]">·</span>
                <span className="font-medium">WLAN</span>
                <span className="text-[var(--color-sage)]">·</span>
                <span className="font-medium">Ruhige Lage</span>
            </div>
            <div 
                className={`mt-12 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${baseDelay + stagger * 3}ms` }}>
                <button onClick={onCTAClick} className="haptic-button bg-[var(--color-forest)] text-white px-8 py-4 rounded-xl text-lg font-bold shadow-[var(--shadow-deep)]">
                    Verfügbarkeit & Preise prüfen
                </button>
            </div>
        </div>
    </section>
  );
};

export default Hero;

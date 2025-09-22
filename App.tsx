
import React, { useState, useRef, useEffect } from 'react';
import type { QuoteParams } from './types';
import Hero from './components/Hero';
import AIQWidget from './components/AIQWidget';
import { ZimmerSection, PreiseSection, UmgebungSection, AnfahrtSection, RegelnAGBSection, KontaktSection, Footer } from './components/Sections';

// Custom hook for Intersection Observer
const useIntersectionObserver = <T extends HTMLElement,>(options: IntersectionObserverInit) => {
  const containerRef = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (containerRef.current) {
          observer.unobserve(containerRef.current);
        }
      }
    }, options);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(containerRef.current);
      }
    };
  }, [containerRef, options]);

  return [containerRef, isVisible] as const;
};


const App: React.FC = () => {
  const [quoteForInquiry, setQuoteForInquiry] = useState<QuoteParams | null>(null);

  const anfrageRef = useRef<HTMLDivElement>(null);
  const kontaktRef = useRef<HTMLDivElement>(null);

  const handleEnquire = (data: QuoteParams) => {
    setQuoteForInquiry(data);
    setTimeout(() => {
      kontaktRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };
  
  const scrollToAnfrage = () => {
     anfrageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const [headerVisible, setHeaderVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setHeaderVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const sections = [
    { id: 'zimmer', ref: useRef<HTMLElement>(null), Component: ZimmerSection },
    { id: 'preise', ref: useRef<HTMLElement>(null), Component: PreiseSection },
    { id: 'umgebung', ref: useRef<HTMLElement>(null), Component: UmgebungSection },
    { id: 'anfahrt', ref: useRef<HTMLElement>(null), Component: AnfahrtSection },
    { id: 'regeln', ref: useRef<HTMLElement>(null), Component: RegelnAGBSection },
    { id: 'kontakt', ref: kontaktRef, Component: () => <KontaktSection initialData={quoteForInquiry} /> },
  ];
  
  const navLinks = [
    { name: 'Zimmer', ref: sections[0].ref },
    { name: 'Preise', ref: sections[1].ref },
    { name: 'Umgebung', ref: sections[2].ref },
    { name: 'Anfahrt', ref: sections[3].ref },
    { name: 'Kontakt', ref: kontaktRef },
  ];

  const handleNavClick = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="bg-[var(--color-paper)] text-[var(--color-forest)] font-sans antialiased text-[17px] leading-relaxed">
      <header className={`sticky top-0 z-50 transition-all duration-500 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
        <div className="mx-auto max-w-7xl px-[21px] py-[13px]">
           <div className="glass-card flex items-center justify-between rounded-xl px-[21px] py-[8px]">
              <div className="font-display text-xl font-semibold tracking-tight">Ferienhof Heller</div>
              <nav className="hidden md:flex items-center gap-[34px] text-[16px]">
                  {navLinks.map(link => (
                    <button key={link.name} onClick={() => handleNavClick(link.ref)} className="hover:text-[var(--color-gold)] transition-colors duration-200">
                      {link.name}
                    </button>
                  ))}
              </nav>
              <button onClick={scrollToAnfrage} className="haptic-button hidden md:block bg-[var(--color-forest)] text-white px-5 py-2 rounded-lg text-[15px] font-medium">
                  Anfragen
              </button>
           </div>
        </div>
      </header>

      <main>
        <Hero onCTAClick={scrollToAnfrage}/>
        <div ref={anfrageRef} className="py-[34px] md:py-[55px]">
          <AIQWidget onEnquire={handleEnquire} />
        </div>
        
        <div className="space-y-[55px] md:space-y-[89px] overflow-x-clip">
          {sections.map(({ id, ref, Component }) => (
            <section key={id} ref={ref} id={id}>
              <Component />
            </section>
          ))}
        </div>
      </main>
      
      <Footer />

      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[var(--color-paper)] to-transparent z-40">
        <button onClick={scrollToAnfrage} className="haptic-button w-full bg-[var(--color-forest)] text-white py-4 rounded-xl text-lg font-bold shadow-[var(--shadow-deep)]">
          Jetzt unverbindlich anfragen
        </button>
      </div>
    </div>
  );
};


export default App;

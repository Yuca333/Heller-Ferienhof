import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import type { QuoteParams } from './types.ts';
import Hero from './components/Hero.tsx';
import AIQWidget from './components/AIQWidget.tsx';

// Lazy load sections for better initial load performance and a smaller initial bundle size.
const ZimmerSection = lazy(() => import('./components/Sections.tsx').then(module => ({ default: module.ZimmerSection })));
const PreiseSection = lazy(() => import('./components/Sections.tsx').then(module => ({ default: module.PreiseSection })));
const UmgebungSection = lazy(() => import('./components/Sections.tsx').then(module => ({ default: module.UmgebungSection })));
const AnfahrtSection = lazy(() => import('./components/Sections.tsx').then(module => ({ default: module.AnfahrtSection })));
const RegelnAGBSection = lazy(() => import('./components/Sections.tsx').then(module => ({ default: module.RegelnAGBSection })));
const KontaktSection = lazy(() => import('./components/Sections.tsx').then(module => ({ default: module.KontaktSection })));
const Footer = lazy(() => import('./components/Sections.tsx').then(module => ({ default: module.Footer })));

const SectionLoader: React.FC = () => (
    <div className="flex justify-center items-center py-16" aria-live="polite" aria-busy="true">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-forest)]" role="status">
            <span className="sr-only">Inhalt wird geladen...</span>
        </div>
    </div>
);


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
        
        <Suspense fallback={<SectionLoader />}>
          <div className="space-y-[55px] md:space-y-[89px] overflow-x-clip">
            {sections.map(({ id, ref, Component }) => (
              <section key={id} ref={ref} id={id}>
                <Component />
              </section>
            ))}
          </div>
        </Suspense>
      </main>
      
      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[var(--color-paper)] to-transparent z-40">
        <button onClick={scrollToAnfrage} className="haptic-button w-full bg-[var(--color-forest)] text-white py-4 rounded-xl text-lg font-bold shadow-[var(--shadow-deep)]">
          Jetzt unverbindlich anfragen
        </button>
      </div>
    </div>
  );
};


export default App;
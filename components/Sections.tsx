
import React, { useEffect, useRef, useState } from 'react';
import type { QuoteParams } from '../types';

// Custom hook for Intersection Observer animation
const useAnimatedSection = <T extends HTMLElement,>() => {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = Array.from(entry.target.querySelectorAll('.anim-child'));
            children.forEach((child, index) => {
              (child as HTMLElement).style.transitionDelay = `${index * 60}ms`;
              child.classList.add('is-visible');
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, []);
  return ref;
};

const SectionWrapper: React.FC<{ title: string; subtitle: string; children: React.ReactNode; className?: string; }> = ({ title, subtitle, children, className = '' }) => {
  const ref = useAnimatedSection<HTMLDivElement>();
  return (
    <div ref={ref} className={`max-w-7xl mx-auto px-5 ${className}`}>
      <div className="max-w-3xl">
        <h2 className="section-title font-display text-3xl md:text-4xl font-semibold anim-child fade-in-up">{title}</h2>
        <p className="mt-4 text-lg text-[var(--color-forest)]/80 anim-child fade-in-up">{subtitle}</p>
      </div>
      <div className="mt-12 md:mt-16">
        {children}
      </div>
    </div>
  );
};


const PlaceholderImage: React.FC<{ width: number; height: number; className?: string }> = ({ width, height, className }) => (
    <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <p className="mt-2 text-sm font-medium">Ferienhof Heller</p>
            <p className="text-xs">Platzhalter</p>
        </div>
    </div>
);

// --- SECTIONS ---

export const ZimmerSection: React.FC = () => {
    const amenities = [ "Dusche/WC", "Fön", "TV", "WLAN" ];
    return (
        <SectionWrapper title="Unsere Zimmer" subtitle="Einfach, sauber und gemütlich – alles, was Sie für eine erholsame Nacht brauchen.">
            <div className="grid md:grid-cols-2 gap-[34px]">
                <div className="glass-card rounded-2xl overflow-hidden anim-child fade-in-up">
                    <PlaceholderImage width={600} height={400} className="h-64 w-full object-cover" />
                    <div className="p-8">
                        <h3 className="font-display text-2xl font-semibold">Einzelzimmer</h3>
                        <p className="mt-3 text-[var(--color-forest)]/80">Unsere Einzelzimmer sind praktisch eingerichtet und ideal für Geschäftsreisende oder Alleinreisende. Ein gemütliches Bett und ein eigener kleiner Arbeitsbereich sorgen für einen angenehmen Aufenthalt.</p>
                        <div className="mt-6 pt-6 border-t border-[var(--color-forest)]/10 flex flex-wrap gap-x-5 gap-y-2">
                           {amenities.map(item => <span key={item} className="text-sm font-medium">{item}</span>)}
                        </div>
                    </div>
                </div>
                <div className="glass-card rounded-2xl overflow-hidden anim-child fade-in-up">
                     <PlaceholderImage width={600} height={400} className="h-64 w-full object-cover" />
                    <div className="p-8">
                        <h3 className="font-display text-2xl font-semibold">Doppelzimmer</h3>
                        <p className="mt-3 text-[var(--color-forest)]/80">Die Doppelzimmer bieten ausreichend Platz für zwei Personen. Sie sind der perfekte Rückzugsort nach einem langen Tag auf der Messe oder einer Erkundungstour in und um München.</p>
                         <div className="mt-6 pt-6 border-t border-[var(--color-forest)]/10 flex flex-wrap gap-x-5 gap-y-2">
                           {amenities.map(item => <span key={item} className="text-sm font-medium">{item}</span>)}
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};

export const PreiseSection: React.FC = () => {
  const prices = [
    { item: 'Einzelzimmer', price: '54,00 €' },
    { item: 'Doppelzimmer', price: '74,00 €' },
    { item: 'Frühstück pro Person', price: '10,00 €' },
  ];
  return (
    <SectionWrapper title="Preise & Konditionen" subtitle="Transparente und faire Preise für Ihren Aufenthalt. Alle Preise verstehen sich pro Nacht, inklusive der gesetzlichen Mehrwertsteuer.">
        <div className="grid md:grid-cols-3 gap-[21px]">
            <div className="md:col-span-2 glass-card rounded-2xl p-8 anim-child fade-in-up">
              <div className="flow-root">
                <div className="-mx-8">
                    <table className="min-w-full">
                        <tbody className="divide-y divide-[var(--color-forest)]/10">
                            {prices.map(({ item, price }) => (
                                <tr key={item}>
                                    <td className="py-4 px-8 text-base">{item}</td>
                                    <td className="py-4 px-8 text-right text-base font-semibold">{price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[21px]">
                <div className="glass-card rounded-2xl p-6 flex-1 anim-child fade-in-up">
                    <h4 className="font-semibold">Kurzaufenthalt</h4>
                    <p className="mt-2 text-[var(--color-forest)]/80 text-sm">Für einen Aufenthalt von nur einer Nacht berechnen wir einen Aufschlag von 8,00 € pro Person.</p>
                </div>
                <div className="glass-card rounded-2xl p-6 flex-1 anim-child fade-in-up">
                    <h4 className="font-semibold">Messe & Oktoberfest</h4>
                    <p className="mt-2 text-[var(--color-forest)]/80 text-sm">Während Messezeiten und dem Oktoberfest gelten gesonderte Preise. Bitte fragen Sie diese direkt bei uns an.</p>
                </div>
            </div>
        </div>
    </SectionWrapper>
  );
};

export const UmgebungSection: React.FC = () => {
  const locations = [
    { name: 'Forstinning', desc: 'Direkt vor der Haustür. Bietet alles für den täglichen Bedarf.' },
    { name: 'Markt Schwaben', desc: 'Der nächste größere Ort mit S-Bahn-Anschluss und mehr Geschäften.' },
    { name: 'Ebersberg', desc: 'Die Kreisstadt mit dem schönen Ebersberger Forst zum Spazierengehen.' },
    { name: 'München', desc: 'Landeshauptstadt, Messe und unzählige Sehenswürdigkeiten schnell erreichbar.' }
  ];
  return (
    <SectionWrapper title="In der Umgebung" subtitle="Ob Natur, Kultur oder Business – von uns aus erreichen Sie Ihre Ziele schnell und bequem.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[21px]">
            {locations.map((loc, i) => (
                <div key={loc.name} className="glass-card rounded-2xl p-8 anim-child fade-in-up">
                    <h3 className="font-display text-xl font-semibold">{loc.name}</h3>
                    <p className="mt-2 text-[var(--color-forest)]/80">{loc.desc}</p>
                </div>
            ))}
        </div>
    </SectionWrapper>
  );
};

export const AnfahrtSection: React.FC = () => {
    return (
        <SectionWrapper title="Der Weg zu uns" subtitle="So finden Sie einfach und unkompliziert zu unserem Ferienhof in Forstinning-Aitersteinering.">
            <div className="grid md:grid-cols-2 gap-[34px] items-center">
                <div className="anim-child fade-in-up">
                    <h3 className="font-display text-2xl font-semibold">Anfahrt mit dem Auto</h3>
                    <p className="mt-3 text-[var(--color-forest)]/80">Folgen Sie der A94 München-Passau und nehmen Sie die Ausfahrt Forstinning. Fahren Sie durch Forstinning hindurch Richtung Markt Schwaben. Kurz vor dem Ortsausgang von Forstinning biegen Sie rechts ab nach Aitersteinering. Wir sind der zweite Hof auf der linken Seite.</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        {['A99/A94', 'Ausfahrt Forstinning', 'Richtung Markt Schwaben', 'Rechts nach Aitersteinering'].map(step => (
                            <span key={step} className="bg-[var(--color-sage)]/20 text-[var(--color-forest)] text-sm font-medium px-3 py-1.5 rounded-full">{step}</span>
                        ))}
                    </div>
                     <h3 className="font-display text-2xl font-semibold mt-8">Öffentliche Verkehrsmittel</h3>
                    <p className="mt-3 text-[var(--color-forest)]/80">Die nächste S-Bahn-Station (Linie S2) befindet sich in Markt Schwaben. Von dort sind es ca. 5 Minuten mit dem Taxi zu uns. Die Fahrt von Markt Schwaben zum Marienplatz in München dauert etwa 25 Minuten.</p>
                </div>
                <div className="anim-child fade-in-up">
                    <a href="https://www.google.com/maps/place/Ferienhof+Heller,+Aitersteinering+6,+85661+Forstinning,+Germany" target="_blank" rel="noopener noreferrer" className="block rounded-2xl overflow-hidden shadow-[var(--shadow-deep)]">
                       <PlaceholderImage width={800} height={600} className="w-full h-96"/>
                    </a>
                </div>
            </div>
        </SectionWrapper>
    );
};

export const RegelnAGBSection: React.FC = () => {
  return (
    <SectionWrapper title="Gut zu wissen" subtitle="Einige wichtige Informationen, damit Ihr Aufenthalt bei uns reibungslos und angenehm verläuft.">
      <div className="grid lg:grid-cols-3 gap-[34px]">
        <div className="lg:col-span-1 flex flex-col gap-[21px]">
           <div className="glass-card rounded-2xl p-8 anim-child fade-in-up">
              <h3 className="font-display text-xl font-semibold">Hausregeln</h3>
              <ul className="mt-4 space-y-3 text-[var(--color-forest)]/80 list-disc list-inside">
                <li>Keine Haustiere erlaubt</li>
                <li>Wir sind ein Nichtraucherhaus</li>
                <li>Ruhezeiten von 22:00 bis 07:00 Uhr</li>
                <li>Das Hoftor ist nachts geschlossen</li>
              </ul>
           </div>
            <div className="glass-card rounded-2xl p-8 anim-child fade-in-up">
              <h3 className="font-display text-xl font-semibold">Check-in / Check-out</h3>
              <ul className="mt-4 space-y-2 text-[var(--color-forest)]/80">
                <li><span className="font-semibold">Check-in:</span> ab 14:00 Uhr</li>
                <li><span className="font-semibold">Check-out:</span> bis 10:00 Uhr</li>
              </ul>
           </div>
        </div>
        <div className="lg:col-span-2 glass-card rounded-2xl p-8 anim-child fade-in-up">
          <h3 className="font-display text-xl font-semibold">Allgemeine Geschäftsbedingungen (Auszug)</h3>
          <div className="mt-4 space-y-4 text-[var(--color-forest)]/80">
            <p><span className="font-semibold text-[var(--color-forest)]">Anzahlung:</span> Bei Buchung wird eine Anzahlung von 20 % des Gesamtpreises fällig.</p>
            <div>
              <p className="font-semibold text-[var(--color-forest)]">Stornierungsbedingungen:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>bis 30 Tage vor Anreise: kostenfrei</li>
                <li>29 bis 15 Tage vor Anreise: 50 % des Gesamtpreises</li>
                <li>14 bis 1 Tag vor Anreise: 70 % des Gesamtpreises</li>
                <li>Bei Nichtanreise oder vorzeitiger Abreise: 100 % des Gesamtpreises</li>
              </ul>
            </div>
            <p className="text-sm italic">Es gelten die allgemeinen Bestimmungen des deutschen Beherbergungsrechts. Wir empfehlen den Abschluss einer Reiserücktrittsversicherung.</p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};


export const KontaktSection: React.FC<{ initialData: QuoteParams | null }> = ({ initialData }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        ...initialData,
    });
    
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            ...initialData
        }));
    }, [initialData]);

    const ref = useAnimatedSection<HTMLDivElement>();
    
    return (
        <div ref={ref} className="max-w-7xl mx-auto px-5">
             <div className="max-w-3xl">
                <h2 className="section-title font-display text-3xl md:text-4xl font-semibold anim-child fade-in-up">Kontakt & Anfrage</h2>
                <p className="mt-4 text-lg text-[var(--color-forest)]/80 anim-child fade-in-up">Wir freuen uns auf Ihre Nachricht. Füllen Sie einfach das Formular aus, wir melden uns schnellstmöglich bei Ihnen.</p>
            </div>
            <div className="mt-12 md:mt-16 grid lg:grid-cols-3 gap-[34px]">
                <div className="lg:col-span-1 anim-child fade-in-up">
                    <div className="glass-card rounded-2xl p-8 h-full">
                        <h3 className="font-display text-xl font-semibold">Ferienhof Heller</h3>
                        <div className="mt-4 space-y-2 text-[var(--color-forest)]/80">
                            <p>Familie Heller</p>
                            <p>Aitersteinering 6</p>
                            <p>85661 Forstinning</p>
                        </div>
                        <div className="mt-6 pt-6 border-t border-[var(--color-forest)]/10 space-y-2">
                            <p>Tel: 08121 / 1234</p>
                            <p>E-Mail: info@ferienhof-heller.de</p>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2 glass-card rounded-2xl p-8 anim-child fade-in-up">
                    <form className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <input type="text" placeholder="Ihr Name" required className="input-field-form" />
                            <input type="email" placeholder="Ihre E-Mail-Adresse" required className="input-field-form" />
                        </div>
                         <div className="grid sm:grid-cols-2 gap-6">
                            <input type="date" value={formData.checkin || ''} readOnly className="input-field-form bg-gray-100" />
                            <input type="date" value={formData.checkout || ''} readOnly className="input-field-form bg-gray-100" />
                        </div>
                        <textarea placeholder="Ihre Nachricht..." rows={4} className="input-field-form"></textarea>
                        <div className="flex items-start">
                             <input id="datenschutz" type="checkbox" required className="h-5 w-5 mt-0.5 rounded border-gray-300 text-[var(--color-forest)] focus:ring-[var(--color-forest)]/50" />
                            <label htmlFor="datenschutz" className="ml-3 text-sm text-[var(--color-forest)]/80">Ich habe die Datenschutzerklärung zur Kenntnis genommen und stimme zu, dass meine Angaben zur Bearbeitung meiner Anfrage gespeichert werden.</label>
                        </div>
                        <button type="submit" className="haptic-button w-full bg-[var(--color-forest)] text-white py-3.5 rounded-lg text-base font-bold">
                            Anfrage absenden
                        </button>
                    </form>
                </div>
            </div>
            <style>{`.input-field-form { background-color: var(--color-paper); border: 1px solid rgba(45, 80, 22, 0.2); border-radius: 8px; padding: 10px 14px; font-size: 16px; width: 100%; transition: all 0.2s; } .input-field-form:focus { outline: none; border-color: var(--color-forest); box-shadow: 0 0 0 3px rgba(45, 80, 22, 0.1); }`}</style>
        </div>
    );
};


export const Footer: React.FC = () => {
    return (
        <footer className="mt-[55px] md:mt-[89px] py-[34px] border-t border-[var(--color-forest)]/10">
            <div className="max-w-7xl mx-auto px-5 text-center text-sm text-[var(--color-forest)]/60">
                <p>&copy; {new Date().getFullYear()} Ferienhof Heller. Alle Rechte vorbehalten.</p>
                <div className="mt-3 flex justify-center gap-x-5">
                    <a href="#" className="hover:text-[var(--color-forest)]">Impressum</a>
                    <a href="#" className="hover:text-[var(--color-forest)]">Datenschutz</a>
                </div>
            </div>
        </footer>
    );
};

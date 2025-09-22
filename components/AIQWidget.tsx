import React, { useState, useEffect } from 'react';
import type { QuoteParams, PriceResult } from '../types.ts';
import { calculatePrice } from '../utils/priceLogic.ts';

const today = new Date().toISOString().split('T')[0];

const AIQWidget: React.FC<{ onEnquire: (data: QuoteParams) => void }> = ({ onEnquire }) => {
    const [params, setParams] = useState<QuoteParams>({
        checkin: today,
        checkout: '',
        persons: 1,
        roomType: 'EZ',
        breakfast: false,
        isEvent: false,
    });
    const [result, setResult] = useState<PriceResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            const priceResult = calculatePrice(params);
            setResult(priceResult);
            setIsLoading(false);
        }, 500); // Simulate calculation delay
        return () => clearTimeout(timer);
    }, [params]);

    const handleParamChange = <K extends keyof QuoteParams,>(key: K, value: QuoteParams[K]) => {
        const newParams = { ...params, [key]: value };

        if (key === 'persons' && value === 1) {
            newParams.roomType = 'EZ';
        } else if (key === 'persons' && value === 2) {
             newParams.roomType = 'DZ';
        } else if (key === 'roomType' && value === 'EZ') {
             newParams.persons = 1;
        } else if (key === 'roomType' && value === 'DZ' && params.persons < 2) {
             newParams.persons = 2;
        }

        setParams(newParams);
    };
    
    const canSubmit = result?.total !== null || params.isEvent;

    return (
        <div className="max-w-4xl mx-auto px-5">
            <div className="glass-card rounded-2xl p-5 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-end">
                    
                    {/* Inputs */}
                    <div className="lg:col-span-2 grid grid-cols-2 gap-5">
                        <label className="flex flex-col gap-2 font-medium">Anreise
                            <input type="date" value={params.checkin} min={today} onChange={e => handleParamChange('checkin', e.target.value)} className="input-field" />
                        </label>
                        <label className="flex flex-col gap-2 font-medium">Abreise
                            <input type="date" value={params.checkout} min={params.checkin} onChange={e => handleParamChange('checkout', e.target.value)} className="input-field" />
                        </label>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                       <label className="flex flex-col gap-2 font-medium">Personen
                            <select value={params.persons} onChange={e => handleParamChange('persons', parseInt(e.target.value, 10))} className="input-field">
                                <option value="1">1 Person</option>
                                <option value="2">2 Personen</option>
                            </select>
                        </label>
                        <label className="flex flex-col gap-2 font-medium">Zimmer
                            <select value={params.roomType} onChange={e => handleParamChange('roomType', e.target.value as 'EZ' | 'DZ')} className="input-field">
                                <option value="EZ">Einzelzimmer</option>
                                <option value="DZ">Doppelzimmer</option>
                            </select>
                        </label>
                    </div>

                    <div className="flex flex-col justify-end h-full">
                       <div className="grid grid-cols-2 gap-4 items-center h-[46px]">
                         <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={params.breakfast} onChange={e => handleParamChange('breakfast', e.target.checked)} className="h-5 w-5 rounded border-gray-300 text-[var(--color-forest)] focus:ring-[var(--color-forest)]/50" />
                            Frühstück
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm">
                            <input type="checkbox" checked={params.isEvent} onChange={e => handleParamChange('isEvent', e.target.checked)} className="h-5 w-5 rounded border-gray-300 text-[var(--color-forest)] focus:ring-[var(--color-forest)]/50" />
                            Messe
                        </label>
                       </div>
                    </div>
                </div>

                {/* Result & CTA */}
                <div className="mt-8 pt-5 border-t border-[var(--color-forest)]/10 flex flex-col md:flex-row items-center justify-between gap-5">
                    <div className="text-center md:text-left">
                        {isLoading ? (
                            <div className="h-7 w-64 bg-gray-200 rounded animate-pulse"></div>
                        ) : (
                            result && (
                                <p className="text-lg font-semibold tracking-tight text-[var(--color-forest)]">
                                    {result.message}
                                    {result.total && ` für ${result.nights} ${result.nights === 1 ? 'Nacht' : 'Nächte'}`}
                                </p>
                            )
                        )}
                        <p className="text-sm text-[var(--color-forest)]/60 mt-1">Unverbindliche Schätzung</p>
                    </div>
                    <button onClick={() => onEnquire(params)} disabled={!canSubmit} className="haptic-button bg-[var(--color-forest)] text-white px-8 py-3 rounded-lg text-base font-bold w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed">
                        Jetzt unverbindlich anfragen
                    </button>
                </div>
            </div>
            <style>{`
                .input-field {
                    background-color: var(--color-paper);
                    border: 1px solid rgba(45, 80, 22, 0.2);
                    border-radius: 8px;
                    padding: 10px 12px;
                    font-size: 16px;
                    width: 100%;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.02);
                }
                .input-field:focus {
                    outline: none;
                    border-color: var(--color-forest);
                    box-shadow: 0 0 0 3px rgba(45, 80, 22, 0.1);
                }
            `}</style>
        </div>
    );
};

export default AIQWidget;
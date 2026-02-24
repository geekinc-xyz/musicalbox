"use client"

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface XylophoneProps {
  onPlay: (note: string) => void;
  onStop: (note: string) => void;
  activeNotes: Set<string>;
  lang: 'fr' | 'en';
}

const XYLOPHONE_BARS = [
  { note: 'C4', color: 'bg-[#ff4d4d]', height: 'h-[360px]' },
  { note: 'D4', color: 'bg-[#ffa64d]', height: 'h-[340px]' },
  { note: 'E4', color: 'bg-[#ffff4d]', height: 'h-[320px]' },
  { note: 'F4', color: 'bg-[#4dff4d]', height: 'h-[300px]' },
  { note: 'G4', color: 'bg-[#4dffff]', height: 'h-[280px]' },
  { note: 'A4', color: 'bg-[#4d4dff]', height: 'h-[260px]' },
  { note: 'B4', color: 'bg-[#a64dff]', height: 'h-[240px]' },
  { note: 'C5', color: 'bg-[#ff4dff]', height: 'h-[220px]' },
];

export function Xylophone({ onPlay, onStop, activeNotes, lang }: XylophoneProps) {
  const [pressedNote, setPressedNote] = useState<string | null>(null);

  const handlePress = (note: string) => {
    onPlay(note);
    setPressedNote(note);
    // Visual feedback duration
    setTimeout(() => {
      setPressedNote(null);
      onStop(note);
    }, 150);
  };

  const handleMouseEnter = (e: React.MouseEvent, note: string) => {
    if (e.buttons === 1) {
      handlePress(note);
    }
  };

  const instruction = lang === 'fr' 
    ? "GLISSEZ SUR LES LAMES OU UTILISEZ LES TOUCHES (A-K)" 
    : "SLIDE ACROSS THE BARS OR USE KEYS (A-K)";

  return (
    <div className="flex flex-col items-center gap-12 py-14 w-full max-w-6xl mx-auto select-none">
      <div className="relative flex items-center justify-center p-10 md:p-14 bg-[#5d3a2f] rounded-[3.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.9)] border-b-[12px] border-[#3a241d] transition-all overflow-hidden ring-1 ring-white/10">
        
        <div className="absolute top-[28%] left-0 right-0 h-4 bg-[#3a241d]/50 shadow-inner" />
        <div className="absolute bottom-[28%] left-0 right-0 h-4 bg-[#3a241d]/50 shadow-inner" />

        <div className="flex items-end gap-3 md:gap-4 lg:gap-6 relative z-10 h-[400px]">
          {XYLOPHONE_BARS.map((bar) => {
            const isActive = pressedNote === bar.note || activeNotes.has(bar.note);
            return (
              <button
                key={bar.note}
                onMouseDown={(e) => { e.preventDefault(); handlePress(bar.note); }}
                onMouseEnter={(e) => handleMouseEnter(e, bar.note)}
                className={cn(
                  "relative flex flex-col items-center rounded-2xl transition-all duration-75 group transform origin-bottom outline-none",
                  bar.color,
                  bar.height,
                  "w-12 sm:w-16 md:w-20 lg:w-24",
                  "shadow-[inset_4px_4px_10px_rgba(255,255,255,0.4),inset_-4px_-10px_12px_rgba(0,0,0,0.4),10px_20px_40px_rgba(0,0,0,0.7)]",
                  "hover:brightness-110 active:scale-[0.92] active:translate-y-3",
                  isActive && "scale-[0.94] translate-y-4 brightness-125 shadow-inner"
                )}
              >
                <div className="absolute top-12 w-4 h-4 rounded-full bg-neutral-200 shadow-lg border border-neutral-600/40 flex items-center justify-center">
                  <div className="w-1 h-1 bg-neutral-600/50 rounded-full" />
                </div>

                <div className="absolute bottom-12 w-4 h-4 rounded-full bg-neutral-200 shadow-lg border border-neutral-600/40 flex items-center justify-center">
                   <div className="w-1 h-1 bg-neutral-600/50 rounded-full" />
                </div>
                
                <div className="mt-auto mb-20 select-none">
                   <span className="text-white font-black text-2xl md:text-4xl tracking-tighter drop-shadow-[0_3px_6px_rgba(0,0,0,0.6)] opacity-90 group-hover:opacity-100 transition-opacity">
                    {bar.note.replace('4', '').replace('5', '')}
                   </span>
                </div>

                <div className={cn(
                  "absolute inset-0 bg-white/25 opacity-0 transition-opacity duration-200 pointer-events-none rounded-2xl",
                  isActive && "opacity-100"
                )} />
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-4">
        <p className="text-[12px] font-black uppercase tracking-[0.5em] text-muted-foreground/60 text-center animate-pulse">
          {instruction}
        </p>
        <div className="flex gap-3">
          {XYLOPHONE_BARS.map(b => (
            <div key={b.note} className={cn("w-4 h-4 rounded-full opacity-40 shadow-sm", b.color)} />
          ))}
        </div>
      </div>
    </div>
  );
}

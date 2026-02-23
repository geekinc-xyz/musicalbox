
"use client"

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface XylophoneProps {
  onPlay: (note: string) => void;
  onStop: (note: string) => void;
  activeNotes: Set<string>;
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

export function Xylophone({ onPlay, onStop, activeNotes }: XylophoneProps) {
  const [pressedNote, setPressedNote] = useState<string | null>(null);

  const handlePress = (note: string) => {
    onPlay(note);
    setPressedNote(note);
    // Visual feedback duration matches the percussive nature of the xylophone
    setTimeout(() => {
      setPressedNote(null);
      onStop(note);
    }, 200);
  };

  return (
    <div className="flex flex-col items-center gap-12 py-14 w-full max-w-6xl mx-auto">
      {/* Wooden Resonance Frame */}
      <div className="relative flex items-center justify-center p-10 md:p-14 bg-[#4a2f26] rounded-[3rem] shadow-[0_30px_70px_-10px_rgba(0,0,0,0.9)] border-b-8 border-[#2e1c17] transition-all overflow-hidden">
        
        {/* Support Rails (Internal View) */}
        <div className="absolute top-[25%] left-0 right-0 h-3 bg-[#2e1c17]/60 shadow-inner" />
        <div className="absolute bottom-[25%] left-0 right-0 h-3 bg-[#2e1c17]/60 shadow-inner" />

        <div className="flex items-end gap-3 md:gap-5 lg:gap-7 relative z-10 h-[400px]">
          {XYLOPHONE_BARS.map((bar) => {
            const isActive = pressedNote === bar.note || activeNotes.has(bar.note);
            return (
              <button
                key={bar.note}
                onMouseDown={() => handlePress(bar.note)}
                className={cn(
                  "relative flex flex-col items-center rounded-2xl transition-all duration-75 group transform origin-bottom",
                  bar.color,
                  bar.height,
                  "w-12 sm:w-16 md:w-20 lg:w-24",
                  "shadow-[inset_4px_4px_8px_rgba(255,255,255,0.4),inset_-4px_-10px_10px_rgba(0,0,0,0.4),8px_15px_30px_rgba(0,0,0,0.6)]",
                  "hover:brightness-110 active:scale-[0.94] active:translate-y-2",
                  isActive && "scale-[0.95] translate-y-3 brightness-125 shadow-inner"
                )}
              >
                {/* Mounting Bolts (Upper) */}
                <div className="absolute top-10 w-4 h-4 rounded-full bg-neutral-300 shadow-lg border border-neutral-500/30 flex items-center justify-center">
                  <div className="w-1 h-1 bg-neutral-500/50 rounded-full" />
                </div>

                {/* Mounting Bolts (Lower) */}
                <div className="absolute bottom-10 w-4 h-4 rounded-full bg-neutral-300 shadow-lg border border-neutral-500/30 flex items-center justify-center">
                   <div className="w-1 h-1 bg-neutral-500/50 rounded-full" />
                </div>
                
                {/* Embossed Note Label */}
                <div className="mt-auto mb-16 select-none">
                   <span className="text-white font-black text-xl md:text-3xl tracking-tighter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] opacity-80 group-hover:opacity-100 transition-opacity">
                    {bar.note.replace('4', '').replace('5', '')}
                   </span>
                </div>

                {/* Dynamic Glow Line */}
                <div className={cn(
                  "absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 pointer-events-none rounded-2xl",
                  isActive && "opacity-100"
                )} />
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-4">
        <p className="text-[12px] font-black uppercase tracking-[0.5em] text-muted-foreground/50 text-center animate-pulse">
          USE MOUSE OR KEYBOARD (A-K) TO PLAY
        </p>
        <div className="flex gap-2">
          {XYLOPHONE_BARS.map(b => (
            <div key={b.note} className={cn("w-3 h-3 rounded-full opacity-30", b.color)} />
          ))}
        </div>
      </div>
    </div>
  );
}

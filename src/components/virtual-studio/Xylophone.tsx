
"use client"

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface XylophoneProps {
  onPlay: (note: string) => void;
  onStop: (note: string) => void;
  activeNotes: Set<string>;
}

const XYLOPHONE_BARS = [
  { note: 'C4', color: 'bg-[#ff4d4d]', height: 'h-[320px]' },
  { note: 'D4', color: 'bg-[#ffa64d]', height: 'h-[300px]' },
  { note: 'E4', color: 'bg-[#ffff4d]', height: 'h-[280px]' },
  { note: 'F4', color: 'bg-[#4dff4d]', height: 'h-[260px]' },
  { note: 'G4', color: 'bg-[#4dffff]', height: 'h-[240px]' },
  { note: 'A4', color: 'bg-[#4d4dff]', height: 'h-[220px]' },
  { note: 'B4', color: 'bg-[#a64dff]', height: 'h-[200px]' },
  { note: 'C5', color: 'bg-[#ff4dff]', height: 'h-[180px]' },
];

export function Xylophone({ onPlay, onStop, activeNotes }: XylophoneProps) {
  const [pressedNote, setPressedNote] = useState<string | null>(null);

  const handlePress = (note: string) => {
    onPlay(note);
    setPressedNote(note);
    setTimeout(() => {
      setPressedNote(null);
      onStop(note);
    }, 150);
  };

  return (
    <div className="flex flex-col items-center gap-8 py-10 w-full max-w-5xl mx-auto">
      {/* Wooden Frame */}
      <div className="relative flex items-center justify-center p-8 bg-[#5d4037] rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] border-4 border-[#3e2723]">
        
        {/* Support Rails */}
        <div className="absolute top-[20%] left-0 right-0 h-4 bg-[#3e2723]/40" />
        <div className="absolute bottom-[20%] left-0 right-0 h-4 bg-[#3e2723]/40" />

        <div className="flex items-center gap-2 md:gap-4 relative z-10">
          {XYLOPHONE_BARS.map((bar) => {
            const isActive = pressedNote === bar.note || activeNotes.has(bar.note);
            return (
              <button
                key={bar.note}
                onMouseDown={() => handlePress(bar.note)}
                className={cn(
                  "relative flex flex-col items-center rounded-xl transition-all duration-75 group",
                  bar.color,
                  bar.height,
                  "w-10 sm:w-16 md:w-20 lg:w-24",
                  "shadow-[inset_-4px_-10px_10px_rgba(0,0,0,0.3),4px_10px_20px_rgba(0,0,0,0.5)]",
                  "hover:brightness-110 active:scale-[0.96]",
                  isActive && "scale-[0.96] brightness-125 shadow-inner"
                )}
              >
                {/* Silver Bolts */}
                <div className="absolute top-8 w-3 h-3 rounded-full bg-neutral-300 shadow-sm border border-neutral-400" />
                <div className="absolute bottom-8 w-3 h-3 rounded-full bg-neutral-300 shadow-sm border border-neutral-400" />
                
                {/* Note Label */}
                <div className="mt-auto mb-10 px-3 py-1 bg-black/20 rounded-full">
                   <span className="text-white font-black text-xs md:text-lg tracking-tighter drop-shadow-md">
                    {bar.note.replace('4', '').replace('5', '2')}
                   </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 text-center">
        CLICK OR USE KEYBOARD (A-K) TO PLAY
      </p>
    </div>
  );
}

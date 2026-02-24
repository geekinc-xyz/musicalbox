"use client"

import { PIANO_KEYS } from "@/lib/instruments"
import { cn } from "@/lib/utils"

interface KeyboardProps {
  onPlay: (note: string) => void;
  onStop: (note: string) => void;
  activeNotes: Set<string>;
  accentColor: string;
  labelMode?: 'solfege' | 'alpha' | 'numeric';
}

export function Keyboard({ onPlay, onStop, activeNotes, accentColor, labelMode = 'alpha' }: KeyboardProps) {
  const handleMouseEnter = (e: React.MouseEvent, note: string) => {
    // Check if left mouse button is pressed (1)
    if (e.buttons === 1) {
      onPlay(note);
    }
  };

  return (
    <div className="relative w-full overflow-x-auto keyboard-container py-12 px-4 flex justify-center select-none">
      <div className="flex h-[320px] bg-neutral-900 p-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 relative">
        {PIANO_KEYS.map((key) => {
          const isActive = activeNotes.has(key.note);
          // @ts-ignore
          const currentLabel = key[labelMode] || key.label;
          
          return (
            <div
              key={key.note}
              onMouseDown={(e) => { e.preventDefault(); onPlay(key.note); }}
              onMouseEnter={(e) => handleMouseEnter(e, key.note)}
              onMouseUp={() => onStop(key.note)}
              onMouseLeave={() => onStop(key.note)}
              onTouchStart={(e) => { e.preventDefault(); onPlay(key.note); }}
              onTouchEnd={(e) => { e.preventDefault(); onStop(key.note); }}
              className={cn(
                "relative transition-all duration-75 cursor-pointer flex items-end justify-center pb-6 select-none group",
                key.isBlack 
                  ? "w-9 h-[190px] bg-gradient-to-b from-neutral-800 to-black z-20 -mx-[18px] rounded-b-md border-x border-b border-white/10 shadow-lg"
                  : "w-14 h-full bg-gradient-to-b from-neutral-100 to-white z-10 rounded-b-lg border-x border-neutral-300 shadow-sm first:rounded-l-lg last:rounded-r-lg",
                isActive && "scale-[0.98] brightness-110"
              )}
              style={isActive ? { 
                backgroundColor: key.isBlack ? undefined : accentColor,
                backgroundImage: key.isBlack ? `linear-gradient(to bottom, ${accentColor}, #000)` : 'none',
                boxShadow: key.isBlack 
                  ? `0 10px 20px ${accentColor}60, inset 0 0 10px rgba(255,255,255,0.2)` 
                  : `0 15px 30px ${accentColor}40, inset 0 -5px 15px rgba(0,0,0,0.1)`,
                borderColor: accentColor
              } : {}}
            >
              <div className={cn(
                "w-full h-1 absolute top-0 left-0 transition-opacity",
                isActive ? "opacity-100" : "opacity-0"
              )} style={{ backgroundColor: accentColor }} />
              
              <span className={cn(
                "text-[10px] font-bold tracking-tighter transition-colors pointer-events-none text-center px-1",
                key.isBlack ? "text-neutral-500" : "text-neutral-400 group-hover:text-neutral-600",
                isActive && "text-white"
              )}>
                {currentLabel}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  )
}
"use client"

import { DRUM_PADS } from "@/lib/instruments"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface DrumPadsProps {
  onPlay: (note: string) => void;
}

export function DrumPads({ onPlay }: DrumPadsProps) {
  const [activePad, setActivePad] = useState<string | null>(null);

  const handlePadHit = (padId: string, note: string) => {
    onPlay(note);
    setActivePad(padId);
    setTimeout(() => setActivePad(null), 150);
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-8 max-w-4xl mx-auto">
      {DRUM_PADS.map((pad) => (
        <button
          key={pad.id}
          onMouseDown={() => handlePadHit(pad.id, pad.note)}
          className={cn(
            "aspect-square rounded-3xl border-t border-white/20 flex flex-col items-center justify-center gap-4 transition-all duration-100 relative overflow-hidden shadow-2xl",
            "bg-gradient-to-br from-neutral-800 to-neutral-950",
            "hover:from-neutral-700 hover:to-neutral-900",
            activePad === pad.id && "scale-95 brightness-125"
          )}
        >
          {/* Internal Glow */}
          <div className={cn(
            "absolute inset-0 opacity-20 transition-opacity duration-300 pointer-events-none",
            pad.color.replace('bg-', 'bg-'),
            activePad === pad.id ? "opacity-60" : "opacity-10"
          )} />

          <div className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center border-4 border-black/40 shadow-inner transition-all",
            activePad === pad.id ? "bg-white/20 scale-110" : "bg-neutral-900/50"
          )}>
            <div className={cn(
              "w-12 h-12 rounded-full shadow-lg transition-transform",
              pad.color,
              activePad === pad.id && "scale-125 shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            )} />
          </div>

          <div className="flex flex-col items-center gap-1 z-10">
            <span className="text-white font-black tracking-widest uppercase text-[10px] drop-shadow-md">
              {pad.name}
            </span>
            <div className="h-1 w-8 rounded-full bg-white/10 overflow-hidden">
               <div className={cn(
                 "h-full w-full transition-all duration-300",
                 pad.color,
                 activePad === pad.id ? "translate-x-0" : "-translate-x-full"
               )} />
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

"use client"

import { INSTRUMENTS, Instrument } from "@/lib/instruments"
import { cn } from "@/lib/utils"
import { ChevronRight, Music, Layers } from "lucide-react"

interface InstrumentSelectorProps {
  selectedId: string;
  onSelect: (instrument: Instrument) => void;
}

export function InstrumentSelector({ selectedId, onSelect }: InstrumentSelectorProps) {
  // Group by category
  const categories = Array.from(new Set(INSTRUMENTS.map(i => i.category)));

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-primary" />
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">Instrument Rack</h3>
        </div>
        <div className="px-2 py-0.5 rounded-full bg-primary/10 text-[9px] font-bold text-primary border border-primary/20">
          PRO
        </div>
      </div>

      <div className="space-y-6">
        {categories.map(category => (
          <div key={category} className="space-y-2">
            <h4 className="px-2 text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">{category}</h4>
            <div className="grid gap-1">
              {INSTRUMENTS.filter(i => i.category === category).map((inst) => {
                const Icon = inst.icon;
                const isActive = selectedId === inst.id;
                return (
                  <button
                    key={inst.id}
                    onClick={() => onSelect(inst)}
                    className={cn(
                      "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 overflow-hidden",
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                        : "hover:bg-accent/5 text-muted-foreground hover:text-foreground border border-transparent hover:border-accent/10"
                    )}
                  >
                    <div className={cn(
                      "p-2 rounded-lg transition-all duration-300",
                      isActive ? "bg-white/20 scale-110" : "bg-neutral-800/50 group-hover:bg-neutral-800"
                    )}>
                      <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-muted-foreground")} />
                    </div>
                    
                    <div className="flex flex-col items-start flex-1 min-w-0">
                      <span className="text-sm font-bold truncate w-full">{inst.name}</span>
                    </div>

                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    )}
                    
                    <ChevronRight className={cn(
                      "w-4 h-4 transition-all duration-300",
                      isActive ? "translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                    )} />
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MetronomeProps {
  onTick?: (isHigh: boolean) => void;
}

export function Metronome({ onTick }: MetronomeProps) {
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [beat, setBeat] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      const interval = (60 / bpm) * 1000;
      timerRef.current = setInterval(() => {
        setBeat((prev) => {
          const nextBeat = (prev + 1) % 4;
          if (onTick) onTick(nextBeat === 0);
          return nextBeat;
        });
      }, interval);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setBeat(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, bpm, onTick]);

  const adjustBpm = (val: number) => {
    setBpm(prev => {
      const next = prev + val;
      return Math.min(240, Math.max(40, next));
    });
  }

  return (
    <div className="flex items-center gap-5 bg-muted/20 backdrop-blur-md p-5 rounded-[2rem] border border-border/40 shadow-xl">
      <div className="flex flex-col items-end min-w-[70px]">
        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest opacity-60">TEMPO</span>
        <div className="flex items-center gap-2">
          <span className="text-3xl font-black font-mono tracking-tighter tabular-nums leading-none">{Math.round(bpm)}</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-1.5">
        <button 
          onClick={() => adjustBpm(1)}
          className="p-1 hover:bg-muted/50 rounded-lg transition-colors border border-transparent hover:border-border/40"
        >
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        </button>
        <button 
          onClick={() => adjustBpm(-1)}
          className="p-1 hover:bg-muted/50 rounded-lg transition-colors border border-transparent hover:border-border/40"
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="w-px h-10 bg-border/40 mx-2" />

      <div className="flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div 
            key={i} 
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-100 shadow-sm",
              beat === i && isPlaying 
                ? (i === 0 ? "bg-accent scale-150 shadow-[0_0_12px_#4F55EE]" : "bg-primary scale-125 shadow-[0_0_8px_#6A0DAD]")
                : "bg-muted/40"
            )}
          />
        ))}
      </div>

      <Button 
        size="icon" 
        variant="ghost" 
        onClick={() => setIsPlaying(!isPlaying)}
        className={cn(
          "h-12 w-12 rounded-2xl transition-all duration-300 ml-1",
          isPlaying ? "text-accent bg-accent/10 hover:bg-accent/20 ring-1 ring-accent/30" : "text-muted-foreground hover:bg-muted/50 bg-muted/10"
        )}
      >
        {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
      </Button>
    </div>
  );
}

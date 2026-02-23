"use client"

import { Label } from "@/components/ui/label"
import { Speaker, Waves, Palette, Settings2, Sliders } from "lucide-react"
import { Slider as ShadSlider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ControlPanelProps {
  volume: number;
  onVolumeChange: (val: number) => void;
  reverb: number;
  onReverbChange: (val: number) => void;
  keyColor: string;
  onKeyColorChange: (color: string) => void;
}

export function ControlPanel({ 
  volume, 
  onVolumeChange, 
  reverb, 
  onReverbChange,
  keyColor,
  onKeyColorChange
}: ControlPanelProps) {
  const colors = [
    { name: 'Classic Blue', value: '#4F55EE' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Rose', value: '#f43f5e' },
    { name: 'Violet', value: '#8b5cf6' },
    { name: 'Amber', value: '#f59e0b' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Neon', value: '#a3ff00' },
    { name: 'Lava', value: '#ff4d00' },
    { name: 'Ghost', value: '#ffffff' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-neutral-900/50 backdrop-blur-xl rounded-[2rem] border border-white/5 shadow-2xl">
      <div className="flex items-center gap-5 p-4 rounded-2xl bg-black/20 border border-white/5">
        <div className="p-3 rounded-xl bg-accent/20 text-accent ring-1 ring-accent/30">
          <Speaker className="w-5 h-5" />
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Master Volume</Label>
            <span className="text-[10px] font-mono bg-accent/10 px-2 py-0.5 rounded text-accent">
              {Math.round(((volume + 60) / 60) * 100)}%
            </span>
          </div>
          <ShadSlider 
            value={[volume]} 
            min={-60} 
            max={0} 
            step={1} 
            onValueChange={(val) => onVolumeChange(val[0])}
            className="cursor-pointer"
          />
        </div>
      </div>

      <div className="flex items-center gap-5 p-4 rounded-2xl bg-black/20 border border-white/5">
        <div className="p-3 rounded-xl bg-primary/20 text-primary ring-1 ring-primary/30">
          <Waves className="w-5 h-5" />
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Studio Reverb</Label>
            <span className="text-[10px] font-mono bg-primary/10 px-2 py-0.5 rounded text-primary">
              {Math.round(reverb * 100)}%
            </span>
          </div>
          <ShadSlider 
            value={[reverb]} 
            min={0} 
            max={1} 
            step={0.01} 
            onValueChange={(val) => onReverbChange(val[0])}
            className="cursor-pointer"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-black/20 border border-white/5">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Visual Style</span>
          <span className="text-xs font-bold text-white">Interface Customization</span>
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-12 w-12 rounded-xl border-white/10 bg-neutral-800 hover:bg-neutral-700 p-0">
              <div className="w-6 h-6 rounded-md shadow-inner" style={{ backgroundColor: keyColor }} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-4 bg-neutral-900 border-white/10 shadow-3xl rounded-2xl" side="top" align="end">
            <div className="flex items-center gap-2 mb-4 px-1">
              <Palette className="w-4 h-4 text-accent" />
              <h4 className="text-xs font-black uppercase tracking-widest">Select Key Accent</h4>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {colors.map((c) => (
                <button
                  key={c.value}
                  onClick={() => onKeyColorChange(c.value)}
                  className={cn(
                    "group relative w-full h-12 rounded-xl transition-all duration-300 border-2 overflow-hidden",
                    keyColor === c.value ? "border-white scale-105 shadow-lg" : "border-transparent hover:scale-105"
                  )}
                  style={{ backgroundColor: c.value }}
                  title={c.name}
                >
                  {keyColor === c.value && (
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

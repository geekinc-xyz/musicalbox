"use client"

import { Label } from "@/components/ui/label"
import { Speaker, Waves, Palette, Type, Paintbrush } from "lucide-react"
import { Slider as ShadSlider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface ControlPanelProps {
  volume: number;
  onVolumeChange: (val: number) => void;
  reverb: number;
  onReverbChange: (val: number) => void;
  keyColor: string;
  onKeyColorChange: (color: string) => void;
  xyloLabelMode: 'solfege' | 'alpha' | 'numeric';
  onXyloLabelModeChange: (mode: 'solfege' | 'alpha' | 'numeric') => void;
  xyloColorMode: 'rainbow' | 'monochrome';
  onXyloColorModeChange: (mode: 'rainbow' | 'monochrome') => void;
  lang: 'fr' | 'en';
}

export function ControlPanel({ 
  volume, 
  onVolumeChange, 
  reverb, 
  onReverbChange,
  keyColor,
  onKeyColorChange,
  xyloLabelMode,
  onXyloLabelModeChange,
  xyloColorMode,
  onXyloColorModeChange,
  lang
}: ControlPanelProps) {
  const t = {
    fr: {
      volume: "Volume Master",
      reverb: "Réverbération Studio",
      visual: "Style Visuel",
      custom: "Personnalisation Interface",
      select: "Choisir un accent",
      labels: "Étiquettes des notes",
      colors: "Mode Couleurs Global",
      modes: {
        solfege: "Do-Ré-Mi",
        alpha: "A-B-C",
        numeric: "1-2-3",
        rainbow: "Arc-en-ciel",
        monochrome: "Monochrome"
      }
    },
    en: {
      volume: "Master Volume",
      reverb: "Studio Reverb",
      visual: "Visual Style",
      custom: "Interface Customization",
      select: "Select Key Accent",
      labels: "Note Labels",
      colors: "Global Color Mode",
      modes: {
        solfege: "Do-Re-Mi",
        alpha: "A-B-C",
        numeric: "1-2-3",
        rainbow: "Rainbow",
        monochrome: "Monochrome"
      }
    }
  }[lang];

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-white/70 dark:bg-neutral-900/50 backdrop-blur-xl rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-2xl transition-colors duration-500">
      <div className="flex items-center gap-5 p-4 rounded-3xl bg-neutral-100/50 dark:bg-black/20 border border-black/5 dark:border-white/5 transition-colors">
        <div className="p-3 rounded-2xl bg-accent/10 dark:bg-accent/20 text-accent ring-1 ring-accent/20">
          <Speaker className="w-5 h-5" />
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-muted-foreground">{t.volume}</Label>
            <span className="text-[10px] font-black bg-accent/10 px-2 py-0.5 rounded-lg text-accent">
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

      <div className="flex items-center gap-5 p-4 rounded-3xl bg-neutral-100/50 dark:bg-black/20 border border-black/5 dark:border-white/5 transition-colors">
        <div className="p-3 rounded-2xl bg-primary/10 dark:bg-primary/20 text-primary ring-1 ring-primary/20">
          <Waves className="w-5 h-5" />
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-muted-foreground">{t.reverb}</Label>
            <span className="text-[10px] font-black bg-primary/10 px-2 py-0.5 rounded-lg text-primary">
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

      <div className="flex items-center justify-between gap-4 p-4 rounded-3xl bg-neutral-100/50 dark:bg-black/20 border border-black/5 dark:border-white/5 transition-colors">
        <div className="flex flex-col gap-1 pl-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-muted-foreground">{t.visual}</span>
          <span className="text-xs font-black text-neutral-900 dark:text-white uppercase tracking-tighter">{t.custom}</span>
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-12 w-12 rounded-2xl border-black/10 dark:border-white/10 bg-white dark:bg-neutral-800 hover:scale-105 transition-transform p-0 shadow-lg">
              <div className="w-6 h-6 rounded-lg shadow-inner" style={{ backgroundColor: keyColor }} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-6 bg-white dark:bg-neutral-900 border-black/5 dark:border-white/10 shadow-3xl rounded-[2rem] backdrop-blur-xl space-y-6" side="top" align="end">
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-1">
                <Palette className="w-4 h-4 text-accent" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">{t.select}</h4>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {colors.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => onKeyColorChange(c.value)}
                    className={cn(
                      "group relative w-full h-10 rounded-xl transition-all duration-300 border-2 overflow-hidden",
                      keyColor === c.value 
                        ? "border-accent scale-105" 
                        : "border-transparent opacity-60 hover:opacity-100"
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
            </div>

            <div className="space-y-4 pt-2 border-t border-border/20">
              <div className="flex items-center gap-2 px-1">
                <Type className="w-4 h-4 text-primary" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">{t.labels}</h4>
              </div>
              <Select value={xyloLabelMode} onValueChange={(val: any) => onXyloLabelModeChange(val)}>
                <SelectTrigger className="rounded-xl h-10 text-xs font-bold uppercase tracking-widest">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="solfege">{t.modes.solfege}</SelectItem>
                  <SelectItem value="alpha">{t.modes.alpha}</SelectItem>
                  <SelectItem value="numeric">{t.modes.numeric}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4 pt-2 border-t border-border/20">
              <div className="flex items-center gap-2 px-1">
                <Paintbrush className="w-4 h-4 text-emerald-500" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">{t.colors}</h4>
              </div>
              <Tabs value={xyloColorMode} onValueChange={(val: any) => onXyloColorModeChange(val)}>
                <TabsList className="grid grid-cols-2 rounded-xl h-10">
                  <TabsTrigger value="rainbow" className="text-[10px] font-black uppercase tracking-tighter">{t.modes.rainbow}</TabsTrigger>
                  <TabsTrigger value="monochrome" className="text-[10px] font-black uppercase tracking-tighter">{t.modes.monochrome}</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
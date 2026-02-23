
"use client"

import { useState, useEffect } from 'react';
import { useAudioEngine } from '@/hooks/use-audio-engine';
import { useKeyboardControls } from '@/hooks/use-keyboard-controls';
import { InstrumentSelector } from '@/components/virtual-studio/InstrumentSelector';
import { ControlPanel } from '@/components/virtual-studio/ControlPanel';
import { Keyboard } from '@/components/virtual-studio/Keyboard';
import { Xylophone } from '@/components/virtual-studio/Xylophone';
import { DrumPads } from '@/components/virtual-studio/DrumPads';
import { Visualizer } from '@/components/virtual-studio/Visualizer';
import { Metronome } from '@/components/virtual-studio/Metronome';
import { INSTRUMENTS, Instrument } from '@/lib/instruments';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  Music, 
  Mic2, 
  Save, 
  Share2, 
  Info, 
  Headphones, 
  Settings,
  Activity,
  Zap,
  Volume2,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Home() {
  const { 
    isLoaded,
    isInitializing,
    initAudio, 
    loadInstrument,
    playNote, 
    stopNote, 
    playTick,
    volume, 
    setVolume, 
    reverbMix, 
    setReverbMix,
    activeNotes,
    analyzer
  } = useAudioEngine();

  const [selectedInstrument, setSelectedInstrument] = useState<Instrument>(INSTRUMENTS[0]);
  const [accentColor, setAccentColor] = useState('#4F55EE');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [telemetry, setTelemetry] = useState({ left: 0, right: 0 });

  useKeyboardControls({
    onPlay: (note) => playNote(note, 'melodic'),
    onStop: (note) => stopNote(note, 'melodic'),
    enabled: isLoaded && selectedInstrument.type === 'melodic'
  });

  useEffect(() => {
    if (isLoaded) {
      loadInstrument(selectedInstrument);
    }
  }, [selectedInstrument, isLoaded, loadInstrument]);

  useEffect(() => {
    if (activeNotes.size > 0) {
      const interval = setInterval(() => {
        setTelemetry({
          left: 45 + Math.random() * 35,
          right: 45 + Math.random() * 35
        });
      }, 100);
      return () => clearInterval(interval);
    } else {
      setTelemetry({ left: 0, right: 0 });
    }
  }, [activeNotes.size]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const peakHeadroom = (volume + 60) * 1.6;

  return (
    <div className={cn("flex-1 flex flex-col h-screen overflow-hidden transition-colors duration-500 font-body", theme === 'dark' ? 'bg-[#1A161C] text-white' : 'bg-white text-black')}>
      {theme === 'dark' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#1A161C] to-transparent" />
        </div>
      )}

      <header className="h-20 border-b border-border/40 px-6 flex items-center justify-between bg-background/60 backdrop-blur-xl z-[60]">
        <div className="flex items-center gap-5">
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-12 h-12 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center text-primary shadow-2xl">
              <Music className="w-6 h-6" />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-black tracking-[0.2em] uppercase leading-none font-headline">MusicalBox</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">VIRTUAL STUDIO 2.0</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-xl">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="rounded-xl"><Settings className="w-5 h-5" /></Button>
          </div>
          <Button variant="outline" className="hidden md:flex gap-2 rounded-2xl text-[10px] font-black px-6 h-11"><Save className="w-4 h-4" /> Save</Button>
          <Button className="gap-2 bg-accent hover:bg-accent/90 rounded-2xl text-[10px] font-black px-7 h-11"><Share2 className="w-4 h-4" /> Export</Button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <aside className="w-[320px] border-r border-border/40 bg-background/40 backdrop-blur-md hidden xl:block z-50">
          <ScrollArea className="h-full px-6 py-10">
            <InstrumentSelector selectedId={selectedInstrument.id} onSelect={setSelectedInstrument} />
          </ScrollArea>
        </aside>

        <div className="flex-1 relative flex flex-col z-10">
          {!isLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-3xl z-[100]">
              <div className="text-center space-y-10 max-w-md p-10">
                <Music className="w-16 h-16 text-primary mx-auto animate-bounce" />
                <h2 className="text-4xl font-black uppercase tracking-tighter">MusicalBox Studio</h2>
                <Button 
                  size="lg" 
                  disabled={isInitializing}
                  className="w-full bg-accent hover:bg-accent/90 h-20 rounded-[1.5rem] text-xl font-black uppercase tracking-widest"
                  onClick={initAudio}
                >
                  {isInitializing ? "LOADING..." : "ENTER STUDIO"}
                </Button>
              </div>
            </div>
          ) : null}

          <div className="flex-1 overflow-y-auto p-8 lg:p-14 space-y-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="flex flex-col">
                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-accent/80 mb-2">NOW PLAYING</span>
                <h2 className="text-6xl lg:text-8xl font-black tracking-tighter italic font-headline">{selectedInstrument.name}</h2>
              </div>
              <Metronome onTick={playTick} />
            </div>

            <ControlPanel volume={volume} onVolumeChange={setVolume} reverb={reverbMix} onReverbChange={setReverbMix} keyColor={accentColor} onKeyColorChange={setAccentColor} />

            <div className="relative bg-background/50 border border-border/40 rounded-[4rem] p-6 md:p-14 shadow-3xl overflow-hidden min-h-[480px] flex items-center justify-center backdrop-blur-md">
                {selectedInstrument.id === 'xylophone' ? (
                  <Xylophone 
                    onPlay={(note) => playNote(note, 'melodic')}
                    onStop={(note) => stopNote(note, 'melodic')}
                    activeNotes={activeNotes}
                  />
                ) : selectedInstrument.type === 'melodic' ? (
                  <Keyboard 
                    onPlay={(note) => playNote(note, 'melodic')}
                    onStop={(note) => stopNote(note, 'melodic')}
                    activeNotes={activeNotes}
                    accentColor={accentColor}
                  />
                ) : (
                  <DrumPads 
                    onPlay={(note) => playNote(note, 'percussive')}
                  />
                )}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-20">
              <div className="bg-muted/10 border border-border/40 rounded-[2.5rem] p-10 space-y-8 backdrop-blur-sm">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">TELEMETRY</h4>
                <div className="space-y-6">
                  {[
                    { label: 'LEFT', val: telemetry.left, color: 'bg-accent' },
                    { label: 'RIGHT', val: telemetry.right, color: 'bg-primary' },
                    { label: 'HEADROOM', val: peakHeadroom, color: 'bg-emerald-500' }
                  ].map((meter) => (
                    <div key={meter.label} className="space-y-2">
                      <div className="flex justify-between text-[9px] font-black uppercase text-muted-foreground">
                        <span>{meter.label}</span>
                        <span>{Math.round(meter.val)}%</span>
                      </div>
                      <div className="h-1.5 bg-border/20 rounded-full overflow-hidden">
                        <div className={cn("h-full transition-all rounded-full", meter.color)} style={{ width: `${meter.val}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Visualizer analyzer={analyzer} isActive={isLoaded && activeNotes.size > 0} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

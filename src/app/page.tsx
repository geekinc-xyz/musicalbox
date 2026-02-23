"use client"

import { useState, useEffect } from 'react';
import { useAudioEngine } from '@/hooks/use-audio-engine';
import { useKeyboardControls } from '@/hooks/use-keyboard-controls';
import { InstrumentSelector } from '@/components/virtual-studio/InstrumentSelector';
import { ControlPanel } from '@/components/virtual-studio/ControlPanel';
import { Keyboard } from '@/components/virtual-studio/Keyboard';
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

  // Handle keyboard controls
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

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={cn("flex-1 flex flex-col h-screen overflow-hidden transition-colors duration-500 font-body", theme === 'dark' ? 'bg-[#1A161C] text-white' : 'bg-white text-black')}>
      {/* Dynamic Ambient Background */}
      {theme === 'dark' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#1A161C] to-transparent" />
        </div>
      )}

      {/* Modern Studio Header */}
      <header className="h-20 border-b border-border/40 px-6 flex items-center justify-between bg-background/60 backdrop-blur-xl z-[60]">
        <div className="flex items-center gap-5">
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-gradient-x"></div>
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
          <div className="hidden lg:flex items-center gap-4 bg-muted/20 px-5 py-2 rounded-2xl border border-border/40">
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-accent" />
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Engine Ready</span>
            </div>
            <div className="w-px h-4 bg-border/40" />
            <div className="flex items-center gap-2">
              <Monitor className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Stereo Out</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="w-px h-8 bg-border/40 mx-2" />
          
          <Button variant="outline" className="hidden md:flex gap-2 border-border/40 bg-muted/20 hover:bg-muted rounded-2xl text-[10px] font-black uppercase tracking-widest px-6 h-11">
            <Save className="w-4 h-4" /> Project
          </Button>
          <Button className="gap-2 bg-accent hover:bg-accent/90 shadow-2xl shadow-accent/20 rounded-2xl text-[10px] font-black uppercase tracking-widest px-7 h-11">
            <Share2 className="w-4 h-4" /> Export
          </Button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Studio Sidebar */}
        <aside className="w-[320px] border-r border-border/40 bg-background/40 backdrop-blur-md hidden xl:block relative z-50">
          <ScrollArea className="h-full px-6 py-10">
            <InstrumentSelector 
              selectedId={selectedInstrument.id} 
              onSelect={setSelectedInstrument} 
            />
            
            <div className="mt-16 p-6 bg-accent/5 border border-accent/10 rounded-[2rem] relative overflow-hidden group">
              <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Headphones className="w-24 h-24 text-accent" />
              </div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-accent mb-4 flex items-center gap-2">
                <Info className="w-3.5 h-3.5" /> STUDIO GUIDE
              </h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed font-bold tracking-tight">
                For optimal audio fidelity and zero-latency monitoring, we recommend high-quality studio headphones. Use keyboard rows A-K for melodic instruments.
              </p>
            </div>
          </ScrollArea>
        </aside>

        {/* Workspace */}
        <div className="flex-1 relative flex flex-col z-10">
          {!isLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-3xl z-[100]">
              <div className="text-center space-y-10 max-w-md p-10 animate-in fade-in zoom-in duration-500">
                <div className="relative inline-block">
                  <div className="absolute -inset-8 bg-primary/30 rounded-full blur-[60px] animate-pulse"></div>
                  <div className="relative w-28 h-28 bg-neutral-900 border border-white/10 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-3xl">
                    <Music className="w-12 h-12 text-primary animate-bounce" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-4xl font-black uppercase tracking-tighter font-headline">MusicalBox Studio</h2>
                  <p className="text-sm text-muted-foreground font-bold leading-relaxed max-w-xs mx-auto opacity-70">
                    Your professional virtual instrument workstation is ready for creative flow.
                  </p>
                </div>

                <Button 
                  size="lg" 
                  disabled={isInitializing}
                  className="w-full bg-accent hover:bg-accent/90 shadow-3xl shadow-accent/40 h-20 rounded-[1.5rem] text-xl font-black uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                  onClick={initAudio}
                >
                  {isInitializing ? (
                    <span className="flex items-center gap-3">
                      <Activity className="animate-spin w-6 h-6" /> LOADING ASSETS...
                    </span>
                  ) : (
                    <>
                      <Play className="mr-4 fill-current w-6 h-6" /> ENTER STUDIO
                    </>
                  )}
                </Button>
                
                <div className="flex items-center justify-center gap-6 opacity-30">
                  <Zap className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Low Latency Audio Engine</span>
                  <Zap className="w-5 h-5" />
                </div>
              </div>
            </div>
          ) : null}

          <div className="flex-1 overflow-y-auto p-8 lg:p-14 space-y-14">
            {/* Context Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-4 bg-emerald-500/10 px-4 py-1.5 rounded-2xl border border-emerald-500/20 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">REAL-TIME ENGINE ACTIVE</span>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-[11px] font-black uppercase tracking-[0.4em] text-accent/80 mb-2">NOW PLAYING</span>
                  <div className="flex items-center gap-8">
                    <h2 className="text-6xl lg:text-8xl font-black tracking-tighter italic leading-none font-headline">
                      {selectedInstrument.name}
                    </h2>
                    <div className="hidden sm:flex flex-col border-l-2 border-border/40 pl-8 h-16 justify-center">
                       <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground opacity-60">{selectedInstrument.category}</span>
                       <span className="text-[11px] font-black uppercase tracking-widest text-accent">PRO GRADE SOUND</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Metronome onTick={playTick} />
            </div>

            {/* Performance Controls */}
            <ControlPanel 
              volume={volume} 
              onVolumeChange={setVolume}
              reverb={reverbMix}
              onReverbChange={setReverbMix}
              keyColor={accentColor}
              onKeyColorChange={setAccentColor}
            />

            {/* Instrument Workspace */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-b from-white/5 to-transparent rounded-[4rem] blur-2xl opacity-10 pointer-events-none" />
              <div className="relative bg-background/50 border border-border/40 rounded-[4rem] p-6 md:p-14 shadow-3xl overflow-hidden min-h-[480px] flex items-center justify-center backdrop-blur-md">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] rotate-12 pointer-events-none">
                  <Mic2 className="w-48 h-48 text-foreground" />
                </div>
                
                {selectedInstrument.type === 'melodic' ? (
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
            </div>
            
            {/* Visuals & Telemetry */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-20">
              <div className="bg-muted/10 border border-border/40 rounded-[2.5rem] p-10 space-y-8 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">OUTPUT TELEMETRY</h4>
                  <Volume2 className="w-4 h-4 text-muted-foreground/60" />
                </div>
                <div className="space-y-6">
                  {[
                    { label: 'LEFT CHANNEL', val: activeNotes.size > 0 ? 55 + Math.random() * 25 : 0, color: 'bg-accent' },
                    { label: 'RIGHT CHANNEL', val: activeNotes.size > 0 ? 55 + Math.random() * 25 : 0, color: 'bg-primary' },
                    { label: 'PEAK HEADROOM', val: (volume + 60) * 1.6, color: 'bg-emerald-500' }
                  ].map((meter) => (
                    <div key={meter.label} className="space-y-2.5">
                      <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-muted-foreground/80">
                        <span>{meter.label}</span>
                        <span className="font-mono text-accent">{Math.round(meter.val)}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-border/20 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className={cn("h-full transition-all duration-150 rounded-full", meter.color)}
                          style={{ width: `${meter.val}%`, boxShadow: '0 0 10px currentColor' }}
                        />
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
      
      {/* Studio Overlay Footer (Breadcrumb/Status) */}
      <footer className="h-10 border-t border-border/40 bg-background/60 backdrop-blur-xl px-6 flex items-center justify-between z-50">
        <div className="flex items-center gap-6">
          <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
            <Zap className="w-3 h-3" /> AUDIO: 48KHZ 24-BIT
          </span>
          <div className="w-px h-3 bg-border/40" />
          <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">
            SESSION: UNTITLED_PROJECT_01
          </span>
        </div>
        <div className="flex items-center gap-4">
           <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500/80">ALL SYSTEMS NOMINAL</span>
        </div>
      </footer>
    </div>
  );
}

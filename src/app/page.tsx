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
  Music, 
  Sun, 
  Moon,
  Globe,
  Github
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
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  
  // Personalization state (Global)
  const [xyloLabelMode, setXyloLabelMode] = useState<'solfege' | 'alpha' | 'numeric'>('solfege');
  const [xyloColorMode, setXyloColorMode] = useState<'rainbow' | 'monochrome'>('rainbow');

  const t = {
    fr: {
      title: "MusicalBox",
      subtitle: "STUDIO VIRTUEL 2.0",
      enter: "ENTRER DANS LE STUDIO",
      loading: "CHARGEMENT...",
      now_playing: "LECTURE EN COURS",
      telemetry: "TÉLÉMÉTRIE",
      left: "GAUCHE",
      right: "DROITE",
      headroom: "RÉSERVE",
      copyright: "© 2026 MusicalBox, un projet GEEK Inc. Tous droits réservés.",
      rack: "RACK D'INSTRUMENTS",
      category_names: {
        Keyboards: "Claviers",
        Percussion: "Percussions",
        Mallets: "Maillets",
        Strings: "Cordes"
      },
      instrument_names: {
        piano: "Piano",
        drums: "Batterie",
        xylophone: "Xylophone",
        violin: "Violon"
      }
    },
    en: {
      title: "MusicalBox",
      subtitle: "VIRTUAL STUDIO 2.0",
      enter: "ENTER STUDIO",
      loading: "LOADING...",
      now_playing: "NOW PLAYING",
      telemetry: "TELEMETRY",
      left: "LEFT",
      right: "RIGHT",
      headroom: "HEADROOM",
      copyright: "© 2026 MusicalBox, a GEEK Inc project. All rights reserved.",
      rack: "INSTRUMENT RACK",
      category_names: {
        Keyboards: "Keyboards",
        Percussion: "Percussion",
        Mallets: "Mallets",
        Strings: "Strings"
      },
      instrument_names: {
        piano: "Piano",
        drums: "Drums",
        xylophone: "Xylophone",
        violin: "Violin"
      }
    }
  }[lang];

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
    <div className={cn("flex-1 flex flex-col h-screen overflow-hidden transition-all duration-700 font-body", 
      theme === 'dark' ? 'bg-[#1A161C] text-white' : 'bg-neutral-50 text-neutral-900')}>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-1000">
        {theme === 'dark' ? (
          <>
            <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[150px]" />
          </>
        ) : (
          <>
            <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px]" />
            <div className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[150px]" />
          </>
        )}
      </div>

      <header className={cn("h-20 border-b px-6 flex items-center justify-between backdrop-blur-xl z-[60] transition-colors", 
        theme === 'dark' ? 'bg-[#1A161C]/60 border-white/10' : 'bg-white/70 border-black/5')}>
        <div className="flex items-center gap-5">
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
            <div className={cn("relative w-12 h-12 rounded-2xl border flex items-center justify-center text-primary shadow-2xl transition-colors",
              theme === 'dark' ? 'bg-neutral-900 border-white/10' : 'bg-white border-black/5')}>
              <Music className="w-6 h-6" />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-black tracking-[0.2em] uppercase leading-none font-headline">{t.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">{t.subtitle}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            className="rounded-xl flex gap-2 font-black text-[10px] uppercase tracking-widest"
          >
            <Globe className="w-4 h-4" />
            {lang === 'fr' ? 'English' : 'Français'}
          </Button>
          
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-xl">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <aside className={cn("w-[320px] border-r hidden xl:block z-50 transition-colors", 
          theme === 'dark' ? 'bg-[#1A161C]/40 border-white/10' : 'bg-white/40 border-black/5')}>
          <ScrollArea className="h-full px-6 py-10">
            <InstrumentSelector 
              selectedId={selectedInstrument.id} 
              onSelect={setSelectedInstrument} 
              label={t.rack}
              instrumentNames={t.instrument_names}
              categoryNames={t.category_names}
            />
          </ScrollArea>
        </aside>

        <div className="flex-1 relative flex flex-col z-10">
          {!isLoaded ? (
            <div className={cn("absolute inset-0 flex items-center justify-center z-[100] transition-colors",
              theme === 'dark' ? 'bg-[#1A161C]/90 backdrop-blur-3xl' : 'bg-white/90 backdrop-blur-3xl')}>
              <div className="text-center space-y-10 max-w-md p-10">
                <Music className="w-16 h-16 text-primary mx-auto animate-bounce" />
                <h2 className="text-4xl font-black uppercase tracking-tighter">{t.title} Studio</h2>
                <Button 
                  size="lg" 
                  disabled={isInitializing}
                  className="w-full bg-accent hover:bg-accent/90 h-20 rounded-[1.5rem] text-xl font-black uppercase tracking-widest text-white shadow-2xl shadow-accent/40"
                  onClick={initAudio}
                >
                  {isInitializing ? t.loading : t.enter}
                </Button>
              </div>
            </div>
          ) : null}

          <div className="flex-1 overflow-y-auto p-8 lg:p-14 space-y-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="flex flex-col">
                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-accent/80 mb-2">{t.now_playing}</span>
                <h2 className="text-6xl lg:text-8xl font-black tracking-tighter italic font-headline">
                  {t.instrument_names[selectedInstrument.id as keyof typeof t.instrument_names]}
                </h2>
              </div>
              <Metronome onTick={playTick} lang={lang} />
            </div>

            <ControlPanel 
              volume={volume} 
              onVolumeChange={setVolume} 
              reverb={reverbMix} 
              onReverbChange={setReverbMix} 
              keyColor={accentColor} 
              onKeyColorChange={setAccentColor}
              xyloLabelMode={xyloLabelMode}
              onXyloLabelModeChange={setXyloLabelMode}
              xyloColorMode={xyloColorMode}
              onXyloColorModeChange={setXyloColorMode}
              lang={lang}
            />

            <div className={cn("relative border rounded-[4rem] p-6 md:p-14 shadow-3xl overflow-hidden min-h-[480px] flex items-center justify-center backdrop-blur-md transition-all duration-500",
              theme === 'dark' ? 'bg-neutral-900/50 border-white/10' : 'bg-white/80 border-black/5')}>
                {selectedInstrument.id === 'xylophone' ? (
                  <Xylophone 
                    onPlay={(note) => playNote(note, 'melodic')}
                    onStop={(note) => stopNote(note, 'melodic')}
                    activeNotes={activeNotes}
                    lang={lang}
                    labelMode={xyloLabelMode}
                    colorMode={xyloColorMode}
                    accentColor={accentColor}
                  />
                ) : selectedInstrument.type === 'melodic' ? (
                  <Keyboard 
                    onPlay={(note) => playNote(note, 'melodic')}
                    onStop={(note) => stopNote(note, 'melodic')}
                    activeNotes={activeNotes}
                    accentColor={accentColor}
                    labelMode={xyloLabelMode}
                    colorMode={xyloColorMode}
                  />
                ) : (
                  <DrumPads 
                    onPlay={(note) => playNote(note, 'percussive')}
                    colorMode={xyloColorMode}
                    accentColor={accentColor}
                  />
                )}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-10">
              <div className={cn("border rounded-[2.5rem] p-10 space-y-8 backdrop-blur-sm transition-colors",
                theme === 'dark' ? 'bg-neutral-800/20 border-white/10' : 'bg-white border-black/5 shadow-xl shadow-black/5')}>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">{t.telemetry}</h4>
                <div className="space-y-6">
                  {[
                    { label: t.left, val: telemetry.left, color: 'bg-accent' },
                    { label: t.right, val: telemetry.right, color: 'bg-primary' },
                    { label: t.headroom, val: peakHeadroom, color: 'bg-emerald-500' }
                  ].map((meter) => (
                    <div key={meter.label} className="space-y-2">
                      <div className="flex justify-between text-[9px] font-black uppercase text-muted-foreground">
                        <span>{meter.label}</span>
                        <span>{Math.round(meter.val)}%</span>
                      </div>
                      <div className={cn("h-1.5 rounded-full overflow-hidden", theme === 'dark' ? 'bg-white/5' : 'bg-black/5')}>
                        <div className={cn("h-full transition-all rounded-full", meter.color)} style={{ width: `${meter.val}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Visualizer analyzer={analyzer} isActive={isLoaded && activeNotes.size > 0} lang={lang} />
            </div>

            <footer className="border-t border-border/20 pt-10 pb-20 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-xl border flex items-center justify-center text-primary/50 transition-colors",
                  theme === 'dark' ? 'bg-neutral-900 border-white/5' : 'bg-white border-black/5')}>
                  <Music className="w-5 h-5" />
                </div>
                <p className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest">{t.copyright}</p>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <a 
                  href="https://github.com/geekinc-xyz/musicalbox" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={cn("flex items-center gap-2 px-4 py-2 rounded-xl border transition-all group",
                    theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-black/10 hover:bg-black/5')}
                >
                  <Github className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-[10px] font-black text-muted-foreground group-hover:text-primary uppercase tracking-widest transition-colors">
                    Open-Source Project
                  </span>
                </a>

                <div className="flex gap-8 text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest">
                  <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                  <a href="#" className="hover:text-primary transition-colors">Terms</a>
                  <a href="#" className="hover:text-primary transition-colors">Support</a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
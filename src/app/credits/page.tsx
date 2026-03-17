
"use client"

import { Music, ArrowLeft, Globe } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function CreditsPage() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<'fr' | 'en'>('fr');

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('musicalbox-lang') as 'fr' | 'en';
    if (savedLang) setLang(savedLang);
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'fr' ? 'en' : 'fr';
    setLang(newLang);
    localStorage.setItem('musicalbox-lang', newLang);
  };

  if (!mounted) return null;

  const t = {
    fr: {
      back: "Retour au Studio",
      title: "Crédits & Ressources",
      description: "MusicalBox est un projet open-source né de la passion pour la musique et le code. Voici les ressources qui ont rendu ce studio virtuel possible.",
      audio_engine: "Moteur Audio",
      interface_ui: "Interface UI",
      copyright: "© 2026 MusicalBox, un projet GEEK Inc. Tous droits réservés.",
      resources: {
        tone: "Le framework Web Audio pour le séquençage et la synthèse.",
        piano: "Échantillons de piano haute qualité par Alexander Holm.",
        drums: "Banque de sons officiels de Tone.js.",
        xylo: "Moteur de synthèse numérique (Wooden Mallet Simulation).",
        next: "Framework React pour la performance et le routing.",
        tailwind: "Pour un design adaptatif et moderne.",
        shadcn: "Composants d'interface élégants et accessibles.",
        lucide: "Bibliothèque d'icônes minimalistes."
      }
    },
    en: {
      back: "Back to Studio",
      title: "Credits & Resources",
      description: "MusicalBox is an open-source project born from a passion for music and code. Here are the resources that made this virtual studio possible.",
      audio_engine: "Audio Engine",
      interface_ui: "UI Interface",
      copyright: "© 2026 MusicalBox, a GEEK Inc project. All rights reserved.",
      resources: {
        tone: "The Web Audio framework for sequencing and synthesis.",
        piano: "High-quality piano samples by Alexander Holm.",
        drums: "Official Tone.js sound bank.",
        xylo: "Digital synthesis engine (Wooden Mallet Simulation).",
        next: "React framework for performance and routing.",
        tailwind: "For adaptive and modern design.",
        shadcn: "Elegant and accessible interface components.",
        lucide: "Minimalist icon library."
      }
    }
  }[lang];

  return (
    <div className="min-h-screen bg-[#1A161C] text-white font-body selection:bg-primary/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[150px]" />
      </div>

      <header className="h-20 border-b border-white/10 px-6 flex items-center justify-between backdrop-blur-xl sticky top-0 z-50 bg-[#1A161C]/60">
        <Link href="/" className="flex items-center gap-5 group">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative w-10 h-10 rounded-xl border border-white/10 bg-neutral-900 flex items-center justify-center text-primary shadow-2xl">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-black tracking-[0.2em] uppercase leading-none">{t.back}</h1>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleLang}
            className="rounded-xl flex gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-white/10"
          >
            <Globe className="w-4 h-4" />
            {lang === 'fr' ? 'English' : 'Français'}
          </Button>
          <div className="flex items-center gap-2">
            <Music className="w-5 h-5 text-accent" />
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">MusicalBox v2.0</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        <div className="space-y-16">
          <section className="text-center space-y-6">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic">{t.title}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t.description}
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">{t.audio_engine}</h3>
              </div>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><strong className="text-white">Tone.js</strong> — {t.resources.tone}</li>
                <li><strong className="text-white">Salamander Grand Piano</strong> — {t.resources.piano}</li>
                <li><strong className="text-white">Acoustic Drum Kit</strong> — {t.resources.drums}</li>
                <li><strong className="text-white">Xylophone Synth</strong> — {t.resources.xylo}</li>
              </ul>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">{t.interface_ui}</h3>
              </div>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><strong className="text-white">Next.js 15</strong> — {t.resources.next}</li>
                <li><strong className="text-white">Tailwind CSS</strong> — {t.resources.tailwind}</li>
                <li><strong className="text-white">ShadCN UI</strong> — {t.resources.shadcn}</li>
                <li><strong className="text-white">Lucide React</strong> — {t.resources.lucide}</li>
              </ul>
            </div>
          </div>
        </div>

        <footer className="mt-32 pt-10 border-t border-white/5 text-center">
          <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.3em]">
            {t.copyright}
          </p>
        </footer>
      </main>
    </div>
  );
}

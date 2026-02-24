"use client"

import { Music, ArrowLeft, Github, Globe, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function CreditsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#1A161C] text-white font-body selection:bg-primary/30">
      {/* Background Orbs */}
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
            <h1 className="text-sm font-black tracking-[0.2em] uppercase leading-none">Retour au Studio</h1>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Music className="w-5 h-5 text-accent" />
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">MusicalBox v2.0</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        <div className="space-y-16">
          <section className="text-center space-y-6">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic">Crédits & Ressources</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              MusicalBox est un projet open-source né de la passion pour la musique et le code. Voici les ressources qui ont rendu ce studio virtuel possible.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">Audio Engine</h3>
              </div>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><strong className="text-white">Tone.js</strong> — Le framework Web Audio pour le séquençage et la synthèse.</li>
                <li><strong className="text-white">Salamander Grand Piano</strong> — Échantillons de piano haute qualité par Alexander Holm.</li>
                <li><strong className="text-white">Acoustic Drum Kit</strong> — Banque de sons officiels de Tone.js.</li>
                <li><strong className="text-white">PlayXylo.com</strong> — Échantillons sonores de xylophone haute fidélité.</li>
              </ul>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">Interface UI</h3>
              </div>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><strong className="text-white">Next.js 15</strong> — Framework React pour la performance et le routing.</li>
                <li><strong className="text-white">Tailwind CSS</strong> — Pour un design adaptatif et moderne.</li>
                <li><strong className="text-white">ShadCN UI</strong> — Composants d'interface élégants et accessibles.</li>
                <li><strong className="text-white">Lucide React</strong> — Bibliothèque d'icônes minimalistes.</li>
              </ul>
            </div>
          </div>

          <section className="p-10 rounded-[3rem] bg-gradient-to-br from-primary/20 to-accent/20 border border-white/10 text-center space-y-8">
            <Heart className="w-12 h-12 text-primary mx-auto animate-pulse" />
            <h3 className="text-3xl font-black uppercase tracking-tighter italic">Remerciements Spéciaux</h3>
            <p className="text-muted-foreground leading-relaxed">
              Merci à tous les contributeurs de l'open-source et aux développeurs passionnés qui partagent leurs connaissances. MusicalBox est un hommage à la créativité numérique.
            </p>
            <div className="flex justify-center gap-6">
              <a href="https://github.com/geekinc-xyz/musicalbox" target="_blank" className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all font-black text-xs uppercase tracking-widest">
                <Github className="w-4 h-4" />
                Dépôt GitHub
              </a>
            </div>
          </section>
        </div>

        <footer className="mt-32 pt-10 border-t border-white/5 text-center">
          <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.3em]">
            © 2026 MusicalBox Studio — Développé avec amour pour les musiciens.
          </p>
        </footer>
      </main>
    </div>
  );
}

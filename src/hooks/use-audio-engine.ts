
"use client"

import { useEffect, useRef, useState, useCallback } from 'react';
import * as Tone from 'tone';
import { Instrument } from '@/lib/instruments';

export function useAudioEngine() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [volume, setVolume] = useState(-12);
  const [reverbMix, setReverbMix] = useState(0.25);
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());
  const [analyzer, setAnalyzer] = useState<AnalyserNode | null>(null);

  // Dedicated samplers for Real sounds
  const pianoSampler = useRef<Tone.Sampler | null>(null);
  const xylophoneSampler = useRef<Tone.Sampler | null>(null);
  const ukuleleSampler = useRef<Tone.Sampler | null>(null);
  const guitarSampler = useRef<Tone.Sampler | null>(null);
  const drumSampler = useRef<Tone.Sampler | null>(null);
  
  // Specific Synths for distinct non-sampled instruments
  const violinSynth = useRef<Tone.PolySynth | null>(null);
  const fluteSynth = useRef<Tone.PolySynth | null>(null);
  const genericSynth = useRef<Tone.PolySynth | null>(null);
  
  const reverbRef = useRef<Tone.Reverb | null>(null);
  const volRef = useRef<Tone.Volume | null>(null);
  const currentInstrument = useRef<Instrument | null>(null);
  const tickSynthRef = useRef<Tone.MembraneSynth | null>(null);

  const initAudio = useCallback(async () => {
    if (isLoaded || isInitializing) return;
    setIsInitializing(true);

    try {
      await Tone.start();
      
      // Master Output Chain
      volRef.current = new Tone.Volume(volume).toDestination();
      
      // High Quality Studio Reverb
      const reverb = new Tone.Reverb({ decay: 2.5, wet: reverbMix });
      await reverb.generate();
      reverbRef.current = reverb.connect(volRef.current);
      
      // Spectral Analysis Setup
      const fft = Tone.getContext().createAnalyser();
      fft.fftSize = 256;
      setAnalyzer(fft);
      Tone.getDestination().connect(fft);

      // 1. Grand Piano (Salamander)
      pianoSampler.current = new Tone.Sampler({
        urls: {
          A0: "A0.mp3", C1: "C1.mp3", "D#1": "Ds1.mp3", "F#1": "Fs1.mp3",
          A1: "A1.mp3", C2: "C2.mp3", "D#2": "Ds2.mp3", "F#2": "Fs2.mp3",
          A2: "A2.mp3", C3: "C3.mp3", "D#3": "Ds3.mp3", "F#3": "Fs3.mp3",
          A3: "A3.mp3", C4: "C4.mp3", "D#4": "Ds4.mp3", "F#4": "Fs4.mp3",
          A4: "A4.mp3", C5: "C5.mp3", "D#5": "Ds5.mp3", "F#5": "Fs5.mp3",
          A5: "A5.mp3", C6: "C6.mp3", "D#6": "Ds6.mp3", "F#6": "Fs6.mp3",
          A6: "A6.mp3", C7: "C7.mp3", "D#7": "Ds7.mp3", "F#7": "Fs7.mp3",
          A7: "A7.mp3", C8: "C8.mp3"
        },
        baseUrl: "https://tonejs.github.io/audio/salamander/",
      }).connect(reverbRef.current);

      // 2. Concert Xylophone (PlayXylo assets)
      xylophoneSampler.current = new Tone.Sampler({
        urls: {
          "C4": "C4.mp3",
          "D4": "D4.mp3",
          "E4": "E4.mp3",
          "F4": "F4.mp3",
          "G4": "G4.mp3",
          "A4": "A4.mp3",
          "B4": "B4.mp3",
          "C5": "C5.mp3",
        },
        baseUrl: "https://playxylo.com/assets/audio/",
      }).connect(reverbRef.current);

      // 3. Soprano Ukulele (Using bright pluck synthesis with ukulele voicing)
      ukuleleSampler.current = new Tone.Sampler({
        urls: {
          "G4": "G4.mp3",
          "C4": "C4.mp3",
          "E4": "E4.mp3",
          "A4": "A4.mp3"
        },
        baseUrl: "https://playxylo.com/assets/audio/", // Reusing clean mallet samples for high-freq pluck-like sounds
      }).connect(reverbRef.current);

      // 4. Acoustic Guitar
      guitarSampler.current = new Tone.Sampler({
        urls: { 
          "A2": "guitar_acoustic.mp3",
          "C3": "guitar_acoustic.mp3",
          "E3": "guitar_acoustic.mp3"
        },
        baseUrl: "https://tonejs.github.io/audio/berklee/",
      }).connect(reverbRef.current);

      // 5. Studio Drums (Direct connection for punch)
      drumSampler.current = new Tone.Sampler({
        urls: {
          "C1": "kick.mp3",
          "D1": "snare.mp3",
          "F#1": "hihat.mp3",
          "G#1": "openhihat.mp3",
          "F1": "tom1.mp3",
          "G1": "tom2.mp3",
          "A1": "tom3.mp3",
          "C#2": "crash.mp3",
        },
        baseUrl: "https://tonejs.github.io/audio/drum-samples/acoustic-kit/",
      }).connect(volRef.current);

      // 6. Orchestral Violin (Slow attack, rich harmonics)
      violinSynth.current = new Tone.PolySynth(Tone.MonoSynth, {
        oscillator: { type: "sawtooth" },
        envelope: { attack: 0.2, decay: 0.3, sustain: 0.8, release: 1.5 },
        filterEnvelope: { attack: 0.1, decay: 0.2, sustain: 0.5, release: 1, baseFrequency: 200, octaves: 4 }
      }).connect(reverbRef.current);

      // 7. Woodwinds (Flute - Breathy FM)
      fluteSynth.current = new Tone.PolySynth(Tone.FMSynth, {
        modulationIndex: 12,
        harmonicity: 1.5,
        envelope: { attack: 0.1, decay: 0.2, sustain: 0.3, release: 1 }
      }).connect(reverbRef.current);

      genericSynth.current = new Tone.PolySynth(Tone.Synth).connect(reverbRef.current);

      // Metronome Click
      tickSynthRef.current = new Tone.MembraneSynth({
        pitchDecay: 0.05, octaves: 2,
        envelope: { attack: 0.001, decay: 0.2, sustain: 0 }
      }).connect(volRef.current);

      await Tone.loaded();
      setIsLoaded(true);
    } catch (error) {
      console.error("Audio engine failed:", error);
    } finally {
      setIsInitializing(false);
    }
  }, [isLoaded, isInitializing, reverbMix, volume]);

  const loadInstrument = useCallback(async (instrument: Instrument) => {
    if (!isLoaded) return;
    currentInstrument.current = instrument;
  }, [isLoaded]);

  const playNote = useCallback((note: string, type: 'melodic' | 'percussive' = 'melodic') => {
    if (!isLoaded) return;
    const time = Tone.now();
    const inst = currentInstrument.current;
    
    if (type === 'melodic') {
      if (!inst) return;

      if (inst.id === 'piano' && pianoSampler.current?.loaded) {
        pianoSampler.current.triggerAttack(note, time);
      } else if (inst.id === 'xylophone' && xylophoneSampler.current?.loaded) {
        xylophoneSampler.current.triggerAttack(note, time);
      } else if (inst.id === 'ukulele' && ukuleleSampler.current?.loaded) {
        ukuleleSampler.current.triggerAttack(note, time);
      } else if (inst.id === 'guitar' && guitarSampler.current?.loaded) {
        guitarSampler.current.triggerAttack(note, time);
      } else if (inst.id === 'violin' && violinSynth.current) {
        violinSynth.current.triggerAttack(note, time);
      } else if ((inst.id === 'flute' || inst.id === 'clarinet') && fluteSynth.current) {
        fluteSynth.current.triggerAttack(note, time);
      } else {
        genericSynth.current?.triggerAttack(note, time);
      }
      
      setActiveNotes(prev => new Set(prev).add(note));
    } else if (type === 'percussive') {
      if (drumSampler.current?.loaded) {
        drumSampler.current.triggerAttack(note, time);
      }
    }
  }, [isLoaded]);

  const stopNote = useCallback((note: string, type: 'melodic' | 'percussive' = 'melodic') => {
    if (!isLoaded) return;
    const time = Tone.now();
    const inst = currentInstrument.current;
    
    if (type === 'melodic') {
      if (!inst) return;

      if (inst.id === 'piano' && pianoSampler.current?.loaded) {
        pianoSampler.current.triggerRelease(note, time);
      } else if (inst.id === 'xylophone' && xylophoneSampler.current?.loaded) {
        xylophoneSampler.current.triggerRelease(note, time);
      } else if (inst.id === 'ukulele' && ukuleleSampler.current?.loaded) {
        ukuleleSampler.current.triggerRelease(note, time);
      } else if (inst.id === 'guitar' && guitarSampler.current?.loaded) {
        guitarSampler.current.triggerRelease(note, time);
      } else if (inst.id === 'violin' && violinSynth.current) {
        violinSynth.current.triggerRelease(note, time);
      } else if ((inst.id === 'flute' || inst.id === 'clarinet') && fluteSynth.current) {
        fluteSynth.current.triggerRelease(note, time);
      } else {
        genericSynth.current?.triggerRelease(note, time);
      }
      
      setActiveNotes(prev => {
        const next = new Set(prev);
        next.delete(note);
        return next;
      });
    }
  }, [isLoaded]);

  const playTick = useCallback((isHigh: boolean = false) => {
    if (!isLoaded || !tickSynthRef.current) return;
    tickSynthRef.current.triggerAttackRelease(isHigh ? "C3" : "C2", "16n", Tone.now());
  }, [isLoaded]);

  useEffect(() => {
    if (volRef.current) volRef.current.volume.rampTo(volume, 0.1);
  }, [volume]);

  useEffect(() => {
    if (reverbRef.current) reverbRef.current.wet.rampTo(reverbMix, 0.1);
  }, [reverbMix]);

  return {
    isLoaded, isInitializing, initAudio, loadInstrument,
    playNote, stopNote, playTick, volume, setVolume,
    reverbMix, setReverbMix, activeNotes, analyzer
  };
}

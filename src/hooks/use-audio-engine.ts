
"use client"

import { useEffect, useRef, useState, useCallback } from 'react';
import * as Tone from 'tone';
import { Instrument } from '@/lib/instruments';

export function useAudioEngine() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [volume, setVolume] = useState(-12);
  const [reverbMix, setReverbMix] = useState(0.2);
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());
  const [analyzer, setAnalyzer] = useState<AnalyserNode | null>(null);

  const samplerRef = useRef<Tone.Sampler | null>(null);
  const synthRef = useRef<Tone.PolySynth | null>(null);
  const drumSamplerRef = useRef<Tone.Sampler | null>(null);
  const reverbRef = useRef<Tone.Reverb | null>(null);
  const volRef = useRef<Tone.Volume | null>(null);
  const currentInstrument = useRef<Instrument | null>(null);
  const tickSynthRef = useRef<Tone.MembraneSynth | null>(null);

  const initAudio = useCallback(async () => {
    if (isLoaded || isInitializing) return;
    setIsInitializing(true);

    try {
      await Tone.start();
      
      // Setup Main Output Chain
      volRef.current = new Tone.Volume(volume).toDestination();
      
      // Setup Reverb
      const reverb = new Tone.Reverb({ decay: 2.5, wet: reverbMix });
      await reverb.ready;
      reverbRef.current = reverb.connect(volRef.current);
      
      const fft = Tone.getContext().createAnalyser();
      fft.fftSize = 256;
      setAnalyzer(fft);
      Tone.getDestination().connect(fft);

      // High-Quality Salamander Grand Piano Samples
      // We use a dense set of samples for maximum realism
      samplerRef.current = new Tone.Sampler({
        urls: {
          A0: "A0.mp3",
          C1: "C1.mp3",
          "D#1": "Ds1.mp3",
          "F#1": "Fs1.mp3",
          A1: "A1.mp3",
          C2: "C2.mp3",
          "D#2": "Ds2.mp3",
          "F#2": "Fs2.mp3",
          A2: "A2.mp3",
          C3: "C3.mp3",
          "D#3": "Ds3.mp3",
          "F#3": "Fs3.mp3",
          A3: "A3.mp3",
          C4: "C4.mp3",
          "D#4": "Ds4.mp3",
          "F#4": "Fs4.mp3",
          A4: "A4.mp3",
          C5: "C5.mp3",
          "D#5": "Ds5.mp3",
          "F#5": "Fs5.mp3",
          A5: "A5.mp3",
          C6: "C6.mp3",
          "D#6": "Ds6.mp3",
          "F#6": "Fs6.mp3",
          A6: "A6.mp3",
          C7: "C7.mp3",
          "D#7": "Ds7.mp3",
          "F#7": "Fs7.mp3",
          A7: "A7.mp3",
          C8: "C8.mp3"
        },
        baseUrl: "https://tonejs.github.io/audio/salamander/",
        release: 1.5,
      }).connect(reverbRef.current);

      // Metronome Tick
      tickSynthRef.current = new Tone.MembraneSynth({
        pitchDecay: 0.008,
        octaves: 2,
        envelope: { attack: 0.0006, decay: 0.5, sustain: 0 }
      }).connect(volRef.current);

      // Flexible PolySynth for other instruments
      synthRef.current = new Tone.PolySynth(Tone.Synth).connect(reverbRef.current);

      // Studio Drums
      drumSamplerRef.current = new Tone.Sampler({
        urls: {
          C1: "kick.mp3",
          D1: "snare.mp3",
          "F#1": "hh.mp3",
          "G#1": "hho.mp3",
          F1: "tom1.mp3",
          G1: "tom2.mp3",
          A1: "tom3.mp3",
          "C#2": "crash.mp3",
        },
        baseUrl: "https://tonejs.github.io/audio/drum-samples/CR78/"
      }).connect(volRef.current);

      // Explicitly wait for ALL samples to load
      await Tone.loaded();
      setIsLoaded(true);
    } catch (error) {
      console.error("Audio initialization failed:", error);
    } finally {
      setIsInitializing(false);
    }
  }, [isLoaded, isInitializing, reverbMix, volume]);

  const loadInstrument = useCallback(async (instrument: Instrument) => {
    if (!isLoaded || !synthRef.current) return;
    currentInstrument.current = instrument;

    switch (instrument.id) {
      case 'piano':
        // No changes needed for Sampler piano, but keep synth fallback tuned
        synthRef.current.set({ oscillator: { type: 'triangle' }, envelope: { attack: 0.02, decay: 0.1, sustain: 0.3, release: 1 } });
        break;
      case 'violin':
        synthRef.current.set({ oscillator: { type: 'sawtooth' }, envelope: { attack: 0.4, release: 0.8 } });
        break;
      case 'flute':
        synthRef.current.set({ oscillator: { type: 'sine' }, envelope: { attack: 0.15, release: 0.4 } });
        break;
      case 'ukulele':
        synthRef.current.set({ oscillator: { type: 'square' }, envelope: { attack: 0.01, decay: 0.2, sustain: 0.2, release: 0.4 } });
        break;
      case 'xylophone':
        synthRef.current.set({ oscillator: { type: 'sine' }, envelope: { attack: 0.001, decay: 0.1, sustain: 0.05, release: 0.1 } });
        break;
      case 'guitar':
        synthRef.current.set({ oscillator: { type: 'triangle' }, envelope: { attack: 0.05, decay: 0.3, sustain: 0.4, release: 0.6 } });
        break;
      case 'clarinet':
        synthRef.current.set({ oscillator: { type: 'square' }, envelope: { attack: 0.1, release: 0.3 } });
        break;
      default:
        synthRef.current.set({ oscillator: { type: 'triangle' }, envelope: { attack: 0.1, release: 1 } });
    }
  }, [isLoaded]);

  const playNote = useCallback((note: string, type: 'melodic' | 'percussive' = 'melodic') => {
    if (!isLoaded) return;
    const time = Tone.now();
    
    if (type === 'melodic') {
      const isPiano = currentInstrument.current?.id === 'piano';
      
      // Real Piano Sound Check
      if (isPiano && samplerRef.current && samplerRef.current.loaded) {
        samplerRef.current.triggerAttack(note, time);
      } else if (synthRef.current) {
        // Fallback for non-piano or if sampler still loading
        synthRef.current.triggerAttack(note, time);
      }
      
      setActiveNotes(prev => new Set(prev).add(note));
    } else if (type === 'percussive' && drumSamplerRef.current) {
      if (drumSamplerRef.current.loaded) {
        drumSamplerRef.current.triggerAttack(note, time);
      }
    }
  }, [isLoaded]);

  const stopNote = useCallback((note: string, type: 'melodic' | 'percussive' = 'melodic') => {
    if (!isLoaded) return;
    const time = Tone.now();
    
    if (type === 'melodic') {
      const isPiano = currentInstrument.current?.id === 'piano';
      
      if (isPiano && samplerRef.current && samplerRef.current.loaded) {
        samplerRef.current.triggerRelease(note, time);
      } else if (synthRef.current) {
        synthRef.current.triggerRelease(note, time);
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
    if (volRef.current) {
      volRef.current.volume.rampTo(volume, 0.1);
    }
  }, [volume]);

  useEffect(() => {
    if (reverbRef.current) {
      reverbRef.current.wet.rampTo(reverbMix, 0.1);
    }
  }, [reverbMix]);

  return {
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
  };
}

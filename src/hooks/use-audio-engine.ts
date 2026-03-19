
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

  const pianoSampler = useRef<Tone.Sampler | null>(null);
  const xylophoneSampler = useRef<Tone.Sampler | null>(null);
  const drumPlayers = useRef<Tone.Players | null>(null);
  const violinSynth = useRef<Tone.PolySynth | null>(null);
  const malletSynth = useRef<Tone.PolySynth | null>(null);
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
      
      volRef.current = new Tone.Volume(volume).toDestination();
      
      const reverb = new Tone.Reverb({ decay: 2.5, wet: reverbMix });
      await reverb.generate();
      reverbRef.current = reverb.connect(volRef.current);
      
      const fft = Tone.getContext().createAnalyser();
      fft.fftSize = 256;
      setAnalyzer(fft);
      Tone.getDestination().connect(fft);

      // Fallback Synth
      malletSynth.current = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "triangle" },
        envelope: { attack: 0.005, decay: 0.1, sustain: 0.1, release: 1 },
      }).connect(reverbRef.current);

      // Piano Sampler
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

      // Xylophone Sampler: mapping A (1).wav to A (44).wav starting from C4
      const xyloUrls: Record<string, string> = {};
      const notesArray = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
      for (let i = 1; i <= 44; i++) {
        const midiNote = i + 59; // 60 is C4
        const octave = Math.floor(midiNote / 12) - 1;
        const noteName = notesArray[midiNote % 12];
        xyloUrls[`${noteName}${octave}`] = `A (${i}).wav`;
      }

      xylophoneSampler.current = new Tone.Sampler({
        urls: xyloUrls,
        baseUrl: "/audio/instruments/xylophone/",
        onload: () => {
          console.log("Xylophone Custom A(1-44) pack loaded.");
        }
      }).connect(reverbRef.current);

      // Drums
      drumPlayers.current = new Tone.Players({
        urls: {
          "kick": "kick.mp3", "snare": "snare.mp3", "hihat": "hihat.mp3",
          "openhihat": "openhihat.mp3", "tom1": "tom1.mp3", "tom2": "tom2.mp3",
          "tom3": "tom3.mp3", "crash": "crash.mp3",
        },
        baseUrl: "https://tonejs.github.io/audio/drum-samples/acoustic-kit/",
      }).connect(volRef.current);

      // Violin
      violinSynth.current = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "sawtooth" },
        envelope: { attack: 0.4, decay: 0.3, sustain: 0.8, release: 1.5 },
      }).connect(reverbRef.current);

      genericSynth.current = new Tone.PolySynth(Tone.Synth).connect(reverbRef.current);

      tickSynthRef.current = new Tone.MembraneSynth({
        pitchDecay: 0.05, octaves: 2,
        envelope: { attack: 0.001, decay: 0.2, sustain: 0 }
      }).connect(volRef.current);

      await Tone.loaded();
      setIsLoaded(true);
    } catch (error) {
      console.error("Audio engine initialization failed:", error);
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
      } else if (inst.id === 'xylophone') {
        if (xylophoneSampler.current?.loaded) {
          xylophoneSampler.current.triggerAttack(note, time);
        } else if (malletSynth.current) {
          malletSynth.current.triggerAttack(note, time);
        }
      } else if (inst.id === 'violin' && violinSynth.current) {
        violinSynth.current.triggerAttack(note, time);
      } else {
        genericSynth.current?.triggerAttack(note, time);
      }
      
      setActiveNotes(prev => new Set(prev).add(note));
    } else if (type === 'percussive') {
      if (drumPlayers.current) {
        try {
          const player = drumPlayers.current.player(note);
          if (player) player.start(time);
        } catch (e) {
          console.warn(`Could not play drum sample: ${note}`);
        }
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
      } else if (inst.id === 'xylophone') {
        if (xylophoneSampler.current?.loaded) {
          xylophoneSampler.current.triggerRelease(note, time);
        } else if (malletSynth.current) {
          malletSynth.current.triggerRelease(note, time);
        }
      } else if (inst.id === 'violin' && violinSynth.current) {
        violinSynth.current.triggerRelease(note, time);
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

import { Piano, Drum, Music, Guitar, Mic2, Wind, Speaker } from 'lucide-react';

export type InstrumentType = 'melodic' | 'percussive';

export interface Instrument {
  id: string;
  name: string;
  type: InstrumentType;
  icon: any;
  category: string;
}

export const INSTRUMENTS: Instrument[] = [
  { id: 'piano', name: 'Grand Piano', type: 'melodic', icon: Piano, category: 'Keyboards' },
  { id: 'drums', name: 'Studio Drums', type: 'percussive', icon: Drum, category: 'Percussion' },
  { id: 'ukulele', name: 'Ukulele', type: 'melodic', icon: Music, category: 'Strings' },
  { id: 'xylophone', name: 'Xylophone', type: 'melodic', icon: Speaker, category: 'Mallets' },
  { id: 'guitar', name: 'Acoustic Guitar', type: 'melodic', icon: Guitar, category: 'Strings' },
  { id: 'violin', name: 'Orchestral Violin', type: 'melodic', icon: Music, category: 'Strings' },
  { id: 'flute', name: 'Pan Flute', type: 'melodic', icon: Wind, category: 'Woodwind' },
  { id: 'clarinet', name: 'Clarinet', type: 'melodic', icon: Wind, category: 'Woodwind' },
];

export const PIANO_KEYS = [
  { note: 'C4', label: 'C', isBlack: false },
  { note: 'C#4', label: 'C#', isBlack: true },
  { note: 'D4', label: 'D', isBlack: false },
  { note: 'D#4', label: 'D#', isBlack: true },
  { note: 'E4', label: 'E', isBlack: false },
  { note: 'F4', label: 'F', isBlack: false },
  { note: 'F#4', label: 'F#', isBlack: true },
  { note: 'G4', label: 'G', isBlack: false },
  { note: 'G#4', label: 'G#', isBlack: true },
  { note: 'A4', label: 'A', isBlack: false },
  { note: 'A#4', label: 'A#', isBlack: true },
  { note: 'B4', label: 'B', isBlack: false },
  { note: 'C5', label: 'C', isBlack: false },
  { note: 'C#5', label: 'C#', isBlack: true },
  { note: 'D5', label: 'D', isBlack: false },
  { note: 'D#5', label: 'D#', isBlack: true },
  { note: 'E5', label: 'E', isBlack: false },
  { note: 'F5', label: 'F', isBlack: false },
  { note: 'F#5', label: 'F#', isBlack: true },
  { note: 'G5', label: 'G', isBlack: false },
  { note: 'G#5', label: 'G#', isBlack: true },
  { note: 'A5', label: 'A', isBlack: false },
  { note: 'A#5', label: 'A#', isBlack: true },
  { note: 'B5', label: 'B', isBlack: false },
  { note: 'C6', label: 'C', isBlack: false },
];

export const DRUM_PADS = [
  { id: 'kick', name: 'Kick', note: 'C1', color: 'bg-red-500' },
  { id: 'snare', name: 'Snare', note: 'D1', color: 'bg-blue-500' },
  { id: 'hihat_closed', name: 'Hi-Hat (Cl)', note: 'F#1', color: 'bg-yellow-500' },
  { id: 'hihat_open', name: 'Hi-Hat (Op)', note: 'G#1', color: 'bg-yellow-600' },
  { id: 'tom_low', name: 'Tom Low', note: 'F1', color: 'bg-purple-500' },
  { id: 'tom_mid', name: 'Tom Mid', note: 'G1', color: 'bg-purple-600' },
  { id: 'tom_high', name: 'Tom High', note: 'A1', color: 'bg-purple-700' },
  { id: 'crash', name: 'Crash', note: 'C#2', color: 'bg-orange-500' },
];

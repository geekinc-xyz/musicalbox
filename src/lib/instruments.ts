import { Piano, Drum, Music, Speaker } from 'lucide-react';

export type InstrumentType = 'melodic' | 'percussive';

export interface Instrument {
  id: string;
  name: string;
  type: InstrumentType;
  icon: any;
  category: string;
}

export const INSTRUMENTS: Instrument[] = [
  { id: 'piano', name: 'Piano', type: 'melodic', icon: Piano, category: 'Keyboards' },
  { id: 'drums', name: 'Drums', type: 'percussive', icon: Drum, category: 'Percussion' },
  { id: 'xylophone', name: 'Xylophone', type: 'melodic', icon: Speaker, category: 'Mallets' },
  { id: 'violin', name: 'Violin', type: 'melodic', icon: Music, category: 'Strings' },
];

export const PIANO_KEYS = [
  { note: 'C4', label: 'C', solfege: 'Do', alpha: 'C', numeric: '1', isBlack: false, color: '#ff4d4d' },
  { note: 'C#4', label: 'C#', solfege: 'Do#', alpha: 'C#', numeric: '1#', isBlack: true, color: '#ff4d4d' },
  { note: 'D4', label: 'D', solfege: 'Ré', alpha: 'D', numeric: '2', isBlack: false, color: '#ffa64d' },
  { note: 'D#4', label: 'D#', solfege: 'Ré#', alpha: 'D#', numeric: '2#', isBlack: true, color: '#ffa64d' },
  { note: 'E4', label: 'E', solfege: 'Mi', alpha: 'E', numeric: '3', isBlack: false, color: '#ffff4d' },
  { note: 'F4', label: 'F', solfege: 'Fa', alpha: 'F', numeric: '4', isBlack: false, color: '#4dff4d' },
  { note: 'F#4', label: 'F#', solfege: 'Fa#', alpha: 'F#', numeric: '4#', isBlack: true, color: '#4dff4d' },
  { note: 'G4', label: 'G', solfege: 'Sol', alpha: 'G', numeric: '5', isBlack: false, color: '#4dffff' },
  { note: 'G#4', label: 'G#', solfege: 'Sol#', alpha: 'G#', numeric: '5#', isBlack: true, color: '#4dffff' },
  { note: 'A4', label: 'A', solfege: 'La', alpha: 'A', numeric: '6', isBlack: false, color: '#4d4dff' },
  { note: 'A#4', label: 'A#', solfege: 'La#', alpha: 'A#', numeric: '6#', isBlack: true, color: '#4d4dff' },
  { note: 'B4', label: 'B', solfege: 'Si', alpha: 'B', numeric: '7', isBlack: false, color: '#a64dff' },
  { note: 'C5', label: 'C', solfege: 'Do', alpha: 'C', numeric: '8', isBlack: false, color: '#ff4dff' },
  { note: 'C#5', label: 'C#', solfege: 'Do#', alpha: 'C#', numeric: '8#', isBlack: true, color: '#ff4dff' },
  { note: 'D5', label: 'D', solfege: 'Ré', alpha: 'D', numeric: '9', isBlack: false, color: '#ff4d4d' },
  { note: 'D#5', label: 'D#', solfege: 'Ré#', alpha: 'D#', numeric: '9#', isBlack: true, color: '#ff4d4d' },
  { note: 'E5', label: 'E', solfege: 'Mi', alpha: 'E', numeric: '10', isBlack: false, color: '#ffa64d' },
  { note: 'F5', label: 'F', solfege: 'Fa', alpha: 'F', numeric: '11', isBlack: false, color: '#ffff4d' },
  { note: 'F#5', label: 'F#', solfege: 'Fa#', alpha: 'F#', numeric: '11#', isBlack: true, color: '#ffff4d' },
  { note: 'G5', label: 'G', solfege: 'Sol', alpha: 'G', numeric: '12', isBlack: false, color: '#4dff4d' },
  { note: 'G#5', label: 'G#', solfege: 'Sol#', alpha: 'G#', numeric: '12#', isBlack: true, color: '#4dff4d' },
  { note: 'A5', label: 'A', solfege: 'La', alpha: 'A', numeric: '13', isBlack: false, color: '#4dffff' },
  { note: 'A#5', label: 'A#', solfege: 'La#', alpha: 'A#', numeric: '13#', isBlack: true, color: '#4dffff' },
  { note: 'B5', label: 'B', solfege: 'Si', alpha: 'B', numeric: '14', isBlack: false, color: '#4d4dff' },
  { note: 'C6', label: 'C', solfege: 'Do', alpha: 'C', numeric: '15', isBlack: false, color: '#a64dff' },
];

export const DRUM_PADS = [
  { id: 'kick', name: 'Kick', note: 'kick', color: 'bg-red-500' },
  { id: 'snare', name: 'Snare', note: 'snare', color: 'bg-blue-500' },
  { id: 'hihat_closed', name: 'Hi-Hat', note: 'hihat', color: 'bg-yellow-500' },
  { id: 'tom_low', name: 'Floor Tom', note: 'tom1', color: 'bg-purple-500' },
  { id: 'tom_mid', name: 'Mid Tom', note: 'tom2', color: 'bg-purple-600' },
  { id: 'tom_high', name: 'High Tom', note: 'tom3', color: 'bg-purple-700' },
];

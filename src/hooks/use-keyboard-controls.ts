"use client"

import { useEffect } from 'react';

const KEY_MAP: Record<string, string> = {
  'a': 'C4',
  'w': 'C#4',
  's': 'D4',
  'e': 'D#4',
  'd': 'E4',
  'f': 'F4',
  't': 'F#4',
  'g': 'G4',
  'y': 'G#4',
  'h': 'A4',
  'u': 'A#4',
  'j': 'B4',
  'k': 'C5',
  'o': 'C#5',
  'l': 'D5',
  'p': 'D#5',
  ';': 'E5',
  "'": 'F5',
};

interface UseKeyboardControlsProps {
  onPlay: (note: string) => void;
  onStop: (note: string) => void;
  enabled: boolean;
}

export function useKeyboardControls({ onPlay, onStop, enabled }: UseKeyboardControlsProps) {
  useEffect(() => {
    if (!enabled) return;

    const pressedKeys = new Set<string>();

    const handleKeyDown = (e: KeyboardEvent) => {
      const note = KEY_MAP[e.key.toLowerCase()];
      if (note && !pressedKeys.has(e.key.toLowerCase())) {
        pressedKeys.add(e.key.toLowerCase());
        onPlay(note);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const note = KEY_MAP[e.key.toLowerCase()];
      if (note) {
        pressedKeys.delete(e.key.toLowerCase());
        onStop(note);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [enabled, onPlay, onStop]);
}

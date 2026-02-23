"use client"

import { useEffect, useRef, useState } from 'react';
import { Activity } from 'lucide-react';

interface VisualizerProps {
  analyzer: AnalyserNode | null;
  isActive: boolean;
}

export function Visualizer({ analyzer, isActive }: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !canvasRef.current || !analyzer) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyzer.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height;

        const hue = 238 + (i / bufferLength) * 40; // Shift from electric blue to violet
        const alpha = isActive ? (dataArray[i] / 255) * 0.8 + 0.2 : 0.1;

        ctx.fillStyle = `hsla(${hue}, 84%, 62%, ${alpha})`;
        
        // Draw bars with rounded tops
        const radius = 2;
        ctx.beginPath();
        ctx.roundRect(x, canvas.height - barHeight, barWidth - 1, barHeight, [radius, radius, 0, 0]);
        ctx.fill();

        x += barWidth;
      }
    };

    draw();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [analyzer, isActive, isClient]);

  if (!isClient) return null;

  return (
    <div className="bg-muted/10 border border-border/40 rounded-[2.5rem] p-10 space-y-8 lg:col-span-2 min-h-[260px] backdrop-blur-sm relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex items-center justify-between">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">SPECTRAL DYNAMICS</h4>
        <Activity className="w-4 h-4 text-muted-foreground/60" />
      </div>
      
      <div className="relative h-32 w-full overflow-hidden">
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={128} 
          className="w-full h-full"
        />
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground/20 animate-pulse">SYSTEM STANDBY</span>
          </div>
        )}
      </div>
      
      <div className="flex justify-between text-[9px] font-black text-muted-foreground/40 tracking-[0.3em] uppercase">
        <span>20Hz</span>
        <span>Sub</span>
        <span>Low</span>
        <span>Mid</span>
        <span>High</span>
        <span>Air</span>
        <span>20kHz</span>
      </div>
    </div>
  );
}

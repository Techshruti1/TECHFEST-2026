"use client";

import { useEffect, useState } from "react";
import { sound } from "@/utils/sound";

interface LoaderProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "CORE: INITIALIZING TECHFEST CORES...",
  "AUDIO: SYNTHESIZING WAVEGUIDE ARRAYS...",
  "GL: STABILIZING HOLOGRAPHIC CHIPS...",
  "WEBGL: LOADING 3D STAR SYSTEM...",
  "AI: BOOTING QUANTUM HELPER ASSISTANT...",
  "HUD: ESTABLISHING GLASSMORPHIC LAYER...",
  "DEVICES: MAPPING GESTURES & CURSOR CONTROLS...",
  "SYSTEM: CALIBRATING LENIS SMOOTH FLOWS...",
  "WARP DRIVE: READY FOR CINEMATIC EXPEDITION."
];

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Increment loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        // Random glitch noise occasionally
        if (Math.random() > 0.7) {
          sound.playGlitch();
        }

        const nextVal = prev + Math.floor(Math.random() * 8) + 1;
        return nextVal > 100 ? 100 : nextVal;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Cycle through logs as progress advances
    const targetLogIndex = Math.min(
      Math.floor((progress / 100) * BOOT_LOGS.length),
      BOOT_LOGS.length - 1
    );
    if (targetLogIndex !== logIndex) {
      setLogIndex(targetLogIndex);
    }

    if (progress === 100) {
      sound.playSuccess();
      const timeout = setTimeout(() => {
        setVisible(false);
        onComplete();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [progress, logIndex, onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 bg-[#060B24] z-[99999] flex flex-col items-center justify-center p-6 transition-all duration-1000 ${
        progress === 100 ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      }`}
    >
      {/* Background Cyber HUD Grid lines */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#060B24] to-black opacity-80" />

      {/* Main Loader Content */}
      <div className="relative flex flex-col items-center max-w-md w-full text-center z-10">
        
        {/* Animated Cyber Logo */}
        <div className="relative mb-8 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-green rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
          <div className="relative px-8 py-5 bg-[#060B24] border border-cyber-cyan/30 rounded-lg">
            <h1 className="text-4xl md:text-5xl font-extrabold font-space tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] via-[#8B5CF6] to-[#7CFFCB] animate-pulse">
              TECHFEST
            </h1>
            <div className="absolute bottom-1 right-3 text-[10px] tracking-widest text-cyber-cyan font-mono opacity-80">
              V.2026
            </div>
          </div>
        </div>

        {/* Console Log Terminal */}
        <div className="w-full bg-black/60 border border-white/10 rounded-md p-4 mb-6 font-mono text-[11px] text-left text-cyber-cyan/95 shadow-[0_0_20px_rgba(6,11,36,0.5)] h-28 overflow-hidden">
          <div className="text-white/40 mb-1">&gt; SYSTEM STARTUP PROCESS DETECTED...</div>
          <div className="text-cyber-green/90 mb-1">
            &gt; STATUS: OK
          </div>
          {BOOT_LOGS.slice(0, logIndex + 1).map((log, index) => (
            <div key={index} className="truncate animate-pulse">
              &gt; {log}
            </div>
          ))}
          <div className="w-1 h-3 bg-cyber-cyan inline-block animate-glitch ml-1" />
        </div>

        {/* Progress Value */}
        <div className="flex justify-between w-full font-space text-xs text-white/70 mb-2 px-1">
          <span className="tracking-widest font-mono">ESTABLISHING CONCURRENT SPACE SYNC</span>
          <span className="text-cyber-cyan font-bold">{progress}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden relative shadow-[0_0_8px_rgba(0,245,255,0.1)]">
          <div
            className="h-full bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-green transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* Decorative HUD Details */}
      <div className="absolute top-6 left-6 font-mono text-[10px] text-white/30 hidden md:block">
        SYS_VER: 0.12.9<br />
        LOC: GEO_ORBIT_2026
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-[10px] text-white/30 hidden md:block text-right">
        SECURITY: COMPLIANT<br />
        STABILITY: 99.98%
      </div>
    </div>
  );
}

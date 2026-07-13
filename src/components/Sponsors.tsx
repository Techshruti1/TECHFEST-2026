"use client";

import { motion } from "framer-motion";
import { Cpu, ShieldCheck, Zap, Disc, Sparkles, Orbit } from "lucide-react";

export default function Sponsors() {
  const sponsors = [
    { name: "ORION DYNAMICS", icon: Orbit },
    { name: "CYBERDYNE LOGIC", icon: Cpu },
    { name: "APEX QUANTUM", icon: Zap },
    { name: "NEURAL LINKER", icon: Disc },
    { name: "KRONOS SPACETECH", icon: Sparkles },
    { name: "SECURE LABS", icon: ShieldCheck }
  ];

  return (
    <section
      id="sponsors"
      className="relative py-20 px-6 z-10 scroll-mt-10 overflow-hidden bg-black/30 border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold font-space tracking-tight mb-4">
            MISSION <span className="text-cyber-green">PARTNERS</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyber-green to-cyber-cyan mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-white/70 text-sm md:text-base font-inter">
            Collaborating with global corporations leading the futuristic technology race.
          </p>
        </div>

        {/* Double Row Marquee */}
        <div className="space-y-6 max-w-6xl mx-auto flex flex-col items-center">
          
          {/* Row 1: Leftward Infinite Loop */}
          <div className="w-full overflow-hidden flex relative py-4 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-20 before:bg-gradient-to-r before:from-[#060B24] before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-20 after:bg-gradient-to-l after:from-[#060B24] after:to-transparent after:z-10">
            <div className="flex space-x-12 animate-grid-move whitespace-nowrap min-w-full">
              {/* Duplicate list to enable continuous smooth scrolling */}
              {[...sponsors, ...sponsors].map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div
                    key={idx}
                    className="inline-flex items-center space-x-3 glass-panel px-6 py-3 rounded-md border border-white/5 hover:border-cyber-cyan/30 hover:scale-105 transition-all cursor-pointer group hover-target"
                  >
                    <Icon className="w-5 h-5 text-white/50 group-hover:text-cyber-cyan transition-colors" />
                    <span className="font-space font-extrabold text-xs tracking-widest text-white/60 group-hover:text-white transition-colors">
                      {s.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Row 2: Rightward Infinite Loop */}
          <div className="w-full overflow-hidden flex relative py-4 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-20 before:bg-gradient-to-r before:from-[#060B24] before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-20 after:bg-gradient-to-l after:from-[#060B24] after:to-transparent after:z-10">
            {/* Reverse scrolling class or custom inline keyframe style */}
            <div
              className="flex space-x-12 whitespace-nowrap min-w-full"
              style={{
                animation: "grid-move 20s linear infinite reverse"
              }}
            >
              {[...sponsors, ...sponsors].reverse().map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div
                    key={idx}
                    className="inline-flex items-center space-x-3 glass-panel px-6 py-3 rounded-md border border-white/5 hover:border-cyber-purple/30 hover:scale-105 transition-all cursor-pointer group hover-target"
                  >
                    <Icon className="w-5 h-5 text-white/50 group-hover:text-cyber-purple transition-colors" />
                    <span className="font-space font-extrabold text-xs tracking-widest text-white/60 group-hover:text-white transition-colors">
                      {s.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

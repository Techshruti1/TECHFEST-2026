"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { sound } from "@/utils/sound";
import { ChevronLeft, ChevronRight, PlayCircle, Clock } from "lucide-react";

interface Workshop {
  id: number;
  title: string;
  mentor: string;
  company: string;
  time: string;
  techs: string[];
  desc: string;
}

export default function Workshops() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const workshops: Workshop[] = [
    {
      id: 1,
      title: "GENERATIVE AI MODEL DESIGN",
      mentor: "Dr. Alicia Vance",
      company: "Synthetix Labs",
      time: "March 12, 02:00 PM (3 Hours)",
      techs: ["PyTorch", "LLMs", "Transformers"],
      desc: "Architect custom attention mechanisms, optimize neural weight mappings, and deploy scaled transformer checkpoints locally."
    },
    {
      id: 2,
      title: "QUANTUM HARDWARE PROGRAMMING",
      mentor: "Marcus Brody",
      company: "Qubit Corp",
      time: "March 13, 10:00 AM (4 Hours)",
      techs: ["Qiskit", "Superconducting Gates", "Error Correction"],
      desc: "Implement entanglement circuits, configure phase gates, and run noise mitigation routines on live quantum simulations."
    },
    {
      id: 3,
      title: "AUTONOMOUS ROVER NAVIGATION",
      mentor: "Lt. Chen Wei",
      company: "Deep Space Logistics",
      time: "March 13, 04:00 PM (3 Hours)",
      techs: ["ROS2", "LiDAR", "SLAM Mapping"],
      desc: "Integrate point-cloud SLAM telemetry, write path-finding algorithms, and control virtual Martian drones."
    },
    {
      id: 4,
      title: "SECURE DECENTRALIZED PROTOCOLS",
      mentor: "Sarah Jenkins",
      company: "Web3 Foundation",
      time: "March 14, 02:00 PM (3 Hours)",
      techs: ["Rust", "Zero Knowledge Proofs", "WASM"],
      desc: "Construct zero-knowledge verification nodes, write optimized Rust smart contracts, and deploy on modular networks."
    }
  ];

  const handleNext = () => {
    sound.playClick();
    setActiveIndex((prev) => (prev + 1) % workshops.length);
  };

  const handlePrev = () => {
    sound.playClick();
    setActiveIndex((prev) => (prev - 1 + workshops.length) % workshops.length);
  };

  // Autoplay loop
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % workshops.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="workshops"
      className="relative min-h-screen py-20 px-6 z-10 scroll-mt-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold font-space tracking-tight mb-4">
            COSMIC <span className="text-cyber-green">WORKSHOPS</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyber-green to-cyber-cyan mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-white/70 text-sm md:text-base font-inter">
            Deep dive into technical training led by pioneering developers. Get certified in frontier software frameworks.
          </p>
        </div>

        {/* 3D Carousel container */}
        <div className="relative flex flex-col items-center justify-center min-h-[420px]">
          
          <div
            ref={sliderRef}
            className="relative w-full max-w-4xl flex items-center justify-center h-[360px]"
          >
            {workshops.map((w, index) => {
              // Calculate positioning offsets for 3D look
              const offset = index - activeIndex;
              const isCenter = index === activeIndex;
              const isLeft = index === (activeIndex - 1 + workshops.length) % workshops.length;
              const isRight = index === (activeIndex + 1) % workshops.length;
              
              // Only render adjacent ones for styling cleaness
              let opacity = 0;
              let scale = 0.8;
              let zIndex = 0;
              let translateX = "0%";
              let rotateY = 0;

              if (isCenter) {
                opacity = 1;
                scale = 1;
                zIndex = 10;
                translateX = "0%";
                rotateY = 0;
              } else if (isLeft) {
                opacity = 0.4;
                scale = 0.85;
                zIndex = 5;
                translateX = "-75%";
                rotateY = 25;
              } else if (isRight) {
                opacity = 0.4;
                scale = 0.85;
                zIndex = 5;
                translateX = "75%";
                rotateY = -25;
              }

              // Hide far away slides
              if (!isCenter && !isLeft && !isRight) {
                return null;
              }

              return (
                <div
                  key={w.id}
                  onClick={() => {
                    if (!isCenter) {
                      sound.playClick();
                      setActiveIndex(index);
                    }
                  }}
                  className="absolute w-[90%] sm:w-[500px] h-full transition-all duration-700 ease-out cursor-pointer"
                  style={{
                    transform: `translateX(${translateX}) scale(${scale}) rotateY(${rotateY}deg)`,
                    opacity,
                    zIndex,
                  }}
                >
                  <div className="glass-panel w-full h-full p-6 sm:p-8 rounded-xl border border-white/10 hover:border-cyber-green/40 shadow-2xl flex flex-col justify-between overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div>
                      {/* Top bar info */}
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-2 text-white/40">
                          <Clock className="w-3.5 h-3.5 text-cyber-green" />
                          <span className="font-mono text-[10px] tracking-wider uppercase">
                            {w.time}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-cyber-green bg-cyber-green/10 border border-cyber-green/20 px-2 py-0.5 rounded">
                          0{w.id}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-space font-extrabold text-lg sm:text-xl tracking-wider text-white mb-2 uppercase">
                        {w.title}
                      </h3>

                      {/* Mentor block */}
                      <div className="text-xs mb-4">
                        <span className="text-white/40">Led by </span>
                        <span className="text-white font-bold">{w.mentor}</span>
                        <span className="text-cyber-green font-mono"> // {w.company}</span>
                      </div>

                      {/* Tech Pills */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {w.techs.map((t, idx) => (
                          <span key={idx} className="text-[9px] font-mono tracking-wider bg-white/5 border border-white/5 rounded px-2.5 py-0.5 text-white/80">
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Desc */}
                      <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-inter line-clamp-3">
                        {w.desc}
                      </p>
                    </div>

                    {/* CTA Register Button */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase">
                        SEATS RESTRICTED
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playSuccess();
                          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="flex items-center space-x-2 text-xs font-space tracking-widest uppercase text-cyber-green hover:text-white transition-colors hover-target"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>BOOK MODULE</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}

          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center space-x-6 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 bg-white/5 border border-white/10 hover:border-cyber-green/50 text-white rounded-full transition-all hover:scale-110 hover-target"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-mono text-xs tracking-widest text-white/40">
              0{activeIndex + 1} / 0{workshops.length}
            </span>
            <button
              onClick={handleNext}
              className="p-3 bg-white/5 border border-white/10 hover:border-cyber-green/50 text-white rounded-full transition-all hover:scale-110 hover-target"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

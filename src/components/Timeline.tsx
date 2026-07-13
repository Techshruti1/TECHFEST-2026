"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { sound } from "@/utils/sound";
import { Compass, ShieldCheck, Award } from "lucide-react";

interface Milestone {
  day: string;
  time: string;
  title: string;
  desc: string;
  icon: any;
  tag: string;
}

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const milestones: Milestone[] = [
    {
      day: "DAY 1",
      time: "MARCH 12, 09:00 AM",
      title: "KEYNOTE ODYSSEY: FIRST FLIGHT",
      desc: "Opening declarations from futuristic visionaries, launching the 36-hour CodeWarp hackathon, and booting the server clusters.",
      icon: Compass,
      tag: "COMMENCEMENT"
    },
    {
      day: "DAY 2",
      time: "MARCH 13, 01:00 PM",
      title: "ROBOBRAWL AND TECH PANELS",
      desc: "Robot combat qualifying matches, high-altitude drone payloads, and industry panels debating neural interfaces.",
      icon: ShieldCheck,
      tag: "MIDPOINT"
    },
    {
      day: "DAY 3",
      time: "MARCH 14, 04:00 PM",
      title: "FINAL PITCH & AWARDS NIGHT",
      desc: "Top hackathon teams present to quantum investors, final robotic tournament champions declared, and modular synth afterparty.",
      icon: Award,
      tag: "CONCLUSION"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far down the timeline container is scrolled
      const elementHeight = rect.height;
      const visibleStart = windowHeight - rect.top; // pixel height visible from bottom of screen
      
      let progress = 0;
      if (visibleStart > 0) {
        progress = visibleStart / (elementHeight + windowHeight * 0.4);
      }
      
      const cappedProgress = Math.max(0, Math.min(1, progress));
      setScrollProgress(cappedProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on load
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="timeline"
      className="relative min-h-screen py-20 px-6 z-10 scroll-mt-10"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold font-space tracking-tight mb-4">
            MISSION <span className="text-cyber-cyan">TIMELINE</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-purple mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-white/70 text-sm md:text-base font-inter">
            Follow the chronological progress of the events, panels, and championships.
          </p>
        </div>

        {/* Timeline Path Structure */}
        <div
          ref={containerRef}
          className="relative max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Timeline Center Axis Line */}
          <div className="absolute top-0 bottom-0 w-[2px] bg-white/10 left-1/2 -translate-x-1/2" />
          
          {/* Scroll-Progress Line overlay */}
          <div
            className="absolute top-0 w-[2px] bg-gradient-to-b from-cyber-cyan via-cyber-purple to-cyber-green left-1/2 -translate-x-1/2 transition-all duration-150 ease-out origin-top"
            style={{ height: `${scrollProgress * 100}%` }}
          />

          {/* Scrolling Rocket / Marker Element */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#060B24] border-2 border-cyber-cyan shadow-[0_0_15px_rgba(0,245,255,0.8)] z-20 flex items-center justify-center transition-all duration-150 ease-out"
            style={{ top: `${scrollProgress * 98}%` }}
          >
            <div className="w-2 h-2 rounded-full bg-cyber-green animate-ping" />
          </div>

          {/* Milestones Card Generation */}
          <div className="w-full flex flex-col space-y-16 py-8">
            {milestones.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center justify-center w-full relative ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Space Spacer for Desktop layout */}
                  <div className="w-full md:w-1/2 hidden md:block" />

                  {/* Axis Node Indicator */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 border-white/20 bg-[#060B24] z-10 hidden md:block" />

                  {/* Card Block */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-[45%] glass-panel p-6 rounded-xl border border-white/5 relative hover:border-cyber-cyan/30 transition-colors shadow-xl"
                  >
                    {/* Corner Tag */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[9px] font-mono text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/15 px-2.5 py-0.5 rounded tracking-widest">
                        {item.day} // {item.tag}
                      </span>
                      <span className="text-[10px] font-mono text-white/40">
                        {item.time}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-white/5 rounded border border-white/10 text-white">
                        <Icon className="w-4 h-4 text-cyber-cyan" />
                      </div>
                      <h3 className="font-space font-bold text-sm md:text-base tracking-wider text-white uppercase">
                        {item.title}
                      </h3>
                    </div>

                    {/* Desc */}
                    <p className="text-white/70 text-xs md:text-sm leading-relaxed font-inter">
                      {item.desc}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Cpu, Rocket, ShieldCheck, HelpCircle } from "lucide-react";

export default function About() {
  const pillars = [
    {
      icon: Cpu,
      title: "Neural Architectures",
      desc: "Dive deep into synthetic intelligence, neural engineering, and advanced cognitive systems shaping tomorrow.",
      color: "border-cyber-cyan/30 text-cyber-cyan hover:shadow-[0_0_20px_rgba(0,245,255,0.15)]",
    },
    {
      icon: Rocket,
      title: "Interstellar Space Tech",
      desc: "Explore space propulsion, orbit telemetry, satellite communication, and galactic navigation systems.",
      color: "border-cyber-purple/30 text-cyber-purple hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]",
    },
    {
      icon: ShieldCheck,
      title: "Cyber Security Protocol",
      desc: "Architect cryptographic barriers, blockchain meshes, and hyper-secure decentralization layers.",
      color: "border-cyber-green/30 text-cyber-green hover:shadow-[0_0_20px_rgba(124,255,203,0.15)]",
    }
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center items-center py-20 px-6 z-10 scroll-mt-10"
    >
      {/* Aesthetic glowing orbits */}
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-cyber-purple/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[300px] h-[300px] bg-cyber-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold font-space tracking-tight mb-4"
          >
            ABOUT THE <span className="text-cyber-cyan">ODYSSEY</span>
          </motion.h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-purple mx-auto mb-6" />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-white/70 font-inter text-sm md:text-base leading-relaxed"
          >
            TECHFEST 2026 is the ultimate galactic platform for technologists, engineers, and dreamers to collaborate on building the digital and spatial frontiers of humanity.
          </motion.p>
        </div>

        {/* Info Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Futuristic Text Block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-8 rounded-lg border border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-cyan/5 rounded-full blur-xl pointer-events-none" />
            <h3 className="text-xl md:text-2xl font-space font-bold mb-4 text-white">
              Bridging Today and 2050
            </h3>
            <p className="text-white/80 text-sm leading-relaxed mb-4 font-inter">
              Over the course of three action-packed days, delegates will explore groundbreaking technologies through a hybrid array of tech panels, research showcases, hacking sessions, and cosmic exhibits.
            </p>
            <p className="text-white/80 text-sm leading-relaxed font-inter">
              Our mission is to foster innovation that transcends standard planetary limits. Join us on this journey as we program the quantum circuits and align the stellar trajectories of our digital future.
            </p>
          </motion.div>

          {/* Interactive Core Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`glass-panel p-6 rounded-lg border transition-all duration-300 ${pillar.color} flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 hover-target`}
                >
                  <div className="p-3 bg-white/5 rounded-md border border-white/10">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-space font-bold text-sm tracking-wider uppercase mb-1 text-white">
                      {pillar.title}
                    </h4>
                    <p className="text-white/60 text-xs leading-normal font-inter">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { tag: "03", desc: "DAYS OF INTENSITY" },
            { tag: "50+", desc: "GLOBAL KEYNOTES" },
            { tag: "20+", desc: "COSMIC WORKSHOPS" },
            { tag: "300+", desc: "ACADEMIC SPONSORS" }
          ].map((item, index) => (
            <div
              key={index}
              className="glass-panel py-6 px-4 rounded-lg border border-white/5 text-center flex flex-col items-center justify-center shadow-lg relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyber-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-3xl md:text-4xl font-extrabold font-space text-cyber-cyan mb-1">
                {item.tag}
              </span>
              <span className="text-[9px] md:text-[10px] font-mono tracking-widest text-white/50 uppercase">
                {item.desc}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

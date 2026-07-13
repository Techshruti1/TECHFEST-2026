"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { sound } from "@/utils/sound";
import { ArrowRight, Terminal } from "lucide-react";

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [typedText, setTypedText] = useState("");
  const fullMessage = "DISCOVER THE FUTURE OF QUANTUM NETWORKING, SYNTHETIC AI & INTERPLANETARY ROBOTICS...";

  // Countdown timer calculator
  useEffect(() => {
    const targetDate = new Date("December 12, 2026 09:00:00").getTime();
    let timerInterval: NodeJS.Timeout | undefined = undefined;

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (timerInterval) clearInterval(timerInterval);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);

    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, []);

  // Keyboard typing emulation effect
  useEffect(() => {
    let index = 0;
    const typing = setInterval(() => {
      setTypedText((prev) => prev + fullMessage.charAt(index));
      index++;
      if (index >= fullMessage.length) {
        clearInterval(typing);
      }
    }, 60);

    return () => clearInterval(typing);
  }, []);

  const handleRegisterClick = () => {
    sound.playSuccess();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleExploreClick = () => {
    sound.playClick();
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const stats = [
    { value: "15,000+", label: "ATTENDEES" },
    { value: "60+", label: "CYBER EVENTS" },
    { value: "120+", label: "UNIVERSITIES" },
    { value: "$75,000+", label: "PRIZE POOL" }
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-24 md:pt-32 overflow-hidden z-10 select-none"
    >
      {/* HUD Radial Light Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyber-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[300px] h-[300px] bg-cyber-purple/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        
        {/* Terminal Header Info */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md"
        >
          <Terminal className="w-3.5 h-3.5 text-cyber-cyan" />
          <span className="text-[10px] md:text-[11px] font-mono tracking-widest text-white/80 uppercase">
            ORIGIN DETECTED: DEEP_SPACE_ORBIT // GRID_ESTABLISHED
          </span>
        </motion.div>

        {/* Dynamic Title Glitch */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold font-space tracking-tighter leading-none mb-4 text-white"
        >
          TECHFEST <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-green">2026</span>
        </motion.h1>

        {/* Typed Subheading */}
        <div className="h-12 md:h-8 max-w-2xl text-center mb-10">
          <p className="font-mono text-xs md:text-sm tracking-wider text-cyber-cyan/90 leading-relaxed uppercase">
            {typedText}
            <span className="w-1 h-3 bg-cyber-cyan inline-block animate-pulse ml-1" />
          </p>
        </div>

        {/* Digital Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-4 gap-3 sm:gap-6 max-w-xl w-full mb-12"
        >
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div
              key={unit}
              className="glass-panel rounded-lg py-4 px-2 flex flex-col items-center border border-white/5 shadow-lg relative overflow-hidden group hover:border-cyber-cyan/30 transition-colors"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-space text-white tracking-tight">
                {String(value).padStart(2, "0")}
              </span>
              <span className="text-[9px] md:text-[10px] font-mono tracking-widest text-white/40 uppercase mt-1">
                {unit}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Magnetic CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 w-full max-w-md mb-16"
        >
          <button
            onClick={handleRegisterClick}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-cyber-cyan to-cyber-purple hover:from-cyber-purple hover:to-cyber-green text-black font-space font-bold text-xs tracking-widest uppercase rounded shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:shadow-[0_0_35px_rgba(139,92,246,0.5)] transition-all transform hover:-translate-y-0.5 hover-target"
          >
            Launch Registration
          </button>
          
          <button
            onClick={handleExploreClick}
            className="w-full sm:w-auto px-8 py-3.5 bg-white/5 border border-white/10 hover:border-cyber-cyan text-white hover:text-cyber-cyan font-space text-xs tracking-widest uppercase rounded flex items-center justify-center space-x-2 transition-all hover-target"
          >
            <span>Explore Galaxy</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Animated Statistics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 w-full max-w-5xl py-8 border-y border-white/5 backdrop-blur-sm bg-[#060B24]/40"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-extrabold font-space text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                {stat.value}
              </span>
              <span className="text-[9px] md:text-[10px] font-mono tracking-widest text-cyber-cyan mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

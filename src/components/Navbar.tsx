"use client";

import { useState, useEffect } from "react";
import { sound } from "@/utils/sound";
import { Volume2, VolumeX, Menu, X, Cpu } from "lucide-react";

export default function Navbar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Background color shift when scrolled
      setScrolled(window.scrollY > 40);

      // Scroll progress computation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const active = sound.toggleAmbient();
    setIsPlaying(active);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
      sound.playClick();
    }
  };

  const navLinks = [
    { label: "Hero", id: "hero" },
    { label: "About", id: "about" },
    { label: "Events", id: "events" },
    { label: "Workshops", id: "workshops" },
    { label: "Leaderboard", id: "competitions" },
    { label: "Timeline", id: "timeline" },
    { label: "Sponsors", id: "sponsors" },
    { label: "Gallery", id: "gallery" },
    { label: "FAQ", id: "faq" },
    { label: "Contact", id: "contact" }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cyber-black/70 backdrop-blur-md border-b border-cyber-cyan/15 py-3"
          : "bg-transparent py-5"
      }`}
    >
      {/* Top scroll status indicator */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-green transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />

      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Futuristic Brand Logo */}
        <div
          onClick={() => scrollToSection("hero")}
          className="flex items-center space-x-2 cursor-pointer group"
        >
          <Cpu className="w-6 h-6 text-cyber-cyan animate-pulse group-hover:rotate-180 transition-all duration-700" />
          <span className="font-space font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-white select-none">
            TECH<span className="text-cyber-purple">FEST</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-white/70 hover:text-cyber-cyan font-space text-xs tracking-wider transition-colors uppercase relative py-1 hover-target group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyber-cyan transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* Controls & Sound System */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={handleAudioToggle}
            className={`p-2 rounded-full border transition-all hover-target ${
              isPlaying
                ? "bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan shadow-[0_0_10px_rgba(0,245,255,0.2)]"
                : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
            }`}
            title={isPlaying ? "Mute Ambient Synth" : "Play Ambient Synth"}
          >
            {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="px-5 py-1.5 font-space text-xs tracking-widest uppercase border border-cyber-cyan rounded text-cyber-cyan hover:bg-cyber-cyan hover:text-[#060B24] transition-all hover:shadow-[0_0_15px_rgba(0,245,255,0.4)] hover-target"
          >
            Register Now
          </button>
        </div>

        {/* Mobile controls & Toggle */}
        <div className="lg:hidden flex items-center space-x-4">
          <button
            onClick={handleAudioToggle}
            className={`p-2 rounded-full border transition-all ${
              isPlaying
                ? "bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan"
                : "border-white/10 text-white/50"
            }`}
          >
            {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white/80 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-y-0 right-0 w-[280px] bg-cyber-black/95 backdrop-blur-lg border-l border-white/10 z-50 flex flex-col p-6 lg:hidden animate-fade-in">
          <div className="flex justify-between items-center mb-8">
            <span className="font-space font-extrabold text-lg text-cyber-cyan">MENU</span>
            <button onClick={() => setMobileMenuOpen(false)} className="text-white/70">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col space-y-4 flex-grow overflow-y-auto">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-left text-white/70 hover:text-cyber-cyan font-space text-sm tracking-wider uppercase py-2 border-b border-white/5"
              >
                {link.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollToSection("contact")}
            className="w-full mt-auto py-3 font-space text-xs tracking-widest uppercase border border-cyber-cyan rounded text-cyber-cyan text-center hover:bg-cyber-cyan hover:text-black transition-all"
          >
            Register Now
          </button>
        </div>
      )}
    </nav>
  );
}

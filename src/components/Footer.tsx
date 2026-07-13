"use client";

import React, { useState } from "react";
import { sound } from "@/utils/sound";
import { Github, Twitter, Youtube, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    sound.playSuccess();
    setSubscribed(true);
    setEmail("");
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-cyber-black border-t border-white/5 py-12 px-6 z-10 select-none">
      
      {/* Decorative stars / bottom blur */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-cyber-purple/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        {/* About logo block */}
        <div className="space-y-4 col-span-1 md:col-span-2">
          <span className="font-space font-extrabold text-xl tracking-widest text-white uppercase">
            TECH<span className="text-cyber-cyan">FEST</span> 2026
          </span>
          <p className="text-white/60 text-xs md:text-sm font-inter leading-relaxed max-w-sm">
            Program the quantum nodes and align the stellar trajectories of our digital future. An award-winning cosmic odyssey.
          </p>
          <div className="flex space-x-3 pt-2">
            {[
              { Icon: Github, href: "https://github.com" },
              { Icon: Twitter, href: "https://twitter.com" },
              { Icon: Youtube, href: "https://youtube.com" }
            ].map((social, index) => {
              const Icon = social.Icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="p-2.5 bg-white/5 border border-white/5 hover:border-cyber-cyan/40 rounded text-white/50 hover:text-cyber-cyan transition-all hover-target"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-space font-bold text-xs tracking-widest text-white uppercase mb-4">
            Navigation
          </h4>
          <ul className="space-y-2 font-mono text-[11px] text-white/50">
            {["Hero", "About", "Events", "Workshops", "FAQ"].map((label) => (
              <li key={label}>
                <button
                  onClick={() => {
                    sound.playClick();
                    document.getElementById(label.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-cyber-cyan transition-colors uppercase hover-target"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Sub */}
        <div>
          <h4 className="font-space font-bold text-xs tracking-widest text-white uppercase mb-4">
            Payload Broadcast
          </h4>
          <p className="text-white/60 text-[11px] font-inter mb-4 leading-normal">
            Subscribe to receive telemetry updates on timeline alerts.
          </p>
          
          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex space-x-2">
              <input
                type="email"
                required
                placeholder="Operator email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black/60 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-cyber-cyan font-mono w-full"
              />
              <button
                type="submit"
                className="px-4 bg-cyber-cyan text-black font-space text-[10px] tracking-widest font-extrabold uppercase rounded hover:shadow-[0_0_12px_rgba(0,245,255,0.3)] transition-all hover-target"
              >
                SUB
              </button>
            </form>
          ) : (
            <div className="flex items-center space-x-2 text-cyber-green text-xs font-mono bg-cyber-green/5 border border-cyber-green/20 rounded p-2.5">
              <Check className="w-4 h-4" />
              <span>TRANSMISSION OK // SUBBED</span>
            </div>
          )}
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between font-mono text-[10px] text-white/40">
        <div>
          &copy; {currentYear} TECHFEST 2026. ALL TELEMETRY RECORDED.
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0 uppercase">
          <span>FPS: 60</span>
          <span className="text-cyber-cyan">SYNC: PASS</span>
          <span className="text-cyber-green">GRID: OK</span>
        </div>
      </div>

    </footer>
  );
}

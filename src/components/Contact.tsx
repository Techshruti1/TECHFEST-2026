"use client";

import React, { useState, useEffect } from "react";
import { sound } from "@/utils/sound";
import { Send, Terminal, Mail, MapPin, Phone } from "lucide-react";
import confetti from "canvas-confetti";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", query: "" });
  const [logs, setLogs] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const addLog = (text: string) => {
    setLogs((prev) => [...prev.slice(-3), text]); // Keep last 4 logs
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    
    // Play subtle glitch sound occasionally on type
    if (Math.random() > 0.85) {
      sound.playGlitch();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.query) return;

    sound.playClick();
    setSending(true);
    setLogs([]);
    
    // Simulate terminal sequences
    const steps = [
      "ESTABLISHING COMMS CONNECT...",
      "RESOLVING PROTOCOL ADDR...",
      "TRANSMITTING ENCRYPTED HEADER...",
      "TRANSMISSION COMPLETED SUCCESSFULLY."
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        addLog(step);
        if (idx < steps.length - 1) {
          sound.playGlitch();
        } else {
          sound.playSuccess();
          setSending(false);
          setSuccess(true);
          confetti({
            particleCount: 80,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ["#00F5FF", "#8B5CF6", "#7CFFCB"]
          });
          confetti({
            particleCount: 80,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ["#00F5FF", "#8B5CF6", "#7CFFCB"]
          });
        }
      }, (idx + 1) * 800);
    });
  };

  const resetForm = () => {
    setForm({ name: "", email: "", query: "" });
    setSuccess(false);
    setLogs([]);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-20 px-6 z-10 scroll-mt-10"
    >
      {/* Light spots */}
      <div className="absolute left-1/4 top-1/3 w-[300px] h-[300px] bg-cyber-green/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold font-space tracking-tight mb-4">
            TRANSMIT <span className="text-cyber-green">COMMS</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyber-green to-cyber-cyan mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-white/70 text-sm md:text-base font-inter">
            Broadcasting queries directly to TechFest mission controllers. Synchronize your parameters.
          </p>
        </div>

        {/* Layout split: Form & Map HUD info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Form + Terminal log console */}
          <div className="glass-panel p-6 sm:p-8 rounded-xl border border-white/10 relative shadow-2xl">
            
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1.5">
                      Operator Designation
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Neo"
                      value={form.name}
                      onChange={handleInputChange}
                      className="bg-black/40 border border-white/10 hover:border-white/20 focus:border-cyber-green rounded px-4 py-2.5 text-xs text-white focus:outline-none transition-colors font-mono"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1.5">
                      Subspace Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. neo@matrix.net"
                      value={form.email}
                      onChange={handleInputChange}
                      className="bg-black/40 border border-white/10 hover:border-white/20 focus:border-cyber-green rounded px-4 py-2.5 text-xs text-white focus:outline-none transition-colors font-mono"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1.5">
                    Signal payload Message
                  </label>
                  <textarea
                    name="query"
                    required
                    rows={4}
                    placeholder="Enter query specifications..."
                    value={form.query}
                    onChange={handleInputChange}
                    className="bg-black/40 border border-white/10 hover:border-white/20 focus:border-cyber-green rounded px-4 py-2.5 text-xs text-white focus:outline-none transition-colors font-mono resize-none"
                  />
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3 bg-gradient-to-r from-cyber-green to-cyber-cyan text-black font-space font-extrabold text-xs tracking-widest uppercase rounded hover:shadow-[0_0_20px_rgba(124,255,203,0.4)] transition-all flex items-center justify-center space-x-2 disabled:opacity-50 hover-target"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{sending ? "TRANSMITTING..." : "SEND COMMS TRANSMISSION"}</span>
                </button>

              </form>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-cyber-green/10 border border-cyber-green rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_15px_rgba(124,255,203,0.2)] animate-pulse">
                  <Send className="w-8 h-8 text-cyber-green" />
                </div>
                <h3 className="font-space font-bold text-xl text-white mb-2 uppercase">
                  Signal Broadcasted!
                </h3>
                <p className="text-white/60 text-xs md:text-sm font-inter leading-relaxed max-w-sm mx-auto mb-6">
                  Operator <span className="text-cyber-green font-bold">{form.name}</span>, your data payload has been received at the terminal. We will sync up soon.
                </p>
                <button
                  onClick={resetForm}
                  className="px-6 py-2 border border-cyber-green text-cyber-green rounded hover:bg-cyber-green hover:text-black font-space text-[10px] tracking-widest uppercase transition-all hover-target"
                >
                  RESET PAYLOAD CONSOLE
                </button>
              </div>
            )}

            {/* Simulated terminal logging output */}
            {logs.length > 0 && (
              <div className="mt-6 bg-black/60 border border-white/5 rounded-md p-4 font-mono text-[10px] text-cyber-green space-y-1">
                <div className="text-white/30 flex items-center space-x-1.5 mb-1.5 border-b border-white/5 pb-1">
                  <Terminal className="w-3 h-3 text-cyber-green" />
                  <span>TRANSMISSION CONSOLE LOGS</span>
                </div>
                {logs.map((log, idx) => (
                  <div key={idx} className="truncate animate-pulse">
                    &gt; {log}
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Custom SVG cyber radar map panel */}
          <div className="glass-panel p-6 sm:p-8 rounded-xl border border-white/10 flex flex-col justify-between shadow-2xl relative overflow-hidden lg:h-[460px]">
            
            {/* Holographic grid SVG map */}
            <div className="relative w-full aspect-video border border-white/5 bg-black/30 rounded flex items-center justify-center mb-6">
              <svg
                viewBox="0 0 400 200"
                className="w-full h-full opacity-60 text-cyber-cyan"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
              >
                {/* Lat/Long grids */}
                <line x1="50" y1="0" x2="50" y2="200" strokeDasharray="3,3" opacity="0.2" />
                <line x1="100" y1="0" x2="100" y2="200" strokeDasharray="3,3" opacity="0.2" />
                <line x1="150" y1="0" x2="150" y2="200" strokeDasharray="3,3" opacity="0.2" />
                <line x1="200" y1="0" x2="200" y2="200" strokeDasharray="3,3" opacity="0.2" />
                <line x1="250" y1="0" x2="250" y2="200" strokeDasharray="3,3" opacity="0.2" />
                <line x1="300" y1="0" x2="300" y2="200" strokeDasharray="3,3" opacity="0.2" />
                <line x1="350" y1="0" x2="350" y2="200" strokeDasharray="3,3" opacity="0.2" />

                <line x1="0" y1="50" x2="400" y2="50" strokeDasharray="3,3" opacity="0.2" />
                <line x1="0" y1="100" x2="400" y2="100" strokeDasharray="3,3" opacity="0.2" />
                <line x1="0" y1="150" x2="400" y2="150" strokeDasharray="3,3" opacity="0.2" />

                {/* Cyber continents dots/outlines */}
                <path
                  d="M50,80 Q70,60 100,70 T130,90 T160,70 T180,80 T210,110 T250,90 T280,100 T310,80 T340,90"
                  strokeWidth="1.2"
                  opacity="0.3"
                />
                
                {/* Radial radar scanning ring */}
                <circle cx="200" cy="100" r="45" opacity="0.1" strokeDasharray="2,2" />
                <circle cx="200" cy="100" r="75" opacity="0.05" />

                {/* Glowing coordinate nodes */}
                <circle cx="200" cy="100" r="3" fill="#00F5FF" className="animate-ping" />
                <circle cx="200" cy="100" r="2.5" fill="#00F5FF" />
                <circle cx="120" cy="70" r="2" fill="#8B5CF6" />
                <circle cx="280" cy="120" r="2.5" fill="#7CFFCB" />

                {/* SVG details */}
                <text x="210" y="104" fill="#00F5FF" fontSize="7" fontFamily="monospace">TECHFEST_HQ</text>
                <text x="10" y="190" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="monospace">GEO_LAT: 32.7767 // GEO_LONG: -96.7970</text>
              </svg>
            </div>

            {/* Tech details */}
            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center space-x-3 text-white/70">
                <MapPin className="w-4 h-4 text-cyber-cyan" />
                <span>Sector-10, Terminal A, CyberConvention Labs</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <Mail className="w-4 h-4 text-cyber-purple" />
                <span>mission@techfest2026.space</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <Phone className="w-4 h-4 text-cyber-green" />
                <span>+1 (888) CYBER-NET</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

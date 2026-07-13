"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "@/utils/sound";
import { Award, Zap, Code, ShieldAlert, X } from "lucide-react";
import confetti from "canvas-confetti";

interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  icon: any;
  shortDesc: string;
  longDesc: string;
  prize: string;
  color: string;
}

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [registrationForm, setRegistrationForm] = useState({ name: "", email: "", team: "" });
  const [registeredStatus, setRegisteredStatus] = useState(false);

  const eventList: EventItem[] = [
    {
      id: "ev-1",
      title: "CODEWARP HACKATHON",
      category: "Programming",
      date: "March 12, 10:00 AM",
      icon: Code,
      shortDesc: "Assemble your squad, code your algorithms, and build futuristic apps in 36 hours.",
      longDesc: "CodeWarp is a high-octane 36-hour hackathon designed to test the mental resilience, programming capability, and architectural foresight of developers globally. Hack under space constraints, implement decentralized blockchain databases, and deploy AI models onto serverless cloud platforms.",
      prize: "$10,000 Main Prize + Gadgets",
      color: "from-cyber-cyan to-cyber-blue"
    },
    {
      id: "ev-2",
      title: "ROBOBRAWL DESTRUCTION",
      category: "Robotics",
      date: "March 13, 01:00 PM",
      icon: ShieldAlert,
      shortDesc: "Watch custom combat robots slam, rip, and burn their way to championship victory.",
      longDesc: "RoboBrawl is a heavy-metal gladiatorial combat tournament where customized remote-controlled robots fight to the death. Teams must configure armor thickness, weapon torque, and propulsion speeds to survive the extreme hazards of our enclosed polycarbonate arena.",
      prize: "$8,500 Grand Prize Pool",
      color: "from-cyber-purple to-pink-500"
    },
    {
      id: "ev-3",
      title: "AERODESIGN ORBIT",
      category: "Aerospace",
      date: "March 13, 03:00 PM",
      icon: Zap,
      shortDesc: "Design autonomous solar gliders to complete high-altitude payloads and precision landings.",
      longDesc: "AeroDesign challenges students to conceptualize, fabricate, and test autonomous aerial gliders capable of lifting maximum cargo weights. Systems are evaluated on aerodynamic lift-to-drag coefficients, propulsion battery efficiency, and telemetry telemetry navigation control loops.",
      prize: "$6,000 + Flight Simulator Passes",
      color: "from-cyber-green to-teal-500"
    },
    {
      id: "ev-4",
      title: "ALGORITHMIC TRADING DUAL",
      category: "Fintech",
      date: "March 14, 11:00 AM",
      icon: Award,
      shortDesc: "Deploy high-frequency market strategies against automated market cycles in a real-time sim.",
      longDesc: "The Algorithmic Trading Dual pits quant modelers against one another. Deploy backtested strategies in a custom high-latency simulated exchange containing synthetic news events, market panics, and liquidity shocks. Optimizing for Sharpe and Sortino ratios is required.",
      prize: "$5,000 + Quant Internship Offers",
      color: "from-amber-400 to-cyber-cyan"
    }
  ];

  // Mouse tilt animation handlers for cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Tilt calculations
    const rotX = -(y / (rect.height / 2)) * 10;
    const rotY = (x / (rect.width / 2)) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
  };

  const handleMouseLeave = (card: HTMLDivElement) => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
  };

  const openEventModal = (event: EventItem) => {
    sound.playClick();
    setSelectedEvent(event);
    setRegisteredStatus(false);
    setRegistrationForm({ name: "", email: "", team: "" });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registrationForm.name || !registrationForm.email) return;

    sound.playSuccess();
    setRegisteredStatus(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#00F5FF", "#8B5CF6", "#7CFFCB"]
    });
  };

  return (
    <section
      id="events"
      className="relative min-h-screen py-20 px-6 z-10 scroll-mt-10"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold font-space tracking-tight mb-4">
            CHAMPIONSHIP <span className="text-cyber-purple">EVENTS</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyber-purple to-cyber-green mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-white/70 text-sm md:text-base font-inter">
            Test your expertise across critical tech disciplines. Enter the digital colosseum and challenge the best minds on Earth.
          </p>
        </div>

        {/* 3D Tilt Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {eventList.map((item) => {
            const Icon = item.icon;
            let cardRef: HTMLDivElement | null = null;

            return (
              <div
                key={item.id}
                ref={(el) => { cardRef = el; }}
                onMouseMove={(e) => cardRef && handleMouseMove(e, cardRef)}
                onMouseLeave={() => cardRef && handleMouseLeave(cardRef)}
                onClick={() => openEventModal(item)}
                className="glass-panel p-8 rounded-xl border border-white/10 hover:border-cyber-cyan/40 cursor-pointer transition-all duration-150 relative overflow-hidden group shadow-xl flex flex-col justify-between hover-target"
              >
                {/* Neon glow gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-[0.02] group-hover:opacity-[0.06] transition-opacity`} />
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-purple/5 rounded-full blur-2xl group-hover:bg-cyber-cyan/10 transition-colors pointer-events-none" />

                <div>
                  {/* Category & Badge */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-mono tracking-widest text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/20 px-3 py-1 rounded-full uppercase">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-mono text-white/40">
                      {item.date}
                    </span>
                  </div>

                  {/* Header */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-white/5 rounded-md border border-white/10 text-white group-hover:text-cyber-cyan transition-colors">
                      <Icon className="w-6 h-6 animate-pulse" />
                    </div>
                    <h3 className="font-space font-extrabold text-lg md:text-xl tracking-wider text-white">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-white/70 text-sm leading-relaxed mb-6 font-inter">
                    {item.shortDesc}
                  </p>
                </div>

                {/* Footer specs */}
                <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                  <div>
                    <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
                      CHAMPIONSHIP POOL
                    </div>
                    <div className="text-xs md:text-sm font-space font-bold text-cyber-green mt-0.5">
                      {item.prize}
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white/5 group-hover:bg-cyber-cyan border border-white/10 group-hover:border-cyber-cyan text-white group-hover:text-black font-space text-[11px] tracking-widest uppercase rounded transition-all">
                    VIEW PORTAL
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Glassmorphic Event Details / Registration Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-cyber-black/85 backdrop-blur-sm"
            />

            {/* Modal window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative w-full max-w-lg glass-panel p-6 md:p-8 rounded-xl border border-cyber-cyan/40 shadow-[0_0_30px_rgba(0,245,255,0.1)] z-10 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-1 bg-white/5 rounded-full hover-target"
              >
                <X className="w-5 h-5" />
              </button>

              {!registeredStatus ? (
                <>
                  <div className="mb-6">
                    <span className="text-[9px] font-mono tracking-widest text-cyber-cyan uppercase block mb-1">
                      {selectedEvent.category} // SYSTEM STATUS ACTIVE
                    </span>
                    <h3 className="font-space font-extrabold text-2xl text-white tracking-wide">
                      {selectedEvent.title}
                    </h3>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">
                        EVENT PROTOCOL DESCRIPTION
                      </h4>
                      <p className="text-white/80 text-xs md:text-sm leading-relaxed font-inter">
                        {selectedEvent.longDesc}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-white/5 rounded-md p-3 border border-white/5">
                      <div>
                        <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
                          POOL PRIZE
                        </div>
                        <div className="text-xs md:text-sm font-space font-bold text-cyber-green mt-0.5">
                          {selectedEvent.prize}
                        </div>
                      </div>
                      <div>
                        <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
                          TIMESTEP SCHEDULE
                        </div>
                        <div className="text-xs md:text-sm font-space font-bold text-white mt-0.5">
                          {selectedEvent.date}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submission form */}
                  <form onSubmit={handleRegisterSubmit} className="space-y-3">
                    <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">
                      REGISTRATION CODES
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Operator Name"
                        required
                        value={registrationForm.name}
                        onChange={(e) => setRegistrationForm({ ...registrationForm, name: e.target.value })}
                        className="bg-black/60 border border-white/10 rounded px-4 py-2 text-xs text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                      />
                      <input
                        type="email"
                        placeholder="Comms Email"
                        required
                        value={registrationForm.email}
                        onChange={(e) => setRegistrationForm({ ...registrationForm, email: e.target.value })}
                        className="bg-black/60 border border-white/10 rounded px-4 py-2 text-xs text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Team Designation (Optional)"
                      value={registrationForm.team}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, team: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded px-4 py-2 text-xs text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                    />

                    <button
                      type="submit"
                      className="w-full mt-3 py-3 bg-gradient-to-r from-cyber-cyan to-cyber-purple text-black font-space font-bold text-xs tracking-widest uppercase rounded hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all hover-target"
                    >
                      REQUEST ENTRY TICKET
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-cyber-green/10 border border-cyber-green rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_15px_rgba(124,255,203,0.2)]">
                    <Zap className="w-8 h-8 text-cyber-green animate-pulse" />
                  </div>
                  <h3 className="font-space font-bold text-xl text-white mb-2 uppercase">
                    Registration Authorized!
                  </h3>
                  <p className="text-white/60 text-xs md:text-sm font-inter leading-relaxed max-w-sm mx-auto mb-6">
                    Welcome aboard, operator <span className="text-cyber-cyan font-bold">{registrationForm.name}</span>. 
                    We have broadcasted synchronization keys to <span className="text-cyber-purple font-bold">{registrationForm.email}</span>.
                  </p>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="px-6 py-2 border border-cyber-cyan text-cyber-cyan rounded hover:bg-cyber-cyan hover:text-black font-space text-[10px] tracking-widest uppercase transition-all hover-target"
                  >
                    DISMISS CONSOLE
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { sound } from "@/utils/sound";
import { MessageSquare, X, Send, Bot } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "SYSTEM STATUS: A.L.I.C.E. V2 ONLINE. QUERY PARAMETERS REGARDING TECHFEST 2026." }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    sound.playClick();
    setIsOpen(!isOpen);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    sound.playClick();
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");

    // Simulate thinking glitch noise
    setTimeout(() => {
      sound.playGlitch();
      const response = generateBotResponse(userMsg);
      setMessages((prev) => [...prev, { sender: "bot", text: response }]);
    }, 600);
  };

  const generateBotResponse = (msg: string): string => {
    const text = msg.toLowerCase();
    
    if (text.includes("prize") || text.includes("pool") || text.includes("money")) {
      return "METRIC CONFIRMED: HACKATHON POOL STANDS AT $25,000 USD. 1ST AWARD SECURES $12,000 PROMPT SEED SEED FUNDING.";
    }
    if (text.includes("code") || text.includes("hack") || text.includes("codewarp")) {
      return "DIAGNOSTIC: CODEWARP HACKATHON COMMENCES MARCH 12, 10:00 AM. 36-HOUR DURATION. TEAMS: 2-4 OPERATORS.";
    }
    if (text.includes("workshop") || text.includes("study") || text.includes("class")) {
      return "TRAINING TRACKS ACTIVE: 1. GENERATIVE AI MODEL DESIGN, 2. QUANTUM GATES, 3. ROS2 ROBOTICS, 4. DECENTRALIZED RUST MESHES.";
    }
    if (text.includes("register") || text.includes("join") || text.includes("apply")) {
      return "PROCEDURE: TRANSMIT YOUR DATA PAYLOAD IN THE REGISTRATION CARD TO REQUEST SECURE COMMS KEY.";
    }
    if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
      return "GREETINGS OPERATOR. READY FOR CONCURRENT SYNCHRONIZED SYSTEM INQUIRIES.";
    }

    return "WARNING: QUERY EXCEEDS CONTEXT BOUNDS. PLEASE FORMULATE PARAMETERS REGARDING 'EVENTS', 'PRIZES', 'WORKSHOPS', OR 'REGISTRATION'.";
  };

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggleOpen}
          className="p-4 bg-gradient-to-r from-cyber-cyan to-cyber-purple text-black rounded-full shadow-[0_0_20px_rgba(0,245,255,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:scale-110 transition-all hover-target"
        >
          <MessageSquare className="w-6 h-6 animate-pulse" />
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="w-[320px] sm:w-[350px] h-[450px] glass-panel border border-cyber-cyan/35 rounded-xl shadow-[0_0_35px_rgba(6,11,36,0.8)] overflow-hidden flex flex-col justify-between animate-fade-in">
          
          {/* Header */}
          <div className="bg-white/5 border-b border-white/10 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-cyber-cyan animate-bounce" />
              <div>
                <span className="font-space font-extrabold text-xs text-white uppercase tracking-wider block">
                  A.L.I.C.E. V2
                </span>
                <span className="text-[9px] font-mono text-cyber-green flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-ping inline-block" />
                  <span>ONLINE // QUANTUM_CORE</span>
                </span>
              </div>
            </div>
            
            <button
              onClick={toggleOpen}
              className="text-white/40 hover:text-white transition-colors hover-target"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Message List */}
          <div className="flex-grow overflow-y-auto p-4 space-y-3 font-mono text-[11px] scrollbar-thin">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  m.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded px-3 py-2 leading-relaxed ${
                    m.sender === "user"
                      ? "bg-cyber-purple/20 border border-cyber-purple/30 text-white"
                      : "bg-[#060B24] border border-cyber-cyan/20 text-cyber-cyan"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Form input */}
          <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-black/40 flex space-x-2">
            <input
              type="text"
              placeholder="Query parameters..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow bg-black/60 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-cyber-cyan font-mono"
            />
            <button
              type="submit"
              className="p-2 bg-cyber-cyan text-black rounded hover:shadow-[0_0_12px_rgba(0,245,255,0.3)] transition-all hover-target"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}

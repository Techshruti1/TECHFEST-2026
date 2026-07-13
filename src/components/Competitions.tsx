"use client";

import { motion } from "framer-motion";
import { Award, Trophy, Star, TrendingUp } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  team: string;
  score: number;
  project: string;
  trend: "up" | "down" | "stable";
}

export default function Competitions() {
  const leaderboard: LeaderboardEntry[] = [
    { rank: 1, team: "Synergy.AI", score: 98.4, project: "Decentralized LLM Routing Nodes", trend: "up" },
    { rank: 2, team: "ZeroQuantum", score: 96.2, project: "Post-Quantum Cryptographic Mesh", trend: "up" },
    { rank: 3, team: "AeroTelemetry", score: 94.8, project: "LiDAR SLAM Navigation Drone", trend: "stable" },
    { rank: 4, team: "SolarSails", score: 91.5, project: "High-Altitude Autonomous Glider", trend: "down" },
    { rank: 5, team: "BlockGrid", score: 89.9, project: "Modular WASM Layer-2 Chain", trend: "up" }
  ];

  const prizes = [
    { rank: "1st Place", value: "$12,000", desc: "Seed funding, cloud vouchers + Gold badge", glow: "border-amber-500/30 text-amber-400" },
    { rank: "2nd Place", value: "$8,000", desc: "Compute credits, VR hardware + Silver badge", glow: "border-slate-300/30 text-slate-300" },
    { rank: "3rd Place", value: "$5,000", desc: "Developer kits, tech gear + Bronze badge", glow: "border-amber-700/30 text-amber-700" }
  ];

  return (
    <section
      id="competitions"
      className="relative min-h-screen py-20 px-6 z-10 scroll-mt-10"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold font-space tracking-tight mb-4">
            HACKATHON <span className="text-cyber-cyan">LEADERBOARD</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-purple mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-white/70 text-sm md:text-base font-inter">
            Real-time evaluation standings of ongoing team projects. Watch the metrics update as final evaluations commence.
          </p>
        </div>

        {/* Split Prizes and Standings Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-16">
          
          {/* Trophy & Main Award Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-8 rounded-xl border border-cyber-cyan/30 text-center relative overflow-hidden lg:h-[460px] flex flex-col justify-center items-center shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none" />
            <div className="w-20 h-20 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-full flex items-center justify-center mb-6 animate-float-slow shadow-[0_0_15px_rgba(0,245,255,0.2)]">
              <Trophy className="w-10 h-10 text-cyber-cyan" />
            </div>
            
            <h3 className="font-space font-extrabold text-xl tracking-wider text-white mb-2">
              GRAND CHAMPIONSHIP
            </h3>
            <p className="text-white/60 text-xs leading-relaxed max-w-xs mb-6 font-inter">
              Top teams compete for funding, engineering sponsorships, and hardware support.
            </p>

            <div className="border border-white/10 rounded-lg p-4 bg-white/5 w-full">
              <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase block mb-1">
                COMBINED PRIZE POOL
              </span>
              <span className="text-3xl font-space font-extrabold text-cyber-green tracking-wide">
                $25,000 USD
              </span>
            </div>
          </motion.div>

          {/* Standings Table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 glass-panel rounded-xl border border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="bg-white/5 border-b border-white/10 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-cyber-purple animate-pulse" />
                <span className="font-space text-xs tracking-widest text-white uppercase font-bold">
                  SYS_LEADERBOARD Standings
                </span>
              </div>
              <span className="text-[10px] font-mono text-cyber-cyan">
                UPDATE: 12 SECONDS AGO
              </span>
            </div>

            {/* Leaderboard Rows */}
            <div className="divide-y divide-white/5 font-inter">
              {leaderboard.map((item, index) => (
                <div
                  key={index}
                  className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                    {/* Rank indicator */}
                    <div
                      className={`w-8 h-8 rounded-full border flex items-center justify-center font-space font-bold text-xs ${
                        item.rank === 1
                          ? "bg-amber-500/10 border-amber-500 text-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.2)]"
                          : item.rank === 2
                          ? "bg-slate-300/10 border-slate-300 text-slate-300"
                          : item.rank === 3
                          ? "bg-amber-700/10 border-amber-700 text-amber-600"
                          : "bg-white/5 border-white/10 text-white/70"
                      }`}
                    >
                      {item.rank}
                    </div>

                    {/* Team Details */}
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-cyber-cyan transition-colors font-space tracking-wide">
                        {item.team}
                      </div>
                      <div className="text-[10px] text-white/50 font-mono mt-0.5">
                        {item.project}
                      </div>
                    </div>
                  </div>

                  {/* Score & Trend */}
                  <div className="flex items-center space-x-6 justify-between sm:justify-start">
                    <div className="text-right">
                      <div className="text-xs text-white/40 font-mono uppercase tracking-widest">
                        METRIC SCORE
                      </div>
                      <div className="text-sm font-space font-extrabold text-cyber-green">
                        {item.score} <span className="text-[10px] text-white/60">pts</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5 text-xs font-mono">
                      {item.trend === "up" ? (
                        <>
                          <TrendingUp className="w-3.5 h-3.5 text-cyber-green animate-bounce" />
                          <span className="text-cyber-green">UP</span>
                        </>
                      ) : item.trend === "down" ? (
                        <span className="text-red-400">DOWN</span>
                      ) : (
                        <span className="text-white/40">STABLE</span>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </motion.div>

        </div>

        {/* Prizes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {prizes.map((p, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-panel p-6 rounded-lg border flex flex-col justify-between shadow-lg hover:scale-[1.02] transition-transform ${p.glow} hover-target`}
            >
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase block mb-1">
                  {p.rank} Award
                </span>
                <h4 className="font-space font-extrabold text-2xl tracking-tight mb-2">
                  {p.value}
                </h4>
              </div>
              <p className="text-white/60 text-xs leading-relaxed font-inter">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "@/utils/sound";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: "WHO IS ELIGIBLE TO REGISTER?",
      answer: "Undergraduates, graduate students, and early-career software developers worldwide are eligible to register. Standard coding and engineering backgrounds are recommended."
    },
    {
      id: 2,
      question: "ARE TEAM REGISTRATIONS ALLOWED?",
      answer: "Yes, team registrations are highly encouraged for hackathons and design challenges. Teams can consist of 2 to 4 operators. Individual registrations will be merged into teams during check-in."
    },
    {
      id: 3,
      question: "WHAT IS THE SELECTION CRITERIA?",
      answer: "Teams are selected based on academic/developer profile portfolios, resume highlights, and short statements detailing why they wish to participate. Decisions are issued within 5 days of submission."
    },
    {
      id: 4,
      question: "IS THE FESTIVAL VIRTUAL OR IN-PERSON?",
      answer: "TECHFEST 2026 is a hybrid experience. Keynotes, workshops, and team presentations are streamed online. Robotic battle arenas and key hackathon labs are offline in the primary convention terminal."
    }
  ];

  const handleToggle = (id: number) => {
    sound.playClick();
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="relative min-h-screen py-20 px-6 z-10 scroll-mt-10"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold font-space tracking-tight mb-4">
            FREQUENTLY ASKED <span className="text-cyber-purple">QUERIES</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyber-purple to-cyber-green mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-white/70 text-sm md:text-base font-inter">
            Got queries? We have assembled diagnostic answers to common system questions.
          </p>
        </div>

        {/* Accordions Container */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => {
            const isOpen = faq.id === openId;

            return (
              <div
                key={faq.id}
                className={`glass-panel rounded-lg border transition-all duration-300 overflow-hidden ${
                  isOpen ? "border-cyber-purple/50 bg-cyber-dark/80" : "border-white/5 bg-white/5"
                }`}
              >
                {/* Header */}
                <button
                  onClick={() => handleToggle(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover-target"
                >
                  <div className="flex items-center space-x-3 pr-4">
                    <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${
                      isOpen ? "text-cyber-purple" : "text-white/40"
                    }`} />
                    <span className="font-space font-bold text-sm tracking-wider text-white uppercase">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-300 flex-shrink-0 ${
                    isOpen ? "rotate-180 text-cyber-purple" : ""
                  }`} />
                </button>

                {/* Answer sliding container */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-white/5">
                        <p className="text-white/70 text-xs md:text-sm leading-relaxed font-inter">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

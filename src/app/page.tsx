"use client";

import { useState } from "react";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";
import SpaceCanvas from "@/components/SpaceCanvas";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Events from "@/components/Events";
import Workshops from "@/components/Workshops";
import Competitions from "@/components/Competitions";
import Timeline from "@/components/Timeline";
import Sponsors from "@/components/Sponsors";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="relative min-h-screen bg-[#060B24] overflow-hidden select-none">
      
      {/* Glitch loading HUD */}
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {/* Main Content (Revealed after loading) */}
      <div
        className={`transition-opacity duration-1000 ${
          loading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Custom mouse ring */}
        <CustomCursor />

        {/* Global WebGL Background Space System */}
        <SpaceCanvas />

        {/* Floating cyber navigation header */}
        <Navbar />

        {/* Interactive Sections */}
        <div className="relative z-10">
          <Hero />
          <About />
          <Events />
          <Workshops />
          <Competitions />
          <Timeline />
          <Sponsors />
          <Gallery />
          <FAQ />
          <Contact />
          <Footer />
        </div>

        {/* AI supercomputer assistant widget */}
        <Chatbot />
      </div>
    </main>
  );
}

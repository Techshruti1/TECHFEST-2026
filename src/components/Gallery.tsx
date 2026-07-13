"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "@/utils/sound";
import { Maximize2, X, Image as ImageIcon } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  desc: string;
  img: string;
  span: string;
}

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState<GalleryItem | null>(null);

  const images: GalleryItem[] = [
    {
      id: 1,
      title: "Earth Mesh Telemetry",
      desc: "Orbital data scanning visualization.",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      span: "md:col-span-2 md:row-span-1"
    },
    {
      id: 2,
      title: "Synthetix Labs AI",
      desc: "Local server deep model backtesting.",
      img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
      span: "md:col-span-1 md:row-span-2"
    },
    {
      id: 3,
      title: "Robotic Assembly",
      desc: "Actuator arm assembly validation.",
      img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
      span: "md:col-span-1 md:row-span-1"
    },
    {
      id: 4,
      title: "Decentralized Terminal",
      desc: "Running core transaction verification.",
      img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
      span: "md:col-span-1 md:row-span-1"
    },
    {
      id: 5,
      title: "Nebula Coordinates",
      desc: "Deep space stellar telescope capture.",
      img: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80",
      span: "md:col-span-2 md:row-span-1"
    }
  ];

  const handleOpenViewer = (item: GalleryItem) => {
    sound.playClick();
    setSelectedImg(item);
  };

  return (
    <section
      id="gallery"
      className="relative min-h-screen py-20 px-6 z-10 scroll-mt-10"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold font-space tracking-tight mb-4">
            ODYSSEY <span className="text-cyber-cyan">GALLERY</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-purple mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-white/70 text-sm md:text-base font-inter">
            Capturing the visual highlights of the cosmic festival, holographic installations, and hackathon battles.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] max-w-5xl mx-auto">
          {images.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              onClick={() => handleOpenViewer(item)}
              className={`${item.span} relative glass-panel rounded-xl overflow-hidden group cursor-pointer border border-white/10 hover:border-cyber-cyan/40 shadow-xl hover-target`}
            >
              {/* Image element */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115 group-hover:rotate-1"
              />

              {/* Hover overlay details */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-cyber-black/40 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[9px] font-mono text-cyber-cyan uppercase tracking-widest block mb-1">
                  SYS_CAPTURE // 00{item.id}
                </span>
                <h4 className="font-space font-bold text-sm tracking-wider text-white uppercase flex items-center justify-between">
                  <span>{item.title}</span>
                  <Maximize2 className="w-4 h-4 text-cyber-cyan" />
                </h4>
                <p className="text-white/60 text-xs mt-1 font-inter">
                  {item.desc}
                </p>
              </div>

              {/* Standard badge */}
              <div className="absolute top-4 left-4 p-1.5 bg-[#060B24]/80 backdrop-blur-md rounded border border-white/5 group-hover:hidden">
                <ImageIcon className="w-3.5 h-3.5 text-cyber-cyan" />
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* Fullscreen modal viewer */}
      <AnimatePresence>
        {selectedImg && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImg(null)}
              className="absolute inset-0 bg-cyber-black/95 backdrop-blur-md"
            />

            {/* Viewer window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full glass-panel border border-cyber-cyan/30 rounded-xl overflow-hidden z-10 flex flex-col shadow-2xl"
            >
              {/* Close controls */}
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors bg-black/60 p-2 rounded-full border border-white/10 z-20 hover-target"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedImg.img}
                  alt={selectedImg.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 bg-cyber-dark border-t border-white/5">
                <span className="text-[9px] font-mono text-cyber-cyan tracking-widest block uppercase mb-1">
                  EXPEDITION CAPTURED // CAMERA_0{selectedImg.id}
                </span>
                <h3 className="font-space font-extrabold text-lg text-white uppercase tracking-wider">
                  {selectedImg.title}
                </h3>
                <p className="text-white/70 text-xs md:text-sm font-inter mt-1.5 leading-relaxed">
                  {selectedImg.desc}
                </p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

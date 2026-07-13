"use client";

import { useEffect, useState, useRef } from "react";
import { sound } from "@/utils/sound";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationId: number;
    let targetX = 0;
    let targetY = 0;
    let currentRingX = 0;
    let currentRingY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setClicked(true);
      sound.playClick();
    };

    const handleMouseUp = () => {
      setClicked(false);
    };

    // Listen for hover on clickable elements
    const addHoverListeners = () => {
      const targets = document.querySelectorAll(
        'a, button, [role="button"], input, select, textarea, .hover-target, .glass-panel'
      );
      targets.forEach((target) => {
        target.addEventListener("mouseenter", () => setHovered(true));
        target.addEventListener("mouseleave", () => setHovered(false));
      });
    };

    // Smooth physics ring loop
    const renderLoop = () => {
      const easing = 0.15; // smooth delay
      currentRingX += (targetX - currentRingX) * easing;
      currentRingY += (targetY - currentRingY) * easing;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${currentRingX - 16}px, ${currentRingY - 16}px, 0) scale(${
          clicked ? 0.8 : hovered ? 1.5 : 1
        })`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX - 4}px, ${targetY - 4}px, 0) scale(${
          clicked ? 1.5 : hovered ? 0.5 : 1
        })`;
      }

      animationId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    // Set up hover polling to handle dynamic nodes
    const interval = setInterval(addHoverListeners, 1000);
    renderLoop();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      clearInterval(interval);
      cancelAnimationFrame(animationId);
    };
  }, [clicked, hovered]);

  return (
    <>
      {/* Outer delayed ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-cyber-purple pointer-events-none z-[9999] transition-colors duration-300 mix-blend-screen hidden md:block"
        style={{
          boxShadow: hovered
            ? "0 0 15px rgba(139, 92, 246, 0.6)"
            : "none",
          borderColor: hovered ? "#00F5FF" : "#8B5CF6",
        }}
      />
      {/* Inner precise dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyber-cyan pointer-events-none z-[9999] mix-blend-screen hidden md:block"
        style={{
          boxShadow: "0 0 8px rgba(0, 245, 255, 0.8)",
        }}
      />
    </>
  );
}

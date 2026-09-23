"use client";

import React, { useState, useEffect } from "react";

interface CoolorsElasticTextProps {
  text: string;
  className?: string;
}

// 16-color rich modern vibrant spectrum
const VIBRANT_SPECTRUM = [
  "#38BDF8", // Electric Azure
  "#00F5D4", // Fluorescent Aqua
  "#10B981", // Emerald Glow
  "#4ADE80", // Vibrant Green
  "#A3E635", // Electric Lime
  "#FACC15", // Sunburst Gold
  "#FB923C", // Coral Tangerine
  "#F43F5E", // Rose Crimson
  "#EC4899", // Radiant Magenta
  "#D946EF", // Vivid Fuchsia
  "#C084FC", // Electric Violet
  "#818CF8", // Ultra Indigo
  "#2DD4BF", // Vivid Teal
  "#F472B6", // Carnation Pink
  "#FBBF24", // Amber Flame
  "#60A5FA", // Electric Blue
];

export const CoolorsElasticText: React.FC<CoolorsElasticTextProps> = ({
  text,
  className = "",
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch/mobile environment so interactive letter hover ONLY activates on PC
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isTouch = 
        "ontouchstart" in window || 
        navigator.maxTouchPoints > 0 || 
        window.matchMedia("(pointer: coarse)").matches;
      setIsTouchDevice(isTouch);
    }
  }, []);

  // Split into words for line wrapping
  const words = text.split(" ");
  let globalIndexCounter = 0;

  return (
    <>
      {/* 1. SMARTPHONE / TOUCH DEVICE VIEW: Simple, rock-solid, zero-jitter plain text */}
      <span className="block md:hidden select-none">
        <span className="text-white font-medium">Every Live Govt Job. </span>
        <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent font-medium">
          Zero PDF Yapping. Instant Vibe Check.
        </span>
      </span>

      {/* 2. PC / DESKTOP VIEW: High-definition smooth left/right wave with rich vibrant colors */}
      <span 
        className={`hidden md:inline-block select-none ${className}`}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {words.map((word, wordIdx) => {
          const letters = word.split("");
          return (
            <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.35em] py-1">
              {letters.map((char, charIdx) => {
                const currentIndex = globalIndexCounter++;
                const isHovered = hoveredIndex === currentIndex;
                const dist = hoveredIndex !== null ? currentIndex - hoveredIndex : null;
                const absDist = dist !== null ? Math.abs(dist) : 999;

                // Color assignment from rich 16-color spectrum
                const letterColor = VIBRANT_SPECTRUM[currentIndex % VIBRANT_SPECTRUM.length];

                // Smooth wave calculations:
                // Smooth horizontal displacement curve (glides left/right smoothly without fumbling)
                let transform = "translateX(0px) scale(1)";
                let color = "inherit";
                let textShadow = "none";
                let zIndex = 1;
                let transition = "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), color 0.25s ease, text-shadow 0.25s ease";

                if (!isTouchDevice && hoveredIndex !== null) {
                  if (absDist === 0) {
                    // Hovered letter: smooth growth and vibrant glow
                    transform = "translateX(0px) scale(1.36)";
                    color = letterColor;
                    textShadow = `0 0 16px ${letterColor}90, 0 0 30px ${letterColor}40`;
                    zIndex = 25;
                    transition = "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), color 0.15s ease, text-shadow 0.15s ease";
                  } else if (absDist === 1) {
                    // Immediate adjacent: smooth glide left (-11px) or right (+11px)
                    const shiftX = dist! > 0 ? 11 : -11;
                    transform = `translateX(${shiftX}px) scale(1.14)`;
                    color = letterColor;
                    textShadow = `0 0 10px ${letterColor}60`;
                    zIndex = 15;
                    transition = "transform 0.22s cubic-bezier(0.16, 1, 0.3, 1) 0.015s, color 0.18s ease";
                  } else if (absDist === 2) {
                    // Secondary wave: gentle glide (-6px / +6px)
                    const shiftX = dist! > 0 ? 6 : -6;
                    transform = `translateX(${shiftX}px) scale(1.06)`;
                    color = letterColor;
                    textShadow = `0 0 6px ${letterColor}40`;
                    zIndex = 10;
                    transition = "transform 0.26s cubic-bezier(0.16, 1, 0.3, 1) 0.03s, color 0.22s ease";
                  } else if (absDist === 3) {
                    // Subtle outer ripple (-2.5px / +2.5px)
                    const shiftX = dist! > 0 ? 2.5 : -2.5;
                    transform = `translateX(${shiftX}px) scale(1.02)`;
                    zIndex = 5;
                    transition = "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1) 0.05s";
                  }
                }

                return (
                  <span
                    key={charIdx}
                    onMouseEnter={() => {
                      if (!isTouchDevice) setHoveredIndex(currentIndex);
                    }}
                    style={{
                      transform,
                      color: absDist <= 2 ? color : undefined,
                      textShadow: absDist <= 2 ? textShadow : undefined,
                      zIndex,
                      transition,
                    }}
                    className="inline-block relative cursor-pointer font-normal origin-center will-change-transform"
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          );
        })}
      </span>
    </>
  );
};

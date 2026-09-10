"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function Achievements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { achievements } = PORTFOLIO_DATA;
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="relative min-h-screen py-24 px-6 z-10">
      <div className="container mx-auto max-w-4xl relative">
        <h2 className="text-4xl md:text-5xl font-bold mb-20 text-center glow-text-purple text-transparent bg-clip-text bg-gradient-to-r from-white to-[#b026ff]">
          ACHIEVEMENTS & LEADERSHIP
        </h2>

        <div className="relative">
          {/* Animated SVG Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 md:-ml-0.5">
            <svg 
              className="absolute top-0 left-0 w-full h-full" 
              viewBox="0 0 4 100" 
              preserveAspectRatio="none"
            >
              <line 
                x1="2" y1="0" x2="2" y2="100" 
                stroke="#333" 
                strokeWidth="4" 
                vectorEffect="non-scaling-stroke"
              />
              <motion.line 
                x1="2" y1="0" x2="2" y2="100" 
                stroke="url(#lineGradient)" 
                strokeWidth="4" 
                vectorEffect="non-scaling-stroke"
                style={{ pathLength }}
              />
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00f3ff" />
                  <stop offset="100%" stopColor="#b026ff" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="flex flex-col gap-12 relative z-10">
            {achievements.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`flex items-center w-full ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} flex-row`}>
                  <div className="w-10 md:w-1/2 flex justify-center md:justify-end md:pr-12 md:pl-0 pl-12 order-1 md:order-none" />
                  
                  {/* Node */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="absolute left-[20px] md:left-1/2 w-6 h-6 rounded-full -ml-3 z-20 border-4 border-[#030305]"
                    style={{ backgroundColor: milestone.color, boxShadow: `0 0 15px ${milestone.color}` }}
                  />

                  {/* Content Card */}
                  <div className={`w-[calc(100%-40px)] ml-12 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 text-left'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="glass-card p-6 rounded-2xl hover:scale-105 transition-transform duration-300"
                      style={{ borderLeft: `2px solid ${milestone.color}` }}
                    >
                      <span className="text-sm font-bold text-gray-400 block mb-2">{milestone.year}</span>
                      <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                      <p className="text-gray-400 text-sm">{milestone.description}</p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

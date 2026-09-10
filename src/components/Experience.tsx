"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { experience } = PORTFOLIO_DATA;
  
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
        <h2 className="text-4xl md:text-5xl font-bold mb-20 text-center glow-text-cyan text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00f3ff]">
          PROFESSIONAL TRAJECTORY
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
                stroke="url(#experienceGradient)" 
                strokeWidth="4" 
                vectorEffect="non-scaling-stroke"
                style={{ pathLength }}
              />
              <defs>
                <linearGradient id="experienceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00f3ff" />
                  <stop offset="100%" stopColor="#b026ff" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="flex flex-col gap-12 relative z-10">
            {experience.map((job, idx) => {
              const isEven = idx % 2 === 0;
              const color = idx === 0 ? "#00f3ff" : "#b026ff";
              return (
                <div key={job.id} className={`flex items-center w-full ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} flex-row`}>
                  <div className="w-10 md:w-1/2 flex justify-center md:justify-end md:pr-12 md:pl-0 pl-12 order-1 md:order-none" />
                  
                  {/* Node */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="absolute left-[20px] md:left-1/2 w-6 h-6 rounded-full -ml-3 z-20 border-4 border-[#030305]"
                    style={{ backgroundColor: color, boxShadow: `0 0 15px ${color}` }}
                  />

                  {/* Content Card */}
                  <div className={`w-[calc(100%-40px)] ml-12 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 text-left'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="glass-card p-8 rounded-2xl hover:scale-[1.02] transition-transform duration-300"
                      style={{ borderLeft: `3px solid ${color}` }}
                    >
                      <span className="text-sm font-bold text-gray-400 block mb-1">{job.period}</span>
                      <h3 className="text-2xl font-bold text-white">{job.role}</h3>
                      <h4 className="text-[#00f3ff] text-lg font-medium mb-4">@ {job.company}</h4>
                      <p className="text-gray-300 text-sm leading-relaxed mb-6">{job.description}</p>
                      
                      <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                        {job.tags.map(tag => (
                          <span key={tag} className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#b026ff]">
                            {tag}
                          </span>
                        ))}
                      </div>
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

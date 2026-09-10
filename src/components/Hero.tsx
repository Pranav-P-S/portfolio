"use client";

import { motion, Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

// Magnetic Button component for a tactile feel
function MagneticButton({ children, href, label }: { children: React.ReactNode, href: string, label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group relative flex items-center justify-center w-14 h-14 rounded-full glass hover:bg-[rgba(0,243,255,0.1)] transition-colors duration-300 border border-white/10 hover:border-[#00f3ff]/50"
    >
      <div className="text-gray-300 group-hover:text-[#00f3ff] transition-colors duration-300 pointer-events-none">
        {children}
      </div>
      <div className="absolute inset-0 rounded-full bg-[#00f3ff] opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300 pointer-events-none" />
    </motion.a>
  );
}

export default function Hero() {
  const { hero } = PORTFOLIO_DATA;
  
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden pt-20">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="text-center z-10 flex flex-col items-center"
      >
        <motion.h1 
          variants={item}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-4 glow-text-cyan text-transparent bg-clip-text bg-gradient-to-br from-white to-[#00f3ff]"
        >
          {hero.name}
        </motion.h1>
        
        <motion.p 
          variants={item}
          className="text-xl md:text-3xl text-white font-medium tracking-wide mb-4 glow-text-purple"
        >
          {hero.subtitle}
        </motion.p>
        
        <motion.p 
          variants={item}
          className="text-base md:text-lg text-gray-400 font-light tracking-wide mb-12 max-w-2xl leading-relaxed"
        >
          {hero.description}
        </motion.p>
        
        <motion.div variants={item} className="flex items-center gap-6">
          <MagneticButton href={hero.contact.github} label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </MagneticButton>
          <MagneticButton href={hero.contact.linkedin} label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </MagneticButton>
          <MagneticButton href={`mailto:${hero.contact.email}`} label="Email">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}

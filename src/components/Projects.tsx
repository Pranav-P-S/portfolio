"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function Projects() {
  const { projects } = PORTFOLIO_DATA;
  return (
    <section className="relative min-h-screen py-24 px-6 z-10">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 glow-text-cyan text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-white w-fit">
          FEATURED PROJECTS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {projects.map((project) => (
            <TiltCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({ project }: { project: any }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full h-[350px] rounded-2xl glass-card border border-white/5 cursor-pointer group hover:border-[#b026ff]/50 transition-colors duration-500"
    >
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#00f3ff]/5 to-[#b026ff]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      
      {/* 3D Extruded Content */}
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none"
      >
        <div>
          <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-[#00f3ff] transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {project.description}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-6">
          {project.tech.map((t: string, idx: number) => (
            <span 
              key={idx} 
              className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#00f3ff]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      
      {/* Glow Effect */}
      <div 
        style={{ transform: "translateZ(-20px)" }}
        className="absolute inset-0 bg-[#b026ff]/20 blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-full scale-90 pointer-events-none"
      />
    </motion.div>
  );
}

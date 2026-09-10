"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_DATA } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { skills, education } = PORTFOLIO_DATA;

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.about-card');
      
      cards.forEach((card: any) => {
        gsap.fromTo(card,
          { 
            y: 100, 
            opacity: 0,
            rotationX: -15
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const marqueeText = skills.marquee.join(" • ") + " •\u00A0";

  return (
    <section ref={containerRef} className="relative min-h-screen py-24 overflow-hidden">
      {/* Marquee Background */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-0 opacity-10 pointer-events-none overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee inline-block font-black text-8xl md:text-[10rem] tracking-tighter text-transparent" style={{ WebkitTextStroke: '2px #ffffff' }}>
          {marqueeText}
        </div>
        <div className="animate-marquee inline-block font-black text-8xl md:text-[10rem] tracking-tighter text-transparent absolute top-0" style={{ WebkitTextStroke: '2px #ffffff', left: '100%' }}>
          {marqueeText}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 glow-text-purple text-transparent bg-clip-text bg-gradient-to-r from-[#b026ff] to-white w-fit">
          SKILLS & EDUCATION
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card 
            title="Technical Arsenal" 
            items={skills.technical} 
          />
          
          <Card 
            title="Specialized Interests" 
            items={skills.interests} 
          />
          
          <Card 
            title="Education" 
            items={[
              education[0].institution,
              education[0].degree,
              education[0].details
            ]} 
          />
        </div>
      </div>
    </section>
  );
}

function Card({ title, items }: { title: string, items: string[] }) {
  return (
    <div className="about-card glass-card rounded-2xl p-8 flex flex-col h-full transform-gpu hover:border-[#00f3ff]/40 transition-colors duration-300" style={{ perspective: '1000px' }}>
      <h3 className="text-2xl font-semibold mb-6 text-[#00f3ff] border-b border-[#00f3ff]/20 pb-4">
        {title}
      </h3>
      <ul className="flex flex-col gap-4 text-gray-300">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start">
            <span className="text-[#b026ff] mr-3 font-bold">▹</span>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

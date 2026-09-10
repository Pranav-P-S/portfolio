"use client";

import { useState, useEffect } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function Footer() {
  const { hero, references } = PORTFOLIO_DATA;
  
  const commands = [
    { cmd: "whoami", out: "pranav_ps" },
    { cmd: "cat contact.txt", out: `Email: ${hero.contact.email}\nPhone: ${hero.contact.phone}` },
    { cmd: "cat references.txt", out: references.join('\n') }
  ];

  const [history, setHistory] = useState<string[]>([]);
  const [currentCmdIdx, setCurrentCmdIdx] = useState(0);
  const [typedCmd, setTypedCmd] = useState("");

  useEffect(() => {
    if (currentCmdIdx >= commands.length) return;
    
    const targetCmd = commands[currentCmdIdx].cmd;
    let charIdx = 0;
    
    const typeInterval = setInterval(() => {
      setTypedCmd(targetCmd.slice(0, charIdx + 1));
      charIdx++;
      
      if (charIdx === targetCmd.length) {
        clearInterval(typeInterval);
        
        setTimeout(() => {
          setHistory(prev => [
            ...prev,
            `$ ${targetCmd}`,
            commands[currentCmdIdx].out
          ]);
          setTypedCmd("");
          setCurrentCmdIdx(prev => prev + 1);
        }, 600);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentCmdIdx, commands]);

  return (
    <footer className="relative min-h-[60vh] flex flex-col items-center justify-center py-24 px-6 z-10">
      <h2 className="text-3xl font-bold mb-10 glow-text-cyan text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-white">
        INITIATE CONTACT
      </h2>
      
      <div className="w-full max-w-3xl glass-card rounded-lg overflow-hidden border border-[#00f3ff]/30 shadow-[0_0_30px_rgba(0,243,255,0.1)]">
        {/* Terminal Header */}
        <div className="bg-[#030305]/80 px-4 py-2 border-b border-white/10 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2 text-xs text-gray-500 font-mono">guest@pranav-system:~</span>
        </div>
        
        {/* Terminal Body */}
        <div className="p-6 font-mono text-sm md:text-base min-h-[250px]">
          {history.map((line, idx) => (
            <div key={idx} className={line.startsWith("$") ? "text-[#00f3ff] mt-4" : "text-gray-300 whitespace-pre-wrap ml-4 mt-2"}>
              {line}
            </div>
          ))}
          
          {currentCmdIdx < commands.length && (
            <div className="text-[#00f3ff] mt-4 flex items-center gap-2">
              <span>$ {typedCmd}</span>
              <span className="w-2 h-5 bg-[#00f3ff] animate-pulse" />
            </div>
          )}
          
          {currentCmdIdx >= commands.length && (
            <div className="text-[#00f3ff] mt-4 flex items-center gap-2">
              <span>$ </span>
              <span className="w-2 h-5 bg-[#00f3ff] animate-pulse" />
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-16 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Pranav PS. Built with Next.js & React Three Fiber.</p>
      </div>
    </footer>
  );
}

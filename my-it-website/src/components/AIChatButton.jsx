import React, { useState } from 'react';
import AIChatWindow from './AIChatWindow';

const AIChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* CHAT WINDOW: 
         Preserved with z-[999999] (Standard High Priority)
      */}
      <AIChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* ORB BUTTON CONTAINER: 
         - Default: z-[999998] (Sits just below the chat box)
         - Hover: group-hover:z-[1000000] (Jumps above the chat box for interaction)
      */}
      <div className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-[999998] hover:z-[1000000] flex flex-row items-center pointer-events-none group transform-gpu transition-all duration-300">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="wa-space-orb pointer-events-auto will-change-transform"
          aria-label="Toggle AI Chat"
        >
          {/* RADIATING BLOOM EFFECT */}
          <div className="radiating-energy energy-1"></div>
          <div className="radiating-energy energy-2"></div>
          <div className="radiating-energy energy-3"></div>
          
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent z-10" />

          {/* AI ICON SVG */}
          <svg viewBox="0 0 100 100" className="w-9 h-9 md:w-11 md:h-11 relative z-20 transition-all duration-500 group-hover:scale-110">
              <circle cx="28" cy="32" r="4.5" fill="white"/>
              <line x1="28" x2="42" y1="32" y2="48" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <path d="M50 42c-15 0-27 12-27 27s12 27 27 27 27-12 27-27-12-27-27-27z" fill="white"/>
              <path d="M32 65c0-4 3-8 8-8h20c5 0 8 4 8 8v5c0 4-3 8-8 8H40c-5 0-8-4-8-8v-5z" fill="#03030b"/>
              <path d="M40 68c2-2 5-2 7 0M53 68c2-2 5-2 7 0" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <path d="M44 85c0 3 3 6 6 6s6-3 6-6" stroke="#ff00d4" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <path d="M64 28h18c3 0 5 2 5 5v12c0 3-2 5-5 5h-4l-1 6-5-6h-8c-3 0-5-2-5-5V33c0-3 2-5 5-5z" fill="white"/>
          </svg>
        </button>

        {/* SIDE LABEL (Desktop only) */}
        <div className="hidden lg:flex items-center ml-6 px-6 py-3 bg-[#03030b]/80 backdrop-blur-3xl border border-white/10 rounded-2xl text-white text-[11px] font-bold uppercase tracking-[0.4em] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out pointer-events-none shadow-[0_0_30px_rgba(255,0,212,0.2)]">
          <div className="flex items-center relative mr-4">
            <span className="animate-ping absolute h-3 w-3 rounded-full bg-[#ff00d4]"></span>
            <span className="relative rounded-full h-3 w-3 bg-gradient-to-r from-[#ff00d4] to-[#00f2ff]"></span>
          </div>
          AI Assistant
        </div>
      </div>

      <style jsx>{`
        .wa-space-orb {
          width: 65px; height: 65px;
          background: conic-gradient(from 0deg, #00f2ff, #ff00d4, #00f2ff);
          background-size: 200% 200%;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          position: relative;
          box-shadow: 0 0 40px rgba(255, 0, 212, 0.4);
          animation: spin-gradient 6s linear infinite;
          contain: layout paint;
        }

        @keyframes spin-gradient {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }

        @media (min-width: 768px) { .wa-space-orb { width: 75px; height: 75px; } }
        .wa-space-orb:hover { transform: scale(1.1) translateY(-5px); }

        .radiating-energy {
          position: absolute; inset: 0; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,0,212,0.4) 0%, rgba(0,242,255,0) 70%);
          pointer-events: none; z-index: 1; will-change: transform, opacity;
        }

        .energy-1 { animation: radiate 3s ease-out infinite; }
        .energy-2 { animation: radiate 3s ease-out infinite 1s; }
        .energy-3 { animation: radiate 3s ease-out infinite 2s; }

        @keyframes radiate {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(3); opacity: 0; }
        }

        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: rgba(255,255,255,0.1); 
          border-radius: 10px; 
        }
      `}</style>
    </>
  );
};

export default AIChatButton;
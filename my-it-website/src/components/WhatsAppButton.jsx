import React from 'react';

const WhatsAppButton = () => {
  const phoneNumber = "971527925100";
  const message = encodeURIComponent("Hello! I'd like to inquire about your services.");

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[999999] flex flex-row-reverse items-center pointer-events-none group">
      <a href={`https://wa.me/${phoneNumber}?text=${message}`} target="_blank" rel="noopener noreferrer" className="wa-planet-orb pointer-events-auto" aria-label="Contact on WhatsApp">
        {/* OPTIMIZED: Triple-layered harmonic pulse */}
        <div className="absolute inset-0 rounded-full bg-[#00f2ff] animate-pulse-core opacity-20"></div>
        <div className="absolute inset-0 rounded-full border-2 border-[#bf00ff]/30 animate-pulse-ring"></div>
        <div className="absolute inset-0 rounded-full border border-[#ff00d4]/20 animate-pulse-ring-delayed"></div>
        
        <div className="absolute inset-0 rounded-full shadow-[0_0_50px_rgba(0,242,255,0.4)] group-hover:shadow-[0_0_80px_rgba(191,0,255,0.7)] transition-shadow duration-700" />
        <div className="wa-ring wa-ring-1"></div>
        <div className="wa-ring wa-ring-2"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent opacity-40 z-30 pointer-events-none" />

        <svg viewBox="0 0 32 32" className="w-7 h-7 md:w-8 md:h-8 fill-white relative z-20 transition-all duration-500 group-hover:scale-110">
          <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825.737 5.48 2.025 7.78l-2.025 7.395 7.58-1.99c2.35 1.4 5.08 2.215 8.02 2.215 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.355c-2.585 0-4.99-.745-7.035-2.035l-.505-.315-4.485 1.175 1.2-4.385-.35-.555c-1.425-2.275-2.18-4.91-2.18-7.64 0-7.72 6.28-14 14-14s14 6.28 14 14-6.28 14-14 14zM22.9 19.33c-.385-.195-2.275-1.12-2.625-1.245s-.605-.195-.855.195-.975 1.245-1.195 1.5-.445.285-.83.09c-.385-.195-1.63-.6-3.105-1.915-1.145-1.025-1.92-2.29-2.145-2.675s-.025-.595.17-.79c.175-.175.385-.45.58-.675.19-.22.255-.385.385-.64s.065-.48-.035-.675-.855-2.065-1.17-2.825c-.305-.745-.615-.645-.855-.655s-.485-.015-.745-.015-.675.1-1.03.495c-.35.395-1.345 1.315-1.345 3.205s1.375 3.715 1.57 3.975c.195.255 2.705 4.13 6.55 5.79.915.39 1.63.625 2.185.8 1.015.32 1.935.275 2.665.165.815-.12 2.275-.93 2.59-1.83.315-.895.315-1.66.22-1.825-.095-.175-.35-.275-.735-.47z"/>
        </svg>
      </a>
      
      <div className="hidden lg:flex items-center mr-6 px-6 py-3 bg-[#03030b]/80 backdrop-blur-2xl border border-white/10 rounded-2xl text-white text-[11px] font-bold uppercase tracking-[0.3em] opacity-0 translate-x-12 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out pointer-events-none shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <div className="flex items-center relative mr-4">
          <span className="animate-ping absolute h-3 w-3 rounded-full bg-[#00f2ff] opacity-75"></span>
          <span className="relative rounded-full h-3 w-3 bg-gradient-to-r from-[#00f2ff] to-[#bf00ff]"></span>
        </div>
        WhatsApp
      </div>

      <style jsx>{`
        .wa-planet-orb {
          width: 60px; height: 60px;
          background: radial-gradient(circle at 35% 35%, #00f2ff, #bf00ff 65%, #ff00d4);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          position: relative; transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: inset -6px -6px 20px rgba(0,0,0,0.5), 0 0 30px rgba(0,242,255,0.2);
        }
        @media (min-width: 768px) { .wa-planet-orb { width: 70px; height: 70px; } }
        .wa-planet-orb:hover { transform: scale(1.15) rotate(-15deg); }

        /* OPTIMIZED KEYFRAMES */
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes pulse-core {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.1); opacity: 0.4; }
        }
        .animate-pulse-ring { animation: pulse-ring 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite; }
        .animate-pulse-ring-delayed { animation: pulse-ring 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite 1.5s; }
        .animate-pulse-core { animation: pulse-core 2s ease-in-out infinite; }

        .wa-ring { position: absolute; inset: -12px; border-radius: 50%; border: 1.5px solid rgba(0, 242, 255, 0.15); pointer-events: none; }
        .wa-ring-1 { animation: wa-orbit 3.5s ease-in-out infinite; }
        .wa-ring-2 { animation: wa-orbit 4.5s ease-in-out infinite reverse; opacity: 0.4; inset: -20px; border-color: rgba(191,0,255,0.2); }
        @keyframes wa-orbit { 0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.5; } 50% { transform: scale(1.15) rotate(-180deg); opacity: 0.2; } }
      `}</style>
    </div>
  );
};

export default WhatsAppButton;
import React from 'react';

const WhatsAppButton = () => {
  const phoneNumber = "971527925100";
  const message = encodeURIComponent("Hello! I'd like to inquire about your services.");

  return (
    /* Spacing: bottom-6 right-6 (24px) | MD: bottom-10 right-10 (40px) */
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[999999] flex flex-row-reverse items-center pointer-events-none group">
      <a 
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank" 
        rel="noopener noreferrer"
        className="wa-planet-orb pointer-events-auto"
        aria-label="Contact on WhatsApp"
      >
        {/* Orbital Atmosphere Rings */}
        <div className="wa-ring wa-ring-fast"></div>
        <div className="wa-ring wa-ring-slow"></div>
        
        {/* The Planet Core Glow */}
        <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl group-hover:bg-purple-500/40 transition-colors duration-700" />

        {/* The Icon inside the Glass Orb */}
        <svg viewBox="0 0 32 32" className="w-7 h-7 md:w-8 md:h-8 fill-white relative z-20 transition-all duration-500 group-hover:scale-110">
          <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825.737 5.48 2.025 7.78l-2.025 7.395 7.58-1.99c2.35 1.4 5.08 2.215 8.02 2.215 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.355c-2.585 0-4.99-.745-7.035-2.035l-.505-.315-4.485 1.175 1.2-4.385-.35-.555c-1.425-2.275-2.18-4.91-2.18-7.64 0-7.72 6.28-14 14-14s14 6.28 14 14-6.28 14-14 14zM22.9 19.33c-.385-.195-2.275-1.12-2.625-1.245s-.605-.195-.855.195-.975 1.245-1.195 1.5-.445.285-.83.09c-.385-.195-1.63-.6-3.105-1.915-1.145-1.025-1.92-2.29-2.145-2.675s-.025-.595.17-.79c.175-.175.385-.45.58-.675.19-.22.255-.385.385-.64s.065-.48-.035-.675-.855-2.065-1.17-2.825c-.305-.745-.615-.645-.855-.655s-.485-.015-.745-.015-.675.1-1.03.495c-.35.395-1.345 1.315-1.345 3.205s1.375 3.715 1.57 3.975c.195.255 2.705 4.13 6.55 5.79.915.39 1.63.625 2.185.8 1.015.32 1.935.275 2.665.165.815-.12 2.275-.93 2.59-1.83.315-.895.315-1.66.22-1.825-.095-.175-.35-.275-.735-.47z"/>
        </svg>
      </a>
      
      {/* Dynamic Glass Label */}
      <div className="hidden lg:flex items-center mr-6 px-5 py-2.5 bg-[#0a0a1a]/40 backdrop-blur-2xl border border-white/10 rounded-2xl text-white text-[11px] font-medium uppercase tracking-[0.3em] opacity-0 translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700 pointer-events-none">
        <span className="relative flex h-2 w-2 mr-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        WhatsApp
      </div>

      <style jsx>{`
        .wa-planet-orb {
          width: 56px; height: 56px;
          background: radial-gradient(circle at 30% 30%, #22d3ee, #7c3aed);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          position: relative; transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: wa-subtle-float 5s ease-in-out infinite;
          box-shadow: 0 0 30px rgba(6, 182, 212, 0.4), inset -5px -5px 15px rgba(0,0,0,0.3);
        }
        @media (min-width: 768px) { .wa-planet-orb { width: 68px; height: 68px; } }

        .wa-planet-orb:hover { transform: scale(1.1) rotate(-12deg); }

        .wa-ring {
          position: absolute; inset: 0; border-radius: 50%;
          border: 1px solid rgba(34, 211, 238, 0.4); pointer-events: none;
        }
        .wa-ring-fast { animation: wa-planet-pulse 3s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .wa-ring-slow { animation: wa-planet-pulse 3s cubic-bezier(0.4, 0, 0.2, 1) infinite 1.5s; }

        @keyframes wa-planet-pulse {
          0% { transform: scale(1); opacity: 0.8; border-color: rgba(34, 211, 238, 0.6); }
          100% { transform: scale(2.8); opacity: 0; border-color: rgba(124, 58, 237, 0); }
        }
        @keyframes wa-subtle-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};

export default WhatsAppButton;
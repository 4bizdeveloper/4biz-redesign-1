import React, { useEffect } from 'react';

const AIChatButton = () => {
  useEffect(() => {
    const loadFormilla = () => {
      if (window.FormillaLoaded) return;
      const head = document.getElementsByTagName("head").item(0);
      const script = document.createElement("script");
      const src = (document.location.protocol === 'https:' ? 'https://www.formilla.com/scripts/feedback.js' : 'http://www.formilla.com/scripts/feedback.js');
      script.setAttribute("type", "text/javascript");
      script.setAttribute("src", src);
      script.setAttribute("async", true);
      script.onload = () => {
        window.Formilla = window.Formilla || {};
        window.Formilla.guid = 'csb72c41-65f5-47d1-88b5-7cdd89fe90fb';
        if (window.Formilla.loadWidgets) window.Formilla.loadWidgets();
        window.FormillaLoaded = true;
      };
      head.appendChild(script);
    };
    loadFormilla();
  }, []);

  const openAIChat = () => {
    if (window.Formilla && (window.Formilla.initFormillaChat || window.Formilla.openChat)) {
      const open = window.Formilla.initFormillaChat || window.Formilla.openChat;
      open();
    }
  };

  return (
    /* Spacing: bottom-6 left-6 (24px) | MD: bottom-10 left-10 (40px) */
    <div className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-[999999] flex flex-row items-center pointer-events-none group">
      <button 
        onClick={openAIChat}
        className="ai-planet-orb pointer-events-auto"
        aria-label="Chat with AI"
      >
        {/* Orbital Atmosphere Rings */}
        <div className="ai-ring ai-ring-fast"></div>
        <div className="ai-ring ai-ring-slow"></div>
        
        {/* Core Glow */}
        <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl group-hover:bg-purple-500/40 transition-colors duration-700" />

        {/* AI Icon inside Glass Orb */}
        <svg viewBox="0 0 100 100" className="w-9 h-9 md:w-11 md:h-11 relative z-20 transition-all duration-500 group-hover:scale-110">
            <circle cx="28" cy="32" r="4.5" fill="white"/>
            <line x1="28" x2="42" y1="32" y2="48" stroke="white" stroke-width="3" stroke-linecap="round"/>
            <path d="M50 42c-15 0-27 12-27 27s12 27 27 27 27-12 27-27-12-27-27-27z" fill="white"/>
            <path d="M32 65c0-4 3-8 8-8h20c5 0 8 4 8 8v5c0 4-3 8-8 8H40c-5 0-8-4-8-8v-5z" fill="#06b6d4"/>
            <path d="M40 68c2-2 5-2 7 0M53 68c2-2 5-2 7 0" stroke="white" stroke-width="2" fill="none" stroke-linecap="round"/>
            <path d="M44 85c0 3 3 6 6 6s6-3 6-6" stroke="#06b6d4" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            <path d="M64 28h18c3 0 5 2 5 5v12c0 3-2 5-5 5h-4l-1 6-5-6h-8c-3 0-5-2-5-5V33c0-3 2-5 5-5z" fill="white"/>
            <line x1="70" y1="35" x2="82" y2="35" stroke="#06b6d4" stroke-width="2" stroke-linecap="round"/>
            <line x1="70" y1="40" x2="78" y2="40" stroke="#06b6d4" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      
      {/* Dynamic Glass Label */}
      <div className="hidden lg:flex items-center ml-6 px-5 py-2.5 bg-[#0a0a1a]/40 backdrop-blur-2xl border border-white/10 rounded-2xl text-white text-[11px] font-medium uppercase tracking-[0.3em] opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700 pointer-events-none">
        <span className="relative flex h-2 w-2 mr-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        AI Assistant
      </div>

      <style jsx>{`
        :global(#formilla-chat-button-inner), :global(.formilla-chat-launcher) { display: none !important; }

        .ai-planet-orb {
          width: 56px; height: 56px;
          background: radial-gradient(circle at 30% 30%, #22d3ee, #7c3aed);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          position: relative; transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: ai-subtle-float 5s ease-in-out infinite;
          box-shadow: 0 0 30px rgba(6, 182, 212, 0.4), inset -5px -5px 15px rgba(0,0,0,0.3);
        }
        @media (min-width: 768px) { .ai-planet-orb { width: 68px; height: 68px; } }

        .ai-planet-orb:hover { transform: scale(1.1) rotate(12deg); }

        .ai-ring {
          position: absolute; inset: 0; border-radius: 50%;
          border: 1px solid rgba(34, 211, 238, 0.4); pointer-events: none;
        }
        .ai-ring-fast { animation: ai-planet-pulse 3s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .ai-ring-slow { animation: ai-planet-pulse 3s cubic-bezier(0.4, 0, 0.2, 1) infinite 1.5s; }

        @keyframes ai-planet-pulse {
          0% { transform: scale(1); opacity: 0.8; border-color: rgba(34, 211, 238, 0.6); }
          100% { transform: scale(2.8); opacity: 0; border-color: rgba(124, 58, 237, 0); }
        }
        @keyframes ai-subtle-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};

export default AIChatButton;
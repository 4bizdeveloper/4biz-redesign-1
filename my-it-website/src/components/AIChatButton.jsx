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
    <div className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-[999999] flex flex-row items-center pointer-events-none group">
      <button onClick={openAIChat} className="ai-planet-orb pointer-events-auto" aria-label="Chat with AI">
        {/* OPTIMIZED: Triple-layered harmonic pulse */}
        <div className="absolute inset-0 rounded-full bg-[#00f2ff] animate-pulse-core opacity-20"></div>
        <div className="absolute inset-0 rounded-full border-2 border-[#bf00ff]/30 animate-pulse-ring"></div>
        <div className="absolute inset-0 rounded-full border border-[#ff00d4]/20 animate-pulse-ring-delayed"></div>
        
        <div className="absolute inset-0 rounded-full shadow-[0_0_50px_rgba(0,242,255,0.4)] group-hover:shadow-[0_0_80px_rgba(191,0,255,0.7)] transition-shadow duration-700" />
        <div className="ai-ring ai-ring-1"></div>
        <div className="ai-ring ai-ring-2"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent opacity-40 z-30 pointer-events-none" />

        <svg viewBox="0 0 100 100" className="w-9 h-9 md:w-11 md:h-11 relative z-20 transition-all duration-500 group-hover:scale-110">
            <circle cx="28" cy="32" r="4.5" fill="white"/>
            <line x1="28" x2="42" y1="32" y2="48" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <path d="M50 42c-15 0-27 12-27 27s12 27 27 27 27-12 27-27-12-27-27-27z" fill="white"/>
            <path d="M32 65c0-4 3-8 8-8h20c5 0 8 4 8 8v5c0 4-3 8-8 8H40c-5 0-8-4-8-8v-5z" fill="#03030b"/>
            <path d="M40 68c2-2 5-2 7 0M53 68c2-2 5-2 7 0" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M44 85c0 3 3 6 6 6s6-3 6-6" stroke="#ff00d4" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M64 28h18c3 0 5 2 5 5v12c0 3-2 5-5 5h-4l-1 6-5-6h-8c-3 0-5-2-5-5V33c0-3 2-5 5-5z" fill="white"/>
            <line x1="70" y1="35" x2="82" y2="35" stroke="#bf00ff" strokeWidth="2" strokeLinecap="round"/>
            <line x1="70" y1="40" x2="78" y2="40" stroke="#bf00ff" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      
      <div className="hidden lg:flex items-center ml-6 px-6 py-3 bg-[#03030b]/80 backdrop-blur-2xl border border-white/10 rounded-2xl text-white text-[11px] font-bold uppercase tracking-[0.3em] opacity-0 -translate-x-12 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out pointer-events-none shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <div className="flex items-center relative mr-4">
          <span className="animate-ping absolute h-3 w-3 rounded-full bg-[#ff00d4] opacity-75"></span>
          <span className="relative rounded-full h-3 w-3 bg-gradient-to-r from-[#00f2ff] to-[#ff00d4]"></span>
        </div>
        AI Assistant
      </div>

      <style jsx>{`
        :global(#formilla-chat-button-inner), :global(.formilla-chat-launcher) { display: none !important; }
        .ai-planet-orb {
          width: 60px; height: 60px;
          background: radial-gradient(circle at 35% 35%, #00f2ff, #bf00ff 65%, #ff00d4);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          position: relative; transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: inset -6px -6px 20px rgba(0,0,0,0.5), 0 0 30px rgba(0,242,255,0.2);
        }
        @media (min-width: 768px) { .ai-planet-orb { width: 70px; height: 70px; } }
        .ai-planet-orb:hover { transform: scale(1.15) rotate(15deg); }

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

        .ai-ring { position: absolute; inset: -12px; border-radius: 50%; border: 1.5px solid rgba(0, 242, 255, 0.15); pointer-events: none; }
        .ai-ring-1 { animation: ai-orbit 3s ease-in-out infinite; }
        .ai-ring-2 { animation: ai-orbit 4s ease-in-out infinite reverse; opacity: 0.4; inset: -20px; border-color: rgba(191,0,255,0.2); }
        @keyframes ai-orbit { 0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.5; } 50% { transform: scale(1.15) rotate(180deg); opacity: 0.2; } }
      `}</style>
    </div>
  );
};

export default AIChatButton;
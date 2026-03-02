import React, { useEffect } from 'react';

const AIChatButton = () => {
  useEffect(() => {
    const loadFormilla = () => {
      if (window.FormillaLoaded) return;
      const script = document.createElement("script");
      script.src = (document.location.protocol === 'https:' ? 'https://www.formilla.com/scripts/feedback.js' : 'http://www.formilla.com/scripts/feedback.js');
      script.async = true;
      script.onload = () => {
        window.Formilla = window.Formilla || {};
        window.Formilla.guid = 'csb72c41-65f5-47d1-88b5-7cdd89fe90fb';
        if (window.Formilla.loadWidgets) window.Formilla.loadWidgets();
        window.FormillaLoaded = true;
      };
      document.head.appendChild(script);
    };
    
    // Performance: Load the chat script after the page has had time to stabilize
    const timeout = setTimeout(loadFormilla, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const openAIChat = () => {
    if (window.Formilla && (window.Formilla.initFormillaChat || window.Formilla.openChat)) {
      const open = window.Formilla.initFormillaChat || window.Formilla.openChat;
      open();
    }
  };

  return (
    <div className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-[999999] flex flex-row items-center pointer-events-none group transform-gpu">
      <button 
        onClick={openAIChat} 
        className="space-orb-core pointer-events-auto will-change-transform" 
        aria-label="Chat with AI"
      >
        <div className="radiating-energy energy-1"></div>
        <div className="radiating-energy energy-2"></div>
        <div className="radiating-energy energy-3"></div>
        
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#ff00d4]/30 to-[#00f2ff]/30 blur-md animate-soft-pulse" />
        
        <svg viewBox="0 0 100 100" className="w-9 h-9 md:w-11 md:h-11 relative z-20 transition-transform duration-500 group-hover:scale-110">
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
      
      <div className="hidden lg:flex items-center ml-6 px-6 py-3 bg-[#03030b]/80 backdrop-blur-3xl border border-white/10 rounded-2xl text-white text-[11px] font-bold uppercase tracking-[0.4em] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out pointer-events-none shadow-[0_0_30px_rgba(255,0,212,0.2)]">
        <div className="flex items-center relative mr-4">
          <span className="animate-ping absolute h-3 w-3 rounded-full bg-[#ff00d4]"></span>
          <span className="relative rounded-full h-3 w-3 bg-gradient-to-r from-[#00f2ff] to-[#ff00d4]"></span>
        </div>
        AI Assistant
      </div>

      <style jsx>{`
        :global(#formilla-chat-button-inner), :global(.formilla-chat-launcher) { display: none !important; }
        
        .space-orb-core {
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

        @keyframes soft-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        .animate-soft-pulse { animation: soft-pulse 4s ease-in-out infinite; }

        @media (min-width: 768px) { .space-orb-core { width: 75px; height: 75px; } }
        .space-orb-core:hover { transform: scale(1.1) translateY(-5px); }

        .radiating-energy {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,0,212,0.4) 0%, rgba(0,242,255,0) 70%);
          pointer-events: none;
          z-index: 1;
          will-change: transform, opacity;
        }

        .energy-1 { animation: radiate 3s ease-out infinite; }
        .energy-2 { animation: radiate 3s ease-out infinite 1s; }
        .energy-3 { animation: radiate 3s ease-out infinite 2s; }

        @keyframes radiate {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(3); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default AIChatButton;
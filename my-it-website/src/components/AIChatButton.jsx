import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const AIChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello! I'm the 4Biz AI Assistant. How can I help you with our IT or Digital Marketing solutions today?" }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isThinking]);

  const SYSTEM_PROMPT = `
    You are the official AI Assistant for 4Biz International LLC, based in Dubai. 
    Use the following company details to answer user queries:
    - Services: Microsoft Dynamics 365 (CRM/ERP), SEO, Web Design & Development, Mobile App Development, Social Media Marketing, Domain & Hosting, Branding, and Photoshoots/Videoshoots.
    - Products: Microsoft Product Licenses, Google Workspace, Zoho Solutions, and custom-made Software/Applications.
    - Location: Office 104, Crystal Building, Al Karama, Dubai, UAE (Near ADCB Metro).
    - Contact: info@4bizinternational.com | +971 52 792 5100.
    - Style: Professional, innovative, and customer-centric. Keep answers concise.
  `;

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isThinking) return;

    const userMsg = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setIsThinking(true);

    try {
      const genAI = new GoogleGenerativeAI("AIzaSyBAMgUlhGdc4KAEk-Q3zqqXPD7ttidFCsk");
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: SYSTEM_PROMPT 
      });

      const result = await model.generateContent(currentInput);
      const response = await result.response;
      setMessages(prev => [...prev, { role: "bot", text: response.text() }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", text: "I'm having a connection issue. Please try again or contact us at +971 52 792 5100." }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <>
      {isOpen && (
        /* CHAT BOX - RESPONSIVE OPTIMIZED */
        <div className="fixed bottom-24 left-4 right-4 md:left-10 md:right-auto w-auto md:w-[400px] h-[70vh] md:h-[600px] max-h-[80vh] bg-[#03030b]/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] z-[999999] flex flex-col overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-5 transform-gpu">
          <div className="p-5 border-b border-white/10 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 flex justify-between items-center">
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></div>
               <h3 className="text-white font-bold tracking-widest uppercase text-[10px]">4Biz AI Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors p-2">✕</button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed ${msg.role === 'user' ? 'bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-tr-none' : 'bg-white/5 text-white/90 border border-white/10 rounded-tl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex items-center gap-2 text-cyan-400 text-[10px] font-mono italic">
                <span className="flex gap-1"><span className="animate-bounce">.</span><span className="animate-bounce [animation-delay:0.2s]">.</span><span className="animate-bounce [animation-delay:0.4s]">.</span></span>
                Analyzing 4Biz Ecosystem
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 bg-black/40 border-t border-white/10 flex gap-2">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Ask anything..." 
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-white/20" 
            />
            <button type="submit" className="bg-white text-black px-5 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-cyan-400 transition-colors shadow-lg">Send</button>
          </form>
        </div>
      )}

      {/* THE ORB BUTTON - STYLED EXACTLY LIKE WHATSAPP BUTTON */}
      <div className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-[999999] flex flex-row items-center pointer-events-none group transform-gpu">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="wa-space-orb pointer-events-auto will-change-transform"
          aria-label="Toggle AI Chat"
        >
          {/* RADIATING BLOOM EFFECT - Same as WhatsApp */}
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
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const AIChatWindow = ({ isOpen, onClose }) => {
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
    You are the official AI Assistant for 4Biz International LLC (https://4bizinternational.com/).
    
    CORE DIRECTIVE:
    - Learn and promote services found at: https://4bizinternational.com/services.html
    - Services include: Microsoft Dynamics 365 (CRM/ERP), SEO, Web Design & Development, Mobile App Development, Social Media Marketing, Domain & Hosting, Branding, and Photoshoots/Videoshoots.
    - Products: Microsoft Licenses, Google Workspace, Zoho Solutions, custom Applications.
    - Location: Office 104, Crystal Building, Al Karama, Dubai, UAE.
    - Contact: info@4bizinternational.com | +971 52 792 5100.

    FORMATTING RULES:
    - NEVER use markdown bolding (**) or headers (###).
    - Use plain text only.
    - For lists, use simple bullet points (•) with clear indentation.
    - Keep messages concise and professional.
    - Ensure every response feels clean and aligned.
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
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash", 
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

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 md:left-10 md:right-auto w-auto md:w-[400px] h-[70vh] md:h-[600px] max-h-[80vh] bg-[#03030b]/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] z-[999999] flex flex-col overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-5 transform-gpu">
      {/* HEADER */}
      <div className="p-5 border-b border-white/10 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]"></div>
          <h3 className="text-white font-black tracking-widest uppercase text-[10px]">4Biz Neural Interface</h3>
        </div>
        <button onClick={onClose} className="text-white hover:bg-white/10 transition-all p-2 rounded-full">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      {/* MESSAGES */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed ${msg.role === 'user' ? 'bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-tr-none' : 'bg-white/5 text-white/90 border border-white/10 rounded-tl-none'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="flex items-center gap-2 text-cyan-400 text-[10px] font-mono italic px-2">
            <span className="flex gap-1"><span className="animate-bounce">.</span><span className="animate-bounce [animation-delay:0.2s]">.</span><span className="animate-bounce [animation-delay:0.4s]">.</span></span>
            Analyzing 4Biz Ecosystem
          </div>
        )}
      </div>

      {/* INPUT FORM */}
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
  );
};

export default AIChatWindow;
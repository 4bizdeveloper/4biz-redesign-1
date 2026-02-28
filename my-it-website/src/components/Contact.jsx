import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [status, setStatus] = useState('');

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch('/api/send_mail.php', { 
        method: 'POST', 
        body: formData 
      });
      const result = await response.json();
      setStatus(result.success ? 'success' : 'error');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section ref={containerRef} id="contact" className="py-12 md:py-32 pb-40 px-4 md:px-6 relative bg-transparent overflow-hidden">
      
      {/* ATMOSPHERIC GLOW */}
      <motion.div style={{ y: y1 }} className="absolute top-1/4 -right-20 w-[280px] md:w-[800px] h-[280px] md:h-[800px] bg-[#5fd9fb]/5 blur-[80px] md:blur-[160px] rounded-full pointer-events-none" />
      <motion.div style={{ y: y2 }} className="absolute bottom-1/4 -left-20 w-[280px] md:w-[800px] h-[280px] md:h-[800px] bg-[#f028dd]/5 blur-[80px] md:blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <motion.h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5fd9fb] to-[#f028dd]">Touch</span>
          </motion.h2>
          <p className="text-[#5fd9fb] tracking-[0.3em] md:tracking-[0.5em] uppercase text-[9px] md:text-[10px] font-bold opacity-60">Initiate Secure Transmission</p>
        </div>

        <motion.div className="max-w-2xl mx-auto bg-white/[0.02] backdrop-blur-3xl rounded-[30px] md:rounded-[40px] p-6 md:p-14 border border-white/5 shadow-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8">
            
            <div className="flex flex-col gap-2 group">
              <label className="text-[#5fd9fb] text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] ml-2">Protocol: Name</label>
              <input name="name" required type="text" placeholder="Ex: Alexander Vance" className="protocol-input" />
            </div>

            <div className="flex flex-col gap-2 group">
              <label className="text-[#f028dd] text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] ml-2">Protocol: Email</label>
              <input name="email" required type="email" placeholder="vance@network-node.io" className="protocol-input" />
            </div>

            <div className="flex flex-col gap-2 group">
              <label className="text-[#5fd9fb]/60 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] ml-2">Protocol: Signal</label>
              <input name="phone" required type="tel" placeholder="+971 52 792 5100" className="protocol-input" />
            </div>

            <div className="flex flex-col gap-2 group">
              <label className="text-[#f028dd]/80 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] ml-2">Protocol: Details</label>
              <textarea name="message" required placeholder="Briefly explain your objective..." className="protocol-input h-32 md:h-40 resize-none" />
            </div>

            {/* ADJUSTED BUTTON: DEEPER COLORS FOR BETTER CONTRAST */}
            <button disabled={status === 'sending'} className="relative group overflow-hidden py-5 md:py-6 rounded-xl md:rounded-2xl transition-all active:scale-[0.98] shadow-[0_0_30px_-10px_rgba(240,40,221,0.5)]">
              {/* Darker Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#1fb6e0] via-[#c415b2] to-[#1fb6e0] bg-[length:200%_100%] animate-gradient-shift" />
              
              <div className="relative z-10 flex items-center justify-center gap-3 text-white font-black uppercase tracking-[0.4em] text-[10px] md:text-[11px] drop-shadow-md">
                {status === 'sending' ? 'TRANSMITTING...' : 'INITIATE TRANSMISSION'}
                <FaPaperPlane className="group-hover:translate-x-2 transition-transform" />
              </div>
            </button>
            
            {status === 'success' && <p className="text-center text-[#5fd9fb] text-[10px] font-bold uppercase tracking-widest animate-pulse mt-2">Transmission Received</p>}
          </form>
        </motion.div>
      </div>

      <style>{`
        .protocol-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          padding: 1rem 1.25rem;
          color: white;
          outline: none;
          transition: all 0.3s ease;
          font-size: 0.875rem;
        }

        @media (min-width: 768px) {
          .protocol-input { border-radius: 1rem; padding: 1.25rem 1.5rem; }
        }

        .protocol-input:focus {
          border-color: rgba(95, 217, 251, 0.4);
          background: rgba(255, 255, 255, 0.05);
        }

        .protocol-input::placeholder { color: rgba(255, 255, 255, 0.1); }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-shift { animation: gradient-shift 3s ease infinite; }
      `}</style>
    </section>
  );
};

export default Contact;
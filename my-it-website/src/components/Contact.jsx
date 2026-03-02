import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiRocketLine, RiCheckboxCircleLine, RiErrorWarningLine } from 'react-icons/ri';
import itplanet_image from '../assets/images/itplanet.avif';

const Contact = () => {
  const [status, setStatus] = useState(''); 
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setMsg('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('./send-mail.php', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const text = await response.text();
      let result;
      try {
          result = JSON.parse(text);
      } catch (err) {
          throw new Error("Server communication error.");
      }

      if (result.status === 'success') {
        setStatus('success');
        e.target.reset();
      } else {
        setStatus('error');
        setMsg(result.message || "Unknown Server Error");
      }
    } catch (error) {
      setStatus('error');
      setMsg(error.message);
    }
  };

  return (
    <section 
      id="contact" 
      className="py-20 px-4 md:px-10 relative bg-transparent overflow-hidden"
      style={{ contentVisibility: 'auto', containmentIntrinsicSize: '0 800px' }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* IMAGE SIDE - OPTIMIZED HOLOGRAPHIC CORE */}
        <div className="flex justify-center order-2 lg:order-1 relative select-none pointer-events-none">
          <motion.div 
            className="relative w-full max-w-[500px] aspect-square flex items-center justify-center will-change-transform"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            
            {/* ATMOSPHERIC BACKGLOW - Performance: Reduced blur for mobile GPU */}
            <div className="absolute w-[70%] h-[70%] bg-cyan-500/10 rounded-full blur-[80px] md:blur-[120px] -z-10 translate-z-0" />

            {/* HUD RINGS - Optimized with CSS-only rotation where possible */}
            <div className="absolute inset-0 border border-white/5 rounded-full scale-110" />
            <div className="absolute inset-4 border border-dashed border-cyan-500/20 rounded-full animate-spin-ultra-slow" />
            
            {/* Floating Data Dots - Performance: translateZ for GPU layer */}
            <div className="absolute inset-0 rounded-full animate-spin-reverse-slow">
              <div className="absolute top-0 left-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee] opacity-80" />
              <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7] opacity-80" />
            </div>

            {/* THE HOLOGRAPHIC IMAGE CORE */}
            <motion.div 
              className="relative z-10 w-[82%] h-[82%] rounded-full border border-white/10 p-1 bg-[#050510]/40 backdrop-blur-sm shadow-2xl overflow-hidden will-change-transform"
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{ transform: 'translateZ(0)' }}
            >
              <div 
                className="w-full h-full rounded-full relative overflow-hidden"
                style={{
                  maskImage: 'radial-gradient(circle at center, black 50%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 100%)',
                }}
              >
                <motion.img 
                  src={itplanet_image} 
                  alt="Holographic Planet"
                  loading="lazy"
                  className="w-full h-full object-cover saturate-[1.3] brightness-[0.8] mix-blend-lighten opacity-70 will-change-transform" 
                  animate={{ scale: [1.1, 1.15, 1.1] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent" />
              </div>
              <div className="absolute inset-0 rounded-full border-[1px] border-white/5 pointer-events-none" />
            </motion.div>

          </motion.div>
        </div>

        {/* FORM SIDE */}
        <div className="order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
              Initiate Secure <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">Transmission</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input required name="name" placeholder="Name" className="contact-input" />
                <input required name="email" type="email" placeholder="Email" className="contact-input" />
              </div>
              <input required name="phone" type="tel" placeholder="Phone (Signal)" className="contact-input" />
              <textarea required name="message" placeholder="Mission Brief" className="contact-input h-32 resize-none" />

              <button 
                disabled={status === 'sending'}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl tracking-widest uppercase text-[10px] flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {status === 'sending' ? 'TRANSMITTING...' : 'ESTABLISH LINK'}
                <RiRocketLine className={status === 'sending' ? 'animate-bounce' : ''} />
              </button>

              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0 }}
                    className="p-4 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono rounded-lg flex items-center gap-2"
                  >
                    <RiCheckboxCircleLine /> TRANSMISSION SUCCESSFUL. DATA RECEIVED.
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-mono rounded-lg flex items-center gap-2"
                  >
                    <RiErrorWarningLine /> UPLINK FAILED: {msg}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .contact-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 1rem;
          color: white;
          border-radius: 12px;
          outline: none;
          transition: border-color 0.3s ease, background 0.3s ease;
          font-size: 14px;
        }
        .contact-input:focus { border-color: #22d3ee; background: rgba(255,255,255,0.06); }
        
        @keyframes spin-ultra-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-spin-ultra-slow { animation: spin-ultra-slow 60s linear infinite; }
        .animate-spin-reverse-slow { animation: spin-reverse-slow 40s linear infinite; }
      `}</style>
    </section>
  );
};

export default Contact;
import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiRocketLine, RiCheckboxCircleLine, RiErrorWarningLine } from 'react-icons/ri';
import itplanet_image from '../assets/images/itplanet.avif';

// MEMOIZED COMPONENTS: Prevents re-renders of heavy holographic effects when typing in form
const HolographicCore = memo(() => (
  <div className="flex justify-center order-1 lg:order-1 relative select-none pointer-events-none mb-8 lg:mb-0 transform-gpu">
    <motion.div 
      className="relative w-full max-w-[320px] md:max-w-[450px] aspect-square flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // Optimized Bezier for smoothness
    >
      {/* ATMOSPHERIC BACKGLOW - Using transform-gpu to offload to Graphics Card */}
      <div className="absolute w-[70%] h-[70%] bg-cyan-500/10 rounded-full blur-[60px] md:blur-[100px] -z-10 transform-gpu translate-z-0" />

      {/* HUD RINGS - CSS Animation is smoother than JS-driven for infinite loops */}
      <div className="absolute inset-0 border border-white/5 rounded-full scale-110" />
      <div className="absolute inset-4 border border-dashed border-cyan-500/20 rounded-full animate-spin-ultra-slow will-change-transform" />
      
      {/* Floating Data Dots */}
      <div className="absolute inset-0 rounded-full animate-spin-reverse-slow will-change-transform">
        <div className="absolute top-0 left-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee] opacity-80" />
        <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7] opacity-80" />
      </div>

      {/* THE HOLOGRAPHIC IMAGE CORE */}
      <motion.div 
        className="relative z-10 w-[82%] h-[82%] rounded-full border border-white/10 p-1 bg-[#050510]/40 backdrop-blur-sm shadow-2xl overflow-hidden will-change-transform"
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transform: 'translateZ(0)' }}
      >
        <div 
          className="w-full h-full rounded-full relative overflow-hidden"
          style={{
            maskImage: 'radial-gradient(circle at center, black 50%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 100%)',
            transform: 'translateZ(0)' // Force GPU Layer
          }}
        >
          <motion.img 
            src={itplanet_image} 
            alt="Holographic Planet"
            loading="lazy"
            className="w-full h-full object-cover saturate-[1.3] brightness-[0.8] mix-blend-lighten opacity-70" 
            animate={{ scale: [1.05, 1.1, 1.05] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10 mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>
        <div className="absolute inset-0 rounded-full border-[1px] border-white/5 pointer-events-none" />
      </motion.div>
    </motion.div>
  </div>
));

HolographicCore.displayName = 'HolographicCore';

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
      // py-10 to py-16 ensures sections don't 'pop' into view too aggressively
      className="py-10 md:py-16 px-4 md:px-10 relative bg-transparent overflow-hidden transform-gpu"
      // CSS Containment: Prevents this section from triggering layout updates in the Map or Footer
      style={{ 
        contentVisibility: 'auto', 
        containmentIntrinsicSize: '0 500px',
        contain: 'layout style'
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        
        <HolographicCore />

        {/* FORM SIDE */}
        <div className="order-2 lg:order-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tighter text-center lg:text-left">
              Initiate Secure <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">Transmission</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3 max-w-[550px] mx-auto lg:mx-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input required name="name" placeholder="Name" className="contact-input" />
                <input required name="email" type="email" placeholder="Email" className="contact-input" />
              </div>
              <input required name="phone" type="tel" placeholder="Phone (Signal)" className="contact-input" />
              <textarea required name="message" placeholder="Mission Brief" className="contact-input h-28 resize-none" />

              <button 
                disabled={status === 'sending'}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl tracking-widest uppercase text-[10px] flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-50 transform-gpu"
              >
                {status === 'sending' ? 'TRANSMITTING...' : 'ESTABLISH LINK'}
                <RiRocketLine className={status === 'sending' ? 'animate-bounce' : ''} />
              </button>

              <AnimatePresence mode="wait">
                {status && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0 }}
                    className={`p-3 border rounded-lg flex items-center gap-2 text-[10px] font-mono ${
                      status === 'success' ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}
                  >
                    {status === 'success' ? <RiCheckboxCircleLine /> : <RiErrorWarningLine />}
                    {status === 'success' ? 'TRANSMISSION SUCCESSFUL.' : `UPLINK FAILED: ${msg}`}
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
          padding: 0.85rem;
          color: white;
          border-radius: 12px;
          outline: none;
          transition: border-color 0.2s ease, background 0.2s ease;
          font-size: 14px;
        }
        .contact-input:focus { 
           border-color: #22d3ee; 
           background: rgba(255,255,255,0.06);
           box-shadow: 0 0 15px rgba(34,211,238,0.1);
        }
        
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

        /* Performance boost: Stop animations when section is off-screen */
        @media (prefers-reduced-motion: no-preference) {
          section:not(:visible) .animate-spin-ultra-slow,
          section:not(:visible) .animate-spin-reverse-slow {
            animation-play-state: paused;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
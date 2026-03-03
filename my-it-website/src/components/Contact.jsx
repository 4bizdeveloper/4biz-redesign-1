import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiRocketLine, RiCheckboxCircleLine, RiErrorWarningLine, RiLoader4Line } from 'react-icons/ri';
import itplanet_image from '../assets/images/itplanet.avif';

// MEMOIZED HOLOGRAPHIC CORE: Using GPU acceleration to prevent main-thread lag
const HolographicCore = memo(() => (
  <div className="flex justify-center order-1 lg:order-1 relative select-none pointer-events-none mb-8 lg:mb-0 transform-gpu">
    <motion.div 
      className="relative w-full max-w-[320px] md:max-w-[450px] aspect-square flex items-center justify-center will-change-transform"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background Glow - translateZ(0) forces GPU rendering */}
      <div className="absolute w-[70%] h-[70%] bg-cyan-500/10 rounded-full blur-[60px] md:blur-[100px] -z-10 transform-gpu translate-z-0" />
      
      {/* Animated Rings - Optimized with will-change to prevent 'shaking' during scroll */}
      <div className="absolute inset-0 border border-white/5 rounded-full scale-110 pointer-events-none" />
      <div className="absolute inset-4 border border-dashed border-cyan-500/20 rounded-full animate-spin-ultra-slow will-change-transform" />
      
      <div className="absolute inset-0 rounded-full animate-spin-reverse-slow will-change-transform">
        <div className="absolute top-0 left-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee] opacity-80" />
        <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7] opacity-80" />
      </div>

      <motion.div 
        className="relative z-10 w-[82%] h-[82%] rounded-full border border-white/10 p-1 bg-[#050510]/40 backdrop-blur-sm shadow-2xl overflow-hidden will-change-transform"
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full rounded-full relative overflow-hidden" 
             style={{ 
               maskImage: 'radial-gradient(circle, black 50%, transparent 100%)', 
               WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 100%)',
               transform: 'translateZ(0)' 
             }}>
          <motion.img 
            src={itplanet_image} 
            alt="Holographic Planet"
            loading="eager" // Eager for immediate display if in viewport
            decoding="async"
            className="w-full h-full object-cover saturate-[1.3] brightness-[0.8] mix-blend-lighten opacity-70 transform-gpu" 
            animate={{ scale: [1.05, 1.1, 1.05] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  </div>
));

const Contact = () => {
  const [status, setStatus] = useState(''); 
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('./send-mail.php', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error(`Status: ${response.status}`);

      const text = await response.text();
      let result;
      try {
          result = JSON.parse(text);
      } catch (err) {
          throw new Error("Format error");
      }

      if (result.status === 'success') {
        setStatus('success');
        e.target.reset();
      } else {
        throw new Error(result.message || "Interrupted");
      }
    } catch (error) {
      setStatus('error');
      setErrorMsg(error.message);
    }
  };

  return (
    <section 
      id="contact" 
      className="py-12 md:py-20 px-4 md:px-10 relative bg-transparent overflow-hidden transform-gpu" 
      style={{ 
        contentVisibility: 'auto', 
        contain: 'paint layout', // Prevents internal changes from affecting document scroll
        containmentIntrinsicSize: '1px 700px'
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        <HolographicCore />

        <div className="order-2 lg:order-2">
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tighter text-center lg:text-left">
              Initiate Secure <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">Transmission</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-[550px] mx-auto lg:mx-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required name="name" placeholder="Full Name *" className="contact-input" />
                <input required name="email" type="email" placeholder="Email Address *" className="contact-input" />
              </div>
              <input required name="phone" type="tel" placeholder="Phone Number *" className="contact-input" />
              <textarea name="message" placeholder="Mission Brief (Optional)" className="contact-input h-32 resize-none" />

              <button 
                disabled={status === 'sending'}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl tracking-[0.2em] uppercase text-[10px] flex items-center justify-center gap-3 active:scale-[0.98] transition-all disabled:opacity-70 transform-gpu shadow-lg shadow-cyan-500/10"
              >
                {status === 'sending' ? (
                  <>
                    <RiLoader4Line className="animate-spin text-lg" />
                    ESTABLISHING UPLINK...
                  </>
                ) : (
                  <>
                    ESTABLISH LINK
                    <RiRocketLine className="text-lg" />
                  </>
                )}
              </button>

              <AnimatePresence mode="wait">
                {status !== 'sending' && status !== '' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`p-4 border rounded-xl flex items-center gap-3 text-[11px] font-mono leading-tight ${
                      status === 'success' ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}
                  >
                    {status === 'success' ? <RiCheckboxCircleLine className="text-xl shrink-0" /> : <RiErrorWarningLine className="text-xl shrink-0" />}
                    <span className="uppercase tracking-wider">
                      {status === 'success' ? 'TRANSMISSION SUCCESSFUL. SECURE UPLINK VERIFIED.' : `CRITICAL ERROR: ${errorMsg}`}
                    </span>
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
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 15px;
          -webkit-appearance: none;
        }
        .contact-input:focus { 
           border-color: #22d3ee; 
           background: rgba(255,255,255,0.06);
           box-shadow: 0 0 25px rgba(34,211,238,0.15);
           transform: translateY(-1px);
        }
        @keyframes spin-ultra-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-reverse-slow { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        .animate-spin-ultra-slow { animation: spin-ultra-slow 60s linear infinite; }
        .animate-spin-reverse-slow { animation: spin-reverse-slow 40s linear infinite; }
        
        /* Optimization: Disable blur filters on low-power devices if needed, 
           but here we use will-change to handle it on the GPU */
      `}</style>
    </section>
  );
};

export default Contact;
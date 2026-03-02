import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiRocketLine, RiCheckboxCircleLine, RiErrorWarningLine } from 'react-icons/ri';
import itplanet_image from '../assets/images/itplanet.png';

const Contact = () => {
  const [status, setStatus] = useState(''); // '', 'sending', 'success', 'error'
  const [msg, setMsg] = useState('');
  const containerRef = useRef(null);

  // ... (imports remain the same)

const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus('sending');
  setMsg('');

  const formData = {
    name: e.target.name.value,
    email: e.target.email.value,
    phone: e.target.phone.value,
    message: e.target.message.value,
  };

  try {
    // Relative path is safer for production on Hostinger
    const response = await fetch('./send-mail.php', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    // Check if the server actually returned JSON
    const text = await response.text();
    let result;
    try {
        result = JSON.parse(text);
    } catch (e) {
        throw new Error("Server did not return valid JSON. Check PHP file paths.");
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
    setMsg(error.message || "Connection failed. Check server path.");
  }
};

// ... (rest of the component remains the same)


  return (
    <section id="contact" className="py-20 px-4 md:px-10 relative bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
       
{/* IMAGE SIDE - LEGACY-STYLE ULTRA MODERN MERGE */}
<div className="flex justify-center order-2 lg:order-1 relative select-none pointer-events-none">
  <motion.div 
    className="relative w-full max-w-[500px] aspect-square flex items-center justify-center"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
  >
    
    {/* 1. ATMOSPHERIC BACKGLOW (Legacy Depth) */}
    <div className="absolute w-[80%] h-[80%] bg-cyan-500/10 rounded-full blur-[100px] -z-10" />

    {/* 2. LAYERED HUD RINGS (Matches Legacy Section) */}
    <div className="absolute inset-0 border border-white/5 rounded-full scale-110" />
    <motion.div 
      className="absolute inset-4 border border-dashed border-cyan-500/20 rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    />
    
    {/* Floating Data Dots */}
    <motion.div 
      className="absolute inset-0 rounded-full"
      animate={{ rotate: -360 }}
      transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute top-0 left-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee] animate-pulse" />
      <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-purple-500 rounded-full shadow-[0_0_15px_#a855f7] animate-pulse" />
    </motion.div>

    {/* 3. THE HOLOGRAPHIC IMAGE CORE */}
    <motion.div 
      className="relative z-10 w-[85%] h-[85%] rounded-full border border-white/10 p-1 bg-[#050510]/40 backdrop-blur-md shadow-2xl overflow-hidden"
      animate={{
        y: [-12, 12, -12],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div 
        className="w-full h-full rounded-full relative overflow-hidden"
        style={{
          // Sharp circular mask with soft edge merge
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 98%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 98%)',
        }}
      >
        <motion.img 
          src={itplanet_image} 
          alt="Celestial Body"
          className="w-full h-full object-cover saturate-[1.5] brightness-[0.8] mix-blend-lighten opacity-80" 
          animate={{ 
            scale: [1.1, 1.2, 1.1],
            rotate: [0, 2, 0] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 4. INTERNAL HOLOGRAPHIC LIGHTING (Matches Legacy Gradient) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-purple-500/20 mix-blend-overlay" />
        
        {/* Directional "Void" Shadow for background merging */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent" />
      </div>

      {/* 5. PROTECTIVE GLASS SHINE (The "Modern" Touch) */}
      <div className="absolute inset-0 rounded-full border-[2px] border-white/5 shadow-[inset_0_0_40px_rgba(255,255,255,0.05)] pointer-events-none" />
    </motion.div>

    {/* 6. DECORATIVE SIDE PARTICLES */}
    <div className="hidden md:block absolute top-10 right-0 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
    <div className="hidden md:block absolute bottom-10 left-0 w-1 h-1 bg-purple-400 rounded-full animate-pulse" />

  </motion.div>
</div>


        {/* FORM SIDE */}
        <div className="order-1 lg:order-2">
          <h3 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
            Initiate Secure <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Transmission</span>
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
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl tracking-widest uppercase text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
            >
              {status === 'sending' ? 'TRANSMITTING...' : 'ESTABLISH LINK'}
              <RiRocketLine />
            </button>

            {/* FEEDBACK MESSAGES */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono rounded-lg flex items-center gap-2">
                  <RiCheckboxCircleLine /> TRANSMISSION SUCCESSFUL. DATA RECEIVED.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono rounded-lg flex items-center gap-2">
                  <RiErrorWarningLine /> UPLINK FAILED: {msg}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>

      <style jsx>{`
        .contact-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 1rem;
          color: white;
          border-radius: 12px;
          outline: none;
          transition: 0.3s;
        }
        .contact-input:focus { border-color: #22d3ee; background: rgba(255,255,255,0.07); }
      `}</style>
    </section>
  );
};

export default Contact;
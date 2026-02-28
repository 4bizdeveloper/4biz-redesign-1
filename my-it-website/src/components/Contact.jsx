import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const [country, setCountry] = useState('ae');

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        if (data.country_code) {
          setCountry(data.country_code.toLowerCase());
        }
      } catch (error) {
        setCountry('ae'); 
      }
    };
    detectCountry();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const formData = new FormData(e.target);
    formData.append('phone', phone);

    try {
      const response = await fetch('/api/send_mail.php', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (result.success) setStatus('success');
      else setStatus('error');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="pt-32 pb-44 px-6 relative overflow-hidden bg-transparent">
      
      {/* --- UNIFIED BACKGROUND (BLUE & ROSE MIX) --- */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[#020207]/60" /> 
        
        {/* Ambient Rose Glow */}
        <div className="absolute top-[-10%] right-[-5%] w-[70%] h-[70%] rounded-full bg-purple-600/10 blur-[120px]" />
        
        {/* Ambient Blue Glow */}
        <div className="absolute bottom-[-10%] left-[-5%] w-[70%] h-[70%] rounded-full bg-cyan-600/10 blur-[120px]" />
        
        {/* Subtle Cyber Grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* --- HEADER INSIDE SAME BACKGROUND --- */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4"
          >
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Touch</span>
          </motion.h2>
          <p className="text-white/40 tracking-[0.5em] uppercase text-[10px] font-bold">Initiate Secure Communication</p>
        </div>

        {/* --- FORM CONTAINER --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[40px] p-8 md:p-14 shadow-[0_0_80px_rgba(0,0,0,0.4)]"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            
            <div className="flex flex-col gap-3">
              <label className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] ml-2">Protocol: Name</label>
              <input 
                name="name" required type="text" placeholder="Ex: Alexander Vance" 
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white focus:border-cyan-400/50 focus:bg-white/[0.05] outline-none transition-all placeholder:text-white/10"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-purple-400 text-[10px] font-black uppercase tracking-[0.4em] ml-2">Protocol: Email</label>
              <input 
                name="email" required type="email" placeholder="vance@network-node.io" 
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white focus:border-purple-400/50 focus:bg-white/[0.05] outline-none transition-all placeholder:text-white/10"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-white/50 text-[10px] font-black uppercase tracking-[0.4em] ml-2">Protocol: Signal</label>
              <div className="modern-phone-input-container relative">
                <PhoneInput
                  country={country}
                  value={phone}
                  onChange={setPhone}
                  placeholder="Enter contact frequency"
                  containerClass="!bg-transparent"
                  inputClass="!w-full !bg-white/[0.03] !border-white/10 !rounded-2xl !py-8 !text-white !text-lg !focus:border-white/30 !focus:bg-white/[0.05] !placeholder-white/10"
                  buttonClass="!bg-transparent !border-none !rounded-l-2xl"
                  dropdownClass="custom-phone-dropdown"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-white/50 text-[10px] font-black uppercase tracking-[0.4em] ml-2">Protocol: Details</label>
              <textarea 
                name="message" required placeholder="Briefly explain your objective..." 
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-6 h-40 text-white focus:border-white/30 focus:bg-white/[0.05] outline-none transition-all placeholder:text-white/10 resize-none"
              />
            </div>

            {/* --- IMPROVED ACTION BUTTON --- */}
            <button 
              disabled={status === 'sending'}
              className="relative group overflow-hidden mt-6 py-6 bg-transparent border border-white/10 text-white font-black rounded-2xl transition-all uppercase tracking-[0.4em] text-[11px] flex items-center justify-center gap-4 active:scale-[0.98] disabled:opacity-50"
            >
              {/* Button Hover Background (Vibrant Blue) */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              
              {/* Button Static Background (Gradients from your current hover colors) */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 group-hover:opacity-0 transition-opacity duration-500 -z-10" />

              <span className="relative z-10 transition-colors duration-300">
                {status === 'sending' ? 'TRANSMITTING...' : 'INITIATE TRANSMISSION'}
              </span>
              <FaPaperPlane className="relative z-10 group-hover:translate-x-3 group-hover:-translate-y-2 transition-all duration-500" />
            </button>

            {status === 'success' && (
              <p className="text-cyan-400 text-center text-[10px] font-black tracking-widest uppercase animate-pulse">
                Data Packet Received Successfully
              </p>
            )}
          </form>
        </motion.div>
      </div>

      <style>{`
        /* Dropdown Alignment Fix */
        .modern-phone-input-container { position: relative; }
        .modern-phone-input-container .flag-dropdown {
          background: transparent !important; border: none !important;
          display: flex !important; align-items: center !important;
        }
        .modern-phone-input-container .selected-flag {
          background: transparent !important; width: 60px !important;
          display: flex !important; align-items: center !important; justify-content: center !important;
        }
        .modern-phone-input-container .custom-phone-dropdown {
          background-color: rgba(10, 10, 18, 0.9) !important;
          backdrop-filter: blur(25px) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: white !important;
          border-radius: 15px !important;
          margin-top: 12px !important;
          left: 0 !important;
          box-shadow: 0 20px 50px rgba(0,0,0,0.8) !important;
        }
        .modern-phone-input-container .form-control {
          padding-left: 70px !important; background: transparent !important;
        }
        .modern-phone-input-container .selected-flag .flag { transform: scale(1.4) !important; }
        
        /* Remove stubborn white country highlights */
        .modern-phone-input-container .country-list .country.highlight,
        .modern-phone-input-container .country-list .country:hover {
          background-color: rgba(34, 211, 238, 0.1) !important;
          color: #22d3ee !important;
        }

        /* Autofill transparency */
        input:-webkit-autofill {
          -webkit-text-fill-color: white !important;
          -webkit-box-shadow: 0 0 0px 1000px #0a0a15 inset !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </section>
  );
};

export default Contact;
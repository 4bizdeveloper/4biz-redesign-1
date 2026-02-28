import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaFacebookF, FaInstagram, FaLinkedinIn, 
  FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFileDownload 
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import logo_image from '../assets/images/4biz_logo.png';

const Footer = () => {
  const socialLinks = [
    { icon: <FaFacebookF />, url: "https://www.facebook.com/4bizglobal" },
    { icon: <FaInstagram />, url: "https://www.instagram.com/4biz_ae" },
    { icon: <FaLinkedinIn />, url: "https://www.linkedin.com/company/4biz-international/" },
    { icon: <FaXTwitter />, url: "https://x.com/4biz123" },
    { icon: <FaYoutube />, url: "https://www.youtube.com/@4bizinternationalae" },
  ];

  return (
    <footer className="relative z-10 bg-transparent mt-20 pt-64 pb-48 md:pb-40 lg:pb-32 overflow-hidden border-t border-white/10">
      {/* ULTRA MODERN BACKGROUND OVERLAY - Blue & Rose Mix */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {/* Base Dark Glass */}
        <div className="absolute inset-0 bg-[#020207]/60 backdrop-blur-3xl" />
        
        {/* The Blended Color Wash */}
        <div className="absolute inset-0 opacity-30 mix-blend-screen bg-gradient-to-br from-cyan-900 via-transparent to-purple-900" />
        
        {/* Floating Nebula Orbs */}
        <motion.div 
          animate={{ x: [0, 30, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(34,211,238,0.15),transparent_50%)]" 
        />
        <motion.div 
          animate={{ x: [0, -30, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.15),transparent_50%)]" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-24 items-start">
          
          {/* Brand Column */}
          <div className="flex flex-col items-start">
            <img 
              src={logo_image} 
              alt="4Biz International" 
              className="h-16 w-auto mb-10 brightness-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            />
            <p className="text-white/70 text-sm leading-relaxed max-w-xs font-medium italic border-l-2 border-white/10 pl-6 mb-10">
              "Redefining IT excellence through innovative digital solutions and secure architecture for global leaders."
            </p>
            
            <div className="flex gap-4">
              {socialLinks.map((link, i) => (
                <a 
                  key={i} 
                  href={link.url} 
                  target="_blank" 
                  className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center text-white/80 transition-all duration-500 hover:border-cyan-400/50 hover:bg-gradient-to-tr hover:from-cyan-500/10 hover:to-purple-500/10 hover:text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="lg:pl-8">
            <h4 className="text-white/40 font-black mb-10 uppercase tracking-[0.5em] text-[9px]">
              Terminal / Contact
            </h4>
            <ul className="space-y-8 text-white text-sm font-medium">
              <li className="flex gap-5 items-start group">
                <FaMapMarkerAlt className="mt-1 shrink-0 group-hover:text-cyan-400 transition-colors" />
                <span className="leading-relaxed group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-400 transition-all">
                  Office 104, Crystal Building, <br />Near ADCB Metro Station, <br />Al Karama Dubai, UAE
                </span>
              </li>
              <li className="flex gap-5 items-center group">
                <FaPhoneAlt className="shrink-0 group-hover:text-purple-400 transition-colors" />
                <a href="tel:+971527925100" className="group-hover:text-purple-400 transition-colors">+971 52 79 25 100</a>
              </li>
              <li className="flex gap-5 items-center group">
                <FaEnvelope className="shrink-0 group-hover:text-cyan-400 transition-colors" />
                <a href="mailto:info@4bizinternational.com" className="lowercase group-hover:text-cyan-400 transition-colors">info@4bizinternational.com</a>
              </li>
            </ul>
          </div>

          {/* Menu Column */}
          <div className="lg:pl-8">
            <h4 className="text-white/40 font-black mb-10 uppercase tracking-[0.5em] text-[9px]">
              System / Navigation
            </h4>
            <div className="flex flex-col gap-8">
              <ul className="flex flex-col gap-4 text-white/60 text-xs font-black uppercase tracking-[0.3em]">
                {['HOME', 'ABOUT', 'SERVICES', 'CONTACT'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="relative group flex items-center gap-3 overflow-hidden transition-all hover:text-white">
                      <span className="h-[1px] w-0 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-6" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
              
              <a 
                href="https://4bizinternational.com/assets/images/4bizprofile.pdf" 
                target="_blank" 
                className="group relative overflow-hidden bg-white/[0.03] border border-white/10 text-white text-[10px] font-black py-6 px-8 rounded-2xl transition-all uppercase tracking-[0.4em] flex items-center justify-between"
              >
                {/* Modern Hover Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <span className="relative z-10 group-hover:tracking-[0.5em] transition-all duration-500">Download Brochure</span>
                <FaFileDownload className="relative z-10 text-white group-hover:text-cyan-400 group-hover:scale-125 transition-all" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
             <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(168,85,247,0.6)]" />
             <p className="text-white/20 text-[8px] uppercase tracking-[0.6em] font-bold">
               © 2026 4Biz International // Powered by Innovation
             </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
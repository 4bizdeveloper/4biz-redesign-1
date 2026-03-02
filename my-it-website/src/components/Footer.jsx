import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope 
} from 'react-icons/fa';
import { 
  RiFacebookFill, RiInstagramLine, RiLinkedinFill, 
  RiYoutubeFill, RiTwitterXFill, RiDownloadCloud2Line 
} from 'react-icons/ri';
import logo_image from '../assets/images/4biz_logo.png';

const Footer = () => {
  const footerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const socialLinks = [
    { icon: <RiFacebookFill />, url: "https://www.facebook.com/4bizglobal" },
    { icon: <RiInstagramLine />, url: "https://www.instagram.com/4biz_ae" },
    { icon: <RiLinkedinFill />, url: "https://www.linkedin.com/company/4biz-international/" },
    { icon: <RiTwitterXFill />, url: "https://x.com/4biz123" },
    { icon: <RiYoutubeFill />, url: "https://www.youtube.com/@4bizinternationalae" },
  ];

  return (
    <footer 
      ref={footerRef} 
      // Added pb-32 for mobile and pb-40 for larger screens to clear fixed icons
      className="relative z-10 bg-transparent mt-12 md:mt-24 pt-24 md:pt-48 pb-32 md:pb-40 lg:pb-48 overflow-hidden border-t border-white/5"
    >
      
      {/* --- ATMOSPHERIC GRADIENTS --- */}
      <motion.div 
        style={{ y: y1 }} 
        className="absolute top-0 -right-20 w-[250px] md:w-[800px] h-[250px] md:h-[800px] bg-cyan-500/10 blur-[80px] md:blur-[160px] rounded-full pointer-events-none -z-10" 
      />
      <motion.div 
        style={{ y: y2 }} 
        className="absolute bottom-0 -left-20 w-[250px] md:w-[800px] h-[250px] md:h-[800px] bg-purple-600/10 blur-[80px] md:blur-[160px] rounded-full pointer-events-none -z-10" 
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Responsive Grid: 1 col on mobile, 2 on tablet, 12-col architecture on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 md:gap-16 lg:gap-8 mb-20 items-start">
          
          {/* BRAND ARCHITECTURE */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-8 md:space-y-10">
            <motion.img 
              whileHover={{ scale: 1.05, filter: "brightness(1.3)" }}
              src={logo_image} 
              alt="4Biz International" 
              className="h-12 md:h-16 w-auto drop-shadow-[0_0_25px_rgba(34,211,238,0.4)]"
            />
            <p className="text-white/50 text-sm md:text-lg leading-relaxed font-medium max-w-md border-l-[3px] border-cyan-400 pl-6 md:pl-8 italic">
              "Engineering secure digital frontiers and redefining IT excellence for the next generation of global leaders."
            </p>
            
            <div className="flex flex-wrap gap-3 md:gap-4">
              {socialLinks.map((link, i) => (
                <a 
                  key={i} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border border-white/10 flex items-center justify-center text-xl md:text-2xl text-white/40 transition-all duration-500 hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:-translate-y-2"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* CONTACT TERMINAL */}
          <div className="lg:col-span-4 flex flex-col space-y-8 md:space-y-10">
            <h4 className="text-cyan-400 font-black uppercase tracking-[0.5em] text-[10px] md:text-[11px] opacity-70">
              Terminal / Logistics
            </h4>
            <ul className="space-y-6 md:space-y-8 text-white/70 text-sm md:text-base">
              <li className="flex gap-4 md:gap-5 items-start group">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-purple-500/20 transition-colors">
                  <FaMapMarkerAlt className="text-purple-500 text-base md:text-lg" />
                </div>
                <span className="leading-relaxed group-hover:text-white transition-colors">
                  Office 104, Crystal Building, Al Karama<br />
                  Near ADCB Metro, Dubai, UAE
                </span>
              </li>
              <li className="flex gap-4 md:gap-5 items-center group">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-cyan-400/20 transition-colors">
                  <FaPhoneAlt className="text-cyan-400 text-base md:text-lg" />
                </div>
                <a href="tel:+971527925100" className="text-base md:text-lg font-bold group-hover:text-cyan-400 transition-colors">
                  +971 52 79 25 100
                </a>
              </li>
              <li className="flex gap-4 md:gap-5 items-center group">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-purple-500/20 transition-colors">
                  <FaEnvelope className="text-purple-500 text-base md:text-lg" />
                </div>
                <a href="mailto:info@4bizinternational.com" className="break-all text-sm md:text-base group-hover:text-white transition-colors underline-offset-4 hover:underline">
                  info@4bizinternational.com
                </a>
              </li>
            </ul>
          </div>

          {/* SYSTEM NAVIGATION */}
          <div className="lg:col-span-3 flex flex-col space-y-8 md:space-y-10">
            <h4 className="text-purple-500 font-black uppercase tracking-[0.5em] text-[10px] md:text-[11px] opacity-70">
              System Interface
            </h4>
            <div className="flex flex-col gap-8 md:gap-12">
              <nav>
                <ul className="grid grid-cols-2 lg:grid-cols-1 gap-4 md:gap-5 text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">
                  {['Home', 'About', 'Services', 'Contact'].map((item) => (
                    <li key={item}>
                      <a href={`#${item.toLowerCase()}`} className="group flex items-center gap-3 md:gap-4 hover:text-cyan-400 transition-colors">
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/10 group-hover:bg-cyan-400 group-hover:shadow-[0_0_10px_#22d3ee] transition-all" />
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              
              <a 
                href="https://4bizinternational.com/assets/images/4bizprofile.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between bg-white/[0.03] border border-white/10 text-white py-4 md:py-6 px-6 md:px-8 rounded-xl md:rounded-2xl transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex flex-col relative z-10">
                  <span className="text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-cyan-400 mb-1">Access File</span>
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">Our Portfolio</span>
                </div>
                <RiDownloadCloud2Line className="text-2xl md:text-4xl text-purple-500 group-hover:scale-110 transition-all duration-500" />
              </a>
            </div>
          </div>
        </div>

        {/* --- BOTTOM DATA STATUS BAR --- */}
        <div className="pt-8 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-10">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse shadow-[0_0_12px_#a855f7]" />
              <span className="text-white/40 text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-bold text-center">Encrypted Connection</span>
            </div>
            <p className="text-white/20 text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-medium text-center">
              © 2026 4Biz International // CORE V4.0
            </p>
          </div>
          
          {/* Status bar is cleaner on mobile by being centered or hidden */}
          <div className="flex items-center gap-4 md:gap-8 text-white/10 font-mono text-[8px] md:text-[10px] tracking-[0.2em]">
            <span className="hidden xs:inline">Uptime: 99.9%</span>
            <span className="hidden md:inline">Ref: {new Date().getFullYear()}.GLOBAL</span>
            <span className="text-cyan-400/30">Status: Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
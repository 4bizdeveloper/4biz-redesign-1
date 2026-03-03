import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { 
  RiFacebookFill, RiInstagramLine, RiLinkedinFill, 
  RiYoutubeFill, RiTwitterXFill, RiDownloadCloud2Line 
} from 'react-icons/ri';
import logo_image from '../assets/images/4biz_logo.png';

const Footer = () => {
  const footerRef = useRef(null);
  
  // PERFORMANCE: Track scroll with specific offsets to prevent 'jumping' at page end
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  // Physics-based spring to smooth out parallax movement on high-refresh screens
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // GPU-Accelerated Parallax (Using translate3d internally)
  const y1 = useTransform(smoothProgress, [0, 1], [0, -80]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, 80]);

  const socialLinks = useMemo(() => [
    { icon: <RiFacebookFill />, url: "https://www.facebook.com/4bizglobal" },
    { icon: <RiInstagramLine />, url: "https://www.instagram.com/4biz_ae" },
    { icon: <RiLinkedinFill />, url: "https://www.linkedin.com/company/4biz-international/" },
    { icon: <RiTwitterXFill />, url: "https://x.com/4biz123" },
    { icon: <RiYoutubeFill />, url: "https://www.youtube.com/@4bizinternationalae" },
  ], []);

  return (
// Change the <footer> opening tag in Footer.jsx:
<footer 
  ref={footerRef} 
  // REDUCED: mt-12/24 to mt-4, pt-24/48 to pt-12/16, pb-32/48 to pb-12/20
  className="relative z-10 bg-transparent mt-4 pt-12 md:pt-16 pb-12 md:pb-20 overflow-hidden border-t border-white/5 transform-gpu"
  style={{ contentVisibility: 'auto', contain: 'paint' }}
>
      
      {/* --- OPTIMIZED ATMOSPHERIC GRADIENTS --- */}
      {/* PERFORMANCE FIX: Combined will-change-transform with translateZ(0) for hardware isolation */}
      <motion.div 
        style={{ y: y1, translateZ: 0 }} 
        className="absolute top-0 -right-20 w-[250px] md:w-[700px] h-[250px] md:h-[700px] bg-cyan-500/10 blur-[60px] md:blur-[120px] rounded-full pointer-events-none -z-10 will-change-transform" 
      />
      <motion.div 
        style={{ y: y2, translateZ: 0 }} 
        className="absolute bottom-0 -left-20 w-[250px] md:w-[700px] h-[250px] md:h-[700px] bg-purple-600/10 blur-[60px] md:blur-[120px] rounded-full pointer-events-none -z-10 will-change-transform" 
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 md:gap-16 lg:gap-8 mb-20 items-start">
          
          {/* BRAND ARCHITECTURE */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-8 md:space-y-10 transform-gpu">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              src={logo_image} 
              alt="4Biz International" 
              loading="lazy"
              className="h-12 md:h-16 w-auto transition-transform duration-300 will-change-transform"
            />
            <p className="text-white/50 text-sm md:text-lg leading-relaxed font-medium max-w-md border-l-[3px] border-cyan-400 pl-6 md:pl-8 italic antialiased">
              "Engineering secure digital frontiers and redefining IT excellence for the next generation of global leaders."
            </p>
            
            <div className="flex flex-wrap gap-3 md:gap-4">
              {socialLinks.map((link, i) => (
                <a 
                  key={i} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border border-white/10 flex items-center justify-center text-xl md:text-2xl text-white/40 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-white hover:-translate-y-1 transform-gpu"
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
            <ul className="space-y-6 md:space-y-8 text-white/70">
              <li className="flex gap-4 md:gap-5 items-start group">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-purple-500/20 transition-colors">
                  <FaMapMarkerAlt className="text-purple-500 text-base" />
                </div>
                <span className="text-sm md:text-base leading-relaxed group-hover:text-white transition-colors antialiased">
                  Office 104, Crystal Building, Al Karama<br />
                  Near ADCB Metro, Dubai, UAE
                </span>
              </li>
              <li className="flex gap-4 md:gap-5 items-center group">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-cyan-400/20 transition-colors">
                  <FaPhoneAlt className="text-cyan-400 text-base" />
                </div>
                <a href="tel:+971527925100" className="text-base md:text-lg font-bold group-hover:text-cyan-400 transition-colors antialiased">
                  +971 52 79 25 100
                </a>
              </li>
              <li className="flex gap-4 md:gap-5 items-center group">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-purple-500/20 transition-colors">
                  <FaEnvelope className="text-purple-500 text-base" />
                </div>
                <a href="mailto:info@4bizinternational.com" className="break-all text-sm md:text-base group-hover:text-white transition-colors antialiased">
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
            <div className="flex flex-col gap-8">
              <nav>
                <ul className="grid grid-cols-2 lg:grid-cols-1 gap-4 text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">
                  {['Home', 'About', 'Services', 'Contact'].map((item) => (
                    <li key={item}>
                      <a href={`#${item.toLowerCase()}`} className="group flex items-center gap-3 hover:text-cyan-400 transition-colors antialiased">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-cyan-400 transition-all" />
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              
              <a 
                href="/assets/images/4bizprofile.pdf" 
                target="_blank" 
                className="group relative flex items-center justify-between bg-white/[0.03] border border-white/10 text-white py-4 px-6 rounded-xl transition-all hover:bg-white/[0.06] transform-gpu"
              >
                <div className="flex flex-col relative z-10">
                  <span className="text-[8px] uppercase tracking-[0.4em] text-cyan-400 mb-1">Access File</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Our Portfolio</span>
                </div>
                <RiDownloadCloud2Line className="text-2xl text-purple-500 group-hover:translate-y-[-2px] transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* --- BOTTOM DATA STATUS BAR --- */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse shadow-[0_0_8px_#a855f7]" />
              <span className="text-white/40 text-[8px] uppercase tracking-[0.4em] font-bold">Encrypted Connection</span>
            </div>
            <p className="text-white/20 text-[8px] uppercase tracking-[0.4em] font-medium antialiased">
              © 2026 4Biz International // CORE V4.0
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-white/10 font-mono text-[8px] tracking-[0.2em]">
            <span className="hidden xs:inline text-white/20">Uptime: 99.9%</span>
            <span className="text-cyan-400/30">Status: Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
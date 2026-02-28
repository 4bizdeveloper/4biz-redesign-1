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
    <footer className="relative z-10 bg-transparent mt-20 pt-40 pb-20 md:pb-16 overflow-hidden border-t border-white/10">
      {/* ATMOSPHERIC SPACE OVERLAY */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[#020207]/80 backdrop-blur-3xl" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_-20%,#5fd9fb,transparent_50%),radial-gradient(circle_at_50%_120%,#f028dd,transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24 mb-20 items-start">
          
          {/* BRAND COLUMN */}
          <div className="flex flex-col items-start space-y-8">
            <img 
              src={logo_image} 
              alt="4Biz International" 
              className="h-12 md:h-14 w-auto brightness-110 drop-shadow-[0_0_20px_rgba(95,217,251,0.3)]"
            />
            <p className="text-white/60 text-sm md:text-base leading-relaxed font-medium max-w-sm border-l-2 border-[#5fd9fb]/30 pl-6 italic">
              "Redefining IT excellence through innovative digital solutions and secure architecture for global leaders."
            </p>
            
            <div className="flex gap-3">
              {socialLinks.map((link, i) => (
                <a 
                  key={i} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-white/60 transition-all duration-500 hover:border-[#5fd9fb]/50 hover:bg-[#5fd9fb]/10 hover:text-white hover:shadow-[0_0_15px_rgba(95,217,251,0.4)] hover:-translate-y-1"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* CONTACT NODE */}
          <div className="flex flex-col space-y-8">
            <h4 className="text-[#5fd9fb] font-black uppercase tracking-[0.4em] text-[10px] md:text-[11px] opacity-80">
              Terminal Node / Contact
            </h4>
            <ul className="space-y-6 text-white/80 text-sm md:text-base">
              <li className="flex gap-4 items-start group">
                <FaMapMarkerAlt className="mt-1 shrink-0 text-[#f028dd] group-hover:animate-pulse" />
                <span className="leading-relaxed transition-colors group-hover:text-white">
                  Office 104, Crystal Building, <br />
                  Near ADCB Metro Station, <br />
                  Al Karama Dubai, UAE
                </span>
              </li>
              <li className="flex gap-4 items-center group">
                <FaPhoneAlt className="shrink-0 text-[#5fd9fb]" />
                <a href="tel:+971527925100" className="font-bold transition-colors group-hover:text-[#5fd9fb]">
                  +971 52 79 25 100
                </a>
              </li>
              <li className="flex gap-4 items-center group">
                <FaEnvelope className="shrink-0 text-[#f028dd]" />
                <a href="mailto:info@4bizinternational.com" className="transition-colors group-hover:text-[#f028dd] break-all">
                  info@4bizinternational.com
                </a>
              </li>
            </ul>
          </div>

          {/* SYSTEM NAVIGATION */}
          <div className="flex flex-col space-y-8">
            <h4 className="text-[#f028dd] font-black uppercase tracking-[0.4em] text-[10px] md:text-[11px] opacity-80">
              System / Navigation
            </h4>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">
              <ul className="flex flex-col gap-4 text-white/50 text-[11px] font-black uppercase tracking-[0.3em]">
                {['Home', 'About', 'Services', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="relative group flex items-center gap-3 transition-all hover:text-white">
                      <span className="h-[2px] w-0 bg-gradient-to-r from-[#5fd9fb] to-[#f028dd] transition-all duration-300 group-hover:w-5" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
              
              <a 
                href="https://4bizinternational.com/assets/images/4bizprofile.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between bg-white/[0.03] border border-white/10 text-white text-[10px] font-black py-5 px-6 rounded-xl transition-all uppercase tracking-[0.3em] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#5fd9fb]/20 to-[#f028dd]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 group-hover:mr-2 transition-all duration-500">Portfolio</span>
                <FaFileDownload className="relative z-10 text-[#5fd9fb] group-hover:scale-125 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* DATA BAR */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 bg-[#f028dd] rounded-full animate-pulse shadow-[0_0_10px_#f028dd]" />
            <p className="text-white/20 text-[9px] uppercase tracking-[0.5em] font-bold">
              © 2026 4Biz International // Secure Transmission
            </p>
          </div>
          <p className="text-white/10 text-[9px] font-mono tracking-widest">
            LATENCY: 14MS // STATUS: OPTIMAL
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
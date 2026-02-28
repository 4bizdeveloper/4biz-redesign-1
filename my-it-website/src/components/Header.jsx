import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import logo from '../assets/images/4biz_logo.png'; 

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Layout Transforms
  const headerWidth = useTransform(scrollY, [0, 80], ['100%', '92%']);
  const headerY = useTransform(scrollY, [0, 80], [0, 20]);
  const borderRadius = useTransform(scrollY, [0, 80], ['0px', '100px']);
  const headerHeight = useTransform(scrollY, [0, 80], ['80px', '70px']);
  
  // Style Transitions
  // Initially rgba(..., 0) makes it invisible. Transitions to 75% opacity.
  const backgroundColor = useTransform(scrollY, [0, 80], ['rgba(3, 3, 11, 0)', 'rgba(3, 3, 11, 0.75)']);
  
  // Initially transparent border. Transitions to white/10.
  const borderColor = useTransform(scrollY, [0, 80], ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.1)']);
  
  // Initially no blur. Transitions to 20px glass effect.
  const backdropFilter = useTransform(scrollY, [0, 80], ['blur(0px)', 'blur(20px)']);
  
  // Initially no shadow. Transitions to soft glow.
  const shadowOpacity = useTransform(scrollY, [0, 80], ['0px 0px 0px rgba(0,0,0,0)', '0px 10px 50px rgba(0,0,0,0.4)']);

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SERVICES', href: '#services' },
    { name: 'CONTACT', href: '#contact' },
    { name: 'BLOG', href: '#blog' },
  ];

  return (
    <>
      <style>{`
        @keyframes header-beam {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <motion.header
        style={{ 
          width: headerWidth, 
          y: headerY, 
          borderRadius, 
          height: headerHeight, 
          backgroundColor, 
          borderColor,
          backdropFilter,
          boxShadow: shadowOpacity
        }}
        className="fixed left-1/2 -translate-x-1/2 z-[100] border flex items-center justify-between px-6 md:px-12 transition-all duration-500 ease-out"
      >
        {/* --- CLEAN LOGO SECTION --- */}
        <div className="relative flex items-center group cursor-pointer ml-4 md:ml-6">
          <div className="relative z-10 py-1">
            <img 
              src={logo} 
              alt="4Biz Logo" 
              className="h-9 md:h-12 w-auto transition-transform duration-500 group-hover:scale-105" 
            />
          </div>
        </div>

        {/* --- NAVIGATION (PRESERVED) --- */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-[11px] uppercase tracking-[0.25em] font-black text-white hover:text-[#00f2ff] transition-all duration-300 relative group">
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gradient-to-r from-[#00f2ff] via-[#bf00ff] to-[#ff00d4] transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* --- ACTION BUTTON (PRESERVED) --- */}
        <div className="flex items-center gap-6">
          <button className="hidden sm:block group relative px-7 py-2.5 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 bg-[#03030b] border border-white/10">
            <div className="absolute inset-[-250%] animate-[header-beam_3.5s_linear_infinite] opacity-100 group-hover:opacity-0 transition-opacity">
              <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_120deg,#00f2ff_180deg,#bf00ff_240deg,#ff00d4_300deg,transparent_360deg)]" />
            </div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-[#00f2ff] via-[#bf00ff] to-[#ff00d4]" />
            <div className="absolute inset-[1.5px] bg-[#03030b] rounded-full z-0 transition-all group-hover:bg-transparent" />
            <span className="relative z-10 text-white font-black tracking-widest text-[10px] uppercase">GET STARTED</span>
          </button>

          {/* MOBILE TOGGLE (PRESERVED) */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center z-[110]">
            <div className="flex flex-col gap-[6px] items-end">
              <motion.span animate={isOpen ? { rotate: 45, y: 7.5, width: '22px' } : { rotate: 0, y: 0, width: '22px' }} className="h-[2px] bg-white block origin-center" />
              <motion.span animate={isOpen ? { opacity: 0, x: 5 } : { opacity: 1, x: 0 }} className="w-4 h-[2px] bg-white block" />
              <motion.span animate={isOpen ? { rotate: -45, y: -7.5, width: '22px' } : { rotate: 0, y: 0, width: '14px' }} className="h-[2px] bg-white block origin-center" />
            </div>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[95] bg-[#03030b]/90 backdrop-blur-3xl flex flex-col items-center justify-center lg:hidden">
            <nav className="flex flex-col gap-10 text-center">
              {navLinks.map((link, i) => (
                <motion.a key={link.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} href={link.href} onClick={() => setIsOpen(false)} className="text-4xl font-black uppercase tracking-widest text-white hover:text-[#00f2ff] transition-colors">{link.name}</motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
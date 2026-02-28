import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// 1. IMPORT the logo here. This tells the bundler to include the image 
// and gives you a dynamic URL that works after building the app.
import logo from '../assets/images/4biz_logo.png'; 

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  // Transitions: Full-width to Floating Pill
  const headerWidth = useTransform(scrollY, [0, 80], ['100%', '92%']);
  const headerY = useTransform(scrollY, [0, 80], [0, 20]);
  const borderRadius = useTransform(scrollY, [0, 80], ['0px', '999px']);
  const headerHeight = useTransform(scrollY, [0, 80], ['90px', '75px']);
  
  // BACKGROUND: Starts 100% Transparent (0) -> Deep Violet (0.8)
  const backgroundColor = useTransform(
    scrollY,
    [0, 80],
    ['rgba(10, 10, 20, 0)', 'rgba(20, 10, 45, 0.8)'] 
  );

  // BORDER: Starts 100% Transparent (0) -> Subtle White (0.2)
  const borderColor = useTransform(
    scrollY,
    [0, 80],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.2)']
  );

  // BLUR: No blur at top -> Glass effect on scroll
  const backdropBlur = useTransform(scrollY, [0, 80], ['blur(0px)', 'blur(24px)']);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Legacy', href: '#legacy' },
  ];

  return (
    <>
      <motion.header
        style={{ 
          width: headerWidth,
          y: headerY,
          borderRadius: borderRadius,
          height: headerHeight,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          backdropFilter: backdropBlur,
        }}
        className="fixed left-1/2 -translate-x-1/2 z-[100] border flex items-center justify-between px-6 md:px-12 transition-all duration-700 ease-out"
      >
        {/* LOGO SECTION */}
        <div className="relative flex items-center justify-center group cursor-pointer">
          <div className="absolute inset-[-6px] rounded-full p-[2.5px] overflow-hidden">
            <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_250deg,#00f2ff_300deg,#ff2d95_360deg)] animate-[spin_3s_linear_infinite]" />
            <div className="absolute inset-[1.5px] rounded-full bg-[#0a0a14] backdrop-blur-md" />
          </div>
          
          <div className="relative z-10 px-4 py-2 flex items-center">
            {/* 2. Use the imported 'logo' variable here */}
            <img 
              src={logo} 
              alt="4Biz Logo" 
              className="h-8 md:h-10 w-auto brightness-125 drop-shadow-[0_0_15px_rgba(0,242,255,0.5)]"
            />
          </div>
        </div>

        {/* CENTER NAVIGATION (Desktop) */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[11px] uppercase tracking-[0.35em] font-black text-zinc-300 hover:text-white transition-all duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gradient-to-r from-[#00f2ff] to-[#ff2d95] transition-all duration-500 group-hover:w-full drop-shadow-[0_0_8px_#00f2ff]" />
            </a>
          ))}
        </nav>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-6">
          <button className="hidden sm:block relative group px-8 py-3 overflow-hidden rounded-full border border-white/30 hover:border-[#00f2ff]/50 transition-all shadow-[0_0_20px_rgba(0,242,255,0.15)]">
             <div className="absolute inset-0 bg-gradient-to-r from-[#00f2ff] to-[#ff2d95] opacity-0 group-hover:opacity-100 transition-opacity" />
             <span className="relative z-10 text-white group-hover:text-black text-[10px] font-black uppercase tracking-[0.2em] transition-colors">
                Get Started
             </span>
          </button>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 z-[110]"
          >
            <motion.span animate={isOpen ? { rotate: 45, y: 7, backgroundColor: '#ff2d95' } : { rotate: 0, y: 0, backgroundColor: '#fff' }} className="w-6 h-[2px] rounded-full shadow-[0_0_10px_rgba(255,45,149,0.5)]" />
            <motion.span animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className="w-6 h-[2px] bg-white rounded-full" />
            <motion.span animate={isOpen ? { rotate: -45, y: -7, backgroundColor: '#00f2ff' } : { rotate: 0, y: 0, backgroundColor: '#fff' }} className="w-6 h-[2px] rounded-full shadow-[0_0_10px_rgba(0,242,255,0.5)]" />
          </button>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[95] bg-[#03030b]/98 backdrop-blur-3xl flex flex-col items-center justify-center lg:hidden"
          >
            <nav className="relative z-10 flex flex-col gap-10 text-center">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-black uppercase tracking-[0.4em] text-white/50 hover:text-[#00f2ff] transition-all"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
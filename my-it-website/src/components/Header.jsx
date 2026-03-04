import React, { useState, useMemo, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import logo from '../assets/images/4biz_logo.avif'; 

const Header = () => {
  const phoneNumber = "971527925100";
  const message = encodeURIComponent("Hello! I'd like to inquire about your services.");

  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkRes = () => setIsDesktop(window.innerWidth >= 1024);
    checkRes();
    window.addEventListener('resize', checkRes, { passive: true });
    return () => window.removeEventListener('resize', checkRes);
  }, []);

  const { scrollY } = useScroll();
  
  // High-performance spring: mass and stiffness tuned to prevent jumping on mobile touch-scroll
  const smoothY = useSpring(scrollY, { 
    stiffness: 120, 
    damping: 24, 
    mass: 0.1, 
    restDelta: 0.001 
  });

  const scrollRange = [0, 80];
  
  // Optimized transforms using GPU-bound properties
  const headerScaleX = useTransform(smoothY, scrollRange, isDesktop ? [1, 0.92] : [1, 1]);
  const headerScaleY = useTransform(smoothY, scrollRange, isDesktop ? [1, 0.9] : [1, 1]);
  const headerYOffset = useTransform(smoothY, scrollRange, isDesktop ? [0, 20] : [0, 0]);
  const borderRadius = useTransform(smoothY, scrollRange, isDesktop ? ['0px', '40px'] : ['0px', '0px']);
  
  // Preserving existing desktop header logic exactly
  const backgroundColor = useTransform(smoothY, scrollRange, 
    isDesktop ? ['rgba(3, 3, 11, 0)', 'rgba(3, 3, 11, 0.72)'] : ['rgba(0,0,0,0)', 'rgba(0,0,0,0)']
  );
  const borderColor = useTransform(smoothY, scrollRange, 
    isDesktop ? ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.1)'] : ['rgba(0,0,0,0)', 'rgba(0,0,0,0)']
  );
  const backdropFilter = useTransform(smoothY, scrollRange, 
    isDesktop ? ['blur(0px)', 'blur(16px)'] : ['blur(0px)', 'blur(0px)']
  );

  const holoOpacity = useTransform(smoothY, scrollRange, isDesktop ? [0, 1] : [0, 0]);

  const navLinks = useMemo(() => [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SERVICES', href: '#services' },
    { name: 'LOCATIONS', href: '#map' },
    { name: 'CONTACT', href: '#contact' }
  ], []);

  return (
    <>
      <motion.header
        style={{ 
          width: '100%',
          y: headerYOffset, 
          scaleX: headerScaleX,
          scaleY: headerScaleY,
          borderRadius, 
          backgroundColor, 
          borderColor,
          backdropFilter,
          WebkitBackdropFilter: backdropFilter,
          x: '-50%',
          left: '50%',
          // Hardware acceleration fixes
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased',
          transformStyle: 'preserve-3d',
        }}
        className="fixed z-[100] lg:border flex items-center justify-between px-6 md:px-12 h-[72px] lg:h-[80px] overflow-hidden pointer-events-auto origin-top"
      >
        {isDesktop && (
          <motion.div 
            style={{ opacity: holoOpacity }}
            className="absolute inset-0 pointer-events-none -z-10 overflow-hidden transform-gpu"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-30" />
          </motion.div>
        )}

        <motion.a 
          href="/" 
          className="relative flex items-center group cursor-pointer shrink-0 transform-gpu ml-4 lg:ml-8"
        >
          <img 
            src={logo} 
            alt="4Biz International LLC" 
            loading="eager"
            width="120"
            height="44"
            className="h-10 lg:h-11 w-auto transition-transform duration-500 group-hover:scale-105" 
          />
        </motion.a>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[11px] uppercase tracking-[0.25em] font-black text-white/90 hover:text-[#00f2ff] transition-colors duration-300 relative group antialiased"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-gradient-to-r from-[#00f2ff] to-[#bf00ff] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block group relative px-6 py-2 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 bg-[#03030b] border border-white/10 transform-gpu">
            <div className="absolute inset-[-250%] animate-[spin_4s_linear_infinite] opacity-100 group-hover:opacity-0 transition-opacity pointer-events-none">
              <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_120deg,#00f2ff_180deg,#bf00ff_240deg,#ff00d4_300deg,transparent_360deg)]" />
            </div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-[#00f2ff] via-[#bf00ff] to-[#ff00d4]" />
            <div className="absolute inset-[1.5px] bg-[#03030b] rounded-full z-0 transition-all group-hover:bg-transparent" />
            <a href={`https://wa.me/${phoneNumber}?text=${message}`} target="_blank" rel="noopener noreferrer" className="relative z-10 block">
              <span className="text-white font-black tracking-widest text-[10px] uppercase">GET STARTED</span>
            </a>
          </button>

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center z-[110] touch-manipulation transform-gpu"
          >
            <div className="flex flex-col gap-[6px] items-end">
              <motion.span animate={isOpen ? { rotate: 45, y: 8, width: '22px' } : { rotate: 0, y: 0, width: '22px' }} className="h-[2px] bg-white block origin-center" />
              <motion.span animate={isOpen ? { opacity: 0, x: 5 } : { opacity: 1, x: 0 }} className="w-4 h-[2px] bg-white block" />
              <motion.span animate={isOpen ? { rotate: -45, y: -8, width: '22px' } : { rotate: 0, y: 0, width: '14px' }} className="h-[2px] bg-white block origin-center" />
            </div>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            // REQUESTED FIX: Changed bg-opacity to 70% (0.7) for the mobile toggle window
            className="fixed inset-0 z-[95] bg-[#03030b]/70 backdrop-blur-2xl flex flex-col items-center justify-center lg:hidden touch-none"
          >
            <nav className="flex flex-col gap-10 text-center px-6">
              {navLinks.map((link, i) => (
                <motion.a 
                  key={link.name} 
                  initial={{ opacity: 0, y: 15 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: i * 0.05, ease: "circOut" }} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)} 
                  className="text-2xl font-black uppercase tracking-[0.35em] text-white hover:text-[#00f2ff] active:scale-90 transition-transform"
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
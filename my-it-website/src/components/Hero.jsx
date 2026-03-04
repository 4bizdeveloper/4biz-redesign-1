import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import hero_banner_image from '../assets/images/hero_banner_image.avif';



const Hero = () => {

  const phoneNumber = "971527925100";
  const message = encodeURIComponent("Hello! I'd like to inquire about your services.");
  
  // Memoize mask styles to prevent unnecessary style recalculations
  const maskStyles = useMemo(() => ({
    maskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)',
    WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)'
  }), []);

  return (
    <section 
      className="relative min-h-[100svh] flex items-center justify-center pt-32 pb-16 px-6 overflow-hidden bg-transparent transform-gpu"
      style={{ 
        contentVisibility: 'auto',
        containIntrinsicSize: '1000px', // Prevents layout jumping by giving the browser a size hint
      }}
    >
      
      {/* 1. OPTIMIZED BACKGROUND VISUALS */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.45, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full"
          style={{ 
            ...maskStyles,
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden' // Force layer isolation for mobile Safari
          }}
        >
          <img 
            src={hero_banner_image}
            alt="Hero Banner"
            loading="eager"
            fetchpriority="high"
            className="w-full h-full object-cover brightness-110 contrast-110"
          />
        </motion.div>

        {/* GPU-Isolated Gradient Glow */}
        <div 
          className="absolute top-1/2 left-1/2 w-full h-full max-w-[1200px] max-h-[600px] bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-pink-500/10 blur-[100px] opacity-70"
          style={{ 
            transform: 'translate3d(-50%, -50%, 0)', 
            willChange: 'transform',
            backfaceVisibility: 'hidden'
          }}
        />
      </div>

      {/* 2. CONTENT AREA */}
      <div className="relative z-30 max-w-5xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{ willChange: 'transform, opacity' }}
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 mt-4 leading-[1.15] tracking-tight text-white px-4 antialiased">
            <span className="font-light opacity-80">Empowering</span> <br /> 
            <span className="relative inline-block py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] via-[#bf00ff] to-[#ff00d4] drop-shadow-[0_0_15px_rgba(191,0,255,0.25)]">
              Digital Assets
            </span>
          </h1>

          <p className="text-white text-base md:text-xl max-w-2xl mx-auto mb-12 leading-[1.6] font-normal tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] px-4 opacity-85">
            Innovative IT solutions tailored for international growth. <br className="hidden md:block" /> 
            We bridge the gap between technology and business excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <a href="#services"><HeroButton text="EXPLORE SERVICES" color="#00f2ff" /></a>
            <a href="#contact"><HeroButton text="GET AN APPOINTMENT" color="#bf00ff" /></a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const HeroButton = ({ text, color }) => (
  <button className="group relative px-9 py-3.5 w-full sm:w-auto rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 bg-[#03030b] border border-white/10 transform-gpu isolation-auto">
    
    {/* Optimized Border Animation: Used fixed transform and opacity for scrolling smoothness */}
    <div className="absolute inset-[-150%] animate-[spin_8s_linear_infinite] opacity-100 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none">
      <div 
        className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_150deg,#00f2ff_180deg,#bf00ff_240deg,#ff00d4_300deg,transparent_360deg)]" 
        style={{ willChange: 'transform' }}
      />
    </div>
    
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#00f2ff] via-[#bf00ff] to-[#ff00d4]" />
    <div className="absolute inset-[1.5px] bg-[#03030b] rounded-full z-0 transition-all duration-500 group-hover:bg-transparent" />
    
    <span className="relative z-10 text-white font-black tracking-[0.3em] text-[10px] uppercase transition-all duration-500 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] antialiased">
      {text}
    </span>
    
    {/* Shadow Glow - Isolated with translateZ */}
    <div 
      className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-[#00f2ff] blur-[30px] opacity-20 group-hover:opacity-0 transition-opacity z-0 pointer-events-none" 
      style={{ transform: 'translateX(-50%) translateZ(0)' }}
    />
  </button>
);

export default Hero;
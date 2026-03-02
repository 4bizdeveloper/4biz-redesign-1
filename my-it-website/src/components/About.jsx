import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import girlImage from '../assets/images/girl1.avif';

const About = () => {
  // Memoize performance-heavy style objects to prevent re-calculations
  const maskStyles = useMemo(() => ({
    maskImage: 'radial-gradient(circle at 38% 48%, black 15%, transparent 75%)',
    WebkitMaskImage: 'radial-gradient(circle at 38% 48%, black 15%, transparent 75%)',
  }), []);

  return (
    <section 
      id="about" 
      className="relative min-h-screen flex items-center overflow-hidden bg-transparent py-12 md:py-20 transform-gpu"
      style={{ 
        contentVisibility: 'auto', 
        containIntrinsicSize: '0 800px' // Provides a height hint to prevent scrollbar jumping
      }}
    >
      
      {/* 1. OPTIMIZED IMAGE & BLUR LAYER */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        
        {/* Background Blurs - Using translate3d for GPU acceleration */}
        <div 
          className="absolute left-[8%] top-1/2 w-[350px] md:w-[650px] h-[350px] md:h-[650px] bg-purple-500/10 blur-[100px] md:blur-[130px] rounded-full" 
          style={{ transform: 'translate3d(0,-50%,0)', willChange: 'transform' }}
        />
        <div 
          className="absolute left-0 top-[25%] md:top-[35%] w-[250px] md:w-[450px] h-[250px] md:h-[450px] bg-cyan-400/10 blur-[80px] md:blur-[100px] rounded-full" 
          style={{ transform: 'translate3d(0,0,0)', willChange: 'transform' }}
        />

        {/* Masked Image Container */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute left-0 top-0 w-full lg:w-[55%] h-[55vh] lg:h-full bg-no-repeat bg-contain bg-center lg:bg-left"
          style={{
            ...maskStyles,
            backgroundImage: `url(${girlImage})`,
            filter: 'contrast(1.05) brightness(1.05)',
            transform: 'translateZ(0)', 
            backfaceVisibility: 'hidden', // Prevents micro-stuttering during scroll
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          
          {/* Spacer for the background image on desktop */}
          <div className="h-[40vh] lg:h-auto lg:w-[45%] pointer-events-none" />

          {/* 2. TEXT CONTENT */}
          <div className="w-full lg:w-[55%] lg:pl-12 mt-6 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
              className="will-change-transform"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1.5px] w-12 bg-gradient-to-r from-cyan-400 to-blue-500" />
                <span className="text-cyan-300 font-mono text-[11px] font-bold tracking-[0.5em] uppercase antialiased">
                  Fast and Without Friction
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
                Where <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-purple-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                  IT solutions
                </span> <br />
                meet scale
              </h2>

              <p className="text-lg md:text-xl text-zinc-300/80 leading-relaxed font-normal max-w-xl mb-10 antialiased">
                Innovative IT infrastructure designed for international growth. 
                We remove the technical barriers that slow you down, allowing your digital assets to flourish.
              </p>

              {/* Stats Footer - Optimized Border rendering */}
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 pt-10 border-t border-white/[0.08]">
                <div className="flex flex-col gap-1">
                  <p className="text-cyan-400 font-black text-[12px] uppercase tracking-widest">Reliability</p>
                  <p className="text-white/90 text-sm font-medium">99.9% Uptime Architecture</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-purple-400 font-black text-[12px] uppercase tracking-widest">Operations</p>
                  <p className="text-white/90 text-sm font-medium">UAE-Based, Global Support</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
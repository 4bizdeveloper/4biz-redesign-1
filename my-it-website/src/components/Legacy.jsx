import React, { useRef, useEffect, useState, memo } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import legacy_image from '../assets/images/legacy.avif';

// StatCounter remains unchanged, but is included for full replacement
const StatCounter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);
  
  const springValue = useSpring(0, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(parseInt(value));
    }
  }, [isInView, value, springValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

// MEMOIZED HOLOGRAPHIC PROJECTOR: Styled exactly like Contact Section's HolographicCore
const HolographicProjector = memo(({ yOffset }) => (
  <motion.div 
    style={{ y: yOffset }}
    className="relative flex items-center justify-center py-10 lg:py-20 order-1 lg:order-2 transform-gpu will-change-transform select-none pointer-events-none"
  >
    <motion.div 
      className="relative w-full max-w-[320px] md:max-w-[450px] aspect-square flex items-center justify-center will-change-transform"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* 1. Background Glow - GPU Accelerated */}
      <div className="absolute w-[70%] h-[70%] bg-cyan-500/10 rounded-full blur-[60px] md:blur-[100px] -z-10 transform-gpu translate-z-0" />
      
      {/* 2. HUD Rings - Optimized */}
      <div className="absolute inset-0 border border-white/5 rounded-full scale-110 pointer-events-none" />
      <div className="absolute inset-4 border border-dashed border-cyan-500/20 rounded-full animate-spin-ultra-slow will-change-transform" />
      
      {/* 3. NEW: Dual-Color Revolving Orbit Particle (Preserved/Moved) */}
      <div className="absolute inset-0 rounded-full animate-spin-reverse-slow will-change-transform">
        <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee] opacity-90" />
        <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7] opacity-90" />
      </div>

      {/* 4. Image Container - Floating Animation */}
      <motion.div 
        className="relative z-10 w-[82%] h-[82%] rounded-full border border-white/10 p-1 bg-[#050510]/40 backdrop-blur-sm shadow-2xl overflow-hidden will-change-transform"
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Radial Mask for Merging */}
        <div className="w-full h-full rounded-full relative overflow-hidden" 
             style={{ 
               maskImage: 'radial-gradient(circle, black 50%, transparent 100%)', 
               WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 100%)',
               transform: 'translateZ(0)' 
             }}>
          <motion.img 
            src={legacy_image}
            alt="Digital Evolution" 
            className="w-full h-full object-cover saturate-[1.3] brightness-[0.8] mix-blend-lighten opacity-70 transform-gpu" 
            animate={{ scale: [1.05, 1.12, 1.05] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            loading="lazy"
            decoding="async"
          />
        </div>
      </motion.div>
    </motion.div>

    {/* Preserved Floating Status Particles */}
    <div className="hidden md:block absolute top-0 right-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
    <div className="hidden md:block absolute bottom-10 left-0 w-1 h-1 bg-purple-400 rounded-full animate-pulse" />
  </motion.div>
));

const Legacy = () => {
  const containerRef = useRef(null);
  
  // Restricted range to prevent parallax jitter
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth transform values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section 
      ref={containerRef} 
      id="legacy" 
      className="py-20 lg:py-32 px-4 md:px-10 overflow-hidden relative bg-transparent transform-gpu"
      style={{ 
        contentVisibility: 'auto', 
        contain: 'paint layout', // Optimization: isolates from global repaints
        containmentIntrinsicSize: '1px 800px'
      }}
    >
      
      {/* ATMOSPHERIC SPACE DEPTH - Will-change optimization */}
      <motion.div 
        style={{ y: y1 }} 
        className="absolute top-1/4 -right-20 w-[300px] md:w-[900px] h-[300px] md:h-[900px] bg-cyan-500/10 blur-[100px] md:blur-[160px] rounded-full pointer-events-none will-change-transform" 
      />
      <motion.div 
        style={{ y: y2 }} 
        className="absolute bottom-1/4 -left-20 w-[300px] md:w-[900px] h-[300px] md:h-[900px] bg-purple-600/10 blur-[100px] md:blur-[160px] rounded-full pointer-events-none will-change-transform" 
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        
        {/* Left: Content Area (Preserved Unchanged) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center lg:text-left order-2 lg:order-1 will-change-transform"
        >
          <div className="inline-flex items-center gap-4 mb-6 md:mb-8 justify-center lg:justify-start">
             <div className="h-[2px] w-8 md:w-12 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
             <h2 className="text-cyan-400 font-mono text-[10px] md:text-xs tracking-[0.5em] md:tracking-[0.7em] uppercase font-black">
               Our Heritage
             </h2>
          </div>

          <h3 className="text-4xl md:text-6xl lg:text-8xl font-black leading-[1.1] lg:leading-[0.85] mb-8 md:mb-12 tracking-tighter text-white">
            Forging a <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500 drop-shadow-[0_0_35px_rgba(191,0,255,0.4)]">
              Digital Legacy
            </span>
          </h3>

          <p className="text-white text-base md:text-xl mb-10 md:mb-14 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium opacity-90 border-l-2 border-white/10 pl-6 md:pl-10 italic">
            "We aren't just building software; we are architecting the infrastructure of tomorrow's global leaders."
          </p>
          
          {/* HOLOGRAPHIC DASHBOARD STATS (Preserved Unchanged) */}
          <div className="relative group inline-block w-full md:w-auto">
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl md:rounded-[3rem] blur-2xl opacity-50" />
            <div className="relative flex flex-row items-center justify-center gap-6 md:gap-12 px-6 md:px-12 py-8 md:py-10 rounded-3xl md:rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl shadow-2xl">
              <div className="flex flex-col">
                <span className="text-4xl md:text-7xl font-black text-white leading-none">
                  <StatCounter value="10" suffix="+" />
                </span>
                <span className="text-cyan-400 uppercase text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.5em] font-black mt-2">Years Mastery</span>
              </div>
              <div className="w-px h-12 md:h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              <div className="flex flex-col">
                <span className="text-4xl md:text-7xl font-black text-white leading-none">
                  <StatCounter value="24" suffix="/" />
                  <span className="text-2xl md:text-4xl text-purple-500">7</span>
                </span>
                <span className="text-purple-400 uppercase text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.5em] font-black mt-2">Global Support</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: NEW Holographic Projector (Matches Contact style + Preserves Particles) */}
        <HolographicProjector yOffset={typeof window !== 'undefined' && window.innerWidth > 1024 ? y1 : 0} />

      </div>

      <style jsx>{`
        /* Optimized CSS Animations */
        @keyframes spin-ultra-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-reverse-slow { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        
        .animate-spin-ultra-slow { animation: spin-ultra-slow 60s linear infinite; }
        .animate-spin-reverse-slow { animation: spin-reverse-slow 40s linear infinite; }
      `}</style>
    </section>
  );
};

export default Legacy;
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import legacy_image from '../assets/images/legacy.avif';

const StatCounter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);
  
  // Use Spring for much smoother, hardware-accelerated number counting
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

const Legacy = () => {
  const containerRef = useRef(null);
  
  // Optimized scroll tracking with restricted range to prevent jitter
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Use transform-gpu via will-change for buttery smooth parallax
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section 
      ref={containerRef} 
      id="legacy" 
      className="py-20 lg:py-32 px-4 md:px-10 overflow-hidden relative bg-transparent transform-gpu"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '800px' }}
    >
      
      {/* ATMOSPHERIC SPACE DEPTH - Optimized with will-change */}
      <motion.div 
        style={{ y: y1 }} 
        className="absolute top-1/4 -right-20 w-[300px] md:w-[900px] h-[300px] md:h-[900px] bg-cyan-500/10 blur-[100px] md:blur-[160px] rounded-full pointer-events-none will-change-transform" 
      />
      <motion.div 
        style={{ y: y2 }} 
        className="absolute bottom-1/4 -left-20 w-[300px] md:w-[900px] h-[300px] md:h-[900px] bg-purple-600/10 blur-[100px] md:blur-[160px] rounded-full pointer-events-none will-change-transform" 
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        
        {/* Left: Content Area */}
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
          
          {/* HOLOGRAPHIC DASHBOARD STATS */}
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

        {/* Right: HOLOGRAPHIC IMAGE PROJECTOR */}
        <motion.div 
          style={{ y: typeof window !== 'undefined' && window.innerWidth > 1024 ? y1 : 0 }}
          className="relative flex items-center justify-center py-10 lg:py-20 order-1 lg:order-2 transform-gpu will-change-transform"
        >
          {/* Container uses fixed aspect ratio to prevent layout jumping */}
          <div className="relative z-10 w-full max-w-[280px] md:max-w-[450px] aspect-square rounded-full overflow-hidden border border-white/10 p-1 bg-[#050510]/40 backdrop-blur-md shadow-2xl">
            <div 
              className="w-full h-full rounded-full relative overflow-hidden"
              style={{
                maskImage: 'radial-gradient(circle at center, black 30%, transparent 95%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 95%)',
              }}
            >
              <motion.img 
                src={legacy_image}
                alt="Digital Evolution" 
                className="w-full h-full object-cover saturate-[1.6] brightness-[0.7] opacity-60 mix-blend-lighten scale-110 will-change-transform"
                animate={{ scale: [1.1, 1.15, 1.1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-purple-500/20" />
            </div>
            {/* HUD Elements using CSS animation for better main-thread performance */}
            <div className="absolute inset-0 border border-white/5 rounded-full scale-90 md:scale-110 pointer-events-none" />
            <div className="absolute inset-2 md:inset-4 border-[1px] border-dashed border-cyan-500/20 rounded-full animate-slow-spin pointer-events-none" />
          </div>

          <div className="hidden md:block absolute top-0 right-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
          <div className="hidden md:block absolute bottom-10 left-0 w-1 h-1 bg-purple-400 rounded-full animate-pulse" />
        </motion.div>

      </div>

      <style jsx>{`
        @keyframes slow-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-slow-spin {
          animation: slow-spin 60s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Legacy;
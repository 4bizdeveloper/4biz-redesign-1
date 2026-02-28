import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import legacy_image from '../assets/images/legacy.png';

const StatCounter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      const duration = 2.5; 
      let startTime = null;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * (end - start) + start));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Legacy = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={containerRef} id="legacy" className="py-32 px-6 overflow-hidden relative bg-transparent">
      
      {/* ATMOSPHERIC SPACE DEPTH - Blue & Rose Nebula */}
      <motion.div style={{ y: y1 }} className="absolute top-1/4 -right-20 w-[900px] h-[900px] bg-cyan-500/10 blur-[160px] rounded-full pointer-events-none" />
      <motion.div style={{ y: y2 }} className="absolute bottom-1/4 -left-20 w-[900px] h-[900px] bg-purple-600/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        
        {/* Left: Content Area */}
        <motion.div 
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-4 mb-8">
             <div className="h-[2px] w-12 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
             <h2 className="text-cyan-400 font-mono text-xs tracking-[0.7em] uppercase font-black">
               Our Heritage
             </h2>
          </div>

          <h3 className="text-6xl md:text-8xl font-black leading-[0.85] mb-12 tracking-tighter text-white">
            Forging a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500 drop-shadow-[0_0_35px_rgba(191,0,255,0.4)]">
              Digital Legacy
            </span>
          </h3>

          <p className="text-white text-xl mb-14 leading-relaxed max-w-xl font-medium opacity-90 border-l-2 border-white/10 pl-10 italic">
            "We aren't just building software; we are architecting the infrastructure of tomorrow's global leaders."
          </p>
          
          {/* HOLOGRAPHIC DASHBOARD STATS */}
          <div className="relative group inline-block">
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-[3rem] blur-2xl opacity-50"></div>
            <div className="relative flex items-center gap-12 px-12 py-10 rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl shadow-2xl">
              <div className="flex flex-col">
                <span className="text-7xl font-black text-white leading-none">
                  <StatCounter value="10" suffix="+" />
                </span>
                <span className="text-cyan-400 uppercase text-[10px] tracking-[0.5em] font-black mt-3">Years Mastery</span>
              </div>
              <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              <div className="flex flex-col">
                <span className="text-7xl font-black text-white leading-none">
                  <StatCounter value="24" suffix="/" />
                  <span className="text-4xl text-purple-500">7</span>
                </span>
                <span className="text-purple-400 uppercase text-[10px] tracking-[0.5em] font-black mt-3">Global Support</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: HOLOGRAPHIC IMAGE PROJECTOR (No curved rings) */}
        <motion.div 
          style={{ y: y1 }}
          className="relative flex items-center justify-center py-20"
        >
          {/* NESTED HUD CIRCLES - Flat & Professional */}
          <div className="absolute inset-0 border border-white/5 rounded-full scale-110" />
          <div className="absolute inset-4 border-[1px] border-dashed border-cyan-500/20 rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="absolute inset-10 border-[1px] border-purple-500/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
          
          {/* RADIANT BACKGROUND GLOW */}
          <div className="absolute w-full h-full bg-cyan-500/5 blur-[120px] rounded-full" />

          {/* THE IMAGE CORE */}
          <div className="relative z-10 w-[85%] aspect-square rounded-full overflow-hidden border border-white/10 p-1 bg-[#050510]/40 backdrop-blur-md shadow-2xl">
            <div 
              className="w-full h-full rounded-full relative overflow-hidden"
              style={{
                // Radial mask for misty transparency merge
                maskImage: 'radial-gradient(circle at center, black 30%, transparent 95%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 95%)',
              }}
            >
              <motion.img 
                src={legacy_image}
                alt="Digital Evolution" 
                className="w-full h-full object-cover saturate-[1.6] brightness-[0.7] opacity-60 mix-blend-lighten scale-110"
                animate={{ scale: [1.1, 1.15, 1.1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Color Mesh Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-purple-500/20" />
            </div>

            {/* TOP LAYER HUD DETAILS */}
            <div className="absolute inset-0 rounded-full border-[2px] border-white/5 shadow-[inset_0_0_40px_rgba(255,255,255,0.05)]" />
          </div>

          {/* FLOATING DECORATIVE PARTICLES */}
          <div className="absolute top-0 right-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
          <div className="absolute bottom-10 left-0 w-1 h-1 bg-purple-400 rounded-full animate-pulse" />
        </motion.div>

      </div>
    </section>
  );
};

export default Legacy;
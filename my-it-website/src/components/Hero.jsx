import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-6 overflow-hidden bg-transparent">
      
      {/* 1. BACKGROUND VISUALS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.img 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.45, scale: 1 }}
          transition={{ duration: 2.5 }}
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover brightness-110 contrast-110"
          style={{
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)'
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1400px] max-h-[800px] bg-gradient-to-r from-blue-500/15 via-purple-500/10 to-pink-500/15 blur-[160px] opacity-80" />
      </div>

      {/* 2. CONTENT AREA */}
      <div className="relative z-30 max-w-5xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-[5.8rem] font-bold mb-8 leading-[1.1] tracking-tight text-white px-4">
            <span className="font-light opacity-90">Empowering</span> <br /> 
            <span className="relative inline-block py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] via-[#bf00ff] to-[#ff00d4] drop-shadow-[0_0_20px_rgba(191,0,255,0.4)]">
              Digital Assets
            </span>
          </h1>

          {/* Optimized White Description Text */}
          <p className="text-white text-lg md:text-[1.3rem] max-w-3xl mx-auto mb-14 leading-[1.6] font-normal tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] px-4">
            Innovative IT solutions tailored for international growth. <br className="hidden md:block" /> 
            We bridge the gap between technology and business excellence.
          </p>

          {/* 3. COLORFUL NEON BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Primary Gradient Button */}
<button className="group relative px-10 py-4 w-full sm:w-auto rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_10px_rgba(0,242,255,0.4)] bg-[#03030b] border border-white/10">
<div className="absolute inset-[-150%] animate-[spin_3s_linear_infinite] opacity-100 group-hover:opacity-0 transition-opacity duration-500">
<div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_150deg,#00f2ff_180deg,#bf00ff_240deg,#ff00d4_300deg,transparent_360deg)]" />
</div>
<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#00f2ff] via-[#bf00ff] to-[#ff00d4] animate-pulse" />
<div className="absolute inset-[1.5px] bg-[#03030b] rounded-full z-0 transition-all duration-500 group-hover:bg-transparent" />
<span className="relative z-10 text-white font-black tracking-[0.3em] text-[10px] uppercase transition-all duration-500 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,1)]">
EXPLORE SERVICES
</span>
<div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-[#00f2ff] blur-[40px] opacity-40 group-hover:opacity-0 transition-opacity z-0" />
</button>

            {/* Secondary Glassmorphism Button */}
            <button className="group relative px-10 py-4 w-full sm:w-auto rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_10px_rgba(0,242,255,0.4)] bg-[#03030b] border border-white/10">
<div className="absolute inset-[-150%] animate-[spin_3s_linear_infinite] opacity-100 group-hover:opacity-0 transition-opacity duration-500">
<div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_150deg,#00f2ff_180deg,#bf00ff_240deg,#ff00d4_300deg,transparent_360deg)]" />
</div>
<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#00f2ff] via-[#bf00ff] to-[#ff00d4] animate-pulse" />
<div className="absolute inset-[1.5px] bg-[#03030b] rounded-full z-0 transition-all duration-500 group-hover:bg-transparent" />
<span className="relative z-10 text-white font-black tracking-[0.3em] text-[10px] uppercase transition-all duration-500 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,1)]">
GET STARTED
</span>
<div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-[#00f2ff] blur-[40px] opacity-40 group-hover:opacity-0 transition-opacity z-0" />
</button>
          </div>
        </motion.div>
      </div>

      <style jsx="true">{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
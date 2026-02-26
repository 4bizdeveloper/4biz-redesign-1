import { motion } from 'framer-motion';

const Legacy = () => {
  return (
    <section id="legacy" className="py-24 px-6 overflow-hidden relative">
      {/* Background Glow for Section Depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left: Content Area */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-cyan-500/80 text-sm uppercase tracking-[0.4em] mb-4 font-medium">
            Our Heritage
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
            Building a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Legacy</span> of Trust.
          </h3>
          <p className="text-zinc-400 text-lg mb-8 leading-relaxed max-w-lg">
            Since our inception, 4Biz International has been at the forefront of digital excellence, 
            helping enterprises navigate the complex landscape of modern technology.
          </p>
          
          {/* Stats Display */}
          <div className="flex items-center gap-8">
            <div className="border-l-2 border-cyan-500 pl-6 py-2">
              <span className="text-5xl font-bold block mb-2 text-white">10+</span>
              <span className="text-zinc-500 uppercase text-[10px] tracking-[0.2em]">Years of Expertise</span>
            </div>
            <div className="border-l-2 border-purple-500 pl-6 py-2">
              <span className="text-5xl font-bold block mb-2 text-white">24/7</span>
              <span className="text-zinc-500 uppercase text-[10px] tracking-[0.2em]">Global Support</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Clean Visual Display (No Text Overlays) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative aspect-[4/5] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10"
        >
          {/* Cyber Frame Corner */}
          <div className="absolute top-0 right-0 z-20">
             <div className="w-16 h-16 border-r-2 border-t-2 border-cyan-500/40 rounded-tr-2xl" />
          </div>

          {/* Bottom Shadow Gradient for smooth blending */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-transparent z-10 opacity-70" />

          {/* High-Resolution Tech Image */}
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000" 
            alt="Digital Legacy" 
            className="w-full h-full object-cover"
          />

          {/* Subtle Outer Border */}
          <div className="absolute inset-0 border border-white/5 rounded-2xl z-20 pointer-events-none" />
        </motion.div>

      </div>
    </section>
  );
};

export default Legacy;
import { motion } from 'framer-motion';
import girlImage from '../assets/images/girl1.png';

const About = () => {
  return (
    <section id="about" className="relative min-h-screen flex items-center overflow-hidden bg-transparent py-12 md:py-20">
      
      {/* 1. Image Container - Balanced at 50% Width */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* Decorative Glows for depth */}
        <div className="absolute left-[8%] top-1/2 -translate-y-1/2 w-[350px] md:w-[650px] h-[350px] md:h-[650px] bg-purple-600/10 blur-[110px] md:blur-[150px] rounded-full" />
        <div className="absolute left-0 top-[25%] md:top-[35%] w-[250px] md:w-[450px] h-[250px] md:h-[450px] bg-cyan-500/10 blur-[90px] md:blur-[110px] rounded-full" />

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          // WIDTH INCREASED: Adjusted to 50% for a stronger visual presence
          className="absolute left-0 top-0 w-full lg:w-[50%] h-[55vh] lg:h-full bg-no-repeat bg-contain bg-center lg:bg-left"
          style={{
            backgroundImage: `url(${girlImage})`,
            
            /* REFINED BORDER DISSOLVE:
               A slightly wider black core (15%) before the transparent fade (75%) 
               keeps her face sharp while ensuring borders are invisible.
            */
            maskImage: 'radial-gradient(circle at 38% 48%, black 15%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle at 38% 48%, black 15%, transparent 75%)',
            
            filter: 'contrast(1.12) brightness(1.08) saturate(1.05)',
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          
          {/* Spacer matched to the new 50% image width */}
          <div className="h-[48vh] lg:h-auto lg:w-[50%] pointer-events-none" />

          {/* 2. Text Content: Bold Pure White for readability */}
          <div className="w-full lg:w-[50%] lg:pl-16 mt-6 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[2px] w-12 bg-cyan-400"></div>
                <span className="text-cyan-400 font-mono text-[11px] font-bold tracking-[0.5em] uppercase">
                  Fast and Without Friction
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[0.95] tracking-tighter">
                Where <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-blue-400 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  IT solutions
                </span> <br />
                meet scale
              </h2>

              <p className="text-lg md:text-xl text-white leading-relaxed font-normal max-w-xl mb-10 drop-shadow-sm">
                Innovative IT infrastructure designed for international growth. 
                We remove the technical barriers that slow you down, allowing your digital assets to flourish.
              </p>

              {/* Stats Footer */}
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 pt-10 border-t border-white/20">
                <div className="flex flex-col gap-1">
                  <p className="text-white font-black text-[12px] uppercase tracking-widest">Reliability</p>
                  <p className="text-zinc-200 text-sm font-medium">99.9% Uptime Architecture</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-white font-black text-[12px] uppercase tracking-widest">Operations</p>
                  <p className="text-zinc-200 text-sm font-medium">UAE-Based, Global Support</p>
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
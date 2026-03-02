import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MapSection = () => {
  const locations = useMemo(() => [
    {
      id: 0,
      city: "Dubai, UAE",
      title: "Global Headquarters",
      address: "Crystal Building, Al Karama",
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.184593989201!2d75.83155460914165!3d11.247827288884881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65b26cb564cd7%3A0x6e4ea8183d688e13!2s4biz%20International!5e0!3m2!1sen!2sin!4v1772309205095!5m2!1sen!2sin8",
      color: "from-cyan-400 to-blue-600",
    },
    {
      id: 1,
      city: "Kozhikode, IN",
      title: "HiLite Business Park",
      address: "Regional Tech Node",
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.184593989201!2d75.83155460914165!3d11.247827288884881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65b26cb564cd7%3A0x6e4ea8183d688e13!2s4biz%20International!5e0!3m2!1sen!2sin!4v1772309205095!5m2!1sen!2sin9",
      color: "from-purple-500 to-pink-600",
    },
    {
      id: 2,
      city: "Nadakkavu, IN",
      title: "Operational Hub",
      address: "4Biz International Branch",
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62604.73787830177!2d75.70025652167969!3d11.276392500000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65f2df7358683%3A0xdd71f8c39ea9198!2s4biz%20International%20-%20Nadakkavu!5e0!3m2!1sen!2sin!4v1772309247081!5m2!1sen!2sin0",
      color: "from-blue-400 to-cyan-500",
    }
  ], []);

  const [activeNode, setActiveNode] = useState(0);

  return (
    <section 
      id="map" 
      className="py-20 md:py-32 px-4 md:px-10 relative bg-transparent overflow-hidden will-change-transform"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1000px' }}
    >
      {/* BACKGROUND ATMOSPHERE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-12">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase pr-4"
          >
            Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Nodes</span>
          </motion.h2>
          <div className="h-1 w-20 bg-cyan-500 mt-2 rounded-full" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* NAVIGATION MENU */}
          <div className="lg:col-span-4 flex flex-col gap-4 order-2 lg:order-1">
            {locations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setActiveNode(loc.id)}
                className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 text-left ${
                  activeNode === loc.id 
                  ? 'bg-white/10 border-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.15)] scale-[1.02]' 
                  : 'bg-white/[0.03] border-white/5 hover:border-white/20 hover:bg-white/[0.06]'
                }`}
              >
                <div className="flex justify-between items-center relative z-10 pointer-events-none">
                  <div>
                    <h3 className="text-white font-black text-sm uppercase tracking-wider mb-1">
                      {loc.city}
                    </h3>
                    <p className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                      activeNode === loc.id ? 'text-cyan-400' : 'text-white/30'
                    }`}>
                      {loc.title}
                    </p>
                  </div>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${
                    activeNode === loc.id ? 'border-cyan-400 bg-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'border-white/10'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${activeNode === loc.id ? 'bg-cyan-400 animate-pulse' : 'bg-white/20'}`} />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* MAP VIEWPORT - Optimized for Layout Stability */}
          <div className="lg:col-span-8 relative order-1 lg:order-2">
            <div className="relative h-full rounded-[2.5rem] border border-white/10 bg-zinc-950 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] min-h-[400px] sm:min-h-[450px] md:min-h-[550px] transform-gpu">
              
              {/* INFO BOX */}
              <div className="absolute top-5 left-5 z-30 bg-white/90 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow-2xl max-w-[260px] pointer-events-none select-none">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                  <span className="text-zinc-500 font-bold text-[8px] uppercase tracking-[0.2em]">Signal Established</span>
                </div>
                <h4 className="text-zinc-900 font-black text-base uppercase leading-tight">
                  {locations[activeNode].city}
                </h4>
                <p className="text-zinc-500 text-[10px] font-medium mt-1 leading-relaxed">
                  {locations[activeNode].address}
                </p>
              </div>

              {/* ULTRA MODERN EXPAND BUTTON */}
              <motion.a 
                href={locations[activeNode].src} 
                target="_blank" 
                rel="noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-5 right-5 z-30 group overflow-hidden"
              >
                <div className="relative px-8 py-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.3)] border border-white/20 transition-all group-hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer pointer-events-none" />
                  <span className="text-white font-black text-[10px] uppercase tracking-[0.2em] relative z-10">
                    Expand View
                  </span>
                </div>
              </motion.a>

              {/* THE MAP FRAME - Performance Optimized */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full h-full absolute inset-0"
                >
                  <iframe 
                    src={locations[activeNode].src} 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, filter: 'none' }} 
                    allowFullScreen={true}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title={locations[activeNode].title}
                    className="w-full h-full pointer-events-auto"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 4s infinite linear;
        }
        
        /* Smooth scrolling fixes */
        :global(html) {
          scroll-behavior: smooth;
        }

        /* Prevents hover effects from triggering during scroll */
        :global(.is-scrolling) {
          pointer-events: none;
        }
      `}</style>
    </section>
  );
};

export default MapSection;
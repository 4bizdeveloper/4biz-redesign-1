import React, { memo } from 'react';
import { motion } from 'framer-motion';

// Memoized Card: Prevents expensive iframe re-renders when parent state changes
const LocationCard = memo(({ loc, index }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    className="group relative flex flex-col h-full transform-gpu"
    style={{ willChange: 'transform' }} // Pre-allocates GPU memory to prevent shaking
  >
    {/* MAP CONTAINER - Fixed aspect ratio via Tailwind prevents layout jumping */}
    <div className="relative aspect-[4/5] rounded-[2rem] border border-white/10 bg-[#0a0a0a] overflow-hidden shadow-2xl transition-all duration-700 
      group-hover:border-cyan-400 group-hover:shadow-[0_0_50px_rgba(34,211,238,0.35)] group-hover:ring-1 group-hover:ring-cyan-400/30">
      
      {/* INTERACTIVE OVERLAY BOX */}
      <a 
        href={loc.link}
        target="_blank"
        rel="noreferrer"
        className="absolute top-4 left-4 right-4 z-20 bg-black/70 backdrop-blur-xl border border-white/10 p-5 rounded-2xl transition-all duration-300 hover:bg-black/85 group/info pointer-events-auto"
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]" />
              <span className="text-cyan-400 font-black text-[8px] uppercase tracking-[0.25em]">Node Online</span>
            </div>
            <h4 className="text-white font-black text-lg uppercase leading-tight group-hover/info:text-cyan-400 transition-colors">
              {loc.city}
            </h4>
            <p className="text-white/60 text-[10px] font-bold mt-1 tracking-wide">
              {loc.title}
            </p>
          </div>
          <div className="p-2.5 bg-white/10 rounded-xl group-hover/info:bg-cyan-500 transition-all duration-500 shadow-lg">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
          </div>
        </div>
      </a>

      {/* THE MAP FRAME - OPTIMIZED LOADING */}
      <iframe 
        src={loc.src} 
        width="100%" 
        height="100%" 
        style={{ 
          border: 0, 
          filter: 'brightness(1.05) contrast(1.1)',
          background: '#0f172a' // Placeholder color while loading
        }} 
        allowFullScreen={true}
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title={loc.title}
        className="w-full h-full opacity-100 transition-opacity duration-500 transform-gpu"
      />

      {/* GRADIENT PROTECTOR */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/40" />

      {/* SHINE EFFECT LAYER */}
      <div className="shine-layer absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>

    {/* LOWER ADDRESS DETAIL */}
    <div className="mt-5 px-3">
      <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.15em] leading-relaxed">
        <span className="text-cyan-500/50 mr-2">>></span>{loc.address}
      </p>
    </div>
  </motion.div>
));

const MapSection = () => {
  const locations = [
    {
      city: "Dubai, UAE",
      title: "Global Headquarters",
      address: "Crystal Building, Al Karama",
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.846777640926!2d55.29480887402656!3d25.242085229883678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d3f84a0cd39%3A0x6834edd5ea42e51d!2s4BIZ%20International%20LLC!5e0!3m2!1sen!2sin!4v1772514278738!5m2!1sen!2sin",
      link: "https://maps.app.goo.gl/mvEzAuLbBsbSHYYN6"
    },
    {
      city: "Kozhikode, IN",
      title: "HiLite Business Park",
      address: "Regional Tech Node",
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.184522525073!2d75.83155997364221!3d11.247832550324496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65b26cb564cd7%3A0x6e4ea8183d688e13!2s4biz%20International!5e0!3m2!1sen!2sin!4v1772514394785!5m2!1sen!2sin",
      link: "https://maps.app.goo.gl/2q23WSGKAKBKLiBh6"
    },
    {
      city: "Nadakkavu, IN",
      title: "Operational Hub",
      address: "4Biz International Branch",
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.794124585367!2d75.76756227364258!3d11.276538849772843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65f2df7358683%3A0xdd71f8c39ea9198!2s4biz%20International%20-%20Nadakkavu!5e0!3m2!1sen!2sin!4v1772514465191!5m2!1sen!2sin",
      link: "https://maps.app.goo.gl/xJKGxNDLC4HxyU4G9"
    }
  ];

  return (
    <section 
      id="map" 
      className="py-20 md:py-32 px-4 md:px-10 relative bg-transparent overflow-hidden"
      // contentVisibility: auto skips rendering work until scroll is nearby
      // contain: paint prevents layout calculation from leaking to other sections
      style={{ 
        contentVisibility: 'auto', 
        containmentIntrinsicSize: '0 800px',
        contain: 'paint' 
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.12)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-20 flex flex-col items-center text-center w-full">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9] pb-4"
          >
            Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 inline-block">Nodes</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="h-2 bg-cyan-500 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.6)]"
          />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {locations.map((loc, index) => (
            <LocationCard key={index} loc={loc} index={index} />
          ))}
        </div>
      </div>

      <style jsx>{`
        /* GPU Smoothing */
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        /* Prevent Hover Shaking */
        .group:hover {
          z-index: 20;
        }

        /* Optimized Shine Animation */
        @keyframes shine-move {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }

        .shine-layer {
          background: linear-gradient(
            120deg,
            transparent 30%,
            rgba(255, 255, 255, 0.03) 50%,
            transparent 70%
          );
          background-size: 200% 100%;
          animation: shine-move 3s infinite linear;
        }

        /* Scroll Smoothing */
        :global(html) {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </section>
  );
};

export default MapSection;
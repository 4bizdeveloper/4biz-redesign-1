import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MapSection = () => {
  const locations = [
    {
      id: 0,
      city: "Dubai",
      title: "UAE Headquarters",
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.846921732776!2d55.294803509592!3d25.242080377588984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d3f84a0cd39%3A0x6834edd5ea42e51d!2s4BIZ%20International%20LLC!5e0!3m2!1sen!2sin!4v1772309152300!5m2!1sen!2sin",
      color: "from-[#5fd9fb] to-[#2882f0]"
    },
    {
      id: 1,
      city: "HiLite Business Park",
      title: "Regional Node - Kozhikode",
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.184593989201!2d75.83155460914165!3d11.247827288884881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65b26cb564cd7%3A0x6e4ea8183d688e13!2s4biz%20International!5e0!3m2!1sen!2sin!4v1772309205095!5m2!1sen!2sin",
      color: "from-[#f028dd] to-[#a828f0]"
    },
    {
      id: 2,
      city: "Nadakkavu",
      title: "4Biz International - Kozhikode",
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62604.73787830177!2d75.70025652167969!3d11.276392500000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65f2df7358683%3A0xdd71f8c39ea9198!2s4biz%20International%20-%20Nadakkavu!5e0!3m2!1sen!2sin!4v1772309247081!5m2!1sen!2sin",
      color: "from-[#5fd9fb] to-[#f028dd]"
    }
  ];

  const [activeNode, setActiveNode] = useState(0);

  return (
    <section id="map" className="py-24 md:py-32 px-4 md:px-6 relative bg-transparent overflow-hidden">
      {/* ATMOSPHERIC SPACE DUST */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(95,217,251,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4"
          >
            Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5fd9fb] to-[#f028dd]">Coordinates</span>
          </motion.h2>
          <p className="text-[#5fd9fb] tracking-[0.4em] uppercase text-[10px] font-bold opacity-60">Strategic Operational Centers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* NAVIGATION NODES */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {locations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setActiveNode(loc.id)}
                className={`group relative p-6 rounded-2xl border transition-all duration-500 text-left overflow-hidden ${
                  activeNode === loc.id 
                  ? 'bg-white/10 border-white/20 shadow-[0_0_30px_rgba(95,217,251,0.15)]' 
                  : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]'
                }`}
              >
                {activeNode === loc.id && (
                  <motion.div layoutId="activeGlow" className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${loc.color}`} />
                )}
                <h3 className={`text-xs font-black uppercase tracking-[0.2em] mb-1 ${activeNode === loc.id ? 'text-white' : 'text-white/40'}`}>
                  {loc.city}
                </h3>
                <p className={`text-[11px] font-bold uppercase tracking-widest ${activeNode === loc.id ? 'text-[#5fd9fb]' : 'text-white/20'}`}>
                  {loc.title}
                </p>
              </button>
            ))}
          </div>

          {/* INTERACTIVE MAP VIEWPORT */}
          <div className="lg:col-span-8 relative group">
            <div className="relative rounded-[30px] md:rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-3xl overflow-hidden shadow-2xl aspect-[4/3] md:aspect-video">
              
              {/* CYBER FRAME DECOR */}
              <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-[#5fd9fb]/40 z-20" />
              <div className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 border-[#f028dd]/40 z-20" />
              <div className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 border-[#f028dd]/40 z-20" />
              <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-[#5fd9fb]/40 z-20" />

              <iframe 
                src={locations[activeNode].src} 
                width="100%" 
                height="100%" 
                style={{ 
                  border: 0, 
                  filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' 
                }} 
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Global Node Map"
                className="w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-700"
              />
              
              {/* SCANLINE EFFECT overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%] z-10 opacity-30" />
            </div>

            <div className="mt-8 flex items-center justify-center gap-6">
               <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
               <p className="text-zinc-500 text-[9px] uppercase tracking-[0.4em] whitespace-nowrap">
                 Transmission Link <span className="text-[#5fd9fb] animate-pulse">Stable</span>
               </p>
               <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        iframe {
          pointer-events: all;
        }
        /* Mobile optimization: Ensure the map doesn't capture scroll unintentionally */
        @media (max-width: 768px) {
          .aspect-[4/3] {
            height: 350px;
          }
        }
      `}</style>
    </section>
  );
};

export default MapSection;
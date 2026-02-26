import React from 'react';

const MapSection = () => {
  return (
    <section id="map" className="py-24 px-6 relative bg-transparent">
      {/* Background Glow to maintain 'Shiny' consistency */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center mb-12 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Global</span> Presence
        </h2>
        <p className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] md:text-xs">
          Interactive Navigation & Controls
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto z-10">
        {/* Glassmorphism Container:
          - bg-white/5 makes it transparent
          - backdrop-blur-md gives it the premium glass feel
          - border-white/10 adds the subtle edge
        */}
        <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          
          {/* Cyber Decor Corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-3xl z-20 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/30 rounded-br-3xl z-20 pointer-events-none" />

          <div className="aspect-video w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093643!2d144.9537353153166!3d-37.81032797975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sau!4v1611542171242!5m2!1sen!2sau" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }} 
              allowFullScreen={true}
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Interactive Map"
              className="w-full h-full opacity-80 hover:opacity-100 transition-opacity duration-500"
            />
          </div>
        </div>

        {/* Floating instruction */}
        <div className="mt-6 text-center text-zinc-500 text-[10px] uppercase tracking-widest">
          Scroll to zoom • Use <span className="text-cyan-400">+ / -</span> buttons for precision
        </div>
      </div>
    </section>
  );
};

export default MapSection;
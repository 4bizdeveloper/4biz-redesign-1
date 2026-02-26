import React from 'react';
import BackgroundEffect from './components/BackgroundEffect';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Legacy from './components/Legacy';
import MapSection from './components/MapSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AIChatButton from './components/AIChatButton';

function App() {
  return (
    <div className="relative min-h-screen bg-[#020202] text-white selection:bg-cyan-500/30 font-sans antialiased overflow-x-hidden">
      
      {/* 1. Background Layer (z-0) */}
      <BackgroundEffect />
      
      {/* 2. Global UI Elements (Fixed Layers - Always on top) */}
      <Header />
      
      {/* AI Assistant (Bottom Left) */}
      <AIChatButton /> 
      
      {/* WhatsApp Planet (Bottom Right) */}
      <WhatsAppButton /> 
      
      {/* 3. Content Layer (z-10) */}
      <main className="relative z-10 flex flex-col">
        
        <section id="hero" className="relative">
          <Hero />
        </section>

        <section id="about" className="relative">
          {/* Subtle atmospheric glow for transition */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-cyan-500/10 blur-[140px] pointer-events-none" />
          <About />
        </section>

        <section id="services" className="relative">
          <Services />
        </section>
        
        <section id="legacy" className="relative">
          {/* Deep space purple glow */}
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] pointer-events-none" />
          <Legacy />
        </section>

        <section id="map" className="relative">
          <MapSection />
        </section>

        <section id="contact" className="relative pb-20">
          <Contact />
        </section>

      </main>
      
      {/* 4. Footer Layer */}
      <Footer />
      
    </div>
  );
}

export default App;
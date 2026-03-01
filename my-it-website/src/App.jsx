import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Global UI Components
import BackgroundEffect from './components/BackgroundEffect';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AIChatButton from './components/AIChatButton';

// Section Components
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Legacy from './components/Legacy';
import MapSection from './components/MapSection';
import Contact from './components/Contact';

// --- MAIN HOME PAGE ARCHITECTURE ---
// This serves as the primary terminal for all site sections
const HomePage = () => {
  return (
    <main className="relative z-10 flex flex-col">
      <section id="hero" className="relative">
        <Hero />
      </section>

      <section id="about" className="relative">
        {/* Cyan Atmospheric Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#5fd9fb]/10 blur-[140px] pointer-events-none" />
        <About />
      </section>

      <section id="services" className="relative">
        <Services />
      </section>
      
      <section id="legacy" className="relative">
        {/* Rose/Purple Deep Space Glow */}
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#f028dd]/5 blur-[120px] pointer-events-none" />
        <Legacy />
      </section>

      <section id="map" className="relative">
        <MapSection />
      </section>

      <section id="contact" className="relative pb-20">
        <Contact />
      </section>
    </main>
  );
};

// --- APP ROUTER ---
function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-[#020202] text-white selection:bg-[#5fd9fb]/30 font-sans antialiased overflow-x-hidden">
        
        {/* 1. Global Background (Z-0) */}
        <BackgroundEffect />
        
        {/* 2. Fixed UI Elements (Z-Top) */}
        <Header />
        
        {/* Space Orb Buttons (AI & WhatsApp) */}
        <AIChatButton /> 
        <WhatsAppButton /> 
        
        {/* 3. Routing Engine */}
        <Routes>
          {/* Main Home Route */}
          <Route path="/" element={<HomePage />} />
          
          {/* Future pages like /portfolio or /privacy can be added here */}
        </Routes>
        
        {/* 4. Global Footer */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;
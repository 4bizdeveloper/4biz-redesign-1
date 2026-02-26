import React from 'react';

const Footer = () => {
  return (
    <footer className="relative z-10 bg-transparent pt-24 pb-12 border-t border-white/10">
      {/* 1. Glassmorphism Layer - Allows background particles to be visible */}
      <div className="absolute inset-0 bg-[#03030b]/40 backdrop-blur-xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="flex flex-col items-start">
            <img 
              src="https://4bizinternational.com/assets/images/logo/test.png" 
              alt="4Biz Logo" 
              className="h-10 w-auto mb-8 brightness-125 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]"
            />
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs font-medium">
              Redefining international IT excellence through innovative digital solutions and secure architecture.
            </p>
          </div>

          {/* Quick Links - Solutions */}
          <div>
            <h4 className="text-white font-black mb-8 uppercase tracking-[0.3em] text-[10px]">Solutions</h4>
            <ul className="space-y-4 text-zinc-500 text-sm font-medium">
              <li><a href="#" className="hover:text-cyan-400 transition-all hover:pl-2">Software Development</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-all hover:pl-2">Cloud Infrastructure</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-all hover:pl-2">Cybersecurity</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-all hover:pl-2">AI Integration</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-black mb-8 uppercase tracking-[0.3em] text-[10px]">Company</h4>
            <ul className="space-y-4 text-zinc-500 text-sm font-medium">
              <li><a href="#about" className="hover:text-cyan-400 transition-all hover:pl-2">About Us</a></li>
              <li><a href="#legacy" className="hover:text-cyan-400 transition-all hover:pl-2">Our Legacy</a></li>
              <li><a href="#map" className="hover:text-cyan-400 transition-all hover:pl-2">Global Network</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-all hover:pl-2">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="relative">
            <h4 className="text-white font-black mb-8 uppercase tracking-[0.3em] text-[10px]">Stay Connected</h4>
            <div className="flex flex-col gap-3">
               <input 
                type="email" 
                placeholder="Enter email" 
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-500 focus:bg-white/10 outline-none transition-all text-white"
               />
               <button className="relative group overflow-hidden bg-white text-black text-[10px] font-black py-4 rounded-xl transition-all uppercase tracking-widest">
                <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10">Subscribe</span>
               </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-600 text-[9px] uppercase tracking-[0.4em] font-bold">
            © 2026 4Biz International. Crafted for Excellence.
          </p>
          <div className="flex gap-10 text-[9px] uppercase tracking-[0.3em] font-bold text-zinc-600">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </div>

      {/* 2. Symmetrical Glow - Matches the Map section style */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-purple-600/5 blur-[120px] pointer-events-none" />
    </footer>
  );
};

export default Footer;
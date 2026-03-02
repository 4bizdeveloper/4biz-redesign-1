import React, { useRef, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';

// Asset Imports
import webDevImg from '../assets/images/web-development.avif';
import digitalMarketingImg from '../assets/images/digital-marketing.avif';
import cyberSecurityImg from '../assets/images/cyber-security.avif';
import crmErpImg from '../assets/images/crm-erp-software.avif';
import contentMgmtImg from '../assets/images/content-management.avif';
import domainHostingImg from '../assets/images/domain-hosting.avif';
import mobileAppImg from '../assets/images/mobile-app-development.avif';
import itConsultingImg from '../assets/images/it-consulting.avif';
import ecommerceImg from '../assets/images/ecommerce.avif';

const ServiceCard = ({ title, desc, icon, img }) => {
  const divRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out mouse movement to prevent "choppy" spotlight on high-DPI screens
  const smoothX = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const smoothY = useSpring(mouseY, { stiffness: 500, damping: 50 });

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/[0.03] backdrop-blur-sm p-8 transition-colors duration-500 hover:border-cyan-400 transform-gpu"
      style={{ 
        contain: 'layout paint',
        willChange: 'transform'
      }}
    >
      {/* Background Image - Masked & Optimized */}
      <div 
        className="absolute inset-0 z-0 opacity-40 transition-transform duration-700 group-hover:scale-110 pointer-events-none"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 95%)',
        }}
      />

      {/* High-Performance Dynamic Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10 opacity-0 group-hover:opacity-100"
        style={{
          background: useMemo(() => `radial-gradient(600px circle at var(--x) var(--y), rgba(34, 211, 238, 0.15), transparent 40%)`, []),
          '--x': smoothX,
          '--y': smoothY,
        }}
      />

      <div className="relative z-20 pointer-events-none">
        <div className="text-5xl mb-6 drop-shadow-lg">{icon}</div>
        <h3 className="text-2xl font-bold mb-4 text-white tracking-tight drop-shadow-md">{title}</h3>
        <p className="text-white text-sm md:text-base leading-relaxed font-medium drop-shadow-md opacity-90">{desc}</p>
      </div>

      {/* Decorative Overlay Gradient */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
    </motion.div>
  );
};

const Services = () => {
  const serviceData = useMemo(() => [
    { title: "Web Development", desc: "Full-stack solutions using modern JS frameworks.", icon: "💻", img: webDevImg },
    { title: "Digital Marketing", desc: "Comprehensive SEO, SMM, and Performance Marketing.", icon: "📊", img: digitalMarketingImg },
    { title: "Cyber Security", desc: "Advanced security featuring AI threat monitoring.", icon: "🛡️", img: cyberSecurityImg },
    { title: "CRM / ERP Solutions", desc: "Customized Enterprise Resource Planning and CRM software.", icon: "⚙️", img: crmErpImg },
    { title: "Content Management", desc: "Expert CMS solutions and WordPress development.", icon: "📝", img: contentMgmtImg },
    { title: "Domain & Hosting", desc: "Secure hosting infrastructure ensuring 99.9% uptime.", icon: "☁️", img: domainHostingImg },
    { title: "Mobile App Dev", desc: "Custom iOS and Android applications.", icon: "📱", img: mobileAppImg },
    { title: "IT Consulting", desc: "Strategic technical guidance for digital transformation.", icon: "🤝", img: itConsultingImg },
    { title: "E-Commerce", desc: "Complete online store solutions with integrated payments.", icon: "🛒", img: ecommerceImg }
  ], []);

  return (
    <section 
      id="services" 
      className="py-24 px-6 lg:px-12 relative bg-transparent overflow-hidden transform-gpu"
      style={{ 
        contentVisibility: 'auto', 
        containIntrinsicSize: '0 1200px' // Critical for removing scroll jumps
      }}
    >
      {/* ATMOSPHERIC OVERLAY - GPU Accelerated animations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-transparent to-purple-950/20 mix-blend-overlay" />
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-600/10 blur-[120px] rounded-full animate-soft-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-cyan-600/10 blur-[120px] rounded-full animate-soft-pulse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-cyan-400 font-mono text-xs md:text-sm tracking-[0.6em] uppercase font-black"
          >
            Digital Excellence Since 2010
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mt-6 tracking-tighter"
          >
            Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]">Capabilities</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceData.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes soft-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        .animate-soft-pulse {
          animation: soft-pulse 8s ease-in-out infinite;
          will-change: transform, opacity;
        }
      `}</style>
    </section>
  );
};

export default Services;
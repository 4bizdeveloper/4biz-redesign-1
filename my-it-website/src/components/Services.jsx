import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ServiceCard = ({ title, desc, icon, img }) => {
  const divRef = useRef(null);
  const [opacity, setOpacity] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      // High transparency with light border - background space will show through
      className="group relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/[0.03] backdrop-blur-sm p-8 transition-all duration-500 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
    >
      {/* 1. VIBRANT BACKGROUND IMAGE - No Grayscale, higher opacity */}
      <div 
        className="absolute inset-0 z-0 opacity-40 transition-transform duration-700 group-hover:scale-110"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // Radial mask keeps it merged but allows the center to be very colorful
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 95%)',
        }}
      />

      {/* 2. Interactive Spotlight - Light Cyan Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(34, 211, 238, 0.15), transparent 40%)`,
        }}
      />

      {/* 3. High-Clarity Content */}
      <div className="relative z-20">
        <div className="text-5xl mb-6 drop-shadow-lg">
          {icon}
        </div>
        
        <h3 className="text-2xl font-bold mb-4 text-white tracking-tight drop-shadow-md">
          {title}
        </h3>
        
        <p className="text-white text-sm md:text-base leading-relaxed font-medium drop-shadow-md">
          {desc}
        </p>
      </div>

      {/* Glassy reflection effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
    </div>
  );
};

const Services = () => {
  const serviceData = [
    {
      title: "Web Development",
      desc: "Full-stack solutions using modern JS frameworks. We build scalable portals, high-speed hosting, and enterprise applications.",
      icon: "💻",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Digital Marketing",
      desc: "Comprehensive SEO, SMM, and Performance Marketing. Precision branding and content strategies designed for global ROI.",
      icon: "📊",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Cyber Security",
      desc: "Advanced security featuring AI threat monitoring, dark web investigation, and endpoint protection for enterprise assets.",
      icon: "🛡️",
      img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "CRM / ERP Solutions",
      desc: "Customized Enterprise Resource Planning and CRM software to automate workflows and optimize organizational productivity.",
      icon: "⚙️",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Content Management",
      desc: "Expert CMS solutions and WordPress development designed for high performance and easy management.",
      icon: "📝",
      img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Domain & Hosting",
      desc: "Secure hosting infrastructure ensuring 99.9% uptime with robust cloud and online storage solutions.",
      icon: "☁️",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Mobile App Dev",
      desc: "Custom iOS and Android applications with intuitive interfaces and seamless cross-platform performance.",
      icon: "📱",
      img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "IT Consulting",
      desc: "Strategic technical guidance to help brands navigate their digital transformation journey with confidence.",
      icon: "🤝",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "E-Commerce",
      desc: "Complete online store solutions with integrated payment gateways and secure, optimized checkout paths.",
      icon: "🛒",
      img: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="services" className="py-24 px-6 lg:px-12 relative bg-transparent">
      
      {/* Background Depth - Nebula Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-cyan-400 font-mono text-xs md:text-sm tracking-[0.6em] uppercase font-black"
          >
            Digital Excellence Since 2010
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mt-6 tracking-tighter"
          >
            Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-500">Capabilities</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceData.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
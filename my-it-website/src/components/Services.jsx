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

const ServiceCard = ({ title, desc, icon, img, videoUrl }) => {
  const divRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

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
      className="group relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/[0.03] backdrop-blur-sm p-6 transition-colors duration-500 hover:border-cyan-400 transform-gpu"
    >
      {/* Media Section: Shows Video if videoUrl exists, otherwise shows Image */}
      <div className="relative h-52 mb-6 overflow-hidden rounded-2xl z-20 bg-black/20">
        {videoUrl ? (
          <iframe
            className="w-full h-full"
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${img})` }}
          />
        )}
      </div>

      {/* Content Section */}
      <div className="relative z-20">
        <div className="text-4xl mb-4 drop-shadow-lg">{icon}</div>
        <h3 className="text-xl font-bold mb-3 text-white tracking-tight">{title}</h3>
        <p className="text-white/70 text-sm leading-relaxed line-clamp-3">{desc}</p>
      </div>

      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity z-10"
        style={{
          background: useMemo(() => `radial-gradient(600px circle at var(--x) var(--y), rgba(34, 211, 238, 0.1), transparent 40%)`, []),
          '--x': smoothX,
          '--y': smoothY,
        }}
      />
    </motion.div>
  );
};

const Services = () => {
  const serviceData = useMemo(() => [
    { title: "Web Design & Development", desc: "We provide complete Web Management Services, including website, email, and SEO. Partner with us for cost-effective solutions, expert support, and an optimized online presence. Our cutting-edge technology ensures your website works well on all devices, giving you a competitive edge in your industry.", icon: "💻", img: webDevImg },
    { title: "Search Engine Optimization", desc: "In the ever-evolving digital landscape, the visibility of your business in search engine results is paramount to your online success. At 4Biz International, we understand the critical importance of Search Engine Optimization (SEO) as an integral element of your marketing strategy. Our approach goes above and beyond conventional strategies to ensure that your website not only ranks high but shines brightly in the online realm.", icon: "📊", img: digitalMarketingImg },
    { title: "Microsoft Dynamics 365", desc: "At 4biz International, we take pride in offering an unparalleled solution to transform and empower your business—Microsoft Dynamics 365. This all-in-one platform seamlessly integrates Customer Relationship Management (CRM) and Enterprise Resource Planning (ERP), providing a unified system to streamline operations and elevate your overall business efficiency.", icon: "🛡️", img: cyberSecurityImg },
    { title: "Social Media Marketing", desc: "In a digital landscape where social media reigns supreme, 4Biz International stands as your strategic partner to turn platforms like Facebook, Instagram, LinkedIn, and Twitter into powerful catalysts for brand success. we don't just manage social media; we craft digital narratives that elevate your brand's online presence. Our approach is a fusion of strategy, engagement, and content excellence, ensuring your brand not only stands out but thrives in the dynamic world of social media.", icon: "⚙️", img: crmErpImg },
    { title: "Domain & Hosting", desc: "At 4Biz, we offer our own fast and reliable hosting solutions. We use cutting-edge technology and high-performance hardware for exceptional results. Our dedicated servers provide fast and dependable hosting for websites and web apps. Whether you need hosting packages, Site Lock, SSL Certificates, or Hacking Protection, we've got you covered.", icon: "☁️", img: domainHostingImg },
    { title: "Content Marketing", desc: "In the dynamic realm of digital marketing, content reigns supreme, and at 4Biz, we understand that quality content is the heartbeat of a successful strategy. Our Content Marketing services go beyond the ordinary, incorporating key elements that ensure your brand stands out in the digital landscape. At 4Biz, we excel in delivering outstanding Content Marketing services designed to amplify your brand's digital footprint.", icon: "📝", img: contentMgmtImg },
    
    { title: "Email And SMS Marketing", desc: "At 4Biz, we understand the power of effective email marketing and SMS campaigns in today's digital landscape. Our comprehensive services are designed to help businesses reach their target audience, engage with customers, and drive measurable results. With our expertise in crafting compelling email content, designing eye-catching templates, and implementing strategic SMS campaigns, we ensure that your marketing messages resonate with your audience and drive conversions.", icon: "📱", img: mobileAppImg },
    { title: "Branding", desc: "Branding is about creating a distinct image through consistent advertising to stand out, attract loyal customers, and leave an impact.We have a unique approach for building strong brands. It requires a systematic strategy to make a lasting impression. It's not just about quality; it's about how you present your brand.", icon: "🤝", img: itConsultingImg },
    { title: "Photoshoot And Videoshoot", desc: "In the expansive realm of professional photography and video services, 4Biz emerges as your dedicated partner, committed to translating your brand vision into captivating visual stories. Our skilled team doesn't just wield technical prowess; they bring a creative passion that breathes life into every frame, transforming mere moments into an immersive visual experience.", icon: "🛒", img: ecommerceImg },
    { title: "Photoshoot And Videoshoot", desc: "In the expansive realm of professional photography and video services, 4Biz emerges as your dedicated partner, committed to translating your brand vision into captivating visual stories. Our skilled team doesn't just wield technical prowess; they bring a creative passion that breathes life into every frame, transforming mere moments into an immersive visual experience.", icon: "🛒", img: ecommerceImg },
    { title: "Photoshoot And Videoshoot", desc: "In the expansive realm of professional photography and video services, 4Biz emerges as your dedicated partner, committed to translating your brand vision into captivating visual stories. Our skilled team doesn't just wield technical prowess; they bring a creative passion that breathes life into every frame, transforming mere moments into an immersive visual experience.", icon: "🛒", img: ecommerceImg },
    { title: "Photoshoot And Videoshoot", desc: "In the expansive realm of professional photography and video services, 4Biz emerges as your dedicated partner, committed to translating your brand vision into captivating visual stories. Our skilled team doesn't just wield technical prowess; they bring a creative passion that breathes life into every frame, transforming mere moments into an immersive visual experience.", icon: "🛒", img: ecommerceImg },
    { title: "Photoshoot And Videoshoot", desc: "In the expansive realm of professional photography and video services, 4Biz emerges as your dedicated partner, committed to translating your brand vision into captivating visual stories. Our skilled team doesn't just wield technical prowess; they bring a creative passion that breathes life into every frame, transforming mere moments into an immersive visual experience.", icon: "🛒", img: ecommerceImg },
    { title: "Photoshoot And Videoshoot", desc: "In the expansive realm of professional photography and video services, 4Biz emerges as your dedicated partner, committed to translating your brand vision into captivating visual stories. Our skilled team doesn't just wield technical prowess; they bring a creative passion that breathes life into every frame, transforming mere moments into an immersive visual experience.", icon: "🛒", img: ecommerceImg },
    { title: "Brand Story", desc: "Watch how 4Biz International transforms digital landscapes through innovation and strategic excellence.", icon: "🎬", videoUrl: "https://www.youtube.com/embed/xwGzKRwNSA0" },
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
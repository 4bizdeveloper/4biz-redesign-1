import React, { useRef, useEffect } from 'react';

const BackgroundEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { 
      alpha: false, 
      desynchronized: true // Performance: Low-latency hints
    }); 
    
    let mouse = { x: -2000, y: -2000, targetX: -2000, targetY: -2000 };
    let animationFrameId;
    let stars = [];
    let comets = [];
    let width, height, dpr;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      
      // Scaling for high-DPI (Retina) displays without performance loss
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      
      initSpace();
    };

    const initSpace = () => {
      stars = [];
      // Dynamic density: Mobile gets more visible stars, Desktop gets depth
      const isMobile = width < 768;
      const density = isMobile ? 3500 : 2500; 
      const starCount = Math.floor((width * height) / density);
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * (isMobile ? 1.4 : 1.1), // Bigger stars on mobile for "space" feel
          opacity: Math.random() * 0.5 + 0.3,
          parallax: Math.random() * 0.2 + 0.05,
          color: Math.random() > 0.8 ? '#a855f7' : '#22d3ee',
          twinkleSpeed: Math.random() * 0.002 + 0.001,
          phase: Math.random() * Math.PI * 2
        });
      }
    };

    const drawComets = () => {
      // Logic: Only 1 comet at a time on mobile to save battery
      const maxComets = width < 768 ? 1 : 2;
      if (Math.random() > 0.993 && comets.length < maxComets) {
        comets.push({
          x: Math.random() * width,
          y: Math.random() * (height / 2),
          len: Math.random() * 100 + 60,
          speed: Math.random() * 12 + 6,
          opacity: 1
        });
      }

      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        c.x += c.speed;
        c.y += c.speed * 0.3;
        c.opacity -= 0.015;
        
        if (c.opacity <= 0 || c.x > width + 100) {
          comets.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = c.opacity;
        const grad = ctx.createLinearGradient(c.x, c.y, c.x - c.len, c.y - c.len * 0.3);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(1, 'transparent');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(c.x - c.len, c.y - c.len * 0.3);
        ctx.stroke();
        ctx.restore();
      }
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches[0]) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
      }
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    resize();

    const draw = () => {
      const now = Date.now();
      
      // Smoothing the mouse follow logic
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Reset Canvas
      ctx.fillStyle = '#020206';
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Group stars by color to minimize fillStyle switches (Batching)
      const colorGroups = { '#a855f7': [], '#22d3ee': [] };

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Parallax + Wrap
        const offsetX = (mouse.x - centerX) * s.parallax * 0.04;
        const offsetY = (mouse.y - centerY) * s.parallax * 0.04;

        let drawX = (s.x + offsetX + width) % width;
        let drawY = (s.y + offsetY + height) % height;

        // Interactive repulsion
        const dx = mouse.x - drawX;
        const dy = mouse.y - drawY;
        const distSq = dx * dx + dy * dy;
        const limit = 150 * 150;
        
        if (distSq < limit) {
          const dist = Math.sqrt(distSq);
          const force = (150 - dist) / 150;
          drawX -= dx * force * 0.3;
          drawY -= dy * force * 0.3;
        }

        s.currentAlpha = s.opacity + Math.sin(now * s.twinkleSpeed + s.phase) * 0.2;
        colorGroups[s.color].push({ x: drawX, y: drawY, size: s.size, alpha: s.currentAlpha });
      }

      // Render Batches
      Object.keys(colorGroups).forEach(color => {
        ctx.fillStyle = color;
        colorGroups[color].forEach(star => {
          ctx.globalAlpha = Math.max(0, star.alpha);
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      ctx.globalAlpha = 1;
      drawComets();
      
      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-[#020206] pointer-events-none overflow-hidden touch-none">
      
      {/* 1. Nebula - Fixed to prevent paint on scroll */}
      <div className="absolute inset-0 opacity-25 mix-blend-screen transform-gpu">
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[70%] bg-cyan-950/40 blur-[130px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-purple-950/30 blur-[130px] rounded-full" />
      </div>

      {/* 2. Optimized Star Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full" 
        style={{ imageRendering: 'auto', willChange: 'transform' }}
      />
      
      {/* 3. Optimized Scanner - Uses translate3d for GPU layer */}
      <div className="absolute inset-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent will-change-transform animate-scan-gpu" />

      {/* 4. Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
      
      <style jsx>{`
        .animate-scan-gpu {
          animation: scan-p 10s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          transform: translate3d(0, -100%, 0);
        }
        @keyframes scan-p {
          0% { transform: translate3d(0, -10vh, 0); }
          100% { transform: translate3d(0, 110vh, 0); }
        }
      `}</style>
    </div>
  );
};

export default BackgroundEffect;
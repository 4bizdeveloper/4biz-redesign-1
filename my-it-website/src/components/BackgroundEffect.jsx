import React, { useRef, useEffect } from 'react';

const UltraModernDeepData = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // alpha: false for faster blending; desynchronized for low latency
    const ctx = canvas.getContext('2d', { 
      alpha: false, 
      desynchronized: true 
    });

    let width, height, dpr;
    let binaryBubbles = [];
    let fish = [];
    let animationFrameId;
    let lastTime = performance.now();
    let mouse = { x: -2000, y: -2000, active: false };

    // --- SEO & Performance Optimization Constants ---
    const BINARY_COUNT = 60; // Slightly reduced for better content focus
    const FISH_COUNT = 20;   
    const ACCENT_CYAN = '#22d3ee';
    const ACCENT_PURPLE = '#a855f7';

    const resize = () => {
      // Performance: Cap DPR at 2. Higher values kill performance with no visual gain.
      dpr = Math.min(window.devicePixelRatio, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(dpr, dpr);
      initScene();
    };

    const initScene = () => {
      // Guaranteed 50/50 split for 0 and 1
      binaryBubbles = Array.from({ length: BINARY_COUNT }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 500,
        value: i % 2 === 0 ? "1" : "0",
        fontSize: 16, // Slightly smaller for better text hierarchy
        speed: Math.random() * 0.4 + 0.1,
        wobble: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.2 + 0.1 // Lowered opacity for readability
      }));

      fish = Array.from({ length: FISH_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.6 + 0.3,
        baseSpeed: Math.random() * 0.6 + 0.3,
        size: Math.random() * 6 + 4,
        color: Math.random() > 0.5 ? ACCENT_CYAN : ACCENT_PURPLE,
        tailRotation: 0,
        tailSpeed: Math.random() * 0.08 + 0.04
      }));
    };

    const draw = (currentTime) => {
      // Cap dt to avoid "jumping" after a tab is focused again
      const dt = Math.min(currentTime - lastTime, 32); 
      lastTime = currentTime;

      // Darker base for better SEO/Text Contrast
      ctx.fillStyle = '#010411'; 
      ctx.fillRect(0, 0, width, height);

      // 1. Static-Feeling Tech Grid (Optimized for readability)
      ctx.strokeStyle = `rgba(34, 211, 238, 0.03)`;
      ctx.lineWidth = 1;
      const gridSpacing = 120;
      const scrollOffset = Math.round((currentTime * 0.008) % gridSpacing);
      
      ctx.beginPath();
      for (let x = 0; x <= width; x += gridSpacing) {
        ctx.moveTo(x, 0); ctx.lineTo(x, height);
      }
      for (let y = scrollOffset; y <= height; y += gridSpacing) {
        ctx.moveTo(0, y); ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2. Binary Bubbles - Floating (Pixel-snapped for smoothness)
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      binaryBubbles.forEach(b => {
        b.y -= b.speed * (dt * 0.1);
        b.wobble += 0.01;
        if (b.y < -50) b.y = height + 50;

        const depth = 400 / (b.z + 400);
        ctx.font = `900 ${b.fontSize}px "Courier New", monospace`;
        ctx.fillStyle = `rgba(34, 211, 238, ${b.opacity * depth})`;
        
        // Use Math.round to prevent sub-pixel "shaking"
        const finalX = Math.round(b.x + Math.sin(b.wobble) * 20);
        const finalY = Math.round(b.y);
        ctx.fillText(b.value, finalX, finalY);
      });

      // 3. Realistic Fish (Movement optimized for eyes)
      fish.forEach(f => {
        f.x += Math.cos(f.angle) * f.speed;
        f.y += Math.sin(f.angle) * f.speed;
        f.tailRotation += f.tailSpeed * (dt * 0.1);

        const dx = mouse.x - f.x;
        const dy = mouse.y - f.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150 && mouse.active) {
          const escapeAngle = Math.atan2(dy, dx) + Math.PI;
          f.angle += (escapeAngle - f.angle) * 0.04;
          f.speed = 3.5;
        } else {
          f.speed += (f.baseSpeed - f.speed) * 0.01;
          f.angle += Math.sin(currentTime * 0.0008 + f.x) * 0.004;
        }

        if (f.x < -80) f.x = width + 80;
        else if (f.x > width + 80) f.x = -80;
        if (f.y < -80) f.y = height + 80;
        else if (f.y > height + 80) f.y = -80;

        ctx.save();
        ctx.translate(Math.round(f.x), Math.round(f.y));
        ctx.rotate(f.angle);
        
        ctx.fillStyle = f.color;
        ctx.globalAlpha = 0.4; // Subtle so it doesn't overlap content
        
        ctx.beginPath();
        ctx.moveTo(f.size * 2, 0);
        ctx.bezierCurveTo(f.size, -f.size, -f.size, -f.size, -f.size * 1.5, 0);
        ctx.bezierCurveTo(-f.size, f.size, f.size, f.size, f.size * 2, 0);
        ctx.fill();

        const tailWag = Math.sin(f.tailRotation) * 0.4;
        ctx.beginPath();
        ctx.moveTo(-f.size * 1.1, 0);
        ctx.lineTo(-f.size * 2.2, -f.size * (0.7 + tailWag));
        ctx.lineTo(-f.size * 1.8, 0);
        ctx.lineTo(-f.size * 2.2, f.size * (0.7 + tailWag));
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleInput = (e) => {
      const x = e.clientX || (e.touches && e.touches[0].clientX);
      const y = e.clientY || (e.touches && e.touches[0].clientY);
      mouse.x = x;
      mouse.y = y;
      mouse.active = true;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleInput);
    window.addEventListener('touchstart', handleInput, { passive: true });
    window.addEventListener('touchmove', handleInput, { passive: true });
    window.addEventListener('touchend', () => { mouse.active = false; });
    
    resize();
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleInput);
      window.removeEventListener('touchstart', handleInput);
      window.removeEventListener('touchmove', handleInput);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-[#010411] overflow-hidden pointer-events-none touch-none transform-gpu">
      {/* Dynamic Sea Light Overlay - Optimized Gradient */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,#22d3ee15,transparent_70%)]" />
      </div>
      
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block will-change-transform" />
      
      {/* Low-cost visual texture */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />
    </div>
  );
};

export default UltraModernDeepData;
import React, { useRef, useEffect } from 'react';

const UltraModernDeepData = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Performance: alpha false for faster blending; desynchronized for low latency
    const ctx = canvas.getContext('2d', { 
      alpha: false, 
      desynchronized: true,
      preserveDrawingBuffer: false 
    });
    
    let width, height, dpr;
    let binaryBubbles = [];
    let fish = [];
    let particles = [];
    let animationFrameId;
    let lastTime = performance.now();
    let mouse = { x: -2000, y: -2000, active: false };

    // --- Optimized Configuration ---
    const BINARY_COUNT = 70; // Increased for better distribution
    const FISH_COUNT = 30;   // Increased so no area feels empty
    const PARTICLE_COUNT = 120;
    const ACCENT_CYAN = '#22d3ee';
    const ACCENT_PURPLE = '#a855f7';

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      
      // Prevent jumping by using absolute pixel dimensions
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(dpr, dpr);
      initScene();
    };

    const initScene = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5
      }));

      // Fixed: 0 and 1 now share exact same scale and distribution logic
      binaryBubbles = Array.from({ length: BINARY_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height, // Start distributed
        z: Math.random() * 500,
        value: Math.random() > 0.5 ? "1" : "0",
        fontSize: 16, // Uniform base size
        speed: Math.random() * 0.8 + 0.3,
        wobble: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.4 + 0.1
      }));

      // Fixed: Proper IT-themed Fish Shapes
      fish = Array.from({ length: FISH_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 400,
        size: Math.random() * 6 + 4,
        speed: Math.random() * 1.2 + 0.5,
        baseSpeed: Math.random() * 1.2 + 0.5,
        angle: Math.random() * Math.PI * 2,
        color: Math.random() > 0.5 ? ACCENT_CYAN : ACCENT_PURPLE,
        isPanic: false,
        turnSpeed: Math.random() * 0.05 + 0.02
      }));
    };

    const draw = (currentTime) => {
      const dt = Math.min(currentTime - lastTime, 32); // Cap dt to prevent jumps
      lastTime = currentTime;

      // GPU Optimized Background
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);

      // Tech Grid (Reduced opacity for better readability)
      ctx.strokeStyle = `rgba(34, 211, 238, 0.03)`;
      ctx.lineWidth = 1;
      const gridSpacing = 80;
      const scrollOffset = (currentTime * 0.015) % gridSpacing;
      
      ctx.beginPath();
      for (let x = 0; x <= width; x += gridSpacing) {
        ctx.moveTo(x, 0); ctx.lineTo(x, height);
      }
      for (let y = scrollOffset; y <= height; y += gridSpacing) {
        ctx.moveTo(0, y); ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Binary Bubbles - Optimized Size Matching
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      binaryBubbles.forEach(b => {
        b.y -= b.speed * (dt * 0.1);
        b.wobble += 0.02;
        if (b.y < -50) b.y = height + 50;

        const depth = 400 / (b.z + 400);
        ctx.font = `bold ${b.fontSize * depth}px "Courier New", monospace`;
        ctx.fillStyle = `rgba(34, 211, 238, ${b.opacity * depth})`;
        // Use Math.floor to prevent sub-pixel jitter during scroll
        ctx.fillText(b.value, Math.floor(b.x + Math.sin(b.wobble) * 20), Math.floor(b.y));
      });

      // IT-Touch Fish Rendering
      fish.forEach(f => {
        f.x += Math.cos(f.angle) * f.speed;
        f.y += Math.sin(f.angle) * f.speed;

        const dx = mouse.x - f.x;
        const dy = mouse.y - f.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 180 && mouse.active) {
          f.isPanic = true;
          const escapeAngle = Math.atan2(dy, dx) + Math.PI;
          f.angle += (escapeAngle - f.angle) * 0.15;
          f.speed = 5; 
        } else {
          f.isPanic = false;
          f.speed += (f.baseSpeed - f.speed) * 0.02;
          f.angle += Math.sin(currentTime * 0.001 + f.x) * 0.01;
        }

        // Seamless Wrapping
        if (f.x < -100) f.x = width + 100;
        else if (f.x > width + 100) f.x = -100;
        if (f.y < -100) f.y = height + 100;
        else if (f.y > height + 100) f.y = -100;

        const scale = 500 / (f.z + 500);
        ctx.save();
        ctx.translate(Math.floor(f.x), Math.floor(f.y));
        ctx.rotate(f.angle);
        ctx.scale(scale, scale);
        
        ctx.fillStyle = f.color;
        ctx.globalAlpha = f.isPanic ? 0.9 : 0.5;
        
        // IT-Infused Fish Shape (Sleek aerodynamic digital fin)
        ctx.beginPath();
        ctx.moveTo(f.size * 2.5, 0); // Nose
        ctx.quadraticCurveTo(0, -f.size, -f.size * 1.5, -f.size * 0.5); // Top Body
        ctx.lineTo(-f.size * 2.5, -f.size); // Upper Tail Fin
        ctx.lineTo(-f.size * 1.8, 0); // Tail Notch
        ctx.lineTo(-f.size * 2.5, f.size); // Lower Tail Fin
        ctx.quadraticCurveTo(0, f.size, f.size * 2.5, 0); // Bottom Body
        ctx.fill();

        // High-Tech Eye (Digital node)
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(f.size * 1.2, -f.size * 0.2, 1.5, 0, Math.PI * 2);
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
    <div className="fixed inset-0 z-0 bg-[#020617] overflow-hidden pointer-events-none touch-none">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,#22d3ee15,transparent_70%)]" />
      </div>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      {/* Noise overlay for high-end cinematic feel */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />
    </div>
  );
};

export default UltraModernDeepData;
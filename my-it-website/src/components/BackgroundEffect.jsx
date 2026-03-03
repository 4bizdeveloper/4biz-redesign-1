import React, { useRef, useEffect } from 'react';

const UltraModernDeepData = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    
    let width, height, dpr;
    let binaryBubbles = [];
    let fish = [];
    let particles = [];
    let animationFrameId;
    let lastTime = performance.now();
    
    let mouse = { x: -1000, y: -1000, active: false };

    // --- Configuration ---
    const BINARY_COUNT = 50; 
    const FISH_COUNT = 15;
    const PARTICLE_COUNT = 100; // Cyber-plankton
    const ACCENT_CYAN = '#22d3ee';
    const ACCENT_PURPLE = '#a855f7';

    const resize = () => {
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
      // Cyber Plankton (Square particles for technical feel)
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 1000,
        size: Math.random() * 2
      }));

      // Binary Bubbles (0 and 1)
      binaryBubbles = Array.from({ length: BINARY_COUNT }, () => ({
        x: Math.random() * width,
        y: height + Math.random() * 200,
        z: Math.random() * 600,
        value: Math.random() > 0.5 ? "1" : "0",
        fontSize: Math.random() * 12 + 8,
        speed: Math.random() * 1.5 + 0.5,
        wobble: Math.random() * 10,
        opacity: Math.random() * 0.5 + 0.2
      }));

      // Interactive Tech-Fish
      fish = Array.from({ length: FISH_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 500,
        size: Math.random() * 5 + 3,
        speed: Math.random() * 1 + 0.5,
        baseSpeed: Math.random() * 1 + 0.5,
        angle: Math.random() * Math.PI * 2,
        color: Math.random() > 0.5 ? ACCENT_CYAN : ACCENT_PURPLE,
        isPanic: false
      }));
    };

    const draw = (currentTime) => {
      const dt = currentTime - lastTime;
      lastTime = currentTime;

      // 1. Tech-Ocean Gradient
      const bg = ctx.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0, '#020617'); // Dark Space Blue
      bg.addColorStop(1, '#000000'); // True Black
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // 2. Animated Grid Floor (Modern Corporate Touch)
      ctx.strokeStyle = `rgba(34, 211, 238, 0.05)`;
      ctx.lineWidth = 1;
      const gridSpacing = 60;
      const scrollOffset = (currentTime * 0.02) % gridSpacing;
      for (let x = 0; x <= width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = scrollOffset; y <= height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 3. Binary Bubbles
      ctx.textAlign = "center";
      binaryBubbles.forEach(b => {
        b.y -= b.speed * (dt * 0.08);
        b.wobble += 0.05;
        if (b.y < -50) b.y = height + 100;

        const scale = 400 / (b.z + 400);
        ctx.font = `${b.fontSize * scale}px "Courier New", monospace`;
        ctx.fillStyle = `rgba(34, 211, 238, ${b.opacity * scale})`;
        ctx.fillText(b.value, b.x + Math.sin(b.wobble) * 15, b.y);
      });

      // 4. Tech Fish AI (Fear & Interaction)
      fish.forEach(f => {
        // Movement
        f.x += Math.cos(f.angle) * f.speed;
        f.y += Math.sin(f.angle) * f.speed;

        // Fear Logic (Mouse Avoidance)
        const dx = mouse.x - f.x;
        const dy = mouse.y - f.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150 && mouse.active) {
          f.isPanic = true;
          // Calculate angle away from mouse
          const escapeAngle = Math.atan2(dy, dx) + Math.PI;
          // Smoothly rotate toward escape angle
          f.angle += (escapeAngle - f.angle) * 0.1;
          f.speed = 6; // Fear-induced darting
        } else {
          f.isPanic = false;
          f.speed += (f.baseSpeed - f.speed) * 0.05; // Calm down
          f.angle += Math.sin(currentTime * 0.001) * 0.01; // Natural wander
        }

        // Screen Wrap
        if (f.x < -100) f.x = width + 100;
        if (f.x > width + 100) f.x = -100;
        if (f.y < -100) f.y = height + 100;
        if (f.y > height + 100) f.y = -100;

        // Render Fish (Geometric sleek style)
        const scale = 500 / (f.z + 500);
        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.rotate(f.angle);
        ctx.scale(scale, scale);
        
        // Glow effect if panicking
        if (f.isPanic) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = f.color;
        }

        ctx.fillStyle = f.color;
        ctx.globalAlpha = f.isPanic ? 1 : 0.6;
        
        // Body (Triangle/Diamond)
        ctx.beginPath();
        ctx.moveTo(f.size * 3, 0);
        ctx.lineTo(-f.size, -f.size);
        ctx.lineTo(-f.size, f.size);
        ctx.closePath();
        ctx.fill();
        
        // Cyber-trail (if fast)
        if (f.speed > 2) {
          ctx.strokeStyle = f.color;
          ctx.globalAlpha = 0.2;
          ctx.beginPath();
          ctx.moveTo(-f.size, 0);
          ctx.lineTo(-f.size * 6, 0);
          ctx.stroke();
        }
        
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
    window.addEventListener('touchend', () => mouse.active = false);
    
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
    <div className="fixed inset-0 z-0 bg-black overflow-hidden pointer-events-none touch-none">
      {/* Background Lighting Caustics */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,#22d3ee22,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,#a855f711,transparent_50%)]" />
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Cyber Fog Overlay */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,1)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
    </div>
  );
};

export default UltraModernDeepData;
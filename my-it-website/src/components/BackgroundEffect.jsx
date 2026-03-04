import React, { useRef, useEffect } from 'react';

const UltraModernDeepData = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // alpha: false and desynchronized: true for extreme performance
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

    const BINARY_COUNT = 80; // 40 zeros and 40 ones for exact parity
    const FISH_COUNT = 25;
    const ACCENT_CYAN = '#22d3ee';
    const ACCENT_PURPLE = '#a855f7';

    const resize = () => {
      // Limit DPR to 2 for performance on ultra-high-res mobile screens
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
      // Exact parity for 0 and 1
      binaryBubbles = Array.from({ length: BINARY_COUNT }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 500,
        value: i % 2 === 0 ? "1" : "0", // Guaranteed 50/50 split
        fontSize: 18,
        speed: Math.random() * 0.5 + 0.2,
        wobble: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.3 + 0.2
      }));

      fish = Array.from({ length: FISH_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.8 + 0.4,
        baseSpeed: Math.random() * 0.8 + 0.4,
        size: Math.random() * 7 + 5,
        color: Math.random() > 0.5 ? ACCENT_CYAN : ACCENT_PURPLE,
        tailRotation: 0,
        tailSpeed: Math.random() * 0.1 + 0.05
      }));
    };

    const draw = (currentTime) => {
      const dt = Math.min(currentTime - lastTime, 32); 
      lastTime = currentTime;

      // Deep Sea Background
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);

      // 1. Optimized Tech Grid
      ctx.strokeStyle = `rgba(34, 211, 238, 0.04)`;
      ctx.lineWidth = 1;
      const gridSpacing = 100;
      const scrollOffset = (currentTime * 0.01) % gridSpacing;
      
      ctx.beginPath();
      for (let x = 0; x <= width; x += gridSpacing) {
        ctx.moveTo(x, 0); ctx.lineTo(x, height);
      }
      for (let y = scrollOffset; y <= height; y += gridSpacing) {
        ctx.moveTo(0, y); ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2. Binary Bubbles - Floating upwards
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      binaryBubbles.forEach(b => {
        b.y -= b.speed * (dt * 0.1);
        b.wobble += 0.015;
        if (b.y < -50) b.y = height + 50;

        const depth = 400 / (b.z + 400);
        ctx.font = `900 ${b.fontSize}px "Courier New", monospace`;
        ctx.fillStyle = `rgba(34, 211, 238, ${b.opacity * depth})`;
        
        // Math.round prevents the "shaking" effect caused by sub-pixel rendering
        const finalX = Math.round(b.x + Math.sin(b.wobble) * 25);
        const finalY = Math.round(b.y);
        ctx.fillText(b.value, finalX, finalY);
      });

      // 3. Realistic Realistic IT-Fish Movement
      fish.forEach(f => {
        // Natural swimming physics
        f.x += Math.cos(f.angle) * f.speed;
        f.y += Math.sin(f.angle) * f.speed;
        f.tailRotation += f.tailSpeed * (dt * 0.1);

        // Interaction
        const dx = mouse.x - f.x;
        const dy = mouse.y - f.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200 && mouse.active) {
          const escapeAngle = Math.atan2(dy, dx) + Math.PI;
          f.angle += (escapeAngle - f.angle) * 0.05; // Smooth turn
          f.speed = 4; // Panic speed
        } else {
          f.speed += (f.baseSpeed - f.speed) * 0.01;
          f.angle += Math.sin(currentTime * 0.001 + f.x) * 0.005;
        }

        // Wrapping
        if (f.x < -100) f.x = width + 100;
        else if (f.x > width + 100) f.x = -100;
        if (f.y < -100) f.y = height + 100;
        else if (f.y > height + 100) f.y = -100;

        ctx.save();
        ctx.translate(Math.round(f.x), Math.round(f.y));
        ctx.rotate(f.angle);
        
        // Realistic Fish Shape (IT stylized)
        ctx.fillStyle = f.color;
        ctx.globalAlpha = 0.6;
        
        ctx.beginPath();
        // Body (Aerodynamic teardrop)
        ctx.moveTo(f.size * 2, 0);
        ctx.bezierCurveTo(f.size, -f.size, -f.size, -f.size, -f.size * 1.5, 0);
        ctx.bezierCurveTo(-f.size, f.size, f.size, f.size, f.size * 2, 0);
        ctx.fill();

        // Tail Fin (Moves with swimming)
        const tailWag = Math.sin(f.tailRotation) * 0.5;
        ctx.beginPath();
        ctx.moveTo(-f.size * 1.2, 0);
        ctx.lineTo(-f.size * 2.5, -f.size * (0.8 + tailWag));
        ctx.lineTo(-f.size * 2, 0);
        ctx.lineTo(-f.size * 2.5, f.size * (0.8 + tailWag));
        ctx.fill();

        // Eye (IT Node)
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(f.size * 1.2, -f.size * 0.2, 1.8, 0, Math.PI * 2);
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
    <div className="fixed inset-0 z-0 bg-[#020617] overflow-hidden pointer-events-none touch-none transform-gpu">
      {/* Dynamic Sea Light Overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#22d3ee20,transparent_70%)]" />
      </div>
      
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block will-change-transform" />
      
      {/* Cinematic Grain - No blur, strictly visual texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />
    </div>
  );
};

export default UltraModernDeepData;
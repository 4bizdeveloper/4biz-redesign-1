import React, { useRef, useEffect } from 'react';

const BackgroundEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
    let animationFrameId;
    let stars = [];
    let comets = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initSpace();
    };

    const initSpace = () => {
      stars = [];
      // Initialize a dense, layered star field
      const starCount = Math.floor((canvas.width * canvas.height) / 3000);
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.3,
          opacity: Math.random() * 0.6 + 0.2,
          parallax: Math.random() * 0.5 + 0.1,
          color: Math.random() > 0.8 ? '#a855f7' : '#22d3ee', // Purple or Cyan
          twinkleSpeed: Math.random() * 0.005 + 0.001
        });
      }
    };

    const drawComets = () => {
      // Occasional shooting star
      if (Math.random() > 0.992 && comets.length < 3) {
        comets.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height / 2),
          len: Math.random() * 100 + 50,
          speed: Math.random() * 12 + 6,
          opacity: 1
        });
      }

      comets.forEach((c, i) => {
        c.x += c.speed;
        c.y += c.speed * 0.4;
        c.opacity -= 0.015;
        
        ctx.beginPath();
        const grad = ctx.createLinearGradient(c.x, c.y, c.x - c.len, c.y - c.len * 0.4);
        grad.addColorStop(0, `rgba(255, 255, 255, ${c.opacity})`);
        grad.addColorStop(1, 'rgba(34, 211, 238, 0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(c.x - c.len, c.y - c.len * 0.4);
        ctx.stroke();

        if (c.opacity <= 0) comets.splice(i, 1);
      });
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();

    const draw = () => {
      // Ultra-smooth mouse easing
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render Stars with Depth Parallax and Repel
      stars.forEach((s) => {
        // Parallax shift based on mouse position
        const offsetX = (mouse.x - canvas.width / 2) * s.parallax * 0.05;
        const offsetY = (mouse.y - canvas.height / 2) * s.parallax * 0.05;

        let drawX = s.x + offsetX;
        let drawY = s.y + offsetY;

        // Mouse Repel Logic
        const dx = mouse.x - drawX;
        const dy = mouse.y - drawY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const force = (130 - dist) / 130;
          drawX -= dx * force * 0.25;
          drawY -= dy * force * 0.25;
        }

        ctx.beginPath();
        ctx.arc(drawX, drawY, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        // Twinkle effect
        ctx.globalAlpha = s.opacity + Math.sin(Date.now() * s.twinkleSpeed) * 0.3;
        ctx.fill();
      });

      drawComets();
      
      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-[#020206] pointer-events-none overflow-hidden">
      
      {/* 1. Volumetric Nebula (CSS Hardware Accelerated) */}
      <div className="absolute inset-0 opacity-20 mix-blend-screen">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-cyan-900/30 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-purple-900/20 blur-[150px] rounded-full" />
      </div>

      {/* 2. Main Star Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* 3. High-Tech Scanner Line */}
      <div className="absolute inset-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent top-[-10%] animate-[scan_10s_linear_infinite]" />

      {/* 4. Film Grain Texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] contrast-150 brightness-150" />
      
      <style jsx>{`
        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
      `}</style>
    </div>
  );
};

export default BackgroundEffect;
import React, { useRef, useEffect } from 'react';

const UltraModernSpace = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    
    let stars = [];
    let animationFrameId;
    let width, height;
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };
    
    // Configuration
    const STAR_COUNT = 800;
    const SPEED = 2.5; 
    const FOV = 300; // Field of view (depth perception)

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initStars();
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: (Math.random() - 0.5) * 2000,
          y: (Math.random() - 0.5) * 2000,
          z: Math.random() * 2000,
          px: 0, py: 0, // Previous positions for motion blur
          size: Math.random() * 1.5 + 0.5,
          color: Math.random() > 0.8 ? '#a855f7' : '#22d3ee'
        });
      }
    };

    const draw = () => {
      // Create a trail effect by not fully clearing the frame
      ctx.fillStyle = 'rgba(2, 2, 6, 0.2)'; 
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse steering
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const centerX = width / 2;
      const centerY = height / 2;

      stars.forEach(s => {
        // Move towards user
        s.z -= SPEED;

        // Reset star if it passes the user
        if (s.z <= 1) {
          s.z = 2000;
          s.x = (Math.random() - 0.5) * 2000;
          s.y = (Math.random() - 0.5) * 2000;
        }

        // 3D to 2D Projection
        // Formula: screenX = (3D_x * FOV) / 3D_z + Center
        const scale = FOV / s.z;
        const x2d = (s.x + (mouse.x * 0.2)) * scale + centerX;
        const y2d = (s.y + (mouse.y * 0.2)) * scale + centerY;

        // Draw Star
        if (s.px !== 0) {
          const alpha = Math.min(1, (2000 - s.z) / 1000);
          ctx.strokeStyle = s.color;
          ctx.lineWidth = s.size * scale;
          ctx.lineCap = 'round';
          ctx.globalAlpha = alpha;
          
          ctx.beginPath();
          ctx.moveTo(x2d, y2d);
          ctx.lineTo(s.px, s.py); // Link to previous pos for "warp" streak
          ctx.stroke();
        }

        s.px = x2d;
        s.py = y2d;
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => {
      // Offset from center for steering
      mouse.targetX = (width / 2 - e.clientX) * 2;
      mouse.targetY = (height / 2 - e.clientY) * 2;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-[#020206] overflow-hidden pointer-events-none">
      {/* Deep Space Gradients */}
      <div className="absolute inset-0 transform-gpu">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-blue-900/10 via-transparent to-transparent opacity-50" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Modern Overlay Elements */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      
      {/* Vignette for depth */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
    </div>
  );
};

export default UltraModernSpace;
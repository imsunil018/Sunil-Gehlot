import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf;
    const particles = [];
    const trailParticles = [];
    const CONNECTION_DIST = 130;
    const COUNT = 55;

    const mouse = {
      x: null,
      y: null,
      targetX: null,
      targetY: null,
      radius: 170,
      active: false,
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    // Initialize background particles
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * W(),
        y: Math.random() * H(),
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        size: Math.random() * 1.2 + 0.4,
        opacity: Math.random() * 0.45 + 0.1,
        opacitySpeed: (Math.random() - 0.5) * 0.004,
      });
    }

    const draw = () => {
      // Performance optimization: skip canvas updates if scrolled out of view
      const rect = canvas.getBoundingClientRect();
      if (rect.bottom < 0) {
        raf = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, W(), H());

      // 1. Smooth mouse coordinate interpolation (LERP)
      if (mouse.active && mouse.targetX !== null) {
        if (mouse.x === null) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.08;
          mouse.y += (mouse.targetY - mouse.y) * 0.08;
        }
      } else {
        mouse.x = null;
        mouse.y = null;
      }

      // 2. Draw soft trailing glow under the cursor
      if (mouse.x !== null && mouse.y !== null) {
        const glowRad = 130;
        const grad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          glowRad
        );
        grad.addColorStop(0, "rgba(139,92,246,0.11)");
        grad.addColorStop(0.5, "rgba(99,102,241,0.03)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
        
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, glowRad, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // 3. Update & draw base particles
      for (const p of particles) {
        // Apply velocity
        p.x += p.vx;
        p.y += p.vy;

        // Anti-gravity (repulsion) effect
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            // Stronger force the closer the cursor is
            const force = (mouse.radius - dist) / mouse.radius;
            // Push particle outwards
            p.x += Math.cos(angle) * force * 1.6;
            p.y += Math.sin(angle) * force * 1.6;
          }
        }

        // Opacity cycling
        p.opacity += p.opacitySpeed;
        if (p.opacity < 0.06 || p.opacity > 0.5) p.opacitySpeed *= -1;

        // Screen boundary wrapping
        if (p.x < 0) p.x = W();
        if (p.x > W()) p.x = 0;
        if (p.y < 0) p.y = H();
        if (p.y > H()) p.y = 0;

        // Render particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${p.opacity})`;
        ctx.fill();
      }

      // 4. Draw connection lines between base particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // 5. Draw connection lines from mouse cursor to nearby particles
      if (mouse.x !== null && mouse.y !== null) {
        for (const p of particles) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.22;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            // Use lighter indigo for cursor links
            ctx.strokeStyle = `rgba(167,139,250,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // 6. Spawn and animate mouse trailing stardust
      if (mouse.x !== null && mouse.y !== null && Math.random() < 0.4) {
        trailParticles.push({
          x: mouse.x + (Math.random() - 0.5) * 8,
          y: mouse.y + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 0.38,
          vy: (Math.random() - 0.5) * 0.38 - 0.18, // float upwards slightly
          size: Math.random() * 1.3 + 0.4,
          life: 1.0,
          decay: Math.random() * 0.02 + 0.012,
          color: Math.random() > 0.4 ? "139,92,246" : "6,182,212", // Purple or Cyan
        });
      }

      for (let i = trailParticles.length - 1; i >= 0; i--) {
        const tp = trailParticles[i];
        tp.x += tp.vx;
        tp.y += tp.vy;
        tp.life -= tp.decay;

        if (tp.life <= 0) {
          trailParticles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(tp.x, tp.y, tp.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${tp.color},${tp.life * 0.55})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      // Performance guard: only track if the Hero section is visible
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        mouse.active = false;
        return;
      }
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const onResize = () => {
      resize();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

// Decorative floating diamond ornament
function Diamond({ size = 6, style, delay = 0, duration = 6 }) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute"
      style={style}
      animate={{ y: [0, -14, 0], opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div
        style={{
          width: size,
          height: size,
          transform: "rotate(45deg)",
          border: "1px solid rgba(139,92,246,0.55)",
          boxShadow: "0 0 6px rgba(139,92,246,0.25)",
        }}
      />
    </motion.div>
  );
}

// A small "+" cross ornament
function Cross({ size = 10, style, delay = 0, duration = 8 }) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute"
      style={style}
      animate={{ y: [0, 10, 0], opacity: [0.2, 0.5, 0.2] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <svg width={size} height={size} viewBox="0 0 10 10" fill="none">
        <line
          x1="5"
          y1="0"
          x2="5"
          y2="10"
          stroke="rgba(99,179,237,0.5)"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="5"
          x2="10"
          y2="5"
          stroke="rgba(99,179,237,0.5)"
          strokeWidth="1"
        />
      </svg>
    </motion.div>
  );
}

export function HeroBackground() {
  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Layer 1 — particle network canvas */}
      <ParticleCanvas />

      {/* Layer 2 — subtle dot grid, masked radially */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(139,92,246,0.18) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 75% 75% at 50% 45%, black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 75% at 50% 45%, black 0%, transparent 100%)",
        }}
      />

      {/* Layer 3 — primary large violet orb */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], x: [0, 24, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute animate-gpu-layer"
        style={{
          top: "10%",
          left: "10%",
          width: 680,
          height: 680,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 40% 40%, hsl(258 86% 68% / 0.28) 0%, hsl(258 86% 68% / 0.08) 50%, transparent 70%)",
          filter: "blur(48px)",
          willChange: "transform, filter",
          transform: "translate3d(0,0,0)",
        }}
      />

      {/* Layer 4 — secondary cyan orb */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], x: [0, -28, 0], y: [0, 32, 0] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute animate-gpu-layer"
        style={{
          bottom: "5%",
          right: "8%",
          width: 560,
          height: 460,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 60% 60%, hsl(197 68% 58% / 0.2) 0%, hsl(197 68% 58% / 0.06) 55%, transparent 70%)",
          filter: "blur(56px)",
          willChange: "transform, filter",
          transform: "translate3d(0,0,0)",
        }}
      />

      {/* Layer 5 — smaller warm violet orb, top-right */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], y: [0, -18, 0] }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 7,
        }}
        className="absolute animate-gpu-layer"
        style={{
          top: "20%",
          right: "15%",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, hsl(270 80% 70% / 0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
          willChange: "transform, filter",
          transform: "translate3d(0,0,0)",
        }}
      />

      {/* Layer 6 — decorative concentric rings, anchored right */}
      {[520, 380, 250].map((size, i) => (
        <motion.div
          key={size}
          animate={{
            rotate: [0, i % 2 === 0 ? 3 : -3, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
          className="absolute"
          style={{
            right: -size * 0.38,
            top: "50%",
            translateY: "-50%",
            width: size,
            height: size,
            borderRadius: "50%",
            border: `1px solid rgba(139,92,246,${0.1 - i * 0.02})`,
            boxShadow: `inset 0 0 40px rgba(139,92,246,${0.04 - i * 0.01})`,
          }}
        />
      ))}

      {/* Layer 7 — floating ornaments */}
      <Diamond
        size={7}
        style={{ top: "22%", left: "18%" }}
        delay={0}
        duration={7}
      />
      <Diamond
        size={5}
        style={{ top: "65%", left: "12%" }}
        delay={1.5}
        duration={9}
      />
      <Diamond
        size={9}
        style={{ top: "38%", right: "22%" }}
        delay={0.8}
        duration={8}
      />
      <Diamond
        size={5}
        style={{ top: "78%", right: "30%" }}
        delay={2.2}
        duration={6}
      />
      <Cross
        size={10}
        style={{ top: "30%", left: "30%" }}
        delay={1}
        duration={10}
      />
      <Cross
        size={8}
        style={{ top: "58%", right: "18%" }}
        delay={3}
        duration={8}
      />
      <Cross
        size={11}
        style={{ top: "72%", left: "42%" }}
        delay={0.5}
        duration={12}
      />

      {/* Layer 8 — subtle horizontal scan-line gradient (Vercel-style) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.012) 3px, rgba(255,255,255,0.012) 4px)",
        }}
      />

      {/* Layer 9 — radial vignette to keep edges dark and centre bright */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 65% at 50% 42%, transparent 0%, hsl(226 42% 3% / 0.55) 100%)",
        }}
      />
    </div>
  );
}

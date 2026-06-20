import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

export function BackgroundEffects() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isHovered) setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isHovered]);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.6 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  const gridMask = useMotionTemplate`radial-gradient(400px circle at ${glowX}px ${glowY}px, black 25%, transparent 100%)`;

  // Generate particle config once using static seed
  const particles = [
    { left: "8%", top: "12%", size: 6, delay: 0, xMove: 40, yMove: -70, xMove2: -25, yMove2: 35, color: "rgba(139, 92, 246, 0.4)" },
    { left: "88%", top: "8%", size: 4, delay: 1.5, xMove: -50, yMove: 60, xMove2: 25, yMove2: -35, color: "rgba(6, 182, 212, 0.4)" },
    { left: "75%", top: "60%", size: 8, delay: 3, xMove: -35, yMove: -80, xMove2: -15, yMove2: 45, color: "rgba(236, 72, 153, 0.3)" },
    { left: "15%", top: "70%", size: 5, delay: 0.8, xMove: 60, yMove: -45, xMove2: -35, yMove2: 25, color: "rgba(139, 92, 246, 0.4)" },
    { left: "92%", top: "40%", size: 6, delay: 2.2, xMove: -70, yMove: -50, xMove2: 35, yMove2: 70, color: "rgba(6, 182, 212, 0.4)" },
    { left: "6%", top: "45%", size: 4, delay: 1.2, xMove: 45, yMove: 70, xMove2: -25, yMove2: -45, color: "rgba(236, 72, 153, 0.3)" },
    { left: "35%", top: "80%", size: 7, delay: 4.1, xMove: -25, yMove: -70, xMove2: 45, yMove2: -15, color: "rgba(139, 92, 246, 0.3)" },
    { left: "45%", top: "15%", size: 5, delay: 2.7, xMove: 50, yMove: 50, xMove2: -45, yMove2: -35, color: "rgba(6, 182, 212, 0.4)" },
    { left: "25%", top: "35%", size: 4, delay: 3.5, xMove: -35, yMove: 45, xMove2: 25, yMove2: -50, color: "rgba(236, 72, 153, 0.3)" },
    { left: "70%", top: "30%", size: 6, delay: 1.9, xMove: 45, yMove: -60, xMove2: -50, yMove2: 35, color: "rgba(139, 92, 246, 0.4)" }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#06060e]">
      {/* Base radial dark vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,6,14,0.85)_85%)]" />

      {/* Interactive mouse follow glow */}
      {isHovered && (
        <motion.div
          style={{
            x: glowX,
            y: glowY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className="fixed top-0 left-0 w-[550px] h-[550px] rounded-full bg-gradient-to-r from-primary/15 to-accent/10 blur-[130px] pointer-events-none z-10"
        />
      )}

      {/* Dynamic Grid with Interactive Mouse-Mask */}
      <motion.div
        style={{
          maskImage: isHovered ? gridMask : "radial-gradient(400px circle at 50% 50%, black 25%, transparent 100%)",
          WebkitMaskImage: isHovered ? gridMask : "radial-gradient(400px circle at 50% 50%, black 25%, transparent 100%)",
        }}
        className="absolute inset-0 opacity-[0.08] transition-opacity duration-500 z-0"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </motion.div>

      {/* Static Subtle Grid */}
      <div
        className="absolute inset-0 opacity-[0.02] z-0"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Animated Flowing Energy Wave (Primary Color) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none z-0">
        <motion.path
          d="M -100 300 C 300 100, 600 500, 1200 200 C 1500 50, 1800 400, 2100 300"
          fill="none"
          stroke="url(#wave-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{
            d: [
              "M -100 300 C 300 100, 600 500, 1200 200 C 1500 50, 1800 400, 2100 300",
              "M -100 220 C 400 420, 700 80, 1100 380 C 1450 580, 1750 180, 2100 220",
              "M -100 300 C 300 100, 600 500, 1200 200 C 1500 50, 1800 400, 2100 300",
            ],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Secondary wave for complexity */}
        <motion.path
          d="M -100 400 C 200 600, 500 200, 1000 500 C 1400 700, 1600 300, 2100 400"
          fill="none"
          stroke="url(#wave-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={{
            d: [
              "M -100 400 C 200 600, 500 200, 1000 500 C 1400 700, 1600 300, 2100 400",
              "M -100 450 C 300 300, 600 600, 1100 300 C 1300 100, 1700 500, 2100 450",
              "M -100 400 C 200 600, 500 200, 1000 500 C 1400 700, 1600 300, 2100 400",
            ],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="50%" stopColor="hsl(var(--accent))" />
            <stop offset="100%" stopColor="hsl(var(--primary))" />
          </linearGradient>
        </defs>
      </svg>

      {/* Primary aurora blob (Top Center) with morphing border radius */}
      <motion.div
        animate={{
          borderRadius: [
            "30% 70% 70% 30% / 30% 30% 70% 70%",
            "50% 50% 30% 70% / 50% 60% 40% 50%",
            "70% 30% 52% 48% / 60% 40% 60% 40%",
            "30% 70% 70% 30% / 30% 30% 70% 70%"
          ],
          scale: [1, 1.25, 0.95, 1],
          opacity: [0.28, 0.4, 0.22, 0.28],
          x: [0, 50, -40, 0],
          y: [0, -40, 30, 0],
          rotate: [0, 120, 240, 360]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-15%] left-[15%] w-[700px] h-[550px] bg-gradient-to-br from-primary/30 to-violet-600/10 blur-[130px]"
      />

      {/* Secondary accent blob (Middle Right) with morphing border radius */}
      <motion.div
        animate={{
          borderRadius: [
            "40% 60% 50% 50% / 40% 40% 60% 60%",
            "60% 40% 60% 40% / 50% 50% 50% 50%",
            "30% 70% 40% 60% / 60% 30% 70% 40%",
            "40% 60% 50% 50% / 40% 40% 60% 60%"
          ],
          scale: [1, 1.15, 1.3, 1],
          opacity: [0.18, 0.28, 0.15, 0.18],
          x: [0, -60, 50, 0],
          y: [0, 50, -45, 0],
          rotate: [360, 240, 120, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        className="absolute top-[25%] right-[-12%] w-[600px] h-[500px] bg-gradient-to-tr from-accent/25 to-emerald-500/5 blur-[115px]"
      />

      {/* Tertiary warm accent blob (Bottom Left) with morphing */}
      <motion.div
        animate={{
          borderRadius: [
            "50% 50% 30% 70% / 50% 60% 40% 50%",
            "70% 30% 52% 48% / 60% 40% 60% 40%",
            "30% 70% 70% 30% / 30% 30% 70% 70%",
            "50% 50% 30% 70% / 50% 60% 40% 50%"
          ],
          scale: [1, 1.2, 0.9, 1],
          opacity: [0.15, 0.25, 0.18, 0.15],
          x: [0, 40, -50, 0],
          y: [0, -30, 50, 0],
          rotate: [180, 360, 0, 180]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute bottom-[-20%] left-[-8%] w-[650px] h-[550px] bg-gradient-to-tr from-pink-500/22 via-violet-500/5 to-transparent blur-[125px]"
      />

      {/* Floating particles */}
      {particles.map((orb, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, orb.xMove, orb.xMove2, 0],
            y: [0, orb.yMove, orb.yMove2, 0],
            opacity: [0.2, 0.8, 0.4, 0.2],
            scale: [1, 1.4, 0.8, 1]
          }}
          transition={{
            duration: 12 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
          style={{
            left: orb.left,
            top: orb.top,
            width: orb.size,
            height: orb.size,
            backgroundColor: orb.color,
            boxShadow: `0 0 12px ${orb.color}`
          }}
          className="absolute rounded-full"
        />
      ))}

      {/* Shooting stars animation */}
      {[
        { top: "8%", left: "-10%", duration: 5.5, delay: 2 },
        { top: "30%", left: "-10%", duration: 6.5, delay: 8.5 },
        { top: "55%", left: "-10%", duration: 7.5, delay: 14 }
      ].map((star, idx) => (
        <motion.div
          key={`star-${idx}`}
          animate={{
            x: ["0vw", "120vw"],
            y: ["0vh", "60vh"],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            repeatDelay: 12 + Math.random() * 12,
            ease: "linear",
            delay: star.delay
          }}
          style={{
            top: star.top,
            left: star.left,
          }}
          className="absolute w-[180px] h-[1.8px] bg-gradient-to-r from-transparent via-white/50 to-transparent rotate-[25deg] origin-left"
        />
      ))}

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

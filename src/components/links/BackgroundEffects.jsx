import { motion } from "framer-motion";

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Primary aurora blob */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.18, 0.28, 0.18],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-primary/25 blur-[120px]"
      />

      {/* Secondary accent blob */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute bottom-[-10%] right-[10%] w-[500px] h-[400px] rounded-full bg-accent/20 blur-[100px]"
      />

      {/* Small floating orbs */}
      {[
        { x: "15%", y: "25%", size: 4, delay: 0 },
        { x: "80%", y: "15%", size: 3, delay: 1.5 },
        { x: "65%", y: "70%", size: 5, delay: 2.5 },
        { x: "25%", y: "75%", size: 3, delay: 0.8 },
        { x: "90%", y: "50%", size: 4, delay: 3.2 },
        { x: "5%", y: "55%", size: 2, delay: 1.2 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -12, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size * 2,
            height: orb.size * 2,
          }}
          className="absolute rounded-full bg-primary/60"
        />
      ))}

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

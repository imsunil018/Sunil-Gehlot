import { useState } from "react";
import { motion } from "framer-motion";
import { Layers, Zap, MessageSquare, Globe, Clock, Code2 } from "lucide-react";

const reasons = [
  {
    icon: Layers,
    title: "Full Ownership",
    description:
      "Front to back. I don't hand off the API to someone and build the UI separately. One person handles everything — fewer gaps, faster fixes when something breaks.",
    accent: "#8b5cf6", // Violet
    glow: "rgba(139, 92, 246, 0.1)"
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description:
      "I cut scope hard at the start and ship something real fast. A week of actual feedback beats a month of planning every time.",
    accent: "#22d3ee", // Cyan
    glow: "rgba(34, 211, 238, 0.1)"
  },
  {
    icon: MessageSquare,
    title: "Clear Communication",
    description:
      "I update you before you have to ask. Blockers, decisions, timeline changes — you hear about them when I do, not after.",
    accent: "#ec4899", // Pink
    glow: "rgba(236, 72, 153, 0.1)"
  },
  {
    icon: Globe,
    title: "Remote-First",
    description:
      "I've worked async since before it was a thing. Clear docs, regular updates, predictable output. No chasing, no micromanaging needed.",
    accent: "#10b981", // Emerald
    glow: "rgba(16, 185, 129, 0.1)"
  },
  {
    icon: Clock,
    title: "Honest Estimates",
    description:
      "If it takes two weeks, I'll say two weeks. Promising one and scrambling is worse for both of us and I won't do it.",
    accent: "#f59e0b", // Amber
    glow: "rgba(245, 158, 11, 0.1)"
  },
  {
    icon: Code2,
    title: "Code You Can Maintain",
    description:
      "I write code like someone else will read it tomorrow. Clean, documented, and structured so your next hire doesn't need me on speed dial.",
    accent: "#3b82f6", // Blue
    glow: "rgba(59, 130, 246, 0.1)"
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export function WhyChooseMe() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      className="py-16 md:py-28 relative z-10 bg-background"
      id="why-choose-me"
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-3">
            Why choose me
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
            Why founders hire me again
          </h2>
          <p className="text-neutral-500 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Six things I take seriously on every project — not just the first
            one.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto"
        >
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              variants={card}
              whileHover={{ y: -4 }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6 overflow-hidden transition-all duration-300 cursor-default"
              style={{
                borderColor: hoveredIndex === i ? `${reason.accent}30` : "",
                boxShadow: hoveredIndex === i ? `0 12px 30px -10px ${reason.accent}15` : ""
              }}
            >
              {/* Spotlight Dynamic Glow */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                style={{
                  opacity: hoveredIndex === i ? 1 : 0,
                  background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, ${reason.glow}, transparent 70%)`,
                }}
              />

              {/* Shining Sweep Effect */}
              <div className="absolute inset-y-0 left-0 w-[200%] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

              {/* Glowing active line highlight */}
              <div 
                className="absolute top-0 left-0 right-0 h-px transition-all duration-300 opacity-0 group-hover:opacity-100" 
                style={{
                  background: `linear-gradient(90deg, transparent, ${reason.accent}, transparent)`
                }}
              />

              <span 
                className="absolute top-5 right-5 text-xs font-mono transition-colors duration-300"
                style={{ 
                  color: hoveredIndex === i ? reason.accent : "#404040",
                  textShadow: hoveredIndex === i ? `0 0 10px ${reason.accent}55` : ""
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div 
                className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center mb-4 sm:mb-5 transition-all duration-300 group-hover:scale-105"
                style={{ 
                  borderColor: hoveredIndex === i ? `${reason.accent}30` : "",
                  boxShadow: hoveredIndex === i ? `0 0 16px ${reason.accent}18` : ""
                }}
              >
                <reason.icon 
                  className="w-5 h-5 transition-all duration-300" 
                  style={{ color: hoveredIndex === i ? reason.accent : "#d4d4d4" }}
                />
              </div>

              <h3 
                className="text-sm font-bold tracking-tight mb-2 text-white transition-colors duration-300"
                style={{ color: hoveredIndex === i ? reason.accent : "" }}
              >
                {reason.title}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed group-hover:text-neutral-450 transition-colors duration-300">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

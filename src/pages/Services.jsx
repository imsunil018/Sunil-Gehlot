import { useState } from "react";
import { motion } from "framer-motion";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Code2, Smartphone, Palette, Briefcase, Check } from "lucide-react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/use-seo";

const services = [
  {
    title: "Web Apps & Dashboards",
    description:
      "I build full-stack applications with React and Node.js — mainly dashboards, admin panels, and internal tools that need to handle real data and real users. I care about performance and maintainability, not just getting something on screen.",
    icon: Code2,
    features: [
      "React & Next.js front-ends",
      "REST and GraphQL APIs",
      "SQL and NoSQL databases",
      "Performance and accessibility",
    ],
  },

  {
    title: "UI Design & Prototyping",
    description:
      "Interfaces that make sense before they look good. I design with clarity first — starting from user flows and wireframes, then refining to high-fidelity prototypes and production-ready design systems.",
    icon: Palette,
    features: [
      "User flow mapping",
      "Wireframing & prototyping",
      "High-fidelity UI design",
      "Component & design systems",
    ],
  },
  {
    title: "Technical Consulting",
    description:
      "Architecture reviews, stack selection, and code audits. Most useful when you're starting something new, inheriting a messy codebase, or need someone to pressure-test a technical decision before you commit to it.",
    icon: Briefcase,
    features: [
      "Architecture & stack review",
      "Code audits",
      "Technical roadmapping",
      "Developer mentorship",
    ],
  },
];

const serviceThemes = [
  {
    glow: "rgba(139, 92, 246, 0.08)", // violet
    accentText: "text-violet-400",
    accentBorder: "border-violet-500/20",
    accentBg: "bg-violet-500/[0.08]",
    hoverBorder: "hover:border-violet-500/30",
    badgeGlow: "shadow-[0_0_24px_rgba(139,92,246,0.12)]",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    glow: "rgba(6, 182, 212, 0.08)",  // cyan
    accentText: "text-cyan-400",
    accentBorder: "border-cyan-500/20",
    accentBg: "bg-cyan-500/[0.08]",
    hoverBorder: "hover:border-cyan-500/30",
    badgeGlow: "shadow-[0_0_24px_rgba(6,182,212,0.12)]",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    glow: "rgba(244, 63, 94, 0.08)",   // rose
    accentText: "text-rose-400",
    accentBorder: "border-rose-500/20",
    accentBg: "bg-rose-500/[0.08]",
    hoverBorder: "hover:border-rose-500/30",
    badgeGlow: "shadow-[0_0_24px_rgba(244,63,94,0.12)]",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    glow: "rgba(245, 158, 11, 0.08)",  // amber
    accentText: "text-amber-400",
    accentBorder: "border-amber-500/20",
    accentBg: "bg-amber-500/[0.08]",
    hoverBorder: "hover:border-amber-500/30",
    badgeGlow: "shadow-[0_0_24px_rgba(245,158,11,0.12)]",
    gradient: "from-amber-500 to-rose-500",
  },
];

function ServiceCard({ service, index }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const theme = serviceThemes[index % serviceThemes.length];
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group rounded-2xl border border-white/[0.06] bg-slate-900/20 overflow-hidden transition-all duration-300 relative ${theme.hoverBorder} hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]`}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${theme.glow}, transparent 70%)`,
        }}
      />

      <div className="md:flex relative z-10">
        {/* Left panel */}
        <div className="md:w-64 bg-white/[0.01] p-8 flex flex-col items-start justify-start border-b md:border-b-0 md:border-r border-white/[0.06]">
          <motion.div
            animate={isHovered ? { rotate: [0, -6, 6, 0], scale: 1.05 } : { rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border transition-all duration-300 ${theme.accentText} ${theme.accentBorder} ${theme.accentBg} ${theme.badgeGlow}`}
          >
            <Icon className="w-5 h-5" />
          </motion.div>
          <h2 className={`text-xl font-bold tracking-tight leading-snug text-white transition-colors duration-300 ${isHovered ? theme.accentText : ""}`}>
            {service.title}
          </h2>
        </div>

        {/* Right panel */}
        <div className="flex-1 p-8 bg-slate-950/10">
          <p className="text-neutral-400 leading-relaxed mb-8 group-hover:text-neutral-300 transition-colors duration-300">
            {service.description}
          </p>

          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4">
            What's included
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
            {service.features.map((feature, idx) => (
              <motion.li
                key={feature}
                animate={isHovered ? { x: 4 } : { x: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: idx * 0.03 }}
                className="flex items-center gap-2.5 text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors"
              >
                <Check className={`w-4 h-4 shrink-0 transition-colors duration-300 ${isHovered ? theme.accentText : "text-neutral-600"}`} />
                {feature}
              </motion.li>
            ))}
          </ul>

          <Link href="/contact" className="inline-block mt-4">
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center rounded-full px-5 py-2 text-xs font-bold tracking-wider uppercase transition-all duration-300 select-none cursor-pointer bg-white/[0.02] border border-white/[0.06] text-neutral-300 hover:text-white relative overflow-hidden group/btn"
            >
              {/* Glow gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-0 group-hover/btn:opacity-10 transition-opacity duration-300`} />
              <span className="relative z-10 flex items-center gap-1.5">
                Get a quote
                <span className="transition-transform group-hover/btn:translate-x-1 duration-300">→</span>
              </span>
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  useSEO({
    title: "Services — Sunil Gehlot | Full-Stack Developer",
    description: "Professional freelance full-stack development services by Sunil Gehlot. Offering premium React & Next.js dashboards, UI/UX designs, and technical consulting.",
    keywords: "Sunil Gehlot services, freelance developer, React developer for hire, Next.js developer freelance, hire dashboard developer, build MVP, UI designer",
    canonicalPath: "/services",
  });
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Nav />
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">
              Services
            </p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5 leading-[1.1] text-white">
              What I can help with
            </h1>
            <p className="text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed">
              I work across the full stack and can own a project from idea to
              deployment — or step in wherever you need support.
            </p>
          </motion.div>

          {/* Service cards */}
          <div className="space-y-6">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={index}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

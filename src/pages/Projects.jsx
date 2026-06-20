import { useState } from "react";
import { motion } from "framer-motion";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { projects } from "@/components/sections/FeaturedProjects";
import { SiGithub } from "react-icons/si";
import { ExternalLink } from "lucide-react";
import { useSEO } from "@/hooks/use-seo";

const allProjects = [
  ...projects,
  {
    title: "TaskMaster",
    description:
      "A project management tool for small agile teams. Kanban boards, task assignments, and real-time updates — without the overhead of enterprise tools.",
    tags: ["React", "GraphQL", "Node.js"],
    github: "https://github.com/imsunil018",
    live: "#",
  },
  {
    title: "CryptoDash",
    description:
      "A crypto portfolio tracker that pulls live market data and shows historical performance in a clean chart interface. Built to handle frequent data updates without slowing down.",
    tags: ["Next.js", "Chart.js", "Redis"],
    github: "https://github.com/imsunil018",
    live: "#",
  },
  {
    title: "EcoShop",
    description:
      "An e-commerce storefront for sustainable goods — product listings, cart management, Stripe checkout, and a lightweight inventory dashboard.",
    tags: ["React", "Stripe", "Express"],
    github: "https://github.com/imsunil018",
    live: "#",
  },
];

function ProjectPageCard({ project, index }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Harmonious gradient colors for backgrounds
  const glowColors = [
    "rgba(139, 92, 246, 0.15)",  // Violet
    "rgba(6, 182, 212, 0.15)",    // Cyan
    "rgba(244, 63, 94, 0.15)",    // Rose
    "rgba(16, 185, 129, 0.15)",   // Emerald
    "rgba(245, 158, 11, 0.15)",   // Amber
    "rgba(59, 130, 246, 0.15)",   // Blue
  ];
  
  const borderHoverColors = [
    "hover:border-violet-500/30",
    "hover:border-cyan-500/30",
    "hover:border-rose-500/30",
    "hover:border-emerald-500/30",
    "hover:border-amber-500/30",
    "hover:border-blue-500/30",
  ];

  const textHoverColors = [
    "group-hover:text-violet-400",
    "group-hover:text-cyan-400",
    "group-hover:text-rose-400",
    "group-hover:text-emerald-400",
    "group-hover:text-amber-400",
    "group-hover:text-blue-400",
  ];

  const colorIndex = index % glowColors.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      whileHover={{ y: -6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col h-full rounded-2xl border border-white/[0.06] bg-slate-900/30 backdrop-blur-md p-6 transition-all duration-300 overflow-hidden ${borderHoverColors[colorIndex]} hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]`}
    >
      {/* Spotlight Radial Background Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(250px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColors[colorIndex]}, transparent 70%)`,
        }}
      />

      {/* Top light bar */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent group-hover:via-white/[0.1] transition-all duration-500" />

      <span className="text-xs font-mono text-neutral-600 mb-4 group-hover:text-neutral-400 transition-colors relative z-10">
        {String(index + 1).padStart(2, "0")}
      </span>

      <h2 className={`text-lg font-semibold mb-3 tracking-tight text-white transition-colors relative z-10 ${textHoverColors[colorIndex]}`}>
        {project.title}
      </h2>
      
      <p className="text-neutral-400 text-sm leading-relaxed flex-grow mb-5 group-hover:text-neutral-300 transition-colors relative z-10">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5 relative z-10">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-neutral-400 group-hover:border-white/[0.1] group-hover:bg-white/[0.04] group-hover:text-neutral-200 transition-all duration-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-3 pt-4 border-t border-white/[0.06] relative z-10 mt-auto">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-all bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.15] px-3.5 py-1.5 rounded-full select-none"
        >
          <SiGithub className="w-3.5 h-3.5" /> Code
        </a>
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-all bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.15] px-3.5 py-1.5 rounded-full ml-auto select-none"
        >
          Live <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  useSEO({
    title: "Projects — Sunil Gehlot | Full-Stack Developer",
    description: "Explore all projects built by Sunil Gehlot, including TaskMaster, CryptoDash, EcoShop, and other web applications built with React, Next.js, and Node.js.",
    keywords: "Sunil Gehlot projects, portfolio projects, React portfolio, Next.js projects, Node.js developer portfolio, full-stack project examples, custom web development, dashboard projects, admin panels",
    canonicalPath: "/projects",
  });
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Nav />
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mb-16"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">
              Work
            </p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5 leading-[1.1] text-white">
              All Projects
            </h1>
            <p className="text-lg text-neutral-400 leading-relaxed">
              Everything I've shipped — from side projects that turned into real
              tools to client work built for specific problems.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProjects.map((project, index) => (
              <ProjectPageCard
                key={project.title}
                project={project}
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

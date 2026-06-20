import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Link } from "wouter";

export const projects = [
  {
    title: "DevNotes",
    description:
      "Markdown note-taking for developers. Organises snippets by language, syncs across sessions, and stays out of your way.",
    tags: ["React", "Node.js", "PostgreSQL"],
    github: "https://github.com/imsunil018",
    live: "#",
  },
  {
    title: "LinkFlow",
    description:
      "Link-in-bio tool for creators. One place for everything — custom themes, click tracking, and fast loads without a bloated editor.",
    tags: ["Next.js", "Tailwind CSS", "MongoDB"],
    github: "https://github.com/imsunil018",
    live: "#",
  },
  {
    title: "CodeSnap",
    description:
      "Turns a block of code into a shareable image. Pick your theme, font, and padding — export in one click.",
    tags: ["TypeScript", "React", "Canvas API"],
    github: "https://github.com/imsunil018",
    live: "#",
  },
];

function ProjectCard({ project, index }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const glowColors = [
    "rgba(139, 92, 246, 0.15)", // Violet
    "rgba(6, 182, 212, 0.15)",   // Cyan
    "rgba(244, 63, 94, 0.15)",   // Rose
  ];
  
  const borderHoverColors = [
    "group-hover:border-violet-500/30",
    "group-hover:border-cyan-500/30",
    "group-hover:border-rose-500/30",
  ];

  const textHoverColors = [
    "group-hover:text-violet-400",
    "group-hover:text-cyan-400",
    "group-hover:text-rose-400",
  ];

  const colorIndex = index % glowColors.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group flex flex-col h-full rounded-2xl border border-white/[0.06] bg-slate-900/30 backdrop-blur-md p-5 sm:p-6 transition-all duration-300 relative overflow-hidden ${borderHoverColors[colorIndex]} hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)]`}
    >
      {/* Spotlight Radial Background Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColors[colorIndex]}, transparent 70%)`,
        }}
      />

      {/* Decorative top border highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent group-hover:via-white/[0.12] transition-all duration-500" />

      <span className="text-xs font-mono text-neutral-600 mb-4 group-hover:text-neutral-400 transition-colors relative z-10">
        {String(index + 1).padStart(2, "0")}
      </span>

      <h3 className={`text-sm sm:text-base font-semibold mb-2 tracking-tight text-white transition-colors relative z-10 ${textHoverColors[colorIndex]}`}>
        {project.title}
      </h3>
      
      <p className="text-neutral-400 text-sm leading-relaxed flex-grow mb-4 sm:mb-5 group-hover:text-neutral-300 transition-colors relative z-10">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-5 relative z-10">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] font-medium px-2 py-0.5 rounded-md border border-white/[0.06] bg-white/[0.02] text-neutral-400 group-hover:border-white/[0.1] group-hover:bg-white/[0.04] group-hover:text-neutral-200 transition-all duration-300"
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
          data-testid={`project-github-${project.title.toLowerCase()}`}
          className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-all bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.15] px-3 py-1.5 rounded-full select-none"
        >
          <SiGithub className="w-3.5 h-3.5" /> Code
        </a>
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          data-testid={`project-live-${project.title.toLowerCase()}`}
          className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-all bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.15] px-3 py-1.5 rounded-full ml-auto select-none"
        >
          Live <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}

export function FeaturedProjects() {
  return (
    <section
      className="py-16 md:py-28 relative z-10 bg-background"
      id="projects"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-3">
            Work
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
            Selected projects
          </h2>
          <p className="text-neutral-500 max-w-xl mx-auto text-sm sm:text-base">
            A few things I've built. Each one started as a real problem worth
            solving.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8 md:mt-10"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-white transition-colors group"
          >
            View all projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

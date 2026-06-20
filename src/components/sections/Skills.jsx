import { useState } from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiPython,
  SiGraphql,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiGit,
  SiGithub,
} from "react-icons/si";

const categories = [
  {
    name: "Frontend",
    description: "UI, interaction & component design",
    accentColor: "#61DAFB",
    skills: [
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3B82F6" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
      { name: "Framer Motion", Icon: SiFramer, color: "#C084FC" },
    ],
  },
  {
    name: "Backend",
    description: "APIs, logic & server-side systems",
    accentColor: "#4ADE80",
    skills: [
      { name: "Node.js", Icon: SiNodedotjs, color: "#4ADE80" },
      { name: "Python", Icon: SiPython, color: "#FACC15" },
      { name: "GraphQL", Icon: SiGraphql, color: "#E879F9" },
      { name: "Express", Icon: SiExpress, color: "#9CA3AF" },
    ],
  },
  {
    name: "Database & Infra",
    description: "Data storage, DevOps & version control",
    accentColor: "#60A5FA",
    skills: [
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#60A5FA" },
      { name: "MongoDB", Icon: SiMongodb, color: "#4ADE80" },
      { name: "Docker", Icon: SiDocker, color: "#38BDF8" },
      { name: "Git", Icon: SiGit, color: "#FB923C" },
      { name: "GitHub", Icon: SiGithub, color: "#9CA3AF" },
    ],
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function SkillCategoryCard({ category }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  const rgbColor = hexToRgb(category.accentColor);

  return (
    <motion.div
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl border border-white/[0.06] bg-slate-900/30 backdrop-blur-md p-5 sm:p-6 hover:border-white/[0.14] hover:bg-slate-900/40 transition-all duration-300 overflow-hidden hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)]"
    >
      {/* Spotlight Dynamic Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${rgbColor}, 0.08), transparent 70%)`,
        }}
      />

      {/* Top accent line that animates on hover */}
      <div
        className="absolute top-0 left-6 right-6 h-px rounded-full opacity-40 group-hover:left-2 group-hover:right-2 group-hover:h-[1.5px] group-hover:opacity-100 transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${category.accentColor}, transparent)`,
        }}
      />

      <div className="mb-4 sm:mb-5 relative z-10">
        <h3 className="text-sm font-bold tracking-tight mb-1 text-white group-hover:text-white/95 transition-colors">
          {category.name}
        </h3>
        <p className="text-xs text-neutral-500 group-hover:text-neutral-400 transition-colors">{category.description}</p>
      </div>

      <div className="space-y-2.5 relative z-10">
        {category.skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            whileHover={{ x: 4 }}
            className="flex items-center gap-3 group/skill cursor-default"
          >
            <div 
              className="w-7 h-7 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0 transition-all duration-300 group-hover/skill:scale-105 group-hover/skill:bg-white/[0.08]"
              style={{
                borderColor: isHovered ? `${skill.color}22` : "",
              }}
            >
              <skill.Icon
                style={{ color: skill.color }}
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover/skill:rotate-6"
              />
            </div>
            <span className="text-sm text-neutral-400 group-hover/skill:text-white transition-colors duration-300">
              {skill.name}
            </span>
            <div
              className="ml-auto w-1.5 h-1.5 rounded-full opacity-0 group-hover/skill:opacity-100 transition-all duration-300"
              style={{ 
                background: skill.color,
                boxShadow: `0 0 8px ${skill.color}`,
              }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function Skills() {
  const allSkills = categories.flatMap((cat) => cat.skills);

  return (
    <section className="py-16 md:py-28 relative z-10 bg-background" id="skills">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-3">
            Tech Stack
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
            Tools I work with
          </h2>
          <p className="text-neutral-500 max-w-xl mx-auto text-sm sm:text-base">
            Things I know well enough to ship with — not just follow tutorials
            on.
          </p>
        </motion.div>

        {/* Infinite Scroll Ticker */}
        <div className="relative w-full overflow-hidden py-8 mb-16 border-y border-white/[0.04] bg-white/[0.01] backdrop-blur-sm">
          {/* Masking gradients */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
            {[...allSkills, ...allSkills].map((skill, index) => {
              const Icon = skill.Icon;
              return (
                <div
                  key={`${skill.name}-${index}`}
                  className="flex items-center gap-3 px-5 py-2.5 rounded-xl border border-white/[0.06] bg-slate-900/30 backdrop-blur-md hover:border-white/[0.15] hover:scale-105 transition-all duration-300 group cursor-default select-none shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
                >
                  <Icon
                    className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6"
                    style={{ color: skill.color }}
                  />
                  <span className="text-sm font-semibold tracking-wide text-neutral-300 group-hover:text-white transition-colors duration-300">
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto"
        >
          {categories.map((cat) => (
            <SkillCategoryCard key={cat.name} category={cat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

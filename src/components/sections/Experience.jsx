import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase, GitCommit, GitBranch, ArrowRight } from "lucide-react";

const experiences = [
  {
    hash: "a78bfa1",
    role: "Lead Full-Stack Developer",
    type: "Freelance & Startup Contractor",
    company: "Global Tech Startups & Agencies",
    period: "2023 – Present",
    location: "Remote · Worldwide",
    bullets: [
      "Architected and shipped responsive web dashboards and internal tools with live WebSocket data syncing.",
      "Optimized query performance and Next.js SSR caching strategies, achieving a 40% reduction in page-load latency.",
      "Established production-grade Docker containers and CI/CD pipelines, automating deployments on AWS and Vercel."
    ],
    tech: ["React", "Next.js", "Node.js", "PostgreSQL", "Docker", "Tailwind CSS"],
    accentColor: "rgba(139, 92, 246, 1)", // Violet
    accentGlow: "rgba(139, 92, 246, 0.15)",
    borderHover: "hover:border-violet-500/30",
    textHover: "group-hover:text-violet-400"
  },
  {
    hash: "60a5fa2",
    role: "Full-Stack Engineer",
    type: "Contract Roles",
    company: "Innovative IT Ventures",
    period: "2022 – 2023",
    location: "Hybrid · India",
    bullets: [
      "Developed secure client portals integrating Stripe subscriptions, JWT authentication, and user access control lists.",
      "Engineered clean RESTful APIs using Express, focusing on query parsing speeds and standardized validation schemas.",
      "Transformed high-fidelity Figma mockups into reusable component packages with clean, accessible DOM structure."
    ],
    tech: ["React", "Express", "MongoDB", "Node.js", "Stripe", "Chart.js"],
    accentColor: "rgba(6, 182, 212, 1)", // Cyan
    accentGlow: "rgba(6, 182, 212, 0.15)",
    borderHover: "hover:border-cyan-500/30",
    textHover: "group-hover:text-cyan-400"
  },
  {
    hash: "4ade803",
    role: "Software Developer Intern",
    type: "Internship",
    company: "Nexus Solution Labs",
    period: "2021 – 2022",
    location: "On-site · India",
    bullets: [
      "Assisted in refactoring legacy codebases to TypeScript, ensuring strict typing and reducing runtime bugs by 25%.",
      "Collaborated with UX/UI designers to prototype, implement, and unit-test high-interaction dashboard modules.",
      "Implemented comprehensive Jest test suites, increasing test coverage and reinforcing build pipeline integrity."
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "React", "Git", "Jest"],
    accentColor: "rgba(244, 63, 94, 1)", // Rose
    accentGlow: "rgba(244, 63, 94, 0.15)",
    borderHover: "hover:border-rose-500/30",
    textHover: "group-hover:text-rose-400"
  }
];

export function Experience() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <section className="py-16 md:py-28 relative z-10 bg-[#06060e]" id="experience">
      {/* Background visual cue */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-500/[0.01] rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-3">
            Career Commits
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
            Professional Path
          </h2>
          <p className="text-neutral-500 max-w-xl mx-auto text-sm sm:text-base">
            Tracking milestones and tech achievements as developer commits on the branch of my coding journey.
          </p>
        </motion.div>

        {/* Timeline container */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Vertical central branch line for larger screens */}
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-violet-600 via-cyan-500 to-rose-500/20 -translate-x-1/2 hidden md:block" />
          
          {/* Vertical line for mobile screens (aligned to the left) */}
          <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gradient-to-b from-violet-600 via-cyan-500 to-rose-500/20 -translate-x-1/2 md:hidden" />

          {/* Experience commits */}
          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={exp.hash} 
                  className={`relative flex flex-col md:flex-row items-stretch ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  
                  {/* Commmit node (Center indicator) */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-5 z-20 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.25 }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="w-10 h-10 rounded-full bg-slate-950 border-2 flex items-center justify-center cursor-pointer transition-all shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                      style={{
                        borderColor: hoveredIndex === index ? exp.accentColor : "rgba(255,255,255,0.15)",
                        boxShadow: hoveredIndex === index ? `0 0 15px ${exp.accentColor}` : ""
                      }}
                    >
                      <GitCommit 
                        className="w-4 h-4" 
                        style={{
                          color: hoveredIndex === index ? exp.accentColor : "rgba(255,255,255,0.4)"
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Spacer for grid formatting on large screens */}
                  <div className="w-full md:w-1/2 hidden md:block" />

                  {/* Card Content wrapper */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? "md:pr-12" : "md:pl-12"}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      onMouseMove={handleMouseMove}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className={`group relative rounded-2xl border border-white/[0.06] bg-slate-900/30 backdrop-blur-md p-6 transition-all duration-300 overflow-hidden ${exp.borderHover} hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]`}
                    >
                      {/* Spotlight Radial Background Glow */}
                      <div
                        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                        style={{
                          opacity: hoveredIndex === index ? 1 : 0,
                          background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, ${exp.accentGlow}, transparent 70%)`,
                        }}
                      />

                      {/* Header line gradient highlight */}
                      <div 
                        className="absolute top-0 left-0 right-0 h-px transition-all duration-300 opacity-40 group-hover:opacity-100" 
                        style={{
                          background: `linear-gradient(90deg, transparent, ${exp.accentColor}, transparent)`
                        }}
                      />

                      {/* Terminal-like Git Header */}
                      <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-3 mb-4 font-mono text-[10px] text-neutral-500 select-none">
                        <span className="flex items-center gap-1.5 hover:text-neutral-300 transition-colors">
                          <GitBranch className="w-3.5 h-3.5" style={{ color: hoveredIndex === index ? exp.accentColor : "" }} />
                          commit {exp.hash}
                        </span>
                        <span className="text-neutral-600 group-hover:text-neutral-400 transition-colors">
                          {exp.period}
                        </span>
                      </div>

                      {/* Role & Company info */}
                      <h3 className={`text-base font-bold text-white transition-colors duration-300 ${exp.textHover}`}>
                        {exp.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-400 mt-1 mb-4">
                        <span className="font-semibold text-neutral-300">{exp.company}</span>
                        <span className="text-neutral-600">•</span>
                        <span>{exp.type}</span>
                        <span className="text-neutral-600">•</span>
                        <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" /> {exp.location}</span>
                      </div>

                      {/* Bullet points description */}
                      <ul className="space-y-2 mb-6">
                        {exp.bullets.map((bullet, idx) => (
                          <li key={idx} className="text-xs text-neutral-400 leading-relaxed flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5 shrink-0 group-hover:bg-white/40 transition-colors" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech stack tags */}
                      <div className="flex flex-wrap gap-1.5 border-t border-white/[0.04] pt-4 mt-auto">
                        {exp.tech.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-medium px-2.5 py-0.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-neutral-400 group-hover:border-white/[0.1] group-hover:bg-white/[0.05] group-hover:text-neutral-200 transition-all duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Smartphone,
  Palette,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { Link } from "wouter";

const services = [
  {
    title: "Web Apps & Dashboards",
    description:
      "React up front, Node.js and PostgreSQL behind it. I build the kind of software teams open every morning — dashboards with real data, admin panels that don't get in the way, internal tools that actually save time.",
    icon: Code2,
    accent: "#a78bfa",
  },
  {
    title: "UI Design & Prototyping",
    description:
      "I design in code. Component systems, high-fidelity layouts, and the kind of small decisions that make an interface feel right without explaining why.",
    icon: Palette,
    accent: "#f9a8d4",
  },
  {
    title: "Technical Consulting",
    description:
      "Useful when you need a second opinion from someone who's actually shipped it — not just opined about it. Architecture reviews, stack decisions, honest code audits.",
    icon: Briefcase,
    accent: "#86efac",
  },
];

export function HomeServices() {
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
      className="py-16 md:py-28 relative z-10 bg-[#06060e]"
      id="services"
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
            Services
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
            What I do
          </h2>
          <p className="text-neutral-500 max-w-xl mx-auto text-sm sm:text-base">
            Full stack — I can own the project end-to-end or plug into a team
            where needed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -3 }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative p-6 sm:p-7 rounded-2xl border border-white/[0.08] bg-white/[0.03] transition-all duration-300 overflow-hidden cursor-default"
              style={{
                borderColor: hoveredIndex === index ? `${service.accent}30` : "",
                boxShadow: hoveredIndex === index ? `0 10px 30px -10px ${service.accent}12` : ""
              }}
            >
              {/* Spotlight Dynamic Glow */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                style={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, ${service.accent}12, transparent 70%)`,
                }}
              />

              {/* Glowing top line highlight */}
              <div 
                className="absolute top-0 left-0 right-0 h-px transition-all duration-300 opacity-0 group-hover:opacity-100" 
                style={{
                  background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)`
                }}
              />

              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-105"
                style={{ 
                  background: service.accent + "18",
                  boxShadow: hoveredIndex === index ? `0 0 16px ${service.accent}22` : ""
                }}
              >
                <service.icon
                  className="w-4 h-4 transition-transform duration-300 group-hover:rotate-6"
                  style={{ color: service.accent }}
                />
              </div>
              <h3 
                className="text-sm sm:text-base font-semibold mb-2.5 tracking-tight text-white transition-colors duration-300"
                style={{ color: hoveredIndex === index ? service.accent : "" }}
              >
                {service.title}
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed group-hover:text-neutral-400 transition-colors duration-300">
                {service.description}
              </p>
            </motion.div>
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
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-white transition-colors group"
          >
            See all services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Target, Zap, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const MotionLink = motion.create(Link);

const facts = [
  { icon: MapPin, label: "India · IST (UTC+5:30)" },
  { icon: Target, label: "Dashboards, Admin Panels, MVPs" },
  { icon: Zap, label: "Open to freelance & remote work" },
];

const stats = [
  { number: "3+", label: "Years coding" },
  { number: "20+", label: "Projects shipped" },
  { number: "10+", label: "Technologies" },
  { number: "∞", label: "Cups of chai" },
];

export function About() {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    if (isImageOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isImageOpen]);

  return (
    <section className="py-16 md:py-28 relative z-10 bg-[#06060e]" id="about">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-10 md:mb-12 text-center"
          >
            About me
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-start">
            {/* Left — profile card + stats */}
            <motion.div
              className="lg:col-span-2 space-y-4"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              {/* Profile Card with dynamic glow */}
              <div
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative rounded-2xl border border-white/[0.06] bg-slate-900/30 backdrop-blur-md p-6 sm:p-7 overflow-hidden transition-all duration-300 hover:border-violet-500/25 hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)]"
              >
                {/* Spotlight background */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.08), transparent 70%)`,
                  }}
                />

                <div className="absolute top-0 right-0 w-40 h-40 bg-violet-600/[0.04] rounded-full blur-3xl pointer-events-none" />

                <div className="relative w-fit mb-5 cursor-pointer group" onClick={() => setIsImageOpen(true)}>
                  <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-br from-violet-600 via-cyan-400 to-violet-500 opacity-25 blur-md animate-pulse group-hover:opacity-40 transition-opacity duration-300" />
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-black overflow-hidden flex items-center justify-center shadow-xl border border-white/10 group-hover:scale-[1.03] transition-transform duration-300">
                    <img 
                      src="/profile.png" 
                      alt="Sunil Gehlot" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold tracking-tight mb-0.5 text-white">
                  Sunil Gehlot
                </h3>
                <p className="text-sm text-neutral-500 mb-4">
                  Full-Stack Developer
                </p>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] mb-6">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                  <span className="text-xs font-medium text-emerald-400">
                    Available for work
                  </span>
                </div>

                <div className="border-t border-white/[0.06] pt-5 space-y-3.5">
                  {facts.map(({ icon: Icon, label }) => (
                    <motion.div 
                      key={label}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="flex items-center gap-3 group/fact cursor-default"
                    >
                      <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0 group-hover/fact:bg-violet-500/10 group-hover/fact:border-violet-500/25 group-hover/fact:text-violet-400 text-neutral-400 transition-colors duration-300">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm text-neutral-400 group-hover/fact:text-neutral-200 transition-colors duration-300">{label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Stats blocks with dynamic scale & colors */}
              <div className="grid grid-cols-2 gap-3">
                {stats.map(({ number, label }) => (
                  <motion.div
                    key={label}
                    whileHover={{ scale: 1.03, y: -2, borderColor: "rgba(34, 211, 238, 0.25)", backgroundColor: "rgba(34, 211, 238, 0.03)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    className="rounded-2xl border border-white/[0.06] bg-slate-900/30 backdrop-blur-md p-4 text-center cursor-default transition-colors duration-300"
                  >
                    <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-0.5">
                      {number}
                    </p>
                    <p className="text-xs text-neutral-500 font-medium">{label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — bio + CTAs */}
            <motion.div
              className="lg:col-span-3 lg:pl-4"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-[1.15] mb-6 text-white">
                Building software that{" "}
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  actually gets used
                </span>
              </h2>

              <div className="space-y-4 text-neutral-400 leading-relaxed mb-8">
                <p className="text-sm sm:text-base">
                  Started coding to scratch my own itch. Kept going because I
                  liked the feeling of shipping something people actually use.
                  Most of what I build runs quietly in the background —
                  dashboards, admin panels, internal tools — the software that
                  makes a team faster.
                </p>
                <p className="text-sm sm:text-base">
                  React and Next.js up front. Node.js and PostgreSQL behind it.
                  Enough Docker to deploy and not think about it again. I work
                  best when the requirements are real and there's room to push
                  back on the ones that aren't.
                </p>
                <p className="text-[14px] sm:text-[15px] italic text-neutral-550 border-l-2 border-white/[0.1] pl-4">
                  "If I can't use it myself, I'm probably not the right person
                  to build it."
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <MotionLink
                  href="/projects"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-all cursor-pointer group shadow-[0_4px_12px_rgba(255,255,255,0.06)]"
                >
                  View Projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </MotionLink>
                <MotionLink
                  href="/contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/[0.06] hover:border-white/[0.15] bg-white/[0.02] hover:bg-white/[0.06] text-sm font-semibold text-neutral-300 hover:text-white transition-all cursor-pointer relative overflow-hidden group/btn"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 opacity-0 group-hover/btn:opacity-10 transition-opacity duration-300" />
                  Get in Touch
                </MotionLink>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Lightbox / Modal for full profile image */}
      {isImageOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 cursor-pointer"
          onClick={() => setIsImageOpen(false)}
        >
          <div 
            className="relative max-w-[340px] w-full flex flex-col items-center justify-center cursor-default p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image container frame */}
            <div className="relative w-full aspect-square rounded-[2rem] border border-white/10 shadow-2xl overflow-visible">
              {/* Close button aligned with the top of the photo */}
              <button 
                className="absolute -top-3 -right-3 text-white bg-red-600 hover:bg-red-700 active:scale-95 w-8 h-8 rounded-full flex items-center justify-center border border-red-500/20 transition-all duration-200 z-50 cursor-pointer shadow-[0_4px_12px_rgba(220,38,38,0.45)] hover:scale-[1.08]"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsImageOpen(false);
                }}
                title="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              <motion.img 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src="/profile.png" 
                alt="Sunil Gehlot" 
                className="w-full h-full object-cover rounded-[2rem]"
              />
            </div>
            <p className="text-sm text-neutral-400 mt-4 font-medium font-sans">Sunil Gehlot — Full-Stack Developer</p>
          </div>
        </div>
      )}
    </section>
  );
}

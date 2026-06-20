import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { HeroBackground } from "./HeroBackground";
import { TechOrbit } from "./TechOrbit";
import { InteractiveDashboard } from "./InteractiveDashboard";

const roles = [
  "Full-Stack Developer",
  "Dashboard Builder",
  "Open Source Contributor",
  "Freelancer",
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-28 pb-16 overflow-hidden">
      <HeroBackground />

      {/* TechOrbit — hidden on small/medium screens to avoid visual noise */}
      <div className="hidden xl:block">
        <TechOrbit />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center max-w-6xl mx-auto">
          
          {/* Left copy column */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start order-1">
            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-primary/25 backdrop-blur-sm mb-6 md:mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-xs sm:text-sm font-medium text-foreground/75">
                Open to freelance &amp; remote work
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold mb-5 leading-[1.07] tracking-tight text-white"
            >
              Hi, I'm{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-300 to-accent">
                  Sunil Gehlot
                </span>
                <span
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 right-0 h-px opacity-40"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, hsl(258 86% 68%), hsl(197 68% 58%), transparent)",
                  }}
                />
              </span>
            </motion.h1>

            {/* Role ticker */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="h-8 flex items-center justify-center lg:justify-start mb-6 md:mb-7 w-full"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28 }}
                  className="text-lg sm:text-xl md:text-2xl font-medium text-foreground/70 tracking-wide"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-lg mb-8 md:mb-10 leading-relaxed"
            >
              I build the dashboards and tools your team actually opens every
              morning. React up front, Node.js behind it. India-based, remote
              everywhere.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 w-full sm:w-auto"
            >
              <Button
                asChild
                size="lg"
                className="rounded-full w-full sm:w-auto text-sm sm:text-base h-11 sm:h-12 px-6 sm:px-7 shadow-[0_0_28px_rgba(139,92,246,0.4)] hover:shadow-[0_0_42px_rgba(139,92,246,0.6)] transition-all duration-300"
              >
                <Link href="/projects" data-testid="hero-view-projects">
                  View Projects <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full w-full sm:w-auto text-sm sm:text-base h-11 sm:h-12 px-6 sm:px-7 border-white/12 bg-white/[0.04] hover:bg-white/[0.08] hover:border-primary/50 backdrop-blur-sm transition-all duration-300"
              >
                <Link href="/contact" data-testid="hero-hire-me">
                  <Zap className="mr-2 w-4 h-4" /> Hire Me
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right interactive dashboard column */}
          <div className="lg:col-span-5 w-full flex justify-center order-2 mt-8 lg:mt-0">
            <InteractiveDashboard />
          </div>

        </div>

        {/* Scroll hint at the bottom */}
        <div className="w-full flex justify-center mt-12 lg:mt-16">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex flex-col items-center gap-2 cursor-pointer group outline-none"
            aria-label="Scroll to About section"
          >
            <span className="text-xs text-muted-foreground/40 uppercase tracking-widest group-hover:text-muted-foreground/70 transition-colors">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-px h-8 bg-gradient-to-b from-primary/40 to-transparent group-hover:from-primary/70 transition-colors"
            />
          </motion.button>
        </div>
      </div>
    </section>
  );
}

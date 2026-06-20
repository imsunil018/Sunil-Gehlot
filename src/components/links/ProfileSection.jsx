import { motion } from "framer-motion";

const tags = ["Web Apps", "Dashboards", "Admin Panels", "MVP Development"];

export function ProfileSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center mb-10"
    >
      {/* Avatar */}
      <div className="relative mb-5">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary via-accent to-primary opacity-70 blur-sm"
        />

        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary via-violet-500 to-accent flex items-center justify-center shadow-2xl shadow-primary/30 border-2 border-background z-10">
          <span className="text-2xl font-bold text-white tracking-tight select-none">
            SG
          </span>
        </div>
        {/* Online dot */}
        <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-400 border-2 border-background rounded-full z-20 shadow-lg shadow-emerald-400/40" />
      </div>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="text-2xl font-bold tracking-tight mb-1"
        style={{ fontFamily: "Space Grotesk, sans-serif" }}
      >
        Sunil Gehlot
      </motion.h1>

      {/* Handle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="text-sm text-muted-foreground mb-4 font-medium tracking-wide"
      >
        @imsunil018
      </motion.p>

      {/* Bio */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.32, duration: 0.5 }}
        className="text-sm text-muted-foreground/90 leading-relaxed max-w-[340px] mb-5"
      >
        Building web apps & MVPs that solve real problems. Focused on dashboards
        and admin systems.{" "}
        <span className="text-foreground/70">Learning by building.</span>
      </motion.p>

      {/* Tags */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex flex-wrap justify-center gap-2"
      >
        {tags.map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45 + i * 0.07, duration: 0.35 }}
            className="px-3 py-1 rounded-full text-xs font-medium border border-primary/30 bg-primary/10 text-primary"
          >
            {tag}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}

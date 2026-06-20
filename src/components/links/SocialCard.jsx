import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export function SocialCard({
  platform,
  handle,
  url,
  Icon,
  color,
  glowColor,
  index,
}) {
  const isEmail = url.startsWith("mailto:");

  return (
    <motion.a
      href={url}
      target={isEmail ? "_self" : "_blank"}
      rel="noopener noreferrer"
      data-testid={`link-card-${platform.toLowerCase().replace(/\s+/g, "-")}`}
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 0.55 + index * 0.09,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -3, scale: 1.025 }}
      whileTap={{ scale: 0.97 }}
      className="group relative flex items-center w-full rounded-2xl overflow-hidden border border-white/8 bg-white/[0.04] backdrop-blur-sm cursor-pointer select-none"
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
      }}
    >
      {/* Hover glow layer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 20% 50%, ${glowColor} 0%, transparent 65%)`,
        }}
      />

      {/* Hover border glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 rounded-2xl pointer-events-none border"
        style={{ borderColor: glowColor }}
      />

      {/* Icon container */}
      <div
        className="relative z-10 m-3 w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ background: color, boxShadow: `0 4px 14px ${glowColor}` }}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>

      {/* Text */}
      <div className="relative z-10 flex flex-col flex-grow py-3 pr-4">
        <span
          className="font-semibold text-sm text-foreground leading-tight"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          {platform}
        </span>
        <span className="text-xs text-muted-foreground mt-0.5 truncate">
          {handle}
        </span>
      </div>

      {/* Arrow */}
      <motion.div
        initial={{ opacity: 0, x: -4 }}
        whileHover={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="relative z-10 pr-4 text-muted-foreground group-hover:text-foreground"
      >
        <ExternalLink className="w-4 h-4" />
      </motion.div>
    </motion.a>
  );
}

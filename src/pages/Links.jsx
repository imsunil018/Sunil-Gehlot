import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { BackgroundEffects } from "@/components/links/BackgroundEffects";
import { ProfileSection } from "@/components/links/ProfileSection";
import { SocialLinks } from "@/components/links/SocialLinks";
import { LinksFooter } from "@/components/links/LinksFooter";
import { useSEO } from "@/hooks/use-seo";

export default function Links() {
  useSEO({
    title: "Links — Sunil Gehlot | Full-Stack Developer",
    description: "Quick links to Sunil Gehlot's social profiles, GitHub repository, professional portfolio, and direct communication channels.",
    keywords: "Sunil Gehlot links, linktree Sunil Gehlot, social links developer, hire programmer profiles, GitHub portfolio",
    canonicalPath: "/links",
  });
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <BackgroundEffects />

      {/* Back to portfolio link */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="fixed top-5 left-5 z-50"
      >
        <Link
          href="/"
          data-testid="links-back-home"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm"
        >
          <ArrowLeft className="w-3 h-3" />
          Portfolio
        </Link>
      </motion.div>

      {/* Centered content column */}
      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen px-4 pt-16 pb-6">
        <div className="w-full max-w-[480px]">
          <ProfileSection />
          <SocialLinks />
          <LinksFooter />
        </div>
      </div>
    </div>
  );
}

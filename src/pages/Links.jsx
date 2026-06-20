import { BackgroundEffects } from "@/components/links/BackgroundEffects";
import { ProfileSection } from "@/components/links/ProfileSection";
import { SocialLinks } from "@/components/links/SocialLinks";
import { LinksFooter } from "@/components/links/LinksFooter";
import { Nav } from "@/components/sections/Nav";
import { useSEO } from "@/hooks/use-seo";

export default function Links() {
  useSEO({
    title: "Links — Sunil Gehlot | Full-Stack Developer",
    description: "Quick links to Sunil Gehlot's social profiles, GitHub repository, professional portfolio, and direct communication channels.",
    keywords: "Sunil Gehlot links, linktree Sunil Gehlot, social links developer, hire programmer profiles, GitHub portfolio",
    canonicalPath: "/links",
  });
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col justify-between">
      <Nav />
      <BackgroundEffects />

      {/* Centered content column */}
      <div className="relative z-10 flex flex-col items-center justify-start flex-grow px-4 pt-28 pb-6">
        <div className="w-full max-w-[480px]">
          <ProfileSection />
          <SocialLinks />
          <LinksFooter />
        </div>
      </div>
    </div>
  );
}

import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Experience as ExperienceSection } from "@/components/sections/Experience";
import { useSEO } from "@/hooks/use-seo";

export default function Experience() {
  useSEO({
    title: "Experience — Sunil Gehlot | Full-Stack Developer",
    description: "Explore the professional experience of Sunil Gehlot. Detailed career milestones, start-up projects, and technical skills represented as interactive commits.",
    keywords: "Sunil Gehlot experience, freelance work, software developer intern, fullstack engineer history, React developer resume",
    canonicalPath: "/experience",
  });

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Nav />
      <main className="flex-grow pt-20">
        <ExperienceSection />
      </main>
      <Footer />
    </div>
  );
}

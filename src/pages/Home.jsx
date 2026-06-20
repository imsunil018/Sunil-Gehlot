import { useSEO } from "@/hooks/use-seo";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Footer } from "@/components/sections/Footer";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { HomeServices } from "@/components/sections/HomeServices";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { WhyChooseMe } from "@/components/sections/WhyChooseMe";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  useSEO({
    title: "Sunil Gehlot — Full-Stack Developer | React, Next.js, Node.js",
    description: "Sunil Gehlot is a full-stack developer in India who builds dashboards, admin panels, and MVPs with React, Next.js, Node.js, and PostgreSQL. Open to freelance and remote work.",
    keywords: "Sunil Gehlot, full-stack developer India, React developer freelance, Next.js developer, Node.js developer, dashboard developer, admin panel development, MVP developer India, TypeScript developer, hire developer India, remote developer India, web app developer",
    canonicalPath: "/",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <HomeServices />
        <FeaturedProjects />
        <WhyChooseMe />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

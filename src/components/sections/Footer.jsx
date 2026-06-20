import {
  SiX,
  SiGithub,
  SiInstagram,
  SiDiscord,
  SiFiverr,
} from "react-icons/si";
import { Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Services", href: "/services" },
  { name: "Links", href: "/links" },
  { name: "Contact", href: "/contact" },
];

const serviceLinks = [
  { name: "Web Apps & Dashboards", href: "/services" },

  { name: "UI Design & Prototyping", href: "/services" },
  { name: "Technical Consulting", href: "/services" },
];

const socialLinks = [
  {
    href: "https://x.com/SunilLabs",
    icon: SiX,
    label: "Twitter / X",
    color: "#E5E7EB",
  },
  {
    href: "https://github.com/imsunil018",
    icon: SiGithub,
    label: "GitHub",
    color: "#E5E7EB",
  },
  {
    href: "https://www.linkedin.com/in/imsunil018",
    icon: Linkedin,
    label: "LinkedIn",
    color: "#60A5FA",
  },
  {
    href: "https://instagram.com/sunilgehlot_18",
    icon: SiInstagram,
    label: "Instagram",
    color: "#F472B6",
  },
  {
    href: "https://discord.com/users/1450959869313159221",
    icon: SiDiscord,
    label: "Discord",
    color: "#818CF8",
  },
  {
    href: "https://www.fiverr.com/imsunil018",
    icon: SiFiverr,
    label: "Fiverr",
    color: "#4ADE80",
  },
];

export function Footer() {
  return (
    <footer className="relative z-10 bg-background border-t border-border/50 overflow-hidden">
      {/* Top gradient accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, hsl(258 86% 68% / 0.6) 30%, hsl(197 68% 58% / 0.5) 70%, transparent 100%)",
        }}
      />

      {/* Subtle background orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/[0.04] rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Main footer columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-14">
          {/* Col 1 — Brand */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
                SG
              </div>
              <div>
                <p className="text-sm font-bold leading-tight">Sunil Gehlot</p>
                <p className="text-xs text-muted-foreground">
                  Full-Stack Developer
                </p>
              </div>
            </Link>

            {/* Availability badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] w-fit">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <span className="text-xs font-medium text-emerald-400">
                Available for work
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
              Building dashboards, admin panels, and MVPs that solve real
              problems.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 flex-wrap">
              {socialLinks.map(({ href, icon: Icon, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-testid={`footer-social-${label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="w-8 h-8 rounded-lg border border-border/60 bg-card flex items-center justify-center text-muted-foreground transition-all duration-200 hover:scale-110"
                  style={{
                    ["--hover-color"]: color,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = color + "55";
                    e.currentTarget.style.color = color;
                    e.currentTarget.style.background = color + "12";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "";
                    e.currentTarget.style.color = "";
                    e.currentTarget.style.background = "";
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-widest mb-5">
              Navigation
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 group"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-widest mb-5">
              Services
            </p>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-widest mb-5">
              Get in touch
            </p>
            <div className="space-y-3">
              <a
                href="mailto:imsunil018@gmail.com"
                className="flex items-start gap-2.5 group"
              >
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground/60 mb-0.5">
                    Email
                  </p>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors break-all">
                    imsunil018@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="https://x.com/SunilLabs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 group"
              >
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                  <SiX className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground/60 mb-0.5">
                    Twitter / X
                  </p>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    @SunilLabs
                  </p>
                </div>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 mt-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
              >
                Send a message
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/40 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground/45">
            &copy; {new Date().getFullYear()} Sunil Gehlot — All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground/40">
              Made in India 🇮🇳
            </span>
            <span className="text-muted-foreground/25 text-xs">·</span>
            <span className="text-xs text-muted-foreground/40">
              Built with React &amp; Vite
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

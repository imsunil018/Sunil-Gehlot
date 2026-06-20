import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Nav() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Experience", href: "/experience" },
    { name: "Services", href: "/services" },
    { name: "Links", href: "/links" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={() => {
              if (location === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="text-xl font-bold font-serif tracking-tight flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-sm">
              SG
            </div>
            Sunil Gehlot
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    if (isActive) {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-testid={`nav-link-${link.name.toLowerCase()}`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            <Button asChild size="sm" className="rounded-full">
              <Link href="/contact" data-testid="nav-cta-hire">
                Hire Me
              </Link>
            </Button>
          </nav>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="nav-mobile-toggle"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border py-4 px-4 flex flex-col gap-4 shadow-xl">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-base font-semibold py-2 border-b border-border/50 transition-colors flex items-center justify-between ${
                    isActive
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (isActive) {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
            <Button asChild className="w-full mt-2">
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                Hire Me
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

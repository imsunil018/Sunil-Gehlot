import { Link } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Nav() {
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
            className="text-xl font-bold font-serif tracking-tight flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-sm">
              SG
            </div>
            Sunil Gehlot
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-testid={`nav-link-${link.name.toLowerCase()}`}
              >
                {link.name}
              </Link>
            ))}
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
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium text-foreground py-2 border-b border-border/50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
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

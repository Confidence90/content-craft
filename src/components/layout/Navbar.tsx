import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang } = useLanguage();

  const isActive = (href: string) => location.pathname === href;

  const services = [
    { label: lang === "en" ? "Web Application" : "Application Web", href: "/services#web-app" },
    { label: lang === "en" ? "Mobile Application" : "Application Mobile", href: "/services#mobile-app" },
    { label: lang === "en" ? "Website Development" : "Création de Sites Web", href: "/services#website" },
    { label: lang === "en" ? "IT Management" : "Infogérance", href: "/services#it-management" },
    { label: lang === "en" ? "Other IT Services" : "Autres Services IT", href: "/services#other" },
  ];

  const navLinks = [
    { label: lang === "en" ? "Home" : "Accueil", href: "/" },
    { label: lang === "en" ? "About" : "Présentation", href: "/presentation" },
    { label: "Services", href: "/services", children: services },
    { label: "Solutions", href: "/solutions" },
    { label: lang === "en" ? "Testimonials" : "Témoignages", href: "/temoignages" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-card/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-accent-foreground font-heading font-bold text-lg">T</span>
          </div>
          <span className="font-heading font-bold text-xl text-foreground">TechCorp</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <Link
                  to={link.href}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                    isActive(link.href) ? "text-accent bg-accent/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-card rounded-xl shadow-elevated border border-border p-2 animate-fade-in">
                    {link.children.map((child) => (
                      <Link key={child.label} to={child.href} className="block px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                  isActive(link.href) ? "text-accent bg-accent/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {/* Language switcher */}
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Globe className="h-4 w-4" />
            {lang === "fr" ? "EN" : "FR"}
          </button>
          <Link to="/contact">
            <button className="bg-accent text-accent-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-accent/90 transition-all shadow-sm hover:shadow-glow">
              {lang === "en" ? "Request a Quote" : "Demander un Devis"}
            </button>
          </Link>
        </div>

        <button className="md:hidden p-2 text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border animate-fade-in">
          <div className="container py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link to={link.href} onClick={() => setMobileOpen(false)} className={cn("block px-4 py-3 rounded-lg text-sm font-medium transition-colors", isActive(link.href) ? "text-accent bg-accent/10" : "text-muted-foreground hover:text-foreground hover:bg-muted")}>
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-4 space-y-0.5">
                    {link.children.map((child) => (
                      <Link key={child.label} to={child.href} onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button onClick={() => { setLang(lang === "fr" ? "en" : "fr"); }} className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground hover:text-foreground">
              <Globe className="h-4 w-4" /> {lang === "fr" ? "English" : "Français"}
            </button>
            <Link to="/contact" onClick={() => setMobileOpen(false)}>
              <button className="w-full mt-3 bg-accent text-accent-foreground px-5 py-3 rounded-lg text-sm font-semibold">
                {lang === "en" ? "Request a Quote" : "Demander un Devis"}
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

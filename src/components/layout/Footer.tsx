import { Link } from "react-router-dom";
import { Facebook, Twitter, Youtube, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const Footer = () => {
  const { lang } = useLanguage();

  const links = [
    { label: lang === "en" ? "Home" : "Accueil", href: "/" },
    { label: lang === "en" ? "About" : "Présentation", href: "/presentation" },
    { label: "Services", href: "/services" },
    { label: "Solutions", href: "/solutions" },
    { label: "Contact", href: "/contact" },
  ];

  const serviceLabels = lang === "en"
    ? ["Web Applications", "Mobile Applications", "Website Development", "IT Management", "IT Consulting"]
    : ["Applications Web", "Applications Mobiles", "Création de Sites Web", "Infogérance", "Conseil IT"];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-heading font-bold text-lg">T</span>
              </div>
              <span className="font-heading font-bold text-xl">TechCorp</span>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              {lang === "en"
                ? "Empowering businesses with innovative digital solutions. We build the technology that drives your success."
                : "Accompagner les entreprises avec des solutions numériques innovantes. Nous construisons la technologie qui propulse votre succès."}
            </p>
            <div className="flex gap-3 mt-6">
              {[Facebook, Twitter, Youtube, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="text-primary-foreground/50 hover:text-accent transition-colors"><Icon className="h-4 w-4" /></a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">{lang === "en" ? "Quick Links" : "Liens Rapides"}</h4>
            <ul className="space-y-2.5 text-sm">
              {links.map((item) => (
                <li key={item.label}><Link to={item.href} className="text-primary-foreground/60 hover:text-accent transition-colors">{item.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/60">
              {serviceLabels.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /><span>AUF/FST Badalabougou, Bamako</span></li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /><span>+223 90 11 70 51</span></li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /><span>confidenceuche314@gmail.com</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-sm text-primary-foreground/40">
          © {new Date().getFullYear()} TechCorp. {lang === "en" ? "All rights reserved." : "Tous droits réservés."}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

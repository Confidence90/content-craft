import { Link } from "react-router-dom";
import { Facebook, Twitter, Youtube, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-heading font-bold text-lg">T</span>
              </div>
              <span className="font-heading font-bold text-xl">TechCorp</span>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Empowering businesses with innovative digital solutions. We build the technology that drives your success.
            </p>
            <div className="flex gap-3 mt-6">
              {[Facebook, Twitter, Youtube, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="text-primary-foreground/50 hover:text-accent transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {["Home", "Presentation", "Services", "Solutions", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-primary-foreground/60 hover:text-accent transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/60">
              <li>Web Applications</li>
              <li>Mobile Applications</li>
              <li>Website Development</li>
              <li>IT Management</li>
              <li>IT Consulting</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>123 Innovation Blvd, Tech City, TC 10001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+1 (234) 567-890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>contact@techcorp.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-sm text-primary-foreground/40">
          © {new Date().getFullYear()} TechCorp. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

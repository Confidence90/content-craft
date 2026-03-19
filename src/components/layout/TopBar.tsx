import { Facebook, Twitter, Youtube, Linkedin, Instagram, Phone, Mail } from "lucide-react";

const socials = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

const TopBar = () => {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container flex items-center justify-between py-2 text-xs">
        <div className="flex items-center gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="text-primary-foreground/70 hover:text-accent transition-colors duration-200"
            >
              <Icon className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
        <div className="hidden sm:flex items-center gap-4 text-primary-foreground/80">
          <a href="tel:+1234567890" className="flex items-center gap-1.5 hover:text-accent transition-colors">
            <Phone className="h-3 w-3" />
            <span>+1 (234) 567-890</span>
          </a>
          <a href="mailto:contact@techcorp.com" className="flex items-center gap-1.5 hover:text-accent transition-colors">
            <Mail className="h-3 w-3" />
            <span>contact@techcorp.com</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

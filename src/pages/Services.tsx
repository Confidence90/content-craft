import { motion } from "framer-motion";
import { Globe, Smartphone, Monitor, Server, Shield, Code, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const serviceCategories = [
  {
    id: "web-app",
    icon: Globe,
    title: "Web Applications",
    desc: "Build powerful, scalable web applications using modern frameworks and cloud-native architecture.",
    features: ["React / Next.js", "Cloud-native architecture", "Real-time features", "API integrations"],
  },
  {
    id: "mobile-app",
    icon: Smartphone,
    title: "Mobile Applications",
    desc: "Create beautiful, performant mobile apps for iOS and Android with native and cross-platform solutions.",
    features: ["React Native / Flutter", "Native iOS & Android", "Offline-first design", "Push notifications"],
  },
  {
    id: "website",
    icon: Monitor,
    title: "Website Development",
    desc: "Design and develop stunning, responsive websites that convert visitors into customers.",
    features: ["Responsive design", "SEO optimized", "CMS integration", "E-commerce ready"],
  },
  {
    id: "it-management",
    icon: Server,
    title: "IT Management (Infogérance)",
    desc: "Comprehensive IT infrastructure management, monitoring, and optimization for your business.",
    features: ["24/7 monitoring", "Cloud migration", "Backup & recovery", "Performance tuning"],
  },
  {
    id: "security",
    icon: Shield,
    title: "Cybersecurity",
    desc: "Protect your digital assets with enterprise-grade security solutions and compliance frameworks.",
    features: ["Penetration testing", "Security audits", "Compliance (GDPR)", "Incident response"],
  },
  {
    id: "other",
    icon: Code,
    title: "Custom Solutions",
    desc: "Bespoke software development for unique challenges that off-the-shelf solutions can't address.",
    features: ["AI / ML integration", "IoT solutions", "Legacy modernization", "DevOps consulting"],
  },
];

const Services = () => {
  return (
    <div>
      <section className="bg-hero py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <p className="text-accent font-medium text-sm uppercase tracking-wider mb-3">Our Expertise</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
              Services & Solutions
            </h1>
            <p className="text-primary-foreground/60 text-lg">
              End-to-end digital services designed to transform your business and accelerate growth.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container space-y-8">
          {serviceCategories.map(({ id, icon: Icon, title, desc, features }, i) => (
            <motion.div
              key={id}
              id={id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-2xl p-8 md:p-10 shadow-card border border-border hover:shadow-elevated transition-all duration-300 scroll-mt-24"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="h-16 w-16 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Icon className="h-8 w-8 text-accent" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-3">{title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{desc}</p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/contact">Get a Quote <ArrowRight className="h-3.5 w-3.5" /></Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;

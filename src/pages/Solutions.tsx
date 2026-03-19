import { motion } from "framer-motion";
import { Zap, BarChart3, Cloud, Lock, Layers, Cpu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const solutions = [
  { icon: Zap, title: "Digital Transformation", desc: "Modernize your business processes with end-to-end digital solutions that increase efficiency and reduce costs.", tag: "Strategy" },
  { icon: BarChart3, title: "Business Intelligence", desc: "Turn your data into actionable insights with custom dashboards, analytics, and reporting tools.", tag: "Analytics" },
  { icon: Cloud, title: "Cloud Solutions", desc: "Migrate, optimize, and manage your cloud infrastructure for maximum performance and cost savings.", tag: "Infrastructure" },
  { icon: Lock, title: "Enterprise Security", desc: "Comprehensive security frameworks to protect your data, applications, and users.", tag: "Security" },
  { icon: Layers, title: "SaaS Development", desc: "Build and launch scalable SaaS products with modern architecture and seamless user experiences.", tag: "Product" },
  { icon: Cpu, title: "AI & Automation", desc: "Leverage artificial intelligence and automation to streamline workflows and drive innovation.", tag: "Innovation" },
];

const Solutions = () => {
  return (
    <div>
      <section className="bg-hero py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <p className="text-accent font-medium text-sm uppercase tracking-wider mb-3">Digital Solutions</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
              Solutions for Every Challenge
            </h1>
            <p className="text-primary-foreground/60 text-lg">
              Comprehensive digital solutions designed to solve your most complex business challenges.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map(({ icon: Icon, title, desc, tag }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-card rounded-2xl p-8 shadow-card border border-border hover:shadow-elevated hover:border-accent/30 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">{tag}</span>
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{desc}</p>
                <div className="mt-6">
                  <Button asChild size="sm" variant="ghost" className="text-accent hover:text-accent px-0">
                    <Link to="/contact">Learn More <ArrowRight className="h-3.5 w-3.5" /></Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-hero">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-primary-foreground/60 mb-8 max-w-lg mx-auto">
              Let our team of experts design a tailored solution that perfectly fits your business needs.
            </p>
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">Contact Us <ArrowRight className="h-5 w-5" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;

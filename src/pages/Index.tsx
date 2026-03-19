import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Smartphone, Monitor, Server, Shield, Code, CheckCircle, Star, Users, Briefcase, Award } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const services = [
  { icon: Globe, title: "Web Applications", desc: "Scalable, high-performance web apps tailored to your business needs." },
  { icon: Smartphone, title: "Mobile Applications", desc: "Native & cross-platform mobile solutions for iOS and Android." },
  { icon: Monitor, title: "Website Development", desc: "Stunning, responsive websites that convert visitors into customers." },
  { icon: Server, title: "IT Management", desc: "Comprehensive IT infrastructure management and monitoring." },
  { icon: Shield, title: "Cybersecurity", desc: "Protect your business with advanced security solutions." },
  { icon: Code, title: "Custom Solutions", desc: "Bespoke software development for unique business challenges." },
];

const stats = [
  { value: "250+", label: "Projects Delivered", icon: Briefcase },
  { value: "120+", label: "Happy Clients", icon: Users },
  { value: "15+", label: "Years Experience", icon: Award },
  { value: "99%", label: "Client Satisfaction", icon: Star },
];

const testimonials = [
  { name: "Sarah Chen", role: "CTO, FinVault", quote: "TechCorp delivered an exceptional platform that transformed our operations. Their attention to detail is remarkable." },
  { name: "Marcus Johnson", role: "CEO, GreenLeaf", quote: "Working with TechCorp was a game-changer. They understood our vision and built exactly what we needed." },
  { name: "Aisha Patel", role: "VP Engineering, CloudSync", quote: "The team's expertise in cloud architecture helped us scale from 1K to 1M users seamlessly." },
];

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/70" />
        </div>
        <div className="container relative z-10 py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.p variants={fadeUp} custom={0} className="text-accent font-medium mb-4 tracking-wider text-sm uppercase">
              Digital Excellence
            </motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-tight mb-6">
              We Build Technology That{" "}
              <span className="text-gradient">Drives Growth</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-primary-foreground/70 mb-8 leading-relaxed max-w-lg">
              From web applications to complete IT infrastructure, we deliver innovative digital solutions that empower your business to thrive.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <Button asChild variant="hero" size="xl">
                <Link to="/contact">
                  Request a Quote
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="hero-outline" size="xl">
                <Link to="/services">Our Services</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-accent font-medium text-sm uppercase tracking-wider mb-3">About Us</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Your Trusted Partner in Digital Transformation
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                With over 15 years of experience, TechCorp has been at the forefront of digital innovation. We combine technical expertise with strategic thinking to deliver solutions that make a real impact.
              </p>
              <ul className="space-y-3 mb-8">
                {["Expert team of 50+ engineers", "Agile development methodology", "24/7 support & maintenance", "ISO 27001 certified"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild>
                <Link to="/presentation">Learn More <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-2xl shadow-elevated p-8 border border-border"
            >
              <div className="grid grid-cols-2 gap-6">
                {stats.map(({ value, label, icon: Icon }) => (
                  <div key={label} className="text-center p-4">
                    <Icon className="h-6 w-6 text-accent mx-auto mb-3" />
                    <p className="text-3xl font-heading font-bold text-foreground">{value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-secondary/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="text-accent font-medium text-sm uppercase tracking-wider mb-3">What We Do</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Services That Drive Results
            </h2>
            <p className="text-muted-foreground">
              Comprehensive digital services designed to accelerate your business growth and streamline operations.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group bg-card rounded-2xl p-8 shadow-card border border-border hover:shadow-elevated hover:border-accent/30 transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/services">View All Services <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="text-accent font-medium text-sm uppercase tracking-wider mb-3">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              What Our Clients Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, quote }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-card border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-4 w-4 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">"{quote}"</p>
                <div>
                  <p className="font-heading font-semibold text-foreground text-sm">{name}</p>
                  <p className="text-xs text-muted-foreground">{role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-hero">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-primary-foreground/60 mb-8 max-w-lg mx-auto">
              Let's discuss how our solutions can help you achieve your goals.
            </p>
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">Get Started Today <ArrowRight className="h-5 w-5" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;

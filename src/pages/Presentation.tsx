import { motion } from "framer-motion";
import { Target, Eye, Users, Award, CheckCircle } from "lucide-react";

const team = [
  { name: "David Laurent", role: "CEO & Founder", initials: "DL" },
  { name: "Sophie Martin", role: "CTO", initials: "SM" },
  { name: "Alex Rivera", role: "Head of Design", initials: "AR" },
  { name: "Emma Williams", role: "VP Engineering", initials: "EW" },
];

const Presentation = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-hero py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <p className="text-accent font-medium text-sm uppercase tracking-wider mb-3">Who We Are</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
              Our Company
            </h1>
            <p className="text-primary-foreground/60 text-lg">
              Pioneering digital transformation since 2009. We combine innovation with reliability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-10 shadow-card border border-border"
            >
              <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-accent" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To empower businesses of all sizes with cutting-edge technology solutions that drive growth, efficiency, and innovation. We believe that great technology should be accessible, reliable, and transformative.
              </p>
              <ul className="mt-6 space-y-3">
                {["Deliver exceptional quality", "Foster long-term partnerships", "Drive measurable results"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-10 shadow-card border border-border"
            >
              <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                <Eye className="h-7 w-7 text-accent" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To become the leading digital transformation partner globally, recognized for our innovative solutions, exceptional service, and commitment to client success. We envision a world where technology seamlessly enhances every business.
              </p>
              <ul className="mt-6 space-y-3">
                {["Global technology leader", "Innovation-first approach", "Sustainable digital future"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-secondary/50">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-accent font-medium text-sm uppercase tracking-wider mb-3">Our Values</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">What Guides Us</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "Excellence", desc: "We pursue the highest standards in everything we do." },
              { icon: Users, title: "Collaboration", desc: "We believe the best solutions come from working together." },
              { icon: Target, title: "Innovation", desc: "We constantly push boundaries and explore new possibilities." },
              { icon: CheckCircle, title: "Integrity", desc: "Transparency and honesty are at the core of our relationships." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-card border border-border text-center"
              >
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-background">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-accent font-medium text-sm uppercase tracking-wider mb-3">Our Team</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Meet the Experts</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(({ name, role, initials }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-card border border-border text-center group hover:shadow-elevated transition-all duration-300"
              >
                <div className="h-20 w-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <span className="text-accent font-heading font-bold text-xl">{initials}</span>
                </div>
                <h3 className="font-heading font-semibold text-foreground">{name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Presentation;

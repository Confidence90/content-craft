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
  { icon: Globe, title: "Applications Web", desc: "Applications web performantes et évolutives adaptées à vos besoins métier." },
  { icon: Smartphone, title: "Applications Mobiles", desc: "Solutions mobiles natives et multiplateformes pour iOS et Android." },
  { icon: Monitor, title: "Création de Sites Web", desc: "Sites web modernes et responsifs qui convertissent les visiteurs en clients." },
  { icon: Server, title: "Infogérance", desc: "Gestion et supervision complètes de votre infrastructure informatique." },
  { icon: Shield, title: "Cybersécurité", desc: "Protégez votre entreprise avec des solutions de sécurité avancées." },
  { icon: Code, title: "Solutions Sur Mesure", desc: "Développement logiciel personnalisé pour relever vos défis uniques." },
];

const stats = [
  { value: "250+", label: "Projets Livrés", icon: Briefcase },
  { value: "120+", label: "Clients Satisfaits", icon: Users },
  { value: "15+", label: "Années d'Expérience", icon: Award },
  { value: "99%", label: "Satisfaction Client", icon: Star },
];

const testimonials = [
  { name: "Sophie Martin", role: "DG, FinVault", quote: "TechCorp a livré une plateforme exceptionnelle qui a transformé nos opérations. Leur souci du détail est remarquable." },
  { name: "Marc Dupont", role: "PDG, GreenLeaf", quote: "Travailler avec TechCorp a été un tournant. Ils ont compris notre vision et ont construit exactement ce dont nous avions besoin." },
  { name: "Aïcha Benali", role: "VP Ingénierie, CloudSync", quote: "L'expertise de l'équipe en architecture cloud nous a permis de passer de 1K à 1M d'utilisateurs sans difficulté." },
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
              Excellence Numérique
            </motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-tight mb-6">
              Nous Créons la Technologie qui{" "}
              <span className="text-gradient">Accélère votre Croissance</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-primary-foreground/70 mb-8 leading-relaxed max-w-lg">
              Des applications web à l'infrastructure IT complète, nous livrons des solutions numériques innovantes qui permettent à votre entreprise de prospérer.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <Button asChild variant="hero" size="xl">
                <Link to="/contact">
                  Demander un Devis
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="hero-outline" size="xl">
                <Link to="/services">Nos Services</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* À Propos */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-accent font-medium text-sm uppercase tracking-wider mb-3">À Propos</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Votre Partenaire de Confiance en Transformation Numérique
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Avec plus de 15 ans d'expérience, TechCorp est à la pointe de l'innovation numérique. Nous combinons expertise technique et réflexion stratégique pour livrer des solutions à fort impact.
              </p>
              <ul className="space-y-3 mb-8">
                {["Équipe de plus de 50 ingénieurs experts", "Méthodologie de développement Agile", "Support & maintenance 24h/24 7j/7", "Certification ISO 27001"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild>
                <Link to="/presentation">En Savoir Plus <ArrowRight className="h-4 w-4" /></Link>
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

      {/* Aperçu Services */}
      <section className="py-24 bg-secondary/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="text-accent font-medium text-sm uppercase tracking-wider mb-3">Ce Que Nous Faisons</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Des Services Qui Génèrent des Résultats
            </h2>
            <p className="text-muted-foreground">
              Des services numériques complets conçus pour accélérer la croissance de votre entreprise et optimiser vos opérations.
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
              <Link to="/services">Voir Tous les Services <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-24 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="text-accent font-medium text-sm uppercase tracking-wider mb-3">Témoignages</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Ce Que Disent Nos Clients
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
              Prêt à Transformer Votre Entreprise ?
            </h2>
            <p className="text-primary-foreground/60 mb-8 max-w-lg mx-auto">
              Discutons de la façon dont nos solutions peuvent vous aider à atteindre vos objectifs.
            </p>
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">Commencer Maintenant <ArrowRight className="h-5 w-5" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
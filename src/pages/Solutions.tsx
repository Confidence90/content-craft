import { motion } from "framer-motion";
import { Zap, BarChart3, Cloud, Lock, Layers, Cpu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const solutions = [
  { icon: Zap, title: "Transformation Numérique", desc: "Modernisez vos processus métier avec des solutions numériques de bout en bout qui augmentent l'efficacité et réduisent les coûts.", tag: "Stratégie" },
  { icon: BarChart3, title: "Intelligence d'Affaires", desc: "Transformez vos données en informations exploitables grâce à des tableaux de bord, analyses et outils de reporting personnalisés.", tag: "Analytique" },
  { icon: Cloud, title: "Solutions Cloud", desc: "Migrez, optimisez et gérez votre infrastructure cloud pour une performance et des économies maximales.", tag: "Infrastructure" },
  { icon: Lock, title: "Sécurité d'Entreprise", desc: "Des cadres de sécurité complets pour protéger vos données, applications et utilisateurs.", tag: "Sécurité" },
  { icon: Layers, title: "Développement SaaS", desc: "Créez et lancez des produits SaaS évolutifs avec une architecture moderne et des expériences utilisateur fluides.", tag: "Produit" },
  { icon: Cpu, title: "IA & Automatisation", desc: "Exploitez l'intelligence artificielle et l'automatisation pour optimiser les flux de travail et stimuler l'innovation.", tag: "Innovation" },
];

const Solutions = () => {
  return (
    <div>
      <section className="bg-hero py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <p className="text-accent font-medium text-sm uppercase tracking-wider mb-3">Solutions Numériques</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
              Des Solutions Pour Chaque Défi
            </h1>
            <p className="text-primary-foreground/60 text-lg">
              Des solutions numériques complètes conçues pour résoudre vos défis métier les plus complexes.
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
                    <Link to="/contact">En Savoir Plus <ArrowRight className="h-3.5 w-3.5" /></Link>
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
              Besoin d'une Solution Sur Mesure ?
            </h2>
            <p className="text-primary-foreground/60 mb-8 max-w-lg mx-auto">
              Laissez notre équipe d'experts concevoir une solution adaptée qui correspond parfaitement à vos besoins.
            </p>
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">Contactez-Nous <ArrowRight className="h-5 w-5" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
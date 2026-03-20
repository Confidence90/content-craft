import { motion } from "framer-motion";
import { Target, Eye, Users, Award, CheckCircle } from "lucide-react";

const team = [
  { name: "David Laurent", role: "PDG & Fondateur", initials: "DL" },
  { name: "Sophie Martin", role: "Directrice Technique", initials: "SM" },
  { name: "Alex Rivera", role: "Directeur Design", initials: "AR" },
  { name: "Emma Williams", role: "VP Ingénierie", initials: "EW" },
];

const Presentation = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-hero py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <p className="text-accent font-medium text-sm uppercase tracking-wider mb-3">Qui Sommes-Nous</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
              Notre Entreprise
            </h1>
            <p className="text-primary-foreground/60 text-lg">
              Pionniers de la transformation numérique depuis 2009. Nous allions innovation et fiabilité.
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
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Notre Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                Accompagner les entreprises de toutes tailles avec des solutions technologiques de pointe qui stimulent la croissance, l'efficacité et l'innovation. Nous croyons qu'une technologie de qualité doit être accessible, fiable et transformatrice.
              </p>
              <ul className="mt-6 space-y-3">
                {["Livrer une qualité exceptionnelle", "Favoriser des partenariats durables", "Générer des résultats mesurables"].map((item) => (
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
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Notre Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                Devenir le partenaire de référence en transformation numérique à l'échelle mondiale, reconnu pour nos solutions innovantes, notre service exceptionnel et notre engagement envers la réussite de nos clients.
              </p>
              <ul className="mt-6 space-y-3">
                {["Leader technologique mondial", "Approche axée sur l'innovation", "Avenir numérique durable"].map((item) => (
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

      {/* Valeurs */}
      <section className="py-24 bg-secondary/50">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-accent font-medium text-sm uppercase tracking-wider mb-3">Nos Valeurs</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Ce Qui Nous Guide</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "Excellence", desc: "Nous visons les plus hauts standards dans tout ce que nous faisons." },
              { icon: Users, title: "Collaboration", desc: "Nous croyons que les meilleures solutions naissent du travail d'équipe." },
              { icon: Target, title: "Innovation", desc: "Nous repoussons constamment les limites et explorons de nouvelles possibilités." },
              { icon: CheckCircle, title: "Intégrité", desc: "La transparence et l'honnêteté sont au cœur de nos relations." },
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

      {/* Équipe */}
      <section className="py-24 bg-background">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-accent font-medium text-sm uppercase tracking-wider mb-3">Notre Équipe</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Rencontrez Nos Experts</h2>
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
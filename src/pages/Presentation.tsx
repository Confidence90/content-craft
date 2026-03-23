import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import { useLanguage } from "@/hooks/useLanguage";
import { BlockRenderer, CardBlock, TeamMemberBlock } from "@/components/blocks/BlockRenderer";

const Presentation = () => {
  const { loading, getSection } = usePageContent("presentation");
  const { t, lang } = useLanguage();

  if (loading) return <div className="flex min-h-[50vh] items-center justify-center"><p className="text-muted-foreground">{lang === "en" ? "Loading..." : "Chargement..."}</p></div>;

  const hero = getSection("hero");
  const mission = getSection("mission");
  const vision = getSection("vision");
  const values = getSection("values");
  const team = getSection("team");

  return (
    <div>
      {hero && (
        <section className="bg-hero py-20">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
              <p className="text-accent font-medium text-sm uppercase tracking-wider mb-3">{lang === "en" ? "Who We Are" : "Qui Sommes-Nous"}</p>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">{t(hero.title_fr, hero.title_en)}</h1>
              <p className="text-primary-foreground/60 text-lg">{t(hero.subtitle_fr, hero.subtitle_en)}</p>
            </motion.div>
          </div>
        </section>
      )}

      {(mission || vision) && (
        <section className="py-24 bg-background">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8">
              {mission && (
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl p-10 shadow-card border border-border">
                  <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                    <Target className="h-7 w-7 text-accent" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-4">{t(mission.title_fr, mission.title_en)}</h2>
                  {mission.blocks.map((b, i) => <BlockRenderer key={b.id} block={b} index={i} />)}
                </motion.div>
              )}
              {vision && (
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl p-10 shadow-card border border-border">
                  <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                    <Eye className="h-7 w-7 text-accent" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-4">{t(vision.title_fr, vision.title_en)}</h2>
                  {vision.blocks.map((b, i) => <BlockRenderer key={b.id} block={b} index={i} />)}
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {values && values.blocks.length > 0 && (
        <section className="py-24 bg-secondary/50">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <p className="text-accent font-medium text-sm uppercase tracking-wider mb-3">{lang === "en" ? "Our Values" : "Nos Valeurs"}</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">{t(values.title_fr, values.title_en)}</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.blocks.filter(b => b.block_type === "card").map((b, i) => (
                <CardBlock key={b.id} block={b} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {team && team.blocks.length > 0 && (
        <section className="py-24 bg-background">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <p className="text-accent font-medium text-sm uppercase tracking-wider mb-3">{lang === "en" ? "Our Team" : "Notre Équipe"}</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">{t(team.title_fr, team.title_en)}</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.blocks.filter(b => b.block_type === "team_member").map((b, i) => (
                <TeamMemberBlock key={b.id} block={b} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Presentation;

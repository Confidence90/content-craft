import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { usePageContent } from "@/hooks/usePageContent";
import { useLanguage } from "@/hooks/useLanguage";
import { BlockRenderer, CardBlock } from "@/components/blocks/BlockRenderer";

const Solutions = () => {
  const { sections, loading, getSection } = usePageContent("solutions");
  const { t, lang } = useLanguage();

  if (loading) return <div className="flex min-h-[50vh] items-center justify-center"><p className="text-muted-foreground">{lang === "en" ? "Loading..." : "Chargement..."}</p></div>;

  const hero = getSection("hero");
  const grid = getSection("grid");
  const cta = getSection("cta");

  const knownKeys = ["hero", "grid", "cta"];
  const dynamicSections = sections.filter(s => !knownKeys.includes(s.section_key));

  return (
    <div>
      {hero && (
        <section className="bg-hero py-20">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
              <p className="text-accent font-medium text-sm uppercase tracking-wider mb-3">{lang === "en" ? "Digital Solutions" : "Solutions Numériques"}</p>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">{t(hero.title_fr, hero.title_en)}</h1>
              <p className="text-primary-foreground/60 text-lg">{t(hero.subtitle_fr, hero.subtitle_en)}</p>
            </motion.div>
          </div>
        </section>
      )}

      {grid && grid.blocks.length > 0 && (
        <section className="py-24 bg-background">
          <div className="container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {grid.blocks.filter(b => b.block_type === "card").map((b, i) => (
                <CardBlock key={b.id} block={b} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {cta && (
        <section className="py-24 bg-hero">
          <div className="container text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">{t(cta.title_fr, cta.title_en)}</h2>
              <p className="text-primary-foreground/60 mb-8 max-w-lg mx-auto">{t(cta.subtitle_fr, cta.subtitle_en)}</p>
              <Button asChild variant="hero" size="xl">
                <Link to="/contact">{lang === "en" ? "Contact Us" : "Contactez-Nous"} <ArrowRight className="h-5 w-5" /></Link>
              </Button>
            </motion.div>
          </div>
        </section>
      )}
      {/* Dynamic Sections */}
      {dynamicSections.map((section) => (
        <section key={section.id} className={`py-24 ${section.bg_variant === "dark" ? "bg-primary text-primary-foreground" : section.bg_variant === "accent" ? "bg-secondary/50" : "bg-background"}`}>
          <div className="container">
            {(section.title_fr || section.title_en) && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">{t(section.title_fr, section.title_en)}</h2>
                {(section.subtitle_fr || section.subtitle_en) && <p className="text-muted-foreground">{t(section.subtitle_fr, section.subtitle_en)}</p>}
              </motion.div>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.blocks.map((block, i) => (
                <motion.div key={block.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <BlockRenderer block={block} index={i} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Solutions;

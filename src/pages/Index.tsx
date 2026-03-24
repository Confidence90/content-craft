import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import { useLanguage } from "@/hooks/useLanguage";
import { BlockRenderer, StatBlock, TestimonialBlock } from "@/components/blocks/BlockRenderer";
import heroBg from "@/assets/hero-bg.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const Index = () => {
  const { sections, loading, getSection } = usePageContent("home");
  const { t, lang } = useLanguage();

  if (loading) return <div className="flex min-h-[50vh] items-center justify-center"><p className="text-muted-foreground">{lang === "en" ? "Loading..." : "Chargement..."}</p></div>;

  const hero = getSection("hero");
  const about = getSection("about");
  const servicesPrev = getSection("services_preview");
  const testimonials = getSection("testimonials");
  const cta = getSection("cta");

  const knownKeys = ["hero", "about", "services_preview", "testimonials", "cta"];
  const dynamicSections = sections.filter(s => !knownKeys.includes(s.section_key));

  const heroBadge = hero?.blocks.find(b => b.block_type === "text" && b.metadata?.variant === "badge");
  const heroCtas = hero?.blocks.filter(b => b.block_type === "cta") || [];
  const aboutStats = about?.blocks.filter(b => b.block_type === "stat") || [];
  const aboutText = about?.blocks.find(b => b.block_type === "text");
  const aboutFeatures = about?.blocks.find(b => b.block_type === "feature_list");
  const testimonialBlocks = testimonials?.blocks.filter(b => b.block_type === "testimonial") || [];

  return (
    <div>
      {/* Hero */}
      {hero && (
        <section className="relative min-h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={hero.blocks.find(b => b.block_type === "image")?.media_url || heroBg} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/70" />
          </div>
          <div className="container relative z-10 py-20">
            <motion.div initial="hidden" animate="visible" className="max-w-2xl">
              {heroBadge && <motion.p variants={fadeUp} custom={0} className="text-accent font-medium mb-4 tracking-wider text-sm uppercase">{t(heroBadge.content_fr, heroBadge.content_en)}</motion.p>}
              <motion.h1 variants={fadeUp} custom={1} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-tight mb-6">
                {t(hero.title_fr, hero.title_en)}
              </motion.h1>
              <motion.p variants={fadeUp} custom={2} className="text-lg text-primary-foreground/70 mb-8 leading-relaxed max-w-lg">
                {t(hero.subtitle_fr, hero.subtitle_en)}
              </motion.p>
              <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
                {heroCtas.map((b) => <BlockRenderer key={b.id} block={b} />)}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* About */}
      {about && (
        <section className="py-24 bg-background">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <p className="text-accent font-medium text-sm uppercase tracking-wider mb-3">{lang === "en" ? "About" : "À Propos"}</p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">{t(about.title_fr, about.title_en)}</h2>
                {aboutText && <p className="text-muted-foreground leading-relaxed mb-6">{t(aboutText.content_fr, aboutText.content_en)}</p>}
                {aboutFeatures && <BlockRenderer block={aboutFeatures} />}
                <Button asChild>
                  <Link to="/presentation">{lang === "en" ? "Learn More" : "En Savoir Plus"} <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-card rounded-2xl shadow-elevated p-8 border border-border">
                <div className="grid grid-cols-2 gap-6">
                  {aboutStats.map((b) => <StatBlock key={b.id} block={b} />)}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Services Preview */}
      {servicesPrev && (
        <section className="py-24 bg-secondary/50">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-accent font-medium text-sm uppercase tracking-wider mb-3">{lang === "en" ? "What We Do" : "Ce Que Nous Faisons"}</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">{t(servicesPrev.title_fr, servicesPrev.title_en)}</h2>
              {servicesPrev.subtitle_fr && <p className="text-muted-foreground">{t(servicesPrev.subtitle_fr, servicesPrev.subtitle_en)}</p>}
            </motion.div>
            {/* Services are still from the services table */}
            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg">
                <Link to="/services">{lang === "en" ? "View All Services" : "Voir Tous les Services"} <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials && testimonialBlocks.length > 0 && (
        <section className="py-24 bg-background">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-accent font-medium text-sm uppercase tracking-wider mb-3">{lang === "en" ? "Testimonials" : "Témoignages"}</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">{t(testimonials.title_fr, testimonials.title_en)}</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonialBlocks.map((b, i) => (
                <motion.div key={b.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <TestimonialBlock block={b} index={i} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      {cta && (
        <section className="py-24 bg-hero">
          <div className="container text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">{t(cta.title_fr, cta.title_en)}</h2>
              <p className="text-primary-foreground/60 mb-8 max-w-lg mx-auto">{t(cta.subtitle_fr, cta.subtitle_en)}</p>
              <Button asChild variant="hero" size="xl">
                <Link to="/contact">{lang === "en" ? "Get Started" : "Commencer Maintenant"} <ArrowRight className="h-5 w-5" /></Link>
              </Button>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;

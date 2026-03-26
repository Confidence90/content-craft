import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import api from "@/services/api";
import { usePageContent } from "@/hooks/usePageContent";
import { useLanguage } from "@/hooks/useLanguage";

interface Service {
  id: string;
  nom: string;
  description: string | null;
  image: string | null;
  prix: number | null;
  duree: string | null;
  technologie: string | null;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [svcLoading, setSvcLoading] = useState(true);
  const { loading: pageLoading, getSection } = usePageContent("services");
  const { lang } = useLanguage();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await api.get("/services");
        setServices((data.services || data || []) as Service[]);
      } catch {
        setServices([]);
      } finally {
        setSvcLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div>
      <section className="bg-hero py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <p className="text-accent font-medium text-sm uppercase tracking-wider mb-3">{lang === "en" ? "Our Expertise" : "Notre Expertise"}</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">Services & Solutions</h1>
            <p className="text-primary-foreground/60 text-lg">{lang === "en" ? "End-to-end digital services designed to transform your business." : "Des services numériques de bout en bout conçus pour transformer votre entreprise."}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container space-y-8">
          {svcLoading ? (
            <div className="text-center py-12 text-muted-foreground">{lang === "en" ? "Loading services..." : "Chargement des services..."}</div>
          ) : (
            services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl p-8 md:p-10 shadow-card border border-border hover:shadow-elevated transition-all duration-300 scroll-mt-24"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {service.image ? (
                    <img src={service.image} alt={service.nom} className="h-16 w-16 rounded-2xl object-cover shrink-0" />
                  ) : (
                    <div className="h-16 w-16 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Code className="h-8 w-8 text-accent" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className="text-2xl font-heading font-bold text-foreground mb-3">{service.nom}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-6">
                      {service.technologie && <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium">{service.technologie}</span>}
                      {service.duree && <span className="bg-muted px-3 py-1 rounded-full text-xs">{service.duree}</span>}
                      {service.prix && <span className="bg-muted px-3 py-1 rounded-full text-xs">{service.prix} €</span>}
                    </div>
                    <Button asChild size="sm" variant="outline">
                      <Link to="/contact">{lang === "en" ? "Request a Quote" : "Demander un Devis"} <ArrowRight className="h-3.5 w-3.5" /></Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Services;

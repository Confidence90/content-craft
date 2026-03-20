import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Globe, Smartphone, Monitor, Server, Shield, Code, Zap, BarChart3, Cloud, Lock, Layers, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe, Smartphone, Monitor, Server, Shield, Code, Zap, BarChart3, Cloud, Lock, Layers, Cpu,
};

interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  category: string | null;
  features: string[] | null;
  sort_order: number | null;
  is_active: boolean | null;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase.from("services").select("*").eq("is_active", true).order("sort_order");
      setServices((data as Service[]) ?? []);
      setLoading(false);
    };
    fetchServices();
  }, []);

  return (
    <div>
      <section className="bg-hero py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <p className="text-accent font-medium text-sm uppercase tracking-wider mb-3">Notre Expertise</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">Services & Solutions</h1>
            <p className="text-primary-foreground/60 text-lg">Des services numériques de bout en bout conçus pour transformer votre entreprise et accélérer votre croissance.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container space-y-8">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Chargement des services...</div>
          ) : (
            services.map((service, i) => {
              const Icon = iconMap[service.icon ?? "Code"] ?? Code;
              return (
                <motion.div
                  key={service.id}
                  id={service.category ?? undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-2xl p-8 md:p-10 shadow-card border border-border hover:shadow-elevated transition-all duration-300 scroll-mt-24"
                >
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="h-16 w-16 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Icon className="h-8 w-8 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-heading font-bold text-foreground mb-3">{service.title}</h2>
                      <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                      {service.features && service.features.length > 0 && (
                        <div className="grid sm:grid-cols-2 gap-3 mb-6">
                          {service.features.map((f) => (
                            <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                              {f}
                            </div>
                          ))}
                        </div>
                      )}
                      <Button asChild size="sm" variant="outline">
                        <Link to="/contact">Demander un Devis <ArrowRight className="h-3.5 w-3.5" /></Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};

export default Services;
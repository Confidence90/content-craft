import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { temoignageService } from "@/services/temoignage.service";
import { useQuery } from "@tanstack/react-query";

const Temoignages = () => {
  const { lang } = useLanguage();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ poste: "", message: "" });

  const { data: publicData, isLoading } = useQuery({
    queryKey: ["temoignages-public"],
    queryFn: () => temoignageService.getPublic().then(r => r.data),
  });

  // getPublic retourne { success, data } ou tableau direct selon votre backend
  const temoignages = Array.isArray(publicData)
    ? publicData
    : (publicData as any)?.data ?? [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.poste || !form.message) {
      toast({ title: "Poste et message requis", variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      await temoignageService.create({ poste: form.poste, message: form.message });
      setSubmitted(true);
      toast({ title: lang === "en" ? "Thank you!" : "Merci pour votre témoignage !" });
    } catch {
      toast({ title: lang === "en" ? "Error sending" : "Erreur lors de l'envoi", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-hero py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <p className="text-accent font-medium text-sm uppercase tracking-wider mb-3">
              {lang === "en" ? "Testimonials" : "Témoignages"}
            </p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
              {lang === "en" ? "What Our Clients Say" : "Ce que disent nos clients"}
            </h1>
            <p className="text-primary-foreground/60 text-lg">
              {lang === "en"
                ? "Real experiences from our satisfied clients."
                : "Des expériences réelles de nos clients satisfaits."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Liste des témoignages validés */}
      <section className="py-24 bg-background">
        <div className="container">
          {isLoading ? (
            <div className="text-center text-muted-foreground py-12">Chargement...</div>
          ) : temoignages.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              <p>{lang === "en" ? "No testimonials yet." : "Aucun témoignage pour le moment."}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {temoignages.map((t: any, i: number) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-card rounded-2xl p-8 shadow-card border border-border"
                >
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className="h-4 w-4 text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">"{t.message}"</p>
                  <div className="flex items-center gap-3">
                    {t.photo ? (
                      <img src={t.photo} alt={t.poste} className="h-10 w-10 rounded-full object-cover" />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <span className="text-accent font-bold text-sm">
                          {t.poste?.charAt(0)?.toUpperCase() ?? "?"}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-foreground">{t.poste}</p>
                      {t.service && (
                        <p className="text-xs text-muted-foreground">{t.service.nom}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Formulaire de soumission */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl p-8 md:p-10 shadow-card border border-border">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                    {lang === "en" ? "Thank you!" : "Merci !"}
                  </h3>
                  <p className="text-muted-foreground">
                    {lang === "en"
                      ? "Your testimonial has been submitted and is pending approval."
                      : "Votre témoignage a été soumis et est en attente de validation."}
                  </p>
                  <Button
                    className="mt-6" variant="outline"
                    onClick={() => { setSubmitted(false); setForm({ poste: "", message: "" }); }}
                  >
                    {lang === "en" ? "Submit another" : "Soumettre un autre"}
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                    {lang === "en" ? "Share Your Experience" : "Partagez Votre Expérience"}
                  </h2>
                  <p className="text-muted-foreground text-sm mb-6">
                    {lang === "en"
                      ? "Your testimonial will be reviewed before publication."
                      : "Votre témoignage sera examiné avant publication."}
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        {lang === "en" ? "Your role / position *" : "Votre poste / rôle *"}
                      </label>
                      <Input
                        placeholder={lang === "en" ? "Ex: CEO, Developer, Designer..." : "Ex: PDG, Développeur, Designer..."}
                        value={form.poste}
                        onChange={e => setForm(p => ({ ...p, poste: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        {lang === "en" ? "Your testimonial *" : "Votre témoignage *"}
                      </label>
                      <Textarea
                        placeholder={lang === "en"
                          ? "Share your experience working with us..."
                          : "Partagez votre expérience avec nous..."}
                        value={form.message}
                        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                        rows={5}
                        required
                      />
                    </div>
                    <Button type="submit" disabled={sending} className="w-full sm:w-auto">
                      <Send className="h-4 w-4" />
                      {sending
                        ? (lang === "en" ? "Sending..." : "Envoi en cours...")
                        : (lang === "en" ? "Submit Testimonial" : "Envoyer le Témoignage")}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Temoignages;
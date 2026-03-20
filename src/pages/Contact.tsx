import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    company: "", name: "", position: "", email: "", phone: "", address: "", subject: "", message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: "Veuillez remplir les champs obligatoires", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("contact_messages").insert({
      company: formData.company || null,
      name: formData.name,
      position: formData.position || null,
      email: formData.email,
      phone: formData.phone || null,
      address: formData.address || null,
      subject: formData.subject || null,
      message: formData.message,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Erreur lors de l'envoi", description: "Veuillez réessayer.", variant: "destructive" });
      return;
    }
    toast({ title: "Message envoyé !", description: "Nous vous répondrons dans les 24 heures." });
    setFormData({ company: "", name: "", position: "", email: "", phone: "", address: "", subject: "", message: "" });
  };

  return (
    <div>
      <section className="bg-hero py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <p className="text-accent font-medium text-sm uppercase tracking-wider mb-3">Contactez-Nous</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">Nous Contacter</h1>
            <p className="text-primary-foreground/60 text-lg">Vous avez un projet en tête ? Discutons de la façon dont nous pouvons donner vie à votre vision.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-8 md:p-10 shadow-card border border-border">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Envoyez-Nous un Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div><label className="text-sm font-medium text-foreground mb-1.5 block">Entreprise</label><Input name="company" value={formData.company} onChange={handleChange} placeholder="Votre entreprise" /></div>
                    <div><label className="text-sm font-medium text-foreground mb-1.5 block">Nom *</label><Input name="name" value={formData.name} onChange={handleChange} placeholder="Votre nom" required /></div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div><label className="text-sm font-medium text-foreground mb-1.5 block">Poste</label><Input name="position" value={formData.position} onChange={handleChange} placeholder="Votre poste" /></div>
                    <div><label className="text-sm font-medium text-foreground mb-1.5 block">Email *</label><Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="votre@email.com" required /></div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div><label className="text-sm font-medium text-foreground mb-1.5 block">Téléphone</label><Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+33 1 23 45 67 89" /></div>
                    <div><label className="text-sm font-medium text-foreground mb-1.5 block">Adresse</label><Input name="address" value={formData.address} onChange={handleChange} placeholder="Votre adresse" /></div>
                  </div>
                  <div><label className="text-sm font-medium text-foreground mb-1.5 block">Sujet</label><Input name="subject" value={formData.subject} onChange={handleChange} placeholder="Comment pouvons-nous vous aider ?" /></div>
                  <div><label className="text-sm font-medium text-foreground mb-1.5 block">Message *</label><Textarea name="message" value={formData.message} onChange={handleChange} placeholder="Parlez-nous de votre projet..." rows={5} required /></div>
                  <Button type="submit" variant="hero" size="lg" className="w-full sm:w-auto" disabled={submitting}>
                    <Send className="h-4 w-4" />
                    {submitting ? "Envoi en cours..." : "Envoyer le Message"}
                  </Button>
                </form>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
              <div className="bg-card rounded-2xl p-8 shadow-card border border-border space-y-6">
                <h3 className="font-heading font-semibold text-lg text-foreground">Coordonnées</h3>
                <div className="space-y-5">
                  {[
                    { icon: Phone, label: "Téléphone", value: "+33 1 23 45 67 89" },
                    { icon: Mail, label: "Email", value: "contact@techcorp.com" },
                    { icon: MapPin, label: "Adresse", value: "123 Boulevard de l'Innovation, 75001 Paris, France" },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{label}</p>
                        <p className="text-sm text-muted-foreground">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card rounded-2xl overflow-hidden shadow-card border border-border">
                <iframe
                  title="Localisation du Bureau"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615509614!3d48.85837360866272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
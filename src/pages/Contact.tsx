import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { usePageContent } from "@/hooks/usePageContent";
import { useLanguage } from "@/hooks/useLanguage";
import { ContactInfoBlock } from "@/components/blocks/BlockRenderer";
import { useCreateContact } from "@/hooks/useContacts";

const Contact = () => {
  const { toast } = useToast();
  const { getSection } = usePageContent("contact");
  const { t, lang } = useLanguage();
  const { mutateAsync: createContact, isPending } = useCreateContact();

  const [formData, setFormData] = useState({
    nom_complet: "",
    societe: "",
    fonction: "",
    email: "",
    telephone: "",
    objet: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createContact(formData);
      toast({ title: "Message envoyé !" });
      setFormData({ nom_complet: "", societe: "", fonction: "", email: "", telephone: "", objet: "", message: "" });
    } catch {
      toast({ title: "Erreur lors de l'envoi", variant: "destructive" });
    }
  };

  const hero = getSection("hero");
  const info = getSection("info");
  const contactBlocks = info?.blocks.filter((b) => b.block_type === "contact_info") || [];

  const labels = {
    societe: lang === "en" ? "Company" : "Entreprise",
    nom_complet: lang === "en" ? "Name *" : "Nom complet *",
    fonction: lang === "en" ? "Position" : "Poste",
    email: "Email *",
    telephone: lang === "en" ? "Phone" : "Téléphone",
    objet: lang === "en" ? "Subject" : "Sujet",
    message: "Message *",
    send: isPending
      ? lang === "en" ? "Sending..." : "Envoi en cours..."
      : lang === "en" ? "Send Message" : "Envoyer le Message",
    formTitle: lang === "en" ? "Send Us a Message" : "Envoyez-Nous un Message",
    infoTitle: lang === "en" ? "Contact Information" : "Coordonnées",
  };

  return (
    <div>
      {hero && (
        <section className="bg-hero py-20">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
              <p className="text-accent font-medium text-sm uppercase tracking-wider mb-3">
                {lang === "en" ? "Contact Us" : "Contactez-Nous"}
              </p>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
                {t(hero.title_fr, hero.title_en)}
              </h1>
              <p className="text-primary-foreground/60 text-lg">{t(hero.subtitle_fr, hero.subtitle_en)}</p>
            </motion.div>
          </div>
        </section>
      )}

      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-card rounded-2xl p-8 md:p-10 shadow-card border border-border">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">{labels.formTitle}</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">{labels.societe}</label>
                      <Input name="societe" value={formData.societe} onChange={handleChange} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">{labels.nom_complet}</label>
                      <Input name="nom_complet" value={formData.nom_complet} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">{labels.fonction}</label>
                      <Input name="fonction" value={formData.fonction} onChange={handleChange} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">{labels.email}</label>
                      <Input name="email" type="email" value={formData.email} onChange={handleChange} required />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">{labels.telephone}</label>
                    <Input name="telephone" value={formData.telephone} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">{labels.objet}</label>
                    <Input name="objet" value={formData.objet} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">{labels.message}</label>
                    <Textarea name="message" value={formData.message} onChange={handleChange} rows={5} required />
                  </div>
                  <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isPending}>
                    <Send className="h-4 w-4" /> {labels.send}
                  </Button>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-card rounded-2xl p-8 shadow-card border border-border space-y-6">
                <h3 className="font-heading font-semibold text-lg text-foreground">{labels.infoTitle}</h3>
                <div className="space-y-5">
                  {contactBlocks.map((b) => <ContactInfoBlock key={b.id} block={b} />)}
                </div>
              </div>
              <div className="bg-card rounded-2xl overflow-hidden shadow-card border border-border">
                <iframe
                  title="Map"
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
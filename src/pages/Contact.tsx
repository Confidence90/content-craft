import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    position: "",
    email: "",
    phone: "",
    address: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: "Please fill in required fields", variant: "destructive" });
      return;
    }
    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    setFormData({ company: "", name: "", position: "", email: "", phone: "", address: "", subject: "", message: "" });
  };

  return (
    <div>
      <section className="bg-hero py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <p className="text-accent font-medium text-sm uppercase tracking-wider mb-3">Get in Touch</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
              Contact Us
            </h1>
            <p className="text-primary-foreground/60 text-lg">
              Have a project in mind? Let's discuss how we can help bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-card rounded-2xl p-8 md:p-10 shadow-card border border-border">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Company</label>
                      <Input name="company" value={formData.company} onChange={handleChange} placeholder="Your company" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Name *</label>
                      <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Position</label>
                      <Input name="position" value={formData.position} onChange={handleChange} placeholder="Your position" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Email *</label>
                      <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                      <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (234) 567-890" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Address</label>
                      <Input name="address" value={formData.address} onChange={handleChange} placeholder="Your address" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Subject</label>
                    <Input name="subject" value={formData.subject} onChange={handleChange} placeholder="How can we help?" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Message *</label>
                    <Textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your project..." rows={5} required />
                  </div>
                  <Button type="submit" variant="hero" size="lg" className="w-full sm:w-auto">
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Sidebar info + map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-card rounded-2xl p-8 shadow-card border border-border space-y-6">
                <h3 className="font-heading font-semibold text-lg text-foreground">Contact Information</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Phone</p>
                      <p className="text-sm text-muted-foreground">+1 (234) 567-890</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Email</p>
                      <p className="text-sm text-muted-foreground">contact@techcorp.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Address</p>
                      <p className="text-sm text-muted-foreground">123 Innovation Blvd, Tech City, TC 10001</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-card rounded-2xl overflow-hidden shadow-card border border-border">
                <iframe
                  title="Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2799160891!2d-74.25987368715491!3d40.69767006458873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1"
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

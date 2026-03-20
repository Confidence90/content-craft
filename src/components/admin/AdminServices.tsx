import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, Trash2, Edit2, GripVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

const ICONS = ["Globe", "Smartphone", "Monitor", "Server", "Shield", "Code", "Zap", "BarChart3", "Cloud", "Lock", "Layers", "Cpu"];

const AdminServices = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newService, setNewService] = useState({ title: "", description: "", icon: "Code", category: "", features: "" });

  const fetchServices = async () => {
    const { data } = await supabase.from("services").select("*").order("sort_order");
    setServices((data as Service[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchServices(); }, []);

  const handleAdd = async () => {
    if (!newService.title) { toast({ title: "Le titre est requis", variant: "destructive" }); return; }
    const { error } = await supabase.from("services").insert({
      title: newService.title,
      description: newService.description,
      icon: newService.icon,
      category: newService.category,
      features: newService.features.split(",").map((f) => f.trim()).filter(Boolean),
      sort_order: services.length + 1,
    });
    if (error) { toast({ title: "Erreur", variant: "destructive" }); return; }
    toast({ title: "Service ajouté" });
    setShowAdd(false);
    setNewService({ title: "", description: "", icon: "Code", category: "", features: "" });
    fetchServices();
  };

  const handleSave = async (service: Service) => {
    const { error } = await supabase.from("services").update({
      title: service.title,
      description: service.description,
      icon: service.icon,
      category: service.category,
      features: service.features,
      is_active: service.is_active,
    }).eq("id", service.id);
    if (error) { toast({ title: "Erreur lors de la sauvegarde", variant: "destructive" }); return; }
    toast({ title: "Service mis à jour" });
    setEditingId(null);
    fetchServices();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("services").delete().eq("id", id);
    toast({ title: "Service supprimé" });
    fetchServices();
  };

  const toggleActive = async (service: Service) => {
    await supabase.from("services").update({ is_active: !service.is_active }).eq("id", service.id);
    fetchServices();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-foreground">Services</h1>
        <Button size="sm" onClick={() => setShowAdd(true)}>
          <Plus className="h-4 w-4" /> Ajouter un Service
        </Button>
      </div>

      {showAdd && (
        <div className="bg-card rounded-xl p-6 shadow-card border border-border mb-6 space-y-4">
          <h3 className="font-heading font-semibold text-foreground">Nouveau Service</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input placeholder="Titre du service" value={newService.title} onChange={(e) => setNewService({ ...newService, title: e.target.value })} />
            <Input placeholder="Catégorie" value={newService.category} onChange={(e) => setNewService({ ...newService, category: e.target.value })} />
          </div>
          <Textarea placeholder="Description" value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} />
          <div className="grid sm:grid-cols-2 gap-4">
            <select className="rounded-lg border border-input bg-background px-3 py-2 text-sm" value={newService.icon} onChange={(e) => setNewService({ ...newService, icon: e.target.value })}>
              {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
            <Input placeholder="Fonctionnalités (séparées par des virgules)" value={newService.features} onChange={(e) => setNewService({ ...newService, features: e.target.value })} />
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleAdd}><Save className="h-4 w-4" /> Enregistrer</Button>
            <Button size="sm" variant="ghost" onClick={() => setShowAdd(false)}>Annuler</Button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-muted-foreground">Chargement...</p>
      ) : (
        <div className="space-y-3">
          {services.map((service) => (
            <div key={service.id} className={`bg-card rounded-xl p-5 shadow-card border border-border ${!service.is_active ? "opacity-50" : ""}`}>
              {editingId === service.id ? (
                <div className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Input value={service.title} onChange={(e) => setServices(services.map((s) => s.id === service.id ? { ...s, title: e.target.value } : s))} />
                    <Input value={service.category ?? ""} onChange={(e) => setServices(services.map((s) => s.id === service.id ? { ...s, category: e.target.value } : s))} />
                  </div>
                  <Textarea value={service.description ?? ""} onChange={(e) => setServices(services.map((s) => s.id === service.id ? { ...s, description: e.target.value } : s))} />
                  <div className="grid sm:grid-cols-2 gap-3">
                    <select className="rounded-lg border border-input bg-background px-3 py-2 text-sm" value={service.icon ?? "Code"} onChange={(e) => setServices(services.map((s) => s.id === service.id ? { ...s, icon: e.target.value } : s))}>
                      {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
                    </select>
                    <Input value={(service.features ?? []).join(", ")} onChange={(e) => setServices(services.map((s) => s.id === service.id ? { ...s, features: e.target.value.split(",").map((f) => f.trim()) } : s))} placeholder="Fonctionnalités (séparées par des virgules)" />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleSave(service)}><Save className="h-4 w-4" /> Enregistrer</Button>
                    <Button size="sm" variant="ghost" onClick={() => { setEditingId(null); fetchServices(); }}>Annuler</Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-heading font-semibold text-foreground">{service.title}</span>
                      <span className="text-xs text-muted-foreground">({service.icon})</span>
                      {service.category && <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded">{service.category}</span>}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{service.description}</p>
                    {service.features && service.features.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {service.features.map((f) => (
                          <span key={f} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">{f}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button size="icon" variant="ghost" onClick={() => toggleActive(service)}>
                      {service.is_active ? "🟢" : "🔴"}
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => setEditingId(service.id)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDelete(service.id)} className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminServices;
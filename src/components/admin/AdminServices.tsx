import { useEffect, useState } from "react";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, Trash2, Edit2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "@/components/admin/ImageUpload";

interface Service {
  id: string;
  nom: string;
  description: string | null;
  image: string | null;
  prix: number | null;
  duree: string | null;
  technologie: string | null;
  sort_order?: number | null;
  is_active?: boolean | null;
}

const AdminServices = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newService, setNewService] = useState({ nom: "", description: "", image: "", prix: "", duree: "", technologie: "" });

  const fetchServices = async () => {
    try {
      const { data } = await api.get("/services");
      setServices((data.services || data || []) as Service[]);
    } catch {
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const handleAdd = async () => {
    if (!newService.nom) { toast({ title: "Le nom est requis", variant: "destructive" }); return; }
    try {
      await api.post("/services", {
        nom: newService.nom,
        description: newService.description,
        image: newService.image || null,
        prix: newService.prix ? parseFloat(newService.prix) : null,
        duree: newService.duree || null,
        technologie: newService.technologie || null,
      });
      toast({ title: "Service ajouté" });
      setShowAdd(false);
      setNewService({ nom: "", description: "", image: "", prix: "", duree: "", technologie: "" });
      fetchServices();
    } catch {
      toast({ title: "Erreur", variant: "destructive" });
    }
  };

  const handleSave = async (service: Service) => {
    try {
      await api.put(`/services/${service.id}`, {
        nom: service.nom,
        description: service.description,
        image: service.image,
        technologie: service.technologie,
      });
      toast({ title: "Service mis à jour" });
      setEditingId(null);
      fetchServices();
    } catch {
      toast({ title: "Erreur lors de la sauvegarde", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/services/${id}`);
      toast({ title: "Service supprimé" });
      fetchServices();
    } catch {
      toast({ title: "Erreur", variant: "destructive" });
    }
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
            <Input placeholder="Nom du service" value={newService.nom} onChange={(e) => setNewService({ ...newService, nom: e.target.value })} />
            <Input placeholder="Technologie" value={newService.technologie} onChange={(e) => setNewService({ ...newService, technologie: e.target.value })} />
          </div>
          <Textarea placeholder="Description" value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input placeholder="Prix" type="number" value={newService.prix} onChange={(e) => setNewService({ ...newService, prix: e.target.value })} />
            <Input placeholder="Durée" value={newService.duree} onChange={(e) => setNewService({ ...newService, duree: e.target.value })} />
          </div>
          <ImageUpload
            value={newService.image}
            onChange={(url) => setNewService({ ...newService, image: url })}
            folder="services"
            label="Image du service"
          />
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
            <div key={service.id} className="bg-card rounded-xl p-5 shadow-card border border-border">
              {editingId === service.id ? (
                <div className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Input value={service.nom} onChange={(e) => setServices(services.map((s) => s.id === service.id ? { ...s, nom: e.target.value } : s))} />
                    <Input value={service.technologie ?? ""} onChange={(e) => setServices(services.map((s) => s.id === service.id ? { ...s, technologie: e.target.value } : s))} />
                  </div>
                  <Textarea value={service.description ?? ""} onChange={(e) => setServices(services.map((s) => s.id === service.id ? { ...s, description: e.target.value } : s))} />
                  <ImageUpload
                    value={service.image ?? ""}
                    onChange={(url) => setServices(services.map((s) => s.id === service.id ? { ...s, image: url } : s))}
                    folder="services"
                    label="Image"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleSave(service)}><Save className="h-4 w-4" /> Enregistrer</Button>
                    <Button size="sm" variant="ghost" onClick={() => { setEditingId(null); fetchServices(); }}>Annuler</Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-heading font-semibold text-foreground">{service.nom}</span>
                      {service.technologie && <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded">{service.technologie}</span>}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{service.description}</p>
                    {service.image && <img src={service.image} alt={service.nom} className="h-16 w-24 object-cover rounded mt-2" />}
                  </div>
                  <div className="flex gap-1 shrink-0">
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

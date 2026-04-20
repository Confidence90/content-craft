import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, Trash2, Edit2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useServices, useCreateService, useUpdateService, useDeleteService } from "@/hooks/useServices";
import type { Service } from "@/services/service.service";

const ICONS = ["Globe", "Smartphone", "Monitor", "Server", "Shield", "Code", "Zap", "BarChart3", "Cloud", "Lock", "Layers", "Cpu"];

const AdminServices = () => {
  const { toast } = useToast();
  const { data: services = [], isLoading } = useServices();
  const { mutateAsync: createService } = useCreateService();
  const { mutateAsync: updateService } = useUpdateService();
  const { mutateAsync: deleteService } = useDeleteService();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Service>>({});
  const [showAdd, setShowAdd] = useState(false);
  const [newService, setNewService] = useState({ nom: "", description: "", technologie: "", prix: "", duree: "" });

  const handleAdd = async () => {
    if (!newService.nom) { toast({ title: "Le nom est requis", variant: "destructive" }); return; }
    try {
      await createService({
        nom: newService.nom,
        description: newService.description,
        technologie: newService.technologie,
        prix: newService.prix ? parseFloat(newService.prix) : undefined,
        duree: newService.duree ? parseInt(newService.duree) : undefined,
      });
      toast({ title: "Service ajouté" });
      setShowAdd(false);
      setNewService({ nom: "", description: "", technologie: "", prix: "", duree: "" });
    } catch {
      toast({ title: "Erreur lors de l'ajout", variant: "destructive" });
    }
  };

  const startEdit = (service: Service) => {
    setEditingId(service.id);
    setEditForm({ ...service });
  };

  const handleSave = async () => {
    if (!editingId) return;
    try {
      await updateService({ id: editingId, body: editForm });
      toast({ title: "Service mis à jour" });
      setEditingId(null);
    } catch {
      toast({ title: "Erreur lors de la mise à jour", variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteService(id);
      toast({ title: "Service supprimé" });
    } catch {
      toast({ title: "Erreur lors de la suppression", variant: "destructive" });
    }
  };

  if (isLoading) return <div className="text-muted-foreground py-8 text-center">Chargement...</div>;

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
            <Input placeholder="Nom du service *" value={newService.nom} onChange={(e) => setNewService({ ...newService, nom: e.target.value })} />
            <Input placeholder="Technologies (séparées par des virgules)" value={newService.technologie} onChange={(e) => setNewService({ ...newService, technologie: e.target.value })} />
          </div>
          <Textarea placeholder="Description" value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input placeholder="Prix (optionnel)" type="number" value={newService.prix} onChange={(e) => setNewService({ ...newService, prix: e.target.value })} />
            <Input placeholder="Durée en jours (optionnel)" type="number" value={newService.duree} onChange={(e) => setNewService({ ...newService, duree: e.target.value })} />
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleAdd}><Save className="h-4 w-4" /> Enregistrer</Button>
            <Button size="sm" variant="ghost" onClick={() => setShowAdd(false)}>Annuler</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {services.map((service) => (
          <div key={service.id} className="bg-card rounded-xl p-5 shadow-card border border-border">
            {editingId === service.id ? (
              <div className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input value={editForm.nom ?? ""} onChange={(e) => setEditForm({ ...editForm, nom: e.target.value })} placeholder="Nom" />
                  <Input value={editForm.technologie ?? ""} onChange={(e) => setEditForm({ ...editForm, technologie: e.target.value })} placeholder="Technologies" />
                </div>
                <Textarea value={editForm.description ?? ""} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} placeholder="Description" />
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input type="number" value={editForm.prix ?? ""} onChange={(e) => setEditForm({ ...editForm, prix: parseFloat(e.target.value) })} placeholder="Prix" />
                  <Input type="number" value={editForm.duree ?? ""} onChange={(e) => setEditForm({ ...editForm, duree: parseInt(e.target.value) })} placeholder="Durée (jours)" />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSave}><Save className="h-4 w-4" /> Enregistrer</Button>
                  <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>Annuler</Button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-heading font-semibold text-foreground">{service.nom}</span>
                    {service.prix && <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded">{service.prix} €</span>}
                    {service.duree && <span className="text-xs text-muted-foreground">{service.duree}j</span>}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{service.description}</p>
                  {service.technologie && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {service.technologie.split(",").map((t) => (
                        <span key={t} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">{t.trim()}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button size="icon" variant="ghost" onClick={() => startEdit(service)}>
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

        {services.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>Aucun service. Cliquez sur « Ajouter un Service » pour commencer.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminServices;
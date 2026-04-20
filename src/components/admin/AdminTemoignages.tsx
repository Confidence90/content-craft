import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { temoignageService } from "@/services/temoignage.service";
import { Check, X, Trash2, Clock, Eye } from "lucide-react";

const statusConfig = {
  EN_ATTENTE: { label: "En attente",  color: "bg-orange-100 text-orange-800", icon: Clock },
  VALIDER:    { label: "Validé",      color: "bg-green-100 text-green-800",   icon: Check },
  REJETTER:   { label: "Rejeté",      color: "bg-red-100 text-red-800",       icon: X },
};

const AdminTemoignages = () => {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [filter, setFilter] = useState<"tous" | "EN_ATTENTE" | "VALIDER" | "REJETTER">("tous");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["temoignages-admin"],
    queryFn: () => temoignageService.getAll().then(r => r.data),
  });

  const temoignages = Array.isArray(data) ? data : (data as any)?.data ?? [];

  const filtered = filter === "tous"
    ? temoignages
    : temoignages.filter((t: any) => t.statut === filter);

  const selected = temoignages.find((t: any) => t.id === selectedId);

  const { mutateAsync: valider }   = useMutation({ mutationFn: temoignageService.valider,  onSuccess: () => { qc.invalidateQueries({ queryKey: ["temoignages-admin"] }); qc.invalidateQueries({ queryKey: ["temoignages-public"] }); } });
  const { mutateAsync: refuser }   = useMutation({ mutationFn: temoignageService.refuser,  onSuccess: () => qc.invalidateQueries({ queryKey: ["temoignages-admin"] }) });
  const { mutateAsync: supprimer } = useMutation({ mutationFn: temoignageService.delete,   onSuccess: () => { qc.invalidateQueries({ queryKey: ["temoignages-admin"] }); setSelectedId(null); } });

  const handleValider = async (id: number) => {
    try { await valider(id); toast({ title: "Témoignage validé" }); }
    catch { toast({ title: "Erreur", variant: "destructive" }); }
  };

  const handleRefuser = async (id: number) => {
    try { await refuser(id); toast({ title: "Témoignage refusé" }); }
    catch { toast({ title: "Erreur", variant: "destructive" }); }
  };

  const handleSupprimer = async (id: number) => {
    try { await supprimer(id); toast({ title: "Témoignage supprimé" }); }
    catch { toast({ title: "Erreur", variant: "destructive" }); }
  };

  const enAttente = temoignages.filter((t: any) => t.statut === "EN_ATTENTE").length;

  if (isLoading) return <div className="text-muted-foreground py-8 text-center">Chargement...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Témoignages
          {enAttente > 0 && (
            <span className="ml-2 text-sm font-normal text-orange-600 bg-orange-100 px-2 py-0.5 rounded">
              {enAttente} en attente
            </span>
          )}
        </h1>
      </div>

      {/* Filtres */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(["tous", "EN_ATTENTE", "VALIDER", "REJETTER"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {f === "tous" ? "Tous" : f === "EN_ATTENTE" ? "En attente" : f === "VALIDER" ? "Validés" : "Rejetés"}
            <span className="ml-1.5 text-xs opacity-70">
              ({f === "tous" ? temoignages.length : temoignages.filter((t: any) => t.statut === f).length})
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>Aucun témoignage dans cette catégorie.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Liste */}
          <div className="lg:col-span-2 space-y-2 max-h-[70vh] overflow-auto">
            {filtered.map((t: any) => {
              const cfg = statusConfig[t.statut as keyof typeof statusConfig];
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedId(t.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-colors ${
                    selectedId === t.id ? "bg-accent/5 border-accent/30" : "bg-card border-border hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-foreground truncate">{t.poste}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded shrink-0 ml-2 ${cfg.color}`}>
                      {cfg.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{t.message}</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    {new Date(t.createdAt).toLocaleDateString("fr-FR")}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Détail */}
          <div className="lg:col-span-3">
            {selected ? (
              <div className="bg-card rounded-xl p-6 shadow-card border border-border">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="font-heading font-semibold text-lg text-foreground">{selected.poste}</h2>
                    {selected.service && (
                      <p className="text-sm text-muted-foreground">{selected.service.nom}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(selected.createdAt).toLocaleString("fr-FR")}
                    </p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${statusConfig[selected.statut as keyof typeof statusConfig]?.color}`}>
                    {statusConfig[selected.statut as keyof typeof statusConfig]?.label}
                  </span>
                </div>

                {selected.photo && (
                  <img src={selected.photo} alt="Photo" className="h-20 w-20 rounded-full object-cover mb-4" />
                )}

                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <div className="flex gap-1 mb-3">
                    {[1,2,3,4,5].map(s => <span key={s} className="text-accent">★</span>)}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed italic">"{selected.message}"</p>
                </div>

                {/* Actions selon statut */}
                <div className="flex gap-2 flex-wrap">
                  {selected.statut === "EN_ATTENTE" && (
                    <>
                      <Button size="sm" onClick={() => handleValider(selected.id)} className="bg-green-600 hover:bg-green-700 text-white">
                        <Check className="h-4 w-4" /> Valider
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleRefuser(selected.id)} className="text-red-600 border-red-200 hover:bg-red-50">
                        <X className="h-4 w-4" /> Rejeter
                      </Button>
                    </>
                  )}
                  {selected.statut === "VALIDER" && (
                    <Button size="sm" variant="outline" onClick={() => handleRefuser(selected.id)} className="text-orange-600">
                      <X className="h-4 w-4" /> Retirer
                    </Button>
                  )}
                  {selected.statut === "REJETTER" && (
                    <Button size="sm" onClick={() => handleValider(selected.id)} className="bg-green-600 hover:bg-green-700 text-white">
                      <Check className="h-4 w-4" /> Valider quand même
                    </Button>
                  )}
                  <Button
                    size="sm" variant="ghost"
                    onClick={() => handleSupprimer(selected.id)}
                    className="text-destructive hover:text-destructive ml-auto"
                  >
                    <Trash2 className="h-4 w-4" /> Supprimer
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <p>Sélectionnez un témoignage pour le consulter</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTemoignages;
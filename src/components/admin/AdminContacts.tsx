import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useContacts, useDeleteContact } from "@/hooks/useContacts";

const AdminContacts = () => {
  const { toast } = useToast();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const LIMIT = 20;

  const { data, isLoading } = useContacts({ limit: LIMIT, offset, search: search || undefined });
  const { mutateAsync: deleteContact } = useDeleteContact();

  const messages = data?.data ?? [];
  const total = data?.total ?? 0;
  const selected = messages.find((m) => m.id === selectedId);

  const handleDelete = async (id: number) => {
    try {
      await deleteContact(id);
      if (selectedId === id) setSelectedId(null);
      toast({ title: "Contact supprimé" });
    } catch {
      toast({ title: "Erreur lors de la suppression", variant: "destructive" });
    }
  };

  if (isLoading) return <div className="text-muted-foreground py-8 text-center">Chargement...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Contacts reçus
          {total > 0 && (
            <span className="text-sm font-normal text-muted-foreground ml-2">({total} au total)</span>
          )}
        </h1>
      </div>

      {/* Barre de recherche */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Rechercher par nom, email, société..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setOffset(0); }}
        />
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Mail className="h-10 w-10 mx-auto mb-3 opacity-40" />
          <p>{search ? "Aucun résultat pour cette recherche." : "Aucun contact reçu pour le moment."}</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Liste */}
          <div className="lg:col-span-2 space-y-2 max-h-[70vh] overflow-auto">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => setSelectedId(msg.id)}
                className={`w-full text-left p-4 rounded-xl border transition-colors ${
                  selectedId === msg.id
                    ? "bg-accent/5 border-accent/30"
                    : "bg-card border-border hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground truncate">{msg.nom_complet}</p>
                  <span className="text-xs text-muted-foreground shrink-0 ml-2">
                    {new Date(msg.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{msg.societe || msg.email}</p>
                {msg.objet && (
                  <p className="text-xs text-muted-foreground/70 truncate mt-0.5">{msg.objet}</p>
                )}
              </button>
            ))}

            {/* Pagination */}
            {total > LIMIT && (
              <div className="flex items-center justify-between pt-2">
                <Button
                  size="sm" variant="outline"
                  disabled={offset === 0}
                  onClick={() => setOffset(o => Math.max(0, o - LIMIT))}
                >
                  ← Précédent
                </Button>
                <span className="text-xs text-muted-foreground">
                  {offset + 1}–{Math.min(offset + LIMIT, total)} / {total}
                </span>
                <Button
                  size="sm" variant="outline"
                  disabled={offset + LIMIT >= total}
                  onClick={() => setOffset(o => o + LIMIT)}
                >
                  Suivant →
                </Button>
              </div>
            )}
          </div>

          {/* Détail */}
          <div className="lg:col-span-3">
            {selected ? (
              <div className="bg-card rounded-xl p-6 shadow-card border border-border">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="font-heading font-semibold text-lg text-foreground">{selected.nom_complet}</h2>
                    <p className="text-sm text-muted-foreground">{selected.email}</p>
                    {selected.societe && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {selected.societe}{selected.fonction ? ` • ${selected.fonction}` : ""}
                      </p>
                    )}
                  </div>
                  <Button
                    size="icon" variant="ghost"
                    onClick={() => handleDelete(selected.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {selected.objet && (
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-1">Sujet</p>
                    <p className="text-sm font-medium text-foreground">{selected.objet}</p>
                  </div>
                )}

                {selected.message && (
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-1">Message</p>
                    <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{selected.message}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  {selected.telephone && (
                    <div>
                      <p className="text-xs text-muted-foreground">Téléphone</p>
                      <p className="text-sm text-foreground">{selected.telephone}</p>
                    </div>
                  )}
                  {selected.email && (
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <a href={`mailto:${selected.email}`} className="text-sm text-accent hover:underline">
                        {selected.email}
                      </a>
                    </div>
                  )}
                </div>

                <p className="text-xs text-muted-foreground mt-4">
                  Reçu le {new Date(selected.createdAt).toLocaleString("fr-FR")}
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <p>Sélectionnez un contact pour le consulter</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
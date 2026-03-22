import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, Trash2, Edit2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "@/components/admin/ImageUpload";

interface ContentItem {
  id: string;
  page: string;
  section: string;
  content_key: string;
  content_value: string | null;
  content_type: string;
  sort_order: number | null;
}

const PAGES = ["home", "presentation", "services", "solutions"];

const AdminContent = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState("home");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState({ page: "home", section: "", content_key: "", content_value: "", content_type: "text" });

  const fetchContent = async () => {
    const { data } = await supabase.from("site_content").select("*").eq("page", selectedPage).order("sort_order");
    setItems((data as ContentItem[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchContent(); }, [selectedPage]);

  const handleSave = async (item: ContentItem) => {
    const { error } = await supabase.from("site_content").update({
      content_value: item.content_value,
      content_key: item.content_key,
      section: item.section,
    }).eq("id", item.id);
    if (error) { toast({ title: "Erreur lors de la sauvegarde", variant: "destructive" }); return; }
    toast({ title: "Contenu mis à jour" });
    setEditingId(null);
    fetchContent();
  };

  const handleAdd = async () => {
    if (!newItem.section || !newItem.content_key) { toast({ title: "Section et clé requises", variant: "destructive" }); return; }
    const { error } = await supabase.from("site_content").insert({
      page: newItem.page,
      section: newItem.section,
      content_key: newItem.content_key,
      content_value: newItem.content_value,
      content_type: newItem.content_type,
    });
    if (error) { toast({ title: "Erreur lors de l'ajout", variant: "destructive" }); return; }
    toast({ title: "Contenu ajouté" });
    setShowAdd(false);
    setNewItem({ page: selectedPage, section: "", content_key: "", content_value: "", content_type: "text" });
    fetchContent();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("site_content").delete().eq("id", id);
    toast({ title: "Contenu supprimé" });
    fetchContent();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-foreground">Contenu des Pages</h1>
        <Button size="sm" onClick={() => { setShowAdd(true); setNewItem({ ...newItem, page: selectedPage }); }}>
          <Plus className="h-4 w-4" /> Ajouter du Contenu
        </Button>
      </div>

      {/* Page tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {PAGES.map((p) => (
          <button
            key={p}
            onClick={() => setSelectedPage(p)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              selectedPage === p ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {p === "home" ? "Accueil" : p === "presentation" ? "Présentation" : p}
          </button>
        ))}
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="bg-card rounded-xl p-6 shadow-card border border-border mb-6 space-y-4">
          <h3 className="font-heading font-semibold text-foreground">Nouvel Élément de Contenu</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <Input placeholder="Section (ex : hero)" value={newItem.section} onChange={(e) => setNewItem({ ...newItem, section: e.target.value })} />
            <Input placeholder="Clé (ex : titre)" value={newItem.content_key} onChange={(e) => setNewItem({ ...newItem, content_key: e.target.value })} />
            <select
              className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
              value={newItem.content_type}
              onChange={(e) => setNewItem({ ...newItem, content_type: e.target.value })}
            >
              <option value="text">Texte</option>
              <option value="image">URL Image</option>
              <option value="video">URL Vidéo</option>
            </select>
          </div>
          {newItem.content_type === "image" ? (
            <ImageUpload
              value={newItem.content_value}
              onChange={(url) => setNewItem({ ...newItem, content_value: url })}
              folder={`content/${selectedPage}`}
              label="Image"
            />
          ) : (
            <Textarea placeholder="Valeur du contenu..." value={newItem.content_value} onChange={(e) => setNewItem({ ...newItem, content_value: e.target.value })} />
          )}
          <div className="flex gap-2">
            <Button size="sm" onClick={handleAdd}><Save className="h-4 w-4" /> Enregistrer</Button>
            <Button size="sm" variant="ghost" onClick={() => setShowAdd(false)}>Annuler</Button>
          </div>
        </div>
      )}

      {/* Content list */}
      {loading ? (
        <p className="text-muted-foreground">Chargement...</p>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>Aucun contenu pour cette page. Cliquez sur « Ajouter du Contenu » pour commencer.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="bg-card rounded-xl p-5 shadow-card border border-border">
              {editingId === item.id ? (
                <div className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Input value={item.section} onChange={(e) => setItems(items.map((i) => i.id === item.id ? { ...i, section: e.target.value } : i))} />
                    <Input value={item.content_key} onChange={(e) => setItems(items.map((i) => i.id === item.id ? { ...i, content_key: e.target.value } : i))} />
                  </div>
                  {item.content_type === "image" ? (
                    <ImageUpload
                      value={item.content_value ?? ""}
                      onChange={(url) => setItems(items.map((i) => i.id === item.id ? { ...i, content_value: url } : i))}
                      folder={`content/${item.page}`}
                      label="Image"
                    />
                  ) : (
                    <Textarea value={item.content_value ?? ""} onChange={(e) => setItems(items.map((i) => i.id === item.id ? { ...i, content_value: e.target.value } : i))} />
                  )}
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleSave(item)}><Save className="h-4 w-4" /> Enregistrer</Button>
                    <Button size="sm" variant="ghost" onClick={() => { setEditingId(null); fetchContent(); }}>Annuler</Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded">{item.section}</span>
                      <span className="text-xs text-muted-foreground">{item.content_key}</span>
                      <span className="text-xs text-muted-foreground/60">({item.content_type})</span>
                    </div>
                    <p className="text-sm text-foreground truncate">{item.content_value || "—"}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button size="icon" variant="ghost" onClick={() => setEditingId(item.id)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDelete(item.id)} className="text-destructive hover:text-destructive">
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

export default AdminContent;
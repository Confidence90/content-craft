import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, Trash2, Edit2, GripVertical, ChevronDown, ChevronUp, Eye, EyeOff, Image, Type, Video, BarChart3, Quote, Users, ListChecks, MousePointerClick, CreditCard, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "@/components/admin/ImageUpload";
import { ContentBlock, PageSection } from "@/hooks/usePageContent";
import api from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";

const PAGES = [
  { key: "home", label: "Accueil" },
  { key: "presentation", label: "Présentation" },
  { key: "solutions", label: "Solutions" },
  { key: "contact", label: "Contact" },
];

const BLOCK_TYPES = [
  { value: "text", label: "Texte", icon: Type },
  { value: "image", label: "Image", icon: Image },
  { value: "video", label: "Vidéo", icon: Video },
  { value: "stat", label: "Statistique", icon: BarChart3 },
  { value: "testimonial", label: "Témoignage", icon: Quote },
  { value: "card", label: "Carte", icon: CreditCard },
  { value: "team_member", label: "Membre Équipe", icon: Users },
  { value: "feature_list", label: "Liste", icon: ListChecks },
  { value: "cta", label: "Bouton CTA", icon: MousePointerClick },
  { value: "contact_info", label: "Info Contact", icon: Phone },
];

const AdminPageBuilder = () => {
  const { toast } = useToast();
  const [sections, setSections] = useState<PageSection[]>([]);
  const [selectedPage, setSelectedPage] = useState("home");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [editingBlock, setEditingBlock] = useState<string | null>(null);
  const [showAddSection, setShowAddSection] = useState(false);
  const [showAddBlock, setShowAddBlock] = useState<string | null>(null);
  const [newSection, setNewSection] = useState({ section_key: "", title_fr: "", title_en: "", subtitle_fr: "", subtitle_en: "", bg_variant: "default" });
  const [newBlock, setNewBlock] = useState<Partial<ContentBlock>>({ block_type: "text", content_fr: "", content_en: "", media_url: "", metadata: {}, sort_order: 0 });
  const [loadingPage, setLoadingPage] = useState(false);
  const qc = useQueryClient();
  const loadPage = async (page: string) => {
  setSelectedPage(page);
  setExpandedSection(null);
  setLoadingPage(true);
  try {
    const { data } = await api.get<PageSection[]>(`/page-sections/admin?page=${page}`);
    setSections(data);
  } catch {
    setSections([]);
  } finally {
    setLoadingPage(false);
  }
};
useEffect(() => { loadPage("home"); }, []);
  const handleAddSection = async () => {
  if (!newSection.section_key) {
    toast({ title: "Clé requise", variant: "destructive" });
    return;
  }

  try {
    const { data } = await api.post("/page-sections", {
      ...newSection,
      page: selectedPage,
      sort_order: sections.length,
      is_visible: true,
    });

    setSections(prev => [...prev, { ...data, blocks: [] }]);

    qc.invalidateQueries({ queryKey: ["page-sections"] });

    toast({ title: "Section ajoutée" });

    setShowAddSection(false);

    setNewSection({
      section_key: "",
      title_fr: "",
      title_en: "",
      subtitle_fr: "",
      subtitle_en: "",
      bg_variant: "default",
    });

  } catch {
    toast({ title: "Erreur", variant: "destructive" });
  }
};

const handleDeleteSection = async (id: string) => {
  await api.delete(`/page-sections/${id}`);
  setSections(prev => prev.filter(s => s.id !== id));
  qc.invalidateQueries({ queryKey: ["page-sections"] });
  toast({ title: "Section supprimée" });
};

const handleUpdateSection = async (section: PageSection) => {
  await api.put(`/page-sections/${section.id}`, section);
   qc.invalidateQueries({ queryKey: ["page-sections"] });
  toast({ title: "Section mise à jour" });
};

const handleAddBlock = async (sectionId: string) => {
  const { data } = await api.post(`/page-sections/${sectionId}/blocks`, {
    ...newBlock,
    section_id: sectionId,
  });
  setSections(prev => prev.map(s =>
    s.id === sectionId ? { ...s, blocks: [...s.blocks, data] } : s
  ));
   qc.invalidateQueries({ queryKey: ["page-sections"] });
  toast({ title: "Bloc ajouté" });
  setShowAddBlock(null);
};

const handleUpdateBlock = async (block: ContentBlock) => {
  await api.put(`/page-sections/blocks/${block.id}`, block);
  setSections(prev => prev.map(s => ({
    ...s,
    blocks: s.blocks.map(b => b.id === block.id ? block : b),
  })));
   qc.invalidateQueries({ queryKey: ["page-sections"] });
  toast({ title: "Bloc mis à jour" });
  setEditingBlock(null);
};

const handleDeleteBlock = async (id: string) => {
  await api.delete(`/page-sections/blocks/${id}`);
  setSections(prev => prev.map(s => ({
    ...s,
    blocks: s.blocks.filter(b => b.id !== id),
  })));
   qc.invalidateQueries({ queryKey: ["page-sections"] });
  toast({ title: "Bloc supprimé" });
};

  const handleMoveBlock = (sectionId: string, blockId: string, direction: "up" | "down") => {
    setSections(prev => prev.map(s => {
      if (s.id !== sectionId) return s;
      const blocks = [...s.blocks].sort((a, b) => a.sort_order - b.sort_order);
      const idx = blocks.findIndex(b => b.id === blockId);
      if ((direction === "up" && idx === 0) || (direction === "down" && idx === blocks.length - 1)) return s;
      const swapIdx = direction === "up" ? idx - 1 : idx + 1;
      const tempOrder = blocks[idx].sort_order;
      blocks[idx].sort_order = blocks[swapIdx].sort_order;
      blocks[swapIdx].sort_order = tempOrder;
      [blocks[idx], blocks[swapIdx]] = [blocks[swapIdx], blocks[idx]];
      return { ...s, blocks };
    }));
  };

  const updateLocalBlock = (blockId: string, updates: Partial<ContentBlock>) => {
    setSections(prev => prev.map(s => ({
      ...s,
      blocks: s.blocks.map(b => b.id === blockId ? { ...b, ...updates } : b),
    })));
  };

  const updateLocalSection = (sectionId: string, updates: Partial<PageSection>) => {
    setSections(prev => prev.map(s => s.id === sectionId ? { ...s, ...updates } : s));
  };

  const renderMetadataEditor = (block: ContentBlock) => {
    const meta = block.metadata || {};
    const setMeta = (key: string, value: any) => {
      const newMeta = { ...meta, [key]: value };
      updateLocalBlock(block.id, { metadata: newMeta });
    };

    switch (block.block_type) {
      case "stat":
        return (
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Label FR" value={meta.label_fr || ""} onChange={e => setMeta("label_fr", e.target.value)} />
            <Input placeholder="Label EN" value={meta.label_en || ""} onChange={e => setMeta("label_en", e.target.value)} />
            <Input placeholder="Icône (ex: Briefcase)" value={meta.icon || ""} onChange={e => setMeta("icon", e.target.value)} />
          </div>
        );
      case "testimonial":
        return (
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Nom" value={meta.name || ""} onChange={e => setMeta("name", e.target.value)} />
            <Input placeholder="Rôle FR" value={meta.role_fr || ""} onChange={e => setMeta("role_fr", e.target.value)} />
            <Input placeholder="Rôle EN" value={meta.role_en || ""} onChange={e => setMeta("role_en", e.target.value)} />
          </div>
        );
      case "card":
        return (
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Titre FR" value={meta.title_fr || ""} onChange={e => setMeta("title_fr", e.target.value)} />
            <Input placeholder="Titre EN" value={meta.title_en || ""} onChange={e => setMeta("title_en", e.target.value)} />
            <Input placeholder="Icône" value={meta.icon || ""} onChange={e => setMeta("icon", e.target.value)} />
            <Input placeholder="Tag FR" value={meta.tag_fr || ""} onChange={e => setMeta("tag_fr", e.target.value)} />
            <Input placeholder="Tag EN" value={meta.tag_en || ""} onChange={e => setMeta("tag_en", e.target.value)} />
            <Input placeholder="Lien" value={meta.link || ""} onChange={e => setMeta("link", e.target.value)} />
          </div>
        );
      case "team_member":
        return (
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Nom" value={meta.name || ""} onChange={e => setMeta("name", e.target.value)} />
            <Input placeholder="Initiales" value={meta.initials || ""} onChange={e => setMeta("initials", e.target.value)} />
            <Input placeholder="Rôle FR" value={meta.role_fr || ""} onChange={e => setMeta("role_fr", e.target.value)} />
            <Input placeholder="Rôle EN" value={meta.role_en || ""} onChange={e => setMeta("role_en", e.target.value)} />
          </div>
        );
      case "cta":
        return (
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Lien" value={meta.link || ""} onChange={e => setMeta("link", e.target.value)} />
            <select className="rounded-lg border border-input bg-background px-3 py-2 text-sm" value={meta.variant || "primary"} onChange={e => setMeta("variant", e.target.value)}>
              <option value="primary">Primaire</option>
              <option value="outline">Contour</option>
            </select>
          </div>
        );
      case "feature_list":
        return (
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground">Éléments FR (un par ligne)</label>
              <Textarea value={(meta.items_fr || []).join("\n")} onChange={e => setMeta("items_fr", e.target.value.split("\n").filter(Boolean))} rows={4} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Éléments EN (un par ligne)</label>
              <Textarea value={(meta.items_en || []).join("\n")} onChange={e => setMeta("items_en", e.target.value.split("\n").filter(Boolean))} rows={4} />
            </div>
          </div>
        );
      case "contact_info":
        return (
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Label FR" value={meta.label_fr || ""} onChange={e => setMeta("label_fr", e.target.value)} />
            <Input placeholder="Label EN" value={meta.label_en || ""} onChange={e => setMeta("label_en", e.target.value)} />
            <Input placeholder="Icône (Phone, Mail, MapPin)" value={meta.icon || ""} onChange={e => setMeta("icon", e.target.value)} />
          </div>
        );
      case "text":
        return (
          <div className="grid grid-cols-2 gap-3">
            <select className="rounded-lg border border-input bg-background px-3 py-2 text-sm" value={meta.variant || "paragraph"} onChange={e => setMeta("variant", e.target.value)}>
              <option value="paragraph">Paragraphe</option>
              <option value="badge">Badge</option>
              <option value="heading">Titre</option>
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  function handleMoveSectionOrder(id: string, arg1: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-foreground">Constructeur de Pages</h1>
        <Button size="sm" onClick={() => setShowAddSection(true)}>
          <Plus className="h-4 w-4" /> Ajouter une Section
        </Button>
      </div>

      {/* Page tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {PAGES.map((p) => (
          <button
            key={p.key}
            onClick={() => loadPage(p.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedPage === p.key ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Add section form */}
      {showAddSection && (
        <div className="bg-card rounded-xl p-6 shadow-card border border-border mb-6 space-y-4">
          <h3 className="font-heading font-semibold text-foreground">Nouvelle Section</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input placeholder="Clé de section (ex: hero, about)" value={newSection.section_key} onChange={e => setNewSection({ ...newSection, section_key: e.target.value })} />
            <select className="rounded-lg border border-input bg-background px-3 py-2 text-sm" value={newSection.bg_variant} onChange={e => setNewSection({ ...newSection, bg_variant: e.target.value })}>
              <option value="default">Fond par défaut</option>
              <option value="hero">Fond hero (sombre)</option>
              <option value="secondary">Fond secondaire</option>
            </select>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input placeholder="Titre FR" value={newSection.title_fr} onChange={e => setNewSection({ ...newSection, title_fr: e.target.value })} />
            <Input placeholder="Titre EN" value={newSection.title_en} onChange={e => setNewSection({ ...newSection, title_en: e.target.value })} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input placeholder="Sous-titre FR" value={newSection.subtitle_fr} onChange={e => setNewSection({ ...newSection, subtitle_fr: e.target.value })} />
            <Input placeholder="Sous-titre EN" value={newSection.subtitle_en} onChange={e => setNewSection({ ...newSection, subtitle_en: e.target.value })} />
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleAddSection}><Save className="h-4 w-4" /> Enregistrer</Button>
            <Button size="sm" variant="ghost" onClick={() => setShowAddSection(false)}>Annuler</Button>
          </div>
        </div>
      )}

      {/* Sections list */}
      {sections.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>Aucune section pour cette page. Cliquez sur « Ajouter une Section ».</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sections.map((section, sIdx) => (
            <div key={section.id} className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
              {/* Section header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded">{section.section_key}</span>
                    <span className="text-sm font-medium text-foreground truncate">{section.title_fr || "(Sans titre)"}</span>
                    {!section.is_visible && <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-xs text-muted-foreground mr-2">{section.blocks.length} bloc(s)</span>
                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleMoveSectionOrder(section.id, "up")} disabled={sIdx === 0}>
                    <ChevronUp className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleMoveSectionOrder(section.id, "down")} disabled={sIdx === sections.length - 1}>
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => updateLocalSection(section.id, { is_visible: !section.is_visible })}>
                    {section.is_visible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  </Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}>
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => handleDeleteSection(section.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {/* Expanded section editor */}
              {expandedSection === section.id && (
                <div className="px-5 py-4 space-y-4 bg-muted/30">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground">Titre FR</label>
                      <Input value={section.title_fr || ""} onChange={e => updateLocalSection(section.id, { title_fr: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Titre EN</label>
                      <Input value={section.title_en || ""} onChange={e => updateLocalSection(section.id, { title_en: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Sous-titre FR</label>
                      <Input value={section.subtitle_fr || ""} onChange={e => updateLocalSection(section.id, { subtitle_fr: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Sous-titre EN</label>
                      <Input value={section.subtitle_en || ""} onChange={e => updateLocalSection(section.id, { subtitle_en: e.target.value })} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleUpdateSection(section)}><Save className="h-4 w-4" /> Sauvegarder la Section</Button>
                  </div>

                  {/* Blocks */}
                  <div className="border-t border-border pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold text-foreground">Blocs de Contenu</h4>
                      <Button size="sm" variant="outline" onClick={() => setShowAddBlock(showAddBlock === section.id ? null : section.id)}>
                        <Plus className="h-3.5 w-3.5" /> Ajouter un Bloc
                      </Button>
                    </div>

                    {showAddBlock === section.id && (
                      <div className="bg-background rounded-lg p-4 border border-border mb-3 space-y-3">
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-muted-foreground">Type de bloc</label>
                            <select className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" value={newBlock.block_type} onChange={e => setNewBlock({ ...newBlock, block_type: e.target.value, metadata: {} })}>
                              {BLOCK_TYPES.map(bt => <option key={bt.value} value={bt.value}>{bt.label}</option>)}
                            </select>
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-muted-foreground">Contenu FR</label>
                            <Textarea value={newBlock.content_fr || ""} onChange={e => setNewBlock({ ...newBlock, content_fr: e.target.value })} rows={2} />
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Contenu EN</label>
                            <Textarea value={newBlock.content_en || ""} onChange={e => setNewBlock({ ...newBlock, content_en: e.target.value })} rows={2} />
                          </div>
                        </div>
                        {(newBlock.block_type === "image" || newBlock.block_type === "team_member") && (
                          <ImageUpload value={newBlock.media_url || ""} onChange={url => setNewBlock({ ...newBlock, media_url: url })} folder={`content/${selectedPage}`} label="Image / Média" />
                        )}
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleAddBlock(section.id)}><Save className="h-4 w-4" /> Ajouter</Button>
                          <Button size="sm" variant="ghost" onClick={() => setShowAddBlock(null)}>Annuler</Button>
                        </div>
                      </div>
                    )}

                    {/* Block list */}
                    <div className="space-y-2">
                      {section.blocks.sort((a, b) => a.sort_order - b.sort_order).map((block, bIdx) => {
                        const BlockIcon = BLOCK_TYPES.find(bt => bt.value === block.block_type)?.icon || Type;
                        return (
                          <div key={block.id} className="bg-background rounded-lg border border-border">
                            <div className="flex items-center gap-2 px-3 py-2">
                              <GripVertical className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                              <BlockIcon className="h-3.5 w-3.5 text-accent shrink-0" />
                              <span className="text-xs text-muted-foreground">{BLOCK_TYPES.find(bt => bt.value === block.block_type)?.label}</span>
                              <span className="text-xs text-foreground truncate flex-1">{block.content_fr?.slice(0, 50) || block.metadata?.name || block.metadata?.title_fr || "—"}</span>
                              <div className="flex items-center gap-0.5 shrink-0">
                                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => handleMoveBlock(section.id, block.id, "up")} disabled={bIdx === 0}>
                                  <ChevronUp className="h-3 w-3" />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => handleMoveBlock(section.id, block.id, "down")} disabled={bIdx === section.blocks.length - 1}>
                                  <ChevronDown className="h-3 w-3" />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => setEditingBlock(editingBlock === block.id ? null : block.id)}>
                                  <Edit2 className="h-3 w-3" />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-6 w-6 text-destructive" onClick={() => handleDeleteBlock(block.id)}>
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            {editingBlock === block.id && (
                              <div className="px-3 pb-3 space-y-3 border-t border-border pt-3">
                                <div className="grid sm:grid-cols-2 gap-3">
                                  <div>
                                    <label className="text-xs text-muted-foreground">Contenu FR</label>
                                    <Textarea value={block.content_fr || ""} onChange={e => updateLocalBlock(block.id, { content_fr: e.target.value })} rows={2} />
                                  </div>
                                  <div>
                                    <label className="text-xs text-muted-foreground">Contenu EN</label>
                                    <Textarea value={block.content_en || ""} onChange={e => updateLocalBlock(block.id, { content_en: e.target.value })} rows={2} />
                                  </div>
                                </div>
                                {(block.block_type === "image" || block.block_type === "video" || block.block_type === "team_member") && (
                                  <ImageUpload value={block.media_url || ""} onChange={url => updateLocalBlock(block.id, { media_url: url })} folder={`content/${selectedPage}`} label="Média" />
                                )}
                                {renderMetadataEditor(block)}
                                <div className="flex gap-2">
                                  <Button size="sm" onClick={() => handleUpdateBlock(block)}><Save className="h-4 w-4" /> Sauvegarder</Button>
                                  <Button size="sm" variant="ghost" onClick={() => setEditingBlock(null)}>Annuler</Button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
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

export default AdminPageBuilder;

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Mail, Trash2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  company: string | null;
  name: string;
  position: string | null;
  email: string;
  phone: string | null;
  address: string | null;
  subject: string | null;
  message: string;
  is_read: boolean | null;
  created_at: string;
}

const AdminMessages = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchMessages = async () => {
    const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    setMessages((data as Message[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchMessages(); }, []);

  const toggleRead = async (msg: Message) => {
    await supabase.from("contact_messages").update({ is_read: !msg.is_read }).eq("id", msg.id);
    fetchMessages();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("contact_messages").delete().eq("id", id);
    toast({ title: "Message supprimé" });
    if (selectedId === id) setSelectedId(null);
    fetchMessages();
  };

  const selected = messages.find((m) => m.id === selectedId);

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-foreground mb-6">Messages de Contact</h1>

      {loading ? (
        <p className="text-muted-foreground">Chargement...</p>
      ) : messages.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Mail className="h-10 w-10 mx-auto mb-3 opacity-40" />
          <p>Aucun message pour le moment.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Liste des messages */}
          <div className="lg:col-span-2 space-y-2 max-h-[70vh] overflow-auto">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={async () => {
                  setSelectedId(msg.id);
                  if (!msg.is_read) {
                    await supabase.from("contact_messages").update({ is_read: true }).eq("id", msg.id);
                    fetchMessages();
                  }
                }}
                className={`w-full text-left p-4 rounded-xl border transition-colors ${
                  selectedId === msg.id
                    ? "bg-accent/5 border-accent/30"
                    : "bg-card border-border hover:bg-muted/50"
                } ${!msg.is_read ? "border-l-4 border-l-accent" : ""}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className={`text-sm font-medium ${!msg.is_read ? "text-foreground" : "text-muted-foreground"}`}>{msg.name}</p>
                  <span className="text-xs text-muted-foreground">{new Date(msg.created_at).toLocaleDateString("fr-FR")}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{msg.subject || msg.message}</p>
              </button>
            ))}
          </div>

          {/* Détail du message */}
          <div className="lg:col-span-3">
            {selected ? (
              <div className="bg-card rounded-xl p-6 shadow-card border border-border">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="font-heading font-semibold text-lg text-foreground">{selected.name}</h2>
                    <p className="text-sm text-muted-foreground">{selected.email}</p>
                    {selected.company && <p className="text-xs text-muted-foreground">{selected.company} {selected.position && `• ${selected.position}`}</p>}
                  </div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => toggleRead(selected)}>
                      {selected.is_read ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDelete(selected.id)} className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {selected.subject && (
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-1">Sujet</p>
                    <p className="text-sm font-medium text-foreground">{selected.subject}</p>
                  </div>
                )}

                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-1">Message</p>
                  <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{selected.message}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  {selected.phone && <div><p className="text-xs text-muted-foreground">Téléphone</p><p className="text-sm text-foreground">{selected.phone}</p></div>}
                  {selected.address && <div><p className="text-xs text-muted-foreground">Adresse</p><p className="text-sm text-foreground">{selected.address}</p></div>}
                </div>

                <p className="text-xs text-muted-foreground mt-4">
                  Reçu le {new Date(selected.created_at).toLocaleString("fr-FR")}
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <p>Sélectionnez un message pour le consulter</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
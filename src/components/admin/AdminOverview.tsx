import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Settings2, MessageSquare, Eye } from "lucide-react";

interface AdminOverviewProps {
  onNavigate: (tab: string) => void;
}

const AdminOverview = ({ onNavigate }: AdminOverviewProps) => {
  const [stats, setStats] = useState({ content: 0, services: 0, messages: 0, unread: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [contentRes, servicesRes, messagesRes, unreadRes] = await Promise.all([
        supabase.from("site_content").select("id", { count: "exact", head: true }),
        supabase.from("services").select("id", { count: "exact", head: true }),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("is_read", false),
      ]);
      setStats({
        content: contentRes.count ?? 0,
        services: servicesRes.count ?? 0,
        messages: messagesRes.count ?? 0,
        unread: unreadRes.count ?? 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Éléments de Contenu", value: stats.content, icon: FileText, tab: "content", color: "text-blue-500" },
    { label: "Services", value: stats.services, icon: Settings2, tab: "services", color: "text-accent" },
    { label: "Messages", value: stats.messages, icon: MessageSquare, tab: "messages", color: "text-green-500" },
    { label: "Messages Non Lus", value: stats.unread, icon: Eye, tab: "messages", color: "text-orange-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-foreground mb-6">Tableau de Bord</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon, tab, color }) => (
          <button
            key={label}
            onClick={() => onNavigate(tab)}
            className="bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-elevated transition-all text-left"
          >
            <div className="flex items-center justify-between mb-4">
              <Icon className={`h-5 w-5 ${color}`} />
            </div>
            <p className="text-3xl font-heading font-bold text-foreground">{value}</p>
            <p className="text-sm text-muted-foreground mt-1">{label}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminOverview;
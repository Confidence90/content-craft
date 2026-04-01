import { FileText, Settings2, MessageSquare, Eye } from "lucide-react";
import { mockSiteContent, mockServices, mockMessages } from "@/data/mockData";

interface AdminOverviewProps {
  onNavigate: (tab: string) => void;
}

const AdminOverview = ({ onNavigate }: AdminOverviewProps) => {
  const stats = {
    content: mockSiteContent.length,
    services: mockServices.length,
    messages: mockMessages.length,
    unread: mockMessages.filter(m => !m.is_read).length,
  };

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

import { FileText, Settings2, MessageSquare, Eye } from "lucide-react";
import { useContacts } from "@/hooks/useContacts";
import { useServices } from "@/hooks/useServices";
import { useNotifications } from "@/hooks/useNotifications";
import { useAuth } from "@/hooks/useAuth";

interface AdminOverviewProps {
  onNavigate: (tab: string) => void;
}

const AdminOverview = ({ onNavigate }: AdminOverviewProps) => {
  const { user } = useAuth();
  const { data: contacts } = useContacts();
  const { data: services } = useServices();
  const { data: notifications } = useNotifications(user?.id ?? 0);

  const stats = {
    contacts: contacts?.total ?? 0,
    services: services?.length ?? 0,
    notifications: notifications?.length ?? 0,
    unread: notifications?.filter((n) => !n.lue).length ?? 0,
  };

  const cards = [
    { label: "Contacts reçus",      value: stats.contacts,      icon: FileText,    tab: "contacts",       color: "text-blue-500" },
    { label: "Services",            value: stats.services,      icon: Settings2,   tab: "services",       color: "text-accent" },
    { label: "Notifications",       value: stats.notifications, icon: MessageSquare, tab: "notifications", color: "text-green-500" },
    { label: "Non lues",            value: stats.unread,        icon: Eye,         tab: "notifications",  color: "text-orange-500" },
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
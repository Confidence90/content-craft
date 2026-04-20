import { useAuth } from "@/hooks/useAuth";
import { useNotifications, useMarkAsRead, useMarkAllAsRead } from "@/hooks/useNotifications";
import { Button } from "@/components/ui/button";
import { Bell, Check, Mail, Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const typeConfig: Record<string, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  contact:  { label: "Contact",   color: "bg-blue-100 text-blue-800",   icon: Mail },
  success:  { label: "Succès",    color: "bg-green-100 text-green-800", icon: CheckCircle },
  info:     { label: "Info",      color: "bg-sky-100 text-sky-800",     icon: Info },
  warning:  { label: "Alerte",    color: "bg-orange-100 text-orange-800", icon: AlertTriangle },
  error:    { label: "Erreur",    color: "bg-red-100 text-red-800",     icon: XCircle },
  alert:    { label: "Alerte",    color: "bg-orange-100 text-orange-800", icon: AlertTriangle },
  message:  { label: "Message",   color: "bg-purple-100 text-purple-800", icon: Mail },
  update:   { label: "Mise à jour", color: "bg-teal-100 text-teal-800", icon: Info },
};

const AdminNotifications = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: notifications = [], isLoading } = useNotifications(user?.id ?? 0);
  const { mutateAsync: markAsRead } = useMarkAsRead();
  const { mutateAsync: markAllAsRead } = useMarkAllAsRead();

  const unreadCount = notifications.filter((n) => !n.lue).length;

  const handleMarkAsRead = async (id: number) => {
    try {
      await markAsRead(id);
    } catch {
      toast({ title: "Erreur", variant: "destructive" });
    }
  };

  const handleMarkAll = async () => {
    try {
      await markAllAsRead(user?.id ?? 0);
      toast({ title: "Toutes les notifications marquées comme lues" });
    } catch {
      toast({ title: "Erreur", variant: "destructive" });
    }
  };

  if (isLoading) return <div className="text-muted-foreground py-8 text-center">Chargement...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Notifications
          {unreadCount > 0 && (
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({unreadCount} non {unreadCount > 1 ? "lues" : "lue"})
            </span>
          )}
        </h1>
        {unreadCount > 0 && (
          <Button size="sm" variant="outline" onClick={handleMarkAll}>
            <Check className="h-4 w-4" /> Tout marquer comme lu
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Bell className="h-10 w-10 mx-auto mb-3 opacity-40" />
          <p>Aucune notification pour le moment.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Non lues en premier */}
          {unreadCount > 0 && (
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Non lues
            </p>
          )}
          {notifications
            .slice()
            .sort((a, b) => {
              if (a.lue !== b.lue) return a.lue ? 1 : -1;
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            })
            .map((notif) => {
              const config = typeConfig[notif.type] || typeConfig["info"];
              const TypeIcon = config.icon;

              return (
                <div
                  key={notif.id}
                  className={`bg-card rounded-xl p-4 border transition-all ${
                    !notif.lue
                      ? "border-accent/30 shadow-sm"
                      : "border-border opacity-70"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className={`mt-0.5 h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${config.color}`}>
                        <TypeIcon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded ${config.color}`}>
                            {config.label}
                          </span>
                          {!notif.lue && (
                            <span className="h-2 w-2 rounded-full bg-accent shrink-0" />
                          )}
                        </div>

                        {notif.contact && (
                          <p className="text-sm text-foreground">
                            Nouveau contact de{" "}
                            <span className="font-medium">{notif.contact.nom_complet}</span>
                            {notif.contact.email && (
                              <span className="text-muted-foreground"> ({notif.contact.email})</span>
                            )}
                          </p>
                        )}

                        {!notif.contact && (
                          <p className="text-sm text-foreground">
                            Notification de type {notif.type}
                          </p>
                        )}

                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(notif.date).toLocaleString("fr-FR")}
                        </p>
                      </div>
                    </div>

                    {!notif.lue && (
                      <Button
                        size="sm" variant="ghost"
                        className="shrink-0 text-muted-foreground hover:text-foreground"
                        onClick={() => handleMarkAsRead(notif.id)}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default AdminNotifications;
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Link } from "react-router-dom";
import { LayoutDashboard, FileText, Settings2, MessageSquare, LogOut, Menu, X, ChevronRight, Blocks } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminPageBuilder from "@/components/admin/AdminPageBuilder";
import AdminServices from "@/components/admin/AdminServices";
import AdminMessages from "@/components/admin/AdminMessages";
import AdminOverview from "@/components/admin/AdminOverview";

const tabs = [
  { id: "overview", label: "Aperçu", icon: LayoutDashboard },
  { id: "builder", label: "Pages", icon: Blocks },
  { id: "services", label: "Services", icon: Settings2 },
  { id: "messages", label: "Messages", icon: MessageSquare },
];

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-background"><p className="text-muted-foreground">Chargement...</p></div>;
  if (!user || !isAdmin) return <Navigate to="/admin/login" replace />;

  const tabLabels: Record<string, string> = { overview: "Aperçu", builder: "Pages", services: "Services", messages: "Messages" };

  return (
    <div className="min-h-screen bg-background flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-200 lg:translate-x-0 lg:static ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between p-5 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-heading font-bold">T</span>
            </div>
            <span className="font-heading font-bold text-foreground">Admin</span>
          </Link>
          <button className="lg:hidden text-muted-foreground" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-3 space-y-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === id ? "bg-accent/10 text-accent" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="text-xs text-muted-foreground mb-3 truncate">{user.email}</div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm" className="flex-1">
              <Link to="/">Voir le Site</Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-foreground/20 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-14 border-b border-border bg-card flex items-center px-4 lg:px-6 gap-4">
          <button className="lg:hidden text-foreground" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Admin</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">{tabLabels[activeTab]}</span>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {activeTab === "overview" && <AdminOverview onNavigate={setActiveTab} />}
          {activeTab === "builder" && <AdminPageBuilder />}
          {activeTab === "services" && <AdminServices />}
          {activeTab === "messages" && <AdminMessages />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

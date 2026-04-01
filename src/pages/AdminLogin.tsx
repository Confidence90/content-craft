import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, User } from "lucide-react";
import { Navigate } from "react-router-dom";

const AdminLogin = () => {
  const { signIn, isAdmin, loading, user } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-background"><p className="text-muted-foreground">Chargement...</p></div>;
  if (user && isAdmin) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const { error } = await signIn(identifier, password);
    if (error) {
      setError("Identifiants invalides");
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="bg-card rounded-2xl shadow-elevated border border-border p-8">
          <div className="text-center mb-8">
            <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="h-6 w-6 text-accent" />
            </div>
            <h1 className="font-heading font-bold text-xl text-foreground">Connexion Admin</h1>
            <p className="text-sm text-muted-foreground mt-1">Connectez-vous pour gérer votre site</p>
          </div>

          {user && !isAdmin && (
            <div className="bg-destructive/10 text-destructive text-sm rounded-lg p-3 mb-4 text-center">
              Vous n'avez pas les privilèges administrateur.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email ou Nom d'utilisateur</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-10" type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="admin@exemple.com ou admin" required autoComplete="username" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-10" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required autoComplete="current-password" />
              </div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Connexion en cours..." : "Se Connecter"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import api from "@/services/api";

export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  username?: string;
  telephone?: string;
  role: string;
  photo_profil?: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  signIn: (identifier: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user && !!accessToken;
  const isAdmin = user?.role === "ADMIN";

  const fetchCurrentUser = useCallback(async () => {
    try {
      const { data } = await api.get("/auth/me");
      setUser(data.user || data);
    } catch {
      // Token invalid — clean up
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
    }
  }, []);

  // Restore session on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedRefresh = localStorage.getItem("refreshToken");
    if (storedToken) {
      setAccessToken(storedToken);
      setRefreshToken(storedRefresh);
      fetchCurrentUser().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [fetchCurrentUser]);

  const signIn = async (identifier: string, password: string): Promise<{ error: Error | null }> => {
    try {
      const { data } = await api.post("/auth/connexion", { identifier, password });
      
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      setUser(data.user);
      
      return { error: null };
    } catch (err: any) {
      const message = err.response?.data?.message || err.response?.data?.error || "Identifiants invalides";
      return { error: new Error(message) };
    }
  };

  const signOut = async () => {
    try {
      await api.post("/auth/deconnexion");
    } catch {
      // Ignore logout API errors
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, refreshToken, isAuthenticated, isAdmin, loading, signIn, signOut, fetchCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { mockAdminUser, MockUser } from "@/data/mockData";

interface AuthContextType {
  user: MockUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  signIn: (identifier: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user && !!accessToken;
  const isAdmin = user?.role === "ADMIN";

  // Restore session on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedRefresh = localStorage.getItem("refreshToken");
    if (storedToken) {
      // In mock mode, restore the admin user
      setUser(mockAdminUser);
      setAccessToken(storedToken);
      setRefreshToken(storedRefresh);
    }
    setLoading(false);
  }, []);

  const signIn = async (identifier: string, password: string): Promise<{ error: Error | null }> => {
    // Mock authentication — accepts admin@techcorp.com / admin / Admin123!
    // When backend is connected, replace with: api.post("/connexion", { identifier, password })
    if (
      (identifier === mockAdminUser.email || identifier === mockAdminUser.username) &&
      password === "Admin123!"
    ) {
      const mockAccessToken = "mock-access-token-" + Date.now();
      const mockRefreshToken = "mock-refresh-token-" + Date.now();
      localStorage.setItem("accessToken", mockAccessToken);
      localStorage.setItem("refreshToken", mockRefreshToken);
      setAccessToken(mockAccessToken);
      setRefreshToken(mockRefreshToken);
      setUser(mockAdminUser);
      return { error: null };
    }
    return { error: new Error("Identifiants invalides") };
  };

  const signOut = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, refreshToken, isAuthenticated, isAdmin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

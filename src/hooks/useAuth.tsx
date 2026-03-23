import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const latestSessionCheckRef = useRef(0);

  const isStorageAccessible = () => {
    if (typeof window === "undefined") return false;
    try {
      const key = "__auth_storage_test__";
      window.localStorage.setItem(key, "1");
      window.localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  };

  const queryAdminRole = async (userId: string) => {
    return supabase
      .from("user_roles")
      .select("id")
      .eq("user_id", userId)
      .eq("role", "admin")
      .limit(1);
  };

  const checkAdmin = async (userId: string): Promise<boolean> => {
    const { data, error } = await queryAdminRole(userId);
    if (!error && (data?.length ?? 0) > 0) return true;

    if (!error && (data?.length ?? 0) === 0) {
      await new Promise((resolve) => setTimeout(resolve, 120));
      const { data: retryData, error: retryError } = await queryAdminRole(userId);
      if (!retryError) return (retryData?.length ?? 0) > 0;
    }

    const { data: fallback, error: fallbackError } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });

    if (fallbackError) return false;
    return !!fallback;
  };

  useEffect(() => {
    let mounted = true;

    if (!isStorageAccessible()) {
      supabase.auth.stopAutoRefresh();
    }

    const applySession = async (nextSession: Session | null) => {
      const checkId = ++latestSessionCheckRef.current;
      if (!mounted) return;

      setSession(nextSession);
      setUser(nextSession?.user ?? null);

      if (!nextSession?.user) {
        setIsAdmin(false);
        return;
      }

      const admin = await checkAdmin(nextSession.user.id);
      if (mounted && checkId === latestSessionCheckRef.current) setIsAdmin(admin);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, nextSession) => {
      const shouldBlockUI = event !== "TOKEN_REFRESHED";
      if (shouldBlockUI) setLoading(true);

      void applySession(nextSession).finally(() => {
        if (mounted && shouldBlockUI) setLoading(false);
      });
    });

    setLoading(true);
    void supabase.auth.getSession()
      .then(async ({ data, error }) => {
        if (error) throw error;
        await applySession(data.session);
      })
      .catch(() => {
        if (!mounted) return;
        setSession(null);
        setUser(null);
        setIsAdmin(false);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

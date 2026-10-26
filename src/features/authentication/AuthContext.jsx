import supabase from "@/services/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const queryClient = useQueryClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
      setSession(nextSession);
      setIsInitializing(false);

      if (event === "SIGNED_OUT") {
        queryClient.clear();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient]);

  const value = {
    session,
    user: session?.user ?? null,
    isAuthenticated: Boolean(session?.user),
    isInitializing,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

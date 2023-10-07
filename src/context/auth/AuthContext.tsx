import { createContext, useState } from "react";
import { User } from "../../types/models.types.ts";
import supabase from "../../lib/supabase/supabaseClient.ts";

interface AuthProviderValue {
  isUserLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
}

export const AuthContext = createContext<AuthProviderValue | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  async function login(email: string, password: string) {
    const data = await supabaseLogin(email, password);
    setUser({
      id: data?.user.id as string,
      email: data?.user.email as string,
      role: data?.user.role as string,
    });
  }

  async function signup(email: string, password: string) {
    const data = await supabaseSignup(email, password);
    if (!data?.user) return;
    setUser({
      id: data?.user.id as string,
      email: data?.user.email as string,
      role: data?.user.role as string,
    });
  }

  async function logout() {
    await supabaseLogout();
  }

  const value = {
    isUserLoggedIn: !!user,
    login,
    signup,
    logout,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

async function supabaseLogin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
  return data;
}

async function supabaseSignup(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    console.error(error);
    return;
  }
  return data;
}

async function supabaseLogout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    return;
  }
}

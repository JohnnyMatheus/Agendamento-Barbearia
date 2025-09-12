"use client";
import { supabase } from "@/lib/supabase-client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/input";

export default function BarberLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) alert(error.message);
    else window.location.href = "/barbeiro";
  }

  return (
    <div className="min-h-screen grid place-items-center bg-black text-white p-6">
      <div className="w-full max-w-sm bg-card border border-border rounded-xl p-6 space-y-4">
        <h1 className="text-2xl font-bold">Login do Barbeiro</h1>
        <Input
          label="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={handleLogin}
          disabled={!email || !password || loading}
          className="w-full"
        >
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </div>
    </div>
  );
}

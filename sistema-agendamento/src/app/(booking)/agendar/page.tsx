"use client";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";

type Service = {
  id: string;
  name: string;
  price_cents: number;
  duration_min: number;
};

type AvailabilitySlot = {
  start_time: string; // HH:MM
  end_time: string; // HH:MM
  is_available: boolean;
};

export default function AgendarPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [serviceId, setServiceId] = useState<string>("");
  const [date, setDate] = useState<string>(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [time, setTime] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadServices() {
      const { data } = await supabase
        .from("services")
        .select("id,name,price_cents,duration_min")
        .order("name");
      setServices(data ?? []);
    }
    loadServices();
  }, []);

  useEffect(() => {
    async function loadSlots() {
      if (!serviceId || !date) return setSlots([]);
      const { data } = await supabase.rpc("get_available_slots", {
        p_service_id: serviceId,
        p_date: date,
      });
      setSlots((data as AvailabilitySlot[]) ?? []);
    }
    loadSlots();
  }, [serviceId, date]);

  const selectedService = useMemo(
    () => services.find((s) => s.id === serviceId) || null,
    [serviceId, services]
  );

  async function submit() {
    setLoading(true);
    const { error } = await supabase.rpc("create_appointment_safe", {
      p_customer_name: name,
      p_customer_email: email,
      p_service_id: serviceId,
      p_date: date,
      p_time: time,
    });
    setLoading(false);
    if (!error) {
      alert("Agendamento criado com sucesso!");
    } else {
      alert(error.message);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <section className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">Preencha os detalhes</h2>
        <div className="space-y-4">
          <Input
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
          />
          <Input
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
          />

          <div className="space-y-2">
            <label className="text-sm font-medium">Serviço</label>
            <select
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
            >
              <option value="">Selecione o serviço</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — R$ {(s.price_cents / 100).toFixed(2)} (
                  {s.duration_min}min)
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Escolha a data</h2>
          <input
            type="date"
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            min={new Date().toISOString().slice(0, 10)}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Horário</h3>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {slots.length === 0 && (
              <p className="col-span-full text-muted-foreground">
                Selecione um serviço e uma data
              </p>
            )}
            {slots.map((s) => (
              <button
                key={s.start_time}
                disabled={!s.is_available}
                onClick={() => setTime(s.start_time)}
                className={`h-10 rounded-md text-sm border transition-colors ${
                  time === s.start_time
                    ? "bg-yellow-500 text-black border-yellow-500"
                    : s.is_available
                    ? "bg-background border-border hover:border-yellow-500 hover:bg-yellow-500/10"
                    : "bg-muted text-muted-foreground cursor-not-allowed border-transparent"
                }`}
              >
                {s.start_time}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            disabled={
              !name || !email || !serviceId || !date || !time || loading
            }
            onClick={submit}
            className="px-8"
          >
            {loading ? "Agendando..." : "Agendar"}
          </Button>
        </div>
      </section>
    </div>
  );
}

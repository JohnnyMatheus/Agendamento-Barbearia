"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";

type TodayAppointment = {
  id: string;
  customer_name: string;
  service_name: string;
  start_at: string; // ISO
};

export default function BarberDashboard() {
  const [appointments, setAppointments] = useState<TodayAppointment[]>([]);
  const [totals, setTotals] = useState({ today: 0, all: 0, revenue: 0 });

  useEffect(() => {
    async function load() {
      const { data: a } = await supabase.rpc("dashboard_today");
      setAppointments((a?.appointments as TodayAppointment[]) ?? []);
      setTotals({
        today: a?.today_count ?? 0,
        all: a?.all_count ?? 0,
        revenue: a?.revenue_cents ? a.revenue_cents / 100 : 0,
      });
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 lg:p-10 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Stat title="Agendamentos de hoje" value={totals.today} />
        <Stat title="Agendamentos totais" value={totals.all} />
        <Stat title="Receita" value={`R$ ${totals.revenue.toFixed(2)}`} />
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-3">Agendamentos de hoje</h2>
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-left">
            <thead className="bg-muted/10">
              <tr>
                <th className="p-3">Cliente</th>
                <th className="p-3">Hora</th>
                <th className="p-3">Serviço</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id} className="border-t border-border">
                  <td className="p-3">{a.customer_name}</td>
                  <td className="p-3">
                    {new Date(a.start_at).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="p-3">{a.service_name}</td>
                </tr>
              ))}
              {appointments.length === 0 && (
                <tr>
                  <td className="p-3 text-muted-foreground" colSpan={3}>
                    Sem agendamentos para hoje.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}

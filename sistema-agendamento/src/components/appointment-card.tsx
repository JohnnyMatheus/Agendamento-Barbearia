import React from "react";
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AppointmentCardProps {
  id: string;
  barber: string;
  service: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "cancelled";
  onCancel?: () => void;
  onReschedule?: () => void;
}

export function AppointmentCard({
  id,
  barber,
  service,
  date,
  time,
  status,
  onCancel,
  onReschedule,
}: AppointmentCardProps) {
  const statusColors = {
    confirmed: "bg-green-500",
    pending: "bg-yellow-500",
    cancelled: "bg-red-500",
  };

  const statusLabels = {
    confirmed: "Confirmado",
    pending: "Pendente",
    cancelled: "Cancelado",
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{service}</h3>
          <p className="text-muted-foreground">com {barber}</p>
        </div>
        <div
          className={cn(
            "px-3 py-1 rounded-full text-xs font-semibold text-white",
            statusColors[status]
          )}
        >
          {statusLabels[status]}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span>{date}</span>
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span>{time}</span>
      </div>

      {status === "confirmed" && (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onReschedule}
            className="flex-1"
          >
            Reagendar
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={onCancel}
            className="flex-1"
          >
            Cancelar
          </Button>
        </div>
      )}
    </div>
  );
}

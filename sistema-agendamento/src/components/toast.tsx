import React from "react";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastProps {
  type: "success" | "error" | "warning" | "info";
  title: string;
  description?: string;
  duration?: number;
}

export function Toast({
  type,
  title,
  description,
  duration = 5000,
}: ToastProps) {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  const Icon = icons[type];

  return (
    <div
      className={cn(
        "fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white max-w-sm z-50",
        colors[type]
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="font-semibold">{title}</h4>
          {description && (
            <p className="text-sm opacity-90 mt-1">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

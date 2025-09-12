import React from "react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  name: string;
  description: string;
  price: number;
  duration: number;
  isPopular?: boolean;
}

export function ServiceCard({
  name,
  description,
  price,
  duration,
  isPopular,
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-lg p-6 border border-border hover:border-yellow-500 transition-colors cursor-pointer",
        isPopular && "border-yellow-500 bg-yellow-500/5"
      )}
    >
      {isPopular && (
        <div className="bg-yellow-500 text-black text-xs font-semibold px-2 py-1 rounded-full inline-block mb-3">
          Mais Popular
        </div>
      )}
      <h3 className="font-semibold text-lg mb-2">{name}</h3>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-yellow-500">R$ {price}</span>
        <span className="text-sm text-muted-foreground">{duration}min</span>
      </div>
    </div>
  );
}

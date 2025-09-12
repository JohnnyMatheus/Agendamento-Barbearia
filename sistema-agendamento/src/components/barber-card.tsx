import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface BarberCardProps {
  name: string;
  specialty: string;
  rating: number;
  image: string;
  isAvailable: boolean;
}

export function BarberCard({
  name,
  specialty,
  rating,
  image,
  isAvailable,
}: BarberCardProps) {
  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="relative">
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          className="w-full h-48 rounded-lg object-cover"
        />
        {!isAvailable && (
          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold">Indisponível</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-muted-foreground text-sm">{specialty}</p>
        <div className="flex items-center gap-1 mt-2">
          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </div>
    </div>
  );
}

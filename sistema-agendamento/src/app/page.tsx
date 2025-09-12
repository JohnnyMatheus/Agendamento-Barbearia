import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Scissors, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex relative">
      {/* Global Header spanning full width */}
      <header className="absolute top-6 left-6 right-6 flex items-center justify-between z-30">
        {/* Logo (left) */}
        <div className="flex items-center gap-2">
          <Scissors className="h-8 w-8 text-yellow-500" />
          <span className="text-2xl font-bold tracking-tight">Barbers</span>
        </div>

        {/* Social Media Icons (right) + Login */}
        <div className="flex items-center gap-3">
          {[Facebook, Instagram, Twitter].map((Icon, idx) => (
            <button
              key={idx}
              aria-label="Rede social"
              className="h-9 w-9 rounded-full border border-yellow-500/40 text-yellow-500 grid place-items-center hover:bg-yellow-500 hover:text-black transition-colors"
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
          <Link href="/barbeiro/login" className="ml-2">
            <Button
              variant="outline"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black h-9 px-4"
            >
              Login
            </Button>
          </Link>
        </div>
      </header>

      {/* Center decorative divider */}
      <div className="hidden lg:block absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-yellow-500/20 to-transparent z-10" />

      {/* Left Content Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-16 lg:px-16 relative z-10">
        <div className="max-w-xl">
          <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Deixar você <span className="text-yellow-500">bonito</span> é nosso
            objetivo
          </h1>

          <p className="text-base lg:text-lg text-gray-300 mb-10 leading-relaxed max-w-prose">
            Tenha o corte perfeito dos seus sonhos na barbearia que se importa
            com seu estilo!
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/agendar">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all"
              >
                Agendar
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-semibold px-8 py-3 rounded-lg focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all"
            >
              Entre em contato
            </Button>
          </div>
        </div>
      </div>

      {/* Right Image Section - Full Height */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        {/* Subtle left gradient to blend with dark side */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black/50 to-transparent z-10" />

        {/* Background Image - Fill right side */}
        <div className="absolute inset-0">
          <Image
            src="/images/barbers/dev.png"
            alt="Barbeiro profissional"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            style={{ objectPosition: "center right" }}
            priority
          />
        </div>
      </div>
    </div>
  );
}

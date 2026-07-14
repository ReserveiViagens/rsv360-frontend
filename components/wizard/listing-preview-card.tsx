"use client";

import Image from "next/image";
import { MapPin, Star, Users, Bed, Bath } from "lucide-react";
import type { WizardFormData } from "@/lib/types/wizard";
import { calculateHostEarnings } from "@/lib/services/listing-service";

interface ListingPreviewCardProps {
  data: WizardFormData;
}

export function ListingPreviewCard({ data }: ListingPreviewCardProps) {
  const { step1, step2, step3 } = data;
  const coverPhoto = step2.photos?.find((p) => p.isCover)?.url || step2.photos?.[0]?.url;
  const hostEarnings = calculateHostEarnings(step3.basePrice || 0);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
      {/* Foto de Capa */}
      <div className="relative w-full h-64 bg-gray-200">
        {typeof coverPhoto === "string" ? (
          <img
            src={coverPhoto}
            alt={step2.title || "Anúncio"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50">
            <span className="text-gray-400 text-sm">Sem foto de capa</span>
          </div>
        )}
        {/* Badge Rating */}
        <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center gap-1 shadow-md">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold">4.9</span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-4 space-y-3">
        {/* Localização */}
        <div className="flex items-start gap-2">
          <MapPin size={16} className="text-gray-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gray-600">{step1.address || "Localização"}</p>
          </div>
        </div>

        {/* Título */}
        <h3 className="font-bold text-base line-clamp-2">
          {step2.title || "Título do anúncio"}
        </h3>

        {/* Capacidade */}
        <div className="flex gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{step1.guests} hóspedes</span>
          </div>
          <div className="flex items-center gap-1">
            <Bed size={14} />
            <span>{step1.bedrooms} quartos</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={14} />
            <span>{step1.bathrooms} banheiros</span>
          </div>
        </div>

        {/* Preço */}
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-lg">
              R$ {step3.basePrice?.toFixed(2).replace(".", ",")}
            </span>
            <span className="text-sm text-gray-600">/noite</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Você recebe R$ {hostEarnings.toFixed(2).replace(".", ",")} por noite
          </p>
        </div>

        {/* Desconto Fim de Semana */}
        {step3.weekendDiscount > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-xs text-blue-700">
            <span className="font-semibold">{step3.weekendDiscount}% de desconto</span> nos fins de semana
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { MapPin } from "lucide-react";
import type { Location } from "@/lib/mock-data";

interface MapSectionProps {
  location: Location;
  name: string;
}

export function MapSection({ location, name }: MapSectionProps) {
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.1234567890!2d${location.longitude}!3d${location.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${encodeURIComponent(location.address + ", " + location.city)}!5e0!3m2!1spt-BR!2sbr!4v`;

  return (
    <section className="py-6 md:py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
        Onde você vai estar
      </h2>

      <div className="rounded-lg overflow-hidden border border-gray-200 h-96 md:h-[500px]">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Mapa de localização de ${name}`}
        />
      </div>

      <div className="mt-4 md:mt-6 p-4 md:p-5 bg-blue-50 rounded-lg border border-[#0066cc]">
        <div className="flex gap-3 items-start">
          <MapPin size={20} className="text-[#0066cc] flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Localização</h3>
            <p className="text-gray-700 text-sm md:text-base">
              {location.address}
            </p>
            <p className="text-gray-600 text-sm md:text-base">
              {location.city}, {location.state} {location.zipCode}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

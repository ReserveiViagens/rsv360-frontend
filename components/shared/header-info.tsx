import { MapPin, Star, Shield } from "lucide-react";
import type { Accommodation } from "@/lib/mock-data";

interface HeaderInfoProps {
  accommodation: Accommodation;
}

export function HeaderInfo({ accommodation }: HeaderInfoProps) {
  const { name, location, rating, reviewCount } = accommodation;

  return (
    <div className="space-y-3">
      <h1 className="text-3xl md:text-4xl font-bold text-pretty text-gray-900">
        {name}
      </h1>

      <div className="flex flex-wrap items-center gap-2 md:gap-4">
        <div className="flex items-center gap-1">
          <MapPin size={18} className="text-[#0066cc]" aria-hidden="true" />
          <span className="text-gray-700">{location.city}, {location.state}</span>
        </div>

        <div className="flex items-center gap-1">
          <Star size={18} className="fill-[#ff9900] text-[#ff9900]" aria-hidden="true" />
          <span className="font-semibold text-gray-900">{rating}</span>
          <span className="text-gray-600">({reviewCount} avaliações)</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge icon={<Shield size={16} />} label="Anfitrião verificado" />
        <Badge icon={<Star size={16} />} label="Resevei Viagens" />
      </div>
    </div>
  );
}

function Badge({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-[#0066cc] rounded-full text-sm text-gray-700">
      <span className="text-[#0066cc]">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

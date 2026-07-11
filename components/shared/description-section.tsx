import { Users, Bed, Bath, Maximize2 } from "lucide-react";
import type { Accommodation } from "@/lib/mock-data";

interface DescriptionSectionProps {
  accommodation: Accommodation;
}

export function DescriptionSection({ accommodation }: DescriptionSectionProps) {
  const { description, maxGuests, bedrooms, bathrooms, areaSqm } = accommodation;

  return (
    <div className="space-y-4 md:space-y-6 py-4 md:py-6 border-t border-b border-gray-200">
      <p className="text-base md:text-lg text-gray-700 leading-relaxed">
        {description}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <InfoCard
          icon={<Users size={20} />}
          label="Hóspedes"
          value={maxGuests}
        />
        <InfoCard icon={<Bed size={20} />} label="Quartos" value={bedrooms} />
        <InfoCard
          icon={<Bath size={20} />}
          label="Banheiros"
          value={bathrooms}
        />
        <InfoCard
          icon={<Maximize2 size={20} />}
          label="Área"
          value={`${areaSqm} m²`}
        />
      </div>
    </div>
  );
}

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

function InfoCard({ icon, label, value }: InfoCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 p-3 bg-blue-50 rounded-lg">
      <div className="text-[#0066cc]">{icon}</div>
      <div className="text-center">
        <div className="text-sm text-gray-600">{label}</div>
        <div className="text-lg font-semibold text-gray-900">{value}</div>
      </div>
    </div>
  );
}

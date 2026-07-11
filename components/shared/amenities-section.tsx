import {
  Waves,
  Wifi,
  UtensilsCrossed,
  Sparkles,
  ParkingCircle,
  Dumbbell,
  Tv2,
  Home,
} from "lucide-react";
import type { Amenity } from "@/lib/mock-data";

const iconMap: Record<string, React.ReactNode> = {
  Waves: <Waves size={24} />,
  Wifi: <Wifi size={24} />,
  UtensilsCrossed: <UtensilsCrossed size={24} />,
  Sparkles: <Sparkles size={24} />,
  ParkingCircle: <ParkingCircle size={24} />,
  Dumbbell: <Dumbbell size={24} />,
  Tv2: <Tv2 size={24} />,
  Home: <Home size={24} />,
};

interface AmenitiesSectionProps {
  amenities: Amenity[];
}

export function AmenitiesSection({ amenities }: AmenitiesSectionProps) {
  return (
    <section className="py-6 md:py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
        O que este lugar oferece
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {amenities.map((amenity) => (
          <div
            key={amenity.id}
            className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-[#0066cc] hover:bg-blue-50 transition-all"
          >
            <div className="flex-shrink-0 text-[#0066cc]">
              {iconMap[amenity.icon] || <Home size={24} />}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{amenity.name}</h3>
              {amenity.description && (
                <p className="text-sm text-gray-600 mt-1">{amenity.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

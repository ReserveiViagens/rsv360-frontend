import { LogIn, HandshakeIcon, Smile, LogOut } from "lucide-react";
import type { Timeline } from "@/lib/mock-data";

const iconMap: Record<string, React.ReactNode> = {
  LogIn: <LogIn size={24} />,
  HandshakeIcon: <HandshakeIcon size={24} />,
  Smile: <Smile size={24} />,
  LogOut: <LogOut size={24} />,
};

interface TimelineSectionProps {
  timeline: Timeline[];
}

export function TimelineSection({ timeline }: TimelineSectionProps) {
  return (
    <section className="py-6 md:py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
        Cronograma de sua estadia
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {timeline.map((item, index) => (
          <div key={item.id} className="relative">
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#ff9900]/10 border-2 border-[#ff9900] text-[#ff9900]">
                {iconMap[item.icon] || <Smile size={24} />}
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mt-1">
                  {item.description}
                </p>
              </div>
            </div>

            {index < timeline.length - 1 && (
              <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-gradient-to-r from-[#ff9900]/30 to-transparent -translate-y-1/2" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

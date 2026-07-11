"use client";

import { useState } from "react";
import { Star, Users, Calendar } from "lucide-react";
import type { Accommodation } from "@/lib/mock-data";

interface BookingCardProps {
  accommodation: Accommodation;
  isFixedMobile?: boolean;
}

export function BookingCard({
  accommodation,
  isFixedMobile = false,
}: BookingCardProps) {
  const { pricing, maxGuests } = accommodation;
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);

  // Cálculo de noites e total
  const calculateTotalPrice = () => {
    if (!checkInDate || !checkOutDate) return 0;

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (nights <= 0) return 0;
    return nights * pricing.pricePerNight;
  };

  const totalPrice = calculateTotalPrice();
  const nights =
    checkInDate && checkOutDate
      ? Math.ceil(
          (new Date(checkOutDate).getTime() -
            new Date(checkInDate).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const whatsappMessage = encodeURIComponent(
    `Olá! Gostaria de reservar ${accommodation.name} para ${nights} noite(s), chegando em ${checkInDate} e saindo em ${checkOutDate}, para ${guests} hóspede(s). Total: R$ ${totalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
  );

  const whatsappLink = `https://wa.me/5562999999999?text=${whatsappMessage}`;

  const containerClass = isFixedMobile
    ? "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 rounded-t-lg shadow-lg p-4 z-40"
    : "sticky top-6 border border-gray-200 rounded-lg p-6 bg-white shadow-sm";

  return (
    <div className={containerClass}>
      <div className="space-y-4 max-w-sm mx-auto md:mx-0">
        {/* Preço */}
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-gray-900">
            R$ {pricing.pricePerNight}
          </span>
          <span className="text-gray-600">/noite</span>
        </div>

        {/* Datas */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Check-in
            </label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0066cc] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Check-out
            </label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0066cc] focus:border-transparent"
            />
          </div>
        </div>

        {/* Hóspedes */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Hóspedes
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0066cc] focus:border-transparent"
          >
            {Array.from({ length: maxGuests }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} {i === 0 ? "hóspede" : "hóspedes"}
              </option>
            ))}
          </select>
        </div>

        {/* Total */}
        {totalPrice > 0 && (
          <div className="p-3 bg-blue-50 rounded-lg border border-[#0066cc]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-700">
                R$ {pricing.pricePerNight} × {nights} noite{nights > 1 ? "s" : ""}
              </span>
              <span className="font-semibold text-gray-900">
                R$ {totalPrice.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <p className="text-xs text-gray-600">
              Parcele em até {pricing.maxInstallments}x
            </p>
          </div>
        )}

        {/* CTA WhatsApp */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full py-3 bg-[#ff9900] hover:bg-[#ff8c00] text-white font-semibold rounded-lg transition-colors inline-block text-center ${
            !totalPrice ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
          }`}
        >
          Reservar pelo WhatsApp
        </a>

        {/* Rating */}
        {!isFixedMobile && (
          <div className="flex items-center gap-2 text-sm text-gray-700 border-t pt-4">
            <div className="flex items-center gap-0.5">
              <Star size={16} className="fill-[#ff9900] text-[#ff9900]" />
              <span className="font-semibold">{accommodation.rating}</span>
            </div>
            <span className="text-gray-600">
              ({accommodation.reviewCount} avaliações)
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

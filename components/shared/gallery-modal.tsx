"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Image as ImageType } from "@/lib/mock-data";

interface GalleryModalProps {
  images: ImageType[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export function GalleryModal({
  images,
  isOpen,
  onClose,
  initialIndex = 0,
}: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (!isOpen) return null;

  const current = images[currentIndex];
  const total = images.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl aspect-[4/3]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors"
          aria-label="Fechar galeria"
        >
          <X size={24} className="text-white" />
        </button>

        <Image
          src={current.url}
          alt={current.alt}
          fill
          className="object-cover rounded-lg"
          priority
        />

        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors"
          aria-label="Imagem anterior"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors"
          aria-label="Próxima imagem"
        >
          <ChevronRight size={24} className="text-white" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
          {currentIndex + 1} / {total}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { GalleryModal } from "./gallery-modal";
import type { Image as ImageType } from "@/lib/mock-data";

interface GallerySectionProps {
  images: ImageType[];
}

export function GallerySection({ images }: GallerySectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) return null;

  const primaryImage = images[0];
  const thumbnails = images.slice(1, 5);

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index + 1);
    setIsModalOpen(true);
  };

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
        {/* Desktop: Foto grande esquerda (50%) + Grid 2x2 direita (50%) */}
        {/* Mobile: Stack vertical */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-auto md:h-96">
          {/* Imagem Principal - Esquerda (50%) */}
          <button
            onClick={() => openModal(0)}
            className="relative w-full h-48 md:h-full rounded-t-lg md:rounded-t-none md:rounded-l-lg overflow-hidden group cursor-pointer bg-gray-200 flex items-center justify-center"
            aria-label="Visualizar galeria completa"
          >
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            <div className="absolute top-3 right-3 bg-white px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-sm font-semibold text-gray-900">
                Mostrar todas
              </span>
            </div>
          </button>

          {/* Thumbnails - Direita (50%), Grid 2x2 */}
          <div className="grid grid-cols-2 gap-0 auto-rows-fr rounded-b-lg md:rounded-b-none md:rounded-r-lg overflow-hidden">
            {thumbnails.map((img, index) => (
              <button
                key={img.id}
                onClick={() => handleThumbnailClick(index)}
                className="relative w-full h-24 md:h-full flex items-center justify-center cursor-pointer bg-gray-200 group overflow-hidden"
                aria-label={`Ver ${img.alt}`}
              >
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <ImageIcon className="w-5 h-5 text-gray-400 pointer-events-none" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <GalleryModal
        images={images}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialIndex={selectedIndex}
      />
    </>
  );
}

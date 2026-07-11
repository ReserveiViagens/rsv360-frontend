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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-2 p-1 md:p-2 auto-rows-fr">
          {/* Imagem Principal - Ocupa 2 colunas e 2 linhas no desktop */}
          <button
            onClick={() => openModal(0)}
            className="relative w-full h-48 sm:h-64 md:col-span-2 md:row-span-2 md:h-96 rounded-lg overflow-hidden group cursor-pointer bg-gray-200 flex items-center justify-center"
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

          {/* Thumbnails - Grid 2x2 */}
          {thumbnails.map((img, index) => (
            <button
              key={img.id}
              onClick={() => handleThumbnailClick(index)}
              className="relative w-full h-24 sm:h-32 md:h-24 rounded-lg overflow-hidden group cursor-pointer bg-gray-200 flex items-center justify-center"
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
              {/* Ícone de erro como fallback */}
              <ImageIcon className="w-6 h-6 text-gray-400" />
            </button>
          ))}
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

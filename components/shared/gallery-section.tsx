"use client";

import { useState } from "react";
import Image from "next/image";
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

  return (
    <>
      <div className="grid grid-cols-1 gap-2 sm:gap-3 md:grid-cols-3 md:gap-4">
        {/* Imagem Principal */}
        <button
          onClick={() => {
            setSelectedIndex(0);
            setIsModalOpen(true);
          }}
          className="relative w-full h-48 sm:h-64 md:col-span-2 md:row-span-2 md:h-96 rounded-lg overflow-hidden group cursor-pointer"
          aria-label="Visualizar galeria completa"
        >
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </button>

        {/* Thumbnails */}
        {thumbnails.map((img, index) => (
          <button
            key={img.id}
            onClick={() => handleThumbnailClick(index)}
            className="relative w-full h-24 sm:h-32 md:h-28 rounded-lg overflow-hidden group cursor-pointer"
            aria-label={`Ver ${img.alt}`}
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </button>
        ))}
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

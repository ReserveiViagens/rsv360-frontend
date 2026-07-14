'use client';

import { useState, useRef } from 'react';
import { Upload, X, Copy, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useWizard } from '@/lib/contexts/wizard-context';
import { amenities, highlights } from '@/lib/wizard-data';
import type { PhotoItem } from '@/lib/types/wizard';
import Image from 'next/image';

export function Step2() {
  const { formData, updateStep } = useWizard();
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const step2 = formData.step2;

  // Amenidades
  const toggleAmenity = (amenity: string) => {
    const updated = step2.amenities.includes(amenity)
      ? step2.amenities.filter((a) => a !== amenity)
      : [...step2.amenities, amenity];
    updateStep(2, { step2: { ...step2, amenities: updated } });
  };

  // Fotos
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    processFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const processFiles = (files: FileList) => {
    const newPhotos: PhotoItem[] = [];

    Array.from(files).forEach((file, index) => {
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        newPhotos.push({
          id: `photo-${Date.now()}-${index}`,
          url,
          file,
          isCover: step2.photos.length === 0 && index === 0,
          order: step2.photos.length + index,
        });
      }
    });

    updateStep(2, {
      step2: { ...step2, photos: [...step2.photos, ...newPhotos] },
    });
  };

  const removePhoto = (id: string) => {
    const updated = step2.photos.filter((p) => p.id !== id);
    updateStep(2, { step2: { ...step2, photos: updated } });
  };

  const setCoverPhoto = (id: string) => {
    const updated = step2.photos.map((p) => ({
      ...p,
      isCover: p.id === id,
    }));
    updateStep(2, { step2: { ...step2, photos: updated } });
  };

  const reorderPhotos = (id: string, direction: 'up' | 'down') => {
    const index = step2.photos.findIndex((p) => p.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === step2.photos.length - 1)
    ) {
      return;
    }

    const newPhotos = [...step2.photos];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newPhotos[index], newPhotos[swapIndex]] = [newPhotos[swapIndex], newPhotos[index]];

    updateStep(2, {
      step2: { ...step2, photos: newPhotos },
    });
  };

  // Título e Destaques
  const handleTitleChange = (value: string) => {
    if (value.length <= 50) {
      updateStep(2, { step2: { ...step2, title: value } });
    }
  };

  const toggleHighlight = (highlight: string) => {
    const updated = step2.highlights.includes(highlight)
      ? step2.highlights.filter((h) => h !== highlight)
      : [...step2.highlights, highlight].slice(0, 3);
    updateStep(2, { step2: { ...step2, highlights: updated } });
  };

  return (
    <div className="space-y-8">
      {/* Comodidades */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Que comodidades você oferece?</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {amenities.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <Checkbox
                checked={step2.amenities.includes(amenity)}
                onCheckedChange={() => toggleAmenity(amenity)}
              />
              <span className="text-sm font-medium">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Upload de Fotos */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Adicione fotos</h2>
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
        >
          <Upload size={32} className="mx-auto mb-2 text-gray-400" />
          <p className="text-gray-700 font-semibold mb-1">Arraste fotos aqui</p>
          <p className="text-sm text-gray-500 mb-4">ou</p>
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            Selecionar Fotos
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Preview de Fotos */}
        {step2.photos.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Fotos adicionadas ({step2.photos.length})</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {step2.photos.map((photo, idx) => (
                <div
                  key={photo.id}
                  className={`relative rounded-lg overflow-hidden border-2 ${
                    photo.isCover ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={photo.url}
                    alt={`Foto ${idx + 1}`}
                    width={200}
                    height={150}
                    className="w-full h-32 object-cover"
                  />
                  {photo.isCover && (
                    <div className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      Capa
                    </div>
                  )}
                  <div className="absolute top-1 right-1 flex gap-1">
                    {!photo.isCover && (
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => setCoverPhoto(photo.id)}
                        className="h-6 w-6 p-0 bg-white hover:bg-gray-100"
                      >
                        <Copy size={14} />
                      </Button>
                    )}
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => removePhoto(photo.id)}
                      className="h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white"
                    >
                      <X size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Título */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Dê um título atraente</h2>
        <div>
          <Label htmlFor="title">Título da acomodação</Label>
          <div className="relative">
            <Input
              id="title"
              value={step2.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Ex: Apartamento com vista para as termas"
              maxLength={50}
            />
            <span className="absolute right-3 top-3 text-sm text-gray-500">
              {step2.title.length}/50
            </span>
          </div>
        </div>
      </div>

      {/* Destaques */}
      <div>
        <h2 className="text-2xl font-bold mb-4">O que torna sua acomodação especial? (Máx: 3)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {highlights.map((highlight) => (
            <label
              key={highlight}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <Checkbox
                checked={step2.highlights.includes(highlight)}
                onCheckedChange={() => toggleHighlight(highlight)}
                disabled={
                  !step2.highlights.includes(highlight) && step2.highlights.length >= 3
                }
              />
              <span className="text-sm font-medium">{highlight}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

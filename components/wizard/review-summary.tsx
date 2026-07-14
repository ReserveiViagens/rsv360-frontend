"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Edit2, Wifi, Droplet, Utensils, Tv, Zap, Key, Users, MapPin, Home, ChevronRight } from "lucide-react";
import type { WizardFormData } from "@/lib/types/wizard";
import { Button } from "@/components/ui/button";
import { publishListing, calculateHostEarnings } from "@/lib/services/listing-service";
import { ListingPreviewCard } from "./listing-preview-card";
import { PublishDialog } from "./publish-dialog";
import { propertyTypes, spaceTypes } from "@/lib/wizard-data";

interface ReviewSummaryProps {
  data: WizardFormData;
}

export function ReviewSummary({ data }: ReviewSummaryProps) {
  const router = useRouter();
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [listingId, setListingId] = useState<string | null>(null);

  const { step1, step2, step3 } = data;

  const handleEdit = (step: number) => {
    router.push(`/wizard?step=${step}`);
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    setPublishError(null);

    const result = await publishListing({
      ...data,
      publishedAt: new Date(),
    });

    if (result.success && result.listingId) {
      setListingId(result.listingId);
      setPublishSuccess(true);
    } else {
      setPublishError(result.error || "Erro ao publicar anúncio");
    }

    setIsPublishing(false);
  };

  if (publishSuccess && listingId) {
    return (
      <PublishDialog
        listingId={listingId}
        title={step2.title || "Anúncio"}
        onViewListing={() => router.push(`/listings/${listingId}`)}
        onBackHome={() => router.push("/")}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Título */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Revise seu anúncio</h1>
        <p className="text-gray-600 mt-1">Confira todos os detalhes antes de publicar</p>
      </div>

      {/* Grid: Resumo (70%) + Preview (30%) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna Esquerda - Resumo */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Tipo de Propriedade */}
          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <Home size={24} className="text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Tipo de propriedade</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {propertyTypes.find((p) => p.id === step1.propertyType)?.label || step1.propertyType}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(1)}
                className="text-blue-600 hover:bg-blue-50"
              >
                <Edit2 size={16} className="mr-1" /> Editar
              </Button>
            </div>
          </section>

          {/* 2. Tipo de Espaço */}
          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <Key size={24} className="text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Tipo de espaço</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {spaceTypes.find((s) => s.id === step1.spaceType)?.label || step1.spaceType}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(1)}
                className="text-blue-600 hover:bg-blue-50"
              >
                <Edit2 size={16} className="mr-1" /> Editar
              </Button>
            </div>
          </section>

          {/* 3. Localização */}
          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <MapPin size={24} className="text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Localização</h3>
                  <p className="text-sm text-gray-600 mt-1">{step1.address}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(1)}
                className="text-blue-600 hover:bg-blue-50"
              >
                <Edit2 size={16} className="mr-1" /> Editar
              </Button>
            </div>
          </section>

          {/* 4. Capacidade */}
          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <Users size={24} className="text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Capacidade</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <p className="text-gray-600">
                      <span className="font-semibold">{step1.guests}</span> hóspedes
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">{step1.bedrooms}</span> quartos
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">{step1.beds}</span> camas
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">{step1.bathrooms}</span> banheiros
                    </p>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(1)}
                className="text-blue-600 hover:bg-blue-50"
              >
                <Edit2 size={16} className="mr-1" /> Editar
              </Button>
            </div>
          </section>

          {/* 5. Comodidades */}
          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Comodidades</h3>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {step2.amenities?.slice(0, 8).map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-blue-600">✓</span>
                      {amenity}
                    </div>
                  ))}
                </div>
                {(step2.amenities?.length || 0) > 8 && (
                  <p className="text-sm text-gray-500 mt-2">
                    +{(step2.amenities?.length || 0) - 8} mais
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(2)}
                className="text-blue-600 hover:bg-blue-50"
              >
                <Edit2 size={16} className="mr-1" /> Editar
              </Button>
            </div>
          </section>

          {/* 6. Fotos */}
          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Fotos</h3>
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {step2.photos?.slice(0, 4).map((photo, idx) => (
                    <div key={idx} className="relative aspect-square">
                      <img
                        src={photo.url}
                        alt={`Foto ${idx + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      {photo.isCover && (
                        <div className="absolute inset-0 border-2 border-blue-600 rounded-lg" />
                      )}
                    </div>
                  ))}
                </div>
                {(step2.photos?.length || 0) > 4 && (
                  <p className="text-sm text-gray-500 mt-2">
                    +{(step2.photos?.length || 0) - 4} mais fotos
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(2)}
                className="text-blue-600 hover:bg-blue-50"
              >
                <Edit2 size={16} className="mr-1" /> Editar
              </Button>
            </div>
          </section>

          {/* 7. Título */}
          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Título</h3>
                <p className="text-sm text-gray-600 mt-1">{step2.title}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(2)}
                className="text-blue-600 hover:bg-blue-50"
              >
                <Edit2 size={16} className="mr-1" /> Editar
              </Button>
            </div>
          </section>

          {/* 8. Descrição */}
          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Descrição</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-3">{step3.description}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(3)}
                className="text-blue-600 hover:bg-blue-50"
              >
                <Edit2 size={16} className="mr-1" /> Editar
              </Button>
            </div>
          </section>

          {/* Preços */}
          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                <h3 className="font-semibold text-gray-900">Preço e Políticas</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Preço base/noite:</span>
                    <span className="font-semibold">R$ {step3.basePrice?.toFixed(2).replace(".", ",")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cancelamento:</span>
                    <span className="font-semibold capitalize">{step3.reservationType || "Flexível"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Desconto fim de semana:</span>
                    <span className="font-semibold">{step3.weekendDiscount || 0}%</span>
                  </div>
                  <div className="flex justify-between text-blue-600 font-semibold border-t pt-2">
                    <span>Você recebe/noite:</span>
                    <span>R$ {calculateHostEarnings(step3.basePrice || 0).toFixed(2).replace(".", ",")}</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(3)}
                className="text-blue-600 hover:bg-blue-50"
              >
                <Edit2 size={16} className="mr-1" /> Editar
              </Button>
            </div>
          </section>

          {/* Botão Publicar */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => router.push("/wizard?step=3")}
              className="flex-1"
            >
              Voltar
            </Button>
            <Button
              onClick={handlePublish}
              disabled={isPublishing}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isPublishing ? "Publicando..." : "Publicar Anúncio"}
            </Button>
          </div>

          {publishError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
              {publishError}
            </div>
          )}
        </div>

        {/* Coluna Direita - Preview Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <h3 className="font-semibold text-gray-900 mb-4">Preview do anúncio</h3>
            <ListingPreviewCard data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

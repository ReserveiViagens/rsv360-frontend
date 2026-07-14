import { randomUUID } from "crypto";
import type { WizardFormData } from "@/lib/types/wizard";

export interface PublishPayload extends WizardFormData {
  publishedAt: Date;
}

export interface PublishResponse {
  success: boolean;
  listingId?: string;
  error?: string;
}

/**
 * MOCKADO: Simula publicação de anúncio
 * TODO: Integrar com API Express na Fase 4
 */
export async function publishListing(
  payload: PublishPayload
): Promise<PublishResponse> {
  // Simulação de delay de rede
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Validações básicas
  if (
    !payload.step1.propertyType ||
    !payload.step1.spaceType ||
    !payload.step1.address
  ) {
    return {
      success: false,
      error: "Propriedade, tipo de espaço e endereço são obrigatórios",
    };
  }

  if (!payload.step2.photos || payload.step2.photos.length === 0) {
    return {
      success: false,
      error: "Adicione pelo menos uma foto",
    };
  }

  if (!payload.step2.title || payload.step2.title.trim().length === 0) {
    return {
      success: false,
      error: "Título do anúncio é obrigatório",
    };
  }

  if (!payload.step3.description || payload.step3.description.trim().length === 0) {
    return {
      success: false,
      error: "Descrição é obrigatória",
    };
  }

  if (!payload.step3.basePrice || payload.step3.basePrice <= 0) {
    return {
      success: false,
      error: "Preço base deve ser maior que zero",
    };
  }

  // Simulação de sucesso: retorna UUID
  const listingId = randomUUID();

  console.log("[v0] Listing published (mockado):", {
    listingId,
    title: payload.step2.title,
    propertyType: payload.step1.propertyType,
    price: payload.step3.basePrice,
  });

  return {
    success: true,
    listingId,
  };
}

/**
 * Calcula preço que o anfitrião recebe (após taxa de 8%)
 */
export function calculateHostEarnings(basePrice: number): number {
  const commission = basePrice * 0.08;
  return Math.round((basePrice - commission) * 100) / 100;
}

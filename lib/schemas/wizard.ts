import { z } from 'zod';

export const step1Schema = z.object({
  propertyType: z.enum(['apartment', 'house', 'cottage', 'villa', 'beachhouse', 'penthouse', 'other']).nullable(),
  spaceType: z.enum(['entire', 'private_room', 'shared_room']).nullable(),
  address: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
  city: z.string().min(2, 'Cidade é obrigatória'),
  state: z.string().length(2, 'Estado deve ter 2 letras (ex: GO)'),
  coordinates: z.object({ lat: z.number(), lng: z.number() }).nullable(),
  guests: z.number().min(1, 'Mínimo 1 hóspede').max(20, 'Máximo 20 hóspedes'),
  bedrooms: z.number().min(1, 'Mínimo 1 quarto').max(20, 'Máximo 20 quartos'),
  beds: z.number().min(1, 'Mínimo 1 cama').max(50, 'Máximo 50 camas'),
  bathrooms: z.number().min(1, 'Mínimo 1 banheiro').max(20, 'Máximo 20 banheiros'),
});

export const step2Schema = z.object({
  amenities: z.array(z.string()).min(5, 'Selecione pelo menos 5 comodidades'),
  photos: z.array(z.object({
    id: z.string(),
    url: z.string(),
    file: z.instanceof(File).optional(),
    isCover: z.boolean(),
    order: z.number(),
  })).min(1, 'Adicione pelo menos 1 foto'),
  title: z.string().min(10, 'Título deve ter pelo menos 10 caracteres').max(50, 'Máximo 50 caracteres'),
  highlights: z.array(z.string()).max(3, 'Máximo 3 destaques'),
});

export const step3Schema = z.object({
  description: z.string().min(20, 'Descrição muito curta').max(500, 'Máximo 500 caracteres'),
  reservationType: z.enum(['flexible', 'moderate', 'strict']),
  instantBooking: z.boolean(),
  basePrice: z.number().min(50, 'Preço mínimo R$ 50').max(10000, 'Preço máximo R$ 10.000'),
  weekendDiscount: z.number().min(0, 'Desconto mínimo 0%').max(100, 'Desconto máximo 100%'),
  weekendPrice: z.number().min(50, 'Preço mínimo R$ 50').max(10000, 'Preço máximo R$ 10.000'),
  minNightStay: z.number().min(1, 'Mínimo 1 noite').max(90, 'Máximo 90 noites'),
});

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;

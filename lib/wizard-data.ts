import type { PropertyType, SpaceType } from './types/wizard';

export const propertyTypes: Array<{
  id: PropertyType;
  label: string;
  icon: string;
  description: string;
}> = [
  { id: 'apartment', label: 'Apartamento', icon: '🏢', description: 'Apartamento ou flat' },
  { id: 'house', label: 'Casa', icon: '🏠', description: 'Casa inteira ou sobrado' },
  { id: 'cottage', label: 'Chalé', icon: '🏡', description: 'Chalé ou kitnet' },
  { id: 'villa', label: 'Villa', icon: '🏰', description: 'Villa ou mansão' },
  { id: 'beachhouse', label: 'Casa na Praia', icon: '🏖️', description: 'Casa frente ao mar' },
  { id: 'penthouse', label: 'Penthouse', icon: '🌆', description: 'Penthouse com vista' },
  { id: 'other', label: 'Outro', icon: '🏗️', description: 'Outro tipo' },
];

export const spaceTypes: Array<{
  id: SpaceType;
  label: string;
  description: string;
}> = [
  { id: 'entire', label: 'Lugar inteiro', description: 'Os hóspedes têm o espaço só para eles' },
  {
    id: 'private_room',
    label: 'Quarto privado',
    description: 'Os hóspedes alugam um quarto e compartilham áreas comuns',
  },
  {
    id: 'shared_room',
    label: 'Quarto compartilhado',
    description: 'Os hóspedes compartilham quarto e banheiro com outros',
  },
];

export const amenities = [
  'WiFi',
  'Ar-condicionado',
  'TV',
  'Cozinha',
  'Aquecedor',
  'Ferro',
  'Cabideiro',
  'Secador de cabelo',
  'Trabalho remoto',
  'Pátio',
  'Piscina',
  'Banheira',
  'Máquina de lavar roupa',
  'Secadora',
  'Micro-ondas',
  'Lavadora de louças',
  'Geladeira',
  'Freezer',
  'Forno',
  'Fogão',
  'Café/Chá',
  'Animais de estimação',
  'Estacionamento',
  'Garagem',
  'Elevador',
  'Segurança 24 horas',
  'Portaria',
  'Spa/Jacuzzi',
  'Sauna',
  'Churrasqueira',
];

export const highlights = [
  'Localização privilegiada',
  'Piscina e área de lazer',
  'Vistas incríveis',
  'Conforto e luxo',
  'Natureza preservada',
  'Segurança completa',
  'Recepção 24h',
  'Serviço de concierge',
];

export const caldas_novas_coordinates = {
  lat: -18.0633,
  lng: -48.9961,
};

export const reservationTypes = [
  { id: 'flexible', label: 'Flexível', description: 'Cancelamento grátis até 1 dia antes' },
  { id: 'moderate', label: 'Moderada', description: 'Cancelamento grátis até 3 dias antes' },
  { id: 'strict', label: 'Rigorosa', description: 'Sem reembolso' },
];

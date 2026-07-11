export interface Image {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string; // lucide-react icon name
  description?: string;
}

export interface Timeline {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Pricing {
  pricePerNight: number;
  currency: string;
  minNights?: number;
  maxInstallments: number;
}

export interface Location {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface Accommodation {
  id: string;
  name: string;
  location: Location;
  description: string;
  rating: number;
  reviewCount: number;
  images: Image[];
  amenities: Amenity[];
  timeline: Timeline[];
  faqs: FAQ[];
  pricing: Pricing;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
}

export const mockAccommodation: Accommodation = {
  id: "lacqua-diroma-001",
  name: "Lacqua diRoma — Caldas Novas",
  location: {
    address: "Rua das Águas Termais, 1000",
    city: "Caldas Novas",
    state: "GO",
    zipCode: "75690-000",
    country: "Brasil",
    latitude: -17.738,
    longitude: -48.606,
  },
  description:
    "Experimente o luxo e conforto em nosso complexo de hospedagem com acesso às águas termais naturais de Caldas Novas. O Lacqua diRoma oferece uma experiência premium com piscinas aquecidas, spa completo, restaurante e atividades para toda a família.",
  rating: 4.8,
  reviewCount: 247,
  images: [
    {
      id: "img-001",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
      alt: "Piscina principal com vista para o complexo",
      isPrimary: true,
    },
    {
      id: "img-002",
      url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
      alt: "Área de lazer com piscina térmica",
    },
    {
      id: "img-003",
      url: "https://images.unsplash.com/photo-1578884454284-8fb1d27f1806?w=400&q=80",
      alt: "Quarto com vista para o complexo",
    },
    {
      id: "img-004",
      url: "https://images.unsplash.com/photo-1561339033-670ddcfe6e0c?w=400&q=80",
      alt: "Spa e área de bem-estar",
    },
    {
      id: "img-005",
      url: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&q=80",
      alt: "Restaurante com culinária gourmet",
    },
  ],
  amenities: [
    {
      id: "am-001",
      name: "Piscina",
      icon: "Waves",
      description: "Piscinas aquecidas com águas termais",
    },
    {
      id: "am-002",
      name: "WiFi",
      icon: "Wifi",
      description: "Internet de alta velocidade em todo o complexo",
    },
    {
      id: "am-003",
      name: "Restaurante",
      icon: "UtensilsCrossed",
      description: "Restaurante com buffet e cardápio à la carte",
    },
    {
      id: "am-004",
      name: "Spa",
      icon: "Sparkles",
      description: "Spa completo com massagens e tratamentos",
    },
    {
      id: "am-005",
      name: "Estacionamento",
      icon: "ParkingCircle",
      description: "Estacionamento gratuito para hóspedes",
    },
    {
      id: "am-006",
      name: "Academia",
      icon: "Dumbbell",
      description: "Academia totalmente equipada",
    },
    {
      id: "am-007",
      name: "TV",
      icon: "Tv2",
      description: "Smart TV em todos os quartos",
    },
    {
      id: "am-008",
      name: "Elevador",
      icon: "Home",
      description: "Elevadores modernos e acessíveis",
    },
  ],
  timeline: [
    {
      id: "tl-001",
      title: "Check-in",
      description: "A partir das 14h",
      icon: "LogIn",
    },
    {
      id: "tl-002",
      title: "Bem-vindo",
      description: "Recepção 24h com atendimento especial",
      icon: "HandshakeIcon",
    },
    {
      id: "tl-003",
      title: "Aproveite",
      description: "Acesso às piscinas termais e atividades",
      icon: "Smile",
    },
    {
      id: "tl-004",
      title: "Check-out",
      description: "Até as 11h (checkout tardio mediante taxa)",
      icon: "LogOut",
    },
  ],
  faqs: [
    {
      id: "faq-001",
      question: "Qual é a política de cancelamento?",
      answer:
        "Oferecemos cancelamento gratuito até 14 dias antes do check-in. Após este período, será cobrada uma taxa de 50% do valor total da reserva.",
    },
    {
      id: "faq-002",
      question: "Crianças menores de 5 anos pagam taxa?",
      answer:
        "Não! Crianças menores de 5 anos não pagam taxa de hospedagem quando acompanhadas de adultos. Crianças de 5 a 12 anos recebem 30% de desconto.",
    },
    {
      id: "faq-003",
      question: "É permitido levar animais de estimação?",
      answer:
        "Sim! Aceitamos cães e gatos mediante taxa de R$ 100/noite. Solicitamos que o animal tenha todos os documentos de vacinação em dia.",
    },
    {
      id: "faq-004",
      question: "Há wifi no complexo?",
      answer:
        "Sim, oferecemos WiFi de alta velocidade em todos os ambientes do complexo gratuitamente para hóspedes.",
    },
    {
      id: "faq-005",
      question: "O estacionamento é gratuito?",
      answer:
        "Sim, o estacionamento é gratuito para todos os hóspedes durante toda a estadia.",
    },
    {
      id: "faq-006",
      question: "Qual é o melhor período para visitar?",
      answer:
        "Caldas Novas é ótima durante o ano todo! A alta temporada é em julho, dezembro e feriados prolongados. Oferecemos promoções especiais na baixa temporada.",
    },
  ],
  pricing: {
    pricePerNight: 450,
    currency: "BRL",
    minNights: 2,
    maxInstallments: 18,
  },
  maxGuests: 6,
  bedrooms: 2,
  bathrooms: 2,
  areaSqm: 85,
};

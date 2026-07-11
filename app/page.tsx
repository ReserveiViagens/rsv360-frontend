import type { Metadata } from "next";
import { mockAccommodation } from "@/lib/mock-data";
import { GallerySection } from "@/components/shared/gallery-section";
import { HeaderInfo } from "@/components/shared/header-info";
import { DescriptionSection } from "@/components/shared/description-section";
import { AmenitiesSection } from "@/components/shared/amenities-section";
import { TimelineSection } from "@/components/shared/timeline-section";
import { FAQSection } from "@/components/shared/faq-section";
import { MapSection } from "@/components/shared/map-section";
import { BookingCard } from "@/components/shared/booking-card";
import { Footer } from "@/components/shared/footer";

export const metadata: Metadata = {
  title: `${mockAccommodation.name} - Reservei Viagens`,
  description: mockAccommodation.description,
  keywords: [
    "hospedagem",
    "temporada",
    "Caldas Novas",
    "termas",
    "Lacqua diRoma",
    "piscina",
    "spa",
  ],
  openGraph: {
    title: `${mockAccommodation.name} - Reservei Viagens`,
    description: mockAccommodation.description,
    images: [
      {
        url: mockAccommodation.images[0].url,
        width: 1200,
        height: 630,
        alt: mockAccommodation.images[0].alt,
      },
    ],
  },
};

export default function PackagePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: mockAccommodation.name,
    description: mockAccommodation.description,
    url: "https://rsv360.com/packages/lacqua-diroma",
    image: mockAccommodation.images.map((img) => img.url),
    telephone: "+5562999999999",
    priceRange: `R$ ${mockAccommodation.pricing.pricePerNight}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: mockAccommodation.location.address,
      addressLocality: mockAccommodation.location.city,
      addressRegion: mockAccommodation.location.state,
      postalCode: mockAccommodation.location.zipCode,
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: mockAccommodation.location.latitude,
      longitude: mockAccommodation.location.longitude,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: mockAccommodation.rating,
      reviewCount: mockAccommodation.reviewCount,
    },
    amenity: mockAccommodation.amenities.map((amenity) => ({
      "@type": "Text",
      text: amenity.name,
    })),
    makesOffer: {
      "@type": "Offer",
      url: "https://rsv360.com/packages/lacqua-diroma",
      priceCurrency: mockAccommodation.pricing.currency,
      price: mockAccommodation.pricing.pricePerNight,
      priceValidUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      )
        .toISOString()
        .split("T")[0],
      availability: "https://schema.org/InStock",
      availabilityEnds: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      )
        .toISOString()
        .split("T")[0],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-white">
        {/* Header/Navbar */}
        <header className="border-b border-gray-200 sticky top-0 z-30 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <a href="/" className="text-2xl font-bold text-[#0066cc]">
              Reservei Viagens
            </a>
            <nav className="hidden md:flex gap-6 text-gray-700">
              <a href="#" className="hover:text-[#0066cc] transition-colors">
                Pacotes
              </a>
              <a href="#" className="hover:text-[#0066cc] transition-colors">
                Sobre
              </a>
              <a href="#" className="hover:text-[#0066cc] transition-colors">
                Contato
              </a>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          {/* Hero - Galeria */}
          <section className="mb-6 md:mb-8">
            <GallerySection images={mockAccommodation.images} />
          </section>

          {/* Conteúdo Principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Coluna Esquerda - Conteúdo */}
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              {/* Header Info */}
              <HeaderInfo accommodation={mockAccommodation} />

              {/* Description */}
              <DescriptionSection accommodation={mockAccommodation} />

              {/* Amenities */}
              <AmenitiesSection amenities={mockAccommodation.amenities} />

              {/* Timeline */}
              <TimelineSection timeline={mockAccommodation.timeline} />

              {/* Map */}
              <MapSection
                location={mockAccommodation.location}
                name={mockAccommodation.name}
              />

              {/* FAQ */}
              <FAQSection faqs={mockAccommodation.faqs} />
            </div>

            {/* Coluna Direita - Booking Card (Desktop) */}
            <div className="hidden lg:block">
              <BookingCard accommodation={mockAccommodation} />
            </div>
          </div>
        </main>

        {/* Booking Card Mobile (Fixed Bottom) */}
        <div className="lg:hidden mb-20">
          <BookingCard accommodation={mockAccommodation} isFixedMobile={true} />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

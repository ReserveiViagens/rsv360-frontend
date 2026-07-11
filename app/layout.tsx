import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RSV360° - Reservei Viagens",
  description: "Plataforma de reservas para hospedagem de temporada em Caldas Novas",
  keywords: ["hospedagem", "Caldas Novas", "temporada", "termas", "Lacqua diRoma"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0066cc",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

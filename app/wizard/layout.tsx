import { WizardProvider } from "@/lib/contexts/wizard-context";

export const metadata = {
  title: "Criar Anúncio - RSV360°",
  description: "Cadastre seu anúncio em 3 etapas simples",
};

export default function WizardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WizardProvider>
      {children}
    </WizardProvider>
  );
}

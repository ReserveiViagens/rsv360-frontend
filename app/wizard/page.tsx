import { Metadata } from 'next';
import { WizardProvider } from '@/lib/contexts/wizard-context';
import { WizardContainer } from '@/components/wizard/wizard-container';

export const metadata: Metadata = {
  title: 'Criar Anúncio | RSV360°',
  description: 'Wizard de criação de anúncio para sua acomodação em Caldas Novas',
};

export default function WizardPage() {
  return (
    <WizardProvider>
      <WizardContainer />
    </WizardProvider>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { useWizard } from '@/lib/contexts/wizard-context';
import { ProgressBar } from './progress-bar';
import { StepNavigation } from './step-navigation';
import { Step1 } from './step-1';
import { Step2 } from './step-2';
import { Step3 } from './step-3';

export function WizardContainer() {
  const router = useRouter();
  const { currentStep, error, nextStep, previousStep } = useWizard();

  const handleNextStep = () => {
    if (currentStep === 3) {
      // Na última etapa, navega para review em vez de avançar
      router.push('/wizard/review');
      return true;
    }
    return nextStep();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {currentStep === 1
              ? 'Descreva sua acomodação'
              : currentStep === 2
                ? 'Faça se destacar'
                : 'Conclua e publique'}
          </h1>
          <p className="text-gray-600">
            {currentStep === 1
              ? 'Comece informando os detalhes básicos da sua propriedade'
              : currentStep === 2
                ? 'Adicione fotos e informações que tornem seu anúncio atraente'
                : 'Defina os preços e finalize seu anúncio'}
          </p>
        </div>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} totalSteps={3} />

        {/* Erro */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Conteúdo da Etapa */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8">
          {renderStep()}
        </div>

        {/* Navigation */}
        <StepNavigation
          currentStep={currentStep}
          totalSteps={3}
          onPrevious={previousStep}
          onNext={handleNextStep}
          isLastStep={currentStep === 3}
          nextLabel={currentStep === 1 ? 'Avançar' : currentStep === 2 ? 'Avançar' : 'Revisar e Publicar'}
        />
      </div>
    </div>
  );
}

'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => boolean;
  isLastStep?: boolean;
  nextLabel?: string;
  loading?: boolean;
}

export function StepNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  isLastStep = false,
  nextLabel = 'Avançar',
  loading = false,
}: StepNavigationProps) {
  const canGoBack = currentStep > 1;
  const canGoForward = currentStep < totalSteps;
  const isFinalStep = currentStep === totalSteps;

  return (
    <div className="flex gap-4 pt-8 border-t border-gray-200">
      {/* Botão Voltar */}
      {canGoBack && (
        <Button
          variant="outline"
          onClick={onPrevious}
          className="flex-1 gap-2"
          disabled={loading}
        >
          <ArrowLeft size={18} />
          Voltar
        </Button>
      )}

      {/* Botão Avançar/Publicar */}
      {!isFinalStep ? (
        <Button
          onClick={onNext}
          className={`flex-1 gap-2 ${canGoBack ? '' : 'md:col-start-2'}`}
          disabled={loading}
        >
          {nextLabel}
          <ArrowRight size={18} />
        </Button>
      ) : isLastStep ? (
        <Button
          onClick={onNext}
          className={`flex-1 bg-green-600 hover:bg-green-700 gap-2 ${canGoBack ? '' : 'md:col-start-2'}`}
          disabled={loading}
        >
          {loading ? 'Publicando...' : 'Publicar Anúncio'}
        </Button>
      ) : null}
    </div>
  );
}

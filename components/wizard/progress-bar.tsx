'use client';

import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="mb-8">
      {/* Barra visual */}
      <div className="mb-4">
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Steps numerados */}
      <div className="flex justify-between">
        {steps.map((step) => (
          <div
            key={step}
            className="flex flex-col items-center gap-1"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                step < currentStep
                  ? 'bg-blue-600'
                  : step === currentStep
                    ? 'bg-blue-600'
                    : 'bg-gray-200'
              }`}
            >
              {step < currentStep ? (
                <Check className="w-5 h-5 text-white" />
              ) : (
                <span className={step === currentStep ? 'text-white font-semibold' : 'text-gray-600'}>
                  {step}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-600 font-medium">
              {step === 1 ? 'Acomodação' : step === 2 ? 'Destaque' : 'Publicar'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

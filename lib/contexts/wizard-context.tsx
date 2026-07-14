'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { WizardFormData, WizardContextType } from '../types/wizard';
import { step1Schema, step2Schema, step3Schema } from '../schemas/wizard';

const WIZARD_STORAGE_KEY = 'rsv360_wizard_form';
const WIZARD_EXPIRY_KEY = 'rsv360_wizard_expiry';
const STORAGE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 dias

const initialFormData: WizardFormData = {
  step1: {
    propertyType: null,
    spaceType: null,
    address: '',
    city: '',
    state: 'GO',
    coordinates: null,
    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
  },
  step2: {
    amenities: [],
    photos: [],
    title: '',
    highlights: [],
  },
  step3: {
    description: '',
    reservationType: 'moderate',
    instantBooking: false,
    basePrice: 100,
    weekendDiscount: 0,
    weekendPrice: 100,
    minNightStay: 1,
  },
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<WizardFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar progresso ao montar
  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      const expiry = localStorage.getItem(WIZARD_EXPIRY_KEY);
      if (!expiry || Date.now() > parseInt(expiry)) {
        localStorage.removeItem(WIZARD_STORAGE_KEY);
        localStorage.removeItem(WIZARD_EXPIRY_KEY);
        setFormData(initialFormData);
        return;
      }

      const saved = localStorage.getItem(WIZARD_STORAGE_KEY);
      if (saved) {
        setFormData(JSON.parse(saved));
      }
    } catch (err) {
      console.error('[v0] Erro ao carregar progresso:', err);
      setFormData(initialFormData);
    }
  }, []);

  const saveProgress = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(WIZARD_STORAGE_KEY, JSON.stringify(formData));
      localStorage.setItem(WIZARD_EXPIRY_KEY, (Date.now() + STORAGE_DURATION).toString());
    } catch (err) {
      console.error('[v0] Erro ao salvar progresso:', err);
    }
  }, [formData]);

  const updateStep = useCallback(
    (step: number, data: Partial<WizardFormData>) => {
      setError(null);
      setFormData((prev) => ({ ...prev, ...data }));
    },
    []
  );

  const validateStep = (step: number): boolean => {
    try {
      setError(null);
      switch (step) {
        case 1:
          step1Schema.parse(formData.step1);
          break;
        case 2:
          step2Schema.parse(formData.step2);
          break;
        case 3:
          step3Schema.parse(formData.step3);
          break;
      }
      return true;
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Erro na validação');
      return false;
    }
  };

  const nextStep = useCallback((): boolean => {
    if (!validateStep(currentStep)) {
      return false;
    }

    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
      saveProgress();
      return true;
    }
    return false;
  }, [currentStep, formData, saveProgress]);

  const previousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const resetWizard = useCallback(() => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setError(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(WIZARD_STORAGE_KEY);
      localStorage.removeItem(WIZARD_EXPIRY_KEY);
    }
  }, []);

  const value: WizardContextType = {
    formData,
    currentStep,
    isLoading,
    error,
    updateStep,
    nextStep,
    previousStep,
    resetWizard,
    saveProgress,
    loadProgress,
  };

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard deve ser usado dentro de WizardProvider');
  }
  return context;
}

export type PropertyType = 
  | 'apartment' 
  | 'house' 
  | 'cottage' 
  | 'villa' 
  | 'beachhouse' 
  | 'penthouse' 
  | 'other';

export type SpaceType = 
  | 'entire' 
  | 'private_room' 
  | 'shared_room';

export type ReservationType = 
  | 'flexible' 
  | 'moderate' 
  | 'strict';

export interface WizardStep1Data {
  propertyType: PropertyType | null;
  spaceType: SpaceType | null;
  address: string;
  city: string;
  state: string;
  coordinates: { lat: number; lng: number } | null;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
}

export interface PhotoItem {
  id: string;
  url: string;
  file?: File;
  isCover: boolean;
  order: number;
}

export interface WizardStep2Data {
  amenities: string[];
  photos: PhotoItem[];
  title: string;
  highlights: string[];
}

export interface WizardStep3Data {
  description: string;
  reservationType: ReservationType;
  instantBooking: boolean;
  basePrice: number;
  weekendDiscount: number;
  weekendPrice: number;
  minNightStay: number;
}

export interface WizardFormData {
  step1: WizardStep1Data;
  step2: WizardStep2Data;
  step3: WizardStep3Data;
}

export interface WizardContextType {
  formData: WizardFormData;
  currentStep: number;
  isLoading: boolean;
  error: string | null;
  updateStep: (step: number, data: Partial<WizardFormData>) => void;
  nextStep: () => boolean;
  previousStep: () => void;
  resetWizard: () => void;
  saveProgress: () => void;
  loadProgress: () => void;
}

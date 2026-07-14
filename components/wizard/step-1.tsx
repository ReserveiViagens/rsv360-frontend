'use client';

import { useState } from 'react';
import { MapPin, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useWizard } from '@/lib/contexts/wizard-context';
import { propertyTypes, spaceTypes, caldas_novas_coordinates } from '@/lib/wizard-data';
import type { PropertyType, SpaceType } from '@/lib/types/wizard';

export function Step1() {
  const { formData, updateStep } = useWizard();
  const [showMap, setShowMap] = useState(false);
  const step1 = formData.step1;

  const handlePropertyTypeChange = (type: PropertyType) => {
    updateStep(1, { step1: { ...step1, propertyType: type } });
  };

  const handleSpaceTypeChange = (type: SpaceType) => {
    updateStep(1, { step1: { ...step1, spaceType: type } });
  };

  const handleInputChange = (field: string, value: string | number) => {
    updateStep(1, { step1: { ...step1, [field]: value } });
  };

  const handleStepperChange = (field: string, change: number) => {
    const current = step1[field as keyof typeof step1] as number;
    const newValue = Math.max(1, current + change);
    handleInputChange(field, newValue);
  };

  const handleSetCoordinates = () => {
    updateStep(1, {
      step1: { ...step1, coordinates: caldas_novas_coordinates },
    });
    setShowMap(false);
  };

  return (
    <div className="space-y-8">
      {/* Tipo de Propriedade */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Qual é o tipo de sua propriedade?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {propertyTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handlePropertyTypeChange(type.id)}
              className={`p-4 rounded-lg border-2 transition-all text-center ${
                step1.propertyType === type.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-3xl mb-2">{type.icon}</div>
              <div className="font-semibold text-sm">{type.label}</div>
              <div className="text-xs text-gray-600">{type.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Tipo de Espaço */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Qual tipo de espaço você aluga?</h2>
        <RadioGroup value={step1.spaceType || ''} onValueChange={handleSpaceTypeChange}>
          {spaceTypes.map((type) => (
            <div key={type.id} className="mb-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={type.id} id={type.id} />
                <Label htmlFor={type.id} className="cursor-pointer flex-1">
                  <div className="font-semibold">{type.label}</div>
                  <div className="text-sm text-gray-600">{type.description}</div>
                </Label>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Localização */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Onde fica sua acomodação?</h2>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                value={step1.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Rua, número e complemento"
              />
            </div>
            <div>
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                value={step1.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="Caldas Novas"
              />
            </div>
            <div>
              <Label htmlFor="state">Estado</Label>
              <Input
                id="state"
                maxLength={2}
                value={step1.state}
                onChange={(e) => handleInputChange('state', e.target.value.toUpperCase())}
                placeholder="GO"
              />
            </div>
          </div>

          {/* Mapa simples */}
          {step1.coordinates && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 text-blue-700 font-semibold">
                <MapPin size={20} />
                Localização marcada em Caldas Novas ({step1.coordinates.lat}, {step1.coordinates.lng})
              </div>
            </div>
          )}

          {!step1.coordinates && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowMap(true)}
              className="w-full"
            >
              <MapPin size={18} className="mr-2" />
              Marcar no Mapa
            </Button>
          )}

          {showMap && (
            <div className="p-4 bg-gray-100 rounded-lg text-center">
              <p className="text-gray-700 mb-4">Localização marcada: Caldas Novas</p>
              <Button onClick={handleSetCoordinates} className="mr-2">
                Confirmar Localização
              </Button>
              <Button variant="outline" onClick={() => setShowMap(false)}>
                Cancelar
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Steppers */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Descreva sua acomodação</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { key: 'guests', label: 'Hóspedes', icon: '👥' },
            { key: 'bedrooms', label: 'Quartos', icon: '🛏️' },
            { key: 'beds', label: 'Camas', icon: '🛏️' },
            { key: 'bathrooms', label: 'Banheiros', icon: '🚿' },
          ].map(({ key, label, icon }) => (
            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{icon}</span>
                <span className="font-semibold">{label}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleStepperChange(key, -1)}
                  className="h-8 w-8 p-0"
                >
                  <Minus size={16} />
                </Button>
                <span className="font-bold w-8 text-center">
                  {(step1[key as keyof typeof step1] as number).toString()}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleStepperChange(key, 1)}
                  className="h-8 w-8 p-0"
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

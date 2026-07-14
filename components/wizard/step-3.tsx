'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useWizard } from '@/lib/contexts/wizard-context';
import { reservationTypes } from '@/lib/wizard-data';
import type { ReservationType } from '@/lib/types/wizard';

export function Step3() {
  const router = useRouter();
  const { formData, updateStep } = useWizard();
  const step3 = formData.step3;

  // Calcular preço do fim de semana
  useEffect(() => {
    if (step3.weekendDiscount > 0) {
      const discount = (step3.basePrice * step3.weekendDiscount) / 100;
      const newPrice = step3.basePrice - discount;
      if (newPrice !== step3.weekendPrice) {
        updateStep(3, {
          step3: { ...step3, weekendPrice: Math.max(50, newPrice) },
        });
      }
    }
  }, [step3.basePrice, step3.weekendDiscount]);

  const handleInputChange = (field: string, value: string | number | boolean) => {
    if (field === 'basePrice' || field === 'weekendPrice' || field === 'minNightStay') {
      value = Math.max(0, Number(value));
    }
    updateStep(3, { step3: { ...step3, [field]: value } });
  };

  const handleReservationTypeChange = (type: ReservationType) => {
    updateStep(3, { step3: { ...step3, reservationType: type } });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="space-y-8">
      {/* Descrição */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Descreva sua acomodação</h2>
        <div>
          <Label htmlFor="description">Descrição</Label>
          <textarea
            id="description"
            value={step3.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Conte sobre a acomodação, localização, diferenciais..."
            maxLength={500}
            rows={5}
            className="w-full p-3 border border-gray-300 rounded-lg font-sans focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-500">
            {step3.description.length}/500
          </span>
        </div>
      </div>

      {/* Tipo de Reserva */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Configurações de reserva</h2>
        <div className="mb-6">
          <Label className="text-base font-semibold mb-3 block">Política de cancelamento</Label>
          <RadioGroup
            value={step3.reservationType}
            onValueChange={handleReservationTypeChange}
          >
            {reservationTypes.map((type) => (
              <div key={type.id} className="mb-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={type.id} id={`res-${type.id}`} />
                  <Label htmlFor={`res-${type.id}`} className="cursor-pointer flex-1">
                    <div className="font-semibold">{type.label}</div>
                    <div className="text-sm text-gray-600">{type.description}</div>
                  </Label>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Reserva Instantânea */}
        <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
          <Checkbox
            checked={step3.instantBooking}
            onCheckedChange={(checked) => handleInputChange('instantBooking', checked)}
          />
          <div className="flex-1">
            <div className="font-semibold">Reserva Instantânea</div>
            <div className="text-sm text-gray-600">
              Hóspedes podem reservar sem precisar de sua aprovação
            </div>
          </div>
        </label>
      </div>

      {/* Preços */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Defina seus preços</h2>
        <div className="space-y-6">
          {/* Preço Base */}
          <div>
            <Label htmlFor="basePrice">Preço por noite (seg-quinta)</Label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-600 font-semibold">R$</span>
              <Input
                id="basePrice"
                type="number"
                min="50"
                max="10000"
                step="10"
                value={step3.basePrice}
                onChange={(e) => handleInputChange('basePrice', e.target.value)}
                className="pl-10"
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Você recebe: <span className="font-bold text-green-600">{formatCurrency(step3.basePrice * 0.97)}</span>
              <span className="text-xs text-gray-500"> (após 3% de taxa)</span>
            </p>
          </div>

          {/* Desconto Fim de Semana */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label htmlFor="weekendDiscount">Desconto para fim de semana (%)</Label>
              <span className="text-lg font-bold text-blue-600">{step3.weekendDiscount}%</span>
            </div>
            <input
              id="weekendDiscount"
              type="range"
              min="0"
              max="50"
              step="5"
              value={step3.weekendDiscount}
              onChange={(e) => handleInputChange('weekendDiscount', e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="text-sm text-gray-600 mt-2">
              <p>Preço no fim de semana (sexta-domingo): <span className="font-bold">{formatCurrency(step3.weekendPrice)}</span></p>
              <p className="text-xs text-gray-500 mt-1">
                Você recebe: <span className="text-green-600">{formatCurrency(step3.weekendPrice * 0.97)}</span>
              </p>
            </div>
          </div>

          {/* Noites Mínimas */}
          <div>
            <Label htmlFor="minNightStay">Noites mínimas de hospedagem</Label>
            <Input
              id="minNightStay"
              type="number"
              min="1"
              max="90"
              value={step3.minNightStay}
              onChange={(e) => handleInputChange('minNightStay', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Preview do Card */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Prévia do seu anúncio</h2>
        <div className="border border-gray-300 rounded-xl overflow-hidden shadow-sm bg-white">
          <div className="bg-gray-200 h-48 flex items-center justify-center text-gray-400">
            {formData.step2.photos[formData.step2.photos.findIndex((p) => p.isCover)]?.url ? (
              <img
                src={formData.step2.photos[formData.step2.photos.findIndex((p) => p.isCover)].url}
                alt="Capa"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center">
                <p className="text-lg font-semibold">Foto de capa não definida</p>
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">
              {formData.step2.title || 'Título não definido'}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {formData.step1.address || 'Localização não definida'}
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(step3.basePrice)}{' '}
                  <span className="text-sm font-normal text-gray-600">/noite</span>
                </p>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600">Ver detalhes</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

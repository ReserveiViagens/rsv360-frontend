"use client";

import { CheckCircle, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PublishDialogProps {
  listingId: string;
  title: string;
  onViewListing: () => void;
  onBackHome: () => void;
}

export function PublishDialog({
  listingId,
  title,
  onViewListing,
  onBackHome,
}: PublishDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center space-y-6">
        {/* Ícone Sucesso */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-200 rounded-full animate-pulse" />
            <div className="relative bg-blue-100 rounded-full p-4">
              <CheckCircle size={48} className="text-blue-600" />
            </div>
          </div>
        </div>

        {/* Título */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Parabéns! 🎉
          </h2>
          <p className="text-gray-600 mt-2">
            Seu anúncio foi publicado com sucesso!
          </p>
        </div>

        {/* Detalhes */}
        <div className="bg-blue-50 rounded-lg p-4 space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{title}</span>
          </p>
          <p className="text-xs text-gray-500">
            ID do anúncio: <code className="font-mono text-blue-600">{listingId.slice(0, 8)}...</code>
          </p>
        </div>

        {/* Mensagem */}
        <p className="text-sm text-gray-600">
          Seu anúncio já está visível para hóspedes em busca de acomodações em Caldas Novas.
        </p>

        {/* Botões */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={onViewListing}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
          >
            <span>Ver Anúncio</span>
            <ArrowRight size={16} />
          </Button>
          <Button
            onClick={onBackHome}
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <Home size={16} />
            <span>Voltar para Home</span>
          </Button>
        </div>

        {/* Sugestão */}
        <p className="text-xs text-gray-500 border-t pt-4">
          Próximas etapas: Adicionar mais fotos, responder mensagens de hóspedes e gerenciar reservas no seu painel.
        </p>
      </div>
    </div>
  );
}

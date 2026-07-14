"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useWizard } from "@/lib/contexts/wizard-context";
import { ReviewSummary } from "@/components/wizard/review-summary";

export default function ReviewPage() {
  const { formData } = useWizard();
  const router = useRouter();

  useEffect(() => {
    // Se não há dados salvos, redireciona para início do wizard
    if (!formData?.step1?.propertyType) {
      router.push("/wizard");
    }
  }, [formData, router]);

  if (!formData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
          <p className="text-gray-600">Carregando dados do anúncio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ReviewSummary data={formData} />
      </div>
    </div>
  );
}

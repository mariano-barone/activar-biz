'use client';

import { CheckCircle, Zap, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BenefitsSectionProps {
  onStartAssessment: (initialMessage: string) => void;
}

export function BenefitsSection({ onStartAssessment }: BenefitsSectionProps) {
  const leftBenefits = [
    {
      icon: Shield,
      title: "Cumplimiento de ART obligatorio",
      description: "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop."
    },
    {
      icon: Zap,
      title: "Protección cyber para datos personales", 
      description: "An all-in-one customer service platform that helps you balance everything your customers need to be happy."
    },
    {
      icon: Users,
      title: "Cobertura D&O para empresas con inversores",
      description: "Measure what matters with Untitled's easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks."
    }
  ];

  const rightBenefits = [
    "Mapa de riesgos personalizado",
    "Cotizaciones estimadas", 
    "Contratar pólizas en caso de requerirlas",
    "Audit log and notes"
  ];

  return (
    <section className="py-16 sm:py-24" style={{ backgroundColor: '#000000' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Columna izquierda */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
              Diseñado para startups y PYMEs argentinas
            </h2>
            <div className="space-y-6">
              {leftBenefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(47, 128, 237, 0.1)' }}>
                      <IconComponent className="w-5 h-5" style={{ color: '#2F80ED' }} />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Columna derecha - Tarjeta */}
          <div className="flex justify-center">
            <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-medium text-white mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                ¿Qué vas a obtener?
              </h3>
              <div className="space-y-4 mb-8">
                {rightBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#2F80ED' }}>
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-300" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
              <Button 
                onClick={() => onStartAssessment('')}
                className="w-full text-white px-6 py-3 font-medium"
                style={{ backgroundColor: '#2F80ED', fontFamily: 'Inter, sans-serif' }}
              >
                Empecemos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
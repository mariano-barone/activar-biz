'use client';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Target, Shield, Zap } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Target,
      title: "Chat Inteligente",
      description: "Conversación natural que identifica riesgos específicos de tu industria"
    },
    {
      icon: Shield, 
      title: "Recomendaciones Precisas",
      description: "Motor de reglas que prioriza coberturas obligatorias, recomendadas y opcionales"
    },
    {
      icon: Zap,
      title: "Cotización Instantánea", 
      description: "Precios estimados al instante con simulación de contratación completa"
    }
  ];

  return (
    <section className="py-16 sm:py-24" style={{ backgroundColor: '#000000' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
            Assessment inteligente en minutos
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Una conversación simple que mapea todos los riesgos de tu empresa
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="text-center border-gray-600 bg-gray-900/30">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(47, 128, 237, 0.1)' }}>
                    <IconComponent className="w-6 h-6" style={{ color: '#2F80ED' }} />
                  </div>
                  <CardTitle className="text-xl text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
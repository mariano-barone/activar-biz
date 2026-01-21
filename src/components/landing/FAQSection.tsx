'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "¿Es gratuito el diagnóstico de riesgos?",
      answer: "Sí, puedes probar nuestro diagnóstico gratuito por completo. Te proporcionamos un análisis personalizado de 5 minutos para conocer los riesgos de tu empresa y las coberturas recomendadas."
    },
    {
      question: "¿Puedo cambiar mi plan de seguros más tarde?",
      answer: "Absolutamente. Nuestras pólizas están diseñadas para crecer contigo. Puedes ajustar coberturas, montos y agregar nuevos riesgos conforme tu startup o PyME evoluciona."
    },
    {
      question: "¿Cuál es la política de cancelación?",
      answer: "Ofrecemos flexibilidad total. Puedes cancelar en cualquier momento con 30 días de anticipación. No hay penalidades por cancelación anticipada en la mayoría de nuestros productos."
    },
    {
      question: "¿Se pueden agregar coberturas adicionales a una póliza?",
      answer: "Sí, nuestro sistema modular permite agregar coberturas como D&O, cyber security, errores profesionales o ART según las necesidades específicas que identifiquemos en tu negocio."
    },
    {
      question: "¿Cómo funciona la contratación?",
      answer: "Después del diagnóstico, recibes cotizaciones instantáneas. Si decides contratar, el proceso es 100% digital: firma electrónica, pago online y póliza activa en 24-48 horas."
    },
    {
      question: "¿Cómo cambio los datos de mi empresa?",
      answer: "Puedes actualizar información de tu empresa directamente desde tu panel de control o contactando a nuestro equipo. Los cambios se reflejan automáticamente en tu cobertura."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-16 sm:py-24" style={{ backgroundColor: '#000000' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            Preguntas frecuentes
          </h2>
          <p className="text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
            Todo lo que necesitas saber sobre el producto y la contratación.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-700 rounded-lg">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-900/30 transition-colors"
              >
                <span className="text-white font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-300 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
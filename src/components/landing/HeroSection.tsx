'use client';

import { useState, useRef, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onStartAssessment: (initialMessage: string) => void;
}

export function HeroSection({ onStartAssessment }: HeroSectionProps) {
  const [inputValue, setInputValue] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dots, setDots] = useState<Array<{x: number, y: number, glowing: boolean}>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Crear grid de puntos dinámico basado en el tamaño de la ventana
    const createDots = () => {
      const dotsArray = [];
      const spacing = 40;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      for (let x = 0; x <= width; x += spacing) {
        for (let y = 0; y <= height; y += spacing) {
          dotsArray.push({ x, y, glowing: false });
        }
      }
      setDots(dotsArray);
    };

    createDots();

    // Recrear puntos cuando cambie el tamaño de la ventana
    const handleResize = () => {
      createDots();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Actualizar puntos que deben brillar basado en la posición del mouse
    setDots(prevDots => 
      prevDots.map(dot => {
        const distance = Math.sqrt(
          Math.pow(dot.x - mousePosition.x, 2) + Math.pow(dot.y - mousePosition.y, 2)
        );
        return {
          ...dot,
          glowing: distance < 60 // Radio de 60px para el efecto
        };
      })
    );
  }, [mousePosition]);

  const handleSubmit = async () => {
    if (inputValue.trim()) {
      setIsTransitioning(true);
      
      // Animación de transición
      await new Promise(resolve => setTimeout(resolve, 800));
      
      onStartAssessment(inputValue);
    }
  };

  const handleQuestionClick = async (question: string) => {
    setIsTransitioning(true);
    
    // Animación de transición
    await new Promise(resolve => setTimeout(resolve, 800));
    
    onStartAssessment(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const exampleQuestions = [
    "Tengo una startup tech con 5 empleados",
    "Soy una PyME manufacturera con 20 empleados", 
    "Tengo un ecommerce que factura $500K mensuales",
    "Somos una consultora de 15 profesionales"
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative pt-0 pb-20 sm:pt-20 sm:pb-32 overflow-hidden" 
      onMouseMove={handleMouseMove}
    >
      {/* Puntos animados individualmente */}
      <div className="absolute inset-0">
        {dots.map((dot, index) => (
          <div
            key={index}
            className={`absolute w-0.5 h-0.5 rounded-full transition-all duration-300 ${
              dot.glowing ? 'bg-white scale-150' : 'bg-gray-600 opacity-40'
            }`}
            style={{
              left: dot.x,
              top: dot.y,
              boxShadow: dot.glowing ? '0 0 8px rgba(255, 255, 255, 0.6)' : 'none'
            }}
          />
        ))}
      </div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12 sm:mb-16">
          <Badge 
            variant="outline" 
            className="mb-4 sm:mb-6 text-xs sm:text-sm border-gray-600 text-gray-300"
            style={{ backgroundColor: '#1A1D23' }}
          >
            🚀 MVP Demo • activar Biz →
          </Badge>
          
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight text-white">
            Seguros inteligentes para{' '}
            <span style={{ color: '#2F80ED' }} className="font-comfortaa">startups</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed">
            Diagnosticamos los riesgos de tu empresa y te recomendamos las coberturas exactas que necesitas.{' '}
            <span style={{ color: '#2F80ED' }} className="font-medium">Todo en menos de 5 minutos.</span>
          </p>
          
          {/* Interactive Chat Input */}
          <div className="max-w-4xl mx-auto">
            <div className={`flex items-center gap-3 p-4 rounded-lg border border-gray-600 transition-all duration-500 ${
              isTransitioning ? 'scale-105 shadow-2xl' : ''
            }`} style={{ backgroundColor: '#1A1D23' }}>
              <input
                type="text"
                placeholder={isTransitioning ? "Iniciando análisis..." : "Contanos sobre tu empresa para empezar..."}
                className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-base"
                style={{ fontFamily: 'Inter, sans-serif' }}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isTransitioning}
              />
              <Button 
                onClick={handleSubmit}
                disabled={!inputValue.trim() || isTransitioning}
                className={`text-white px-6 py-2 text-sm font-medium disabled:opacity-50 transition-all duration-300 ${
                  isTransitioning ? 'animate-pulse' : ''
                }`}
                style={{ backgroundColor: '#2F80ED', fontFamily: 'Inter, sans-serif' }}
              >
                {isTransitioning ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Procesando
                  </div>
                ) : (
                  'Enviar'
                )}
              </Button>
            </div>
            
            <div className={`mt-6 text-center transition-opacity duration-500 ${
              isTransitioning ? 'opacity-30' : 'opacity-100'
            }`}>
              <p className="text-sm text-gray-400 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                O probá con uno de estos ejemplos:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {exampleQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionClick(question)}
                    disabled={isTransitioning}
                    className="p-3 text-left text-sm text-gray-300 rounded-lg border border-gray-600 hover:border-gray-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#13161B', fontFamily: 'Inter, sans-serif' }}
                  >
                    "{question}"
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Zap, Target, CheckCircle, TrendingUp, Users, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface LandingPageProps {
  onStartAssessment: (initialMessage: string) => void;
}

export function LandingPage({ onStartAssessment }: LandingPageProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000000' }}>
      {/* Custom Navbar */}
      <nav className="flex justify-between items-center p-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-white">activar Biz</h1>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            Sobre Nosotros
          </a>
          <Button 
            className="text-white px-4 py-2 rounded-md"
            style={{ backgroundColor: '#2F80ED' }}
          >
            Iniciar sesión
          </Button>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
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
            
            {/* Custom Chat Input */}
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-600" style={{ backgroundColor: '#1A1D23' }}>
                <input
                  type="text"
                  placeholder="Contanos sobre tu empresa para empezar..."
                  className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-base"
                  onClick={() => onStartAssessment('')}
                  readOnly
                />
                <Button 
                  onClick={() => onStartAssessment('')}
                  className="text-white px-6 py-2 text-sm font-medium"
                  style={{ backgroundColor: '#2F80ED' }}
                >
                  Enviar
                </Button>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400 mb-3">
                  O probá con uno de estos ejemplos:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => onStartAssessment('Tengo una startup tech con 5 empleados')}
                    className="p-3 text-left text-sm text-gray-300 rounded-lg border border-gray-600 hover:border-gray-500 transition-all duration-200"
                    style={{ backgroundColor: '#13161B' }}
                  >
                    "Tengo una startup tech con 5 empleados"
                  </button>
                  <button
                    onClick={() => onStartAssessment('Tengo una startup tech con 5 empleados')}
                    className="p-3 text-left text-sm text-gray-300 rounded-lg border border-gray-600 hover:border-gray-500 transition-all duration-200"
                    style={{ backgroundColor: '#13161B' }}
                  >
                    "Tengo una startup tech con 5 empleados"
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Partners Section */}
      <section className="py-16 sm:py-24 border-t border-gray-700" style={{ backgroundColor: '#0C0E12' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-400 mb-2">
              Nos respaldan
            </h2>
            <p className="text-sm text-gray-500">
              Trabajamos con las principales aseguradoras del país
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-8 sm:gap-12 md:gap-16 flex-wrap opacity-80">
            <div className="flex items-center justify-center h-16 w-24">
              <Image
                src="/Logo_Meridional_Blanco-01@2x.png"
                alt="Meridional Seguros"
                width={400}
                height={350}
                className="opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            
            <div className="flex items-center justify-center h-16 w-24">
              <Image
                src="/Allianz logo blanco.png"
                alt="Allianz Seguros"
                width={400}
                height={350}
                className="opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            
            <div className="flex items-center justify-center h-16 w-24">
              <Image
                src="/integrity logo 1.png"
                alt="Integrity Seguros"
                width={400}
                height={350}
                className="opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Assessment inteligente en minutos
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Una conversación simple que mapea todos los riesgos de tu empresa
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="text-center border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Chat Inteligente</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Conversación natural que identifica riesgos específicos de tu industria
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Recomendaciones Precisas</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Motor de reglas que prioriza coberturas obligatorias, recomendadas y opcionales
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Cotización Instantánea</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Precios estimados al instante con simulación de contratación completa
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
                Diseñado para startups y PYMEs argentinas
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Cumplimiento de ART obligatorio</span>
                    <p className="text-sm text-muted-foreground mt-1">Detectamos automáticamente cuando es requerido</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Lock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Protección cyber para datos personales</span>
                    <p className="text-sm text-muted-foreground mt-1">Cobertura especializada en PDPA y ciberseguridad</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Cobertura D&O para empresas con inversores</span>
                    <p className="text-sm text-muted-foreground mt-1">Protección de directores y oficiales</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Errores y omisiones para desarrollo de software</span>
                    <p className="text-sm text-muted-foreground mt-1">Específico para equipos de desarrollo</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <Card className="p-6 sm:p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl sm:text-2xl">¿Qué vas a obtener?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <div className="font-medium">Mapa de riesgos personalizado</div>
                      <div className="text-sm text-muted-foreground">Análisis visual de tu exposición específica</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <div className="font-medium">Cotizaciones estimadas</div>
                      <div className="text-sm text-muted-foreground">Precios mensuales y anuales por cobertura</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <div className="font-medium">Certificado demo</div>
                      <div className="text-sm text-muted-foreground">Simulación de contratación completa</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
              Comienza tu diagnóstico ahora
            </h3>
            <p className="text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto">
              Una simple conversación y obtienes tu mapa de riesgos personalizado al instante.
              <span className="block mt-2 text-primary font-medium">✨ Sin compromiso • Resultados inmediatos • 100% gratis</span>
            </p>
            
            {/* Call to action button */}
            <Button 
              onClick={() => onStartAssessment('')}
              className="text-white px-8 py-3 text-lg"
              style={{ backgroundColor: '#2F80ED' }}
            >
              Empezar diagnóstico
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
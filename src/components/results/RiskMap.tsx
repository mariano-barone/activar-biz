'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle, CheckCircle, ArrowRight, TrendingUp, Calculator } from 'lucide-react';
import { Coverage, RiskAssessment } from '@/types';

interface RiskMapProps {
  riskAssessment: RiskAssessment;
  onContinue: () => void;
}

export function RiskMap({ riskAssessment, onContinue }: RiskMapProps) {
  const { riskScore, riskFactors, recommendedCoverages } = riskAssessment;

  const getRiskLevel = (score: number) => {
    if (score <= 3) return { level: 'Bajo', color: 'text-green-500', bgColor: 'bg-green-500' };
    if (score <= 6) return { level: 'Medio', color: 'text-yellow-500', bgColor: 'bg-yellow-500' };
    return { level: 'Alto', color: 'text-red-500', bgColor: 'bg-red-500' };
  };

  const riskLevel = getRiskLevel(riskScore);

  const obligatoryCoverages = recommendedCoverages.filter(c => c.priority === 'obligatorio');
  const recommendedCoveragesFiltered = recommendedCoverages.filter(c => c.priority === 'recomendado');
  const optionalCoverages = recommendedCoverages.filter(c => c.priority === 'opcional');

  const handleQuoteClick = (coverageId: string) => {
    console.log('Quote requested for:', coverageId);
    // Aquí implementarías la lógica para mostrar cotización específica
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 sm:py-16">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Badge variant="outline" className="mb-4 text-xs sm:text-sm">
            Análisis Completado
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
            Mapa de Riesgos de tu Empresa
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Hemos analizado tu empresa y identificado los riesgos clave. 
            Aquí están nuestras recomendaciones personalizadas.
          </p>
        </div>

        {/* Risk Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Risk Score */}
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-xl sm:text-2xl">Score de Riesgo</CardTitle>
              <CardDescription>
                Evaluación general de tu exposición
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <div className={`text-5xl sm:text-6xl font-bold ${riskLevel.color} mb-2`}>
                  {riskScore.toFixed(1)}
                </div>
                <div className="text-lg font-medium text-muted-foreground">/ 10</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Nivel de Riesgo:</span>
                  <Badge variant="outline" className={riskLevel.color}>
                    {riskLevel.level}
                  </Badge>
                </div>
                
                <Progress 
                  value={(riskScore / 10) * 100} 
                  className="w-full"
                />
              </div>

              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <TrendingUp className="w-5 h-5 mx-auto mb-2 text-primary" />
                <div className="text-sm text-muted-foreground">
                  {riskScore <= 3 && "Tu empresa tiene un perfil de riesgo conservador"}
                  {riskScore > 3 && riskScore <= 6 && "Tu empresa tiene exposición moderada a riesgos"}
                  {riskScore > 6 && "Tu empresa tiene alta exposición a riesgos empresariales"}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Factors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <span>Factores de Riesgo Identificados</span>
              </CardTitle>
              <CardDescription>
                Elementos que aumentan tu exposición
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {riskFactors.map((factor, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg border border-border/50">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm font-medium">{factor}</span>
                  </div>
                ))}
                {riskFactors.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <p className="text-sm">No se identificaron factores de riesgo críticos</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coverages Sections */}
        <div className="space-y-8 sm:space-y-12">
          {/* Obligatorias */}
          {obligatoryCoverages.length > 0 && (
            <CoverageSection 
              title="Coberturas Obligatorias"
              subtitle="Requeridas por ley para tu tipo de empresa"
              icon={<AlertTriangle className="w-6 h-6 text-red-500" />}
              coverages={obligatoryCoverages}
              onQuoteClick={handleQuoteClick}
              bgColor="bg-red-500/5"
              borderColor="border-red-500/20"
            />
          )}

          {/* Recomendadas */}
          {recommendedCoveragesFiltered.length > 0 && (
            <CoverageSection 
              title="Altamente Recomendadas"
              subtitle="Coberturas importantes para tu perfil de riesgo"
              icon={<Shield className="w-6 h-6 text-yellow-500" />}
              coverages={recommendedCoveragesFiltered}
              onQuoteClick={handleQuoteClick}
              bgColor="bg-yellow-500/5"
              borderColor="border-yellow-500/20"
            />
          )}

          {/* Opcionales */}
          {optionalCoverages.length > 0 && (
            <CoverageSection 
              title="Coberturas Opcionales"
              subtitle="Protección adicional para considerar"
              icon={<CheckCircle className="w-6 h-6 text-green-500" />}
              coverages={optionalCoverages}
              onQuoteClick={handleQuoteClick}
              bgColor="bg-green-500/5"
              borderColor="border-green-500/20"
            />
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 sm:p-12 border border-primary/20">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              ¿Listo para proteger tu empresa?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Obtén cotizaciones detalladas y personalizadas para todas las coberturas recomendadas
            </p>
            <Button onClick={onContinue} size="lg" className="px-8 py-4 text-lg">
              Ver Todas las Cotizaciones
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CoverageSectionProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  coverages: Coverage[];
  onQuoteClick: (coverageId: string) => void;
  bgColor: string;
  borderColor: string;
}

function CoverageSection({ title, subtitle, icon, coverages, onQuoteClick, bgColor, borderColor }: CoverageSectionProps) {
  return (
    <div className={`rounded-2xl p-6 sm:p-8 ${bgColor} border ${borderColor}`}>
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center space-x-3 mb-2">
          {icon}
          <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
        </div>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
      
      <div className="grid gap-6">
        {coverages.map((coverage) => (
          <CoverageCard 
            key={coverage.id} 
            coverage={coverage} 
            onQuoteClick={onQuoteClick}
          />
        ))}
      </div>
    </div>
  );
}

interface CoverageCardProps {
  coverage: Coverage;
  onQuoteClick: (coverageId: string) => void;
}

function CoverageCard({ coverage, onQuoteClick }: CoverageCardProps) {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'obligatorio': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'recomendado': return <Shield className="w-5 h-5 text-yellow-500" />;
      case 'opcional': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <Shield className="w-5 h-5" />;
    }
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'obligatorio': return 'destructive';
      case 'recomendado': return 'default';
      case 'opcional': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <Card className="border-border/50 hover:border-border transition-colors">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start space-x-3 flex-1">
            {getPriorityIcon(coverage.priority)}
            <div className="flex-1">
              <CardTitle className="text-xl mb-1">{coverage.name}</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                {coverage.description}
              </CardDescription>
            </div>
          </div>
          <Badge variant={getPriorityBadgeVariant(coverage.priority)} className="flex-shrink-0">
            {coverage.priority.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Precio Mensual */}
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">Precio Mensual</div>
            <div className="text-lg font-bold">
              ${coverage.monthlyPriceRange.min.toLocaleString()} - ${coverage.monthlyPriceRange.max.toLocaleString()}
            </div>
          </div>
          
          {/* Precio Anual */}
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">Precio Anual</div>
            <div className="text-lg font-bold">
              ${coverage.annualPriceRange.min.toLocaleString()} - ${coverage.annualPriceRange.max.toLocaleString()}
            </div>
          </div>
          
          {/* Botón de Cotización */}
          <div className="flex items-center sm:col-span-1 lg:col-span-1">
            <Button 
              onClick={() => onQuoteClick(coverage.id)}
              variant="outline"
              size="sm"
              className="w-full bg-background hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Cotizar
            </Button>
          </div>
        </div>
        
        {/* Features */}
        <div className="mb-4">
          <div className="text-sm font-medium mb-2">Qué incluye:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {coverage.features.slice(0, 4).map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          {coverage.features.length > 4 && (
            <div className="text-xs text-muted-foreground mt-2">
              +{coverage.features.length - 4} beneficios más
            </div>
          )}
        </div>
        
        {/* Reasons */}
        {coverage.reasons && coverage.reasons.length > 0 && (
          <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
            <div className="text-sm font-medium mb-2 text-primary">¿Por qué la necesitas?</div>
            <div className="space-y-1">
              {coverage.reasons.map((reason, index) => (
                <div key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
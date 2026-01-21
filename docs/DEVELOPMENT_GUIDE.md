# Guía de Desarrollo - Activar Business MVP

## 🎉 Estado Actual

El MVP base está **completamente implementado** y funcionando:

- ✅ **Landing Page** con propuesta de valor
- ✅ **Chatbot Assessment** con 10 preguntas guiadas  
- ✅ **Motor de Reglas** determinístico
- ✅ **Mapa de Riesgos** con scoring visual
- ✅ **Estado Global** persistente con Zustand
- ✅ **Dark Mode** y diseño profesional

## 🚀 Servidor Corriendo

```bash
# El proyecto está corriendo en:
http://localhost:3000

# Para detener el servidor:
Ctrl + C en la terminal
```

## 🔧 Para Continuar el Desarrollo

### 1. Implementar Cotizaciones (Próxima Feature)

Crear `src/components/quotes/QuotePage.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRiskAssessment } from '@/lib/store/app-store';

export function QuotePage({ onContinue }: { onContinue: () => void }) {
  const riskAssessment = useRiskAssessment();
  const [selectedCoverages, setSelectedCoverages] = useState<string[]>([]);
  
  if (!riskAssessment) return <div>Error: No risk assessment found</div>;

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Cotizaciones Personalizadas
        </h1>
        
        <div className="grid gap-6">
          {riskAssessment.recommendedCoverages.map(coverage => (
            <QuoteCard 
              key={coverage.id}
              coverage={coverage}
              isSelected={selectedCoverages.includes(coverage.id)}
              onToggle={() => {
                setSelectedCoverages(prev => 
                  prev.includes(coverage.id) 
                    ? prev.filter(id => id !== coverage.id)
                    : [...prev, coverage.id]
                );
              }}
            />
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Button onClick={onContinue} size="lg">
            Continuar a Contratación Demo
          </Button>
        </div>
      </div>
    </div>
  );
}
```

### 2. Integrar QuotePage en MainApp

Editar `src/components/MainApp.tsx`:

```typescript
// Importar el nuevo componente
import { QuotePage } from '@/components/quotes/QuotePage';

// En el switch statement:
case 'quotes':
  return riskAssessment ? (
    <QuotePage 
      riskAssessment={riskAssessment}
      onContinue={handleContinueToContract}
    />
  ) : (
    <div>Error: No risk assessment</div>
  );
```

### 3. Implementar Pricing Calculator

Crear `src/lib/pricing/calculator.ts`:

```typescript
import { Coverage, RiskAssessment } from '@/types';

interface PricingOptions {
  riskScore: number;
  bundleCount: number;
  paymentFrequency: 'monthly' | 'annual';
}

export function calculatePrice(
  coverage: Coverage, 
  options: PricingOptions
): number {
  const { monthlyPriceRange } = coverage;
  const { riskScore, bundleCount, paymentFrequency } = options;
  
  // Interpolar precio basado en risk score (1-10)
  const basePrice = interpolatePrice(
    monthlyPriceRange.min,
    monthlyPriceRange.max,
    riskScore / 10
  );
  
  // Descuento por bundle
  const bundleDiscount = calculateBundleDiscount(bundleCount);
  const priceWithDiscount = basePrice * (1 - bundleDiscount);
  
  // Descuento anual (10%)
  return paymentFrequency === 'annual' 
    ? priceWithDiscount * 12 * 0.9 
    : priceWithDiscount;
}

function interpolatePrice(min: number, max: number, factor: number): number {
  return Math.round(min + (max - min) * factor);
}

function calculateBundleDiscount(count: number): number {
  if (count >= 4) return 0.15; // 15% descuento por 4+ coberturas
  if (count >= 3) return 0.10; // 10% descuento por 3 coberturas
  if (count >= 2) return 0.05; // 5% descuento por 2 coberturas
  return 0;
}
```

## 🎨 Mejoras de UI Sugeridas

### 1. Animaciones con Framer Motion
```bash
npm install framer-motion
```

### 2. Loading States Mejorados
```typescript
// Skeleton components para loading
import { Skeleton } from '@/components/ui/skeleton';
```

### 3. Toasts para Feedback
```bash
npx shadcn@latest add toast
```

## 📊 Analytics y Tracking

### 1. Implementar Event Tracking
```typescript
// src/lib/analytics/events.ts
export const trackEvent = (eventName: string, properties?: any) => {
  // Google Analytics, Mixpanel, etc.
  console.log('Event:', eventName, properties);
};

// Usar en componentes
trackEvent('assessment_completed', { 
  riskScore: riskAssessment.riskScore,
  coveragesRecommended: riskAssessment.recommendedCoverages.length
});
```

## 🔧 Configuración Adicional

### 1. Silenciar Warning de Turbopack
Crear `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  turbo: {
    root: '.',
  },
};

module.exports = nextConfig;
```

### 2. Scripts Útiles para package.json
```json
{
  "scripts": {
    "type-check": "tsc --noEmit",
    "lint:fix": "next lint --fix",
    "clean": "rm -rf .next node_modules",
    "analyze": "npm run build && npx @next/bundle-analyzer"
  }
}
```

## 🧪 Testing Setup (Futuro)

### 1. Jest + React Testing Library
```bash
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
```

### 2. Example Test
```typescript
// src/__tests__/ChatbotInterface.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ChatbotInterface } from '@/components/chatbot/ChatbotInterface';

test('renders first question', () => {
  render(<ChatbotInterface onComplete={jest.fn()} />);
  expect(screen.getByText(/cómo definirías tu empresa/i)).toBeInTheDocument();
});
```

## 📱 PWA Setup (Futuro)

### 1. Next-PWA
```bash
npm install next-pwa
```

### 2. Manifest.json
```json
{
  "name": "Activar Business",
  "short_name": "ActivarBiz", 
  "description": "Seguros inteligentes para startups",
  "theme_color": "#8B5CF6",
  "background_color": "#0A0A0A",
  "display": "standalone",
  "start_url": "/",
  "icons": [...]
}
```

## 🚀 Deploy to Vercel

### 1. Conectar Repositorio
1. Push código a GitHub
2. Conectar repo en Vercel
3. Deploy automático

### 2. Variables de Entorno
```bash
# .env.production
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_ANALYTICS_ID=...
```

## 📈 Métricas de Negocio

### KPIs a Trackear
- **Completion Rate**: % usuarios que completan assessment
- **Risk Score Distribution**: Distribución de scores de riesgo
- **Popular Coverages**: Coberturas más solicitadas
- **Funnel Conversion**: Landing → Assessment → Quotes → Contract

### Dashboard Simple
```typescript
interface DashboardMetrics {
  totalUsers: number;
  completedAssessments: number;
  averageRiskScore: number;
  conversionRate: number;
  popularIndustries: Array<{ industry: string; count: number }>;
}
```

## 🎯 Presentación del MVP

### Demo Script
1. **Landing** (30 seg) - Mostrar propuesta de valor
2. **Assessment** (2-3 min) - Completar flujo completo
3. **Resultados** (1 min) - Explicar risk scoring y recomendaciones
4. **Value Prop** (30 seg) - Beneficios vs proceso tradicional

### Talking Points
- ✨ **Automated Risk Assessment** en lugar de formularios largos
- 🎯 **Personalized Recommendations** basadas en perfil específico  
- ⚡ **Instant Quotes** vs esperas de días/semanas
- 📊 **Transparent Scoring** vs cajas negras actuariales

---

El MVP está **listo para demo**. Las próximas features son modulares y se pueden implementar iterativamente sin romper lo existente.
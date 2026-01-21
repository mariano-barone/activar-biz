# Próximas Features - Activar Business

## Roadmap MVP Completo

### Fase 2: Cotizaciones Detalladas

#### QuotePage Component
**Ubicación**: `src/components/quotes/QuotePage.tsx`

```typescript
interface QuotePageProps {
  riskAssessment: RiskAssessment;
  onContinue: (selectedQuotes: Quote[]) => void;
}

interface Quote {
  coverageId: CoverageType;
  monthlyPrice: number;
  annualPrice: number;
  discount?: number; // Bundle discounts
  validUntil: Date;
  features: string[];
  isRecommended: boolean;
}
```

**Features a Implementar**:
- **Price Calculator**: Rangos → precios específicos basados en risk score
- **Bundle Discounts**: Descuentos por contratar múltiples coberturas
- **Toggle Monthly/Annual**: Switching de precios con descuento anual
- **Comparison Table**: Side-by-side coverage comparison
- **Priority Sorting**: Obligatorio → Recomendado → Opcional

#### Pricing Logic
```typescript
// src/lib/pricing/calculator.ts
export function calculateQuote(
  coverage: Coverage,
  riskScore: number,
  bundleCount: number
): Quote {
  const basePrice = interpolatePrice(coverage.monthlyPriceRange, riskScore);
  const bundleDiscount = calculateBundleDiscount(bundleCount);
  
  return {
    monthlyPrice: basePrice * (1 - bundleDiscount),
    annualPrice: basePrice * 12 * 0.9, // 10% descuento anual
    discount: bundleDiscount,
    // ...
  };
}
```

### Fase 3: Contratación Demo

#### ContractFlow Component
**Ubicación**: `src/components/contract/ContractFlow.tsx`

**Sub-componentes**:
1. **CompanyDetailsForm**: CUIT, razón social, dirección
2. **ContactInfoForm**: Email, teléfono, responsable
3. **ReviewPage**: Resumen antes de "contratar"
4. **SuccessPage**: Confirmación con certificado

```typescript
interface ContractData {
  company: {
    cuit: string;
    businessName: string;
    address: string;
    industry: string;
  };
  contact: {
    email: string;
    phone: string;
    contactPerson: string;
    position: string;
  };
  selectedCoverages: Coverage[];
  totalMonthly: number;
  totalAnnual: number;
  contractNumber: string; // Generated
}
```

#### PDF Certificate Generation
**Ubicación**: `src/lib/pdf/certificate-generator.ts`

```typescript
import jsPDF from 'jspdf';

export function generateCertificate(contract: ContractData): string {
  const doc = new jsPDF();
  
  // Header con logo de aseguradora
  doc.setFontSize(20);
  doc.text('CERTIFICADO DE COBERTURA - DEMO', 20, 30);
  
  // Datos de la empresa
  doc.setFontSize(12);
  doc.text(`Razón Social: ${contract.company.businessName}`, 20, 50);
  doc.text(`CUIT: ${contract.company.cuit}`, 20, 60);
  
  // Coberturas contratadas
  let yPos = 80;
  contract.selectedCoverages.forEach(coverage => {
    doc.text(`• ${coverage.name}`, 30, yPos);
    yPos += 10;
  });
  
  // Footer demo
  doc.text('ESTE ES UN CERTIFICADO DEMO - NO VÁLIDO', 20, 250);
  
  return doc.output('datauristring');
}
```

### Fase 4: Features Administrativas

#### Admin Panel
**Ubicación**: `src/app/admin/page.tsx`

**Features**:
1. **Price Multipliers**: Ajustar precios por cobertura
2. **Marketing Copy**: Editar textos de landing y componentes
3. **Feature Flags**: Habilitar/deshabilitar funcionalidades
4. **Brand Settings**: Cambiar aseguradora de referencia

```typescript
interface AdminConfig {
  pricing: {
    multipliers: Record<CoverageType, number>;
    globalDiscount: number;
    bundleDiscounts: number[];
  };
  branding: {
    insuranceBrand: string;
    logoUrl: string;
    primaryColor: string;
  };
  content: {
    landingHeroTitle: string;
    landingHeroSubtitle: string;
    assessmentWelcomeMessage: string;
  };
  features: {
    enableQuotes: boolean;
    enableContract: boolean;
    enablePDFDownload: boolean;
    maintenanceMode: boolean;
  };
}
```

### Fase 5: Analytics & Tracking

#### Analytics Integration
```typescript
// src/lib/analytics/tracker.ts
interface AnalyticsEvent {
  type: 'assessment_start' | 'assessment_complete' | 'quote_request' | 'contract_demo';
  properties: Record<string, any>;
  timestamp: Date;
  sessionId: string;
}

export function trackEvent(event: AnalyticsEvent) {
  // Send to analytics service
  if (process.env.NODE_ENV === 'production') {
    // Google Analytics, Mixpanel, etc.
  }
  
  // Store locally for admin dashboard
  const stored = localStorage.getItem('analytics_events') || '[]';
  const events = JSON.parse(stored);
  events.push(event);
  localStorage.setItem('analytics_events', JSON.stringify(events));
}
```

#### Dashboard de Uso
```typescript
interface UsageMetrics {
  totalAssessments: number;
  completionRate: number; // % que completan vs abandonan
  averageRiskScore: number;
  popularCoverages: Array<{
    coverage: CoverageType;
    requestCount: number;
  }>;
  industryBreakdown: Record<Industry, number>;
}
```

### Fase 6: Integraciones Reales

#### API de Aseguradoras
```typescript
// src/lib/integrations/insurance-api.ts
interface InsuranceProvider {
  id: string;
  name: string;
  apiEndpoint: string;
  auth: AuthConfig;
}

export async function getRealtimeQuote(
  provider: InsuranceProvider,
  assessmentData: AssessmentData
): Promise<Quote[]> {
  // Integración con API real de aseguradora
}
```

#### Validación AFIP
```typescript
// src/lib/integrations/afip.ts
export async function validateCUIT(cuit: string): Promise<{
  valid: boolean;
  businessName?: string;
  status?: string;
  error?: string;
}> {
  // Consulta a AFIP para validar CUIT
}
```

## Mejoras Técnicas

### Error Handling
```typescript
// src/lib/errors/error-boundary.tsx
export class GlobalErrorBoundary extends Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    // Send to error tracking service
    console.error('Global error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### Performance Optimizations
```typescript
// Code splitting por route
const QuotePage = lazy(() => import('@/components/quotes/QuotePage'));
const ContractFlow = lazy(() => import('@/components/contract/ContractFlow'));

// Image optimization
import Image from 'next/image';
// Usar Next.js Image component para logos, etc.

// Bundle analysis
// npm run build && npm run analyze
```

### Testing Suite
```typescript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

// Tests críticos
describe('Assessment Flow', () => {
  test('completes full assessment journey');
  test('persists answers between sessions');
  test('generates correct risk recommendations');
});

describe('Risk Engine', () => {
  test('mandatory ART for employees');
  test('cyber risk for data handling');
  test('risk score calculation accuracy');
});
```

### Deployment & CI/CD
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: amondnet/vercel-action@v20
```

## Consideraciones de Escalabilidad

### Database Integration
```typescript
// Cuando se necesite persistencia real
interface DatabaseSchema {
  assessments: {
    id: string;
    userId: string;
    answers: JsonObject;
    riskScore: number;
    createdAt: Date;
  };
  
  quotes: {
    id: string;
    assessmentId: string;
    coverages: JsonObject;
    totalPrice: number;
    validUntil: Date;
  };
  
  contracts: {
    id: string;
    quoteId: string;
    companyData: JsonObject;
    status: 'draft' | 'active' | 'cancelled';
    signedAt?: Date;
  };
}
```

### Multi-tenant Architecture
```typescript
// Para múltiples aseguradoras
interface TenantConfig {
  tenantId: string;
  domain: string; // subdomain.activarbusiness.com
  branding: BrandingConfig;
  pricingRules: PricingConfig;
  availableCoverages: CoverageType[];
}
```

### Real-time Features
```typescript
// Para soporte en vivo
interface ChatSupport {
  sessionId: string;
  messages: ChatMessage[];
  agentId?: string;
  status: 'waiting' | 'active' | 'resolved';
}

// WebSocket integration para chat en tiempo real
```

## Cronograma Sugerido

### Semana 1-2: Cotizaciones
- QuotePage component
- Price calculator
- Bundle discounts
- Comparison table

### Semana 3-4: Contratación  
- Contract form flow
- PDF generation
- Email simulation
- Success states

### Semana 5-6: Admin Panel
- Configuration interface
- Price management
- Content editing
- Feature flags

### Semana 7-8: Analytics & Polish
- Usage tracking
- Error handling
- Performance optimization
- Testing suite

### Semana 9-10: Integraciones
- API preparation
- CUIT validation
- Real provider research
- Production deployment

El MVP está diseñado para crecer orgánicamente desde demo hasta producto real, manteniendo la arquitectura limpia y escalable.
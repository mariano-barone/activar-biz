# Activar Business MVP - Documentación de Desarrollo

## Arquitectura General del Proyecto

### Tecnologías Core
- **Next.js 15** con App Router para server-side rendering
- **TypeScript** para type safety completo
- **Tailwind CSS** + **shadcn/ui** para sistema de diseño
- **Zustand** para estado global con persistencia
- **Lucide React** para iconografía consistente

### Estructura de Carpetas
```
src/
├── app/                    # App Router de Next.js
├── components/             # Componentes React organizados por feature
│   ├── ui/                # Componentes base de shadcn
│   ├── landing/           # Landing page
│   ├── chatbot/           # Interfaz del chatbot
│   ├── results/           # Mapa de riesgos
│   ├── quotes/            # Cotizaciones (pendiente)
│   └── contract/          # Contratación demo (pendiente)
├── lib/
│   ├── rules/             # Motor de reglas de negocio
│   ├── store/             # Estado global Zustand
│   ├── pdf/               # Generación PDF (pendiente)
│   └── utils.ts           # Utilidades shadcn
├── types/                 # Definiciones TypeScript
├── data/                  # Datos estáticos (preguntas, etc)
└── styles/               # Estilos globales
```

## Flujo de Usuario

### 1. Landing Page
- Hero section convincente
- Propuesta de valor clara
- CTA principal: "Comenzar Assessment"
- Benefits y features destacados

### 2. Chatbot Assessment (10 preguntas)
- Interfaz conversacional con quick replies
- Progress bar visual
- Navegación entre preguntas
- Validación de respuestas requeridas
- Persistencia automática de respuestas

### 3. Resultados (Mapa de Riesgos)
- Risk score visual (1-10)
- Factores de riesgo identificados
- Coberturas priorizadas: obligatorias, recomendadas, opcionales
- CTA: "Ver Cotizaciones"

### 4. Cotizaciones (En desarrollo)
- Precios simulados por cobertura
- Rangos mensuales/anuales
- Comparación de opciones

### 5. Contratación Demo (En desarrollo)
- Simulación de contratación
- Generación de certificado PDF
- Email de confirmación demo

## Motor de Reglas

El archivo `src/lib/rules/risk-engine.ts` contiene toda la lógica determinística:

### Reglas Principales
1. **ART Obligatorio**: Si tiene empleados en relación de dependencia
2. **RC + Integral**: Si tiene oficina física
3. **Cyber Risk**: Si maneja datos personales
4. **Errores y Omisiones**: Si desarrolla software propio
5. **D&O**: Si tiene inversores o board
6. **Reglas especiales**: Para empresas tech/fintech

### Cálculo de Risk Score
- Base: 5 puntos
- Factores que suman riesgo:
  - Oficina física: +1
  - Datos personales: +1.5
  - Software propio: +1
  - Operaciones internacionales: +1.5
  - Más de 10 empleados: +1
  - Más de 50 empleados: +1
  - Alta facturación: +1

## Estado Global (Zustand)

### Store Principal (`app-store.ts`)
- Respuestas del chatbot
- Datos de assessment procesados
- Resultados de evaluación de riesgo
- Coberturas seleccionadas
- Estado de UI (step actual, loading)
- Persistencia automática en localStorage

### Selectores Útiles
```typescript
const currentStep = useCurrentStep();
const assessmentData = useAssessmentData();
const riskAssessment = useRiskAssessment();
```

## Componentes Principales

### ChatbotInterface
- Maneja navegación entre preguntas
- Renderiza opciones como botones
- Integra con store para persistencia
- Progress tracking visual

### RiskMap
- Visualiza score de riesgo
- Lista factores identificados
- Muestra coberturas recomendadas priorizadas
- Cards interactivas por cobertura

### LandingPage
- Hero convincente para demo
- Features grid
- Benefits con íconos
- CTAs prominentes

## Datos y Configuración

### Preguntas del Chatbot (`data/questions.ts`)
10 preguntas ordenadas con:
- Opciones predefinidas
- Validación requerida
- Copy humanizado
- Emojis para mejor UX

### Coberturas Base (`rules/risk-engine.ts`)
6 coberturas principales con:
- Rangos de precio realistas
- Descripciones claras
- Features incluidos
- Priorización automática

## Próximos Pasos de Desarrollo

### MVP Fase 2 (Cotizaciones)
1. Componente `QuotePage` con pricing detallado
2. Calculadora de precios con descuentos
3. Comparador de coberturas
4. CTA hacia contratación

### MVP Fase 3 (Contratación)
1. Formulario de datos empresariales
2. Generación PDF con jsPDF
3. Simulación de envío email
4. Dashboard de contrato demo

### Features Administrativas
1. Panel admin para modificar precios
2. Feature flags para A/B testing
3. Configuración de marca/aseguradora
4. Analytics básicos

### Integraciones Futuras
1. API real de aseguradoras
2. Integración con CRM
3. Pasarela de pagos
4. Validación AFIP/CUIT

## Comandos de Desarrollo

```bash
# Desarrollo local
npm run dev

# Build producción
npm run build

# Linting
npm run lint

# Type checking
npm run type-check
```

## Estilo y Temas

- **Dark mode por defecto** con palette profesional
- **Purple/violet primary** para CTAs (#8B5CF6)
- **Consistent spacing** con sistema de Tailwind
- **Typography clara** con jerarquía visual
- **Hover states** y microinteracciones

El MVP está diseñado para ser una demo comercial convincente, enfocada en mostrar la visión del producto más que en precisión actuarial.
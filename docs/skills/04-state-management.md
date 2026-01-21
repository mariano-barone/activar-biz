# Estado Global - Activar Business

## Store con Zustand + Persistencia

El estado global está implementado con Zustand en `src/lib/store/app-store.ts` con persistencia automática en localStorage.

## Estado Principal

### Interface
```typescript
interface AppState {
  // Assessment Data
  currentQuestionIndex: number;
  answers: ChatbotAnswer[];
  assessmentData: Partial<AssessmentData>;
  riskAssessment: RiskAssessment | null;
  
  // Contract Flow  
  selectedCoverages: string[];
  contractDemo: ContractDemo | null;
  
  // UI State
  isLoading: boolean;
  currentStep: 'landing' | 'assessment' | 'results' | 'quotes' | 'contract' | 'complete';
}
```

## Actions (Mutaciones)

### Assessment Actions
```typescript
// Agregar/actualizar respuesta
addAnswer: (answer: ChatbotAnswer) => void;

// Navegación entre preguntas
nextQuestion: () => void;
previousQuestion: () => void;

// Datos procesados del assessment
updateAssessmentData: (data: Partial<AssessmentData>) => void;
setRiskAssessment: (assessment: RiskAssessment) => void;
```

### Contract Actions
```typescript
// Seleccionar coberturas
toggleCoverage: (coverageId: string) => void;

// Demo de contratación
setContractDemo: (contract: ContractDemo) => void;
```

### UI Actions
```typescript
// Flujo principal
setCurrentStep: (step: AppState['currentStep']) => void;

// Estados de carga
setLoading: (loading: boolean) => void;

// Reset completo
reset: () => void;
```

## Selectors (Hooks Optimizados)

### Hooks Específicos
```typescript
// Paso actual del flujo
const currentStep = useCurrentStep();

// Datos del assessment
const assessmentData = useAssessmentData();
const riskAssessment = useRiskAssessment();

// Respuestas del chatbot
const answers = useAnswers();

// Contratación
const selectedCoverages = useSelectedCoverages();
const contractDemo = useContractDemo();

// UI state
const isLoading = useIsLoading();
```

### Ventajas de los Selectors
- **Re-renders optimizados**: Solo cuando cambia el dato específico
- **Type safety**: TypeScript completo
- **Debugging**: Fácil tracking de cambios
- **Testing**: Hooks mockeables

## Persistencia

### Configuración
```typescript
persist(
  storeImplementation,
  {
    name: 'activar-business-store',
    partialize: (state) => ({
      answers: state.answers,
      assessmentData: state.assessmentData,  
      selectedCoverages: state.selectedCoverages,
      contractDemo: state.contractDemo,
    }),
  }
)
```

### Datos Persistidos
- ✅ **Respuestas del chatbot**: Para no perder progreso
- ✅ **Assessment data**: Datos procesados
- ✅ **Coberturas seleccionadas**: Selección del usuario  
- ✅ **Contrato demo**: Simulación generada

### Datos NO Persistidos
- ❌ **Estado de UI**: `currentStep`, `isLoading`
- ❌ **Índice de pregunta actual**: Se resetea en cada sesión
- ❌ **Risk assessment**: Se recalcula en cada carga

### Estrategia de Hydration
```typescript
// Los componentes verifican si hay datos persistidos
useEffect(() => {
  if (answers.length > 0) {
    // Recuperar desde localStorage
    setCurrentStep('results'); // O el paso apropiado
  }
}, []);
```

## Flujos de Datos

### 1. Assessment Flow
```
User Input → addAnswer() → Store → Risk Engine → setRiskAssessment()
```

### 2. Question Navigation
```
User Click → nextQuestion() → currentQuestionIndex++ → Re-render
```

### 3. Coverage Selection
```
User Toggle → toggleCoverage() → selectedCoverages[] → Quote Calculation
```

## Integración con Componentes

### ChatbotInterface
```typescript
const {
  currentQuestionIndex,
  answers,
  addAnswer,
  nextQuestion,
  previousQuestion,
  setLoading
} = useAppStore();

// Manejar respuesta
const handleOptionSelect = (value: string) => {
  const answer = {
    questionId: currentQuestion.id,
    value,
    timestamp: new Date()
  };
  addAnswer(answer);
};
```

### MainApp (Orquestador)
```typescript
const {
  currentStep,
  answers,
  setCurrentStep,
  setRiskAssessment,
  updateAssessmentData
} = useAppStore();

// Procesar assessment completo
const handleAssessmentComplete = async () => {
  const assessmentData = convertAnswersToAssessmentData(answers);
  updateAssessmentData(assessmentData);
  
  const assessment = assessRisk(assessmentData);
  setRiskAssessment(assessment);
  
  setCurrentStep('results');
};
```

### RiskMap
```typescript
const riskAssessment = useRiskAssessment();

// Solo lectura del estado
if (!riskAssessment) {
  return <ErrorState />;
}
```

## Debugging & DevTools

### Zustand DevTools
```typescript
import { devtools } from 'zustand/middleware';

// En desarrollo
const useAppStore = create<AppState>()(
  devtools(
    persist(implementation, options),
    { name: 'activar-business' }
  )
);
```

### Console Debugging
```typescript
// Inspeccionar estado actual
console.log(useAppStore.getState());

// Escuchar cambios
useAppStore.subscribe(
  (state) => state.currentStep,
  (currentStep) => console.log('Step changed to:', currentStep)
);
```

## Optimizaciones de Performance

### Evitar Re-renders Innecesarios
```typescript
// ❌ Mal: Re-render en cualquier cambio del store
const state = useAppStore();

// ✅ Bien: Solo re-render cuando cambia currentStep
const currentStep = useCurrentStep();
```

### Batching de Updates
```typescript
// Zustand batea automáticamente updates síncronos
const handleMultipleUpdates = () => {
  addAnswer(answer1);
  addAnswer(answer2); 
  nextQuestion();
  // Solo 1 re-render
};
```

## Testing Strategy

### Mock del Store
```typescript
// Para tests
export const mockAppStore = () => ({
  currentStep: 'landing' as const,
  answers: [],
  addAnswer: jest.fn(),
  setCurrentStep: jest.fn(),
  // ... resto de mocks
});

// En test
jest.mock('@/lib/store/app-store', () => ({
  useAppStore: () => mockAppStore(),
  useCurrentStep: () => 'landing',
}));
```

### Test de Persistencia
```typescript
test('persists answers to localStorage', () => {
  const { result } = renderHook(() => useAppStore());
  
  act(() => {
    result.current.addAnswer(mockAnswer);
  });
  
  expect(localStorage.getItem('activar-business-store'))
    .toContain(mockAnswer.questionId);
});
```

## Extensión Futura

### Nuevas Features
```typescript
// Analytics tracking
trackEvent: (event: AnalyticsEvent) => void;

// Error handling
errorState: AppError | null;
setError: (error: AppError) => void;

// User preferences
userPreferences: UserPreferences;
updatePreferences: (prefs: Partial<UserPreferences>) => void;
```

### Múltiples Stores
```typescript
// Quote-specific store
export const useQuoteStore = create<QuoteState>()(...)

// Admin-specific store  
export const useAdminStore = create<AdminState>()(...)

// Keep main store focused
```

### Middleware Adicional
```typescript
// Logger middleware
const logger = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log('  applying', args);
      set(...args);
      console.log('  new state', get());
    },
    get,
    api
  );

// Temporal middleware for undo/redo
const temporal = temporalStateManager(useAppStore);
```
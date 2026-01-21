# Componentes UI - Activar Business

## Sistema de Componentes

### Base: shadcn/ui
- Componentes pre-construidos con Tailwind
- Dark mode nativo
- Accessibility incluida
- Customizable vía CSS variables

## Componentes Principales

### 1. LandingPage

**Ubicación**: `src/components/landing/LandingPage.tsx`

**Estructura**:
```tsx
interface LandingPageProps {
  onStartAssessment: () => void;
}
```

**Secciones**:
- **Hero**: Title + subtitle + CTA principal
- **Features Grid**: 3 cards con íconos (Target, Shield, Zap)
- **Benefits**: Lista con checkmarks + card explicativo
- **CTA Final**: Call-to-action secundario con incentivos

**Design Pattern**:
- Gradient background sutil
- Badges para credibilidad ("MVP Demo")
- Íconos Lucide consistentes
- Espaciado con sistema Tailwind

### 2. ChatbotInterface

**Ubicación**: `src/components/chatbot/ChatbotInterface.tsx`

**Props**:
```tsx
interface ChatbotInterfaceProps {
  onComplete: () => void;
}
```

**Features**:
- **Progress Bar**: Showing completion percentage
- **Question Cards**: Centered, prominent
- **Option Buttons**: Radio button style con visual feedback
- **Navigation**: Back/Next con validación
- **Estado de Carga**: Spinner al finalizar

**Integración con Store**:
```tsx
const {
  currentQuestionIndex,
  answers,
  addAnswer,
  nextQuestion,
  previousQuestion
} = useAppStore();
```

### 3. RiskMap

**Ubicación**: `src/components/results/RiskMap.tsx`

**Props**:
```tsx
interface RiskMapProps {
  riskAssessment: RiskAssessment;
  onContinue: () => void;
}
```

**Layout**:
- **Left Sidebar**: Risk score + factors
- **Main Content**: Coverages grid por prioridad
- **CTA**: Continue button centrado

**Risk Score Visual**:
- Número grande (60px) con color dinámico
- Progress bar circular
- Badge de nivel (Bajo/Medio/Alto)
- Texto explicativo contextual

### 4. CoverageCard (Sub-component)

**Props**:
```tsx
interface CoverageCardProps {
  coverage: Coverage;
}
```

**Elementos**:
- **Header**: Ícono + title + priority badge
- **Description**: Texto explicativo
- **Pricing**: Rangos mensual/anual
- **Reasons**: Lista de justificaciones
- **Border Left**: Color coding por prioridad

## Patrones de Diseño

### Color System
```css
/* Primary Brand */
--primary: oklch(0.598 0.174 266.2); /* Purple #8B5CF6 */

/* Risk Levels */
.risk-low: text-green-500
.risk-medium: text-yellow-500  
.risk-high: text-red-500

/* Priority Badges */
.obligatorio: variant="destructive" (red)
.recomendado: variant="default" (purple)
.opcional: variant="secondary" (gray)
```

### Typography Scale
```css
/* Headings */
h1: text-4xl md:text-6xl font-bold
h2: text-3xl font-bold
h3: text-lg font-semibold

/* Body */
p: text-xl text-muted-foreground (landing)
p: text-base (components)

/* Small */
span: text-sm text-muted-foreground
```

### Spacing System
```css
/* Sections */
.section-padding: py-16
.container-padding: px-4

/* Components */  
.card-padding: p-6
.content-gap: space-y-4
.grid-gap: gap-8
```

### Interactive States
```css
/* Buttons */
hover:bg-[#383838] dark:hover:bg-[#ccc]

/* Cards */
hover:bg-muted

/* Selected Options */
bg-primary text-primary-foreground
```

## Componentes UI Base (shadcn)

### Utilizados Actualmente
- **Button**: CTAs y navigation
- **Card**: Contenedores principales
- **Progress**: Assessment progress
- **Badge**: Status indicators
- **Input**: (Preparado para formularios futuros)
- **Dialog**: (Preparado para modals)

### Extensiones Custom

#### Progress Bar Custom
```tsx
<Progress value={(riskScore / 10) * 100} className="w-full" />
```

#### Badge con Variants Custom
```tsx
<Badge variant={getPriorityBadgeVariant(priority)}>
  {priority.toUpperCase()}
</Badge>
```

## Responsive Design

### Breakpoints
```css
/* Mobile First */
base: 320px+
sm: 640px+  
md: 768px+ 
lg: 1024px+
xl: 1280px+
```

### Layout Patterns
```tsx
// Landing: Stacked mobile, side-by-side desktop
grid md:grid-cols-2 gap-12

// Chatbot: Centered single column
w-full max-w-2xl

// RiskMap: Sidebar layout
grid lg:grid-cols-3 gap-8
```

## Accesibilidad

### Implementado
- **Semantic HTML**: Proper heading hierarchy
- **Alt Text**: All images described
- **Focus States**: Keyboard navigation
- **Color Contrast**: WCAG AA compliant
- **Screen Reader**: Proper ARIA labels

### Keyboard Navigation
- Tab order lógico
- Enter/Space para buttons
- Escape para modals
- Arrow keys para opciones

## Performance

### Optimizaciones
- **React.memo**: Components que no cambian frecuentemente
- **useCallback**: Event handlers estables  
- **Lazy Loading**: Prepared para imágenes futuras
- **Code Splitting**: Por feature/route

### Bundle Size
- **Lucide React**: Tree-shaking enabled
- **shadcn Components**: Solo componentes utilizados
- **Tailwind**: Purged unused classes

## Testing Strategy (Futuro)

### Unit Tests
```tsx
// Component rendering
test('LandingPage renders hero title')

// User interactions  
test('ChatbotInterface handles answer selection')

// State integration
test('RiskMap displays correct risk score')
```

### Integration Tests
```tsx
// User flows
test('Complete assessment flow')
test('Navigation between steps')
test('Data persistence')
```

## Próximas Mejoras

### UX Enhancements
- **Loading States**: Skeleton components
- **Error Boundaries**: Graceful error handling  
- **Animations**: Framer Motion integration
- **Micro-interactions**: Hover effects, transitions

### Mobile Optimization
- **Touch Targets**: Minimum 44px buttons
- **Swipe Navigation**: Gesture support
- **Mobile Menu**: Responsive navigation
- **PWA Features**: Install prompt, offline

### Accessibility Plus
- **High Contrast Mode**: Enhanced visibility
- **Reduced Motion**: Respect user preferences
- **Voice Navigation**: Speech recognition
- **Internationalization**: Multi-language support
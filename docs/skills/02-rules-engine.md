# Motor de Reglas - Activar Business

## Lógica de Negocio Determinística

El motor de reglas en `src/lib/rules/risk-engine.ts` implementa toda la lógica de recomendación de seguros de forma determinística, sin AI.

## Reglas de Coberturas

### 1. ART (Obligatorio)
```typescript
// Condición
employmentType === 'relacion_dependencia' || employmentType === 'mixto'

// Razón
"Obligatorio por ley para empleados en relación de dependencia"
```

### 2. Responsabilidad Civil + Integral de Comercio
```typescript
// Condición
hasPhysicalOffice === true

// Razones
- "Oficina física requiere protección contra daños a terceros"
- "Establecimiento físico necesita protección integral"
```

### 3. Cyber Risk
```typescript
// Condición
handlesPersonalData === true

// Razón
"Manejo de datos personales requiere protección cibernética"
```

### 4. Errores y Omisiones
```typescript
// Condición
usesProprieterarySoftware === true

// Razón
"Desarrollo de software requiere cobertura por errores profesionales"
```

### 5. D&O (Directores y Oficiales)
```typescript
// Condición
hasInvestors === true

// Razón
"Presencia de inversores requiere protección de directores y oficiales"
```

### 6. Reglas Especiales para Tech/Fintech
```typescript
// Si industry === 'tecnologia' || industry === 'fintech'
- Cyber Risk automático (si no se activó por datos personales)
- E&O opcional adicional
```

## Algoritmo de Risk Score

### Base Score: 5/10

### Factores que Incrementan Riesgo:
```typescript
let score = 5; // Base neutral

// +1: Oficina física
if (hasPhysicalOffice) score += 1;

// +1.5: Manejo de datos personales
if (handlesPersonalData) score += 1.5;

// +1: Software propio
if (usesProprieterarySoftware) score += 1;

// +1.5: Operaciones internacionales
if (hasInternationalOperations) score += 1.5;

// +1: Más de 10 empleados
if (employeeCount > 10) score += 1;

// +1: Más de 50 empleados
if (employeeCount > 50) score += 1;

// +1: Facturación alta
if (revenue === '20m_50m' || revenue === 'mas_50m') score += 1;

// Límites: 1-10
return Math.min(Math.max(score, 1), 10);
```

### Interpretación del Score:
- **1-3**: Riesgo Bajo (Verde)
- **4-6**: Riesgo Medio (Amarillo)  
- **7-10**: Riesgo Alto (Rojo)

## Datos de Coberturas

### Precios Base (ARS - Enero 2026)

#### Responsabilidad Civil General
- **Mensual**: $15,000 - $45,000
- **Anual**: $150,000 - $450,000
- **Features**: Daños a terceros, responsabilidad por productos, cobertura nacional

#### ART
- **Mensual**: $25,000 - $80,000  
- **Anual**: $300,000 - $960,000
- **Features**: Accidentes laborales, enfermedades profesionales, prestaciones médicas

#### Cyber Risk
- **Mensual**: $20,000 - $60,000
- **Anual**: $200,000 - $600,000
- **Features**: Violación de datos, ataques cibernéticos, gastos de recuperación

#### Errores y Omisiones
- **Mensual**: $18,000 - $55,000
- **Anual**: $180,000 - $550,000
- **Features**: Errores profesionales, fallas de software, gastos legales

#### D&O
- **Mensual**: $30,000 - $90,000
- **Anual**: $350,000 - $1,080,000
- **Features**: Responsabilidad directorial, decisiones empresariales, cobertura internacional

#### Integral de Comercio
- **Mensual**: $12,000 - $40,000
- **Anual**: $120,000 - $400,000
- **Features**: Incendio, robo, daños por agua, pérdida de beneficios

## API del Motor de Reglas

### Función Principal
```typescript
assessRisk(assessmentData: AssessmentData): RiskAssessment
```

### Funciones Auxiliares
```typescript
// Obtener cobertura específica
getCoverageById(id: CoverageType): Coverage | null

// Todas las coberturas disponibles
getAllCoverages(): Coverage[]

// Datos base sin procesamiento
baseCoverages: Record<CoverageType, BaseCoverage>
```

## Factores de Riesgo Textuales

El motor genera explicaciones humanas de los riesgos identificados:

```typescript
const factors = [
  'Establecimiento físico expuesto a riesgos',
  'Manejo de datos personales (riesgo cibernético)',  
  'Desarrollo de software (riesgo de errores profesionales)',
  'Operaciones internacionales (mayor exposición)',
  'Plantilla de empleados significativa',
  'Empleados en relación de dependencia (ART obligatorio)',
  'Estructura de inversores (responsabilidad directorial)'
];
```

## Extensión del Motor

### Para Agregar Nueva Cobertura:
1. Actualizar enum `CoverageType` en `types/index.ts`
2. Agregar entrada en `baseCoverages`
3. Implementar regla en `getRequiredCoverages()`
4. Actualizar cálculo de risk score si corresponde

### Para Modificar Reglas:
1. Editar condiciones en métodos privados de `RiskEngine`
2. Ajustar textos explicativos en `getRiskFactors()`
3. Actualizar tests (cuando se implementen)

### Para Cambiar Precios:
1. Modificar rangos en `baseCoverages`
2. Implementar multiplicadores dinámicos
3. Agregar lógica de descuentos/recargos

## Consideraciones de Negocio

- **Determinismo Total**: Sin ML ni AI, solo reglas if/then
- **Transparencia**: Todas las razones son explicables
- **Escalabilidad**: Fácil agregar nuevas reglas y coberturas
- **Demo-Friendly**: Precios orientativos, no actuariales reales
- **Compliance**: Respeta obligaciones legales (ART)
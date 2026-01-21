# Activar Business MVP

> **Demo comercial de seguros inteligentes para startups y PYMEs argentinas**

Una plataforma de assessment de riesgos empresariales que recomienda seguros de forma digital y determinística. Construido como MVP para presentar a compañías de seguros.

## 🎯 Objetivo del MVP

- **Demo comercial** para mostrar la visión del producto
- **Diagnóstico de riesgos** empresariales en 5 minutos
- **Recomendaciones determinísticas** basadas en reglas de negocio
- **Simulación completa** de contratación y emisión

## 🚀 Quick Start

```bash
# Clonar e instalar dependencias
git clone <repo>
cd activar-business
npm install

# Ejecutar en desarrollo
npm run dev

# Abrir http://localhost:3000
```

## 🏗️ Stack Tecnológico

- **Framework**: Next.js 15 con App Router
- **Lenguaje**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui (Dark Mode)
- **Estado**: Zustand con persistencia
- **Icons**: Lucide React
- **PDF**: jsPDF (preparado)

## 📊 Flujo del Usuario

1. **Landing** → Propuesta de valor y CTA
2. **Assessment** → 10 preguntas guiadas con chatbot
3. **Resultados** → Mapa de riesgos personalizado
4. **Cotizaciones** → Precios estimados por cobertura _(próximamente)_
5. **Contratación** → Simulación y certificado PDF _(próximamente)_

## 🎮 Features Implementadas

### ✅ Chatbot de Assessment
- 10 preguntas estratégicas sobre la empresa
- Interfaz conversacional con quick replies
- Progress tracking visual
- Navegación back/forward
- Persistencia automática de respuestas

### ✅ Motor de Reglas Determinístico
- **ART**: Obligatorio para empleados en relación de dependencia
- **Cyber Risk**: Para manejo de datos personales
- **RC + Integral**: Para oficinas físicas
- **E&O**: Para desarrollo de software
- **D&O**: Para empresas con inversores
- Cálculo de risk score (1-10)

### ✅ Mapa de Riesgos Visual
- Score de riesgo con color coding
- Factores de riesgo identificados
- Coberturas priorizadas: obligatorias, recomendadas, opcionales
- Cards detalladas por cobertura

### ✅ Estado Global Persistente
- Zustand para manejo de estado
- Persistencia en localStorage
- Selectors optimizados
- Type safety completo

## 📋 Coberturas Incluidas

1. **Responsabilidad Civil General** - Daños a terceros
2. **ART** - Obligatorio para empleados
3. **Cyber Risk** - Protección de datos y ciberseguridad
4. **Errores y Omisiones** - Para servicios profesionales
5. **D&O** - Directores y oficiales
6. **Integral de Comercio** - Protección de establecimiento

## 🎨 Design System

- **Dark Mode** por defecto con palette profesional
- **Primary Color**: Purple (#8B5CF6) para CTAs
- **Typography**: Jerarquía clara con Geist Sans
- **Spacing**: Sistema consistente de Tailwind
- **Components**: shadcn/ui con customizaciones

## 📁 Arquitectura del Proyecto

```
src/
├── app/                    # Next.js App Router
├── components/
│   ├── ui/                # shadcn base components
│   ├── landing/           # Landing page
│   ├── chatbot/           # Assessment interface
│   ├── results/           # Risk map
│   ├── quotes/            # Cotizaciones (próx.)
│   └── contract/          # Contratación (próx.)
├── lib/
│   ├── rules/             # Motor de reglas de negocio
│   ├── store/             # Estado global Zustand
│   └── utils.ts           # Utilidades
├── types/                 # Definiciones TypeScript
├── data/                  # Datos estáticos (preguntas)
└── docs/skills/           # Documentación de desarrollo
```

## 📖 Documentación para Desarrollo

Los archivos `docs/skills/` contienen guías detalladas para desarrollo con prompting:

- **01-architecture.md** - Arquitectura general y stack
- **02-rules-engine.md** - Lógica de negocio y motor de reglas
- **03-components.md** - Sistema de componentes UI
- **04-state-management.md** - Estado global con Zustand
- **05-next-features.md** - Roadmap y próximas features

## 🚧 Próximas Features

### Fase 2: Cotizaciones Detalladas
- Calculator de precios con descuentos
- Comparación side-by-side
- Toggle mensual/anual

### Fase 3: Contratación Demo
- Formularios de datos empresariales
- Generación de PDF certificados
- Simulación de envío por email

### Fase 4: Panel Administrativo
- Configuración de precios
- Edición de contenido
- Feature flags

## 🧪 Comandos Disponibles

```bash
# Desarrollo
npm run dev           # Servidor de desarrollo
npm run build         # Build de producción
npm run start         # Servidor de producción
npm run lint          # ESLint
npm run type-check    # TypeScript checking
```

## 🎯 Consideraciones del MVP

- **Demo-first**: Enfocado en mostrar la visión, no precisión actuarial
- **Determinístico**: Sin IA, solo reglas de negocio transparentes
- **Escalable**: Arquitectura preparada para integraciones reales
- **Mobile-ready**: Responsive design para todos los dispositivos

## 📄 Precios Demo (Enero 2026)

Los precios mostrados son estimativos para demo:

- **ART**: $25K - $80K/mes
- **Cyber Risk**: $20K - $60K/mes  
- **RC General**: $15K - $45K/mes
- **E&O**: $18K - $55K/mes
- **D&O**: $30K - $90K/mes
- **Integral**: $12K - $40K/mes

## 👥 Target de Demo

- **Startups** tecnológicas argentinas
- **PYMEs** con 1-50 empleados
- **Fintechs** y empresas de servicios
- **Empresas** con operaciones digitales

## 📧 Contacto

Este MVP está diseñado para ser presentado a compañías de seguros como prueba de concepto para digitalizationar el proceso de assessment y venta de seguros empresariales.

---

**Nota**: Este es un proyecto demo. Los precios y coberturas son estimativos y no constituyen una oferta comercial real.

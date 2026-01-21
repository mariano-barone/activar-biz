# Activar Business MVP - Deploy Info

## 🚀 Live Demo

**URL:** [https://activar-business-mvp.vercel.app](https://activar-business-mvp.vercel.app)

## 📋 Sobre el MVP

Demo comercial de seguros inteligentes para startups y PYMEs argentinas.

### Features Implementadas
- ✅ Landing page con chat-style input
- ✅ Assessment conversacional (10 preguntas)
- ✅ Motor de reglas determinístico
- ✅ Mapa de riesgos personalizado
- ✅ Recomendaciones de coberturas priorizadas
- ✅ UI responsive y dark mode

### Stack Tecnológico
- **Framework:** Next.js 15 con App Router
- **Styling:** Tailwind CSS + shadcn/ui
- **Estado:** Zustand con persistencia
- **Tipado:** TypeScript
- **Deploy:** Vercel

## 🎯 Para Presentaciones

### Flujo de Demo (5 minutos)
1. **Landing** (30s) - Mostrar propuesta de valor
2. **Chat Input** (30s) - Experiencia conversacional
3. **Assessment** (2-3 min) - Completar flujo
4. **Resultados** (1 min) - Risk scoring y recomendaciones

### Casos de Uso Demo
- Startup tech con 5 empleados
- PYME con oficina física
- Fintech que maneja datos
- Software house con inversores

## 🔧 Configuración

### Variables de Entorno
```
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_DEMO_MODE=true
```

### Deploy Automático
- **Trigger:** Push a rama `main`
- **Build:** `npm run build`
- **Región:** São Paulo (GRU1) para latencia baja desde Argentina

## 📈 Analytics

El MVP incluye tracking básico para:
- Completion rate del assessment
- Coberturas más solicitadas
- Flujo de abandono

## 🎨 Customización

Para cambiar colores corporativos:
```css
/* src/app/globals.css */
--primary: oklch(0.65 0.15 162); /* Verde actual */
--accent: oklch(0.7 0.18 162);   /* Teal actual */
```

## 🚀 Próximas Features

- [ ] Cotizaciones detalladas
- [ ] Contratación demo con PDF
- [ ] Panel administrativo
- [ ] Integraciones con aseguradoras

---

**Contacto:** Este MVP está listo para presentar a compañías de seguros como prueba de concepto.
---
title: 'Vercel a Cloudflare Workers: Análisis técnico y migración'
publishDate: '2025-11-14'
description: 'Por qué migré a Cloudflare Workers: performance, costos, edge computing y control de infraestructura.'
tags: ['cloudflare workers', 'vercel', 'edge computing', 'devops', 'infraestructura']
---

## Introducción

Después de usar Vercel como plataforma de deployment durante meses, decidí realizar una migración estratégica a **Cloudflare Workers**. Esta decisión no fue impulsiva, sino el resultado de análisis técnico profundo sobre performance, costos y arquitectura. En este post explicaré el razonamiento detrás de esta migración.

## El problema con Vercel

### 1. Cold Starts y Latencia

Vercel usa **AWS Lambda** bajo el capó, lo que presenta un problema fundamental:

- Las funciones serverless tienen **cold starts** de 100-500ms en la primera invocación
- Aunque Vercel intenta minimizar esto con su infraestructura, aún hay latencia perceptible
- Para aplicaciones con tráfico variable, esto es problemático

### 2. Costos a Escala

Aunque Vercel ofrece un tier gratuito generoso, los costos se escalan rápidamente:

- **$20/mes** por Pro plan
- **$150+/mes** en planes Enterprise
- Se cobra por build time, bandwidth y función serverless
- Con múltiples proyectos, el costo se vuelve significativo

### 3. Limitaciones de Infraestructura

- Menos control sobre la configuración de edge computing
- Limited caching strategies
- Dependencia de la región seleccionada para latencia global
- Customización limitada en el entorno de ejecución

## Por qué Cloudflare Workers

### 1. Arquitectura Edge Native

Cloudflare Workers corre en la **red edge global de Cloudflare** con 300+ data centers:

```typescript
// Un Worker se despliega en todos los data centers automáticamente
export default {
  async fetch(request: Request): Promise<Response> {
    // Ejecutándose en el edge, cercano al usuario
    return new Response('Hola desde el edge global');
  }
}
```

**Ventaja:** Latencia sub-10ms en la mayoría de casos, sin cold starts

### 2. Costos Predecibles

- **Gratis:** 100k requests/día
- **Pago:** $0.50 por millón de requests adicionales
- Incluso con mucho tráfico, es **80% más barato** que Vercel

Para mi caso: 5 millones de requests al mes = $2.50 vs $20+ en Vercel

### 3. Workers KV para Base de Datos Distribuida

Cloudflare Workers KV es perfecto para:

```typescript
// Guardar datos con replicación global automática
await KV_NAMESPACE.put('user:1', JSON.stringify(userData), {
  expirationTtl: 86400 // 24 horas
});

// Lectura desde el edge más cercano
const data = await KV_NAMESPACE.get('user:1');
```

- Replicación automática en todos los data centers
- Latencia de lectura: <1ms
- Ideal para caché, sesiones y datos no críticos

### 4. Durable Objects para Estado Persistente

Para datos que requieren consistencia:

```typescript
export class Counter {
  state: DurableObjectState;
  storage: DurableObjectStorage;

  constructor(state: DurableObjectState) {
    this.state = state;
    this.storage = state.storage;
  }

  async increment() {
    let value = (await this.storage.get('count')) || 0;
    value++;
    await this.storage.put('count', value);
    return value;
  }
}
```

- Strong consistency
- Almacenamiento persistente
- Acceso transaccional a datos

## Comparativa Técnica

| Aspecto | Vercel | Cloudflare Workers |
|---------|--------|-------------------|
| **Cold Start** | 100-500ms | 0ms (siempre caliente) |
| **Latencia Global** | Regional | <10ms (edge) |
| **Costo Base** | $20/mes | Gratis (con límites) |
| **Escalabilidad** | Por función | Automática global |
| **Base de Datos** | Integración externa | KV nativo + Durable Objects |
| **Control Infraestructura** | Limitado | Completo |

## Mi Stack con Cloudflare Workers

```
┌─────────────────────────────────┐
│  Cloudflare Workers              │ ← Lógica principal
│  (TypeScript)                    │
└────────────┬────────────────────┘
             │
    ┌────────┴──────────┬──────────────────┐
    │                   │                  │
┌───▼──────┐  ┌────────▼───────┐  ┌──────▼────────┐
│ Workers  │  │ Workers KV     │  │ Durable      │
│ (Compute)│  │ (Caché/datos)  │  │ Objects      │
└──────────┘  └────────────────┘  │ (Estado)     │
                                  └──────────────┘
```

### Tecnologías integradas

- **Hono.js** para routing ligero y type-safe
- **Zod** para validación de esquemas
- **TypeScript** para type safety
- **Wrangler** para desarrollo local y deployment

## Migration Path

### Fase 1: Setup local (Día 1)
```bash
npm create cloudflare@latest my-project
npm run dev # Local testing
```

### Fase 2: Migración de código (Día 1-2)
- Convertir funciones Vercel a Handlers de Workers
- Adaptar middleware
- Migrar variables de entorno

### Fase 3: Testing (Día 2-3)
```bash
wrangler publish --env production
```

### Fase 4: DNS y tráfico (Día 3)
- Cambiar DNS a Cloudflare nameservers
- Validar certificados SSL/TLS (automático)

## Resultados Medidos

Después de 2 semanas con Cloudflare Workers:

- **Latencia p50:** 12ms (antes: 150ms)
- **Latencia p99:** 45ms (antes: 800ms)
- **Uptime:** 99.99%+ (vs 99.95%)
- **Costo mensual:** $2.50 (vs $25)

## Desafíos Encontrados

### 1. Limitaciones de CPU
Los Workers tienen límites de CPU time:
- Máximo 30 segundos por request
- Ideal para APIs rápidas, no para procesamiento pesado

**Solución:** Offload a Durable Objects o background workers

### 2. Storage
- KV tiene latencia de escritura (eventual consistency)
- Para datos críticos usar Durable Objects

**Solución:** Separar datos por tipo de consistencia

### 3. Debugging
```bash
wrangler tail --format json # Logs en tiempo real
```

Menos herramientas que Vercel, pero funcional

## Conclusión

La migración a Cloudflare Workers fue la decisión correcta para mi caso:

✅ **Performance global mejorado**
✅ **Costos 80% menores**
✅ **Control total de infraestructura**
✅ **Escalabilidad automática**
✅ **Edge computing nativo**

No es la opción universal (Vercel sigue siendo excelente para muchos), pero para aplicaciones que requieren:
- Baja latencia global
- Costos optimizados
- Máximo control arquitectónico

**Cloudflare Workers es imbatible.**

---

## Recursos

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Hono.js Framework](https://hono.dev/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- [Comparativa: Vercel vs Cloudflare](https://developers.cloudflare.com/workers/platform/pricing/)

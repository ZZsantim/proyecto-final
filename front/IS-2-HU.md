---
title: Historias de usuario v2
aliases: [HU, historias de usuario, backlog, backlog v2]
tags: [electrostock, ing-software, hu]
type: note
created: 2026-10-28
updated: 2026-10-28
status: evergreen
related: ["[[00-indice]]", "[[IS-1-SRS-IEEE830]]", "[[IS-4-diseno-interfaz]]", "[[IS-5-pruebas]]", "[[AR-3-POC]]", "[[HU-propuesta]]"]
---

# Historias de usuario v2

Documento único del backlog: 30 HU con plantilla extendida. Se construyó a partir de [[HU-propuesta]], que se conserva sin cambios. Aplica las decisiones ADR-02 a ADR-09 de [[AR-2-ADR]]:
- una sede y vehículos eléctricos livianos identificados por serie;
- 4 roles; máquinas de estado separadas para Cita y Orden;
- reserva de repuestos al agendar e inventario de tres cantidades;
- fusión de duplicados reutilizando IDs;
- plantilla extendida.

Estado de evidencia: **Diseñado**. Las rutas y tablas citadas usan su nombre conceptual en español; el nombre canónico en código está en el diccionario de [[AR-1-SAD#2.4 Diccionario de nombres|SAD 2.4]] (ADR-38).

Las pantallas se citan con los ID de vista validados en [[IS-4-diseno-interfaz]] (PU portal público, CL cliente, SE secretaria, ME mecánico, AD administrador). La correspondencia con los antiguos P-XX está en su Apéndice A.

## Plantilla extendida (ADR-09)
Cada HU contiene:
1. **Historia**: Como / Quiero / Para.
2. **Cambios frente a la versión original**: qué se fusionó, reescribió o corrigió, y por qué.
3. **Descripción técnica.**
4. **Criterios de aceptación** en Given-When-Then (Dado / Cuando / Entonces): mínimo un escenario exitoso, uno fallido y uno de error.
5. **Reglas de negocio** ([[IS-1-SRS-IEEE830#3.2.1 Reglas de negocio|SRS 3.2.1]]).
6. **Trazabilidad**: RF, RNF, atributo ISO 25010, vista, casos de prueba y módulo.
7. **Definition of Ready** y **Definition of Done** como listas de verificación.

Esfuerzo en escala Fibonacci. Prioridad: 1 esencial, 2 deseable, 3 opcional.

## Backlog

| HU | Título | Rol | Módulo | Esf. | Prio | Origen | POC | Responsable |
|---|---|---|---|---|---|---|---|---|
| [[#HU-01]] | Agendar cita | Cliente | agenda | 5 | 1 | Ajustada | Sí | Carlos |
| [[#HU-02]] | Calendario semaforizado | Secretaria | agenda | 5 | 1 | Ajustada | No | - |
| [[#HU-03]] | Registrar llegada sin cita | Secretaria | agenda | 8 | 1 | Ajustada | Sí | Carlos |
| [[#HU-04]] | Clasificar ingreso no programado | Secretaria | agenda | 3 | 2 | Original | No (incluida en HU-03) | - |
| [[#HU-05]] | Actualizar orden y cambiar estado | Mecánico | órdenes | 5 | 1 | Fusión 05 + 26 | Sí | Joseph |
| [[#HU-06]] | Expediente técnico del vehículo | Mecánico | clientes-vehículos | 5 | 2 | Ajustada | Sí | Santiago |
| [[#HU-07]] | Seguimiento público del servicio | Cliente | órdenes | 3 | 2 | Fusión 07 + 28 | Sí | Santiago |
| [[#HU-08]] | Alertas de inventario | Administrador | inventario | 5 | 1 | Ajustada | No | - |
| [[#HU-09]] | Registrar instalación de repuestos | Mecánico | órdenes | 5 | 1 | Reescrita | No | - |
| [[#HU-10]] | Autorización por rol | Sistema | identidad | 5 | 1 | Reescrita | Base | Todos |
| [[#HU-11]] | Cancelar o reprogramar cita | Cliente | agenda | 3 | 2 | Ajustada | Sí | Joseph |
| [[#HU-12]] | Recordatorio automático | Cliente | agenda | 5 | 3 | Ajustada | No | - |
| [[#HU-13]] | Liquidar, cobrar y entregar | Secretaria | facturación | 5 | 1 | Fusión 13 + 27 | No | - |
| [[#HU-14]] | Reportes operativos | Administrador | reportes | 5 | 2 | Fusión 10 + 14 | No | - |
| [[#HU-15]] | Gestión de usuarios | Administrador | identidad | 5 | 1 | Original | No | - |
| [[#HU-16]] | Encuesta de satisfacción | Cliente | facturación | 3 | 3 | Ajustada | No | - |
| [[#HU-17]] | Ticket PDF | Secretaria | facturación | 2 | 3 | Ajustada | No | - |
| [[#HU-18]] | Catálogo de servicios | Administrador | catálogo | 3 | 2 | Original | No | - |
| [[#HU-19]] | Reserva automática de repuestos al agendar | Sistema / Cliente | inventario + agenda | 8 | 1 | **Nueva** | Sí | Joseph |
| [[#HU-20]] | Bitácora de auditoría | Administrador | auditoría | 5 | 2 | Original | Parcial | - |
| [[#HU-21]] | Registro e inicio de sesión | Usuario | identidad | 5 | 1 | Ampliada | Sí | Santiago |
| [[#HU-22]] | Registrar cliente y vehículo | Secretaria | clientes-vehículos | 2 | 1 | Ajustada | Sí | Carlos |
| [[#HU-23]] | Crear orden de trabajo | Secretaria | órdenes | 3 | 1 | Ajustada | Sí | Joseph |
| [[#HU-24]] | Asignar mecánico | Administrador | órdenes | 4 | 1 | Ajustada | No (semilla) | - |
| [[#HU-25]] | Agregar repuestos a la orden | Mecánico | órdenes | 5 | 1 | Reescrita | No | - |
| [[#HU-26]] | Repuestos requeridos por servicio | Administrador | catálogo | 3 | 1 | **Nueva** | Sí | Carlos |
| [[#HU-27]] | Entradas y bajas de inventario | Administrador | inventario | 3 | 2 | **Nueva** | No | - |
| [[#HU-28]] | Liberar reservas vencidas e inasistencias | Sistema | agenda + inventario | 5 | 1 | **Nueva** | Sí | Santiago |
| [[#HU-29]] | Registrar repuestos | Administrador | inventario | 2 | 2 | Original | No (semilla) | - |
| [[#HU-30]] | Historial de servicios | Cliente | clientes-vehículos | 4 | 2 | Ajustada | No | - |

**Total del backlog:** 129 puntos. **POC:** 55 puntos (Carlos 18, Joseph 19, Santiago 18). Ramas reales: `dev_calopez28`, `dev_jhernandez68`, `dev_sfonseca93`.

### Correspondencia con el backlog original

| ID original | Destino en la v2 |
|---|---|
| HU-10 original (reportes multisede con RBAC) | Reportes → HU-14; RBAC → HU-10 (reescrita) |
| HU-19 original (traslado entre sedes) | Eliminada por una sede (ADR-02); ID reutilizado para la reserva al agendar |
| HU-26 original (cambiar estado) | Fusionada en HU-05; ID reutilizado para repuestos por servicio |
| HU-27 original (factura) | Fusionada en HU-13; ID reutilizado para entradas y bajas |
| HU-28 original (consulta por placa) | Fusionada en HU-07; ID reutilizado para la liberación de reservas |

### Punto de partida en la línea base v0.2
La v0.2 ([[03-POC-HU-implementadas]]) implementó HU-01, 03, 05, 06, 07 y 11 con otras reglas (retención de 10 min, token de gestión, consulta por documento, sin inventario). Cada HU de abajo indica su diferencia. Detalle en [[AR-4-linea-base]].

---

## HU-01
**Agendar cita de mantenimiento o reparación** · Cliente · agenda · Esfuerzo 5 · Prioridad 1 · POC: Carlos · Origen: ajustada

### Historia
**Como** cliente con cuenta, **quiero** agendar una cita para mi vehículo eléctrico eligiendo el servicio y una franja disponible, **para** asegurar mi turno con la certeza de que el taller tiene lo necesario para atenderme.

### Cambios frente a la versión original
- Se elimina la selección de sede (ADR-02).
- El "portal público" pasa a requerir sesión de Cliente (ADR-20), para poder reprogramar ([[#HU-11]]) y ver el historial ([[#HU-30]]).
- El bloqueo temporal "de 5 a 10 minutos" se fija en **5 minutos** (ADR-22). La v0.2 usaba 10.
- Un servicio de más de 1 hora ocupa franjas consecutivas (ADR-21).
- La reserva de repuestos se especifica en [[#HU-19]], que se ejecuta en la misma transacción.

### Descripción
Asistente de 4 pasos, según el diseño validado:
1. Vehículo y servicio (CL-02).
2. Día en el calendario mensual (CL-03).
3. Hora, con el estado de cada franja y el repuesto que se apartará (CL-04).
4. Resumen con contador de 5 minutos y confirmación con código (CL-05).

El paso 3 consulta `GET /api/v1/agenda/franjas?fecha=&servicio_id=`, que devuelve solo las franjas iniciales donde caben todas las franjas consecutivas, con su semáforo. Al elegir, `POST /api/v1/agenda/citas` crea la cita *En Proceso* y bloquea con `SELECT ... FOR UPDATE` las filas de franja, verificando la capacidad (ADR-18); en la misma transacción se retienen los repuestos ([[#HU-19]]). `POST /api/v1/agenda/citas/{id}/confirmar` pasa la cita a *Confirmada*. Bosquejo completo del caso de uso en [[AR-1-SAD#5.3 C4 nivel 4 Código|SAD 5.3]].

### Criterios de aceptación
**Escenario 1 - Exitoso: agendar en franja disponible**
- **Dado que** el cliente inició sesión, tiene el vehículo `SC-48-0001` registrado y eligió *Cambio de batería 48V*,
- **cuando** selecciona mañana a las 10:00 (con cupo y repuesto) y confirma antes de 5 minutos,
- **entonces** el sistema crea la cita *Confirmada* con código `CITA-AAAAMMDD-NNNN`, ocupa un cupo y muestra la confirmación con la hora límite para cancelar.

**Escenario 2 - Fallido: franja llena**
- **Dado que** la franja de las 10:00 alcanzó su capacidad,
- **cuando** el cliente intenta seleccionarla,
- **entonces** aparece deshabilitada con la etiqueta "Agotado" y se sugiere la siguiente franja disponible.

**Escenario 3 - Fallido: concurrencia sobre el último cupo**
- **Dado que** dos clientes solicitan casi al mismo tiempo el último cupo,
- **cuando** el sistema procesa ambas solicitudes,
- **entonces** solo una obtiene la cita; la otra recibe `409` "Alguien acaba de tomar este cupo" con la siguiente franja sugerida. No se generan dos códigos para el mismo cupo.

**Escenario 4 - Fallido: servicio que no cabe**
- **Dado que** *Reparación de motor* dura 3 horas,
- **cuando** el cliente consulta franjas,
- **entonces** no se ofrecen franjas iniciales después de las 15:00 ni secuencias que incluyan una franja llena o bloqueada.

**Escenario 5 - Error: falla de conexión al confirmar**
- **Dado que** el cliente presiona "Confirmar cita",
- **cuando** se pierde la conexión con la base de datos durante la transacción,
- **entonces** el sistema revierte todo y muestra "No fue posible completar la reserva, intente de nuevo". No queda cita ni reserva parcial.

### Reglas de negocio
RN-01, 02, 03, 04, 06, 08, 09, 13, 14.

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-16 a RF-19 | RNF-03, 06, 07, 17, 31 | Fiabilidad, Capacidad de interacción | CL-02 a CL-05 | CP-13, 14, 17, 37, 38, 41, 42 | agenda |

### Definition of Ready
- [x] Mockups CL-02 a CL-05 (4 pasos, web y móvil) aprobados en Figma.
- [ ] Contrato OpenAPI de franjas y citas acordado con HU-19.
- [ ] Estrategia de concurrencia definida (ADR-18) y franja de prueba con capacidad 1 en la semilla.
- [ ] Parámetros RN-01 y RN-06 definidos.

### Definition of Done
- [ ] JMeter de doble reserva: 1 éxito, 99 rechazos, 0 `5xx` (CP-41).
- [ ] Cobertura ≥ 80 % en la calculadora de franjas y en `agendar-cita`, `selector-franja`, `contador-regresivo`.
- [ ] Mínimo 2 commits `HU-01` en `dev_calopez28` y PR aprobado hacia `develop`.
- [ ] Funciona en modo mock y contra Docker.
- [ ] 0 violaciones de axe en CL-02 a CL-05.

---

## HU-02
**Calendario semaforizado de capacidad** · Secretaria · agenda · Esfuerzo 5 · Prioridad 1 · Fuera del POC · Origen: ajustada

### Historia
**Como** secretaria, **quiero** visualizar el calendario con la ocupación de cada franja y bloquear franjas por imprevistos, **para** evitar la sobrecarga y reaccionar cuando falta un mecánico o una bahía.

### Cambios frente a la versión original
- Capacidad por **bahías activas** de una sola sede (ADR-02, ADR-21), no por mecánicos por sede.
- Umbrales del semáforo explícitos (RN-05); texto e icono además del color (RNF-19).

### Descripción
Vista SE-01 (agenda y capacidad): calendario mensual de ocupación y franjas del día. Cada franja muestra ocupados/capacidad y el semáforo:
- **Verde:** < 50 %.
- **Amarillo:** 50 % a < 100 %.
- **Rojo:** 100 % o bloqueada.

`POST /api/v1/agenda/franjas/{id}/bloqueo` con `{motivo}`; `DELETE` para desbloquear. El bloqueo no cancela citas existentes: las lista para gestión manual (RN-04). Se actualiza por SSE.

### Criterios de aceptación
**Escenario 1 - Exitoso**
- **Dado que** la secretaria abre la agenda del día,
- **cuando** observa el calendario,
- **entonces** cada franja muestra su color, su etiqueta ("Disponible", "Pocos cupos", "Agotado" o "Bloqueado") y la ocupación numérica.

**Escenario 2 - Exitoso: bloqueo manual**
- **Dado que** se ausenta un mecánico a las 14:00,
- **cuando** la secretaria bloquea esa franja con motivo "Ausencia de personal",
- **entonces** la franja queda en rojo, no se ofrece a nuevas citas y se listan las citas ya confirmadas en ella.

**Escenario 3 - Fallido: bloqueo sin motivo**
- **Dado que** no se escribe motivo,
- **cuando** se confirma el bloqueo,
- **entonces** el sistema lo rechaza y exige el motivo.

**Escenario 4 - Error: falla al cargar**
- **Dado que** falla la conexión,
- **cuando** se abre la agenda,
- **entonces** se muestra un error claro y se deshabilitan las acciones para no operar sobre datos incompletos.

### Reglas de negocio
RN-02, RN-04, RN-05.

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-23 | RNF-04, 19 | Capacidad de interacción, Adecuación funcional | SE-01 | Por definir (límites 49/50/100 %) | agenda |

### Definition of Ready
- [ ] Reglas de capacidad documentadas (RN-02, RN-05).
- [x] Wireframe y mockup SE-01 listos.

### Definition of Done
- [ ] Semaforización correcta en los límites.
- [ ] Bloqueo persistido y auditado.
- [ ] Code review aprobado en `develop`.

---

## HU-03
**Registrar la llegada de un cliente sin cita** · Secretaria · agenda · Esfuerzo 8 · Prioridad 1 · POC: Carlos · Origen: ajustada

### Historia
**Como** secretaria, **quiero** registrar la llegada de un vehículo sin cita y que el sistema le asigne el siguiente espacio libre sin mover a nadie, **para** atenderlo lo antes posible sin incumplir las citas confirmadas.

### Cambios frente a la versión original
- La clasificación de [[#HU-04]] se ejecuta dentro de este flujo en el POC (tipo de falla obligatorio).
- El cálculo del espacio usa el patrón **Strategy** ([[AR-1-SAD#8.13 Patrones de diseño GoF|patrones GoF]]).
- La vista de recepción se actualiza por SSE (ADR-19).
- El ingreso sin cita **crea directamente la orden** en *Ingresada* (origen sin cita), reutilizando [[#HU-23]].
- La v0.2 ya asignaba "el siguiente cupo libre sin desplazar citas"; esa regla se conserva como estrategia base.

### Descripción
Vista SE-02. La secretaria busca el vehículo (o lo registra con [[#HU-22]]), selecciona el tipo de falla y escribe el motivo. El caso de uso:
1. Bloquea las franjas del día (`FOR UPDATE`).
2. Pide a la estrategia la ubicación: primera franja desde la hora actual con capacidad libre; si no hay, posición en la cola por prioridad y llegada, con hora estimada.
3. Crea la orden y ocupa el cupo.
4. Publica *IngresoRegistrado*.

Las fallas de menos de 15 minutos se pueden intercalar (RN-35).

### Criterios de aceptación
**Escenario 1 - Exitoso: hay capacidad**
- **Dado que** llega un vehículo sin cita a las 09:40 y la franja de las 10:00 tiene cupo,
- **cuando** la secretaria selecciona el tipo de falla y registra el ingreso,
- **entonces** se crea la orden *Ingresada* en la franja de las 10:00, con la prioridad de la falla, y la cola se actualiza sin recargar.

**Escenario 2 - Fallido: agenda llena**
- **Dado que** las franjas restantes están al 100 % por citas,
- **cuando** se registra el ingreso,
- **entonces** queda en la cola con hora estimada y **ninguna** cita se desplaza ni se cancela.

**Escenario 3 - Fallido: desplazar una cita**
- **Dado que** la secretaria intenta forzar el ingreso en una franja ocupada por citas,
- **cuando** confirma,
- **entonces** el sistema lo impide e indica que las citas solo se mueven con una reprogramación ([[#HU-11]]).

**Escenario 4 - Error: falla al calcular**
- **Dado que** ocurre un error interno,
- **cuando** se confirma el registro,
- **entonces** se revierte la transacción y se muestra el error. Un reintento no genera dos órdenes (clave de idempotencia).

### Reglas de negocio
RN-23, 32, 33, 34, 35.

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-24, 25, 33, 40 | RNF-04, 06, 07 | Fiabilidad, Mantenibilidad | SE-02 | CP-18, 19, 34, 43 | agenda (+ órdenes) |

### Definition of Ready
- [ ] Algoritmo de la estrategia con ejemplos (agenda vacía, parcial, al 100 %, fallas leves).
- [ ] Tipos de falla en la semilla.
- [x] Mockup SE-02 aprobado.
- [ ] Contrato del evento SSE de la cola definido.

### Definition of Done
- [ ] Pruebas de borde: agenda al 100 %, último hueco, empate de prioridad (CP-19).
- [ ] Ninguna cita desplazada en ninguna prueba.
- [ ] `ingreso-sin-cita` con cobertura ≥ 80 %.
- [ ] Mínimo 2 commits `HU-03` y PR aprobado.
- [ ] Validado en Docker y en modo mock.

---

## HU-04
**Clasificar el tipo de ingreso no programado** · Secretaria · agenda · Esfuerzo 3 · Prioridad 2 · Fuera del POC (incluida en HU-03) · Origen: original

### Historia
**Como** secretaria, **quiero** clasificar el tipo de falla de un ingreso sin cita, **para** determinar su prioridad y su lugar en la cola.

### Cambios frente a la versión original
- En el POC la selección obligatoria se ejecuta dentro de [[#HU-03]]. Esta HU queda para la **gestión del catálogo de fallas** y el tablero de cola completo.
- El orden de la cola es una estrategia intercambiable (patrón Strategy).

### Descripción
Catálogo de tipos de falla (RF-15) con prioridad y duración. La cola se ordena por prioridad (Alta > Media > Baja) y luego por llegada; las fallas de menos de 15 min se intercalan (RN-35). Las etiquetas son visibles en recepción y en el panel de bahía.

### Criterios de aceptación
**Escenario 1 - Exitoso**
- **Dado que** se registra un ingreso sin cita,
- **cuando** se selecciona *Frenos sin respuesta*,
- **entonces** se asigna prioridad **Alta** y queda antes de los ingresos Media y Baja en espera.

**Escenario 2 - Exitoso: falla leve**
- **Dado que** la falla es *Ajuste de freno o tornillería* (10 min),
- **cuando** existe un hueco de 15 minutos,
- **entonces** el sistema la sugiere para ese hueco.

**Escenario 3 - Fallido: sin tipo de falla**
- **Dado que** no se selecciona un tipo válido,
- **cuando** se guarda,
- **entonces** se rechaza y se exige seleccionarlo.

### Reglas de negocio
RN-34, RN-35.

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-15, 25 | RNF-20, 22 | Adecuación funcional, Mantenibilidad | SE-02 | CP-18, 19 | agenda / catálogo |

### Definition of Ready
- [ ] Catálogo inicial con matriz de prioridad (semilla).

### Definition of Done
- [ ] Etiquetas visibles en recepción y bahía.
- [ ] Validación de campo obligatorio.
- [ ] Revisión de código aprobada.

---

## HU-05
**Actualizar la orden de trabajo y cambiar su estado** · Mecánico · órdenes · Esfuerzo 5 · Prioridad 1 · POC: Joseph · Origen: fusión

### Historia
**Como** mecánico, **quiero** abrir mis órdenes asignadas, registrar el diagnóstico y avanzar el estado con un par de toques desde la bahía, **para** reflejar el avance real y que el taller y el cliente lo vean al instante.

### Cambios frente a la versión original
- **Fusión** de la HU-05 original (abrir y actualizar la orden) con la HU-26 original (cambiar el estado), que describían la misma máquina con nombres distintos (ADR-08).
- Estados unificados de la Orden (ADR-05): *Ingresada → Asignada → En Diagnóstico → Esperando Repuesto (opcional) → En Reparación → Finalizada → Pendiente de Pago → Pagada → Entregada*, más *Cancelada*.
- "Bicicleta" se corrige por "vehículo" (ADR-03).
- Patrón **State** y eventos con **Observer**.
- Se incorpora el escenario de sesión expirada de la HU-26 original.
- Frente a la v0.2: transición inválida responde 409 (no 422) y *Esperando Repuesto* se alcanza también desde *En Diagnóstico* ([[IS-1-SRS-IEEE830#3.7.3 Máquinas de estado|diferencias]]).

### Descripción
Vistas ME-01 (panel de bahía con tarjetas de mis órdenes) y ME-02 (detalle de orden). Endpoints:
- `GET /api/v1/ordenes/mias`;
- `GET /api/v1/ordenes/{id}/transiciones` (transiciones válidas para el usuario);
- `PATCH /api/v1/ordenes/{id}/estado` con `{destino, version}`;
- `PATCH /api/v1/ordenes/{id}/diagnostico`.

El mecánico ejecuta: *Asignada → En Diagnóstico → (Esperando Repuesto ↔ En Reparación) → Finalizada*. Cada transición pasa por el estado actual, valida las guardas (mecánico asignado, RN-30), persiste el historial y publica *EstadoOrdenCambiado* (SSE, auditoría, seguimiento). `version` es control optimista.

### Criterios de aceptación
**Escenario 1 - Exitoso**
- **Dado que** el mecánico tiene una orden *En Diagnóstico* y concluye la revisión,
- **cuando** toca "En reparación" y confirma,
- **entonces** se actualiza el estado con fecha-hora y usuario, y recepción y el seguimiento del cliente se actualizan en ≤ 2 s.

**Escenario 2 - Fallido: transición no permitida**
- **Dado que** se intenta pasar de *Asignada* a *Finalizada* (por ejemplo, por la API),
- **cuando** se confirma,
- **entonces** se responde `409` con "Transición de estado no válida según el flujo de trabajo. Pasos válidos: En diagnóstico".

**Escenario 3 - Fallido: orden de otro mecánico**
- **Dado que** la orden está asignada a otro mecánico,
- **cuando** este intenta cambiarla,
- **entonces** `403` y registro en la bitácora.

**Escenario 4 - Fallido: finalizar con repuestos pendientes**
- **Dado que** hay repuestos *Reservados*,
- **cuando** se intenta *Finalizada*,
- **entonces** se impide e indica qué repuestos instalar o retirar.

**Escenario 5 - Error: sesión expirada al guardar**
- **Dado que** la sesión y el refresh expiraron,
- **cuando** se confirma,
- **entonces** se redirige al login con "Su sesión ha expirado, inicie sesión de nuevo para guardar los cambios" y no se aplica el cambio.

**Escenario 6 - Error: cambio simultáneo**
- **Dado que** la orden fue modificada en otra sesión,
- **cuando** se envía una `version` desactualizada,
- **entonces** `409` "La orden fue modificada por otro usuario, actualice la vista".

### Reglas de negocio
RN-27, 28, 29, 30; RNF-30.

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-35, 36, 40 | RNF-04, 12, 16, 18, 30 | Interacción, Seguridad, Mantenibilidad | ME-01, ME-02 | CP-26, 27, 39, 44 | órdenes |

### Definition of Ready
- [x] Diagrama de estados DE-02 validado ([[IS-1-SRS-IEEE830#3.7.3 Máquinas de estado|SRS 3.7.3]]).
- [ ] Permisos por transición definidos.
- [ ] Mockups ME-01 y ME-02 aprobados en web y móvil; falta la versión tablet.
- [ ] Contrato del evento SSE de cambio de estado.

### Definition of Done
- [ ] Todas las transiciones válidas e inválidas probadas (CP-26, CP-27).
- [ ] Historial con usuario y fecha-hora en la BD.
- [ ] `panel-bahia`, `tarjeta-orden`, `detalle-orden`, `acciones-estado` con cobertura ≥ 80 %.
- [ ] Botones de 56 px verificados en tablet.
- [ ] Mínimo 2 commits `HU-05` en `dev_jhernandez68` y PR aprobado.

---

## HU-06
**Expediente técnico del vehículo** · Mecánico · clientes-vehículos · Esfuerzo 5 · Prioridad 2 · POC: Santiago · Origen: ajustada

### Historia
**Como** mecánico, **quiero** consultar y complementar el expediente técnico de un vehículo eléctrico, **para** diagnosticar con el historial completo de reparaciones y configuraciones de batería y controlador.

### Cambios frente a la versión original
- "Bicimoto" se amplía a los siete tipos de vehículo (ADR-03).
- Búsqueda principal por **número de serie**; también por placa y por documento del propietario.
- Las especificaciones se registran en [[#HU-22]]; aquí se consultan y se agregan **notas técnicas**.
- La secretaria solo lee.
- Frente a la v0.2: se conserva la búsqueda, el saneamiento con `nh3` y el 404 uniforme; desaparece el ámbito de sede.

### Descripción
Vista ME-03. Endpoints:
- `GET /api/v1/vehiculos?q=` (índices sobre serie, placa y documento);
- `GET /api/v1/vehiculos/{id}/expediente`;
- `POST /api/v1/vehiculos/{id}/notas`.

El expediente contiene:
- **Ficha:** tipo, marca, modelo, año, voltaje, capacidad, celda, potencia y controlador.
- **Historial de órdenes:** de la más reciente a la más antigua, con estado, fechas, diagnóstico y repuestos instalados.
- **Notas técnicas.**

El HTML de las notas se sanitiza en el backend con lista blanca (`p`, `strong`, `em`, `ul`, `ol`, `li`, `br`, `code`) mediante `nh3`; Angular vuelve a sanitizar al mostrar.

### Criterios de aceptación
**Escenario 1 - Exitoso**
- **Dado que** el mecánico busca `SC-48-0001`,
- **cuando** accede al expediente,
- **entonces** ve la ficha eléctrica, el historial con repuestos instalados y las notas.

**Escenario 2 - Exitoso: agregar nota**
- **Dado que** está en el expediente,
- **cuando** guarda una observación con negrita y viñetas,
- **entonces** la nota aparece al inicio con su nombre y fecha-hora.

**Escenario 3 - Fallido: vehículo inexistente**
- **Dado que** busca una serie que no existe,
- **cuando** realiza la búsqueda,
- **entonces** ve "Vehículo no encontrado" con la opción de buscar por documento.

**Escenario 4 - Error: contenido malicioso**
- **Dado que** se intenta guardar `<script>` o atributos `onerror`,
- **cuando** se envía,
- **entonces** se guarda sin esos elementos y nunca se ejecuta.

### Reglas de negocio
RN-46 (el cliente usa [[#HU-30]]).

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-09, 10, 11 | RNF-02, 14 | Desempeño, Seguridad | ME-03 | CP-20, 21, 22, 40 | clientes-vehículos |

### Definition of Ready
- [x] Modelo Vehículo 1-N Orden y Vehículo 1-N Nota documentado ([[IS-1-SRS-IEEE830#3.4 Requisitos lógicos de la base de datos|modelo de datos, SRS 3.4]]).
- [ ] Campos eléctricos definidos ([[#HU-22]]).
- [x] Mockup ME-03 aprobado.

### Definition of Done
- [ ] Búsqueda indexada con p95 ≤ 300 ms y < 2 s (`EXPLAIN`).
- [ ] Sanitización verificada con cargas OWASP (CP-20).
- [ ] `buscador-vehiculo`, `expediente-tecnico`, `editor-nota-tecnica` con cobertura ≥ 80 %.
- [ ] Mínimo 2 commits `HU-06` en `dev_sfonseca93` y PR aprobado.

---

## HU-07
**Seguimiento público del estado del servicio** · Cliente · órdenes · Esfuerzo 3 · Prioridad 2 · POC: Santiago · Origen: fusión

### Historia
**Como** cliente, **quiero** consultar en tiempo real el estado de mi vehículo con un código, sin iniciar sesión, **para** saber cuándo recogerlo sin llamar al taller.

### Cambios frente a la versión original
- **Fusión** de la HU-07 original (código o documento) con la HU-28 original (placa) (ADR-08).
- Se consulta con el **código de seguimiento** aleatorio de 10 caracteres (ADR-33). Se descarta la consulta por documento o placa sin segundo factor, porque permitía enumerar vehículos ajenos.
- Se agregan la **línea de tiempo** (módulo 4 de [[informacion general del proyecto]]) y la actualización por SSE.
- Se agregan límite de peticiones y sanitización de la entrada.
- Frente a la v0.2: se retira la vía "documento + dato de verificación", porque el cliente con cuenta ya ve sus órdenes en [[#HU-30]].

### Descripción
Ruta pública `/seguimiento/:codigo` (PU-03). Endpoints públicos:
- `GET /api/v1/seguimiento/{codigo}`;
- `GET /api/v1/seguimiento/{codigo}/eventos` (SSE).

La respuesta es una **proyección con lista blanca** de exactamente cinco campos:

| Campo | Contenido | Ejemplo |
|---|---|---|
| Tipo de vehículo | Enumerado del diccionario | Scooter |
| Modelo | Marca y modelo | Xiaomi 4 Pro |
| Estado | Etiqueta pública agrupada ([[IS-1-SRS-IEEE830#3.7.3 Máquinas de estado|SRS 3.7.3]]) | En reparación |
| Línea de tiempo | Lista de (estado público, fecha-hora con zona) | Recibido, 03/11/2026 8:02 a. m. |
| Fecha estimada de entrega | Fecha-hora o vacía | 03/11/2026 4:00 p. m. |

No incluye nombre, documento, teléfono, mecánico, costos, diagnóstico ni número de serie.

El código se guarda como hash: la consulta calcula el hash del código recibido y busca por él (como ya hacía la v0.2). Se valida con la expresión `^[A-HJ-NP-Z2-9]{10}$` antes de consultar.

Límite: 30 consultas por minuto por IP. Para un código inexistente se responde `404` con cuerpo idéntico en estructura y tiempo similar, para no filtrar la existencia de códigos.

### Criterios de aceptación
**Escenario 1 - Exitoso**
- **Dado que** el cliente ingresa `K7M2QX9P4T` (o abre el QR),
- **cuando** busca,
- **entonces** ve tipo y modelo, estado actual, línea de tiempo con horas y fecha estimada, sin datos sensibles.

**Escenario 2 - Exitoso: en vivo**
- **Dado que** tiene abierta la página,
- **cuando** el mecánico cambia el estado,
- **entonces** la línea de tiempo se actualiza en ≤ 2 s sin recargar.

**Escenario 3 - Fallido: código inexistente o inválido**
- **Dado que** ingresa un código inexistente, o con símbolos o scripts,
- **cuando** busca,
- **entonces** ve "No encontramos información con ese código. Verifique e intente de nuevo." Una entrada con formato inválido no llega a la base de datos.

**Escenario 4 - Fallido: abuso**
- **Dado que** una IP hace más de 30 consultas en un minuto,
- **cuando** llega la 31,
- **entonces** `429` y el mensaje "Demasiadas consultas, espere un momento".

**Escenario 5 - Error: servidor no disponible**
- **Dado que** falla la conexión,
- **cuando** consulta,
- **entonces** ve un mensaje genérico con "Reintentar", que no duplica una petición en curso.

### Reglas de negocio
RN-25.

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-39, 40 | RNF-01, 04, 13, 15 | Seguridad, Capacidad de interacción | PU-03 | CP-23, 24, 25, 36, 44, 49 | órdenes |

### Definition of Ready
- [ ] Lista blanca de campos públicos aprobada.
- [ ] Formato, generación y hash del código definidos (ADR-33).
- [x] Mockup PU-03 (web y móvil) aprobado.

### Definition of Done
- [ ] Prueba de contrato: ningún campo fuera de la lista blanca (CP-24).
- [ ] Límite de peticiones verificado.
- [ ] `seguimiento-publico` y `linea-tiempo` con cobertura ≥ 80 %.
- [ ] Manejo amigable de `404`, `429` y `500`.
- [ ] Mínimo 2 commits `HU-07` y PR aprobado.

---

## HU-08
**Gestionar el inventario con alertas de reabastecimiento** · Administrador · inventario · Esfuerzo 5 · Prioridad 1 · Fuera del POC · Origen: ajustada

### Historia
**Como** administrador, **quiero** ver en tiempo real el stock físico, reservado y disponible de cada repuesto y recibir alertas de reabastecimiento, **para** evitar que las citas se rechacen por falta de piezas.

### Cambios frente a la versión original
- Sin filtro por sede (ADR-02).
- La alerta se calcula sobre el **disponible** (físico - reservado), no sobre el físico (ADR-07): un repuesto puede tener físico suficiente y aun así estar comprometido.

### Descripción
Vista AD-03: SKU, nombre, categoría, físico, reservado, disponible, umbral y estado; filtros por categoría y "solo alertas". El evento *StockBajoUmbral* se publica cuando una reserva, instalación o baja cruza el umbral y actualiza la vista por SSE.

### Criterios de aceptación
**Escenario 1 - Exitoso**
- **Dado que** el disponible de *Batería litio 60V 20Ah* cae a 0 con umbral 1,
- **cuando** el administrador entra a inventario,
- **entonces** el ítem aparece resaltado con alerta (icono, texto y color).

**Escenario 2 - Exitoso: filtro**
- **Dado que** hay 10 repuestos y 2 en alerta,
- **cuando** se activa "Solo alertas",
- **entonces** se muestran solo esos 2.

**Escenario 3 - Error: actualización del umbral fallida**
- **Dado que** falla la actualización del umbral,
- **cuando** se guarda,
- **entonces** no hay cambio parcial y se notifica para reintentar.

### Reglas de negocio
RN-15, RN-21.

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-29, 32 | RNF-04, 07 | Adecuación funcional, Interacción | AD-03 | Por definir | inventario |

### Definition of Ready
- [ ] SKU semilla con umbrales.

### Definition of Done
- [ ] Alertas al cruzar el límite desde reserva, instalación y baja.
- [ ] Acceso restringido por RBAC.
- [ ] Validado por el Product Owner.

---

## HU-09
**Registrar la instalación de repuestos** · Mecánico · órdenes + inventario · Esfuerzo 5 · Prioridad 1 · Fuera del POC · Origen: reescrita

### Historia
**Como** mecánico, **quiero** marcar como instalado cada repuesto reservado en la orden, **para** que el inventario descuente exactamente lo que se usó.

### Cambios frente a la versión original
**Reescrita.** La original descontaba al *Finalizar* y chocaba con la HU-25 original, que descontaba al agregar. Con tres cantidades (ADR-07):
- agregar **reserva** ([[#HU-25]]);
- **instalar descuenta** físico y reservado en la misma cantidad (esta HU).

Así se cumple "descontándolo del inventario al instalarse" de [[informacion general del proyecto]].

### Descripción
En ME-02, cada línea *Reservada* tiene "Marcar instalado". `POST /api/v1/ordenes/{id}/repuestos/{linea_id}/instalar` ejecuta en una transacción:
1. bloqueo `FOR UPDATE` del repuesto;
2. físico - cantidad y reservado - cantidad;
3. reserva a *Consumida*;
4. línea a *Instalado*;
5. movimiento de inventario de consumo;
6. eventos de auditoría y umbral.

Para *Finalizada* no puede quedar ninguna línea *Reservada* (RN-30).

### Criterios de aceptación
**Escenario 1 - Exitoso**
- **Dado que** hay 1 *Batería 60V* reservada,
- **cuando** se marca instalada,
- **entonces** físico 1 → 0, reservado 1 → 0 y la línea queda *Instalado*.

**Escenario 2 - Fallido: finalizar con reservados**
- **Dado que** hay repuestos sin instalar,
- **cuando** se intenta finalizar,
- **entonces** se bloquea el cierre y se listan los pendientes.

**Escenario 3 - Error: falla de base de datos**
- **Dado que** ocurre un error durante el descuento,
- **cuando** se procesa,
- **entonces** físico, reservado y estado de la línea quedan como antes.

### Reglas de negocio
RN-16, 18, 30.

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-38 | RNF-06, 07, 29 | Fiabilidad, Seguridad (integridad) | ME-02 | Por definir (rollback) | órdenes + inventario |

### Definition of Ready
- [ ] Transacción y orden de bloqueo definidos (ADR-18).
- [x] Mockup ME-02 con "Marcar instalado".

### Definition of Done
- [ ] Descuentos comprobados en la BD.
- [ ] Rollback probado con desconexión simulada.
- [ ] Stock nunca negativo (`CHECK` + validación de dominio).

---

## HU-10
**Autorización por rol (RBAC)** · Sistema · identidad · Esfuerzo 5 · Prioridad 1 · Base en HU-21 (Santiago) · Origen: reescrita

### Historia
**Como** responsable del taller, **quiero** que cada usuario acceda únicamente a las operaciones y datos de su rol, **para** proteger la información de clientes y la integridad de las operaciones.

### Cambios frente a la versión original
**Reescrita.** La original combinaba reportes multisede con aislamiento por sede. Con una sede (ADR-02):
- los **reportes** pasan a [[#HU-14]];
- esta HU conserva y amplía el control de acceso: 4 roles (ADR-04), permisos sobre datos propios y registro de intentos no autorizados.

En el POC, las guardias base se entregan con [[#HU-21]] y cada HU aplica sus permisos. Esto también resuelve el conflicto que la v0.2 dejó abierto sobre HU-10.

### Descripción
- **Backend:** dependencia `requiere_rol(*roles)` y verificaciones de propiedad en los casos de uso (orden del mecánico, vehículo del cliente). **Denegar por defecto.**
- **Frontend:** `rol.guard` y ocultamiento de acciones (solo experiencia de usuario).
- Matriz completa en [[IS-1-SRS-IEEE830#3.2.10 Matriz de permisos por rol (RBAC) y estabilidad|SRS 3.2.10]].

### Criterios de aceptación
**Escenario 1 - Exitoso**
- **Dado que** un Administrador inicia sesión,
- **cuando** accede a inventario, usuarios o reportes,
- **entonces** se permite el acceso.

**Escenario 2 - Fallido: datos ajenos**
- **Dado que** un mecánico modifica una orden ajena, o un cliente consulta una cita que no es suya,
- **cuando** envía la petición,
- **entonces** `403` (o `404` para no revelar el recurso de otro cliente) y registro en el log de seguridad.

**Escenario 3 - Fallido: URL directa**
- **Dado que** una Secretaria escribe `/admin/usuarios`,
- **cuando** navega,
- **entonces** la guardia la redirige con "No tiene permisos para esta sección"; la API también rechaza.

### Reglas de negocio
RN-29, 44, 46.

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-05 | RNF-12, 16 | Seguridad | Todas | CP-07, 27 | identidad (transversal) |

### Definition of Ready
- [ ] Matriz de privilegios autorizada.
- [ ] Claims del JWT definidos (`sub`, `rol`, `exp`, `jti`).

### Definition of Done
- [ ] Autorización en el 100 % de las rutas no públicas (CP-07).
- [ ] Sin escalamiento de privilegios en las pruebas de la matriz.

---

## HU-11
**Cancelar o reprogramar una cita** · Cliente · agenda · Esfuerzo 3 · Prioridad 2 · POC: Joseph · Origen: ajustada

### Historia
**Como** cliente, **quiero** cancelar o reprogramar mi cita confirmada, **para** ajustar mi turno ante un imprevisto y liberar el cupo y los repuestos para otra persona.

### Cambios frente a la versión original
- Cancelar **libera las reservas de repuestos** (ADR-07).
- Reprogramar conserva las reservas porque el servicio no cambia (RN-11).
- Ventana mínima de **1 hora** (ADR-22).
- Estados de la Cita (ADR-05): *Confirmada/Reprogramada → Reprogramada* o *→ Cancelada*.
- Frente a la v0.2: ya no se usa token de gestión; el cliente opera con su sesión (ADR-20).

### Descripción
Vistas CL-01 (mis citas y vehículos) y CL-06 (reprogramar). Endpoints:
- `POST /api/v1/agenda/citas/{id}/reprogramar` con `{fecha, hora_inicio}`;
- `POST /api/v1/agenda/citas/{id}/cancelar` con `{motivo?}`.

**Reprogramar**, en una transacción:
1. bloquea franjas nuevas y originales en orden ascendente de id;
2. verifica la capacidad de las nuevas;
3. ocupa las nuevas y libera las originales;
4. pasa la cita a *Reprogramada*.

**Cancelar** libera franjas y reservas y pasa la cita a *Cancelada*.

Ambas verifican que falten 60 minutos o más. La secretaria puede hacerlo en nombre del cliente, sujeta a la ventana salvo permiso de Administrador.

### Criterios de aceptación
**Escenario 1 - Exitoso: reprogramar**
- **Dado que** tiene una cita confirmada para mañana a las 10:00,
- **cuando** elige pasado mañana a las 11:00 con cupo,
- **entonces** la cita queda *Reprogramada*, se libera las 10:00 y se conservan los repuestos.

**Escenario 2 - Exitoso: cancelar**
- **Dado que** faltan más de 60 minutos,
- **cuando** cancela y confirma,
- **entonces** *Cancelada*, franja libre y reservado del repuesto reducido.

**Escenario 3 - Fallido: fuera de la ventana**
- **Dado que** faltan 59 minutos o menos,
- **cuando** intenta cancelar o reprogramar,
- **entonces** "Ya no es posible cancelar: faltan menos de 1 hora para su cita. Llame al taller."

**Escenario 4 - Fallido: la nueva franja se llenó**
- **Dado que** otro cliente tomó el último cupo de la franja elegida,
- **cuando** confirma,
- **entonces** la cita conserva su horario y se sugiere otra franja.

**Escenario 5 - Error: falla durante la confirmación**
- **Dado que** falla algo entre liberar la franja original y ocupar la nueva,
- **cuando** se procesa,
- **entonces** la cita vuelve a su estado original y se pide reintentar.

### Reglas de negocio
RN-10, 11, 19.

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-20, 21, 31 | RNF-06, 07, 20 | Fiabilidad, Interacción | CL-01, CL-06 | CP-31, 32, 33 | agenda (+ inventario) |

### Definition of Ready
- [ ] Ventana de 60 min parametrizada.
- [x] Mockups CL-01 y CL-06 aprobados.
- [ ] Puerto de liberación de reservas acordado con HU-19.

### Definition of Done
- [ ] Atomicidad verificada con fallas inyectadas (CP-33).
- [ ] Límites de 61, 60 y 59 minutos probados (CP-32).
- [ ] `mis-citas-vehiculos` y `reprogramar-cita` con cobertura ≥ 80 %.
- [ ] Mínimo 2 commits `HU-11` y PR aprobado.

---

## HU-12
**Recordatorio automático de la cita** · Cliente · agenda · Esfuerzo 5 · Prioridad 3 · Fuera del POC · Origen: ajustada

### Historia
**Como** cliente, **quiero** recibir un recordatorio 24 horas antes de mi cita, **para** no olvidar mi turno.

### Cambios frente a la versión original
- SendGrid o Twilio **no se integran en esta fase** (ADR-15). Se usa el puerto `Notificador` con un adaptador simulado (log + tabla). Cambiar a un proveedor real es agregar un adaptador (QA-11).
- El recordatorio se escribe en un **outbox** dentro de la transacción y lo despacha el programador de [[#HU-28]] (ADR-36, adoptado de la v0.2).

### Descripción
La tarea `enviar_recordatorios` corre cada 15 minutos. Busca citas *Confirmadas* o *Reprogramadas* que empiecen entre 24 h y 24 h 15 min y sin notificación enviada. Por cada una:
1. crea la notificación *Pendiente* en el outbox;
2. el despachador la envía por el puerto;
3. si falla, reintenta hasta 3 veces con espera exponencial (1, 2 y 4 min);
4. agotados los reintentos, la marca *No entregada*.

### Criterios de aceptación
**Escenario 1 - Exitoso**
- **Dado que** hay una cita para dentro de 24 horas,
- **cuando** corre el proceso,
- **entonces** se envía (o simula) la notificación con fecha, hora y servicio, y queda *Enviada*.

**Escenario 2 - Fallido: contacto inválido**
- **Dado que** el cliente no tiene correo ni teléfono válido,
- **cuando** corre el proceso,
- **entonces** se omite el envío y se registra la incidencia sin bloquear los demás.

**Escenario 3 - Error: el proveedor falla**
- **Dado que** el proveedor no responde,
- **cuando** se intenta el envío,
- **entonces** 3 reintentos y, si sigue fallando, *No entregada* para revisión manual.

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-26 | RNF-08, 26 | Flexibilidad, Fiabilidad | - | Por definir | agenda |

### Definition of Ready
- [ ] Plantilla de mensaje aprobada.
- [ ] Proveedor real o simulado registrado (ADR-15, ADR-36).

### Definition of Done
- [ ] Tarea sin fugas de memoria tras 24 h.
- [ ] Reintentos operativos con un proveedor que falla a propósito.
- [ ] Registros de envío visibles en los logs.

---

## HU-13
**Liquidar, cobrar y entregar la orden** · Secretaria · facturación · Esfuerzo 5 · Prioridad 1 · Fuera del POC · Origen: fusión

### Historia
**Como** secretaria, **quiero** liquidar la orden finalizada, registrar el pago y entregar el vehículo, **para** formalizar el cobro exacto antes de que el cliente se lo lleve.

### Cambios frente a la versión original
- **Fusión** de la HU-13 original (pago) con la HU-27 original (factura): calculaban el mismo total y cambiaban el mismo estado (ADR-08).
- Facturación electrónica fuera de esta fase: **comprobante interno** PDF inmutable (ADR-15).
- Flujo de estados: *Finalizada → Pendiente de Pago → Pagada → Entregada* (ADR-05).

### Descripción
Vista SE-05, en tres pasos:
1. **Liquidar** (`POST /facturacion/ordenes/{id}/liquidar`): mano de obra + repuestos instalados + IVA, con precios congelados (RN-31, RN-36), en enteros COP con redondeo al peso → *Pendiente de Pago*.
2. **Registrar pago** (con clave de idempotencia): monto exacto; emite `CMP-000001` → *Pagada*.
3. **Entregar** (`POST /ordenes/{id}/entregar`) → *Entregada*, con token de encuesta ([[#HU-16]]).

### Criterios de aceptación
**Escenario 1 - Exitoso**
- **Dado que** la orden está *Finalizada* con mano de obra de 45.000 y repuestos por 35.000,
- **cuando** se liquida y se paga 95.200,
- **entonces** subtotal 80.000, IVA 15.200, total 95.200; *Pagada* con comprobante.

**Escenario 2 - Fallido: orden incompleta**
- **Dado que** la orden está *En Reparación*,
- **cuando** se intenta liquidar,
- **entonces** "No se puede facturar una orden de trabajo que no ha sido finalizada por el mecánico".

**Escenario 3 - Fallido: monto distinto**
- **Dado que** el monto no coincide,
- **cuando** se confirma,
- **entonces** se bloquea y se muestra la diferencia.

**Escenario 4 - Fallido: entrega sin pago**
- **Dado que** está *Pendiente de Pago*,
- **cuando** se intenta entregar,
- **entonces** se rechaza.

**Escenario 5 - Error: falla del comprobante**
- **Dado que** falla la generación,
- **cuando** se registra el pago,
- **entonces** queda "pendiente de comprobante" con alerta para reintentar; el reintento no duplica el cobro.

**Escenario 6 - Error: total cero o negativo**
- **Dado que** el total resulta ≤ 0,
- **cuando** se liquida,
- **entonces** se detiene y se pide verificar tarifas y repuestos.

### Reglas de negocio
RN-31, 36, 37, 38, 39, 40.

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-41, 42, 44 | RNF-07, 16, 30 | Adecuación funcional, Seguridad | SE-05 | Por definir (cálculo al 100 %) | facturación |

### Definition of Ready
- [ ] Impuestos aprobados (IVA parametrizable).
- [ ] Plantilla del comprobante.

### Definition of Done
- [ ] Cálculos con cobertura unitaria del 100 %.
- [ ] Comprobante inmutable.
- [ ] Flujo *Finalizada → Entregada* probado de punta a punta.

---

## HU-14
**Reportes operativos y de inventario** · Administrador · reportes · Esfuerzo 5 · Prioridad 2 · Fuera del POC · Origen: fusión

### Historia
**Como** administrador, **quiero** reportes por rango de fechas sobre ingresos, órdenes, tiempos, ocupación, consumo de repuestos y satisfacción, **para** decidir sobre el rendimiento del taller.

### Cambios frente a la versión original
- **Fusión** de la HU-14 original con la parte de reportes de la HU-10 original (ADR-08).
- Sin vista multisede (ADR-02).
- Indicadores alineados a OB-01 a OB-05 ([[IS-1-SRS-IEEE830#1.2 Alcance|SRS 1.2]]).
- Consultas agregadas de solo lectura (ADR-37, adoptado de la v0.2).

### Descripción
Vista AD-01. `GET /api/v1/reportes/resumen?desde=&hasta=` devuelve:
- ingresos;
- órdenes por estado;
- tiempo promedio por estado;
- ocupación de franjas;
- citas *No Asistió* y *Expiradas*;
- top 10 de repuestos;
- horas en *Esperando Repuesto* (OB-02);
- satisfacción promedio.

Las consultas usan índices por fecha y estado, en solo lectura y `READ COMMITTED`.

### Criterios de aceptación
**Escenario 1 - Exitoso**
- **Dado que** el administrador elige un rango,
- **cuando** genera el reporte,
- **entonces** ve los indicadores y gráficos.

**Escenario 2 - Fallido: sin datos**
- **Dado que** no hay órdenes en el rango,
- **cuando** lo genera,
- **entonces** ve un estado vacío informativo.

**Escenario 3 - Error: consulta lenta o fallida**
- **Dado que** la consulta excede el tiempo,
- **cuando** se genera,
- **entonces** indicador de carga y, si falla, opción de reintentar.

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-46 | RNF-01 | Desempeño, Adecuación funcional | AD-01 | Por definir | reportes |

### Definition of Ready
- [ ] Mockups de tableros terminados.
- [ ] Indexación planificada.

### Definition of Done
- [ ] Consultas sin bloquear transacciones.
- [ ] Gráficos con filtros.
- [ ] Code review aprobado.

---

## HU-15
**Gestión de cuentas de usuario** · Administrador · identidad · Esfuerzo 5 · Prioridad 1 · Fuera del POC · Origen: original

### Historia
**Como** administrador, **quiero** crear, editar y desactivar cuentas de usuarios internos, **para** controlar quién accede a cada módulo.

### Cambios frente a la versión original
- El administrador crea **usuarios internos**; los clientes se autorregistran ([[#HU-21]], RN-44).
- Sin sede (ADR-02). Hash Argon2id (ADR-32).
- Desactivar revoca sesiones (RN-45).

### Descripción
Vista AD-05: nombres, correo, rol y contraseña temporal (cambio obligatorio en el primer ingreso). Sin borrado físico: desactivación (ADR-35). Un mecánico desactivado no aparece en la asignación ([[#HU-24]]).

### Criterios de aceptación
**Escenario 1 - Exitoso**
- **Dado que** se registra un usuario con rol válido,
- **cuando** se guarda,
- **entonces** se crea con contraseña en Argon2id y los permisos del rol.

**Escenario 2 - Fallido: datos inválidos**
- **Dado que** el correo existe o falta el rol,
- **cuando** se guarda,
- **entonces** se rechaza y se señala el campo.

**Escenario 3 - Exitoso: desactivación**
- **Dado que** se desactiva un mecánico con historial,
- **cuando** se confirma,
- **entonces** no puede iniciar sesión, sus sesiones se revocan y el historial queda intacto.

**Escenario 4 - Error: falla al escribir**
- **Dado que** falla la BD,
- **cuando** se guarda,
- **entonces** no queda registro parcial y se notifica.

### Reglas de negocio
RN-42, 43, 44, 45.

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-06 | RNF-10, 16 | Seguridad | AD-05 | Por definir | identidad |

### Definition of Ready
- [ ] Políticas de contraseñas definidas.
- [ ] Vistas del administrador elaboradas.

### Definition of Done
- [ ] Sin contraseñas en texto plano.
- [ ] Borrado lógico con integridad referencial.
- [ ] Probado en Docker.

---

## HU-16
**Encuesta de satisfacción** · Cliente · facturación · Esfuerzo 3 · Prioridad 3 · Fuera del POC · Origen: ajustada

### Historia
**Como** cliente, **quiero** calificar el servicio y comentar al recibir mi vehículo, **para** que el taller conozca mi satisfacción.

### Cambios frente a la versión original
- Se habilita en *Entregada* (ADR-05).
- Vive en facturación porque nace con la entrega ([[#HU-13]]); corresponde al módulo 4 de [[informacion general del proyecto]].

### Descripción
Al entregar se genera un token de un solo uso (guardado con hash) y el enlace `/encuesta/{token}`. Puntuación 1 a 5 y comentario opcional de hasta 500 caracteres. `POST /api/v1/encuestas/{token}` es **idempotente** (`UNIQUE` por orden).

### Criterios de aceptación
**Escenario 1 - Exitoso**
- **Dado que** la orden está *Entregada*,
- **cuando** el cliente envía 5 estrellas y un comentario,
- **entonces** se registra y se agradece.

**Escenario 2 - Fallido: token inválido**
- **Dado que** el token no corresponde a una orden *Entregada*,
- **cuando** se envía,
- **entonces** se rechaza.

**Escenario 3 - Error: envío duplicado**
- **Dado que** se envía dos veces,
- **cuando** llega el segundo,
- **entonces** se conserva solo el primero.

### Reglas de negocio
RN-41.

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-45 | RNF-13, 15 | Interacción (compromiso) | CL-09 | Por definir | facturación |

### Definition of Ready
- [ ] Formulario público y flujo del token aprobados.

### Definition of Done
- [ ] Idempotencia comprobada.
- [ ] Restricción de estado validada.
- [ ] Datos visibles en reportes ([[#HU-14]]).

---

## HU-17
**Imprimir ticket de la orden** · Secretaria · facturación · Esfuerzo 2 · Prioridad 3 · Fuera del POC · Origen: ajustada

### Historia
**Como** secretaria, **quiero** imprimir un ticket con los datos de la orden, **para** entregar al cliente un comprobante con su código de seguimiento.

### Cambios frente a la versión original
- Sin ESC/POS en esta fase (ADR-15): **PDF de 80 mm** imprimible desde el navegador en cualquier impresora.
- El QR lleva al seguimiento con el **código de seguimiento** ([[#HU-07]], ADR-33), no con el número de orden.

### Descripción
`GET /api/v1/ordenes/{id}/ticket.pdf`, con WeasyPrint y una plantilla de 80 mm. Contenido:
- nombre del taller;
- número de orden y código de seguimiento en tipografía monoespaciada;
- fecha de ingreso;
- tipo, marca y modelo del vehículo, y últimos 4 caracteres de la serie;
- motivo de ingreso;
- QR a `/seguimiento/{codigo}`.

Generar el ticket no modifica la orden.

### Criterios de aceptación
**Escenario 1 - Exitoso**
- **Dado que** se creó la orden,
- **cuando** se elige "Imprimir ticket",
- **entonces** se abre el PDF listo para imprimir.

**Escenario 2 - Fallido: sin impresora**
- **Dado que** no hay impresora,
- **cuando** se intenta imprimir,
- **entonces** el PDF se puede descargar.

**Escenario 3 - Error: falla a mitad**
- **Dado que** falla la impresión,
- **cuando** se reintenta,
- **entonces** solo se regenera el ticket; la orden no se duplica.

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-43 | RNF-15 | Flexibilidad | SE-04, SE-05 | Por definir | facturación |

### Definition of Ready
- [ ] Plantilla de 80 mm diseñada.
- [ ] Librería de PDF seleccionada.

### Definition of Done
- [ ] PDF verificado sin afectar el backend.
- [ ] QR legible desde celular.

---

## HU-18
**Administrar el catálogo de servicios** · Administrador · catálogo · Esfuerzo 3 · Prioridad 2 · Fuera del POC · Origen: original

### Historia
**Como** administrador, **quiero** administrar el catálogo de servicios con precio y duración, **para** tener tarifas e información consistentes en la agenda y la liquidación.

### Cambios frente a la versión original
- La **duración** determina cuántas franjas ocupa la cita (RN-03).
- Los repuestos requeridos se gestionan en [[#HU-26]].
- En el POC los servicios son semilla.

### Descripción
Vista AD-04: CRUD con código único, nombre, descripción, mano de obra (> 0, entero COP) y duración (> 0 min). Desactivar marca "inactivo para nuevas citas" sin afectar citas ni órdenes. El precio aplicado se guarda en la orden (RN-31).

### Criterios de aceptación
**Escenario 1 - Exitoso**
- **Dado que** se ingresan nombre, precio y duración válidos,
- **cuando** se guarda,
- **entonces** el servicio queda disponible para agendar.

**Escenario 2 - Fallido: datos inválidos**
- **Dado que** el precio es negativo o la duración cero,
- **cuando** se guarda,
- **entonces** se rechaza y se señala el campo.

**Escenario 3 - Exitoso: desactivación con referencias**
- **Dado que** el servicio está en citas u órdenes activas,
- **cuando** se desactiva,
- **entonces** queda inactivo para nuevas citas sin afectar las existentes.

### Reglas de negocio
RN-03, RN-31.

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-13 | RNF-20 | Adecuación funcional | AD-04 | Por definir | catálogo |

### Definition of Ready
- [ ] Validaciones aclaradas.
- [ ] Borrado lógico aprobado (ADR-35).

### Definition of Done
- [ ] CRUD completo.
- [ ] Facturación histórica intacta.
- [ ] Validaciones en frontend y backend.

---

## HU-19
**Reserva automática de repuestos al agendar** · Sistema / Cliente · inventario + agenda · Esfuerzo 8 · Prioridad 1 · POC: Joseph · Origen: nueva

### Historia
**Como** cliente, **quiero** que al agendar el sistema aparte automáticamente los repuestos de mi servicio, **para** tener la garantía de que el taller podrá atenderme sin dejar mi vehículo detenido.

### Cambios frente a la versión original
**HU nueva.** Cubre el núcleo diferenciador de [[informacion general del proyecto]] ("verificación automática del inventario local y bloqueo temporal de los repuestos necesarios"), que ninguna HU original ni la v0.2 cubrían (ADR-06). Ocupa el ID de la HU-19 original (traslado entre sedes), eliminada por ADR-02.

### Descripción
Se ejecuta **en la misma transacción** que el inicio del agendamiento de [[#HU-01]]:
1. Obtiene los repuestos requeridos del servicio ([[#HU-26]]).
2. Bloquea esos repuestos con `SELECT ... FOR UPDATE`, ordenados por id.
3. Verifica para cada uno que físico - reservado ≥ cantidad.
4. Si todos cumplen: incrementa el reservado y crea reservas *Activas* ligadas a la cita, con vencimiento igual al bloqueo.
5. Si alguno falla: aborta todo (ni cita ni franjas) y responde `409` con los SKU faltantes.
6. Al confirmar, la reserva queda firme: vence a la hora de la cita más la tolerancia (RN-12).
7. Si el repuesto es eléctrico (batería, controlador, cargador) y su voltaje difiere del nominal del vehículo, exige confirmación con motivo (RNF-29).

El paso 3 del asistente (CL-04) muestra el repuesto que se apartará y el paso 4 (CL-05) los repuestos apartados con el contador.

### Criterios de aceptación
**Escenario 1 - Exitoso**
- **Dado que** *Cambio de batería 48V* requiere 1 *Batería 48V 15Ah* y el disponible es 2,
- **cuando** el cliente inicia el agendamiento con cupo,
- **entonces** reservado 1 → 2, disponible 2 → 1, y el resumen muestra "Batería litio 48V 15Ah x1 - apartada".

**Escenario 2 - Fallido: sin disponible**
- **Dado que** *Cambio de batería 60V* requiere una batería con disponible 0,
- **cuando** se intenta agendar,
- **entonces** no se crea la cita y se muestra "No tenemos Batería litio 60V 20Ah disponible para este servicio en este momento". La ocupación no cambia.

**Escenario 3 - Fallido: competencia por la última unidad**
- **Dado que** queda 1 unidad y dos clientes agendan el mismo servicio en franjas distintas a la vez,
- **cuando** se procesan,
- **entonces** solo uno obtiene la reserva; el reservado nunca supera el físico.

**Escenario 4 - Exitoso: servicio sin repuestos**
- **Dado que** *Diagnóstico general* no requiere repuestos,
- **cuando** se agenda,
- **entonces** se crea sin reservas, validando solo el cupo.

**Escenario 5 - Error: falla durante la reserva**
- **Dado que** falla la BD tras reservar el primero de dos repuestos,
- **cuando** se procesa,
- **entonces** se revierte todo.

### Reglas de negocio
RN-08, 15, 16, 17.

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-29, 30 | RNF-03, 06, 07, 29 | Fiabilidad, Seguridad, Protección | CL-04, CL-05 | CP-15, 16, 41, 42, 43, 50 | inventario (+ agenda) |

### Definition of Ready
- [ ] [[#HU-26]] disponible o en semilla.
- [ ] Puerto público de reserva definido entre agenda e inventario ([[AR-3-POC#1. Plan de implementación|contratos del POC]]).
- [ ] Transacciones y orden de bloqueo documentados (ADR-18).

### Definition of Done
- [ ] Invariantes verificadas tras 1000 operaciones concurrentes (CP-42).
- [ ] Rollback con falla inyectada (CP-43).
- [ ] `resumen-reserva` con cobertura ≥ 80 %.
- [ ] Mínimo 2 commits `HU-19` y PR aprobado.

---

## HU-20
**Bitácora de auditoría de una orden** · Administrador · auditoría · Esfuerzo 5 · Prioridad 2 · Parcial en el POC (historial de HU-05) · Origen: original

### Historia
**Como** administrador, **quiero** ver la bitácora completa de una orden, **para** auditar quién cambió qué y cuándo.

### Cambios frente a la versión original
- Mecanismo: suscriptor del bus de eventos (**Observer**) que escribe en la tabla de auditoría. Event Sourcing descartado por complejidad (ADR-34).
- Inmutabilidad en dos capas: el usuario de BD solo tiene `INSERT, SELECT` sobre la auditoría, y *triggers* rechazan `UPDATE` y `DELETE`. La v0.2 ya verificó estos *triggers* en MySQL.
- En el POC el historial de estados se persiste con [[#HU-05]]; la vista AD-06 queda para después.

### Descripción
Cada registro guarda entidad, id, acción, usuario, fecha-hora, valor anterior y nuevo (JSON) y `correlation_id`. Se auditan (RN-49):
- creación de la orden;
- cambios de estado;
- asignación y reasignación;
- repuestos agregados, retirados e instalados;
- liquidación, pago y entrega;
- intentos no autorizados.

### Criterios de aceptación
**Escenario 1 - Exitoso**
- **Dado que** un usuario modifica estado o repuestos,
- **cuando** se guarda,
- **entonces** se registra usuario, fecha-hora, valor anterior y nuevo.

**Escenario 2 - Exitoso: sin cambios**
- **Dado que** la orden no cambió tras crearse,
- **cuando** se consulta,
- **entonces** solo aparece el evento de creación.

**Escenario 3 - Fallido: intento de alterar**
- **Dado que** alguien intenta modificar o borrar un registro,
- **cuando** ejecuta la operación,
- **entonces** se rechaza.

### Reglas de negocio
RN-48, RN-49.

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-47 | RNF-16 | Seguridad (no repudio, responsabilidad) | AD-06 | CP-27 (parcial) | auditoría |

### Definition of Ready
- [ ] Tabla y lista de eventos definidas.

### Definition of Done
- [ ] Registros automáticos ante cada evento.
- [ ] Alteraciones rechazadas.
- [ ] Trazabilidad validada por QA.

---

## HU-21
**Registro e inicio de sesión** · Usuario · identidad · Esfuerzo 5 · Prioridad 1 · POC: Santiago · Origen: ampliada

### Historia
**Como** usuario (Cliente, Secretaria, Mecánico o Administrador), **quiero** iniciar sesión con correo y contraseña (y registrarme si soy cliente), **para** acceder de forma segura a las funciones de mi rol.

### Cambios frente a la versión original
- **Autorregistro de clientes** (ADR-20) y vinculación con un cliente creado por recepción (RN-47).
- Sesión completa: acceso de 15 min en memoria y refresh de 8 h en cookie `HttpOnly` con rotación y detección de reutilización (ADR-23). Por eso el esfuerzo sube de 3 a 5.
- Límite de intentos (RNF-13) y Argon2id (ADR-32).
- Entrega las guardias base del POC; la matriz completa está en [[#HU-10]].
- Frente a la v0.2: la v0.2 solo autenticaba al personal; el cliente era anónimo.

### Descripción
Vistas PU-01 y PU-02.

| Ruta | Uso |
|---|---|
| `POST /api/v1/auth/registro` | Solo crea clientes |
| `POST /api/v1/auth/login` | Acceso en el cuerpo; refresh en cookie `HttpOnly`, `Secure`, `SameSite=Strict` |
| `POST /api/v1/auth/refrescar` | Rota el refresh |
| `POST /api/v1/auth/salir` | Revoca el refresh |
| `GET /api/v1/auth/yo` | Usuario autenticado |

Los refresh se guardan con hash e identificador de familia; si llega uno ya rotado, se revoca toda la familia. En local sobre HTTP la cookie no lleva `Secure` (`COOKIE_SECURE=false`, [[AR-1-SAD#8. Conceptos transversales|SAD 8]]).

### Criterios de aceptación
**Escenario 1 - Exitoso**
- **Dado que** el usuario ingresa credenciales válidas,
- **cuando** presiona "Iniciar sesión",
- **entonces** se autentica y se redirige a la pantalla de su rol.

**Escenario 2 - Exitoso: autorregistro**
- **Dado que** una persona completa el registro con una contraseña válida,
- **cuando** presiona "Crear cuenta",
- **entonces** se crea la cuenta Cliente (vinculada si el documento ya existía) y se inicia sesión.

**Escenario 3 - Fallido: credenciales o usuario inactivo**
- **Dado que** la contraseña es incorrecta o la cuenta está desactivada,
- **cuando** intenta entrar,
- **entonces** "Credenciales inválidas, por favor intente de nuevo" (mismo mensaje en ambos casos, para no revelar cuentas).

**Escenario 4 - Fallido: fuerza bruta**
- **Dado que** hubo 5 intentos fallidos en 15 minutos,
- **cuando** se intenta el sexto,
- **entonces** `429` "Demasiados intentos. Intente de nuevo en 15 minutos".

**Escenario 5 - Error: falla del servidor**
- **Dado que** la BD no responde,
- **cuando** intenta entrar,
- **entonces** "Servicio no disponible momentáneamente, intente más tarde" sin congelar la interfaz.

**Escenario 6 - Exitoso: renovación transparente**
- **Dado que** el acceso expiró y el refresh está vigente,
- **cuando** realiza una acción,
- **entonces** la sesión se renueva en segundo plano y la acción se completa.

### Reglas de negocio
RN-42, 43, 44, 45, 47.

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-01 a RF-05 (base) | RNF-10, 11, 12, 13 | Seguridad | PU-01, PU-02 | CP-01 a CP-07 | identidad |

### Definition of Ready
- [x] Mockups PU-01 y PU-02 aprobados.
- [ ] Política de contraseñas y tokens definidos (ADR-23, ADR-32).
- [ ] Usuarios de prueba por rol en la semilla.

### Definition of Done
- [ ] Redirección verificada para los 4 roles (CP-03).
- [ ] Rotación y reutilización probadas (CP-05, CP-06).
- [ ] 0 rutas sin guardia (CP-07).
- [ ] Cobertura ≥ 80 % en `iniciar-sesion`, `crear-cuenta`, sesión, interceptor y guardia.
- [ ] Mínimo 2 commits `HU-21` y PR aprobado por un par.

---

## HU-22
**Registrar clientes y vehículos eléctricos** · Secretaria · clientes-vehículos · Esfuerzo 2 · Prioridad 1 · POC: Carlos · Origen: ajustada

### Historia
**Como** secretaria, **quiero** registrar un cliente nuevo y su vehículo eléctrico, **para** vincularlos al taller y abrir órdenes y citas a su nombre.

### Cambios frente a la versión original
- "Carro", "automóvil" y "placa" se reemplazan por el dominio de vehículos eléctricos (ADR-03).
- Identificador obligatorio: **número de serie**; placa opcional y única.
- Especificaciones eléctricas para el expediente ([[#HU-06]]) y la advertencia de voltaje (RNF-29).
- Cliente **sin cuenta** posible; si luego se autorregistra con el mismo documento, se vincula (RN-47).
- El cliente autenticado registra sus vehículos con el mismo formulario.

### Descripción
Vista SE-03 (y CL-07 cuando el cliente registra su propio vehículo), dos secciones:
- **Cliente:** tipo y número de documento, nombres, teléfono, correo.
- **Vehículo:** tipo (bicicleta eléctrica, scooter, patineta, moto, monorueda, microcoche, cuadriciclo), serie (obligatoria), placa (opcional), marca, modelo, año, voltaje nominal, capacidad, celda, potencia y controlador.

Si el documento existe, se carga el cliente y solo se agrega el vehículo. Validaciones:
- CC numérica de 6 a 10 dígitos; CE alfanumérica de 6 a 12.
- Serie alfanumérica con guiones de 5 a 30.
- Placa `AAA00A` (moto) o `AAA000`, en mayúsculas.

### Criterios de aceptación
**Escenario 1 - Exitoso**
- **Dado que** se ingresan cliente y vehículo con serie nueva,
- **cuando** se guarda,
- **entonces** "Cliente y vehículo registrados correctamente".

**Escenario 2 - Fallido: serie o placa duplicada**
- **Dado que** la serie o placa ya existe,
- **cuando** se guarda,
- **entonces** se bloquea, se resalta el campo y se muestra "El número de serie ingresado ya se encuentra registrado" (o "La placa ingresada ya se encuentra registrada").

**Escenario 3 - Error: formato inválido o vacío**
- **Dado que** falta el teléfono o hay letras en una CC,
- **cuando** se guarda,
- **entonces** se detiene el envío, se marcan los campos (con texto, no solo color) y se muestra "Por favor complete todos los campos obligatorios con un formato válido".

**Escenario 4 - Exitoso: sin placa**
- **Dado que** el tipo es patineta, monorueda o bicicleta eléctrica,
- **cuando** se guarda sin placa,
- **entonces** se acepta.

### Reglas de negocio
RN-47 y unicidad de serie, placa y documento.

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-07, 08 | RNF-14, 19, 20 | Interacción, Adecuación funcional | SE-03, CL-07 | CP-08, 09, 10 | clientes-vehículos |

### Definition of Ready
- [ ] Campos obligatorios y expresiones regulares definidos.
- [ ] Catálogo de tipos de vehículo aprobado.
- [x] Mockups SE-03 y CL-07 validados.

### Definition of Done
- [ ] Validaciones en frontend y backend probadas.
- [ ] `UNIQUE` sobre serie y placa (anulable) en MySQL.
- [ ] Pruebas de duplicado y campos vacíos.
- [ ] Endpoint en OpenAPI y Postman.
- [ ] Mínimo 2 commits `HU-22` y PR aprobado.

---

## HU-23
**Crear orden de trabajo** · Secretaria · órdenes · Esfuerzo 3 · Prioridad 1 · POC: Joseph · Origen: ajustada

### Historia
**Como** secretaria, **quiero** crear la orden cuando el vehículo llega, **para** formalizar su ingreso y habilitar la asignación y el diagnóstico.

### Cambios frente a la versión original
- La orden nace desde una **cita** (la cita pasa a *Atendida* y sus reservas pasan a la orden) o **sin cita** (vía [[#HU-03]]) (ADR-05).
- Placa → número de serie (ADR-03); kilometraje opcional.
- Además del número correlativo, se genera un **código de seguimiento** para [[#HU-07]] (ADR-33).
- La impresión queda en [[#HU-17]]; en el POC se muestra el código para copiar.

### Descripción
Vista SE-04. La secretaria busca la cita del día (por código o serie) o el vehículo, completa motivo, fallas y kilometraje, y genera la orden. El caso de uso:
1. Verifica que no haya otra orden activa (RN-23).
2. Obtiene el siguiente número con la secuencia bloqueada `FOR UPDATE`.
3. Genera el código de 10 caracteres con un generador criptográfico y alfabeto sin ambiguos; guarda su hash y entrega el código en claro una sola vez, para el ticket y el QR (práctica de la v0.2).
4. Crea la orden en *Ingresada*.
5. Si viene de una cita, la cita pasa a *Atendida* (mediante el evento *OrdenCreada*, sin dependencia directa de módulos) y las reservas pasan a la orden.
6. Publica *OrdenCreada*.

Todo en una transacción.

### Criterios de aceptación
**Escenario 1 - Exitoso desde una cita**
- **Dado que** llega el cliente con la cita `CITA-...-0003`,
- **cuando** la secretaria genera la orden,
- **entonces** se crea con el siguiente número y un código de seguimiento, en *Ingresada*; la cita queda *Atendida* y la reserva pasa a la orden.

**Escenario 2 - Fallido: orden abierta**
- **Dado que** el vehículo ya tiene una orden activa,
- **cuando** se intenta otra,
- **entonces** "El vehículo ya tiene una orden activa (N° OT-000001) en proceso".

**Escenario 3 - Fallido: cita no vigente**
- **Dado que** la cita está *Cancelada*, *Expirada* o *No Asistió*,
- **cuando** se intenta crear la orden,
- **entonces** se rechaza y se ofrece crearla sin cita ([[#HU-03]]).

**Escenario 4 - Error: falla en la secuencia**
- **Dado que** falla la transacción del correlativo,
- **cuando** se genera la orden,
- **entonces** rollback y "Error al generar la orden de trabajo, vuelva a intentarlo"; ni número consumido ni cita *Atendida*.

### Reglas de negocio
RN-23, 24, 25, 26.

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-33 | RNF-06, 07, 15 | Fiabilidad, Adecuación funcional | SE-04 | CP-28, 34, 35, 43 | órdenes |

### Definition of Ready
- [x] Modelo de orden, secuencia y código definidos ([[IS-1-SRS-IEEE830#3.4 Requisitos lógicos de la base de datos|modelo de datos, SRS 3.4]]).
- [ ] Estados iniciales definidos.
- [x] Mockup SE-04 aprobado.

### Definition of Done
- [ ] Correlativo sin duplicados en 20 creaciones concurrentes (CP-35).
- [ ] Transferencia de reservas cita → orden verificada.
- [ ] `crear-orden` con cobertura ≥ 80 %.
- [ ] Mínimo 2 commits `HU-23` y PR aprobado.

---

## HU-24
**Asignar un mecánico a la orden** · Administrador · órdenes · Esfuerzo 4 · Prioridad 1 · Fuera del POC (semilla) · Origen: ajustada

### Historia
**Como** administrador, **quiero** asignar un mecánico activo a una orden, **para** delegar la reparación y que aparezca en su panel.

### Cambios frente a la versión original
- Estados unificados: *Ingresada → Asignada* (ADR-05).
- Reasignación permitida en *Asignada*, *En Diagnóstico*, *Esperando Repuesto* y *En Reparación*, sin cambiar el estado, y auditada.
- Conflictos por cambio simultáneo con `version` (control optimista).

### Descripción
Vista AD-02: órdenes *Ingresadas* por prioridad y llegada, con selector de mecánicos activos y su carga actual. `PATCH /api/v1/ordenes/{id}/asignacion` con `{mecanico_id, version}`. Publica *OrdenAsignada* (SSE al panel del mecánico).

### Criterios de aceptación
**Escenario 1 - Exitoso**
- **Dado que** la orden está *Ingresada* y se elige un mecánico activo,
- **cuando** se confirma,
- **entonces** pasa a *Asignada* y aparece en el panel del mecánico.

**Escenario 2 - Fallido: mecánico inactivo**
- **Dado que** el mecánico está inactivo,
- **cuando** se confirma,
- **entonces** "El mecánico seleccionado no se encuentra activo o disponible".

**Escenario 3 - Error: cambio simultáneo**
- **Dado que** la orden fue cancelada en otra sesión,
- **cuando** se guarda con versión anterior,
- **entonces** "La orden ha sido modificada por otro usuario, por favor actualice la página".

### Reglas de negocio
RN-29.

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-34 | RNF-04, 16 | Adecuación funcional, Seguridad | AD-02 | Por definir | órdenes |

### Definition of Ready
- [ ] Mecánicos activos disponibles.
- [ ] Contrato de API definido.

### Definition of Done
- [ ] Regla *Ingresada → Asignada* protegida en el backend.
- [ ] Panel del mecánico actualizado por SSE.
- [ ] Asignación y reasignación probadas.

---

## HU-25
**Agregar repuestos a la orden** · Mecánico · órdenes + inventario · Esfuerzo 5 · Prioridad 1 · Fuera del POC · Origen: reescrita

### Historia
**Como** mecánico, **quiero** agregar a la orden los repuestos adicionales del diagnóstico, **para** apartarlos del inventario y sumarlos al costo.

### Cambios frente a la versión original
**Reescrita.** Agregar ya **no descuenta** el físico: **reserva** (ADR-07); el descuento ocurre al instalar ([[#HU-09]]). Se eliminan lubricantes y aceites (ADR-03).

### Descripción
En ME-02, buscador por SKU o nombre con el disponible. `POST /api/v1/ordenes/{id}/repuestos` con `{repuesto_id, cantidad}`:
1. bloquea el repuesto;
2. verifica el disponible;
3. incrementa el reservado y crea la reserva ligada a la orden;
4. agrega la línea con precio congelado (RN-31) y recalcula el subtotal.

Retirar una línea *Reservada* libera la reserva. Sin disponible, el mecánico puede pasar a *Esperando Repuesto*. Aplica la advertencia de voltaje (RNF-29).

### Criterios de aceptación
**Escenario 1 - Exitoso**
- **Dado que** la orden está *En Diagnóstico* o *En Reparación* y hay disponible,
- **cuando** se agrega 1 unidad,
- **entonces** aumenta el reservado, aparece la línea y se recalcula el subtotal.

**Escenario 2 - Fallido: stock insuficiente**
- **Dado que** hay 2 disponibles,
- **cuando** se intentan agregar 4,
- **entonces** "Cantidad solicitada supera el stock disponible (Disponible: 2)" y la orden no cambia.

**Escenario 3 - Fallido: voltaje incompatible**
- **Dado que** el vehículo es de 72 V y la batería de 60 V,
- **cuando** se agrega,
- **entonces** advertencia de riesgo eléctrico que exige motivo.

**Escenario 4 - Error: precio corrupto**
- **Dado que** el precio del catálogo es nulo o corrupto,
- **cuando** se agrega,
- **entonces** "No se pudo agregar el repuesto por un error en el precio del catálogo, contacte al Administrador".

### Reglas de negocio
RN-16, 17, 31.

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-37 | RNF-06, 29 | Fiabilidad, Protección | ME-02 | CP-50 | órdenes + inventario |

### Definition of Ready
- [ ] Inventario con precios y existencias.
- [ ] Componente de búsqueda diseñado.

### Definition of Done
- [ ] Reserva atómica verificada.
- [ ] Total en enteros COP sin errores de redondeo.
- [ ] Agregar, retirar y stock agotado aprobados.

---

## HU-26
**Definir repuestos requeridos por servicio** · Administrador · catálogo · Esfuerzo 3 · Prioridad 1 · POC: Carlos · Origen: nueva

### Historia
**Como** administrador, **quiero** definir qué repuestos y en qué cantidades requiere cada servicio, **para** que el sistema sepa qué reservar al agendar.

### Cambios frente a la versión original
**HU nueva** (ADR-06). Ocupa el ID de la HU-26 original (cambiar estado), fusionada en [[#HU-05]]. Es el prerrequisito de datos de [[#HU-19]].

### Descripción
Vista AD-04. Desde la ficha del servicio, tabla de repuestos requeridos (SKU, nombre, cantidad, disponible) con acciones: agregar (buscador por SKU o nombre), cambiar cantidad y quitar. Persistencia en la relación servicio-repuesto con clave compuesta. **Los cambios aplican solo a citas futuras**; las reservas existentes no cambian.

### Criterios de aceptación
**Escenario 1 - Exitoso**
- **Dado que** se abre *Cambio de batería 48V*,
- **cuando** se agrega *Tarjeta BMS 13S 48V* ×1 y se guarda,
- **entonces** la lista muestra ambos y la siguiente cita reserva batería y BMS.

**Escenario 2 - Fallido: datos inválidos**
- **Dado que** la cantidad es ≤ 0, el repuesto está inactivo o ya está en la lista,
- **cuando** se guarda,
- **entonces** se rechaza con el motivo en el campo.

**Escenario 3 - Fallido: citas activas**
- **Dado que** hay citas confirmadas del servicio,
- **cuando** se cambia la lista,
- **entonces** se guarda con la advertencia "Las N citas ya confirmadas conservan los repuestos reservados originalmente".

**Escenario 4 - Error: falla al guardar**
- **Dado que** falla la BD con varios cambios,
- **cuando** se confirma,
- **entonces** no hay cambios parciales y se pide reintentar.

### Reglas de negocio
RN-08, 17, 22.

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-14 | RNF-07, 20 | Adecuación funcional, Fiabilidad | AD-04 | CP-11, 12 | catálogo |

### Definition of Ready
- [ ] Servicios y repuestos semilla.
- [x] Mockup AD-04 aprobado.
- [ ] Puerto de repuestos requeridos acordado con [[#HU-19]].

### Definition of Done
- [ ] Endpoints `GET/PUT /api/v1/catalogo/servicios/{id}/repuestos` documentados.
- [ ] Integración: el cambio se refleja en la siguiente reserva.
- [ ] `catalogo-repuestos-servicio` con cobertura ≥ 80 %.
- [ ] Mínimo 2 commits `HU-26` y PR aprobado.

---

## HU-27
**Registrar entradas y bajas de inventario** · Administrador · inventario · Esfuerzo 3 · Prioridad 2 · Fuera del POC · Origen: nueva

### Historia
**Como** administrador, **quiero** registrar entradas de mercancía y bajas por daño, pérdida o garantía, **para** que el físico del sistema coincida con la bodega.

### Cambios frente a la versión original
**HU nueva.** Cubre el punto 2 del módulo de inventario de [[informacion general del proyecto]], que nada cubría. Ocupa el ID de la HU-27 original (factura), fusionada en [[#HU-13]].

### Descripción
AD-03, "Registrar movimiento". `POST /api/v1/inventario/movimientos` con `{repuesto_id, tipo: ENTRADA | BAJA | AJUSTE, cantidad, motivo}`:
- **Entrada:** suma al físico.
- **Baja:** resta del físico con motivo (daño, pérdida, garantía, otro); no puede dejar el físico bajo el reservado (RN-20).
- **Ajuste:** solo para conteos físicos, con motivo.

Cada movimiento queda registrado y auditado. Una entrada que supera el umbral apaga la alerta de [[#HU-08]].

### Criterios de aceptación
**Escenario 1 - Exitoso: entrada**
- **Dado que** llegan 5 cargadores de 48V,
- **cuando** se registra la entrada,
- **entonces** físico 0 → 5 y desaparece la alerta.

**Escenario 2 - Fallido: baja que compromete reservas**
- **Dado que** hay 3 físicas y 2 reservadas,
- **cuando** se intenta dar de baja 2,
- **entonces** "La baja dejaría el stock físico (1) por debajo de lo reservado (2). Libere reservas primero."

**Escenario 3 - Fallido: datos inválidos**
- **Dado que** la cantidad es 0 o falta el motivo de una baja,
- **cuando** se guarda,
- **entonces** se señala el campo.

**Escenario 4 - Error: falla al guardar**
- **Dado que** falla la BD,
- **cuando** se registra,
- **entonces** ni stock ni historial cambian.

### Reglas de negocio
RN-16, 20, 21.

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-28 | RNF-06, 16 | Fiabilidad, Seguridad | AD-03 | Por definir | inventario |

### Definition of Ready
- [ ] Motivos de baja aprobados.

### Definition of Done
- [ ] Invariantes respetadas en todas las combinaciones.
- [ ] Movimientos auditados.

---

## HU-28
**Liberar reservas vencidas e inasistencias** · Sistema · agenda + inventario · Esfuerzo 5 · Prioridad 1 · POC: Santiago · Origen: nueva

### Historia
**Como** taller, **quiero** que el sistema libere automáticamente los cupos y repuestos de los agendamientos abandonados y de las citas a las que el cliente no llegó, **para** devolver esa capacidad e inventario sin intervención manual.

### Cambios frente a la versión original
**HU nueva** (ADR-06, ADR-22). Ocupa el ID de la HU-28 original (consulta por placa), fusionada en [[#HU-07]]. Implementa las tareas de fondo de la concurrencia híbrida (ADR-18). La v0.2 solo liberaba retenciones vencidas al consultar; no marcaba inasistencias.

### Descripción
Dos tareas del programador interno (APScheduler, cada 60 s, una instancia a la vez, ejecuciones acumuladas fusionadas):
1. **Expirar bloqueos:** citas *En Proceso* vencidas, con `FOR UPDATE SKIP LOCKED` en lotes de 100. Por cada una, en su transacción: *Expirada*, libera franjas y reservas.
2. **Marcar inasistencias:** citas *Confirmadas* o *Reprogramadas* con hora + 15 min < ahora y sin orden: *No Asistió*, libera reservas y franjas.

Ambas son **idempotentes** (filtran por estado) y se ejecutan una vez al arrancar (RNF-08). Solo una instancia ejecuta el programador (`SCHEDULER_ENABLED=true`). Cada liberación publica eventos para auditoría y SSE de recepción.

### Criterios de aceptación
**Escenario 1 - Exitoso: bloqueo vencido**
- **Dado que** un cliente no confirmó en 5 minutos,
- **cuando** corre la tarea,
- **entonces** *Expirada*, la franja recupera el cupo y el reservado baja.

**Escenario 2 - Exitoso: inasistencia**
- **Dado que** una cita de las 09:00 no tiene orden a las 09:16,
- **cuando** corre la tarea,
- **entonces** *No Asistió* y repuestos liberados.

**Escenario 3 - Fallido: dentro de la tolerancia**
- **Dado que** son las 09:14,
- **cuando** corre la tarea,
- **entonces** la cita de las 09:00 no cambia.

**Escenario 4 - Exitoso: confirmación en el último segundo**
- **Dado que** el cliente confirma justo cuando la tarea procesa su cita,
- **cuando** compiten,
- **entonces** gana quien bloquea primero la fila; si gana la tarea, el cliente recibe `410` "Su reserva expiró". Nunca ambos efectos.

**Escenario 5 - Error: reinicio del servidor**
- **Dado que** el backend estuvo detenido 30 minutos con citas vencidas,
- **cuando** arranca,
- **entonces** libera todo en ≤ 2 min, sin duplicar si se ejecuta dos veces.

### Reglas de negocio
RN-07, 12, 19.

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-22, 31 | RNF-06, 08 | Fiabilidad | - (impacto en CL-04 y SE-01) | CP-29, 30, 42 | agenda (+ inventario) |

### Definition of Ready
- [ ] Parámetros de bloqueo (5) y tolerancia (15) definidos.
- [ ] Puerto de liberación acordado con [[#HU-19]].
- [ ] Reloj inyectable para pruebas deterministas.

### Definition of Done
- [ ] Límites 4:59 / 5:01 y 14 / 16 min probados con reloj fijo (CP-29, CP-30).
- [ ] Idempotencia probada.
- [ ] La cita semilla `CT8` se expira al arrancar.
- [ ] Mínimo 2 commits `HU-28` y PR aprobado.

---

## HU-29
**Registrar repuestos en el catálogo de inventario** · Administrador · inventario · Esfuerzo 2 · Prioridad 2 · Fuera del POC (semilla) · Origen: original

### Historia
**Como** administrador, **quiero** registrar repuestos con código, precios, stock inicial y umbral, **para** tener un catálogo disponible para la agenda y las órdenes.

### Cambios frente a la versión original
- Ejemplos eléctricos (baterías, controladores, BMS, motores hub, cargadores) en lugar de filtros y aceites (ADR-03).
- Se agregan **categoría**, **umbral** y **voltaje compatible** (RNF-29).
- Stock inicial puede ser 0; precios > 0.

### Descripción
CRUD de repuestos (AD-03) con SKU `UNIQUE`. Con movimientos o reservas no se borra, se desactiva (RN-22). Los cambios de stock posteriores solo se hacen por movimientos ([[#HU-27]]).

### Criterios de aceptación
**Escenario 1 - Exitoso**
- **Dado que** se registra un repuesto con SKU único, precio y cantidad válidos,
- **cuando** se guarda,
- **entonces** queda en el catálogo con stock disponible.

**Escenario 2 - Fallido: SKU duplicado**
- **Dado que** el SKU existe,
- **cuando** se guarda,
- **entonces** "El código de repuesto ingresado ya existe en el inventario".

**Escenario 3 - Error: valores negativos**
- **Dado que** precio o stock son negativos,
- **cuando** se guarda,
- **entonces** "El precio debe ser mayor a cero y el stock no puede ser negativo".

### Reglas de negocio
RN-16, RN-22.

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-27 | RNF-20 | Adecuación funcional | AD-03 | Por definir | inventario |

### Definition of Ready
- [ ] Atributos obligatorios definidos.

### Definition of Done
- [ ] `UNIQUE` del SKU en la BD.
- [ ] Pruebas automatizadas de validación.

---

## HU-30
**Historial de servicios del vehículo** · Cliente · clientes-vehículos · Esfuerzo 4 · Prioridad 2 · Fuera del POC · Origen: ajustada

### Historia
**Como** cliente, **quiero** ver el historial de servicios de mi vehículo eléctrico, **para** controlar sus mantenimientos.

### Cambios frente a la versión original
- Placa → serie (ADR-03); kilometraje opcional.
- Requiere sesión de Cliente (ADR-20). Es la vista del cliente sobre los datos de [[#HU-06]], sin notas internas.

### Descripción
Vista CL-08. `GET /api/v1/mis-vehiculos/{id}/historial?pagina=&tamano=20`: órdenes *Entregadas* en orden descendente con fecha, servicios, repuestos instalados y total pagado. Paginada con índice por vehículo, estado y fecha. Si el vehículo no es del cliente: `404` (RN-46).

### Criterios de aceptación
**Escenario 1 - Exitoso**
- **Dado que** el cliente inició sesión y su vehículo tiene mantenimientos,
- **cuando** abre el historial,
- **entonces** ve la lista descendente con fecha, reparaciones, repuestos y total.

**Escenario 2 - Fallido: sin servicios**
- **Dado que** no hay órdenes entregadas,
- **cuando** abre el historial,
- **entonces** "Este vehículo aún no cuenta con mantenimientos o servicios registrados en el taller".

**Escenario 3 - Error: tiempo agotado**
- **Dado que** la consulta tarda demasiado,
- **cuando** se solicita,
- **entonces** "No fue posible cargar el historial en este momento, por favor intente nuevamente".

### Reglas de negocio
RN-46.

### Trazabilidad
| RF | RNF | ISO 25010 | Pantalla | Casos de prueba | Módulo |
|---|---|---|---|---|---|
| RF-12 | RNF-01, 12 | Seguridad, Desempeño | CL-08 | Por definir | clientes-vehículos |

### Definition of Ready
- [ ] Cliente asociado a sus vehículos.
- [ ] Diseño de la lista aprobado.

### Definition of Done
- [ ] Paginación implementada.
- [ ] Privacidad: un cliente no ve vehículos ajenos.
- [ ] Prueba de tiempo de respuesta.

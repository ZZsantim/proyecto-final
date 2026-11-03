---
title: Pruebas y trazabilidad - ISO/IEC/IEEE 29119
aliases: [pruebas, plan de pruebas, casos de prueba, datos de prueba, fixtures, credenciales de prueba, trazabilidad]
tags: [electrostock, ing-software, pruebas]
type: note
created: 2026-10-28
updated: 2026-10-28
status: evergreen
related: ["[[00-indice]]", "[[IS-1-SRS-IEEE830]]", "[[IS-2-HU]]", "[[IS-4-diseno-interfaz]]", "[[AR-3-POC]]"]
---

# Pruebas y trazabilidad

Documento único de pruebas según **ISO/IEC/IEEE 29119**. Contiene:
1. el plan de pruebas (29119-3, con el proceso de 29119-2 y las técnicas de 29119-4);
2. la especificación de los 50 casos de prueba;
3. los requisitos de datos de prueba;
4. la matriz de trazabilidad exigida por ISO/IEC/IEEE 29148.

> [!note] Estado de evidencia
> **Diseñado.** Las pruebas se escribirán en la fase de código. La línea base v0.2 aporta 15 pruebas de aceptación en SQLite y un *smoke* manual en MySQL, sin medición de concurrencia ni de volumen. Su conversión está en la sección 2.9.

---

## 1. Plan de pruebas

### 1.1 Contexto

| Elemento | Contenido |
|---|---|
| Proyecto | Electrostock, POC de 12 HU ([[AR-3-POC]]) |
| Elementos de prueba | Backend FastAPI (módulos de identidad, clientes, catálogo, agenda, inventario, órdenes); frontend Angular (módulos homónimos); contrato OpenAPI |
| Alcance incluido | RF del POC ([[IS-1-SRS-IEEE830#3.2 Requisitos funcionales|SRS 3.2]], columna POC = Sí) y los RNF 01-09, 11-23, 25-27, 29 y 31 |
| Alcance excluido | Facturación, reportes, recordatorios, encuesta y ticket (sin implementación en esta fase); pruebas de penetración formales |
| Supuestos | Docker disponible en los equipos; datos de la sección 3 |
| Partes interesadas | Equipo de desarrollo (3), docente evaluador |

### 1.2 Comunicación
- Los incidentes se registran como *issues* del repositorio con la etiqueta `incidente` y la plantilla de 1.11.
- El estado de las pruebas se reporta en cada PR hacia `develop` con el resumen automático de cobertura y resultados.

### 1.3 Riesgos de producto (pruebas basadas en riesgo)

| ID | Riesgo | Probabilidad | Impacto | Nivel | Mitigación por pruebas |
|---|---|---|---|---|---|
| RP-01 | Doble asignación de la misma plaza | Media | Alto | **Alto** | JMeter + pytest contra MySQL (CP-41, CP-42) |
| RP-02 | Inventario inconsistente (reservado > físico) | Media | Alto | **Alto** | Invariantes y rollback (CP-15, CP-16, CP-43) |
| RP-03 | Reservas huérfanas por fallas del programador | Media | Alto | **Alto** | Expiración e idempotencia (CP-29, CP-30) |
| RP-04 | Transición de estado ilegal | Baja | Alto | Medio | Tabla completa de la máquina de estados (CP-26, CP-27) |
| RP-05 | Fuga de datos personales en el seguimiento | Baja | Alto | Medio | Contrato con lista blanca (CP-24) |
| RP-06 | Escalamiento de privilegios | Baja | Alto | Medio | Guardias en todas las rutas (CP-07) |
| RP-07 | Interfaz inusable en tablet | Media | Medio | Medio | Selenium responsive + revisión de mockups (CP-45) |
| RP-08 | Demo fallida por conexión | Media | Medio | Medio | Modo mock (CP-36 a CP-39 en modo mock) |

### 1.4 Estrategia

**Niveles y tipos**

| Nivel | Objetivo | Herramienta | Entorno | Datos | Responsable | Disparador |
|---|---|---|---|---|---|---|
| **Unitarias frontend** (énfasis) | Componentes, servicios, guardias, interceptores, pipes, i18n | **Vitest** + TestBed + Testing Library + axe-core | Node, jsdom | Fixtures JSON | Autor de la HU | Cada commit y PR |
| Unitarias backend | Entidades, objetos de valor, máquinas de estado, estrategias, casos de uso | **pytest** | Repositorios en memoria | Fixtures JSON | Autor de la HU | Cada commit y PR |
| Integración backend | Adaptadores SQLAlchemy, migraciones, transacciones, routers | pytest + cliente HTTP asíncrono | MySQL 8.4 en Docker | Semilla | Autor de la HU | PR a `develop` |
| Concurrencia | Doble reserva, stock, correlativo | pytest concurrente + **JMeter** | MySQL 8.4 en Docker | Semilla + escenario | Joseph (HU-19) y Carlos (HU-01) | Antes de cada entrega |
| API / contrato | Endpoints, códigos, Problem Details, autorización | **Postman** + Newman | Docker Compose | Semilla | Cada integrante | PR a `develop` |
| End-to-end | Flujos críticos en navegador | **Selenium** WebDriver | Docker Compose + Chrome/Firefox | Semilla | Santiago | Antes de cada entrega |
| Rendimiento | p95, capacidad, volumen | **JMeter** | Docker Compose | 5.000 vehículos / 50.000 órdenes | Equipo | Antes de cada entrega |
| Accesibilidad | WCAG 2.2 AA | axe-core | - | - | Autor de la HU | PR |
| Usabilidad | SUS ≥ 68 (RNF-31) | Cuestionario SUS con al menos 5 usuarios | Demo | Semilla | Equipo | Antes de la entrega final |

**Técnicas de diseño (29119-4)**

| Técnica | Dónde se aplica |
|---|---|
| Partición de equivalencia | Formatos de documento, serie, placa, contraseña; roles |
| Valores límite | Ventana de 60 min (59, 60, 61); bloqueo de 5 min; tolerancia de 15 min; stock en 0, 1 y umbral; capacidad (cupos 2, 3, 4) |
| Tabla de decisión | Confirmación de cita (cupo × repuestos × bloqueo vigente); autorización (rol × operación × propiedad) |
| Transición de estados | Cita y Orden: todas las transiciones válidas (0-switch) y todas las inválidas |
| Escenarios | Flujos E2E del [[IS-1-SRS-IEEE830#3.7.5 Diagramas de actividad|diagrama de actividad DA-01]] |
| Conjetura de errores | Doble clic en confirmar, reenvío, token expirado a mitad de acción, reconexión SSE |

### 1.5 Criterios de completitud
- 100 % de los criterios de aceptación de las HU POC con al menos un caso automatizado.
- Cobertura ≥ 80 % (RNF-23) en frontend y en dominio y aplicación del backend.
- 100 % de las transiciones válidas e inválidas de ambas máquinas.
- 0 incidentes abiertos críticos o altos.
- RNF-01, 03, 04 y 06 medidos y dentro de su umbral (estado *Verificado*).

### 1.6 Suspensión y reanudación
- **Suspender** E2E y rendimiento si Docker no levanta o si las unitarias de un módulo fallan.
- **Reanudar** con todos los servicios saludables y las unitarias en verde.

### 1.7 Regresión
Toda corrección agrega primero una prueba que reproduce el incidente: primero rojo, luego verde.

### 1.8 Entorno de pruebas
- **Unitario local:** Node LTS + Python 3.12, sin servicios externos.
- **Integración / E2E:** el Compose principal (volumen persistente, con semilla) y la superposición de pruebas (MySQL en `tmpfs`, sin semilla). Detalle en [[AR-1-SAD#7. Vista de despliegue|SAD 7]].
- **Navegadores:** Chrome y Firefox estables; 360×800, 1024×768 y 1440×900.

### 1.9 Calendario (desde la autorización del código)
1. **Semana 1:** unitarias del dominio (máquinas de estado, inventario, franjas) y de componentes de presentación.
2. **Semana 2:** integración de adaptadores e interceptores; colección Postman; escenarios JMeter.
3. **Semana 3:** E2E, rendimiento, accesibilidad, SUS e informe de completitud.

### 1.10 Roles, herramientas y documentos

| Rol | Persona | Responsabilidad |
|---|---|---|
| Gestor de pruebas | Santiago | Plan, informe de completitud, E2E |
| Analista de pruebas | Cada integrante | Diseño de casos de sus HU |
| Ingeniero de pruebas | Cada integrante | Automatización de sus casos |
| Responsable de concurrencia | Joseph y Carlos | JMeter y pytest concurrente |

Ubicación prevista de los artefactos en el repositorio:

```text
frontend/src/app/**/*.spec.ts          # Vitest (junto a cada componente)
backend/tests/unit/                     # pytest, repositorios en memoria
backend/tests/integration/              # pytest, MySQL
backend/tests/concurrency/              # pytest, operaciones concurrentes
qa/postman/                             # colección y entorno local
qa/jmeter/                              # doble reserva, lecturas p95
qa/selenium/                            # flujos agendar y bahía
```

| Documento de 29119-3 | Ubicación |
|---|---|
| Plan de pruebas | Sección 1 |
| Especificación de diseño y casos | Sección 2 |
| Requisitos de datos de prueba | Sección 3 |
| Requisitos del entorno | Sección 1.8 y SAD 7 |
| Registro de ejecución | Salida de CI en cada PR |
| Reporte de incidentes | *Issues* con la plantilla de 1.11 |
| Informe de completitud | `docs/informe-completitud-pruebas.md` al cierre |

### 1.11 Plantilla de reporte de incidente

```markdown
**ID:** INC-XXX   **Severidad:** Crítica | Alta | Media | Baja
**HU / CP:** HU-XX / CP-XX   **Entorno:** Docker local, commit abc123
**Pasos para reproducir:**
1. ...
**Resultado esperado:** ...
**Resultado obtenido:** ...
**Evidencia:** captura, log con correlation_id
```

---

## 2. Casos de prueba

Niveles:
- **UF** unitaria frontend (Vitest);
- **UB** unitaria backend (pytest en memoria);
- **IB** integración backend (pytest + MySQL);
- **API** (Postman);
- **E2E** (Selenium);
- **RD** rendimiento y concurrencia (JMeter).

El énfasis es frontend: **26 de los 50 casos** se automatizarán en Vitest.

### 2.1 Identidad - HU-21, HU-10

| CP | Técnica | Nivel | Precondición / entrada | Resultado esperado | RF/RNF |
|---|---|---|---|---|---|
| CP-01 | Equivalencia | UF, UB, API | Registro válido con `Valida2026!` | `201`; cuenta Cliente; redirige a `/cliente/citas` | RF-01 |
| CP-02 | Límites / equivalencia | UF, UB | Contraseña de 9; sin símbolo; correo repetido | Botón deshabilitado y mensaje por campo; `422` / `409` con `errors[]` | RF-01, RN-43 |
| CP-03 | Escenario | UF, E2E | Login con los 4 roles semilla | Redirección a la ruta de cada rol | RF-02 |
| CP-04 | Conjetura de errores | UF, API | Contraseña incorrecta; `mecanico3` inactivo; API con 503 simulado | "Credenciales inválidas, por favor intente de nuevo" y "Servicio no disponible momentáneamente, intente más tarde"; la interfaz no se congela | RF-02 |
| CP-05 | Transición | UB, API | Refresh válido | Nuevo access token; refresh rotado; el anterior revocado | RF-03, RNF-11 |
| CP-06 | Conjetura de errores | UB | Reutilizar un refresh rotado | `401`; se revoca toda la familia | RF-03, RNF-11 |
| CP-07 | Tabla de decisión | UB, API | Recorrer todas las rutas y verificar la autorización por rol; matriz rol × operación | 0 rutas sin guardia; `403` en combinaciones no permitidas | RF-05, RNF-12 |

### 2.2 Clientes y vehículos - HU-22, HU-06

| CP | Técnica | Nivel | Precondición / entrada | Resultado esperado | RF/RNF |
|---|---|---|---|---|---|
| CP-08 | Escenario | UF, UB, API | Cliente nuevo + scooter con serie nueva | `201`; "Cliente y vehículo registrados correctamente" | RF-07, 08 |
| CP-09 | Equivalencia | UB, API | Serie `SC-48-0001` o placa `ABC12D` existentes | `409`; campo resaltado; "El número de serie ingresado ya se encuentra registrado" | RF-08 |
| CP-10 | Equivalencia / límites | UF | Teléfono vacío; CC con letras; tipo sin elegir | Envío bloqueado; campos con texto y `aria-invalid="true"` | RF-07, RNF-20 |
| CP-20 | Conjetura de errores | UB, UF | Nota con `<img src=x onerror=alert(1)>` y `<script>` | Persistida sin `on*` ni `<script>`; no se ejecuta | RF-11, RNF-14 |
| CP-21 | Escenario | UF, API | Búsqueda por `SC-48-0001` | Expediente con especificaciones, OT-000004 y 1 nota | RF-09, 10 |
| CP-22 | Equivalencia | UF, API | Serie `NO-EXISTE-99` | `404`; estado vacío "Vehículo no encontrado" | RF-09 |

### 2.3 Catálogo - HU-26

| CP | Técnica | Nivel | Precondición / entrada | Resultado esperado | RF/RNF |
|---|---|---|---|---|---|
| CP-11 | Escenario | UF, UB, API | Agregar `BMS-13S ×1` a `CAMB-BAT-48` | Lista actualizada; nuevas citas reservan también el BMS | RF-14 |
| CP-12 | Límites / equivalencia | UF, UB | Cantidad ≤ 0; repuesto inactivo; duplicado | Rechazo por campo; `422` | RF-14 |

### 2.4 Agenda y reservas - HU-01, HU-19, HU-11, HU-28, HU-03

| CP | Técnica | Nivel | Precondición / entrada | Resultado esperado | RF/RNF |
|---|---|---|---|---|---|
| CP-13 | Límites | UB, UF | `REP-MOT` (3 h) para mañana | No se ofrecen 16:00 ni 17:00; tampoco 10:00-12:00 (12:00 bloqueada) | RF-16, RN-03, 04 |
| CP-14 | Escenario | UB, UF | La franja se llena entre consulta y selección | `409` con sugerencia; "Alguien acaba de tomar este cupo..." | RF-19 |
| CP-15 | Escenario | UB, IB | Iniciar `CAMB-BAT-48` | Cita *En Proceso* con vencimiento + 5 min; R01 reservado 1 → 2, disponible 2 → 1 | RF-17, 30 |
| CP-16 | Tabla de decisión | UB, IB, UF | Iniciar `CAMB-BAT-60` (R02 disponible 0) | `409` con el SKU; sin cita ni cambio de ocupación | RF-30, RN-08 |
| CP-17 | Transición | UB, API | Confirmar dentro y fuera del bloqueo | Dentro: *Confirmada* con código. Fuera: `410` "Su reserva expiró" | RF-18 |
| CP-18 | Escenario | UB, UF | Ingreso sin cita con cupo a las 10:00 | Orden *Ingresada* en 10:00; aparece en la cola por SSE | RF-24 |
| CP-19 | Límites | UB | Agenda al 100 % | Cola con hora estimada; 0 citas desplazadas | RF-24, RN-32 |
| CP-29 | Transición / límites | UB, IB | `CT8` vencida; bloqueos a 4:59 y 5:01 | Solo la de 5:01 *Expirada*; franjas y reservas liberadas | RF-22, RNF-08 |
| CP-30 | Límites / idempotencia | UB | Cita 09:00; reloj 09:14 y 09:16; tarea dos veces | 09:14 sin cambio; 09:16 *No Asistió* y reserva liberada; 2.ª ejecución sin efectos | RF-22, RNF-08 |
| CP-31 | Escenario | UB, UF, API | Reprogramar `CT2` a pasado mañana 11:00 | *Reprogramada*; franja original libre; R01 intacta | RF-20 |
| CP-32 | Límites | UB, UF | Cancelar a 61, 60 y 59 min | 61 y 60 aceptan; 59 rechaza con motivo | RF-21, RN-10 |
| CP-33 | Tolerancia a fallos | IB | Falla entre liberar la franja original y tomar la nueva | Rollback; horario original; mensaje de reintento | RF-20, RNF-07 |

### 2.5 Órdenes - HU-23, HU-05, HU-07

| CP | Técnica | Nivel | Precondición / entrada | Resultado esperado | RF/RNF |
|---|---|---|---|---|---|
| CP-23 | Escenario | UF, API | Seguimiento con `K7M2QX9P4T` | *En Reparación* y 4 hitos | RF-39 |
| CP-24 | Contrato | UB, API | Respuesta del seguimiento | Solo tipo, modelo, estado, línea de tiempo, fecha estimada | RNF-15 |
| CP-25 | Conjetura de errores | UF | Código inexistente; 500 | "No encontramos información con ese código..."; Reintentar sin duplicar | RF-39 |
| CP-26 | Transición (0-switch) | UB | Cada transición válida | Estado actualizado + historial con usuario y hora | RF-35 |
| CP-27 | Transición inválida | UB, API | *Ingresada* → *Finalizada*; *Asignada* → *En Reparación*; mecánico ajeno | `409` con transiciones válidas; `403` al ajeno; auditado | RF-35, RNF-16 |
| CP-28 | Escenario | UB, IB | Crear orden desde `CT2` | Número siguiente, código de 10; `CT2` *Atendida*; RS1 en la orden | RF-33, RN-26 |
| CP-34 | Equivalencia | UB, API | Orden para V8 (tiene OT-000001 activa) | `409` "El vehículo ya tiene una orden activa (N° OT-000001)" | RF-33, RN-23 |
| CP-35 | Concurrencia | IB | 20 creaciones simultáneas | 20 números distintos y consecutivos | RF-33, RN-24 |

### 2.6 Frontend: componentes de presentación

| CP | Componente | Nivel | Verificación |
|---|---|---|---|
| CP-36 | `linea-tiempo` | UF | Hitos completados, actual (`aria-current="step"`) y pendientes; estado vacío |
| CP-37 | `selector-franja` | UF | Agotada deshabilitada con texto; semáforo en 49 %, 50 % y 100 %; emite la franja |
| CP-38 | `contador-regresivo` | UF | Temporizadores falsos: `mm:ss`; advertencia bajo 60 s; emite *expirado* en 0 |
| CP-39 | `acciones-estado` | UF | Solo transiciones recibidas; pide confirmación; emite el destino; botones ≥ 56 px |

### 2.7 No funcionales

| CP | Técnica | Nivel | Entrada | Resultado esperado | RNF |
|---|---|---|---|---|---|
| CP-40 | Carga | RD | 50 hilos, 5 min, volumen 5.000 / 50.000 | p95 ≤ 500 ms en lecturas; seguimiento p95 < 1 s | RNF-01, 02 |
| CP-41 | Concurrencia | RD | 100 hilos sincronizados sobre una franja con 1 cupo | 1 `201`, 99 `409`, 0 `5xx` | RNF-03 |
| CP-42 | Concurrencia | IB | 1000 operaciones mixtas | Invariantes RN-16 y capacidad verdaderas | RNF-06 |
| CP-43 | Fallas inyectadas | IB | Excepción en cada paso de IniciarAgendamiento y CrearOrden | 0 cambios persistidos | RNF-07 |
| CP-44 | Tiempo | E2E | El mecánico cambia el estado; el cliente tiene el seguimiento abierto | Visible en ≤ 2 s | RNF-04 |
| CP-45 | Responsive | E2E | CL-02 a CL-05, PU-03, SE-02, ME-01 en 360, 1024, 1440 | Sin scroll horizontal | RNF-17 |
| CP-46 | Accesibilidad | UF, E2E | axe-core en cada componente POC | 0 violaciones serias o críticas | RNF-19 |
| CP-47 | Equivalencia | UF | Pipes de moneda y fecha; cambio a inglés | `95200` → `$ 95.200`; `2026-11-03T09:00-05:00` → `03/11/2026 9:00 a. m.`; en inglés cambian los textos y se mantiene COP | RNF-21 |
| CP-48 | Inspección automatizada | UB | `import-linter` | 0 violaciones | RNF-22 |
| CP-49 | Contrato | API | Newman; límite de 30/min del seguimiento | 100 % aserciones; esquema contra OpenAPI; `429` en la 31 | RNF-13, 27 |
| CP-50 | Tabla de decisión | UF, UB | R02 (60 V) para V4 (72 V) | Advertencia con motivo; sin motivo se rechaza; auditado | RNF-29 |

### 2.8 Bosquejos de implementación de las pruebas
Patrón **Preparar - Actuar - Verificar**.

**CP-39 `acciones-estado`** (Vitest, presentación)

| Fase | Contenido |
|---|---|
| Preparar | Crear el componente con TestBed y entregar dos transiciones: *En Reparación* y *Esperando Repuesto*. Sin HTTP |
| Actuar 1 | Consultar los botones por su atributo de datos |
| Verificar 1 | Exactamente dos botones, en orden, con etiqueta en español (i18n) |
| Actuar 2 | Suscribirse a la salida y pulsar "En reparación" sin confirmar |
| Verificar 2 | No se emite nada (diálogo abierto) |
| Actuar 3 | Pulsar "Confirmar" |
| Verificar 3 | Se emite una vez *En Reparación*; axe sin violaciones; botones ≥ 56 px |

**CP-38 `contador-regresivo`** (Vitest con temporizadores falsos)

| Fase | Contenido |
|---|---|
| Preparar | Temporizadores falsos; vencimiento = ahora + 5 min; suscripción a *expirado* |
| Actuar 1 | Avanzar 4 min 1 s |
| Verificar 1 | El elemento `timer` muestra `00:59` con clase de advertencia |
| Actuar 2 | Avanzar 60 s |
| Verificar 2 | *Expirado* emitido una vez; muestra `00:00` |
| Limpieza | Restaurar temporizadores reales |

**CP-26 y CP-27: máquina de estados** (pytest, sin BD)

| Fase | Contenido |
|---|---|
| Datos | 12 transiciones válidas del mapa de [[AR-1-SAD#8.13 Patrones de diseño GoF|SAD 8.13]]; las inválidas son todas las demás parejas distintas |
| Válidas | Orden en el origen con el mecánico U3; usuario autorizado para la transición; cambiar estado |
| Verificar válidas | Estado = destino; último historial con estado anterior y usuario correctos |
| Inválidas | Orden en el origen; intento con Administrador |
| Verificar inválidas | *TransicionInvalida* sin el destino en la lista válida; estado sin cambios |
| Casos aparte | RN-29: mecánico no asignado → *SinPermiso*. RN-30: repuestos reservados → *RepuestosPendientes* |

Fábricas de prueba: "orden en estado X", "usuario autorizado para (origen, destino)" y "administrador".

**CP-41 doble reserva** (JMeter)

| Elemento | Configuración |
|---|---|
| Hilos | 100, 1 iteración |
| Preparación | Login con `cliente1` a `cliente3` en rotación (CSV) |
| Sincronización | Libera las 100 peticiones a la vez |
| Petición | Iniciar agendamiento sobre una franja con capacidad 1 (ruta canónica en [[AR-1-SAD#2.4 Diccionario de nombres|SAD 2.4]]) |
| Aserciones | 201 o 409; un posprocesador falla si los 201 no son exactamente 1 |
| Evidencia | Reporte HTML en el PR; RNF-03 pasa a *Verificado* |

### 2.9 Herencia de la línea base v0.2
Las 15 pruebas de la v0.2 ([[03-POC-HU-implementadas]], sección 4) pasan en SQLite. En la v2 se convierten así (sin SQLite, ADR-25):

| Prueba v0.2 | Caso v2 | Cambio |
|---|---|---|
| Franja disponible y sin doble retención (HU-01) | CP-13, 14, 41 | Duración del servicio y concurrencia real en MySQL |
| Confirmación con token de gestión (HU-01) | CP-17 | Sin token: cliente autenticado (ADR-20) |
| Ingreso sin cita al siguiente cupo (HU-03) | CP-18, 19 | Prioridad y cola |
| Ingreso sin cita libera retenciones vencidas (HU-03) | CP-29 | Lo hace el programador (HU-28) |
| Mapeo de estados y auditoría (HU-05) | CP-26 | Todos los estados y permisos |
| Transición inválida (HU-05) | CP-27 | 409 en lugar de 422 |
| Búsqueda y saneamiento del expediente (HU-06) | CP-20, 21 | Sin sede |
| 404 uniforme entre sedes (HU-06) | CP-22 | Se conserva el 404 uniforme |
| Código y documento verificado (HU-07) | CP-23, 24 | Solo código (ADR-33) |
| Documento sin verificación (HU-07) | CP-25 | Se retira la vía por documento |
| Rate limit por origen (HU-07) | CP-49 | Se conserva |
| Reprogramar y cancelar con token (HU-11) | CP-31 | Con sesión de cliente |
| Ventana de 1 hora sin cambio parcial (HU-11) | CP-32, 33 | Se conserva |
| Login y guardas de rol | CP-03, 07 | 4 roles |
| Portal y panel disponibles | CP-45 | Sobre Angular |

---

## 3. Datos de prueba

Requisitos de datos de prueba (29119-3): **qué datos existen y por qué**. El archivo JSON se escribirá en la fase de código a partir de estas tablas.

### 3.1 Estrategia (ADR-25)
**Un único archivo:** `fixtures/test-data.json`. Se consume de tres formas:

| Consumidor | Uso | Para qué |
|---|---|---|
| Backend - unitarias | Los repositorios en memoria lo cargan | Probar dominio y casos de uso en milisegundos |
| Backend - semilla | El contenedor de migraciones lo carga tras migrar | Integración, concurrencia y demo |
| Frontend - modo mock | Se copia a `assets/fixtures/` en el *build* | Demo sin backend (RNF-09) |

No se usa SQLite; integración y concurrencia solo en MySQL 8.4.

**Diferencia con la v0.2.** La v0.2 tenía dos fuentes separadas:
- la semilla de la demo, que solo creaba la sede y 3 usuarios con contraseñas del `.env`;
- los fixtures de SQLite en el código de pruebas.

La v2 las unifica, con escenarios completos.

**Fechas relativas.** Cada fecha es `dia_offset` (0 = hoy) más una hora local (America/Bogota). Si cae en domingo, se mueve al siguiente día hábil.

**Códigos de cita y de seguimiento.**
- Los códigos de cita usan un marcador relativo (`CITA-D1-0003`; `DM3` = día menos 3), que la carga reemplaza por la fecha real (RN-14).
- Los códigos de seguimiento se escriben en claro para la demo; la carga guarda solo su hash.

> [!warning] Solo para desarrollo
> - Contraseñas de prueba, convertidas a Argon2id al cargar.
> - El dominio `.test` no envía correos reales.
> - La carga se niega a ejecutarse si `ENVIRONMENT=production`.

### 3.2 Credenciales por rol

| Rol | Nombre | Correo | Contraseña | Estado |
|---|---|---|---|---|
| Administrador | Laura Méndez | `admin@electrostock.test` | `Admin2026!` | Activo |
| Secretaria | Ana Ruiz | `recepcion@electrostock.test` | `Recep2026!` | Activo |
| Mecánico | Andrés Rojas | `mecanico1@electrostock.test` | `Meca2026!a` | Activo |
| Mecánico | Camila Vargas | `mecanico2@electrostock.test` | `Meca2026!b` | Activo |
| Mecánico | Pedro Salas | `mecanico3@electrostock.test` | `Meca2026!c` | **Inactivo** (login rechazado, asignación bloqueada) |
| Cliente | María Gómez | `cliente1@electrostock.test` | `Cliente2026!` | Activo |
| Cliente | Julián Pardo | `cliente2@electrostock.test` | `Cliente2026!` | Activo |
| Cliente | Diego Torres | `cliente3@electrostock.test` | `Cliente2026!` | Activo |
| Cliente sin cuenta | Sofía Ramírez | - | - | Registrada por recepción (vinculación RN-47) |

Todas cumplen RN-43.

### 3.3 Parámetros y bahías
- **Parámetros:** valores por defecto del diccionario (bloqueo 5, tolerancia 15, ventana 60, lunes a sábado de 08:00 a 18:00, umbral amarillo 0,5, IVA 0,19, contraseña mínima 10).
- **Bahías:** B1, B2, B3 activas; B4 inactiva. Capacidad = 3.
- **Franja bloqueada:** mañana a las 12:00, "Capacitación del equipo técnico".

### 3.4 Clientes y vehículos

| Id | Cliente | Documento | Cuenta |
|---|---|---|---|
| C1 | María Gómez | CC 1012345678 | U6 |
| C2 | Julián Pardo | CC 1023456789 | U7 |
| C3 | Sofía Ramírez | CC 1034567890 | Sin cuenta |
| C4 | Diego Torres | CE 987654 | U8 |

| Id | Dueño | Tipo | Serie | Placa | Marca y modelo | Voltaje | Batería |
|---|---|---|---|---|---|---|---|
| V1 | C1 | Scooter | SC-48-0001 | - | Xiaomi 4 Pro (2024) | 48 V | 15 Ah, 18650 13S4P |
| V2 | C1 | Patineta | PT-36-0002 | - | Segway E22 (2023) | 36 V | 7,5 Ah |
| V3 | C3 | Bicicleta eléctrica | BI-48-0003 | - | Specialized Turbo Vado (2022) | 48 V | 14 Ah |
| V4 | C4 | Moto | MO-72-0004 | ABC12D | Super Soco TC Max (2024) | 72 V | 45 Ah |
| V5 | C3 | Monorueda | MR-84-0005 | - | Begode Master (2023) | 84 V | 30 Ah |
| V6 | C2 | Microcoche | MC-48-0006 | XYZ987 | Renault Twizy (2021) | 48 V | 120 Ah |
| V7 | C2 | Cuadriciclo | CU-60-0007 | QWE45F | Kandi K23 (2022) | 60 V | 100 Ah LiFePO4 |
| V8 | C4 | Moto | MO-60-0008 | FGH34J | NIU NQi GTS (2023) | 60 V | 35 Ah |

### 3.5 Repuestos

| Id | SKU | Nombre | Categoría | Venta (COP) | Físico | Reservado | Disponible | Umbral | Voltaje |
|---|---|---|---|---|---|---|---|---|---|
| R01 | BAT-48-15 | Batería litio 48V 15Ah | Batería | 1.250.000 | 3 | 1 | 2 | 1 | 48 |
| R02 | BAT-60-20 | Batería litio 60V 20Ah | Batería | 1.850.000 | 1 | 1 | **0** | 1 | 60 |
| R03 | CTR-48-1000 | Controlador 48V 1000W | Controlador | 380.000 | 4 | 0 | 4 | 2 | 48 |
| R04 | CTR-72-3000 | Controlador 72V 3000W | Controlador | 750.000 | 2 | 1 | 1 | 1 | 72 |
| R05 | MOT-HUB-500 | Motor hub 500W | Motor | 650.000 | 2 | 0 | 2 | 1 | 48 |
| R06 | PAS-FRE-01 | Pastillas de freno de disco (par) | Frenos | 35.000 | 20 | 2 | 18 | 6 | - |
| R07 | NEU-10 | Neumático 10 pulgadas | Ruedas | 80.000 | 8 | 0 | 8 | 4 | - |
| R08 | BMS-13S | Tarjeta BMS 13S 48V | Batería | 110.000 | 5 | 0 | 5 | 2 | 48 |
| R09 | CAR-48-2A | Cargador 48V 2A | Cargador | 120.000 | **0** | 0 | 0 | 2 | 48 |
| R10 | ACE-PULGAR | Acelerador de pulgar | Mandos | 45.000 | 6 | 0 | 6 | 2 | - |

Precios de compra: R01 900.000; R02 1.400.000; R03 250.000; R04 520.000; R05 450.000; R06 18.000; R07 45.000; R08 60.000; R09 70.000; R10 25.000.

### 3.6 Servicios y tipos de falla

| Id | Código | Servicio | Mano de obra | Duración | Repuestos requeridos |
|---|---|---|---|---|---|
| S01 | DIAG | Diagnóstico general | 50.000 | 60 min | - |
| S02 | CAMB-BAT-48 | Cambio de batería 48V | 40.000 | 60 min | R01 ×1 |
| S03 | CAMB-BAT-60 | Cambio de batería 60V | 45.000 | 60 min | R02 ×1 |
| S04 | CAMB-CTR-72 | Cambio de controlador 72V | 60.000 | 120 min | R04 ×1 |
| S05 | MANT-PREV | Mantenimiento preventivo | 45.000 | 60 min | R06 ×1 |
| S06 | REP-MOT | Reparación de motor | 90.000 | 180 min | R05 ×1 |
| S07 | AJ-FRENO | Ajuste rápido de frenos | 20.000 | 15 min | - |

| Id | Tipo de falla | Prioridad | Duración |
|---|---|---|---|
| F01 | Frenos sin respuesta | Alta | 60 min |
| F02 | No enciende o batería no carga | Alta | 60 min |
| F03 | Pérdida de potencia | Media | 60 min |
| F04 | Ruido en el motor | Media | 45 min |
| F05 | Luces o pito sin funcionar | Baja | 15 min |
| F06 | Ajuste de freno o tornillería | Baja | 10 min |

### 3.7 Citas y reservas

| Id | Código | Cliente | Vehículo | Servicio | Día | Hora | Estado | Reserva |
|---|---|---|---|---|---|---|---|---|
| CT1 | CITA-D0-0001 | C4 | V8 | S03 | Hoy | 08:00 | Atendida (→ OT-000001) | RS2 transferida a O1 |
| CT5 | CITA-D0-0002 | C2 | V7 | S05 | Hoy | 09:00 | Atendida (→ OT-000006) | RS4 transferida a O6 |
| CT2 | CITA-D1-0003 | C1 | V1 | S02 | Mañana | 10:00 | Confirmada | RS1: R01 ×1 |
| CT4 | CITA-D1-0004 | C3 | V5 | S05 | Mañana | 08:00 | Reprogramada | RS5: R06 ×1 |
| CT3 | CITA-D2-0005 | C4 | V4 | S04 | +2 días | 14:00 (2 franjas) | Confirmada | RS3: R04 ×1 |
| CT6 | CITA-DM3-0006 | C4 | V8 | S01 | -3 días | 11:00 | Cancelada | - |
| CT7 | CITA-DM1-0007 | C1 | V1 | S01 | Ayer | 15:00 | No Asistió | - |
| CT8 | CITA-D3-0008 | C2 | V6 | S01 | +3 días | 09:00 | **En Proceso con bloqueo vencido** | - (se expira al arrancar, HU-28) |

### 3.8 Órdenes de trabajo

| Id | Número | Código de seguimiento | Vehículo | Origen | Prioridad | Mecánico | Estado | Detalle |
|---|---|---|---|---|---|---|---|---|
| O1 | OT-000001 | K7M2QX9P4T | V8 | Cita CT1 | - | Andrés | En Reparación | R02 ×1 reservado; 4 transiciones (08:02 Ingresada por Ana, 08:10 Asignada por Laura, 08:20 En Diagnóstico, 09:05 En Reparación por Andrés); diagnóstico "Batería degradada al 62 %"; entrega estimada 16:00 |
| O2 | OT-000002 | H3R8WN2C6Y | V3 | Sin cita (F02) | Alta | Camila | Esperando Repuesto | Falta el cargador R09; diagnóstico "Cargador defectuoso. Batería en buen estado." |
| O3 | OT-000003 | P9TZ4D7K2M | V6 | Sin cita (F03) | Media | Andrés | Finalizada (ayer) | R03 ×1 instalado; diagnóstico "Controlador con MOSFET dañado" |
| O4 | OT-000004 | A4F6JX8R3E | V1 | Sin cita (F06) | Baja | Camila | Entregada (hace 20 días) | S05 + R06 instalado; CMP-000001 (subtotal 80.000, IVA 15.200, total 95.200); encuesta 5/5 "Atención rápida y clara." |
| O5 | OT-000005 | W2N7C5V9QB | V2 | Sin cita (F06) | Baja | - | Ingresada | Cola, posición 1; "Freno trasero suelto" |
| O6 | OT-000006 | M8E3K6T4ZD | V7 | Cita CT5 | - | Camila | Asignada | R06 ×1 reservado; entrega estimada 13:00 |

Notas técnicas:
- **V1 / O4:** "Celdas **18650 13S4P** balanceadas. Voltaje en reposo 53,1 V."
- **V6 / O3:** "MOSFET Q3 del controlador en corto. Se reemplazó el controlador completo."

Todos los códigos de seguimiento cumplen el alfabeto sin ambiguos (ADR-33).

### 3.9 Escenarios cubiertos

| Escenario | Dato | HU |
|---|---|---|
| Agendar con repuesto disponible | S02 con R01 (disponible 2) | HU-01, HU-19 |
| Rechazo por repuesto | S03 con R02 (disponible 0) | HU-19 |
| Servicio de 3 franjas | S06 (180 min) | HU-01 |
| Franja bloqueada | Mañana 12:00 | HU-01, HU-02 |
| Cita *En Proceso* vencida | CT8 | HU-28 |
| Cita cancelable y reprogramable | CT2 | HU-11 |
| Inasistencia y cancelación | CT7, CT6 | HU-28 |
| Ingreso sin cita en cola | O5 | HU-03 |
| Orden en cada estado relevante | O1 a O6 | HU-05, HU-07 |
| Expediente con historial y notas | SC-48-0001 | HU-06 |
| Vehículos sin placa | V1, V2, V3, V5 | HU-22 |
| Alerta de stock | R02, R09 | HU-08 |
| Riesgo eléctrico | V4 (72 V) frente a R02 (60 V) | RNF-29 |
| Volumen para RNF-01/02 | Generador hasta 5.000 vehículos y 50.000 órdenes (meta de la v0.2) | RNF-01, 02 |

### 3.10 Invariantes que la carga verifica
1. El reservado de cada repuesto = suma de sus reservas activas (R06 = RS4 + RS5 = 2).
2. Reservado ≤ físico (RN-16).
3. Ningún vehículo con más de una orden activa (RN-23).
4. Cada historial respeta la máquina de estados ([[IS-1-SRS-IEEE830#3.7.3 Máquinas de estado|SRS 3.7.3]]).
5. Ninguna franja supera la capacidad (3).

Si una falla, la carga se detiene e indica el registro y la regla. La carga es **idempotente**: vacía las tablas de negocio y recarga.

---

## 4. Matriz de trazabilidad

Trazabilidad bidireccional (ISO/IEC/IEEE 29148). Responde: **"si cambia un criterio de esta HU, ¿qué código, pruebas y pantallas toco?"**, que es lo que se evalúa al modificar un criterio de una HU.

### 4.1 HU → artefactos

| HU | RF | RNF | ISO 25010 | Vista ([[IS-4-diseno-interfaz]]) | Casos de prueba | Backend (módulo / caso de uso) | Frontend (componente) |
|---|---|---|---|---|---|---|---|
| [[IS-2-HU#HU-01\|HU-01]] | RF-16..19 | 03, 06, 07, 17, 31 | Fiabilidad | CL-02 a CL-05 | CP-13, 14, 17, 37, 38, 41, 42 | agenda / ConsultarFranjas, IniciarAgendamiento, ConfirmarCita | `agendar-cita`, `selector-franja`, `contador-regresivo` |
| [[IS-2-HU#HU-02\|HU-02]] | RF-23 | 04, 19 | Interacción | SE-01 | - | agenda / BloquearFranja | (fuera del POC) |
| [[IS-2-HU#HU-03\|HU-03]] | RF-24, 25, 33, 40 | 04, 06, 07 | Fiabilidad, Mantenibilidad | SE-02 | CP-18, 19, 34, 43 | agenda / RegistrarIngresoSinCita + estrategia | `ingreso-sin-cita` |
| [[IS-2-HU#HU-04\|HU-04]] | RF-15, 25 | 20, 22 | Adecuación | SE-02 | CP-18, 19 | catálogo + agenda | `ingreso-sin-cita` |
| [[IS-2-HU#HU-05\|HU-05]] | RF-35, 36, 40 | 04, 12, 16, 18, 30 | Interacción, Seguridad | ME-01, ME-02 | CP-26, 27, 39, 44 | órdenes / CambiarEstadoOrden + estados | `panel-bahia`, `tarjeta-orden`, `detalle-orden`, `acciones-estado` |
| [[IS-2-HU#HU-06\|HU-06]] | RF-09..11 | 02, 14 | Desempeño, Seguridad | ME-03 | CP-20, 21, 22, 40 | clientes / BuscarVehiculo, ObtenerExpediente, AgregarNota | `buscador-vehiculo`, `expediente-tecnico`, `editor-nota-tecnica` |
| [[IS-2-HU#HU-07\|HU-07]] | RF-39, 40 | 01, 04, 13, 15 | Seguridad | PU-03 | CP-23, 24, 25, 36, 44, 49 | órdenes / ConsultarSeguimiento | `seguimiento-publico`, `linea-tiempo` |
| [[IS-2-HU#HU-08\|HU-08]] | RF-29, 32 | 04, 07 | Adecuación | AD-03 | - | inventario / ListarStock | (fuera del POC) |
| [[IS-2-HU#HU-09\|HU-09]] | RF-38 | 06, 07, 29 | Fiabilidad | ME-02 | - | órdenes + inventario / InstalarRepuesto | (fuera del POC) |
| [[IS-2-HU#HU-10\|HU-10]] | RF-05 | 12, 16 | Seguridad | Todas | CP-07, 27 | identidad / autorización por rol | `rol.guard` |
| [[IS-2-HU#HU-11\|HU-11]] | RF-20, 21, 31 | 06, 07, 20 | Fiabilidad | CL-01, CL-06 | CP-31, 32, 33 | agenda / ReprogramarCita, CancelarCita | `mis-citas-vehiculos`, `reprogramar-cita` |
| [[IS-2-HU#HU-12\|HU-12]] | RF-26 | 08, 26 | Flexibilidad | - | - | agenda / EnviarRecordatorios + outbox | - |
| [[IS-2-HU#HU-13\|HU-13]] | RF-41, 42, 44 | 07, 16, 30 | Adecuación, Seguridad | SE-05 | - | facturación / Liquidar, RegistrarPago; órdenes / Entregar | (fuera del POC) |
| [[IS-2-HU#HU-14\|HU-14]] | RF-46 | 01 | Desempeño | AD-01 | - | reportes / GenerarResumen | (fuera del POC) |
| [[IS-2-HU#HU-15\|HU-15]] | RF-06 | 10, 16 | Seguridad | AD-05 | - | identidad / GestionarUsuario | (fuera del POC) |
| [[IS-2-HU#HU-16\|HU-16]] | RF-45 | 13, 15 | Interacción | CL-09 | - | facturación / RegistrarEncuesta | (fuera del POC) |
| [[IS-2-HU#HU-17\|HU-17]] | RF-43 | 15 | Flexibilidad | SE-04, SE-05 | - | facturación / GenerarTicket | (fuera del POC) |
| [[IS-2-HU#HU-18\|HU-18]] | RF-13 | 20 | Adecuación | AD-04 | - | catálogo / GestionarServicio | (fuera del POC) |
| [[IS-2-HU#HU-19\|HU-19]] | RF-29, 30 | 03, 06, 07, 29 | Fiabilidad, Protección | CL-02 a CL-05 | CP-15, 16, 41, 42, 43, 50 | inventario / ReservarRepuestos (puerto público) | `resumen-reserva` |
| [[IS-2-HU#HU-20\|HU-20]] | RF-47 | 16 | Seguridad | AD-06 | CP-27 | auditoría / SuscriptorAuditoria | (fuera del POC) |
| [[IS-2-HU#HU-21\|HU-21]] | RF-01..05 | 10..13 | Seguridad | PU-01, PU-02 | CP-01..07 | identidad / RegistrarCliente, IniciarSesion, RefrescarSesion, CerrarSesion | `iniciar-sesion`, `crear-cuenta`, sesión, interceptor |
| [[IS-2-HU#HU-22\|HU-22]] | RF-07, 08 | 14, 19, 20 | Interacción | SE-03, CL-07 | CP-08, 09, 10 | clientes / RegistrarClienteVehiculo | `registro-cliente-vehiculo`, `registrar-vehiculo` |
| [[IS-2-HU#HU-23\|HU-23]] | RF-33 | 06, 07, 15 | Fiabilidad | SE-04 | CP-28, 34, 35, 43 | órdenes / CrearOrden | `crear-orden` |
| [[IS-2-HU#HU-24\|HU-24]] | RF-34 | 04, 16 | Adecuación | AD-02 | - | órdenes / AsignarMecanico | (fuera del POC) |
| [[IS-2-HU#HU-25\|HU-25]] | RF-37 | 06, 29 | Fiabilidad, Protección | ME-02 | CP-50 | órdenes + inventario / AgregarRepuestoOrden | (fuera del POC) |
| [[IS-2-HU#HU-26\|HU-26]] | RF-14 | 07, 20 | Adecuación | AD-04 | CP-11, 12 | catálogo / DefinirRepuestosServicio | `catalogo-repuestos-servicio` |
| [[IS-2-HU#HU-27\|HU-27]] | RF-28 | 06, 16 | Fiabilidad | AD-03 | - | inventario / RegistrarMovimiento | (fuera del POC) |
| [[IS-2-HU#HU-28\|HU-28]] | RF-22, 31 | 06, 08 | Fiabilidad | - | CP-29, 30, 42 | agenda / ExpirarBloqueos, MarcarInasistencias | - |
| [[IS-2-HU#HU-29\|HU-29]] | RF-27 | 20 | Adecuación | AD-03 | - | inventario / RegistrarRepuesto | (fuera del POC) |
| [[IS-2-HU#HU-30\|HU-30]] | RF-12 | 01, 12 | Seguridad | CL-08 | - | clientes / HistorialCliente | (fuera del POC) |

Los nombres de módulos y casos de uso son conceptuales; su identificador en código está en [[AR-1-SAD#2.4 Diccionario de nombres|SAD 2.4]].

### 4.2 Cobertura de RF del POC

| RF | CP | | RF | CP |
|---|---|---|---|---|
| RF-01 | CP-01, 02 | | RF-20 | CP-31, 33 |
| RF-02 | CP-03, 04 | | RF-21 | CP-32 |
| RF-03 | CP-05, 06 | | RF-22 | CP-29, 30 |
| RF-04 | CP-05 | | RF-24 | CP-18, 19 |
| RF-05 | CP-07 | | RF-25 | CP-18 |
| RF-07 | CP-08, 10 | | RF-29 | CP-15 |
| RF-08 | CP-08, 09 | | RF-30 | CP-15, 16 |
| RF-09 | CP-21, 22 | | RF-31 | CP-29, 30, 32 |
| RF-10 | CP-21 | | RF-33 | CP-28, 34, 35 |
| RF-11 | CP-20 | | RF-35 | CP-26, 27 |
| RF-14 | CP-11, 12 | | RF-36 | CP-26 |
| RF-16 | CP-13 | | RF-39 | CP-23, 24, 25 |
| RF-17 | CP-15 | | RF-40 | CP-44 |
| RF-18 | CP-17, 41 | | | |
| RF-19 | CP-14 | | | |

**Resultado:** 100 % de los RF del POC tienen al menos un caso de prueba.

### 4.3 Decisiones (ADR) → artefactos

| ADR | HU afectadas | Sección de arquitectura |
|---|---|---|
| ADR-02 Una sede | 01, 02, 08, 10, 14, 19 (original) | [[AR-1-SAD#3. Contexto y alcance|SAD 3]] |
| ADR-05 Dos máquinas de estado | 01, 05, 11, 13, 16, 23, 24, 28 | [[IS-1-SRS-IEEE830#3.7.3 Máquinas de estado|SRS 3.7.3]], [[AR-1-SAD#8.13 Patrones de diseño GoF|SAD 8.13]] |
| ADR-06 / ADR-07 Reserva e inventario | 01, 09, 11, 19, 25, 26, 27, 28 | [[AR-1-SAD#6. Vista de tiempo de ejecución|SAD 6]] |
| ADR-18 Concurrencia híbrida | 01, 03, 11, 19, 23, 28 | [[AR-1-SAD#8. Conceptos transversales|SAD 8]] |
| ADR-19 SSE | 03, 05, 07, 24 | SAD 8 |
| ADR-23 JWT | 21, 10 | SAD 8 |
| ADR-36 Outbox | 12 | SAD 8 |
| ADR-38 Nombres bilingües | Todas | [[AR-1-SAD#2.4 Diccionario de nombres|SAD 2.4]] |

# Electrostock

Prototipo web de gestión de un taller de movilidad eléctrica. Incluye 26 vistas,
acceso por rol, datos de demostración en memoria, rutas protegidas,
internacionalización español/inglés y recorridos de citas, órdenes de trabajo y
seguimiento público.

> **Entorno de demostración:** no hay backend conectado. Las credenciales y los
> datos son ficticios, no uses información real. Los cambios se mantienen solo
> mientras la aplicación está abierta y se pierden al recargar.

## Requisitos

- Node.js 24 LTS (24.15 o posterior recomendado).
- npm 11.
- Chromium para las pruebas de navegador Playwright.
- Git Bash o WSL en Windows si se necesita instalar dependencias de sistema de
  Playwright; los comandos de desarrollo funcionan desde PowerShell.

Comprueba las versiones:

```text
node --version
npm --version
```

## Instalación y ejecución

Desde la carpeta del proyecto, en Windows, macOS o Linux:

```text
npm ci
npm start
```

Abre <http://localhost:4200>. Para detener el servidor usa `Ctrl+C`.

Instala el navegador de pruebas una vez:

```text
npx playwright install chromium
```

En Linux, si faltan bibliotecas del sistema, instala los prerrequisitos
recomendados por Playwright:

```text
npx playwright install --with-deps chromium
```

## Comandos

| Comando                     | Descripción                                                              |
| --------------------------- | ------------------------------------------------------------------------ |
| `npm start`                 | Servidor de desarrollo en `http://localhost:4200`.                       |
| `npm run build`             | Compilación de producción en `dist/electrostock/`.                       |
| `npm test`                  | Pruebas unitarias con Vitest.                                            |
| `npm run test:coverage`     | Pruebas unitarias con reporte de cobertura V8.                           |
| `npm run e2e`               | Pruebas Playwright en móvil (360 × 800) y escritorio (1440 × 900).       |
| `npm run audit`             | Ejecuta build, pruebas unitarias y E2E; se detiene ante el primer error. |
| `bash scripts/auditoria.sh` | Alias de auditoría compatible con las guías.                             |

`npm run e2e` inicia Angular automáticamente en el puerto 4200. No inicies otro
servidor en ese puerto mientras corren las pruebas. Los resultados Playwright
se guardan en `test-results/` y se excluyen del control de versiones.

## Organización del código

```text
src/
├── app/
│   ├── core/                 # autenticación, estado demo, rutas, HTTP y UX
│   ├── agenda/               # rutas de agenda y reservas
│   ├── clientes-vehiculos/  # rutas de clientes e historial
│   ├── ordenes/              # rutas de órdenes y seguimiento
│   ├── inventario/           # rutas de inventario
│   ├── pantallas/
│   │   ├── portal/           # controlador y marco común de las páginas
│   │   ├── publicas/         # inicio de sesión, registro y seguimiento
│   │   ├── cliente/          # vistas del cliente y sus reservas
│   │   ├── recepcion/        # agenda, ingreso, clientes y caja
│   │   ├── mecanico/         # bahía, órdenes y expediente
│   │   └── administracion/  # indicadores, inventario, catálogo y usuarios
│   ├── identidad/            # rutas de acceso y registro
│   └── app.*                 # composición general y navegación
├── assets/
│   ├── fixtures/             # datos locales de demostración
│   └── i18n/                 # traducciones español e inglés
└── styles/                   # tokens visuales y movimiento
e2e/                          # pruebas de navegación y flujos completos
scripts/                      # auditoría automatizada del proyecto
```

Cada grupo de pantallas es un componente standalone en su propio directorio;
`PortalPageComponent` conserva el estado local y el marco compartido. Los
componentes de perfil reciben ese estado como entrada para mantener el flujo
actual sin duplicar la lógica de demostración.

## Cuentas de demostración

Todas las contraseñas corresponden únicamente al fixture local.

| ID  | Nombre        | Perfil         | Correo                        | Contraseña     | Estado                            |
| --- | ------------- | -------------- | ----------------------------- | -------------- | --------------------------------- |
| U1  | Laura Méndez  | Administración | `admin@electrostock.test`     | `Admin2026!`   | Activa                            |
| U2  | Ana Ruiz      | Recepción      | `recepcion@electrostock.test` | `Recep2026!`   | Activa                            |
| U3  | Andrés Rojas  | Mecánico       | `mecanico1@electrostock.test` | `Meca2026!a`   | Activa                            |
| U4  | Camila Vargas | Mecánico       | `mecanico2@electrostock.test` | `Meca2026!b`   | Activa                            |
| U5  | Pedro Salas   | Mecánico       | `mecanico3@electrostock.test` | `Meca2026!c`   | Inactiva; debe rechazar el acceso |
| U6  | María Gómez   | Cliente        | `cliente1@electrostock.test`  | `Cliente2026!` | Activa                            |
| U7  | Julián Pardo  | Cliente        | `cliente2@electrostock.test`  | `Cliente2026!` | Activa                            |
| U8  | Diego Torres  | Cliente        | `cliente3@electrostock.test`  | `Cliente2026!` | Activa                            |

## Vistas y rutas

Las rutas de los perfiles requieren iniciar sesión con un usuario del rol
correspondiente. `:id` y `:trackingCode` son parámetros de ruta.

| ID    | Perfil         | Ruta                                 |
| ----- | -------------- | ------------------------------------ |
| PU-01 | Público        | `/iniciar-sesion`                    |
| PU-02 | Público        | `/crear-cuenta`                      |
| PU-03 | Público        | `/seguimiento/:trackingCode`         |
| CL-01 | Cliente        | `/cliente/mis-citas`                 |
| CL-02 | Cliente        | `/cliente/agendar/vehiculo-servicio` |
| CL-03 | Cliente        | `/cliente/agendar/dia`               |
| CL-04 | Cliente        | `/cliente/agendar/hora`              |
| CL-05 | Cliente        | `/cliente/agendar/confirmar`         |
| CL-06 | Cliente        | `/cliente/reprogramar`               |
| CL-07 | Cliente        | `/cliente/registrar-vehiculo`        |
| CL-08 | Cliente        | `/cliente/historial/:id`             |
| CL-09 | Cliente        | `/cliente/encuesta`                  |
| SE-01 | Recepción      | `/recepcion/agenda`                  |
| SE-02 | Recepción      | `/recepcion/ingreso`                 |
| SE-03 | Recepción      | `/recepcion/registrar-cliente`       |
| SE-04 | Recepción      | `/recepcion/crear-orden`             |
| SE-05 | Recepción      | `/recepcion/caja`                    |
| ME-01 | Mecánico       | `/mecanico/bahia`                    |
| ME-02 | Mecánico       | `/mecanico/orden/:id`                |
| ME-03 | Mecánico       | `/mecanico/expediente/:id`           |
| AD-01 | Administración | `/administracion/indicadores`        |
| AD-02 | Administración | `/administracion/asignaciones`       |
| AD-03 | Administración | `/administracion/inventario`         |
| AD-04 | Administración | `/administracion/catalogo`           |
| AD-05 | Administración | `/administracion/usuarios`           |
| AD-06 | Administración | `/administracion/bitacora`           |

## Datos de prueba

La fuente autoritativa está en
[`src/assets/fixtures/test-data.json`](src/assets/fixtures/test-data.json).
Contiene 60 registros distribuidos en nueve colecciones:

| Colección      | Registros | Cobertura destacada                                                                                    |
| -------------- | --------: | ------------------------------------------------------------------------------------------------------ |
| `users`        |         8 | Cuatro perfiles, dos mecánicos, un mecánico inactivo.                                                  |
| `customers`    |         4 | Tres clientes asociados a cuentas y un cliente sin correo.                                             |
| `vehicles`     |         8 | Scooter, monopatín, bicicleta, motocicleta, monociclo, microauto y cuadriciclo; voltajes de 36 a 84 V. |
| `services`     |         7 | Diagnóstico, cambios de batería/controlador, mantenimiento, motor y frenos.                            |
| `parts`        |        10 | Existencias normales, bajas, agotadas y reservas.                                                      |
| `appointments` |         8 | Confirmada, atendida, reprogramada, cancelada, inasistencia y en proceso.                              |
| `workOrders`   |         6 | Ingresada, asignada, diagnóstico/reparación, esperando repuesto, finalizada y entregada.               |
| `failures`     |         6 | Prioridades alta, media y baja; duraciones entre 10 y 60 minutos.                                      |
| `auditEvents`  |         3 | Creación de orden, inicio de diagnóstico e inicio de reparación.                                       |

### Clientes y vehículos

| Cliente          | Documento     | Correo                       | Teléfono     |
| ---------------- | ------------- | ---------------------------- | ------------ |
| C1 María Gómez   | CC 1012345678 | `cliente1@electrostock.test` | 300 111 2233 |
| C2 Julián Pardo  | CC 1023456789 | `cliente2@electrostock.test` | 300 222 3344 |
| C3 Sofía Ramírez | CC 1034567890 | —                            | 300 333 4455 |
| C4 Diego Torres  | CE 987654     | `cliente3@electrostock.test` | 300 444 5566 |

| Vehículo | Propietario | Tipo        | Modelo                 | Serie      |  Año | Placa  | Voltaje | Batería             |
| -------- | ----------- | ----------- | ---------------------- | ---------- | ---: | ------ | ------: | ------------------- |
| V1       | C1          | SCOOTER     | Xiaomi 4 Pro           | SC-48-0001 | 2024 | —      |    48 V | 15 Ah · 18650 13S4P |
| V2       | C1          | SKATEBOARD  | Segway E22             | PT-36-0002 | 2023 | —      |    36 V | 7,5 Ah              |
| V3       | C3          | E_BIKE      | Specialized Turbo Vado | BI-48-0003 | 2022 | —      |    48 V | 14 Ah               |
| V4       | C4          | MOTORCYCLE  | Super Soco TC Max      | MO-72-0004 | 2024 | ABC12D |    72 V | 45 Ah               |
| V5       | C3          | MONOWHEEL   | Begode Master          | MR-84-0005 | 2023 | —      |    84 V | 30 Ah               |
| V6       | C2          | MICROCAR    | Renault Twizy          | MC-48-0006 | 2021 | XYZ987 |    48 V | 120 Ah              |
| V7       | C2          | QUADRICYCLE | Kandi K23              | CU-60-0007 | 2022 | QWE45F |    60 V | 100 Ah LiFePO4      |
| V8       | C4          | MOTORCYCLE  | NIU NQi GTS            | MO-60-0008 | 2023 | FGH34J |    60 V | 35 Ah               |

### Servicios y repuestos

Los valores son COP. `Partes` lista los IDs relacionados; `físicas /
reservadas / alerta` muestra el inventario de cada repuesto.

| Servicio                      | Código      | Mano de obra | Minutos | Partes |
| ----------------------------- | ----------- | -----------: | ------: | ------ |
| S01 Diagnóstico general       | DIAG        |       50.000 |      60 | —      |
| S02 Cambio de batería 48V     | CAMB-BAT-48 |       40.000 |      60 | R01    |
| S03 Cambio de batería 60V     | CAMB-BAT-60 |       45.000 |      60 | R02    |
| S04 Cambio de controlador 72V | CAMB-CTR-72 |       60.000 |     120 | R04    |
| S05 Mantenimiento preventivo  | MANT-PREV   |       45.000 |      60 | R06    |
| S06 Reparación de motor       | REP-MOT     |       90.000 |     180 | R05    |
| S07 Ajuste rápido de frenos   | AJ-FRENO    |       20.000 |      15 | —      |

| ID / SKU          | Repuesto                          | Categoría   | Precio COP | Físicas / reservadas / alerta | Voltaje |
| ----------------- | --------------------------------- | ----------- | ---------: | ----------------------------: | ------: |
| R01 / BAT-48-15   | Batería litio 48V 15Ah            | Batería     |  1.250.000 |                     3 / 1 / 1 |    48 V |
| R02 / BAT-60-20   | Batería litio 60V 20Ah            | Batería     |  1.850.000 |                     1 / 1 / 1 |    60 V |
| R03 / CTR-48-1000 | Controlador 48V 1000W             | Controlador |    380.000 |                     4 / 0 / 2 |    48 V |
| R04 / CTR-72-3000 | Controlador 72V 3000W             | Controlador |    750.000 |                     2 / 1 / 1 |    72 V |
| R05 / MOT-HUB-500 | Motor hub 500W                    | Motor       |    650.000 |                     2 / 0 / 1 |    48 V |
| R06 / PAS-FRE-01  | Pastillas de freno de disco (par) | Frenos      |     35.000 |                    20 / 2 / 6 |       — |
| R07 / NEU-10      | Neumático 10 pulgadas             | Ruedas      |     80.000 |                     8 / 0 / 4 |       — |
| R08 / BMS-13S     | Tarjeta BMS 13S 48V               | Batería     |    110.000 |                     5 / 0 / 2 |    48 V |
| R09 / CAR-48-2A   | Cargador 48V 2A                   | Cargador    |    120.000 |                     0 / 0 / 2 |    48 V |
| R10 / ACE-PULGAR  | Acelerador de pulgar              | Mandos      |     45.000 |                     6 / 0 / 2 |       — |

### Citas, órdenes y fallas

| Cita                | Cliente | Vehículo | Servicio | Fecha relativa | Hora  | Estado       | OT  |
| ------------------- | ------- | -------- | -------- | -------------: | ----- | ------------ | --- |
| CT1 / CITA-D0-0001  | C4      | V8       | S03      |         0 días | 08:00 | ATENDIDA     | O1  |
| CT5 / CITA-D0-0002  | C2      | V7       | S05      |         0 días | 09:00 | ATENDIDA     | O6  |
| CT2 / CITA-D1-0003  | C1      | V1       | S02      |         +1 día | 10:00 | CONFIRMADA   | —   |
| CT4 / CITA-D1-0004  | C3      | V5       | S05      |         +1 día | 08:00 | REPROGRAMADA | —   |
| CT3 / CITA-D2-0005  | C4      | V4       | S04      |        +2 días | 14:00 | CONFIRMADA   | —   |
| CT6 / CITA-DM3-0006 | C4      | V8       | S01      |        −3 días | 11:00 | CANCELADA    | —   |
| CT7 / CITA-DM1-0007 | C1      | V1       | S01      |         −1 día | 15:00 | NO_ASISTIO   | —   |
| CT8 / CITA-D3-0008  | C2      | V6       | S01      |        +3 días | 09:00 | EN_PROCESO   | —   |

| OT             | Seguimiento  | Vehículo | Prioridad | Mecánico      | Estado             | Entrega estimada | Diagnóstico                                 | Línea de tiempo                                                         |
| -------------- | ------------ | -------- | --------- | ------------- | ------------------ | ---------------- | ------------------------------------------- | ----------------------------------------------------------------------- |
| O1 / OT-000001 | `K7M2QX9P4T` | V8       | MEDIA     | Andrés Rojas  | EN_REPARACION      | 16:00            | Batería degradada al 62 %                   | Ingresada 08:02 → Asignada 08:10 → Diagnóstico 08:20 → Reparación 09:05 |
| O2 / OT-000002 | `H3R8WN2C6Y` | V3       | ALTA      | Camila Vargas | ESPERANDO_REPUESTO | Mañana           | Cargador defectuoso; batería en buen estado | Ingresada → Asignada → En diagnóstico → Esperando repuesto              |
| O3 / OT-000003 | `P9TZ4D7K2M` | V6       | MEDIA     | Andrés Rojas  | FINALIZADA         | Entregada        | Controlador con MOSFET dañado               | Ingresada → En reparación → Finalizada                                  |
| O4 / OT-000004 | `A4F6JX8R3E` | V1       | BAJA      | Camila Vargas | ENTREGADA          | Entregada        | Mantenimiento preventivo completado         | Ingresada → Finalizada → Entregada                                      |
| O5 / OT-000005 | `W2N7C5V9QB` | V2       | BAJA      | —             | INGRESADA          | Por asignar      | Ajuste de freno                             | Ingresada                                                               |
| O6 / OT-000006 | `B8Q5M2R9TX` | V7       | BAJA      | Andrés Rojas  | ASIGNADA           | En revisión      | Mantenimiento preventivo                    | Ingresada → Asignada                                                    |

| Falla                              | Prioridad | Minutos |
| ---------------------------------- | --------- | ------: |
| F01 Frenos sin respuesta           | Alta      |      60 |
| F02 No enciende o batería no carga | Alta      |      60 |
| F03 Pérdida de potencia            | Media     |      60 |
| F04 Ruido en el motor              | Media     |      45 |
| F05 Luces o pito sin funcionar     | Baja      |      15 |
| F06 Ajuste de freno o tornillería  | Baja      |      10 |

| Hora  | Usuario      | Clave de acción          | Orden     |
| ----- | ------------ | ------------------------ | --------- |
| 09:05 | Andrés Rojas | `actions.startRepair`    | OT-000001 |
| 08:20 | Laura Méndez | `actions.startDiagnosis` | OT-000001 |
| 08:10 | Ana Ruiz     | `actions.createOrder`    | OT-000001 |

## Validaciones automatizadas

`npm run e2e` recorre las 26 rutas en ambos tamaños de pantalla y verifica:

- Que la vista esperada, el encabezado enfocable y el banner demo aparezcan.
- Que no exista desbordamiento horizontal y el título de la pestaña incluya
  Electrostock.
- Que axe no encuentre infracciones WCAG 2 A/AA, 2.1 A/AA ni 2.2 AA de impacto
  serio o crítico.
- Apertura/cierre del menú móvil con Escape, inicio de sesión y rechazo de
  cuenta inactiva.
- Foco y restauración del foco al abrir/cerrar diálogos de cita y de transición
  de órdenes.
- Reserva de una cita, cuenta regresiva y aparición en el panel del cliente.
- Creación de una orden con ticket QR y seguimiento público sin nombre del
  mecánico ni costos internos.
- Duración de las animaciones limitada a 0.01 ms con `prefers-reduced-motion`.

Última validación: `npm run build` correcto; 5 archivos de pruebas unitarias con
13 pruebas correctas; 32 casos E2E con 31 correctos y 1 omitido porque el menú
colapsable solo existe en móvil (el caso se ejecuta en el proyecto móvil).

## Alcance y limitaciones

- La sesión y los cambios viven en memoria; el interceptor simula respuestas
  `/api/v1` y latencia. No hay persistencia, API ni seguridad de producción.
- Los datos son semilla de demostración. Las contraseñas aparecen aquí y en el
  fixture exclusivamente para que los recorridos locales sean reproducibles.
- La guía de diseño original solicita exportaciones SVG de Figma que no están
  presentes en el proyecto; las ilustraciones son provisionales.
- Las vistas comparten el estado de demostración local; no es una arquitectura
  backend ni debe considerarse una estructura final de producción.
- Los resultados de la auditoría E2E pueden variar por versión del navegador y
  sistema operativo; el comando registra el resultado real y falla ante
  infracciones serias/críticas o aserciones fallidas.

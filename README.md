# Public Transport API — Estado de Transporte Público

## Descripción del proyecto
Una API que proporciona información en tiempo real sobre líneas de transporte, vehículos (buses, trenes, tranvías), horarios, retrasos, ocupación estimada y paradas. Puede ser consumida por aplicaciones de movilidad urbana, sitios web de información de transporte o integraciones de terceros.

El proyecto está diseñado para **backend**, usando Node.js + TypeScript y PostgreSQL, y puede ejecutarse **localmente** sin necesidad de servicios en la nube.

---

## Problema que resuelve
- Falta de información centralizada sobre horarios y estado de transporte público.  
- Usuarios pasan tiempo esperando sin conocer retrasos o incidencias.  
- Autoridades y operadores necesitan un sistema sencillo para exponer datos actualizados.

---

## Valor de negocio
- Mejor experiencia para los usuarios: menos tiempo de espera y planificación eficiente.  
- Transparencia y control de las operaciones de transporte.  
- Integración fácil con apps de movilidad urbana y dashboards de control.

---

## MVP — Funcionalidades mínimas
1. Autenticación básica con JWT para administradores y operadores.  
2. Listado de líneas de transporte y detalles (tipo, rutas, paradas).  
3. Estado en tiempo real de vehículos: ubicación, ocupación, retrasos.  
4. Consulta de próximas llegadas por estación.  
5. Reporte y resolución de incidentes (averías, retrasos, mantenimiento).  

---

## Arquitectura propuesta
- **Backend:** Node.js + TypeScript (NestJS o Express).  
- **Base de datos:** PostgreSQL.  
- **Cache / tareas:** Redis para próximos horarios y vehículos cercanos.  
- **Observabilidad:** logs estructurados, métricas básicas.  
- **Testing:** Jest para unit e integration tests.

---

## Seguridad y autenticación
- JWT + refresh tokens.  
- Roles: `admin`, `operator`, `user`.  
- Rate limiting y validación estricta de inputs.

---

## Esquema de base de datos

### users
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID PK | Identificador único |
| email | varchar unique | Correo del usuario |
| password_hash | varchar | Contraseña en hash |
| username | varchar | Nombre completo |
| role | enum('admin','operator','user') | Rol de usuario |
| created_at | timestamptz | Fecha de creación |
| updated_at | timestamptz | Fecha de actualización |

### lines
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID PK | Identificador de la línea |
| name | varchar | Nombre de la línea (ej. "Línea 10") |
| type | enum('bus','train','tram') | Tipo de transporte |
| route_code | varchar | Código opcional de ruta |
| created_at | timestamptz | Fecha creación |
| updated_at | timestamptz | Fecha actualización |

### stations
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID PK | Identificador de estación |
| line_id | UUID FK | Línea a la que pertenece |
| name | varchar | Nombre de la estación |
| location | geometry(Point,4326) | Coordenadas GPS |
| sequence | int | Orden en la ruta |
| created_at | timestamptz | Fecha creación |
| updated_at | timestamptz | Fecha actualización |

### vehicles
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID PK | Identificador de vehículo |
| line_id | UUID FK | Línea asignada |
| vehicle_code | varchar | Número interno o placa |
| status | enum('active','delayed','out_of_service') | Estado actual |
| last_known_location | geometry(Point,4326) | Ubicación actual |
| occupancy_percentage | numeric | Ocupación estimada |
| updated_at | timestamptz | Última actualización |

### schedules
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID PK | Identificador de horario |
| line_id | UUID FK | Línea correspondiente |
| station_id | UUID FK | Estación de referencia |
| arrival_time | timestamptz | Hora de llegada |
| departure_time | timestamptz | Hora de salida |

### incidents
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID PK | Identificador de incidente |
| line_id | UUID FK | Línea afectada |
| vehicle_id | UUID FK | Vehículo afectado (opcional) |
| type | enum('delay','breakdown','maintenance','accident') | Tipo de incidente |
| description | text | Detalles del incidente |
| reported_at | timestamptz | Fecha reporte |
| resolved_at | timestamptz | Fecha resolución |

---

## Endpoints principales

### Auth
- `POST /api/auth/login` → obtener JWT  
- `POST /api/auth/refresh` → refrescar token  

### Líneas
- `GET /api/lines` → listar todas las líneas  ✅
- `GET /api/lines/:id` → detalle de línea, estaciones y vehículos  ✅
- `POST /api/lines` → crear línea (admin)  ✅🟡
- `PATCH /api/lines/:id` → actualizar línea (admin/operator)  ✅🟡

### Estaciones
- `GET /api/stations/:id` → detalle estación  ✅
- `GET /api/stations?line_id=` → estaciones de una línea   ✅

### Vehículos
- `GET /api/vehicles?line_id=&status=` → filtrar vehículos  ✅
- `GET /api/vehicles/:id` → detalle vehículo  ✅
- `PATCH /api/vehicles/:id` → actualizar estado, ubicación y ocupación  ✅🟡

### Horarios / Próximas llegadas
- `GET /api/schedules?station_id=`  ✅

### Incidentes
- `GET /api/incidents?line_id=&status=open` → incidentes activos  
- `POST /api/incidents` → reportar incidente  ✅
- `PATCH /api/incidents/:id/resolve` → marcar resuelto  

---

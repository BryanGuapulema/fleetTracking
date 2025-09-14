# Public Transport API — Documentación de Endpoints

API para consultar líneas de transporte público, vehículos, estaciones, horarios e incidentes en tiempo real.  

---

## Auth

**POST /api/auth/login**  
Description: Authenticate a user and return JWT.  
Request Body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
Response (200 OK):

json
{
  "access_token": "jwt_token_here",
  "refresh_token": "refresh_token_here",
  "expires_in": 3600
}
POST /api/auth/refresh
Description: Refresh JWT using a valid refresh token.
Request Body:

json
{
  "refresh_token": "refresh_token_here"
}
Response (200 OK):

json
{
  "access_token": "new_jwt_token",
  "expires_in": 3600
}
Lines
GET /api/lines
Description: List all transport lines.
Response (200 OK):

json
[
  {"id": 1, "name": "Line 10", "type": "bus", "route_code": "B10"},
  {"id": 2, "name": "Line 5", "type": "tram", "route_code": "T5"}
]
GET /api/lines/{id}
Description: Get details of a line, including stations and vehicles.
Parameters: id (integer) — Line ID
Response (200 OK):

json
{
  "id": 1,
  "name": "Line 10",
  "type": "bus",
  "route_code": "B10",
  "stations": [
    {"id": 1, "name": "Station A", "lat": 40.7128, "lng": -74.0060},
    {"id": 2, "name": "Station B", "lat": 40.7150, "lng": -74.0100}
  ],
  "vehicles": [
    {"id": 101, "vehicle_code": "BUS-001", "status": "active"}
  ]
}
POST /api/lines
Description: Add a new line (admin only).
Request Body:

json
{
  "name": "Line 15",
  "type": "bus",
  "route_code": "B15"
}
Response (201 Created):

json
{
  "id": 3,
  "name": "Line 15",
  "type": "bus",
  "route_code": "B15"
}
PATCH /api/lines/{id}
Description: Update line information (admin/operator).
Parameters: id (integer) — Line ID
Request Body:

json
{
  "name": "Line 10A",
  "route_code": "B10A"
}
Response (200 OK):

json
{
  "id": 1,
  "name": "Line 10A",
  "type": "bus",
  "route_code": "B10A"
}
Stations
GET /api/stations
Description: List stations, optionally filtered by line.
Query Parameters: line_id (integer, optional)
Response (200 OK):

json
[
  {"id": 1, "line_id": 1, "name": "Station A", "lat": 40.7128, "lng": -74.0060},
  {"id": 2, "line_id": 1, "name": "Station B", "lat": 40.7150, "lng": -74.0100}
]
GET /api/stations/{id}
Description: Get details of a station.
Parameters: id (integer) — Station ID
Response (200 OK):

json
{
  "id": 1,
  "line_id": 1,
  "name": "Station A",
  "lat": 40.7128,
  "lng": -74.0060,
  "sequence": 1
}
Vehicles
GET /api/vehicles
Description: List vehicles, optionally filtered by line or status.
Query Parameters:

line_id (integer, optional)

status (string, optional: active, delayed, out_of_service)
Response (200 OK):

json
[
  {
    "id": 101,
    "vehicle_code": "BUS-001",
    "line_id": 1,
    "status": "active",
    "occupancy_percentage": 65,
    "last_location": {"lat": 40.7128, "lng": -74.0060, "timestamp": "2025-09-13T23:30:00Z"}
  }
]
GET /api/vehicles/{id}
Description: Get vehicle details by ID.
Parameters: id (integer) — Vehicle ID
Response (200 OK):

json
{
  "id": 101,
  "vehicle_code": "BUS-001",
  "line_id": 1,
  "status": "active",
  "occupancy_percentage": 65,
  "last_location": {"lat": 40.7128, "lng": -74.0060, "timestamp": "2025-09-13T23:30:00Z"}
}
PATCH /api/vehicles/{id}
Description: Update vehicle status, location, or occupancy (operator).
Parameters: id (integer) — Vehicle ID
Request Body:

json
{
  "status": "delayed",
  "occupancy_percentage": 70,
  "last_location": {"lat": 40.7150, "lng": -74.0100}
}
Response (200 OK):

json
{
  "id": 101,
  "vehicle_code": "BUS-001",
  "status": "delayed",
  "occupancy_percentage": 70,
  "last_location": {"lat": 40.7150, "lng": -74.0100, "timestamp": "2025-09-13T23:40:00Z"}
}
Schedules
GET /api/schedules
Description: Get upcoming arrivals at a station.
Query Parameters:

station_id (integer, required)

from_time (datetime, optional)

to_time (datetime, optional)
Response (200 OK):

json
[
  {"line_id": 1, "vehicle_id": 101, "arrival_time": "2025-09-13T23:45:00Z", "departure_time": "2025-09-13T23:50:00Z"},
  {"line_id": 1, "vehicle_id": 102, "arrival_time": "2025-09-13T23:55:00Z", "departure_time": "2025-09-14T00:00:00Z"}
]
Incidents
GET /api/incidents
Description: List incidents, optionally filtered by line or status.
Query Parameters:

line_id (integer, optional)

status (string, optional: open, resolved)
Response (200 OK):

json
[
  {"id": 1, "line_id": 1, "vehicle_id": 101, "type": "delay", "description": "Traffic congestion", "reported_at": "2025-09-13T23:20:00Z", "resolved_at": null}
]
POST /api/incidents
Description: Report a new incident (operator/admin).
Request Body:

json
{
  "line_id": 1,
  "vehicle_id": 101,
  "type": "delay",
  "description": "Accident on route"
}
Response (201 Created):

json
{
  "id": 2,
  "line_id": 1,
  "vehicle_id": 101,
  "type": "delay",
  "description": "Accident on route",
  "reported_at": "2025-09-13T23:50:00Z",
  "resolved_at": null
}
PATCH /api/incidents/{id}/resolve
Description: Mark an incident as resolved.
Parameters: id (integer) — Incident ID
Response (200 OK):

json
{
  "id": 2,
  "line_id": 1,
  "vehicle_id": 101,
  "type": "delay",
  "description": "Accident on route",
  "reported_at": "2025-09-13T23:50:00Z",
  "resolved_at": "2025-09-13T23:55:00Z"
}
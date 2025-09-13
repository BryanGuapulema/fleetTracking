# Real-time Fleet Tracking API

This is a backend project for a **fleet tracking platform** aimed at delivery and logistics companies. The API allows registering vehicles and drivers, tracking locations in real-time, managing deliveries, assigning vehicles, generating alerts, and monitoring delivery performance.

This project is built with NodeJS and mongoDB and exposes RESTful endpoints for integration with web or mobile clients.

---

## Technical Specifications

- **Tech stack**
  - Backend: NodeJS (Express or Fastify)
  - Database: mongoDB
  - ORM: mongoose
- **Ports**
  - Backend: 8000

---

## Implementation Details

The backend exposes APIs for managing vehicles, drivers, deliveries, real-time locations, assignments, alerts, and reports.

- **Vehicles**
  - CRUD operations
  - Update status (active, maintenance, out-of-service)
  - Track last known location
- **Drivers**
  - CRUD operations
  - Assign/unassign vehicles
  - View delivery history
- **Deliveries**
  - CRUD operations
  - Track status and current location
- **Assignments**
  - Assign vehicles to drivers dynamically
- **Locations**
  - Update and retrieve vehicle GPS
- **Alerts**
  - Create and view alerts (late delivery, route deviation)
- **Reports**
  - Fleet utilization and delivery performance metrics

---

## Database Tables

- `Vehicles`
- `Drivers`
- `Deliveries`
- `Locations`
- `Companies`
- `Assignments`
- `Alerts`
- `Routes` (optional for future extensions)

---

## API Endpoints (Summary)

- **Vehicles**
  - `GET /api/vehicles` — list all vehicles
  - `GET /api/vehicles/{id}` — vehicle details with driver and location
  - `POST /api/vehicles` — add a new vehicle
  - `PUT /api/vehicles/{id}` — update vehicle info
  - `PATCH /api/vehicles/{id}/status` — update vehicle status
  - `DELETE /api/vehicles/{id}` — delete vehicle
  - `GET /api/vehicles/{id}/deliveries` — list deliveries for a vehicle

- **Drivers**
  - `GET /api/drivers` — list all drivers
  - `GET /api/drivers/{id}` — driver profile
  - `POST /api/drivers` — add new driver
  - `PUT /api/drivers/{id}` — update driver info
  - `GET /api/drivers/{id}/deliveries` — list deliveries for a driver

- **Deliveries**
  - `POST /api/deliveries` — create delivery
  - `GET /api/deliveries/{id}` — get delivery status
  - `PUT /api/deliveries/{id}` — update delivery status

- **Assignments**
  - `POST /api/assignments` — assign vehicle to driver
  - `DELETE /api/assignments/{id}` — unassign vehicle

- **Locations**
  - `POST /api/location` — update vehicle location
  - `GET /api/location/{vehicle_id}` — get last known location

- **Alerts**
  - `POST /api/alerts` — create an alert
  - `GET /api/alerts` — list active alerts

- **Reports**
  - `GET /api/reports/vehicle-utilization` — vehicle usage percentage
  - `GET /api/reports/delivery-performance` — deliveries on-time vs delayed

---
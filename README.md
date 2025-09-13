# Real-time Fleet Tracking API

This is a backend project for a **fleet tracking platform** aimed at delivery companies. The API allows registering vehicles and drivers, tracking locations in real-time, managing deliveries, and monitoring delivery statuses.

This project is built with NodeJS and PostgreSQL and exposes RESTful endpoints for integration with web or mobile clients.

---

## Technical Specifications

- **Tech stack**
  - Backend: NodeJS (Express or Fastify)
  - Database: PostgreSQL
  - ORM: Prisma or TypeORM
- **Ports**
  - Backend: 8000

---

## Implementation Details

The backend exposes APIs that return necessary responses for managing vehicles, drivers, deliveries, and real-time locations.

- **Vehicles**
  - `POST /api/vehicles` — Register a new vehicle
  - `GET /api/vehicles` — Retrieve all vehicles
  - `GET /api/vehicles/{id}` — Retrieve vehicle details including assigned driver
- **Drivers**
  - `POST /api/drivers` — Register a new driver
  - `GET /api/drivers` — List all drivers
  - `GET /api/drivers/{id}` — Retrieve driver profile with current assigned vehicle
- **Deliveries**
  - `POST /api/deliveries` — Create a new delivery
  - `GET /api/deliveries/{id}` — Get delivery status
  - `PUT /api/deliveries/{id}` — Update delivery status
- **Locations**
  - `POST /api/location` — Update vehicle GPS location
  - `GET /api/location/{vehicle_id}` — Retrieve last known location of a vehicle

---

## Database Tables

- `Vehicles`
- `Drivers`
- `Deliveries`
- `Locations`
- `Companies`

---
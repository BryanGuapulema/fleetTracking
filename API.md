GET /api/vehicles/{id}

Description: Get vehicle details by ID.
Parameters: id (integer) — Vehicle ID
Response (200 OK):

{
  "id": 1,
  "license_plate": "ABC123",
  "type": "van",
  "capacity": 1000,
  "company_id": 1,
  "assigned_driver_id": 5,
  "status": "active",
  "last_location": {
    "lat": 40.7128,
    "lng": -74.0060,
    "timestamp": "2025-09-12T14:30:00Z"
  }
}

POST /api/vehicles

Description: Add a new vehicle.
Request Body:

{
  "license_plate": "XYZ789",
  "type": "truck",
  "capacity": 2000,
  "company_id": 1
}


Response (201 Created):

{
  "id": 2,
  "license_plate": "XYZ789",
  "type": "truck",
  "capacity": 2000,
  "company_id": 1,
  "assigned_driver_id": null,
  "status": "active"
}

PUT /api/vehicles/{id}

Description: Update vehicle info.
Request Body:

{
  "capacity": 2200
}


Response (200 OK):

{
  "id": 2,
  "license_plate": "XYZ789",
  "type": "truck",
  "capacity": 2200,
  "company_id": 1,
  "assigned_driver_id": null,
  "status": "active"
}

PATCH /api/vehicles/{id}/status

Description: Update vehicle status (active, maintenance, out-of-service).
Request Body:

{
  "status": "maintenance"
}


Response (200 OK):

{
  "id": 2,
  "status": "maintenance"
}

DELETE /api/vehicles/{id}

Description: Delete a vehicle.
Response (200 OK):

{
  "message": "Vehicle deleted successfully."
}

GET /api/vehicles/{id}/deliveries

Description: List all deliveries associated with a vehicle.
Response (200 OK):

[
  {
    "id": 1,
    "driver_id": 5,
    "destination": "123 Main St, New York, NY",
    "package_details": "10 boxes, 5 kg each",
    "status": "in-progress",
    "created_at": "2025-09-12T14:45:00Z",
    "current_location": {
      "lat": 40.7130,
      "lng": -74.0070,
      "timestamp": "2025-09-12T15:00:00Z"
    }
  }
]

2. Drivers
GET /api/drivers

Description: List all drivers.
Response (200 OK):

[
  {
    "id": 5,
    "name": "John Doe",
    "license_number": "D123456",
    "phone": "+1234567890",
    "assigned_vehicle_id": 1
  }
]

GET /api/drivers/{id}

Description: Get driver profile.
Response (200 OK):

{
  "id": 5,
  "name": "John Doe",
  "license_number": "D123456",
  "phone": "+1234567890",
  "assigned_vehicle_id": 1
}

POST /api/drivers

Description: Add a new driver.
Request Body:

{
  "name": "Jane Smith",
  "license_number": "D654321",
  "phone": "+0987654321",
  "assigned_vehicle_id": 2
}


Response (201 Created):

{
  "id": 6,
  "name": "Jane Smith",
  "license_number": "D654321",
  "phone": "+0987654321",
  "assigned_vehicle_id": 2
}

PUT /api/drivers/{id}

Description: Update driver info.
Request Body:

{
  "phone": "+1112223333",
  "assigned_vehicle_id": 3
}


Response (200 OK):

{
  "id": 6,
  "name": "Jane Smith",
  "license_number": "D654321",
  "phone": "+1112223333",
  "assigned_vehicle_id": 3
}

GET /api/drivers/{id}/deliveries

Description: List all deliveries associated with a driver.
Response (200 OK):

[
  {
    "id": 1,
    "vehicle_id": 1,
    "destination": "123 Main St, New York, NY",
    "package_details": "10 boxes, 5 kg each",
    "status": "in-progress",
    "created_at": "2025-09-12T14:45:00Z",
    "current_location": {
      "lat": 40.7130,
      "lng": -74.0070,
      "timestamp": "2025-09-12T15:00:00Z"
    }
  }
]

3. Deliveries
POST /api/deliveries

Description: Create a new delivery.
Request Body:

{
  "vehicle_id": 1,
  "driver_id": 5,
  "destination": "123 Main St, New York, NY",
  "package_details": "10 boxes, 5 kg each",
  "status": "pending"
}


Response (201 Created):

{
  "id": 1,
  "vehicle_id": 1,
  "driver_id": 5,
  "destination": "123 Main St, New York, NY",
  "package_details": "10 boxes, 5 kg each",
  "status": "pending",
  "created_at": "2025-09-12T14:45:00Z"
}

GET /api/deliveries/{id}

Description: Get delivery details and status.
Response (200 OK):

{
  "id": 1,
  "vehicle_id": 1,
  "driver_id": 5,
  "destination": "123 Main St, New York, NY",
  "package_details": "10 boxes, 5 kg each",
  "status": "in-progress",
  "current_location": {
    "lat": 40.7130,
    "lng": -74.0070,
    "timestamp": "2025-09-12T15:00:00Z"
  }
}

PUT /api/deliveries/{id}

Description: Update delivery status.
Request Body:

{
  "status": "delivered"
}


Response (200 OK):

{
  "id": 1,
  "vehicle_id": 1,
  "driver_id": 5,
  "destination": "123 Main St, New York, NY",
  "package_details": "10 boxes, 5 kg each",
  "status": "delivered"
}

4. Assignments
POST /api/assignments

Description: Assign a vehicle to a driver.
Request Body:

{
  "vehicle_id": 2,
  "driver_id": 6
}


Response (201 Created):

{
  "assignment_id": 1,
  "vehicle_id": 2,
  "driver_id": 6
}

DELETE /api/assignments/{id}

Description: Unassign a vehicle from a driver.
Response (200 OK):

{
  "message": "Assignment removed successfully."
}

5. Locations
POST /api/location

Description: Update vehicle GPS location.
Request Body:

{
  "vehicle_id": 1,
  "lat": 40.7128,
  "lng": -74.0060,
  "timestamp": "2025-09-12T15:00:00Z"
}


Response (201 Created):

{
  "message": "Location updated successfully."
}

GET /api/location/{vehicle_id}

Description: Get last known location of a vehicle.
Response (200 OK):

{
  "vehicle_id": 1,
  "lat": 40.7128,
  "lng": -74.0060,
  "timestamp": "2025-09-12T15:00:00Z"
}

6. Alerts
POST /api/alerts

Description: Create a new alert.
Request Body:

{
  "vehicle_id": 1,
  "type": "late_delivery",
  "message": "Delivery delayed by 15 minutes",
  "priority": "high"
}


Response (201 Created):

{
  "alert_id": 1,
  "vehicle_id": 1,
  "type": "late_delivery",
  "message": "Delivery delayed by 15 minutes",
  "priority": "high",
  "created_at": "2025-09-12T15:05:00Z"
}

GET /api/alerts

Description: List active alerts.
Response (200 OK):

[
  {
    "alert_id": 1

Dijiste:
continua
ChatGPT dijo:
    "vehicle_id": 1,
    "type": "late_delivery",
    "message": "Delivery delayed by 15 minutes",
    "priority": "high",
    "created_at": "2025-09-12T15:05:00Z"
  }
]

7. Reports
GET /api/reports/vehicle-utilization

Description: Get fleet utilization percentages.
Response (200 OK):

[
  {
    "vehicle_id": 1,
    "usage_percentage": 75
  },
  {
    "vehicle_id": 2,
    "usage_percentage": 50
  }
]

GET /api/reports/delivery-performance

Description: Get deliveries on-time vs delayed.
Response (200 OK):

{
  "total_deliveries": 20,
  "on_time": 15,
  "delayed": 5,
  "percentage_on_time": 75
}
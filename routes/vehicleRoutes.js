import { Router } from 'express'
import { VehicleController } from '../Controllers/VehicleController'

export const vehicleRouter = Router()

vehicleRouter.get('/', VehicleController.getAllStations)
vehicleRouter.post('/', VehicleController.addVehicle)
// vehicleRouter.get('/:id', VehicleController.)
// vehicleRouter.put('/:id', VehicleController.)
// vehicleRouter.delete('/:id', VehicleController)

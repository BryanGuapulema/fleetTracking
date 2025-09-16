import { Router } from 'express'
import { VehicleController } from '../Controllers/VehicleController.js'

export const vehicleRouter = Router()

vehicleRouter.get('/', VehicleController.getAllVehicles)
vehicleRouter.post('/', VehicleController.addVehicle)
vehicleRouter.get('/:id', VehicleController.getVehicleById)
vehicleRouter.put('/:id', VehicleController.updateVehicle)
vehicleRouter.delete('/:id', VehicleController.deleteVehicle)

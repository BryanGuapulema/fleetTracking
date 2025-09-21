import { Router } from 'express'
import { VehicleController } from '../Controllers/VehicleController.js'
import { authorizeRoles } from '../middlewares/roleMiddleware.js'

export const vehicleRouter = Router()

vehicleRouter.get('/', authorizeRoles(['admin', 'operator']), VehicleController.getAllVehicles)
vehicleRouter.post('/', authorizeRoles(['admin', 'operator']), VehicleController.addVehicle)
vehicleRouter.get('/:id', authorizeRoles(['admin', 'operator']), VehicleController.getVehicleById)
vehicleRouter.put('/:id', authorizeRoles(['admin', 'operator']), VehicleController.updateVehicle)
vehicleRouter.delete('/:id', authorizeRoles(['admin', 'operator']), VehicleController.deleteVehicle)

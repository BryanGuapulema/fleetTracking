import { Router } from 'express'
import { StationController } from '../Controllers/StationController.js'
import { authorizeRoles } from '../middlewares/roleMiddleware.js'

export const stationRouter = Router()

stationRouter.get('/', authorizeRoles(['admin', 'operator']), StationController.getAllStations)
stationRouter.post('/', authorizeRoles('admin'), StationController.createStation)
stationRouter.get('/:id', authorizeRoles(['admin', 'operator', 'user']), StationController.getStationById)
stationRouter.put('/:id', authorizeRoles('admin'), StationController.updateStation)
stationRouter.delete('/:id', authorizeRoles('admin'), StationController.deleteStation)

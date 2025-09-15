import { Router } from 'express'
import { StationController } from '../Controllers/StationController.js'

export const stationRouter = Router()

stationRouter.get('/', StationController.getAllStations)
stationRouter.post('/', StationController.createStation)

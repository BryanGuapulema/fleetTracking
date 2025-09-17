import express from 'express'

import { corsMiddleware } from '../middlewares/corsMiddleware.js'
import { userRouter } from '../routes/userRoutes.js'
import { lineRouter } from '../routes/lineRoutes.js'
import { stationRouter } from '../routes/stationsRoutes.js'
import { vehicleRouter } from '../routes/vehicleRoutes.js'
import { scheduleRouter } from '../routes/scheduleRoutes.js'
import { incidentRouter } from '../routes/incidentRoutes.js'

export const app = express()

app.disable('x-powered-by')
app.use(corsMiddleware())
app.use(express.json())
app.use('/api/users', userRouter)
app.use('/api/lines', lineRouter)
app.use('/api/stations', stationRouter)
app.use('/api/vehicles', vehicleRouter)
app.use('/api/schedules', scheduleRouter)
app.use('/api/incidents', incidentRouter)

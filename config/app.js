import express from 'express'

import { corsMiddleware } from '../middlewares/corsMiddleware.js'
import { homeRoutes } from '../routes/homeRoutes.js'
import { userRouter } from '../routes/userRoutes.js'
import { lineRouter } from '../routes/lineRoutes.js'

export const app = express()

app.disable('x-powered-by')
app.use(corsMiddleware())
app.use(express.json())
app.use('/api/users', userRouter)
app.use('/api/lines', lineRouter)

app.use(homeRoutes)

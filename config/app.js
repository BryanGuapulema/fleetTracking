import express from 'express'
import cors from 'cors'

import { homeRoutes } from '../routes/homeRoutes.js'
import { userRouter } from '../routes/userRoutes.js'

export const app = express()

app.use(cors())
app.use('/users', userRouter)

app.use(homeRoutes)

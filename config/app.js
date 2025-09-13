import express from 'express'
import { homeRoutes } from '../routes/homeRoutes.js'

export const app = express()

app.use(homeRoutes)

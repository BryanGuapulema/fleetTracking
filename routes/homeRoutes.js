import { Router } from 'express'

export const homeRoutes = Router()

homeRoutes.get('/health', (req, res) => {
  res.json({ message: 'Server working' })
})

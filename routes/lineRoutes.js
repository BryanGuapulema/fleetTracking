import { Router } from 'express'
import { LineController } from '../Controllers/LineController.js'
import { authorizeRoles } from '../middlewares/roleMiddleware.js'

export const lineRouter = Router()

lineRouter.get('/', authorizeRoles('admin'), LineController.getAllLines)
lineRouter.post('/', authorizeRoles(['admin', 'operator']), LineController.createLine)
lineRouter.get('/:id', authorizeRoles('admin'), LineController.getLineById)
lineRouter.put('/:id', authorizeRoles(['admin', 'operator']), LineController.updateLine)
lineRouter.delete('/:id', authorizeRoles('admin'), LineController.deleteLine)

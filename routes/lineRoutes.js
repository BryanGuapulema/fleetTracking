import { Router } from 'express'
import { LineController } from '../Controllers/LineController.js'

export const lineRouter = Router()

lineRouter.get('/', LineController.getAllLines)
lineRouter.post('/', LineController.createLine)
lineRouter.get('/:id', LineController.getLineById)
lineRouter.put('/:id', LineController.updateLine)
lineRouter.delete('/:id', LineController.deleteLine)

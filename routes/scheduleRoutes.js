import { Router } from 'express'
import { ScheduleController } from '../Controllers/ScheduleController.js'
import { authorizeRoles } from '../middlewares/roleMiddleware.js'

export const scheduleRouter = Router()

scheduleRouter.get('/', authorizeRoles(['admin', 'operator']), ScheduleController.getAllSchedules)
scheduleRouter.post('/', authorizeRoles(['admin', 'operator']), ScheduleController.createSchedule)
scheduleRouter.get('/:id', authorizeRoles(['admin', 'operator', 'user']), ScheduleController.getScheduleById)
scheduleRouter.put('/:id', authorizeRoles(['admin', 'operator']), ScheduleController.updateSchedule)
scheduleRouter.delete('/:id', authorizeRoles('admin'), ScheduleController.deleteSchedule)

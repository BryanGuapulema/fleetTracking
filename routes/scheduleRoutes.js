import { Router } from 'express'
import { ScheduleController } from '../Controllers/ScheduleController.js'

export const scheduleRouter = Router()

scheduleRouter.get('/', ScheduleController.getAllSchedules)
scheduleRouter.post('/', ScheduleController.createSchedule)
scheduleRouter.get('/:id', ScheduleController.getScheduleById)
scheduleRouter.put('/:id', ScheduleController.updateSchedule)
scheduleRouter.delete('/:id', ScheduleController.deleteSchedule)

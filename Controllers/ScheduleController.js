import { ScheduleModel } from '../models/ScheduleModel.js'
import { validatePartialSchedule, validateSchedule } from '../validations/ScheduleValidation.js'

export class ScheduleController {
  static async getAllSchedules (req, res) {
    const schedules = await ScheduleModel.getAllSchedules()
    res.json(schedules)
  }

  static async createSchedule (req, res) {
    const result = validateSchedule(req.body)

    if (!result.success) res.status(400).json({ message: JSON.parse(result.error) })

    const newSchedule = await ScheduleModel.createSchedule(result.data)
    return res.status(201).json(newSchedule)
  }

  static async getScheduleById (req, res) {
    const { id } = req.params

    const schedule = await ScheduleModel.getScheduleById(id)

    if (!schedule) return res.status(404).json({ message: 'Schedule not found' })

    return res.json(schedule)
  }

  static async updateSchedule (req, res) {
    const result = validatePartialSchedule(req.body)

    if (!result.success) res.status(400).json({ message: JSON.parse(result.error) })

    const { id } = req.params
    const scheduleUpdated = await ScheduleModel.updateSchedule(id, result.data)
    if (!scheduleUpdated) return res.status(404).json({ message: 'Schedule not found' })
    return res.json(scheduleUpdated)
  }

  static async deleteSchedule (req, res) {
    const { id } = req.params

    const scheduleDeleted = await ScheduleController.deleteSchedule(id)

    if (!scheduleDeleted) return res.status(404).json({ message: 'Schedule not found' })

    return res.json(scheduleDeleted)
  }
}

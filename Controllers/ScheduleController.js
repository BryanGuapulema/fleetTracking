import { ScheduleModel } from '../models/ScheduleModel.js'
import { Schedule } from '../Schemas/scheduleSchema.js'
import { validatePartialSchedule, validateSchedule } from '../validations/ScheduleValidation.js'

export class ScheduleController {
  static async getAllSchedules (req, res) {
    const { station_id } = req.query

    if (station_id) {
      const schedules = await ScheduleModel.getSchedulesforStation(station_id)
      const schedulesFormated = schedules.map(schedule => {
        return {
          id: schedule.id,
          line: schedule.line_id.name,
          departure_time: schedule.departure_time
        }
      })

      return res.json(schedulesFormated)
    }

    const schedules = await ScheduleModel.getAllSchedules()
    return res.json(schedules)
  }

  static async createSchedule (req, res) {
    const result = validateSchedule(req.body)

    if (!result.success) return res.status(400).json({ message: JSON.parse(result.error) })

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

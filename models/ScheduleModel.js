import { Schedule } from '../Schemas/scheduleSchema.js'

export class ScheduleModel {
  static async getAllSchedules () {
    return await Schedule.find()
  }

  static async createSchedule (data) {
    return await Schedule.create(data)
  }

  static async getScheduleById (id) {
    return await Schedule.findById(id)
  }

  static async updateSchedule (id, data) {
    return await Schedule.findByIdAndUpdate(id, data, { new: true })
  }

  static async deleteSchedule (id) {
    return await Schedule.findByIdAndDelete(id)
  }

  static async getSchedulesforStation (station_id) {
    return await Schedule.find({ station_id }).populate('line_id', 'name')
  }
}

import { Station } from '../Schemas/stationsSchema.js'

export class StationModel {
  static async getAllStations () {
    return await Station.find().populate('line_id', 'name')
  }

  static async createStation (data) {
    return await Station.create(data)
  }

  static async getStationById (id) {
    return await Station.findById(id)
  }

  static async updateStation (id, data) {
    return await Station.findByIdAndUpdate(id, data, { new: true })
  }

  static async deleteStation (id) {
    return await Station.findByIdAndDelete(id)
  }

  static async getStationsByLineId (line_id) {
    return await Station.find({ line_id }).populate('line_id', 'name')
  }
}

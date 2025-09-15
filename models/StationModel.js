import { stationSchema } from '../Schemas/stationsSchema.js'
import { model } from 'mongoose'

const Station = model('Station', stationSchema)

export class StationModel {
  static async getAllStations () {
    return await Station.find().populate('line_id', 'name')
  }

  static async createStation (data) {
    return await Station.create(data)
  }
}

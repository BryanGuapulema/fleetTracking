import { StationModel } from '../models/StationModel.js'
import { validateStation } from '../validations/StationValidation.js'

export class StationController {
  static async getAllStations (req, res) {
    const stations = await StationModel.getAllStations()
    res.json(stations)
  }

  static async createStation (req, res) {
    const result = validateStation(req.body)

    if (!result.success) res.status(400).json({ message: JSON.parse(result.error) })

    const newStation = await StationModel.createStation(result.data)
    return res.status(201).json(newStation)
  }
}

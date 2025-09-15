import { StationModel } from '../models/StationModel.js'
import { validatePartialStation, validateStation } from '../validations/StationValidation.js'

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

  static async getStationById (req, res) {
    const { id } = req.params

    const station = await StationModel.getStationById(id)

    if (!station) return res.status(404).json({ message: 'Station not found' })

    return res.json(station)
  }

  static async updateStation (req, res) {
    const result = validatePartialStation(req.body)

    if (!result.success) res.status(400).json({ message: JSON.parse(result.error) })

    const { id } = req.params
    const stationUpdated = await StationModel.updateStation(id, result.data)
    if (!stationUpdated) return res.status(404).json({ message: 'Station not found' })
    return res.json(stationUpdated)
  }

  static async deleteStation (req, res) {
    const { id } = req.params

    const stationDeleted = await StationController.deleteStation(id)

    if (!stationDeleted) return res.status(404).json({ message: 'Station not found' })

    return res.json(stationDeleted)
  }
}

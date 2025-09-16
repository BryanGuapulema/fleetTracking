import { VehicleModel } from '../models/VehicleModel.js'
import { validatePartialVehicle, validateVehicle } from '../validations/VehicleValidation.js'

export class VehicleController {
  static async getAllVehicles (req, res) {
    const vehicles = await VehicleModel.getAllVehicles()
    res.json(vehicles)
  }

  static async addVehicle (req, res) {
    const result = validateVehicle(req.body)
    if (!result.success) return res.status(400).json({ message: JSON.parse(result.error) })

    const newVehicle = await VehicleModel.addVehicle(result.data)
    res.status(201).json(newVehicle)
  }

  static async getVehicleById (req, res) {
    const { id } = req.params

    const vehicle = await VehicleModel.getVehicleById(id)

    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' })

    return res.json(vehicle)
  }

  static async updateVehicle (req, res) {
    const result = validatePartialVehicle(req.body)

    if (!result.success) res.status(400).json({ message: JSON.parse(result.error) })

    const { id } = req.params
    const vehicleUpdated = await VehicleModel.updateVehicle(id, result.data)
    if (!vehicleUpdated) return res.status(404).json({ message: 'Vehicle not found' })
    return res.json(vehicleUpdated)
  }

  static async deleteVehicle (req, res) {
    const { id } = req.params

    const vehicleDeleted = await VehicleController.deleteVehicle(id)

    if (!vehicleDeleted) return res.status(404).json({ message: 'Vehicle not found' })

    return res.json(vehicleDeleted)
  }
}

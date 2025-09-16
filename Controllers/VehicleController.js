import { VehicleModel } from '../models/VehicleModel.js'
import { validateVehicle } from '../validations/VehicleValidation'

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
}

import { Vehicle } from '../Schemas/vehicleSchema.js'

export class VehicleModel {
  static async getAllVehicles () {
    return await Vehicle.find()
  }

  static async addVehicle (data) {
    return await Vehicle.create(data)
  }

  static async getVehicleById (id) {
    return await Vehicle.findById(id)
  }

  static async updateVehicle (id, data) {
    return await Vehicle.findByIdAndUpdate(id, data, { new: true })
  }

  static async deleteVehicle (id) {
    return await Vehicle.findByIdAndDelete(id)
  }
}

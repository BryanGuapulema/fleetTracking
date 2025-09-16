import { model } from 'mongoose'

import { VehicleSchema } from '../Schemas/vehicleSchema.js'

const Vehicle = model('Vehicle', VehicleSchema)

export class VehicleModel {
  static async getAllVehicles () {
    return await Vehicle.find()
  }

  static async addVehicle (data) {
    return await Vehicle.create(data)
  }
}

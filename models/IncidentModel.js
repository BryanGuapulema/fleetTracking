import { Incident } from '../Schemas/incidentSchema.js'

export class IncidentModel {
  static async getAllIncidents () {
    return await Incident.find()
  }

  static async createIncident (data) {
    return await Incident.create(data)
  }

  static async getIncidentById (id) {
    return await Incident.findById(id)
  }

  static async updateIncident (id, data) {
    return await Incident.findByIdAndUpdate(id, data, { new: true })
  }

  static async deleteIncident (id) {
    return await Incident.findByIdAndDelete(id)
  }
}

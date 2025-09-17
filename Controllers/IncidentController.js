import { IncidentModel } from '../models/IncidentModel.js'
import { validatePartialIncident, validateIncident } from '../validations/IncidentValidation.js'

export class IncidentController {
  static async getAllIncidents (req, res) {
    const Incidents = await IncidentModel.getAllIncidents()
    res.json(Incidents)
  }

  static async createIncident (req, res) {
    const result = validateIncident(req.body)

    if (!result.success) res.status(400).json({ message: JSON.parse(result.error) })

    const newIncident = await IncidentModel.createIncident(result.data)
    return res.status(201).json(newIncident)
  }

  static async getIncidentById (req, res) {
    const { id } = req.params

    const incident = await IncidentModel.getIncidentById(id)

    if (!incident) return res.status(404).json({ message: 'Incident not found' })

    return res.json(incident)
  }

  static async updateIncident (req, res) {
    const result = validatePartialIncident(req.body)

    if (!result.success) res.status(400).json({ message: JSON.parse(result.error) })

    const { id } = req.params
    const incidentUpdated = await IncidentModel.updateIncident(id, result.data)
    if (!incidentUpdated) return res.status(404).json({ message: 'Incident not found' })
    return res.json(incidentUpdated)
  }

  static async deleteIncident (req, res) {
    const { id } = req.params

    const incidentDeleted = await IncidentController.deleteIncident(id)

    if (!incidentDeleted) return res.status(404).json({ message: 'Incident not found' })

    return res.json(incidentDeleted)
  }
}

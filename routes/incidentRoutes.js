import { Router } from 'express'
import { IncidentController } from '../Controllers/IncidentController.js'

export const incidentRouter = Router()

incidentRouter.get('/', IncidentController.getAllIncidents)
incidentRouter.post('/', IncidentController.createIncident)
incidentRouter.get('/:id', IncidentController.getIncidentById)
incidentRouter.put('/:id', IncidentController.updateIncident)
incidentRouter.delete('/:id', IncidentController.deleteIncident)

import { Router } from 'express'
import { IncidentController } from '../Controllers/IncidentController.js'
import { authorizeRoles } from '../middlewares/roleMiddleware.js'

export const incidentRouter = Router()

incidentRouter.get('/', authorizeRoles('admin'), IncidentController.getAllIncidents)
incidentRouter.post('/', authorizeRoles(['admin', 'operator']), IncidentController.createIncident)
incidentRouter.get('/:id', authorizeRoles(['admin', 'operator', 'user']), IncidentController.getIncidentById)
incidentRouter.put('/:id', authorizeRoles(['admin', 'operator']), IncidentController.updateIncident)
incidentRouter.delete('/:id', authorizeRoles(['admin', 'operator']), IncidentController.deleteIncident)
incidentRouter.patch('/:id/resolve', authorizeRoles(['admin', 'operator']), IncidentController.resolveIncident)

import z from 'zod'

const incidentSchema = z.object({

  line_id: z.string().length(24),
  vehicle_id: z.string().length(24),
  type: z.enum(['delay', 'breakdown', 'maintenance', 'accident']),
  description: z.string().min(1),
  resolved_at: z.iso.datetime()
})

export function validateIncident (object) {
  return incidentSchema.safeParse(object)
}

export function validatePartialIncident (object) {
  return incidentSchema.partial().safeParse(object)
}

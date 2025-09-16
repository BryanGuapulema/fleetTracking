import z from 'zod'

const vehicleSchema = z.object({
  line_id: z.string().length(24),
  vehicle_code: z.string().trim(),
  status: z.enum(['active', 'delayed', 'out_of_service']),
  last_known_location: z.number(),
  occupancy_percentage: z.number()
})

export function validateVehicle (object) {
  return vehicleSchema.safeParse(object)
}

export function validatePartialVehicle (object) {
  return vehicleSchema.partial().safeParse(object)
}

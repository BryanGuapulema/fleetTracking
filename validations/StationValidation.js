import z from 'zod'

const stationSchema = z.object({
  line_id: z.string().length(24),
  name: z.string().min(1),
  location: z.array(
    z.number()
  ).length(2),
  sequence: z.number().int().positive()
})

export function validateStation (object) {
  return stationSchema.safeParse(object)
}

export function validatePartialStation (object) {
  return stationSchema.partial().safeParse(object)
}

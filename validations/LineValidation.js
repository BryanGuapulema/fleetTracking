import z from 'zod'

const lineSchema = z.object({
  name: z.string().min(1),
  route_code: z.string().min(1).max(3)
})

export function validateLine (object) {
  return lineSchema.safeParse(object)
}

export function validatePartialLine (object) {
  return lineSchema.partial().safeParse(object)
}

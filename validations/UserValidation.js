import z from 'zod'

const userSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  username: z.string().min(1)
})

export function validateUser (object) {
  return userSchema.safeParse(object)
}

export function validatePartialUser (object) {
  return userSchema.partial().safeParse(object)
}

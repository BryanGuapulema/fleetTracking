import z from 'zod'

const scheduleSchema = z.object({

  line_id: z.string().length(24),
  station_id: z.string().length(24),
  arrival_time: z.iso.time(),
  departure_time: z.iso.time()
})

export function validateSchedule (object) {
  return scheduleSchema.safeParse(object)
}

export function validatePartialSchedule (object) {
  return scheduleSchema.partial().safeParse(object)
}

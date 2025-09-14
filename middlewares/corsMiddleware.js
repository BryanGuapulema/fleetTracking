import cors from 'cors'

const ACCEPTEDORIGINS = [
  'http:localhost:80',
  'http:localhost:8080',
  'http:localhost:3000'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTEDORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin)) return callback(null, true)

    if (!origin) return callback(null, true)

    return callback(new Error('Not allowed by cors'))
  }
})

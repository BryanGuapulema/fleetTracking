import { app } from './config/app.js'
import { connectDB } from './config/db.js'

const PORT = process.env.PORT ?? 8000

connectDB()

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})

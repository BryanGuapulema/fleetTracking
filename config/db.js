import mongoose from 'mongoose'
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/trasnportationDB'

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('✅ Conectado a la base de datos exitosamente')
  } catch (error) {
    console.log('Error connectando a la base de datos: ', error)
    process.exit(1)
  }
}

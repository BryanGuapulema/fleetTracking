import mongoose from 'mongoose'

export const connectDB = mongoose.connect('mongodb://localhost:27017/', {
  dbName: 'fleet'
}).then(console.log('Base de datos conectada'))
  .catch(console.log('Error'))

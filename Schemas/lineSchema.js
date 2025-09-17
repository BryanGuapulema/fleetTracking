import mongoose from 'mongoose'

const lineSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  type: {
    type: String,
    enum: ['bus', 'train', 'tram'],
    default: 'bus'
  },
  route_code: {
    type: String,
    unique: true,
    required: true
  }
},
{
  timestamps: true
})

export const Line = mongoose.model('Line', lineSchema)

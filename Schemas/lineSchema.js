import mongoose from 'mongoose'

export const lineSchema = new mongoose.Schema({
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

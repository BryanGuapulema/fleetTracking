import mongoose from 'mongoose'

const VehicleSchema = new mongoose.Schema({
  line_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Line',
    required: true
  },
  vehicle_code: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['active', 'delayed', 'out_of_service'],
    default: 'active'
  },
  last_known_location: {
    type: [Number],
    required: true
  },
  occupancy_percentage: {
    type: Number,
    default: '20'
  }
}, {
  timestamps: true
})

export const Vehicle = mongoose.model('Vehicle', VehicleSchema)

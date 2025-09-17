import mongoose, { Schema } from 'mongoose'

const IncidentSchema = new Schema({
  line_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Line',
    required: true
  },
  vehicle_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  type: {
    type: String,
    enum: ['delay', 'breakdown', 'maintenance', 'accident'],
    default: 'delay'
  },
  description: {
    type: String
  },
  reported_at: {
    type: Date,
    default: Date.now,
    required: true
  },
  resolved_at: {
    type: Date,
    required: true
  }
},
{
  timestamps: true
})

export const Incident = mongoose.model('Incident', IncidentSchema)

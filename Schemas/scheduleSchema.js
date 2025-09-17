import mongoose, { Schema } from 'mongoose'

const ScheduleSchema = new Schema({
  line_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Line',
    required: true
  },
  station_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Station',
    required: true
  },
  arrival_time: {
    type: String,
    required: true
  },
  departure_time: {
    type: String,
    required: true
  }
},
{
  timestamps: true
})

export const Schedule = mongoose.model('Schedule', ScheduleSchema)

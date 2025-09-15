import mongoose, { Schema } from 'mongoose'

export const stationSchema = new Schema({
  line_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Line',
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: [Number], // Array [longitude, latitude]
    required: true
  },
  sequence: {
    type: Number,
    required: true
  }
},
{ timestamps: true })

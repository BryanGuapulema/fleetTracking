import mongoose, { Schema } from 'mongoose'

const GeoSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    default: 'Point'
  },
  coordinates: {
    type: [Number], // Array [longitude, latitude]
    required: true,
    index: '2dsphere'
  }
})

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
    type: GeoSchema,
    required: true
  },
  sequence: {
    type: Number,
    required: true
  }
},
{ timestamps: true })

import mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password_hash: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  role: {
    role: {
      type: String,
      enum: ['admin', 'operator', 'user'],
      default: 'user'
    }
  }
}, {
  timestamps: true
})

import mongoose from 'mongoose'
import { UserSchema } from '../Schemas/userSchema.js'

const User = mongoose.model('User', UserSchema)

export class UserModel {
  static async getAllUsers () {
    return await User.find()
  }

  static async createNewUser (data) {
    return await User.create(data)
  }
}

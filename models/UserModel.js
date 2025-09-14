import mongoose from 'mongoose'
import { UserSchema } from '../Schemas/userSchema'

const User = mongoose.model('User', UserSchema)

export class UserModel {
  static async getAllUsers () {
    return await User.find()
  }
}

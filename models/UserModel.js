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

  static async getUserById (id) {
    return await User.findById(id)
  }

  static async updateUser (id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true })
  }

  static async deleteUser (id) {
    return await User.findByIdAndDelete(id)
  }

  static async getUserByEmail (email) {
    return await User.findOne({ email })
  }
}

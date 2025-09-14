import { UserModel } from '../models/userModel.js'
import { validateUser } from '../validations/UserValidation.js'
import bcrypt from 'bcrypt'

export class UserController {
  static async getAllUsers (req, res) {
    const users = await UserModel.getAllUsers()
    res.json(users)
  }

  static async createNewUser (req, res) {
    const result = validateUser(req.body)

    if (!result.success) return res.status(400).json({ message: JSON.parse(result.error) })

    const { email, password, username } = result.data

    const passwordHashed = await bcrypt.hash(password, 10)

    try {
      const newUser = await UserModel.createNewUser({ email, password: passwordHashed, username })
      return res.status(201).json(newUser)
    } catch (error) {
      res.status(400).json({ message: error })
    }
  }
}

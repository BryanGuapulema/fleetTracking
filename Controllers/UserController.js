import { UserModel } from '../models/userModel.js'
import { validatePartialUser, validateUser } from '../validations/UserValidation.js'
import bcrypt from 'bcrypt'

export class UserController {
  static async getAllUsers (req, res) {
    const users = await UserModel.getAllUsers()
    return res.json(users)
  }

  static async createNewUser (req, res) {
    const result = validateUser(req.body)

    if (!result.success) return res.status(400).json({ message: JSON.parse(result.error) })

    const { password } = result.data

    const passwordHashed = await bcrypt.hash(password, 10)

    const data = { ...result.data, password: passwordHashed }

    const newUser = await UserModel.createNewUser(data)
    return res.status(201).json(newUser)
  }

  static async getUserById (req, res) {
    const { id } = req.params
    const user = await UserModel.getUserById(id)

    if (!user) return res.status(404).json({ message: 'User not found' })
    return res.json(user)
  }

  static async updateUser (req, res) {
    const result = validatePartialUser(req.body)

    if (!result.success) return res.status(400).json({ message: JSON.parse(result.error) })

    const { id } = req.params
    const userUpdated = await UserModel.updateUser(id, result.data)
    if (!userUpdated) return res.status(404).json({ message: 'User not found' })
    return res.json(userUpdated)
  }

  static async deleteUser (req, res) {
    const { id } = req.params
    const userDeleted = await UserModel.deleteUser(id)

    if (!userDeleted) return res.status(404).json({ message: 'User not found' })
    return res.json(userDeleted)
  }
}

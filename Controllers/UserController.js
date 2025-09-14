import { UserModel } from '../models/userModel'

export class UserController {
  static async getAllUsers (req, res) {
    const users = await UserModel.getAllUsers()
    res.json(users)
  }
}

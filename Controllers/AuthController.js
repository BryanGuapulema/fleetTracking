import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/config.js'
import { UserModel } from '../models/userModel.js'
import { validatePartialUser, validateUser } from '../validations/UserValidation.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class AuthController {
  static async register (req, res) {
    const result = validateUser(req.body)

    if (!result.success) return res.status(400).json({ message: JSON.parse(result.error) })

    const { username, email, password } = result.data

    const isUsernameUsed = await UserModel.isUsernameUsed(username)
    if (isUsernameUsed) return res.status(400).json({ error: 'User already exists' })

    const isEmailUsed = await UserModel.isEmailUsed(email)
    if (isEmailUsed) return res.status(400).json({ error: 'Email is already in use' })

    const hashedPassword = await bcrypt.hash(password, 10)

    const data = {
      ...result.data,
      password: hashedPassword
    }

    const newUser = await UserModel.createNewUser(data)
    const publicUser = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email
    }
    return res.status(201).json(publicUser)
  }

  static async login (req, res) {
    try {
      const result = validatePartialUser(req.body)

      if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error) })
      }

      const { username, password } = result.data

      const user = await UserModel.findByUsername(username)
      if (!user) return res.status(400).json({ error: 'User doesn\'t exists' })

      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) return res.status(400).json({ error: 'password is invalid' })

      // JWT access token creation
      const accessToken = jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        JWT_SECRET,
        {
          expiresIn: JWT_EXPIRES_IN
        })

      // JWT refresh token creation
      const refreshToken = jwt.sign(
        { id: user._id, username: user.username },
        JWT_SECRET,
        { expiresIn: '7d' }
      )

      // jwt sent by a cookie
      res
        .cookie('access_token', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60 // 1h
        })
        .cookie('refresh_token', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60 * 24 * 7 // 7d
        })
        .json(user)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  static async logout (req, res) {
    res
      .clearCookie('access_token')
      .clearCookie('refresh_token')
      .json({ message: 'Log out succesful' })
  }

  static async refresh (req, res) {
    try {
      const refreshToken = req.cookies.refresh_token
      if (!refreshToken) {
        return res.status(401).json({ error: 'No refresh token provided' })
      }

      jwt.verify(refreshToken, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired refresh token' })

        // new access token
        const newAccessToken = jwt.sign(
          { id: decoded.id, username: decoded.username, role: decoded.role },
          JWT_SECRET,
          { expiresIn: JWT_EXPIRES_IN }
        )

        res.cookie('access_token', newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60 // 1h
        }).json({ access_token: newAccessToken })
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static async me (req, res) {
    const { user } = req.session

    res.json(user)
  }
}

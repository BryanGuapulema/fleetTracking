import { Router } from 'express'
import { UserController } from '../Controllers/UserController.js'

export const userRouter = Router()

userRouter.get('/', UserController.getAllUsers)
userRouter.post('/', UserController.createNewUser)

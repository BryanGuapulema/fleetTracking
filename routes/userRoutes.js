import { Router } from 'express'
import { UserController } from '../Controllers/UserController'

export const userRouter = Router()

userRouter.get('/', UserController.getAllUsers)

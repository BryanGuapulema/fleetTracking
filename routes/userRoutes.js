import { Router } from 'express'
import { UserController } from '../Controllers/UserController.js'

export const userRouter = Router()

userRouter.get('/', UserController.getAllUsers)
userRouter.post('/', UserController.createNewUser)
userRouter.get('/:id', UserController.getUserById)
userRouter.put('/:id', UserController.updateUser)
userRouter.delete('/:id', UserController.deleteUser)

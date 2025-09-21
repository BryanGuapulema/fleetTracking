import { Router } from 'express'
import { UserController } from '../Controllers/UserController.js'
import { authorizeRoles } from '../middlewares/roleMiddleware.js'

export const userRouter = Router()

userRouter.get('/', authorizeRoles('admin'), UserController.getAllUsers)
userRouter.get('/:id', authorizeRoles('admin'), UserController.getUserById)
userRouter.post('/', authorizeRoles('admin'), UserController.createNewUser)
userRouter.put('/:id', authorizeRoles('admin'), UserController.updateUser)
userRouter.delete('/:id', authorizeRoles('admin'), UserController.deleteUser)

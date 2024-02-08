import Router from 'express'
import { signUpUser } from '../controllers/userController'

const userRouter = Router()

userRouter.post('/signup', signUpUser)

export default userRouter

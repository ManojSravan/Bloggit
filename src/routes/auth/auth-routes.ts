import express from 'express'
import AuthService from '../../services/auth/auth-service'
const authRouter = express.Router()
const authService=new AuthService()
// Register User
authRouter.post('/register',authService.userRegistration  )

// Login User
authRouter.post('/login', authService.userLogin)

export default authRouter

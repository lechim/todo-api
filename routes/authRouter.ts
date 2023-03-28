import AuthLogin from '../controllers/auth/login'
import express from 'express'
import AuthRegister from '../controllers/auth/register'

const authRoutes = express.Router()

authRoutes.post('/login', AuthLogin)
authRoutes.post('/register', AuthRegister)

export default authRoutes

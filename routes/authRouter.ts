import AuthLogin from '../controllers/auth/login'
import express from 'express'
import AuthRegister from '../controllers/auth/register'
import AuthRefresh from '../controllers/auth/refresh'

const authRoutes = express.Router()

authRoutes.post('/login', AuthLogin)
authRoutes.post('/register', AuthRegister)
authRoutes.post('/refresh', AuthRefresh)

export default authRoutes

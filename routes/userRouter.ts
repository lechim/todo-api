import express from 'express'
import GetUser from '../controllers/user/getUser'

const userRoutes = express.Router()

userRoutes.get('/', GetUser)

export default userRoutes

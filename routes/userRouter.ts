import UserAccount from '../controllers/user/getUser'
import express from 'express'

const userRoutes = express.Router()

userRoutes.get('/account', UserAccount)

export default userRoutes

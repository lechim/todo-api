import express, { Express, Request, Response } from 'express'
import { verifyJWT } from './middleware/verifyJWT'
import authRoutes from './routes/authRouter'
import todoRoutes from './routes/todoRouter'
import userRoutes from './routes/userRouter'
import cookieParser from 'cookie-parser'

const app: Express = express()
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
	res.send('Todo API')
})

app.use('/auth', authRoutes)

app.use(verifyJWT)
/////all routes below are auth protected/////////////////////////////////////////////////////////////////

app.use('/todo', todoRoutes)

app.use('/user', userRoutes)

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`)
})

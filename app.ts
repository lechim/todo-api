import express, { Express, Request, Response } from 'express'
import { verifyJWT } from './middleware/verifyJWT'
import authRoutes from './routes/authRouter'
import todoRoutes from './routes/todoRouter'
import userRoutes from './routes/userRouter'

const app: Express = express()
const port = process.env.PORT || 3001

app.get('/', (req: Request, res: Response) => {
	res.send('Todo API')
})

app.use('/auth', authRoutes)

app.use(verifyJWT)

app.use('/todo', todoRoutes)

app.use('/user', userRoutes)

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`)
})

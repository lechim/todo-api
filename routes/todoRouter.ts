import CreateTodo from '../controllers/todo/createTodo'
import DeleteTodo from '../controllers/todo/deleteTodo'
import GetTodo from '../controllers/todo/getTodo'
import ListTodo from '../controllers/todo/listTodo'
import UpdateTodo from '../controllers/todo/updateTodo'
import express from 'express'

const todoRoutes = express.Router()

todoRoutes.get('/:id', GetTodo)
todoRoutes.get('/', ListTodo)
todoRoutes.post('/', CreateTodo)
todoRoutes.put('/:id', UpdateTodo)
todoRoutes.delete('/:id', DeleteTodo)

export default todoRoutes

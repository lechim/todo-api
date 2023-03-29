import { Request, Response } from 'express'
import { RequestWithUser } from 'types/request'
import prisma from '../../utils/prisma'

const ListTodo = async (req: Request, res: Response) => {
	const requestUser = (req as RequestWithUser).user

	try {
		const todos = await prisma.todo.findMany({
			where: {
				userId: requestUser.id,
				isDeleted: false,
			},
			select: {
				id: true,
				completed: true,
				description: true,
				title: true,
				updatedAt: true,
				createdAt: true,
			},
		})

		return res.status(200).json({ todos: todos })
	} catch (e) {
		return res.status(500).json({ msg: 'Something went wrong, please retry.' })
	}
}

export default ListTodo

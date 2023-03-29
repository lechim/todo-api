import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { RequestWithUser } from 'types/request'
import prisma from '../../utils/prisma'

const GetTodo = async (req: Request, res: Response) => {
	const requestUser = (req as RequestWithUser).user
	const todoId = req.params.id

	try {
		const newTodo = await prisma.todo.findFirst({
			where: {
				id: todoId,
				isDeleted: false,
				userId: requestUser.id,
			},
			select: {
				id: true,
				description: true,
				title: true,
				completed: true,
				createdAt: true,
				updatedAt: true,
			},
		})

		if (newTodo) {
			return res.status(200).json({ todo: newTodo })
		} else {
			return res.status(404).json({ message: 'Todo not found' })
		}
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			switch (e.code) {
				case 'P2025':
					return res.status(404).json({ message: 'Todo Item with ID does not exists.' })
			}
		}
		return res.status(500).json({ msg: 'Something went wrong, please retry.' })
	}
}

export default GetTodo

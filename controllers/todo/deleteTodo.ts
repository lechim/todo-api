import { Request, Response } from 'express'
import { RequestWithUser } from 'types/request'
import prisma from '../../utils/prisma'
import { Prisma } from '@prisma/client'

const DeleteTodo = async (req: Request, res: Response) => {
	const requestUser = (req as RequestWithUser).user
	const todoId = req.params.id

	try {
		const canDelete = await prisma.todo.findFirst({
			where: {
				id: todoId,
				userId: requestUser.id,
				isDeleted: false,
			},
			select: {
				id: true,
			},
		})

		if (!canDelete) {
			return res.status(403).json({ msg: 'User cannot delete this todo' })
		}

		const deletedTodo = await prisma.todo.update({
			where: {
				id: todoId,
			},
			data: {
				isDeleted: true,
			},
			select: {
				id: true,
			},
		})

		return res.status(200).json({ todo: deletedTodo, message: 'Todo deleted successfully' })
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

export default DeleteTodo

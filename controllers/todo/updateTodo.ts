import { Request, Response } from 'express'
import { RequestWithUser } from 'types/request'
import prisma from '../../utils/prisma'
import { z } from 'zod'
import { Prisma } from '@prisma/client'

const UpdateTodo = async (req: Request, res: Response) => {
	const requestUser = (req as RequestWithUser).user
	const todoId = req.params.id

	const schema = z.object({
		title: z.string().min(1, 'Please enter the Title'),
		description: z.string().min(1, 'Please enter the Description'),
		completed: z.boolean({
			required_error: 'completed is required',
			invalid_type_error: 'completed must be a boolean',
		}),
	})

	type InputType = z.infer<typeof schema>

	try {
		try {
			schema.parse(req.body)
		} catch (err) {
			if (err instanceof z.ZodError) {
				return res.status(400).json({ message: 'Incorrect parameters', errors: err.errors })
			}
			return res.status(400).json({ message: 'Incorrect parameters' })
		}

		const { title, description, completed } = req.body as InputType

		const canUpdate = await prisma.todo.findFirst({
			where: {
				id: todoId,
				userId: requestUser.id,
				isDeleted: false,
			},
			select: {
				id: true,
			},
		})

		if (!canUpdate) {
			return res.status(403).json({ msg: 'User cannot update this todo' })
		}

		const updatedTodo = await prisma.todo.update({
			where: {
				id: todoId,
			},
			data: {
				title: title,
				description: description,
				completed: completed,
			},
			select: {
				id: true,
			},
		})

		return res.status(200).json({ todo: updatedTodo, message: 'Todo updated successfully' })
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

export default UpdateTodo

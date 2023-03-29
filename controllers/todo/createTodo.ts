import { Request, Response } from 'express'
import { RequestWithUser } from 'types/request'
import prisma from '../../utils/prisma'
import { z } from 'zod'

const CreateTodo = async (req: Request, res: Response) => {
	const requestUser = (req as RequestWithUser).user

	const schema = z.object({
		title: z.string().min(1, 'Please enter the Title'),
		description: z.string().min(1, 'Please enter the Description'),
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

		const { title, description } = req.body as InputType

		const newTodo = await prisma.todo.create({
			data: {
				description: description,
				title: title,
				userId: requestUser.id,
			},
			select: {
				id: true,
			},
		})

		return res.status(201).json({ todo: newTodo, message: 'Todo created successfully' })
	} catch (e) {
		return res.status(500).json({ msg: 'Something went wrong, please retry.' })
	}
}

export default CreateTodo

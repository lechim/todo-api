import { Request, Response } from 'express'
import prisma from '../../utils/prisma'
import bcrypt from 'bcrypt'
import { z } from 'zod'
import { Prisma } from '@prisma/client'

const AuthRegister = async (req: Request, res: Response) => {
	const schema = z.object({
		email: z.string().email('Enter a valid email address'),
		password: z.string().min(2),
	})

	type InputType = z.infer<typeof schema>

	try {
		try {
			schema.parse(req.body)
		} catch (err) {
			return res.status(400).json({ message: 'Incorrect parameters' })
		}

		const { email, password } = req.body as InputType

		const hashedPassword = await bcrypt.hash(password, 10)

		try {
			await prisma.user.create({
				data: {
					username: email,
					password: hashedPassword,
				},
			})
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') {
					return res.status(409).json({ msg: 'Username already exists.' })
				}
			}
			return res.status(500).json({ msg: 'Something went wrong, please retry.' })
		}

		return res.status(201).json({ msg: 'Register successful, please login.' })
	} catch (e) {
		return res.status(500).json({ msg: 'Something went wrong, please retry.' })
	}
}

export default AuthRegister

import { Request, Response } from 'express'
import prisma from '../../utils/prisma'
import bcrypt from 'bcrypt'
import { z } from 'zod'
import { createAccessToken } from '../../utils/createTokens'

const AuthLogin = async (req: Request, res: Response) => {
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

		let user
		try {
			user = await prisma.user.findFirst({
				where: {
					username: email,
				},
				select: {
					password: true,
					id: true,
				},
			})
		} catch (e) {
			return res.status(500).json({ msg: 'Something went wrong, please retry.' })
		}

		if (user === null) return res.status(401).json({ msg: 'You have entered an invalid email or password.' })

		const passwordMatch = await bcrypt.compare(password, user.password)

		if (!passwordMatch) return res.status(401).json({ msg: 'You have entered an invalid email or password.' })

		const accessToken = createAccessToken(user.id)

		//Todo add refresh token

		return res.status(201).json({ token: accessToken, msg: 'Sign in successful.' })
	} catch (e) {
		return res.status(500).json({ msg: 'Something went wrong, please retry.' })
	}
}

export default AuthLogin

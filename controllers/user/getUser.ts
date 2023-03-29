import { Request, Response } from 'express'
import { RequestWithUser } from 'types/request'
import prisma from '../../utils/prisma'

const UserAccount = async (req: Request, res: Response) => {
	const requestUser = (req as RequestWithUser).user

	try {
		const user = await prisma.user.findFirst({
			where: {
				id: requestUser.id,
			},
			select: {
				id: true,
				username: true,
				createdAt: true,
			},
		})

		res.status(201).json({ user: user })
	} catch (e) {
		res.status(500).json({ msg: 'Something went wrong, please retry.' })
	}
}

export default UserAccount

import { Request, Response } from 'express'
import prisma from '../../utils/prisma'
import { createAccessToken } from '../../utils/createTokens'

const AuthRefresh = async (req: Request, res: Response) => {
	try {
		const cookies = req.cookies
		if (!cookies?.jwt) return res.status(401).json({ msg: 'Unauthorized.' })
		const refreshToken = cookies.jwt

		let tokenUser
		try {
			tokenUser = await prisma.refreshToken.findFirst({
				where: {
					token: refreshToken,
				},
				select: {
					user: {
						select: {
							password: true,
							username: true,
							id: true,
						},
					},
					token: true,
					id: true,
				},
			})
		} catch (e) {
			return res.status(500).json({ msg: 'Something went wrong, please retry.' })
		}
		if (tokenUser === null) {
			return res.status(403).json({ msg: 'Forbidden.' })
		}

		const accessToken = createAccessToken(tokenUser.user.id, tokenUser.user.username)

		return res.status(201).json({ token: accessToken, msg: 'Token refresh successful.' })
	} catch (e) {
		return res.status(500).json({ msg: 'Something went wrong, please retry.' })
	}
}

export default AuthRefresh

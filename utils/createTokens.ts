import jwt from 'jsonwebtoken'

export type UserAccessTokenType = {
	user: {
		id: string
	}
}

export const createAccessToken = (id: string) => {
	return jwt.sign(
		{
			user: {
				id: id,
			},
		} as UserAccessTokenType,
		process.env.accessTokenSecret as string,
		{ expiresIn: '1h' }
	)
}

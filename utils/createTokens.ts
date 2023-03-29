import jwt from 'jsonwebtoken'

export type UserAccessTokenType = {
	user: {
		id: string
		username: string
	}
}

export type UserRefreshTokenType = {
	user: {
		id: string
	}
}

export const createAccessToken = (id: string, username: string) => {
	return jwt.sign(
		{
			user: {
				id: id,
				username: username,
			},
		} as UserAccessTokenType,
		process.env.accessTokenSecret as string,
		{ expiresIn: '5m' }
	)
}

export const createRefreshToken = (id: string) => {
	return jwt.sign(
		{
			user: {
				id: id,
			},
		} as UserRefreshTokenType,
		process.env.refreshTokenSecret as string,
		{ expiresIn: '1d' }
	)
}

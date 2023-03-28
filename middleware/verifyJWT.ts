import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { RequestWithUser } from '@/types/request'

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization']
	if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)
	const token = authHeader.split(' ')[1]
	jwt.verify(token, process.env.accessTokenSecret as string, (err, decoded: any) => {
		if (err) return res.sendStatus(403)
		;(req as RequestWithUser).user = decoded.user
		next()
	})
}

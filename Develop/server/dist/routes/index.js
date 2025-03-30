import { Router } from 'express';
import jwt from 'jsonwebtoken';
const router = Router();
export function localAuthenticateToken(req, res, next) {
    const token = req.get('authorization')?.split(' ')[1];
    if (!token) {
        res.status(401).send('Access Denied');
        return;
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if (typeof verified === 'object' && verified !== null && 'username' in verified) {
            req.user = verified;
        }
        else {
            throw new Error('Invalid token payload');
        }
        next();
    }
    catch (err) {
        res.status(400).send('Invalid Token');
    }
}
export default router;

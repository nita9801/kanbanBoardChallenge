import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authRouter from './auth-routes.js';

const index = Router();

export function localAuthenticateToken(req: Request, res: Response, next: NextFunction): void {
  const token = req.get('authorization')?.split(' ')[1];
  if (!token) {
    res.status(401).send('Access Denied');
    return;
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET as string);
    if (typeof verified === 'object' && verified !== null && 'username' in verified) {
      req.user = verified as { username: string };
    } else {
      throw new Error('Invalid token payload');
    }
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};
// Import or define the login function
// Ensure the correct path to the auth-controller file
import login from '../routes/auth-routes.js';

authRouter.post('/login', login);

export default index;
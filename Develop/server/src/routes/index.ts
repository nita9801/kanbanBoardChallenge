import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

//import userRoutes from './user-routes';
//import taskRoutes from './task-routes';
const router = Router();
//router.use('/users', authenticateToken, userRoutes);
//router.use('/tasks', authenticateToken, taskRoutes);

export function localAuthenticateToken(req: Request, res: Response, next: NextFunction): void {
    const token = req.get('authorization')?.split(' ')[1];
    if (!token) {
        res.status(401).send('Access Denied');
        return;
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET as string);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}
export default router;

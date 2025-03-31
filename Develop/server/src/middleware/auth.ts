import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    interface CustomJwtPayload extends JwtPayload {
        userId: string; 
        username: string; // Ensure username is included
    }
    req.user = decoded as CustomJwtPayload;
    next();
    return; // Ensure all code paths return
  });

  return; // Explicitly return to satisfy all code paths
}

export interface CustomJwtPayload {
  id: number;
  username: string;
  userId: string; // Ensure consistency with the interface used in the middleware
}

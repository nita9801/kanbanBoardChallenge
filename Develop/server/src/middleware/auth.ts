import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        res.status(403).json({ message: 'Invalid token' });
        return;
      }
    
      // Define a custom payload interface
      interface CustomJwtPayload extends JwtPayload {
        id: number;
        username: string;
      }
    
      // Attach the decoded user data to the request object
      req.user = decoded as CustomJwtPayload;
    
      // Proceed to the next middleware
      next();
      return;
    });
    return;
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
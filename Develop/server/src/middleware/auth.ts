import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define the interface for the JWT payload
interface JwtPayload {
  username: string;
}

export const localAuthenticateToken = () => {
  // Function implementation
};
export const authenticateToken = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const secretKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      const customUser = user as JwtPayload & { username?: string };
      if (!customUser.username) {
        return res.sendStatus(403);
      }
      req.user = { username: customUser.username };
      return next();
    });
  } else {
    res.sendStatus(401); 
  }
};
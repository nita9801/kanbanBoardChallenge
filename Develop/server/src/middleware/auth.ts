import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // Extract the token from the Authorization header
//     const token = req.headers['authorization']?.split(' ')[1];
//     if (!token) {
//       return res.status(401).json({ message: 'Access denied' });
//     }

//     // Verify the token
//     jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
//       if (err) {
//         res.status(403).json({ message: 'Invalid token' });
//         return;
//       }
    
//       // Define a custom payload interface
//       interface CustomJwtPayload extends JwtPayload {
//         id: number;
//         username: string;
//       }
    
//       // Attach the decoded user data to the request object
//       req.user = decoded as CustomJwtPayload;
    
//       // Proceed to the next middleware
//       next();
//       return;
//     });
//     return;
//   } catch (error) {
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };


// Define the interface for the JWT payload
interface CustomJwtPayload {
  username: string;
}

// Middleware function to authenticate JWT token
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Get the authorization header from the request
  const authHeader = req.headers.authorization;

  // Check if the authorization header is present
  if (authHeader) {
    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];

    // Get the secret key from the environment variables
    const secretKey = process.env.JWT_SECRET_KEY || '';

    // Verify the JWT token
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Send forbidden status if the token is invalid
      }

      // Attach the user information to the request object
      req.user = user as CustomJwtPayload;
      return next(); // Call the next middleware function
    });
  } else {
    res.sendStatus(401); // Send unauthorized status if no authorization header is present
  }
};

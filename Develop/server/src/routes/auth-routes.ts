// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import { User } from '../models/user.js';
// import { Request, Response } from 'express';
// import { Router } from 'express';

// const router = Router();

// router.post('/login', async (req: Request, res: Response) => {
//   try {
//     const { username, password } = req.body;

//     if (!username || !password) {
//       return res.status(400).json({ error: 'Missing username or password' });
//     }


//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).send('Invalid username or password');
//     }



// export default router;

import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';  // Import the User model
import jwt from 'jsonwebtoken';  // Import the JSON Web Token library
import bcrypt from 'bcrypt';  // Import the bcrypt library for password hashing

// Login function to authenticate a user
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;  // Extract username and password from request body

  // Find the user in the database by username
  const user = await User.findOne({ where: { username } });

  // If user is not found, send an authentication failed response
  if (!user) {
    return res.status(404).json({ message: 'Authentication failed' });
  }

  // Compare the provided password with the hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Get the secret key from environment variables
  // const secretKey = process.env.JWT_SECRET_KEY || '';

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );

try {
  // Send the token in the response
  return res.json({ token });
} catch (error) {
  console.error('Error in /auth/login:', error);
  return res.status(500).json({ error: (error as Error).message });
}
};

// Create a new router instance
const router = Router();

// POST /login - Login a user
router.post('/login', login);  // Define the login route

export default router;  // Export the router instance


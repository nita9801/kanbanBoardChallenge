import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed: User not found' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Authentication failed: Invalid password' });
  }

  const secretKey = process.env.JWT_SECRET_KEY || '';
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1hr' });

  return res.json({ token });
});

export default router;
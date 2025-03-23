import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  res.json({ token });
});
export default router;


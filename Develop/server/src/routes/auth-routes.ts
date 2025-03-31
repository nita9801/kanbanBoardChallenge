// Removed duplicate import of User
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import router from '.';


router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});
export default router;


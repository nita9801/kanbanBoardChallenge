import { User } from '../models/user.js';
import bcrypt from 'bcrypt';

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'nita9801', password: await bcrypt.hash('Admin123!', 10) },
    { username: 'SunnyScribe', password: await bcrypt.hash('SecurePass1!', 10) },
    { username: 'RadiantComet', password: await bcrypt.hash('StrongPass2!', 10) },
  ]);
};

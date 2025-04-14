import { User } from '../models/user.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'nita9801', password: 'Admin123!' },
    { username: 'SunnyScribe', password: 'SecurePass1!' },
    { username: 'RadiantComet', password: 'StrongPass2!' },
  ], { individualHooks: true });
};

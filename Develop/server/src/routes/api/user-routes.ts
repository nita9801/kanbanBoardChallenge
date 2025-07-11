import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../../controllers/user-controller.js';
import { localAuthenticateToken } from '../../middleware/auth.js';


const router = express.Router();

// GET /users - Get all users
router.get('/', getAllUsers);

// GET /users/:id - Get a user by id
router.get('/:id', getUserById);

// POST /users - Create a new user
router.post('/', createUser);

// PUT /users/:id - Update a user by id
router.put('/:id', updateUser);

// DELETE /users/:id - Delete a user by id
router.delete('/:id', deleteUser);

router.get('/protected', localAuthenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

export default router;

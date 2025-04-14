const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));
import authRouter from './routes/auth-routes.js'; // Ensure the correct path
import indexRouter from './routes/index.js'; // Import your index router

app.use(express.json()); // Middleware to parse JSON requests

// Mount the authRouter at /api/auth
app.use('/api/auth', authRouter);

// Mount other routes (if needed)
app.use('/', indexRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.use(express.json());
app.use(routes);

sequelize.sync({force: forceDatabaseRefresh}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});

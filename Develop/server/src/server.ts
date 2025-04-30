const forceDatabaseRefresh = false;
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { sequelize } from './models/index.js';
import { ticketRouter } from './routes/api/ticket-routes.js'; // Import ticketRouter
import userRouter from './routes/api/user-routes.js';
import authRouter from './routes/auth-routes.js';

import indexRouter from './routes/index.js';

const app = express();

app.use(express.json()); // Middleware to parse JSON requests

// Mount API routes
app.use('/api/tickets', ticketRouter); // Mount ticketRouter
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

// Serve static files
app.use(express.static('../client/dist'));

// Mount other routes (if needed)
app.use('/', indexRouter);

const PORT = process.env.PORT || 3002;

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});

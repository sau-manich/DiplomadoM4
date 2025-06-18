import express from 'express';
const app = express();
// Import routes
import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';
import morgan from 'morgan';
import errorHandler from './middlewares/errorHandler.js';
import notFound from './middlewares/notFound.js';
// Middlewares
app.use(morgan('dev'));
app.use(express.json());
// Routes
app.use('/api/login', authRoutes);
app.use('/api/users', usersRoutes);
app.use(notFound);
app.use(errorHandler);
export default app;
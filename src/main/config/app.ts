import dotenv from 'dotenv';
import express from 'express';
import setupMiddleware from './middleware';
import setupRoutes from './routes';

dotenv.config();

const app = express();
setupMiddleware(app);
setupRoutes(app);
export default app;

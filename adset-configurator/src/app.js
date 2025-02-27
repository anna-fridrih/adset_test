import express from 'express';
import configRoutes from './routes/config.routes.js';
const app = express();
app.use(express.json());
app.use('/config', configRoutes);
export default app;

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { connectDatabase } from './infrastructure/database/mongodb.js';
import router from './presentation/routes/index.js';
import { notFound } from './presentation/middlewares/notFound.js';
import { errorHandler } from './presentation/middlewares/errorHandler.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', router);
app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  await connectDatabase();

  app.listen(port, () => {
    console.log(`Servidor ejecutandose en http://localhost:${port}`);
  });
};

startServer();

export default app;

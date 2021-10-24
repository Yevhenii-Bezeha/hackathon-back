import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { DATABASE_URI } from './src/configs/index.js';
import { API_ROOT } from './src/common/index.js';
import initApi from './src/api/index.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(API_ROOT, initApi());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(DATABASE_URI)
  .then(() => {
    console.log('Database connected successfuly.');

    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

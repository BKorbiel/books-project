import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import functions from 'firebase-functions';
import booksRoutes from './routes/books.js';
import userRoutes from './routes/users.js';
import profilesRoutes from './routes/profiles.js';

dotenv.config();
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors({
  origin: '*',
}));

app.use('/backendbooks', booksRoutes);
app.use('/backendusers', userRoutes);
app.use('/backendprofiles', profilesRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

const PORT = process.env.PORT || 8080;

mongoose.set('strictQuery', false);
mongoose.connect(process.env.CONNECTION_URL)
  .then(() => console.log(`Connected to mongodb`))
  .catch((error) => console.log(error.message));

export const api = functions.https.onRequest(app);

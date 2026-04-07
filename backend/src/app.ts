import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import projectRoutes from './routes/projectRoutes.js';

// 1. Load environment variables FIRST
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. Routes
app.use('/api/projects', projectRoutes);

app.get('/', (req, res) => {
  res.send('Volunteer Network API is running!');
});

// 4. Unified MongoDB Connection & Server Start
if (!MONGO_URI) {
  console.error('❌ Error: MONGO_URI is not defined in .env');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas 🍃');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error ❌:', err);
  });
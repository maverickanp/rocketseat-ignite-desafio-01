import express from 'express';
import taskRoutes from './routes/taskRoutes';
import mongoose from 'mongoose';
import { config } from './config/dbConfig';


const app = express();
app.use(express.json());


mongoose.connect(config.mongoURI, {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));


app.use('/tasks', taskRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port https://localhost:${PORT}`);
})
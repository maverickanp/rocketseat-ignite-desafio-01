import express from 'express';
import taskRoutes from './routes/taskRoutes';

const app = express();
app.use(express.json());

//add routes
app.use('/tasks', taskRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port https://localhost:${PORT}`);  
})
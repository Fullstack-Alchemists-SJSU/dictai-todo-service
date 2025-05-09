import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Todo extraction service running on port ${PORT}`);
});
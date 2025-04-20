import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes';
import vapiRoutes from './routes/vapiRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);
app.use('/api/vapi', vapiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Todo extraction service running on port ${PORT}`);
});
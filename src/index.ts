import express from 'express';
import authRoutes from './controllers/auth.controller';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Mount auth routes
app.use('/api/v1/auth', authRoutes);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
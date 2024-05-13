import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || 'your-mongodb-uri';

// Database connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connectedon');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

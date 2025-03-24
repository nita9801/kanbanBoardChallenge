import connectDB from './db';
import Library from './models/Library';

connectDB();

// Example: Query the database
Library.find()
  .then((libraries) => console.log('Libraries:', libraries))
  .catch((error) => console.error('Error fetching libraries:', error));
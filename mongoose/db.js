import mongoose from 'mongoose';

const mongoURI = 'mongodb://localhost:27017/librarydb'; // Replace with your MongoDB URI

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

// Log successful connection
db.on('connected', () => {
    console.log('Mongoose connected to MongoDB successfully!');
});

// Log connection errors
db.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

// Log disconnection
db.on('disconnected', () => {
    console.log('Mongoose disconnected from MongoDB.');
});
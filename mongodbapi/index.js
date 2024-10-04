const express = require('express');
const mongoose = require('mongoose');

const mediaRoutes = require('./routes/mediaRoutes');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/media')
.then(()=> {
    console.log('mongodb is connected.........');
})



// Use the media routes
app.use('/', mediaRoutes);

// Start the server
const PORT = 5002  ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

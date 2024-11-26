const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require('./admin');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Admin Panel Router
app.use('/admin', adminRouter);

// Connect to MongoDB
console.log('MongoDB URI:', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error(error));

// Import and use routes
const userRouter = require('./Routers/User');
const providerRouter = require('./Routers/Provider'); // Add Provider router
const serviceRequestRouter = require('./Routers/ServiceRequest'); // Add ServiceRequest router

app.use('/users', userRouter); // User routes
app.use('/providers', providerRouter); // Provider routes
app.use('/service-requests', serviceRequestRouter); // Service request routes

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

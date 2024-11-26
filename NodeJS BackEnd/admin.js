const AdminBro = require('admin-bro');
const fs = require('fs');
const path = require('path');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');
const mongoose = require('mongoose');

// Register AdminBro with Mongoose
AdminBro.registerAdapter(AdminBroMongoose);

// Path to the models directory
const modelsPath = path.join(__dirname, 'models');

// Dynamically load all models
const models = [];
fs.readdirSync(modelsPath).forEach((file) => {
  if (file.endsWith('.js')) {
    const model = require(path.join(modelsPath, file));
    models.push({ resource: model }); // Add model to AdminBro resources
  }
});

// Initialize AdminBro
const adminBro = new AdminBro({
  databases: [mongoose], // Optionally include your database
  rootPath: '/admin',    // The path for the admin panel
  resources: models,     // Use dynamically loaded models
  branding: {
    companyName: 'Apps Admin Page',
    softwareBrothers: false, // Hide "SoftwareBrothers" branding
  },
});

// Admin credentials
const ADMIN = {
  email: 'admin',
  password: 'admin',
};

// Create an authenticated admin router
const adminRouter = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    if (email === ADMIN.email && password === ADMIN.password) {
      return ADMIN;
    }
    return null;
  },
  cookieName: 'adminbro',
  cookiePassword: 'sessionsecret',
});

module.exports = adminRouter;

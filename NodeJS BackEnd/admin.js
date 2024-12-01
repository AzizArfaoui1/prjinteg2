const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Register AdminBro with Mongoose
AdminBro.registerAdapter(AdminBroMongoose);

// Path to the models directory
const modelsPath = path.join(__dirname, 'models');

// Dynamically load all models
const resources = [];
fs.readdirSync(modelsPath).forEach((file) => {
  if (file.endsWith('.js')) {
    const model = require(path.join(modelsPath, file));

    // Define logical configurations per model
    const modelName = file.replace('.js', ''); // Extract model name
    let resourceOptions = {};

    // Customize options for specific models
    switch (modelName) {
      case 'User':
        resourceOptions = {
          resource: model,
          options: {
            properties: {
              username: { isTitle: true }, // Use username as display field
              password: { type: 'password' }, // Secure password input
              location: { reference: 'Location', isVisible: { list: true, show: true, edit: true } }, // Optional
              _id: { isVisible: false }, // Hide _id from UI
            },
            listProperties: ['username', 'firstname', 'lastname', 'email'], // Fields shown in list view
            showProperties: ['username', 'firstname', 'lastname', 'email', 'location'], // Fields in show view
            editProperties: ['username', 'firstname', 'lastname', 'email', 'password', 'location'], // Editable fields
          },
        };
        break;

      case 'Provider':
        resourceOptions = {
          resource: model,
          options: {
            properties: {
              username: { isTitle: true }, // Use username as display field
              password: { type: 'password' }, // Secure password input
              location: { reference: 'Location', isVisible: true },
              _id: { isVisible: false },
            },
            listProperties: ['username', 'firstName', 'lastName', 'email', 'phone'], // Visible fields
            showProperties: ['username', 'firstName', 'lastName', 'email', 'phone', 'location'], // Details view
            editProperties: ['username', 'firstName', 'lastName', 'email', 'phone', 'password', 'location'], // Editable
          },
        };
        break;

      case 'Service':
        resourceOptions = {
          resource: model,
          options: {
            properties: {
              providerId: { reference: 'Provider', isVisible: true }, // Reference Provider
              _id: { isVisible: false },
            },
            listProperties: ['serviceName', 'description', 'price', 'date', 'duree', 'providerId'],
            showProperties: ['serviceName', 'description', 'price', 'date', 'duree', 'providerId'],
            editProperties: ['serviceName', 'description', 'price', 'date', 'duree', 'providerId'],
          },
        };
        break;

      case 'Review':
        resourceOptions = {
          resource: model,
          options: {
            properties: {
              userId: { reference: 'User', isVisible: true }, // Reference User
              providerId: { reference: 'Provider', isVisible: true }, // Reference Provider
              _id: { isVisible: false },
            },
            listProperties: ['rating', 'comment', 'date', 'userId', 'providerId'], // Visible fields
            showProperties: ['rating', 'comment', 'date', 'userId', 'providerId'], // Show view
            editProperties: ['rating', 'comment', 'userId', 'providerId'], // Editable fields
          },
        };
        break;

      case 'Reservation':
        resourceOptions = {
          resource: model,
          options: {
            properties: {
              userId: { reference: 'User', isTitle: true }, // Use User's username
              providerId: { reference: 'Provider', isTitle: true }, // Use Provider's username
              serviceId: { reference: 'Service', isTitle: true }, // Use Service's name
              _id: { isVisible: false },
            },
            listProperties: ['userId', 'providerId', 'serviceId', 'date', 'status'], // Visible fields
            showProperties: ['userId', 'providerId', 'serviceId', 'date', 'status'], // Show view
            editProperties: ['userId', 'providerId', 'serviceId', 'date', 'status'], // Editable fields
          },
        };
        break;

      case 'Location':
        resourceOptions = {
          resource: model,
          options: {
            properties: {
              _id: { isVisible: false },
            },
            listProperties: ['address', 'ville', 'postal_code', 'country'], // Visible fields
            showProperties: ['address', 'ville', 'postal_code', 'country'], // Show view
            editProperties: ['address', 'ville', 'postal_code', 'country'], // Editable fields
          },
        };
        break;

      default:
        resourceOptions = {
          resource: model,
        };
        break;
    }

    resources.push(resourceOptions);
  }
});

// Initialize AdminBro
const adminBro = new AdminBro({
  databases: [mongoose], // Include the database connection
  rootPath: '/admin',
  resources, // Use configured resources
  branding: {
    companyName: 'Admin Panel',
    softwareBrothers: false, // Optional: Remove "SoftwareBrothers" branding
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
  cookiePassword: 'some-secret-password',
});

module.exports = adminRouter;
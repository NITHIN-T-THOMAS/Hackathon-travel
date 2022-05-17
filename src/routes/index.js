const express = require('express');
const path = require('path');
const app = express.Router();
const controller = require('../controllers/controller');

require('express-group-routes');

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../views/index.html')
));

app.get('/api', (req, res) => {
    res.status(200).json({ "status": 0, "message": "API Working" });
  });

// API group for mobile app
app.group("/api/v1", (router) => {
    router.get('/health', controller.healthCheck);
});

// API group for web app
app.group("/web/v1", (router) => {
    router.get('/', (req, res) => res.send('Sample Project!!!'));
});

module.exports = app;
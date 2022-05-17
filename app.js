const express = require('express');
const cors = require("cors");
const app = express();

require('dotenv').config()
const port = process.env.PORT || 8005;
app.set('port', port);
app.use(cors())
const url = process.env.URL;
app.set('url', url);
const usersRoute = require('./src/routes/index.js');
app.use(usersRoute);
const sequelize = require('./src/models').sequelize;

sequelize
  .authenticate()
  .then((err) => {
    //configurePassport();
    // new CreateModels();
    // new setRoutes(app);
    app.listen(app.get('port'),app.get('url'), () => {
      console.log(`\n Listening on port   ${app.get('url')}:${app.get('port')}  \n`);
    });
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });
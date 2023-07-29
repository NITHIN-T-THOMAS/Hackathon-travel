const express = require('express');
const cors = require("cors");
const cluster = require('cluster');
const os = require('os');
require('dotenv').config()

const app = express();
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: false
}));


const numCpu = (os.cpus.length == 0)?4:os.cpus.length;

const port = process.env.PORT || 8005;
app.set('port', port);
app.use(cors())
const url = process.env.url
console.log(url);
app.set('url',url);
const usersRoute = require('./routes/index.js');
//ROUTES
app.use(usersRoute);
const sequelize = require('./models').sequelize;

// Checks DB connection
const dbConnection = require('./config/sequelizeConfig');

sequelize
  .authenticate()
  .then((err) => {
    //configurePassport();
    // new CreateModels();
    // new setRoutes(app);
    if(cluster.isMaster){
      console.log(numCpu);
      for (let i = 0; i < numCpu; i++) {
        cluster.fork();
      }

      cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log("Let's fork another worker!");
        cluster.fork(); //use cluster.worker.kill() - kill fork after result send
      });
    }
    else{
      app.listen(app.get('port'),app.get('url'), () => {
        console.log(`\n Listening on port   ${app.get('url')}:${app.get('port')}@${process.pid}  \n`);
      });
    }
    console.log('database Connection has been established successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });

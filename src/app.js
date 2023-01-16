const express = require('express');
const cors = require("cors");
const cluster = require('cluster');
const os = require('os');
require('dotenv').config()

const app = express();

const numCpu = (os.cpus.length == 0)?4:os.cpus.length;

const port = process.env.PORT || 8005;
app.set('port', port);
app.use(cors())
const url = process.env.URL;
app.set('url', url);
const usersRoute = require('./routes/index.js');
app.use(usersRoute);
const sequelize = require('./models').sequelize;

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
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });

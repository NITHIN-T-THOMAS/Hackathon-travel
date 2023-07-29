const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || "development";
// import config from './config';
const config = require("./database")[env];


const sequelize = new Sequelize(
    config.database, 
    config.username, 
    config.password, {
        host: config.host,
        logging: false,
        dialect: 'postgres',
        dialectOptions: {
            supportBigNumbers: true
        },
        charset: 'utf8',
        collate: 'utf8_general_ci',
        pool: {
            max: 10,
            min: 0
        }
    }
);


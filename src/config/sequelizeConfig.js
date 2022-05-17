const Sequelize = require('sequelize');
import config from './config';

const sequelize = new Sequelize(config.production.database, config.production.username, config.production.password, {
    host: config.production.host,
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
});
export default sequelize;
export let op = Sequelize.Op;
require('dotenv').config();
module.exports = {
	"development": {
		"username": 'postgres',
		"password": 'root',
		"database": 'TripPlanner_local',
		"host": 'localhost',
		"dialect": "postgres"
	  },
	  "test": {
		"username": process.env.DBUSER,
		"password": process.env.DBPASSWORD,
		"database": process.env.DB,
		"host": process.env.DBHOST,
		"dialect": "postgres"
	  },
	  "production": {
		"username": process.env.DBUSER,
		"password": process.env.DBPASSWORD,
		"database": process.env.DB,
		"host": process.env.DBHOST,
		"dialect": "postgres"
	  }
}

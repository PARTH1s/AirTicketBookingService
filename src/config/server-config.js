// Load environment variables from the .env file into process.env
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  // Port on which the server should run
  PORT: process.env.PORT,

  // Base URL/path of the Flight Service  
  FLIGHT_SERVICE_PATH: process.env.FLIGHT_SERVICE_PATH,
};

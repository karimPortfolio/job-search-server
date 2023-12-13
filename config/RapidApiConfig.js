const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    rapidApiKey: process.env.RAPID_API_KEY,
    rapidApiHost: process.env.RAPID_API_HOST,
    rapidApiUrl: process.env.RAPID_API_URL,
}



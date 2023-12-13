const dotenv = require('dotenv');
dotenv.config();

if (process.env.NODE_ENV !== 'Production' )
{
    module.exports = {
        port: process.env.PORT || 8000,
    }
}

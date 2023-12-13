//dependencies
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cors = require('cors');

//app config imports
const AppConfig = require('./config/AppConfig');

//routes imports
const jobsRoutes = require('./routes/jobs');
const registerRoutes = require('./routes/auth/register');

const app = express();

//config .env
dotenv.config();

app.use(express.json());
app.use(bodyParser.urlencoded({limit:'2mb', extended:true}));

//to secure http headers
app.use(helmet());
//to limit request size to 2mb
//app.use(bodyParser.json({ limit: '2mb' }));
//set cors
app.use(cors({
    origin:"http://localhost:3000",
    methods:['POST', 'GET', 'PUT', 'DELETE']
}));

//routes
const crypto = require("crypto");
app.use('/jobs', jobsRoutes);
app.use('/auth', registerRoutes);
app.get('/', (req, res) => {
    const jwtSecretKey = crypto.randomBytes(32).toString('hex');
    res.json({secretKey:jwtSecretKey});
})

//server config
app.listen(AppConfig.port, () => {
    console.log(`http://localhost:${AppConfig.port}`);
})

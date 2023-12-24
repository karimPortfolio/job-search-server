//dependencies
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
require('./services/passport/googleOauth2');
//app config imports
const AppConfig = require('./config/AppConfig');

//routes imports
const jobsRoutes = require('./routes/jobs');
const authRoutes = require('./routes/auth/auth');
const uploadRoutes = require('./routes/uploads');

const app = express();

//config .env
dotenv.config();

app.use(express.json());
app.use(bodyParser.urlencoded({limit:'2mb', extended:true}));

//to secure http headers
app.use(helmet());

//to manage session's using express session
app.use(session({
    secret: 'f8004addef33df46d6db59278461cf210fa043d06044f8004',
    resave: true,
    saveUninitialized: true
}));

//to use passport
app.use(passport.initialize());
app.use(passport.session());

//to limit request size to 2mb
//app.use(bodyParser.json({ limit: '2mb' }));


//set cors
app.use(cors({
    origin:"http://localhost:3000",
    methods:['POST', 'GET', 'PUT', 'DELETE']
}));

//routes
app.use('/jobs', jobsRoutes);
app.use('/auth', authRoutes);
app.use('/upload', uploadRoutes);

//server config
app.listen(AppConfig.port, () => {
    console.log(`http://localhost:${AppConfig.port}`);
})

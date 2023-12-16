const express = require('express');
const Route = express.Router();
const { getMatchedJobs, recentJobs } = require('../controllers/jobs');
const { validateSearchInputs } = require('../middlewares/validation/searchValidation');

Route.post('/', validateSearchInputs, getMatchedJobs);
Route.get('/', recentJobs);

module.exports = Route;


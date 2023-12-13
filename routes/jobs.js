const express = require('express');
const Route = express.Router();
const jobsController = require('../controllers/jobs');
const validation = require('../middlewares/valdation');

Route.post('/', validation.validateSearchInputs, jobsController.getMatchedJobs);
Route.get('/', jobsController.recentJobs);

module.exports = Route;


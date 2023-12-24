
const express = require('express');
const { addResume } = require('../controllers/resumes/addResume');
const { upload } = require('../config/MulterUpload');
const { resumeUploadValidation } = require('../middlewares/validation/uploadsValidation');
const Route = express.Router();


Route.post('/user/:id/resume', upload.single('resume'), resumeUploadValidation, addResume);

module.exports = Route;

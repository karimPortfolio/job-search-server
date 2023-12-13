
const express = require("express");
const { register } = require("../../controllers/auth/register");
const Route = express.Router();


Route.post('/register', register);


module.exports = Route;

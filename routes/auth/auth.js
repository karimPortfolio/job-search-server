
const express = require("express");
const register = require("../../controllers/auth/register");
const login = require("../../controllers/auth/login");
const { validateUserCredentialsRegister, validateUserCredentialsLogin } = require("../../middlewares/validation/authValidation");
const { 
    googleOauthCallback,
    googleOauthScopes, 
    googleOauthSuccess,
    googleOauthFailed,
    googleOauthRedirect
} = require("../../controllers/auth/googleOauth");
const Route = express.Router();


Route.post('/register', validateUserCredentialsRegister, register);
Route.post('/login', validateUserCredentialsLogin, login)
Route.get('/login/federated/google', googleOauthRedirect);
Route.get('/redirect/google', googleOauthCallback);
Route.get('/google', googleOauthScopes);
Route.get('/login/success', googleOauthSuccess);
Route.get('/login/failed', googleOauthFailed);

module.exports = Route;

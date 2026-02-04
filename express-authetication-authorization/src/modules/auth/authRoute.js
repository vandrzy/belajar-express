import { Router } from "express";
import * as authController from './authController.js';
import * as authRequest from './authRequest.js';
import * as validator from '../../middlewares/validateRequest.js';

const route = Router();

route.post('/register', validator.validateRequestBody(authRequest.registerUserRequest), authController.registerUser);
route.post('/login', validator.validateRequestBody(authRequest.loginUserRequest), authController.loginUser);
route.post('/admin', authController.generateAdmin);

export default route;
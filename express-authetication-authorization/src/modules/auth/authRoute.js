import { Router } from "express";
import * as authController from './authController.js';
import * as authRequest from './authRequest.js';
import * as validator from '../../middlewares/validateRequest.js';
import { authLimiter } from "../../middlewares/globalLimiter.js";

const route = Router();

route.post('/register', authLimiter, validator.validateRequestBody(authRequest.registerUserRequest), authController.registerUser);
route.post('/login', authLimiter, validator.validateRequestBody(authRequest.loginUserRequest), authController.loginUser);
route.post('/refresh', authLimiter, authController.refresh);
route.post('/admin', authController.generateAdmin);
route.post('/logout', authController.logout);


export default route;
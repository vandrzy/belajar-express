import { Router } from "express";
import * as validateRequestMiddleware from '../../middlewares/validateRequestMiddleware.js';
import * as authController from './authController.js';
import * as authRequest from './authRequest.js';

const route = Router();

route.post('/registrasi', validateRequestMiddleware.validateRequestBody(authRequest.registrasiRequestBody), authController.registrasi);
route.post('/login', validateRequestMiddleware.validateRequestBody(authRequest.loginRequestBody), authController.login);
route.post('/refresh', authController.refreshToken);
route.post('/logout', authController.logout);
route.post('/admin', authController.generateAdmin);

export default route;
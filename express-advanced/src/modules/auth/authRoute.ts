import { Router } from "express";
import { validateRequestBody } from "../../middlewares/validateRequest";
import * as authController from './authController';
import * as authRequest from './authRequest';
const route = Router();
route.post('/signup', validateRequestBody(authRequest.signUpRequest), authController.signUp);

export default route;
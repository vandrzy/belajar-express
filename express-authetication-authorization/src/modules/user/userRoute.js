import { Router } from "express";
import * as userController from './userController.js';
import authMiddleware from "../../middlewares/authMiddleware.js";

const route = Router();

route.get('/', authMiddleware, userController.getUserInfo);

export default route;
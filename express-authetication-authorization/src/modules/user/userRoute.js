import { Router } from "express";
import * as userController from './userController.js';
import authMiddleware from "../../middlewares/authMiddleware.js";
import { authorizeRole } from "../../middlewares/authorizationMiddleware.js";

const route = Router();

route.get('/', authMiddleware,authorizeRole('user', 'admin'), userController.getUserInfo);
route.get('/admin', authMiddleware, authorizeRole('admin'), userController.getAllUsers);

export default route;
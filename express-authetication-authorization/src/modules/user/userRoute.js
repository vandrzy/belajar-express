import { Router } from "express";
import * as userController from './userController.js';
import authMiddleware from "../../middlewares/authMiddleware.js";
import { authorizeRole } from "../../middlewares/authorizationMiddleware.js";
import { upload } from "../../middlewares/uploadMiddleware.js";

const route = Router();

route.get('/', authMiddleware,authorizeRole('user', 'admin'), userController.getUserInfo);
route.get('/admin', authMiddleware, authorizeRole('admin'), userController.getAllUsers);
route.post('/upload', authMiddleware, upload.single('image'), userController.uploadAvatar);

export default route;
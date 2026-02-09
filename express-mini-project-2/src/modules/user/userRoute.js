import { Router } from "express";
import authMiddleware from "../../middlewares/authenticationMiddleware.js";
import authorizeRole from "../../middlewares/authorizationMiddleware.js";
import * as userController from './userController.js';
import { upload } from "../../middlewares/uploadMiddleware.js";

const route = Router();

route.get('/', authMiddleware, authorizeRole('admin'), userController.gelAllUsers);
route.patch('/avatar', authMiddleware, authorizeRole('user', 'admin'), upload.single('image'), userController.uploadAvatarUser);

export default route;
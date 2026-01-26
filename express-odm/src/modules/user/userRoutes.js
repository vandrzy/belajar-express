import { Router } from "express";
import * as userValidator from './userValidator.js';
import * as userController from './userController.js';
import * as validator from '../../middlewares/validateRequest.js';

const router = Router();

router.post("/", validator.validateRequestBodyJoi(userValidator.createUserRequest), userController.createUser);
router.get("/", userController.getAllUser);
router.get("/:id", userController.getUserById);
router.patch("/:id", validator.validateRequestBodyZod(userValidator.updateUserRequest), userController.updateUserById);
router.delete("/:id", userController.deleteUserById);

export default router;


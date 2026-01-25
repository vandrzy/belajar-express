import { Router } from "express";
import * as userValidator from './userValidator.js';
import * as userController from './userController.js';

const router = Router();

router.post("/", userValidator.createUserRequest, userController.createUser);
router.get("/", userController.getAllUser);
router.get("/:id", userController.getUserById);
router.patch("/:id", userValidator.updateUserRequest, userController.updateUserById);
router.delete("/:id", userController.deleteUserById);

export default router;


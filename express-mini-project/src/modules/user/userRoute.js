import { Router } from "express";
import * as userController from './userController.js';
import * as userRequest from './userRequest.js';
import * as requestValidator from './../../middlewares/validateRequest.js';


const router = Router();

router.post('/', requestValidator.validateRequestBody(userRequest.createUserRequestBody), userController.createUser);
router.patch('/:id', requestValidator.validateRequestBody(userRequest.updateUserRequestBody), userController.updateUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);



export default router;
import { Router } from "express";
import * as validator from '../../middlewares/validateRequest.js'
import * as roleRequest from './roleValidator.js'
import * as roleController from './roleController.js'

const router = Router();


router.post('/', validator.validateRequestBodyZod(roleRequest.createRoleRequest), roleController.createRole)
router.get('/', roleController.getAllRole)





export default router
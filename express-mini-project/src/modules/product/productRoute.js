import { Router } from "express";
import * as productController from './productController.js';
import * as productRequest from './productRequest.js';
import * as requestValidator from '../../middlewares/validateRequest.js';

const router = Router();

router.post('/', requestValidator.validateRequestBody(productRequest.createProductRequestBody), productController.createProduct);
router.get('/', requestValidator.validateRequestQuery(productRequest.paginationRequestQuery), productController.getAllProducts);
router.patch('/:id', requestValidator.validateRequestBody(productRequest.updateProductRequestBody), requestValidator.validateRequestQuery(productRequest.userIdRequestQuery), productController.updateProduct);
router.get('/:id', productController.getProductById);
router.get('/:userId',  productController.getProductByUser);
router.delete('/:id', productController.deleteProductById);

export default router;
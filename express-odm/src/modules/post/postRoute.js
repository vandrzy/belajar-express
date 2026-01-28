import { Router } from "express";
import * as requestValidator from '../../middlewares/validateRequest.js';
import * as postValidator from './postValidator.js';
import * as postController from './postController.js';

const route = Router();

route.post("/:id", requestValidator.validateRequestBodyZod(postValidator.createPostRequestBody), postController.createPost);
route.get('/:id', postController.getPostByUser);
route.delete('/:userId/:postId', postController.deletePost)
route.patch('/:userId/:postId', requestValidator.validateRequestBodyZod(postValidator.updatePostRequestBody), postController.updatePost)


export default route;

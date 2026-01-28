import * as postService from './postService.js'
import { successResponse } from '../../utils/response.js'


// POST
export const createPost = async (req, res, next) => {
    try{
        const {title, description} = req.body;
        const id = req.params.id;
        const post = await postService.createPost(title, description, id);
        res.status(200).json(successResponse('Berhasil membuat post', post));
    }catch(error){
        next(error);
    }
}


export const getPostByUser = async (req, res, next) => {
    try{
        const id = req.params.id;
        const post = await postService.getPostByUser(id);
        res.status(200).json(successResponse('Berhasil membuat post', post));
    }catch(error){
        next(error);
    }
}

export const deletePost = async (req, res, next) => {
    try {
        const {postId, userId} = req.params;
        console.log(postId)
        console.log(userId)
        await postService.deletePost(postId, userId);
        res.status(200).json(successResponse('Berhasil menghapus post'));
    } catch (error) {
        next(error)
    }
}

export const updatePost = async (req, res, next) => {
    try {
        const {postId, userId} = req.params;
        const {title, description} = req.body;
        const data = {title, description};
        const post = await postService.updatePost(postId, userId, data)
        res.status(200).json(successResponse('Berhasil memperbarui post', post));
    } catch (error) {   
        next(error)
    }
}


import * as postRepository from './postRepository.js';
import {getById} from '../user/userRepository.js'
import AppError from '../../utils/appError.js';
import mongoose from 'mongoose';

export const createPost = async (title, description, id) => {
    const user = await getById(id);
    if (!user) {
        throw new AppError("User tidak ada", 400)
    }
    const data = {title, description, user:id};
    const post = await postRepository.createPost(data);

    return post;

}


export const getPostByUser = async (userId) => {
    const user = await getById(userId);
    if (!user) {
        throw new AppError("User tidak ada", 400);
    }

    const posts =  await postRepository.getPostByUser(userId);
    return posts;
}


export const deletePost = async (postId, userId) => {
    const post = await postRepository.deletePost(postId, userId);
    console.log(post);
    if (!post) throw new AppError("Post tidak ada", 400);
}

export const updatePost = async (postId, userId, data) => {
    const post = await postRepository.updatePost(postId, userId, data);
    if (!post) throw new AppError("Post tidak ada", 400);
    return post;
}

import Post from "./postModel.js"

// create Post
// Params {title: "", description: "", user: "idUser"}
export const createPost = async (data) => {
    return Post.create(data);
}

// get Post by user
// Params userId
export const getPostByUser = async (userId) => {
    return Post.find({user: userId})
}


// delete Post by User
// Params userId
export const deletePostByUser = (userId) => {
    return Post.deleteMany({user: userId})
}

// delete Post
// Params postId, userId
export const deletePost = (postId, userId) => {
    return Post.findOneAndDelete({
    _id: postId,
    user: userId
  });
}

// patch post
// params postId, userId, {title: "", description: ""}
export const updatePost = (postId, userId, data) => {
    return Post.findOneAndUpdate({_id: postId, user: userId}, data, {
        new: true
    })
}





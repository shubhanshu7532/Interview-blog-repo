
import Comment from '../model/comment.js';
import Post from '../model/post.js';


//1.Controller to create the comments taking two parameters request and response
export const newComment = async (request, response) => {
    try {
        //1. Checking if the post exist or not
        const post = await Post.findById(request.body.postId)

        //2. If post doesn't exist then we don't allow to create the comment
        if(!post)return response.status(404).json('Post does not exist')

        //3. Creating the comment
        const comment = await new Comment(request.body);
        comment.date = new Date
        comment.save();

       //4. Sending the response
       return response.status(200).json('Comment saved successfully');
    } catch (error) {
       return response.status(500).json(error);
    }
}

//2.Controller to Get the comments
export const getComments = async (request, response) => {
    try {
        //1. Finding all the comments
        const comments = await Comment.find({ postId: request.params.id });

        //2. Giving comments in response
        return response.status(200).json(comments);
    } catch (error) {
        response.status(500).json(error)
    }
}

//3.Controller to delete the comments
export const deleteComment = async (request, response) => {
    try {
        const comment = await Comment.findById(request.params.id);
        await comment.delete()

        response.status(200).json('comment deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}
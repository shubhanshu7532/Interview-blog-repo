import Reply from '../model/reply.js';
import Post from '../model/post.js';
import Comment from '../model/comment.js';


//1. Controller to create the reply
export const newReply = async (request, response) => {
    try {
        const { name , commentId, date , reply} = request.body

        // console.log(request.body)
        const comments = await Comment.find({ _id: commentId });
        if(!comments)return reply.status(404).json("comment doesnot exist but well try")

        const createdreply= await new Reply({name,commentId,date:new Date,reply});
        createdreply.save();

        // console.log("this is created reply",createdreply)

       return response.status(200).json('reply saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}


export const getReplies = async (request, response) => {
    try {
        console.log("inside the getReplies controller",request.params.id)
        const reply= await Reply.find({ commentId: request.params.id });
        console.log(reply)
        return response.status(200).json(reply);
    } catch (error) {
        response.status(500).json(error)
    }
}

export const deleteReplies = async (request, response) => {
    try {

        console.log("this is")
        const reply = await Reply.findById(request.params.id);
        const comment = await Comment.findById(reply.commentId)
        console.log("checckpoint 1")
        if(!comment) return response.status(404).json('Comment doesnot exist');
        console.log("checckpoint 2")
        const post = await Post.findById(comment.postId)
        if(!post)return reply.status(404).json('post doesnot exist')
         
        console.log("checckpoint 3")
        if(post.username !== request.user.username)return reply.status(200).json('You cannot delete this reply')

        console.log("checckpoint 4")
        await reply.delete()

        response.status(200).json('reply deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}
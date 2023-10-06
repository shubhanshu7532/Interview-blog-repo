
import Post from '../model/post.js';
import User from '../model/user.js';


//1. Controller to create the post
export const createPost = async (request, response) => {
    try {
        //1. First we finding that user exist or not with this username that coming in request.body if user doesn't exist than we rejecting him
        const user = await User.findOne({username:request.body.username})
        if(!user)return response.status(404).json('User does not exist with this username');

        //2. Creating the post
        const post = await new Post(request.body);
        post.save();

        //3. Sending the response
        return response.status(200).json('Post saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

//2. Controller to update the post
export const updatePost = async (request, response) => {
    try {
        //1. Checking post exist or not
        const post = await Post.findById(request.params.id);
        if (!post) {
            response.status(404).json({ msg: 'Post not found' })
        }
        
        //2.Updating the post
        await Post.findByIdAndUpdate( request.params.id, { $set: request.body })

        //3. Sending the response
        return response.status(200).json('post updated successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

//3. Deleting the post
export const deletePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        
        await post.delete()

        response.status(200).json('post deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}

//4. Getting the post by id
export const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        console.log(post)
        response.status(200).json(post);
    } catch (error) {
        response.status(500).json(error)
    }
}

//5. Getting all post
export const getAllPosts = async (request, response) => {
    let username = request.query.username;
    let category = request.query.category;
    let posts;
    try {
        if(username) 
            posts = await Post.find({ username: username });
        else if (category) 
            posts = await Post.find({ categories: category });
        else 
            posts = await Post.find({});
            
        response.status(200).json(posts);
    } catch (error) {
        response.status(500).json(error)
    }
}
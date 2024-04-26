import BlogModel from "../modles/blogModel.js";


//Get all Blogs
export async function getAllBlogs(req, res){
    try{
        const blogs = await BlogModel.find();
        res.json(blogs);

    } catch (error){
        res.status(500).json({message: error.message})
    }
}

//Get Blog ID
export async function getBlogByID(req, res){
    try{
        const blog = await BlogModel.findById(req.params.id);
        if(!blog){
            res.status(404).json({message: 'Blog not found'})
        } else{
            res.json(blog);
        }
        res.json(blog);

    } catch (error){
        res.status(500).json({message: error.message})
    }
}

//Create new post
export async function createBlogPost(req, res){
    try{
        const {title, content, author} = req.body;
        const newBlog = new BlogModel({
            title,
            content,
            author,
            createdAt: new Date(),
            comments: [],
            likes: 0
        });
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (error){
        res.status(400).json({error: error.message});
    }
}

//Like a blog post
export async function likeBlogPost(req,res){
    try{
        const blog= await BlogModel.findById(req.params.id);
        if(!blog) {
            res.status(404).json({message: 'Blog not found'})
        }
        blog.likes++;
        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } catch (error){
        res.status(500).json({error: error.message});
    }
}

//Create a comment
export async function addBlogComment(req,res){
    try{
        const { userId, content}= req.body;
        const blog= await BlogModel.findById(req.params.id);
        console.log(blog)
        if(!blog) {
            res.status(404).json({message: 'Blog not found'})
        }
        const newComment = {
            user: userId,
            content,
            likes: 0
        }
        blog.comments.push(newComment);
        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Like Blog Comments
export async function likeBlogComment(req,res){
    try{
        const blog= await BlogModel.findById(req.params.id);
        if(!blog) {
            res.status(404).json({message: 'Blog not found'})
        }
        const commentIndex= parseInt(req.params.commentIndex)
        if (isNaN(commentIndex) || commentIndex < 0 || commentIndex >= blog.comments.length){
            return res.status(404).json({message: "Invalid comment Index"});
        }
        const comment = blog.comments[commentIndex];
        comment.likes++;
        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

//Delete a blog post
export async function deleteBlogPost(req, res){
    try{
        const blog = await BlogModel.findByIdAndDelete(req.params.id);
        if(!blog){
            res.status(404).json({message: 'Blog not found'})
        } else{
            res.json(blog);
        }
        res.json(blog);

    } catch (error){
        res.status(500).json({message: error.message})
    }
}
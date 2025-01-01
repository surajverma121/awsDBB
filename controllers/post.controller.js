import cloudinary from "../utils/cloudinary.js";
import {Post} from '../models/post.model.js'
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";

export const addNewPost =async(req,res)=>{
    try {
        const {caption}=req.body;
        const image=req.file;
        const authorId=req.id;

        if(!image) return res.status(400).json({message:'Image ff Required'})

        //Image upload
        const optimizedImageBuffer=await sharp(image.buffer)
        .resize({width:800,height:800,fit:'inside'})
        .toFormat('jpeg',{quality:80})
        .toBuffer();

        //Buffer to Data Uri
        const fileUri=`data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
        const cloudResponse=await cloudinary.uploader.upload(fileUri);

        const post=await Post.create({
            caption,
            image:cloudResponse.secure_url,
            author:authorId
        })

        const user=await User.findById(authorId);
        if(user){
            user.posts.push(post._id);
            await user.save()
        }

        await post.populate({path:'author',select:'-password'})

        return res.status(201).json({
            message:'New Post Added',
            post,
            success:true
     })

    } catch (error) {
        console.log(error);
        
    }

}

 export const getAllPost=async(req,res)=>{
  
    try {
        const post=await Post.find().sort({createdAt:-1})
        .populate({path:'author',select:'username,profilePicture'})
        .populate({path:'comments',
            sort:{createdAt:-1},
            populate:{
                path:'author',
                select:'username,profilePicture'
            }
        })

        return res.status(200).json({
            posts,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const getUserPost=async(req,res) =>{
    try {
        const authorId=req.id
        const posts=await Post.find({author:authorId})
                  .sort({createdAt:-1})
                 .populate({
                    path:'author',
                    select:'username,profilePicture'
                 }).populate({
                    path:'comments',
                    sort:{createdAt:-1},
                    populate:({
                        path:'author',
                        select:'username,profilePicture'
                    })
                 })
        return res.status(200).json({
                    posts,
                    success:true
                })
        
    } catch (error) {
         console.log(error);
         
    }
}

export const likePost=async(req,res)=>{
    try {
        const likeKrneWalaUserId=req.id
        const postId=req.params.id;
        const post=await Post.findById(postId);

        if(!post) return res.status(404).json({message:'Post not found',success:false })

            //like Logic started
        await post.updateOne({$addToSet:{likes:likeKrneWalaUserId}})
        await post.save()

        //implement socket io for real time notiifcation

        return res.status(200).json({message:'Post Liked', success:true})
    } catch (error) {
        console.log(error);
    }
}

export const dislikePost=async(req,res)=>{
    try {
        const likeKrneWala=req.id
        const postId=req.params.id;
        const post=await Post.findById(postId);

        if(!post) return res.status(404).json({message:'Post not found',success:false })

            //like Logic started
        await post.updateOne({$pull:{likes:likeKrneWalaUserId}})
        await post.save()

        //implement socket io for real time notiifcation

        return res.status(200).json({message:'Post Disliked', success:true})
    } catch (error) {
        console.log(error);
    }
}

export const addComment=async(req,res)=>{
    try {
        const postId=req.params.id
        const commentKrneWalaId=req.id
        const {text}=req.body
        const post= await Post.findById(postId)

        if(!text) return res.status(400).json({message:'text is required',success:false})

        const comment= await Comment.create({
            text,
            post:postId,
            author:commentKrneWalaId
        }).populate({
            path:'author',
            select:'username,profilePicture'
        })
        post.comments.push(comment._id);
        await post.save()

        return res.status(201).json({
            message:'comment Added',
            comment,
            success:true})


    } catch (error) {
        console.log(error);
    }
}

export const getCommentsOfPost=async(req,res)=>{
    try {
        const postid=req.params.id
        const comments=await Comment.find({post:postid}).populate({path:'author',select:'username,profilePicture'})

        if(!comments) return res.status(404).json({
            message:"Comment not Found",
            success:false
        })
        return res.status(201).json({
            comments,
            success:true
        })
        
    } catch (error) {
       console.log(error);
        
    }
}

export const deletePost=async(req,res)=>{
  try {
    const postId=req.params.id
    const authorId=req.id
     const post=await Post.findById(postId)

     if(!post) return res.status(404).json({
        message:"post not found",
        success:false
     })

     //check if the logged-in user is the owner of the post
     if(post.author.toString !== authorId ) return res.status(404).json({message:'Unauthorized'})

        //delete Post
        await Post.findByIdAndDelete(postId)

        //remove the post from the user's post
        let user=await User.findById(authorId);
        user.posts=user.posts.filter(id=> id.toString() !== postId)
        await user.save()

        //delete associated comments
        await Comment.deleteMany({post:postId})

        return res.status(200).json({
            success:true,
            message:"Post deleted"
        })
    
  } catch (error) {
    console.log(error);
  }
}

export const bookMarkPost=async(req,res)=>{
    try {
        const postId=req.params.id
        const author =req.id

        const post=await Post.findById(postId)
        if(!post) return res.status(400).json({
            message:"post not found",
            success:false
        })
        const user=await User.findById(authorId)
        if(user.bookmarks.includes(post._id)){
            //already bookmarked => remove from bookmark
            await user.updateOne({$pull:{bookmarks:post._id}})
            await user.save()
            return res.status(200).json({
                type:'unsaved',
                message:"Post Removed FRom bookmarks",
                success:true
            })
        }else{
            //bookmark krna pdega
            await user.updateOne({$addToSet:{bookmarks:post._id}})
            await user.save()
            return res.status(200).json({
                type:'saved',
                message:"Post saved in bookmarks",
                success:true
            })
        }
        
    } catch (error) {
        console.log(error);
        
        
    }
}
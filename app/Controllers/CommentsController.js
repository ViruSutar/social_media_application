const Comment = require("../Models/Comment");
const Post = require("../Models/Post");
const {validationError} =require("./AuthController")

const createComment = async (req, res) => {
  const { comment, postId } = req.body;
  const userId = req.user; 
  try {

    // validation 
    validationError(req,res)
    
    let post = await Post.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

   const commentId =await Comment.create({
      comment,
      postId,
      userId,
    })
   
    await Post.updateOne({ _id: postId }, { $inc: { commentCount: 1 },$push:{comments:commentId._id} });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

const deleteComment = async (req, res) => {
  const { commentId, postId } = req.body;
  const userId = req.user;
  try {
    let post = await Post.findById(postId);
    //TODO: check comment userId
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    Comment.deleteOne({ _id: commentId }).then(async () => {
      await Post.updateOne({ _id: postId }, { $inc: { commentCount: -1 } });
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createComment,
  deleteComment
}
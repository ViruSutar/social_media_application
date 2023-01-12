const Post = require("../Models/Post");
const Like = require("../Models/Like");
const { validationError } = require("./AuthController");


const like = async (req, res) => {
  const { postId } = req.body;
  const userId = req.user;
  try {
    // validator
    validationError(req,res)
    let post = await Post.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Data not found" });
    }

    // check if user already liked post
    const checkLike = await Like.find({ postId, userId });
    if (checkLike.length !== 0) {
      return res.json({
        success: false,
        message: "You have already liked this post",
      });
    }

    await Like.create({
      postId,
      userId,
    });

    await Post.updateOne({ _id: postId }, { $inc: { likeCount: 1 } });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

const dislike = async (req, res) => {
  const { postId } = req.body;
  const userId = req.user;
  try {
     // validator
     validationError(req,res)
    let post = await Post.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Data not found" });
    }

    const getData = await Like.findOne({ postId: postId, userId });

    if (getData) {
      await Post.updateOne({ _id: postId }, { $inc: { likeCount: -1 } });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  like,
  dislike,
};

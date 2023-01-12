const { default: mongoose } = require("mongoose");
const Post = require("../Models/Post");
const { validationError } = require("./AuthController");


const createPost = async (req, res) => {
  const { title, description } = req.body;
  try {
    // validation
    validationError(req,res)

    const userId = req.user;
    const post = await Post.create({
      title,
      description,
      userId,
    });

    return res.json({
      postId: post._id,
      title: post.title,
      description: post.description,
      createdAt: post.createdAt,
    });
  } catch (error) {
    console.log(error);
  }
};

const getPostById = async (req, res) => {
  const { postId } = req.query;
  try {
    const post = await Post.findById(postId, {
      title: 1,
      description: 1,
      likeCount: 1,
      commentCount: 1,
    });

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Data not found" });
    }

    return res.status(200).json({ data: post });
  } catch (error) {
    console.log(error);
  }
};

const getAllPost = async (req, res) => {
  const userId = req.user;
  try {
    const posts = await Post.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId.toString()),
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "comments",
          foreignField: "_id",
          as: "comments",
        },
      },
      {
        $project: {
          _id:0,
          title: "$title",
          description: "$description",
          createdAt: 1,
          comments:{
            $map:{
              input:"$comments",
              in:"$$this.comment"
            }
          },
          likes: "$likeCount",
        },
      },
      { $sort: { createdAt: 1 } },
    ])

    if (posts.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Data not found" });
    }

    return res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.log(error);
  }
};

const deletePost = async (req, res) => {
  const { postId } = req.query;
  const userId = req.user;
  try {
     // validation
     validationError(req,res)
    const post = await Post.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Data not found" });
    }

    if (post?.userId.toString() !== userId.toString()) {
      return res.status(401).json({
        success: false,
        message: "You do not have this permisssion",
      });
    }

    post.delete();
    post.save();
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createPost,
  deletePost,
  getAllPost,
  getPostById,
};

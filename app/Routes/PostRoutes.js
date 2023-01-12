const {createPost,deletePost,getAllPost,getPostById,} = require("../Controllers/PostsController");
const {checkAutheticated}= require("../Middlewares/Auth");
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

router.post("/create", checkAutheticated,
[
    check('title').isString().withMessage("Invalid title"),
    check('description').isString().withMessage("Invalid description")
]
,createPost);
router.delete('/delete',checkAutheticated,
[
    check('postId').isString().isLength({min:24,max:24}).withMessage("Invalid postId")
],
deletePost)
router.get('/getAll',checkAutheticated,getAllPost)
router.get('/getById',checkAutheticated,getPostById)

module.exports = router;

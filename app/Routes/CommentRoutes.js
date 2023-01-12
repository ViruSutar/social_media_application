const express = require('express')
const router = express.Router()
const Auth =require ("../Middlewares/Auth");
const CommentController = require('../Controllers/CommentsController')
const { check } = require("express-validator");


router.post('/create',Auth.checkAutheticated,
[
    check('comment').isString().withMessage("Invalid comment"),
    check('postId').isString().isLength({ min: 24 }).withMessage("invalid postId")
  ],
CommentController.createComment)

// router.delete('/delete',[

// ],Auth.checkAutheticated,CommentController.deleteComment)


module.exports = router

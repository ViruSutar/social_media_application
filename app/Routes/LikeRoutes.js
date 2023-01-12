const express = require("express");
const router = express.Router();
const { checkAutheticated } = require("../Middlewares/Auth");
const { like, dislike } = require("../Controllers/LikesController");
const { check } = require("express-validator");

router.post(
  "/add",
  checkAutheticated,
  [
    check("postId")
      .isLength({ min: 24, max: 24 })
      .isString()
      .withMessage("Invalid PostId"),
  ],
  like
);
router.post(
  "/remove",
  checkAutheticated,
  [
    check("postId")
      .isLength({ min: 24, max: 24 })
      .isString()
      .withMessage("Invalid PostId"),
  ],
  dislike
);

module.exports = router;

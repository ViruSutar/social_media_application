const express = require("express");
const router = express.Router();
const { checkAutheticated } = require("../Middlewares/Auth");
const {
  follow,
  unfollow,
  getUser,
} = require("../Controllers/FollowersController");
const { check } = require("express-validator");

router.post(
  "/follow",
  checkAutheticated,
  [check("followeeId").isString().withMessage("Id required")],
  follow
);
router.post(
  "/unfollow",
  checkAutheticated,
  [check("followeeId").isString().withMessage("Id required")],
  unfollow
);

router.get("/get", checkAutheticated, getUser);

module.exports = router;

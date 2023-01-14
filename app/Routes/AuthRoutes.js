const { createUser, authenticate,getUsers } = require("../Controllers/AuthController");
const Auth = require("../Middlewares/Auth");
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");


router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Invalid email"),
    check("password").isLength({ min: 5 }).withMessage("Invalid password"),
  ],
  authenticate
);
router.post(
  "/register",
  [
    check("email").isEmail().withMessage("Invalid email"),
    check("password").isLength({ min: 5 }).withMessage("Invalid password"),
    check("name").isString(),
  ],
  createUser
);

//  test route
router.get('/test',getUsers)
module.exports = router;

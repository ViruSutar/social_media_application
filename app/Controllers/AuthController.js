const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../Models/User");
dotenv.config({ path: "./.env" });
const { validationResult } = require("express-validator");

const validationError = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.errors[0].msg });
  }
};

const authenticate = async (req, res) => {
  const { email, password } = req.body;
  try {
    // validators
    validationError(req, res);

    const user = await User.findOne({ email });

    if (!user) {
      return res.send({ success: false, message: "User not found" });
    } else {
      if (user.password !== password) {
        return res.status(401).send({
          success: false,
          message: "email or password is incorrect",
        });
      }
    }

    // generate jwt
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });

    return res.status(200).send({ success: true, token });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // validator
    validationError(req, res);

    await User.create({
      name,
      email,
      password,
    });

    return res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const user = await User.find();

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Data not found" });
    }

    return res.status(200).json({ success: true, User: user });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  authenticate,
  validationError,
  getUsers,
};

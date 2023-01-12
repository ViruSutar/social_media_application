const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

exports.checkAutheticated = async (req, res, next) => {

  const token = req.header("Authorization")?.replace('Bearer ','') || req.cookies?.token

  // console.log("token",token);
  if (!token) {
    return res.status(403).send("token is missing");
  }
  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    
    req.user = decode.id;
  } catch (error) {
    console.log(error);
    return res.status(402).send("Invalid token");
  }

  return next();
};

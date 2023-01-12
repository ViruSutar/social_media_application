const Follower = require("../Models/Follower");
const User = require("../Models/User");
const { validationError } = require("./AuthController");

const follow = async (req, res) => {
  const { followeeId } = req.body;
  const followerId = req.user;
  try {
    //validation
    validationError(req, res);

    const checkUser = await Follower.findOne({
      follweeId: followeeId,
      follwerId: followerId,
    });
    if (followerId === followeeId) {
      return res
        .status(400)
        .json({ succes: false, message: "Something went wrong" });
    }

    if (checkUser) {
      return res
        .status(400)
        .json({ succes: false, message: "Cannot follow again" });
    }

    await Follower.create({
      follwerId: followerId,
      follweeId: followeeId,
    });

    await User.updateOne({ _id: followeeId }, { $inc: { followers: 1 } });
    await User.updateOne({ _id: followerId }, { $inc: { followings: 1 } });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

const unfollow = async (req, res) => {
  const { followeeId } = req.body;
  const followerId = req.user;

  try {
    //validation
    validationError(req, res);

    const userData = await Follower.findOne({
      follwerId: followerId,
      follweeId: followeeId,
    });

    if (userData) {
      userData.delete();
      userData.save();
      await User.updateOne({ _id: followeeId }, { $inc: { followers: -1 } });
      await User.updateOne({ _id: followerId }, { $inc: { followings: -1 } });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (req, res) => {
  const userId = req.user;
  try {
    const user = await User.findById(userId, {
      name: 1,
      followers: 1,
      followings: 1,
    });

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
  follow,
  unfollow,
  getUser,
};

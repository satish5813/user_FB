const User = require("../Modal/UserModal");

exports.UserPost = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.GetUserData = async (req, res) => {
  try {
    const data = await User.find();
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.UpdateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const user = await User.updateOne({ _id: id }, { $set: update });
    if (user.matchedCount === 0) {
      return res.status(404).json({ Messagae: "User Not Found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.DeleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ Messagae: "User Not Found" });
    }
    res.status(200).json({ Message: "User Deleted Successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

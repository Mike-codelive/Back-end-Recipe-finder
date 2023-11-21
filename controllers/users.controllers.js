import User from "../models/login.model.js";

export const getUserInfo = async (req, res) => {
  const user = req.user.userId;

  try {
    const userData = await User.findById(user);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ userData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Database error" });
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    const { userId } = req.user;
    console.log(userId);
    const updateData = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

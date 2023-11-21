import User from "../models/login.model.js";

export const markAsFavorite = async (req, res) => {
  try {
    const { recipeId } = req.body;
    const userId = req.user.userId;

    console.log(recipeId);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favoriteRecipes: recipeId } },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Recipe marked as favorite", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

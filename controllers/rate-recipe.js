import RecipeRate from "../models/rate-recipe.js";
import mongoose from "mongoose";

export const rateRecipe = async (req, res) => {
  try {
    const { recipeId, rating } = req.body;
    const userId = req.user.userId;

    if (!mongoose.isValidObjectId(recipeId)) {
      return res.status(400).json({ error: "Invalid recipeId" });
    }

    const updatedRecipe = await RecipeRate.findByIdAndUpdate(
      recipeId,
      {
        $push: { ratings: { user: userId, value: rating } },
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Recipe rated successfully", recipe: updatedRecipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  ratings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      value: Number,
    },
  ],
});

const RateRecipe = mongoose.model("RecipeRate", recipeSchema);

export default RateRecipe;

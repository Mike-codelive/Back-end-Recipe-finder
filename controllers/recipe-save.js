import Recipe from "../models/recipe-save.js";
export const saveRecipe = async (req, res) => {
  try {
    const { title, extendedIngredients, instructions } = req.body;

    const userId = req.user.userId;
    const ingredientNames = extendedIngredients.map(
      (ingredient) => ingredient.name
    );

    const newRecipe = new Recipe({
      title,
      ingredients: ingredientNames,
      instructions,
      user: userId,
    });

    await newRecipe.save();

    res.status(201).json({ message: "Recipe saved successfully" });
  } catch (error) {
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.title === 1
    ) {
      res
        .status(400)
        .json({ error: "Recipe with the same title already exists" });
    } else {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
};

export const getRecipes = async (req, res) => {
  try {
    const userId = req.user.userId;

    const savedRecipes = await Recipe.find({ user: userId });

    res.status(200).json({ recipes: savedRecipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

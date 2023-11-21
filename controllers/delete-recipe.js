import Recipe from '../models/recipe-save.js';

export const deleteRecipe = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { _id } = req.body;

    const recipeToDelete = await Recipe.findOne({ _id: _id, user: userId });

    if (!recipeToDelete) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    await recipeToDelete.deleteOne();

    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

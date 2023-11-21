import https from "https";
import dotenv from "dotenv/config";

export const searchByIngredient = async (req, res) => {
  try {
    const { ingredients } = req.query;
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}&number=10`;

    https.get(apiUrl, (apiRes) => {
      let data = "";

      apiRes.on("data", (chunk) => {
        data += chunk;
      });

      apiRes.on("end", () => {
        const recipes = JSON.parse(data);

        res.json({ recipes });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const searchRecipeById = async (req, res) => {
  try {
    const { id } = req.params;

    const apiKey = process.env.API_KEY;

    const apiUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;

    https.get(apiUrl, (apiRes) => {
      let data = "";

      apiRes.on("data", (chunk) => {
        data += chunk;
      });

      apiRes.on("end", () => {
        const recipeDetails = JSON.parse(data);

        res.json(recipeDetails);
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

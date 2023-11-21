import express from "express";
import { saveRecipe, getRecipes } from "../controllers/recipe-save.js";
import { deleteRecipe } from "../controllers/delete-recipe.js";
import decodeJwt from "../Middlewares/users.js";

const router = express.Router();

router.post("/recipes/save", decodeJwt, saveRecipe);
router.get("/recipes/user", decodeJwt, getRecipes);
router.delete("/recipes/user", decodeJwt, deleteRecipe);

export default router;

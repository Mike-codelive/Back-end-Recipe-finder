import express from "express";
const router = express.Router();
import decodeJwt from "../Middlewares/users.js";
import { rateRecipe } from "../controllers/rate-recipe.js";

router.post("/api/recipes/rate", decodeJwt, rateRecipe);

export default router;

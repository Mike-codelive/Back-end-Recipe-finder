import express from "express";
import { markAsFavorite } from "../controllers/recipe-favorite.js";
import decodeJwt from "../Middlewares/users.js";
const router = express.Router();

router.post("/recipes/favorite", decodeJwt, markAsFavorite);

export default router;

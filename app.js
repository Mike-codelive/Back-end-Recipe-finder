import express from 'express'
import recipeRoutes from './routes/recipes.routes.js'
import loginRoutes from './routes/login.routes.js'
import userRoutes from './routes/user.routes.js'
import recipeSave from './routes/recipe-save.js'
import recipeFavorite from './routes/recipe-favorite.js'
import rateRecipe from './routes/rate-recipe.js'
import cors from 'cors'
const app = express()


app.use(cors())
app.use(express.json())
app.use(loginRoutes)
app.use(recipeRoutes)
app.use(userRoutes)
app.use(recipeSave)
app.use(recipeFavorite)
app.use(rateRecipe)

export default app
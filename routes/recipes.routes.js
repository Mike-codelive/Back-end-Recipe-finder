import {Router} from 'express'
import {searchByIngredient, searchRecipeById} from '../controllers/recipes.js'

const router = Router()

router.get('/search', searchByIngredient)
router.get('/search/:id', searchRecipeById)


export default router
import {Router} from 'express'
import { register, loginUser, logout } from '../controllers/login.controllers.js'
import {isTokenBlacklisted} from '../Middlewares/tokenBlacklist.js';


const router = Router()

router.post('/register', register);
router.post('/login', loginUser);
router.post('/logout', isTokenBlacklisted, logout);

export default router
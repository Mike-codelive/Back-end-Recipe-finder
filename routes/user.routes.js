import {Router} from 'express'
import { getUserInfo, updateUserInfo } from '../controllers/users.controllers.js'
import decodeJwt from "../Middlewares/users.js"

const router = Router()

router.get('/users', decodeJwt, getUserInfo);
router.put('/users', decodeJwt, updateUserInfo);


export default router
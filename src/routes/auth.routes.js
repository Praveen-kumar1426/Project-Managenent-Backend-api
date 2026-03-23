import { Router } from "express";
import {login, logoutUser, resgisterUser} from '../controller/auth.controller.js'
import { validate } from "../middleware/validator.middlerware.js";
import { userLoginValidator, userRegisterValidator } from "../validators/index.js";
import {verifyJwt} from '../middleware/auth.middleware.js'

const router = Router()


router.route("/register").post(userRegisterValidator(),validate ,resgisterUser);
router.route("/login").post(userLoginValidator() , validate,login);
// secure routes
router.route("/logout").post(verifyJwt, logoutUser);



export default router
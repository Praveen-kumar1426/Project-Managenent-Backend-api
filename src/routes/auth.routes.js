import { Router } from "express";
import {changeCurrentPassword, forgetPassword, getCurrentUser, login, logoutUser, refreshAccessToken, resendEmailVerification, resetForgetPassword, resgisterUser, verifyEmail} from '../controller/auth.controller.js'
import { validate } from "../middleware/validator.middlerware.js";
import { userChangesCurrentPasswordValidator, userForgotPasswordValidator, userLoginValidator, userRegisterValidator, userResetForgotPasswordValidator } from "../validators/index.js";
import {verifyJwt} from '../middleware/auth.middleware.js'

const router = Router()

// unsecured routes
router.route("/register").post(userRegisterValidator(),validate ,resgisterUser);
router.route("/login").post(userLoginValidator() , validate,login);
router.route("/verify-email/:verificationToken").get(verifyEmail);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/forgot-password").post(userForgotPasswordValidator(), validate, forgetPassword );
router.route("/reset-password/:resetToken").post( userResetForgotPasswordValidator, validate, resetForgetPassword)
  
  
  // secure routes
  router.route("/logout").post(verifyJwt, logoutUser);
  router.route("/current-user").post(verifyJwt, getCurrentUser);
  router.route("/change-password").post(verifyJwt, userChangesCurrentPasswordValidator(),validate, changeCurrentPassword);
  router.route("/resend-email-verification").post(verifyJwt, resendEmailVerification)



export default router
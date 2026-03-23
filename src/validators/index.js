import { body } from "express-validator";

const userRegisterValidator =()=>{
   return [
     body("email")
       .trim()
       .notEmpty()
       .withMessage("Email is requried")
       .isEmail()
       .withMessage("Email is invalid"),

     body("username")
     .trim()
     .notEmpty()
     .withMessage("Username is requried")
     .isLowercase()
     .withMessage("Username must be in lower case")
     .isLength({min:3})
     .withMessage("Username must be at 3 charaters long"),
     body("password")
     .trim()
     .notEmpty()
     .withMessage("Password is requried"),
     body("fullname")
     .optional()
     .trim()
   ];
}


const userLoginValidator = ()=>{
  return [
    body("email").notEmpty().isEmail().withMessage("Email is invalid"),
    body("password").notEmpty().withMessage("Password is requried"),
  ];
}

const userChangesCurrentPasswordValidator =()=>{
  return [
    body("oldPassword").notEmpty().withMessage("Old password is required"),
    body("newPassword").notEmpty().withMessage("New password is required"),
  ];
}

const userForgotPasswordValidator =()=>{
  return[
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Email is invalid")
  ]
}

const userResetForgotPasswordValidator=()=>{
  return[
    body("newPassword").notEmpty().withMessage("Password is required")
  ]
}
export{userRegisterValidator, userLoginValidator, userChangesCurrentPasswordValidator, userForgotPasswordValidator,userResetForgotPasswordValidator}

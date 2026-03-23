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
export{userRegisterValidator, userLoginValidator}
const express = require("express");
const { body } = require("express-validator");
const { signUpController } = require("../controllers/users");
const userModel = require('../models/user')

const router = express.Router();

router.put(
  "/signup",
  [
    body("name").trim().not().isEmpty().withMessage("User name is required"),
    body("email")
      .isEmail()
      .withMessage("Email is invalid")
      .custom((value, {req}) => {
        return userModel.findOne({email: value}).then( userDoc=>{
            if(userDoc)
            return Promise.reject('Email already taken')
        })
      }),
    body("password").trim().isLength({ min: 5 }),
  ],
  signUpController
);

module.exports = router;

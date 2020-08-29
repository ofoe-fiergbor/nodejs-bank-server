const UserModel = require('../models/user')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')

const signUpController = (req, res) =>{


    const errors = validationResult(req)
    if(!errors.isEmpty()){
      console.log(errors)
      return res.json({message: errors.array()[0].msg})
    }



    const {name, email, password} = req.body;

    bcrypt.hash(password, 7).then(hashedPassword =>{
        const user = new UserModel({name, email, password: hashedPassword});

        user.save().then(user =>{
            res.json({'message': 'Sign up successful', "data": {user:user.name, email: user.email}});
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
    
    
}

module.exports={
    signUpController
}
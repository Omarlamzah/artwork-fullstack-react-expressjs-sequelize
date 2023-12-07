const  {query ,validationResult,check} =require("express-validator");


const  inputValidatoMidl=[ check('firstName').notEmpty(),
 check('lastName').notEmpty().withMessage('Your last name is less than 3 characters'),
 check('email').isEmail().withMessage('Your email is not valid'),
 check('password').isStrongPassword().withMessage('Your password is not strong enough'),
 check('phonenumber').isLength({ min: 9, max: 13 }).withMessage('Your phone number is not valid')]

module.exports = inputValidatoMidl

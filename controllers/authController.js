const User = require('../models/User')
const jwt = require('jsonwebtoken');

//handle errors
const handleErrors = (err) =>{
    let errors = {email: '', password:''};
    // console.log(errors);

    //login errors 
    if(err.message === 'email is not correct'){
        errors.email = 'this email is not registered'
    }
    if(err.message === 'password is not correct'){
        errors.password = 'this password is not correct'
    }

    //duplicate error code
    if(err.code === 11000){
        errors.email = 'this email is already registered';
        return errors;
    }

    //validation errors
    if (err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) =>{
            errors[properties.path] = properties.message;
        });
    }
    // console.log(errors);
    return errors;
}

const maxAge = 3 * 24 * 60 * 60; 
const createToken = (id) =>{
    return jwt.sign({id}, 'nesreen khalid guest book',{
        expiresIn: maxAge
    });
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await User.create({email, password});
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000})
        res.status(201).json({email: user.email, user: user._id, token: token});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).send( errors );
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000})
        res.status(200).json({email: user.email, user: user._id, token: token}) 
    }
    catch(err){
        const errors = handleErrors(err);
        console.log('login errors', errors)
        res.status(401).send( errors );
    }
}


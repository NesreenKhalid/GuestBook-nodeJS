const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {

    const token = req.header('authorization');

    if(token){
        jwt.verify(token, 'nesreen khalid guest book', (err, decodedToken)=>{
            if(err){
                console.log('err.message', err.message)
                res.redirect('/login');
            }else{
                // console.log(decodedToken);
                console.log('decodedToken', decodedToken)
                next();
            }
        });
    }else{
        res.redirect('/login');
    }

}

const checkUser = (req, res, next) => {
    const token = req.header('authorization');
    if(token){
        jwt.verify(token, 'nesreen khalid guest book', async (err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user = null;
                // next();

            }else{
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user; //locals accessable from all views
                // next();
            }
        });
    }else{
        res.locals.user = null;
        // next();
    }
    next();
}
module.exports = { requireAuth, checkUser }
const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

// hint for me : add name !!!!
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required:[true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [6, 'Minimum password length in 6 characters']
    }
});

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    // console.log(user);
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            // console.log(auth);
            return user;
        }
        throw Error("password is not correct");
    }
    throw Error("email is not correct");
}

const User = mongoose.model('user', userSchema);

module.exports = User;
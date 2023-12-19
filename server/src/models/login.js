const mongoose = require("mongoose");
const validator = require("validator");


const loginSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:[true, "email already exist"],
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:[true, "email already exist"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
        

    },
    password:{
        type:String,
        required:true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
})


const LoginData = new mongoose.model("reg", loginSchema);

module.exports = LoginData;
//we require connection here as it is.
require('../connection/conn');
const mongoose=require('mongoose');
var UserSchema=mongoose.Schema({
    fname:{type:String},
    lname:{type:String},
    email:{type:String},
//    email:{type:String,default:''},

    password:{type:String},
    confirmPassword:{type:String},
    phone:{type:String},
    age:{type:Number},
    onetimepass:{type:String},
    expiredTime:{type:String},
    machineId:{type:Array}
})
//here users is a  collection name in the db ejob
const userModel=mongoose.model('users',UserSchema);
module.exports=userModel;
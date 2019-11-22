//we require connection here as it is.
require('../connection/conn');
const mongoose=require('mongoose');
var postSchema=mongoose.Schema({
    user_id     :   {type:String},
    title       :   {type:String},
    description :    {type:String}
})
//here users is a  collection name in the db ejob
const postModel=mongoose.model('post',postSchema);
module.exports=postModel;
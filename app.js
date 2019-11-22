const express =require('express');
const app=express();
const userRoutes=require('./user/userroutes');
const userAuthRoutes=require('./user/userauthroutes')
const postAuthRoutes=require('./post/postauthroutes')
const cors = require("cors")
var multer  = require('multer')

app.use(express.json());
app.use(cors());

let fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'upload')
    },
    filename:(req,file,cb)=>{
        Math.random()
        cb(null,  Math.random()+file.originalname)
    }
})
let filesFilter=(req,file,cb)=>{
    if(file.mimetype ==='image/png'){
        cb(null,false)  //if false does not save
    }else{
        cb(null,true) //if true  save
    }
}
//for file uploads
// app.use(multer().single('image')) //for reffrence  
// app.use(multer({dest:'image'}).single('image')) // for reffrence  

// app.use(multer({storage:fileStorage}).single('image')) // for reffrence   single file upload

app.use(multer({storage:fileStorage,fileFilter:filesFilter}).array('images',3)) // for reffrence  
//http://localhost:3000/api/user/register

//http://localhost:3000/api/user/login
app.use('/api/user',userRoutes);

//http://localhost:3000/api/auth/user/profile
//http://localhost:3000/api/auth/user/profile/update

app.use('/api/auth/user',userAuthRoutes);

 //http://localhost:3000/api/auth/post/addpost
 app.use('/api/auth/post',postAuthRoutes);
 
 //http://localhost:3000/api/auth/post/file-upload
 app.use('/api/auth/post',postAuthRoutes);

app.listen(3000,()=>{
    console.log(`Server is running on the port http://localhost:3000`);
})


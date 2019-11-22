const express =require('express');
const router=express.Router();
const postQueries=require('../query/postauthquery');
const jwt = require('jsonwebtoken');

    router.use((req,res,next)=>{
        var token=req.headers['authorization'];
        if(!token){
            return res.json({
                data:[],
                success:0,
                message:'No Token provided.'
            });
        };
        jwt.verify(token,'ejobindia123456',(err,decoded)=>{
            if(err){
                return res.json({
                    data:[],
                    success:0,
                    message:'Failed to authenticate token'
                });
            }
            req.user = decoded;
            next();
        });
    });

    //http://localhost:3000/api/auth/post/addpost
    router.post('/addpost',(req,res) => {
        postQueries.addPost(req,res);
    })


    //this route is for view active user all post
    //http://localhost:3000/api/auth/post/viewpost
    router.get('/viewpost',(req,res) => {
        postQueries.viewPost(req,res);
    })
    
    //this route is for view active user single post with id
    //http://localhost:3000/api/auth/post/viewpost/id
    router.post('/viewpost/id',(req,res) => {
        postQueries.viewPostId(req,res);
    })

    //this route is for update active user single post with Id
    //http://localhost:3000/api/auth/post/updatepost
    router.post('/updatepost',(req,res) => {
       
         postQueries.updatePost(req,res);
    })
    
    //this route is for remove active user single post with Id
    //http://localhost:3000/api/auth/post/removepost
    router.post('/removepost',(req,res) => {
        
        postQueries.removePost(req,res);
    })

    //this route is for display all user every post
    //http://localhost:3000/api/auth/post/viewallpost
    router.get('/viewallpost',(req,res) => {
        
        postQueries.viewAllPost(req,res);
   })
    

    module.exports=router;

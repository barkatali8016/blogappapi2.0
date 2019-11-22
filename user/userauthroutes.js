const express =require('express');
const router=express.Router();
const userQueries=require('../query/userauthquery.js');
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

    //http://localhost:3000/api/auth/user/profile
    router.get('/profile',(req,res) => {
        userQueries.profile(req,res);
    })

    //http://localhost:3000/api/auth/user/profile/update
    router.post('/profile/update',(req,res) => {
        userQueries.profileUpdate(req,res);
    })

    module.exports=router;

const userQueries = require("../model/usermodel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
// var device = require('device');
// var mydevice = device('put here user-agent string');
const userDetails = {
  user: "meanstack12345@gmail.com",
  pass: "meanstack123@"
};
const UserMethdos = {
  register(formdata, res) {
    if (formdata.password == formdata.confirmPassword) {
      userQueries
        .find({ email: formdata.email })
        .then(result => {
          if (result.length != 0) {
            return res.json({
              data: [],
              success: 0,
              msg: "This Email-Id is already registered"
            });
          } else {
            userQueries
              .create(formdata)
              .then(result => {
                return res.json({
                  data: [],
                  success: 1,
                  msg: "Registered Succesfully"
                });
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      return res.json({
        data: [],
        success: 0,
        msg: "password does not match"
      });
    }
  },
  login(req, res) {
    let formdata = req.body;
    userQueries
      .find({ email: formdata.email })
      .then(result => {
        if (result.length != 0) {
          userQueries
            .find({ email: formdata.email, password: formdata.password })
            .then(result => {
              if (result.length != 0) {
                // return res.json({
                //                       data:result[0].machineId ,
                //                       data:result[0],
                //                       success:0,
                //                       msg:'Machine Id'
                //                   })
                if(result[0].machineId.length>0){
                  let flag=true;
                  // result[0].machineId.forEach(element => {
                  //   if(element != req.headers["user-agent"]){
                  //     flag=true;
                  //   }
                  // });
                  for(let i=0;i<result[0].machineId.length;i++){
                    if(result[0].machineId[i] == req.headers["user-agent"]){
                          flag=false;
                          break;
                        }
                  }
                  if (flag) {
                    function generateOTP() {
                      let OTP = "";
                      for (let i = 0; i < 4; i++) {
                        OTP += Math.floor(Math.random() * 10);
                      }
                      return OTP;
                    }
                    let otp = generateOTP();
                    //implementing mail option
                    var transporter = nodemailer.createTransport({
                      service: "gmail",
                      auth: {
                        user: userDetails.user,
                        pass: userDetails.pass
                      }
                    });
                    let _id = result[0]._id;
                    console.log(result);
                    var mailOptions = {
                      from: userDetails.user,
                      to: formdata.email,
                      subject: "Sending OPT using Node.js",
                      text: `${
                        result[0].fname
                      }Your Login Four Digit One Time Password is ${otp}`
  
                      // attachments: [
                      //       {   // utf-8 string as an attachment
                      //           filename: 'image1.jpg',
                      //           path : 'C:/Uploads/img.jpg'
                      //       },
                      //   ]
                    };
  
                    transporter.sendMail(mailOptions, function(error, info) {
                      if (error) {
                        console.log(error);
                      } else {
                        console.log("Email sent: " + info.response);
                        console.log("Email sent: " + formdata.email);
  
                        let today = new Date();
                        var time = today.getTime();
  
                        userQueries
                          .updateOne(
                            { _id },
                            // { onetimepass: otp,expiredTime:time},
                            {
                              expiredTime: time,
                              onetimepass: otp,
                              $push : {machineId:req.headers["user-agent"]}
                            },
                            function(err, result) {
                              if (err) throw err;
                            }
                          )
                          .then(res => {
                            console.log(res);
                          });
  
                        return res.json({
                          data: result[0]._id,
                          success: 1,
                          msg: "Opt Send to your Email address"
                        });
                      }
                    });
                  } else {
                        if (result.length != 0) {
                          // create a token
                          var token = jwt.sign(
                            {
                              _id: result[0]._id,
                              name: result[0].name,
                              email: result[0].email,
                              location: result[0].location,
                              age: result[0].age
                            },
                            "ejobindia123456"
                          );
  
                          return res.json({
                            data: token,
                            success: 3,
                            msg:
                              "Login Successful & 2nd step varification completed"
                          });
                          // return res.json({
                          //   data: result,
                          //   success: 1,
                          //   msg: "2nd step varification completed"
                          // });
                        }
                  }
                }else{

                  // if (element != req.headers["user-agent"]) {
                    function generateOTP() {
                      let OTP = "";
                      for (let i = 0; i < 4; i++) {
                        OTP += Math.floor(Math.random() * 10);
                      }
                      return OTP;
                    }
                    let otp = generateOTP();
                    //implementing mail option
                    var transporter = nodemailer.createTransport({
                      service: "gmail",
                      auth: {
                        user: userDetails.user,
                        pass: userDetails.pass
                      }
                    });
                    let _id = result[0]._id;
                    console.log(result);
                    var mailOptions = {
                      from: userDetails.user,
                      to: formdata.email,
                      subject: "Sending OPT using Node.js",
                      text: `${
                        result[0].fname
                      }Your Login Four Digit One Time Password is ${otp}`
  
                      // attachments: [
                      //       {   // utf-8 string as an attachment
                      //           filename: 'image1.jpg',
                      //           path : 'C:/Uploads/img.jpg'
                      //       },
                      //   ]
                    };
  
                    transporter.sendMail(mailOptions, function(error, info) {
                      if (error) {
                        console.log(error);
                      } else {
                        console.log("Email sent: " + info.response);
                        console.log("Email sent: " + formdata.email);
  
                        let today = new Date();
                        var time = today.getTime();
  
                        userQueries
                          .updateOne(
                            { _id },
                            // { onetimepass: otp,expiredTime:time},
                            {
                              expiredTime: time,
                              onetimepass: otp,
                              machineId:req.headers["user-agent"]
                              // $push : {machineId:req.headers["user-agent"]}
                            },
                            function(err, result) {
                              if (err) throw err;
                            }
                          )
                          .then(res => {
                            console.log(res);
                          });
  
                        return res.json({
                          data: result[0]._id,
                          success: 1,
                          msg: "Opt Send to your Email address"
                        });
                      }
                    });
                  // } else {
                  //       if (result.length != 0) {
                  //         // create a token
                  //         var token = jwt.sign(
                  //           {
                  //             _id: result[0]._id,
                  //             name: result[0].name,
                  //             email: result[0].email,
                  //             location: result[0].location,
                  //             age: result[0].age
                  //           },
                  //           "ejobindia123456"
                  //         );
  
                  //         return res.json({
                  //           data: token,
                  //           success: 3,
                  //           msg:
                  //             "Login Successful & 2nd step varification completed"
                  //         });
                  //         // return res.json({
                  //         //   data: result,
                  //         //   success: 1,
                  //         //   msg: "2nd step varification completed"
                  //         // });
                  //       }
                  // }
                }
                

                
              } else {
                return res.json({
                  data: [],
                  success: 0,
                  msg: "Email-Id and Password does not match.Please Try Again!"
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return res.json({
            data: [],
            success: 0,
            msg: "Email-Id is not registered.Please Register and Try again"
          });
        }
      })
      .catch(err => {
        console.log(err);
      });

    // return res.json('Login page');
  },
  loginTwoStep(req, res) {
    let date = new Date();
    let time = Math.floor(date.getTime() / 60000);
    userQueries.find({ _id: req.body._id }).then(result => {
      if (result != "") {
        let preTime = Math.floor(result[0].expiredTime / 60000);
        if (time - preTime > 1) {
          userQueries
            .updateOne(
              { _id: req.body._id },
              { onetimepass: "", machineId: "" }
            )
            .then(result => {
              return res.json({
                data: [],
                success: 0,
                msg: "Expired Time"
              });
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          userQueries
            .find({ _id: req.body._id, onetimepass: req.body.otp })
            .then(result => {
              if (result.length != "") {
                userQueries
                  .updateOne(
                    { _id: req.body._id },
                    { onetimepass: "", expiredTime: "" }
                  )
                  .then(response => {
                    if (response.length != "") {
                      userQueries
                        .find({ _id: req.body._id })
                        .then(result => {
                          if (result.length != 0) {
                            // create a token
                            var token = jwt.sign(
                              {
                                _id: result[0]._id,
                                name: result[0].name,
                                email: result[0].email,
                                location: result[0].location,
                                age: result[0].age
                              },
                              "ejobindia123456"
                            );

                            return res.json({
                              data: token,
                              success: 3,
                              msg:
                                "Login Successful & 2nd step varification completed"
                            });
                            // return res.json({
                            //   data: result,
                            //   success: 1,
                            //   msg: "2nd step varification completed"
                            // });
                          }
                        })
                        .catch(err => {
                          throw err;
                        });
                    }
                  })
                  .catch(err => {
                    throw err;
                  });
              } else {
                return res.json({
                  data: [],
                  success: 0,
                  msg: "Otp Does not match"
                });
              }
            });
        }
      }
    });
  },
  fileUpload(req,res){
    console.log(req.files)
    return res.json({
      data: req.files,
      success: 0,
      msg: "File Uploaded Succedddssfully",
      file: req.file
    });
  }
};

module.exports = UserMethdos;

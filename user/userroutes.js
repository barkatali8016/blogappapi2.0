const express = require("express");
const router = express.Router();
const userQuery = require("../query/userquery.js");
const Joi = require("joi");

//http://localhost:3000/api/user/register
router.post("/register", (req, res) => {
  //joi validation
  const schema = {
    fname: Joi.string()
      .min(2)
      .max(30)
      .required(),
    lname: Joi.string()
      .min(2)
      .max(30)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    //email:Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string()
      .min(8)
      .max(20)
      .required(),
    confirmPassword: Joi.string()
      .min(8)
      .max(20)
      .required(),
    phone: Joi.string().length(10),
    age: Joi.number()
      .greater(15)
      .less(81)
      .required()
    // onetimepass:Joi.string()
  };
  schema.onetimepass = "";
  schema.machineId = "123";
  const result = Joi.validate(req.body, schema);
  if (result.error != null) {
    // console.log('result.error.details[0].message'+result.error);
    //console.log('result '+result.error);
    res.json({
      data: [],
      success: 0,
      msg: result.error.details[0].message
    });
  } else {
    // console.log('result '+result.error);
    //res.send(result);
    userQuery.register(req.body, res);
  }
});

//http://localhost:3000/api/user/login
router.post("/login", (req, res) => {
  const schema = {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(8)
      .max(20)
      .required()
  };
  const result = Joi.validate(req.body, schema);
  if (result.error != null) {
    res.json({
      data: [],
      success: 0,
      msg: result.error.details[0].message
    });
  } else {
    userQuery.login(req, res);
  }
});
//http://localhost:3000/api/user/logintwostep
router.post("/logintwostep", (req, res) => {
  const schema = {
    _id: Joi.string().required(),
    otp: Joi.string()
      .length(4)
      .required()
  };
  const result = Joi.validate(req.body, schema);
  if (result.error != null) {
    res.json({
      data: [],
      success: 0,
      msg: result.error.details[0].message
    });
  } else {
    userQuery.loginTwoStep(req, res);
  }
});
//http://localhost:3000/api/user/file-upload
router.post("/file-upload", (req, res) => {
    console.log(req.file)
    userQuery.fileUpload(req, res);
});

module.exports = router;

const { json } = require("body-parser");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const admin_auth = async (req, res, next) => {
    console.log("hello admin")
  try {
        const bearerHeader= req.headers['authorization'];
        console.log(bearerHeader)
        const bearer=bearerHeader.split(" ");
        console.log("bearer",bearer)
        const token=bearer[1];
        console.log("token",token);
    // console.log('hello admin')
    // const token= req.cookie;
    // console.log(token)
    const verify_token = jwt.verify(token,"amitdigital");
     console.log("verify token",verify_token)
    const user_data = await UserModel.findOne({_id:verify_token.id});
    console.log("userdata",user_data);
    req.user=user_data
    next();
  } catch (error) {
    res.redirect("/login");
  }
};
module.exports = admin_auth;

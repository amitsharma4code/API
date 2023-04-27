const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class UserController {
  static userregister = async (req, res) => {
    //  console.log("body",req.body)
    try {
      // console.log(req.body)
      const { name, email, password, cpassword } = req.body;
      const user = await UserModel.findOne({ email: email });
      // console.log(admin);
      if (user) {
        res.status(401).json({
          message: "email already exists",
        });
      } else {
        if (name && email && password && cpassword) {
          if (password == cpassword) {
            const hashpassword = await bcrypt.hash(password, 10);
            const result = new UserModel({
              name: name,
              email: email,
              password: hashpassword,
            });
            await result.save();
            res.status(201).json({
              message: "successfully registered",
              result,
            });
          } else {
            res.status(401).json({
              message: "password and conform password does not matched",
            });
          }
        } else {
          res.status(401).json({
            message: "all fields are required",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  static verifylogin = async (req, res) => {
    try {
      // console.log(req.body)
      const { email, password } = req.body;
      // console.log(email,password)
      if (email && password) {
        const user = await UserModel.findOne({ email: email });
        // console.log(user)
        if (user!= null) {
          const ismatched = await bcrypt.compare(password, user.password);
          // console.log(ismatched)
          if (ismatched) {
            // token generated
            const token = jwt.sign({ id: user._id },"amitdigital")
            // console.log(token)
            res.cookie("token", token);
            res.status(201).json({
                status: "success",
                message: "login successfully with web token",
                token: token,
                user,
              });
          } else {
            req.flash("error", "email or password doesn't matched");
            res.redirect("/login");
            res.status(401).json({message: "email or password does not matched",});
          }
        } else {
          res.status(401).json({
            message: "you are not registerd",
          });
        }
      } else {
        res.status({
          message: "Email and Password both filds are required",
        });
       }
    } catch (err) {
      res.send(err);
    }
  };
}
module.exports = UserController;

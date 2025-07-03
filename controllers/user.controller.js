let jwt = require('jsonwebtoken')
let bcrypt = require('bcryptjs')
let User = require('../models/users.model.js')
require('dotenv').config()



let googleSignupController = async (req, res) => {
  try {
    let { email } = req.body;

    let existingUser = await User.findOne({ email });

    let user;

    if (existingUser) {
      await User.updateOne({ email }, { $set: { email } });

      user = existingUser;

      let token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
      
    } else {
      user = new User({
        email,
        password: 'google-signup', // optional
      });
      await user.save();
    }

    let token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      secure: true
    });

    return res.status(200).json({
      message: 'Signup/Login with Google successful',
      auth: true,
    });

  } catch (e) {
    return res.status(500).json({
      message: 'Internal server issue',
      auth: false,
    });
  }
};

let signupController = async (req,res)=>{
    try {
        
        let {email, password} = req.body;
        let userExist = await User.exists({email})
        if(userExist){
            return res.status(401).json({
                message: 'Email Already Exists, You can Login'
            })
        }
        let hashedPassword = await bcrypt.hash(password, 10)
        let user = new User({
            email,
            password: hashedPassword
        })
        await user.save()

        return res.status(201).json({
            message: 'Signup Successfully Completed, You can Login',
            auth: false,
        })
        
    } catch (e) {
        return res.status(500).json({
            message: 'Internal server issue'
        })
    }
}
let loginController = async (req,res)=>{
    try {
        
        let {email, password} = req.body;
        let user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                message: 'Email not Exists'
            })
        }
        let comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            return res.status(404).json({
                message: 'Wrong Password',
                auth: false
            })
        }

        let token = await jwt.sign({_id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'})


        res.cookie('token', token,{
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
            secure: true
        })

        return res.status(200).json({
            message: 'Login successful',
            auth: true,
        })
        
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server issue'
        })
    }
}

module.exports = {loginController, signupController, googleSignupController}

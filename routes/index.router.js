let express = require('express');
const { signupValidation, loginValidation } = require('../middlewares/user.validation.js');
const { signupController, loginController, googleSignupController } = require('../controllers/user.controller.js');
const verifyToken = require('../middlewares/verifyToken.js');
let router = express.Router();


router.post('/signup',signupValidation, signupController)
router.post('/login',loginValidation, loginController)
router.post('/google-auth', googleSignupController)
router.post('/verify',verifyToken)


module.exports = router
let Joi = require('joi')


let userSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please enter a valid email address.',
        'any.required': 'Email is required.'
    }),
    password: Joi.string().min(7).required().messages({
        'string.min': 'Username must be at least 7 characters long.',
        'any.required': 'Password is required.'
    }),
})

let signupValidation = (req, res, next) => {
    try {

        let { error } = userSchema.validate(req.body)
        if (error) {
            return res.status(401).json({
                message: error.details[0].message,
                auth: false
            })
        }
        next()
    } catch (error) {
        console.log('Internal server issue')
    }
}
let loginValidation = (req, res, next) => {
    try {

        let { error } = userSchema.validate(req.body)
        if (error) {
            return res.status(401).json({
                message: error.details[0].message
            })
        }
        next()
    } catch (error) {
        console.log('Internal server issue')
    }
}

module.exports = { signupValidation, loginValidation }
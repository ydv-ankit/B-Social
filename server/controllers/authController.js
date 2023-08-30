const { User } = require('../models/User')
const jwt = require('jsonwebtoken')

const maxAge = 2 * 24 * 60 * 60;
const mySecretKey = process.env.secret_key;


function getToken(userID) {
    return jwt.sign({ userID }, mySecretKey, {
        expiresIn: maxAge
    })
}

const handleErrors = (err) => {
    const errors = {name:'', email: '', password: '' }

    // error code
    if (err.code == 11000) {
        errors["email"] = "email already used"
    }

    // invalid email OR password
    if(err.message == "invalid email"){
        errors.email = "invalid email"
    }
    if(err.message == "invalid password"){
        errors.password = "invalid password"
    }

    // validation of email & password
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

module.exports.signup_post = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const user = await User.create({ name, email, password })
        res.cookie('jwt', getToken(user._id), { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ "success": "user created" })
    }
    catch (err) {
        const errors = handleErrors(err)
        res.status(400).send({ "error": errors })
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body
    try{
        const user = await User.login(email, password)
        res.cookie('jwt', getToken(user._id), {httpOnly: true, maxAge: maxAge * 1000})
        res.status(202).json({"success": user})
    }
    catch(err){
        const error = handleErrors(err)
        res.status(401).json({"error" : error})
    }
}
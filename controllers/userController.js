const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


//POST 
//@route /api/users/register
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400)
        throw new Error('All fields required')
    }
    const userAvailable = await User.findOne({ email })
    if (userAvailable) {
        res.status(400);
        throw new Error("User already exist")
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    // console.log(hashedPassword);
    if (user)
        return res.status(200).json({ _id: user.id, email: user.email })

    else {
        res.status(400)
        throw new Error("Some error occured :( ")
    }

})


//POST  
//@route /api/users/login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const user = await User.findOne({ email })

    if (user) {
        if (await (bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign({
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                }
            }, process.env.ACCESS_TOKEN,
                { expiresIn: "15min" }
            )
            res.status(200).json({ accessToken });
        }
        else {
            res.status(401);
            throw new Error("password incorrect")
        }
    }
    else {
        res.status(400);
        throw new Error("User does not exist")
    }
})


//GET  
//@route /api/users/current
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})

module.exports = {
    registerUser,
    loginUser,
    currentUser
}
const UserModel = require('../models/user.model'); 
const userService = require('../services/user.services');
const { validationResult} = require("express-validator")
const BlacklistModel = require('../models/blacklistToken.model');   


module.exports.registerUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // console.log(req.body);

    const { fullName, email, password } = req.body;

    const isUserExiest = await UserModel.findOne({email});

    if (isUserExiest) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await UserModel.hashPassword(password);

    const user = await userService.createUser({

        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword 
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });

}


module.exports.loginUser = async (req, res, next) => {
 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
        return res.status(401).json({ message: "invaild email or password" });
    }

    const isValid = await user.comparePassword(password);

    if (!isValid) {
        return res.status(401).json({ message: "invaild email or password" });
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, user });

}


module.exports.getUserProfile = async (req, res, next) =>{
    res.status(200).json({user: req.user});
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    await BlacklistModel.create({token});
    res.status(200).json({message: "Logged out successfully"});
}